var utApp = angular.module("ut");

utApp.run(["$rootScope", "$location", function ($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function (event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });

  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'landing' && $rootScope.currentUser) {
        $location.path("/dashboard");
      }
    })
}]);

utApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'client/landing/views/landing.ng.html',
        controller: 'LandingController'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'client/dashboard/views/dashboard.ng.html',
        controller: 'DashboardController as dashboard'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'client/about/views/about.ng.html'
      })
      .state('budget', {
        url: '/budget',
        templateUrl: 'client/budget/views/budget-calendar.ng.html',
        controller: 'BudgetController',
        controllerAs: 'bc'
      });

    $urlRouterProvider.otherwise("/");
  }]);
