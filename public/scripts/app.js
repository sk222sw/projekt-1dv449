console.log("coolio")
var cId = "defe1307335b6141da3b5c880c33bbab";

// var url = "http://api.soundcloud.com/tracks/13158665?client_id="+cId;

var url = document.getElementById("trackUri").innerHTML+cId;

console.log(url);

SC.initialize({
    client_id: "defe1307335b6141da3b5c880c33bbab"
});

SC.oEmbed(url, {
    element: document.getElementById('soundcloudPlayer')
});

SC.resolve('https://soundcloud.com/foretdevin')
.then(function(json){
    console.log(json);
});


// http://api.soundcloud.com/tracks/153859295?client_id='+cId