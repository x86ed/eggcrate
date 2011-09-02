var poc = function () {	
	
	return {
		
//		basket : [new Egg("reddit", "http://www.reddit.com/.rss", utility.method.rss, utility.service.other),
//		          new Egg("tosh.0", "http://www.facebook.com/feeds/page.php?id=100834231907&format=rss20", utility.method.rss, utility.service.facebook),
//		          new Egg("gizmodo", "http://feeds.gawker.com/gizmodo/full", utility.method.rss, utility.service.other)],
//		
		basket : new Basket(),
		
		init : function(doc){			
			adaptor.initjQuery();
			sqlite.initDatabase(function(){
				poc.addFeedContainer(doc);
				sqlite.insertEgg("Tosh.0", 
			              "http://www.facebook.com/feeds/page.php?id=100834231907&format=rss20",
			              utility.method.rss,
			              utility.service.facebook);
				poc.run(doc);
			});			
		},
					
		run : function (doc) {		
			
			
			
			var DOM = doc == undefined ? adaptor.getDOM() : doc;
			poc.clock(DOM);
			
			if(adaptor.getBrowser() == adaptor.browserType.firefox){
				head = DOM.getElementsByTagName("head")[0];
				style = DOM.getElementById("eggcrate-style");
				if (!style) {
					style = DOM.createElement("link");
					style.id = "eggcrate-style";
					style.type = "text/css";
					style.rel = "stylesheet";
					style.href = "chrome://eggcrate/skin/skin.css";
					head.appendChild(style);
				}				
			}			
			
			getBasketComplete = false;
			
//			sqlite.getBasket(function(result){
//				if(!getBasketComplete){
//					getBasketComplete = true;
//					console.log("callback from poc call to getBasket")
//					poc.basket = result;
//					if(poc.basket.length > 0){
//						poc.fillEggs();
//						poc.showEggs();
//					}
//				}
//			});
			
			poc.basket.getEggs(function(){
				//console.log("poc basket get eggs")
			});
			
			poc.fillEggs();
			poc.showEggs();
			
			setInterval(poc.randomColor, 500);
		},
		
		fillEggs : function(){
			//console.log("fill eggs")
			index = 0;
			setInterval(function(){		
				poc.basket.fillEggs();
				
			}, 5000);
		},
		
		showEggs : function(){
			//console.log("show eggs")
			index = 0;
			setInterval(function(){
				if(!poc.basket.eggs[index])
					index = 0
				
				if(poc.basket.eggs[index])
					poc.setFeedContainerContent(poc.basket.eggs[index]);
				
				index += 1;
				
			}, 5000);			
		},
		
		setFeedContainerContent : function(egg){
			DOM = adaptor.getDOM();
			eggcrate = $('#eggcrate', DOM);
			eggcrate.html(egg.name + "<br/>" + JSON.stringify(egg.items));
		},
		
		addFeedContainer : function(DOM){
			DOM = adaptor.getDOM();
			body = $('body', DOM);
			body.append( ' <div id="eggcrate"></div> ' );
		},
		
		randomColor : function(){
			DOM = adaptor.getDOM();
			eggcrate = $('#eggcrate', DOM);
			eggcrate.css("background", "#" + Math.round(0xffffff * Math.random()).toString(16));
		},
		
		clock : function(DOM){
            body = document.getElementsByTagName('body')[0];
			//body = $('body', DOM);
			
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
			var canvas = DOM.getElementById("canvas1");
			//var canvas = $("#canvas1");  
			// attaching the sketchProc function to the canvas  
			var p = new Processing(canvas, sketchProc, adaptor.getDOM());  
			  //p.exit(); to detach it 
			
			DOM = adaptor.getDOM();
			
			$('body', DOM).click(function(){
				
				alert("body click");
				
			  $("#canvas1", DOM).animate({ left: '+=' + (10 * Math.random()), top: '+='+ (10 * Math.random())},5000, function (){alert("11");});
			});
		}
	};
}();

adaptor.init(poc.init);

