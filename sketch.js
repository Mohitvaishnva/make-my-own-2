var PLAY = 1;
var END = 0;
var gameState = PLAY;
var playerstop;
var player , playerrightside;
var ground, invisibleGround, groundImage;
var coin,coinImage;
var cloud1Image,cloud3Image,cloud2Image;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var background1,background2,background3,background4;
var score=0;
var coin=0;
var gameOver, restart;



function preload(){
  playerrightside =   loadAnimation("images/boy4.png","images/boy5.png","images/boy6.png")
  playerleftside =   loadAnimation("images/boy7.png","images/boy8.png","images/boy9.png")
  playerstop = loadAnimation("images/boy6.png")
  coinImage = loadImage("images/coin3.png")

 background1 = loadImage("images/background.jpg")
 background2 = loadImage("images/background21.jpg")
 background3 = loadImage("images/background22.jpg")
 background4 = loadImage("images/background24.jpg")

 groundImage = loadImage("images/ground25.jpg");
 
  cloud3Image = loadImage("images/cloud1.png");
  cloud1Image = loadImage("images/cloud2.png");
  cloud2Image = loadImage("images/cloud3.png");


  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle1.png");
  obstacle3 = loadImage("images/obstacle1.png");
  obstacle4 = loadImage("images/obstacle2.png");
  obstacle5 = loadImage("images/obstacle2.png");
  obstacle6 = loadImage("images/obstacle2.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  player  = createSprite(50,displayHeight-400,20,50);
  
  player .addAnimation("running", playerrightside);
  player .addAnimation("stop", playerstop);
  
  player .scale = 0.5;
  
 // ground1 = createSprite(0,0,windowWidth*2,windowHeight*2)
  //ground1.scale =1.5;
  //ground1.addImage("ground25",background1)
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.scale =2;
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
 // ground2 = createSprite(750,300,2050,2050)
 // ground2.scale =1.7;
  //ground2.addImage("ground1",background2)
  //ground3 = createSprite(750,300,2050,2050)
  //ground3.scale =1.7;
  //ground3.addImage("ground1",background3)
  //ground4 = createSprite(750,300,2050,2050)
  //ground4.scale =1.7;
  //ground4.addImage("ground1",background4)
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth/2,displayHeight/2+50);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,displayHeight-250,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  coinsGroup = new Group();
  score = 0;
}

function draw() {
  //player .debug = true;
  background("skyblue");
  textSize(45)
  text("Score: "+ score, 20,50);
  text("Coins: "+ coin, 20,100);
  
  
  if (gameState===PLAY){
   // ground1.velocityX=-10;
   //if(ground1.x<6){
     // ground1.x = ground1.width/1;
    // }
    //if (ground.x < 0){
     // ground.x = ground.width/1;
    //}

    if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
    score = score + Math.round(getFrameRate()/60);
   // ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && player .y >= 500) {
      player .velocityY = -20;
    }
  
   player .velocityY = player .velocityY + 0.8
   
                                                           
    player .collide(invisibleGround);
    if(coinsGroup.isTouching(player)){
      coinsGroup.destroyEach();
      coin+=1;
      
    }
    spawnClouds();
    spawnObstacles();
    spawnCoins();
    keyPressed();


   // spawnbackground();
   if(obstaclesGroup.isTouching(player )){
 gameState =END

    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player .velocityY = 0;
    player.changeAnimation("stop");
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(width,120,40,10);
    cloud.y = Math.round(random(50,200));
  var A = Math.round(random(1,3))
  switch(A){
    case 1 : cloud.addImage(cloud1Image)
  
      break;
      case 2 : cloud.addImage(cloud2Image)
      
      break;
      case 3 : cloud.addImage(cloud3Image)
     
      break;
  }
    cloud.scale = 1.9;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 800;
    
    //adjust the depth
    cloud.depth = player .depth;
    player .depth = player .depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(width,displayHeight-310,5,5);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 800;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  if (ground.x < 200){
    ground.x = ground.width/2;
  }
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  coinsGroup.destroyEach();
  player .changeAnimation("running",playerrightside);
  
 
  
  
  score = 0;
  
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var coin = createSprite(width,200);
    coin.y = Math.round(random(100,500));
    coin.addImage(coinImage);
    coin.scale = 0.5;
    coin.velocityX = -(3+ score/100);
    
     //assign lifetime to the variable
    //coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = player .depth;
    player .depth = player .depth + 1;
    
    //add each cloud to the group
    coinsGroup.add(coin);
  }
  
}

function spawnbackground() {
  //write code here to spawn the clouds
  if (frameCount % 10 === 0) {
    var ground = createSprite(750,300,2050,2050);
    ground.y = Math.round(random(50,200));
    var K = Math.round(random(1,4))

  switch(K){
    case 1 : ground.addImage(background1)
      break;
      case 2 : ground.addImage(background2)
      
      break;
      case 3 : ground.addImage(background3)
     
      break;
      case 4 : ground.addImage(background4)
     
      break;
  }
    
  }
  
}

function keyPressed() {

  if(keyDown("LEFT_ARROW")){
    player .addAnimation("running", playerleftside);

    player.X=player-4;
    player.velocityY=0;
    }
    
    if(keyDown("RIGHT_ARROW")){
      player .addAnimation("running", playerrightside);

    player.X=player+4;
    player.velocityY=0;
    }
  }