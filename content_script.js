$(init);

function init(){
	console.log("jquery injector init");
	var jquery_script_count = 0;
	$("head script").each(function(){
		var src = $(this).attr("src");
		if(src && src.match(/jquery/)){
			console.log("src: " + src);
			jquery_script_count++;
		}
	});
	if(jquery_script_count > 0){
		console.log("jQuery already loaded");
		chrome.extension.sendRequest({'func': 'update_page_action'});
	}else{
		console.log("jQuery not loaded");
	}
}

