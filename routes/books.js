const express = require("express");

const { users } = require("../data/users.json");
const { books } = require("../data/books.json");

const router = express.Router();

/**
 * Route: /users
 * Request: GET
 * Description: To get all the books
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route: /books/:id
 * Request: GET
 * Description: To get a book by id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    let book = books.find((each) => each.id === id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: book,
    })
});

/**
 * Route: /books/issued/by-user
 * Request: GET
 * Description: To get all book that are issued
 * Access: Public
 * Parameters: None
 */

router.get("/issued/by-user", (req, res) => {
    const userWithIssuedBooks = users.filter((each) => each.issuedBook);
    // return console.log(userWithIssuedBook);
    if (!userWithIssuedBooks.length) {
        return res.status(404).json({
            success: false,
            message: "There are no issued books",
        });
    }
    const issuedBooks = [];

    userWithIssuedBooks.forEach((user) => {
        const book = books.find((eachBook) => eachBook.id === user.issuedBook);

        book.issuedBy = user.name + " " + user.surname;
        book.issuedDate = user.issuedDate;
        book.returnDate = user.returnDate;
        console.log(book);

        issuedBooks.push(book);
    });

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
});


module.exports = router;