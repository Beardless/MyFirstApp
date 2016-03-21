angular.module('MyApp', ['ngFileUpload'])
.controller('UploadCtrl', [
  '$scope',
  'Upload',
  function($scope, Upload) {
    $scope.files = [];

    $scope.submit = function() {
      $scope.upload($scope.file);
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://biala.t.monogo.pl/plugin/send-feedback',
            data: {
              'sendFeedbackForm[attachment]': file,
              'sendFeedbackForm[first_name]': $scope.first_name,
              'sendFeedbackForm[last_name]': $scope.last_name,
              'sendFeedbackForm[email]': $scope.email,
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