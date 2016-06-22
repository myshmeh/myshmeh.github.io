var canvas;
var t;
var p, p2;
function setup() {
  //init canvas
  canvas = createCanvas(windowWidth, windowHeight*0.9);

  canvas.position(0, 0);
  canvas.parent("p5");
  
  //init var
  t = 0;
  p = new Vec2();
  p2 = new Vec2();
}

function draw() {
  Update();
  background(181, 39, 53);
  Draw();
}

function Update(){
	t++;
}

function Draw(){
	translate(width/2, height/2);
	//stroke(255);
	//*--draw main
	for(var i=0; i<8; i++){
		var offset = i*4;
		p.y = sin(radians(t+offset)) * sin(radians(t+offset) * 2) * sin(radians(t+offset) *2)* 300;
		p.x = cos(radians(t+offset)) * cos(radians(t+offset) * 3) * cos(radians(t+offset) * 2) * 300;
		p2.y = sin(radians(t+offset)) * sin(radians(t+offset) * 2) * sin(radians(t+offset) ) * 200;
		p2.x = cos(radians(t+offset) * 3.5) * 200;
		stroke(255);
		strokeWeight(5);
		point(p.x, p.y);
		point(p2.x, p2.y+20);
		strokeWeight(1);
		line(p.x, p.y, p2.x, p2.y+20);
	}
	resetMatrix();
}