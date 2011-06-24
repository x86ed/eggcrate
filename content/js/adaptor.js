var adaptor = function () {
	
	return {
		browserType : {
			chrome : "Chrome",
			firefox : "Firefox"
		},
		
		getBrowser : function(){
			if(navigator.userAgent.indexOf(adaptor.browserType.firefox) != -1)
				return adaptor.browserType.firefox;
			
			if(navigator.userAgent.indexOf(adaptor.browserType.chrome) != -1)
				return adaptor.browserType.chrome;
		},
		
		getDOM : function(){
			
			switch(adaptor.getBrowser()){
				case adaptor.browserType.chrome:
					dom = document;
					break;
				case adaptor.browserType.firefox:
					dom = content.document;
					break;
			}
			return dom;
		},
		
		DOMEvent : function(event){ 
				
			if(adaptor.getBrowser() == adaptor.browserType.firefox)
				switch(event){
					case "load":
						event = "DOMContentLoaded";
						break;
				}
			
			return event;
		}
	}	
}();