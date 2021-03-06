(function (root, undefined)
{
    var dataString = function(url)
    {
        var dataString = "";
        var indexFirst = url.indexOf("?d=");

        if (indexFirst>=0)
        {
            var indexNext = url.indexOf("?", indexFirst+1);
            if (indexNext>indexFirst+3)
                dataString = url.substr(indexFirst+3, indexNext-indexFirst-3);
            else
                dataString = url.substr(indexFirst+3);
        }

        return dataString;
    }(root.location.href);

    if (dataString.length == 0)
    {
        root.console.error("Missing data string");
        return;
    }

    if (dataString.length < 2)
    {
        root.console.error("Invalid data string: length<2");
        return;
    }

    root.tuita = {
        version : "v" + dataString.substring(0,2),
        context : "c" + dataString.substring(2,4)
    };

    requirejs.config
    ({
        paths: {
            vn: root.tuita.version,
            ct: root.tuita.version + "/" + root.tuita.context
        }
    });

    require(
        ["vn/version"],
        function(version)
        {
            version.go(dataString);
        },
        function(err)
        {
            root.console.error("Error loading module " + versionString + "/load");
        }
    );
})(this);
