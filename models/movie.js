const mongoose = require('mongoose');
const moment = require('moment');

const movieSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    // relDate: {
    //     type: Date,
    //     get: function (newDate) {
    //             return moment(newDate).format('DD-MM-YYYY');
    //     },
    //     required: true
    // },
    year: {
        type: Number,
        required: true
    },
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});
module.exports = mongoose.model('Movie', movieSchema);