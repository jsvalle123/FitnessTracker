const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
    name: {
        type: String,
        unique:true,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref:"Exercise"
    }]
});

const workOutsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
});

const Fitness = mongoose.model("Fitness", fitnessSchema);
const Workouts = mongoose.model("Workouts", workOutsSchema);

module.exports = {Fitness, Workouts};