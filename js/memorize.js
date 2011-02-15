/* number of opened cards*/	
var count = 0;

var pick1 = null;
var pick2 = null;

$(function(){
    bootstrap(); 
    build_board(-1, true);
});

bootstrap = function(){
	$('.hover_action').click(function(){				
		if(this.getAttribute('click')!= null) return false;
		if(count < 2 ) {
                        var my_id = $(this).attr("id");
                        var qm_id = "qm_" + my_id;
			var tmp = $('#'+qm_id);		
			tmp.animate({left:'50px'},{queue:false,duration:500});
			this.setAttribute('click','click');
			if(count ==1){
				pick2 = this;
				if(pickMatch(pick1, pick2)==true) {
					count = 0;
					updateScore();
					// setTimeout(function(){alert('You made a match!');},300);
					return;
				} else {
					setTimeout(closing,1500);
				}
			} else {
				pick1 = this;
			}
			count = count + 1;
		}
		return false;
	});
};	

var testing_on = true;

pickMatch=function(pick1,pick2){
	var p1imgs = $(pick1).find('img');
	var p2imgs = $(pick2).find('img');
	if( p1imgs.length>1 &&  p2imgs>1) {
		var p1 = p1imgs[1].getAttribute('src');
		var p2 = p2imgs[1].getAttribute('src');
		return p1 == p2;
	} 
	else {
		if(testing_on==true) {
			return true;
		} else {
			return false;
		}
	}
}

updateScore=function(){
	var currentVal = $("#score_value").text();
	var newVal = parseInt(currentVal) + 2;
	$("#score_value").text(newVal);
}

closing = function(){
	if(count == 2) {
		count = 0;
		pick1 = null;
		pick2 = null;
		$('.hover_action').each(function(){
			this.removeAttribute('click');
			$(this).find('img').animate({left:'0px'},{queue:false,duration:1000});
		});
	}
};

load_board = function(){
	level_str = $("#level_select option:selected").val();
	level = parseInt(level_str);  
	build_board(level, false);
}

button_clicked = function(){
	$("#card_container").html("");
	load_board();	
	test_facebook_images(card_count);
	bootstrap();
};
