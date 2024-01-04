const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    imagePath: String,
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    tokens: [
        {
            token: { type: String }
        }
    ]

})

// generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("Error generating auth token:", error);
        // Handle the error here if needed
        throw error; // Throw the error to be caught by the caller
    }
};


// for hashing our password using bcrypt algorithm
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcryptjs.hash(this.password, 10);
        }
        next(); // Call next without an argument to proceed with the normal flow
    } catch (error) {
        // Handle the error here if needed
        console.log("Error hashing password:", error);
        next(error); // Call next with an argument to indicate an error
    }
});

const Registrations = new mongoose.model("UsersRegistration", userSchema);

module.exports = Registrations