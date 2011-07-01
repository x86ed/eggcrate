function Egg(name, source, method, service){
	this.name = name;
	this.source = source;
	this.method = method;
	this.service = service;
	this.items = {};
}

Egg.prototype.getItems = function(func){
	currentEgg = this;
	
	callback = function(feedItems){
		currentEgg.items = feedItems;
		func();
	}

	utility.getFeed(this.method, this.service, this.source, callback);	
}


