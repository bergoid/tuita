(function (root, undefined) {
define(["vn/radi", "vn/tuitaprogress"], function (ra, tp) {

'use strict';
var ts = {};

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
                                .ts_body\
                                {\
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
                                }\
                                .ts_text\
                                {\
                                    flex: 0 0 auto;\
                                    margin: .2cm;\
                                    margin-bottom: 0;\
                                }\
                                .ts_pbarWrapper\
                                {\
                                    flex: 0 0 auto;\
                                    width: 100%;\
                                    display: flex;\
                                    flex-direction: row;\
                                    justify-content: center;\
                                    align-items: center;\
                                }\
                                "
                }
            ],
            [
                "div",
                {
                    classname: "ts_text",
                    innerHTML: "unpacking app ..."
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

ts.progress = function(progress)
{
    progress = Math.max(progress, 0);
    progress = Math.min(progress, 100);
    ra.el("id_tp_indicator").style.flexBasis = "" + progress + "%";
};

//
ts.hide = function()
{
    ra.deleteChildren(ra.body());
    ra.removeClass(ra.body(), "ts_body");
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
