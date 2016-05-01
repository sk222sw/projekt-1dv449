const request = require("request");
const _ = require("lodash");

const options = {
  url: "https://api.spotify.com/v1/search?q=ben%20klock&type=artist"
};

function getArtistSimilarArtists(error, response, body) {
  if (!error && response.statusCode == 200) {
    const info = JSON.parse(body);
    const artists = info.artists;
    // console.log(info.artists[0].name);

    _.each(artists, artist => {
      console.log(artist.name);
    });

  } else {
    console.log(error);
    console.log(response.statusCode);
  }
}

function getArtistData(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(info.artists.items[0].id);

    const options2 = {
      url: "https://api.spotify.com/v1/artists/" + info.artists.items[0].id + "/related-artists"
    }

    request(options2, getArtistSimilarArtists);
  } else {
    console.log(error);
    console.log(response.statusCode);
  }
}

request(options, getArtistData);