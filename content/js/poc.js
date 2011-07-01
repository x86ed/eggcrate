var poc = function () {	
	
	return {
		
		init : function(doc){
			adaptor.initjQuery();
			poc.addFeedContainer(doc);
			poc.run(doc);
		},
					
		run : function (doc) {			
			var DOM = doc == undefined ? adaptor.getDOM() : doc;
			poc.clock(DOM);
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
			
			basket = [new Egg("reddit", "http://www.reddit.com/.rss", utility.method.rss, utility.service.other),
			          new Egg("tosh.0", "http://www.facebook.com/feeds/page.php?id=100834231907&format=rss20", utility.method.rss, utility.service.facebook),
			          new Egg("gizmodo", "http://feeds.gawker.com/gizmodo/full", utility.method.rss, utility.service.other)];
			
			console.log(basket);
			
			index = 0;
			setInterval(function(){

				console.log(basket[index].name);

				basket[index].getItems(function(){
					poc.setFeedContainerContent(basket[index])
				});
				
				index += 1;
				
				if(index >= basket.length)
					index = 0;				
			}, 10000);
			
			
			setInterval(poc.randomColor, 500);
		},
		
		callback : function(msg){
			DOM = adaptor.getDOM();
			eggcrate = $('#eggcrate', DOM);
			eggcrate.html(JSON.stringify(msg));
		},
		
		setFeedContainerContent : function(egg){
			console.log(JSON.stringify(egg));
			DOM = adaptor.getDOM();
			eggcrate = $('#eggcrate', DOM);
			eggcrate.html(egg.name + "<br/>" + JSON.stringify(egg.items));
		},
		
		addFeedContainer : function(DOM){
			body = $('body', DOM);
			body.append( ' <div id="eggcrate"></div> ' );
		},
		
		randomColor : function(){
			DOM = adaptor.getDOM();
			eggcrate = $('#eggcrate', DOM);
			eggcrate.css("background", "#" + Math.round(0xffffff * Math.random()).toString(16));
		},
		
		clock : function(DOM){
			body = $('body', DOM);
			
			return;
			
			body.prepend('<canvas style="position:absolute;top:0;left:0" id="canvas1" width="200" height="200"></canvas>')
			
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

