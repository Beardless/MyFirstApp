angular.module('MyApp', [])
.controller('UploadCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.feedback = {
            formVissible: false,
            name: '',
            email: '',
            message: '',
            file: '',
            errors: {
                message: false
            }
        }

        $scope.showForm = function() {
            var form = angular.element(document.querySelector('form#notification'));
            form.removeClass('hidden');
            $scope.feedback.formVissible = true;
        }

        $scope.submit = function() {
            if ($scope.feedback.message.length == 0) {
                $scope.feedback.errors.message = 'Treść zgłoszenia nie może być pusta.'

                return false;
            } else {
                $scope.feedback.errors.message = false;
            };

            if ($scope.feedback.name.length == 0) {
                $scope.feedback.name = 'Rysiek Anonim'
            };

            if ($scope.feedback.email.length == 0) {
                $scope.feedback.email = 'kontak@podlasiesiedziej.pl'
            };

            var fd = new FormData();
            fd.append('sendFeedbackForm[attachment]', $scope.feedback.file);
            fd.append('sendFeedbackForm[first_name]', $scope.feedback.name);
            fd.append('sendFeedbackForm[last_name]', '...');
            fd.append('sendFeedbackForm[email]', $scope.feedback.email);
            fd.append('sendFeedbackForm[subject]', 'Zgłoszenie od czytelnika.');
            fd.append('sendFeedbackForm[message]', $scope.feedback.message);
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
