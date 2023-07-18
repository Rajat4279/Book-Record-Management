const express = require("express");

const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Request: GET
 * Description: To get all the users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Request: GET
 * Description: To get a user by id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route: /users
 * Request: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
    const user = users.find((each) => each.id === id);
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User already exists",
        })
    }
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });

    return res.status(201).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Request: POST
 * Description: Update a user
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }

    const updatedUser = users.map((user) => {
        if (id === user.id) {
            return {
                ...user, ...data
            }
        }
        return user;
    });
    return res.status(200).json({
        success: true,
        data: updatedUser,
    });
});

/**
 * Route: /users/:id
 * Request: DELETE
 * Description: Delete a user
 * Access: Public
 * Parameters: Id
 */

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id == id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    const userToDelete = users.indexOf(user);
    users.splice(userToDelete, 1);

    return res.status(200).json({
        success: true,
        data: users,
    })
})

module.exports = router; 