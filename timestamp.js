var express = require('express');
var app = express();
var timestamp = {

//Unchanging null object for response
  nullres: {unix: null, natural: null},

//Blank object to change
  res: {unix: null, natural: null},

//Regular expression for a 10 digit number assumed to be a unix format timestamp
  unixregex: /[0-9]{10}/,

//Variable to tell whether the current value is unix format
  isunixvar: false,

//Checks the unix value for unix format
  isunix: function(){
    if(this.unixregex.test(this.res.unix) == true){
      this.isunixvar = true;
      console.log("isunix: " + this.res);
      if(this.isnaturalvar == false){
        this.res.natural = this.res.unix.toUTCString();
        this.isnatural();
      }
    }
    else{
      this.isunixvar = false;
    }
  },

//States whether current natural value is natural
  isnaturalvar: false,

//Checks natural value for natural properties
  isnatural: function(){
    if(Date.parse(this.res.natural) != NaN){
      this.isnaturalvar = true;
      console.log("isnatural: " + this.res);
      if(this.isunix == false){
        this.res.unix = Date.parse(this.res.natural);
        this.isunix();
      }
    }
    else{
      this.isnaturalvar = false;
    }
  },

//Controls response from server
  response: function(){
    if(this.isunixvar == true && this.isnaturalvar == true){
      return this.res;
    }
    else{
      return this.nullres;
    }
  },

//Sets values to be checked from inout and cinitiates method calls
  dateparse: function(date){
    this.res.unix = date;
    this.res.natural = date;

    this.isnatural();
    this.isunix();//redundant check to be sure
    return this.response();
  }
};

//Express server creation
app.get('/:date', function(req, res){


  res.json(timestamp.dateparse(req.params.date));
  res.end();
   });

//Initiates server on specified port
app.listen(8080);
