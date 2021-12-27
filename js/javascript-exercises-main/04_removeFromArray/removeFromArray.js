const removeFromArray = function(nums, ...arr) {
    for (let i = 0; i < arr.length; i++) {
        let indexToRemove = nums.indexOf(arr[i]);
        if (indexToRemove > -1) {
            nums.splice(indexToRemove, 1);
        }
    }
    return nums;
};

// Do not edit below this line
module.exports = removeFromArray;
