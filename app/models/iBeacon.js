
exports.definition = {
	
	config: {
		columns: {
			id: "TEXT",
			identifier: "TEXT",
			uuid: "TEXT",
			major: "INTEGER",
			minor: "INTEGER",
			proximity: "TEXT"
		},
		defaults: {
		},
		adapter: {
			type: "sql",
			collection_name: "iBeacons"
		}
	},		

	extendModel: function(Model) {		
		_.extend(Model.prototype, {
			idAttribute: "id"
		}); // end extend
		
		return Model;
	},
	
	
    extendCollection: function(Collection) {        
        _.extend(Collection.prototype, {

        }); // end extend
 
        return Collection;
    }		
};

