//LOAD CANVAS
let canvas = document.getElementById("ball");
let context = canvas.getContext("2d");




//BALL PROPERTIES
let ballx = canvas.width / 2; // ball x position
let bally = canvas.height - 20;//ball y position
let ballVx = 1; // ball x speed
let ballVy = 1; // ball y speed
let ballRadius = 10; // ball R


//PADDLE PROPERTIES
let paddleHeight = 10; // paddle height
let paddleWidth = 75; // paddle width
let paddleX = (canvas.width - paddleWidth) / 2; // paddle x position
let rightPressed = false; // define rightPressed variable and assign false value
let leftPressed = false; // define leftPressed variable and assign false value



//BRICK PROPERTIES
let brickRowCount = 5; // brick row count
let brickColumnCount = 3; // brick column count
let brickWidth = 75; // brick width
let brickHeight = 20; // brick height
let brickPadding = 10; // brick padding
let brickOffsetTop = 30; // brick Off set top
let brickOffsetLeft = 30; // brick off set left


// SCORE AND LIVE
let score = 0; // set score
let lives = 3; //set lives


//draw background
function drawBackground() {
	context.beginPath();
	context.rect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "black";
	context.fill();
	context.closePath();
}



//draw ball
function drawBall() {
	context.beginPath();
	context.arc(ballx, bally, ballRadius, 0, Math.PI * 2);
	context.fillStyle = "yellow";
	context.fill();
	context.closePath();
}


//drawLives
function drawLives() {
	context.font = "16px Arial";
	context.fillStyle = "white";
	context.fillText("Lives: " + lives, canvas.width - 65, 20);
}



//drawScore
function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+score, 8, 20);
}




//draw paddle
function drawPaddle() {
	context.beginPath();
	context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = "red";
	context.fill();
	context.closePath();
}
//create 2 event to listen press event
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//function keyUpHandler
function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	}
	else if (e.keyCode == 37) {
		leftPressed = false;
	}
}
//function keyDownHandler 
function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	}
	else if (e.keyCode == 37) {
		leftPressed = true;
	}
}
//CONDITION OF PADDLE
if (rightPressed && paddleX < canvas.width - paddleWidth) {
	paddleX += 7;
}
else if (leftPressed && paddleX > 0) {
	paddleX -= 7;
}





// create bricks array
let bricks = [];
for (c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (r = 0; r < brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}
function drawBricks() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status == 1) {
				var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				context.beginPath();
				context.rect(brickX, brickY, brickWidth, brickHeight);
				context.fillStyle = "#0095DD";
				context.fill();
				context.closePath();
			}
		}
	}
}
//function brakeBricks
function brakeBricks() {
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			var brick = bricks[c][r];
			if (brick.status == 1) {
				if (ballx > brick.x && ballx < brick.x + brickWidth && bally + ballRadius > brick.y && bally - ballRadius < brick.y + brickHeight) {
					ballVy = -ballVy;
					brick.status = 0;
					score++;
					if (score == brickColumnCount * brickRowCount) {
						alert("Ăn may thôi");
						document.location.reload();
					}
				}
			}
		}
	}
}






//function move
function move() {

	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBackground();
	drawBall();
	drawPaddle();
	drawBricks();
	drawScore();
	drawLives();
	brakeBricks();

	ballx += ballVx;
	bally -= ballVy;


//ball move up or down
	if (bally < ballRadius) {
		ballVy = -ballVy;
	} else if (bally > canvas.height - ballRadius - paddleHeight) {
		if (ballx > paddleX && ballx < paddleX + paddleWidth) {
			ballVy = -ballVy;
		}
		else {
			lives--;
			if (!lives) {
				alert("Gàaaaaa");
				document.location.reload();
			}
			else {
                ballx = canvas.width/2;
                bally = canvas.height-paddleHeight - ballRadius; 
                ballVx = 1;
                ballVy = 1;
                paddleX = (canvas.width-paddleWidth)/2;
            }

		}
	}

//ball move left or right
	if (ballx > canvas.width - ballRadius || ballx < ballRadius) {
		ballVx = - ballVx;
	}

	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	}
	else if (leftPressed && paddleX > 0) {
		paddleX -= 7;
	}



}


//Run function move in 10milisecond
setInterval(move, 10)
