/* 
 * Game super class
 */
Game.prototype.add_level = add_level;

function Game() {

	this.name = "";
	
	this.description = "";
	
	var content_path = "";
	
	var help_path = "";
	
	var levels = new Array();
	
	add_level = new function(level) {
		if(level instanceof Level){
				levels.add(level);
				return true;
		} else {
			alert("Bad Bad Bad level.");
			return false;
		}
	}
	
	this.get_levels = new function() {
		return levels;
	}
}

/*
 * MatchBoardGame sub-class
 */
MatchBoardGame.prototype = new Game;
MatchBoardGame.prototype.baseClass = Game.prototype.constructor;
MatchBoardGame.prototype.constructor = MatchBoardGame;
MatchBoardGame.prototype.add_level = add_matchboard_level;

function MatchBoardGame() 
{
	var names = new Array("*","Easy","Advanced","Hard","Expert");
	var dims = new Array(-1,   4,   6,   8,  10);
	var times = new Array(-1,  64, 144, 320, 500);
	
	[1,4].each(i, function(){
		mbl = new MatchBoardLevel(1, names[i], dims[i], times[i]); 
	});
}