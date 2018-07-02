var app = angular.module("productApp", ['blueimp.fileupload','ngTagsInput','froala','socialbase.sweetAlert'],function($interpolateProvider){
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}).config(['$httpProvider', 'fileUploadProvider', function ($httpProvider, fileUploadProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        fileUploadProvider.defaults.redirect = window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        );
        if (true) {
            angular.extend(fileUploadProvider.defaults, {
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                maxFileSize: 999000,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
	        });
        }
    }
]).factory("salesfactoryData", ['$q', '$http',function($q, $http) {
  var JsonData = {};
  JsonData.getData = function(url,methodType,obj) {
	var methodType = methodType || 'POST';
	var deferred = $q.defer();
    if(methodType ==='POST'){
		$http({
		  method : methodType,
		  url : url,
		  data : obj
		}).success(function(data) {
		  deferred.resolve(data);
		}).error(function(data, status, headers, config) {
		  deferred.reject(status);
		});
		return deferred.promise;
	 }else if(methodType ==='GET'){
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
}]).filter('customFilter', function(filterFilter) {
    return function(input, filterEach, exclude) {
        filterEach.forEach(function(item) {
          if (angular.equals(item, exclude)) { return; }
          input = filterFilter(input, '!'+item);
        });
        return input;
    }
});
/*****This filter used for qnique selection of option****/
app.filter('arrayDiff', function() {
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
  });

app.controller("productController", function($scope,salesfactoryData,$http,$filter,$window,$sce,$injector,SweetAlert){
    var pdc = this;
    $scope.tree = JSON.parse(dataset);
    $scope.hasvariant= true;
    // $scope.variants = JSON.parse(attributes);
    $scope.tprice=true;
    $scope.varientmodel =[], $scope.tire_quantity =[], $scope.quantity_price =[], $scope.catpath = [],$scope.tire_quantity =[], $scope.tire_quantity_price =[],$scope.varients_all_data = [];
    $scope.maincat = '';
    $scope.selectTags=[{value:null}];
    $scope.showspecialPriceSec = true;  
    $scope.showspecial = true;  
    $scope.MkpCategories  ={};
    $scope.treeNodeArrObj = {};
    $scope.skuexists=false;
    $scope.optionchoose=[];
    $scope.specificationchoose = [];
    $scope.selectedOptions=[];
    $scope.selectedSpecification=[];
    $scope.action="";
    //$scope.showvarientsec=false;    
    $scope.createprodsec=true;
    $scope.productcat='';
    $scope.productsellercat='';
    $scope.product_tagsdata=[];
    $scope.thumbnail_image='';

    $scope.edit_tags = blog_tag;
    $scope.queue = prod_img;
    $scope.videolist = [];
    $scope.videotemp = {};
    $scope.related_marketplace_cat_length = related_cat_count;
    $scope.related_marketplace_cat = relatedcats;

    if(videoss.length > 0){
        angular.forEach(videoss, function(val,key){
            //console.log(val);
            if(val.site=="youtube"){
                videoss[key]['video_url'] = 'https://www.youtube.com/embed/'+val.vid;
            }
            else{
                videoss[key]['video_url'] = 'https://player.vimeo.com/video/'+val.vid;   
            }
        })
        $scope.videolist = videoss;    
    }   

    $scope.addAction = function(actiontype){
        $scope.action = actiontype;
    }
    
/****This function used for set selected value in options****/
    if(main_cat.length) {
        $scope.main_cat = main_cat;
        $scope.admincatmodel =[];
        $scope.main_cat.map(function(val,key){
            val.map(function(inrVal,inrKey){
                if(inrVal.cat_id == inrVal.selected_cat_id) {
                    $scope.admincatmodel[key] = inrVal;
                }
            });
        });
    }

    $scope.mainproductname = '';

    $scope.saveProduct = function ($event){
        $scope.leanError();
        $event.preventDefault();
        data = angular.element('#productform').serializeArray();
        $scope.product = {};
        angular.forEach(data, function(key,val){
            $scope.product[key.name]= key.value;
        });
        $scope.product['action'] = $scope.action;

        // if(!angular.isUndefined($scope.related_marketplace_cat) &&  $scope.related_marketplace_cat.marketplace_related_catid){
        //     $scope.product['related_marketplace_id'] = $scope.related_marketplace_cat.marketplace_related_catid;    
        // } 

        if($scope.related_marketplace_cat &&  $scope.related_marketplace_cat.marketplace_related_catid){
            $scope.product['related_marketplace_id'] = $scope.related_marketplace_cat.marketplace_related_catid;    
        }        

        // $scope.product['files'] = $scope.files;
        //let alluploadedfile = angular.element('.table-striped').scope().queue;
        //console.log(alluploadedfile);
        $scope.product['files'] = $scope.files;
       // $scope.files= alluploadedfile;
        $scope.product['videofilelist'] = $scope.videolist; 
        angular.forEach($scope.files,function(val,key){
            $scope.product['files'][key] = val;
        });

        $scope.showLoader('show');
        $http({  
            method: 'POST',  
            url: form_submit_url,  
            headers: { 'Content-Type': undefined },  
            transformRequest: function (data) {  
               	var formData = new FormData(); 
                formData.append("formDatas", angular.toJson(data.formDatas));  
                if(typeof data.files !=='undefined' && data.files!==null){
                    for (var i = 0; i < data.files.length; i++) {  
                        formData.append("file["+i+"]", data.files[i]);  
                    }  
                }
                if(typeof $scope.MkpCategories!=='undefined' && $scope.MkpCategories!==null){
                    angular.forEach(angular.element('#parentdiv select'),function(val,key){
                        var temp = angular.element(val).find('option:selected')[0].value;
                        if(key ==0){
                          $scope.MkpCategories['cateId'] = temp
                        }
                        else{
                           $scope.MkpCategories['cateId'+temp] = temp
                        }
                    })
                  formData.append('Marketplace_Categories',angular.toJson($scope.MkpCategories)); 
                }
                if(typeof $scope.treeNodeArrObj!=='undefined' && $scope.treeNodeArrObj!==null)
                    formData.append('sellerCategory' , angular.toJson($scope.treeNodeArrObj));

                return formData; 
            },  
            data: { formDatas: $scope.product, files: $scope.product.files}  
        }).  
        success(function (data) { 

            //console.log(data);

            if(data.status == 'validation_error') {
                var parseData = JSON.parse(data.msg);
                angular.forEach(parseData, function (val, key) {
                    angular.element('#error_'+key).text(val);
                });

                $scope.showLoader('hide');
            }            
            else if(data.status = 'success') {
                $scope.showLoader('hide');
                SweetAlert.swal({
                    title: ' ',
                    text: data.msg,
                    type: 'success',
                    showCancelButton: false,
                }).then(() => {
                    window.location.href = form_submit_redirect_url;
                });
             }
        }).  
        error(function (data, status, headers, config) {  
            SweetAlert.swal("failed!");
            $scope.showLoader('hide');   
        });
    };

    $scope.leanError = function() {
        angular.element('#error_blog_name').text('');
        angular.element('#error_blog_short_desc').text('');
        angular.element('#error_blog_desc').text('');
        angular.element('#error_tags').text('');
        angular.element('#error_seller_category').text('');
        angular.element('#error_category').text('');
    }

    $scope.showLoader = function(action_type) {
        if(action_type == 'show') {
            angular.element('.span_loader').show();
            angular.element('.submit-buttom').hide();
        }
        else {
            angular.element('.span_loader').hide();
            angular.element('.submit-buttom').show();
        }
    }

    $scope.uploadedFileMJ = function(element) {
     $scope.$apply(function($scope) {
        $scope.files = element.files; 
     });
    };

    $scope.getSubCategory = function(sellercat){
        //console.log(sellercat);
        return $http.get($('#sellerCatUrl').val()+'?catid='+sellercat)
                    .then(function(response) {             
                        return response.data;
                    });

    }

    //console.log( console.log($('#tagurl').val()));
    $scope.loadTags = function(query) {
       
        return $http.get( $('#tagurl').val() +'?query=' + query ).then(function(response) {
                    //console.log(response.data);
                    return response.data;
        });
    }

    $scope.loadOptionSuggesion = function(query){
        return chooseoptionsdata.filter(function(option) {
            return option.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
        });      
    }

    $scope.addOptions = function(){
        //console.log($scope.optionchoose);
        if($scope.optionchoose.length>0){

            angular.forEach($scope.optionchoose, function(value, key){
                var checkflag = 0; // checking flag if data already exists
                angular.forEach($scope.selectedOptions,function(soval,sokey){
                    if(value.id == soval.id){
                        checkflag=1;
                    }
                });

                if(checkflag == 0){
                    $scope.selectedOptions.push(value);
                }
                
            });
            //console.log($scope.selectedOptions);
        }  
        //for making tag field empty 
        $scope.optionchoose=[];
    }

    $scope.removeOption = function(index){
        //$scope.disAddAnotherBtn= false;
       $scope.selectedOptions.splice(index,1);
       
    }
    
    $scope.getSubAdminCat= function(admincat,idStr,index){
        $scope.MkpCategories[idStr] = admincat;
        angular.element('#show_sub_categories').append('<img id="loader" style="float: left; margin-top: 7px;" src="loader.gif" alt="" />');

        var rdata = {'marketplace_cat_ids':$scope.MkpCategories };        
        return salesfactoryData.getData(relatedcaturl,'GET',rdata).then(function(response){
           $scope.related_marketplace_cat = response;
           $scope.related_marketplace_cat_length = Object.keys(response.maketplace_related_cat_title).length;

        });
    }
/*********This function used for delete previous uploaded image on product add page**********/
    $scope.deletePrevUploadImg = function(fileId, index){
        if(confirm('Are you sure to delete this records')) {
            var imgId = {"imageId" :  fileId};
            salesfactoryData.getData(image_delete_url,'POST',imgId).then(function(response){
                if(response == 'success') {
                    $scope.queue.splice(index,1); 
                }
            });
        }
    };

    angular.element('.parent').livequery('change', function() {  
        angular.element(this).parent().nextAll('div').remove();
        angular.element(this).parent().nextAll('label').remove();        
        angular.element('#parentdiv').append('<img src="loader.gif" style="float:left; margin-top:7px;" id="loader" alt="" />');
        // console.log('abc'+ angular.element(this).val());
        var obj={
            parent_id: angular.element(this).val()
        }
        //console.log(angular.element('#adminCatUrl').val());
        salesfactoryData.getData(angular.element('#adminCatUrl').val(),'GET',obj).then(function(response){
           	angular.element('#parentdiv').injector().invoke(function ($compile) {
			    angular.element('#parentdiv').append($compile(unescape(response))($scope));
			    angular.element('#loader').remove();
			});
        });        
    });

/****This section used for video**/
    var user_uploadImg='', imgInd=0;
    $scope.videoFile =[];

    $scope.getVideoDetail=()=>{
        
        //console.log(videourl);
        if(!pdc.videourl){
            return false;
        }

        $scope.vloader = true;
        var obj = {'v_url':pdc.videourl}; 
        salesfactoryData.getData(videourl,'POST',obj).then((response)=>{
            $scope.videotemp = response;            
            if(response.id){
                pdc.video_id = response.id;
                pdc.video_url = $sce.trustAsResourceUrl(response.video_url);
                pdc.video_prev_img = response.thumbnail_small;
                pdc.video_title = response.title;
                pdc.description = response.description;  
                $scope.vloader =false;  
            }
        },(error)=>{
            $scope.vloader =false;
            try{throw new Error("Something went wrong!");}
            catch(e){console.log("error: " + e);}
        });
    }

    $scope.refreshVideoForm = function(){
        pdc.video_prev_img = false;
        pdc.videourl = '';
        pdc.video_title = '';
        pdc.description = '';
        pdc.video_url='';
        pdc.video_id = false;
    }

    $scope.addVideo=()=>{

        $scope.videotemp.vid = pdc.video_id;
        $scope.videotemp.videourl = pdc.videourl;
        $scope.videotemp.video_title = pdc.video_title;
        $scope.videotemp.description = pdc.description;
        $scope.videotemp.user_uploadImg = user_uploadImg;
        $scope.videolist.push($scope.videotemp);

        user_uploadImg ='',
        pdc.videourl='',
        pdc.video_id='',
        pdc.video_title='',
        pdc.description='';
    }

    $scope.removeVideo = (vindex,usrfileIndex)=>{
        $scope.videolist.splice(vindex, 1);
        if(usrfileIndex!==0)
            $scope.videoFile.splice(usrfileIndex-1,1);
    }
    /******* video section ends here *****/    
});

app.filter('slugFy',function(){
    //console.log(1111);
    return function (input) {
        if (!input)
            return;
        // make lower case and trim
        var slug = input.toLowerCase().trim();
        // replace invalid chars with spaces
        slug = slug.replace(/[^a-z0-9\s-]/g, ' ');
        // replace multiple spaces or hyphens with a single hyphen
        slug = slug.replace(/[\s-]+/g, '-');
        return slug;
    };
})
/*****
 * This is directive used for tree view sub-menu
 *****/
app.directive('nodeTree', function() {
    return {
        template : '<node ng-repeat="node in tree"></node>',
        replace : true,
        restrict : 'E',
        scope : {
            tree : '=children'
        }
    };
})

app.directive('node', function($compile) {
    return {
        restrict : 'E',
        replace : true,
        template : '<li> <span class="expandCollapse" ng-click="toggleVisibility(node)" ng-if="node.children.length"> <i class="glyphicon glyphicon-plus plus" ng-if="node.childrenVisibility && node.children.length"></i><i class="glyphicon glyphicon-minus minus" ng-if="(!node.childrenVisibility && node.children.length)"></i></span><label class="checkLabel"><input ng-click="checkNode(node)" type="checkbox" ng-checked="node.checked"><span class="chekboxbg"></span></label><span class="listName"> {{ node.name }}</span></li>',
        link : function(scope, element) {
            /*
             * Here we are checking that if current node has children then compiling/rendering children.
             * */
            if (scope.node && scope.node.children && scope.node.children.length > 0) {
                scope.node.childrenVisibility = true;
                var childNode = $compile('<ul class="tree" ng-if="!node.childrenVisibility"><node-tree children="node.children"></node-tree></ul>')(scope);
                element.append(childNode);
            } else {
                scope.node.childrenVisibility = false;
            }
        },
        controller : ["$scope",
        function($scope) {
            // This function is for just toggle the visibility of children
            $scope.toggleVisibility = function(node) {
                if (node.children) {
                    node.childrenVisibility = !node.childrenVisibility;
                }
            };
            // Here We are marking check/un-check all the nodes.
            $scope.checkNode = function(node) {
                node.checked = !node.checked;
                function checkChildren(c) {
                   angular.forEach(c.children, function(c) {
                        c.checked = node.checked;
                        checkChildren(c);
                    });
                    if(node.checked)
                      $scope.treeNodeArrObj[c.name] = c.id;
                    else
                      delete $scope.treeNodeArrObj[c.name];
                }
                checkChildren(node);
            };
            /**** This section used to default checked by node id****/
            $scope.defaultCheckNode = function(node) {
               if(prod_seller_cat.indexOf(node.id)!= -1){
                    node.checked = true;
                }
                function checkChildren(c) {
                   angular.forEach(c.children, function(c) {
                       if(prod_seller_cat.indexOf(c.id)!= -1)
                           c.checked = true;
                        checkChildren(c);
                   });
                    if(node.checked)
                      $scope.treeNodeArrObj[c.name] = c.id;
                    else
                      delete $scope.treeNodeArrObj[c.name];
                }
                checkChildren(node);
            };
            if(prod_seller_cat!='' && typeof prod_seller_cat!='undefined'){
                $scope.tree.map(function(value,key){
                 $scope.defaultCheckNode(value);
                })
            }
            prod_seller_cat =[];
        }]
    };
});

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])