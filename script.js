let bar1= document.getElementById('rod-one');
let bar2= document.getElementById('rod-two');
let ball = document.querySelector(".ball");
let xDir=-1;
let yDir=-1;
let xSpd=1;
let ySpd=5;


let yRange=window.innerHeight -ball.offsetHeight;
let xRange =window.innerWidth-ball.offsetWidth;

function initializeGame(){
    bar1.style.left="42%";
    bar2.style.left="42%";
    ball.style.left="50%";
    ball.style.bottom=bar2.getBoundingClientRect().height+"px";
}
initializeGame();

let id = setInterval(()=>{
    if( ball.offsetLeft<=0 || ball.offsetLeft> window.innerWidth - ball.offsetWidth){
        xDir= (xDir==-1 ? 1:-1);
    }else if(ball.offsetTop<=0 || ball.offsetTop>=(window.innerHeight -ball.offsetHeight)){
        // yDir= (yDir==-1 ? 1:-1 );
        checkTopCollision();
    }
    
    let currPos={
        top:ball.offsetTop,
        left:ball.offsetLeft
    };
    // console.log(currPos.top,currPos.left);
    ball.style.top=currPos.top + yDir*ySpd+ 'px';
    ball.style.left= currPos.left + xDir*xSpd  +'px';
},10);
window.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
        clearInterval(id);
    }
});


//Function to check collision status
function hitBar(ball,bar){

    let ballPos=ball.getBoundingClientRect();
    let barPos= bar.getBoundingClientRect();
    if( (ballPos.left>=barPos.left && ballPos.right<=barPos.right)
     || (ballPos.right>=barPos.left && ballPos.right<=barPos.right)
     || (ballPos.left>=barPos.left && ballPos.left<=barPos.right)){
        return true;
     }else{
        return false;
     }

}

function checkTopCollision(){
    let ballPos= ball.getBoundingClientRect();
    if(ballPos.top>0){
        //Collided with bottom
        if(hitBar(ball,bar2)){
            yDir= (yDir==-1 ? 1:-1 );

        }else{
            clearInterval(id);
            window.alert("Player 2 Lost!!");
        }
    }else{

        //Collided with the top of the screen
        if(hitBar(ball,bar1)){
            yDir= (yDir==-1 ? 1:-1 );

        }else{
            clearInterval(id);
            window.alert("Player 1 Lost!!");
        }
    }
}
