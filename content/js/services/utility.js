var utility = function() {
	
	return{
		
		method : {
			oauth : "oauth",
			rss : "rss",
			scrape : "scrape"
		},
		
		service : {
			facebook : "faecbook",
			twitter : "twitter",
			other : "other"
		},
		
		assembleURL : function(method, service, source){
			
			switch(service){
				case utility.service.facebook:
					return facebook.assembleURL(method, source);					
				
				case utility.service.twitter:
					return twitter.assembleURL(method, source);
				
				case utility.service.other:
					return method == utility.method.rss ? source : null;
			}
			
		},
		
		getFeed : function(method, service, source, func){
			console.log("get feed");
			
			url = utility.assembleURL(method, service, source);
			
			if(url == null) return;
			
			request = {
					url : url,
					method : method,
					source : source
			};
			
			callback = function(response){
				
				utility.getFeedComplete(response, service, method, func);
			};
			
			adaptor.ajaxRequest(request, callback);
		},
		
		getFeedComplete : function(response, service, method, func){
			console.log("get feed complete");
			switch(service){
				case utility.service.facebook:
					feedItems = facebook.parseResponse(response, method);
					break;					
				
				case utility.service.twitter:
					feedItems = twitter.parseResponse(response, method);
					break;	
				
				case utility.service.other:
					feedItems = utility.parseRss(response);
					break;
			}
			
			func(feedItems);
		},
		
		ajax : function(ajaxRequest, callback){
			console.log("ajax - actual call");
			console.log(ajaxRequest);
			var httpObject = new XMLHttpRequest();
			
			if (httpObject != null) {
				httpObject.onreadystatechange = function(){
					if (httpObject.readyState==4 && httpObject.status==200){
						console.log(httpObject);
						callback(httpObject.responseText);						
					}
				}
				httpObject.open("GET", ajaxRequest.url, true);
				httpObject.send(null);
			}
		},
		
		parseRss : function(response){
			
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(response,"text/xml");
			
			feed = {};
			
			// if data is valid
			if (response.indexOf('invalid') == -1) 
			{ 	
				channel = xmlDoc.getElementsByTagName('channel').item(0);
				feed.title = channel.getElementsByTagName('title').item(0).firstChild.data;
				feed.link = channel.getElementsByTagName('link').item(0).firstChild.data;
				feed.items = [];
			
				// Browse items
				items = channel.getElementsByTagName('item');
				
				for(var i in items){					
					if(typeof(items[i]) == "object"){
						var item = {
								title : items[i].getElementsByTagName("title").item(0).firstChild.data,
								link : items[i].getElementsByTagName("link").item(0).firstChild.data,
								pubDate : items[i].getElementsByTagName("pubDate").item(0).firstChild.data
							};
						
						feed.items.push(item);
					}
				}				
			}
			
			return feed;
		}
	}
}();