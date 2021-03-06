(function(){

importScripts('../require.js');

requirejs.config
({
    paths: {
        vn: "."
//        ct: tuita.context
    }
});

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
