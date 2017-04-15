(function() {

  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData', 'deviceDetector'];
  function profileCtrl($location, meanData, deviceDetector) {
    var vm = this;

    vm.user = {};
    vm.record = {
      payload: {}
    };
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
      var record = vm.record;
      record.source_info = {
        device: {
          name: deviceDetector.device,
          identifier: deviceDetector.browser + '/' + deviceDetector.browser_version
        }
      };
      meanData.createRecord(record)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('profile');
      })
    };

  }


})();

