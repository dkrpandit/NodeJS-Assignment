require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const multer = require("multer");
require("./database/connection");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const auth = require("../src/middleware/auth");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const Registrations = require("./models/registrations");
const profileImagePath = path.join(__dirname, "../profileImage");

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

const port = process.env.PORT || 3000;

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: profileImagePath,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/registration", (req, res) => {
    res.render("registration");
});

app.get("/login", (req, res) => {
    res.render("login");
});

// Handle registration with image upload
app.post("/registration", upload.single("profile-image"), async (req, res) => {
    try {
        const imagePath = req.file ? `/profileImage/${req.file.filename}` : null;

        const newRegistrations = new Registrations({
            email: req.body.email,
            phone: req.body.phone,
            name: req.body.name,
            password: req.body.password,
            imagePath: imagePath
        });

        const token = await newRegistrations.generateAuthToken(res);

        // Set expiration time to 30 seconds from the current time
        const expirationTime = new Date(Date.now() + 600000);

        res.cookie("jwt", token, {
            expires: expirationTime,
            httpOnly: true
        });

        await newRegistrations.save();

        res.status(201).render("login");
    } catch (error) {
        console.error(error);
        res.status(400).send("Error in registration. Please try again.");
    }
});

// Serve profile images statically
app.use("/profileImage", express.static(profileImagePath));


app.post("/login", async (req, res) => {
    try {
        const emailPhone = req.body['email-phone'];
        const password = req.body.password;

        // Determine whether the input is an email or a phone number
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPhone);
        const queryField = isEmail ? 'email' : 'phone';

        // Find the user in the database based on email or phone
        const user = await Registrations.findOne({ [queryField]: emailPhone });

        if (!user) {
            return res.status(404).send("User not found. Please check your credentials.");
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);


        const token = await user.generateAuthToken(res);
        // console.log("login wala token ", token)

        // Set expiration time to 30 seconds from the current time
        const expirationTime = new Date(Date.now() + 600000);
        res.cookie("jwt", token, {
            expires: expirationTime,
            httpOnly: true
        });

        if (!isPasswordValid) {
            return res.status(401).send("Invalid password. Please check your credentials.");
        }

        // Password is valid, user is authenticated
        // You may set up a session or generate a token for further authentication

        // res.status(200).send("Login successful!"); // You can customize the response as needed
        res.status(200).render("user", { user });
        
    } catch (error) {
        console.error("Error in /login route:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, () => {
    console.log(`Server is running on port number ${port}`);
});
