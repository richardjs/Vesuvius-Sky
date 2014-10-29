'use strict';

function Explosion(game, startx, starty, x, y){
	this.game = game;
	this.startx = startx;
	this.starty = starty;
	this.x = x;
	this.y = y;

	this.radius = 0;
	this.ttl = EXPLOSION_DURATION;
}

Explosion.prototype.update = function(delta){
	if(this.radius < EXPLOSION_MAX_SIZE){
		this.radius += EXPLOSION_SPEED*delta / 1000;
	}
	if(this.radius > EXPLOSION_MAX_SIZE){
		this.radius = EXPLOSION_MAX_SIZE;
	}

	this.ttl -= delta;
	if(this.ttl < 0){
		this.game.explosions.remove(this);
	}
}

Explosion.prototype.render = function(canvas, ctx){
	ctx.fillStyle = EXPLOSION_COLOR;
	ctx.beginPath();
	ctx.arc(
		this.x,
		this.y,
		this.radius,
		0,
		Math.PI*2
	);
	ctx.fill();
}
