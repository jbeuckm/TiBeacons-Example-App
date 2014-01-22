var TiBeacons = require('org.beuckman.tibeacons');

TiBeacons.disableAutoRanging();

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
	Ti.API.info(e);
	notify("enterRegion: "+e.identifier, e);
}
function exitRegion(e) {
	Ti.API.info(e);
	notify("exitRegion: "+e.identifier, e);
}
function regionState(e) {
	Ti.API.info(e);
	if (e.regionState == "inside") {
		notify("inside region: "+e.identifier, e);
	}
}


function stopService() {
	
	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);
	TiBeacons.removeEventListener("determinedRegionState", regionState);
	

	TiBeacons.stopMonitoringAllRegions();
}
Ti.App.currentService.addEventListener("stop", stopService);


TiBeacons.addEventListener("enteredRegion", enterRegion);
TiBeacons.addEventListener("exitedRegion", exitRegion);
TiBeacons.addEventListener("determinedRegionState", regionState);

TiBeacons.startMonitoringForRegion({
    uuid : "00000000-0000-0000-0000-000000000000",
    identifier : "TiBeacon Test"
});
TiBeacons.startMonitoringForRegion({
    uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
    identifier : "Estimote"
});

