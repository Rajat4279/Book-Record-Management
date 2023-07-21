const express = require("express");

// const { users } = require("../data/users.json");

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    userSubscriptionDetail
} = require("../controllers/user-controller");

const router = express.Router();

/**
 * Route: /users
 * Request: GET
 * Description: To get all the users
 * Access: Public
 * Parameters: None
 */

router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Request: GET
 * Description: To get a user by id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getUserById);

/**
 * Route: /users
 * Request: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", createUser);

/**
 * Route: /users/:id
 * Request: POST
 * Description: Update a user
 * Access: Public
 * Parameters: Id
 */

router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Request: DELETE
 * Description: Delete a user
 * Access: Public
 * Parameters: Id
 */

router.delete("/:id", deleteUserById);

/**
 * Route: /users/subscription-details/:id
 * Request: GET
 * Description: Get user's subscription details
 * Access: Public
 * Parameters: Id
 */

router.get("/subscription-details/:id", userSubscriptionDetail);

module.exports = router; 