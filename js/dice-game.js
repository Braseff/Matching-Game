function rollDice() {
    let goldCoins = 0;
    for (let i=0; i<10; i++) {
        const roll = Math.floor(Math.random() * 6) +1;
        alert( 'You roll a ' + roll + '.')
        if (roll === 1) {
            alert('Game over, your trash!')
            break;
        }
        if (roll === 2 || roll === 3 || roll === 4) {
            alert('You got no coins, Bozo status');
            continue;
        }
        alert('Congrats!, you win ' + roll + ' Gold Coins');
        goldCoins += roll;
    }
    alert('You have won a total of ' + goldCoins + ' Gold Coins!')
}
