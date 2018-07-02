(function(){
	/*
	*This directive used to handel simple and config product listing in case of bundel product
	*Author : Smmoothgraph Connect pvt ltd.
	*/
	//simpleProductList directive
	function simpleProductList($compile,$rootScope){
		return {
			restrict: 'E',
			scope :{
				productData : '=',
			},
			templateUrl : simple_bundel_prd_HtmlUrl,
			link: function (scope, iElement, iAttrs) {
				scope.removeSimpleProd =function($event,item,index){
					$event.stopPropagation();
					var ind = _.indexOf($rootScope.prd_data.simple_product_id,item.id);
					if(ind!= -1){
						$rootScope.prd_data.simple_product_id.splice(ind,1);
						scope.productData.splice(index,1);
					}					
				};
			}
		};
	};
	//bundel product directive function
	function configProductList($rootScope){
		return{
			restrict : 'E',
			scope :{
				productData:'=',
			},
			templateUrl:config_bundel_prd_HtmlUrl,
			link: function(scope,iElement,iAttrs){
				//
			},
			controller : function ($scope) {
				$scope.product_detail_url = product_detail_url;
				$scope.removeConfigProd=function($event,prd_val,prd_key){
					var main_prd_id = _.map(prd_val.main_product_detail,'id');
					if(!_.isUndefined(main_prd_id) && main_prd_id.length>0){
						for(i in main_prd_id){
							var ind = _.indexOf($rootScope.prd_data.config_product_id,main_prd_id[i]);
							$rootScope.prd_data.config_product_id.splice(ind,1);
						}
					}
					$scope.productData.splice(prd_key,1);
					$event.stopPropagation();
				}
			},	
		};
	};
	angular.module('sabinaAdminApp').directive('simpleProductDir',simpleProductList);
	angular.module('sabinaAdminApp').directive('configProductDir',configProductList);
})(window.angular);