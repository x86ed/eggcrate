function Egg(name, source, method, service){
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
		if(bubbleCallback != undefined)
			baseCallback();
	}

	utility.getFeed(this.method, this.service, this.source, callback);	
}


