(function (root, undefined) {
define(["radi", "tuitasplash"], function (ra, ts) {

'use strict';
var app = {};

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
    ts.show();

    progressTimer.start
    (
        function(progress)
        {
            ra.el("id_tp_indicator").style.flexBasis = "" + progress + "%";
        },
        1000
    );
};

//
return app;

});})(this);
