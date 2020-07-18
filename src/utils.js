const moment = require("moment")

exports.thousand_separator = (num) => {
  return num.toLocaleString();
};

exports.roundOff = (value) => {
  return value.toFixed(1);
};


exports.formattedDate = (date)=>{
  return   moment(date).format('MMMM Do YY');
};


exports.agoDate = (date)=>{
  return   moment(date).fromNow();
};

