(function (root, undefined) {
define(["radi"], function (ra) {

'use strict';
var app = {};

//
app.go = function()
{
    // 0. test for debugging
//    ra.append
//    (
//        ra.body(),
//        "div",
//        {
//            id: "X",
//            innerHTML: "X"
//        },
//        [
//            [
//                "div",
//                {
//                    id: "Y",
//                    innerHTML: "Y"
//                }
//            ],
//            [
//                "div",
//                {
//                    id: "Z",
//                    innerHTML: "Z"
//                },
//            ]
//        ]
//    );
//
//    return;

    // A. Add element tree with 'crel()'.
    ra.append
    (
        ra.body(),
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

//    return;

    // B. Append second tree without calling 'crel()'
    ra.append
    (
        ra.body(),
        "div",
        {
            id: "B",
            innerHTML: "B"
        },
        [
            [
                "div",
                {
                    id: "BA",
                    innerHTML: "BA"
                },
                [
                    "div",
                    {
                        id: "BAA",
                        innerHTML: "BAA"
                    }
                ]
            ],
            [
                "div",
                {
                    id: "BB",
                    innerHTML: "BB"
                }
            ]
        ]
    );

    // C. Append a tree but leave out properties object in root element
    ra.append
    (
        ra.body(),
        "div",
        [
            [
                "div",
                {
                    id: "CA",
                    innerHTML: "CA"
                },
                [
                    "div",
                    {
                        id: "CAA",
                        innerHTML: "CAA"
                    }
                ]
            ],
            [
                "div",
                {
                    id: "CB",
                    innerHTML: "CB"
                }
            ]
        ]
    );

    // D. Single-child tree
    ra.append
    (
        ra.body(),
        "div",
        {
            id: "D",
            innerHTML: "D"
        },
        [
            "div",
            {
                id: "DA",
                innerHTML: "DA"
            },
            [
                "div",
                {
                    id: "DAA",
                    innerHTML: "DAA"
                }
            ]
        ]
    );

    // E. appendChildren()
    ra.append
    (
        ra.body(),
        [
            [
                "div",
                {
                    id: "E",
                    innerHTML: "E"
                }
            ],
            [
                "div",
                {
                    id: "I",
                    innerHTML: "I"
                }
            ]
        ]
    );
};

//
return app;

});})(this);
