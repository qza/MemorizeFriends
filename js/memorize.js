/* number of opened cards*/	
var count = 0;

var pick1 = null;
var pick2 = null;

$(function(){
    bootstrap(); 
});

bootstrap = function(){
	$('.hover_action').click(function(){				
		if(this.getAttribute('click')!= null) return false;
		if(count < 2 ) {
                        var my_id = $(this).attr("id");
                        var qm_id = "qm_" + my_id;
			var tmp = $('#'+qm_id);		
			tmp.animate({left:'60px'},{queue:false,duration:300});
			this.setAttribute('click','click');
			if(count ==1){
				pick2 = this;
				if(pickMatch(pick1, pick2)==true) {
					count = 0;
					setTimeout(function(){alert('You made a match!');},300);
					return;
				} else {
					setTimeout(closing,2000);
				}
			} else {
				pick1 = this;
			}
			count = count + 1;
		}
		return false;
	});
};	

pickMatch=function(pick1,pick2){
	var p1 = $(pick1).find('img')[0].getAttribute('src');
	var p2 = $(pick2).find('img')[0].getAttribute('src');
	return p1 == p2;
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

button_clicked = function(){
	$("#card_container").html("");
	level_str = $("#level_select option:selected").val();
	level = parseInt(level_str);  
	build_board(level);
	test_facebook_images(card_count);
	bootstrap();
};
