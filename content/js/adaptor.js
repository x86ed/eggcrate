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
			dom = null;
			
			switch(adaptor.getBrowser()){
				case adaptor.browserType.chrome:
					dom = document;
					break;
				case adaptor.browserType.firefox:
					if(content != null)
						dom = content.document;
					break;
			}
			return dom;
		},
		
		init : function(func){
			switch(adaptor.getBrowser()){
			case adaptor.browserType.chrome:
				window.addEventListener(adaptor.DOMEvent("load"), func, false);
				break;
			case adaptor.browserType.firefox:
				window.addEventListener("load", function(){
					if(gBrowser) 
						gBrowser.addEventListener("DOMContentLoaded", func, false);
				}, false);
				break;
			}
		},
		
		DOMEvent : function(event){ 
				
			if(adaptor.getBrowser() == adaptor.browserType.firefox)
				switch(event){
					case "load":
						event = "DOMContentLoaded";
						break;
				}
			
			return event;
		},
		
		ajaxRequest : function(ajaxRequest, callback){
			switch(adaptor.getBrowser()){
				case adaptor.browserType.chrome:
					request = {
						"action" : "ajax",
						"ajaxRequest" : ajaxRequest
					};								
					chrome.extension.sendRequest(request, callback);
					break;
					
				default:
					utility.ajaxSend(ajaxRequest, callback);
					break;			
			}			
		},
		loadjQuery : function(context){
			var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
			loader.loadSubScript("chrome://eggcrate/content/js/jquery-1.6.1.min.js",context);
			var jQuery = window.jQuery.noConflict(true);
    			if( typeof(jQuery.fn._init) == 'undefined') { jQuery.fn._init = jQuery.fn.init; }
			adaptor.jQuery = jQuery;
		}		

	}	
}();
