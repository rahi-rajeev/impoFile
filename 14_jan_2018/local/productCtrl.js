/*
*@Name : productCtrl.js
*@description :  This controllter used to handel all product related functionality
*@Careated :  18 sep 2017
*@Author :  Smoothgraph Connect Pvt. Ltd.
*/

(function(){
	"used strict";

	function productCtrl($scope,salesfactoryData,$http,$sce,$timeout,$filter, treeNodeService,$rootScope){
		$scope.product={
			name :[],
			prdtags :[],
			stbprice :false,
			processing_time:null,
			initial_price:null,
			special_price:0,
			//sp_fromdate:new Date(),
			//sp_todate :new Date(),
			// expiry_date:,
			//price section
			stbprice:'',
			tprices:[{tireQnt:0,tireQntPrice:0}],
			bundelprice:[{bundelqunt:0,bundelprice:0}],
			// tire_quantity:[{val:null}],
			// tire_quantity_price:[{val:null}],
			//variant section
			hasvariants:false,
			varientmodel:[],
			variantTagsData:[],
			//vedio section
			videodobj:{videourl:null,video_prev_img:null,video_id:null,video_title:null,description:null,video_url:null},
			videoFile:[],
			//file upload section
			file_interface:{},
			remind_icon_file_interface:{},
			setdefaultimg :true,
			//warehouse sectio
			warehouse_model:[],
			/****This section used for specification model****/
			specmodel:[],
			speschoseattrset:null,
			sepscreateset:{attrname:null,attrdesp:null,labelflag:null,fontcolor:null,flagbgcolor:null},
			//this section used for requirement model
			reqmodel:[],
			// Selected Category Tree Items
			selectedCateTree: [],
			productImages: [],
			defaultImage: 0,
			createupdatetype:'',
			defaultwhouse:defaultwarehouse, 
			seo:{meta_title:[],meta_keyword:[],meta_description:[]},


		};
		/******This variable define fro data section *****/
		$scope.prdData={
			//variant section
			variants:variantdata,
			selectTags:[{value:null}],
			//categeroy section
			cateTree:[],
			//warehouse sectio
			warehouse: [],
			//video section
			videolist:[],
			//specification section 
			specslist :[],
			currentPage :0,pageSize:10,query:'',
			specs_create_list:[],
			spesattrset :[],
			spescrtupdate:"createattrset",
			spesdateoption:{
				format:'dd-MMMM-yyyy',
				opened: true,
			},
			//product requirement section
		    reqlist:[],reqCurPage:0,reqPageSize:10,reqQuery:'',
		    pagearr:[10,20,30,40,50],
		    req_create_list:[],
		    reqhas:false,
		    //date picker option for date and time
		    dateTimeOption :{
		    	format: 'DD/MM/YYYY HH:mm',
		    	allowInputToggle: true,
		    },
		    dateOnlyOption :{
		    	format : 'DD/MM/YYYY',
		    	useCurrent :false,
		    	allowInputToggle: true,
		    },
		    dateFromOption :{ 
		    	format : 'DD/MM/YYYY', 
		    	useCurrent :false,
		    	allowInputToggle: true,
		    },
		    dateToOption :{
		    	format : 'DD/MM/YYYY',
		    	useCurrent :false,
		    	allowInputToggle: true,
		    },
		    loading:{
		    	"save_and_continue" : false,
		    	"disableBtn" : false,
		    	"btnloaderpath" :tableLoaderImgUrl,
		    },
		    //save and save_and_continue action flag
			save_btn_action : "",
		};
		$scope.product.defaultwhouse.name=true;
		$scope.product.defaultwhouse.stock=true;
		$scope.product.nexpiry=true;
		$scope.product.ready_ship= true;
		$scope.product.autosku= true;
		$scope.product.visibility= true;

		$scope.activalangs = activelangs;
		var selectable = true; 
		//self excute function to gat all product requirement and specification data;
 		function _getReqmtSpeData(){
 			var urlarr =[attribute_requirment_url,warehoseurl,categorylisturl];
 			salesfactoryData.getAllData(urlarr,'GET',{'action' : 'add'}).then(function(rs){
 				//attrbute section
 				var attrData = rs[0].data;
 				$scope.prdData.specslist=attrData.attributes;
				$scope.prdData.spesattrset=attrData.attributesets;
				$scope.prdData.reqlist=attrData.requirements;
				$scope.prdData.reqhas=(attrData.requirements.length>0)?true:false;
				//warehouse section
				var wrData = rs[1].data;
				$scope.prdData.warehouse=wrData;
				//console.log(rs[2]);
				$scope.prdData.cateTree=rs[2].data;
				angular.forEach(wrData, function(unit_warehouse){					
					$scope.product.warehouse_model.push({name:false,stock:false,stock_value:null,lowstock_value:null,safetystock_value:null,warehouse_id:unit_warehouse.warehouse_id});   
				});
			},function(error){
 				_error();
 			});
 		};
 		_getReqmtSpeData();
		/******This function used for load product tags on user input****/
		$scope._loadProdTags = function(query){
			if(query=='') return;
			var o={'query' : query};
			return salesfactoryData.getData(prdtagurl,'GET',o).then(function(r){
				return r.data;
			},function(error){
				_error();
			});
		};
		/******This section used for price section like tire bundel sepcial
		*where mType = tprices,qnty = tire_quantity,qtPrice = tire_quantity_price,
		***/
		$scope.addTireprice = function($event,type){ 
			$event.stopPropagation();
			switch(type){
				case 'tirerpice':
					$scope.product.tprices.push({tireQnt:0,tireQntPrice:0});
					break;
				case 'bundelprice':
					$scope.product.bundelprice.push({bundelqunt:0,bundelprice:0});
					break;
				default:
				 brak;
			};
		};
		$scope.removeTireprice = function(index,type){
			switch(type){
				case 'tirerpice':
					if($scope.product.tprices.length>1){
						 $scope.product.tprices.splice(index, 1);
					}else{
						_messageHandler('warning',"You can't remove tire price because \n You have checked tireprice","Opps..");
					}
					break;
				case 'bundelprice':
					if($scope.product.bundelprice.length>1){
						 $scope.product.bundelprice.splice(index, 1);
					}else{
						_messageHandler('warning',"You can't remove bundel price because \n You have checked bundelprice","Opps..");
					}
					break;
				default:
					break;
			};
		};
		$scope.switchPecialPrice = function($event,spType){
			if(spType==='tireprice'){
				$scope.product.bundelprice=[];
				$scope.product.bundelprice.push({bundelqunt:0,bundelprice:0});
			}else if(spType==='bundleprice'){
				$scope.product.tprices=[];
				$scope.product.tprices.push({tireQnt:0,tireQntPrice:0});
			}else if(spType==='specialprice'){
				$scope.product.tprices=[];
				$scope.product.tprices.push({tireQnt:0,tireQntPrice:0});
				$scope.product.bundelprice=[];
				$scope.product.bundelprice.push({bundelqunt:0,bundelprice:0});
			}
		};
		$scope.sp_check_fun = function(){
			if($scope.product.sp_tp_bp)
				$scope.product.stbprice ="specialprice";
			else{
				$scope.product.stbprice ="";
				$scope.product.tprices=[];
				$scope.product.tprices.push({tireQnt:0,tireQntPrice:0});
				$scope.product.bundelprice=[];
				$scope.product.bundelprice.push({bundelqunt:0,bundelprice:0});
			};
			// console.log($scope.product.sp_tp_bp);
		};
		/******This section used for calender****/
		$scope.startDateBeforeRender = function($dates,picker){
			if ($scope.product[picker]) {
				var activeDate = moment($scope.product[picker]);
				//console.log(activeDate)
				$dates.filter(function (date) {
					return date.localDateValue() >= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				});
			}
		};
		$scope.endDateBeforeRender= function($view,$dates,$leftDate,$upDate,$rightDate,picker){
			if ($scope.product[picker]) {
				var activeDate = moment($scope.product[picker]).subtract(1, $view).add(1, 'minute');
				$dates.filter(function (date) {
					return date.localDateValue() <= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				})
			}
		};
		/***** This section used for all varient function******/
		var clickCount =1,
			variantComb =[],
			varients_all_data=[];
		$scope.addVariants = function(){
		    clickCount++;
		    $scope.prdData.selectTags.push({});
		    if((($scope.prdData.variants.length)-1)<clickCount)
		        $scope.disAddAnotherBtn= true;
		}
		$scope.removeVariants = function($event,index,tagIndex){
		  $event.stopPropagation();
		  if($scope.prdData.selectTags.length>1){
		        $scope.disAddAnotherBtn= false;
		        $scope.prdData.selectTags.splice(index,1);
		        clickCount--;
		        $scope.product.varientmodel.splice(index,1);
		        $scope.product.variantTagsData[tagIndex]=[];
		        variantComb.splice(index,1);
		   }else{
		   		_messageHandler('warning',"You can't remove this variants because \n You have checked multiple variants",'Opps..');
		   }
		};
		$scope._varientCheckAction = function(vstatus){
		    if(vstatus==true && $scope.prdData.selectTags.length<1){
		        $scope.prdData.selectTags=[{value:null}];
		    }
		    /****This case used to remove vaitant if unchecked****/
		    if(!vstatus){
		        $scope.product.varientmodel =[];
		        $scope.product.variantTagsData =[];
		    }
		};
		$scope.loadvariantoptions = function(query,index) {
			return varients_all_data[index];
			//for only matching element comment above line.
			//return _.filter(varients_all_data[index],function(o){ return o.values.toLowerCase()==(query.toLowerCase())});
			// return .filter(function(option) {
			// 	return option.values.toLowerCase().indexOf(query.toLowerCase()) != -1;
			// });        
		};
		$scope.getAttributValuesAndAttribute = function(index,modelIndex,optIndex){
			if(optIndex<0) return;
			var data = {"vid":$scope.product.varientmodel[index].attr_id};
			variantComb[index] = optIndex;
			salesfactoryData.getData(variantUrl,'GET',data).then(function(r){
				if(_.isArray(r.data) && r.data.length>0) varients_all_data[optIndex] = r.data;
			},function(error){
				_error();
			});
		};
		/****This section used for video**/
		var vidfile ='',user_uploadImg='',imgInd=0;
		$scope.getVideoDetail= function(){
			var youtube_reg = new RegExp(/^(http|https\:\/\/)?(www\.youtube|youtu\.be)\/.+$/);
       		var url_regexp =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
       		//check condtion for url 
       		if($scope.product.videodobj.videourl==undefined || $scope.product.videodobj.videourl=='' || !url_regexp.test($scope.product.videodobj.videourl)) return;
			//check youtube share usl
			if($scope.product.videodobj.videourl.match(youtube_reg)){
	            var youtube_id=$scope.product.videodobj.videourl.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
	            $scope.product.videodobj.videourl = "http://www.youtube.com/watch?v=" + youtube_id;  
	        } 	        
		    $scope.vloader = true;
		    var obj = {'v_url':$scope.product.videodobj.videourl}; 
		    salesfactoryData.getData(_getvideourl,'POST',obj).then(function(r){
		    	var d = r.data;
		    	if(d.status=='success' && d){ 
		    		$scope.videotemp = d;
		    		if(!_.isUndefined(d.id)){
		    			$scope.product.videodobj.video_id = d.id;
			           	$scope.product.videodobj.video_url = $sce.trustAsResourceUrl(d.video_url);
			            $scope.product.videodobj.video_prev_img = d.thumbnail_small;
			            $scope.product.videodobj.video_title = d.title;
			            $scope.product.videodobj.description = d.description;  
			            $scope.vloader = false;  
		           }
		    	}
		    },function(error){
		        $scope.vloader =false;
		        _error();
		    });
		};
		$scope.refreshVideoForm = function(){
			for(var p in $scope.product.videodobj)
			   if($scope.product.videodobj.hasOwnProperty(p))
						$scope.product.videodobj[p] = '';
		};
		$scope.addVideo = function(){
		  //case if user can change preview image
		  /*  if(typeof vidfile !='undefined' && vidfile!=''){
		        $scope.product.videoFile.push(vidfile);
		        $scope.videotemp.usrfileIndex = ++imgInd;
		        vidfile ='';
		    }else {$scope.videotemp.usrfileIndex = 0};*/
		    $scope.videotemp.vid = $scope.product.videodobj.video_id;
		    $scope.videotemp.videourl = $scope.product.videodobj.videourl;
		    $scope.videotemp.video_title = $scope.product.videodobj.video_title;
		    $scope.videotemp.description = $scope.product.videodobj.description;
		    $scope.videotemp.user_uploadImg = user_uploadImg;
		    //set video in liast nad file
		    var video_temp = angular.copy($scope.videotemp);
		    $scope.prdData.videolist.push(video_temp);
		    $scope.product.videoFile.push(video_temp);
		    //reset videodobj field
		    user_uploadImg ='',$scope.product.videodobj.videourl=null,$scope.product.videodobj.video_id=null,$scope.product.videodobj.video_title=null,$scope.product.videodobj.description=null;
		};
		$scope.removeVideo = function(vindex,usrfileIndex){
			$scope.prdData.videolist.splice(vindex, 1);
		    $scope.product.videoFile.splice(vindex, 1);
		    //case if user can change preview image
		   /* if(usrfileIndex!==0)
		        $scope.product.videoFile.splice(usrfileIndex-1,1);*/
		};
		/******* video section ends here *****/
		/*****This section used for file upload***/
		// Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {
			if($scope.product.file_interface.allowedExtensions){
				$scope.product.file_interface.allowedExtensions(file_upload_setting.allowed_extension);
				$scope.product.file_interface.useArray(true);
				//number of file can upload onces
				$scope.product.file_interface.setMaximumValidFiles(file_upload_setting.max_number_file);
				// total number of file can upload
				$scope.product.file_interface.setMaxNumberFiles(file_upload_setting.max_number_file);
			}
			if($scope.product.remind_icon_file_interface.allowedExtensions){
				$scope.product.remind_icon_file_interface.allowedExtensions(file_upload_setting.allowed_extension);
				$scope.product.remind_icon_file_interface.useArray(true);
			}
	    });
        // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
            $scope.uploadCount = files.length;
            $scope.success     = true;
            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);
        });
        $scope.$on('$dropletFileAdded', function onDropletSuccess(event,file) {
        	//for file size check (file size in Bytes)
    		var FSize  = file.file.size;
    		FSize =(FSize/1024/1024).toFixed(2);
    		var validDropletFiles = $scope.product.file_interface.getFiles().filter(function(file) {
				return (file.type !== 4);
			});  

         	if(file.type & $scope.product.file_interface.FILE_TYPES.INVALID){
         		if(file.extension !== undefined && _getIndex(file_upload_setting.allowed_extension, file.extension) == -1){
        			_messageHandler('warning','file extension not valid \n Please upload : ' +file_upload_setting.allowed_extension,'Opps..');
         		}else if(file.maximum!== undefined && validDropletFiles.length > file.maximum){
         			_messageHandler('warning','You are exceeds max allowed \t'+file_upload_setting.max_number_file,'Opps..');
         		}else if(file.type && FSize>file_upload_setting.max_file_size){
         			file.deleteFile();         	 
         	   		_messageHandler('warning','File is too Large than max allowed  : \t'+file_upload_setting.max_file_size +'MB','Opps..');
         		}
         	}else if(file.type && FSize>file_upload_setting.max_file_size){
         	   // In case file size larger than alowed file size
         	   file.deleteFile();         	 
         	   _messageHandler('warning','File is too Large than max allowed  : \t'+file_upload_setting.max_file_size +'MB','Opps..');
         	}else if(file.maximum!== undefined && validDropletFiles.length > file.maximum){
         		_messageHandler('warning','You are exceeds max allowed \t'+file_upload_setting.max_number_file,'Opps..');
         	}
        });
		$scope._clearallfiles = function(){
			var temp_file = $scope.product.file_interface.getFiles($scope.product.file_interface.FILE_TYPES.VALID);
			angular.forEach(temp_file, function(item){
				item.deleteFile();
			});
		};
 		/*****end file upload***/
 		/*****this section used for warehouse****/
 		$scope._wareCheckHendler= function(status,index,actType){
 			switch(actType){
 				case "managewarehouse":
 					if(!status){
 						$scope.product.warehouse_model[index].stock=false;
 						$scope.product.warehouse_model[index].stock_value=null;
 						$scope.product.warehouse_model[index].lowstock_value=null;
 						$scope.product.warehouse_model[index].safetystock_value=null;
 					}
 					break;
 				case "managestock":
					$scope.product.warehouse_model[index].stock_value=null;
					$scope.product.warehouse_model[index].lowstock_value=null;
					$scope.product.warehouse_model[index].safetystock_value=null;
 					break;
 				default:
 				break;
 			};
 		};
 		/********Product variants and specification,requirement section*********/
 		$scope._removeSep= function($event,index,strFlag,item){
			//this function used to remove object from  specs_create_list
			$event.preventDefault(); 
			if(strFlag === 'specification'){
				var temp = angular.copy($scope.prdData.specslist);
				temp = temp.concat(item);
				$scope.prdData.specslist = temp;
				var ind = $scope.prdData.specs_create_list.findIndex(function(x){
					return(x.id!== undefined && x.id ===item.id);
				});
				var ind1 = $scope.product.specmodel.findIndex(function(x){
					return(x.id!== undefined && x.id===item.id);
				});
				$scope.prdData.specs_create_list.splice(ind,1);
				$scope.product.specmodel.splice(ind1,1);
			}else if(strFlag === 'requirement'){  
				var temp = angular.copy($scope.prdData.reqlist);
				temp = temp.concat(item);
				$scope.prdData.reqlist = temp;
				var ind = $scope.prdData.req_create_list.findIndex(function(x){
					return(x.id!== undefined && x.id===item.id);					
				});
				var ind1 = $scope.product.reqmodel.findIndex(function(x){
					return(x.d!== undefined && x.id===item.id);
				});
				$scope.prdData.req_create_list.splice(ind,1);
				$scope.product.reqmodel.splice(ind1,1);
			}
		};

		$scope._attrSetChange = function(){
			var o={};
			if($scope.product.speschoseattrset!==null) o["attr_set_id"]=$scope.product.speschoseattrset.id;
			else{
				o["attr_set_id"] ='';
				$scope.prdData.spescrtupdate="createattrset";
			}
			salesfactoryData.getData(attributeurl,'GET',o).then(function(r){
				if(r.data){
					//console.log(r.data);
					$scope.prdData.specs_create_list=[];
	   			    $scope.copyAttributeSetDataToSpecCreateList(r.data.set_attributes);
                    $scope.copyAttributeSetDataToSpecModel(r.data.set_attributes);
					$scope.prdData.specslist = [];
					$scope.prdData.specslist = r.data.except_attributes;
					//$scope.product.specmodel = [];
					//$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:null});
				}
			},function(error){
				_error();
			});
		};
        $scope.copyAttributeSetDataToSpecCreateList = function(attrSetData){
           if(attrSetData !== undefined){
              $scope.prdData.specs_create_list = attrSetData;                      
           }
       	};
        $scope.copyAttributeSetDataToSpecModel = function(attrSetData){
            if(attrSetData !== undefined){
               	$scope.product.specmodel = _.map(attrSetData, function(attrData, indx){
                       var specData = { 
                               textVal:null,
                               selectVal:null,
                               textareaVal:null,
                               usevaiant: (attrData['is_varient'] === "1")? true : false, 
                               attrselect:null,
                               mulattrselect:null,
                               id: attrData['id'],
                               front_input: attrData['front_input'],
                               required: attrData['required']
                       }
                       return specData;
               })
            }
       	};
       	$scope.unsetDefaultWarehouse= function(){
       		if($scope.product.defaultwhouse.stock==false){
       			$scope.product.defaultwhouse.stock_value = null;
       			$scope.product.defaultwhouse.lowstock_value = null;
       			$scope.product.defaultwhouse.safetystock_value = null;
       		}
       	};
		$scope._wareCheckHendlerDefault= function(){
			if($scope.product.defaultwhouse.name==false){
				$scope.product.defaultwhouse.stock=false;
			}
		};

		$scope.attrRadiochange= function(flag){
			if(flag ==='updateattrset'){
				$scope.product.sepscreateset={attrname:null,attrdesp:null,labelflag:null,fontcolor:null,flagbgcolor:null};
			}
		};

		$scope._loadSpecMultiselectAttrs = function(attrs){
			console.log(_.map(attrs, attr => attr.values));
			return _.map(attrs, attr => attr.values);
		};

		$scope.getSpecTotalPageCount = function(totalFilteredSpecCount){
			var count = Math.ceil(totalFilteredSpecCount/$scope.prdData.pageSize*1.0)
			return count;
		};
		
		$scope.specListQueryChanged = function(filteredSpecsList){
			console.log(filteredSpecsList, $scope.prdData.currentPage, $scope.getSpecTotalPageCount(filteredSpecsList.length)-1)
			// If the current page number exceeds the maximum page number, after filtering on a farther page.
			// Eg: If currentpage is 10, but after filtering there is only 1 page. This resets back to page 1
			if( $scope.prdData.currentPage > $scope.getSpecTotalPageCount(filteredSpecsList.length)-1 ){
				$scope.prdData.currentPage = Math.max($scope.getSpecTotalPageCount(filteredSpecsList.length)-1, 0);
			}
		}

		$scope.onDeleteImageFromImageUploadList = function(fileitem){
			fileitem.deleteFile();
			// Filter out images that are not "ngDroplet - type:4 - Deleted".
			var validDropletFiles = _.filter($scope.product.file_interface.getFiles(), file => (file.type !== 4));
			defaultImgIndx = parseInt($scope.product.defaultImage)
			if(!isNaN(defaultImgIndx) && (validDropletFiles.length > 0)){
				// In case the number of images are less than the last activated "set as display image" index
				if(defaultImgIndx >= validDropletFiles.length){
					$scope.product.defaultImage = "" + (validDropletFiles.length - 1);
				}
			}
		}

		$scope.dropCallback = function(index, item, external, type, flag) {
			if(flag==='requirement'){
				var temp =[];
				if(item.get_all_attribute_value_detail.length>0){
					(item.get_all_attribute_value_detail).map(function(it){
						temp.push({check:false,priceval:null,pricetype:null,orderval:null,attr_val_id:it.attr_val_id});
					});
				}
				$scope.$evalAsync(function(){
					$scope.product.reqmodel.push({priceval:null,pricetype:'Percent',oderval:null,id:item.id,multiopt:temp, id:item.id, front_input: item.front_input, required: item.required});
					var indx = _.findIndex($scope.prdData.reqlist, (x) => x.id === item.id );
					if(indx !== -1){
						$scope.prdData.reqlist.splice(indx, 1);
					}
					$scope.prdData.req_create_list.push(item);
				})
			}
			else if(flag==='specification'){
				$scope.$evalAsync(function(){
					$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:item.id, front_input: item.front_input, required: item.required});
					var indx = _.findIndex($scope.prdData.specslist, (x) => x.id === item.id );
					if(indx !== -1){
						$scope.prdData.specslist.splice(indx, 1);
					}
					$scope.prdData.specs_create_list.push(item);
				})
			}
			// Return false here to cancel drop. Return true if you insert the item yourself.
			return true;
		};

		$scope.processFilePickerFiles = function(productObj){
			return _.reduce(productObj.specmodel, (acc, spec, indx) => {
				if(productObj.specmodel[indx].filepickerFile !== undefined){
					// File picker references cant be cloned to productObj (clone of $scope.product)
					// Hence obtain the references from $scope.product
					acc = acc.then(() => getBase64Url($scope.product.specmodel[indx].filepickerFile[0]))
										.then((fileJsonObj) => {
											productObj.specmodel[indx].filepickerVal = fileJsonObj
										})
										.catch((err) => console.log );
				}
				return acc;
			}, Promise.resolve())
			.then(() => productObj)
			.catch((err) => {
				console.log(err);
				return Promise.reject(err);
			});
		}

		$scope.processRemindIcon = (productObj) => {
			return Promise.resolve()
			.then(() => {
				if(_.isEmpty($scope.product.remind_icon_file_interface)) return Promise.resolve();
				// The ngDroplet file interface cannot be cloned, hence we need to look into $scope.product object
				var validDropletFiles = _.filter($scope.product.remind_icon_file_interface.getFiles(), file => (file.type !== 4));
				if(validDropletFiles[0] !== undefined && validDropletFiles[0].file){
					return getBase64Url(validDropletFiles[0].file)
								.then((fileJsonObj) => {
									productObj.sepscreateset.remind_icon = fileJsonObj;
									return productObj;
								})
								.catch((err) => {
									console.log(err);
									return Promise.reject(err);
								});
				}
				return Promise.resolve();
			})
			.then(() => {
				return Promise.resolve(productObj);
			})
			.catch((err) => {
				console.log(err);
				return Promise.reject(err);
			});
		}
		
		$scope.processProductImages = function(productObj){
			var images = [];	
			return Promise.resolve()
			.then(function(){
				// Filter out images that are not "ngDroplet - type:4 - Deleted".
				var validDropletFiles = _.filter(productObj.file_interface.getFiles(), file => (file.type !== 4));
				// Go through all images, and convert to base64 one by one
				return _.reduce(validDropletFiles, (acc, dropletmodel, indx) => {
					acc = acc.then(() => getBase64Url(dropletmodel.file))
										.then((fileJsonObj) => {
											fileJsonObj.is_default = false;
											images.push(fileJsonObj);
										})
										.catch((err) => {
											console.log(err);
											return Promise.reject(err);
										});
					return acc;
				}, Promise.resolve())
			})
			.then(() => {
				// Mark the default image with is_default = true
				defaultImgIndx = parseInt(productObj.defaultImage)
				if(!isNaN(defaultImgIndx) && images.length > 0){
					// In case the number of images are less than the last activated "set as display image" index
					if(defaultImgIndx >= images.length){
						images[images.length - 1].is_default = true;	
					}else{
						images[defaultImgIndx].is_default = true;
					}
				}
				productObj.productImages = images;
			})
			.then(() => productObj)
			.catch((err) => {
				console.log(err);
				return Promise.reject(err);
			});
		}

		$scope.processRequirements = function(productObj){
			return new Promise(function(res, rej){
				try{
					for(var i=0; i<productObj.reqmodel.length; i++){
						// If the requirement is a multiple option select requirement
						if((productObj.reqmodel[i] !== undefined) && (productObj.reqmodel[i].multiopt !== undefined)){
							for(var j=productObj.reqmodel[i].multiopt.length-1; j >= 0; j--){
								if(productObj.reqmodel[i].multiopt[j].check !== true){
									productObj.reqmodel[i].multiopt.splice(j, 1);
								}
							}
						}
					}
					res(productObj);
				}
				catch(err){
					rej(err);
				}
			});
		}

		$scope.processDates = function(productObj){
			return new Promise(function(res, rej){
				try{
					// Convert expiry date to json string
					if(productObj.expiry_date !== undefined && productObj.expiry_date){
						productObj.expiry_date = productObj.expiry_date.toJSON();
						//productObj.expiry_date = productObj.expiry_date.toDate();
						//console.log(productObj.expiry_date);
					}
					if(productObj.sp_fromdate !== undefined && productObj.sp_fromdate){
						// productObj.sp_fromdate = productObj.sp_fromdate.toJSON();
						//console.log(productObj.sp_fromdate.toDate());
						//console.log(productObj.sp_fromdate.toJSON());
						//productObj.sp_fromdate = productObj.sp_fromdate.toDate();
						console.log(productObj.sp_fromdate);
						var d = new Date(productObj.sp_fromdate);
						productObj.sp_fromdate = d.toLocaleDateString().replace(/\//g,'-');


					}
					if(productObj.sp_todate !== undefined && productObj.sp_todate){
						//productObj.sp_todate = productObj.sp_todate.toJSON();
						//productObj.sp_todate = .toDate();
						var ds = new Date(productObj.sp_todate);
						productObj.sp_todate = ds.toLocaleDateString().replace(/\//g,'-');

					}
					// Convert any dates in spec to json string
					for(var i=0; i<productObj.specmodel.length; i++){
						if(productObj.specmodel[i] !== undefined  && productObj.specmodel[i].deldate !== undefined && productObj.specmodel[i].deldate){
							//productObj.specmodel[i].deldate = productObj.specmodel[i].deldate.toJSON();
							productObj.specmodel[i].deldate = productObj.specmodel[i].deldate.toDate();
						}
					}
					res(productObj);
				}
				catch(err){
					rej(err);
				}
			});
		}

		function getBase64Url(fileObj) {
			 return new Promise(function(res, rej){
				 try{
					reader = new FileReader();
					reader.readAsDataURL(fileObj);
					reader.onloadend = function(){
						res({
							filename: fileObj.name,
							filecontent: reader.result
						});
					};
				 }
				 catch(err){
					 rej(err);
				 }
			 });
		};

		$scope.convertToRequiredSaveFormat = function(productObj){
			return new Promise(function(res, rej){
				try{
					var specs = [];
					for(var i=0; i<productObj.specmodel.length; i++){
						var spec = {};
						spec.attribute_id = productObj.specmodel[i].id;
						spec.front_input = productObj.specmodel[i].front_input;
						spec.usevaiant = productObj.specmodel[i].usevaiant;
						spec.required = productObj.specmodel[i].required;
							
						if(productObj.specmodel[i].front_input === 'text'){
								spec.attribute_values = productObj.specmodel[i].textVal;
						}
						else if(productObj.specmodel[i].front_input === 'textarea'){
								spec.attribute_values = productObj.specmodel[i].textareaVal;
						}
						else if(productObj.specmodel[i].front_input === 'date_picker'){
							spec.attribute_values = productObj.specmodel[i].deldate;
						}
						else if(productObj.specmodel[i].front_input === 'select'){						
							if(productObj.specmodel[i].attrselect !== null){
								options = [];
								if(_.isArray(productObj.specmodel[i].attrselect)){
									options = productObj.specmodel[i].attrselect
								}
								else if(_.isObject(productObj.specmodel[i].attrselect)){
									options = [productObj.specmodel[i].attrselect]
								}
								spec.attribute_value_ids = _.map(options || [], (v) => v.attr_val_id);
							}
							// if(productObj.specmodel[i].attrselect !== null){
							// 	spec.attribute_value_ids = productObj.specmodel[i].attrselect.attr_val_id;
							// }
						}
						else if(productObj.specmodel[i].front_input === 'multiselect'){
							if(productObj.specmodel[i].mulattrselect !== null){
								options = [];
								if(_.isArray(productObj.specmodel[i].mulattrselect)){
									options = productObj.specmodel[i].mulattrselect
								}
								else if(_.isObject(productObj.specmodel[i].mulattrselect)){
									options = [productObj.specmodel[i].mulattrselect]
								}
								spec.attribute_value_ids = _.map(options || [], (v) => v.attr_val_id);
							}
						}
						else if(productObj.specmodel[i].front_input === 'browse_file'){
							spec.files = productObj.specmodel[i].filepickerVal;
						}
						specs.push(spec);
					}
					productObj.specmodel = specs;
					res(productObj);
				}
				catch(err){
					rej(err);
				}
			})
		};	

		//Listen on  save or save and continue product section
		$scope.saveProduct= function($event, productForm, btn_action){
			$event.stopPropagation();
			//set button action
			$scope.prdData.save_btn_action = btn_action; 
			console.log($scope.product);
			//return false;
			//enable page loader and disable save,save_continue button
			$scope.prdData.loading.save_and_continue = true;
			$scope.prdData.loading.disableBtn = true;
			//console.log($event)
			//console.log($event.currentTarget.value)
			//	alert(productForm.$invalid);

			$scope.product.createupdatetype = $scope.prdData.spescrtupdate;
			var productObj = angular.copy($scope.product);
			//console.log(JSON.stringify(productObj));
			//return;
			$scope.processFilePickerFiles(productObj)
			.then((productObj) => $scope.processRemindIcon(productObj))
			.then((productObj) => $scope.processProductImages(productObj))
			.then((productObj) => $scope.processRequirements(productObj))
			.then((productObj) => $scope.processDates(productObj))
			.then((productObj) => $scope.convertToRequiredSaveFormat(productObj))
			.then((productObj) => {	
				//set product id related,crosssale ,upsale ,simple product and config product			
				productObj["config_prd_id"] = $rootScope.prd_data.config_product_id;
				productObj["simple_prd_id"] = $rootScope.prd_data.simple_product_id;

				productObj["related_prd_id"] = $rootScope.prd_data.related_product_id_id;
				productObj["crossale_prd_id"] = $rootScope.prd_data.cross_sale_product_id;
				productObj["upsale_prd_id"] = $rootScope.prd_data.up_sale_product_id;
				//console.log(JSON.stringify(productObj));
				//return;
				if(typeof product_type !=="undefined" && product_type!==undefined){
					productObj["product_type"] = product_type;	
				}
				
				// console.log(productObj);
				// return false;		 
				salesfactoryData.getData(producturl,'POST',productObj).then(function(response){
					$scope.prdData.loading.save_and_continue = false;
					$scope.prdData.loading.disableBtn = false;

	               	if(response.data.status=='error'){
	               		//enable tab 
	            		if(response.data.section=='product'){
	            			$scope.liActiveHandler('','enable_product_tab');
						}else if(response.data.section=='warehouse'){	            		
	            			$scope.liActiveHandler('','enable_warehouse_tab');
	            		}else if(response.data.section == 'bundle'){
	            			$scope.liActiveHandler('','enable_bundel_tab');
	            		}
	            		
	            		var errorhtml = '';
	            		angular.forEach(response.data.error, (error)=>{
							errorhtml += '<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span>'+error+'</div>'
						});
	            		swal({
							  title: '',
							  type: 'error',
							  html: errorhtml,
							  showCloseButton: true,
							  showCancelButton: false,
							  focusConfirm: false,
							  showConfirmButton: false
							  
							})
	            		errorhtml = '';
	            	}else{
	            		if($scope.prdData.save_btn_action == 'save' && response.data.status=="success"){
	            			swal({
		                        title: "Good",
		                        text: "Product successfully created try other.",
		                        type: "success",
		                        showConfirmButton:false,
		                        timer: 3000
		                    }).then(
	                           function () {},
	                           function(dismiss){                           
	                          	window.location.href = response.data.save_url;
	                            //window.location.href = productvarianturl+response.data.pid;
	                    	});

	            			/*if(response.data.havevariants==true){
	            				window.location.href = productvarianturl;
			            		//variant or configurabale product case
		            			//$scope.variantsCombinationData = response.data.variants;
		            			//angular.element('#variantmodal').modal('show'); 
			            	}else if((response.data.havevariants== false) && (response.data.status=="success")){
			            		swal({
			                        title: "Good",
			                        text: "Product successfully created.",
			                        type: "success",
			                        showConfirmButton:false,
			                        timer: 3000
			                    }).then(
		                           function () {},
		                           function(dismiss){                           
		                          	window.location.href = productvarianturl;
		                            //window.location.href = productvarianturl+response.data.pid;
		                    	});
			            	}*/		
	            		}else if($scope.prdData.save_btn_action == 'save_and_continue' && response.data.status=="success"){
	            			swal({
		                         title: "Good",
		                         text: "Product successfully created.",
		                         type: "success",
		                         showConfirmButton:false,
		                         timer: 3000
			                 })
        					 .then(
	                          function () {},
	                          function(dismiss){                           
	                          	window.location.href = response.data.cont_url;
	                            //window.location.href = productvarianturl+response.data.pid;
                    	    });
	            		}	            		
			        }
			    },(error)=>{
					$scope.prdData.loading.save_and_continue = false;
					$scope.prdData.loading.disableBtn = false;
					_error();
			    });
		    })
			.then((res)=>{
				console.log(res);
			})
			.catch((err) => {
				console.log(err)
			});
		 //  this.sendImagesViaAjax();
		};
		//Listen on save all change varient
		$scope.saveVariants = function(){
	        salesfactoryData.getData(variantsaveurl,'POST',$scope.variantsCombinationData)
	        .then(function(response){
	        	if(response.data.status!==undefined && (response.data.status === true || response.data.status == true)){ 
	                angular.element('#variantmodal').modal('hide'); 
	                swal({
	                     title: "Good",
	                     text: "Product successfully created.",
	                     type: "success",
	                     timer: 3000
                     }).then(
                      function(){},
                      function(dismiss){
                      		window.location.href = productvarianturl;
                       // window.location.href = productvarianturl+response.data.parent_id;
	                });                
	            }	               
	        },function(error){
	        	_error();
	        });
	    };
 		/*******Related product section (Table section config)*****/
 		$scope.checksku= function(sku){
        	var data = {'sku':sku };
        	salesfactoryData.getData(skucheckurl,'GET',data).then(function(response){
	    		if(response.data.status){
	                $scope.skuexists = true;
	            }
	            else{
	                $scope.skuexists = false;
	            }
           
        	});
	    };
	    //save new category section savenewcaturl
	   	$scope.saveNewCat= function(){
			if($scope.catname!='' || $scope.catname!=null){
				console.log($scope);
				salesfactoryData.getData(savenewcaturl,'POST',{catname:$scope.catname}).then(function(resp){
					if(resp.data.status==="success"){
						$scope.showcatform = false;
						$scope.hidecreatebutton = true;
						$scope.prdData.cateTree = JSON.parse(resp.data.catobj);
					}
				},function(error){
					//body
				});
			}
		};
		//Bundel product section
		//Listen on product tab (li) active
		$scope.liActiveHandler = function($event,strflag){
			for (var p in $rootScope.prd_tab) {
			    if ($rootScope.prd_tab.hasOwnProperty(p) && p===strflag) {
			        $rootScope.prd_tab[p] = true;
			        if(strflag==='enable_related_tab'){
			        	$scope.$broadcast('getRelatedPrdData');
			        }
			    }else{
					$rootScope.prd_tab[p] = false;
				}
			}
			// if($event=='') return;
			// $event.preventDefault();
		};
		/**
        *Listen on change date (from to ) and  update date picker
		*@params dateFrom and dateTo
		*@param Datepicker option name (dateFromOption and dateToOption)
		**/
        $scope._updateDatePicker = function(dateFrom, dateTo, dateFromOption, dateToOption){
        	
        	console.log('inside update date picker');
        	console.log(dateFrom);


        	$scope.prdData[dateFromOption].maxDate = dateTo;
            $scope.prdData[dateToOption].minDate = dateFrom;
        };
	};
	var filesInputDirective = function() {
		return {
			require: "ngModel",
			link: function postLink(scope,elem,attrs,ngModel) {
				elem.on("change", function(e) {
					var files = elem[0].files; 
					ngModel.$setViewValue(files);
				})
			}
		}
	};
	

	angular.module("sabinaAdminApp").controller('productCtrl', productCtrl);
	angular.module("sabinaAdminApp").directive("filesInput", filesInputDirective);

	//Listen on error 
    function _error(){
      try{throw new Error("Something went badly wrong!");}
      catch(e){
      	_messageHandler('error','Something went wrong!','Oops...')
        console.log("Opps "+e);      
      };
    };
	/****
    *This function used to message display using sweert alert.
    *@_type : like error, sucess
    *@_txt : message
    *@_title : message title
    *@_time :timer for auto hide after timeout
	*@_showCancelButton :  true or false
    *****/
    function _messageHandler(_type,_txt,_title,_time,_showCancelButton){
    	swal({
    		position: 'top-right',
    		type: _type,
    		title: _title,
    		text: _txt,
    		//timer : _time || 1500,
    		closeOnConfirm: false,
	        closeOnCancel: false
    	}).then(function(isConfirm){
    		 // handle confirm, result is needed for modals with input    		 
       	},function(dismiss){
    		// dismiss can be "cancel" | "close" | "outside"    		
    	});    	
    };	

})(window.angular);
// jQuery section for product section
jQuery(document).ready(function($) {
	setTimeout(function(){
		$('.colorpicker-element').colorpicker();
	}, 200);
});