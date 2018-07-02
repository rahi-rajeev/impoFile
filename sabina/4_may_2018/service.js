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

	  		//Invoke progress on transfers from the server to the client (downloads)
	  		
	  		/*function onProgress(evt){
	  			var requestLength = queuedFiles.file.size;
	  			queuedFiles.customData.inprogress = true;
	  				console.log("lllllll..")
	  			if (evt.lengthComputable) {
	  				// console.log("here");
	  				// queuedFiles.percent = Math.round((evt.loaded / evt.total) * 100);
	  				// console.log("add upload event-listener" + evt.loaded + "/" + evt.total + "\t" + requestLength);
	  				// console.log(Math.floor((evt.loaded % requestLength) * 100));
	  				// console.log(100 - (evt.loaded / evt.total * 100))
	  				   
				} else {
				    // Unable to compute progress information since the total size is unknown
				}
			}*/

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
	}]);
}).call(this);