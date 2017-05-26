(function (root, undefined) {
define(["v00/radi", "v00/tuitaprogress"], function (ra, tp) {

'use strict';
var ts = {};

//
//var bodyStyle = function()
//{
//    return ra.create
//    (
//        "style",
//        {
//            innerHTML: "\
//                        font-family: sans-serif;\
//                        display: flex;\
//                        flex-direction: column;\
//                        justify-content: center;\
//                        align-items: center;\
//                        height: 100vh;\
//                        max-height: 100vh;\
//                        width: 100vw;\
//                        max-width: 100vw;\
//                        margin: 0;\
//                        "
//        }
//    );
//};
//
////
//var textdom = function()
//{
//    return ra.create
//    (
//        "div",
//        {
//            classname: "ts_text",
//            innerhtml: "unpacking app ..."
//        }
//    );
//};
//
////
//var pbarDOM = function()
//{
//    return ra.create
//    (
//        "div",
//        {
//            className: "ts_pbarWrapper"
//        },
//        [
//            tp.pbarDOM();
////            "div",
////            {
////                className: "ts_pbar"
////            },
////            [
////                "div",
////                {
////                    className: "ts_pbarIndicator",
////                    id: "ts_indicator"
////                }
////            ]
//        ]
//    );
//};

//
ts.show = function()
{
    ra.addClass(ra.body(), "ts_body");
    ra.append
    (
        ra.body(),
        [
            [
                "style",
                {
                    innerHTML: "\
                                font-family: sans-serif;\
                                display: flex;\
                                flex-direction: column;\
                                justify-content: center;\
                                align-items: center;\
                                height: 100vh;\
                                max-height: 100vh;\
                                width: 100vw;\
                                max-width: 100vw;\
                                margin: 0;\
                                "
                }
            ],
            [
                "div",
                {
                    classname: "ts_text",
                    innerhtml: "unpacking app ..."
                }
            ],
            [
                "div",
                {
                    className: "ts_pbarWrapper"
                },
                [
                    tp.pbarDOM()
                ]
            ]
        ]
    );
};

//    ra.body().appendChild(bodyStyle());
//    ra.body().appendChild(textDOM());
//    ra.body().appendChild(pbarDOM());

    // TODO : use more straightforward method
//    onCssLoaded
//    (
//        function(progress)
//        {
ts.onProgress = function(progress)
{
            progress = Math.max(progress, 0);
            progress = Math.min(progress, 100);
            ra.el("tp_indicator").style.flexBasis = "" + progress + "%";
};
//        }
//    );

//    ra.loadScript
//    (
//        "v00/tuitasplash.css",
//        function()
//        {
//            ra.addClass(ra.body(), "ts_body");
//            ra.body().appendChild(textDOM());
//            ra.body().appendChild(pbarDOM());
//            onCssLoaded
//            (
//                function(progress)
//                {
//                    progress = Math.max(progress, 0);
//                    progress = Math.min(progress, 100);
//                    ra.el("ts_indicator").style.flexBasis = "" + progress + "%";
//                }
//            );
//        },
//        "ts_idcss"

//
ts.hide = function()
{
    ra.deleteChildren(ra.body());
    ra.removeClass(ra.body(), "ts_body");
//    var cssElem = ra.el("ts_idcss");
//    cssElem && document.getElementsByTagName("head")[0].removeChild(cssElem);
};

//var progressTimer = function()
//{
//    var progress = 0;
//    var intervalID;
//    var onTickUser;
//
//    //
//    var onTick = function()
//    {
//        onTickUser && onTickUser(progress);
//
//        if (intervalID && (progress == 100))
//            root.clearInterval(intervalID);
//
//        progress++;
//    };
//
//    //
//    var start = function(fn, interval)
//    {
//        onTickUser = fn;
//        intervalID = root.setInterval(onTick, interval);
//    };
//
//    return {
//        start : start
//    };
//}();

return ts;

});})(this);
