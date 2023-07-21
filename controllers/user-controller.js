const { BookModel, UserModel } = require("../models");

exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No User found",
        });
    }

    res.status(200).json({
        success: true,
        data: users,
    });
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

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
}

exports.createUser = async (req, res) => {
    const { data } = req.body;

    const user = await UserModel.create(data);

    return res.status(201).json({
        success: true,
        data: user,
    });
}

exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    const data = req.body.data;

    const updatedUser = await UserModel.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: {      //preferred way to set data
                ...data, // if the field is not present set will add that field too.
            }
        },
        {
            new: true
        }
    )

    return res.status(200).json({
        success: true,
        data: updatedUser,
    });
}

exports.deleteUserById = async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.deleteOne({ _id: id });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User to be deleted not found"
        })
    }

    const users = await UserModel.find();

    return res.status(200).json({
        success: true,
        data: users,
    })
}

exports.userSubscriptionDetail = async (req, res) => {

    const id = req.params.id;
    const user = await UserModel.findById(id);

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        const days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionExpiry = (date) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        } else if (user.subscriptionType === "Premium") {
            date += 180;
        } else {
            date += 365;
        }
        return date;
    }

    const returnDate = getDateInDays(user.returnDate);
    const currentDate = getDateInDays();
    const subscriptionDate = getDateInDays(user.subscriptionDate);
    const subscriptionExpiryDate = subscriptionExpiry(subscriptionDate);

    const fine = returnDate < currentDate ?
        subscriptionExpiryDate < currentDate ? 200 : 100
        : 0;

    const userData = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiryDate < currentDate,
        daysLeftForExpiration: subscriptionExpiryDate > currentDate ?
            subscriptionExpiryDate - currentDate : 0,
        fine,
    }

    return res.status(200).json({
        success: true,
        data: userData,
    });
}