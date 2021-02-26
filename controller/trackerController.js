const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = require("../models");
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fitness', { useNewUrlParser: true });

router.get("/", (req, res) => {
    res.status(200).sendFile("index.html");
})

router.get("/fitness", async (req, res) => {
    let dbRoutine = await db.Fitness.find({})
    res.status(200).send(dbRoutine);
})

router.get("/populate/:fitnessID", async (req, res) => {
    let dbRoutine = await db.Fitness.find({_id: req.params.fitnessID}).populate("fitness")
    res.status(200).send(dbRoutine);
})

router.get("/api/fitness", async (req, res) => {
    let dbRoutine = await db.Fitness.find({}).populate("fitness")
    res.json(dbRoutine);
})

router.post("/submit", async (req, res) => {
    const newRoutine = new db.Fitness(req.body)
    try {
        let dbRoutine = await db.Fitness.create(newRoutine);
        res.status(200).send(dbRoutine);
    } catch (err) {
        res.status(200).send(err._message);
    }
});

router.post("/add", async (req, res) => {
    let workoutsInfo = {
        name: req.body.name,
        reps: req.body.reps
    }
    const newWorkouts = new db.Workouts(workoutsInfo)
    try {
        let addWorkouts = await db.Workouts.create(newWorkouts)
        try {
            let dbRoutine = await db.Fitness.findOneAndUpdate({_id: req.body.fitness}, { $push: { workouts: addWorkouts._id } }, { new: true })
            res.status(200).send(dbRoutine);
        } catch (err) {
            res.status(200).send(err);
        }
    } catch (err) {
        res.status(200).send(err);
    }
});

process.on('uncaughtException', err => {
    console.log(err);
})

module.exports = router;