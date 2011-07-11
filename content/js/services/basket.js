function Basket(){
	this.eggs = [];
}

Basket.prototype.getEggs = function(bubbleCallback){
	currentBasket = this;
	
	sqlite.getBasket(function(eggs){
		
		currentBasket.eggs = eggs;
		
		if(bubbleCallback != undefined){
			bubbleCallback(eggs);
		}
	});	
}


