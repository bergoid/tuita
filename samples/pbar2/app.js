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
            className: "pbarRow"
        },
        [
            "div",
            {
                className: "pbarTextCell",
                innerHTML: "Loading app ..."
            }
        ]
    );
};

//
var pbarDOM = function()
{
    return ra.crel
    (
        "div",
        {
            className: "pbarRow"
        },
        [
            "div",
            {
                className: "pbarCell"
            },
            [
                "div",
                {
                    className: "pbar"
                }
            ]
        ]
    );
};

//
var pageDOM = function()
{
    return ra.crel
    (
        "div",
        {
            className: "outerTable"
        },
        [
            "div",
            {
                className: "outerCell"
            },
            [
                "div",
                {
                    className: "innerTable"
                },
                [
                    pbarTextDOM(),
                    pbarDOM()
                ]
            ]
        ]
    );
};

//
app.go = function()
{
    ra.body().appendChild(pageDOM());
};

//
return app;

});})(this);
