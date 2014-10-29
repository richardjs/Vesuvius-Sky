'use strict';

function City(game, x){
	this.game = game;
	this.x = x;
	this.alive = true;
}

City.prototype.render = function(canvas, ctx){
	if(!this.alive){
		return;
	}
	ctx.fillStyle = CITY_COLOR;
	ctx.fillRect(
		this.x - CITY_WIDTH/2,
		canvas.height - CITY_HEIGHT,
		CITY_WIDTH,
		CITY_HEIGHT
	);
}

City.prototype.die = function(){
	this.alive = false;
}
