const jwt = require("jsonwebtoken");

const Registrations = require("../models/registrations");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Registrations.findOne({ _id: verifyToken._id })
        next();

    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;