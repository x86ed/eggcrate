var utility = function() {
	
	return{
		
		method : {
			oauth : "oauth",
			rss : "rss",
			scrape : "scrape"
		},
		
		ajax : function(url, method, func, callback){
			var httpObject = new XMLHttpRequest();
			
			if (httpObject != null) {
				httpObject.onreadystatechange = function(){
						if (httpObject.readyState==4 && httpObject.status==200){							
							callback(httpObject.responseText, method, func);							
						}
					}
				httpObject.open("GET", url, true);
				httpObject.send(null);
			}
		}
	}
}();