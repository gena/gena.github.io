var THREEx = THREEx || {}

THREEx.VideoTexture	= function(url, w, h){
	// create the video element
	var video	= document.createElement('video');
	video.src	= url;

        video.defaultPlaybackRate = 1.0;
        video.load();

        video.width = w
        video.height = h


	// expose video as this.video
	this.video	= video

	// create the texture
	var texture	= new THREE.Texture( video );
	// expose texture as this.texture
	this.texture	= texture

	/**
	 * update the object
	 */
	this.update	= function(){
		if( video.readyState !== video.HAVE_ENOUGH_DATA )	return;
		texture.needsUpdate	= true;		
	}

	/**
	 * destroy the object
	 */
	this.destroy	= function(){
		video.pause()
	}

        this.setSpeed = function(speed) {
          video.playbackRate = speed;
        }
}