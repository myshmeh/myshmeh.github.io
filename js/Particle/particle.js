function Vec2(r){
	this.x = 0;
	this.y = 0;
}

function Particle(x, y, hspd, vspd){
	this.x = x;
	this.y = y;
	this.hspd = hspd;
	this.vspd = vspd;
	
	this.Update = function(){
		if(this.isOutOfScreen()){
			this.x = mouseX;
			this.y = mouseY;
		}
		//apply gravity
		this.vspd += 1;
		this.y += this.vspd;
		this.x += this.hspd;
	}
	
	this.Draw = function(){
		stroke(255);
		strokeWeight(3);
		point(this.x, this.y);
	}
	
	this.isOutOfScreen = function(){
		if(this.y > height)
			return true;
		return false;
	}
}