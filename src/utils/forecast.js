const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b8be9477257c4c2b794a814759a62a3d&query=${latitude},${longitude}`;
  request({ url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to server!", undefined);
    } else if (response.body.error) {
      callback("Something Went wrong, maybe Longitude or Latitude!", undefined);
    } else {
      callback(undefined, {
        location: response.body.location,
        locationData: response.body.current,
        status: "Okay",
      });
    }
  });
};

module.exports = forecast;
