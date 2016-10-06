var express = require('express');
var app = express();
var convert = require('./convert.js');
var timestamp = {

//Unchanging null object for response
  nullres: {unix: null, natural: null},

//Blank object to change
  res: {unix: null, natural: null},

//Regular expression for a 10 digit number assumed to be a unix format timestamp
  unixregex: /\D|\s/gi,

  naturalregex: /\D\s/gi,

//Variable to tell whether the current value is unix format
  isunixvar: false,

//Checks the unix value for unix format
  isunix: function(){
    if(this.unixregex.test(this.res.unix) == false){
      this.isunixvar = true;
      console.log("isunix: " + this.res.unix + " : " + this.res.natural);
      console.log("isunix: " + this.isunixvar + " : " + this.isnaturalvar);
      if(this.isnaturalvar == false){
        this.res.natural = convert.unixtonatural(this.res.unix);
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
    if(this.naturalregex.test(this.res.natural) == true){
      this.isnaturalvar = true;
      console.log("isnatural: " + this.res.unix + " : " + this.res.natural);
      console.log("isnatural: " + this.isunixvar + " : " + this.isnaturalvar);
      if(this.isunixvar == false){
        this.res.unix = convert.naturaltounix(this.res.natural);
        console.log("isnatural from convert" + this.res.unix + " = " + convert.unix);
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

    this.isunix();
    //redundant check to be sure
    this.isnatural();
    return this.response();
  },

//Resets the variables for the next call
  reset: function(){
    this.isunixvar = false;
    this.isnaturalvar = false;
    this.res = Object.create(this.nullres);
  }
};

//Express server creation
app.get('/:date', function(req, res){
  res.json(timestamp.dateparse(req.params.date));
  res.end();
  timestamp.reset();
   });

//Initiates server on specified port
app.listen(8080);
