var TiBeacons = require('org.beuckman.tibeacons');
Ti.API.info("module is => " + TiBeacons);

TiBeacons.addEventListener("beaconRanges", function(event) {
    Ti.API.info(event);
    $.trace.add(Ti.UI.createLabel({
        text : JSON.stringify(event)
    }));
        
//    alert(event.beacons);

});
TiBeacons.addEventListener("advertisingStatus", function(event) {
    Ti.API.info(event);
    $.trace.add(Ti.UI.createLabel({
        text : JSON.stringify(event)
    }));
});


function toggleAdvertising() {

    if ($.advertisingSwitch.value) {

        TiBeacons.startAdvertisingBeacon({
            uuid : $.uuid.value,
            identifier : "TiBeacon Test",
            major: Math.abs(parseInt($.major.value)),
            minor: Math.abs(parseInt($.minor.value))
        });
    } else {
        TiBeacons.stopAdvertisingBeacon();
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
            identifier : "Test Region 2"
        });
        TiBeacons.startRangingForBeacons({
            uuid : "00000000-0000-0000-0000-000000000002",
            identifier : "Test Region 3"
        });
    } else {
        TiBeacons.stopRangingForBeacons();
    }
}



$.win.open();




var service = Ti.App.iOS.registerBackgroundService({
    url: "bgService.js"
});
    
    
