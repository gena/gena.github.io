var THREEx = THREEx || {};

THREEx.VideoTexture = function (url) {
    // create the video element
    var video = document.createElement('video');
    video.src = url;

    video.defaultPlaybackRate = 1.0;

    // expose video as this.video
    this.video = video;

    // create the texture
    this.texture = new THREE.Texture(video);

    this.load = function (onloaded) {
        video.onloadeddata = function () {
            video.width = video.videoWidth;
            video.height = video.videoHeight;
            onloaded()
        };

        this.video.load()
    };

    /**
     * update the object
     */
    this.update = function () {
        if (video.readyState !== video.HAVE_ENOUGH_DATA)    return;
        this.texture.needsUpdate = true;
    };

    /**
     * destroy the object
     */
    this.destroy = function () {
        video.pause()
    };

    this.setSpeed = function (speed) {
        video.playbackRate = speed;
    }
};