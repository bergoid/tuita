(function (root, undefined) {
define(["vn/radi", "ct/fsm", "ct/flexlayout", "ct/splitbox", "vn/tuitasplash", "vn/" + ((!!root.Worker) ? "lz64" : "lz64i")], function (ra, fsm, fl, sb, ts, lz64) {

'use strict';
var context = {};

//
var bodyCss = function()
{
    return ra.create
    (
        "style",
        {
            type: "text/css",
            innerHTML: "\
            body\
            {\
                display: flex;\
                flex-flow: column nowrap;\
                height: 100vh;\
                max-height: 100vh;\
                margin: 0;\
                padding: 1em;\
                overflow: hidden;\
            }\
            .plainTextArea\
            {\
                flex-grow: 1;\
            }\
            .compressedTextArea\
            {\
                flex-grow: 1;\
            }\
            .bottomElement\
            {\
                flex-grow: 1;\
                border: 1px solid #8080ff;\
            }\
            "
        }
    );
};

//
var LPaneDOM = function()
{
    var lPaneLayout = {
        column:
        [
            [
                "div",
                {
                    innerHTML: "<-- decompress"
                }
            ],
            [
                "div",
                {
                    className: "compressedTextArea",
                    innerHTML: "L pane"
                }
            ],
            [
                "div",
                {
                    innerHTML: "Size of plaintext"
                }
            ]

        ]
    };

    var lPane = ra.create("div");
    return fl.build(lPane, lPaneLayout);
};

//
var RPaneDOM = function()
{
    var rPaneLayout = {
        column:
        [
            [
                "div",
                {
                    innerHTML: "compress -->"
                }
            ],
            [
                "div",
                {
                    className: "plainTextArea",
                    innerHTML: "R pane"
                }
            ],
            [
                "div",
                {
                    innerHTML: "Size of compressed text"
                }
            ]

        ]
    };

    var rPane = ra.create("div");
    return fl.build(rPane, rPaneLayout);
};

//
var panesDOM = function()
{
    var panesLayout = {
        row:
        [
            RPaneDOM(),
            LPaneDOM()
        ]
    };

    var panes = ra.create("div");
    return sb.build(panes, panesLayout);
};

var buildUI = function(decompressedResult)
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
                            className: "bottomElement",
                            innerHTML: "progress bar"
                        }
                    ],
                    [
                        "div",
                        {
                            className: "bottomElement",
                            innerHTML: "message"
                        }
                    ]
                ]
            }
        ]
    };

    ra.append
    (
        ra.body(),
        [
            fl.css(),
            sb.css(),
            bodyCss(),
        ]
    );

    fl.build(ra.body(), layout);

};

//
context.go = function(dataString)
{
    var compressedData = dataString.substring(4);
    var decompressedResult = "";

    if (compressedData.length > 0)
    {
        ra.log("input: " + compressedData);

        ts.show();

        lz64.decompress
        (
            compressedData,
            function(res, err)
            {
                if (!!res)
                {
                    ts.hide();

                    decompressedResult = res;

                    ra.log("Decompressed result: " + decompressedResult);

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
    }

    buildUI(decompressedResult);

};

//
return context;

});})(this);
