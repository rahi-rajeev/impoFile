 /*****
  *Author : Smoothgraph Connect pvt Ltd.
  *Created date : 11/12/2017
  *This controller used for handel all front product listing
  *****/
 (function() {
   function prdCtrlHandler($scope, salesfactoryData, $window, $timeout, $rootScope, $state, $filter) {
     /****
      *Page load config Object : page_config
      *@page : number 0,
      *@product_Items : array [],
      *@loadingMore : Blooean false,
      *@totalItems : number  for pagination
      ****/
     $scope.page=0;
     $scope.product_Items = [];
     //Pagination setting
     $scope.pagination = {
       totalItems: 0,
       itemsPerPage: 12,
       currentPage: 1,
     };
     //Loader setting 
     $scope.loader = {
       loadingMore: false,
       loaderImg: btnloaderpath,
       addtocart: false,
       disableBtn: false,       
     };
     //object used for variable mainupluation
     $scope.varModel={
        no_result_found : false,
     };
     //Layout management
     $scope.orderBy = 'name';
     $scope.order = 'ASC';
     $scope.productLayoutView = 'grid';
     $scope.fillterAttributes = '';
     $scope.messageShow = false,
     $scope.senddropdown = true;
     $scope.message = '',
     $scope.search = name;
     $scope.cats_id = (typeof cat_id !== "undefined" && cat_id) ? cat_id : null;
     $scope.selectedAttributes = [];
     $scope.attributeNames = (typeof selectedAttributes!=="undefined" && selectedAttributes!="")? JSON.parse(selectedAttributes) : {};
     console.log($scope.attributeNames);
     var atr = JSON.parse(attrbute_results);
     st  = JSON.parse(selectedAttributes);
     // var res = atr.filter(function(o) {
     //   return o.attribute_values.values.id;
     // });
     // var res = atr.reduce(function(prev,curr){
     //      // if(curr.attribute_values!==undefined && curr.attribute_values.values!== undefined){
     //      //   console.log(curr.attribute_values.values)
     //      //     console.log($scope.attributeNames);
     //      // }

     //     return[...prev, function(){
     //          if(curr.attribute_values!==undefined && curr.attribute_values.values!== undefined){
     //            return(curr.attribute_values.values)
     //     }}]


     // },st)
     console.log(res);
     //Listen on load more data from server (mean load product on click on pagination)
     $scope.loadData = function() {
      console.log('dataRelod!!!!');
       // if ($scope.pagination.totalItems == $scope.pagination.currentPage) return;
       $scope.loader.loadingMore = true;

       var _obj = {
         page: $scope.pagination.currentPage,
         cat_id: $scope.cats_id,
         orderBy: $scope.orderBy,
         order: $scope.order,
         fillterAttributes: $scope.attributeNames,
         itemsPerPage: $scope.pagination.itemsPerPage,
         search: $scope.search,
       };

       //fetch data from server https://api.myjson.com/bins/a0afb  getproductURL
       salesfactoryData.getData(getproductURL, 'GET', _obj)
         .then(function(res) {
           var result = res.data;
           if(result.status == 'success' && angular.isArray(result.data) && result.data.length>0){
              console.log("three???");
             $scope.product_Items = result.data;
             $scope.pagination.totalItems = result.totalproducts;
             $scope.loader.loadingMore = false;
             $scope.filter_action.attrbute_results = result.attrbute_results;
             $scope.varModel.no_result_found = false;
           }else {
             console.log("here??>>>>");
             $scope.product_Items =[];
             $scope.pagination.totalItems = 0;
             $scope.loader.loadingMore = false;
             $scope.varModel.no_result_found = true;
           }
         }, function(error) {
           _error();
         }).finally(function(){
            $scope.loader.loadingMore = false;
            console.log($scope.product_Items);
         })
     };
     //self exeucte on load controller
     //$scope.loadData();

     //Listen on layout managenet 
     $scope.filterByAttribute = function(attributeName, removeID = null) {
       if(attributeName == 'DESC' || attributeName == 'ASC') {
         $scope.order = attributeName;
       }

       if (attributeName == 'reset-all') {
         $scope.selectedAttributes = [];
         $scope.attributeNames = {};
       }
       //console.log($scope.attributeNames[attributeName]);
       if (removeID != null) {
         $scope.attributeNames[attributeName][removeID] = false;
       }
       $scope.pagination.currentPage =1;
       pushQueryString();
       /*when select category from tab*/
       $scope.loadData();
     };
     //Listen on layout change (mean grid to list list to grid)
     $scope.prdLayoutManage = function(value) {
       $scope.productLayoutView = value;
     };
     //Listen on add wishlist
     $scope.addIntoWishlist = function(product_id, $event, index) {
       $event.stopImmediatePropagation();
       salesfactoryData.getData(addIntoWishlist, 'GET', {
           "product_id": product_id
         })
         .then(function(response) {
           if (response.data.status !== undefined && response.data.status == "success") {
             $scope.product_Items[index].wish = product_id;
             _toastrMessage(response.data.status, response.data.message);
           }
         }, function(error) {
           _error();
         });
     };
     //Listen on remove wishlist
     $scope.removeFromWishlist = function(product_id, $event, index) {
       $event.stopImmediatePropagation();
       salesfactoryData.getData(removeFromWishlist, 'GET', {
           "product_id": product_id
         })
         .then(function(response) {
           if (response.data.status !== undefined && response.data.status == "success") {
             $scope.product_Items[index].wish = null;
             _toastrMessage(response.data.status, response.data.message);
           }
         }, function(error) {
           _error();
         });
     };
     //Listen on pagination change 
     $scope.loadNext = function(page) {
       pushQueryString();
       console.log("im her on load");
       //call get data function
       $scope.loadData();
     };

     /*
      *This object used to manage all filater related function (including data and function)
      */

     $scope.filter_action = {
       attrbute_results: JSON.parse(attrbute_results),
       subcategories: (typeof subcategories !== "undefined" && subcategories) ? JSON.parse(subcategories) : [],
       filter_list: [],
       selected_cat: [],
       filter_list_handler: function(fivarr_attribute, _key, attr_code, attr_id, attr_item) {
         /*
          *This function used to handel filter action on attribute click
          *@param : fivarr_attribute (object)
          *@param : _key (string)
          *@param : attr_code (string)
          *@param : attr_item (object)
          */
         var _self = this;

         if ($scope.attributeNames[attr_code][attr_id] == true) {
             _self.filter_list.push(attr_item);
             var idArr = _self.getId(_self.filter_list);
             $scope.pagination.currentPage =1;
             pushQueryString();         
         } else if (!$scope.attributeNames[attr_code][attr_id] == true) {
             var ind = _self.filter_list.findIndex(function(o) {
               return o.id == attr_item.id;
             });
             //remove exsting elemnt from filter_list array
             if (ind >= 0) {
               _self.filter_list.splice(ind, 1);
             }
            pushQueryString();  
         }
         //get filter data
         //$scope.loadData();
         console.log(_self.filter_list);
       },
       removeFilterHandler: function(item) {
         var _self = this;

         var ind = _self.filter_list.findIndex(function(o) {
           return o.id == item.id;
         });
         //remove exsting elemnt from filter_list array
         if (ind >= 0) {
           _self.filter_list.splice(ind, 1);
         }

         //reset model on remove
         angular.forEach($scope.attributeNames, function(_key, _val) {
           //reset model if its true and not undefined
           if (_key[item.id] !== undefined && _key[item.id] == true) {
             $scope.attributeNames[_val][item.id] = false;
           }
         });

         pushQueryString();
         //get filter data
         //$scope.loadData();
       },
       clearAllFilter: function(flag) {
         if (flag !== undefined && flag === 'reset_all') {
           this.filter_list = [];
           this.selected_cat = [];
           //reset model on remove
           $scope.attributeNames = {};
           pushQueryString();
         }
         //get filter data
         //$scope.loadData();
       },
       getId: function(data) {
         var result = data.map(function(o) {
           return o.id;
         });
         return result;
       },
       filter_by_cat: function(action_type, cate_item) {
         /*
          *This function used to handel filter action on categories click
          *@param : action_type (string)
          *@param : cate_item (Object)
          */
         var _self = this;
         if (action_type === "add_cat") {
           if ($scope.attributeNames.category[cate_item.id] === true) {
             _self.selected_cat.push(cate_item);
           } else {
             var ind = _self.selected_cat.findIndex(function(o) {
               return o.id == cate_item.id;
             });
             //remove exsting elemnt from filter_list array
             if (ind >= 0) {
               _self.selected_cat.splice(ind, 1);
             }
           }
         } else if (action_type === "remove_cat") {
           var ind = _self.selected_cat.findIndex(function(o) {
             return o.id == cate_item.id;
           });
           //remove exsting elemnt from filter_list array
           if (ind >= 0) {
             _self.selected_cat.splice(ind, 1);
           }
           //reset model
           $scope.attributeNames.category[cate_item.id] = false;
         }
         //get filter data
         //$scope.loadData();

       },
     };

     //url handel section
     //Listen on push Query string in url then state will change 
     function pushQueryString(){
       //go to state change 
       var idArr = $scope.filter_action.getId($scope.filter_action.filter_list);
       $state.go('query_state', { 
         page: $scope.pagination.currentPage,
         filter_by: (!angular.isUndefined(idArr) && idArr.length > 1 ? idArr.join(',') : idArr),
         order_by : $scope.orderBy,
         order : $scope.order,
       }, {
         reload: true
       });
     }
     //Listen on url query string change
     $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
       // Use $state.params to update as needed
       // console.log('toState');
       // console.log(toState)
       // console.log("fromState ");
       // console.log(fromState);

       // console.log("toParams \t");
       // console.log(toParams);
       // console.log("fromParams \t");
       // console.log(fromParams);

       console.log("pageLoad");
       // console.log("event");
       // console.log(event);      
       var ft = $scope.filter_action;
       //In case page is load then fromState is empty
       if(fromState.name!==undefined && fromState.name == ""){
          if(toParams.page!==undefined && toParams.page){
            $scope.pagination.currentPage = parseInt(toParams.page);
          }
          if(toParams.order_by!==undefined && toParams.order_by){
            $scope.orderBy = toParams.order_by;
          }
          if(toParams.order!==undefined && toParams.order){
            $scope.order = toParams.order;
          }
          if(toParams.filter_by!==undefined && toParams.filter_by.length){
            filterBy();
          }
       }else{
          //for filter attribute 
          if(toParams.filter_by.length){
            filterBy();
          } 
       }

       function filterBy(){
          var ftarr = toParams.filter_by[0].split(",");
          //check filter and handel        
          if(ft.filter_list.length>0){
            for(var i in ft.filter_list){              
              var x = _getIndex(ft.filter_list, ftarr[i], "id");
              
              if(x == -1){
                ft.removeFilterHandler(ft.filter_list[i]);
              }
            }
          }
       };       
       //get filter data
       $scope.loadData();
     });

    /*Listen for get index 
    *@param : destObj (oject/array)
    *@param : matchEle (string)
    *@param : matchType (string -optional)
    */
    function _getIndex(destObj, matchEle, matchType){
      var index;
      index = destObj.findIndex(function(item){
        if(matchType!== undefined && matchType){          
          return (item[matchType] == matchEle);
        }else{
          return (item == matchEle);
        }
      });
      return index;
    }

    //Listen on error 
    function _error() {
       try {
         throw new Error("Something went badly wrong!");
       } catch (e) {
         //_messageHandler('error','Something went wrong!','Oops...')
         console.log("Opps " + e);
       };
    }; 

   }; //end controller

   angular.module('CategoryPageApp').controller('ProductListController', prdCtrlHandler);
 })(window.angular);