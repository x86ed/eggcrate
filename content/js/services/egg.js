
function Egg(id, name, source, method, service){
	this.id = id;
	this.name = name;
	this.source = source;
	this.method = method;
	this.service = service;
	this.items = {};
    this.getItems = function(bubbleCallback){
	
	currentEgg = this;
    console.log("current egg")
    console.log(currentEgg)

	utility.getFeed(currentEgg.method, currentEgg.service, currentEgg.source,function(feedItems){
		currentEgg.items = feedItems;
		if(bubbleCallback != undefined){
			console.log("bubbleCallback")
			bubbleCallback();
		}
	} );
    return this;
}
}
