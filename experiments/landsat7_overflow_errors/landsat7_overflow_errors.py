import sys
import math
from glob import glob

import click

import rasterio
from rasterio import plot

import pandas as pd

import numpy as np
import numpy.ma as ma

import datashader as ds
import datashader.transfer_functions as tf

from PIL import Image

def fix(radiance):
    """
    Fix error in DN by skipping 255
    """
    return radiance[(radiance != 255) & (radiance > 10)]

def to_dn(radiance, props):
    """
    Convert DN > Reflectance
    """
    factor = np.sin(props['SUN_ELEVATION'] * math.pi / 180)
  
    gain = props['REFLECTANCE_MULT'] / factor
    bias = props['REFLECTANCE_ADD'] / factor

    return radiance * gain + bias

def get_properties(path_mtl, band):
   lines = open(path_mtl).readlines()
   props = dict([line.strip().split(' = ') for line in lines if '=' in line])

   return { 'SUN_ELEVATION': float(props['SUN_ELEVATION']), 
            'REFLECTANCE_MULT': float(props['REFLECTANCE_MULT_BAND_' + band]), 
            'REFLECTANCE_ADD': float(props['REFLECTANCE_ADD_BAND_' + band])}


def read_band(scene_dir, band, offset, count):
    path_image = glob(scene_dir + '/*_B' + band + '.TIF')[0]
    path_mtl = glob(scene_dir + '/*_MTL.*')[0]

    # read clipped band images
    image = rasterio.open(path_image)

    print('Reading ' + path_image + ' ...')

    column = 'B' + band

    # read data
    data = pd.DataFrame(image.read().flatten(), columns=[column])

    data = data[data[column] > 0].loc[offset:offset+count]

    props = get_properties(path_mtl, band)

    return (data, props)

def plot_values(data_frame):
    canvas = ds.Canvas(plot_width=1000, plot_height=1000, x_range=(0, 1), y_range=(0, 1))
    agg = canvas.points(data_frame, 'B2', 'B5')

    image = tf.shade(agg, cmap=['lightblue', 'darkblue'], how='linear', alpha=150)
    image = tf.spread(image, px=1)
    image = tf.set_background(image, color='#222222')

    return image

def save_plot(data_frame, fig_path):
    img = plot_values(data_frame)
    img.to_pil().save(fig_path)

@click.command()
@click.option("-s", "--scene-dir", required=True, help="Path to the LANDSAT scene directory.")
@click.option("-n", "--count", default=100000, help="Maximum number of points to process.")
@click.option("-o", "--offset", default=0, help="Maximum number of points to process.")
def main(scene_dir, offset, count):
    click.echo("Analyzing LANDSAT scene for oversaturation error ...")

    # get files for bands 2 and 5

    (data_b2, props_b2) = read_band(scene_dir, '2', offset, count)
    (data_b5, props_b5) = read_band(scene_dir, '5', offset, count)

    # convert DN > reflectance
    data_b2_nofix = to_dn(data_b2, props_b2)
    data_b5_nofix = to_dn(data_b5, props_b5)

    # fix the error and then convert DN > reflectance
    data_b2_fix = to_dn(fix(data_b2), props_b2)
    data_b5_fix = to_dn(fix(data_b5), props_b5)

    # combine bands
    data_nofix = pd.concat([data_b2_nofix, data_b5_nofix], axis=1, join_axes=[data_b2_nofix.index])
    data_fix = pd.concat([data_b2_fix, data_b5_fix], axis=1, join_axes=[data_b2_fix.index])

    # save
    # data_nofix.to_csv('data_nofix.csv')
    # data_fix.to_csv('data_fix.csv')

    # save figures
    save_plot(data_nofix, 'fig_nofix.png')
    save_plot(data_fix, 'fig_fix.png')
    
if __name__ == "__main__":
    sys.exit(main())  # pragma: no cover

