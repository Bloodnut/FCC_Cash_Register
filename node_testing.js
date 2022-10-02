function checkCashRegister(price, cash, cid) {
    //Check vars work...
    checkInputVars(price, cash, cid);
    
    // Check if enough money in draw to even consider giving change
    checkCashInDraw(price, cash, cid);
}

checkCashRegister(335.41, 450, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

function checkCashInDraw (productPrice, customerCash, registerTally){
    // Create a copy of my array
    let cashUsedArray = registerTally.map(function(arr){
        return arr.slice();
    });
    let totalCash = 0;

    // get total cash, re-zero cashUsed table
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

    // Establish a changeCounter var to track deductions
    let changeCounter = changeNeeded;
    
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
        // do-while to evaluate these numbers
        do {
            console.log(`${changeCounter}`);
            if (changeCounter >= 100 && registerTally[0][1] >= 100){ 
                changeCounter -= 100;
                cashUsedArray[0][1] += 100;
                registerTally[0][1] -= 100;
                console.log("took one ONE HUNDRED out");
                
                // 1. check registerTally["ONE HUNDRED"] >= 100
                // 2. decrease changeCounter by 100
                // 3. record the denomination used somehow
                // 4. decrease registerTally["ONE HUNDRED"] BY 100
            }
            else if (changeCounter >= 20 && registerTally[1][1] >= 20) {
                changeCounter -= 20;
                cashUsedArray[1][1] += 20;
                registerTally[1][1] -= 20; 
                console.log("took one ONE TWENTY out");
            }
            else if (changeCounter >= 10 && registerTally[2][1] >= 10) {
                changeCounter -= 10;
                cashUsedArray[2][1] += 10;
                registerTally[2][1] -= 10; 
                console.log("took one TEN out");
            }
            else if (changeCounter >= 5 && registerTally[3][1] >= 5) {
                changeCounter -= 5;
                cashUsedArray[3][1] += 5;
                registerTally[3][1] -= 5; 
                console.log("took one FIVE out");
            }
            else if (changeCounter >= 1 && registerTally[4][1] >= 1) {
                changeCounter -= 1;
                cashUsedArray[4][1] += 1;
                registerTally[4][1] -= 1; 
                console.log("took one ONE out");
            }
            else if (changeCounter >= 0.25 && registerTally[5][1] >= 0.25) {
                changeCounter -= 0.25;
                cashUsedArray[5][1] += 0.25;
                registerTally[5][1] -= 0.25; 
                console.log("took one QUARTER out");
            }
            else if (changeCounter >= 0.1 && registerTally[6][1] >= 0.1) {
                changeCounter -= 0.1;
                cashUsedArray[6][1] += 0.1;
                registerTally[6][1] -= 0.1; 
                console.log("took one DIME out");
            }
            else if (changeCounter >= 0.05 && registerTally[7][1] >= 0.05) {
                changeCounter -= 0.05;
                cashUsedArray[7][1] += 0.05;
                registerTally[7][1] -= 0.05; 
                console.log("took one NICKEL out");
            }
            else if (changeCounter >= 0.01 && registerTally[8][1] >= 0.01) {
                changeCounter -= 0.01;
                cashUsedArray[8][1] += 0.01;
                registerTally[8][1] -= 0.01; 
                console.log("took one PENNY out");
            }
        }
        while (changeCounter = 0);
        console.log("Here's my cash used array after everything was deducted: ");
        console.table(cashUsedArray);
        console.log("Here's my register tally after everything was deducted: ");
        console.table(registerTally);
    }
    // move on with checks
}

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    // console.log("The cid: ");
    // console.table(inputCid);
}

