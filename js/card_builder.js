
// Grid dimension for levels 1 - 5
var size_per_level = [ 4, 6, 8, 10, 12];

var card_count = 16;

build_board = function(level, is_empty){
	row_counter = 1;
	col_counter = 1;
	if(is_empty==true){
		grid_size = size_per_level[3];		
	} 
	else {
		grid_size = size_per_level[level-1];	
	}
	card_count = grid_size * grid_size / 2;
	while(row_counter <= grid_size){
		row = "<div class='row'>";
		while(col_counter <= grid_size){	
			elem_id = row_counter + "_" + col_counter;			
			image_id = "image_" + ((row_counter - 1) * grid_size + col_counter);
			row = append_card(row, elem_id, image_id, is_empty);
			col_counter = col_counter + 1;
		}
		if(grid_size < 10){
		  row = row + "<div class='column grid_" + (10-grid_size)+"'></div>";
		}
		row = row + "</div>";
		$("#card_container").append(row);
		col_counter = 1;
		row_counter = row_counter + 1;
	}
};

append_card = function(row, elem_id, image_id, is_empty){
	var content = [];
	content[0] = "<div id='" + elem_id + "' class='column grid_1'>";
	content[1] = "<ul class='hover_block'><li id='li_" + image_id + "' class='hover_action'>";
	content[2] = "<a id='" + image_id + "' href='#'>";
	content[3] = "<img id='qm_li_" + image_id + "' class='questionMark'  style='position:absolute;z-index: 2;' alt='UWP' src='res/";
	if(is_empty==true) {
		content[4] =  "card_back.png"
	} 
	else {
		content[4] = "question_mark_48.jpg"
	}
	content[5] = "'>"; 
	content[6] = "</a></li><ul></ul></ul></div>";
	return (row + content.join(''));
};

append_row_start = function(){
	$("<div>")
	  	.attr("class", "row")
		.appendTo("#card_container");
};
