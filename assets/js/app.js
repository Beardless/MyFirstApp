angular.module('MyApp', ['ngFileUpload'])
.controller('UploadCtrl', [
  '$scope',
  'Upload',
  function($scope, Upload) 
  {
    $scope.files = [];
    $scope.formVissible = false;
    $scope.errors = {
      message: false;
    };

    $scope.submit = function() 
    {
      $scope.upload($scope.file);
    };

    $scope.showForm = function()
    {
      var form = angular.element(document.querySelector('form#notification'));
      form.removeClass('hidden');
      $scope.formVissible = true;
    }
    // upload on file select or drop
    $scope.upload = function (file) {
      if (!$scope.message.length == 0) {
        $scope.errors.message = 'Treść zgłoszenia nie może być pusta.'

        return false;
      }
      Upload.upload({
          url: 'http://biala.t.monogo.pl/plugin/send-feedback',
          data: {
            'sendFeedbackForm[attachment]': file,
            'sendFeedbackForm[first_name]': $scope.name,
            'sendFeedbackForm[last_name]': '...',
            'sendFeedbackForm[email]': $scope.email,
            'sendFeedbackForm[subject]': 'Zgłoszenie od czytelnika.',
            'sendFeedbackForm[message]': $scope.message
          }
      }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
          console.log('Error status: ' + resp.status);
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  }
]);