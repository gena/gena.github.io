'use strict';

mapboxgl.accessToken = getAccessToken();

function getAccessToken() {
    var accessToken = (
        undefined ||
        "pk.eyJ1IjoiZ2VubmFkaXkiLCJhIjoiMm9WN3VWQSJ9.b9s_EXvxcqiAbaf5GzrEnA" ||
        getURLParameter('access_token') ||
        localStorage.getItem('accessToken')
    );
    try {
        localStorage.setItem('accessToken', accessToken);
    } catch (_) {}
    return accessToken;
}

function getURLParameter(name) {
    var regexp = new RegExp('[?&]' + name + '=([^&#]*)', 'i');
    var output = regexp.exec(window.location.href);
    return output && output[1];
}
