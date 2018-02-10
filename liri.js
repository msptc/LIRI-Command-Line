var keys = require('./keys.js');
var twitter = require("twitter");
var spot = require("spotify");
var request = require("request");
var dotenv = require("dotenv").config();
var x = require('fs');

// user is given options to choose from
console.log("Enter my-tweets, spotify-this-song, movie-this, or do-what-it-says to begin.");

// process.argv[2] selects which api will be used and process.argv[3] is search paramaters
var userInput = process.argv[2];
var secondUserInput = process.argv[3];
// processes multiple words. triggered if user types something other than above as a first paramater
  for(i=4; i<process.argv.length; i++){
    secondUserInput += '+' + process.argv[i];
  }

function whichAPI(){
  switch(userInput){

    case 'my-tweets':
    getTweets();
    break;

    case 'spotify-this-song':
    getSong();
    break;

    case 'movie-this':
    getMovie();
    break;

    case 'do-what-it-says':
    whatItSays();
    break;
  }
};

// functions
// getTweets function
function getTweets(){
  var client = new twitter ({
    consumer_key:
    consumer_secret:
    access_token_key:
    access_token_secret:
  });

  var twitterParameters = {
    screen_name= 'JJohningsley',
    count:20
  };

  client.get('statuses/user_timeline', twitterParameters, function(error, tweets, resonse){
    if(!error) {
      for (i=0; i<tweets.length; i++){
        var rData = ('Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
          console.log(rData);
          console.log("------------")
      }
    };
  });
};
// getSongs function
function getSong(){
  var searchSongs;

  if(secondUserInput === undefined){
    searchSongs = "The Sign";
  }else{
    searchSongs = secondUserInput;
  }

  spotify.search({type:'track', query:searchSongs}, function(err,data){
    if(err){
      console.log('Error: ' + err);
      return;
    }
    else{
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
    }
  });
};
// getMovie function
function getMovie(){
  console.log("How about a movie?");

  var movieSearch;
  if(secondUserInput === undefined){
    movieSearch = "Mr. Nobody";
  }else{
    movieSearch = secondUserInput;
  };

  var url = 'http://www.omdbapi.com/?t=' + movieSearch +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	    }
    });
}

function whatItSays(){
    console.log("Viewing random.txt");
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log(error);
        
        }else{
            var dataArrray = data.split(',');
                userInput = dataArray[0];
                secondUserInput = dataArrray[1];

                for (i=2 i<dataArrray.length; i++){
                    secondUserInput = secondUserInput + "+" + dataArrray[i];

                };
                whichAPI();

        };
    });
};

whichAPI();

