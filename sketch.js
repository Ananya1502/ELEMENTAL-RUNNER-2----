var bg ,  bgImg;
var boy , boyImg;
var advancedSpell, defenceSpell, hydroSpell, metalSpell, moonSpell, solarFlareSpell, windSpell, spellsGroup , spell
var fire , fireSword , guillotine , handcuffs , snake, obstacleGrp , nuke;
var invisibleGround;
var PLAY = 1
var END = 0
var gameState = PLAY;
var gameOver, gameOverImg;
var restart , restartImage;
var score = 0;
var bgMusic;

function preload(){
  bgImg = loadImage("assets/magicforest.png");
  
  boyImg = loadAnimation(
    "boy/boyrunning-0.png",
    "boy/boyrunning-1.png",
    "boy/boyrunning-2.png",
    "boy/boyrunning-3.png",
    "boy/boyrunning-4.png",
    "boy/boyrunning-5.png",
    "boy/boyrunning-6.png",
    "boy/boyrunning-7.png",
    "boy/boyrunning-8.png",
    "boy/boyrunning-9.png",
    "boy/boyrunning-10.png");

  advancedSpell = loadImage("assets/spells/advanced spell.png");
  defenceSpell = loadImage("assets/spells/defencespell.png");
  hydroSpell = loadImage("assets/spells/hydro spell.png");
  metalSpell = loadImage("assets/spells/metalspell.png");
  moonSpell = loadImage("assets/spells/moonspell.png") ;
  solarFlareSpell = loadImage("assets/spells/solarflarespell.png");
  windSpell = loadImage("assets/spells/wind.png");

  //obstacles : fire , fireSword , guillotine , handcuffs , snake;
  fire = loadImage("assets/obstacles/fire.png");
  fireSword = loadImage("assets/obstacles/Untitled.png");
  guillotine = loadImage("assets/obstacles/guillotine.png");
  snake = loadImage("assets/obstacles/snake.png");
  handcuffs = loadImage("assets/obstacles/handcuffs.png");
  nuke = loadImage("assets/obstacles/nuke.png");

  gameOverImg = loadAnimation(
    "assets/gameover/gameover-0.png",
    "assets/gameover/gameover-1.png",
    "assets/gameover/gameover-2.png",
    "assets/gameover/gameover-3.png",
    "assets/gameover/gameover-4.png",
    "assets/gameover/gameover-5.png",
    "assets/gameover/gameover-6.png",
    "assets/gameover/gameover-7.png",
    "assets/gameover/gameover-8.png",
    "assets/gameover/gameover-9.png",
    "assets/gameover/gameover-10.png",
    "assets/gameover/gameover-11.png",
    "assets/gameover/gameover-12.png",
    "assets/gameover/gameover-13.png",
    "assets/gameover/gameover-14.png",
    "assets/gameover/gameover-15.png",
    "assets/gameover/gameover-16.png",
    "assets/gameover/gameover-17.png",
    "assets/gameover/gameover-18.png",
    "assets/gameover/gameover-19.png",
    "assets/gameover/gameover-20.png",
    "assets/gameover/gameover-21.png",
    "assets/gameover/gameover-22.png",
  );
 restartImage = loadImage("assets/restartbutton.png");
 bgMusic = loadSound("assets/xyz.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  boy = createSprite(width/2-700, height/2+250, 70, 200);
  //boy.setCollider("circle", 0, 0 ,40); 
  boy.shapeColor = "red";
  boy.setCollider("circle", 0, 0 ,100);
  boy.addAnimation("running", boyImg);
  boy.scale = 0.5
  boy.visible = true;
  
  invisibleGround = createSprite(width/2 , height/2+250, width , 40);
  invisibleGround.visible = false;

  gameOver = createSprite(width/2 , height/2 , 50 ,50);
  gameOver.addAnimation("gameOver :(" , gameOverImg);
  gameOver.scale = 4
  gameOver.visible = false;

  restart = createSprite(width/2 , height/2 + 130 , 150 , 90);
  restart.addImage(restartImage);
  restart.scale = 1.2
  restart.visible = false;

  spellsGroup = new Group;
  obstacleGrp = new Group;
  

}

function draw() {
  background(bgImg);

 
  if(gameState === PLAY){
    if(keyDown("space")){
      boy.velocityY = -20
    }
    boy.velocityY = boy.velocityY+1;

   if(spellsGroup.isTouching(boy)){
      score = score + 5
      spellsGroup.destroyEach();
    } 

    boy.visible = true;

    spawnSpells();
    spawnObstacles();
    //bgMusic.play();

  } else if(gameState === END){
    //bgMusic.stop();
    boy.visible = false;
    gameOver.visible = true;
    restart.visible = true;

    obstacleGrp.destroyEach();
    spellsGroup.destroyEach();
  }

  if (obstacleGrp.isTouching(boy)){
    gameState = END;
  }
  
  if (mousePressedOver(restart)){
    score=0
    gameOver.visible = false;
    restart.visible = false;
    gameState=PLAY;
  }
  
  drawSprites();
  

  //console.log(windowWidth, width/2);

  boy.collide(invisibleGround);

  textSize(60);
  fill("yellow");
  stroke("red");
  text("Score: " + score , width/2 + 500 , 100);
  strokeWeight(5);
  
}

function spawnSpells(){
  if(frameCount % 100 === 0){
   spell = createSprite(width , height/2+200 , 20, 40);
    //spell.velocityX = -6;
    spell.scale = 0.9
    spell.lifetime = 300;
    spellsGroup.add(spell);
    var rand = Math.round(random(1,7));
    switch(rand){
      case 1 : spell.addImage("spell1", advancedSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                 score = score + 5
                 //spell.destroy();;
               }
        break;
      case 2 : spell.addImage("spell2" , defenceSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                score = score + 5
              }
        break;
      case 3 : spell.addImage("spell3", hydroSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                score = score + 5
                //spell.destroy();;
              }
        break;
      case 4 : spell.addImage("spell4", metalSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                score = score + 5;
                //spell.destroy();;
              }
        break;
      case 5 : spell.addImage("spell5", moonSpell);
              spell.velocityX = Math.round(random(-6 , -15));
              if(spell.isTouching(boy)){
                score = score + 5;
                //spell.destroy();;
              }
        break;
      case 6 : spell.addImage("spell6", solarFlareSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                score = score + 5
                //spell.destroy();;
              }
        break;
      case 7 : spell.addImage("spell7", windSpell);
               spell.velocityX = Math.round(random(-6 , -15));
               if(spell.isTouching(boy)){
                score = score + 5
                //spell.destroy();;
              }
        break;
      default : break;
    }
    
  }
}

function spawnObstacles(){
  if(frameCount % 150 === 0){
    var obstacles = createSprite(Math.round(random(540, 1088)) , height/2+200 , 20, 40);
    obstacles.scale = 0.6
    obstacles.lifetime = 300;
    obstacleGrp.add(obstacles);
    var rand1 = Math.round(random(1,6));
      switch(rand1){
        case 1 : obstacles.addImage("obstacle1" , fire);
                 obstacles.velocityX = Math.round(random(-5 , -15));
          break;
        case 2 : obstacles.addImage("obstacle2", guillotine);
                 obstacles.velocityX = Math.round(random(-5 , -15));
                 obstacles.scale = 0.5
          break;
        case 3 : obstacles.addImage("obstacle3", handcuffs);
                 obstacles.velocityX = Math.round(random(-5 , -15));
          break;
        case 4 : obstacles.addImage("obstacle4", fireSword);
                 obstacles.velocityX = Math.round(random(-5 , -15));
          break;
        case 5 : obstacles.addImage("obstacle5", snake);
                 obstacles.velocityX = Math.round(random(-5 , -15));
          break;
        case 6: obstacles.addImage("obstacle6", nuke);
                obstacles.velocityX = Math.round(random(-5 , -15));
          break;
        default: break;
      }
  }
}


 