'use strict';

function ZFlashStripe(game, y){
	this.game = game;
	this.y = y;
	this.ttl = ZFLASH_MAX_DURATION*Math.random();
}
ZFlashStripe.prototype.update = function(delta){
	this.ttl -= delta;
	if(this.ttl <= 0){
		this.game.effects.zFlashStripes.remove(this);
	}
}
ZFlashStripe.prototype.render = function(canvas, ctx){
	ctx.strokeStyle = ZFLASH_COLOR;
	ctx.lineWidth = ZFLASH_WIDTH;
	ctx.beginPath();
	ctx.moveTo(0, this.y);
	ctx.lineTo(canvas.width, this.y);
	ctx.stroke();
}

function Effects(game){
	this.game = game;	
	this.zFlashStripes = [];
}

Effects.prototype.update = function(delta){
	this.zFlashStripes.update(delta);
}

Effects.prototype.render = function(canvas, ctx){
	this.zFlashStripes.render(canvas, ctx);
}

Effects.prototype.zFlash = function(){
		var completedScreen = document.getElementById('completed');
		var gameScreen = document.getElementById('game');
		gameScreen.style.display = 'block';
		completedScreen.style.display = 'none'
	for(var y = 0; y < this.game.canvas.height; y++){
		this.zFlashStripes.push(new ZFlashStripe(this.game, y));
	}
}
