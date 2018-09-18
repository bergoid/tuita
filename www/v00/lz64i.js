(function (root, undefined) {
define(['vn/lzma', 'vn/us64'], function (lz, us64) {

'use strict';
var lz64i = {};

// Valid values: 1-9
var compressionLevel = 1;

//
lz64i.compress = function(input, on_finish, on_progress)
{
    if ( (typeof on_finish == "undefined") && (typeof on_progress == "undefined") )
        return us64.encode(lz.compress(input));
    else
        lz.compress
        (
            input,
            compressionLevel,
            function(res, err)
            {
                if (typeof err != "undefined")
                    return on_finish(null, err);

                root.lz_compressedTime = (new Date()).getMilliseconds();

                on_finish(us64.encode(new Uint8Array(res)));
            },
            on_progress
        );
};

//
lz64i.decompress = function(input, on_finish, on_progress)
{
    return lz.decompress
    (
        us64.decode(input),
        on_finish,
        on_progress
    );
};

//
return lz64i;

});})(this);
