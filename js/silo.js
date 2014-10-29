'use strict';

function Silo(game, x){
	this.game = game;
	this.x = x;
	this.ammo = MISSILE_COUNT;
}

Silo.prototype.fire = function(x, y){
	if(!this.ammo){
		return;
	}
	this.game.missiles.push(
		new Missile(
			this.game,
			this.x,
			this.game.canvas.height,
			x,
			y
		)
	);
	this.ammo--;
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
	);
	ctx.fill();

	ctx.fillStyle = HUD_COLOR;
	ctx.font = HUD_SILO_FONT;
	var textWidth = ctx.measureText(this.ammo).width;
	ctx.fillText(
		this.ammo,
		this.x - textWidth/2,
		canvas.height - HUD_SILO_HEIGHT 
	);
}
