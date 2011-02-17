/*
 * MatchBoardLevel sub-class
 */
MatchBoardLevel.prototype = new Level;
MatchBoardLevel.prototype.baseClass = Level.prototype.constructor;
MatchBoardLevel.prototype.constructor = MatchBoardLevel;
MatchBoardLevel.prototype.get_log = get_matchboard_log;

function MatchBoardLevel(level_number, level_name, board_size, match_time) {
   this.number = level_number;
	this.name = level_name;
	this.size = board_size;
	this.time = match_time;
}
// Define Method
MatchBoardLevel.prototype.get_size = function()
{
	return this.size;
}
// Define Method
MatchBoardLevel.prototype.get_time = function()
{
	return this.time;
}
// Define Method
MatchBoardLevel.prototype.get_card_count = function()
{
	return this.size * this.size;
}
// Define Method
MatchBoardLevel.prototype.get_pict_count = function()
{
	return (this.size * this.size)/2;
}
// Define Method// Define Method
function get_matchboard_log() {
	var matchboard_content = ["number:",this.number," ; ","name:",this.name,";",
	 					"size:",this.size ,";","time:", this.time,"<br/>"].join(' ');
	return matchboard_content;
}