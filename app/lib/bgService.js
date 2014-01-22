var TiBeacons = require('org.beuckman.tibeacons');

TiBeacons.disableAutoRanging();
TiBeacons.stopMonitoringAllRegions();
TiBeacons.stopRangingForAllBeacons();

function notify(message, e) {
    Ti.App.iOS.scheduleLocalNotification({
        alertBody : message,
        alertAction : "OK",
        userInfo : { 
        	example: "e.identifier"
        },
        //    sound:"whoosh.mp3",
        date : new Date(new Date().getTime() + 5) // 5 milliseconds after being asked
    });
}


function enterRegion(e) {
	notify("enterRegion: "+e.identifier, e);
	Ti.API.info(e);
}
function exitRegion(e) {
	notify("exitRegion: "+e.identifier, e);
	Ti.API.info(e);
}


function stopService() {
	
	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);

//	TiBeacons.stopMonitoringAllRegions();
}
Ti.App.currentService.addEventListener("stop", stopService);


TiBeacons.addEventListener("exitedRegion", exitRegion);
TiBeacons.addEventListener("enteredRegion", enterRegion);

TiBeacons.startMonitoringForRegion({
    uuid : "00000000-0000-0000-0000-000000000000",
    identifier : "TiBeacon Test"
});
TiBeacons.startMonitoringForRegion({
    uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
    identifier : "Estimote"
});

