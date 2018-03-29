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

    // A. Add element tree with 'create()'.
    ra.append
    (
        ra.body(),
        ra.create
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

    // B. Append second tree without calling 'create()'
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
                    id: "F",
                    innerHTML: "F"
                }
            ]
        ]
    );

    // G. append array of 1 HTML element
    ra.append
    (
        ra.body(),
        [
            ra.create
            (
                "div",
                {
                    id: "G",
                    innerHTML: "G"
                }
            )
        ]
    );

    // H. append array of HTML elements
    ra.append
    (
        ra.body(),
        [
            ra.create
            (
                "div",
                {
                    id: "G1",
                    innerHTML: "G1"
                }
            ),
            ra.create
            (
                "div",
                {
                    id: "G2",
                    innerHTML: "G2"
                }
            ),
            ra.create
            (
                "div",
                {
                    id: "G3",
                    innerHTML: "G3"
                }
            )
        ]
    );

    // I. append array of 1 string
    ra.append
    (
        ra.body(),
        [
            "div"
        ]
    );
};

//
return app;

});})(this);
