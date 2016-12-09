function setup() {
  createCanvas(1000, 600);
  ball = [];
  index = 0;
  gravity = 0;
  s = 50;
  sp = 0;
  resist = 0.8;
  condi = true;
  slide = createSlider(10, 100, 50);
  slide.position(0, 660)
  slide.input(updateS);
  slide2 = createSlider(-2,2,2);
  slide2.position(200,660);
  slide2.input(updateSp);
  createP('');
  var button = createButton("Reset");
  button.position(0, 690);
  button.mousePressed(resetSketch);
}

var slide2;
var ball;
var gravity;
var resist;
var index;
var s;
var condi;
var sp;

function updateSp()
{
  for(var i = 0; i < ball.length; i++)
  {
    sp = ball[i].xspeed = ball[i].yspeed = slide2.value();
  }
}

function updateS() {
  s = slide.value();
}

function resetSketch() {
  gravity = 0;
  resist = 0.8;
  s = 50;
  ball.splice(0, ball.length - 1);
  ball = [];
  index = 0;
  condi = true;
}

function mousePressed() {
  if (mouseX - s / 2 < 0 || mouseX + s / 2 > width) {
    condi = false;
  } else {
    condi = true;
  }
  if (mouseY - s / 2 < 0 || mouseY + s / 2 > height) {
    condi = false;
  } else {
    codi = true;
  }
  if (condi) {
    ball[index] = new Ball(mouseX, mouseY, sp, sp, index, s);
    index = index + 1;
    print(ball.length);
  }
}

function draw() {
  background(10);
  noStroke();
  fill(150);
  for (var i = 0; i < ball.length; i++) {
    ball[i].drawB();
  }
}

function Ball(X, Y, xspeed, yspeed, ind, s) {
  this.x = X;
  this.y = Y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.s = s;
  this.inde = ind;

  this.drawB = function() {
    ellipse(this.x, this.y, this.s, this.s);
    this.colli();
    this.update();
  }

  this.update = function() {
    if (this.x - this.s / 2 < 0 || this.x + this.s / 2 > width) {
      this.xspeed = this.xspeed * -1;
    }
    if (this.y - this.s / 2 < 0 || this.y + this.s / 2 > height) {
      this.yspeed = this.yspeed * -1;
    }
    this.x = this.x + (resist * this.xspeed);
    this.y = this.y + (resist * this.yspeed) + gravity;
  }

  this.colli = function() {
    var d = 0;
    var i = this.inde;
    for (var j = i + 1; j < ball.length; j++) {
      d = dist(ball[i].x, ball[i].y, ball[j].x, ball[j].y);
      if (d < (ball[i].s / 2 + ball[j].s / 2)) {
        ball[i].xspeed = ball[i].xspeed * -1;
        ball[i].yspeed = ball[i].yspeed * -1;
        ball[j].xspeed = ball[j].xspeed * -1;
        ball[j].yspeed = ball[j].yspeed * -1;
      }
    }
  }
}