// You can't just print objects, need to use stringify..... lol
/*
const myObject = {
    key1: "some letters",
    key2: 3123
};

console.log(`my object's output is ${myObject}`);
console.log(JSON.stringify(myObject));
*/

function doStuffToArray(inputArray){
    let newArray = [];
    let tally = 0;
    
    newArray = inputArray.map(function(arr){
        return arr.slice();
    });
    // get total cash, re-zero cashUsed table
    for (let i = 0; i < inputArray.length; i++){
        tally += inputArray[i][1];
        newArray[i][1] = 0;
    }
    
    console.log("Here's the new arr, where all values at pos [1] should be '0'");
    console.table(newArray);
    console.log("aaand Here's my input array AFTER doing stuff");
    console.table(inputArray);
}

doStuffToArray([["first thing", 1], ["second thing", 323], ["Third thing", 900], ["Fourth thing", 7661]]);
