
function Egg(id, name, source, method, service){
	this.id = id;
	this.name = name;
	this.source = source;
	this.method = method;
	this.service = service;
	this.items = {};
    this.getItems = function(bubbleCallback){
	
		var currentEgg = this;
	
		utility.getFeed(this.method, this.service, this.source, function(feedItems){
			alert(currentEgg.name);
			currentEgg.items = feedItems;
			if(bubbleCallback != undefined){
				console.log("bubbleCallback")
				bubbleCallback();
			}
		} );
	    return this;
	}
}
