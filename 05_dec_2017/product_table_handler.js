(function(){
	"used strict";
	 /**** This code used for columns setting of table where field is field name of database filed.*****/
    var columsSetting = [
	    {
	    field : 'id',
	    displayName : 'Id',
	    cellTemplate : '<span><%grid.appScope.seqNumber(row)+1%></span>',
	    // enableSorting : _getInfo('id','sortable'),
	    //minWidth : _getInfo('id','width'),
	    // cellClass : _getInfo('id','align'),
	    },
	    {   
	    field : 'sku',
	    displayName : 'SUK',
	    //enableSorting : _getInfo('sku','sortable'),
	    // minWidth : _getInfo('sku','width'),
	    //cellClass : _getInfo('sku','align'),
	    },
	    { 
	    field : 'name',
	    displayName : 'Name',
	    // enableSorting : _getInfo('name','sortable'),
	    //minWidth : _getInfo('name','width'),
	    //cellClass : _getInfo('name','align'),
	    },
	    {  
	    field : 'initial_price',
	    displayName : 'Price',
	    cellTemplate:'<span><%row.entity.currency_symbol + row.entity.initial_price%></span>',
	    // enableSorting : _getInfo('initial_price','sortable'),
	    //minWidth : _getInfo('initial_price','width'),
	    // cellClass : _getInfo('initial_price','align'),
    }];

	function ctrlHendler($scope,$timeout,$window,$sce,$rootScope,salesfactoryData,uiGridConstants){
		$scope.addtableRowData = {};
		$scope.displayTotalNumItems = 0,$scope.selectItemTotal=0;
		$scope.filterDataObj = {};
 		//configration of filter button table
		$scope.tableFilterConfig = (typeof tableConfig.filter !=='undefined')? tableConfig.filter : false;
		/*****hide show table filter container******/
		$scope.tableFilterContainer = false;
		/******* This variable used for select button config section ********/
		$scope.tableSelectBtnConfig =(typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : false;
		console.log($scope.tableSelectBtnConfig);
		/**** This variable used for headre section pagination config***********/
		$scope.tableHeaderPaginationConfig = showHeadrePagination;
		/****this variable used for add row config*****/
		$scope.addrowConfig = true;
		$scope.showLoaderTable = true;
		/******This variable used for get all data from server at a time ******/
		$scope.getAllDataFromServerOnce = true;//getAllDataFromServerOnce;
	    $scope.tabActive = false;
		$scope.tabAll = false;
		$scope.tabFilter = false;
		$scope.dragEnable = true;
		$scope.enableSimple =false;
		$scope.enableConfig = false;
		//gridOption  used for config product and gridOption1 used for simple product
	 	$scope.gridOptions = {}; 
	 	
	 	$scope.no_result_found=false;
		$scope.errorInfoLog ='<div class="no-info-blank"><h3><i class="icon-doc"></i> You have no information </h3></div>';
		$scope.simple_config_img_path = (_.isUndefined(simple_config_img_path))? '': simple_config_img_path;
	   
	   //config product table setting
		$scope.gridOptions = {
			columnDefs : columsSetting,
			enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
			enableHorizontalScrollbar : uiGridConstants.scrollbars.WHEN_NEEDED,
			rowTemplate : '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
			onRegisterApi : function(gridApi) {
				$scope.gridApi = gridApi;
			}
		};		
		/***** This section used for get page view data from gloabl variable*****/
		$scope.gridOptions.paginationPageSizes = [];
		$scope.gridOptions.paginationPageSizes = pagination;
		$scope.gridOptions.paginationPageSize = pagination[0];
		$scope.gridOptions.PageSize = $scope.gridOptions.paginationPageSize;
		$scope.viewItemPerPage = $scope.gridOptions.paginationPageSize;
		$scope.gridOptions.minRowsToShow = $scope.gridOptions.paginationPageSize
		//copy all setting of gridOption
		//$scope.gridOptions1  = angular.copy($scope.gridOptions);

		if(!$scope.$$phase)
			$scope.$apply();
		if($(window).width()>=320 && $(window).width()<=768)
			$scope.gridOptions.enableHorizontalScrollbar = 1;
		/*this seting used for product create related product(table)
		*this setting used for cross Crossell Product Related Product Upsell Product.
		*/
		//$scope.crsellGdOption= angular.copy($scope.gridOptions);
		//$scope.upsellGdOption= angular.copy($scope.gridOptions);
		let relflag=true,crsflag=false,upselflag=false;
		// console.log($scope.gridOptions);
		/******This function used for get data from server and assign in table creator variable*****/
		function _getTableListData(url,action ,strflag){
			dataJsonUrl = (_.isUndefined(url) || url ==='')? dataJsonUrl : url;
			salesfactoryData.getData(dataJsonUrl,'GET',action).then((rs)=>{
				let d = rs.data;
				if(typeof d=='undefined' ||  d.length<=0){
					$scope.no_result_found=true; 
					return;
				}
				// console.log('fsdfss sddf dfsdf sdfsdfsd sdf');
				$scope.no_result_found=false;
				$scope.gridOptions.data=[];
				$scope.gridOptions.totalItems = (d.length);
				$scope.gridOptions.data = d;
				$scope.displayTotalNumItems = $scope.gridOptions.data.length;
				$scope.showLoaderTable = false;
				//$scope.crsellGdOption.data = d;
				//$scope.upsellGdOption.data = d;
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}
		    	catch(e){console.log("error: " + e); $scope.showLoaderTable=false;$scope.no_result_found=false;}
			}).finally(()=>{$scope.showLoaderTable = false;}); 
		};
		/******* This function used for Header pagination control********/
		$scope.HeaderPagination = {
			getTotalPages : function() {
				return Math.ceil($scope.gridOptions.totalItems / $scope.gridOptions.PageSize);
			},
			nextPage : function() {
				if ($scope.gridOptions.paginationCurrentPage < this.getTotalPages()) {
					console.log($scope.gridOptions.paginationCurrentPage);
					$scope.gridOptions.paginationCurrentPage++;
				}
			},
			previousPage : function() {
				if ($scope.gridOptions.paginationCurrentPage > 1) {
					$scope.gridOptions.paginationCurrentPage--;
				}
			},
			pageSizeChange : function(num) {
				console.log(num);
				$scope.gridOptions.minRowsToShow = num;
				$scope.viewItemPerPage = num;
				$scope.gridOptions.paginationPageSize = num;
				$scope.gridOptions.PageSize = num;
				//$scope.gridOptions.totalItems = ($scope.salesData.length);
				//$scope.displayTotalNumItems = $scope.gridOptions.data.length;
				// if ($scope.getAllDataFromServerOnce) {
				// 	$scope.gridOptions.paginationPageSize = num;
				// 	$scope.gridOptions.PageSize = num;
				// 	$scope.gridOptions.totalItems = ($scope.salesData.length);
				// 	$scope.displayTotalNumItems = $scope.gridOptions.data.length;
				// } else {
				// 	$scope.showLoaderTable = false;
				// 	var obj = {
				// 		'pageLimit' : num
				// 	};
				// 	// salesfactoryData.getData('admin/users/json', obj).then(function(response) {
				// 	// 	$scope.gridOptions.data = response;
				// 	// 	$scope.gridOptions.totalItems = (response.length);
				// 	// 	$scope.showLoaderTable = false;
				// 	// })
				// }
			}
		};
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
		/*****
		 * This function used for enable tab section.
		 * This function call when you are using tab in table section.
		 * *******/
		$scope.enableTab = function(str,ftInfo) { //related  crossell upsell
			if (str == 'active' || str == 'related') {
				$scope.tabActive = true;
				$scope.tabAll = false;
				$scope.tabFilter = false;
				if(str == 'related'){
					relflag=true; crsflag=false; upselflag=false;
				}
			} else if (str == 'all' || str=='crossell') {
				$scope.tabActive = false;
				$scope.tabAll = true;
				$scope.tabFilter = false;
				if(str=='crossell'){
					relflag=false; crsflag=true; upselflag=false;					
				}
			} else if (str == 'filter' || str=='upsell') {
				if(str=='upsell'){
					relflag=false; crsflag=false; upselflag=true;
					$scope.tabActive = false;
					$scope.tabAll = false;
					$scope.tabFilter = true;
					return false;
				}
				if(typeof ftInfo!=='undefined'){
					let o = {'filter_id' :  ftInfo.id};
					$scope.enableDeleteBtn=true;
					$scope.deleteFtabId = ftInfo.id;
					$scope.filterActionHendler(getsavefilter,o,'act_ftTabClick')
				}else{
					$scope.enableDeleteBtn=false,$scope.ftModel.tgclass = true;
					$scope.ftModel.f_field=[],$scope.ftModel.optModel=[];
					$scope.deleteFtabId=0;$scope.filter_name='';
					$scope.txtAutoSugstModel={},$scope.ftModel.rangeModel={};
					$scope.attrAutoSugstmodel ={};
				} 
				$scope.tabActive = false;
				$scope.tabAll = false;
				$scope.tabFilter = true;
			}
		};
		/*******
		 * This grid Api function to handel All function as per as requirement.
		 * This function used for drag row update database table row position.
		 * Row selection and batch rwo selection.
		 * ********/
		$scope.gridOptions.onRegisterApi = function(gridApi) {
			console.log('grid register');
			$scope.gridApi = gridApi;
			gridApi.draggableRows.on.rowDropped($scope, function(info, dropTarget) {
				//exe
			});
			gridApi.selection.on.rowSelectionChanged($scope, function(row) {
				if($scope.gridApi.selection.getSelectedRows().length >0){
				 	$scope.selBoxActBtn = true;
				 	//console.log('dshj       fghsdf');
				}
				else
					$scope.selBoxActBtn = false;
				console.log($scope.gridApi.selection);
				if(row.isSelected===true){
					if(relflag===true)	prod_id.relatedprod.push(row.entity.id);
					else if(crsflag===true)	prod_id.crossellprod.push(row.entity.id);
					else if(upselflag===true) prod_id.upsellprod.push(row.entity.id);
				}else{
					if(relflag===true) 
						prod_id.relatedprod.splice(prod_id.relatedprod.findIndex(x=>x===row.entity.id),1);
					else if(crsflag===true)	
						prod_id.crossellprod.splice(prod_id.crossellprod.findIndex(x=>x===row.entity.id),1);
					else if(upselflag===true) 
						prod_id.upsellprod.splice(prod_id.upsellprod.findIndex(x=>x===row.entity.id),1);
				}
			});
			gridApi.selection.on.rowSelectionChangedBatch($scope, function() {
				console.log('batch selection change');
				if($scope.gridApi.selection.getSelectedRows().length >0){
					$scope.selBoxActBtn = true;
					let temp = $scope.gridApi.selection.getSelectedRows();
					let temparr =[];
					temp.map((item)=>{
						temparr.push(item.id)
					});
					if(relflag===true)	prod_id.relatedprod=temparr;
					else if(crsflag===true)	prod_id.crossellprod=temparr;
					else if(upselflag===true) prod_id.upsellprod=temparr;
				}
				else
					$scope.selBoxActBtn = false;

			});
			gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize){                             
	            //pageNumberOrPageSizeChanged(pageNumber, pageSize);
	            //console.log('oh me joy');
	        }); 
		};
	
		/******
		 * This function removeSelected and removeSelectedRow used for desleced row and remove selected row.
		 * Where removeSelectedRow clear selection of rows and removeSelectedRow Reomve selected rowfrom grid as well as database Table.
		 * *******/
		$scope.removeSelected = function() {
			$scope.gridApi.selection.clearSelectedRows();
		};
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
		};
	    /*****This function return all selected row data id*****/
	    function createIdArray(dataSet){
	      var idArray=[];
	      angular.forEach(dataSet, function(data, index) {
			idArray.push(data.id);
		  });
		  return idArray;
	    }
	 	/*****
		 * This function used for search data from grid when you are not used searching from server.
		 * Where searchDataFromGrid function call on button click
		 * and searchDataInGrid function used for searching.
		 * ********/
		$scope.searchDataFromGrid = function(resetFlag) {
			resetFlag =  resetFlag || '';
			if(resetFlag==='resetfilter'){
				$rootScope.filedSetModel=[];
				//$scope.gridApi.grid.core.clearAllFilters(undefined, true, undefined);
				// $scope.gridApi.grid.registerRowsProcessor($scope.gridOptions.data, 200);
				// $scope.gridApi.grid.refresh();
				$scope.no_result_found = false;
				return false;
			} 
			$scope.gridApi.grid.registerRowsProcessor($scope.searchDataInGrid, 200);
			$scope.gridApi.grid.refresh();
		};
		$scope.searchDataInGrid = function(renderableRows) {
			var matcher = [];
			angular.forEach($scope.filterDataObj, function(name, index) {
				if (name != 'Please Select...')
					matcher.push(name);
			});
			var matLen = matcher.length,i = 0;
			let totalRow =0;
			renderableRows.forEach(function(row) {
				var match = false;
				$rootScope.filedsSet.forEach(function(field) {
					var temp = '';
					if (i >= matLen)
						i = 0;
					if (matcher[i] != '')
						temp = new RegExp(matcher[i],'i');
						// temp = new RegExp('^' + matcher[i], 'i');

					if (typeof row.entity[field.fieldName]!=='undefined' && field.filterable===true && row.entity[field.fieldName].match(temp)) {
						i++;
						match = true;
					}
				});
				if (!match)
					row.visible = false;
				if(row.visible) totalRow++;
			});
			$scope.displayTotalNumItems = totalRow;
			$scope.no_result_found= (totalRow===0)?true:false;
			return renderableRows;
		};
		/***this function used for select an unselect all column in table**/
		$scope.rowSelectionFun = function(actionname) {
			if (actionname == 'select') {
				$scope.gridApi.selection.selectAllRows();
				$scope.selectItemTotal = $scope.gridOptions.data.length;
			} else if (actionname == 'unselect') {
				$scope.gridApi.selection.clearSelectedRows();
				$scope.selectItemTotal = 0;
			}
		}
		/***** This fnction used for select visible part of table in active section*****/
		$scope.rowVisibleSelectionFun = function(strFlag) {
			if (strFlag == 'visible') {
				$scope.gridApi.selection.selectAllVisibleRows();
				$scope.selectItemTotal = ($scope.gridApi.core.getVisibleRows($scope.gridApi.grid).length);
			} else if (strFlag == 'unVisible') {
				$scope.gridApi.selection.clearSelectedRows();
				$scope.selectItemTotal = 0;
			}
		};
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
		};
		$scope.getTableHeight = function() {
			 var rowHeight = 45; // your row height
			 var headerHeight = 39; // your header height
			 let as = $scope.gridApi.core.getVisibleRows().length;
			 return {
			    height: (as * rowHeight + headerHeight) + "px"
			 };
		};
		//Listen after click on simple and config bundel product button
		$scope._simpleBundelProduct =($event,strflag)=>{
			if($rootScope.tab_enable && $rootScope.tab_enable.enable_bundel_tab === true){
				switch(strflag){
					case "simple" :
						$scope.enableSimple = true;
						$scope.enableConfig = false;
						_getTableListData(simple_product_url,{'page_limit':10,"page_no" :1},'simple'); 
						break;
					case "config" :
						$scope.enableConfig = true;
						$scope.enableSimple = false;
					 	_getTableListData(config_product_url,{"page_limit" : 10,"page_no" : 1},'config');
					 	break;
					default : break;
				}
			}
			$event.preventDefault();
			console.log("ssjhfgfsdf");
		};
		//Listen after select any product from table then get selected and set to list for display
		$scope._saveSelectedPrd_List =($event,strflag)=>{
			$event.stopPropagation();			
			let selectedRow = $scope.gridApi.selection.getSelectedRows();
			if(selectedRow.length >0){
				switch(strflag){
					case "simple":
						let rowid1 = _.map(selectedRow,'id');
						if($rootScope.tab_enable.simple_product_id.length>0){
							rowid1 = _.difference(rowid1,$rootScope.tab_enable.simple_product_id);
							$rootScope.tab_enable.simple_product_id = $rootScope.tab_enable.simple_product_id.concat(rowid1);
						}else{
							$rootScope.tab_enable.simple_product_id = $rootScope.tab_enable.simple_product_id.concat(rowid1);
						}
						salesfactoryData.getData(get_simple_prd_url,'POST',$rootScope.tab_enable.simple_product_id)
						.then((r)=>{
							if(!_.isUndefined(r.data) && r.data.length>0){
								$scope.simplePrdData = r.data;
							}
						},(error)=>console.log);
						$('#addsimpleproduct').modal('hide');
						break;
					case "config":
						let rowid = _.map(selectedRow,'id');
						if($rootScope.tab_enable.config_product_id.length>0){
							rowid = _.difference(rowid,$rootScope.tab_enable.config_product_id);
							$rootScope.tab_enable.config_product_id = $rootScope.tab_enable.config_product_id.concat(rowid);
						}else{
							$rootScope.tab_enable.config_product_id = $rootScope.tab_enable.config_product_id.concat(rowid);
						}

						salesfactoryData.getData(get_config_prd_url,'POST',$rootScope.tab_enable.config_product_id)
						.then((r)=>{
							if(!_.isUndefined(r.data) && r.data.length>0){
								$scope.configPrdData = r.data;								
							}
						},(error)=>console.log);
						$('#addconfigproduct').modal('hide');
						break;
				};
			}else{
				alert('Please select row first','waring');
				$('#addsimpleproduct').modal('hide');
			}

		};
	};
	function _modalCloseHandler($rootScope){
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) {
				console.log();
			}
		};
	};
	//simpleProductList directive
	//{event:$event},{item : item},{index : $index
	function simpleProductList($compile,$rootScope){
		return {
			restrict: 'E',
			scope :{
				productData : '=',
			},
			templateUrl : simple_bundel_prd_HtmlUrl,
			link: function (scope, iElement, iAttrs) {
				scope.removeSimpleProd =($event,item,index)=>{
					$event.stopPropagation();
					let ind = _.indexOf($rootScope.tab_enable.simple_product_id[item.id]);
					if(ind!= -1){
						$rootScope.tab_enable.simple_product_id.splice(ind,1);
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
				$scope.removeConfigProd=($event,prd_val,prd_key)=>{
					let main_prd_id = _.map(prd_val.main_product_detail,'id');
					if(!_.isUndefined(main_prd_id) && main_prd_id.length>0){
						for(i in main_prd_id){
							let ind = _.indexOf($rootScope.tab_enable.config_product_id[main_prd_id[i]]);
							$rootScope.tab_enable.config_product_id.splice(ind,1);
						}
					}
					$scope.productData.splice(prd_key,1);
					$event.stopPropagation();
				}
			},	
		};
	};
	angular.module('sabinaAdminApp').directive('closeBtnModal', _modalCloseHandler);
	angular.module('sabinaAdminApp').controller('bundelGridCtrl', ctrlHendler);
	angular.module('sabinaAdminApp').directive('simpleProductDir',simpleProductList);
	angular.module('sabinaAdminApp').directive('configProductDir',configProductList);

	/*****
	*@This section used to manage related product in both case product create and bundel product create
	*@Controller name : relatedPrdCtrl
	*@Template :  product_related_product (blade file)
	*@Date : 02 dec 2017
	*@Description : Manage all up sale,cross sale and related sale product
	*****/
	function relatedPrdGridHandler($scope,$rootScope,uiGridConstants,salesfactoryData){
		//All table related setting section
		//@related crossell upsell
		//@gridOptions : (object)
		//Controller used as vm;
		var vm = this;
		// active used for  related , all uesd for crossell and  tab_filter for  upsell
		vm.tab = {
			'active' :  true,
			'all' : false,
			'filter' : false,
		};
		/*******
		*Default config for all comman setting 
		*@tableFilterConfig :Filter button table,@tableFilterContainer : table filter container @tableSelectBtnConfig : select button
		*@tableHeaderPaginationConfig  : headre section pagination, @showLoaderTable :enable disable loader
		*@no_result_found :no result found,@errorInfoLog
		********/
		vm.tableFilterConfig = (typeof tableConfig.filter !=='undefined')? tableConfig.filter : false;
		vm.tableFilterContainer = false;
		vm.tableSelectBtnConfig =(typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : false;
		vm.tableHeaderPaginationConfig = showHeadrePagination;
		vm.showLoaderTable = false;
		vm.no_result_found=false;
		vm.errorInfoLog ='<div class="no-info-blank"><h3><i class="icon-doc"></i> You have no information </h3></div>';
		vm.displayTotalNumItems=0;

		//grid table initialization
		//@gridOptions  : type object
		vm.gridOptions = {};
		vm.gridOptions = {
			columnDefs : columsSetting,
			enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
			enableHorizontalScrollbar : uiGridConstants.scrollbars.WHEN_NEEDED,
			rowTemplate : '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
			onRegisterApi : function(gridApi) {
				vm.gridApi = gridApi;
			}
		};
		vm.gridOptions.paginationPageSizes = [];
		vm.gridOptions.paginationPageSizes = pagination;
		vm.gridOptions.paginationPageSize = pagination[0];
		vm.gridOptions.PageSize = vm.gridOptions.paginationPageSize;
		vm.viewItemPerPage = vm.gridOptions.paginationPageSize;
		vm.gridOptions.minRowsToShow = vm.gridOptions.paginationPageSize
		console.log(vm.gridOptions.minRowsToShow);
		// get data from sever
		vm._getTableListData = (str,type,page)=>{
			//service param
			let obj ={
				"page"  : (typeof page!=="undefined" && page!='') ? page : 1,
				"action_type" :  (typeof type!=="undefined" && type!='') ? type : "active_product",
			};
			salesfactoryData.getData(dataJsonUrl,'GET',obj)
			.then(
				(resp)=>{
					let tableData = resp.data;
					if(angular.isArray(tableData.data) && tableData.data.length>0){
						vm.gridOptions.totalItems = tableData.total;
						vm.gridOptions.data = tableData.data;
						vm.showLoaderTable = false;
						// vm.displayTotalNumItems = 20;
					}else{
						vm.no_result_found=false;
					}
				},
				(error)=>{
					//
				}
			).finally(()=>{vm.showLoaderTable = false;});

		};
		vm._getTableListData();
		/*****
		 * This function used for enable tab section.
		 * This function call when you are using tab in table section.
		 * *******/
		vm.enableTab = function(str,ftInfo) { 
			angular.forEach(vm.tab,(item,key)=>{
				if(key=== str){
					vm.tab[key] = true;
				}else{
					vm.tab[key] = false;
				}
			});
			console.log(vm.gridOptions.totalItems);
		};
		//Listen on click on next footer pagination
		vm.clickOnNext = function(page){
			vm.showLoaderTable=true;
			vm._getTableListData('','',page);
        };
        /*******
		 * This grid Api function to handel All function as per as requirement.
		 * This function used for drag row update database table row position.
		 * Row selection and batch rwo selection.
		 * ********/
		vm.gridOptions.onRegisterApi = function(gridApi) {
			console.log('grid register');
			vm.gridApi = gridApi;
			gridApi.draggableRows.on.rowDropped($scope, function(info, dropTarget) {
				//exe
			});
			gridApi.selection.on.rowSelectionChanged($scope, function(row) {
				if(row.isSelected===true){
					// active used for  related , all uesd for crossell and  tab_filter for  upsell
					if(vm.tab['active']===true) $rootScope.tab_enable.related_product_id_id.push(row.entity.id);
					else if(vm.tab['all']===true)	$rootScope.tab_enable.cross_sale_product_id.push(row.entity.id);
					else if(vm.tab['filter']===true) $rootScope.tab_enable.up_sale_product_id.push(row.entity.id);
				}else{
					if(tab['active']===true) 
						$rootScope.tab_enable.related_product_id_id.splice($rootScope.tab_enable.related_product_id_id.findIndex(x=>x===row.entity.id),1);
					else if(tab['all']===true)	
						$rootScope.tab_enable.cross_sale_product_id.splice($rootScope.tab_enable.cross_sale_product_id.findIndex(x=>x===row.entity.id),1);
					else if(tab['filter']===true) 
						$rootScope.tab_enable.up_sale_product_id.splice($rootScope.tab_enable.up_sale_product_id.findIndex(x=>x===row.entity.id),1);
				}
			});
			gridApi.selection.on.rowSelectionChangedBatch($scope, function() {
				if(vm.gridApi.selection.getSelectedRows().length >0){
					let temp_id =[];
					temp_id  = _.map(vm.gridApi.selection.getSelectedRows(),'id');
					if(vm.tab['active']===true)	
						$rootScope.tab_enable.related_product_id_id= $rootScope.tab_enable.related_product_id_id.concat(temp_id);
					else if(vm.tab['all']===true)
						$rootScope.tab_enable.cross_sale_product_id = $rootScope.tab_enable.cross_sale_product_id.concat(temp_id);
					else if(vm.tab['filter']===true) 
						$rootScope.tab_enable.up_sale_product_id=$rootScope.tab_enable.up_sale_product_id.concat(temp_id);
				}else{
					if(vm.tab['active']===true)	
						$rootScope.tab_enable.related_product_id_id= [];
					else if(vm.tab['all']===true)
						$rootScope.tab_enable.cross_sale_product_id = [];
					else if(vm.tab['filter']===true) 
						$rootScope.tab_enable.up_sale_product_id=[];
				}
			});
			gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize){                             
	            //pageNumberOrPageSizeChanged(pageNumber, pageSize);
	            //console.log('oh me joy');
	        }); 
		};
        //Grid layout manage function
        //This function used to display sequence number of row in table
		$scope.seqNumber = function(row) {
		    let rowIndex = -1;
		    let hash = row.entity.$$hashKey;
		    let data = vm.gridOptions.data; 
		    for (let ndx = 0; ndx < data.length; ndx++) {
		        if (data[ndx].$$hashKey == hash) {
		            rowIndex = ndx;
		            break;
		        }
		    }
		    return rowIndex;
		};
		//Manage table height
		vm.getTableHeight = function() {
			 var rowHeight = 45; // your row height
			 var headerHeight = 39; // your header height
			 let as = vm.gridApi.core.getVisibleRows().length;
			 return {
			    height: (as * rowHeight + headerHeight) + "px"
			 };
		};

	};
	angular.module('sabinaAdminApp').controller('relatedPrdCtrl',relatedPrdGridHandler);
}).call(this);