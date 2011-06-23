var poc = function () {
	//var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);	
	
	return {
		
		browserType : {
			chrome : "chrome",
			firefox : "firefox"
		},
		
		getBrowser : function(){
			return navigator.userAgent.indexOf("Firefox") != -1 ? poc.browserType.firefox : poc.browserType.chrome;
		},
		
		getDOM : function(){
			
			switch(poc.getBrowser()){
				case poc.browserType.chrome:
					dom = document;
					break;
				case poc.browserType.firefox:
					dom = content.document;
					break;
			}
			return dom;
		},
		
		DOMEvent : function(event){ 
				
			if(poc.getBrowser() == poc.browserType.firefox)
				switch(event){
					case "load":
						event = "DOMContentLoaded";
						break;
				}
			
			return event;
		},
			
		run : function () {
			var head = poc.getDOM().getElementsByTagName("head")[0],
				style = poc.getDOM().getElementById("link-target-finder-style"),
				allLinks = poc.getDOM().getElementsByTagName("a"),
				foundLinks = 0;
			
			if (!style) {
				style = poc.getDOM().createElement("link");
				style.id = "link-target-finder-style";
				style.type = "text/css";
				style.rel = "stylesheet";
				style.href = "chrome://eggcrate/skin/skin.css";
				head.appendChild(style);
			}	
						
			for (var i=0, il=allLinks.length; i<il; i++) {
				elm = allLinks[i];
				if (elm.getAttribute("target")) {
					elm.className += ((elm.className.length > 0)? " " : "") + "link-target-finder-selected";
					foundLinks++;
				}
			}
			if (foundLinks === 0) {
				alert("No links found with a target attribute");
			}
			else {
				alert("Found " + foundLinks + " links with a target attribute");
			}	
		}
	};
}();
//window.addEventListener(poc.DOMEvent("load"), poc.run, false);

