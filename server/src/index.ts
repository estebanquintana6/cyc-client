import express, { Request, Response } from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";

import dotenv from "dotenv";

import { initDb } from "./utils/seed";

dotenv.config()

const { MONGO_URI } = process.env;

console.log(process.env);

console.log(MONGO_URI);

// Setting up modules and dependencies
const app = express();
// we need to make ${MONGO_DB} change when running tests
const mongoUri = MONGO_URI;
// Cors
app.use(cors());

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

// Function to connect to the database
const conn = () => {
    mongoose.connect(mongoUri || "");
};
// Call it to connect
conn();

// Handle the database connection and retry as needed
const db = mongoose.connection;
db.on("error", (err: Error) => {
    console.log("There was a problem connecting to mongo: ", err);
    console.log("Trying again");
    setTimeout(() => conn(), 5000);
});
db.once("open", async () => {
    await initDb();
    console.log("Successfully connected to mongo");
});

// Passport middleware
app.use(passport.initialize());