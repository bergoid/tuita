(function (root, undefined) {
define(['radi'], function (ra) {

'use strict';
var fl = {};

var dirClass = {
    column: "flTrack flColumn",
    row: "flTrack flRow"
};

var splitterClass = {
    column: "flSplitter flHorizontal",
    row: "flSplitter flVertical"
};

var dim = {
    column: "height",
    row: "width"
};

fl.css = function()
{
    return ra.create
    (
        "style",
        {
            type: "text/css",
            innerHTML: "\
            .flTrack\
            {\
                display: flex;\
                flex-grow: 1;\
                flex-shrink: 1;\
                flex-basis: 0px;\
            }\
            .flRow\
            {\
                flex-flow: row nowrap;\
            }\
            .flColumn\
            {\
                flex-flow: column nowrap;\
            }\
            .flPanel\
            {\
                flex-grow: 1;\
                flex-shrink: 1;\
                flex-basis: 0px;\
            }\
            .flSplitter\
            {\
                flex-grow: 0;\
                flex-shrink: 0;\
                background-color: #C0C0C0;\
            }\
            .flSplitter:hover\
            {\
                background-color: #E0E0E0;\
            }\
            .flHorizontal\
            {\
                min-width: 100%;\
                flex-basis: 8px;\
                cursor: row-resize;\
            }\
            .flVertical\
            {\
                flex-basis: 8px;\
                min-height: 100%;\
                cursor: col-resize;\
            }\
            "
        }
    );
};

//
var enableGrow = function(rootElem)
{
    if ( (ra.hasClass(rootElem, "flTrack")) )
    {
        var dir = getComputedStyle(rootElem)["flex-direction"];

        // Store size of panels in array
        var sizes = [];
        ra.forEach
        (
            rootElem.children,
            function(elem)
            {
                if (!ra.hasClass(elem, "flSplitter"))
                    sizes.push(parseInt(getComputedStyle(elem)[dim[dir]], 10));
            }
        );

        // Set grow factor of panels to their respective proportional size
        var sum = sizes.reduce(function(a, b) { return a + b; });
        ra.forEach
        (
            rootElem.children,
            function(elem, i)
            {
                if (!ra.hasClass(elem, "flSplitter"))
                {
                    setFlex(elem, sizes[i/2]/sum, sizes[i/2]/sum, 0);
                    enableGrow(elem);
                }
            }
        );
    }
};

//
var setFlex = function(elem, grow, shrink, basis)
{
    if (!elem)
        return;

    elem.style.flex = "" + grow + " " + shrink + " " + basis + "px";
}

//
var createSplitter = function(dir, prevPanel)
{
    var lastPos;
    var isDragging = false;
    var nextPanel;

    var element =  ra.create
    (
        "div",
        {
            className: splitterClass[dir]
        }
    );

    var setNextPanel = function(np)
    {
        nextPanel = np;
    };

    var getPos = function(evt)
    {
        return (dir == "column") ? evt.clientY : evt.clientX;
    };

    //
    var drag = function(evt)
    {
        var sizeDiff = getPos(evt) - lastPos;

        var oldSizePrev = parseInt(getComputedStyle(prevPanel)[dim[dir]], 10);
        var oldSizeNext = parseInt(getComputedStyle(nextPanel)[dim[dir]], 10);

        var newSizePrev =  oldSizePrev + sizeDiff;
        var newSizeNext =  oldSizeNext - sizeDiff;

        if ( (newSizePrev<20) || (newSizeNext<20) )
            return;

        if (!isDragging)
        {
            isDragging = true;

            element.parentNode && element.parentNode.children && ra.forEach
            (
                element.parentNode.children,
                function(elem)
                {
                    if (!ra.hasClass(elem, "flSplitter"))
                        elem.flStoredSize = parseInt(getComputedStyle(elem)[dim[dir]], 10);
                }
            );

            element.parentNode && element.parentNode.children && ra.forEach
            (
                element.parentNode.children,
                function(elem)
                {
                    if (!ra.hasClass(elem, "flSplitter"))
                        setFlex(elem, 0, 0 , elem.flStoredSize);
                }
            );
        }

        setFlex(prevPanel, 0, 0, newSizePrev);
        setFlex(nextPanel, 0, 0, newSizeNext);

        lastPos = getPos(evt);
    };

    //
    var endDrag = function()
    {
        isDragging = false;

        root.removeEventListener('mousemove', drag);
        root.removeEventListener('mouseup', endDrag);

        element.parentNode && enableGrow(element.parentNode);
    };

    //
    element.addEventListener
    (
        'mousedown',
        function(evt)
        {
            evt.preventDefault();    // prevent text selection
            lastPos = getPos(evt);
            root.addEventListener('mousemove', drag);
            root.addEventListener('mouseup', endDrag);
        }
    );

    //
    return {
        element: element,
        setNextPanel : setNextPanel
    };

};

//
var setCustomClass = function(elem, layoutChildren)
{
    // If the array of layoutChildren starts with a literal string,
    // pop it from the array and add its contents to the
    // elem's classes.
    if (layoutChildren.length && (layoutChildren.length > 0) && (typeof layoutChildren[0] === "string"))
        ra.addClass(elem, layoutChildren.splice(0,1)[0]);
};

//
fl.build = function(container, layout)
{
    if ((layout.srow) || (layout.scol))
    {
        var dir = (layout.srow) ? "row" : "column";
        var layoutChildren = (layout.srow) ? layout.srow : layout.scol;

        var trackElem = ra.append
        (
            container,
            [
                "div",
                {
                    className: dirClass[dir]
                }
            ]
        );

        setCustomClass(trackElem, layoutChildren);

        var splitter = undefined;

        ra.forEach
        (
            layoutChildren,
            function(layoutChild, index)
            {
                var elemChild;

                elemChild = fl.build(trackElem, layoutChild);

                if (index>0)
                {
                    splitter.setNextPanel(elemChild);
                }

                if (index<layoutChildren.length-1)
                {
                    splitter = createSplitter(dir, elemChild);
                    trackElem.appendChild(splitter.element);
                }
            }
        );

        return trackElem;
    }
    else
        if ((layout.row) || (layout.col))
        {
            var dir = (layout.row) ? "row" : "column";
            var layoutChildren = (layout.row) ? layout.row : layout.col;

            var trackElem = ra.append
            (
                container,
                [
                    "div",
                    {
                        className: dirClass[dir]
                    }
                ]
            );

            setCustomClass(trackElem, layoutChildren);

            ra.forEach
            (
                layoutChildren,
                function(layoutChild)
                {
                    fl.build(trackElem, layoutChild);
                }
            );

            return trackElem;
        }
        else
            return ra.append(container, layout);
};

//
return fl;

});})(this);
