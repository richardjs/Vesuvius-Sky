'use strict';

function Game(canvas){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');

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
}

Game.prototype.render = function(canvas, ctx){
	this.buildings.forEach(function(building){
		building.render(canvas, ctx);
	});
}

Game.prototype.start = function(){
	var game = this;
	var lastTime = 0;
	function frame(time){
		var delta = time - lastTime;

		game.render(game.canvas, game.ctx);

		window.requestAnimationFrame(frame);
	}
	frame();
}

