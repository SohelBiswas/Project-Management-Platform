import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();

dotenv.config({
    "path" : "./.env"
});

// Basic configuration for express

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//Cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders : ["Content-Type", "Authorization"]
  }),
);


// Imprt healthcheck route

import healthCheckRouter from "./routes/healthcheck.route.js"

app.use("/api/v1/healthcheck", healthCheckRouter)

app.get("/", (req, res) => {
  res.send("This is my first project!");
});

let myUserName = process.env.CUSTOMUSERNAME;

app.get("/sohel", (req, res) => {
  res.send(`Owner of the page is ${myUserName}`);
});

app.get("/instagram", (req, res) => {
  res.send("The website is instagram");
});

export default app;
