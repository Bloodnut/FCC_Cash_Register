function checkCashRegister(price, cash, cid) {
    //Check vars work...
    checkInputVars(price, cash, cid);
    
    // Check if enough money in draw to even consider giving change
    checkCashInDraw(price, cash, cid);
}

checkCashRegister(335.41, 670.82, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

function checkCashInDraw (productPrice, customerCash, registerTally){
    // Determine amount in draw
    let totalCash = 0;
    for (let i = 0; i < registerTally.length; i++){
        totalCash += registerTally[i][1];
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
        /* do-while to evaluate these numbers
        do {
            if (changeCounter >= 100) {
                // check registerTally["ONE HUNDRED"] >= 100
                // decrease changeCounter by 100
                // record the denomination used somehow
                // decrease registerTally["ONE HUNDRED"] BY 100
            }
            else if (changeCounter >= 20) {
                // check registerTally["TWENTY"] >= 20
                // decrease changeCounter by 20
                // record the denomination used 
            }
            else if (changeCounter >= 10) {
                // etc etc 
            }
            // and the rest of them going down
            else {
                // pennies
            }
        }
        while (changeCounter > 0);
        */
    }
    // move on with checks
}

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    console.log("The cid: ");
    console.table(inputCid);
}

function check100s ()