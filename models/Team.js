const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {type: String, required: true},
    country: {type: String, required: true},
    players: {
        firstname: String,
        lastname: String,
        position: String,
        number: Number
    }
});

const Team = mongoose.model('team', TeamSchema);
module.exports = Team;