var mon
var TrackDAL = function() {};

TrackDAL.prototype.deleteTrack = function(id) {
	console.log("delete", id);
};


module.exports = new TrackDAL;