(function (root, undefined) {
define(["radi"], function (ra) {

'use strict';
var app = {};


//
var pbarTextDOM = function()
{
    return ra.crel
    (
        "div",
        {
            className: "ts_text",
            innerHTML: "Unpacking app ..."
        }
    );
};

//
var pbarDOM = function()
{
    return ra.crel
    (
        "div",
        {
            className: "ts_pbarWrapper"
        },
        [
            "div",
            {
                className: "ts_pbar"
            },
            [
                "div",
                {
                    className: "ts_pbarIndicator",
                    id: "ts_indicator"
                }
            ]
        ]
    );
};

//
var progressTimer = function()
{
    var progress = 0;
    var intervalID;
    var onTickUser;

    //
    var onTick = function()
    {
        onTickUser && onTickUser(progress);

        if (intervalID && (progress == 100))
            root.clearInterval(intervalID);

        progress++;
    };

    //
    var start = function(fn, interval)
    {
        onTickUser = fn;
        intervalID = root.setInterval(onTick, interval);
    };

    return {
        start : start
    };
}();

//
app.go = function()
{
    ra.addClass(ra.body(), "ts_body");
    ra.body().appendChild(pbarTextDOM());
    ra.body().appendChild(pbarDOM());

    progressTimer.start
    (
        function(progress)
        {
            ra.el("ts_indicator").style.flexBasis = "" + progress + "%";
        },
        1000
    );
};

//
return app;

});})(this);
