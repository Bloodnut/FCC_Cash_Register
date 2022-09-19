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
    let totalCash = 0;
    for (let i = 0; i < registerTally.length; i++){
        totalCash += registerTally[i][1];
    }
    let totalCashRounded = totalCash.toFixed(2);
    console.log("Total Cash in the draw = " + totalCashRounded);
    
    let changeNeeded = customerCash - productPrice;
    totalCashRounded > changeNeeded ? 
    console.log(`Yep, we have more cash in the till than your change: $${changeNeeded}... Need to check we have the CORRECT change though`) :
    console.log(`We literally don't have enough money to cover your change: $${changeNeeded}`);
    return(changeNeeded);
}