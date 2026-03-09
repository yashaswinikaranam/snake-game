let gameContainer=document.querySelector('.game-container')
let scoreContainer=document.querySelector('.score-container')
let foodX,foodY;
let headx=12;
let heady=12;
let velocityx=0,velocityy=0;
let snakeBody=[]
let score=0;
function generateFood() {
    foodX=Math.floor(Math.random()*25)+1
    foodY=Math.floor(Math.random()*25)+1
    for(let i=0;i<snakeBody.length;i++) {
    if(foodX==snakeBody[i][0] && foodY==snakeBody[i][1])
        generateFood()
    }
}
function gameOver() {
    headx=12;
    heady=12;
    velocityx=0
    velocityy=0
    snakeBody=[]
    score=0
    scoreContainer.innerHTML="Score: "+score
    alert('Game Over!')
}
function renderGame() {
    let updatedGame=` <div class="food" style="grid-area:${foodY}/${foodX};"></div>`
    if(foodX==headx && foodY==heady) {
        snakeBody.push([foodX,foodY])
        generateFood()
        score++
        scoreContainer.innerHTML="Score: "+score
    } 
    snakeBody.pop()
    headx+=velocityx;
    heady+=velocityy;
    snakeBody.unshift([headx,heady])
    if(headx==0 || heady==0 || headx==26 || heady==26) gameOver()
    for(let j=1;j<snakeBody.length;j++) {
if(snakeBody[0][0]==snakeBody[j][0] && snakeBody[0][1]==snakeBody[j][1]) gameOver()
}
    for(let i=0;i<snakeBody.length;i++) {
    updatedGame+=` <div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`
    }
    gameContainer.innerHTML=updatedGame
}
generateFood()
setInterval(renderGame,150)
document.addEventListener('keydown',function(e) {
    let key=e.key
    if(key==='ArrowUp' && velocityy!=1) {
        velocityx=0;
        velocityy=-1;
    } else if(key==='ArrowDown' && velocityy!=-1) {
        velocityx=0;
        velocityy=1;
    } else if(key==='ArrowRight' && velocityx!=-1) {
        velocityx=1;
        velocityy=0;
    } else if(key==='ArrowLeft' && velocityx!=1) {
        velocityx=-1;
        velocityy=0;
    }
})