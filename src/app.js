const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define Path for Express Config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templet/views");
const partialsPath = path.join(__dirname, "../templet/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Express static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather Application ",
        name: "Saurav",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page ",
        name: "Vedashri",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "We will help you regarding any querries",
        title: "Help Page",
        name: "Ashalatha",
    });
});

// weather
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address needs to  be privided",
        });
    } else {
        geocode(
            req.query.address,
            (error, { latitude, longitude, location } = {}) => {
                if (error) {
                    return res.send({ error });
                }

                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send();
                    }
                    res.send({
                        location,
                        forecast: forecastData,
                        address: req.query.address,
                    });
                    console.log(location);
                    console.log(forecastData);
                });
            }
        );
    }

    // res.send({
    //     location: location,
    //     forecast: forecast,
    //     address: req.query.address,
    // });
});

// Products
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term",
        });
    }

    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help Error",
        name: "Saurav Shetty",
        errorMsg: "No Help article found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        name: "Saurav K Shetty",
        errorMsg: "404. page not found",
    });
});

// app.get("*", (req, res) => {
//     res.render("404. page not founddddd");
// });

app.listen(port, () => {
    console.log("Server running on port " + port);
});