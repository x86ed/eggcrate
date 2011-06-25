var poc = function () {	
	
	return {
		
		init : function(){
			adaptor.initjQuery();
			poc.run();
		},
					
		run : function () {
			var DOM = adaptor.getDOM();
			alert("running");			
			poc.clock();
			var head = DOM.getElementsByTagName("head")[0],
				style = DOM.getElementById("link-target-finder-style"),
				allLinks = DOM.getElementsByTagName("a"),
				foundLinks = 0;
			
			if(adaptor.getBrowser() == adaptor.browserType.firefox)
				if (!style) {
					style = DOM.createElement("link");
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
			facebook.getFeed(utility.method.rss, "http://google.com", poc.callback);
		},
		
		callback : function(msg){
			alert(msg);
		},
		
		clock : function(){
			alert("i piss rainbows")
			
			alert($('body'));
			
			$('body').prepend('<canvas style="position:absolute;top:0;left:0" id="canvas1" width="200" height="200"></canvas>')
			
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
			//var canvas = $("#canvas1");  
			// attaching the sketchProc function to the canvas  
			var p = new Processing(canvas, sketchProc);  
			  //p.exit(); to detach it 
			$('body').click(function(){
			  $("#canvas1").animate({ left: '+=' + (10 * Math.random()), top: '+='+ (10 * Math.random())},5000);
			});
		}
	};
}();

adaptor.init(poc.init);

