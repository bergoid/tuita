(function(){

importScripts('require.js');

self.onmessage = function(m)
{
    require
    (
        ["lz64w"],
        function(lz64w)
        {
            lz64w.worker.onMessage(self, m);
        },
        function(err)
        {
            console.error("Error while loading modules");
            console.error(err);
        }
    );
};

})();
