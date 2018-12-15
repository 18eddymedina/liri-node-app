require("dotenv").config();
var axios=require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");

var keys=require("./keys");
var spotify = new Spotify(keys.spotify);
var arg=process.argv;
var temp;

//console.log(spotify);
var inputOne=arg[2];
temp=arg.slice(3).join(" ");

if (arg.length>4){
    for(var count =4;count <arg.length;count++){
        arg[3]+="%20"+arg[count];
       
    }
}
if(arg.length<3){
    console.log("Incorrect Number of Inputs. Please run program again with right amount of inputs");
}
else{
    append1("\r\n\r\n"+arg[2]+ " "+temp);
    append1('\n');



    switch(inputOne) {

        case "spotify-this-song":
        console.log(temp);
        if(arg[3]==undefined){
            arg[3]="The Sign"
        }
        spotify.search({ type: 'track', query: arg[3]}, function(error, response) {
            if (error) {
            }
            else{
                console.log("Song Artist: "+response.tracks.items[0].artists[0].name);  
                append1("\r\nSong Artist: "+response.tracks.items[0].artists[0].name)          
                console.log("Song Name: "+response.tracks.items[0].name); 
                append1("\r\nSong Name: "+response.tracks.items[0].name);
                console.log("Song Album: "+response.tracks.items[0].album.name);   
                append1("\r\nSong Album: "+response.tracks.items[0].album.name);
                console.log("Song Link: "+response.tracks.items[0].external_urls.spotify);
                append1("\r\nSong Link: "+response.tracks.items[0].external_urls.spotify);           
            }
        });
        check=false;
            break;
    
    




        case "concert-this":
        var url = "https://rest.bandsintown.com/artists/" + arg[3] + "/events?app_id=codingbootcamp";
    
        request(url, function(error, response,body) {
            if (response) {
           var results = JSON.parse(body);
           for (var i in results) {
               console.log('\n');
               console.log("Venue Name: "+results[i].venue.name);
               console.log("Venue City: "+results[i].venue.city);
               console.log("Date of Event: "+results[i].datetime);
                append1("\r\nVenue Name: "+results[i].venue.name);
                append1("\r\nVenue City: "+results[i].venue.city);
                append1("\r\nDate of Event: "+results[i].datetime);


           }
            } 
        })
    check=false;
            break;










        case "movie-this":
        var url1 = 'http://www.omdbapi.com/?t=' + arg[3] + '&y=&plot=short&tomatoes=true&apikey=trilogy';
        request(url1, function(error, response, body) {
            if (!error) {
                var data = JSON.parse(body);
                console.log("\n");
                var movie=" \r\nTitle: "+data.Title+"\r\nYear: "+data.Year+"\r\nIMDB Rating: "+data.imdbRating+"\r\nRotton Tomatoes Rating: "+data.imdbRating+"\r\nCountry Origin: "+data.Country+"\r\nLanugage: "+data.Language+"\r\nActors: "+data.Actors+"\r\nPlot: "+data.Plot+'\n';
                console.log(movie);
                append1(movie);
               }
        });

        check=false;
            break;
        
        
        
            case "do-what-it-says":
            fs.readFile('./random.txt', "utf8",function(err, data) {
                if (err) {
                    throw err;
                }
                var content = data;
                append1(content);
                content=content.split(",");
                // Invoke the next step here however you like
                inputOne=content[0];
                arg[3]=content[1];
                switch(inputOne) {

                    case "spotify-this-song":
                    console.log(temp);
                    if(arg[3]==undefined){
                        arg[3]="The Sign"
                    }
                    spotify.search({ type: 'track', query: arg[3]}, function(error, response) {
                        if (error) {
                        }
                        else{
                            console.log("Song Artist: "+response.tracks.items[0].artists[0].name);  
                            append1("Song Artist: "+response.tracks.items[0].artists[0].name)          
                            console.log("Song Name: "+response.tracks.items[0].name); 
                            append1("Song Name: "+response.tracks.items[0].name);
                            console.log("Song Album: "+response.tracks.items[0].album.name);   
                            append1("Song Album: "+response.tracks.items[0].album.name);
                            console.log("Song Link: "+response.tracks.items[0].external_urls.spotify);
                            append1("Song Link: "+response.tracks.items[0].external_urls.spotify);           
                        }
                    });
                    check=false;
                        break;
                
                
            
            
            
            
                    case "concert-this":
                    var url = "https://rest.bandsintown.com/artists/" + arg[3] + "/events?app_id=codingbootcamp";
                
                    request(url, function(error, response,body) {
                        if (response) {
                       var results = JSON.parse(body);
                       for (var i in results) {
                           console.log('\n');
                           console.log("Venue Name: "+results[i].venue.name);
                           console.log("Venue City: "+results[i].venue.city);
                           console.log("Date of Event: "+results[i].datetime);
                            append1("\nVenue Name: "+results[i].venue.name);
                            append1("Venue City: "+results[i].venue.city);
                            append1("Date of Event: "+results[i].datetime);
            
            
                       }
                        } 
                    })
                check=false;
                        break;
            
            
            
            
            
            
            
            
            
            
                    case "movie-this":
                    var url1 = 'http://www.omdbapi.com/?t=' + arg[3] + '&y=&plot=short&tomatoes=true&apikey=trilogy';
                    request(url1, function(error, response, body) {
                        if (!error) {
                            var data = JSON.parse(body);
                            console.log("\n");
                            var movie=" \nTitle: "+data.Title+"\nYear: "+data.Year+"\nIMDB Rating: "+data.imdbRating+"\nRotton Tomatoes Rating: "+data.imdbRating+"\nCountry Origin: "+data.Country+"\nLanugage: "+data.Language+"\nActors: "+data.Actors+"\nPlot: "+data.Plot+'\n';
                            console.log(movie);
                            append1(movie);
                           }
                    });
            
                    check=false;
                        break;}
            });
            break;
        
    }

}



function append1(data){
    fs.appendFile("log.txt", data , function(err){

		//If an error happens while trying to write to the file
		if (err){
			return console.log(err);
		}
	});
}
