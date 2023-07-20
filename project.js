



// 5. Check if the user has won
// 6. Give them their winnings 
// 7. Play again
const prompt = require('prompt-sync')();


// Defining the Global variables
const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8

}

const Symbol_Multiplier = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2

}



// 1. Deposit the users money

const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter the amount you want to deposit: ");

        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount < 0) {
            console.log("Enter a valid Deposit Amount.");
        }
        else {
            return numberDepositAmount;
        }
    }
}
// 2. Determine the number of lines to bet on

const numberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the No. of lines (1-3): ");

        const numberOfLines = parseFloat(lines);
        if (isNaN(numberOfLines) || numberOfLines < 0 || numberOfLines > 3) {
            console.log("Enter valid No. of lines");
        }
        else {
            return numberOfLines;
        }
    }
}

// 3. Collect the bet Amount
const betAmount = (balance , lines) => {
    while (true) {
        const bet = prompt("Enter the Bet amount per line : ");

        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet < 0 || numberBet > (balance/lines)) {
            console.log("Enter a valid Bet Amount.");
        }
        else {
            return numberBet;
        }
    }
}



// 4. Spin the slot machine
const spin = () =>  {
    const symbols = [];
    for (const[symbol ,count] of Object.entries(SYMBOL_COUNT)){
        for (let i = 0 ; i < count ; i++ ){
            symbols.push(symbol);
        }
    }

    const reels  = [];
    for (let i = 0 ; i < COLS ; i++){
        reels.push([]);
        const newSymbol = [...symbols];
        for (let j = 0 ; j < ROWS ; j++){
            const randomIndex = Math.floor(Math.random() * newSymbol.length);
            reels[i].push(newSymbol[randomIndex]);
            newSymbol.splice(randomIndex,1);
        }
    }
    return reels;
}

const transpose = (reels) => {
    const rows = [];
    for (let i = 0 ; i < ROWS ; i++){
        rows.push([]);
        for (let j = 0 ; j < COLS  ; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const display = (rows) => {
    for (const row of rows){
        let newString = "";
        for (const[i,symbol] of row.entries(rows)){
            newString += symbol;
            if (i != row.length - 1){
                newString += " | ";
            }
        }
        console.log(newString);
    }
    
}


const getWinnings = (rows , bet ,lines) => {
    let winning = 0;
    for (let row  = 0 ; row < lines ; row++){
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols ){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        
        }
        if (allSame){
            winning += bet * Symbol_Multiplier[symbols[0]];
        }
    }
    return winning
}

const game = () => {
    let balance = deposit();

    while (true){
    console.log("You have a balance of " + balance)
    const lines = numberOfLines();
    let bet = betAmount(balance,lines);
    balance -= bet * lines;
    const reels  = spin();
    const rows = transpose(reels);
    const displays = display(rows);
    console.log(displays);
    const winnings = getWinnings(rows , bet , lines);
    balance += winnings
    console.log(" You Won, $" + winnings.toString());
    if (balance == 0){
        console.log("You are out of balance ");
        break;
    }
    const nextGame = prompt("Do you want to play again ? (Y/N)")
    if(nextGame != "Y") {
        console.log("Thank You Visit Again Later");
        break;
}
    }
}
game();
