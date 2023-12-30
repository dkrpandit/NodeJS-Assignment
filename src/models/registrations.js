const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
    }

})

// for hashing our password using bcrypt algorithm
userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            // console.log(`Before hashing the password is ${this.password}`);
            this.password = await bcryptjs.hash(this.password, 10);
            // console.log(`After hashing the password is ${this.password}`);
        }
    } catch (error) {
        next(error);
    }
});
const Registrations = new mongoose.model("UsersRegistration", userSchema);

module.exports = Registrations