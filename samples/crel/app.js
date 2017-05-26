(function (root, undefined) {
define(["radi"], function (ra) {

'use strict';
var app = {};

//
app.go = function()
{
    ra.log("Hello from crel!");

    ra.body().appendChild
    (
        ra.crel
        (
            "div",
            {
                id: "A"
            },
            [
                [
                    "div",
                    {
                        id: "AA"
                    },
                    [
                        "div",
                        {
                            id: "AAA"
                        }
                    ]
                ],
                [
                    "div",
                    {
                        id: "AB"
                    }
                ]
            ]
        )
    );
};

//
return app;

});})(this);
