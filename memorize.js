/* number of opened cards*/	
var count = 0;

/* Grid dimension for levels 1 - 5 	
*/
var size_per_level = [ 3, 4, 6, 8, 10];

/* BOOTSTRAP */

$(function(){
    bootstrap(); 
});

bootstrap = function(){
	$('.hover_action').click(function(){				
		if(count < 2 ) {
			$(this).find('img').animate({left:'60px'},{queue:false,duration:500});
			if(count ==1){
				setTimeout(closing,2000);
				$.blockUI({message: ' ', css: { width: 0, height: 0} });
			}
			count = count + 1;
		}
		return false;
	});
};	

/* METHODS
*/
closing = function(){
	if(count == 2) {
		count = 0;
		$('.hover_action').each(function(){
			$(this).find('img').animate({left:'0px'},{queue:false,duration:1000});
		});
		$.unblockUI();
	}
};	

button_clicked = function(){
	$("#card_container").html("");
	level_str = $("#level_select option:selected").val();
	level = parseInt(level_str);  
	init_card_board(level);
};
	
init_card_board = function(level){

	grid_size = size_per_level[level-1];
	
	row_counter = 1;
	col_counter = 1;
	while(row_counter <= grid_size){
		while(col_counter <= grid_size){	
			elem_id = row_counter + "_" + col_counter;					
			/*  add_card */
			$("<div>")
				.attr("id", elem_id)		
				.attr("class", "grid_1")
				.append("<ul class='hover_block'><li class='hover_action'><a href='#'><img src='question_mark.jpg' alt='UWP'/>UWP</a></li><ul>")
				.append("</div>")
				.appendTo("#card_container");
		
			/*  break row */
			if(col_counter==grid_size) {
				$("<div>")
					.attr("class", "clear")
					.append("</div>")
					.appendTo("#card_container");
			}			
			col_counter = col_counter + 1;
		}
		col_counter = 1;
		row_counter = row_counter + 1;
	}
	bootstrap();
};
	
get_user_picture_path = function(user_id){
	return "http://graph.facebook.com/" + user_id + "/picture";
};
	
/* Add user friends as card backgrounds */
add_user_pictures = function(user_id, token){
	counter = 0;
	$.getJSON("https://graph.facebook.com/"+user_id+"/friendlists?access_token="+token, {}, 
	  	function(data) {
			$.each(data.items, function(i,item){
				counter++;
				$("<img/>")
					.attr("src", get_user_picture(item.id))
  						.attr("id", item.id)
  						.appendTo("#images");
				/* Check card limit */
  				if(counter==limit) return false;
  			});
  		}
  	);
}