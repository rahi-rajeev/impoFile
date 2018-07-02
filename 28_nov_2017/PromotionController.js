tableApp.controller('PromotionAddEdit', ['$scope','salesfactoryData', '$rootScope', '$parse', '$timeout', 'uiGridConstants', '$templateCache',
function($scope,salesfactoryData, $rootScope, $parse, $timeout, uiGridConstants, $templateCache) {
  	$scope.page = 0;
  	$scope.tree = [];
  	$scope.loadingMore = false;
  	$scope.id = 0;
    $scope.edit = false;
    $scope.method = '';
    $scope.data = [];
    /*variable used in the Add and Edit Data*/
    $scope.rule_name = '';
    $scope.description = '';
    $scope.menu_order = 1;
    $scope.label = [];
    $scope.status = 1;
    $scope.customer_group_id = [];
    $scope.customer_groups = customer_groups;
    $scope.customer_groups_selected = '';

    $scope.product_id = [];

    $scope.statusdropdown= [];
    $scope.apply_actiondropdown= [];
    $scope.coupon_type = '2';
    $scope.dynamic = [];
    $scope.dynamic.use_auto_generation = false;
    $scope.user_per_coupon = 1;
    $scope.uses_per_customer = 1;
    $scope.maximum_promotion_uses = 1;
    $scope.dynamic.coupon_code = '';
    $scope.max_qty_discount = 0;

    
    $scope.from_date = '';
    $scope.to_date = '';
   // $scope.apply_action = '1';
    $scope.dynamic.apply_action = '1';
    $scope.dynamic.discount_in_amount_or_percent = '1';

    $scope.statusdropdown.configs = [{'name': 'Yes','value': '1'},
    {'name': 'No', 'value': '0'}];
    $scope.status = $scope.statusdropdown.configs[0];
    //$scope.apply_action= '1';
    //$scope.apply_action.isDefault = true;
    $scope.discount_amount = '';
    $scope.apply_to_shipping = '1';
    $scope.apply_to_free_shipping = '1';
    $scope.stop_rules_processing = '1';
    $scope.skip_special_price = '1';
    $scope.dynamic.promotion_rule_coupon = '';

    $scope.apply_actiondropdown.config = [{"name":"Percent of product price discount","value":"by_percent"},{"name":"Fixed amount discount","value":"by_fixed"},{"name":"Fixed amount discount for whole cart","value":"cart_fixed"}];
    $scope.apply_action = $scope.apply_actiondropdown.config[0];


    $scope.dynamic.coupon_formats = [{"name":"Alphanumeric","value":"alphanum"},{"name":"Alphabetical","value":"alpha"},{"name":"Numeric","value":"num"}];
    $scope.coupon_format = $scope.dynamic.coupon_formats[0];

    /******code for product listing listing*****/

    $scope.dynamic.product_action_conditions = [{"name":"All","value":"1"},{"name":"Selected Only","value":"2"},{"name":"Except Selected","value":"3"}];
    $scope.product_action_condition = $scope.dynamic.product_action_conditions[0];

    /******code for product listing listing*****/

   /******************************************/

      $scope.filetrFileldName = {};
      $scope.addtableRowData = {};
      $scope.salesData = [];
      $scope.settingPanel = [];
      $scope.dataLength = 0;
      $scope.filterDataObj = {};
      $scope.enableTick = true;
      $scope.selectItemTotalActive = 0;
      $scope.selectItemTotalAll =0;
      $scope.selectItemTotalFilter =0;
      $scope.displayTotalNumItems = 0;
      //configration section of setting panel
      $scope.tableSettingConfig = true;
      //configration of filter button table
      $scope.tableFilterConfig = true;
      /***** hhide show table filter container******/
      $scope.tableFilterContainer = false;
      /******* This variable used for select button config section ********/
      $scope.tableSelectBtnConfig = true;
      /**** This variable used for headre section pagination config***********/
      $scope.tableHeaderPaginationConfig = showHeadrePagination;
      /****this variable used for add row config*****/
      $scope.addrowConfig = true;
      /**** sorting field confiration ******/
      $scope.sortingConfig = false;
      $scope.showLoaderTable = true;
      /******This variable used for get all data from server at a time ******/
      $scope.getAllDataFromServerOnce = getAllDataFromServerOnce;
      /******* new code sectoon**********/
      $scope.dragEnable = true;
      $scope.selBoxActBtn = false;
      $scope.totalRecords=0;
      $scope.columsSetting = [{
          field : 'id',
          displayName : 'SlNo',
          cellTemplate : '<span><%grid.appScope.seqNumber(row)+1%></span>',
          minWidth: 50,
          enableSorting: true,
          //width: 50,
       },
       {    
          field : 'name',
          displayName : 'Product Name',
          cellClass : 'skyblue',
          //cellTemplate: '<a href="<%row.entity.detail_url%>" class="skyblue"><%row.entity.blog_name%></a>',
          //width : '20%',
          enableSorting: true,
          //width: 150,
      },
      {
        field : 'product_sku',
        displayName : 'Product Sku',
        //width: '20%',
        enableSorting: true,
        //width: 150,
     },
     {    
      field : 'price',
      displayName : 'Price',
     // cellTemplate : '<a href="<%row.entity.add_action%>" class="skyblue"><%row.entity.add_action_text%><a>',
      //width: '19%',
      enableSorting: true,
      //width: 250,

    }

  ];

  $scope.gridOptions = {
    columnDefs : $scope.columsSetting,
    enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
    gridMenuCustomItems:[{
      title : 'Reset Grid',
      action: function ($event) {
        angular.forEach($scope.columsSetting,(item)=>{item.visible = true;});
        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
      }
    }],
    rowTemplate : '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
    onRegisterApi : function(gridApi) {
      $scope.gridApi = gridApi;
    }
  };
  $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
  /******This function used for get data from server and assign in table creator variable*****/
  var objtype = '';
  salesfactoryData.getData(dataJsonUrl, '', objtype).then(function(response) {
    $scope.salesData = response;
    $scope.settingPanel = $scope.salesData[0];
    $scope.gridOptions.totalItems = (response.length);
    $scope.gridOptions.data = response;
    $scope.displayTotalNumItems = $scope.gridOptions.data.length;
    $scope.showLoaderTable = false;
  });
  /***** This function used for get page view data from server*****/
  salesfactoryData.getData(pagelimit, '').then(function(response) {
    $scope.gridOptions.paginationPageSizes = [];
    angular.forEach(response, function(key, val) {
      $scope.gridOptions.paginationPageSizes[val] = (key.value);
    })
    $scope.gridOptions.paginationPageSize = response[0].value;
    $scope.gridOptions.PageSize = $scope.gridOptions.paginationPageSize;
    $scope.viewItemPerPage = $scope.gridOptions.paginationPageSize;
    $scope.gridOptions.minRowsToShow = $scope.gridOptions.paginationPageSize;
    if (!$scope.$$phase)
      $scope.$apply();
  });
  /*******This function used to display sequence number of row in table******/
  $scope.seqNumber = function(row) {
      let rowIndex = -1;
      let hash = row.entity.$$hashKey;
      let data = $scope.gridOptions.data; 
      for (let ndx = 0; ndx < data.length; ndx++) {
          if (data[ndx].$$hashKey == hash) {
              rowIndex = ndx;
              break;
          }
      }
      return rowIndex;
  };
  /******* This function used for Header pagination control********/
  $scope.HeaderPagination = {
    getTotalPages : function() {
      return Math.ceil($scope.gridOptions.totalItems / $scope.gridOptions.PageSize);
    },
    nextPage : function() {
      if ($scope.gridOptions.paginationCurrentPage < this.getTotalPages()) {
        $scope.gridOptions.paginationCurrentPage++;
      }
    },
    previousPage : function() {
      if ($scope.gridOptions.paginationCurrentPage > 1) {
        $scope.gridOptions.paginationCurrentPage--;
      }
    },
    pageSizeChange : function(num) {
      $scope.viewItemPerPage = num;
      $scope.gridOptions.minRowsToShow = num;
      if ($scope.getAllDataFromServerOnce) {
        $scope.gridOptions.paginationPageSize = num;
        $scope.gridOptions.PageSize = num;
        $scope.gridOptions.totalItems = ($scope.salesData.length);
        $scope.displayTotalNumItems = $scope.gridOptions.data.length;
      } else {
        $scope.showLoaderTable = true;
        var obj = {
          'pageLimit' : num
        };
        salesfactoryData.getData('admin/users/json', obj).then(function(response) {
          $scope.gridOptions.data = response;
          $scope.gridOptions.totalItems = (response.length);
          $scope.showLoaderTable = false;
        })
      }
    }
  }
  /*******
   * This grid Api function to handel All function as per as requirement.
   * This function used for drag row update database table row position.
   * Row selection and batch rwo selection.
   * ********/
  $scope.gridOptions.onRegisterApi = function(gridApi) {
    $scope.gridApi = gridApi;
    gridApi.draggableRows.on.rowDropped($scope, function(info, dropTarget) {
      var rowOrderInfo = {
        "fromIndex" : info.fromIndex,
        "dragRowSource" : info.draggedRowEntity,
        "toIndex" : info.toIndex,
        "dragRowTarget" : info.targetRowEntity
      }
    });
    gridApi.selection.on.rowSelectionChanged($scope, function(row) {
      if(row.isSelected == true){
          $scope.product_id.push(row.entity.id);
       }else{
          var ind = $scope.product_id.indexOf(row.entity.id)
          $scope.product_id.splice(ind,1);
      }
       if($scope.gridApi.selection.getSelectedRows().length >0){
          $scope.selBoxActBtn = true;
       }else{
         $scope.selBoxActBtn = false;
         console.log('fire after selection change');

       }
      angular.element('#product_ids').val($scope.product_id.toString());
    });
    gridApi.selection.on.rowSelectionChangedBatch($scope, function(data) {
      console.log('batch selection change');
        if($scope.gridApi.selection.getSelectedRows().length >0){
          angular.forEach(data, function(datares, index) {
                 $scope.product_id.push(datares.entity.id);
          });
          $scope.selBoxActBtn = true;
        }else{
             $scope.product_id=[];
            $scope.selBoxActBtn = false;
        }
        angular.element('#product_ids').val($scope.product_id.toString());
      
     });
     /*gridApi.grid.registerDataChangeCallback(function(data){
      if($scope.pidEdit.length > 0){
        $scope.pidEdit.map((it,k)=>{
          let ind = $scope.gridOptions.data.findIndex(x=>x.id == it.product_id)
          $scope.gridApi.selection.selectRow($scope.gridOptions.data[ind]);
        });
      }else $scope.gridApi.selection.clearSelectedRows();
     },[uiGridConstants.dataChange.ROW]);*/
  };

  function saveState() {
    var state = $scope.gridApi.saveState.save();
    //localStorageService.set('gridState', state);
  }

  /*******
   * This function used for handel event of status.
   * After click on status section call a AJAX and update database table
   * and update grid data as per as condition like if data is active then set in-active vice versa.
   * *****/
  $scope.updateStatus = function(tempRow, tempCol, $event,actUrl,rowId,actName) {
    var dataObj = {
      'id' : rowId,
      'action_type' : actName
    }
  
     switch(actName){
      case 'delete' :
        if(confirm("Are you sure to delete this record?")){
          salesfactoryData.getData(actUrl,'GET',dataObj).then(function(response) {
               var index = $scope.gridOptions.data.indexOf(tempRow.entity);
             $scope.gridOptions.data.splice(index, 1);
          })
        }
      break;
      case 'change_status' :
        salesfactoryData.getData(actUrl,'GET',dataObj).then(function(response) {tempRow.entity.status = response;});
      break;
    }
  }
    
    $scope.sendVerification = function(tempRow, tempCol, $event,actUrl,rowId,actName) {
    var dataObj = {
      'id' : rowId,
      'action_type' : actName
    }
  
     salesfactoryData.getData(actUrl,'GET',dataObj).then(function(response) {
               var index = $scope.gridOptions.data.indexOf(tempRow.entity);
             $scope.gridOptions.data.splice(index, 1);
     })
  }

  

  /******
   * This function removeSelected and removeSelectedRow used for desleced row and remove selected row.
   * Where removeSelectedRow clear selection of rows and removeSelectedRow Reomve selected rowfrom grid as well as database Table.
   * *******/
  $scope.removeSelected = function() {
    $scope.gridApi.selection.clearSelectedRows();
  }
  $scope.removeSelectedRow = function() {
    var idArr = [];
    if ( typeof $scope.gridApi.selection.getSelectedRows() != 'undefined' && $scope.gridApi.selection.getSelectedRows().length > 0) {
      if (confirm("Are you sure you want to delete this?")) {
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function(data, index) {
          $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
          idArr.push(data.id);
        });
        var idObj = {
          "id" : idArr
        };
        salesfactoryData.getData(removeRowUrl, idObj);
      }
    } else
      alert('Please select at least one check box');
  }
  /***** This function used to handel callback function which is declare in celltamplate and do some action
   * and dataAttr.entity is used to get all field value like dataAttr.entity.id.
   * ******/
  $scope.funEdit = function(dataAttr) {
    console.log(dataAttr.entity);
  }
  /********
  * This both actionOnDataGrid and actionBtnClick function used for Action on Grid Data Like Delete ,Enable and Disable etc 
  * This perform after data is selected if not selected then not perform any action.
  ********/
   $scope.actioOptions = [
        {id: 0, name: '---Action---'},
        {id: 1, name: 'Active'},
        {id: 2, name: 'Inactive'},
        {id: 3, name: 'Delete'},
    ];
    $scope.actionOnDataGrid = function(){
      var name = $scope.actionSelectBox.name;
      if(name=='---Action---'){
        alert('Please any action');
        $scope.selBoxActBtn = false;
      }else if(name == 'Active' || name=='Inactive' || name=='Delete'){
        if($scope.gridApi.selection.getSelectedRows().length >0){
          $scope.selBoxActBtn = true;
        }else{
          $scope.selBoxActBtn = false;
          alert('Please select row first');
        }
    }else{
      alert('Please select row first');
    }
    }
  $scope.actionBtnClick = function(){
       var name = $scope.actionSelectBox.name;
       var DataSet = $scope.gridApi.selection.getSelectedRows();
       var result =  createIdArray(DataSet);
       if($scope.gridApi.selection.getSelectedRows().length >0){
         switch(name){
        case 'Delete' :
          if (confirm("Are you sure you want to delete this?")) {
            var obj = {
             "DataSetID" : result,
             "actionName" : name
            };
            salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
              angular.forEach(DataSet, function(data, index) {
                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
              });
               $scope.selBoxActBtn = false;  
            });
          }
          break;
        case 'Enable' : 
          var obj = {
           "DataSetID" : result,
           "actionName" : name
          };
          salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
            angular.forEach(DataSet, function(data, index) {
              var ind = $scope.gridOptions.data.indexOf(data);
              var tempRow = $scope.gridApi.grid.rows[ind];
              tempRow.entity.status = "Enabled";
              $scope.gridApi.selection.clearSelectedRows();
              $scope.gridApi.grid.refresh();
            });
          });
           break;
        case  'Disable' :
          var obj = {
           "DataSetID" : result,
           "actionName" : name
          };
          salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
            angular.forEach(DataSet, function(data, index) {
              var ind = $scope.gridOptions.data.indexOf(data);
              var tempRow = $scope.gridApi.grid.rows[ind];
              tempRow.entity.status = "Disabled";
              $scope.gridApi.selection.clearSelectedRows();
              $scope.gridApi.grid.refresh();
            });
          });
         break;
        default :
          alert('select any action first');
          break;
      }
       }else{
        $scope.selBoxActBtn = false;
      alert('Please select row first');
       }
    }
    /*****This function return all selected row data id*****/
    function createIdArray(dataSet){
      var idArray=[];
      angular.forEach(dataSet, function(data, index) {
    idArray.push(data.id);
    });
    return idArray;
    };
  $scope.getTableHeight = function() {
     var rowHeight = 45; // your row height
     var headerHeight = 39; // your header height
     //var footerRowHeight = 32; // pre-calculated
     let as = $scope.gridApi.core.getVisibleRows().length;
     console.log();
     return {
        height: (as * rowHeight + headerHeight) + "px"
     };
  };  

  /*****
   * This function used for search data from grid when you are not used searching from server.
   * Where searchDataFromGrid function call on button click
   * and searchDataInGrid function used for searching.
   * ********/
  $scope.searchDataFromGrid = function() {
    //console.log($scope.filterDataObj);
    $scope.gridApi.grid.registerRowsProcessor($scope.searchDataInGrid, 200);
    $scope.gridApi.grid.refresh();
    // console.log($scope.gridOptions.data.length);
    // console.log($scope.gridApi.core.getVisibleRows().length);
    // console.log($scope.gridOptions.totalItems);
    // //$scope.displayTotalNumItems = $scope.gridOptions.data.length;
    // $scope.displayTotalNumItems = $scope.gridOptions.totalItems;
    // console.log($scope.gridApi.grid.options.totalItems);
    //$scope.lineTotal = _.reduce($scope.gridOptions.data, function(a, b) {return a + b}, 0);
    //console.log($scope.gridApi.grid.renderContainers.body.visibleRowCache);
      var abc= $scope.gridApi.grid.rows.filter(function(o){
        return o.visible;
       })
      console.log(abc);
    //console.log($scope.gridApi.grid.renderContainers.body.renderedRows);

  }
  $scope.searchDataInGrid = function(renderableRows) {
    var matcher = [];
    angular.forEach($scope.filterDataObj, function(name, index) {
      if (name != 'Please Select...')
        matcher.push(name);
    });
    //console.log(matcher);
    var matLen = matcher.length,
        i = 0;
    renderableRows.forEach(function(row) {
      var match = false;
      $rootScope.filedsSet.forEach(function(field, indx) {
        var temp = '';
        if (i >= matLen)
          i = 0;
        if (matcher[i] != '')
          temp = new RegExp('^' + matcher[i], 'i');
        if (row.entity[field.fieldName].match(temp)) {
          i++;
          match = true;
        }

      });
      if (!match)
        row.visible = false;
    });
    return renderableRows;
  };
  /*** end code******/

  /****** This function used for sort all table  ******/
  $scope.sort = function(keyname, strVal) {
    if (strVal == 'activeSort') {
      $scope.sortKeyActive = keyname;
      //set the sortKey to the param passed
      $scope.reverseActive = !$scope.reverseActive;
      //if true make it false and vice versa
    } else if (strVal == 'allSort') {
      $scope.sortKeyAll = keyname;
      $scope.reverseAll = !$scope.reverseAll;
    } else if (strVal == 'filterSort') {
      $scope.sortKeyFilter = keyname;
      $scope.reverseFilter = !$scope.reverseFilter;
    }
  }
  /***this function used for select an unselect all column in table**/
  $scope.selectAllColumnFunAll = function(actionName) {
    if (actionName == 'select') {
      $scope.gridApi.selection.selectAllRows();
      $scope.selectItemTotalAll = $scope.gridOptions.data.length;
    } else if (actionName == 'unselect') {
      $scope.gridApi.selection.clearSelectedRows();
      $scope.selectItemTotalAll = 0;
    }
  }
  /***** This fnction used for select visible part of table in active section*****/
  $scope.selectVisibleColumnsAll = function(strFlag) {
    if (strFlag == 'visible') {
      $scope.gridApi.selection.selectAllVisibleRows();
      console.log($scope.gridApi.selection);
      $scope.selectItemTotalAll = ($scope.gridApi.core.getVisibleRows($scope.gridApi.grid).length);
    } else if (strFlag == 'unVisible') {
      $scope.gridApi.selection.clearSelectedRows();
      $scope.selectItemTotalAll = 0;
    }
  }
  /***this function used for setting panel show hide table columns ****/
  $scope.showHideTableColumn = function(strName) {
    strName = strName.replace(/\s/g, '');
    $scope[strName] = $scope[strName] === true ? false : true;
    return false;
  }
  /***
   * Filter section event handler and server callback config and assign data on table grid.
   * *****/
  /***** This function used for get input box value from filter section******/
  $scope.textChangeFunction = function(str, $event) {
    var currentVal = $event.target.value;
    if (currentVal !== 'undefined')
      $scope.filterDataObj[str] = currentVal;
  }
  
  /*****this function used get select box value from filter section*****/
  $scope.filterSelectBoxChange = function(selectedOption, strName) {
    if (selectedOption.value !== ' ' || typeof selectedOption.value !== 'undefined')
      $scope.filterDataObj[strName] = selectedOption.value;
  }
  /******* This function used for set filter attribute and get data from server *****/
  $scope.getFilterDataFromServer = function() {
    var objData = angular.merge({}, $scope.filterDataObj, $rootScope.dropdownValList)
    //angular.extend($scope.filterDataObj,$rootScope.dropdownValList);
    console.log(objData);
    console.log($scope.filterDataObj);
    console.log($rootScope.drodownValList);
    return false;
    if (angular.isObject($scope.filterDataObj) && !angular.equals({}, $scope.filterDataObj)) {
      var obj = $scope.filterDataObj;
      salesfactoryData.getData('admin/users/json', obj).then(function(res) {
        //$scope.gridOptions.data = res.salesData;
        console.log(res);
        //$scope.salesData = [];
        //$scope.salesData = res.salesData;
        //angular.copy(res.salesData, $scope.salesData);
        //$scope.salesData.push(res.salesData);
        // $scope.$applyAsync()
        // console.log($scope.salesData);
        if (!$scope.$$phase)
          $scope.$apply();
      })
    }
  }

  $scope.checkAllActive = function() {
    ($scope.checkedAllActCal) ? $scope.checkedAllActCal = false : $scope.checkedAllActCal = true;
  }
  $scope.checkedAll = function() {
    ($scope.checkedAllCal) ? $scope.checkedAllCal = false : $scope.checkedAllCal = true;
  }
  $scope.checkedAllFilterCls = function() {
    ($scope.checkedAllColFilter) ? $scope.checkedAllColFilter = false : $scope.checkedAllColFilter = true;
  }
  //  console.log($rootScope.filedsSet)
  $scope.$watch("filetrFileldName", function(newVal, oldVal) {
    // return this.filedName;
    // console.log('fdf ffd');
    //console.log(newVal);
  }, true)
  /*** this function used for get data from add row field***/
  $scope.addRowDataGet = function($event) {
    if (!$scope.$$phase)
      $scope.$apply();
    var currentVal = currentName = '';
    currentVal = $event.target.value;
    currentName = $event.target.name;
    $scope.addtableRowData[currentName] = currentVal;
  }
  /*****This function used for table row add in backend using dynamic url ******/
  $scope.addRowInBackendTable = function(strUrl, strAction) {
    console.log($scope.addtableRowData);
  }
  /****** This function used for get selected value form option box******/
  $scope.getSelectedOptionVal = function() {
    console.log($scope.filterUrlSelectBoxModel);
    console.log('just chil don dhhu');
  }
  $scope.testFunction = function() {
    console.log($scope.test);
  }




    /**********End for product Listing**************/
   
   if( pro_id != '' && pro_id !== undefined){
     /*create coupon code list*/

     //alert(pro_id);
     $scope.editPromotion = (pro_id)=>{
       		//console.log(catid);
			var objPage={id:pro_id}
			 salesfactoryData.getData(siteUrl + '/seller/promotion/editdata', 'GET', objPage).then((res)=>{
          $scope.pidEdit = res.promotionfor_seleced_product;
          $scope.rule_name = res.rule_name;
          $scope.menu_order = res.menu_order;
          if(res.status == 1){
		        $scope.status = $scope.statusdropdown.configs[0];
		      }else{
		         $scope.status = $scope.statusdropdown.configs[1];
		      } 

         

          if(res.product_action_condition == '1'){

            $scope.product_action_condition = $scope.dynamic.product_action_conditions[0];
          }else if(res.product_action_condition == '2'){
            //console.log(res.product_action_condition);
            //console.log($scope.dynamic.product_action_conditions[1]);
            $scope.product_action_condition = $scope.dynamic.product_action_conditions[1];
          }else{
             $scope.product_action_condition = $scope.dynamic.product_action_conditions[2];
          } 





         // $scope.product_action_condition = $scope.dynamic.product_action_conditions[0];

		      $scope.description = res.description;
          (res.promotion_rule_desc).map((val)=>{
					  $scope.label[val.lang_id] = val.label; 
			    });

			  //30-08-2017

              $scope.from_date = res.from_date;
              $scope.to_date = res.to_date;
              $scope.uses_per_customer = res.uses_per_customer;
              $scope.maximum_promotion_uses = res.maximum_promotion_uses;
              $scope.coupon_type = res.coupon_type;
              $scope.dynamic.coupon_code = res.coupon_code;

              //$scope.dynamic.use_auto_generation = res.use_auto_generation;

              if(res.use_auto_generation == 2){

                $scope.dynamic.use_auto_generation = false;

              }else{
                
                $scope.dynamic.use_auto_generation = true;

              }


              $scope.user_per_coupon = res.user_per_coupon;
              $scope.conditions_serialized = res.conditions_serialized;
              $scope.dynamic.apply_action = res.apply_action;
              $scope.discount_amount = res.discount_amount;

              $scope.dynamic.discount_in_amount_or_percent = res.discount_in_amount_or_percent;
              $scope.max_qty_discount = res.max_qty_discount;
              $scope.discount_qty_step = res.discount_qty_step;
              $scope.dynamic.apply_to_free_shipping = res.apply_to_free_shipping;
              $scope.dynamic.stop_rules_processing = res.stop_rules_processing;

              $scope.dynamic.promotion_rule_coupon = res.promotion_rule_coupon;
            
              $scope.customer_group_id = res.selectedpromotionRuleCustomerGroupIds;
              
             // console.log($scope.customer_groups_selected);


         });
			  

       }
       $scope.editPromotion(pro_id);
   }
}]);