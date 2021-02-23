const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
    cardio: {
        type: String,
        trim: true,
        required: "What type of cardio did you do"
    },
    distance: {
        type: Number,
        required: "Enter in miles"
    },
    duration: {
    type: Number,
    required: "Enter in minutes"
    },
    resistance: {
        type: String,
        trim: true,
        required:"What type of resistance exercise did you do"
    },
    weight: {
        type:Number,
        required: "Enter in LBs"
    },
    sets: {
        type: String,
        trim: true,
        required: "how many sets did you do?"
    }
});

const Exercise = mongoose.model("Exercise", fitnessSchema);

module.exports = Exercise;