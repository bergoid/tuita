(function (root, undefined) {
define(["vn/tuitasplash", "vn/radi"], function (ts, ra) {

'use strict';
var context = {};

//
context.go = function(dataString)
{
    var lz64Module = "vn/" + ((!!root.Worker) ? "lz64i" : "lz64");

    console.log("input: " + dataString.substring(4));
//    console.log("input: " + compressed);

    require(
        [lz64Module],
        function(lz64)
        {
            ts.show();
            lz64.decompress
            (
//                        compressed,
                dataString.substring(4),
                function(res, err)
                {
                    // !!res : the decompression ended successfully
                    if (!!res)
                    {
//                        ts.onProgress(100);
                        ts.progress(100);
                        // TODO : eval decompressed text
                        console.log("Decompressed result: " + res);
                        ra.append
                        (
                            ra.body(),
                            "textarea",
                            {
                                value: res
                            }
                        );
                    }

                    // !!err : an error occurred during decompression
                    if (!!err)
                        console.log("Error: " + err);

                    ts.hide();
                },
                function(percent)
                {
//                    ts.onProgress(percent*100);
                    ts.progress(percent*100);
                    console.log("progress: " + percent*100 + "%");
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
