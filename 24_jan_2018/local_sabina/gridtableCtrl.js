(function(angular,undefined){
	//THIS CONTYROLLER UDEF OR PRODUCT LISTING 
	"used strict";
	function ctrlHendler($scope,$timeout,$window,$sce,$rootScope,salesfactoryData,uiGridConstants){
		//$scope.pageName=pageName;
		$scope.addtableRowData = {};
		$scope.displayTotalNumItems = 0,$scope.selectItemTotal=0;
		$scope.filterDataObj = {};
 		//configration of filter button table
		$scope.tableFilterConfig = (tableConfig.filter !==undefined)? tableConfig.filter : false;
		//hide show table filter container
		$scope.tableFilterContainer = false;
		//This variable used for select button config section 
		$scope.tableSelectBtnConfig =(tableConfig.chk_action !==undefined)? tableConfig.chk_action : false;
		//This variable used for headre section pagination config
		$scope.tableHeaderPaginationConfig = showHeadrePagination;
		//this variable used for add row config
		$scope.addrowConfig = true;
		$scope.showLoaderTable = true;
		//enable/disable action buttion
		$scope.action_btn_enable = false;
		/******This variable used for get all data from server at a time ******/
		$scope.getAllDataFromServerOnce = true;//getAllDataFromServerOnce;
	    $scope.tabActive = true;
		$scope.tabAll = false;
		$scope.tabFilter = false;
		$scope.dragEnable = true;
	 	$scope.gridOptions = {}; 
	 	$scope.no_result_found=false;
		$scope.errorInfoLog ='<div class="no-info-blank"><h3><i class="icon-doc"></i> You have no information </h3></div>';
		$scope.tableLoaderImgUrl = tableLoaderImgUrl;
		//grid table initialization
		//@gridOptions  : type object
		$scope.gridOptions = {
			columnDefs : columsSetting,
			enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
			enableHorizontalScrollbar : uiGridConstants.scrollbars.WHEN_NEEDED,
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
		
		//This section used for get page view data from gloabl variable(paination setting).
		$scope.gridOptions.paginationPageSizes = getPaginationData("getpagination");
		$scope.gridOptions.paginationPageSize = getPaginationData("per_page_limt");
		$scope.gridOptions.PageSize = $scope.gridOptions.paginationPageSize;
		$scope.viewItemPerPage = $scope.gridOptions.paginationPageSize;
		$scope.gridOptions.minRowsToShow = $scope.gridOptions.paginationPageSize;	

		//Enable scroll bar of table in case of mobile device view
		if($(window).width()>=320 && $(window).width()<=768)
			$scope.gridOptions.enableHorizontalScrollbar = 1;
			
		/*
		*This function used for get data from server and assign in table creator variable
		* @param url : action url
		* @param type : active | all | filter data 
		* @param page : number (1,2)
		* @param per_page : number (10,20)
		* @param : object (filter data)
		*/
		function _getTableListData(url,type,page,per_page,filter_obj){
			let obj ={
				"page"  : (page!==undefined && page) ? page : 1,
				"action_type" :  (type!==undefined && type!='') ? type : "active_product",
				"per_page" : (per_page!==undefined && per_page) ?  per_page : $scope.gridOptions.PageSize,
			};
			//In case filter 
			if(filter_obj!==undefined && !isEmpty(filter_obj)){
				//console.log(filter_obj)
				angular.extend(obj, filter_obj);				
			}
			//In case of customer report section if have custermor email
			//console.log(typeof order_email);
			if(typeof order_email!="undefined"){
				//console.log(order_email);
				obj["email"] = order_email;
			}

			dataJsonUrl = (angular.isUndefined(url) || url ==='')? dataJsonUrl : url;

			salesfactoryData.getData(dataJsonUrl,'GET',obj).then((rs)=>{
				let d = rs.data;

				//In case if response data not undefined and data is array
				if(!angular.isUndefined(d.data) && angular.isArray(d.data)){
					if(d.data.length<=0){
						$scope.no_result_found=true; 
					}else{
						$scope.no_result_found=false;
					}

					$scope.gridOptions.totalItems = (d.total);
					$scope.gridOptions.data = d.data;
					$scope.displayTotalNumItems = d.total;
					$scope.showLoaderTable = false;
				}else{
					//In case response data is empty string
					$scope.gridOptions.totalItems = 0;
					$scope.gridOptions.data = [];
					$scope.displayTotalNumItems = 0;
					$scope.no_result_found=true;
					$scope.showLoaderTable = false;
				}							
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}
		    	catch(e){console.log("error: " + e); $scope.showLoaderTable=false;$scope.no_result_found=false;}
			}).finally(()=>{
				$scope.showLoaderTable = false;
			}); 
		};
		//Listen on controller load 
		_getTableListData('','',1,$scope.gridOptions.PageSize);
		
		//This function used for Header pagination control
		$scope.HeaderPagination = {
			getTotalPages : function() {
				return Math.ceil($scope.gridOptions.totalItems / $scope.gridOptions.PageSize);
			},
			nextPage : function() {
				if ($scope.gridOptions.paginationCurrentPage < this.getTotalPages()) {
					$scope.gridOptions.paginationCurrentPage++;
					$scope.showLoaderTable = true;
					_getTableListData('','',$scope.gridOptions.paginationCurrentPage,$scope.gridOptions.PageSize, $scope.filterDataObj);
				}
			},
			previousPage : function() {
				if ($scope.gridOptions.paginationCurrentPage > 1) {
					$scope.gridOptions.paginationCurrentPage--;
					$scope.showLoaderTable = true;
					_getTableListData('','',$scope.gridOptions.paginationCurrentPage,$scope.gridOptions.PageSize, $scope.filterDataObj);
				}
			},
			pageSizeChange : function(num) {
				$scope.showLoaderTable = true;
				_getTableListData('','',$scope.gridOptions.paginationCurrentPage, num, $scope.filterDataObj);
				$scope.gridOptions.minRowsToShow = num;
				$scope.viewItemPerPage = num;
				$scope.gridOptions.paginationPageSize = num;
				$scope.gridOptions.PageSize = num;				
			}
		};

		/****
		*Listen on click on next footer pagination
		*@url : service url
		*@type : product type(ex. related , upsell etc)
		*@page : page number 
		*@prd_type_flag : which tab is enable like simple,config and related product 
		*****/
		$scope.clickOnNext = function(page){
			$scope.showLoaderTable=true;
			_getTableListData('', '', page,$scope.gridOptions.PageSize, $scope.filterDataObj);				
        };

		//This function used to display sequence number of row in table
		$scope.seqNumber = function(row) {
			let rowIndex = -1;
		    let hash = row.entity.$$hashKey;
		    let data = $scope.gridOptions.data; 
		    let indx_page = ($scope.gridOptions.paginationCurrentPage -1)*$scope.gridOptions.PageSize;
		    
		    for (let ndx = 0; ndx < data.length; ndx++) {
		        if (data[ndx].$$hashKey == hash) {
		            rowIndex = ndx+indx_page;
		            break;
		        }
		    }
		    return rowIndex;
		};

		/*****
		 * This function used for search data from grid when you are not used searching from server.
		 * Where searchDataFromGrid function call on button click
		 * and searchDataInGrid function used for searching.
		 * ********/
		$scope.searchDataFromGrid = function(resetFlag) {
			resetFlag =  resetFlag || '';
			if(resetFlag==='resetfilter'){
				//empty model
				angular.forEach($rootScope.filedSetModel, (item,index)=>{
					if(item.key!==undefined){
						$rootScope.filedSetModel[index] = {"key": "","value" : "Please Select"};						
					}else{
						if(item.name!==undefined){
							$rootScope.filedSetModel[index].name = null;	
						}else if(item.from!==undefined){
							$rootScope.filedSetModel[index].from = null;
						}else if(item.to!==undefined){
							$rootScope.filedSetModel[index].to = null;
						}						
					}					
				});
				//empty filter object
				for (var prop in $scope.filterDataObj) {
                    if ($scope.filterDataObj.hasOwnProperty(prop)) {
                        delete $scope.filterDataObj[prop];
                    }
                } 

                $scope.showLoaderTable = true;
                _getTableListData(dataJsonUrl, '', $scope.gridOptions.paginationCurrentPage, $scope.gridOptions.PageSize, $scope.filterDataObj);               
			}else{
				$scope.searchDataInGrid();
			}

			$scope.gridApi.grid.refresh();
		};

		$scope.searchDataInGrid = function(renderableRows) {
			var matcher = [];
			angular.forEach($scope.filterDataObj, function(name, index) {
				if (name != 'Please Select...')
					matcher.push(name);
			});
			console.log("rootscope");
			console.log($rootScope.filedSetModel)
			//search when search attribute not empty
            if (!isEmpty($scope.filterDataObj)) {
                $scope.showLoaderTable = true;
                _getTableListData(dataJsonUrl, '', $scope.gridOptions.paginationCurrentPage, $scope.gridOptions.PageSize, $scope.filterDataObj);
            }
		};

		/*****
		 * This function used for enable tab section.
		 * This function call when you are using tab in table section.
		 * *******/
		$scope.enableTab = function(str,ftInfo) {
			if (str == 'active') {
				$scope.tabActive = true;
				$scope.tabAll = false;
				$scope.tabFilter = false;				
			} else if (str == 'all') {
				$scope.tabActive = false;
				$scope.tabAll = true;
				$scope.tabFilter = false;				
			} else if (str == 'filter') {				
				if(ftInfo!==undefined){
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
				if($scope.gridApi.selection.getSelectedRows().length >0){
				 	$scope.selBoxActBtn = true;
				 	console.log('dshj       fghsdf');
				}
				else
					$scope.selBoxActBtn = false;

				if(row.isSelected===true){
					//
				}else{
					//
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
				}
				else
					$scope.selBoxActBtn = false;

			});
			gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize){                             
	            //pageNumberOrPageSizeChanged(pageNumber, pageSize);
	            //console.log('oh me joy');
	        }); 
		};
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

			var rt = false;
			switch(actName){
				case 'delete' :
					if(confirm("Are you sure you want to delete this?")){
						console.log('fg g h dfd');
						rt=true;
						// salesfactoryData.getData(actUrl,'POST',dataObj).then(function(response) {
						//      var index = $scope.gridOptions.data.indexOf(tempRow.entity);
						// 	 $scope.gridOptions.data.splice(index, 1);
						// })
					}else rt= false;
				break;
				case 'change_status' :
					salesfactoryData.getData(actUrl,'POST',dataObj).then(function(response) {
						console.log(response);
						tempRow.entity.register_step = response.data;
					});
				break;
			}
		   return rt;
		};


		//Listen on clear selection of rows
		$scope.removeSelected = function() {
			$scope.gridApi.selection.clearSelectedRows();
		};

		/*
		*removeSelectedRow Reomve selected rowfrom grid as well as database Table.
		*@param : row (object | optional)
		*/
		$scope.removeSelectedRow = function(row) {
			var idArr = [];

			//In case if row selection check box is enable
			if (typeof $scope.gridApi.selection.getSelectedRows() != 'undefined' && $scope.gridApi.selection.getSelectedRows().length > 0) {
				if (confirm("Are you sure you want to delete this?")) {
					let selectedRowsData = $scope.gridApi.selection.getSelectedRows();
					if(angular.isArray(selectedRowsData) && selectedRowsData.length>0){
						//console.log(getId(selectedRowsData));
					}
					angular.forEach($scope.gridApi.selection.getSelectedRows(), function(data, index) {
						$scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
						idArr.push(data.id);
					});
					var idObj = {
						"id" : idArr,
					};
					salesfactoryData.getData(removeRowUrl,"POST", idObj);
				}
			}else if(!$scope.tableSelectBtnConfig){
				// In case row selection check box is not enable but delete action id define
				if(confirm("Are you sure you want to delete this?")){
					let obj ={
						id  : row.entity.delete_id, 
					};
					$scope.showLoaderTable = true;
					deleteRow(removeRowUrl,obj,'wihout_selection');
				}
				

				
			}else {
				alert('Please select at least one check box');	
			}			
		};
		//Listen on delete data from table 
		function deleteRow(url,obj){
			salesfactoryData.getData(url,'POST',obj)
			.then((resp)=>{
				if(resp.data.status!= undefined && (resp.data.status==true || resp.data.status =="success")){
					// wihout_selection
					$scope.showLoaderTable = false;
				}else{
					$scope.showLoaderTable = false;
				}
			},(error)=>{
				$scope.showLoaderTable = false;
				_errorHandler();
			})
			.finally(()=>{
				console.log;
			})
		}

		/********
		* This both actionOnDataGrid and actionBtnClick function used for Action on Grid Data Like Delete ,Enable and Disable etc 
		* This perform after data is selected if not selected then not perform any action.
		********/
		 $scope.actioOptions = [
	        {id: 0, name: '---Action---'},
	        {id: 1, name: 'Enable'},
	        {id: 2, name: 'Disable'},
	        // {id: 3, name: 'Delete'},
	    ];
	    $scope.actionSelectBox = $scope.actioOptions[0];
	    $scope.actionOnDataGrid = function(){
	    	var name = $scope.actionSelectBox.name;
	    	if(name=='---Action---'){
	    		alert('Please any action');
	    		$scope.selBoxActBtn = false;
	    	}else if(name == 'Enable' || name=='Disable' || name=='Delete'){
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
	       var result =  getId(DataSet);
	       if($scope.gridApi.selection.getSelectedRows().length >0){
		       switch(name){
					case 'Delete' :
						if (confirm("Are you sure you want to delete this?")) {
							var obj = {
							 "datasetid" : result,
							 "actionname" : name
							};
							$scope.showLoaderTable = true;
							salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
								angular.forEach(DataSet, function(data, index) {
									$scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
								});
							   $scope.selBoxActBtn = false;  
							}).finally(()=>{$scope.showLoaderTable = false;});
						}
						break;
					case 'Enable' : 
						var obj = {
						 "datasetid" : result,
						 "actionname" : name
						};
						$scope.showLoaderTable = true;
						salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
							angular.forEach(DataSet, function(data, index) {
								var ind = $scope.gridOptions.data.indexOf(data);
								var tempRow = $scope.gridApi.grid.rows[ind];
								tempRow.entity.status = 1;//"Enabled";
								$scope.gridApi.selection.clearSelectedRows();
								$scope.gridApi.grid.refresh();
							});
							$scope.showLoaderTable = false;
						}).finally(()=>{$scope.showLoaderTable = false;});
					   break;
					case  'Disable' :
						var obj = {
						 "datasetid" : result,
						 "actionname" : name
						};
						$scope.showLoaderTable = true;
						salesfactoryData.getData(actionUrl,'POST',obj).then(function(resp){
							angular.forEach(DataSet, function(data, index) {
								var ind = $scope.gridOptions.data.indexOf(data);
								var tempRow = $scope.gridApi.grid.rows[ind];
								tempRow.entity.status = 0;//"Disabled";
								$scope.gridApi.selection.clearSelectedRows();
								$scope.gridApi.grid.refresh();
							});
							$scope.showLoaderTable = false;
						}).finally(()=>{$scope.showLoaderTable = false;});
					 break;
					default :
						alert('select any action first');
						break;
				}
	       }else{
	       	$scope.selBoxActBtn = false;
	    	alert('Please select row first');
	       }
	    };

	    /*
	    *This function return all selected row data id
	    *@param : array (data set)
	    */	   
	    function getId(dataSet){
	      var idArray =[];
	      console.log(dataSet);
	      angular.forEach(dataSet, function(data, index) {
	      	console.log(data);
			idArray.push(data.id);
		  });
		  return idArray;
	    }

	    
	 	
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
		// $scope.textChangeFunction = function(str, $event) {
		// 	var currentVal = $event.target.value;
		// 	if (currentVal !== 'undefined'){
		// 		$scope.filterDataObj[str] = currentVal;
		// 	}
		// }
		
		/*****this function used get select box value from filter section*****/
		// $scope.filterSelectBoxChange = function(selectedOption, strName) {
		// 	if (selectedOption.value !== ' ' ||  selectedOption.value !== undefined)
		// 		$scope.filterDataObj[strName] = selectedOption.value;
		// }

		//Listen on calculate table hieight dynamically
		$scope.getTableHeight = function() {
			 var rowHeight = 45; // your row height
			 var headerHeight = 39; // your header height
			 let as = $scope.gridApi.core.getVisibleRows().length;
			 return {
			    height: (as * rowHeight + headerHeight) + "px"
			 };
		};


		$scope.hideItem =function(e){
			angular.forEach($scope.Type,function(v,k){
				if(k==e){
					$scope.Type[k]=false;
				}
			});
		};




		$scope.getFilterData = function(filterData){
			$scope.FilterTab=filterData;
		};



		//Delete Filter Tab
		$scope.deleteFilterTab = function(langCode,id){
			$scope.dataObj={'id':id};
			salesfactoryData.getData(langCode+'/admin/newsletter/deletefiltertab','POST',$scope.dataObj).then(function(response) {
				location.href=langCode+"/admin/newsletter/subscriberlist";

			})
		};



		/*
		 *@Author: Pradeep Kumar
		 *@Description: To Get the data For Newletter Filter
		 */
		 $scope.filterTab='';
		 $scope.listType='';
		 $scope.attrData=[];
		 $scope.createFilterTab  = function(e){
		 	angular.forEach($scope.newsletterAttr,function(v,k){
		 		var value=$('#input_'+v.id).val();
		 		var tkey = v.id;
		 		var temp = {};
		 		temp[tkey] = value;
		 		$scope.attrData.push(temp);
		 	});
		 	console.log($scope.attrData);
			var disable = 0;
			var enable  = 0;
			var register  = 0;
			var guest  = 0;
		 	//Get the Status of the status and user type for checkbox
		 	if($('#fancy-checkbox-success').hasClass('ng-not-empty')){
		 		var enable = 1;
		 	}else{
		 		var enable = 0;
		 	}
			if($('#fancy-checkbox-danger').hasClass('ng-not-empty')){
		 		var disable = 1;
		 	}else{
		 		var disable = 0;
		 	}

		 	if($('#fancy-checkbox-warning').hasClass('ng-not-empty')){
		 		var register = 1;
		 	}else{
		 		var register = 0;
		 	}
			if($('#fancy-checkbox-info').hasClass('ng-not-empty')){
		 		var guest = 1;
		 	}else{
		 		var guest = 0;
		 	}

		 	$scope.Attr=[];
		 	$('.attrDynamic').each(function(e){
		 		var id =$(this).attr('id');
		 		var idArr=id.split('_');
		 		var idNumber=idArr[1];
		 		var value = $('#'+id).val();
		 		var temp = {};
		 		temp[idNumber] = value;
		 		$scope.Attr.push(temp);
		 	});



		 	$scope.statusObj={'enable':enable,'disable':disable};
		 	$scope.registerObj={'register':register,'guest':guest};

		 	$scope.dataObj={'tabName':$scope.FilterTab.tabTitle,'data':$scope.FilterTab,'attrData':$scope.attrData,'statusAttr':$scope.statusObj,'registerAttr':$scope.registerObj,'Attr':$scope.Attr};
		 	$scope.attrData=[];
		 	salesfactoryData.getData(e+'/admin/newsletter/createtab','POST',$scope.dataObj).then(function(response) {
				location.href=e+"/admin/newsletter/subscriberlist";

			})
		 };

		 $scope.filterData="";
		 $scope.getFilterResult = function(langCode,id){
		 	salesfactoryData.getData(langCode+'/admin/newsletter/subscriberlisting/'+id,'GET','').then(function(response) {
		 		$scope.filterData=response.data;
		 		$('.resultSet').hide();
		 		$('#filterResultTab_'+id).fadeIn();
			})
		 };




		 //Update Filter Tab Here
		 $scope.updateFilterTab = function(langCode,id){
		 	$scope.updateData=[];
		 	var disable = 0;
			var enable  = 0;
			var register  = 0;
			var guest  = 0;
		 	
		 	var filterName = $('#filterName_'+id).val();
		 	// $scope.updateData.push({'filterName':filterName});

		 	var filteremail = $('#filteremail_'+id).val();
		 	// $scope.updateData.push({'filteremail':filteremail});


		 	if($('#fancy-checkbox-success_'+id).is(":checked")) {
		 		var enable = 1;
    		}else{
    			var enable = 0;
    		}


    		if ($('#fancy-checkbox-danger_'+id).is(":checked")) {
		 		var disable = 1;
    		}else{
    			var disable = 0;
    		}

    		if($('#fancy-checkbox-warning_'+id).is(':checked')){
		 		var register = 1;
		 	}else{
		 		var register = 0;
		 	}

			if($('#fancy-checkbox-info_'+id).is(':checked')){
		 		var guest = 1;
		 	}else{
		 		var guest = 0;
		 	}

			$scope.statusObj={'enable':enable,'disable':disable};
			// $scope.updateData.push({'statusObj':$scope.statusObj});


		 	$scope.registerObj={'register':register,'guest':guest};
		 	// $scope.updateData.push({'registerObj':$scope.registerObj});

		 	var grandTotalFrom = $('#grandTotalFrom_'+id).val();
		 	var grandTotalTo = $('#grandTotalTo_'+id).val();
		 	// $scope.updateData.push({'grandTotalFrom':grandTotalFrom});
		 	// $scope.updateData.push({'grandTotalTo':grandTotalTo});


		 	var datetimepicker1 = $('#datetimepicker1_'+id).val();
		 	var datetimepicker2 = $('#datetimepicker2_'+id).val();
		 	// $scope.updateData.push({'datetimepicker1':datetimepicker1});
		 	// $scope.updateData.push({'datetimepicker2':datetimepicker2});


		 	//Getting Dynamic Attr
		 	$scope.Attr=[];
		 	$('.attrDynamic_'+id).each(function(e){
		 		var id =$(this).attr('id');
		 		var idArr=id.split('_');
		 		var idNumber=idArr[1];
		 		var value = $('#'+id).val();
		 		var temp = {};
		 		temp[idNumber] = value;
		 		$scope.Attr.push(temp);
		 	});
		 	// console.log($scope.Attr);
			$scope.dataObj={'tabTitle':filterName,'listType':id,'userGroupType':'','filteremail':filteremail,'grandTotalFrom':grandTotalFrom,'grandTotalTo':grandTotalTo,'filterdobfrom':datetimepicker1,'filterdobto':datetimepicker2,'Attr':'','statusAttr':{'enable':enable,'disable':disable},'registerAttr':{'register':register,'guest':guest},'Attr':$scope.Attr};
			$scope.Attr=[];
		  	salesfactoryData.getData(langCode+'/admin/newsletter/updatefiltertab','POST',$scope.dataObj).then(function(response) {
				//location.href=e+"/admin/newsletter/subscriberlist";
				if(response.data.success==true){
					$("#msg").show();
					alert('Filter Tab Updated');
					$("#msg").html(response.data.message);
				}

			})
		 };



		 $scope.newsletterAttr={};
		 $scope.getNewsletterAttributeList = function(e){
		 	salesfactoryData.getData(e+'/admin/newsletter/newsletterattrlits', 'GET','').then(function(res) {
		 		$scope.newsletterAttr=res.data;
		 		angular.forEach(res.data,function(v,k){
		 			// $scope.TypeModel[0]={'attr_model':'model_'+v.id};
		 			 // scope.Type.psuh({v.id:v->name});
		 		});
		 		// alert($scope.newsletterAttr);
		 		console.log($scope.TypeModel);
		 	});
		 };


		 $scope.TypeModel=[
			 	{
			 		'registersBtn':false,
			 		'statusBtn':false,
			 		'filteremailText':false,
			 		'filterDateText':false,
			 		'userGroupFlag':false,
			 		'grandTotal':false,
			 		'status':{'enabled':false,'disabled':false}
			 	}
		 	];


		 $scope.Type={
		 	'registersBtn':false,
		 	'statusBtn':false,
		 	'filteremailText':false,
		 	'filterDateText':false,
		 	'userGroupFlag':false,
		 	'grandTotal':false,
		 	'status':{'enabled':false,'disabled':false}
		 };



		 $scope.FilterTab={};
		 $scope.dynamicAttr=[];

          $scope.getListTypeFileds = function(e){
          	//if($scope.newsletterAttr.length==0){
          		$scope.getNewsletterAttributeList('en');
          	//}

  		 	if($scope.FilterTab.listType=='status'){
		 		$scope.Type.statusBtn = true;
		 	}

		 	if($scope.FilterTab.listType=='register'){
		 		$scope.Type.registersBtn = true;
		 	}

		 	if($scope.FilterTab.listType=='userGroup'){
		 		$scope.Type.userGroupFlag = true;
		 	}
		 	if($scope.FilterTab.listType=='email'){
				 $scope.Type.filteremailText = true;
		 	}

		 	if($scope.FilterTab.listType=='DOB'){
		 		$scope.Type.filterDateText = true;
		 	}

		 	if($scope.FilterTab.listType=='grandTotal'){
				 $scope.Type.grandTotal = true;
		 	}

		 	if($scope.FilterTab.listType>0){
		 		$('#attr_'+$scope.FilterTab.listType).show();
		 		//var value=$('#input_'+$scope.FilterTab.listType).val();
		 		//var tkey = 'attr_'+$scope.FilterTab.listType;
		 		//var temp = {};
		 		//temp[tkey] = value;
		 		//$scope.dynamicAttr.push(temp);

		 	}else{
		 		//
		 	}
		 };

		// if($scope.pageName=='subscriberlisting'){
		// 	 $scope.getNewsletterAttributeList('en');
		// }

	};
	angular.module('sabinaAdminApp').controller('gridtableCtrl', ctrlHendler);

	  //error handler function
    function _errorHandler(errMsg) {
        console.log('hi??');
        try {
            throw new Error("Something went badly wrong!");
        } catch (e) {
            console.log("Opps " + e)
            // swal('Oops...',e,'error');
            console.log("Opps " + e)
        };
    };
    //Listen on check object is empty or not
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    
})(window.angular);

