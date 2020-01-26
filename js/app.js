 /**************************   Enemies Class  ***********************/
class Enemy{
    constructor( ){
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x= 0;
        this.y= Math.floor(Math.random() * (230 - 60)) + 60;
        this.speed= 200;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt){
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x +=this.speed * dt ;
        if( this.x > 500){
            this.x = -101;
            this.speed = 60 + Math.floor(Math.random() * 222);
        }  
    }
    // Draw the enemy on the screen, required method for game
    render (){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
 /**************************   Player  Class  ***********************/

class Player {

    constructor(){
        this.x= 202;   
        this.y= 405;   
        this.sprite = 'images/char-boy.png';
        this.score=0;
        this.sym = 0;

    }

    update(){
        //TODO: check if the game is over to reset the timer and the position of the player
        if(player.y <= -10 ){
            setTimeout(() => {
                setTimer()
               
            },2000);
            this.resetPosition();
        }  
        //TODO: check whether the user want to change the character
        if(this.checkCollisions(char) < 10 ){
            this.sprite='images/char-horn-girl.png';
            
        }
        //TODO: check the collision with all the Enemy
        for(let i=0 ; i<allEnemies.length ; i++){
            let d = this.checkCollisions(allEnemies[i]);
            if(d < 65 ){
               this.resetPosition();
            }
        }
        //TODO: check the collision with the symbols
        for(let i=0 ; i<allSymbol.length ; i++){
            let d = this.checkCollisions(allSymbol[i]);
            if(d < 65 ){
               allSymbol[i].y += 1000;
               this.score +=10;  // increase 10 scores each time the user collect a symbol 
               scores.innerHTML = this.score;
               this.sym++;       //increase the number of collected symbols
               collectedSymbols.innerHTML = this.sym ;
            }
        }     
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    }

    handleInput(direction){
        
        switch(direction){
            case 'left':
                this.x > 0 ? this.x -=101 : this.x -=0 ;
                break;
            case 'up':
               this.y -=83 ;
               this.y < 0 ? finishGame() : this.y -=0 ;
                break;
            case 'right':
                this.x < 404 ?  this.x +=101 :  this.x +=0;
                break;
            case 'down':
                this.y <404 ?  this.y +=83 :  this.y +=0;
                break;
        }

    }

    checkCollisions(array){
        
        let xDistance = this.x - array.x ;
        let yDistance =  this.y - array.y ;
        return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance , 2));
    }

    resetPosition(){
        //TODO: reset the main variables value and reshow the symbols
        this.x = 202;
        this.y = 405;
        allSymbol= [];
        showSymbol();
        this.score= 0;
        scores.innerHTML = this.score;
        this.sym=0;
        collectedSymbols.innerHTML = this.sym ;
    }
}
 /**************************   Symbols  Class  ***********************/
class Symbols{
    constructor( sprite){
        this.x= Math.floor(Math.random() * (400 - 60)) + 60;
        this.y= Math.floor(Math.random() * (330 - 60)) + 83;
        this.sprite=sprite;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }
}
/**************************   Selector  Class  ***********************/
class Selector{
    constructor( sprite){
        this.x= 403;
        this.y= 405;
        this.sprite='images/Selector.png';
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player = new Player() ;
let char= new Selector();
let allSymbol = []; 
let modal=document.getElementById('myModal');
let modalContent = document.querySelector('#result');
let timer=  document.querySelector(".timer");
let collectedSymbols = document.querySelector(".symbol");
let scores = document.querySelector(".score");
let interval;
let second=0 , minute=0 , hour=0;
//TODO: create Enemy
createEnemy();
//TODO: show the symbols
showSymbol();
//TODO: Set the Timer to begin the game
setTimer();  
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };  
    //TODO: handle the input of listens in player Class
    player.handleInput(allowedKeys[e.keyCode]); 

});
 /**************************   Create Enemy  ***********************/

function createEnemy(){
    //TODO: create the list of the enemy
    for (let i=0 ; i<3 ; i++){
        let enemy = new Enemy();
        allEnemies.push(enemy);
    }

}
 /**************************   showSymbol  ***********************/

 function showSymbol(){
    //TODO: Show three symbols
    for (var i = 0; i < 3; i++) {
        if (i === 0) {
            sprite = 'images/Gem Blue.png';
        } else if (i === 1) {
            sprite = 'images/Heart.png';
        } else {
            sprite = 'images/Key.png' ;
        }
         allSymbol.push(new Symbols( sprite));
    }
 } 
  
/**************************   finishGame  ***********************/

function finishGame(){
    //TODO: show the message if the user won the game and reset the position of the player    
    setTimeout(() => {
        $("#myModal").modal("show");
        modalContent.innerHTML = '<h4> Congratulation !!! You Won </h4>' ;
        player.resetPosition();
        
    },500)
     timer.innerHTML = '0 : 0 : 0';
     second=0 , minute=0 , hour=0;
     clearInterval(interval);  
}

/**************************   setTimer  ***********************/

function setTimer() {
   
    interval = setInterval(function(){
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        
        timer.innerHTML = hour + " : "+ minute+" : "+second;
    },1000);
    
}