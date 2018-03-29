(function (root, undefined) {
define(["vn/lz64w"], function (lz64w) {

'use strict';
var lz64 = {};

//
lz64.compress = function(input, on_finish, on_progress)
{
    lz64w.client.sendToWorker(lz64w.action.compress, input, on_finish, on_progress);
};

//
lz64.decompress = function(input, on_finish, on_progress)
{
    lz64w.client.sendToWorker(lz64w.action.decompress, input, on_finish, on_progress);
};

//
return lz64;

});})(this);
