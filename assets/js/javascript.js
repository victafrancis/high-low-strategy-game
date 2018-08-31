//testing getting the input from a text box and using the values inside
var mainDeck = [], credits, revealed = [], count, bet = 0, maxBet, minBet, highRoller;
var playerHealth, friendHealth, winRound;
var foodCost1,foodCost2,foodCost3,foodItem1,foodItem2,foodItem3;
var foodPurchase1,foodPurchase2,foodPurchase3,foodPurchase4,foodPurchase5,foodPurchase6;

function revealNumber() {
    revealed[count] = mainDeck.splice(Math.floor(Math.random() * mainDeck.length), 1);
    document.getElementById("showNumber").innerHTML = "Dealer's number: <b>" + revealed[count] + "</b></br> Do you want to bet HIGH or LOW?";
    count++;
}

function betHigh(){
    var bet = document.getElementById("bet");
    bet = parseInt(bet.value);

    //code to check if there are enough credits left
    if (bet > credits){
        alert("FRIEND: We don't have enough credits for that! :(");
        return;
    }
    else if (bet > maxBet && highRoller==false) {
        alert("FRIEND: The max bet inside the MAIN CASINO LOUNGE is "+maxBet+" credits! If you want to bet more credits then we'll need to make it to the High Rollers Lounge! :)");
        return;
    }
    else if (bet > maxBet && highRoller==true) {
        alert("FRIEND: The max bet inside the HIGH ROLLERS LOUNGE is "+maxBet+" credits! Don't be too greedy :)");
        return;
    }
    else if (bet < minBet && highRoller==false) {
        alert("FRIEND: The minimum bet inside the MAIN CASINO LOUNGE is "+minBet+" credits!");
        return;
    }
    else if (bet < minBet && highRoller==true) {
        alert("FRIEND: The minimum bet inside the HIGH ROLLERS LOUNGE is " + minBet + " credits! There is no easy way out here!");
        return;
    }
    else if (isNaN(bet)){
        alert("FRIEND: We need to bet some credits first to actually win some.. :)");
        return;
    }

    //code to reveal player number and see if they win or lose
    revealed[count] = mainDeck.splice(Math.floor(Math.random() * mainDeck.length), 1);
    var computerNum = parseInt(revealed[count-1]);
    var playerNum = parseInt(revealed[count]);
    count++;
    if (playerNum > computerNum){
        alert("Our number is " + playerNum + ".\n\nWe WIN " + bet + " credits!!!\n\n(-1 HP each)");
        credits += bet;
        document.getElementById("userCredits").innerHTML = credits;
        winRound = true;
    }
    else {
        alert("Our number is " + playerNum + ".\n\nWe LOSE " + bet + " credits! :(\n\n(-2 HP each)");
        credits -= bet;
        document.getElementById("userCredits").innerHTML = credits;
        winRound = false;
    }

    usedNumbers();
    revealNumber();
    loseHealth();
    checkLose();
    checkWin();
    checkPlayerHealth();
    checkFriendHealth();
    checkReshuffle();
    document.getElementById("bet").select();
}

function betLow(){
    var bet = document.getElementById("bet");
    bet = parseInt(bet.value);

    //code to check if there are enough credits left
    if (bet > credits){
        alert("FRIEND: We don't have enough credits for that! :(");
        return;
    }
    else if (bet > maxBet && highRoller==false) {
        alert("FRIEND: The max bet inside the MAIN CASINO LOUNGE is "+maxBet+" credits! If you want to bet more credits then we'll need to make it to the High Rollers Lounge! :)");
        return;
    }
    else if (bet > maxBet && highRoller==true) {
        alert("FRIEND: The max bet inside the HIGH ROLLERS LOUNGE is " + maxBet + " credits! Don't be too greedy :)");
        return;
    }
    else if (bet < minBet && highRoller==false) {
        alert("FRIEND: The minimum bet inside the MAIN CASINO LOUNGE is "+minBet+" credits!");
        return;
    }
    else if (bet < minBet && highRoller==true) {
        alert("FRIEND: The minimum bet inside the HIGH ROLLERS LOUNGE is " + minBet + " credits! There is no easy way out here!");
        return;
    }
    else if (isNaN(bet)){
        alert("FRIEND: We need to bet some credits first to actually win some.. :)");
        return;
    }

    //code to reveal player number and see if they win or lose
    revealed[count] = mainDeck.splice(Math.floor(Math.random() * mainDeck.length), 1);
    var computerNum = parseInt(revealed[count-1]);
    var playerNum = parseInt(revealed[count]);
    count++;
    if (playerNum < computerNum){
        alert("Our number is " + playerNum + ".\n\nWe WIN " + bet + " credits!!!\n\n(-1 HP each)");
        credits += bet;
        document.getElementById("userCredits").innerHTML = credits;
        winRound = true;
    }
    else {
        alert("Our number is " + playerNum + ".\n\nWe LOSE " + bet + " credits! :(\n\n(-2 HP each)");
        credits -= bet;
        document.getElementById("userCredits").innerHTML = credits;
        winRound = false;
    }

    usedNumbers();
    revealNumber();
    loseHealth();
    checkLose();
    checkWin();
    checkPlayerHealth();
    checkFriendHealth();
    checkReshuffle();
    document.getElementById("bet").select();
}

function loseHealth(){
    if (winRound==true){
        playerHealth -= 1;
        friendHealth -= 1;
    }
    else{
        playerHealth -= 2;
        friendHealth -= 2;
    }
    document.getElementById("playerHealth").innerHTML = playerHealth;
    document.getElementById("friendHealth").innerHTML = friendHealth;
}

function checkPlayerHealth(){
    if (playerHealth<1){
        alert("FRIEND: Oh no! You've ran out of health and fainted! It's game over!\n\nDon't forget to watch your health! Let's just try it again!");
        restartGame();
    }
}

function checkFriendHealth(){
    if (friendHealth<1){
        alert("(Your best friend fainted! Don't forget to feed your friend next time!!)\n\nLet's just try it again!");
        restartGame();
    }
}

function highRollers() {
    if(highRoller == false) {
        if (credits > 10000) {
            var answer = window.confirm("FRIEND: Wow!! We have enough credits to enter the High Rollers Lounge! " +
                "\n\nJust remember: once we enter, we can't go back to the Main Lounge. Also, food here will be more expensive! :)" +
                "\n\nEnter now?");
            if (answer == false)
                return;
            else {
                alert("(You have entered the High Rollers Lounge. It is filled with very classy furniture and decors. Everything is " +
                    "shining so bright that you got blinded for 5 seconds just by staring. You and your friend look at each other, then" +
                    " back to staring at the room in awe. You move closer to the dealer's table. There's " +
                    "no turning back now.)\n\nFRIEND: This is it! Good luck, old friend!");
                maxBet = 25000;
                minBet = 2500;
                document.getElementById("story").innerHTML = "<b>Current Location:</b> HIGH ROLLERS LOUNGE<br><b>Max bet: </b>" + maxBet + "</br><b>Min bet: </b>" + minBet;
                highRoller = true;
                //replace food menu
                foodCost1 = 2000; foodCost2=4000; foodCost3=6000;
                foodItem1 = "Escargot - 2000 credits (+2 HP)";
                foodItem2 = "Steak - 4000 credits (+5 HP)";
                foodItem3 = "Sushi Plate - 6000 credits (+8 HP)";
                document.getElementById("highroller").innerHTML = "<img src=\"assets/images/highroller.jpg\" style=\"width:300px;height=300px\">";
                document.getElementById("food1").innerHTML = foodItem1;
                document.getElementById("food2").innerHTML = foodItem2;
                document.getElementById("food3").innerHTML = foodItem3;
                document.getElementsByTagName("body")[0].setAttribute("style","background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)");
                reshuffleDeck();
            }
        }
        else {
            alert("FRIEND: We need at least 10,000 credits to be able to enter the High Rollers Lounge. You think we can make it?");
        }
    }
    else
        alert("(You are already inside the High Rollers Lounge.. If you wanted to go back, you can't..)");
}

function checkReshuffle(){
    if (mainDeck.length == 0){
        alert("(All numbers in the deck have been used. Reshuffling the deck!)");
        mainDeck = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
        count=0;
        revealed = [];
        document.getElementById("usedNumbers").innerHTML = "";
        revealNumber();
    }
}

function reshuffleDeck(){
    mainDeck = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
    count=0;
    revealed = [];
    document.getElementById("usedNumbers").innerHTML = "";
    revealNumber();
}

function checkLose() {
    if (credits==0){
        var answer = window.confirm("FRIEND: Oh no!! We've ran out of credits. We're going to be stuck here forever..\n" +
            "But I still believe in you, old friend!! Look, I found another 500 credits lying around..\n\nWill you please try again??");
        if (answer == true){
            restartGame();
        }
        else {
            alert("FRIEND: NOOOO! We lost!!! I guess we're gonna have to find a real job..")
        }
    }
}

function checkWin() {
    if(credits >= 100000){
        alert("FRIEND: OMG!! We now have " + credits + " credits!! You did it!! We made it!! We have enough credits" +
            " to go home!! You are the most amazing human" +
            " being ever!\n\n(You and your friend bought tickets to the first flight going home. You drop by a " +
            "takoyaki street stall on the way and munched on it as tears rolled down your eyes." +
            " As you savour the moment of victory, you also look forward to the new journey that lies ahead..)")
        alert("YOU WIN! YOU BEAT ME! HOPE YOU HAD FUN :)");
        document.getElementById("winner").innerHTML = "<img src=\"assets/images/winner.jpg\" style=\"width:300px;height=300px\">";
    }
}

function usedNumbers() {
    document.getElementById("usedNumbers").innerHTML = "Used Numbers: " + revealed.join(",");
}

function buyFood1Player() {
    var answer = window.confirm("Buy yourself " + foodItem1 + "?");
    if (answer == false)
        return;
    if (foodCost1>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost1;
        playerHealth += 2;
        if (playerHealth>10)
            playerHealth = 10;
    }
    document.getElementById("playerHealth").innerHTML = playerHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("takoyaki").innerHTML = "<img src=\"assets/images/takoyaki.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("escargot").innerHTML = "<img src=\"assets/images/escargot.jpg\" style=\"width:300px;height=300px\">";
    }
}

function buyFood1Friend() {
    var answer = window.confirm("Buy your friend " + foodItem1 + "?");
    if (answer == false)
        return;
    if (foodCost1>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost1;
        friendHealth+= 2;
        if (friendHealth>10)
            friendHealth = 10;
    }
    document.getElementById("friendHealth").innerHTML = friendHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("takoyaki").innerHTML = "<img src=\"assets/images/takoyaki.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("escargot").innerHTML = "<img src=\"assets/images/escargot.jpg\" style=\"width:300px;height=300px\">";
    }
}

function buyFood2Player() {
    var answer = window.confirm("Buy yourself " + foodItem2 + "?");
    if (answer == false)
        return;
    if (foodCost2>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost2;
        playerHealth += 5;
        if (playerHealth>10)
            playerHealth = 10;
    }
    document.getElementById("playerHealth").innerHTML = playerHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("cheeseburger").innerHTML = "<img src=\"assets/images/cheeseburger.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("steak").innerHTML = "<img src=\"assets/images/steak.jpg\" style=\"width:300px;height=300px\">";
    }
}

function buyFood2Friend() {
    var answer = window.confirm("Buy your friend " + foodItem2 + "?");
    if (answer == false)
        return;
    if (foodCost2>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost2;
        friendHealth+= 5;
        if (friendHealth>10)
            friendHealth = 10;
    }
    document.getElementById("friendHealth").innerHTML = friendHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("cheeseburger").innerHTML = "<img src=\"assets/images/cheeseburger.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("steak").innerHTML = "<img src=\"assets/images/steak.jpg\" style=\"width:300px;height=300px\">";
    }
}

function buyFood3Player() {
    var answer = window.confirm("Buy yourself " + foodItem3 + "?");
    if (answer == false)
        return;
    if (foodCost3>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost3;
        playerHealth += 8;
        if (playerHealth>10)
            playerHealth = 10;
    }
    document.getElementById("playerHealth").innerHTML = playerHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("tempura").innerHTML = "<img src=\"assets/images/tempura.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("sushi").innerHTML = "<img src=\"assets/images/sushi.jpg\" style=\"width:300px;height=300px\">";
    }
}

function buyFood3Friend() {
    var answer = window.confirm("Buy your friend " + foodItem3 + "?");
    if (answer == false)
        return;
    if (foodCost3>=credits){
        alert("FRIEND: We don't have enough credits for that! Maybe we need to save up first. :)");
        return;
    }
    else {
        credits -= foodCost3;
        friendHealth+= 8;
        if (friendHealth>10)
            friendHealth = 10;
    }
    document.getElementById("friendHealth").innerHTML = friendHealth;
    document.getElementById("userCredits").innerHTML = credits;

    //for image
    if (highRoller==false) {
        document.getElementById("tempura").innerHTML = "<img src=\"assets/images/tempura.jpg\" style=\"width:300px;height=300px\">";
    }
    else{
        document.getElementById("sushi").innerHTML = "<img src=\"assets/images/sushi.jpg\" style=\"width:300px;height=300px\">";
    }
}

function restartGame() {
    var answer = window.confirm("FRIEND: Start a new game?");
    if(answer==false){
        return;
    }
    mainDeck = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];
    credits = 500;
    revealed = [];
    count=0;
    minBet=250;
    maxBet=2500;
    playerHealth = 6;
    friendHealth = 5;
    highRoller = false;
    foodCost1 = 250; foodCost2=500; foodCost3=750;
    foodItem1 = "Takoyaki - 250 credits (+2 HP)";
    foodItem2 = "Cheeseburger - 500 credits (+5 HP)";
    foodItem3 = "Tempura - 750 credits (+8 HP)";
    document.getElementById("food1").innerHTML = foodItem1;
    document.getElementById("food2").innerHTML = foodItem2;
    document.getElementById("food3").innerHTML = foodItem3;
    foodPurchase1=false;foodPurchase2=false;foodPurchase3=false;foodPurchase4=false;foodPurchase5=false;foodPurchase6=false;
    document.getElementById("start").innerHTML = "Restart";
    document.getElementById("userCredits").innerHTML = credits;
    document.getElementById("usedNumbers").innerHTML = "";
    document.getElementById("story").innerHTML = "<b>Current Location:</b> Main Lounge<br><b>Max bet: </b>" + maxBet + "</br><b>Min bet: </b>" + minBet + "<br><br><button onclick=\"highRollers()\" id=\"highRollers\">Go to High Rollers Lounge</button>";
    document.getElementById("playerHealth").innerHTML = playerHealth;
    document.getElementById("friendHealth").innerHTML = friendHealth;
    document.getElementById("winner").innerHTML = "";
    document.getElementById("highroller").innerHTML = "";
    document.getElementById("takoyaki").innerHTML = "";
    document.getElementById("cheeseburger").innerHTML = "";
    document.getElementById("tempura").innerHTML = "";
    document.getElementById("escargot").innerHTML = "";
    document.getElementById("steak").innerHTML = "";
    document.getElementById("sushi").innerHTML = "";
    document.getElementsByTagName("body")[0].removeAttribute("style");
    document.getElementById("bet").focus();

    revealNumber();
}