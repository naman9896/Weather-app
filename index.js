require("dotenv").config();
const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const city = req.body.search;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    process.env.API_KEY +
    "&units=metric";
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.render("weather", { weatherData: weatherData, imgURL: imgURL });
    });
  });
});

app.listen(3000, () => console.log("Server is running on port 3000."));
