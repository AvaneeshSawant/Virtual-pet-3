//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var lastFed = 0;
var feed, addFood;
var foodObj;

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

  feed = createButton("Feed the Dog");
  feed.position(500, 95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(600, 95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
  background(46, 139, 87);

  database.ref('FeedTime').on("value", function(data){
    lastFed = data.val();
  })

  foodObj.display();

  //add styles here
  textSize(20);
  fill("red");
  text(foodS, 250, 100);
  text("Note: Press up arrow to feed milk to the dog", 75, 150);

  if(lastFed >= 12) {
    text("Last Feed: " + lastFed % 12 + "PM", 350, 30);
  } else if(lastFed === 0) {
    text("Last Feed: 12 AM");
  } else {
    text("Last Feed: " + lastFed, 350, 30);
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

