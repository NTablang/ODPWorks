const ftoc = function(ftemp) {
  let ctemp = (5.0/9.0) * (ftemp - 32.0);
  let rounded = Math.round(ctemp * 10) / 10
  return rounded;
}
const ctof = function(ctemp) {
  let ftemp = (9.0/5.0) * ctemp + 32.0;
  let rounded = Math.round(ftemp * 10) / 10
  return rounded;
}

// Do not edit below this line
module.exports = {
  ftoc,
  ctof
};
