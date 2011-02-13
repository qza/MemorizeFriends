var fbid = facebook_app_id_holder();

var is_test = true;

FB.init({
	appId : fbid,
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml : true // parse XFBML
});

// Method called on application initialization
var test_facebook_images = function(limit){
  user_id = facebook_user_id_holder();
  add_user_pictures(user_id, limit);
}

	
/* Add user friends as card backgrounds. 
 *  
 * Task description
 * 
 * There can be 16, 36, 64, 100 or 144 cards on  the board. Each 
 * picture is placed  on two  cards. User may  have less or more 
 * friends then needed for some level. If user have less friends
 * then needed for selected leve, user is  automaticly  switched 
 * to appropriate level. Is  most cases user have  more  friends 
 * then  needed, and 8,18,32,50 or 72 friends  picures is needed 
 * to be able to play
 */ 
add_user_pictures = function(user_id, limit){		
	// All images on the board
	// Holder for Map {nextrandom, nextimage}
	var images = new Object();
	var nextrandom = -1;
	var nextimage  = "";
	// Call FB api for user_id param
	FB.api('/me', function(me) {
		// Get all objects for user frineds
	   var query = getFriendPicturesQuery(me);
		var doquery = FB.Data.query(query);
		// Execute query and proces result rows
		doquery.wait(function(rows) {
		   // Take random images until reaching limit   		   
		   while(images.length < limit){
		      // Randomly from all friends
		   	nextrandom = randomXToY(1,rows.length());
		   	// Select picture only once,  
		   	if(images[nextrandom] == null) {
		   		// Add key and image to map
		   		images[nextrandom] = {
		   			imagesrc: rows[nextrandom].pic_square
		   		};
					alert("ADDED NUMBER:" + nextrandom + "; IMAGE SRC:" + nextimage.imagesrc);
		   	}
		   }
			// Tracking used positions on board
			var positions = new Array();
			// Traverse selected pictures
			$.each(images, function(i,item){
				// Tracking usage of some picure
				var numberonboard = 0;
				// Place each on two positions
				while(numberonboard < 2) {
					// Get random for axes
					nextx = randomXToY(1,limit);
					nexty = randomXToY(1,limit);
					// Target element <a id=" .... />
					nextid = "image_" + nextx + "_" + nexty;
					// Test if this position is used
					if(!positions.contains(nextid)) {
						// Get image code
						var imagecode = getImageCode(item.imagesrc);
						// Add Image code to Target element
						$("#"+ next_id).append(imagecode);
						// Mark position						
						positions.add(nextid);
						// Increase number of occurences
						numberonboard = numberonboard + 1;
					} 
				}
  			});
  			
		});
		
   });
   
}

function getFriendPicturesQuery(me){
  var q = [];
  q[0] = 'SELECT uid, name, pic_square FROM user WHERE uid =';
  q[1] = me.id;
  q[2] = 'OR uid IN (SELECT uid2 FROM friend WHERE uid1 =';
  q[3] = me.id;
  q[4] = ')'
  return q.join(' ');
}

function getImageCode(image_path){
  var q = [];
  q[0] = ' <img';
  q[1] = ' class="user_photo"';
  q[2] = ' style="position:absolute; z-index: 1; left: 5; top: 5;"';
  q[3] = ' src="';
  q[4] = image_path;
  q[5] = '"/>'
  return q.join('');
}

function randomXToY(minVal,maxVal,floatVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

FB.init({
	appId : fbid,
	status : true, // check login status
	cookie : true, // enable cookies to allow the server to access the session
	xfbml : true // parse XFBML
});
// ???
var uid = FB.getSession().uid;
var query = FB.Data.query('select title, url, created_time from link where owner={0}',uid);