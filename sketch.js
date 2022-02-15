var track,playerimg;
var player,obstacle2Image,obstacle1Image;
var obstaclesGroup;
var gameState=1;
var gameEnd;
var blastImg;
var coinImg,coinsGrp;
var score=0;
var restart,restartImg

function preload(){
  track=loadImage("assets/track.jpg");
  playerimg=loadImage("assets/player.png");
  obstacle1Image=loadImage("assets/ob1.png");
  obstacle2Image=loadImage("assets/ob2.png");
  gameEnd=loadImage("assets/gameEnd.png");
  blastImg=loadImage("assets/blast.png");
  coinImg=loadImage("assets/goldCoin.png");
  restartImg=loadImage("assets/restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  player=createSprite(width/2,height-60,30,30);
  player.addImage("rider",playerimg);
  player.scale=0.7
  player.setCollider("rectangle",0,0,80,130)
  player.addImage("blast",blastImg);
 // player.debug=true;
 restart=createSprite(width/2,0)
 restart.addImage(restartImg);
 restart.visible=false;
 restart.scale=0.5;

  obstaclesGroup=new Group();
  coinsGrp= new Group();

  var obstaclesPositions = [
    { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
    { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
    { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
    { x: width / 2, y: height - 2800, image: obstacle2Image },
    { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
    { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
    { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },

  ];

  addSprites(obstaclesGroup, obstaclesPositions.length, obstacle1Image, 0.8, obstaclesPositions);
  addSprites(coinsGrp,18,coinImg,0.09)
  
}

function draw() {
  background(255);  
  image(track,0,-height*5,width,height*6);

  if (gameState===1){

    if(player.y<260 && player.y>-2960){
      camera.position.y=player.position.y;
    }

    if (keyDown("w")){
      if(player.y<-height*2){
        player.y=player.y-30;
      }
      else{
        player.y=player.y-15;
      }
    }
  
    if (keyDown("d") && player.x<width-490){
      player.x=player.x+10;
    }
  
    if (keyDown("a") && player.x>width-1070){
      player.x=player.x-10;
    }

    if(player.isTouching(obstaclesGroup)){
      gameState=0;
      player.changeImage("blast",blastImg);
      player.scale=0.4
    }

    player.overlap(coinsGrp, function(collector, collected) {
      score=score+5;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    const finshLine = height * 6 - 740; 
    if (player.y < -finshLine) {
      gameState = 2;
    }

  }
  else if(gameState===0){ 

      swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl: "assets/gameEnd.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"

    });
    gameState=3
  } 
  else if(gameState===2){
    swal({
      title: "Awesome!",
      text: "You reached the finish line successfully",
      imageUrl: "assets/winner.jpg",
      imageSize: "200x200",
      confirmButtonText: "Ok"
    });

    gameState=3;
  }
  else if(gameState===3){
    restart.visible=true;
    restart.y=camera.position.y;
    restart.depth=100;

    if(mousePressedOver(restart)){
      window.location.reload();
    }
  }

 // console.log(height);
  
  textSize(30)
  fill("white");
  text("Score: "+score,width/2-240,camera.position.y-height/2+50);


  drawSprites();
  console.log(player.y,gameState);
}

function addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){
  for (var i= 0;i<numberOfSprites;i++){
    var x,y;

    if (positions.length<=0){
      x= random(width/2+150,width/2-150);
      y= random(-height*4.5,height-400);
    }
    else{
      x=positions[i].x;
      y=positions[i].y;
      spriteImage=positions[i].image;
    }
    var sprite=createSprite(x,y);
    sprite.addImage("sprite",spriteImage);
    sprite.scale=scale;
    spriteGroup.add(sprite);
    if(positions.length>0){
      sprite.setCollider("rectangle",0,0,100,150)
    }
   // sprite.debug=true;
  }
}
