import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import path from "path";


import dotenv from "dotenv";
import { rateLimit } from 'express-rate-limit'

import { initDb } from "./utils/seed";

import users from './routes/userRoutes';
import auth from './routes/authRoutes';
import projects from "./routes/projectRoutes";
import pins from "./routes/pinRoutes";
import blogs from "./routes/blogRoutes";
import contact from "./routes/contactRoutes";

dotenv.config()

const { MONGO_URI } = process.env;

// Setting up modules and dependencies
const app = express();
// we need to make ${MONGO_DB} change when running tests
const mongoUri = MONGO_URI;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 900, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Cors
app.use(cors());
app.options('*', cors());

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.resolve('./public')));

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

app.use('/users', users);
app.use('/auth', auth);
app.use('/projects', projects);
app.use('/pins', pins);
app.use('/blogs', blogs);
app.use('/contact', contact);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app; // For testing