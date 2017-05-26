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


////////////////////////
// Helper functions
////////////////////////


////////////////////////
// Event handlers
////////////////////////



////////////////////////
// DOM functions
////////////////////////


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
var isPrime = function(n)
{
    for (var d=3; d<n/2; d+=2)
        if (n%d==0)
            return false;

    return true;
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
//            console.log("[Main thread] Message received from worker: " + e.data);
            console.log("" + e.data);
        }

        myWorker.onerror = function(e)
        {
            console.log("[Main thread] Error in worker: " + e.message + " (" + e.filename + ":" + e.lineno + ")");
        }

        myWorker.postMessage("Msg 1 from main thread to worker");

        root.setTimeout
        (
            function()
            {
                myWorker.postMessage("Msg 2 from main thread to worker");
            },
            2000
        );
    }
};

//
return app;

});})(this);
