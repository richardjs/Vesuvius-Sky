'use strict';

function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');

	this.controller = new Controller(this);

	var slots = [];
	var slotWidth = canvas.width / SLOTS;
	for(var i = 0; i < SLOTS; i++){
		var x = slotWidth/2 + i*slotWidth;
		slots.push(x);
	}

	this.buildings = [];	
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

	this.missiles = [];
	this.explosions = [];
}

Game.prototype.update = function(delta){
	this.missiles.update(delta);
	this.explosions.update(delta);
}

Game.prototype.render = function(canvas, ctx){
	ctx.fillStyle = '#002';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.missiles.render(canvas, ctx);
	this.buildings.render(canvas, ctx);
	this.explosions.render(canvas, ctx);
}

Game.prototype.start = function(){
	var game = this;
	var lastTime = 0;
	function frame(time){
		var delta = time - lastTime;
		lastTime = time;

		game.update(delta);
		game.render(game.canvas, game.ctx);

		window.requestAnimationFrame(frame);
	}
	frame();
}

