function checkCashRegister(price, cash, cid) {
    //Check vars work...
    checkInputVars(price, cash, cid);
    // totalCashInDraw(cid);
}



checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    console.log("The cid: ");
    console.table(inputCid);
}