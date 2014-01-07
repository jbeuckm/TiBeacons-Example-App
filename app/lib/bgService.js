var TiBeacons = require('org.beuckman.tibeacons');

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

function handleRanges(event) {
    
    for (var i in event.beacons) {
        var b = event.beacons[i];
        switch (b.proximity) {
            case "immediate":
                notify("Found "+b.major+"/"+b.minor+" in immediate proximity!");
                break;
            case "near":
                notify("Found "+b.major+"/"+b.minor+" in near proximity!");
                break;
        }
    }

}
TiBeacons.addEventListener("beaconRanges", handleRanges);


TiBeacons.startRangingForBeacons({
    uuid : "00000000-0000-0000-0000-000000000000",
    identifier : "TiBeacon Test"
});
TiBeacons.startRangingForBeacons({
    uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
    identifier : "Estimote"
});


Ti.App.currentService.addEventListener("stop", function() {
	TiBeacons.removeEventListener("beaconRanges", handleRanges);
	TiBeacons.stopRangingForBeacons();
});
