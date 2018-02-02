// Research dotenv!!
// require('dotenv').config();

// var client = new Twitter(keys.twitter);
// var spotifyKey = require("node-spotify-api");
var apiKeys = require("./keys.js");
var Twitter = require('twitter');

// ---Function ---

// Can use function declaration or expression
var myTweets = function(newTweet) {
  var client = new Twitter(apiKeys.twitter);
    // console.log("tweets are fun");
  var params = { screen_name: "chengman303" };
  
  if(newTweet) {
    // do this if user provides new tweet
    console.log("Tweet the Fung Bros " + newTweet);
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
            // console.log("+++++++++++++++++");
            // console.log(" ");
        }
      }
    });
  }
}
var mySong = function() {
  // console.log("my songs is the best");







}

var myMovie = function() {
  console.log("my movie is the best");

}

var myRequest = function() {
  console.log("my request....");
}


var liriMagic = function(mediaType, content) {
  // console.log(process.argv[0]);
  // console.log(process.argv[1]);

  switch (mediaType) {
    //First if / else statement like...
    case "my-tweets":
    myTweets();
      console.log("tweeeet tweeet");
      break; //exit the switch case

    case "spotify-this-song":
    mySong();
      console.log("Bruno Mars is the best");
      break;
      
    case "movie-this":
    myMovie();
      console.log("Where's Waldo");
      break;

    case "do-what-it-says":
    myRequest();
      console.log("Simon says green");
      break;
      // default is else statement
    default:
      console.log("I like Pepsi over Coke");
      // text = "LIRI has no idea what you are doing?";
      break;
  }
}

// Main Process
// Calling liriMagic upholding two arguments 
liriMagic(process.argv[2], process.argv[3]);