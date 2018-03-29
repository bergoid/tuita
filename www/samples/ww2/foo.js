(function (root, undefined) {
define([], function () {

'use strict';
var foo = {};

var settings = {};
var defaults =
{
    initClass: 'js-foo',

    outputEnabled: true,
    logEnabled: true,
    infoEnabled: true,
    warnEnabled: true,
    errorEnabled: true
};

//
foo.destroy = function ()
{
    if ( !settings ) return;
    document.documentElement.classList.remove( settings.initClass );
    settings = null;
};

foo.init = function ( options )
{
    foo.destroy();
    settings = foo.extend( defaults, options || {} );
    document.documentElement.classList.add( settings.initClass );
};

foo.test = function()
{
    root.console.log("Hello from foo!");
};

if (document.getElementsByClassName)
{
    root.console.log("document.getElementsByClassName == true");
}

return foo;

});})(this);
