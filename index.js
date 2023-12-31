const express = require("express");

const app = express();

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running."
    });
});

app.use("/users",usersRouter);
app.use("/books",booksRouter);

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist."
    });
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});