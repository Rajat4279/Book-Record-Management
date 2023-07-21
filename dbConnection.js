const mongoose = require("mongoose");

const DB_Connection = () => {
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

module.exports = DB_Connection;


// const mongoose = require("mongoose");
// const retry = require('retry');

// const DB_Connection = () => {
//     const DB_URL = process.env.MONGO_URI;

//     const operation = retry.operation({
//         retries: 5, // Number of retries (adjust as needed)
//         factor: 2, // Factor by which the delay increases between retries
//         minTimeout: 1000, // Minimum delay before the first retry (in milliseconds)
//         maxTimeout: 30000, // Maximum delay between retries (in milliseconds)
//     });

//     operation.attempt((currentAttempt) => {
//         console.log(`Connection attempt #${currentAttempt}`);

//         mongoose.connect(DB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//             .then(() => {
//                 console.log("Successfully connected with Database");
//             })
//             .catch((error) => {
//                 console.error("DB Connection Error:", error.message);
//                 if (operation.retry(error)) {
//                     return;
//                 }
//                 console.error("Max retries exceeded. Unable to connect to the database.");
//             });
//     });
// };

// module.exports = DB_Connection;