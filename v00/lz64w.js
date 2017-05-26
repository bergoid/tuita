(function (root, undefined) {
define(["v00/lz64i"], function (lz64i) {

var action = {};
var worker = {};
var client = {};
var callback_obj = {};
var ww = undefined;

action.compress   = 1;
action.decompress = 2;
action.progress   = 3;
action.finish     = 4;

//
var onFinish = function(wwself, cbn, res, err)
{
    wwself.postMessage
    ({
        action: action.finish,
        cbn: cbn,
        result: res,
        error: err
    });
};

//
var onProgress = function(wwself, cbn, percent)
{
    wwself.postMessage
    ({
        action: action.progress,
        cbn: cbn,
        percent
    });
};

//
worker.onMessage = function(wwself, m)
{
    if (m && m.data)
    {
        switch (m.data.action)
        {
            case action.decompress:

                lz64i.decompress
                (
                    m.data.data,
                    function (res, err)
                    {
                        onFinish(wwself, m.data.cbn, res, err);
                    },
                    function (percent)
                    {
                        onProgress(wwself, m.data.cbn, percent);
                    }
                );

                break;

            case action.compress:

                lz64i.compress
                (
                    m.data.data,
                    function (res, err)
                    {
                        onFinish(wwself, m.data.cbn, res, err);
                    },
                    function (percent)
                    {
                        onProgress(wwself, m.data.cbn, percent);
                    }
                );

                break;

            default:
                break;
        }
    }
};

//
var initWW = function()
{
    if (!root.Worker)
        return;

    if (ww)
        return;

    ww = new Worker("ww.js");

    ww.onmessage = function(e)
    {
        var cbo = callback_obj[e.data.cbn];

        switch (e.data.action)
        {
            case action.progress:

                if  ( cbo && typeof cbo.on_progress === "function" )
                    cbo.on_progress(e.data.percent);

                break;

            case action.finish:

                if  ( cbo && typeof cbo.on_finish === "function" )
                {
                    cbo.on_finish(e.data.result, e.data.error);
                    delete callback_obj[e.data.cbn];
                }

                break;

            default:
                break;
        }
    };

    ww.onerror = function(e)
    {
        console.log("[Main thread] Error in worker: " + e.message + " (" + e.filename + ":" + e.lineno + ")");
    };
};

//
client.sendToWorker = function(action, data, on_finish, on_progress)
{
    if (!ww)
        initWW();

    var cbn;

    do
    {
        cbn = Math.floor(Math.random() * (10000000));
    } while(typeof callback_obj[cbn] !== "undefined");

    callback_obj[cbn] = {
        on_finish:   on_finish,
        on_progress: on_progress
        };

    ww.postMessage
    ({
        action: action,
        cbn:    cbn,
        data:   data
    });
};

return {
    action: action,
    worker: worker,
    client: client
};

});})(this);
