let bar1= document.getElementById('rod-one');
let bar2= document.getElementById('rod-two');
let ball = document.querySelector(".ball");
let xDir=-1;
let yDir=-1;
let xSpd=4;
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
        yDir= (yDir==-1 ? 1:-1 );
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


