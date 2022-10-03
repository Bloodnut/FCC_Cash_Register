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
    let changeNeeded = Math.abs(parseFloat((customerCash - productPrice).toFixed(2)));
    let cashDifference = Math.abs(parseFloat((totalCashRounded - changeNeeded).toFixed(2)));

    // Establish a changeCounter var to track deductions
    let changeCounter = changeNeeded;

    // determine if we need to calculate change, respond accordingly... 
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
        fccObject["change"] = registerTally;
        console.log(`The object value is: ` + JSON.stringify(fccObject));
        return fccObject;
    }
    else{
        console.log(`Yep, we have more cash in the till than your change: $${changeNeeded}... Need to check we have the CORRECT change though`);
        // do-while to evaluate these numbers
        do {
            console.log(`the change counter is: ${changeCounter}`);
            if (changeCounter >= 100 && registerTally[8][1] >= 100){ 
                console.log(`my change Counter before I remove 100 from it: ${changeCounter}`);
                console.log(typeof changeCounter);
                changeCounter = (changeCounter - 100).toFixed(2);
                cashUsedArray[8][1] += 100;
                registerTally[8][1] -= 100;
                console.log("took one ONE HUNDRED out");
                
                // 1. check registerTally["ONE HUNDRED"] >= 100
                // 2. decrease changeCounter by 100
                // 3. record the denomination used somehow
                // 4. decrease registerTally["ONE HUNDRED"] BY 100
            }
            else if (changeCounter >= 20 && registerTally[7][1] >= 20) {
                changeCounter = (changeCounter - 20).toFixed(2);
                cashUsedArray[7][1] += 20;
                registerTally[7][1] -= 20; 
                console.log("took one ONE TWENTY out");
            }
            else if (changeCounter >= 10 && registerTally[6][1] >= 10) {
                changeCounter = (changeCounter - 10).toFixed(2);
                cashUsedArray[6][1] += 10;
                registerTally[6][1] -= 10; 
                console.log("took one TEN out");
            }
            else if (changeCounter >= 5 && registerTally[5][1] >= 5) {
                changeCounter = (changeCounter - 5).toFixed(2);
                cashUsedArray[5][1] += 5;
                registerTally[5][1] -= 5; 
                console.log("took one FIVE out");
            }
            else if (changeCounter >= 1 && registerTally[4][1] >= 1) {
                changeCounter = (changeCounter - 1).toFixed(2);
                cashUsedArray[4][1] += 1;
                registerTally[4][1] -= 1; 
                console.log("took one ONE out");
            }
            else if (changeCounter >= 0.25 && registerTally[3][1] >= 0.25) {
                changeCounter = (changeCounter - 0.25).toFixed(2);
                cashUsedArray[3][1] = parseFloat((cashUsedArray[3][1] + 0.25).toFixed(2));
                registerTally[3][1] = parseFloat((registerTally[3][1] - 0.25).toFixed(2)); 
                console.log("took one QUARTER out");
            }
            else if (changeCounter >= 0.1 && registerTally[2][1] >= 0.1) {
                changeCounter = (changeCounter - 0.1).toFixed(2);
                cashUsedArray[2][1] = parseFloat((cashUsedArray[2][1] + 0.1).toFixed(1));
                registerTally[2][1] = parseFloat((registerTally[2][1] - 0.1).toFixed(2)); 
                console.log("took one DIME out");
            }
            else if (changeCounter >= 0.05 && registerTally[1][1] >= 0.05) {
                changeCounter = (changeCounter - 0.05).toFixed(2);
                cashUsedArray[1][1] = parseFloat((cashUsedArray[1][1] + 0.05).toFixed(2));
                registerTally[1][1] = parseFloat((registerTally[1][1] - 0.05).toFixed(2)); 
                console.log("took one NICKEL out");
            }
            else if (changeCounter >= 0.01 && registerTally[0][1] >= 0.01) {
                changeCounter = (changeCounter - 0.01).toFixed(2);
                cashUsedArray[0][1] = parseFloat((cashUsedArray[0][1] + 0.01).toFixed(2));
                registerTally[0][1] = parseFloat((registerTally[0][1] - 0.01).toFixed(2));  
                console.log("took one PENNY out");
            }
            else {
                console.log(`We don't have the correct bills/coins to return your change: $${changeNeeded}`);
                fccObject["status"] = "INSUFFICIENT_FUNDS";
                fccObject["change"] = [];
                console.log(`The object value is: ` + JSON.stringify(fccObject));
                return fccObject;

                // THIS ISN'T ACTUALLY CORRECT, BUT IS A BETTER OUTCOME IMO
                // fccObject["status"] = "OPEN";
                // fccObject["change"] = cashUsedArray;
                // console.log(`The object value is: ` + JSON.stringify(fccObject));
                // return fccObject;
            }
        }
        while (changeCounter != 0);
        console.log("Here's my cash used array after everything was deducted: ");
        console.table(cashUsedArray);
        console.log("Here's my register tally after everything was deducted: ");
        console.table(registerTally);
        fccObject["status"] = "CLOSED";
        fccObject["change"] = cashUsedArray;
        console.log(`The object value is: ` + JSON.stringify(fccObject));
        return fccObject;
    }
    // move on with checks
}

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    // console.log("The cid: ");
    // console.table(inputCid);
}

