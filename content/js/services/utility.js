var utility = function() {
	
	return{
		
		method : {
			oauth : "oauth",
			rss : "rss",
			scrape : "scrape"
		},
		
		ajax : function(ajaxRequest){
			console.log("ajax");
			console.log(ajaxRequest);
			
			callback = function(response){
				console.log("callback");
				ajaxRequest.callback(response, ajaxRequest.method, ajaxRequest.func);
			};
			
			if(adaptor.getBrowser() == adaptor.browserType.chrome){
				console.log("ajax - chrome");
				request = {
						"action" : "ajax",
						"ajaxRequest" : ajaxRequest
				};				
				
				chrome.extension.sendRequest(request, callback);
			}else{
				utility.ajaxSend(ajaxRequest, callback);
			}
		},
		
		ajaxSend : function(ajaxRequest, callback){
			console.log("ajax - actual call");
			console.log(ajaxRequest);
			var httpObject = new XMLHttpRequest();
			
			if (httpObject != null) {
				httpObject.onreadystatechange = function(){
					if (httpObject.readyState==4 && httpObject.status==200){
						callback(httpObject.responseText);
					}
				}
				httpObject.open("GET", ajaxRequest.url, true);
				httpObject.send(null);
			}
		}
	}
}();