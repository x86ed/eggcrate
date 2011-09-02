function DbAdaptor(){	
	this.db = {}//adaptor.getDatabaseConnection();
}

DbAdaptor.prototype.open = function(){
	
	var dbAdaptor = this; 
	
	switch(adaptor.getBrowser()){
		case adaptor.browserType.firefox:				
			file = Components.classes["@mozilla.org/file/directory_service;1"]
						.getService(Components.interfaces.nsIProperties)
						.get("ProfD", Components.interfaces.nsIFile);
			
			file.append("storage.sqlite");
						
			storageService = Components.classes["@mozilla.org/storage/service;1"]
						.getService(Components.interfaces.mozIStorageService);
			
			dbAdaptor.db = storageService.openDatabase(file);
			break;
			
		case adaptor.browserType.chrome:
			databaseOptions = {
								fileName: "storage.sqlite",
								version: "1.0",
								displayName: "Eggcrate Database",
								maxSize: 1024
								};
			
			dbAdaptor.db = openDatabase(
								databaseOptions.fileName,
								databaseOptions.version,
								databaseOptions.displayName,
								databaseOptions.maxSize
								);
	}

}

DbAdaptor.prototype.executeSql = function(sql, parameters, bubbleCallback){
	
	this.open();
	
	var db = this.db;
	
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
