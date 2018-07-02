// var productDisplay = angular.module('productDisplay', ['ngFileUpload','LCS.loadingBar','starApp'],function($interpolateProvider) {
// 	$interpolateProvider.startSymbol('<%');
// 	$interpolateProvider.endSymbol('%>');
// });//,'ngRoute'
// productDisplay.config(function($locationProvider,cfpLoadingBarProvider) {
//  // $locationProvider.html5Mode(true).hashPrefix('!');
//   cfpLoadingBarProvider.includeSpinner = true;
//   cfpLoadingBarProvider.parentSelector  ='body';
// })
// .run(['$route','$rootScope', '$location',($route,$rootScope, $location)=>{
// 	// todo: would be proper to change this to decorators of $location and $route
// 	$location.update_path = (path, keep_previous_path_in_history)=> {
// 	   if ($location.path() == path) return;
// 	 // if ($location.absUrl() == path) return;
// 	  //$location.pushState(path);
// 	 // $location.state(path);
	 
// 	   var routeToKeep = $route.current;
// 	  var unsubscribe = $rootScope.$on('$locationChangeSuccess', function () {
// 	    if (routeToKeep) {
// 	      $route.current = routeToKeep;
// 	      routeToKeep = null;
// 	    }
// 	    unsubscribe();
// 	    unsubscribe = null;
// 	  });
// 	// $rootScope.$on('$locationChangeSuccess', function () {
// 	// 	// if (routeToKeep) {
// 	// 	//   $route.current = routeToKeep;
// 	// 	//   routeToKeep = null;
// 	// 	// }
// 	// 	// unsubscribe();
// 	// 	// unsubscribe = null;
// 	// 	//window.history.replaceState(null,'',path);
// 	// 	 console.log(window.history);
// 	//  	//console.log($location.state(path));
// 	// });

// 	  $location.path(path);
// 	  //$rootScope.$apply();  
// 	  //$location.absUrl(path);
// 	  if (!keep_previous_path_in_history) $location.replace();
// 	};
// }]);
var cuurOption =[]; 
angular.module('buyerHomePageApp').controller('productDisplayCtrl', ['$scope', 'getJsonData', '$filter', '$window', 'Upload', '$timeout', '$http','$location','$anchorScroll','$rootScope','$sce','socialAction',
function($scope, getJsonData, $filter, $window, Upload, $timeout, $http,$location, $anchorScroll,$rootScope,$sce,socialAction) {
	var rvCtrl = this;
	//'cfpLoadingBar', cfpLoadingBar
	/*****variable section******///
	rvCtrl.productImg = [],rvCtrl.productVideo = [], rvCtrl.productInfo = [], rvCtrl.attrRes = [], rvCtrl.varientInfo = [], rvCtrl.orderInfo=[], rvCtrl.attrValRes = [], rvCtrl.selAttrVal = [], rvCtrl.productReview=[],rvCtrl.optionInfo=[],rvCtrl.optnameArr=[],rvCtrl.ptag=[];
	rvCtrl.prdBlogUrl = prdBlogUrl;
	rvCtrl.friends = rvCtrl.complainType = [];
	var shareObjInfo ={};
	var file_name ='';
	rvCtrl.messageShow = false;
	rvCtrl.senddropdown = true;
	rvCtrl.sendshare = false;
	rvCtrl.contactMessage ='';
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
	rvCtrl.complainType = productData.complainType;
	rvCtrl.spcfAttr = productData.sattrRes;
	rvCtrl.spcfAttrVal = productData.sattrValRes;
	rvCtrl.islogin = productData.islogin;
	rvCtrl.totalQtyVal = 1;
	rvCtrl.productReview = productData.userProductReview;
	rvCtrl.orderInfo = (Object.keys(productData.orderInfo).length !== 0)?productData.orderInfo : '';
	rvCtrl.contactProduct = productData.contactProduct;
	rvCtrl.starModal= rvCtrl.productInfo.userProductRating;
	rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
	rvCtrl.loaderImgSrc='';
	rvCtrl.cmobsArr = productData.attributeArr;
	$timeout(function(){ 
		if(rvCtrl.attrRes.length>0){ 
			if(angular.isUndefined(rvCtrl.attrRes[0].attribute_id)) return;
			let a = rvCtrl.getCombArr(rvCtrl.cmobsArr),b = rvCtrl.getCombArr(rvCtrl.selAttrVal);
			a= a.concat(b);
			let atid = rvCtrl.attrRes[0].attribute_id;
			cuurOption = rvCtrl.getCombArr(rvCtrl.attrValRes[atid]);
			if(a.length>0) manageAttribute(a,b);
	   }
	});
	
	if(rvCtrl.productInfo.prdType=='product')
		rvCtrl.bindShopAddrs = $sce.trustAsHtml(rvCtrl.productInfo.shop_address);

    if(rvCtrl.optionInfo.length>=1){
		rvCtrl.optionInfo.map((item,keys)=>{
			var len = (item.option_attr_value_detail).length;
			if(len>=1){
				item.option_attr_value_detail.map((itm,key)=>{
				var index = rvCtrl.optnameArr.findIndex(x => x.id==itm.attribute_value_id);
				rvCtrl.optionInfo[keys].option_attr_value_detail[key].attribute_value =rvCtrl.optnameArr[index].value;
				});
			};
		});
    }
   /****related product*****/
    rvCtrl.page = 0;
	rvCtrl.paging =0;
	rvCtrl.related_Items = [];
	rvCtrl.loadingMore = false;
	rvCtrl.showMore = false;
	rvCtrl.loadingUser = false;
	rvCtrl.lcsGridOption ={
		gridWidth : 235,
		gutterSize : 15,
		performantScroll :false,
		gridNo : 'auto',
	};
	rvCtrl.linkorstate=false;
	rvCtrl.errorInfoLog ='<div class="no-info-blank"><h3><i class="icon-doc"></i> You have no information </h3></div>';
    rvCtrl.loadMoreData = function(){
		if (rvCtrl.showMore)return;
		//cfpLoadingBar.start(); 
		rvCtrl.page++;
		rvCtrl.loadingMore = true;
		let objPage={page: rvCtrl.page,'shopid':4,'category':''};	
		let urlstring = shopproductlisturl;
		getJsonData.getDataFromServer(urlstring, 'GET', objPage).then(function(res) {
			if(res.status=='unsuccess'){
				rvCtrl.no_result_found =(rvCtrl.related_Items.length>=1)? false : true;
				rvCtrl.showMore = true,rvCtrl.loadingMore = false;
				//cfpLoadingBar.complete();
		        return;
			}
			rvCtrl.no_result_found = false;
			var tempRes = angular.copy(rvCtrl.related_Items);
			tempRes = tempRes.concat(res.data);
			rvCtrl.related_Items = tempRes;
			rvCtrl.loadingMore = false;
		},(error)=>{
			try{throw new Error("Something went badly wrong!");}
    	    catch(e){console.log("error: " + e); rvCtrl.loadingMore = false,rvCtrl.showMore=false;}
		});
		//cfpLoadingBar.complete();
	};
	rvCtrl.loadMoreData();
	/******end related prouctd*****/
/******handler section******/
   	$scope.scrollToReview = (event)=>{
		// set the location.hash to the id of
      	// the element you wish to scroll to.
      	$location.hash('reviewBox');
      	// call $anchorScroll()
      	$anchorScroll();
	};
	rvCtrl.updateProductLike = (type,event)=>{
		var obj = {"product_id" : rvCtrl.productInfo.id};
		var urlType = (type == 'remove')? '/user/removefavourite' : '/user/productfavourite';
		getJsonData.getDataFromServer(siteUrl + urlType, 'GET', obj).then(function(res) {
			if(res.status == 'success'){
			  if(type == 'remove'){
				rvCtrl.productInfo.userLike = '';
				rvCtrl.productInfo.total_likes--;
			  }else{
				rvCtrl.productInfo.userLike = 1;
				rvCtrl.productInfo.total_likes++;
			  }
			}
	    });
	};
	rvCtrl.openSpinDataModal = (prodtImg,prodtName,prodtId)=>{
		openSpinData(prodtImg,prodtName,prodtId);
		MagicZoom.stop();
		/*socialAction.updateService('','/social/spinitpopupboardslist').then((response)=>{
          angular.element('.board-container ul.board-name').html(response.html);          
	    });*/

        var controlid = 'productDisplayCtrl';
        var index = 1;
        angular.element('#createboard #currindex').val(index);
        angular.element('#createboard #controlid').val(controlid);
        var obj = {"currindex": index, 'controlid': controlid };
        socialAction.updateService(obj,'/social/spinitpopupboardslist').then((response)=>{
            angular.element('.board-container ul.board-name').html(response.html);
          
	    });



	};
	rvCtrl.friendsData = function($id) {
		rvCtrl.messageShow = false;
		rvCtrl.shareData = '';
		var objPage={page:1, id:$id, type:'product'};
		MagicZoom.stop();
		getJsonData.getDataFromServer(siteUrl + '/social/friendslisting', 'GET', objPage).then(function(res) {
			if(res.status == 'success'){
			  var tempRes = angular.copy(rvCtrl.friends);
			  tempRes = tempRes.concat(res.data);
              rvCtrl.friends = tempRes;
			  rvCtrl.socialUrls = res.socialUrls;
			}
		});
	};
	rvCtrl.shareBoardpop = function($event, index){
        $event.stopImmediatePropagation();
        rvCtrl.messageShow = false,rvCtrl.sendshare = true;
        /*this is for user id where posts and boards will share*/
        shareObjInfo['product_id'] = rvCtrl.productInfo.id;
        shareObjInfo['share_user_id'] = rvCtrl.friends[index].id;
        shareObjInfo['profilepic'] = rvCtrl.friends[index].image;
        shareObjInfo['profilepic'] = rvCtrl.friends[index].name + ' ' + rvCtrl.friends[index].sur_name;
        rvCtrl.senddropdown = true;
    };  
    rvCtrl.shareBoardpopClose = function(){
	    rvCtrl.messageShow = false,rvCtrl.sendshare = false,rvCtrl.senddropdown = true;
    }; 
	rvCtrl.shareBoards = function($event) {
	    $event.stopImmediatePropagation();
	    shareObjInfo['message'] = rvCtrl.formData.message;
	    shareObjInfo['sharetype'] = 'product';
		getJsonData.getDataFromServer(siteUrl + '/social/shareprofile', 'GET', shareObjInfo).then(function(res) {
			if(res.status == 'success'){
                rvCtrl.messageShow = true,rvCtrl.sendshare = false,rvCtrl.senddropdown = true;
                rvCtrl.message = res.message;
             }
		});
    };

	rvCtrl.removeReview = (rid,index)=>{
		swal({title: "Are you sure want to delate review ?",type: "warning",showCancelButton: true }).then(function(result) {
		  var obj = {'reviewId' : rid};
			getJsonData.getDataFromServer(deleteProductReview, 'POST', obj).then(function(resp){
				if(resp){
					rvCtrl.productInfo.totProductReview = rvCtrl.productInfo.totProductReview -1;
					rvCtrl.productReview.splice(index,1);
				}
				$scope.ratingSuccess = 'Rating updated successfully';
			})
		}, function(dismiss) {
			return false;
		});
	};
	rvCtrl.writeReview = ()=>{
		if(rvCtrl.starModal ==''){
			swal("", "Please select rating", "error");
			return false;
		}
		loaderImage('show');
		var obj = {'reviewValue' : rvCtrl.reviewValue,'rating' : rvCtrl.starModal,'productId' : rvCtrl.productInfo.id,'orderId':rvCtrl.orderInfo.orderId};
		getJsonData.getDataFromServer(insertProductReview, 'POST', obj).then((resp)=>{
			if(resp){
				rvCtrl.productReview.splice(0, 0, resp);
				rvCtrl.feedbackForm = false;
			}
			loaderImage('hide');
			//$scope.ratingSuccess = resp;
		})
	};
	rvCtrl.changeContent = function(index,attrId) {
		$scope.styleopacity =true;
		$scope.mainProductId = rvCtrl.productInfo.mainProductId;
		var obj = {'mainProductId' : rvCtrl.productInfo.mainProductId,'attrVal' : rvCtrl.selAttrVal,
			'currentAttrId' : attrId,'currentAttrValId' : rvCtrl.selAttrVal[index].valId,};
		getJsonData.getDataFromServer(getVarientProduct, 'POST', obj).then(function(resp) {
		   var tmp_path =resp.productUrl.split('product/')[1];
			//console.log(MagicScrollOptions)
			MagicScroll.start();
			MagicScrollOptions['autostart'] = false;
			MagicScroll.refresh('#MagicScrollDiv');
			rvCtrl.productImg = resp.productImage;
			
			rvCtrl.productInfo = resp.productInfo;
			rvCtrl.selAttrVal = resp.selectedAttrVal;
			rvCtrl.cmobsArr = resp.attributeArr;
			rvCtrl.totalQtyVal = 1;
			rvCtrl.productReview = resp.userProductReview;
			rvCtrl.orderInfo = (Object.keys(resp.orderInfo).length !== 0)?resp.orderInfo : '';
			rvCtrl.starModal= resp.productInfo.userProductRating;
			rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
			//MagicScroll.start('#MagicScrollDiv');
			MagicZoom.refresh();
			//MagicScroll.refresh('#MagicScrollDiv');
		//	MagicScrollOptions['autostart'] = true;
			//MagicScroll.refresh();
			
			let a = rvCtrl.getCombArr(rvCtrl.cmobsArr),b = rvCtrl.getCombArr(rvCtrl.selAttrVal);
			a= a.concat(b);
			manageAttribute(a,b);
			
			setTimeout(function(){
				$scope.styleopacity =false;
				//cfpLoadingBar.complete();
				
			},2000)
			
		},(error)=>{
			 try{throw new Error("Something went badly wrong!");}catch(e){console.log('error'+e);$scope.styleopacity =false;}
		}).finally(()=>{$scope.styleopacity =false;});
	}
	rvCtrl.changeContentMobile = function() {
		//console.log(selAttrVal);
		//cfpLoadingBar.start();
		$scope.styleopacity =true;
		$scope.mainProductId = rvCtrl.productInfo.mainProductId;
		var obj = {
			'mainProductId' : rvCtrl.productInfo.mainProductId,
			'attrVal' : rvCtrl.selAttrVal,
		}
		getJsonData.getDataFromServer(getVarientProduct, 'POST', obj).then(function(resp) {

		 var tmp_path =resp.productUrl.split('product/')[1];

			rvCtrl.productImg = resp.productImage;
			rvCtrl.productInfo = resp.productInfo;
			rvCtrl.selAttrVal = resp.selectedAttrVal;
			rvCtrl.totalQtyVal = 1;
			rvCtrl.productReview = resp.userProductReview;
			rvCtrl.orderInfo = (Object.keys(resp.orderInfo).length !== 0)?resp.orderInfo : '';
			rvCtrl.starModal= resp.productInfo.userProductRating;
			rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;

			//$scope.$apply();
			setTimeout(function(){
				$scope.styleopacity =false;
				//cfpLoadingBar.complete();
				
			},2000)
			
		})
	}
	rvCtrl.getPriceByOption = function($event,tsq) {
		tsq = tsq || '';
		if(angular.isDefined(tsq)&& tsq!=''){if(!rvCtrl.totalQtyVal)return;} 
		loaderImage('show');
		var valId = ( typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId) : [];
		var chkVal = ( typeof rvCtrl.optionValueCheck != 'undefined') ? getFieldId(rvCtrl.optionValueCheck) : [];
		if (rvCtrl.myFiles != null) {
			var optId = angular.element("#fileUpdBtn").attr('optionId');
			valId.push(parseInt(optId));
		}
		var obj = {'productId' : rvCtrl.productInfo.id,"quantity" : rvCtrl.totalQtyVal,
			"optionValueId" : chkVal,"optionId" : valId};
		getJsonData.getDataFromServer(productPriceByOption, 'POST', obj).then(function(resp) {
			rvCtrl.productInfo.productPrice = resp;
			loaderImage('hide');
		})
	}
	rvCtrl.incDcrQuntity = function(valMax, str) {
		if (str == "up" && rvCtrl.totalQtyVal < valMax) {
			rvCtrl.totalQtyVal++;
			rvCtrl.getPriceByOption();
		} else if (str == "down" && rvCtrl.totalQtyVal > 1) {
			rvCtrl.totalQtyVal--;
			rvCtrl.getPriceByOption();
		}
	}

	/*****
	* function for when user contact to non salable product
	* ****/
	rvCtrl.contactNonSalableProduct = function() {
		console.log(rvCtrl.contactFiles);
	    if(rvCtrl.contactMessage =='' || typeof rvCtrl.contactMessage ==='undefined'){
	    	 rvCtrl.errMsg =true; return;
	    }
        var prodData = {"productId": rvCtrl.productInfo.id,"message": rvCtrl.contactMessage};
  		  $http({  
            method: 'POST',  
            url: nonSalableProductUrl,  
            headers: { 'Content-Type': undefined },  
            transformRequest: function (data) {  
            	var formData = new FormData();  
                formData.append("formDatas", angular.toJson(data.formDatas));
                formData.append("productId", rvCtrl.productInfo.id); 
                formData.append("shopId", rvCtrl.productInfo.shop_id); 
                formData.append("message", rvCtrl.contactMessage); 
                formData.append("file", data.files);  
                return formData; 
            },  
            data: {formDatas: prodData,files: rvCtrl.contactFiles}  
        }).success(function (response) { 
        	if(response.success == true){
			  swal(response.message);
			  rvCtrl.contactProduct = {'status':'1'};
			}
			else
				swal("", response.message, "error");
		}).error(function (response) { 
             return false
        });
	}
	/*****
	 * This function call on click on add to cart button and check cases if valid the call addtocart function
	 * ******/
	rvCtrl.addToCartHandler = function() {
		var data = {"productId" : rvCtrl.productInfo.id,"quantity" : rvCtrl.totalQtyVal};
		getJsonData.getDataFromServer(checkProductBeforeCart, "POST", data).then(function(response) {
			if(response == '100'){
				addToCart();
			}else{
				swal("", response, "error");
				return false;
			}
		});
	};
	$scope.$watch('rvCtrl.myFiles', function() {
		var allowed = ["jpeg", "png", "gif", "jpg"];
		var found = false;
		if (rvCtrl.myFiles != null) {
			angular.forEach(allowed, function(extension) {
				if (rvCtrl.myFiles.type.match('image/' + extension)) {
					found = true;
				}
			});
			if (!found) {
				alert('file type should be .jpeg, .png, .jpg, .gif');
				return;
			} else {
				var reader = new FileReader();
				reader.onload = function(loadEvent) {
					$scope.$apply(function() {
						$scope.filepreview = loadEvent.target.result;
					});
				}
				reader.readAsDataURL(rvCtrl.myFiles);
				rvCtrl.myFiles.upload = Upload.upload({
					dataType : 'json',
					url : uploadAction,
					data : {
						"upload_path" : upload_path,
						"uploadfile" : rvCtrl.myFiles
					}
				}).then(function(res) {
					if (res.status == 200) {
						file_name = res.data.file_name;
						rvCtrl.getPriceByOption();
					}
				});
			}
		}
	});
	$scope.setReview = function(event, data) {
		 rvCtrl.starModal = data.rating;
	};
	rvCtrl.getCombArr =(cmbarr)=>{
		let cmbArr =[];
		angular.forEach(cmbarr, (item)=>{
			if(typeof item.length!=='undefined' && item.length>1){
				for(let i=0;i<item.length;i++){ let v = parseInt(item[i]); if(cmbArr.indexOf(v)<0) cmbArr.push(v);}
			}else if(typeof item.length!=='undefined' && item.length===1){ let v = parseInt(item); if(cmbArr.indexOf(v)<0)cmbArr.push(v);}
			if(typeof item.valId!=='undefined'){ let v = parseInt(item.valId); if(cmbArr.indexOf(v)<0)cmbArr.push(v);}
		});
		return cmbArr;
	};
	rvCtrl.getTooltipContent = function(contentType,contentObj){
		let tpHtml ='';
		if(typeof contentType!=='undefined'&& contentType!=='')
			tpHtml='<div class="varient-tooltip"><image src="'+rvCtrl.colorPath+contentType+'" alt="'+contentType+'" width="50" height="50"></div>';
		else if(typeof contentType!=='undefined' && contentType == '')
			tpHtml = '<div class="varient-tooltip"><span style="background :'+contentObj.color_code+'; width: 50px; height: 50px; display:inline-block"></span></div>';
		rvCtrl.prdTooltip =$sce.trustAsHtml(tpHtml);
		return rvCtrl.prdTooltip;
	};
	/*******Custom function section******/
	function addToCart() {
		//jQuery('#addToCartdiv').modal('show');
		    //  return false;
		
		var valId = ( typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId) : [];
		var chkVal = ( typeof rvCtrl.optionValueCheck != 'undefined') ? getFieldId(rvCtrl.optionValueCheck) : [];
		var optionDataArr = {};
		if (rvCtrl.myFiles != null) {
			var optId = angular.element("#fileUpdBtn").attr('optionId');
			valId.push(parseInt(optId));
			var tempVal = angular.copy(rvCtrl.optionFieldId);
			optionDataArr[optId] = file_name;//[rvCtrl.myFiles][0].name;
			angular.merge(optionDataArr, tempVal);
		} else {
			optionDataArr = angular.copy(rvCtrl.optionFieldId);
		}
		var tmpSelAtt = angular.copy(rvCtrl.selAttrVal);
		var attrValIdObj =[];
		var atrLen = rvCtrl.attrRes.length,seltdAtrLen = rvCtrl.selAttrVal.length;
		if(atrLen>=1&& seltdAtrLen===0){
			MagicZoom.stop();
			swal("Oops...", "Please choose before add to shopping bag!", "error");
			MagicZoom.start();
			MagicZoom.refresh()
			return false;
		}else if(rvCtrl.attrRes.length>=1 && rvCtrl.selAttrVal.length>=1){
		   attrValIdObj = rvCtrl.attrRes.map(function(currentValue, currentIndex) {
				var temp = tmpSelAtt[currentIndex];
				temp["attribute_id"] = currentValue.attribute_id;
				return temp;
		   });
		}
		loaderImage('show');
		var data = {"productId" : rvCtrl.productInfo.id,"quantity" : rvCtrl.totalQtyVal,
			"attrDetail" : attrValIdObj,"optionId" : valId,"optionIdDetail" : optionDataArr,
			"optionValueId" : chkVal};
		getJsonData.getDataFromServer(addProductToCart, 'POST', data).then(function(response) {
			if (response == 1) {
		      var totalCartProduct = $('#totalCartProduct').html();       
		      var totalNew = Number(totalCartProduct)+1; 
		      jQuery('#totalCartProduct').show();      
		      jQuery('#totalCartProduct').html(totalNew);
		    }
		    loaderImage('hide');
		    jQuery('#addToCartdiv').modal('show');
		      return false;
		});

	};
	//this function used for thumb image and video section
	rvCtrl.activeimgprevtab =true;
	rvCtrl.thumbimagevedio=($event,type,site,videoid)=>{
		if(type==='video'){
			rvCtrl.activeimgprevtab =false;
			let tempurl = (site=='youtube')?'https://www.youtube.com/embed/':'https://player.vimeo.com/video/';
			rvCtrl.prdvideourl = tempurl + videoid;
		}else if(type==='thumbimage'){
			rvCtrl.activeimgprevtab =true;
		}
        $event.preventDefault();
	};
	function getFieldId(arr) {
		var tempArr = [];
		angular.forEach(arr, function(value, key) {
			if (value) {
				tempArr.push(parseInt(key));
			}
		})
		return tempArr;
	};
	/****This function used for set no of product will display in mobile device****/
	$($window).on('resize',function(){optionHandler();});
	function optionHandler(){
		var tm =0;
		if(tm)$timeout.cancel(tm);
		tm = $timeout(function() {
			if($(window).width()>=320 && $(window).width()<667){
				rvCtrl.lcsGridOption.gridNo =2;
				rvCtrl.lcsGridOption.gutterSize =15;
				rvCtrl.lcsGridOption.performantScroll =true;
			}else{
				rvCtrl.lcsGridOption.gridNo = 'auto';
				if($(window).width()<=768) rvCtrl.lcsGridOption.performantScroll =true; 
				else rvCtrl.lcsGridOption.performantScroll =false; 
			}
		}, 100);
	};
	optionHandler();
}]);
(function($){
	$('#productsharepopup,#spinPop1').on('hidden.bs.modal', function () {
		MagicZoom.start(); MagicZoom.refresh();
	});
	jQuery(document).on('change','.pdetail-row .attrVal',function(){
        cuurOption =[];
        jQuery(this).find('option').each(function(){
        	cuurOption.push(parseInt(jQuery(this).val()));
        });
    });
	jQuery(document).on('click','.custom-select .pdetail-row ul li input[type=radio]',function(){
		cuurOption =[];
		jQuery(this).closest('ul').find('li input[type=radio]').each(function(){
			cuurOption.push(parseInt(jQuery(this).val()));
		});
	});
}(jQuery));
function manageAttribute(result,selectedVal){ 
 if(jQuery(document).find('.custom-select .pdetail-row ul li input[type=radio]').length>0){
	  $('.custom-select .pdetail-row ul li').find('input[type=radio]').each(function() {
			let v = parseInt($(this).val());
			//console.log(v);
			if (result.indexOf(v)<0) {
			  $(this).prop('disabled', true);
			  if($(this).next().find('img').length>0)$(this).next().find('img').css('opacity',.5);
			  if($(this).next().find('div').length>0)$(this).next().find('div').css('opacity',.5);
			}else if (result.indexOf(v)>=0) {
			  $(this).prop('disabled', false);
			  if($(this).next().find('img').length>0)$(this).next().find('img').css('opacity',1);
			  if($(this).next().find('div').length>0)$(this).next().find('div').css('opacity',1);
			}
			if(cuurOption.indexOf(v)>=0){
				$(this).prop('disabled', false);
				if($(this).next().find('img').length>0)$(this).next().find('img').css('opacity',1);
				if($(this).next().find('div').length>0)$(this).next().find('div').css('opacity',1);
			}
	});
  }
  if(jQuery(document).find('.pdetail-row select.attrVal').length>0){
	$('.pdetail-row .attrVal').find('option').each(function() {
		let v = parseInt($(this).val());
		if (result.indexOf(v)<0) {
		  // $(this).prop('disabled', true);
		  $(this).addClass('dropdownUnavailable');
		} else if (result.indexOf(v)>=0) {
		 // $(this).prop('disabled', false);
		  $(this).removeClass('dropdownUnavailable');
		}
		if(cuurOption.indexOf(v)>=0) $(this).removeClass('dropdownUnavailable');
	});
  }
};