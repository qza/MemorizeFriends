// Grid dimension for levels 1 - 5
var size_per_level = [ 4, 6, 8, 10, 12];

var card_count = 16;

build_board = function(level){
	row_counter = 1;
	col_counter = 1;
	grid_size = size_per_level[level-1];
	card_count = grid_size * grid_size / 2;
	while(row_counter <= grid_size){
		while(col_counter <= grid_size){	
			elem_id = row_counter + "_" + col_counter;			
			image_id = "image_" + ((row_counter - 1) * grid_size + col_counter);
			append_card(elem_id, image_id);
			if(col_counter==grid_size) {
				append_break();							
			}			
			col_counter = col_counter + 1;
		}
		col_counter = 1;
		row_counter = row_counter + 1;
	}
};

append_card = function(elem_id, image_id){
	var content = [];
	content[0] = "<div id='" + elem_id + "' class='grid_1'>";
	content[1] = "<ul class='hover_block'><li class='hover_action'>";
	content[2] = "<a id='" + image_id + "' href='#'>";
	content[3] = "<img alt='UWP' src='res/question_mark.jpg'>";
	content[4] = "UWP</a></li><ul></ul></ul></div>";
	$("#card_container").append(content.join(''));	
};

append_break = function(){
	$("<div>")
		.attr("class", "clear")
		.append("</div>")
		.appendTo("#card_container");
};
