console.log("coolio")
var cId = "defe1307335b6141da3b5c880c33bbab";


var url = "http://api.soundcloud.com/tracks/13158665?client_id="+cId;

console.log(url);

SC.initialize({
    client_id: 'defe1307335b6141da3b5c880c33bbab'
});


// $(document).ready(function() {
//     $('.trackForm').on("submit", function (e) {
//         e.preventDefault();
//         var action = $(this).attr('action');
//         var $container = $(this).closest('.formContainer');
//         $.ajax({
//             url: action,
//             type: 'POST',
//             success: function (data) {
//                 if(data.success) {
//                     $container.html("<h2>Thank you!</h2>");
//                 } else {
//                     $container.html("there was a problem");
//                 }
//             },
//             error: function () {
//                 $container.html("there was a problem");
//             }
//         });
//     });
// });