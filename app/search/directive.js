angular
    .module('mainApp')
    .directive('footerMain', footerMain);

function footerMain() {
    var directive = {
        //link: link,
        templateUrl: 'search/footer.html',
        restrict: 'EA',
        //replace: true
    };
    return directive;
};