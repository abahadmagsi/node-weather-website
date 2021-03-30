const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

//defining paths for Express config
const viewsPath = path.join(__dirname, "../templets/views");
const partialPath = path.join(__dirname, "../templets/partials");

//app.use used to serve static file __dirname target current location
app.use(express.static(path.join(__dirname, "../public")));

//Setups handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Ahad",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address is must!",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    forecast(data.latitude, data.longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: {
          weather_descriptions: data.locationData.weather_descriptions[0],
          temp: data.locationData.temperature,
          cloudcover: data.locationData.cloudcover,
          humidity: data.locationData.humidity,
          feelslike: data.locationData.feelslike,
        },
        address: req.query.address,
        location: `${data.location.name},${data.location.region},${data.location.country}`,
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ahad",
    msg: "Contact uzairahadmagsi0@gmail.com for help.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Ahad",
    title: "About",
  });
});

app.get("/product", (req, res) => {
  //hum jo be link me query denge usko yaha req.query me accsses kr sakhty hen
  if (!req.query.search) {
    return res.send({
      error: "Must use Search query",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFoundPage", {
    name: "Ahad",
    title: "Help",
    errorMassege: "More Help Not Found !",
  });
});

app.get("*", (req, res) => {
  res.render("notFoundPage", {
    errorMassege: "404 Page Not Found!",
    name: "Ahad",
    title: "404",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
