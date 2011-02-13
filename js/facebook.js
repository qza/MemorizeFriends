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

var images = new Array();
var setImages = new Array();
	
/* Add user friends as card backgrounds */
add_user_pictures = function(user_id, limit){
	counter = 0;
	FB.api('/me', function(me) {
		var query = FB.Data.query('SELECT uid, name, pic_square FROM user WHERE uid = '+me.id+'OR uid IN (SELECT uid2 FROM friend WHERE uid1 = '
		+me.id+')');
		query.wait(function(rows) {
			$.each(rows, function(i,item){
				counter++;
				image_path = item.pic_square;
				images[counter]="<img class='user_photo' style='position:absolute; z-index: 1; left: 5; top: 5;' src='" + image_path+ "'/>";
				
				//next_id = "image_" + counter;
                                //$("#" + next_id).append("<img style='position:absolute; z-index: 1; left: 5; top: 5;' src='" + image_path+ "'/>");
				// current_css = $("#" + next_id).css(); 
				// $("#" + next_id).css("background:url('" + image_path + "')");
				// $("#" + next_id).attr("style", "background: url('"+image_path+"')");
				/* Check card limit */

  				if(counter==limit) return false;
  			});
			var tmpCount = 0;
			$("a[id^='image_']").each( function(){
				var random = randomXToY(1,limit);
				var image = images[random];
				if(image.count==undefined){
					$(this).append(image);
					image.count = 1;
				} else if (image.count ==1 ){
					$(this).append(image);
					image.count = 2;
				} else {
					while(image.count == 2 ){
						image=images[randomXToY(1,limit)];		
					}
					$(this).append(image);	
				}
			});
		});
		});
}

//function to get random number upto m
function randomXToY(minVal,maxVal,floatVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
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



