var SLOTS = 7;

var CITY_WIDTH = 50;
var CITY_HEIGHT = 12;
var CITY_COLOR = '#555';

var SILO_SLOTS = [1, 5];
var SILO_RADIUS = 15;
var SILO_COLOR = '#300';

var MISSILE_COUNT = 75;
var MISSILE_SPEED = 200;
var MISSILE_COLOR = '#a77';
var MISSILE_WIDTH = .5;

var EXPLOSION_MAX_SIZE = 60;
var EXPLOSION_SPEED = 225;
var EXPLOSION_DURATION = 500;
var EXPLOSION_COLOR = '#888';

var BOMB_COUNT = 150;
var BOMB_SPEED = 40;
var BOMB_WAVES = 15;
var BOMB_WAVE_DURATION = 10 * 1000;
var BOMB_WAVE_FORMULA = function(wave){
	return wave;
}
var BOMB_COLOR = '#c44';
var BOMB_WIDTH = .75;

var HUD_COLOR = '#151';
var HUD_SILO_FONT = '10pt Courier';
var HUD_SILO_HEIGHT = 20;
