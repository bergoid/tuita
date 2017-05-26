(function (root, undefined) {
define([], function () {

'use strict';
var lz64 = {};

var ww = undefined;

var action_compress   = 1,
    action_decompress = 2,
    action_progress   = 3,
    action_finish     = 4,
    callback_obj = {};

//
var initWW = function()
{
    if (!root.Worker)
        return;

    if (ww)
        return;

    ww = new Worker("lz64w.js");

    ww.onmessage = function(e)
    {
        var cbo = callback_obj[e.data.cbn];

        switch (e.data.action)
        {
            case action_progress:
//                console.log("lz64: received message e.data.action == action_progress");

                if  ( cbo && typeof cbo.on_progress === "function" )
                    cbo.on_progress(e.data.percent);

                break;

            case action_finish:
//                console.log("lz64: received message e.data.action == action_finish");

                if  ( cbo && typeof cbo.on_finish === "function" )
                {
                    cbo.on_finish(e.data.result, e.data.error);
                    delete callback_obj[e.data.cbn];
                }

                break;

            default:
//                console.log("lz64: received message e.data.action == " + e.data.action);
                break;
        }
    }

    ww.onerror = function(e)
    {
        console.log("[Main thread] Error in worker: " + e.message + " (" + e.filename + ":" + e.lineno + ")");
//        console.log("haha");
    }
};

var sendToWorker = function(action, data, on_finish, on_progress)
{
    if (!ww)
        return;

    var cbn;

    do
    {
        cbn = Math.floor(Math.random() * (10000000));
    } while(typeof callback_obj[cbn] !== "undefined");

    callback_obj[cbn] = {
        on_finish:   on_finish,
        on_progress: on_progress
        };

    setTimeout(function(){ww.postMessage
    ({
        action: action,
        cbn:    cbn,
        data:   data
    });}, 100);
};

//
lz64.compress = function(input, on_finish, on_progress)
{
    console.log("lz64.compress()");

    initWW();
    // WW not present yet here : takes time
    sendToWorker(action_compress, input, on_finish, on_progress);
};

//
lz64.decompress = function(input, on_finish, on_progress)
{
    initWW();
    sendToWorker(action_decompress, input, on_finish, on_progress);
};

//
return lz64;

});})(this);
