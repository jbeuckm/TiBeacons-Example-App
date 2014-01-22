
exports.definition = {
	
	config: {
		columns: {
			id: "TEXT",
			identifier: "TEXT",
			proximity: "TEXT"
		},
		defaults: {
		},
		adapter: {
			type: "properties",
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

