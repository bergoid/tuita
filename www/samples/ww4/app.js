(function (root, undefined) {
define(['radi', (typeof root.Worker == "undefined") ? 'lz64i' : 'lz64', 'plaintext-uemns'], function (ra, lz64, plaintext) {

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

//    root.startTime = (new Date()).getMilliseconds();

    console.log("plaintext == " + plaintext);

    lz64.compress
    (
        plaintext,
        function(res, err)
        {
            if (typeof err != "undefined")
                return;

            root.lz64_compressedTime = (new Date()).getMilliseconds();

            console.log("lz64-encoded result: " + res);
            ra.body().appendChild
            (
                ra.crel
                (
                    "textarea",
                    {
                        value: plaintext
                    }
                )
            );
//            console.log("input size: " + plaintext.length + " bytes");
//            console.log("output size: " + res.length + " bytes");
//            console.log("Compression: " + res.length/plaintext.length*100.0 + " %");

            lz64.decompress
            (
                res,
                function(res, err)
                {
                    if (typeof err != "undefined")
                        return;

//                    console.log("root.startTime: " + root.startTime);
//                    console.log("root.lz_compressedTime: " + root.lz_compressedTime);
//                    console.log("root.lz64_compressedTime: " + root.lz64_compressedTime);
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
