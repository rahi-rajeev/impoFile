try{fieldSetJson;}catch(e){
	if(e instanceof ReferenceError){
		window.fieldSetJson = '';
	}
};
var tableConfig = (typeof fieldSetJson.tableConfig!=='undefined') ? fieldSetJson.tableConfig[0] : '';
"use strict";
(function() {
    angular.module('sabinaAdminApp', ['jsonseivice','ui.grid','ui.grid.pagination','ui.grid.resizeColumns','ui.grid.selection','ui.grid.moveColumns','ui.grid.autoResize','ui.tree','ui.grid.draggable-rows','tableDepDir','ngTagsInput','ui.bootstrap.datetimepicker','ngDroplet','dndLists','froala'], function($httpProvider, $interpolateProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		var param = function(obj) {
			var query = '',
			    name,
			    value,
			    fullSubName,
			    subName,
			    subValue,
			    innerObj,
			    i;
			for (name in obj) {
				value = obj[name];
				if ( value instanceof Array) {
					for ( i = 0; i < value.length; ++i) {
						subValue = value[i];
						fullSubName = name + '[' + i + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if ( value instanceof Object) {
					for (subName in value) {
						subValue = value[subName];
						fullSubName = name + '[' + subName + ']';
						innerObj = {};
						innerObj[fullSubName] = subValue;
						query += param(innerObj) + '&';
					}
				} else if (value !== undefined && value !== null) {
					query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
				}
			}
			return query.length ? query.substr(0, query.length - 1) : query;
		};
		$httpProvider.defaults.transformRequest = [
		function(data) {
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}];
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
	}).config(function($provide,treeConfig,$qProvider){
		 $provide.decorator('GridOptions',function($delegate){
		   var gridOptions;
		      gridOptions=angular.copy($delegate);
		      gridOptions.initialize = function(options) { 
		        var initOptions;
		        initOptions = $delegate.initialize(options);
		        //pagination setting
		        initOptions.useExternalPagination=true;
		        //comman setting section
		        initOptions.enableFiltering = false;
				initOptions.saveFocus = false;
				initOptions.enableGridMenu = (typeof tableConfig.col_setting !=='undefined')? tableConfig.col_setting : false;;
				initOptions.useExternalSorting = false;
				initOptions.saveScroll = true;
				initOptions.rowHeight= 45;
				//pagination setting section
		        initOptions.paginationPageSizes = [10, 20];
				initOptions.paginationPageSize = 10;
				initOptions.enablePaginationControls = false;
				initOptions.paginationCurrentPage = 1;
				initOptions.PageSize = 1;
				//rows selection setting section
				initOptions.enableRowSelection = (typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : true;
				initOptions.enableRowHeaderSelection = (typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : true;
				initOptions.enableSelectAll = (typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : true;
				initOptions.enableSelection = (typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : true;
				initOptions.multiSelect = (typeof tableConfig.chk_action !=='undefined')? tableConfig.chk_action : true;
				//columns selection setting
				initOptions.enableColumnReordering = (typeof tableConfig.column_rearrange !=='undefined')? tableConfig.column_rearrange : false;
				initOptions.enableColumnResize= (typeof tableConfig.resizable !=='undefined')? tableConfig.resizable : false;
				initOptions.enableColumnMenus = false;

		        return initOptions;
		      };
		    return gridOptions;
		   });
		 treeConfig.defaultCollapsed = true; // collapse nodes by default
	  	 treeConfig.appendChildOnHover = true; // append dragged nodes as children by default
	  	 $qProvider.errorOnUnhandledRejections(false);
	}).run(['$rootScope', 'salesfactoryData', '$parse', '$templateCache',
	function($rootScope, salesfactoryData, $parse, $templateCache) {
		//product data
		$rootScope.prd_data={
			simple_product_id :[],
	  	 	config_product_id :[],
	  	 	related_product_id_id : [],
	  	 	cross_sale_product_id :[],
	  	 	up_sale_product_id :[],
	  	};
	  	//enable disable tab
	  	$rootScope.prd_tab={
	  		enable_product_tab : true,
			enable_bundel_tab :false,
			enable_variants_tab : false,
			enable_requirement_tab : false,
			enable_related_tab :false,
	  	 	enable_video_tab:false,
	  	 	enable_unit_dimension_tab : false,
	  	 	enable_warehouse_tab :false,
	  	 	enable_private_zone_tab: false,
	  	 	enable_reservation_tab : false,
	  	 	enable_point_tab : false,
	  	 	enable_view_price_tab : false,
	  	 	enable_seo_tab :false,
	  	};

	  	/*****Template for check box in table for row selections  ****/
		$templateCache.put('ui-grid/selectionRowHeaderButtons',"<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-row-selected': row.isSelected}\" ><input style=\"margin: 0; vertical-align: middle\" type=\"checkbox\" ng-model=\"row.isSelected\" ng-click=\"row.isSelected=!row.isSelected;selectButtonClick(row, $event)\">&nbsp;</div>");
	    $templateCache.put('ui-grid/selectionSelectAllButtons',"<div class=\"ui-grid-selection-row-header-buttons \" ng-class=\"{'ui-grid-all-selected': grid.selection.selectAll}\" ng-if=\"grid.options.enableSelectAll\"><input style=\"margin: 0; vertical-align: middle\" type=\"checkbox\" ng-model=\"grid.selection.selectAll\" ng-click=\"grid.selection.selectAll=!grid.selection.selectAll;headerButtonClick($event)\"></div>");

		if(angular.isUndefined(fieldSetJson.fieldSets)) return;
		$rootScope.pageListOpt = [];
		$rootScope.viewPerPage = 0;
		$rootScope.optionJsonArr = [];
		$rootScope.filedsSet = [];
		$rootScope.optionHtml = [];
		$rootScope.filedSetModel = [];
		$rootScope.drodownValList = {};
	  	//console.log($rootScope);
		/****** This function used for get data from server and initialized model value for filter section *********/
		
		$rootScope.filedsSet = fieldSetJson.fieldSets;
		var i = 0;
		angular.forEach($rootScope.filedsSet, function(key, val) {
			if (key.fieldType == 'textbox' && key.filterable === true) {
				if (key.textBoxType == 'single') {
					// $rootScope.filedSetModel.push({
					// 	"key" : key.fieldName.replace(/\s/g, '')
					// })
				} else if (key.textBoxType == 'range') {
					$rootScope.filedSetModel.push({
						"key" : (key.fieldName.replace(/\s/g, '')) + 'from',
						"key1" : (key.fieldName.replace(/\s/g, '')) + 'to'
					})
				}
			} else if (key.fieldType == 'selectbox' && key.filterable == true) {
				$rootScope.filedSetModel.push({
					"key" : (key.fieldName.replace(/\s/g, ''))
				})
				/**** This code used for selection type single or multiple and value from url*****/
				if ((key.selectionType == 'single' || key.selectionType == 'multiple') && key.optionValType == 'url') {
					var tempUrl = key.optionValUrl;
					var defaultModel = key.defaultVal;

					salesfactoryData.getData(tempUrl, '').then(function(response) {
						$rootScope.optionJsonArr[val] = response;
						// $rootScope.filedsSet[val].push({
						// "optionArr" : response
						// });
						//console.log($rootScope.filedsSet[val]);
						/******* set default model for select type single and value type url********/
						if (key.selectionType === 'single' && defaultModel !== '') {
							angular.forEach($rootScope.optionJsonArr[val], function(keyJ, valJ) {
								if ((angular.isString(defaultModel) && defaultModel !== '') && keyJ.value.toLowerCase() === defaultModel.toLowerCase()) {
									$rootScope.filedSetModel[val] = keyJ;
								} else if ((angular.isNumber(defaultModel) && defaultModel !== '') && keyJ.value === defaultModel) {
									$rootScope.filedSetModel[val] = keyJ;
								}
							})
						} else if (key.selectionType === 'multiple') {
							$rootScope.filedSetModel[val] = [];
						}

						i++;
					})
				}
				/******* this code used for selction type single and value from collection then set set default option come from defaultVal********/
				if (key.selectionType == 'single' && key.optionValType == 'collection') {
					var defaultVal = key.defaultVal;
					angular.forEach(key.optionArr, function(keyC, valC) {
						if ((angular.isString(defaultVal) && defaultVal !== '') && keyC.value.toLowerCase() === defaultVal.toLowerCase()) {
							$rootScope.filedSetModel[val] = keyC;
						} else if ((angular.isNumber(defaultVal) && defaultVal !== '') && keyC.value === defaultVal) {
							$rootScope.filedSetModel[val] = keyC;
						} else {
							$rootScope.filedSetModel[val] = key.optionArr[0];
						}
					})
				}
			}
		});
	}]).filter('unsafe', function($sce) {
		return $sce.trustAsHtml;
	}).filter('trustAsResourceUrl',['$sce',function($sce) {return function(val) {
		return $sce.trustAsResourceUrl(val);};
	}]).filter('arrayDiff', function() {
		/*****This filter used for qnique selection of option****/
	    return function(array, diff) {
			var i, item, 
			  newArray = [],
			  exception = Array.prototype.slice.call(arguments, 2);
			for(i = 0; i < array.length; i++) {
				item = array[i];
				if(diff.indexOf(item) < 0 || exception.indexOf(item) >= 0) {
				  newArray.push(item);
				}
			}
			return newArray;
	    };
  	}).filter('startFrom', function() {
	    return function(input, start) {
	        start = +start; //parse to int
	        return input.slice(start);
	    }
	}).value('froalaConfig', {
		toolbarInline: false,
		//enter: $.FroalaEditor.ENTER_BR,
		//Folder Path
		userFolderDefaultPath: window.userFolderDefaultPath,
		placeholderText: 'Edit Your Content Here!',

		// Set the image Load URL.
		imageManagerLoadURL: froalaloadimages_url+'?folder='+window.userFolderDefaultPath,

		// Set the Default Path
		imageManagerDefaultURL: froalaloadimages_url+'?folder='+window.userFolderDefaultPath,
		
		// // Set the image delete URL.
		// imageManagerDeleteURL: './delete_image.php?folder='+window.userFolderDefaultPath,

		// // Set the Default image delete URL.
		imageManagerDefaultDeleteURL: froaladeletefolder_url+'?_token='+csrftoken+'&folder='+window.userFolderDefaultPath,
		imageUploadParam: 'image',

		imageUploadMethod: 'post',
		// Set the image upload URL.
	    imageUploadURL: froalaupload_url+'?folder='+window.userFolderDefaultPath, 
	    imageUploadParams: {
	    	location: 'images', 
		    // This allows us to distinguish between Froala or a regular file upload.
		    _token:  csrftoken
		    // This passes the laravel token with the ajax request.
		},
		imageManagerDeleteParams :{
			_token:  csrftoken

		},
		
		// Set the image delete URL.
		imageManagerDeleteURL: froaladeletefolder_url+'?_token='+csrftoken+'&folder='+window.userFolderDefaultPath,

		// // Set the Default Upload Path
		imageManagerDefaultUploadURL: froalaupload_url+'?folder='+window.userFolderDefaultPath,

		// Set the new folder URL.
	 	imageManagerNewFolderURL: froalaNewFolder_url+'?_token='+csrftoken+'&path='+window.userFolderDefaultPath,

	 	// imageManagerNewFolderParams:{
	 	// 	_token:  csrftoken
	 	// },

		// Set the default new folder urlURL.
	 	imageManagerNewFolderDefaultURL: froalaNewFolder_url+'?_token='+csrftoken+'&path='+window.userFolderDefaultPath,	 	
	});
})(window.angular);