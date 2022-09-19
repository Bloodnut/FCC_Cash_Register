function checkCashRegister(price, cash, cid) {
    //Check vars work...
    checkInputVars(price, cash, cid);
    totalCashInDraw(cid);
}
checkCashRegister(2, 1, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);


function totalCashInDraw (cashTable){
    let totalCash = 0;
    for (let i = 0; i <= cashTable.length; i++){
        // totalCash += cashTable[i][1];
        console.log(cashTable[i][1]);
    }
    console.log("Total Cash in the draw = " + totalCash);
}

function checkInputVars (inputPrice, inputCash, inputCid) {
    console.log("Here are my input vars \nThe price: " + inputPrice);
    console.log("The cash: " + inputCash);
    console.log("The cid: ");
    console.table(inputCid);
}