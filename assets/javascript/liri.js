// Research dotenv!!
// require('dotenv').config();

var apiKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

// ---Function ---
// Twitttter ---------------------------------------
var myTweets = function(newTweet) {
  var client = new Twitter(apiKeys.twitter);
    console.log("tweets are fun");
  var params = { screen_name: "chengman303", count: 20 };
  
  if(newTweet) {
    // do this if user provides new tweet
    console.log("Tweet this " + newTweet);
  } else {

    // else print out 20 latest tweets
      client.get("statuses/user_timeline", params, function(
      error,
      tweets,
      response
    ) {
      if (!error) {
        var tweetCount = (tweets.length >= 20) ? 20 : tweets.length;
        
        console.log(tweets);
        // 
        for (var i = 0; i < tweetCount; i++) {
            console.log(tweets[i].text);
            console.log("------------------------------------------------");
            console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
        };
      };
    });
  }
}
var mySong = function(songRequest) {
  spotify = new Spotify ({
    id: "efaa22009ac04c47bc4de7a6d272c8e2",
    secret: "456cc28a892642ad853a5f907031aaa1"
  })
  // Default if no song is entered
  if (!songRequest) {
    songRequest = "That's What I Like";
  }
  spotify.search({ type: 'track', query: songRequest }, function(err, data) {
    if ( err ) {
        return console.log('Error occurred: ' + err);
    }
    // console.log(data.tracks.items[0].album.artists[0]);
    // Artist

    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("------------------------------------------------");
 
    // // Song Name

    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
    console.log("------------------------------------------------");
    // // Arist Name

    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("------------------------------------------------");
    // Preview Link

    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("------------------------------------------------");
    // Album Name
  });
};
var myMovie = function(selectMovie) {
  // Default movie 
  if (!selectMovie) {
    selectMovie = "Mr. Nobody";
  };
  // console.log("my movie is the best");
  request(
    "http://www.omdbapi.com/?t=" +
      selectMovie +
      "&y=&plot=short&apikey=trilogy",
    function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        //Title of movie
        console.log("Title of movie: " + JSON.parse(body).Title);
        console.log("-------------------------------------------------------");

        //Year movie came out
        console.log("Year movie came out: " + JSON.parse(body).Year);
        console.log("-------------------------------------------------------");

        //IMBD Rating
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        console.log("-------------------------------------------------------");

        //Country where movie produced
        console.log("Country: " + JSON.parse(body).Country);
        console.log("-------------------------------------------------------");

        //Language of the movie
        console.log("Language: " + JSON.parse(body).Language);
        console.log("-------------------------------------------------------");

        //Plot Movie
        console.log("Plot of movie: " + JSON.parse(body).Plot);
        console.log("-------------------------------------------------------");

        //Actors movie
        console.log(
          "Here are the actors/actresses in this movie: " +
            JSON.parse(body).Actors
        );
        console.log("-------------------------------------------------------");

        //Rotten Tomatoes Rating
        if (!JSON.parse(body).Ratings[1]) {
          console.log("Error: There is no Rotten Tomatoe Ratings");
          console.log(
            "-------------------------------------------------------"
          );
        } else {
          console.log(
            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
          );
          console.log(
            "-------------------------------------------------------"
          );
        };
      };
    });
};

var myRequest = function(hola) {
  // console.log("my request....");
  fs.readFile("./../../random.txt", "utf8", function(err, data) {
    if(err) {
      return console.log(err);
    } ;
    var dataArr = data.split(",");
        liriMagic(dataArr[0], dataArr[1]);
  })
};

var liriMagic = function(mediaType, content) {
  // console.log(process.argv[0]);
  // console.log(process.argv[1]);

  switch (mediaType) {
    //First if / else statement like...
    case "my-tweets":
    myTweets(content);
      // console.log("tweeeet tweeet");
      break; //exit the switch case

    case "spotify-this-song":
    mySong(content);
      // console.log("Bruno Mars is the best");
      break;
      
    case "movie-this":
    myMovie(content);
      // console.log("Where's Waldo");
      break;

    case "do-what-it-says":
    myRequest(content);
      // console.log("Simon says green");
      break;
      // default is else statement
    default:
      console.log("Console.log switch case works for default");
      // text = "LIRI has no idea what you are doing?";
      break;
  };

  // Bonus
 	// below is how we log our commands to the log.txt file:
	var newCommand = process.argv[2];

	fs.appendFile("./../../log.txt", newCommand, function(err) {
    if (err) {
      console.log(err);
    }
    if (process.argv[3]) {
      newCommand = newCommand + ",'" + process.argv[3] + "',";
    }
  });
}

// Main Process
// Calling liriMagic upholding two arguments 
liriMagic(process.argv[2], process.argv[3]);