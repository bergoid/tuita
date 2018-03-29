(function (root, undefined) {
define(["vn/tuitasplash", "vn/radi"], function (ts, ra) {

'use strict';
var context = {};

//
context.go = function(dataString)
{
    var lz64Module = "vn/" + ((!!root.Worker) ? "lz64" : "lz64i");

    ra.log("input: " + dataString.substring(4));
//    ra.log("input: " + compressed);

    ts.show();

    require(
        [lz64Module],
        function(lz64)
        {
            lz64.decompress
            (
    //                        compressed,
                dataString.substring(4),
                function(res, err)
                {
                    if (!!res)
                    {
//                        onProgress(100);
                        // TODO : eval decompressed text
                        ra.log("Decompressed result: " + res);
                        ra.body().appendChild
                        (
                            ra.create
                            (
                                "textarea",
                                {
                                    value: res
                                }
                            )
                        );
                    }

                    if (!!err)
                        ra.log("Error: " + err);

                    ts.hide();
                },
                function(progessFraction)
                {
                    var percent = progessFraction * 100;
                    ts.progress(percent);
//                    ra.el("id_tp_indicator").style.flexBasis = "" + percent + "%";
                    ra.log("progress: " + percent + "%");
                }
            );

//            ts.show
//            (
//                // Function to call when splash css has finished loading:
//                function(onProgress)
//                {
//                }
//            );
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
