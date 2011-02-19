function flashModule(module_id, color){

	var highlight = $("#module" + module_id + " .highlight");

	highlight.css({ backgroundColor: color, opacity: 0 });

	flashElement(highlight, 3, 0, 800);

}



function flashElement(element, repeat, count, duration){

	element.animate( { opacity: 0.6 }, duration / 2, function(){

		element.animate( { opacity: 0 }, duration / 2, function(){

			count++;

			if(count < repeat) flashElement(element, repeat, count, duration);

		});		

	});

}
