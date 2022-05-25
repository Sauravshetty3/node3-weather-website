const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=8eeb4873f5f38b37ac7656750edd7e78";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(
                undefined,
                "Its currently" + body.main.temp + " degree. Have a Beautiful day!!"
            );
        }
    });
};

module.exports = forecast;