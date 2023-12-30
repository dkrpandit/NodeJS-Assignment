const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./database/connection");



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const Registrations = require("./models/registrations")

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/registration", (req, res) => {
    res.render("registration");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/registration", async (req, res) => {
    try {
        const newRegistrations = new Registrations({
            email: req.body.email,
            phone: req.body.phone,
            name: req.body.name,
            password: req.body.password
        })
        const registered = await newRegistrations.save();
        res.status(201).render("index");

    } catch (error) {
        console.log(error);
        res.status(400).send("Error in registration. Please try again.");
    }

})



app.listen(port, () => {
    console.log(`server is running on port number ${port}`);
});