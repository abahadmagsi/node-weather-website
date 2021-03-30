const request = require("request");
const geoCoding = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWhhZG1hZ3NpIiwiYSI6ImNrbWtodHJxcjB2b2oydmxuY2ZnYzc3aGcifQ.E2teoCcDObY1P51YadQyLg&limit=1`;

  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect !" + error, undefined);
    } else if (response.body.features.length === 0) {
      callback("Invalid Location !", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCoding;
