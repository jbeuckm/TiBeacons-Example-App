var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);

TiBeacons.addEventListener("beaconRanges", function(event) {
    
    for (var i in event.beacons) {
        var b = event.beacons[i];
        if (b.proximity == "immediate") {
            notify("Found a beacon in immediate proximity!");
        }
    }

});

function notify(msg) {
    var notification = Ti.App.iOS.scheduleLocalNotification({
        alertBody : msg,
        alertAction : "OK",
        userInfo : {
            "hello" : "world"
        },
        //    sound:"whoosh.mp3",
        date : new Date(new Date().getTime() + 5) // 5 milliseconds after being asked
    });
}

TiBeacons.startRangingForBeacons({
    uuid : "00000000-0000-0000-0000-000000000000",
    identifier : "TiBeacon Test"
});

