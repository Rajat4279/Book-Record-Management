# Book-Record-Management

This is Book Record Management Api Backend for the management of record and books.

## Routes and End-Points

### /users

GET: List all the users. ✅

POST: Create a new user. ✅

### /users/{id}

GET: Get the user by id. ✅

PUT: Update the user by id. ✅

DELETE: Delete the user by id (Check if he/she has an issued book) (Is there any fine need to be paid). ✅

### /users/subscription-details/{id}

GET: Get user subscription details.

1.) Date of Subscription.

2.) Date till subscription valid.

3.) Fine if any.

### /books

GET: Get all the books of library. ✅

POST: Add a new book.

### /books/{id}

GET: Get a book by id. ✅

PUT: Update a book by id.

### /books/issued/by-user

GET: List all issued books.

### /books/issued/withFine

GET: All issued books with fine.

## Subscription Type

Basic (3 months)

Standard (6 months)

Premium (12 months)

If the subscription date is 11/07/23
and subscription type is standard
then subscription is valid till date 11/01/24

If someone forgets to returned the book on
time then he will be fined Rs. 100.

If someone has an issued book and issued book is to be returned at 01/01/23
If someone missed the date of returned, and subscription also expires then he will be fined Rs. 200.
