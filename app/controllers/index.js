var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);

TiBeacons.autoRange = true;


function enterRegion(e) {
	
	var newModel = Alloy.createModel("iBeacon", {id:e.uuid+"-"+e.major+"-"+e.minor});
	newModel.save();
	Alloy.Collections.iBeacon.add(newModel);
	
	Ti.API.info(e);
}
function exitRegion(e) {
	Ti.API.info(e);
}
function updateRanges(e) {
	Ti.API.info(e);
}
function handleProximity(e) {
	Ti.API.info(e);
}

function addListeners() {

	TiBeacons.addEventListener("enteredRegion", enterRegion);
	TiBeacons.addEventListener("exitedRegion", exitRegion);

//	TiBeacons.addEventListener("beaconRanges", updateRanges);
	TiBeacons.addEventListener("beaconProximity", handleProximity);
	
}
function removeListeners() {
	
	TiBeacons.stopMonitoringAllRegions();
	$.monitoringSwitch.value = false;

	TiBeacons.removeEventListener("enteredRegion", enterRegion);
	TiBeacons.removeEventListener("exitedRegion", exitRegion);

	TiBeacons.removeEventListener("beaconRanges", updateRanges);
	TiBeacons.removeEventListener("beaconProximity", handleProximity);
}

Ti.App.addEventListener("pause", removeListeners);
Ti.App.addEventListener("resumed", addListeners);

addListeners();


function toggleAdvertising() {

    if ($.advertisingSwitch.value) {

        TiBeacons.startAdvertisingBeacon({
            uuid : $.uuid.value,
            identifier : "TiBeacon Test",
            major: Math.abs(parseInt($.major.value)),
            minor: Math.abs(parseInt($.minor.value))
        });
        
        Ti.App.idleTimerDisabled = true;
        
    } else {
        TiBeacons.stopAdvertisingBeacon();
        
        Ti.App.idleTimerDisabled = false;        
    }

}

function toggleMonitoring() {

    if ($.monitoringSwitch.value) {
        TiBeacons.startMonitoringForRegion({
            uuid : "00000000-0000-0000-0000-000000000000",
            identifier : "Test Region 1"
        });
        TiBeacons.startMonitoringForRegion({
            uuid : "00000000-0000-0000-0000-000000000001",
            major: 1,
            identifier : "Test Region 2"
        });
        TiBeacons.startMonitoringForRegion({
            uuid : "00000000-0000-0000-0000-000000000002",
            major: 1,
            minor: 2,
            identifier : "Test Region 3"
        });

        TiBeacons.startMonitoringForRegion({
            uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
            identifier : "Estimote"
        });

    } else {
		TiBeacons.stopMonitoringAllRegions();
    }
}

var service = Ti.App.iOS.registerBackgroundService({
    url: "bgService.js"
});


$.win.open();
