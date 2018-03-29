(function (root, undefined) {
define(['radi', 'flexlayout'], function (ra, fl) {

'use strict';
var app = {};

var container = undefined;

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
                innerHTML: "A"
            }
        ],
        [
            "div",
            {
                innerHTML: "B"
            }
        ],
        [
            "div",
            {
                innerHTML: "C"
            }
        ],
        {
            row:
            [
                [
                    "div",
                    {
                        innerHTML: "D1"
                    }
                ],
                [
                    "div",
                    {
                        innerHTML: "D2"
                    }
                ],
                [
                    "div",
                    {
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
    var container = containerDOM();
    ra.append
    (
        ra.body(),
        [
            fl.css(),
            container,
        ]
    );
    fl.build(container, layout);
};

//
return app;

});})(this);
