/*
Convert module converts dates from one form to another.
convert.unixtonatural(unix in seconds) returns a natural date
convert.naturaltounix(natural) returns a unix date in seconds
*/
var convert = {
  year: 0,

  day: 0,

  month: "",

  dom: 1,

  natural: "",

  unix: 0,

  moty: {
    noLeap: [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
    leap:   [31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthindex: 0
  },

  isleap: false,

  unixtonatural: function(unix){
    this.unix = unix;
    this.year = Math.floor((this.unix / 31557600) + 1970);
    this.day = Math.ceil((this.unix % 31557600) / 86400);
    console.log(Math.ceil((this.unix % 31557600)/86400));
    if(this.year % 4 == 0){
      this.isleap = true;
    }
    else{
      this.isleap = false;
    };

    if(this.isleap == true){
      for(var i = 0; i <= 11; i++){
        if(this.day <= this.moty.leap[i]){
          this.moty.monthindex = i;
        }
      }
      this.month = this.moty.month[this.moty.monthindex];
      this.dom = this.day - this.moty.leap[this.moty.monthindex] + 1;
    }
    else{
      for(var i = 0; i <= 12; i++){
        if(this.day <= this.moty.noleap[i]){
          this.moty.monthindex = i;
        }
      }
      this.month = this.moty.month[this.moty.monthindex];
      this.dom = this.day - this.moty.noleap[this.moty.monthindex] + 1;
    };

    this.natural = this.month + " " + this.dom + ", " + this.year;
    return this.natural;
  },

  naturaltounix: function(natural){
    this.natural = natural;
    this.unix = Date.parse(this.natural)/100000;
    console.log("convert.naturaltounix: " + this.unix + " : " + this.natural);
    return this.unix;
  }
};

module.exports = convert;
