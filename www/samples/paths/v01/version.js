(function (root, undefined) {
define([],
function () {

'use strict';
var version = {};

//
version.go = function(dataString)
{
    if (dataString.length < 4)
    {
        window.console.error("Invalid data string: length<4");
        return;
    }

    var contextModule = "v" + dataString.substring(0,2) + "/c" + dataString.substring(2,4) + ".js";

    require(
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
return version;

});})(this);
