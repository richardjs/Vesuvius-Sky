'use strict';

function Controller(game){
	var controller = this;
	this.game = game;
	this.mouse = {x: 0, y: 0}

	document.addEventListener('keydown', function(event){
		if(event.keyCode == 65){
			event.preventDefault();
			game.leftSilo.fire(this.mouse.x, this.mouse.y);
		}else if(event.keyCode == 68){
			event.preventDefault();
			game.rightSilo.fire(this.mouse.x, this.mouse.y);
		}
	}.bind(this));

	this.game.canvas.addEventListener('mousemove', function(event){
		var canvas = controller.game.canvas;
		this.mouse.x = event.clientX - canvas.offsetLeft;
		this.mouse.y = event.clientY - canvas.offsetTop;
	}.bind(this));
}
