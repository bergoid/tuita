(function (root, undefined) {
//define(['radi', 'lzma', 'plaintext10M'], function (ra, lz, plaintext) {
define(['radi', 'lzma', 'plaintext10'], function (ra, lz, plaintext) {

'use strict';
var app = {};
var settings = {};
var defaults =
{
    initClass: 'js-app'
};

//
app.destroy = function ()
{
    if ( !settings ) return;
    document.documentElement.classList.remove( settings.initClass );
    settings = null;
};

//
app.init = function ( options )
{
    app.destroy();
    settings = ra.extend( defaults, options || {} );
};

//
app.go = function()
{
    app.init();
    ra.log("Ready!");

    var onProgress = function(percent)
    {
        ra.log("" + Math.floor(percent*100.0+0.5) + "% done.");
    };

    var onFinish = function(res, err)
    {
        ra.log("res: " + res);
        ra.log("err: " + err);
    };

    lz.compress
    (
        plaintext,
        1,
        function(res, err)
        {
            lz.decompress
            (
                res,
                function(res, err)
                {
                    console.log("Decompressed text: " + res);
                },
                onProgress
            );
        },
        onProgress
    );
};

//
return app;

});})(this);
