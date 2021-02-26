var balloon, balloonImg1, balloonImg2, balloonImg3;
var backgroundImg;
var database;
var pos;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg1 = loadImage("Hot Air Ballon-03.png");
  balloonImg2 = loadImage("Hot Air Ballon-04.png");
  balloonImg3 = loadImage("Hot Air Ballon-02.png");
}

function setup(){

  database = firebase.database();

  createCanvas(1000,700);

  balloon = createSprite(100,100,50,50);
  balloon.addImage(balloonImg3);


  var node = database.ref("balloon/position");
  node.on("value",readPosition,showError);



}

function draw(){
  background(backgroundImg); 
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,1);
  }

  if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addImage(balloonImg1);
    balloon.scale = balloon.scale - 0.01;
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
    balloon.addImage(balloonImg2);
    balloon.scale = balloon.scale + 0.01;
  }

  textSize(20);
  fill("black");
  text("**Use arrow keys to move Hot Air Balloon!",10,30);

  drawSprites();
}

function readPosition(data){
  pos = data.val();
  balloon.x = pos.x;
  balloon.y = pos.y;
}

function showError(){
  console.log("error");
}

function writePosition(x,y){
  database.ref("balloon/position").set({
    'x':pos.x+x,
    'y':pos.y+y
  })
}