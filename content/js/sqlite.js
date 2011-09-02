var sqlite = function(){
	return{
		
		insertEgg : function(name, source, method, service, callback){
			dbConn = new DbAdaptor();
			insert = "INSERT INTO Egg (name, source, method, service, items) VALUES (?, ?, ?, ?, ?)";
			parameters = {	name : name,
							source : source,
							method : method,
							service : service,
							items : "{}"
						};
			dbConn.executeSql(insert, parameters, callback);
		},
		
		initDatabase : function(bubbleCallback){
			dbConn = new DbAdaptor();
			
			create = "CREATE TABLE IF NOT EXISTS Egg (id integer PRIMARY KEY, name TEXT, source TEXT, method TEXT, service TEXT, items TEXT);";
			
			dbConn.executeSql(create, null, function(){
				sqlite.clean(bubbleCallback);
			});
		},
		
		clean : function(callback){
			dbConn = new DbAdaptor();
			sql = "DELETE FROM Egg";
			dbConn.executeSql(sql, null, callback);			
		},
		
		getBasket : function (bubbleCallback){
		
			dbConn = new DbAdaptor();
			
			basket = [];
			
			sql = "SELECT * FROM Egg;";
			
			callback = function(result){
				
				switch(adaptor.getBrowser()){
					case adaptor.browserType.firefox:
						for (row = result.getNextRow(); row; row = result.getNextRow()) {
					    	basket.push(new Egg(
					    			row.getResultByName("id"), 
					    			row.getResultByName("name"), 
					    			row.getResultByName("source"), 
					    			row.getResultByName("method"), 
					    			row.getResultByName("service")
				    			));
					    	
					    }
						break;
					
					case adaptor.browserType.chrome:
						$.each(
								result.rows,
								function( rowIndex ){
									var row = result.rows.item( rowIndex );
									basket.push(new Egg(
							    			row.id, 
							    			row.name, 
							    			row.source, 
							    			row.method, 
							    			row.service
						    			));
								}
						);
						break;
				}
				
				if(bubbleCallback != null && bubbleCallback != undefined){
					bubbleCallback(basket);
				}
					
				else
					alert("no bubble callback for getItems")
			};
			
			dbConn.executeSql(sql, null, callback);			
		}		
	}
}();
