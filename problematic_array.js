function checkCashRegister(price, cash, cid) {
    //Check vars work...
    checkInputVars(price, cash, cid);
    
    // Check if enough money in draw to even consider giving change
    checkCashInDraw(price, cash, cid);
}

checkCashRegister(335.41, 450, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

function checkCashInDraw (productPrice, customerCash, registerTally){
    // Create a copy of my array
    let cashUsedArray = [...registerTally];
    console.log("Here's my register tally BEFORE THE cash used array re-zero LOOP: ");
    console.table(registerTally);
    let totalCash = 0;

    // get total cash, re-zero cashUsed table
    for (let i = 0; i < registerTally.length; i++){
        totalCash += registerTally[i][1];
        cashUsedArray[i][1] = 0;
    }
    console.log("Here's my register tally array AFTER the re-zero loop... why is it 0's? ");
    console.table(registerTally);
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

    // Establish a changeCounter var (which is the same as changeNeeded, but separate for now)
    let changeCounter = 0;
    console.log("Here's my cash used array BEFORE THE LOOP: ");
    console.table(cashUsedArray);
    
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
            if (changeCounter >= 100 && registerTally["ONE HUNDRED"][1] >= 100){ 
                changeCounter -= 100;
                cashUsedArray["ONE HUNDRED"][1] += 100;
                registerTally["ONE HUNDRED"][1] -= 100;
                
                // 1. check registerTally["ONE HUNDRED"] >= 100
                // 2. decrease changeCounter by 100
                // 3. record the denomination used somehow
                // 4. decrease registerTally["ONE HUNDRED"] BY 100
            }
            else if (changeCounter >= 20 && registerTally["TWENTY"][1] >= 20) {
                changeCounter -= 20;
                cashUsedArray["TWENTY"][1] += 20;
                registerTally["TWENTY"][1] -= 20; 
            }
            else if (changeCounter >= 10 && registerTally["TEN"][1] >= 10) {
                changeCounter -= 10;
                cashUsedArray["TWENTY"][1] += 10;
                registerTally["TWENTY"][1] -= 10; 
            }
            else if (changeCounter >= 5 && registerTally["FIVE"][1] >= 5) {
                changeCounter -= 5;
                cashUsedArray["FIVE"][1] += 5;
                registerTally["FIVE"][1] -= 5; 
            }
            else if (changeCounter >= 1 && registerTally["ONE"][1] >= 1) {
                changeCounter -= 1;
                cashUsedArray["FIVE"][1] += 1;
                registerTally["FIVE"][1] -= 1; 
            }
            else if (changeCounter >= 0.25 && registerTally["QUARTER"][1] >= 0.25) {
                changeCounter -= 0.25;
                cashUsedArray["QUARTER"][1] += 0.25;
                registerTally["QUARTER"][1] -= 0.25; 
            }
            else if (changeCounter >= 0.1 && registerTally["DIME"][1] >= 0.1) {
                changeCounter -= 0.1;
                cashUsedArray["DIME"][1] += 0.1;
                registerTally["DIME"][1] -= 0.1; 
            }
            else if (changeCounter >= 0.05 && registerTally["NICKEL"][1] >= 0.05) {
                changeCounter -= 0.05;
                cashUsedArray["NICKEL"][1] += 0.05;
                registerTally["NICKEL"][1] -= 0.05; 
            }
            // and the rest of them going down
            else if (changeCounter >= 0.01 && registerTally["PENNY"][1] >= 0.01) {
                changeCounter -= 0.01;
                cashUsedArray["PENNY"][1] += 0.01;
                registerTally["PENNY"][1] -= 0.01; 
            }
        }
        while (changeCounter > 0);
        console.log("Here's my cash used array after everything: ");
        console.table(cashUsedArray);
        console.log("Here's my register tally after everything: ");
        console.table(registerTally);
    }
    // move on with checks
}

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    console.log("The cid: ");
    console.table(inputCid);
}

