var canvas;
var t;
//draw
var p, p2;
//draw2
var x, y, r;
var noisedR;
var xoff, yoff;
var val;
function setup() {
  //init canvas
  var  h;
  if(windowHeight > 750) h = 750;
  else h = windowHeight
  canvas = createCanvas(windowWidth, h*0.9);

  canvas.position(0, 0);
  canvas.parent("p5");
  
  //init var
  t = 0;
  //draw
  p = new Vec2();
  p2 = new Vec2();
  //draw2
  x = y = 0;
  r = height * 0.6;
  noisedR = 0;
  xoff = yoff = 0;
  val = 1;
}

function draw() {
  Update();
  background(181, 39, 53);
  //Draw();
  Draw2();
}

function Update(){
	t++;
}

//*--Draw
function Draw(){
	translate(width/2, height/2);
	//stroke(255);
	//*--draw main
	for(var i=0; i<8; i++){
		var offset = i*4;
		p.y = sin(radians(t+offset)) * sin(radians(t+offset) * 2) * sin(radians(t+offset) *2)* height*0.5;
		p.x = cos(radians(t+offset)) * cos(radians(t+offset) * 3) * cos(radians(t+offset) * 2) * width*0.2;
		p2.y = sin(radians(t+offset) * 3) * sin(radians(t+offset) * 2) * sin(radians(t+offset) ) * height*0.3;
		p2.x = cos(radians(t+offset) * 1.6)  * width*0.2;
		stroke(255);
		strokeWeight(5);
		point(p.x, p.y);
		point(p2.x, p2.y+20);
		strokeWeight(1);
		line(p.x, p.y, p2.x, p2.y+20);
	}
	resetMatrix();
}

//*--Draw 2
function Draw2(){
	translate(width*0.495, height/2);
	strokeWeight(2);
	stroke(255);
	var i;
	for(i=0; i<360; i++){
		xoff = sin(radians(i)) * sin(radians(i*val)) * 0.85;
		noisedR = noise(xoff, yoff) * r;
		x = cos(radians(i)) * noisedR; //cos(angle) == x / r -> x == cos(angle) * r
		y = sin(radians(i)) * noisedR; //sin(angle) == y / r -> y == sin(angle) * r
		line(0, 0, x, y); //draw line from center to further based on angle(i)
	}
	yoff += 0.01;
	resetMatrix();
}

function mouseClicked() {
	val = (val+1) % 7 + 1;
}