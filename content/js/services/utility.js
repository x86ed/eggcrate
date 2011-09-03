var utility = function() {
	
	return{
		
		method : {
			oauth : "oauth",
			rss : "rss",
			scrape : "scrape"
		},
		
		service : {
			facebook : "Facebook",
			twitter : "Twitter",
			other : "Other"
		},
		
		assembleURL : function(method, service, source){
			
			switch(service){
				case utility.service.facebook:
					return facebook.assembleURL(method, source);					
				
				case utility.service.twitter:
					return twitter.assembleURL(method, source);
				
				case utility.service.other:
					return method == utility.method.rss ? source : null;
				default:
					return null;
			}
			
		},
		
		getFeed : function(method, service, source, bubbleCallback){
			url = utility.assembleURL(method, service, source);
			if(url == null) return;
			
			request = {
					url : url,
					method : method,
					source : source
			};
			
			adaptor.ajaxRequest(request, function(httpResponse){
				utility.getFeedComplete(httpResponse, service, method, bubbleCallback);
			});
		},
		
		getFeedComplete : function(httpResponse, service, method, callback){
			switch(service){
				case utility.service.facebook:
					feedItems = facebook.parseResponse(httpResponse, method);
					break;					
				
				case utility.service.twitter:
					feedItems = twitter.parseResponse(httpResponse, method);
					break;	
				
				case utility.service.other:
					feedItems = utility.parseRss(httpResponse);
					break;
				default:
					alert("service not found");
			}
			callback(feedItems);
		},
		
		ajax : function(ajaxRequest, callback){
			var httpObject = new XMLHttpRequest();
			
			if (httpObject != null) {
				httpObject.onreadystatechange = function(){
					if (httpObject.readyState==4 && httpObject.status==200){
						console.log(httpObject.responseText)
						callback(httpObject.responseText);						
					}
				}
				httpObject.open("GET", ajaxRequest.url, true);
				httpObject.send(null);
			}
		},
		
		parseRss : function(httpResponse){			
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(httpResponse,"text/xml");
			
			feed = {};			
 	
			channel = xmlDoc.getElementsByTagName('channel').item(0);
			feed.title = channel.getElementsByTagName('title').item(0).firstChild.data;
			feed.link = channel.getElementsByTagName('link').item(0).firstChild.data;
			feed.items = [];
		
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
			
			return feed;
		}
	}
}();