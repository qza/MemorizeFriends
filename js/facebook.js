var is_test = true;

get_user_picture_path = function(user_id){
	return "http://graph.facebook.com/" + user_id + "/picture";
};
	
/* Add user friends as card backgrounds */
add_user_pictures = function(user_id, limit, apikey){
	counter = 0;
	$.getJSON("https://graph.facebook.com/"+user_id+"/friendlists?access_token="+apikey, {}, 
	  	function(data) {
			$.each(data.items, function(i,item){
				counter++;
				image_path = get_user_picture(item.id);
				next_id = "img_" + counter;
				current_css = $("#" + next_id).css(); 
				$("#" + next_id).css(current_css + "background:url('" + image_path + "')");
				/* Check card limit */
  				if(counter==limit) return false;
  			});
  		}
  	);
}

test_facebook_images = function(){
	user_id = facebook_user_id_holder();
	apikey = facebook_api_id_holder();
	add_user_pictures(user_id, card_count, apikey);
}
