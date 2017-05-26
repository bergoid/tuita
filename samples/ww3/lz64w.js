(function(){

var action_compress   = 1,
    action_decompress = 2,
    action_progress   = 3,
    action_finish     = 4;

var ww = {};

importScripts('require.js');

self.onmessage = function(e)
{
    require
    (
        ["lz64i"],
        function(lz64i)
        {
            if (ww.onFinish == undefined)
            {
                ww.onFinish = function(cbn, res, err)
                {
                    postMessage
                    ({
                        action: action_finish,
                        cbn: cbn,
                        result: res,
                        error: err
                    });
                };

                ww.onProgress = function(cbn, percent)
                {
                    postMessage
                    ({
                        action: action_progress,
                        cbn: cbn,
                        percent
                    });
                };
            }

            if (e && e.data)
            {
                switch (e.data.action)
                {
                    case action_decompress:

                        lz64i.decompress(
                            e.data.data,
                            function (res, err)
                            {
                                ww.onFinish(e.data.cbn, res, err);
                            },
                            function (percent)
                            {
                                ww.onProgress(e.data.cbn, percent);
                            }
                            );

//                        console.log("lz64w: received message e.data.action == action_decomress");
                        break;

                    case action_compress:
                        lz64i.compress(
                            e.data.data,
                            function (res, err)
                            {
                                ww.onFinish(e.data.cbn, res, err);
                            },
                            function (percent)
                            {
                                ww.onProgress(e.data.cbn, percent);
                            }
                            );
//                        console.log("lz64w: received message e.data.action == action_comress");
                        break;

                    default:
//                        console.log("lz64w: received message e.data.action == " + e.data.action);
                        break;
                }
            }
        },
        function(err)
        {
            console.error("Error while loading modules");
            console.error(err);
        }
    );
};


})();
