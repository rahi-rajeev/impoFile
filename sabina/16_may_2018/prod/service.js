"use strict";
(function() {
  angular.module('jsonseivice',[]).factory("salesfactoryData", ['$q', '$http', '$window','$rootScope',
	function($q, $http, $window, $rootScope) {
		var JsonData = {};
		//Listen on getDate for one request
		JsonData.getData = function(url,methodType,obj) {
			var methodType = methodType || 'POST';
			var deferred = $q.defer();
			if(methodType ==='POST'){
				$http({
				  method : methodType,
				  url : url,
				  data : obj
				}).then(function(data) {
				  deferred.resolve(data);
				},function(data, status, headers, config) {
				  deferred.reject(status);
				});
				return deferred.promise;
			}else if(methodType ==='GET'){
			    $http({
				  method : methodType,
				  url : url,
				  params : obj
				}).then(function(data) {
				  deferred.resolve(data);
				},function(data, status, headers, config) {
				  deferred.reject(status);
				});
				return deferred.promise;
			}else if(methodType ==='DELETE'){
			    $http({
				  method : methodType,
				  url : url,
				  params : obj
				}).then(function(data) {
				  deferred.resolve(data);
				},function(data, status, headers, config) {
				  deferred.reject(status);
				});
				return deferred.promise;
			}
	  	};

	  	//Listen on send all request 
	  	JsonData.getAllData=function(urlarr,methodType,obj){
	  		var promises = urlarr.map(function(item){
	  			let deferred = $q.defer();
	  			$http({
				  method : methodType,
				  url : item,
				  params : obj
				}).then(function(data) {
				  deferred.resolve(data);
				},function(data, status, headers, config) {
				  deferred.reject(status);
				});
				return deferred.promise;
	  		});
	  		return $q.all(promises);
	  	};

	  	//Listen on send file to server
	  	JsonData.uploadFiles = function(_url, method_type, imgObj){
	  		var deferred = $q.defer(),
	  		    formData = new $window.FormData(),
	  		    httpRequest   = new $window.XMLHttpRequest(),
	  		    queuedFiles = imgObj;

	  		 //add custom property
  			queuedFiles.customData = {
  				completed : false, 
  				error : false,
  				inprogress : false, 
  				percent : 0,	  				
  			};

	  		/**
             * @method attachEventListeners
             * @return {void}
             */
            (function attachEventListeners() {
                // Configure the event listeners for the impending request.
                //httpRequest.addEventListener("progress", onProgress);
				httpRequest.addEventListener("load", onComplete);
				httpRequest.addEventListener("error", onFailed);
				httpRequest.addEventListener("abort", onCanceled);

            })();

	  		// Initiate the HTTP request.
            httpRequest.open(method_type, _url, true); 

            //Invoke progress on transfers from the server to the client (downloads)
	  		httpRequest.upload.onprogress = function onProgress(event){
	  			var requestLength = queuedFiles.file.size;
	  			queuedFiles.customData.inprogress = true;

            	if (event.lengthComputable){ 
            		queuedFiles.customData.percent = Math.round((event.loaded / requestLength) * 100) +"%";
            		console.log(queuedFiles.customData.percent) 
            	}
            }.bind(this);
                       

            /**
	        * @method appendCustomData
	        * @return {void}
	        */
            (function appendCustomData() {
            	// Setup the file size of the request.
                httpRequest.setRequestHeader("X-CSRF-TOKEN", window.Laravel.csrfToken);
            })();

            // Iterate all of the valid files to append them to the previously created
            // `formData` object.
           	formData.append("product_image", queuedFiles.file, $window.encodeURIComponent(queuedFiles.file.name));
           
            
          	httpRequest.send(formData);

	  		//Invoked once everything has been uploaded.
	  		function onComplete(evt){	  			
	  			deferred.resolve(httpRequest.responseText);	
	  			imgObj.customData.inprogress = false;  			
	  		}

	  		//In case of error
	  		function onFailed(evt){
	  			deferred.reject(httpRequest.responseText);
	  		}
	  		//In case of abort by user
	  		function onCanceled(evt){
	  			queuedFiles.customData.completed = false;
	  			console.log("The transfer has been canceled by the user.");
	  		}

            return deferred.promise;
	  	};

		return JsonData;
	}]).service('dataManipulation', [function () {
		/*==========================/
		*@private section
		*============================*/ 
		var resultJson = {
			tabularData  : [],
			total_qty : [],
			total_soldOut : false,
			product_info : [],
			attr_json : [],
		};

		var isNumber = function(str){			
	        var pattern = /^\d+$/;
	        return pattern.test(str);  // returns a boolean	    
		};

		var setProps = function(obj, type, value){
			if(type!== undefined){	
				//if quantity is limited 				
				if(obj.totQty!==undefined && isNumber(obj.totQty)){

					var qt = parseInt(obj.totQty);
					if(obj.stock!==undefined){
						obj.sold_out = (obj.stock == "true") ? false : true;
					}else{
						obj.sold_out = (!isNaN(qt) && qt >= 1) ? false : true;
					}

					obj.qty_model = value;
					resultJson.total_qty.push(value);
				}else if(obj.totQty!==undefined && !isNumber(obj.totQty) && obj.totQty.toLowerCase() === "unlimited"){
					//if quantity is unlimited					
					obj.sold_out = false;
					obj.qty_model = value;
					resultJson.total_qty.push(value);
				}
			}
		};

		var pushData = function(destArray, props1, props2, props3, props4){
			if(destArray!== undefined && typeof destArray == "object"){
				var p = {
				 	"mainprdid" : props1,
				 	"type" : props2,
				 	"product_attribute_count" : props3 || 0,
				 	"product_type" : props4,
				};
				destArray.push(p);				
			}
		};

		//return length of array
		var soldout = function(pdata){
			var r = pdata.filter(function(o){
				return (o.sold_out!== undefined && (o.sold_out === true || o.sold_out == "true"));
			});			
			return (r.length);
		};

		/*==========================/
		*@end section
		*============================*/ 

		this.constructDataList = function(prdData, type, attrs){
			if(type!== undefined){
				$.map(prdData, function(item){					
					//attr_count this variable use to store count of attribute of every product 
					var attr_count =0;
					if(!angular.isArray(attrs) && attrs[item.mainProductId]!==undefined){
						attr_count = attrs[item.mainProductId].length;
						var at = {"main_prd_id" : item.mainProductId, "attr_id" : []};
						resultJson.attr_json.push(at);
					}
					
					if(type =='bundle'){
						setProps(item, item.prdType, 0);
					}else if(type == "configrable" || type == "normal"){
						setProps(item, item.prdType, 1);
					}					

					pushData(resultJson.product_info, item.mainProductId, item.prdType, attr_count, type);
				});

				//check total sold out 
				resultJson.total_soldOut = (soldout(prdData) == prdData.length) ? true : false;
			}

			return resultJson;
		};

		//this one used for single product props getter and setter
		this.onePrdGetterSetter = function(o, t, v){
			setProps(o, t, v);
			return o;
		};

		/*=============================
		*@quantity increase/decrease 
		*@param : max_val {int/string}-> if string means unlimited else limited
		*@param : str (string) -> flag for action (+-)
		*@param : prdDetail {object} -> current product
		*@param : prd_type {string} -> current product type
		*=============================*/
		this.quantityHandler = function(max_val, str, prdDetail, prd_type){			
			//check prdDetail is object or not
			if(prdDetail == undefined || typeof prdDetail != "object") return result;

			var tq = parseInt(prdDetail.qty_model);
				max_val = (!isNaN(max_val) && isNumber(max_val)) ? parseInt(max_val) : max_val;

			var result = {'status' : 'fail'}; 

			switch(str){
				case "up":
					if((isNumber(max_val) && tq < max_val) || (!isNumber(max_val) && max_val.toLowerCase() === "unlimited")){
						//quantity will increase in both case if is limited then up to max_val else  infinity
						prdDetail.qty_model = tq + 1;
						result['status'] = 'success';
					}

					break;
				case "down":
					//check product is normal
					if(prd_type!== undefined && prd_type == "normal" && tq >1){
						prdDetail.qty_model = tq - 1;
						result['status'] = 'success';
					}
					//check product is config or bundel
					else if(prd_type!== undefined && prd_type!="normal" && tq >=1){
						prdDetail.qty_model = tq - 1;
						result['status'] = 'success';
					}

					break;
				case "tqchange":					 
					if(isNumber(max_val) && tq > max_val)	{
						if(prd_type!== undefined && prd_type=="normal"){
							prdDetail.qty_model = 1;
							result['status'] = 'success';
						}else{
							prdDetail.qty_model = 0;
							result['status'] = 'success';
						}					
					}else if((isNumber(max_val) && tq <= max_val) || (!isNumber(max_val) && max_val.toLowerCase() === "unlimited")){
						//if quantity is limited/unlimited then it will be decrese up to 0 or 1 
						if(prd_type!== undefined && prd_type=="normal" && tq == 0){
							prdDetail.qty_model =1;
							result['status'] = 'success';
						}else{
							prdDetail.qty_model = tq;
							result['status'] = 'success';
						}
					}					

					break;
				default :
					break;
			};

			return result;
		};

		/**This service section used for manage attribute combination*/

		/*
		*@description : private method (used for set custom props in attribute data)
		*@partam : cmb_arr {array} -> array of combination set
		*@param  : curent_elem {object} -> current attr node 
		*/
		var notExist = [];

		var setAttrProps  = function(cmb_arr, curent_elem){
			var index = _getIndex(cmb_arr, curent_elem.valId);

    		if(index>=0){
    			curent_elem.disable_attr = false;
    		}else {
    			curent_elem.disable_attr = true;
    			notExist.push(curent_elem.valId);
    		}
		};

		/*
		*@description : This function used to set attribute id according to main product id(store all selected attribute id).
		*@param : attrArray {array} -> type json
		*@param : mpid {int} -> main product id
		*@param : atr_id {int} -> current attribute id to set in attribute json array
		*@return : type {int} -> index {0-....}
		*/
		this.setCurrentAttrbute = function(attrArray, mpid, atr_id){
			var ind = _getIndex(attrArray, mpid, "main_prd_id");

			if(ind!=-1){
				var _i = _getIndex(attrArray[ind].attr_id, atr_id);

				if(_i==-1)
					attrArray[ind].attr_id.push(atr_id);
			}

			return ind;
		};

		/*
		*@description : map all combination using main product id from attrValRes 
		 and check all deleted variant and set disable for selection
		*@param : attrValRes {array} -> object of array 
		*@param : mpid {int} -> main product id
		*@param : atr_id {int} -> current attribute id selected by user
		*@pama  : cmb_arr {array} -> all active attribute value 
		*/
		this.combinationMap = function(attrValRes, mpid, atr_id, cmb_arr, res_ind, attr_json){			
			 var atId = parseInt(atr_id),
			 	c_key;
			 var atrArr = attr_json[res_ind].attr_id;

			$.map(attrValRes, function(elem, key){
				//check attribute is not exist then perform action(means skip current attribute set)
				c_key = parseInt(key);
				console.log("in service", atrArr);
				console.log("not existing value", notExist);
				if(atr_id!=key){
					$.map(elem, function(c_elem){
						setAttrProps(cmb_arr, c_elem)
					});					
				}
			});
		};
	}]);

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

}).call(this);