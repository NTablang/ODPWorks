function reverseString(str) {
    return str.length == 0 ? "" : str.charAt(str.length - 1) + reverseString(str.substring(0,str.length - 1));
}

// Do not edit below this line
module.exports = reverseString;
