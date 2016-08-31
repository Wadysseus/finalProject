angular.module('crAPI', ['ngRoute'])


	.config(function($routeProvider) {
	    $routeProvider.when( '/', {
	      templateUrl: '/partials/base.html'
	    });
	    $routeProvider.when( '/create', {
	      templateUrl: '/partials/createHome.html'
	    })
	    $routeProvider.when( '/createCharacter', {
	      templateUrl: '/partials/createCharacter.html'
	    })
	    $routeProvider.when( '/createCampaign', {
	      templateUrl: '/partials/createCampaign.html'
	    })
		$routeProvider.when( '/roster', {
	      templateUrl: '/partials/roster.html'
	    })
		$routeProvider.when( '/campaignList', {
	      templateUrl: '/partials/campaignList.html'
	    })
		$routeProvider.when( '/api/pcs/:id', {
	      templateUrl: '/partials/pcView.html'
	    })
	    $routeProvider.when( '/api/campaigns/:id', {
	      templateUrl: '/partials/campaignView.html'
	    })
	    // default route //
	    $routeProvider
	      .otherwise({
	        redirectTo: '/'
	      });
	      console.log('crAPI module loaded, human.')
	});