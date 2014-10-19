/**
 * Morrisjs angular directive
 */

angular.module( 'morrisjs', [])
  .directive( 'morrisjs', function( MorrisjsFactory ) {
    return new MorrisjsFactory();
  })
  .factory( 'MorrisjsFactory', function() {
    return function() {
      return {
        restrict: 'A',
        priority: 99999,
        scope: {
          data: '=morrisjsData',
          extra_options: '=morrisjsOptions',
          id: '@',
          type: '@morrisjsType'
        },
        link: function ( $scope, $elem ) {

          $scope.$watch('data',
            function(value){
              if(value){
                var options = {
                  element: $scope.id,
                  data: $scope.data,
                };

                angular.extend(options, $scope.extra_options);

                type = cleanType($scope.type);
                if(!type) return;

                Morris[type](options);
              }
            },
            true
          );

          function cleanType( type ) {
            type = type.toLowerCase();
            switch ( type ) {
              case 'area':
              case 'bar':
              case 'donut':
              case 'line':
                return type[0].toUpperCase() + type.slice(1);
              default:
                return '';
            }
          }
        }
      };
    };
  });