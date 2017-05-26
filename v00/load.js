(function (root, undefined) {
define([], function () {

'use strict';
var load = {};

//
load.go = function(dataString)
{
    if (dataString.length < 4)
    {
        window.console.error("Invalid data string: length<4");
        return;
    }

    var contextString = "c" + dataString.substring(2,4);
    var contextModule = "v00/" + contextString + "/load";

    require
    (
        [contextModule],
        function(context)
        {
            context.go(dataString);
        },
        function(err)
        {
            window.console.error("Error loading module " + contextModule);
        }
    );
};

//
return load;

});})(this);
