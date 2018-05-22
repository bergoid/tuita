(function (root, undefined) {
define(['vn/radi'], function (ra) {

'use strict';
var fl = {};

//
fl.css = function()
{
    return ra.create
    (
        "style",
        {
            type: "text/css",
            innerHTML: "\
                .flRow\
                {\
                        display: flex;\
                        flex-flow: row nowrap;\
                }\
                .flColumn\
                {\
                        display: flex;\
                        flex-flow: column nowrap;\
                }\
                "
        }
    );
};

//
fl.build = function(container, layout)
{
    if ((layout.row) || (layout.column))
    {
        var children = (layout.row) ? layout.row : layout.column;

        var parent = ra.append
        (
            container,
            [
                "div",
                {
                    className: (layout.row) ? "flRow" : "flColumn"
                }
            ]
        );

        ra.forEach
        (
            children,
            function(child)
            {
                fl.build(parent, child);
            }
        );
    }
    else
        ra.append(container, layout);

    return container;
return fl;

});})(this);
