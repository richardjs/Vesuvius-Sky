'use strict';

function BombLaunch(time, targetSlot, startx){
	this.time = time;
	this.target = targetSlot;
	this.startx = startx;
}

var waveShares = [];
var sharesTotal = 0;
for(var wave = 1; wave <= BOMB_WAVES; wave++){
	var share = BOMB_WAVE_FORMULA(wave);
	waveShares.push(share);
	sharesTotal += share;
}

var bombLaunches = []
var bombsLeft = BOMB_COUNT;
for(var wave = 1; wave <= BOMB_WAVES; wave++){
	var share = waveShares[wave]/sharesTotal;
	var waveBombs = Math.round(share*BOMB_COUNT);
	if(waveBombs < 1){
		waveBombs = 1;
	}
	if(waveBombs > bombsLeft){
		waveBombs = bombsLeft;
	}

	for(var i = 0; i < waveBombs; i++){
		var waveStartTime = (wave - 1) * BOMB_WAVE_DURATION;
		var time = waveStartTime + Math.random()*BOMB_WAVE_DURATION;
		var target = Math.floor(Math.random() * SLOTS);
		var canvas = document.getElementById('canvas');
		var startx = canvas.width*Math.random(); 
		bombLaunches.push(new BombLaunch(time, target, startx));
	}
}

bombLaunches.sort(function(a, b){
	return a.time > b.time;
});


function Bomb(game, targetSlot, startx){
	this.game = game;

	this.startx = startx
	this.starty = 0;
	this.x = this.startx;
	this.y = this.starty;
	this.target = game.buildings[targetSlot];

	var endx = this.target.x;
	var endy = canvas.height;
	var distx = endx - this.startx;
	var disty = endy - this.starty;
	var angle = Math.atan2(disty, distx);
	var distance = Math.sqrt(
		Math.pow(distx, 2) + Math.pow(disty, 2)
	);
	this.dx = Math.cos(angle) * BOMB_SPEED;
	this.dy = Math.sin(angle) * BOMB_SPEED;
	this.ttl = distance/BOMB_SPEED * 1000;
}

Bomb.prototype.update = function(delta){
	this.x += this.dx * delta / 1000;
	this.y += this.dy * delta / 1000;

	this.ttl -= delta;
	if(this.ttl < 0){
		this.explode();
	}
}

Bomb.prototype.render = function(canvas, ctx){
	ctx.strokeStyle = BOMB_COLOR;
	ctx.lineWidth = BOMB_WIDTH;
	ctx.beginPath();
	ctx.moveTo(this.startx, this.starty);
	ctx.lineTo(this.x, this.y);
	ctx.stroke();
}

Bomb.prototype.explode = function(){
	this.game.bombs.remove(this);
	this.game.explosions.push(new Explosion(
		this.game,
		this.startx,
		this.starty,
		this.x,
		this.y
	));
	this.target.die()
}
