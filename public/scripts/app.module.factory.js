angular.module('crAPI')
	.factory('apiFactory', [
		'$http',
		apiFactory]);

	function apiFactory ($http) {

	    function retrievePCs () {
	    	// console.log('factory retrievePCs function online')
	        return $http.get('/api/pcs')
	    }
	    function createPC (pcData) {
	        return $http.post('/api/pcs', pcData)
	    }

	    function retrieveOnePC (id) {
			console.log('id: ', id);
            return $http.get('/api/pcs/' + id);
        }

        function addToInventory (id, itemToAdd){
        	console.log('Factory PC-id: ', id);
        	console.log('Factory item: ', itemToAdd);
        	return $http.post('/api/pcs/' + id, {item : itemToAdd})
        }

	    function retrieveCampaigns (){
	        return $http.get('/api/campaigns')
	    }

	    function retrieveOneCampaign (id) {
			console.log('id: ', id);
            return $http.get('/api/campaigns/' + id);
        }

	    function createCampaign (campaignData){
	        return $http.post('/api/campaigns', campaignData)
	    }

	    function retrieveUser (){
	    	return $http.get('/api/user')
	    }

	    var sampleData = [];

	    function samplePC () {
	    	console.info('samplePC ready to go')
	    	var sPC = this;

	    	this.name 			= 'Raphael';
	    	this.race 			= 'half-shmelven';
	    	this.characterClass = 'Sitari warrior';
    		this.level	 		= 12;
    		// this.campaign 		= {"type" : mongoose.Schema.ObjectID, "ref" : 'campaign'};
    		this.inventory		= ["Potion of Gorgon Smelting", "Wooden Pickle", "Tenser's Censer of Sensors"];       
		    this.hitPoints      = 56;
		    this.tempHitPoints  = 0;
    		// this.player			= {"type" : mongoose.Schema.ObjectID, "ref" : 'user'}; 
    		sampleData.push(this);
	    }

	    // This return value is exactly what we gain access to in the controller
	    return {
	        retrievePCs 		: retrievePCs,
	        createPC			: createPC,
	        retrieveOnePC		: retrieveOnePC,
	        addToInventory		: addToInventory,
	        retrieveCampaigns   : retrieveCampaigns,
	        retrieveOneCampaign : retrieveOneCampaign,
	        createCampaign  	: createCampaign,
	        retrieveUser 		: retrieveUser,
	        samplePC			: samplePC,
	        sampleData			: sampleData,

	    }

	}

