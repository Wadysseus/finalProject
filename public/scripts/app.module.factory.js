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

	    // function retrieveOnePC (query) {
	    // 	console.log('retrieveOnePC: ', query);
     //        return $http.get('/api/pcs/' + query);
     //    }

	    function retrieveOnePC (id) {
			console.log('id: ', id);
            return $http.get('/api/pcs/' + id);
        }

        function addToInventory (itemData){
        	return $http.post('/api/pcs', itemData)
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
	        retrieveCampaigns   : retrieveCampaigns,
	        retrieveOneCampaign : retrieveOneCampaign,
	        createCampaign  	: createCampaign,
	        retrieveUser 		: retrieveUser,
	        samplePC			: samplePC,
	        sampleData			: sampleData,

	    }

	}

