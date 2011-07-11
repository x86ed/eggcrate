function DbAdaptor(){	
	this.db = adaptor.getDatabaseConnection();
}

DbAdaptor.prototype.executeSql = function(sql, parameters, bubbleCallback){

	var db = adaptor.getDatabaseConnection();//this.db;
	
	callback = function(result){
		if(bubbleCallback != null && bubbleCallback != undefined){	
			bubbleCallback(result);
		}
	};
	
	switch(adaptor.getBrowser()){
		case adaptor.browserType.firefox:			
			if(parameters != null){				
				for(var i in parameters){
					sql = sql.replace("?", ":" + i);
				}
				
				statement = db.createStatement(sql);				
				
				for(var i in parameters){
					statement.params[i] = parameters[i];
				}	
				
			} else {
				statement = db.createStatement(sql);
			}

			statement.executeAsync({
				handleResult: function(result) {
					if(sql.toLowerCase().indexOf("select") != -1){
						callback(result);
					}
				},

				handleError: function(aError) {
					alert("error");
					alert(aError);
				},

				handleCompletion: function(aReason) {
					if(sql.toLowerCase().indexOf("select") == -1){
						callback();
					}
						
					if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED){
				    	
					}else{
				    	
					}
				}
			});			
			break;
			
		case adaptor.browserType.chrome:			
			db.transaction(
					function( transaction ){
						params = null;
						if(parameters != null){
							params = [];
							for(var i in parameters){
								params.push(parameters[i]);					
							}
						}

						transaction.executeSql(sql, params, function( transaction, results ){
							callback( results );
						});					 
					}
				);
			break;
	}	
}
