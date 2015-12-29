var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var vacationSchema = new Schema({
    type: String,
    url: String
});

var Vacation = mongoose.model('Vacation', vacationSchema);



module.exports = Vacation;