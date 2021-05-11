const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dailyEnvironmentalConditionsSchema = new Schema({
    temperatureUnit: {
        type: String,
    },
    temperatureLow: {
        type: Number,
    },
    temperatureHigh: {
        type: Number,
    },
    humidityLow: {
        type: Number,
    },
    humidityHigh: {
        type: Number,
    },
    dateTime: {
        type: String,
        default: new Date(Date.now()),
    },
    hadFan: {
        type: Boolean,
        default: true,
    },
    notes: String
});

const DailyEnvironmentalConditions = (module.exports = mongoose.model('DailyEnvironmentalConditions', dailyEnvironmentalConditionsSchema))
