var facebook = function() {
	
	return{
		
		getFeed : function(method, url, callback){
			utility.ajax(url, method, callback, facebook.getFeedComplete);
		},
		
		getFeedComplete : function(response, method, callback){
			alert("feed complete");
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