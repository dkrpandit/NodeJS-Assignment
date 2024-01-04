const jwt = require("jsonwebtoken");

const registration = require("../models/registrations");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken);
        const user = await registration.findOne({ _id: verifyToken._id })

        console.log(user.firstName);

        next();

    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;