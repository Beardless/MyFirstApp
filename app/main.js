angular.module('MyApp', [])
.controller('UploadCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.formVissible = false;
        $scope.name = null;
        $scope.email = null;
        $scope.message = null;
        $scope.errors = {
            message: false
        }

        $scope.submit = function() {
            $scope.upload($scope.file);
        }

        $scope.showForm = function() {
            var form = angular.element(document.querySelector('form#notification'));
            form.removeClass('hidden');
            $scope.formVissible = true;
        }

        $scope.upload = function(file) {
            if ($scope.message.length == 0) {
                $scope.errors.message = 'Treść zgłoszenia nie może być pusta.'

                return false;
            }

            var fd = new FormData();
            fd.append('sendFeedbackForm[attachment]', file);
            if ($scope.name) {
                fd.append('sendFeedbackForm[first_name]', $scope.name);
                fd.append('sendFeedbackForm[last_name]', '...');
            }
            if ($scope.email) {
                fd.append('sendFeedbackForm[email]', $scope.email);
            }

            fd.append('sendFeedbackForm[subject]', 'Zgłoszenie od czytelnika.');
            fd.append('sendFeedbackForm[message]', $scope.message);
            fd.append('publication', newscoop.feedbackPlugin.publication);
            fd.append('feedbackUrl', newscoop.feedbackPlugin.feedbackUrl);
            $http.post('http://newscoop.dev/plugin/send-feedback', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function(res) {
                console.log(res);  
            });
        }
    }
]);

angular.module('MyApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    }
}]);

angular.module('MyApp').config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);
