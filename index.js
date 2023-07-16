const express = require("express");

const { users } = require("./data/users.json")

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running."
    });
});

/**
 * Route: /users
 * Request: GET
 * Description: To get all the users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
})

/**
 * Route: /users/:id
 * Request: GET
 * Description: To get user by id
 * Access: Public
 * Parameters: None
 */

app.get("/users/:id", (req, res) => {
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
})

/**
 * Route: /users
 * Request: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: None
 */

app.post("/users", (req, res) => {
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
    })

    return res.status(201).json({
        success: true,
        data: users,
    })
});

/**
 * Route: /users/:id
 * Request: POST
 * Description: Update a user
 * Access: Public
 * Parameters: Id
 */

app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        })
    }

    const updatedUser = users.map((user)=>{
        if(id===user.id){
            return {
                ...user,...data
            }
        }
        return user;
    })
    return res.status(200).json({
        success:true,
        data:updatedUser,
    })
})

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route doesn't exist."
    });
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});