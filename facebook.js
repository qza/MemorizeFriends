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