(function (root, undefined) {
define(["vn/radi", "ct/fsm", "ct/flexlayout", /*"vn/tuitasplash",*/ "vn/" + ((!!root.Worker) ? "lz64" : "lz64i")], function (ra, fsmlib, fl, /*ts,*/ lz64) {

'use strict';
var context = {};

var progressBar = ra.createProgressBar("idProgressBar", "flexChild progressBar", "progressIndicator");

var errorMessage = "";

////////////////////////////////////////
//                                    //
//          Helper functions          //
//                                    //
////////////////////////////////////////
//
var sizeFieldString = function(sizeInBytes)
{
    return "Size: " + ra.humanFileSize(sizeInBytes);
};

//
var setTextAreaValue = function(id, value)
{
    ra.el(id).value = value;
    ra.el(id + "Size").innerHTML = sizeFieldString(value.length);
};

//
var setInfoMessage = function(message)
{
    var el = ra.el("idMessage");

    if (!el)
        return;

    ra.removeClass(el, "invisible");
    ra.removeClass(el, "errorStyle");
    ra.addClass(el, "visible infoStyle");

    el.innerHTML = message;
};

//
var setReadyMessage = function()
{
    var el = ra.el("idMessage");

    if (!el)
        return;

    if (errorMessage.length > 0)
    {
        ra.removeClass(el, "invisible");
        ra.removeClass(el, "infoStyle");
        ra.addClass(el, "visible errorStyle");

        el.innerHTML = errorMessage;
        errorMessage = "";
    }
    else
    {
        ra.removeClass(el, "visible");
        ra.addClass(el, "invisible");

        el.innerHTML = "Placeholder";
    }

};

////////////////////////////////////////
//                                    //
//              CSS                   //
//                                    //
////////////////////////////////////////
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
            .infoStyle\
            {\
                color: #ffffff;\
                background-color: #00000000;\
            }\
            .errorStyle\
            {\
                color: #ffffff;\
                background-color: #c00000;\
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

////////////////////////////////////////
//                                    //
//          Event handlers            //
//                                    //
////////////////////////////////////////
//
var onInput = function(event, buttonId, sizeFieldId)
{
    ra.enableElement(ra.el(buttonId), (event.target.value.length != 0));
    ra.el(sizeFieldId).innerHTML = sizeFieldString(event.target.value.length);
};

////////////////////////////////////////
//                                    //
//              DOM                   //
//                                    //
////////////////////////////////////////
//
var flexDOM = function(id, content, extraClasses)
{
    var className = "flexChild";

    if (extraClasses)
        className += " " + extraClasses;

    return ra.create
    (
        "div",
        {
            id: id,
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
            ra.styledButton("idCompressButton", "Compress ==>", function(){ fsm.gotoState("Compressing"); }, false, "button floatright", "Compress (LZMA) the text in the left pane and show the result in the right pane (encoded with a base64 variant).")
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
            ra.styledButton("idDecompressButton", "<== Decompress", function(){ fsm.gotoState("Decompressing"); }, false, "button", "Decompress the encoded text in the right pane and show the plaintet result in the left pane.")
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
            placeholder: "plaintext",
            oninput: function(event) { onInput(event, "idCompressButton", "idPlainTextSize"); }
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
            placeholder: "compressed text",
            oninput: function(event) { onInput(event, "idDecompressButton", "idCompressedTextSize"); }
        }
    );
};

//
var messageDOM = function()
{
    var el = flexDOM("", "", "toolpanel");

    ra.append
    (
        el,
        "span",
        {
            id: "idMessage",
            className: "errorStyle"
        }
    );

    return el;
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

//
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
                            flexDOM("idPlainTextSize", sizeFieldString(0), "fitChild toolpanel")
                        ]
                    },
                    {
                        col:
                        [
                            decompressDOM(),
                            compressedtextDOM(),
                            flexDOM("idCompressedTextSize", sizeFieldString(0), "fitChild toolpanel")
                        ]
                    },
                ]
            },
            {
                row:
                [
                    "fitChild",
                    progressDOM(),
                    messageDOM()
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

////////////////////////////////////////
//                                    //
//                FSM                 //
//                                    //
////////////////////////////////////////
var fsm = fsmlib.create("fsm", [ "null", "Ready", "Compressing", "Decompressing" ]);

//
fsm.transition["null"]["Ready"] = function()
{
    buildUI();
};

//
fsm.transition["Ready"]["Compressing"] = function()
{
    setTextAreaValue("idCompressedText", "");

    ra.showElement(progressBar.element, true);

    ra.enableElement(ra.el("idCompressButton"), false);
    ra.enableElement(ra.el("idDecompressButton"), false);

    ra.el("idPlainText").readOnly = true;
    ra.el("idCompressedText").readOnly = true;

    setInfoMessage("Compressing ...");

    lz64.compress
    (
        ra.el("idPlainText").value,
        function(res, err)
        {
            if (!!res)
            {
                setTextAreaValue("idCompressedText", res);
                fsm.gotoState("Ready");
            }

            if (!!err)
            {
                ra.error(err);
                errorMessage = err;
            }

            fsm.gotoState("Ready");
        },
        function(progessFraction)
        {
            var percent = progessFraction * 100;
            progressBar.setProgress(30);
        }
    );
};

//
fsm.transition["Ready"]["Decompressing"] = function()
{
    setTextAreaValue("idPlainText", "");

    ra.showElement(progressBar.element, true);

    ra.enableElement(ra.el("idCompressButton"), false);
    ra.enableElement(ra.el("idDecompressButton"), false);

    ra.el("idPlainText").readOnly = true;
    ra.el("idCompressedText").readOnly = true;

    setInfoMessage("Decompressing ...");

    lz64.decompress
    (
        ra.el("idCompressedText").value,
        function(res, err)
        {
            if (!!res)
            {
                setTextAreaValue("idPlainText", res);
            }

            if (!!err)
            {
                ra.error(err);
                errorMessage = err;
            }

            fsm.gotoState("Ready");
        },
        function(progessFraction)
        {
            var percent = progessFraction * 100;
            progressBar.setProgress(30);
        }
    );
};

//
fsm.transition["Compressing"]["Ready"] = function()
{
    ra.showElement(progressBar.element, false);

    ra.enableElement(ra.el("idCompressButton"), true);
    ra.enableElement(ra.el("idDecompressButton"), true);

    ra.el("idPlainText").readOnly = false;
    ra.el("idCompressedText").readOnly = false;

    setReadyMessage();
};

//
fsm.transition["Decompressing"]["Ready"] = function()
{
    ra.showElement(progressBar.element, false);

    ra.enableElement(ra.el("idCompressButton"), true);
    ra.enableElement(ra.el("idDecompressButton"), true);

    ra.el("idPlainText").readOnly = false;
    ra.el("idCompressedText").readOnly = false;

    setReadyMessage();
};

////////////////////////////////////////
//                                    //
//              go()                  //
//                                    //
////////////////////////////////////////
//
context.go = function(dataString)
{
    var compressedData = dataString.substring(4);

    fsm.gotoState("Ready");

    if (compressedData.length > 0)
    {
        setTextAreaValue("idCompressedText", compressedData);
        fsm.gotoState("Decompressing");
    }
};

//
return context;

});})(this);
