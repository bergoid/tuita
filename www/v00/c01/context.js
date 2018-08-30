(function (root, undefined) {
define(["vn/radi", "ct/fsm", "ct/flexlayout", /*"vn/tuitasplash",*/ "vn/" + ((!!root.Worker) ? "lz64" : "lz64i")], function (ra, fsmlib, fl, /*ts,*/ lz64) {

'use strict';
var context = {};

var progressBar = ra.createProgressBar("idProgressBar", "flexChild progressBar", "progressIndicator");

var fsm = fsmlib.create("fsm", [ "null", "Ready", "Compressing", "Decompressing" ]);

//
fsm.transition["null"]["Ready"] = function()
{
    ra.log("Hello");
};

//
fsm.transition["Ready"]["Compressing"] = function()
{
    ra.showElement(progressBar.element, true);

    ra.enableElement(ra.el("idCompressButton"), false);
    ra.enableElement(ra.el("idDecompressButton"), false);

    ra.el("idPlainText").readonly = true;
    ra.el("idCompressedText").readonly = true;
};

//
fsm.transition["Ready"]["Decompressing"] = function()
{
    ra.showElement(progressBar.element, true);

    ra.enableElement(ra.el("idCompressButton"), false);
    ra.enableElement(ra.el("idDecompressButton"), false);

    ra.el("idPlainText").readonly = true;
    ra.el("idCompressedText").readonly = true;
};

//
fsm.transition["Compressing"]["Ready"] = function()
{
    ra.showElement(progressBar.element, false);

    ra.enableElement(ra.el("idCompressButton"), true);
    ra.enableElement(ra.el("idDecompressButton"), true);

    ra.el("idPlainText").readonly = false;
    ra.el("idCompressedText").readonly = false;
};

//
fsm.transition["Decompressing"]["Ready"] = function()
{
    ra.showElement(progressBar.element, false);

    ra.enableElement(ra.el("idCompressButton"), true);
    ra.enableElement(ra.el("idDecompressButton"), true);

    ra.el("idPlainText").readonly = false;
    ra.el("idCompressedText").readonly = false;
};

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
                border: 0;\
                padding: 0;\
                overflow: hidden;\
                background-color: #606060;\
                font-family: sans-serif;\
            }\
            textarea\
            {\
                resize: none;\
                border: none;\
                padding: 0.2em;\
            }\
            .container\
            {\
                flex-grow: 1;\
                margin: 0.5em;\
                background-color: #FFFFFF;\
            }\
            .flexColumn\
            {\
                display: flex;\
                flex-flow: column nowrap;\
            }\
            .flexRow\
            {\
                display: flex;\
                flex-flow: row nowrap;\
            }\
            .flexChild\
            {\
                flex-grow: 1;\
                flex-shrink: 1;\
            }\
            .fitChild\
            {\
                flex-grow: 0;\
                flex-shrink: 0;\
            }\
            .verSplitter\
            {\
                flex-grow: 0;\
                flex-shrink: 0;\
                background-color: #606060;\
            }\
            .verSplitter:hover\
            {\
                background-color: #808080;\
            }\
            .toolpanel\
            {\
                background-color: #606060;\
                color: #FFFFFF;\
                padding: 0.5em;\
            }\
            .compresspanel\
            {\
            }\
            .decompresspanel\
            {\
            }\
            .visible\
            {\
                visibility: visible;\
            }\
            .invisible\
            {\
                visibility: hidden;\
            }\
            .floatright\
            {\
                float: right;\
            }\
            .progressBar\
            {\
                border-color: #F9B256;\
                border-width: 3px;\
                visibility: hidden;\
            }\
            .progressIndicator\
            {\
                background-color: #F9B256;\
                visibility: hidden;\
            }\
            .button\
            {\
                margin: 0 auto;\
                display: table;\
                margin-left: 0.2em;\
                margin-right: 0.2em;\
            }\
            .button>a,.button>span\
            {\
                padding: 1.0em;\
                text-decoration:none;\
                display: table-cell;\
            }\
            .button.enabled>a\
            {\
                background-color: #90D0E0;\
                color: #000000;\
            }\
            .button.enabled>a:hover\
            {\
                background-color: #A0E0FF;\
                color: #000000;\
            }\
            .button.enabled.selected>a:hover\
            {\
                background-color: #A0E0FF;\
            }\
            .button.enabled.selected>a\
            {\
                background-color: #90D0E0;\
            }\
            .button.enabled>a:focus\
            {\
                outline: 3px solid transparent;\
            }\
            .button.disabled>span\
            {\
                background-color: #E0E0E0;\
                color: #000000;\
            }\
            .button.disabled.selected>span\
            {\
                background-color: #E0E0E0;\
                color: #000000;\
            }\
            "
        }
    );
};

//
var flexDOM = function(content, extraClasses)
{
    var className = "flexChild";

    if (extraClasses)
        className += " " + extraClasses;

    return ra.create
    (
        "div",
        {
            className: className,
            innerHTML: content
        }
    );
};

//
var containerDOM = function()
{
    return ra.create
    (
        "div",
        {
            className: "container flexColumn"
        }
    );
};

//
var compressDOM = function()
{
    return ra.create
    (
        "div",
        {
            className: "fitChild toolpanel compresspanel",
        },
        [
            ra.styledButton("idCompressButton", "Compress -->", function(){/*onclick*/}, true, "button floatright", "Compress (LZMA) the text in the left pane and show the result in the right pane (encoded with a base64 variant).")
        ]
    );
};

//
var decompressDOM = function()
{
    return ra.create
    (
        "div",
        {
            className: "fitChild toolpanel decompresspanel",
        },
        [
            ra.styledButton("idDecompressButton", "<-- Decompress", function(){/*onclick*/}, true, "button", "Decompress the encoded text in the right pane and show the plaintet result in the left pane.")
        ]
    );
};

//
var plaintextDOM = function()
{
    return ra.create
    (
        "textarea",
        {
            id: "idPlainText",
            className: "flexChild",
            placeholder: "plaintext"
        }
    );
};

//
var compressedtextDOM = function()
{
    return ra.create
    (
        "textarea",
        {
            id: "idCompressedText",
            className: "flexChild",
            placeholder: "compressed text"
        }
    );
};

//
var progressDOM = function()
{
    return ra.create
    (
        "div",
        {
            className: "flexChild flexColumn toolpanel"
        },
        [
            progressBar.element
        ]
    );
};

var buildUI = function()
{
    //
    var layout =
    {
        col:
        [
            {
                srow:
                [
                    {
                        splitterClasses: "verSplitter"
                    },
                    {
                        col:
                        [
                            compressDOM(),
                            plaintextDOM(),
                            flexDOM("size of plaintext", "fitChild toolpanel")
                        ]
                    },
                    {
                        col:
                        [
                            decompressDOM(),
                            compressedtextDOM(),
                            flexDOM("size of compressed text", "fitChild toolpanel")
                        ]
                    },
                ]
            },
            {
                row:
                [
                    "fitChild",
                    progressDOM(),
                    flexDOM("Message", "toolpanel")
                ]
            }
        ]
    };

    var container = containerDOM();

    ra.append
    (
        ra.body(),
        [
            fl.css(),
            bodyCss(),
            container
        ]
    );

    fl.build(container, layout);
};

//
context.go = function(dataString)
{
    var compressedData = dataString.substring(4);
    var decompressedResult = "";

    ra.log("Current state == " + fsm.getCurrentState());
    ra.log("Compressed data == " + compressedData);

    buildUI();

//    ra.log("input: " + compressedData);

    ra.el("idCompressedText").value = compressedData;

    fsm.gotoState("Ready");
    fsm.gotoState("Compressing");

//    lz64.decompress
//    (
//        compressedData,
//        function(res, err)
//        {
//            if (!!res)
//            {
//                ra.showElement(progressBar.element, false);
//
//                decompressedResult = res;
//
//                ra.log("Decompressed result: " + decompressedResult);
//            }
//
//            if (!!err)
//                ra.log("Error: " + err);
//        },
//        function(progessFraction)
//        {
//            var percent = progessFraction * 100;
//            progressBar.setProgress(30);
//        }
//    );
};

//
return context;

});})(this);
