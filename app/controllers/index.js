var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);


function addEventToScroller(event) {
    Ti.API.info(event);
    $.trace.add(Ti.UI.createLabel({
        text : JSON.stringify(event)
    }));
}

function addListeners() {
	TiBeacons.addEventListener("advertisingStatus", addEventToScroller);
	TiBeacons.addEventListener("beaconRanges", addEventToScroller);
	TiBeacons.addEventListener("beaconProximity", alert);
}
function removeListeners() {
	TiBeacons.removeEventListener("advertisingStatus", addEventToScroller);
	TiBeacons.removeEventListener("beaconRanges", addEventToScroller);
	TiBeacons.removeEventListener("beaconProximity", alert);
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

function toggleRanging() {

    if ($.rangingSwitch.value) {
        TiBeacons.startRangingForBeacons({
            uuid : "00000000-0000-0000-0000-000000000000",
            identifier : "Test Region 1"
        });
        TiBeacons.startRangingForBeacons({
            uuid : "00000000-0000-0000-0000-000000000001",
            major: 1,
            identifier : "Test Region 2"
        });
        TiBeacons.startRangingForBeacons({
            uuid : "00000000-0000-0000-0000-000000000002",
            major: 1,
            minor: 2,
            identifier : "Test Region 3"
        });

        TiBeacons.startRangingForBeacons({
            uuid : "B9407F30-F5F8-466E-AFF9-25556B57FE6D",
            identifier : "Estimote"
        });

    } else {
        TiBeacons.stopRangingForBeacons();
    }
}



$.win.open();




var service = Ti.App.iOS.registerBackgroundService({
    url: "bgService.js"
});
    
    
