var jam = {
    "packages": [
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "jam/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "jquery.floatingmessage",
            "location": "jam/jquery.floatingmessage"
        }
    ],
    "version": "0.2.17",
    "shim": {}
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "jam/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "jquery.floatingmessage",
            "location": "jam/jquery.floatingmessage"
        }
    ],
    "shim": {}
});
}
else {
    var require = {
    "packages": [
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "jquery-ui",
            "location": "jam/jquery-ui",
            "main": "dist/jquery-ui.min.js"
        },
        {
            "name": "jquery.floatingmessage",
            "location": "jam/jquery.floatingmessage"
        }
    ],
    "shim": {}
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}