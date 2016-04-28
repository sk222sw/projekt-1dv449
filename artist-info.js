const request = require("request");

// function getArtistInfo(artist) {
//   console.log("hej");
//   const requestString = "https://api.discogs.com/database/search?q=Nirvana&key=foo123&secret=DOWuJnVGdcpwInntlOJJLzoNwdTZIoRS"
//   return new Promise((resolve, reject) => {
//     request(requestString, (err, res, rawJson) => {
//       if (err) { reject(err); }
//       console.log(rawJson);
//       resolve(rawJson);
//     });
//   });
// }

var options = {
  url: 'https://api.discogs.com/database/search?q=benklock&key=krHhCJCFIowVZukzsdqK&secret=DOWuJnVGdcpwInntlOJJLzoNwdTZIoRS',
  headers: {
    'User-Agent': 'Plurlist/0.1 +https://plurlist-sk222sw.c9users.io/'
  }
};

function showInfo(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.profile);
  }
  else {
    console.log(error);
    console.log(response.statusCode);
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.results[0].resource_url);
    const options2 = {
      url: info.results[0].resource_url,
      headers: {
        'User-Agent': 'Plurlist/0.1 +https://plurlist-sk222sw.c9users.io/'
      }
    }
    request(options2, showInfo);
  }
  else {
    console.log(response.statusCode);
  }
}

request(options, callback);

// https://api.discogs.com/artists/125246