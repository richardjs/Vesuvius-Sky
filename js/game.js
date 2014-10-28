'use strict';

function Game(){
	
}
Game.prototype.start = function(){
	var lastTime = 0;
	function frame(time){
		var delta = time - lastTime;
		window.requestAnimationFrame(frame);
	}
	frame();
}
