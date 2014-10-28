'use strict';

function Silo(game, x){
	this.game = game;
	this.x = x;
}

Silo.prototype.render = function(canvas, ctx){
	ctx.fillStyle = SILO_COLOR;
	ctx.beginPath();
	ctx.arc(
		this.x,
		canvas.height,
		SILO_RADIUS,
		Math.PI,
		0
	)
	ctx.fill();
}
