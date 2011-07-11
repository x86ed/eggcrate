function Egg(id, name, source, method, service){
	this.id = id;
	this.name = name;
	this.source = source;
	this.method = method;
	this.service = service;
	this.items = {};
}

Egg.prototype.getItems = function(bubbleCallback){
	
	currentEgg = this;
	
	callback = function(feedItems){
		currentEgg.items = feedItems;
		if(bubbleCallback != undefined){
			alert("bubbleCallback")
			bubbleCallback();
		}
	}

	utility.getFeed(this.method, this.service, this.source, callback);	
}


