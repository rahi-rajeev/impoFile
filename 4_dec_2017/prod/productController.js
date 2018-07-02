/******
*@This controller used for product create
*@Project Name : LCS
*@Ahuthor : SMOOTHGRAPH CONNECT PVT LTD.
*******/
var csrftoken = window.Laravel.csrfToken;
var app = angular.module("productApp", ['blueimp.fileupload','ngTagsInput','froala','ui.bootstrap', 'ui.bootstrap.datetimepicker'],function($interpolateProvider){
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
}]);
app.filter('customFilter', function(filterFilter) {
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
//Froala  editor setting (value)
app.value('froalaConfig', {
    toolbarInline: false,
    enter: $.FroalaEditor.ENTER_BR,

    //Folder Path
    userFolderDefaultPath: window.userFolderDefaultPath,
    placeholderText: 'Edit Your Content Here!',

    // Set the image Load URL.
    imageManagerLoadURL: '/en/seller/froalaloadimages?folder='+window.userFolderDefaultPath,

    // Set the Default Path
    imageManagerDefaultURL: '/en/seller/froalaloadimages?folder='+window.userFolderDefaultPath,
    
    // // Set the image delete URL.
    // imageManagerDeleteURL: './delete_image.php?folder='+window.userFolderDefaultPath,

    // // Set the Default image delete URL.
    imageManagerDefaultDeleteURL: '/en/seller/froaladeletefolder?_token='+csrftoken+'&folder='+window.userFolderDefaultPath,
    imageUploadParam: 'image',

    imageUploadMethod: 'post',
    // Set the image upload URL.
    imageUploadURL: '/en/seller/froalaupload?folder='+window.userFolderDefaultPath, 
    imageUploadParams: {
        location: 'images', 
        // This allows us to distinguish between Froala or a regular file upload.
        _token:  csrftoken
        // This passes the laravel token with the ajax request.
    },
    imageManagerDeleteParams :{
        _token:  csrftoken

    },    
    // Set the image delete URL.
    imageManagerDeleteURL: '/en/seller/froaladeletefolder?_token='+csrftoken+'&folder='+window.userFolderDefaultPath,
    // // Set the Default Upload Path
    imageManagerDefaultUploadURL: '/en/seller/froalaupload?_token='+csrftoken+'&folder='+window.userFolderDefaultPath,

    // Set the new folder URL.
    imageManagerNewFolderURL: '/en/seller/froalaNewFolder?_token='+csrftoken+'&path='+window.userFolderDefaultPath,
    // imageManagerNewFolderParams:{
    //  _token:  csrftoken
    // },
    // Set the default new folder urlURL.
    imageManagerNewFolderDefaultURL: '/en/seller/froalaNewFolder?_token='+csrftoken+'&path='+window.userFolderDefaultPath,    
});
//Product Controller
app.controller("productController", function($scope,salesfactoryData,$http,$filter,$window,$sce,$injector,inlineEdit){
    var pdc = this;
    $scope.tree = dataset;
    $scope.hasvariant= false;
    $scope.variants = JSON.parse(attributes);
    $scope.tprice=true;
    $scope.varientmodel =[], $scope.tire_quantity =[], $scope.quantity_price =[], $scope.catpath = [],$scope.tire_quantity =[], $scope.tire_quantity_price =[],$scope.varients_all_data = [];
    $scope.maincat = '';
    $scope.selectTags=[{value:null}];
    $scope.showspecialPriceSec = true;
    $scope.site_visibility = true;
    $scope.priceswitch ='specialprice';  
    $scope.showspecial = true;  
    $scope.MkpCategories  ={};
    $scope.treeNodeArrObj = {};
    $scope.skuexists=false;
    $scope.optionchoose=[];
    $scope.specificationchoose = [];
    $scope.selectedOptions=[];
    $scope.selectedSpecification=[];
    $scope.loader=false;
    $scope.videolist = [];
    $scope.videotemp = {};
    $scope.calltoactiondata = calltoactiondata;
    //$scope.allow_sp_tp = true;
    //$scope.producttype='normal';
    $scope.related_marketplace_cat_length=0;    
    $scope.queue=[];
    //$scope.allbtnvisibility = 0;
    $scope.activalangs = activelangs; 
    $scope.lang_prefered = lang_prefered;
    $scope.abc=false;
   // $scope.initial_price=0;
   // $scope.special_price=0;
    $scope.fileerror=false;
    //$scope.showvarientsec=false;    
    $scope.createprodsec=true;
    $scope.productcat='';
    $scope.productsellercat='';
    $scope.product_tagsdata=[];
    $scope.thumbnail_image='';
    $scope.config=sellerconfig;
    $scope.variantsCombinationData = [];
    var variantComb =[];
    $scope.mainproductname = '';
    $scope.sp_fromdate = $filter('date')(new Date(), 'dd-MM-yyyy');
    $scope.sp_todate = $filter('date')(new Date(), 'dd-MM-yyyy');
    var main_product_id ='';

    if(calltoactiondata.length>0){
        angular.forEach($scope.calltoactiondata,function(val,key){
            if(val.default_set=='1'){
                $scope.callinactionmodel=val;
            }
        });        
    }


    $scope.switchPrice = function (choice){
        $scope.priceswitch = choice;
        if($scope.priceswitch == 'specialprice'){
            $scope.showspecial = true;
            $scope.showtire = false; 
        }
        if($scope.priceswitch == 'tireprice'){
            $scope.showspecial = false;
            $scope.showtire = true;
        }
    }

    $scope.tprices = [{id: 'choice1'}, {id: 'choice2'}];
    $scope.variantTagsData = [];

    // $scope.switchPrice = function(strPrice){
    //     ($scope.showspecialPriceSec === true) ?  $scope.showspecialPriceSec = false : $scope.showspecialPriceSec = true;
    //     console.log(strPrice);
       
    // }


    $scope.addTireprice = function() {
        var newItemNo = $scope.tprices.length+1;
        $scope.tprices.push({'id':'choice'+newItemNo});
        $scope.tprice=true;
    };
  
    $scope.removeTireprice = function() {
      if($scope.tprices.length>1){
            var lastItem = $scope.tprices.length-1;
            $scope.tprices.splice(lastItem);
            $scope.tire_quantity_price.splice(lastItem);
            $scope.tire_quantity.splice(lastItem);
       }else{
        swal({
            type: 'warning',
            text: "You can't remove tire price because \n You have checked tireprice"
        })
       }
    };
    /***** This function used for add another varient on click******/
    var clickCount =1;
    $scope.addVariants = function(){
        clickCount++;
        $scope.selectTags.push({});
        if((($scope.variants.length)-1)<clickCount)
            $scope.disAddAnotherBtn= true;
    }
    $scope.removeVariants = function(index,tagIndex){
      if($scope.selectTags.length>1){
            $scope.disAddAnotherBtn= false;
            $scope.selectTags.splice(index,1);
            clickCount--;
            $scope.varientmodel.splice(index,1);
            $scope.variantTagsData[tagIndex]=[];
            variantComb.splice(index,1);
       }else{
        swal({
          type: 'warning',
          text: "You can't remove this variants because \n You have checked multiple variants"
        })
       }
   }

    $scope.showVariantsSelections = function(vstatus){
        if(vstatus==true && $scope.selectTags.length<1){
            $scope.selectTags=[{value:null}];
        }
        /****This case used to remove vaitant if unchecked****/
        if(!vstatus){
            $scope.varientmodel =[];
            $scope.variantTagsData =[];
        }
    }
   
    $scope.getAttributValuesAndAttribute = function(index,modelIndex,optIndex){
        var data = {"vid":$scope.varientmodel[index].id};
        var varientUrl =  $('#varientUrl').val();
        variantComb[index] = optIndex;
        salesfactoryData.getData(varientUrl,'GET',data).then(function(response){
           // if(response.lenght>0){
            // console.log($scope.varients_all_data);
            // console.log(response);
            // $scope.varients_all_data.splice(optIndex,0,response);
            $scope.varients_all_data[optIndex] = response;
        });
    }
    //Listen on save all change (variant modal button action)
    $scope.saveVariants = function(){
        var variantsaveurl = "/en/seller/product/savevariant";
        salesfactoryData.getData(variantsaveurl,'POST',$scope.variantsCombinationData).then(function(response){
            if(response.status==true){
                jQuery('#variantmodal').modal('hide'); 
                swal({
                 title: "Good",
                 text: "Product successfully created.",
                 type: "success",
                 timer: 2000
                }).then(
                  function () {},
                  function(dismiss){                  
                    window.location.href = "en/seller/variantList/"+response.parent_id;
                });                
            }               
        });
    };
   //This function used for clear file from scope
    $scope.cancelfile= function(){$scope.files =[];};
   //listen on save product
    $scope.saveProduct = function ($event,productform){
       $event.preventDefault();
        if(typeof($scope.files) == 'undefined' || $scope.files.length<1){
            $scope.fileerror = true;
        }else{
            $scope.fileerror = false;
        }
        if(productform.$invalid || $scope.fileerror == true ){
            jQuery('#errormodal').modal('show');     
            return false;
        }    
      
        $scope.loader = true;
        data = angular.element('#productform').serializeArray();
        $scope.product = {};
        angular.forEach(data, function(key,val){
            $scope.product[key.name]= key.value;
            // if(key.name=="tire_quantity[]"){
            //     $
            // }
        });
        $scope.product['files'] = $scope.files; 
        $scope.product['specificationfiles'] = $scope.specificationfiles;
        $scope.product['videofilelist'] = $scope.videolist;

        if($scope.related_marketplace_cat.marketplace_related_catid){
            $scope.product['related_marketplace_id'] = $scope.related_marketplace_cat.marketplace_related_catid;    
        }
        angular.forEach($scope.files,function(val,key){
            $scope.product['files'][key] = val;
        });
        angular.forEach($scope.specificationfiles,function(val,key){
            $scope.product['specificationfiles'][key] = val;
        });
        var variants = [];
        angular.forEach($scope.varientmodel,function(val,key){
            var attributes = [];
            var ind = variantComb[key];
            $scope.variantTagsData[ind].map((atribute_val,at_key)=>{
                attributes.push(atribute_val);
            })
           variants.push({'variant_id':val.id,'variant_name':val.name,'variant_attribute':attributes});
        });
        $scope.selected_variants = variants;
      
        $http({  
            method: 'POST',  
            url: producturl,  
            headers: { 'Content-Type': undefined },  
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append('_token',csrftoken);
                formData.append("formDatas", angular.toJson(data.formDatas));  
                if(typeof data.files !=='undefined' && data.files!==null){
                    for (var i = 0; i < data.files.length; i++) {  
                      formData.append("file["+i+"]", data.files[i]);  
                    }  
                }

                if(typeof data.specificationfiles !=='undefined' && data.specificationfiles!==null){
                    console.log(data.specificationfiles);
                    for (var j=0; j < data.specificationfiles.length; j++) {
                      formData.append("specificationfile["+j+"]", data.specificationfiles[j]); 
                    }
                }

                if(typeof data.video_files !=='undefined' && data.video_files!==null){
                    for (var k=0; k < data.video_files.length; k++) {
                       // console.log(data.video_files[k][0]);
                      formData.append("videothumbfile["+k+"]", data.video_files[k][0]); 
                    }
                }                
                formData.append('expiry_date',pdc.expiryDate.date);
                formData.append('selectedoption',angular.toJson($scope.selectedOptions));
                formData.append('selectedspecification',angular.toJson($scope.selectedSpecification));
                formData.append('variants',angular.toJson($scope.selected_variants));
                formData.append('tire_quantity',angular.toJson($scope.tire_quantity));
                formData.append('tire_quantity_price',angular.toJson($scope.tire_quantity_price)); 
                if(typeof $scope.MkpCategories!=='undefined' && $scope.MkpCategories!==null)
                    formData.append('Marketplace_Categories ',angular.toJson($scope.MkpCategories)); 
                if(typeof $scope.treeNodeArrObj!=='undefined' && $scope.treeNodeArrObj!==null)
                    formData.append('sellerCategory' , angular.toJson($scope.treeNodeArrObj));
                return formData; 
            },  
            data: { formDatas: $scope.product, files: $scope.product.files, video_files: $scope.videoFile, specificationfiles: $scope.product.specificationfiles }  
        }).  
        success(function (data, status, headers, config) { 
             $scope.loader = false;
            if(data.hasvariant==true){
                main_product_id = data.pid;
                $scope.variantsCombinationData=data.product;
                $scope.editVariantData = new inlineEdit($scope.record);
                jQuery('#variantmodal').modal('show'); 
            }
            else{
                if(data.status=='success'){
                   swal({
                         title: "Good",
                         text: "Product successfully created.",
                         type: "success",
                         showConfirmButton:false,
                         timer: 3000
                         }).then(
                          function () {},
                          function(dismiss){                           
                            window.location.href = "en/seller/variantList/"+data.pid;
                    });                    
                }
                else{
                    $scope.serverside_errors=data.error;
                    jQuery('#errormodal').modal('show');                        
                }
            }     
        }).  
        error(function (data, status, headers, config) { 
            $scope.loader=false; 
            alert("Please refresh your page and try again!");  
        });
    };
    //Listen on delete variant combination
    $scope.deleteVariantCombination = function(index){
         $scope.variantsCombinationData.splice(index, 1);
    };
    //Listen on upload file
    $scope.uploadedFileMJ = function(element){
        $scope.$apply(function($scope) {
         $scope.files = element.files; 
        });
        if(typeof($scope.files)=='undefined'){
            $scope.fileerror=true;
            return false;
        }else if(($scope.files.length<1)){
            $scope.fileerror=true;
            return false;
        }else{
            $scope.fileerror=false;
        }
    };
    //Listen on upload specification file
    $scope.uploadSpecificationFiles = function(fileelement){        
        $scope.$apply(function($scope){
            $scope.specificationfiles = fileelement.files;
        });
    };

    $scope.myTxt = "You have not yet clicked submit";
    $scope.myFunc = function () {
        $scope.myTxt = "You clicked submit!";
    }
    $scope.prodtQutInput =[];
   
    $scope.gatherQuatData = function(ind,$event){
        if($event.target.value!=='')
           $scope.prodtQutInput[ind]=  parseInt($event.target.value);
    }
    $scope.userCanInputLagerToOther = function(){
        var pdLength = $scope.prodtQutInput.length;
        if(pdLength>1){
            for(var i=0;i<pdLength;i++){
                //console.log('outer loop');
                for(var j=i+1;j<pdLength;j++){
                    //console.log('inner loop');
                    if($scope.prodtQutInput[j]<$scope.prodtQutInput[i]){
                        $scope.tire_quantity[j]='';
                        //console.log('larger');
                    }      
                    
                }
            }
         }
    };

    $scope.checksku= function(sku){
        var data = {'sku':sku,'case':'add'};
        salesfactoryData.getData($('#skucheck').val(),'GET',data).then(function(response){
            //console.log(response.status);
            if(response.status){
                $scope.skuexists = true;
            }
            else{
                $scope.skuexists = false;
            }
        });
    };

    //Listen after get sub-category
    $scope.getSubCategory = function(sellercat){
        //console.log(sellercat);
        return $http.get($('#sellerCatUrl').val()+'?catid='+sellercat)
                    .then(function(response) {             
                        return response.data;
                    });

    };;
    //Listen on load product tag
    $scope.loadTags = function(query) {
        return $http.get( $('#tagurl').val() +'?query=' + query ).then(function(response) {
            return response.data;
        });
    };
    //Listen on load option suggestion
    $scope.loadOptionSuggesion = function(query){
        var rdata = {'query':query };        
        return salesfactoryData.getData(optionurl,'GET',rdata).then(function(response){
           return response;           
        });
        
    };
    //Listen on add option (Product)
    $scope.addOptions = function(){
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
        }  
        $scope.optionchoose=[];
    };
    //Listen on remove option (from product create)
    $scope.removeOption = function(index){
        //$scope.disAddAnotherBtn= false;
       $scope.selectedOptions.splice(index,1);       
    };
    //Listen on load specification suggestion
    $scope.loadSpecificationSuggesion = function(query){
        var rdata = {'query':query };        
        return salesfactoryData.getData(specificationurl,'GET',rdata).then(function(response){
           return response;           
        });    
    };
    //Listen on add specification (in product)
    $scope.addSpecifications = function(){
        if($scope.specificationchoose.length>0){
            angular.forEach($scope.specificationchoose, function(value, key){
                var checkspecflag = 0; // checking flag if data already exists
                angular.forEach($scope.selectedSpecification,function(specval,speckey){
                    if(value.id == specval.id){
                        checkspecflag = 1;
                    }
                });
                if(checkspecflag == 0){
                     $scope.selectedSpecification.push(value);
                }else{
                    //alert('Already Added');
                }               
            });
        }       
        $scope.specificationchoose=[];
    };

    $scope.removeSpecification = function(index){
        //$scope.disAddAnotherBtn= false;
       $scope.selectedSpecification.splice(index,1);       
    };
    //file upload handler
    $scope.uploadedFile = function(element) {
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.gif)$");
        if(regex.test(element.files[0].name.toLowerCase())){
            // vidfile = element.files[0];
            // $scope.currentFile = element.files[0];
            var reader = new FileReader();
             reader.onload = function(event) {
                console.log(event.target.result);
                var image = new Image();
                image.src = event.target.result;
                image.onload = function(){
                    var height = this.height;
                    var width = this.width;
                    if (width===120 && height===90 ) {
                        alert("Height and Width must not exceed 100px.");
                        return false;
                    }
                };
                $scope.image_source = event.target.result;
                user_uploadImg=event.target.result;
                vidfile = element.files; 
            }
            reader.readAsDataURL(element.files[0]);
        }
     };
    //This section used for video
    var vidfile ='',user_uploadImg='',imgInd=0;
    $scope.videoFile =[];
    $scope.getVideoDetail=()=>{
        let youtube_reg = new RegExp(/^(http|https\:\/\/)?(www\.youtube|youtu\.be)\/.+$/);
        let url_regexp =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        //check condtion for url 
        if(typeof pdc.videourl=="undefined" || pdc.videourl=='' || !url_regexp.test(pdc.videourl)) return;
       //check youtube share usl
        if(pdc.videourl.match(youtube_reg)){
            let youtube_id=pdc.videourl.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
            pdc.videourl = "http://www.youtube.com/watch?v=" + youtube_id;  
        }       
        $scope.vloader = true;
        salesfactoryData.getData(videourl,'POST',{'v_url':pdc.videourl}).then((response)=>{
            if(typeof response.status!=="undefined" && response.status==="error"){
                swal('Opps...',response.mesg,'warning');
            }else{
                $scope.videotemp = response;            
                if(response.id){
                    pdc.video_id = response.id;
                    pdc.video_url = $sce.trustAsResourceUrl(response.video_url);
                    pdc.video_prev_img = response.thumbnail_small;
                    pdc.video_title = response.title;
                    pdc.description = response.description;  
                    $scope.vloader =false;
                } 
            }          
        },(error)=>{
            $scope.vloader =false;
            try{throw new Error("Something went badly wrong!");}
            catch(e){console.log("error: " + e);}
        }).finally(()=>{$scope.vloader=false;});        
    };
     
    $scope.refreshVideoForm = function(){
        pdc.video_prev_img = false;
        pdc.videourl = '';
        pdc.video_title = '';
        pdc.description = '';
        pdc.video_url='';
        pdc.video_id = false;
    };    
    //Listen on save video 
    $scope.addVideo = ()=>{
        if(typeof vidfile !='undefined' && vidfile!=''){
            $scope.videoFile.push(vidfile);
            $scope.videotemp.usrfileIndex = ++imgInd;
            vidfile ='';
        }else {$scope.videotemp.usrfileIndex = 0};

        $scope.videotemp.vid = pdc.video_id;
        $scope.videotemp.videourl = pdc.videourl;
        $scope.videotemp.video_title = pdc.video_title;
        $scope.videotemp.description = pdc.description;
        $scope.videotemp.user_uploadImg = user_uploadImg;
        $scope.videolist.push($scope.videotemp);
        user_uploadImg ='',pdc.videourl='',pdc.video_id='',pdc.video_title='',pdc.description='';
        //var obj= $scope.videotemp;
        // salesfactoryData.getData(addvideourl,'POST',obj).then((response)=>{
        //     //pdc.video_id = 'https://www.youtube.com/embed/'+response.id; 
        //     // $scope.videolist.push(response);
        //     // console.log($scope.videolist);

        //     if(response.id){
        //         pdc.video_id = response.id;
        //         pdc.video_url = $sce.trustAsResourceUrl(response.video_url);
        //         pdc.video_prev_img = response.thumbnail_large;
        //         pdc.video_title = response.title;
        //         pdc.description = response.description;    
        //     }           

        // },(error)=>{
        //    // swal("Something went badly wrong!");
        //     try{throw new Error("Something went badly wrong!");}
        //     catch(e){console.log("error: " + e);}
        // });
        // pdc.video_title = "gshdfsdds";
        // console.log(pdc.video_from);
    };
    //Listen on remove video (btn)
    $scope.removeVideo = (vindex,usrfileIndex)=>{
        $scope.videolist.splice(vindex, 1);
        if(usrfileIndex!==0)
            $scope.videoFile.splice(usrfileIndex-1,1);
    };
    //video section ends here

    $scope.loadoptions = function(query,index) {
       //return $scope.varients_all_data[index];
       //for only matching element comment above line.
        return $scope.varients_all_data[index].filter(function(option) {
            return option.values.toLowerCase().indexOf(query.toLowerCase()) != -1;
        });        
    };
    $scope.getSubAdminCat = function(admincat,idStr){
        $scope.MkpCategories[idStr] = admincat;
        angular.element('#show_sub_categories').append('<img id="loader" style="float: left; margin-top: 7px;" src="loader.gif" alt="" />');
        var rdata = {'marketplace_cat_ids':$scope.MkpCategories };        
        return salesfactoryData.getData(relatedcaturl,'GET',rdata).then(function(response){
           $scope.related_marketplace_cat = response;
           $scope.related_marketplace_cat_length = Object.keys(response.maketplace_related_cat_title).length;

        });
    };


    // $scope.checkInitialPrice = function(){
    //     alert($scope.special_price);
    //     alert($scope.initial_price);
    //     console.log($scope.special_price);
    //     // console.log('Initial price: '+initial_price);
    //     // console.log('Specail price: '+ special_price);
    //     // console.log($scope);


    //     // if(special_price > initial_price){
    //     //     $scope.special_price=0;
    //     //     //alert('hello special price should not be greater than inial price');
            
    //     //     // angular.element('#special_price').val('');
    //     // }    
    // }


  
    /******This function used to validate tire price in accedinding order******/
    $scope.validateTirePrice = function(index){
        var tpLength = $scope.tire_quantity.length;
        // if(tpLength>1 && index!=0){

        //     if(!(parseInt($scope.tire_quantity[index])>parseInt($scope.tire_quantity[index-1]))) {
        //       SweetAlert.swal({
        //          type: 'warning',
        //          text: "You can't enter quantity smaller than other!"
        //       })
        //    }
        // }
        // console.log(index);
    };
    //Listen on change market place category
    angular.element('.parent').livequery('change', function() {  
        angular.element(this).parent().nextAll('div').remove();
        angular.element(this).parent().nextAll('label').remove();        
        angular.element('#parentdiv').append('<span id="loader" class="loader loader-small" ng-show="loader"></span>');
        var obj={
            parent_id: angular.element(this).val()
        };
        salesfactoryData.getData(angular.element('#adminCatUrl').val(),'GET',obj).then(function(response){
            angular.element('#parentdiv').injector().invoke(function ($compile) {
                angular.element('#parentdiv').append($compile(unescape(response))($scope));
                angular.element('#loader').remove();
            });
         });        
    });
    //date setting section
    this.expiryDate= {
        //date: new Date(),
        datepickerOptions :{showWeeks: false,}
    };
    // min date picker
    this.sp_fromdate = {
        date: new Date(),
        datepickerOptions: {maxDate: null,showWeeks: false,}
    };
    // max date picker
    this.sp_todate = {
        date: new Date(),
        datepickerOptions: {
            minDate: null,
            showWeeks: false,
            //showButtonBar : false,
        }
    };
    // set date for max picker, 10 days in future
    this.sp_todate.date.setDate(this.sp_todate.date.getDate() + 10);
    this.openCalendar = function(e, picker) {
        pdc[picker].open = true;
    };
    // watch min and max dates to calculate difference
    var unwatchMinMaxValues = $scope.$watch(function() {
        return [pdc.sp_fromdate, pdc.sp_todate];
    }, function() {
        // min max dates
        //pdc.sp_fromdate.datepickerOptions.maxDate = pdc.sp_todate.date;
        pdc.sp_todate.datepickerOptions.minDate = pdc.sp_fromdate.date;
    }, true);
    // destroy watcher
    $scope.$on('$destroy', function() {
        unwatchMinMaxValues();
    });
    jQuery('#variantmodal').modal('show'); 
    //Listen on close product variant modal close
    $scope._variantModalClose=($event)=>{
        $event.stopPropagation();
        swal({
          title: 'Are you sure?',
          text: "If you close this without click on save all cahnge then this product will be deleted!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
           if (result) {
            salesfactoryData.getData(deleteProductWithoutSaveAll,"POST",{"product_id" :  main_product_id}).then((resp)=>{
                if(resp.status == "true" || resp.status == true){
                   location.reload();
                }else{
                    try{throw new Error("Something went badly wrong!");}
                    catch(e){console.log("error: " + e);}
                }
            },(error)=>{
               try{throw new Error("Something went badly wrong!");}
               catch(e){console.log("error: " + e);}
            });
          }
        },(dismiss)=>{
            console.log(dismiss);
        });
    };
});
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
});
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
               
                // for select parent

                // function parentNodecheck(p) {
                //  if(checkChildren(c)== length){
                        
                //  }
                // }

            };
        }]
    };
});
//Directive used for inlie edit product specification in modal(Bootstrap)
app.factory("inlineEdit", function(){ 
    return function(recordCache, Resource){
        this.recordCache =[];
        this.recordCache[0] = recordCache;
        this.resource = Resource;
        console.log(recordCache);
        console.log(Resource);
        //var btnv = angular.element('#productform').scope();           
        this.edit = function(record,index){              
            //console.log(this.recordCache);
            //console.log(data.allbtnvisibility);
            //$scope.allbtnvisibility = $scope.allbtnvisibility + 1;
            //btnv.allbtnvisibility = btnv.allbtnvisibility+1;
            //edtFlag=true;
            angular.extend(this.recordCache[index] = record, {editing:true});
           
        };
        this.cancel = function(index){
            delete this.recordCache[index].editing;
            //this.recordCache[index] = {};
           
        };
        this.save = function(index){
            //btnv.allbtnvisibility = btnv.allbtnvisibility-1;
            delete this.recordCache[index].editing;
            // new this.resource(this.recordCache).update().then( (response) ->)
            console.log(JSON.stringify(this.recordCache));
            //this.recordCache[index] = {};
           
        };
    }
});
//Drective used for initlize dynamic add datepicket
app.directive("datepicker",()=>{
    function link(scope, element, attrs, controller){
        var options = {
            format: "dd/mm/yy",
            autoclose:true
        };
        element.datepicker(options).on('changeDate',function(dateText){
            scope.$apply(function(){
                console.log(dateText);
                controller.$setViewValue(dateText.date);
                element.datepicker('hide');
            });
        });
    }
    return {
        restrict :'A',
        require: 'ngModel',
        link: link
    };
});
//Number only directive
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr,ngModelCtrl) {
            scope.$watch(()=>{
                 return ngModelCtrl.$modelValue;
            },(val)=>{
                console.log(attr.maxValue);
                //console.log(val);
            },true);
           
            function fromUser(text) {
                if (text) {
                   var transformedInput = text.toString().replace(/[^0-9\.]/g, '');
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
            element.bind('keypress', function (e) {
                var code = e.keyCode || e.which;
                // Remove code === 101 part if you want 'e' to go through
                if (code === 101 || code === 32) {
                    e.preventDefault();
                }
            });
        }
    };
});
//Filter used for add video in ifram
app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);