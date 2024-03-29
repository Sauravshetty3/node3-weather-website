const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1Ijoic2F1cmF2c2hldHR5MyIsImEiOiJjbDM4cHdvdmgwMjhuM2JxZm04MHNxaWRmIn0.lOXzqc3_q-0R3vn9TlcZbw&limit=1";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services ! ", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to fine location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

///// EXPORTING /////
module.exports = geocode;