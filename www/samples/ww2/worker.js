(function(){

    importScripts('require.js');

    require
    (
        ["radi"],
        function(ra)
        {
        },
        function(err)
        {
            console.error("Error loading module radi.js");
            console.error(err);
        }
    );

    //
    var isPrime = function(n)
    {
        for (var d=3; d<n/2; d+=2)
            if (n%d==0)
                return false;

        return true;
    };

    //
    var calcPrimes = function()
    {
        for (var n=3; n<2000; n+=2)
            if (isPrime(n))
                postMessage("" + n);
    };

    //
    self.onmessage = function(e)
    {
        console.log("[Worker] Message received from main thread: " + e.data);
        calcPrimes();
    };

})();
