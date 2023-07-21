const { BookModel, UserModel } = require("../models");

const IssuedBook = require("../dtos/book-dto")

exports.getAllBooks = async (req, res) => {

    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book found",
        });
    }

    res.status(200).json({
        success: true,
        data: books,
    });
}

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);

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
}

exports.getAllIssuedBooks = async (req, res) => {

    const users = await UserModel.find(
        {
            issuedBook: { $exists: true }
        }
    ).populate("issuedBook");

    //DTOS: Data Transformation Object
    const issuedBooks = users.map((each) => new IssuedBook(each));

    if (!issuedBooks.length) {
        return res.status(404).json({
            success: false,
            message: "There are no issued books",
        });
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
}

exports.addNewBook = async (req, res) => {
    const data = req.body.data;

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No data is send"
        });
    }

    await BookModel.create(data);

    const allBooks = await BookModel.find();;

    return res.status(200).json({
        success: true,
        data: allBooks,
    });
}

exports.updateBookByID = async (req, res) => {
    const id = req.params.id;
    const data = req.body.data;

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            _id: id,
        },
        data,
        {
            new: true
        });

    return res.status(201).json({
        success: true,
        data: updatedBook,
    });
}

exports.getIssuedBookWithFine = async (req, res) => {
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

    const users = await UserModel.find();

    for (const user of users) {
        const returnDate = getDateInDays(user.returnDate);
        const currentDate = getDateInDays();
        const subscriptionDate = getDateInDays(user.subscriptionDate);
        const subscriptionExpiry = subscriptionType(subscriptionDate, user);

        if (returnDate < currentDate || subscriptionExpiry < currentDate) {
            try {
                const book = await BookModel.findById(user.issuedBook);
                if (book) {
                    booksWithFine.push(book);
                }
            } catch (error) {
                console.error("Error while querying book:", error);
            }
        }
    }

    if (booksWithFine.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No books with fine"
        });
    }

    return res.status(200).json({
        success: true,
        data: booksWithFine,
    });
}


exports.deleteBookById = async (req, res) => {
    const id = req.params.id;

    await BookModel.deleteOne(
        {
            _id: id
        }
    );

    const allBooks = await BookModel.find();

    return res.status(200).json({
        success: true,
        data: allBooks,
    });
}