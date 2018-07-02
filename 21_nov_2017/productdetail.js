(function(){
	/****
	*This controller used to handel all product detail function
	*Author Smoothgraph Connect PVT LTD
	*****/
	function productDetailHandler($scope,salesfactoryData,$filter,$window,$timeout,$http,$location,$anchorScroll,$rootScope,$sce){
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
		rvCtrl.btnloaderpath = btnloaderpath;
		rvCtrl.loading = {"addtocart" : false, "buynow" : false,"disableBtn" : false};
		//rvCtrl.optionFieldId=[];
		//used for store all information of product
		var prd_info =[];
		//set data in variable
		let dataLength = Object.keys(productData.productInfo).length;
		for(i=0;i<dataLength;i++) {
			rvCtrl.totalQtyVal[i] =1;
			prd_info.push(
				{"mainprdid" : productData.productInfo[i].mainProductId,
				 "type" : productData.productInfo[i].prdType, 
				}
			);
		}
		rvCtrl.prdBlogUrl = prdBlogUrl;
		rvCtrl.productImg = productData.productImage;
		rvCtrl.curCode = curCode;
		rvCtrl.colorPath = colorPath;
		rvCtrl.productImg = productData.productImage;
		rvCtrl.productVideo = productData.productVideo;
		rvCtrl.productInfo = productData.productInfo;
		rvCtrl.attrRes = productData.attrres;
		rvCtrl.attrValRes = productData.attrValRes;
		rvCtrl.selAttrVal = productData.selectedAttrVal;
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
		//Function section
		$scope.scrollToReview = (event)=>{
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('reviewBox');
			// call $anchorScroll()
			$anchorScroll();
		};
		rvCtrl.openSpinDataModal = (prodtImg,prodtName,prodtId)=>{
			openSpinData(prodtImg,prodtName,prodtId);
			//zoomSlideDisable();
		};
		//this function used for change attribute
		//$index,atr.attributedesc.attr_id,prdDetails.mainProductId
		rvCtrl.changeContent = (index,attrId,mainPrdId,prdId,pIndex)=> { 
			$scope.styleopacity =true;
			console.log('mainPrdId : ' + mainPrdId);
			console.log('product id ::' + prdId);
			let prd_type = (!_.isUndefined(productData.oneProductInfo.prdType))? productData.oneProductInfo.prdType : ' ';
			//$scope.mainProductId = rvCtrl.productInfo.mainProductId;
			var dataObj ={
				'mainProductId' : mainPrdId,
				'attrVal' : rvCtrl.selAttrVal[mainPrdId],
				'currentAttrId' : attrId,
				'currentAttrValId' : rvCtrl.selAttrVal[mainPrdId][index].valId,
				'product_type' : prd_type,
			};
			salesfactoryData.getData(getVarientProduct,'POST',dataObj)
			.then((r)=>{
				console.log(r);
				//console.log(r.data); return false;
				if(r.status===200 && Object.keys(r.data).length>0){
					var data = r.data;
					//var tmp_path =data.productUrl.split('product/')[1];
					if(prd_type==='bundle'){
						console.log('parent index   :' + pIndex);
						rvCtrl.productInfo[pIndex] = data.productInfo
						rvCtrl.selAttrVal[mainPrdId] = data.selectedAttrVal;
						rvCtrl.totalQtyVal[pIndex] = 1;
					}else if(prd_type === "configrable"){
						console.log('here');
						rvCtrl.productImg = data.productImage;
						rvCtrl.productInfo[pIndex] = data.productInfo;
						rvCtrl.selAttrVal[mainPrdId] = data.selectedAttrVal;
						//rvCtrl.cmobsArr = data.attributeArr;
						//rvCtrl.totalQtyVal = 1;
						//rvCtrl.productReview = data.userProductReview;
						//rvCtrl.orderInfo = (Object.keys(data.orderInfo).length !== 0)?data.orderInfo : '';
						//rvCtrl.starModal= data.productInfo.userProductRating;
						//rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
						console.log(rvCtrl.productInfo);
					}
				//	console.log(JSON.stringify(data));
					// console.log('combination array');
					// console.log(JSON.stringify(rvCtrl.cmobsArr));
					// console.log('slected attribute here')
					// console.log(JSON.stringify(rvCtrl.selAttrVal));

					//let a = rvCtrl.getCombArr(rvCtrl.cmobsArr),b = rvCtrl.getCombArr(rvCtrl.selAttrVal);
					//a= a.concat(b);
					//manageAttribute(a,b);				
				}
				$timeout(()=>{
					$scope.styleopacity =false;
					//cfpLoadingBar.complete();
				},2000);
			},(error)=>{
				try{throw new Error("Something went badly wrong!");}catch(e){console.log('error'+e);$scope.styleopacity =false;}
			}).finally(()=>{$scope.styleopacity =false;});
		};
		//this function used for get array combination
		rvCtrl.getCombArr =(cmbarr)=>{
			let cmbArr =[];
			_.forEach(cmbarr, (item)=>{
				if(typeof item.length!=='undefined' && item.length>1){
					for(let i=0;i<item.length;i++){ 
						let v = parseInt(item[i]); 
						if(cmbArr.indexOf(v)<0) 
							cmbArr.push(v);
					}
				}else if(typeof item.length!=='undefined' && item.length===1){
				 let v = parseInt(item);
				 if(cmbArr.indexOf(v)<0)
				 	cmbArr.push(v);
				}
				if(typeof item.valId!=='undefined'){
				 let v = parseInt(item.valId);
				 if(cmbArr.indexOf(v)<0)
				 	cmbArr.push(v);
				}
			});
			return cmbArr;
		};
		//this function used for get price by option
		rvCtrl.getPriceByOption = ($event,str,prdId,index)=> { 
			console.log('product id \t'+prdId +'\n'+ 'index \t'+ index);
			console.log(rvCtrl.totalQtyVal);
			if(str==="tqchange" && (_.isUndefined(rvCtrl.totalQtyVal[index]) || rvCtrl.totalQtyVal[index]==0) ) return;
			//loaderImage('show');
			let mainPrdId = _.filter(rvCtrl.productInfo,(o) => {return o.id == prdId})[0].mainProductId; 
			//get all option and option value id 
			var valId = ( typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId,mainPrdId,'optchange') : [];
			var chkVal = ( typeof rvCtrl.optionValueCheck != 'undefined') ? getFieldId(rvCtrl.optionValueCheck,mainPrdId,'valchange') : [];		
			var dataObj = {
				'productId' : prdId,
				"quantity" : rvCtrl.totalQtyVal[index],
				"optionValueId" : chkVal,
				"optionId" : valId
			};
			salesfactoryData.getData(productPriceByOption, 'POST', dataObj)
			.then((resp) =>{ 
				rvCtrl.productInfo[index].productPrice = resp.data;
				loaderImage('hide');
			},(error)=> console.log);
		};
		//this function used for handel quantiy increase decrease
		rvCtrl.incDcrQuntity = ($event,valMax,str,prdId,index)=> {
			$event.stopPropagation();
			if (str == "up" && rvCtrl.totalQtyVal[index] < valMax) {
				rvCtrl.totalQtyVal[index]++;
				rvCtrl.getPriceByOption($event,str,prdId,index);
			} else if (str == "down" && rvCtrl.totalQtyVal[index] > 1) {
				rvCtrl.totalQtyVal[index]--;
				rvCtrl.getPriceByOption($event,str,prdId,index);
			}
		};
		/****
		* This function call on click on add to cart button and check cases if valid the call addtocart function
		* all main product id and check before add to cart all product have selected attribue
		* @event : (event)
		* @strflag :(string)
		* @haveselectedattr (int true | false of length)
		* ******/
		rvCtrl.addToCartHandler = function($event,strflag) {
			$event.stopPropagation();
			let haveselectedattr =0;
			let mainproductid = _.map(rvCtrl.productInfo,'mainProductId');
			console.log(rvCtrl.selAttrVal);
			for(p in mainproductid){
				if(!_.isUndefined(rvCtrl.selAttrVal[mainproductid[p]])){
					haveselectedattr++;
				}else {
					//haveselectedatt=
					console.log(rvCtrl.productInfo[p]);
					console.log(mainproductid[p]);

				}
			}
			//recursive function to check data condition is attribute or quatity selected or not
			//type of product normal configrable bundle 
			var t =[]
			_.forEach(prd_info,(item,index)=>{
				if(item.type==="normal"){
					t.push(true)
					//haveselectedattr++;
				}else if(item.type==="configrable" item.type==="bundle"){
					if(!_.isUndefined(rvCtrl.selAttrVal[item.mainprdid])){
						t.push(true);
					}
				}
				console.log(item);
				console.log(index);
			});

			console.log(haveselectedattr);
			if(haveselectedattr!== (mainproductid.length)){
				swal("Opps..",'Please Select Attribute in All Product','warning');
				return;
			}
			_enbdsbLodBtn(strflag,'enable',true);
			//get all product id 
			let pid = _.map(rvCtrl.productInfo, 'id');
			let dataObj=[];
			for(d in pid){
				dataObj.push({
				  productId :  pid[d],
				  quantity : (_.isUndefined(rvCtrl.totalQtyVal[d])) ? 0 :  rvCtrl.totalQtyVal[d],
				});
			}
			salesfactoryData.getData(checkProductBeforeCart, "POST", dataObj)
			.then((r)=> {
				if(r.data==='100'){
					addToCart(strflag);
				}else{
					swal("", r.msg, "error");
					_enbdsbLodBtn(strflag,'disabled',false);
					return false;
				}
			},(error)=>console.log)
			.finally(()=>console.log);
		};
		//this function used to set rating of product
		$scope.setReview = (event, data)=> {
		 rvCtrl.starModal = data.rating;
		};
		//This function used to handel product thum image and video section
		$scope.thumbimagevedio=($event,type,site,videoid)=>{
			if(type==='video'){
				rvCtrl.activeimgprevtab =false;
				let tempurl = (site=='youtube')?'https://www.youtube.com/embed/':'https://player.vimeo.com/video/';
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
         		.then((obj)=>{
         			salesfactoryData.getData(uploadAction,'POST',{'upload_path':upload_path,'uploadfile': obj})
         			.then((resp)=>{
         				if(resp.data.status==="success")
         					rvCtrl.getPriceByOption(event,'tqc',parseInt(fileObje.productId),parseInt(fileObje.productIndex));
         			},(error)=>console.log);
         		}).catch(()=> console.log)
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
				   var temp = tmpSelAtt[mprd];
					if(!_.isUndefined(temp) && temp.length>0 && currentIndex==mprd){
						_.forEach(currentValue,(cVal,cInd)=>{
							let t = temp[cInd];
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
			_.map(rvCtrl.productInfo,(item,ind)=>{
				if(rvCtrl.totalQtyVal[ind] > 0){
					qtycheck++;
					dataObj.push({
					  productId	: item.id,
					  mainproductid :  item.mainProductId,
					  quantity : rvCtrl.totalQtyVal[ind],
					  optionId : (typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId,item.mainProductId,'optchange') : [],
					  optionValueId : ( typeof rvCtrl.optionValueCheck != 'undefined') ? getFieldId(rvCtrl.optionValueCheck,item.mainProductId,'valchange') : [],
					  optionIdDetail : (typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId,item.mainProductId,'optDetailchange') : [],
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
			.then((response)=> {
				_enbdsbLodBtn(strflag,'disabled',false);
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
			},(error)=>{
				swal('Opps','Something wrong','error');
			}).finally(()=>_enbdsbLodBtn(strflag,'disabled',false));
		};
		/**This function used for convert file into base64
		* @fileObj : (object)
		**/
	    function getBase64Url(fileObj) {
			 return new Promise((res, rej) => {
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
			_.forEach(arr,(value,key)=>{
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
				let uploadimgId = [];
				let uplodimgprdid =0;
				_.map(rvCtrl.file_interface.getFiles(),(fileObj)=>{
					let optid = parseInt(fileObj.optionId),
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
		//Listen after click on addtocart or buy now for enable/disable loader/button
		//_enbdsbLodBtn(strflag,'enable'); addtocart" : false, "buynow" : false
		function _enbdsbLodBtn(strflag,enbdsb,btnFlag){
			if(_.isUndefined(strflag) && enbdsb!==''){
				rvCtrl.loading['addtocart'] = (enbdsb==='enable')? true : false;
			}else if(!_.isUndefined(strflag) && enbdsb!==''){
				rvCtrl.loading['buynow'] = (enbdsb==='enable')? true : false;
			}
			rvCtrl.loading['disableBtn'] = btnFlag;
		};
	};
	angular.module('productDetailApp').controller('productDetailCtrl',productDetailHandler);
}).call(this);