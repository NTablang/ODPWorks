function sumAll(startNum, endNum) {
    if (typeof startNum !== "number" || typeof endNum !== "number") {
        return "ERROR";
    }
    if (startNum < 0 || endNum < 0) {
        return "ERROR";
    }
    if (startNum == endNum) {
        return endNum;
    }
    if (endNum < startNum) {
        // swap
        let temp = endNum;
        endNum = startNum;
        startNum = temp;
    }
    return startNum + sumAll(startNum + 1, endNum);

}

// Do not edit below this line
module.exports = sumAll;
