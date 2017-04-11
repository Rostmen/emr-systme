(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData'];
  function profileCtrl($location, meanData) {
    var vm = this;

    vm.user = {};
    vm.record = {};
    vm.records = [];

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (e) {
        console.log(e);
      });

    meanData.listOfRecords()
      .success(function(data) {
        vm.records = data;
      })
      .error(function (e) {
        console.log(e);
      });

    vm.onSubmitRecord = function() {
      console.log('Submitting record');
      meanData.createRecord(vm.record)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('profile');
      })
    };

  }


})();

