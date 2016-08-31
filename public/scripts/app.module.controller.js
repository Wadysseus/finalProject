angular.module('crAPI')
	.controller('pcController', pcController)
	.controller('campaignController', campaignController)
	.controller('userController', userController);

pcController.$inject = ['apiFactory', '$location', '$routeParams'];
campaignController.$inject = ['apiFactory', '$location', '$routeParams'];
userController.$inject = ['apiFactory'];

// Start of pcController
	function pcController (apiFactory, $location, $routeParams) {
		// console.debug(arguments)

		var pcCtrl = this;
		console.log('pcController online, human.');

		pcCtrl.submitPC = () => {
			apiFactory
				.createPC(pcCtrl.newPC)
				.then(function(response){
					console.log(response);
					
				});
				$location.url("/roster.html");
		}

		pcCtrl.listPCs = () => {
			console.log("retrievin' PCs, boss!")
			apiFactory
				.retrievePCs()
				.then(function(response){
					console.log('listPCs response: ', response)
					pcCtrl.pcList = response.data;

				});
		}

		pcCtrl.params = $routeParams;

		pcCtrl.pullOnePC = (id) => {
			console.log("Searching taverns for that one special PC...", id)
			apiFactory
				.retrieveOnePC(id)
				.then(function(response){
					pcCtrl.currentPC = response.data;
				});
		}

		pcCtrl.fakePullPC = () => {
			new apiFactory.samplePC()
			pcCtrl.currentPC = apiFactory.sampleData[0];
		}

		pcCtrl.itemToAdd = '';



		pcCtrl.reallyAddItem = (id, itemToAdd) => {
			console.log('reallyAddItem _id: ', id)
			console.log('reallyAddItem item: ', itemToAdd)
			apiFactory.addToInventory(id, itemToAdd)
				.then(function(res){

						console.log('res: ', res)

				})


			// console.log(itemToAdd)
			// pcCtrl.addItem(itemToAdd)
			// 	.then(apiFactory.addToInventory(itemToAdd))
		}

		// pcCtrl.addItem = (itemToAdd) => {
		// 	console.log('itemToAdd: ', itemToAdd)
		// 	pcCtrl.currentPC.inventory.push(itemToAdd)
		// }
}		
// End of pcController 

// Start of campaignController
	function campaignController (apiFactory, $location, $routeParams) {
		var cCtrl = this;
		console.log('campaignController online, human.');
		// console.debug(arguments)

		cCtrl.submitCampaign = () => {
			apiFactory
				.createCampaign(cCtrl.newCampaign)
				.then(function(response){
					console.log(response);
					
				});
				$location.url("/campaignList.html");
		}

		cCtrl.listCampaigns = () => {
			console.log("retrievin' campaigns, boss!")
			apiFactory
				.retrieveCampaigns()
				.then(function(response){
					console.log('listCampaigns response: ', response)
					cCtrl.campaignList = response.data;

				});
		}

		cCtrl.params = $routeParams;

		cCtrl.pullOneCampaign = (id) => {
			console.log("Scouring mindscapes for campaign: ", id)
			apiFactory
				.retrieveOneCampaign(id)
				.then(function(response){
					cCtrl.currentCampaign = response.data;
				});
		}

		}
// End of campaignController

// Start of userController
	function userController (apiFactory) {
		var uCtrl = this;
		console.log('userController online, human.');

		uCtrl.pullUser = () => {
			console.log("retrievin' User, boss!")
			apiFactory
				.retrieveUser()
				.then(function(response){
					console.log('pullUser response: ', response)
					uCtrl.currentUser = response.data;
				});
		}
		uCtrl.pullUser()



	}
// End of campaignController
