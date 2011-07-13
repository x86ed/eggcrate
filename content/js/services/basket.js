// Array Remove - By John Resig (MIT Licensed)
//Array.prototype.remove = function(from, to) {
//  var rest = this.slice((to || from) + 1 || this.length);
//  this.length = from < 0 ? this.length + from : from;
//  return this.push.apply(this, rest);
//};
//
//Array.prototype.exists = function(item){
//	var arr = this
//	for(var i in arr)
//		if(arr[i] == item)
//			return true;
//	
//	return false;
//}

function Basket(){
	this.eggs = [];
}

Basket.prototype.fillEggs = function(){
	var currentBasket = this;
	for(var i in currentBasket.eggs){
		if(currentBasket.eggs[i])
			currentBasket.eggs[i].getItems();
	}
}

Basket.prototype.getEggs = function(bubbleCallback){
	
	console.log("get eggs")
	
	var currentBasket = this;
	
	sqlite.getBasket(function(eggs){
		
		console.log(eggs)
		
//		for(var i in eggs){
//			if(!currentBasket.eggs.exists(eggs[i])){
//				currentBasket.eggs.push(eggs[i])
//				console.log("added")
//				console.log(eggs[i])
//			}
//		}
//		for(var i in currentBasket.eggs){
//			if(eggs.exists(currentBasket.eggs[i])){
//				currentBasket.eggs.remove(i)
//				console.log("removed")
//				console.log(eggs[i])
//			}
//		}
		currentBasket.eggs = eggs;
		
		if(bubbleCallback != undefined){
			bubbleCallback(eggs);
		}
	});	
}






