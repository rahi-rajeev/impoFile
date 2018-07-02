var productDisplay = angular.module('productDisplay', ['ngFileUpload','LCS.loadingBar'],function($interpolateProvider) {
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
}).filter('trustAsResourceUrl',['$sce',function($sce) {return function(val) {
		return $sce.trustAsResourceUrl(val);};
}]);
productDisplay.config(function($locationProvider,cfpLoadingBarProvider) {
 // $locationProvider.html5Mode(true).hashPrefix('!');
  cfpLoadingBarProvider.includeSpinner = true;
  cfpLoadingBarProvider.parentSelector  ='body';
})

var cuurOption =[];
productDisplay.controller('productDisplayCtrl', ['$scope', 'productDisAjax', '$filter', '$window', 'Upload', '$timeout', '$http','$location','$anchorScroll','$rootScope','cfpLoadingBar','$sce',
function($scope, productDisAjax, $filter, $window, Upload, $timeout, $http,$location, $anchorScroll,$rootScope,cfpLoadingBar,$sce) {
	var rvCtrl = this;
	/*****variable section******/// 
	rvCtrl.productImg = [], rvCtrl.productInfo = [], rvCtrl.attrRes = [], rvCtrl.orderInfo=[], rvCtrl.attrValRes = [], rvCtrl.selAttrVal = [], rvCtrl.productReview=[],rvCtrl.optionInfo=[],rvCtrl.optnameArr=[],rvCtrl.ptag=[];
	rvCtrl.prdBlogUrl = prdBlogUrl;
	rvCtrl.friends = [];
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
	rvCtrl.spcfAttr = productData.sattrRes;
	rvCtrl.spcfAttrVal = productData.sattrValRes;
	rvCtrl.totalQtyVal = 1;
	rvCtrl.productReview = productData.userProductReview;
	rvCtrl.orderInfo = (Object.keys(productData.orderInfo).length !== 0)?productData.orderInfo : '';
	rvCtrl.contactProduct = productData.contactProduct;
	rvCtrl.starModal= rvCtrl.productInfo.userProductRating;
	rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;


    /*if(rvCtrl.optionInfo.length>=1){
		rvCtrl.optionInfo.map((item,keys)=>{
			var len = (item.option_attr_value_detail).length;
			if(len>=1){
				item.option_attr_value_detail.map((itm,key)=>{
				var index = rvCtrl.optnameArr.findIndex(x => x.id==itm.attribute_value_id);
				rvCtrl.optionInfo[keys].option_attr_value_detail[key].attribute_value =rvCtrl.optnameArr[index].value;
				});
			};
		});
    }*/
    console.log(rvCtrl.selAttrVal);
/******handler section******/
   	$scope.scrollToReview = (event)=>{
		// set the location.hash to the id of
      	// the element you wish to scroll to.
      	$location.hash('reviewBox');
      	// call $anchorScroll()
      	$anchorScroll();
	};

	rvCtrl.openSpinDataModal = (prodtImg,prodtName,prodtId)=>{
		openSpinData(prodtImg,prodtName,prodtId);
		zoomSlideDisable();
	};

	rvCtrl.changeContent = function(index,attrId) { 
		$scope.styleopacity =true;
		$scope.mainProductId = rvCtrl.productInfo.mainProductId;
		var obj = {'mainProductId' : rvCtrl.productInfo.mainProductId,'attrVal' : rvCtrl.selAttrVal,
			'currentAttrId' : attrId,'currentAttrValId' : rvCtrl.selAttrVal[index].valId,};
		productDisAjax.getData(getVarientProduct, 'POST', obj).then(function(resp) {

		 var tmp_path =resp.productUrl.split('product/')[1];

			rvCtrl.productImg = resp.productImage;
			rvCtrl.productInfo = resp.productInfo;
			rvCtrl.selAttrVal = resp.selectedAttrVal;
			rvCtrl.cmobsArr = resp.attributeArr;
			rvCtrl.totalQtyVal = 1;
			rvCtrl.productReview = resp.userProductReview;
			rvCtrl.orderInfo = (Object.keys(resp.orderInfo).length !== 0)?resp.orderInfo : '';
			rvCtrl.starModal= resp.productInfo.userProductRating;
			rvCtrl.feedbackForm = (rvCtrl.starModal)?false:true;
			//zoomSlideEnable(rvCtrl.prdBlogUrl+'large_572/'+rvCtrl.productInfo.user_id+'/'+rvCtrl.productImg[0].image);
			//addThumbSlider('dsdsd');
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

	rvCtrl.getPriceByOption = function($event,str) { console.log(str);
		console.log('error--run function on page load getPriceByOption');
		loaderImage('show');
		var valId = ( typeof rvCtrl.optionFieldId != 'undefined') ? getFieldId(rvCtrl.optionFieldId) : [];
		var chkVal = ( typeof rvCtrl.optionValueCheck != 'undefined') ? getFieldId(rvCtrl.optionValueCheck) : [];
		if (rvCtrl.myFiles != null) {
			var optId = angular.element("#fileUpdBtn").attr('optionId');
			valId.push(parseInt(optId));
		}
		var obj = {'productId' : rvCtrl.productInfo.id,"quantity" : rvCtrl.totalQtyVal,
			"optionValueId" : chkVal,"optionId" : valId};
			console.log(obj);
			return;
		productDisAjax.getData(productPriceByOption, 'POST', obj).then(function(resp) { 
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
	 * This function call on click on add to cart button and check cases if valid the call addtocart function
	 * ******/
	rvCtrl.addToCartHandler = function() {
		var data = {"productId" : rvCtrl.productInfo.id,"quantity" : rvCtrl.totalQtyVal};
		productDisAjax.getData(checkProductBeforeCart, "POST", data).then(function(response) {
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
	/*******Custom function section******/
	function addToCart() {
		/*jQuery('#addToCartdiv').modal('show');
		return false;*/
		
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
			//zoomSlideDisable();
			alert("Oops...", "Please choose before add to shopping bag!", "error");
			//zoomSlideEnable();
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
			//console.log(data);
			//return;
		productDisAjax.getData(addProductToCart, 'POST', data).then(function(response) {
			if (response == 1) {
		      var totalCartProduct = $('#totalCartProduct').html();       
		      var totalNew = Number(totalCartProduct)+1;       
		      jQuery('#totalCartProduct').html(totalNew);
		    }
		    loaderImage('hide');
		    jQuery('#addToCartdiv').modal('show');
		    return false;
		});

	}
	function getFieldId(arr) {
		var tempArr = [];
		angular.forEach(arr, function(value, key) {
			if (value) {
				tempArr.push(parseInt(key));
			}
		})
		return tempArr;
	}
	/*******This function used to handel product thum image and video section******/
	rvCtrl.activeimgprevtab=true;
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
}]).factory("productDisAjax", ['$q', '$http',
function($q, $http) {
	var JsonData = {};
	JsonData.getData = function(url, methodType, obj) {
		var methodType = methodType || 'POST';
		var deferred = $q.defer();
		if (methodType === 'POST') {
			$http({
				method : methodType,
				url : url,
				data : obj
			}).then(function (data) {
				console.log(data);
				deferred.resolve(data.data);
			}, function (error) {
				deferred.reject(error);
			});
			return deferred.promise;
		} else if (methodType === 'GET') {
			$http({
				method : methodType,
				url : url,
				params : obj
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				deferred.reject(status);
			});
			return deferred.promise;
		}
	};
	return JsonData;
}]).filter('unsafe', function($sce) {
	return $sce.trustAsHtml;
});

(function($){
	$('#productsharepopup,#spinPop1').on('hidden.bs.modal', function () {
		zoomSlideEnable();
	})
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