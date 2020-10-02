//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  database = firebase.database()
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();

  //add styles here
  textSize(20);
  fill("red");
  text(foodS, 250, 100);
  text("Note: Press up arrow to feed milk to the dog", 75, 150)
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}



