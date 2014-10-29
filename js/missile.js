'use strict';

function Missile(game, startx, starty, endX, endY){
	this.game = game;
	this.startx = startx;
	this.starty = starty;
	this.x = startx;
	this.y = starty;

	var distX = endX - startx;
	var distY = endY - starty;
	var angle = Math.atan2(distY, distX);
	var distance = Math.sqrt(
		Math.pow(distX, 2) + Math.pow(distY, 2)
	);
	this.dx = Math.cos(angle) * MISSILE_SPEED;
	this.dy = Math.sin(angle) * MISSILE_SPEED;
	this.ttl = distance/MISSILE_SPEED * 1000;
}

Missile.prototype.update = function(delta){
	this.x += this.dx * delta / 1000;
	this.y += this.dy * delta / 1000;

	this.ttl -= delta;
	if(this.ttl < 0){
		this.explode();
	}
}

Missile.prototype.render = function(canvas, ctx){
	ctx.strokeStyle = MISSILE_COLOR;
	ctx.lineWidth = MISSILE_WIDTH;
	ctx.beginPath();
	ctx.moveTo(this.startx, this.starty);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
}

Missile.prototype.explode = function(){
	this.game.missiles.remove(this);
	this.game.explosions.push(new Explosion(
		this.game,
		this.startx,
		this.starty,
		this.x,
		this.y
	));
}
