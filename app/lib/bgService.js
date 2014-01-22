var TiBeacons = require('org.beuckman.tibeacons');

TiBeacons.autoRange = false;

var notifications = [];
var notificationCount = 0;

function notify(message, userInfo) {
    notifications[notificationCount++] = Ti.App.iOS.scheduleLocalNotification({
        alertBody : message,
        alertAction : "OK",
        userInfo : userInfo,
        //    sound:"whoosh.mp3",
        date : new Date(new Date().getTime() + 5) // 5 milliseconds after being asked
    });
}



function enterRegion(e) {
	notify("enterRegion", e);
	Ti.API.info(e);
}
function exitRegion(e) {
	notify("exitRegion", e);
	Ti.API.info(e);
}

function handleRanges(e) {
//	Ti.API.info(e);
}

Ti.App.currentService.addEventListener("stop", function() {
	
//	TiBeacons.removeEventListener("beaconRanges", handleRanges);
	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);

	TiBeacons.stopRangingForAllBeacons();
	TiBeacons.stopMonitoringAllRegions();
});


//TiBeacons.addEventListener("enteredRegion", enterRegion);
TiBeacons.addEventListener("exitedRegion", exitRegion);
TiBeacons.addEventListener("beaconRanges", handleRanges);

TiBeacons.startMonitoringForRegion({
    uuid : "00000000-0000-0000-0000-000000000000",
    identifier : "TiBeacon Test"
});
TiBeacons.startMonitoringForRegion({
    uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
    identifier : "Estimote"
});

