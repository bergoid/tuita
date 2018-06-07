(function (root, undefined) {
define(['radi', 'flexlayout'], function (ra, fl) {

'use strict';
var app = {};

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
                }\
                .smallCell\
                {\
                    flex-grow: 0;\
                    flex-basis: 20%;\
                }\
                .bigCell\
                {\
                    flex-grow: 0;\
                    flex-basis: 60%;\
                }\
                .leaf\
                {\
                    flex-grow: 1;\
                    flex-shrink: 1;\
                    border: 1px solid #8080ff;\
                }\
                .container\
                {\
                    display: flex;\
                    flex-flow: column nowrap;\
                    flex-grow: 1;\
                    margin: 1em;\
                    border: 2px solid #808080;\
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
            className: "container"
        }
    );
};

//
var leafDOM = function(content)
{
    return ra.create
    (
        "div",
        {
            className: "leaf",
            innerHTML: content
        }
    );
};


//
var layout =
{
    srow:
    [
        {
            scol:
            [
                leafDOM("A1"),
                leafDOM("A2"),
                leafDOM("A3")
            ]
        },
        {
            scol:
            [
                leafDOM("B"),
                {
                    srow:
                    [
                        leafDOM("C1"),
                        leafDOM("C2"),
                        leafDOM("C3")
                    ]
                },
                {
                    srow:
                    [
                        leafDOM("D"),
                        {
                            scol:
                            [
                                leafDOM("E1"),
                                leafDOM("E2"),
                                leafDOM("E3")
                            ]
                        },
                        leafDOM("D3")
                    ]
                }
            ]
        }
    ]
};

//
app.go = function(state)
{
    var container = containerDOM();

    ra.append
    (
        ra.body(),
        [
            bodyCss(),
            fl.css(),
            container
        ]
    );

    fl.build(container, layout);
};

//
return app;

});})(this);
