var TiBeacons = require('org.beuckman.tibeacons');

TiBeacons.addEventListener('bluetoothStatus', function(e){
    Ti.API.info(e);
});
TiBeacons.requestBluetoothStatus();


Alloy.Collections.iBeacon.fetch();


function enterRegion(e) {
	alert(e);
	var model = ensureModel(e);
	
	TiBeacons.startRangingForBeacons(e);
}
function exitRegion(e) {
	alert(e);

	var model = ensureModel(e);
	Alloy.Collections.iBeacon.remove(model);

    TiBeacons.stopRangingForBeacons(e);
}
function updateRanges(e) {
	Ti.API.trace(e);
}
function handleProximity(e) {
	Ti.API.info(e);
	
	var model = ensureModel(e);
	
	model.set("proximity", e.proximity);
}

function ensureModel(e) {
	
	var atts = {
		id: e.uuid+" "+e.major+" "+e.minor,
		identifier: e.identifier,
		uuid: e.uuid,
		major: parseInt(e.major),
		minor: parseInt(e.minor),
		proximity: e.proximity
	};
	
	var model;
	var models = Alloy.Collections.iBeacon.where({id:atts.id});
	
	if (models.length == 0) {
		model = Alloy.createModel("iBeacon", atts);
		Alloy.Collections.iBeacon.add(model);
	}
	else {
		model = models[0];
Ti.API.info("found model "+models[0].get("identifier"));	
	}

	return model;
}


TiBeacons.addEventListener("enteredRegion", enterRegion);
TiBeacons.addEventListener("exitedRegion", exitRegion);

TiBeacons.addEventListener("beaconRanges", updateRanges);
TiBeacons.addEventListener("beaconProximity", handleProximity);
	


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


$.win.open();
