(function (root, undefined) {
define(['radi'], function (ra) {

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
                        flex-grow: 1;\
                }\
                .flColumn\
                {\
                        display: flex;\
                        flex-flow: column nowrap;\
                        flex-grow: 1;\
                }\
                .flPanel\
                {\
                    flex-grow: 1;\
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

        // If the array of children starts with a literal string,
        // pop it from the array and add its contents to the
        // parent's classes.
        if (children.length && (typeof children[0] === "string"))
            ra.addClass(parent, children.splice(0,1)[0]);

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
};

//
return fl;

});})(this);
