(function (root, undefined) {
define(["radi"], function (ra) {

'use strict';
var tp = {};

//
tp.pbarDOM = function(className)
{
    return ra.create
    (
        [
            [
                "style",
                {
                    innerHTML: ".tpbar\
                                {\
                                    flex: 1 1 10cm;\
                                    border: 2px solid black;\
                                    width: 100%;\
                                    max-width: 10cm;\
                                    height: .2cm;\
                                    margin: .2cm;\
                                    display: flex;\
                                    flex-direction: row;\
                                    justify-content: flex-start;\
                                    align-items: stretch;\
                                }\
                                .tp_indicator\
                                {\
                                    flex: 0 0 0%;\
                                    background-color: black;\
                                }\
                               "
                }
            ],
            [
                "div",
                {
                    className: "tpbar"
                },
                [
                    "div",
                    {
                        className: "tp_indicator",
                        id: "id_tp_indicator"
                    }
                ]
            ]
        ]
    );
};

return tp;

});})(this);
