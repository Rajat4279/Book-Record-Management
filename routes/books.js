const express = require("express");

// const { users } = require("../data/users.json");
// const { books } = require("../data/books.json");

const {
    getAllBooks,
    getBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookByID,
    deleteBookById,
    getIssuedBookWithFine
} = require("../controllers/book-controller");

const router = express.Router();

/**
 * Route: /users
 * Request: GET
 * Description: To get all the books
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllBooks);

/**
 * Route: /books/:id
 * Request: GET
 * Description: To get a book by id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getBookById);

/**
 * Route: /books/issued/by-user
 * Request: GET
 * Description: To get all book that are issued
 * Access: Public
 * Parameters: None
 */

router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Request: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: None
 * Data: id, name, author, genre, price, publisher
 */

router.post("/", addNewBook);

/**
 * Route: /books/:id
 * Request: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", updateBookByID)

/**
 * Route: /books/issued/withFine
 * Request: GET
 * Description: Getting all books which have fine
 * Access: Public
 * Parameters: None
 */

router.get("/issued/withFine", getIssuedBookWithFine);

/**
 * Route: /books/{id}
 * Request: DELETE
 * Description: Deleting a book by id
 * Access: Public
 * Parameters: Id
 */

router.delete("/:id", deleteBookById);

module.exports = router;