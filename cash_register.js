function checkCashRegister(price, cash, cid) {
    // Check vars work...
    checkInputVars(price, cash, cid);
    
    // Check if enough money in draw to even consider giving change
    checkCashInDraw(price, cash, cid);
}



checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    console.log("The cid: ");
    console.table(inputCid);
}

function checkCashInDraw (productPrice, customerCash, registerTally){
    // Determine amount in draw
    let totalCash = 0;

    // Create a copy of my array
    let cashUsedArray = registerTally.map(function(arr){
        return arr.slice();
    });

    // tally register money, zer0 amounts for new array
    for (let i = 0; i < registerTally.length; i++){
        totalCash += registerTally[i][1];
        cashUsedArray[i][1] = 0;
    }
    let totalCashRounded = totalCash.toFixed(2);
    console.log("Total Cash in the draw = " + totalCashRounded);
    
    // build the object
    const fccObject = {
        status: "",
        change: ""
    };
    // Evaluate difference between change needed and money in till
    let changeNeeded = customerCash - productPrice;
    let cashDifference = totalCashRounded - changeNeeded;

    // determine if we need to calculate change, respond accordingly... we may need to revisit this if we don't have the right COINS for change too
    if (cashDifference < 0){
        console.log(`We literally don't have enough money to cover your change: $${changeNeeded}`);
        fccObject["status"] = "INSUFFICIENT_FUNDS";
        fccObject["change"] = [];
        console.log(`The object value is: ` + JSON.stringify(fccObject));
        return fccObject;
        // return object line; 
    }
    else if(cashDifference == 0){
        console.log(`We have the EXACT amount you need: $${changeNeeded}`);
        fccObject["status"] = "CLOSED";
        fccObject["change"] = totalCashRounded;
        console.log(`The object value is: ` + JSON.stringify(fccObject));
        return fccObject;
    }
    else{
        console.log(`Yep, we have more cash in the till than your change: $${changeNeeded}... Need to check we have the CORRECT change though`);
    }
    // move on with checks
}