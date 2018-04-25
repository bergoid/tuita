(function (root, undefined) {
define(['radi', 'flexlayout'], function (ra, fl) {

'use strict';
var app = {};

var container = undefined;

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
                .leaf\
                {\
                    flex-grow: 1;\
                    border: 1px solid #8080ff;\
                }\
                "
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
            id: "idContainer",
            className: "container"
        }
    );
};

//
var layout =
{
    column:
    [
        [
            "div",
            {
                className: "leaf",
                innerHTML: "A"
            }
        ],
        [
            "div",
            {
                className: "leaf",
                innerHTML: "B"
            }
        ],
        [
            "div",
            {
                className: "leaf",
                innerHTML: "C"
            }
        ],
        {
            row:
            [
                [
                    "div",
                    {
                        className: "leaf",
                        innerHTML: "D1"
                    }
                ],
                [
                    "div",
                    {
                        className: "leaf",
                        innerHTML: "D2"
                    }
                ],
                [
                    "div",
                    {
                        className: "leaf",
                        innerHTML: "D3"
                    }
                ],
            ]
        }
    ]
};

//
app.go = function(state)
{
    ra.append
    (
        ra.body(),
        [
            bodyCss(),
            fl.css()
        ]
    );

//    fl.build(container, layout);
    fl.build(ra.body(), layout);
};

//
return app;

});})(this);
