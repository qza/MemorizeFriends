var is_test = true;

FB.init({
	appId : '118130168215562',
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml : true // parse XFBML
});


var test_facebook_images = function(limit){
  user_id = facebook_user_id_holder();
  add_user_pictures(user_id, limit);
}

var uid = FB.getSession().uid;

var query = FB.Data.query('select title, url, created_time from link where owner={0}',uid);

var images = new Array();

var setImages = new Array();
	
/* Add user friends as card backgrounds */
add_user_pictures = function(user_id, limit){
	counter = 0;
	FB.api('/me', function(me) {
	   var query = getFriendPicturesQuery(me);
		var doquery = FB.Data.query(query);
		doquery.wait(function(rows) {
		   var size = rows.length(); 
			$.each(rows, function(i,item){
				counter++;
				image_path = item.pic_square;
				images[counter]= getImageCode();
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

function getFriendPicturesQuery(me){
  var query = [];
  query[0] = 'SELECT uid, name, pic_square FROM user WHERE uid =';
  query[1] = me.id;
  query[2] = 'OR uid IN (SELECT uid2 FROM friend WHERE uid1 =';
  query[3] = me.id;
  query[4] = ')'
  return query.join(' ');
}

function getImageCode(image_path) {
	return "<img class='user_photo' style='position:absolute; z-index: 1; left: 5; top: 5;' src='" + image_path+ "'/>";
}

function randomXToY(minVal,maxVal,floatVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}