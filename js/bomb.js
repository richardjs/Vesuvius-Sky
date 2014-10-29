'use strict';

function BombLaunch(time, target){
	this.time = time;
	this.target = target;
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
		bombLaunches.push(new BombLaunch(time, target));
	}
}

bombLaunches.sort(function(a, b){
	return a.time > b.time;
});
