Array.prototype.remove = function(element){
	var index = this.indexOf(element);
	if(index > -1){
		this.splice(index, 1);
	}
}

Array.prototype.update = function(delta){
	this.forEach(function(entity){
		entity.update(delta);
	});
}

Array.prototype.render = function(canvas, ctx){
	this.forEach(function(entity){
		entity.render(canvas, ctx);
	});
}
