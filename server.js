/**
 * Created by stevenmcdonald on 2/26/17.
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

// Port
const port = 8080;

// Cors middleware
app.use(cors());

// Index route
app.get("/", function (request, response) {
    response.send("This is the index route");
});

app.listen(port, function () {
    console.log("Server running on port: " + port);
});


