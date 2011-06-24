var facebook = function() {
	
	return{
		
		getFeed : function(method, url, callback){
			console.log("get feed");
			
			request = {
					url : url,
					method : method,
					func : callback,
					callback : facebook.getFeedComplete
			};
			
			utility.ajax(request);
		},
		
		getFeedComplete : function(response, method, callback){
			console.log("get feed complete");
			switch(method){
				case utility.method.oauth:
					feedItems = facebook.parseOauth(response);
					break;
				case utility.method.rss:
					feedItems = facebook.parseRss(response);
					break;
				case utility.method.scrape:
					feedItems = facebook.parseScrape(response);
					break;				
			}
			
			callback(feedItems);
		},
		
		parseOauth : function(response){
			return "parsed oauth";
		},
		
		parseRss : function(response){
			return "parsed rss";
		},
		
		parseScrape : function(response){
			return "parsed scrape";
		}
	}
}();