var player1Y = height/2;
var player2Y = height/2;
var player1Score = 0;
var player2Score = 0;
var ball;
var gameStarted = false;
var t = 0;

//Constants
var PAUSE_TIME = 60;
var PLAYER_MOVE_SPEED = 4;
var BALL_SPEED = 2.5;
var PADDLE_HEIGHT = 100;
var PADDLE_WIDTH = 20;

angleMode = "degrees";

var Ball = function(position, speed) {
    this.position = position;
    this.speed = speed || BALL_SPEED;
    
    this.radius = 12;
    
    this.resetVelocity = function() {
        this.theta = random(0, 360);
        this.velocity = new PVector(
        this.speed*cos(this.theta), -this.speed*sin(this.theta));
        player2Y = height/2;
    };
    this.resetVelocity();
    
    this.draw = function() {
        fill(255, 0, 51);
        noStroke();
        ellipse(this.position.x, this.position.y,
        this.radius*2, this.radius*2);
    };
    
    this.collideWithPaddle = function(x, y) {
        if (this.position.x - this.radius < x + PADDLE_WIDTH/2 &&
        this.position.x + this.radius > x - PADDLE_WIDTH/2) {
            if (dist(0, this.position.y, 0, y) <
            PADDLE_HEIGHT/2 + this.radius) {
                if (this.position.x > x) {
                    this.position.x = x + 
                    this.radius + PADDLE_WIDTH/2;
                }
                else if (this.position.x < x) {
                    this.position.x = x - 
                    this.radius - PADDLE_WIDTH/2;
                }
                this.velocity.mult(new PVector(-1, 1));
            }
        }
    };
    
    this.update = function() {
        //Handle wall collisions
        if (this.position.x < 0) {
            player2Score++;
            this.position = new PVector(width/2, height/2);
            gameStarted = false;
            this.resetVelocity();
        }
        else if (this.position.x > width) {
            player1Score++;
            this.position = new PVector(width/2, height/2);
            gameStarted = false;
            this.resetVelocity();
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.mult(new PVector(1, -1));
        }
        else if (this.position.y > height) {
            this.position.y = height;
            this.velocity.mult(new PVector(1, -1));
        }
        
        //Handle paddle collisions
        this.collideWithPaddle(20, player1Y);
        this.collideWithPaddle(width-20, player2Y);
        
        this.position.add(this.velocity);
    };
};

ball = new Ball(new PVector(width/2, height/2));

var drawScores = function() {
    var s;
    
    fill(247, 242, 243);
    textSize(20);
    
    s = "Player 1: " + player1Score;
    text(s, width*0.25-textWidth(s)/2, 25);
    s = "Player 2: " + player2Score;
    text(s, width*0.75-textWidth(s)/2, 25);
};

var updatePlayer2 = function() {
    if (abs(player2Y-ball.position.y) < PLAYER_MOVE_SPEED){
        player2Y = ball.position.y;
    }
    else if (player2Y-ball.position.y >= PLAYER_MOVE_SPEED) {
        player2Y -= PLAYER_MOVE_SPEED;
    }
    else if (player2Y-ball.position.y <= PLAYER_MOVE_SPEED) {
        player2Y += PLAYER_MOVE_SPEED;
    }
    
};

//Move the player1 up
var movePlayerUp1 = function() {
    player1Y -= PLAYER_MOVE_SPEED;
};

//Move the player1 down
var movePlayerDown1 = function() {
    player1Y += PLAYER_MOVE_SPEED;
};
//Move the player2 up
var movePlayerUp2 = function() {
    player2Y -= PLAYER_MOVE_SPEED;
};

//Move the player2 down
var movePlayerDown2 = function() {
    player2Y += PLAYER_MOVE_SPEED;
};
var drawPlayers = function() {
    //Constrain the player movement
    player1Y = constrain(player1Y,0, 400);
    player2Y = constrain(player2Y,0, 400);
    
    rectMode(CENTER);
    fill(172, 237, 81);
    rect(20, player1Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    rect(width-20, player2Y, PADDLE_WIDTH, PADDLE_HEIGHT);
    
    noFill();
    stroke(255, 255, 255);
    strokeWeight(2);
   arc(200, 200, 100, 100, 0, 360);
};
 //Control Player 1
draw = function() {
if (keyIsPressed) {
    if (keyCode === UP) {
        movePlayerUp2();
    }
    else if (keyCode === DOWN) {
        movePlayerDown2();
    }
}
//Control Player 2
 if (keyIsPressed) {
        if (key.toString()==="w"){
            movePlayerUp1();
        }
        else if(key.toString()==="s"){
            movePlayerDown1();
        }
    }
    
    var keys = [];
var keyPressed = function(){
    keys[keyCode] = true;
};
var keyReleased = function(){
    keys[keyCode] = false;
};

    //Draw the environment
    background(10, 23, 99);
    drawPlayers();
    drawScores();
    stroke(250, 250, 250);
    line(width/2, 0, width/2, height);
    
    //Draw the ball
    ball.draw();
    
    if (!gameStarted) {
        t++;
        if (t >= PAUSE_TIME) {
            t = 0;
            gameStarted = true;
        }
        return;
    }
    
    ball.update();
};
