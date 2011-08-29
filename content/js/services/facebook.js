var facebook = function() {
	
	return{
		
		parseOauth : function(response){
			return "parsed oauth";
		},
		
		parseScrape : function(response){
			return "parsed scrape";
		},
		
		assembleURL : function(method, source){
			switch(method){
				case utility.method.scrape:
				case utility.method.rss:
					return source;
				case utility.method.oauth:
					return null;
			}
		},
		
		parseResponse : function(response, method){
			switch(method){
				case utility.method.rss:
					return utility.parseRss(response);
				case utility.method.scrape:
					return facebook.parseScrape(response);
				case utility.method.oauth:
					return facebook.parseOauth(response);
			}
		}
	}
}();