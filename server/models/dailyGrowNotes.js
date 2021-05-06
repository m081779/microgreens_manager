const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailyGrowNotesSchema = new Schema({
    message: {
        type: String,
    },
    dateTime: {
        type: Date,
        default: Date.now(),
    }
});

const DailyGrowNotes = (module.exports = mongoose.model('DailyGrowNotes', dailyGrowNotesSchema))
