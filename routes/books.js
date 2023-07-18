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

/**
 * Route: /books
 * Request: POST
 * Description: Add a new book
 * Access: Public
 * Parameters: None
 * Data: id, name, author, genre, price, publisher
 */

router.post("/", (req, res) => {
    const data = req.body.data;

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No data is send"
        });
    }

    const book = books.find((each) => data.id === each.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book with that id is already exist"
        });
    }

    // books.push(data);
    const allBooks = [...books, data];

    return res.status(200).json({
        success: true,
        data: allBooks,
    });
});

/**
 * Route: /books/:id
 * Request: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body.data;

    const book = books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book with specified id is not present"
        });
    }
    const allBook = books.map((book) => {
        if (book.id === id)
            return {
                ...book,
                ...data
            }
        return book;
    });

    return res.status(201).json({
        success: true,
        data: allBook,
    });
})

/**
 * Route: /books/issued/withFine
 * Request: GET
 * Description: Getting all books which have fine
 * Access: Public
 * Parameters: None
 */

router.get("/issued/withFine", (req, res) => {
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        const days = Math.floor((date) / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date, user) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        } else if (user.subscriptionType === "Standard") {
            date += 180;
        } else {
            date += 365;
        }
        return date;
    }

    const booksWithFine = [];

    users.map((user) => {
        const returnDate = getDateInDays(user.returnDate);
        const currentDate = getDateInDays();
        const subscriptionDate = getDateInDays(user.subscriptionDate);
        const subscriptionExpiry = subscriptionType(subscriptionDate, user);

        if (returnDate < currentDate || subscriptionExpiry < currentDate) {
            const book = books.find((book) => book.id === user.issuedBook);
            if (book) {
                booksWithFine.push(book);
            }
        }
    });

    if (booksWithFine.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No books with fine"
        })
    }

    return res.status(200).json({
        success: true,
        data: booksWithFine,
    })
});


module.exports = router;