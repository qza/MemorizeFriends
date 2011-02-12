var is_test = true;

FB.init({
	appId : '118130168215562',
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml : true // parse XFBML
});

get_user_picture_path = function(user_id){
	return "http://graph.facebook.com/" + user_id + "/picture";
};
	
/* Add user friends as card backgrounds */
add_user_pictures = function(user_id, limit){
	counter = 0;
	FB.api('/me', function(me) {
		var query = FB.Data.query('select title, url, created_time from friendlist  where owner={0}',me.id);
		query.wait(function(rows) {
			$.each(rows, function(i,item){
				counter++;
				image_path = item.picture;
				next_id = "img_" + counter;
				current_css = $("#" + next_id).css(); 
				$("#" + next_id).css(current_css + "background:url('" + image_path + "')");
				/* Check card limit */
  				if(counter==limit) return false;
  			});
		});
		});

	$.getJSON("https://graph.facebook.com/"+user_id+"/friendlists?access_token="+get_token(), {}, 
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

var facebook_token_url = function(){
	return "https://graph.facebook.com/oauth/access_token?" +
    "client_id=" + facebook_app_id_holder() + "&client_secret=" + facebook_app_secret_holder() +
    "&grant_type=client_credentials";
}

var test_facebook_images = function(limit){
  user_id = facebook_user_id_holder();
  add_user_pictures(user_id, limit);
}

var get_token = function(){
	return "118130168215562|OAwLS1IsVJhR1agus3wgYjSnuo0";
}

FB.init({
	appId : '118130168215562',
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml : true // parse XFBML
	});

var uid = FB.getSession().uid;
var query = FB.Data.query('select title, url, created_time from link where owner={0}',uid);
//; 



