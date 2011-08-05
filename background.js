var jquery_src_url = "http://code.jquery.com/jquery-1.6.2.min.js";
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.extension.onRequest.addListener(request_handler);

function request_handler(req, sender, send_response){
	console.log("request: " + req.func);
	//console.log(sender);
	if(req.func == "update_page_action"){
		console.log("update_page_action");
		show_jquery_page_action(sender.tab.id, true);
	}
}

function checkForValidUrl(tabId, changeInfo, tab){
	//console.log(changeInfo);
	if(changeInfo.status == "loading"){
		console.log("found updated tab");
		show_jquery_page_action(tabId, false);
	}
}

function show_jquery_page_action(tabId, enable){
	if(enable){
		chrome.pageAction.setIcon({
			"tabId": tabId,
			"path": "img/jquery16.png"
		});
		chrome.pageAction.setTitle({
			"tabId": tabId,
			"title": "jQuery loaded"
		});
		chrome.pageAction.onClicked.removeListener(inject_jquery);
	}else{
		chrome.pageAction.setIcon({
			"tabId": tabId,
			"path": "img/jquery16_disable.png"
		});
		chrome.pageAction.setTitle({
			"tabId": tabId,
			"title": "jQuery not loaded, click to inject"
		});
		if(! chrome.pageAction.onClicked.hasListener(inject_jquery)){
			chrome.pageAction.onClicked.addListener(inject_jquery);
		}
	}
	chrome.pageAction.show(tabId);
}

function inject_jquery(tab){
	console.log("inject jquery on tab: " + tab.id);
	var code = "var script = document.createElement('script');";
	code += "script.src = '"+jquery_src_url+"';";
	code += "script.type = 'text/javascript';";
	code += "document.head.appendChild(script);";
	chrome.tabs.executeScript(tab.id, {"code": code});
	console.log("after execute script");
	show_jquery_page_action(tab.id, true);
}

