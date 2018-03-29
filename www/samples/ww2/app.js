(function (root, undefined) {
define(['radi'],
function (ra) {

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

    if (window.Worker)
    {
        var myWorker = new Worker('worker.js');

        myWorker.onmessage = function(e)
        {
            console.log("" + e.data);
        }

        myWorker.onerror = function(e)
        {
            console.log("[Main thread] Error in worker: " + e.message + " (" + e.filename + ":" + e.lineno + ")");
        }

        myWorker.postMessage("Msg 1 from main thread to worker");
    }
};

//
return app;

});})(this);
