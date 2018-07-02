var prod_id={relatedprod:[],upsellprod:[],crossellprod:[]};
(function(){
	"used strict";
	/****
	*This controllter used to handel all product related functionality
	*Careated 18 sep 2017
	*Author Smoothgraph Connect Pvt Ltd
	***/
	function productCtrl($scope,salesfactoryData,$http,$sce,$timeout,$filter, treeNodeService){
		console.log(treeNodeService);
		$scope.product={
			name :[],
			prdtags :[],
			stbprice :false,
			processing_time:0,
			initial_price:0,
			special_price:0,
			sp_fromdate:new Date(),
			sp_todate :new Date(),
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
			defaultwhouse:defaultwarehouse 
			
		};
		/******This variable define fro data section *****/
		$scope.prdData={
			//variant section
			variants:variantdata,
			selectTags:[{value:null}],
			//categeroy section
			cateTree:prodcatetreedata,
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
		    showcreatecat:true
		};

		if($scope.prdData.cateTree.length > 0)
		{
			$scope.prdData.showcreatecat=false;
		}else{
			$scope.prdData.showcreatecat=false;
		}

		$scope.product.defaultwhouse.name=true;
		$scope.product.defaultwhouse.stock=true;

		$scope.activalangs = activelangs;
		var selectable = true; 
		//self excute function to gat all product requirement and specification data;
 		function _getReqmtSpeData(){
 			let urlarr =[attribute_requirment_url,warehoseurl];
 			salesfactoryData.getAllData(urlarr,'GET','').then((rs)=>{
 				//attrbute section
 				let attrData = rs[0].data;
 				$scope.prdData.specslist=attrData.attributes;
				$scope.prdData.spesattrset=attrData.attributesets;
				$scope.prdData.reqlist=attrData.requirements;
				$scope.prdData.reqhas=(attrData.requirements.length>0)?true:false;
				//warehouse section
				let wrData = rs[1].data;
				$scope.prdData.warehouse=wrData;

				angular.forEach(wrData, (unit_warehouse)=>{
					
					$scope.product.warehouse_model.push({name:false,stock:false,stock_value:null,lowstock_value:null,safetystock_value:null,warehouse_id:unit_warehouse.warehouse_id});   
				});
			},(error)=>{
 				try{throw new Error("Something went badly wrong!");}catch(e){console.log("Opps "+e)};
 			});
 		};
 		_getReqmtSpeData();
		/******This function used for load product tags on user input****/
		$scope._loadProdTags =(query)=>{
			if(query=='') return;
			let o={'query' : query};
			return salesfactoryData.getData(prdtagurl,'GET',o).then((r)=>{
				return r.data;
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}catch(e){console.log("Opps "+e)};
			});
			console.log("data "+query);
		};
		/******This section used for price section like tire bundel sepcial
		*where mType = tprices,qnty = tire_quantity,qtPrice = tire_quantity_price,
		***/
		$scope.addTireprice =($event,type)=>{ 
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
		$scope.removeTireprice =(index,type)=>{
			switch(type){
				case 'tirerpice':
					if($scope.product.tprices.length>1){
						 $scope.product.tprices.splice(index, 1);
					}else{
						//swal({type: 'warning',text: "You can't remove tire price because \n You have checked tireprice"	});
					}
					break;
				case 'bundelprice':
					if($scope.product.bundelprice.length>1){
						 $scope.product.bundelprice.splice(index, 1);
					}else{
						//swal({type: 'warning',text: "You can't remove bundel price because \n You have checked bundelprice"	});
					}
					break;
				default:
					break;
			};
		};
		$scope.switchPecialPrice =($event,spType)=>{
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
		$scope.sp_check_fun =()=>{
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
		$scope.startDateBeforeRender = ($dates,picker)=>{
			if ($scope.product[picker]) {
				let activeDate = moment($scope.product[picker]);
				//console.log(activeDate)
				$dates.filter(function (date) {
					return date.localDateValue() >= activeDate.valueOf()
				}).forEach(function (date) {
					date.selectable = false;
				});
			}
		};
		$scope.endDateBeforeRender=($view,$dates,$leftDate,$upDate,$rightDate,picker)=>{
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
		$scope.removeVariants =($event,index,tagIndex)=>{
		  $event.stopPropagation();
		  if($scope.prdData.selectTags.length>1){
		        $scope.disAddAnotherBtn= false;
		        $scope.prdData.selectTags.splice(index,1);
		        clickCount--;
		        $scope.product.varientmodel.splice(index,1);
		        $scope.product.variantTagsData[tagIndex]=[];
		        variantComb.splice(index,1);
		   }else{
		    swal({
		      type: 'warning',
		      text: "You can't remove this variants because \n You have checked multiple variants"
		    })
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
			console.log('here?>>>');
			return varients_all_data[index];
			//for only matching element comment above line.
			//return _.filter(varients_all_data[index],(o)=>{ return o.values.toLowerCase()==(query.toLowerCase())});
			// return .filter(function(option) {
			// 	return option.values.toLowerCase().indexOf(query.toLowerCase()) != -1;
			// });        
		};
		$scope.getAttributValuesAndAttribute = function(index,modelIndex,optIndex){
			if(optIndex<0) return;
			let data = {"vid":$scope.product.varientmodel[index].attr_id};
			variantComb[index] = optIndex;
			salesfactoryData.getData(variantUrl,'GET',data).then((r)=>{
				if(_.isArray(r.data) && r.data.length>0) varients_all_data[optIndex] = r.data;
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}catch(e){console.log("Opps "+e)};
			});
		};
		/****This section used for video**/
		var vidfile ='',user_uploadImg='',imgInd=0;
		$scope.getVideoDetail=()=>{
			if(!$scope.product.videodobj.videourl)return false;
		    $scope.vloader = true;
		    var obj = {'v_url':$scope.product.videodobj.videourl}; 
		    salesfactoryData.getData(_getvideourl,'POST',obj).then((r)=>{
		    	let d = r.data;
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
		    },(error)=>{
		        $scope.vloader =false;
		        try{throw new Error("Something went badly wrong!");}
		        catch(e){console.log("error: " + e);}
		    });
		};
		$scope.refreshVideoForm =()=>{
			for(var p in $scope.product.videodobj)
			   if($scope.product.videodobj.hasOwnProperty(p))
						$scope.product.videodobj[p] = '';
		};
		$scope.addVideo = ()=>{
		    if(typeof vidfile !='undefined' && vidfile!=''){
		        $scope.product.videoFile.push(vidfile);
		        $scope.videotemp.usrfileIndex = ++imgInd;
		        vidfile ='';
		    }else {$scope.videotemp.usrfileIndex = 0};
		    $scope.videotemp.vid = $scope.product.videodobj.video_id;
		    $scope.videotemp.videourl = $scope.product.videodobj.videourl;
		    $scope.videotemp.video_title = $scope.product.videodobj.video_title;
		    $scope.videotemp.description = $scope.product.videodobj.description;
		    $scope.videotemp.user_uploadImg = user_uploadImg;
		    $scope.prdData.videolist.push($scope.videotemp);
		    user_uploadImg ='',$scope.product.videodobj.videourl=null,$scope.product.videodobj.video_id=null,$scope.product.videodobj.video_title=null,$scope.product.videodobj.description=null;
		};
		$scope.removeVideo = (vindex,usrfileIndex)=>{
		    $scope.prdData.videolist.splice(vindex, 1);
		    if(usrfileIndex!==0)
		        $scope.product.videoFile.splice(usrfileIndex-1,1);
		};
		/******* video section ends here *****/
		/*****This section used for file upload***/
		/**
         * @property interface
         * @type {Object}
         */
        // Listen for when the interface has been configured.
        $scope.$on('$dropletReady', function whenDropletReady() {
						if($scope.product.file_interface.allowedExtensions){
							$scope.product.file_interface.allowedExtensions(['png','jpeg','jpg', 'bmp', 'gif', 'svg']);
							$scope.product.file_interface.useArray(true);
						}
						if($scope.product.remind_icon_file_interface.allowedExtensions){
							$scope.product.remind_icon_file_interface.allowedExtensions(['png','jpeg','jpg', 'bmp', 'gif', 'svg']);
							$scope.product.remind_icon_file_interface.useArray(true);
						}
						
						// //$scope.file_interface.setRequestUrl('upload.html');
            //$scope.file_interface.defineHTTPSuccess([/2.{2}/]);
						
        //      $scope.interface.addFile(function abc(){
        // 	console.log('here ??');
        // });
        });
             // Listen for when the files have been successfully uploaded.
        $scope.$on('$dropletSuccess', function onDropletSuccess(event, response, files) {
        	
            $scope.uploadCount = files.length;
            $scope.success     = true;
            console.log(response, files);
            $timeout(function timeout() {
                $scope.success = false;
            }, 5000);

        });
         $scope.$on('$dropletFileAdded', function onDropletSuccess(file) {
         	console.log('inside droplet file added');
           	// console.log($scope.product.file_interface.uploadFiles);
            console.log($scope.product.file_interface.getFiles());

            // $scope.uploadCount = files.length;
            // $scope.success     = true;
            // console.log(response, files);

            // $timeout(function timeout() {
            //     $scope.success = false;
            // }, 5000);



        });
//         interface.useParser(function myCustomerParserFn(responseText) {
//     return responseText.toLowerCase();
// });
		$scope._clearallfiles = ()=>{
			var temp_file = $scope.product.file_interface.getFiles($scope.product.file_interface.FILE_TYPES.VALID);
			angular.forEach(temp_file, (item)=>{
				item.deleteFile();
			});
		//	console.log(temp_file);
		};
 		/*****end file upload***/
 		/*****this section used for warehouse****/
 		$scope._wareCheckHendler=(status,index,actType)=>{
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
 		$scope._removeSep= ($event,index,strFlag,item)=>{
			//this function used to remove object from  specs_create_list
			$event.preventDefault(); 
			if(strFlag === 'specification'){
				let temp = angular.copy($scope.prdData.specslist);
				temp = temp.concat(item);
				$scope.prdData.specslist = temp;
				let ind = $scope.prdData.specs_create_list.findIndex(x=>x.id===item.id);
				let ind1 = $scope.product.specmodel.findIndex(x=>x.id===item.id);
				$scope.prdData.specs_create_list.splice(ind,1);
				$scope.product.specmodel.splice(ind1,1);
			}else if(strFlag === 'requirement'){  
				let temp = angular.copy($scope.prdData.reqlist);
				temp = temp.concat(item);
				$scope.prdData.reqlist = temp;
				let ind = $scope.prdData.req_create_list.findIndex(x=>x.id===item.id);
				let ind1 = $scope.product.reqmodel.findIndex(x=>x.id===item.id);
				$scope.prdData.req_create_list.splice(ind,1);
				$scope.product.reqmodel.splice(ind1,1);
			}
		};

		$scope._attrSetChange =()=>{
			let o={};
			if($scope.product.speschoseattrset!==null) o["attr_set_id"]=$scope.product.speschoseattrset.id;
			else{
				o["attr_set_id"] ='';
				$scope.prdData.spescrtupdate="createattrset";
			}
			salesfactoryData.getData(attributeurl,'GET',o).then((r)=>{
				if(r.data){
					console.log(r.data);
					$scope.prdData.specs_create_list=[];
	   			    $scope.copyAttributeSetDataToSpecCreateList(r.data.set_attributes);
                    $scope.copyAttributeSetDataToSpecModel(r.data.set_attributes);

					$scope.prdData.specslist = [];
					$scope.prdData.specslist = r.data.except_attributes;
					//$scope.product.specmodel = [];
					//$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:null});
				}
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}catch(e){console.log("Opps "+e)};
			});
		};
        $scope.copyAttributeSetDataToSpecCreateList = (attrSetData) => {
               if(attrSetData !== undefined){
                       $scope.prdData.specs_create_list = attrSetData;
                       // $scope.prdData.specs_create_list = _.map($scope.prdData.specs_create_list, (specData, indx) => {
                       //      specData.attribute_id = attrSetData[indx]['id'];
                       //      specData.front_input = attrSetData[indx]['front_input'];
                       //      specData.usevaiant = attrSetData[indx]['is_varient'];
                       //      specData.required = attrSetData[indx]['required'];
                       //      return specData;
                       // })
               }
       	};
        $scope.copyAttributeSetDataToSpecModel = (attrSetData) => {
            if(attrSetData !== undefined){
               	$scope.product.specmodel = _.map(attrSetData, (attrData, indx) => {
                       let specData = { 
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
       	$scope.unsetDefaultWarehouse=()=>{
       		if($scope.product.defaultwhouse.stock==false){
       			$scope.product.defaultwhouse.stock_value = null;
       			$scope.product.defaultwhouse.lowstock_value = null;
       			$scope.product.defaultwhouse.safetystock_value = null;
       		}
       	};
		$scope._wareCheckHendlerDefault=()=>{
			if($scope.product.defaultwhouse.name==false){
				$scope.product.defaultwhouse.stock=false;
			}
		};

		$scope.attrRadiochange=(flag)=>{
			if(flag ==='updateattrset'){
				$scope.product.sepscreateset={attrname:null,attrdesp:null,labelflag:null,fontcolor:null,flagbgcolor:null};
			}
		};

		$scope._loadSpecMultiselectAttrs = (attrs) => {
			console.log(_.map(attrs, attr => attr.values));
			return _.map(attrs, attr => attr.values);
		};

		$scope.getSpecTotalPageCount = (totalFilteredSpecCount) => {
			var count = Math.ceil(totalFilteredSpecCount/$scope.prdData.pageSize*1.0)
			return count;
		};
		
		$scope.specListQueryChanged = (filteredSpecsList) => {
			console.log(filteredSpecsList, $scope.prdData.currentPage, $scope.getSpecTotalPageCount(filteredSpecsList.length)-1)
			// If the current page number exceeds the maximum page number, after filtering on a farther page.
			// Eg: If currentpage is 10, but after filtering there is only 1 page. This resets back to page 1
			if( $scope.prdData.currentPage > $scope.getSpecTotalPageCount(filteredSpecsList.length)-1 ){
				$scope.prdData.currentPage = Math.max($scope.getSpecTotalPageCount(filteredSpecsList.length)-1, 0);
			}
		}

		$scope.onDeleteImageFromImageUploadList = (fileitem) => {
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
				let temp =[];
				if(item.get_all_attribute_value_detail.length>0){
					(item.get_all_attribute_value_detail).map((it)=>{
						temp.push({check:false,priceval:null,pricetype:null,orderval:null,attr_val_id:it.attr_val_id});
					});
				}
				$scope.$evalAsync(() => {
					$scope.product.reqmodel.push({priceval:null,pricetype:'Percent',oderval:null,id:item.id,multiopt:temp, id:item.id, front_input: item.front_input, required: item.required});
					let indx = _.findIndex($scope.prdData.reqlist, (x) => x.id === item.id );
					if(indx !== -1){
						$scope.prdData.reqlist.splice(indx, 1);
					}
					$scope.prdData.req_create_list.push(item);
				})
			}
			else if(flag==='specification'){
				$scope.$evalAsync(() => {
					$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:item.id, front_input: item.front_input, required: item.required});
					let indx = _.findIndex($scope.prdData.specslist, (x) => x.id === item.id );
					if(indx !== -1){
						$scope.prdData.specslist.splice(indx, 1);
					}
					$scope.prdData.specs_create_list.push(item);
				})
			}
			// Return false here to cancel drop. Return true if you insert the item yourself.
			return true;
		};

		$scope.processFilePickerFiles = (productObj) => {
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
		
		$scope.processProductImages = (productObj) => {
			var images = [];	
			return Promise.resolve()
			.then(() => {
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

		$scope.processRequirements = (productObj) => {
			return new Promise((res, rej) => {
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

		$scope.processDates = (productObj) => {
			return new Promise((res, rej) => {
				try{
					// Convert expiry date to json string
					if(productObj.expiry_date !== undefined){
						productObj.expiry_date = productObj.expiry_date.toJSON()
					}
					if(productObj.sp_fromdate !== undefined){
						productObj.sp_fromdate = productObj.sp_fromdate.toJSON()
					}
					if(productObj.sp_todate !== undefined){
						productObj.sp_todate = productObj.sp_todate.toJSON()
					}
					// Convert any dates in spec to json string
					for(var i=0; i<productObj.specmodel.length; i++){
						if(productObj.specmodel[i] !== undefined  && productObj.specmodel[i].deldate !== undefined){
							productObj.specmodel[i].deldate = productObj.specmodel[i].deldate.toJSON()
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
			 return new Promise((res, rej) => {
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
		}

		$scope.convertToRequiredSaveFormat = (productObj) => {
			return new Promise((res, rej) => {
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

		/******* save product section*******/
		$scope.saveProduct=($event,productForm)=>{
			$event.stopPropagation();		
			$scope.product.createupdatetype = $scope.prdData.spescrtupdate;
			$scope.product.relatedprod =prod_id;
			var productObj = angular.copy($scope.product)
			$scope.processFilePickerFiles(productObj)
			.then((productObj) => $scope.processRemindIcon(productObj))
			.then((productObj) => $scope.processProductImages(productObj))
			.then((productObj) => $scope.processRequirements(productObj))
			.then((productObj) => $scope.processDates(productObj))
			.then((productObj) => $scope.convertToRequiredSaveFormat(productObj))
			.then((productObj) => {
				console.log(productObj);
				// return salesfactoryData.getData(producturl,'POST', productObj);
				salesfactoryData.getData(producturl,'POST',productObj).then(function(response){
	            	//console.log(response.status);
	            	console.log('inside product');
	            	console.log(response);
	            	if(response.data.status=='error'){
	            		console.log(response.data.section);
	            		if(response.data.section=='product'){
	            			angular.element('#product').siblings().removeClass('active');
	            			angular.element('#product_detail').siblings().removeClass('active in');

	            			angular.element('#product').addClass('active');
	            			angular.element('#product_detail').addClass('active in');
	            		}
	            		if(response.data.section=='warehouse'){
	            			angular.element('#warehouse').siblings().removeClass('active');
	            			angular.element('#product_warehouse').siblings().removeClass('active in');

	            			angular.element('#warehouse').addClass('active');
	            			angular.element('#product_warehouse').addClass('active in');
	            			
	            		}

	            		let errorhtml = '';
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
			            	if(response.data.havevariants=="true"){
			            		//variant or configurabale product case
		            			$scope.variantsCombinationData = response.data.variants;
		            			angular.element('#variantmodal').modal('show'); 
			            	}

			            	else if((response.data.havevariants=="false") && (response.data.status=="success")){
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
			            	}
			            }
			        
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
		
		$scope.saveVariants = function(){
	        //console.log($scope.variantsCombinationData);
	        
	        salesfactoryData.getData(variantsaveurl,'POST',$scope.variantsCombinationData).then(function(response){
	            if(response.data.status==true){ 
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
	   	$scope.saveNewCat=()=>{
			if($scope.catname!='' || $scope.catname!=null){
				console.log($scope);
				salesfactoryData.getData(savenewcaturl,'POST',{catname:$scope.catname}).then((resp)=>{
					if(resp.data.status==="success"){
						$scope.showcatform = false;
						$scope.hidecreatebutton = true;
						$scope.prdData.cateTree = JSON.parse(resp.data.catobj);
					}
				},(error)=>{
					//body
				});
			}
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
}).call(this);
// jQuery section for product section
jQuery(document).ready(function($) {
	setTimeout(function(){
		$('.colorpicker-element').colorpicker();
	}, 200);
});