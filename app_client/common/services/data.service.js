(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var listOfRecords = function () {
      return $http.get('/api/profile/records', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    var createRecord = function(record) {
      return $http.post('/api/profile/record', record, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    }

    return {
      getProfile : getProfile,
      listOfRecords : listOfRecords,
      createRecord : createRecord
    };
  }

})();