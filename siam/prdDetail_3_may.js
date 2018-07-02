/*
*@Description : This controller used to handel all product detail function
*@Author :  Smoothgraph Connect PVT LTD.
*@Created At : 06/011/2018
*/

(function(){

	//used to store current select option value (means which variant section current click)
	var currentOptionValue =[]; 
	/*
	*@ngdoc
	*@description : this function used for columns setting
	*@param  : colsDef {array}
	*/
	function columnSetting(colsDef){		
		var col_setting = [];			
		//loop for col setting
		_.map(colsDef, function(val, key){
			var colObj = {};

			if(val.field!== undefined && val.field!=='id'){
				colObj['field'] = val.field; 
				colObj['displayName'] =  val.displayName;
				colObj['minWidth'] =  100;

				switch(val.field){
					case 'initial_price': 
					    colObj['cellTemplate'] = '<div class="price-wrap"> <span ng-class="{\'old-price\': row.entity.special_price!=\'0\'}">'+curCode+'&nbsp;<%row.entity.initial_price%></span></div>';
					   	break;
					case 'special_price':
						colObj['cellTemplate'] = '<div class="price-wrap"><span ng-class="{\'new-price\':row.entity.special_price!=\'0\'}" >'+curCode+'&nbsp;<%row.entity.special_price%> </span></div>';
					    	break;
					case 'qty':
						colObj['cellTemplate'] = " <span class=\"spiner\" ng-class=\"{'disable-button' : row.entity.stock == \'true\'}\">"+
                			"<span class=\"decrease icon-minus\"  ng-click=\"grid.appScope.rvCtrl.tableView.incDcrQuntity($event,row.entity.qty,'down',row.entity,rowIndex)\"></span>"+
                			"<input class=\"spinNum input-text qty\" ng-model=\"row.entity.qty_model\"  value=\"<% row.entity.qty_model %>\" ng-blur=\"grid.appScope.rvCtrl.tableView.incDcrQuntity($event, row.entity.qty, 'tqchange', row.entity, rowIndex)\" type=\"text\" id=\"quantity\" name=\"quantity\" />"+
                			"<span class=\"increase icon-plus\" ng-click=\"grid.appScope.rvCtrl.tableView.incDcrQuntity($event,row.entity.qty,'up',row.entity,rowIndex)\"></span> </span>";                    			 
						break;
					case 'stock': 
						colObj['cellTemplate'] = "<span class=\"stock text-center\" ng-if=\"row.entity.stock == 'true' \"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></span>" +
							  "<span class=\"close text-center\" ng-if=\"row.entity.stock == 'false' \"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span>";
						break;

				};	

				col_setting.push(colObj);
			}					
		});

		return col_setting;
	};	



	//controller start =================================*/
	function productDetailHandler($scope,salesfactoryData,$filter,$window,$timeout,$http,$location,$anchorScroll,$rootScope,$sce, uiGridConstants, dataManipulation){
		//variable define section
		var rvCtrl = this;
		rvCtrl.productImg = [];
		rvCtrl.productInfo = []; 
		rvCtrl.attrRes = [];
		rvCtrl.orderInfo=[];
		rvCtrl.attrValRes = []; 
		rvCtrl.selAttrVal = [];
		//rvCtrl.selAttrVal = {};

		rvCtrl.productReview=[];
		rvCtrl.optionInfo=[];
		rvCtrl.optnameArr=[];
		rvCtrl.ptag=[];
		rvCtrl.productVideo=[];
		rvCtrl.friends = [];
		var shareObjInfo ={};
		var file_name ='';
		rvCtrl.messageShow = false;
		rvCtrl.senddropdown = true;
		rvCtrl.sendshare = false;
		rvCtrl.contactMessage ='';
		rvCtrl.activeimgprevtab=true;
		rvCtrl.totalQtyVal = [];
		rvCtrl.file_interface={};
		rvCtrl.loading = {
			"disableBtn" : false,
			"btnloaderpath" : btnloaderpath,
			"addTocart_and_bynow" : false,
		};
		
		/*==check view and get and set custom data ==*/
		//used for store all information of product
		var prd_info = [];
		var prd_attr_selection = [];
		//In case if all product have quantity zero(0)
		rvCtrl.soldoutFlag = false;	
		//check view settion  ->case 0 for list and 1 for tabular
		productLayoutView = parseInt(productLayoutView);
		//In case of list view
		if(!isNaN(productLayoutView) && productLayoutView == 0){
			var customData  = dataManipulation.constructDataList(productData.productInfo, productData.oneProductInfo.prdType, productData.attrres);
				rvCtrl.soldoutFlag = customData.total_soldOut;
	  	  prd_info = customData.product_info;
	  	  rvCtrl.totalQtyVal = customData.total_qty;
	  	  //console.log(customData);
		}else if(!isNaN(productLayoutView) && productLayoutView == 1){
		  //in case of tabular view
		  var customData = dataManipulation.costructDataTabular(productData.tableView, productData.oneProductInfo.prdType, productData.productInfo);
		  	  prd_attr_selection = customData.tabularData;
		  	  rvCtrl.soldoutFlag = customData.total_soldOut;
		  	  prd_info = customData.product_info;
		  	  rvCtrl.totalQtyVal = customData.total_qty;

		  /*==============================
			*@description : This Object used to manage all funactionality of tabular view of product details
			*@name :  rvCtrl.tableView {object}
			*@props : table_attr {object} --> all attribute of product.
			*@props : gridOptions {array} ->for table option  
			*@props : prd_attr_selection {array} -> for product selction array on selection
			*==============================*/
			rvCtrl.table_attr = productData.tableView;		
			//Generate grid option up to data length
			//@gridOptions  : type object
			rvCtrl.gridOptions ={};
			//for config and bundel		
		  _.map(productData.tableView, function(item,index){
				if(!_.isArray(item) && item.data!==undefined){
					var name = index.toString();				
					rvCtrl.gridOptions[name] = {
						columnDefs : columnSetting(item.header),
						data : item.data,
						enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
	        			enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
	        			onRegisterApi : function(gridApi) {
			                rvCtrl.gridApi = gridApi;		               
			            }
					};				
				}
			});/*end==============================*/
		}/*end ==============================*/

		rvCtrl.prdBlogUrl = prdBlogUrl;
		rvCtrl.productImg = productData.productImage;
		rvCtrl.curCode = curCode;
		rvCtrl.colorPath = colorPath;
		rvCtrl.productImg = productData.productImage;
		rvCtrl.productVideo = productData.productVideo;
		rvCtrl.productInfo = productData.productInfo;
		rvCtrl.oneProductInfo = productData.oneProductInfo;
		rvCtrl.attrRes =  productData.attrres;
		rvCtrl.attrValRes = productData.attrValRes;
		rvCtrl.selAttrVal = productData.selectedAttrVal;
		rvCtrl.selAttrValDetails = productData.selectedAttrValDetails;
		rvCtrl.varientType = productData.varientType;
		rvCtrl.optionInfo = productData.optionInfo;
		rvCtrl.optnameArr = productData.optnameArr;
		rvCtrl.ptag 	= productData.productTags;
		rvCtrl.spcfAttr = productData.sattrRes;
		rvCtrl.spcfAttrVal = productData.sattrValRes;
		rvCtrl.productReview = productData.userProductReview;
		rvCtrl.orderInfo = (Object.keys(productData.orderInfo).length !== 0)?productData.orderInfo : '';
		rvCtrl.contactProduct = productData.contactProduct;
		rvCtrl.starModal= rvCtrl.productInfo.userProductRating;
		rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
		rvCtrl.cmobsArr = productData.attributeArr;
			

		_createThumbVideoHtml(rvCtrl.productImg,rvCtrl.productVideo);


		//check if any product have default select attribute in case of config product
		$timeout(function(){ 
			var attr_res_arr = _.flatMap(rvCtrl.attrRes),
				atrLen = attr_res_arr.length,
				prdLen = prd_info.length;

			if(atrLen > 0 && prdLen > 0){ 				
				$.map(prd_info, function(elem, index){
					var mpid = elem.mainprdid;					
					// console.log("check select in product variant");
					// console.log(rvCtrl.selAttrVal[mpid])
					//In case product have pre selected varaint then get combination and enable/disable
					if(rvCtrl.selAttrVal[mpid]!== undefined && rvCtrl.selAttrVal[mpid]){
						console.log("there+++++++++")
						var a = rvCtrl.getCombArr(rvCtrl.cmobsArr[mpid]),
							b = rvCtrl.getCombArr(rvCtrl.selAttrVal[mpid]);
							
						//for current option
						if(rvCtrl.attrRes[mpid][0]!== undefined && rvCtrl.attrRes[mpid][0].attribute_id!== undefined){
							var atid = rvCtrl.attrRes[mpid][index].attribute_id;
							currentOptionValue =[];
							currentOptionValue = rvCtrl.getCombArr(rvCtrl.attrValRes[mpid][atid]);
						}
						
						a= a.concat(b);

						if(a.length>0){
							enableDisableVariantComb(a, b, mpid, index);
						}
					}
				});
		   }
		});

		//Function section
		$scope.scrollToReview = function(event){
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('reviewBox');
			// call $anchorScroll()
			$anchorScroll();
		};

		rvCtrl.openSpinDataModal = function(prodtImg,prodtName,prodtId){
			openSpinData(prodtImg,prodtName,prodtId);
			//zoomSlideDisable();
		};

		rvCtrl.relatedProductConfig = {
			itemPerPage : 0,
			currentPage : 1,
			totalItems : 0,
			data : [],
		};
		/*
		*invoke to get related product data 
		*@param {product_id}
		*private {method}
		*/	
		function _getRelatedProduct(){
			salesfactoryData.getData(related_prd_url, "POST", {product_id : rvCtrl.oneProductInfo.id})
			.then(function(res){
				var result = res.data;
				rvCtrl.relatedPrdData = result;	
				if(result.status!== undefined && result.status === "success"){
					if(result.data!== undefined && angular.isArray(result.data) && result.data.length){
						rvCtrl.relatedProductConfig.data = result.data;
						rvCtrl.relatedProductConfig.itemPerPage = 	result.no_items;
						rvCtrl.relatedProductConfig.totalItems = 	result.data.length;
					}			
				}else{
					rvCtrl.relatedProductConfig.data = result.data;
					rvCtrl.relatedProductConfig.itemPerPage = 	result.no_items;
					rvCtrl.relatedProductConfig.totalItems = 	result.data.length;
				}
			},function(error){
				//
			})
		};

		_getRelatedProduct();		

		//this function used for change attribute
		//$index,atr.attributedesc.attr_id,prdDetails.mainProductId
		rvCtrl.changeContent = function(index,attrId,mainPrdId,prdId,pIndex, atr_id){ 
			//console.log(index,pIndex);
			rvCtrl.totalQtyVal[pIndex]=1;
			$scope.styleopacity =true;
			//console.log('mainPrdId : ' + mainPrdId);
			//console.log('product id ::' + prdId);
			//get all value of current variant 
			currentOptionValue = [];
			currentOptionValue = rvCtrl.getCombArr(rvCtrl.attrValRes[mainPrdId][atr_id]);

			var prd_type = (!_.isUndefined(productData.oneProductInfo.prdType))? productData.oneProductInfo.prdType : ' ';
			//$scope.mainProductId = rvCtrl.productInfo.mainProductId;
			var dataObj ={
				'mainProductId' : mainPrdId,
				'attrVal' : rvCtrl.selAttrVal[mainPrdId],
				'currentAttrId' : attrId,
				'currentAttrValId' : rvCtrl.selAttrVal[mainPrdId][index].valId,
				'product_type' : prd_type,
			};
			MagicZoom.stop();
			MagicScroll.stop('MagicScrollDiv');	

			salesfactoryData.getData(getVarientProduct,'POST',dataObj)
			.then(function(r){				
				if(r.status===200 && Object.keys(r.data).length>0){
					var data = r.data;
					//var tmp_path =data.productUrl.split('product/')[1];
					if(prd_type==='bundle'){
						// console.log('parent index   :' + pIndex + " \t bundel product");
						//console.log("==>> bundel product")	
						//console.log("current selected");
						//console.log(rvCtrl.selAttrVal[mainPrdId])					
						rvCtrl.productInfo[pIndex] = data.productInfo
						//rvCtrl.selAttrVal[mainPrdId] = data.selectedAttrVal;
						//console.log("after sucess selected");
						//console.log(data.selectedAttrVal);
						rvCtrl.totalQtyVal[pIndex] = 1;
						rvCtrl.cmobsArr = data.attributeArr;
					}else if(prd_type === "configrable"){
						console.log('here ===>> configrable product' );
						rvCtrl.productImg = data.productImage;
						rvCtrl.productInfo[pIndex] = data.productInfo;
						//rvCtrl.selAttrVal[mainPrdId] = data.selectedAttrVal;
						// console.log(data.attributeArr);
						rvCtrl.cmobsArr = data.attributeArr;
						//rvCtrl.totalQtyVal = 1;
						//rvCtrl.productReview = data.userProductReview;
						//rvCtrl.orderInfo = (Object.keys(data.orderInfo).length !== 0)?data.orderInfo : '';
						//rvCtrl.starModal= data.productInfo.userProductRating;
						//rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
						// console.log(rvCtrl.productInfo);
						_createThumbVideoHtml(rvCtrl.productImg);
					}
					console.log("attrbite id  "+ atr_id + "main product id  " + mainPrdId);
					//console.log(rvCtrl.attrValRes[mainPrdId][atr_id]);
					var a = rvCtrl.getCombArr(rvCtrl.cmobsArr);
						b = rvCtrl.getCombArr(rvCtrl.selAttrVal[mainPrdId]);
					console.log("before concat a");
					console.log(a);
					a= a.concat(b);
				 	console.log(a);
				 	enableDisableVariantComb(a, b, mainPrdId, pIndex);									
				}

				$timeout(function(){
					$scope.styleopacity =false;
					//cfpLoadingBar.complete();
				},2000);
			}, function(error){
				try{throw new Error("Something went badly wrong!");}catch(e){console.log('error'+e);$scope.styleopacity =false;}
			}).finally(function(){
				$scope.styleopacity =false;
				MagicScroll.start('MagicScrollDiv');
				MagicZoom.start();;
			});
		};

		//this function used for get array combination
		rvCtrl.getCombArr = function(cmbarr){
			var cmbArr =[];
			_.forEach(cmbarr, function(item){
				if(item.length!==undefined && item.length>1){
					for(var i=0;i<item.length;i++){ 
						var v = parseInt(item[i]); 
						if(cmbArr.indexOf(v)<0) 
							cmbArr.push(v);
					}
				}else if(item.length!==undefined && item.length===1){
				 var v = parseInt(item);
				 if(cmbArr.indexOf(v)<0)
				 	cmbArr.push(v);
				}
				if(item.valId!==undefined){
				 var v = parseInt(item.valId);
				 if(cmbArr.indexOf(v)<0)
				 	cmbArr.push(v);
				}
			});
			return cmbArr;
		};		

		/*
		*This function used to enable/disable attribute combination as per as backend combination.
		*@param - {result ->array : all combination array}
		*@param -{selectedVal}
		*@param - mainPrdId {varchar}
		*@param - prdIndex {int}
		*/
        function enableDisableVariantComb(result, selectedVal, mainPrdId, prdIndex){  
        	$scope.$evalAsync(function(){
				$.map(rvCtrl.attrValRes[mainPrdId], function(item){
					if(item!== undefined && angular.isArray(item) && item.length){
						$.map(item, function(item_node){
							var _valid = parseInt(item_node.valId);
							if(result.indexOf(_valid) ==  -1){
								item_node.disable_attr = true;
							}else if (result.indexOf(_valid)>=0){
								item_node.disable_attr = false;
							}
							//for enable current option value
							if(currentOptionValue.indexOf(_valid)>=0){
								item_node.disable_attr = false;
							} 
						});						
					}				
				});
				//add/remove calss from dropdown
				console.log("currentOptionValue");
        		console.log(currentOptionValue);
				manageAttribute(result, selectedVal, mainPrdId, prdIndex);			
			});
		};

		//this function used for get price by option
		rvCtrl.getPriceByOption = function($event,str,prdId,index){ 
			console.log('product id \t'+prdId +'\n'+ 'index \t'+ index);
			if(str==="tqchange" && (_.isUndefined(rvCtrl.totalQtyVal[index]) || rvCtrl.totalQtyVal[index]==0) ) return;
			//loaderImage('show');
			var mainPrdId = _.filter(rvCtrl.productInfo, function(o){return o.id == prdId})[0].mainProductId; 
			//get all option and option value id 
			var valId = (rvCtrl.optionFieldId!= undefined) ? getFieldId(rvCtrl.optionFieldId,mainPrdId,'optchange') : [];
			var chkVal = (rvCtrl.optionValueCheck!= undefined) ? getFieldId(rvCtrl.optionValueCheck,mainPrdId,'valchange') : [];		
			var dataObj = {
				'productId' : prdId,
				"quantity" : rvCtrl.totalQtyVal[index],
				"optionValueId" : chkVal,
				"optionId" : valId
			};
			salesfactoryData.getData(productPriceByOption, 'POST', dataObj)
			.then(function(resp) { 
				rvCtrl.productInfo[index].productPrice = resp.data;
				loaderImage('hide');
			},function(error){console.log});
		};

		//this function used for handel quantiy increase decrease
		rvCtrl.incDcrQuntity = function($event, valMax, str, prdDetail, index) {
			$event.stopPropagation();
			var tq = parseInt(prdDetail.qty_model),
				prd_type = prd_info[0].product_type;
			//rvCtrl.totalQtyVal[index]);			
			valMax = parseInt(valMax);

			if (str == "up" && tq < valMax) {
				rvCtrl.totalQtyVal[index] = tq + 1;
				prdDetail.qty_model = tq + 1;
				rvCtrl.getPriceByOption($event, str, prdDetail.id, index);
			} else if (str == "down") {
				//for normal 
				if(prd_type!== undefined && prd_type=="normal" && tq >1){
					rvCtrl.totalQtyVal[index] = tq - 1;
					prdDetail.qty_model = tq - 1;
					rvCtrl.getPriceByOption($event, str, prdDetail.id, index);	
				}else if(prd_type!== undefined && prd_type!="normal" && tq >=1){
					//for bundel /config product
					var qty_zero;
					prdDetail.qty_model = tq - 1;

					//incase of product quantity will zero then price will be one quantity
					if(prdDetail.qty_model == 0)
						qty_zero = 1;

					rvCtrl.getPriceByOption($event, str, prdDetail.id, index, qty_zero);	
				}						
			}else if(str === "tqchange"){
				if(!isNaN(tq) && tq > valMax){
					if(prd_type!== undefined && prd_type=="normal"){
						prdDetail.qty_model = 1;
						rvCtrl.totalQtyVal[index] = 1;
						rvCtrl.getPriceByOption($event, str, prdDetail.id, index);
					}else{
						prdDetail.qty_model = 0;
						rvCtrl.totalQtyVal[index] = 0;
						rvCtrl.getPriceByOption($event, str, prdDetail.id, index, 1);
					} 
      			}else if(!isNaN(tq) && tq <= valMax){
      				rvCtrl.totalQtyVal[index] = tq;
      				prdDetail.qty_model = tq;   
      				rvCtrl.getPriceByOption($event, str, prdDetail.id, index);   				      				  					
      			}      				
			}
		};

		//this function used to check quantity length in case of add to cart
		function checkQuantityLength(prdLength){
			var count = 0,
				i=0,
				tq ='';

			for(; i<prdLength; i++){
				tq = rvCtrl.totalQtyVal[i];
				if(!isNaN(tq) && tq === 0){
					count++;
				}				
			}
			return count;
		};

		/****
		* This function call on click on add to cart button and check cases if valid the call addtocart function
		* all main product id and check before add to cart all product have selected attribue
		* @event : (event)
		* @strflag :(string)
		* ******/
		rvCtrl.addToCartHandler = function($event,strflag) {
			$event.stopPropagation();
			
			/**closure function to check data condition is attribute or quatity selected or not
			* @product  : (normal, configrable, bundle) 
			**/
			function _checkAttrSelected(){
				var gotocart = "yes",
					prdLength = prd_info.length;

				_.forEach(prd_info, function(item,index){					
					if(item.product_type!== undefined && (item.product_type === "bundle" || item.product_type === "configrable")){
						if(item.type==="normal"){
							//check all product have quantity zero or not
							if(checkQuantityLength(prdLength) === prdLength){
								swal("Opps..",'Please Select at least one quantity  ','warning');
								gotocart = "no";
							}							
						}else if(item.type==="configrable" || item.type==="bundle"){
							if(!_.isUndefined(rvCtrl.selAttrVal[item.mainprdid])){
								var cbLength = _.flatMap(rvCtrl.selAttrVal[item.mainprdid]);
								if(cbLength.length != item.product_attribute_count){
									swal("Opps..",'Please Select Attribute in All Product','warning');
									gotocart = "no";
								}else if(checkQuantityLength(prdLength) === prdLength){
									swal("Opps..",'Please Select at least one quantity  ','warning');
									gotocart = "no";
								}
							}else{								
								//if attribute not selected the check quantity of this product is
								// > = 1 then need to select variant first.
								var qt = rvCtrl.totalQtyVal[index];
								if(qt >= 1){
									swal("Opps..",'Please Select Attribute in All Product','warning');
									gotocart = "no";
								}else{									
									if(checkQuantityLength(prdLength) === prdLength){
										swal("Opps..",'Please Select at least one quantity  ','warning');
										gotocart = "no";
									}
								}
							}								
						}
					}else if(item.product_type!== undefined && item.product_type === "normal"){
						if(checkQuantityLength(prdLength) === prdLength){
							swal("Opps..",'Please Select at least one quantity  ','warning');
							gotocart = "no";
						}
					}				
				});
				return gotocart;
			};
			
			//check before go to cart all case 
			if(_checkAttrSelected() == "no"){
				console.log("there??")
				//swal("Opps..",'Please Select Attribute in All Product','warning');
				return;
			}

			_enbdsbLodBtn('enable',true);

			//get all product id 
			var pid = _.map(rvCtrl.productInfo, 'id');
			var dataObj=[];
			for(d in pid){
				dataObj.push({
				  productId :  pid[d],
				  quantity : (_.isUndefined(rvCtrl.totalQtyVal[d])) ? 0 :  rvCtrl.totalQtyVal[d],
				});
			}
			salesfactoryData.getData(checkProductBeforeCart, "POST", dataObj)
			.then(function(r) {
				if(r.data==='100'){
					addToCart(strflag);
				}else{
					_enbdsbLodBtn('disabled',false);
					swal("", r.msg, "error");
					return false;
				}
			},function(error){
				_enbdsbLodBtn('disabled',false);
				swal('Opps','Something wrong','error');
			});
		};
		//this function used to set rating of product
		$scope.setReview = function(event, data) {
		 rvCtrl.starModal = data.rating;
		};
		//This function used to handel product thum image and video section
		$scope.thumbimagevedio= function($event,type,site,videoid){
			if(type==='video'){
				rvCtrl.activeimgprevtab =false;
				var tempurl = (site=='youtube')?'https://www.youtube.com/embed/':'https://player.vimeo.com/video/';
				rvCtrl.prdvideourl = tempurl + videoid;
			}else if(type==='thumbimage'){
				rvCtrl.activeimgprevtab =true;
			}
	        $event.preventDefault();
		};
		// Listen for when the file interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {
			if(rvCtrl.file_interface.allowedExtensions){
				rvCtrl.file_interface.allowedExtensions(['png','jpeg','jpg', 'bmp', 'gif', 'svg']);
				rvCtrl.file_interface.useArray(true);
				rvCtrl.file_interface.setRequestUrl(uploadAction);
			}			
	    });
	     // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
      	    // $scope.uploadCount = files.length;
           //  $scope.success     = true;
           //  $timeout(function timeout() {
           //      $scope.success = false;
           //  }, 5000);
        });
        $scope.$on('$dropletFileAdded', function onDropletSuccess(event,fileObje) {
         	if(fileObje.type & rvCtrl.file_interface.FILE_TYPES.INVALID){
         		swal('file extension not valid')
         	}else if(rvCtrl.file_interface.FILE_TYPES.VALID){
         		//Listen when file is valid then upload to server
         		getBase64Url(fileObje.file)
         		.then(function(obj){
         			salesfactoryData.getData(uploadAction,'POST',{'upload_path':upload_path,'uploadfile': obj})
         			.then(function(resp){
         				if(resp.data.status==="success")
         					rvCtrl.getPriceByOption(event,'tqc',parseInt(fileObje.productId),parseInt(fileObje.productIndex));
         			}, function(error){console.log;});
         		}).catch(function(){console.log;})
         	}
        });
		//Listen after check quantity availabel in store
		function addToCart(strflag) {
			var optionDataArr = {};
			var tmpSelAtt = angular.copy(rvCtrl.selAttrVal);
			var attrValIdObj =[];
			var atrLen = Object.keys(rvCtrl.attrRes).length,
				seltdAtrLen = Object.keys(rvCtrl.selAttrVal).length;
			if(atrLen>=1&& seltdAtrLen===0){
				swal("Oops...", "Please choose before add to shopping bag!", "error");
				return false;
			}
			//closure function to get all selected attribute as per as main product id
			function _getSelectedAttr(mprd){
				var tempRes  =[];
			    _.forEach(rvCtrl.attrRes,function(currentValue, currentIndex) {
			    	//convert object to array
				    var temp = _.flatMap(tmpSelAtt[mprd]);
				    
					if(!_.isUndefined(temp) && temp.length>0 && currentIndex==mprd){
						_.forEach(currentValue, function(cVal,cInd){
							var t = temp[cInd];
							t["attribute_id"] = cVal.attribute_id;
						});
					  tempRes = tempRes.concat(temp);
					}
				});
				return tempRes;
			};
			//loaderImage('show');
			//create data for add to cart
			// @datap :[]
			var dataObj =[];
			var qtycheck = 0;
			_.map(rvCtrl.productInfo, function(item,ind){
				if(rvCtrl.totalQtyVal[ind] > 0){
					qtycheck++;
					dataObj.push({
					  productId	: item.id,
					  mainproductid :  item.mainProductId,
					  quantity : rvCtrl.totalQtyVal[ind],
					  optionId : (rvCtrl.optionFieldId != undefined) ? getFieldId(rvCtrl.optionFieldId,item.mainProductId,'optchange') : [],
					  optionValueId : (rvCtrl.optionValueCheck != undefined) ? getFieldId(rvCtrl.optionValueCheck,item.mainProductId,'valchange') : [],
					  optionIdDetail : (rvCtrl.optionFieldId != undefined) ? getFieldId(rvCtrl.optionFieldId,item.mainProductId,'optDetailchange') : [],
					  attrDetail : (atrLen>=1&& seltdAtrLen>=1)? _getSelectedAttr(item.mainProductId) : [], 
					});
				}
				
			});

			if(qtycheck == 0){
				swal("Oops...", "Please add quantity!", "error");
				loaderImage('hide');
				return false;
			}
			
			// console.log(JSON.stringify(dataObj));
			salesfactoryData.getData(addProductToCart, 'POST', dataObj)
			.then(function(response){
				_enbdsbLodBtn('disabled',false);
				if (response.data.success === "success" && (_.isUndefined(strflag) ||  strflag=='')) {
			      var totalCartProduct = $('#totalCartProduct').html();       
			      var totalNew = Number(totalCartProduct)+1;       
			      jQuery('#totalCartProduct').html(totalNew);
			      jQuery('#addToCartdiv').modal('show');
			    }else if(response.data.success === "success" && !_.isUndefined(strflag) && strflag==="buynow"){
			    	window.location.href=cartUrl;
			    }
			    if(!_.isUndefined(response.data.success) && response.data.success !== "success" )
			    	swal('Opps','Please check your network connection','error');
			    loaderImage('hide');
			    return false;
			},function(error){
				swal('Opps','Something wrong','error');
			}).finally(function(){_enbdsbLodBtn('disabled',false)});
		};		
		
		/*
		*private method to add tooltip html for all variant style type color image
		*but if have value(means text) then not generate  
		*/		
		var getTooltipContent = function(){
			$.map(rvCtrl.attrValRes, function(item){				
				$.map(item, function(elem){					
					if(elem!== undefined && angular.isArray(elem) && elem.length){
						$.map(elem, function(el) {
							if(el.value!== undefined && el.color_code!== undefined && el.color_image!== undefined){
								if(el.color_image){
								  el.tooltip = $sce.trustAsHtml('<div class="varient-tooltip"><image src="'+rvCtrl.colorPath+el.color_image+'" alt="'+el.color_image+'" width="50" height="50"></div>');
								}else if(el.color_code!== undefined && el.color_code){
								  el.tooltip = $sce.trustAsHtml('<div class="varient-tooltip"><span style="background :'+el.color_code+'; width: 50px; height: 50px; display:inline-block"></span></div>');
								}
							}					
						});
					}			
				});
			});		
		};

		//self excute if in case have attrValRes 
		if(!angular.isArray(rvCtrl.attrValRes)){
			getTooltipContent();
		}		
	
		

		//Listen on add wishlist
		rvCtrl.addIntoWishlist = function($event, product_id, index) {
		  $event.stopImmediatePropagation();
		  salesfactoryData.getData(addIntoWishlist,'GET', {"product_id" : product_id})
		  .then(function(response){
		     if(response.data.status!== undefined && response.data.status == "success"){
		     	rvCtrl.productInfo[index].wishlist = true;	
		     	 _toastrMessage(response.data.status, response.data.message);		     	
		     }                       
		  },function(error){
		    //_error();
		  });
		};
		//Listen on remove wishlist
		rvCtrl.removeFromWishlist = function($event, product_id, index) {
			  $event.stopImmediatePropagation();
			  salesfactoryData.getData(removeFromWishlist, 'GET', {"product_id" : product_id})
			  .then(function(response){
			      if(response.data.status!== undefined && response.data.status == "success"){
			      	rvCtrl.productInfo[index].wishlist = false;
			      	_toastrMessage(response.data.status, response.data.message);		      
			      } 
			  },function(error){
			    //_error();
			  });
		};
		
		/*===================================================/
		*@ngdoc
		*descriptions : This function used for table view product layout section to manage all action
		*@name : rvCtrl.tableView
		*/ 

		//used to construct product data after section as per as main product
		function constructProdSeclectionData(prdDetails){			
			var ind =  _getIndex(prd_attr_selection, prdDetails.id, 'id');

			if(ind== -1){
				prd_attr_selection.push(_.pick(prdDetails,['id', 'stock', 'qty_model','sold_out']));
			}else if(ind >=0){				
				prd_attr_selection[ind].qty_model = parseInt(prdDetails.qty_model);			  
			}	
		};

		//Listen on calculate table hieight dynamically
        rvCtrl.getTableHeight = function() {
             var rowHeight = 45; // your row height
             var headerHeight = 39; // your header height
             var as = rvCtrl.gridApi.core.getVisibleRows().length;
           
             return {
                height: (as * rowHeight + headerHeight) + "px"
             };
        };

		rvCtrl.tableView = {
			totalPrice : 0,
			calculateTotaPrice : function(o, type){
				console.log('total price');
				console.log(prd_attr_selection);
			},
			prd_obj : {},
			minQtyCheck : function(prdDetail, action){
				if(prdDetail.minQty!== undefined){
					//if()
				}
			},
			/*
			*@Description : check if product have required true (means user need to buy)
			*@param : prdDetail {object}
			*/
			checkProductRequired  : function(prdDetail){
				//
			},

			prdCompare : function(){
				console.log("used for product conpare");
			},
			//check before cart
			addToCartHandler : function($event,strflag){
				$event.stopPropagation();
				var self = this;
				/**closure function to check data condition is attribute or quatity selected or not
				* @product  : (normal, configrable, bundle) 
				**/
				function _checkAttrSelected(){
					var gotocart = "yes",
						prdLength = prd_info.length,
						tprdLength = prd_attr_selection.length,
						prd_type = prd_info[0].product_type;

						//in case of bundel/configrable ==  product
						if(prd_type!==undefined && (prd_type == "bundle" || prd_type == "configrable")){
							var f_data = _.filter(prd_attr_selection, function(o){
							 	return (o.sold_out == false && o.qty_model >= 1);
							 });

							if(!f_data.length){
								swal("Opps..",'Please Select at least one quantity  ','warning');
								gotocart = "no";
							}								 
						}else if(prd_type!==undefined && prd_type == "normal"){
							//
						}					
					return gotocart;
				};

				//check before go to cart all case 
				if(_checkAttrSelected() == "no"){
					console.log("there??")
					//swal("Opps..",'Please Select Attribute in All Product','warning');
					return;
				}

				_enbdsbLodBtn('enable',true);

				//go to cart for quantity and stoke check
				salesfactoryData.getData(checkProductBeforeCart, "POST", prd_attr_selection)
				.then(function(r) {
					if(r.data==='100'){
						self.addToCart(strflag);
					}else{
						_enbdsbLodBtn('disabled',false);
						swal("", r.msg, "error");
						return false;
					}
				},function(error){
					_enbdsbLodBtn('disabled',false);
					swal('Opps','Something wrong','error');
				});					
			},

			addToCart : function(strflag){				
				salesfactoryData.getData(addProductToCart, 'POST', prd_attr_selection)
				.then(function(response){
					_enbdsbLodBtn('disabled',false);
					if (response.data.success === "success" && (_.isUndefined(strflag) ||  strflag=='')) {
				      var totalCartProduct = $('#totalCartProduct').html();       
				      var totalNew = Number(totalCartProduct)+1;       
				      jQuery('#totalCartProduct').html(totalNew);
				      jQuery('#addToCartdiv').modal('show');
				    }else if(response.data.success === "success" && !_.isUndefined(strflag) && strflag==="buynow"){
				    	window.location.href=cartUrl;
				    }
				    if(!_.isUndefined(response.data.success) && response.data.success !== "success" )
				    	swal('Opps','Please check your network connection','error');
				    loaderImage('hide');
				    return false;
				},function(error){
					_enbdsbLodBtn('disabled',false);
					swal('Opps','Something wrong','error');
				}).finally(function(){
					_enbdsbLodBtn('disabled',false);
				});
			},
			addToQuote : function(){
				//add to quote function
			},

			getPriceByOption : function($event, str, prdDetail, index, qty_zero){
				console.log(prdDetail);
				var prd_qty = '';

				if(qty_zero!=undefined && !isNaN(qty_zero))
					prd_qty = qty_zero;
				else
					prd_qty = prdDetail.qty_model;	

				var dataObj = {
					'productId' : prdDetail.id,
					"quantity" : prd_qty,
					"optionValueId" : '',
					"optionId" : ''
				};

				salesfactoryData.getData(productPriceByOption, 'POST', dataObj)
				.then(function(resp) { 					
					prdDetail.productPrice = resp.data;					
				},function(error){console.log});
			},

			incDcrQuntity : function($event,valMax,str,prdDetail,index){
				$event.stopPropagation();	
					
				var tq = parseInt(prdDetail.qty_model),
					prd_type = prd_info[0].product_type;
				valMax = parseInt(valMax);
				
				if (str == "up" && tq < valMax) {					
					prdDetail.qty_model = tq + 1;
					constructProdSeclectionData(prdDetail);
					this.getPriceByOption($event, str, prdDetail, index);
				} else if (str == "down") {
					//for normal 
					if(prd_type!== undefined && prd_type=="normal" && tq >1){
						prdDetail.qty_model = tq - 1;
						constructProdSeclectionData(prdDetail);
						this.getPriceByOption($event, str, prdDetail, index);	
					}else if(prd_type!== undefined && prd_type!="normal" && tq >=1){
						//for bundel /config product
						var qty_zero;
						prdDetail.qty_model = tq - 1;
						//incase of product quantity will zero then price will be one quantity
						if(prdDetail.qty_model == 0)
							qty_zero = 1;

						constructProdSeclectionData(prdDetail);
						this.getPriceByOption($event, str, prdDetail, index, qty_zero);	
					}
				}else if(str === "tqchange"){				
					if(!isNaN(tq) && tq > valMax){						
						if(prd_type!== undefined && prd_type=="normal"){
	      					prdDetail.qty_model = 1;
	      					constructProdSeclectionData(prdDetail);
	      					this.getPriceByOption($event, str, prdDetail, index);
	      				}else{
	      					prdDetail.qty_model = 0;
	      					constructProdSeclectionData(prdDetail);
	      					this.getPriceByOption($event, str, prdDetail, index);
	      				}
	      			}else if(!isNaN(tq) && tq <= valMax){
	      				if(prd_type!== undefined && prd_type=="normal" && tq == 0){
	      					prdDetail.qty_model =1;
	      					constructProdSeclectionData(prdDetail);
	      					this.getPriceByOption($event, str, prdDetail, index);
	      				}else{
	      					prdDetail.qty_model = tq;
	      					var qty_zero;
							//incase of product quantity will zero then price will be one quantity
							if(prdDetail.qty_model == 0)
								qty_zero = 1;
	      					constructProdSeclectionData(prdDetail);
	      					this.getPriceByOption($event, str, prdDetail, index, qty_zero);
	      				}  				      				  					
	      			}
				}
			},
		};
		rvCtrl.tableView.calculateTotaPrice();
		//end==========================/
		
		/**This function used for convert file into base64
		* @fileObj : (object)
		**/
	    function getBase64Url(fileObj) {
			 return new Promise(function(res, rej){
				 try{
					reader = new FileReader();
					reader.readAsDataURL(fileObj);
					reader.onloadend = function(){
						res({
							filename: fileObj.name,
							filecontent: reader.result,
							base64 : true,
						});
					};
				 }
				 catch(err){
					 rej(err);
				 }
			 });
		};
		/*This function used for get all attribute filed id
		* @arra :(type [])
		* @prdid : (type int)
		***/
		function getFieldId(arr,mainPrdId,flag) {
			var tempArr = [],
				tempObj ={};
			_.forEach(arr, function(value,key){
				if(!_.isUndefined(value[mainPrdId]) && value[mainPrdId]!=''){
					if(!_.isUndefined(flag) && flag==="optDetailchange"){
						tempObj[key]= value[mainPrdId];
					}
					else{
						tempArr.push(parseInt(key));
					}
				}
			});
			/***get all uploaded file id fro droplet file 
			* @optionId      :(int option  id)
			* @productId     :(int product id) 
			* @productindex  :(int product index)
			****/
			if(!_.isUndefined(flag) && (flag==='optchange' || "optDetailchange") && !_.isEmpty(rvCtrl.file_interface)){
				var uploadimgId = [];
				var uplodimgprdid =0;
				_.map(rvCtrl.file_interface.getFiles(), function(fileObj){
					var optid = parseInt(fileObj.optionId),
						prodid = parseInt(fileObj.mainPrdId);
				    if(fileObj.file.type && fileObj.file.type!==4){
						if(prodid == mainPrdId && uploadimgId.indexOf(optid)<0){
							if(flag==="optchange"){
								uplodimgprdid = prodid;
								uploadimgId.push(optid);
							}else if(flag==="optDetailchange"){
								tempObj[optid] = fileObj.file.name;
							}
						}
					}
				});
				if(uplodimgprdid == mainPrdId){
					tempArr= tempArr.concat(uploadimgId);
				}
		    }
			return (!_.isUndefined(flag) && flag==="optDetailchange") ? tempObj : tempArr;
		};

		/*
		*Listen after click on addtocart or buy now for enable/disable loader/button
		*@param : string (enable/diable)
		*@param : Boolean 
		*/
		function _enbdsbLodBtn(strflag,btnFlag){
			if(!_.isUndefined(strflag) && strflag!==''){
				rvCtrl.loading['addTocart_and_bynow'] = (strflag==='enable')? true : false;				
			}
			rvCtrl.loading['disableBtn'] = btnFlag;
		};
	};

	angular.module('siam-app').controller('productDetailCtrl', productDetailHandler);

	/*
	*This function used to add and remove dropdownUnavailable form selct box in product variant section.
	*@param : {array ->result : array of all combination}
	*@param : {array -> selectedVal -> all selected value}
	*@param : {int -> mpid -> current product main product id}
	*param  : {int -> index -> main product index}
	*/
	function manageAttribute(result, selectedVal, mpid, index){ 
	  if(jQuery(document).find('.pdetail-row select.attrVal').length>0){
	  	var _class = "select-" + mpid +"-"+ index;
	  		_class = $.trim(_class);	  

		$('.'+ _class +' .attrVal').find('option').each(function() {
			var v = parseInt($(this).val());

			if (result.indexOf(v)<0) {
			  // $(this).prop('disabled', true);
			  $(this).addClass('dropdownUnavailable');
			} else if (result.indexOf(v)>=0 || currentOptionValue.indexOf(v)>=0) {
			  // $(this).prop('disabled', false);
			  $(this).removeClass('dropdownUnavailable');
			}	

			//for enable current option value
			if(currentOptionValue.indexOf(v)>=0){
				$(this).removeClass('dropdownUnavailable');
			} 			
		});
	  }
	};

}).call(this);

//custom function section



//Listen after thumb or video have data then create html 
//@MagicScrollDiv to add html
function _createThumbVideoHtml(dataImg,dataVid,strflag){
	var thumbHtml ='',
		zoomHtml = '';
	if(!angular.isUndefined(dataImg) && dataImg.length>0){
		angular.forEach(dataImg, function(item,index){
			if(item.isDefault!==undefined && (item.isDefault=="1" || item.isDefault==true)){
				zoomHtml+='<a id="Zoom-1" class="MagicZoom" title="Zoom Image." href="'+item.original+'"><img src="'+item.large+'" alt=""/></a>';
			}else if(item.isDefault==undefined &&  index===0){
				zoomHtml+='<a id="Zoom-1" class="MagicZoom" title="Zoom Image." href="'+item.original+'"><img src="'+item.large+'" alt=""/></a>';
			}
			thumbHtml+= "<a data-slide-id='zoom' data-zoom-id='Zoom-1' href='"+item.original+"'  data-image='"+item.large+"' onclick='thumbimagevedio(event,\"thumbimage\")'> <img src='"+item.thumb+"' alt='"+item.image+"' /></a>";
	   });
	}
	if(!angular.isUndefined(dataVid) && dataVid.length>0){
		angular.forEach(dataVid, function(item,index){
			thumbHtml+="<a data-slide-id='video-1' href='javascript:void(0)' onclick='thumbimagevedio(event,\"video\",\""+item.site+"\",\""+item.vid+"\")'> <span class='glyphicon glyphicon-play'></span> <img src='"+item.thumb_small+"' alt='"+item.title+"' /></a>";
		});
	}

	jQuery('#imgZoomPreview').html(zoomHtml);
    jQuery('#MagicScrollDiv').html(thumbHtml);
    jQuery('#vidZoomPreview').hide();
	jQuery('#imgZoomPreview').show();
    MagicScroll.start('MagicScrollDiv');
    MagicZoom.start();
};

//Thumb nail tab event handler
//@event,type,site,videoid
function thumbimagevedio(event,type,site,videoid){
	if(type==='video'){
		var tempurl = (site=='youtube')?'https://www.youtube.com/embed/':'https://player.vimeo.com/video/';
		 	tempurl+=videoid;
		 jQuery('#vidIframe').attr('src',tempurl);
		 jQuery('#imgZoomPreview').hide();	
		 jQuery('#vidZoomPreview').show();
	}else if(type==='thumbimage'){
		 jQuery('#vidZoomPreview').hide();
		 jQuery('#imgZoomPreview').show();	
	}
	event.stopPropagation();
    event.preventDefault();
};

//create related/crossell/upsell slider section
var _slickOptions ={
	dots: false,
    infinite: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
     responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

function _createRelatedHtml(data){
	var _template = "";
	$.map(data, function(item){
		var _discount = parseInt(item.isDisc),
			_price = parseInt(item.initial_price),
			_desPrice = parseInt(item.special_price),
			_dicUnit = parseInt(item.discPer);

		_template += '<li>'+
			'<a href='+item.url+'>'+
			'<img src='+item.thumbnail_image+' height="285" alt='+item.name+' /> </a>'+
			'<div class="product-info">'+
			'<h2 class="product-name">'+item.name+'</h2> <span class="sku">'+item.sku+'</span>';
		
		//in case product have discount
		if(_discount >=1){
			_template += '<div class="price-wrap">'+
				'<span class="old-price">'+_price+' '+curCode +'</span>'+
				'<span class="new-price">'+_desPrice+' '+curCode +'</span>'+
				'<span class="discount-price">'+_dicUnit+'%</span> </div>';
		}else{
			_template += '<div class="price-wrap">'+
				'<span class="">'+_price +' '+curCode +' </span></div>';
		}
        
       _template += '</div></li>';
	});

	$('.recommend-product .title').show();
	//add html to container and init slick slider
	$("#related-product-section").html(_template);
	$("#related-product-section").slick();
	$("#related-product-section").slick('slickSetOption',_slickOptions, true);	
};

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
};