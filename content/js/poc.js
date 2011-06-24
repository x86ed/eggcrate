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

 $(document).ready(function(){
  $('body').prepend("<canvas style="position:absolute;top:0;left:0" id="canvas1" width="200" height="200"></canvas>")
function sketchProc(processing) {  
  // Override draw function, by default it will be called 60 times per second  
  processing.draw = function() {  
    // determine center and max clock arm length  
    var centerX = processing.width / 2, centerY = processing.height / 2;  
    var maxArmLength = Math.min(centerX, centerY);  
  
    function drawArm(position, lengthScale, weight) {        
      processing.strokeWeight(weight);  
      processing.line(centerX, centerY,   
        centerX + Math.sin(position * 2 * Math.PI) * lengthScale * maxArmLength,  
        centerY - Math.cos(position * 2 * Math.PI) * lengthScale * maxArmLength);  
    }  
  
    // erase background  
    processing.background(224);  
  
    var now = new Date();  
  
    // Moving hours arm by small increments  
    var hoursPosition = (now.getHours() % 12 + now.getMinutes() / 60) / 12;  
    drawArm(hoursPosition, 0.5, 5);  
  
    // Moving minutes arm by small increments  
    var minutesPosition = (now.getMinutes() + now.getSeconds() / 60) / 60;  
    drawArm(minutesPosition, 0.80, 3);  
  
    // Moving hour arm by second increments  
    var secondsPosition = now.getSeconds() / 60;  
    drawArm(secondsPosition, 0.90, 1);  
  };  
    
}  
  
var canvas = document.getElementById("canvas1");  
// attaching the sketchProc function to the canvas  
var p = new Processing(canvas, sketchProc);  
// p.exit(); to detach it 
});