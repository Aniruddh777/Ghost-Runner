var tower, towerImg;

var door, doorImg, doorsGroup;

var climber, climberImg, climbersGroup;

var ghost, ghostImg;

var invisibleBlock, invisibleBlockGroup;

var gameState = "start";

var score = 0;

var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 3;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw(){
  background(0);
  
  if(gameState==="start"){
    stroke("white");
    fill("white");
    textSize(30);
    text("Press 'S' to start",200,200);
  }
  
  if(keyDown("s")){
    gameState="play"; 
  }
  
  if(gameState === "play"){
    
  score=score+Math.round((getFrameRate()/60));
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(tower.y > 400){
    tower.y = 300;
  }
  
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 700){
    ghost.destroy();
    gameState = "end";
  }
  
  drawSprites();
 }
    
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Game Over",200,250);
  }
  
  stroke("green");
  fill("green");
  textSize(30);
  text("Score:"+score,250,100); 

}

function spawnDoors(){
  
  if(frameCount%200 === 0){
    
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 3;
    climber.velocityY = 3;
    invisibleBlock.velocityY = 3;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    
    //invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}