(function(){
	"used strict";
	/****
	*This controllter used to handel all product related functionality
	*Careated 18 sep 2017
	*Author Smoothgraph Connect Pvt Ltd
	***/
	function productCtrl($scope,salesfactoryData,$http,$sce,$timeout,$filter, treeNodeService,$rootScope){
		$scope.product={
			name :[],
			productDesc:[],
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
			//selectedCateTree: [],
			productImages: [],
			defaultImage: 0,
			seo:{meta_title:[],meta_keyword:[],meta_desc:[]}
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

		};
		$scope.prevImage = product_detail.has_product_image;
		$scope.image_url= product_detail.image_url;
		//get sepecifiaction and requirement data from server
		function _getSpecification(){
			salesfactoryData.getData(attribute_requirment_url,'GET','')
			.then((r)=>{
				let attrData = r.data;
				if(attrData){
					_.forEach(attrData.attributes,(item,key)=>{

					});
					$scope.prdData.specslist=attrData.attributes;
					$scope.prdData.spesattrset=attrData.attributesets;
					$scope.prdData.reqlist=attrData.requirements;
					$scope.prdData.reqhas=(attrData.requirements.length>0)?true:false;
					if(!angular.isUndefined(product_detail.attribute_set_id) && product_detail.attribute_set_id!=''){
						let o = _.filter($scope.prdData.spesattrset,(o)=> {return o.id==product_detail.attribute_set_id;});
						$scope.product.speschoseattrset=o[0];
						$scope._attrSetChange('prevAttrSet');
					}	
				}
			},(err)=>console.log);
		};
		//get sepecifiaction from server
		function _getCatogary(){
			salesfactoryData.getData(categorylisturl,'GET',{action : "productCatEdit"})
			.then((r)=>{
				if(r.data)
				  $scope.prdData.cateTree=r.data;
			},(err)=>console.log);
		};
		//get warehouse data from server
		function _getWarehouse(){
			//$scope.prdData.warehouse= product_detail.has_warehouse;
			salesfactoryData.getData(warehoseurl,'GET','')
			.then((r)=>{
				let wrData = r.data;
				if(wrData){
					$scope.prdData.warehouse=wrData;
					for(var p in wrData){
					   $scope.product.warehouse_model.push({name:false,stock:false,stock_value:null,lowstock_value:null,safetystock_value:null,warehouse_id:warehouses[p].warehouse_id});   
					};
				}
			},(error)=>console.log);
		};
		_getSpecification();
		_getCatogary();
		_getWarehouse();
		//Listen on set tire and bundel price
		$scope.setTireBundlePrice = (type)=>{
			if(type =='tire'){
				var tprices = [];
				angular.forEach(product_detail.has_tire_bundle_price, function(value, key) {
				    this.push({tireQnt:value.quantity,tireQntPrice:value.price});
				}, tprices);
				if(tprices.length>=1){
					$scope.product.tprices = tprices;	
				}
			} 
			if(type=='bundle'){
				var bprices = [];
				angular.forEach(product_detail.has_tire_bundle_price, function(value, key) {
				    this.push({bundelqunt:value.quantity,bundelprice:value.price});
				}, bprices);
				if(bprices.length>=1){
					$scope.product.bundelprice = bprices;	
				}
			}
		};

		//console.log(JSON.stringify(product_detail));
		//This section used for default value in case of edit
		if(!angular.isUndefined(product_detail) && angular.isObject(product_detail)){
			if(!angular.isUndefined(product_detail.has_description) && angular.isArray(product_detail.has_description) && product_detail.has_description.length>0){
				_.map(product_detail.has_description,(item)=>{
					$scope.product.name[item.lang_id]=item.name;
					$scope.product.productDesc[item.lang_id]=item.description;
					$scope.product.seo.meta_title[item.lang_id]=item.meta_title;
					$scope.product.seo.meta_keyword[item.lang_id]=item.meta_keyword;
					$scope.product.seo.meta_desc[item.lang_id]=item.description;
				});
			}
			if(!angular.isUndefined(product_detail.has_tags) && angular.isArray(product_detail.has_tags) && product_detail.has_tags.length>0){
				$scope.product.prdtags= _.pluck(product_detail.has_tags,'get_tags');
			}
			console.log(product_detail.processing_type);
			//var reg = /^(([0]?[1-9]|1[0-2])/([0-2]?[0-9]|3[0-1])/[1-2]\d{3}) (20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/;
			//console.log(product_detail.expiry_datetime.match(reg));
			$scope.product.processing_time = product_detail.delivertime;
			$scope.product.processing_type = product_detail.processing_type;
			//$scope.product.expiry_date = product_detail.expiry_datetime;
			$scope.product.autosku = (product_detail.auto_sku == 1 ) ? true: false;
			$scope.product.sku = product_detail.sku;
			$scope.product.initial_price = product_detail.initial_price;
			$scope.product.sp_tp_bp = (product_detail.has_sp_tp_bp=='true') ? true: false;
			$scope.product.selectedCateTree=_.pluck(product_detail.has_categories,'cat_id');
			//console.log('selected Category tree value')
			//console.log($scope.product.selectedCateTree);
			if(product_detail.sp_tp_bp_type == 1){
				$scope.product.stbprice="specialprice";	
				$scope.product.special_price = product_detail.special_price;

			}else if (product_detail.sp_tp_bp_type == 2){
				$scope.product.stbprice="tireprice";
				$scope.setTireBundlePrice('tire');

			}else if(product_detail.sp_tp_bp_type == 3){
				$scope.product.stbprice="bundleprice";
				$scope.setTireBundlePrice('bundle');			
			}
		}
		

		$scope.activalangs = activelangs;
		var selectable = true; 
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
						swal({type: 'warning',text: "You can't remove tire price because \n You have checked tireprice"	});
					}
					break;
				case 'bundelprice':
					if($scope.product.bundelprice.length>1){
						 $scope.product.bundelprice.splice(index, 1);
					}else{
						swal({type: 'warning',text: "You can't remove bundel price because \n You have checked bundelprice"	});
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
			            $scope.vloader =false;  
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
		/*****This section used for file upload***/
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
			//$scope.product.file_interface.addFile(blob);
			// $scope.product.file_interface.addFile({
			// 	name: product_detail.has_product_image.image,
			// 	type: 'image/png'
			// });
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
         	if(file.type & $scope.product.file_interface.FILE_TYPES.INVALID){
         		swal('file extension not valid')
         	}
        });
		$scope._clearallfiles = ()=>{
			var temp_file = $scope.product.file_interface.getFiles($scope.product.file_interface.FILE_TYPES.VALID);
			angular.forEach(temp_file, (item)=>{
				item.deleteFile();
			});
		};
		/*********This function used for delete previous uploaded image on product add page**********/
	    $scope.deletePrevUploadImg =($event,fileId, index)=>{
	    	$event.stopPropagation();
	        swal({
		        title: "Are you sure?",
		        text: "You will not be able to recover this imaginary file!",
		        type: "warning",
		        showCancelButton: true,
		        confirmButtonColor: '#DD6B55',
		        confirmButtonText: 'Yes, I am sure!',
		        cancelButtonText: "No, cancel it!",
		        closeOnConfirm: false,
		        closeOnCancel: false
		    }).then((isConfirm)=>{
		        if (isConfirm) {
		            salesfactoryData.getData(prdimage_delete_url,'POST',{"imageId" : fileId})
		            .then((response)=>{
		                if(response.data.status=='success') {
		                   swal(response.data.mesg_title, response.data.mesg, "success")
		                   $scope.prevImage.splice(index,1); 
		                }
		                if(response.data.status=='error'){
		                    swal({
		                      title: response.data.mesg_title,
		                      text: response.data.mesg,
		                      type: "error",
		                      confirmButtonText: response.data.c_btn_text
		                    });
		                }
		            });            
		        }
		    });
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
 		//edit section
 		// var t= _.filter($scope.prdData.spesattrset,product_detail.attribute_set_id);
 		// // var t = _.filter($scope.prdData.spesattrset,function(o) {
 		// // 	return o.id==product_detail.attribute_set_id;
 		// // });
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
		$scope.moveHandler=(item,flag)=>{
			if(flag==='requirement'){
				let temp =[];
				if(item.get_all_attribute_value_detail.length>0){
					(item.get_all_attribute_value_detail).map((it)=>{
						temp.push({check:false,priceval:null,pricetype:null,orderval:null,attr_val_id:it.attr_val_id});
					});
				}
				$scope.product.reqmodel.push({priceval:null,pricetype:'Percent',oderval:null,id:item.id,multiopt:temp});
			}
			else if(flag==='specification'){
				$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:item.id, front_input: item.front_input, required: item.required});
				$scope.$evalAsync(() => {
					$scope.prdData.specslist = _.without($scope.prdData.specslist, item);
				})
			}
			//{textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:null,deldate:null}
		};

		$scope._attrSetChange =(strflag)=>{
			let o={};
			if($scope.product.speschoseattrset!==null) o["attr_set_id"]=$scope.product.speschoseattrset.id;
			else{
				o["attr_set_id"] ='';
				$scope.prdData.spescrtupdate="createattrset";
			}
			salesfactoryData.getData(attributeurl,'GET',o).then((r)=>{
				if(r.data){
					$scope.prdData.specs_create_list=[];
					$scope.prdData.specs_create_list = r.data.set_attributes || [];
					$scope.prdData.specslist = [];
					$scope.prdData.specslist = r.data.except_attributes;
					if(typeof strflag!=="undefined" && strflag==="prevAttrSet"){
						_setPrevSelectedSpec();
					}
					//prevAttrSet
					//$scope.product.specmodel = [];
					//console.log(JSON.stringify($scope.prdData.specs_create_list));
					//$scope.product.specmodel.push({textVal:null,selectVal:null,textareaVal:null,usevaiant:false,attrselect:null,mulattrselect:null,id:null});
				}
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}catch(e){console.log("Opps "+e)};
			});
		};
		$scope.attrRadiochange=(flag)=>{
			if(flag ==='updateattrset'){
				$scope.product.sepscreateset={attrname:null,attrdesp:null,labelflag:null,fontcolor:null,flagbgcolor:null};
			}
		};
		//lISTEN ON SET PREVIOUS SPECIFICATION SELECTED VALUE
		function _setPrevSelectedSpec(){
			//console.log(spec_selected_value);
			angular.forEach($scope.prdData.specs_create_list, (item,index)=>{
				console.log(item.front_input);
				if(item.front_input==="multiselect"){
					let _filerObj = _.find(spec_selected_value,{"attribute_id" : item.id});
					let v =[];					
					for(let i in _filerObj.attribute_values){
						let r = _.filter(item.get_all_attribute_value_detail,(o)=>{return o.attr_val_id == _filerObj.attribute_values[i]});
						v= v.concat(r);					
					}
					$scope.product.specmodel[index] =  {"mulattrselect" :  v};
				}else if(item.front_input==="select"){
					//thre are tow condition in this section
					console.log('multiselect1');
					let _filerObj = _.find(spec_selected_value,{"attribute_id" : item.id});
					let ind = _.findIndex(item.get_all_attribute_value_detail,(o)=>{
						return o.attr_val_id == _filerObj.attribute_values;
					});
					$scope.product.specmodel[index] = {"attrselect" :  item.get_all_attribute_value_detail[ind]};
				}else if(item.front_input === "text"  || item.front_input === "textarea"){
					let _filerObj = _.find(spec_selected_value,{"attribute_id" : item.id});
					$scope.product.specmodel[index] = (item.front_input === "text")?{"textVal" : _filerObj.attribute_values}: {"textareaVal" : _filerObj.attribute_values};
				}else if(item.front_input=== 'date_picker'){
					let _filerObj = _.find(spec_selected_value,{"attribute_id" : item.id});
					$scope.product.specmodel[index] = {"deldate" : _filerObj.attribute_values};					
					
				}else if(item.front_input==="browse_file"){
					let _filerObj = _.find(spec_selected_value,{"attribute_id" : item.id});
					//
					console.log(_filerObj);
				}
			});			
		};

		// $scope.onExpiryDateTimePickerSet = (newDate, oldDate, indx) => {
		// 	$scope.product.expiry_date_str = $scope.product.expiry_date.toJSON()
		// }	

		// $scope.onSpecDateTimePickerSet = (newDate, oldDate, indx) => {
		// 	$scope.product.specmodel[indx].deldateStr = $scope.product.specmodel[indx].deldate.toJSON()
		// }

		$scope.getSpecTotalPageCount = (totalFilteredSpecCount) => {
			var count = Math.ceil(totalFilteredSpecCount/$scope.prdData.pageSize*1.0)
			return count;
		}
		
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
			.then(() => productObj);
		}

		$scope.processRemindIcon = (productObj) => {
			// The ngDroplet file interface cannot be cloned, hence we need to look into $scope.product object
			var validDropletFiles = _.filter($scope.product.remind_icon_file_interface.getFiles(), file => (file.type !== 4));
			if(validDropletFiles[0] !== undefined && validDropletFiles[0].file){
				return getBase64Url(validDropletFiles[0].file)
							.then((fileJsonObj) => {
								productObj.sepscreateset.remind_icon = fileJsonObj;
								return productObj;
							});
			}
			return Promise.resolve(productObj);
		}
		
		$scope.processProductImages = (productObj) => {
			images = [];	
			// Filter out images that are not "ngDroplet - type:4 - Deleted".
			var validDropletFiles = _.filter(productObj.file_interface.getFiles(), file => (file.type !== 4));
			// Go through all images, and convert to base64 one by one
			return _.reduce(validDropletFiles, (acc, dropletmodel, indx) => {
				acc = acc.then(() => getBase64Url(dropletmodel.file))
									.then((fileJsonObj) => {
										fileJsonObj.is_default = false;
										images.push(fileJsonObj);
									});
				return acc;
			}, Promise.resolve())
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
				return productObj;
			})
			.catch((err) => console.log);
		}

		$scope.processRequirements = (productObj) => {
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
			return Promise.resolve(productObj);
		}

		$scope.processDates = (productObj) => {
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
			return Promise.resolve(productObj);
		}

		function getBase64Url(fileObj) {
			 return new Promise((res, rej) => {
				reader = new FileReader();
				reader.readAsDataURL(fileObj);
				reader.onloadend = function(){
					res({
						filename: fileObj.name,
						filecontent: reader.result
					});
				};
			 });
		}

		$scope.convertToRequiredSaveFormat = (productObj) => {
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
						spec.attribute_value_ids = productObj.specmodel[i].attrselect.attr_val_id;
					}
				}
				else if(productObj.specmodel[i].front_input === 'multiselect'){
					if(productObj.specmodel[i].mulattrselect !== null){
						spec.attribute_value_ids = _.map(productObj.specmodel[i].mulattrselect || [], (v) => v.attr_val_id);
					}
				}
				else if(productObj.specmodel[i].front_input === 'browse_file'){
					spec.files = productObj.specmodel[i].filepickerVal;
				}
				specs.push(spec);
			}
			productObj.specmodel = specs;
			return Promise.resolve(productObj);
		};

		/******* save product section*******/
		$scope.saveProduct=($event,productForm)=>{
			$event.stopPropagation();
			console.log($scope.product.file_interface.getFiles());
			var productObj = angular.copy($scope.product)
			$scope.processFilePickerFiles(productObj)
			.then((productObj) => $scope.processRemindIcon(productObj))
			.then((productObj) => $scope.processProductImages(productObj))
			.then((productObj) => $scope.processRequirements(productObj))
			.then((productObj) => $scope.processDates(productObj))
			.then((productObj) => $scope.convertToRequiredSaveFormat(productObj))
			.then((productObj) => {
				console.log(productObj);
				return salesfactoryData.getData(producturl,'POST', productObj);
			})
			 .then((r)=>{
				console.log(r);
			})
			.catch((err) => console.log);
		 //  this.sendImagesViaAjax();
		};
		
	 
 		 		
 		/*******Related product section (Table section config)*****/


 		$scope.checksku= function(sku){
        var data = {'sku':sku };
        salesfactoryData.getData(skucheckurl,'GET',data).then(function(response){
	            //console.log(response.status);
	            if(response.status){
	                $scope.skuexists = true;
	            }
	            else{
	                $scope.skuexists = false;
	            }
	        });
	    };
	   	//Bundel product section
		//Listen on product tab (li) active
		$scope.liActiveHandler =($event,strflag)=>{
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
			if($event=='') return;
			$event.preventDefault();
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