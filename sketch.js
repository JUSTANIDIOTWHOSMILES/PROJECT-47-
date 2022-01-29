var PLAY = 1;
var END = 0;
var gameState = PLAY;
var platform,platformImage;
var wobble,wobbleImage;
var star,starImage;
var bomb, bombImage;
var gameOver, gameOverImage;
var reset, resetImage;
var obstacle;
var ground;
var score = 0;


function preload() {
 
 
  platformImage = loadImage("assets/platform.png");
  wobbleImage = loadImage("assets/wobble.png");
  starImage = loadImage("assets/star.png");
  bombImage = loadImage("assets/bomb.png");
  gameOverImage = loadImage("assets/gameOver.png");
  resetImage = loadImage("assets/reset.png");
}

function setup() {
  
  canvas = createCanvas(1000,600);

  
 

  wobble = createSprite(400,400);
  wobble.addImage(wobbleImage);
  wobble.scale = 0.3;

  


  ground = createSprite(500,595,1000,10);
  ground.visible = false;
  

  gameOver = createSprite(500,300);
  gameOver.addImage(gameOverImage);
  gameOver.visibility = false;

  reset = createSprite(520,300);
  reset.addImage(resetImage);
  reset.visiblity = false;



platformsGroup = new Group();
starsGroup = new Group();
bombGroup = new Group();

 }

function draw() {

  background("grey");

 fill("red");
 textSize(25);
 text("Score:"+score,10,20);

  
  
  if(gameState == PLAY ){




   if(keyDown("space")){

    wobble.velocityY = -20;
  }
 wobble.velocityY = wobble.velocityY + 2;


 if(wobble.y !== 595){

  wobble.velocityY = wobble.velocityY + 2;

 }
 
 if(keyDown("left")){

  wobble.x -=5
}


if(keyDown("right")){

  wobble.x += 5;
}

 if(wobble.collide(ground)){

  wobble.velocityY = 0;
};

if(wobble.collide(platform)){

  wobble.velocityY = 0;
};

if(wobble.collide(star)){

  score = score + 5;
  star.visible = false;
};


spawnPlatforms();
spawnStars();

if(wobble.collide(bomb)){

  gameState = END;
}
  }

  if(gameState == END){

    console.log("game over");
    gameOver.visibility = true;
    reset.visibility = true;
    score = 0 ;
    text("Score:"+score ,10,20);
    wobble.visibility = false;
    platformsGroup.visibility = false;
    starsGroup.visibility = false;
    bombGroup.visibility = false;
    platformsGroup.destroyAll();
    starsGroup.destroyAll();
    bombGroup.destroyAll();

    if(reset.mouseClicked()){

      gameState = PLAY;
      spawnPlatforms();
      spawnStars();
      spawnBombs();

      score = 0;
      text("Score"+score,10,20);
    }


  }

drawSprites();
}



function spawnPlatforms() {
 
 if(frameCount%120 === 0){
 
  platform.x = Math.round(random(10,990));
  platform.y = Math.round(random(10,590));
  platform.velocityY +=5;
  platform.addImage(platformImage);
  platform.lifetime = 120;

  platformsGroup.add(platform);


 }
  
}

function spawnStars() {
 
  if(frameCount%120 === 0){
  
  
   star.x = Math.round(random(10,990));
   star.y = Math.round(random(10,590));
   star.velocityY += 5;
   star.addImage(starImage);
   star.lifetime = 120;

  starsGroup.add(star);

   
 
  }
   
 }

 function spawnBombs() {
 
  if(frameCount%120 === 0){
  
  
   bomb.x = Math.round(random(10,990));
   bomb.y = Math.round(random(10,590));
   bomb.velocityY += 5;
   bomb.addImage(starImage);
   bomb.lifetime = 120;

  bombGroup.add(bomb);

   
 
  }
   
 }
 
 