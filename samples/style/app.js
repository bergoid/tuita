(function (root, undefined) {
define(["radi"], function (ra) {

'use strict';
var app = {};

//
app.go = function()
{
    ra.log("Hello from style!");

    ra.body().appendChild
    (
        ra.crel
        (
            "style",
            {
                type: "text/css",
                innerHTML: ".borderedDiv { border: 2px solid black; }"
            }
        )
    );

    ra.addClass(ra.body(), "borderedDiv");

    ra.body().appendChild
    (
        ra.crel
        (
            "div",
            {
                id: "A",
                innerHTML: "A"
            },
            [
                [
                    "div",
                    {
                        id: "AA",
                        innerHTML: "AA"
                    },
                    [
                        "div",
                        {
                            id: "AAA",
                            className: "borderedDiv",
                            innerHTML: "AAA"
                        }
                    ]
                ],
                [
                    "div",
                    {
                        id: "AB",
                        innerHTML: "AB"
                    }
                ]
            ]
        )
    );
};

//
return app;

});})(this);
