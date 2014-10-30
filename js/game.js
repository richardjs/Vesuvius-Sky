'use strict';

function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');

	this.controller = new Controller(this);

	this.buildings = [];
	this.missiles = [];
	this.bombs = [];
	this.explosions = [];

	this.elapsed = 0;
	this.nextBomb = 0;

	var slots = [];
	var slotWidth = canvas.width / SLOTS;
	for(var i = 0; i < SLOTS; i++){
		var x = slotWidth/2 + i*slotWidth;
		slots.push(x);
	}

	for(var i = 0; i < SLOTS; i++){
		if(i == SILO_SLOTS[0] || i == SILO_SLOTS[1]){
			continue;
		}
		var x = slots[i];
		this.buildings.push(new City(this, x));
	}
	this.leftSilo = new Silo(this, slots[SILO_SLOTS[0]]);
	this.rightSilo = new Silo(this, slots[SILO_SLOTS[1]]);
	this.buildings.push(this.leftSilo);
	this.buildings.push(this.rightSilo);
}

Game.prototype.update = function(delta){
	this.elapsed += delta;
	while(this.nextBomb < bombLaunches.length
			&& this.elapsed > bombLaunches[this.nextBomb].time){
		var launchData = bombLaunches[this.nextBomb];
		this.bombs.push(new Bomb(this, launchData.target));
		this.nextBomb++;
	}

	this.missiles.update(delta);
	this.bombs.update(delta);
	this.explosions.update(delta);

	this.explosions.forEach(function(explosion){
		this.bombs.forEach(function(bomb){
			var distance = Math.sqrt(
				Math.pow(bomb.x - explosion.x, 2)
				+ Math.pow(bomb.y - explosion.y, 2) 
			);
			if(explosion.radius >= distance){
				this.bombs.remove(bomb);
			}
		}.bind(this));
	}.bind(this));
}

Game.prototype.render = function(canvas, ctx){
	ctx.fillStyle = '#002';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.missiles.render(canvas, ctx);
	this.buildings.render(canvas, ctx);
	this.bombs.render(canvas, ctx);
	this.explosions.render(canvas, ctx);
}

Game.prototype.start = function(){
	var game = this;
	var lastTime = 0;
	function frame(time){
		time = time || 0;
		var delta = time - lastTime;
		lastTime = time;

		game.update(delta);
		game.render(game.canvas, game.ctx);

		window.requestAnimationFrame(frame);
	}
	frame();
}

