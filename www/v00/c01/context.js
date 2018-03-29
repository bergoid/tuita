(function (root, undefined) {
define(["vn/radi", "ct/fsm", "ct/flexlayout", "ct/splitbox", "vn/tuitasplash", "vn/" + ((!!root.Worker) ? "lz64" : "lz64i")], function (ra, fsm, fl, sb, ts, lz64) {

'use strict';
var context = {};

var containerDOM  = function()
{
    return ra.create
    (
        "div",
        {
            id: "idContainer",
            className: "container"
        }
    );
};

var panesDOM() = function()
{
    var panesLayout = {
        row:
        [
            [
                "div",
                {
                    innerHTML: "L pane"
                }
            ],
            [
                "div",
                {
                    innerHTML: "R pane"
                }
            ]

        ]
    };

    var panes = ra.create("div");
    return sb.build(panes, layout);
};

var buildUI = function()
{
    //
    var layout =
    {
        column:
        [
            panesDOM(),
            {
                row:
                [
                    [
                        "div",
                        {
                            innerHTML: "progress bar"
                        }
                    ],
                    [
                        "div",
                        {
                            innerHTML: "message"
                        }
                    ]
                ]
            }
        ]
    };

    var container = ra.create
    (
        "div",
        {
            id: "idContainer",
            className: "container"
        }

    );

    ra.append
    (
        ra.body(),
        [
            fl.css(),
            [
                "style",
                {
                    type: "text/css",
                    innerHTML: ""
                }
            ],
            container
        ]
    );

    fl.build(container, layout);

};

//
context.go = function(dataString)
{
    ra.log("input: " + dataString.substring(4));

    ts.show();

    lz64.decompress
    (
        dataString.substring(4),
        function(res, err)
        {
            if (!!res)
            {
                ts.hide();

                buildUI();

                ra.log("Decompressed result: " + res);

//                ra.body().appendChild
//                (
//                    ra.create
//                    (
//                        "textarea",
//                        {
//                            value: res
//                        }
//                    )
//                );
            }

            if (!!err)
                ra.log("Error: " + err);
        },
        function(progessFraction)
        {
            var percent = progessFraction * 100;
            ts.progress(percent);
            //                    ra.log("progress: " + percent + "%");
        }
    );
};

//
return context;

});})(this);
