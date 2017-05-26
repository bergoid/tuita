(function (root, undefined) {
define(["v00/tuitasplash", "v00/radi"], function (ts, ra) {

'use strict';
var context = {};

//
context.go = function(dataString)
{
    var lz64Module = "v00/" + ((!!root.Worker) ? "lz64i" : "lz64");

    console.log("input: " + dataString.substring(4));
//    console.log("input: " + compressed);

    require(
        [lz64Module],
        function(lz64)
        {
            ts.show
            (
                // Function to call when splash css has finished loading:
                function(onProgress)
                {
                    lz64.decompress
                    (
//                        compressed,
                        dataString.substring(4),
                        function(res, err)
                        {
                            if (!!res)
                            {
                                onProgress(100);
                                // TODO : eval decompressed text
                                console.log("Decompressed result: " + res);
                                ra.body().appendChild
                                (
                                    ra.crel
                                    (
                                        "textarea",
                                        {
                                            value: res
                                        }
                                    )
                                );
                            }

                            if (!!err)
                                console.log("Error: " + err);

                            ts.hide();
                        },
                        function(percent)
                        {
                            onProgress(percent*100);
                            console.log("progress: " + percent*100 + "%");
                        }
                    );
                }
            );
        },
        function(err)
        {
            root.console.error("Error loading module " + lz64Module);
        }
    );
};

//
return context;

});})(this);
