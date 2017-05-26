// Adapted from lzma.js :
//
//! © 2015 Nathan Rugg <nmrugg@gmail.com> | MIT
//Permission is hereby granted, free of charge, to any person obtaining
//a copy of this software and associated documentation files (the
//    "Software"), to deal in the Software without restriction, including
//without limitation the rights to use, copy, modify, merge, publish,
//    distribute, sublicense, and/or sell copies of the Software, and to
//permit persons to whom the Software is furnished to do so, subject to
//the following conditions:
//
//    The above copyright notice and this permission notice shall be
//included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
//    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
//MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
//LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
//OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
//WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


(function (root, undefined) {
define([], function () {

'use strict';
var action_compress   = 1,
    action_decompress = 2,
    action_progress   = 3,

    callback_obj = {},

    ///NOTE: Node.js needs something like "./" or "../" at the beginning.
    lzma_worker = new Worker("v00/lzma/lzma_worker.js");

lzma_worker.onmessage = function onmessage(e) {
    if (e.data.action === action_progress) {
        if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_progress === "function") {
            callback_obj[e.data.cbn].on_progress(e.data.result);
        }
    } else {
        if (callback_obj[e.data.cbn] && typeof callback_obj[e.data.cbn].on_finish === "function") {
            callback_obj[e.data.cbn].on_finish(e.data.result, e.data.error);

            /// Since the (de)compression is complete, the callbacks are no longer needed.
            delete callback_obj[e.data.cbn];
        }
    }
};

/// Very simple error handling.
lzma_worker.onerror = function(event) {
    var err = new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");

    for (var cbn in callback_obj) {
        callback_obj[cbn].on_finish(null, err);
    }

    console.error('Uncaught error in lzma_worker', err);
};

return (function () {

    function send_to_worker(action, data, mode, on_finish, on_progress) {
        var cbn;

        do {
            cbn = Math.floor(Math.random() * (10000000));
        } while(typeof callback_obj[cbn] !== "undefined");

        callback_obj[cbn] = {
            on_finish:   on_finish,
            on_progress: on_progress
        };

        lzma_worker.postMessage({
            action: action, /// action_compress = 1, action_decompress = 2, action_progress = 3
            cbn:    cbn,    /// callback number
            data:   data,
            mode:   mode
        });
    }

    return {
        compress: function compress(mixed, mode, on_finish, on_progress) {
            send_to_worker(action_compress, mixed, mode, on_finish, on_progress);
        },
        decompress: function decompress(byte_arr, on_finish, on_progress) {
            send_to_worker(action_decompress, byte_arr, false, on_finish, on_progress);
        },
        worker: function worker() {
            return lzma_worker;
        }
    };
}());

});})(this);
