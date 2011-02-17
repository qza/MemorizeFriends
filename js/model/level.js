/* 
 * Level super class
 */
Level.prototype.get_log = get_log; 

function Level(level_number, level_name) {
	this.number = level_number;
	this.name = level_name;
}
// Define Method
Level.prototype.get_number = function()
{
	return this.number;
}
// Define Method
Level.prototype.get_name = function()
{
	return this.name;
}
// Define Method
function get_log() {
	var content = ["number:",this.number,";","name:",this.name,"<br/>"].join(' '); 
	return content;
}