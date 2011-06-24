var utility = function() {
	
	return{
		
		method : {
			oauth : "oauth",
			rss : "rss",
			scrape : "scrape"
		},
		
		ajax : function(ajaxRequest){
			
			callback = function(response){
				ajaxRequest.callback(response, ajaxRequest.method, ajaxRequest.func);
			};
			
			adaptor.ajaxRequest(ajaxRequest, callback);
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