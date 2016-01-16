console.log("coolio")
var cId = "defe1307335b6141da3b5c880c33bbab";

// var url = "http://api.soundcloud.com/tracks/13158665?client_id="+cId;

var url = document.getElementById("trackUri").innerHTML+cId;

var widgetIframe = document.getElementById('sc-widget');
var widget = SC.Widget(widgetIframe);

widget.bind(SC.Widget.Events.READY, function(){
    widget.play();
})

widget.bind(SC.Widget.Events.FINISH, function() {
    var query = window.location.search;
    var trackQuery = query.split("=");
    var trackNumber = trackQuery[1];
    var newTrackNumber = parseInt(trackNumber, 10) + 1;
    window.location = window.location.origin + window.location.pathname + trackQuery[0] + "=" + newTrackNumber.toString()
});

