const mongoose = require("mongoose");

const DB_connection = () => {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on("error", () => {
        console.log.bind(console, "DB Connection Error")
    });

    db.once("open", () => {
        console.log("Successfully connected with Database");
    });
}

module.exports = DB_connection;