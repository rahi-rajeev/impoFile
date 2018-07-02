/******
*@This controller used for product edit
*@Project Name : LCS
*@Ahuthor : SMOOTHGRAPH CONNECT PVT LTD.
*******/
var app = angular.module("productApp", ['blueimp.fileupload','froala','ngTagsInput','ui.bootstrap','ui.bootstrap.datetimepicker'],function($interpolateProvider){
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
//This filter used for qnique selection of option
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
//product edit controller
app.controller("productEditController", function($scope,salesfactoryData,$http,$filter,$window,$sce,$injector,inlineEdit){
    var pdc = this;
    $scope.allow_sp_tp = false;
    $scope.tree = JSON.parse(dataset);
    $scope.hasvariant= true;
    $scope.variants = JSON.parse(attributes);
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
    $scope.loader=false;
    $scope.producttype='normal';    
    $scope.activalangs = activelangs; 
    $scope.lang_prefered = lang_prefered;
    $scope.abc = false;
    $scope.files =[];
    $scope.createprodsec = true;
    $scope.productcat = '';
    $scope.productsellercat = '';
    $scope.product_tagsdata = [];
    $scope.thumbnail_image = '';
    $scope.productName = [];
    $scope.productDesc = [];
    $scope.metatitle =[];
    $scope.metakeyword = [];
    $scope.metadesc = [];
    $scope.videoidstodel = [];
    $scope.calltoactiondata = calltoactiondata;
    $scope.currency_symbol = currency_symbol;

    angular.forEach(calltoactiondata,function(value,index){
        if(product_detail.call_to_action_id==value.id){
            $scope.callinactionmodel = value;
        }
    });
    
    if($scope.tree.length > 0){
        $scope.hide_create_button = false;
    }

    $scope.related_marketplace_cat={"maketplace_related_cat_title":''};
    $scope.related_marketplace_cat['maketplace_related_cat_title']=relatedcats;
    

    if(videoss.length > 0){
        angular.forEach(videoss, function(val,key){
        console.log(val);
        if(val.site=="youtube"){
            videoss[key]['video_url'] = 'https://www.youtube.com/embed/'+val.vid;

        }
        else{
            videoss[key]['video_url'] = 'https://player.vimeo.com/video/'+val.vid;   
        }

        })
        $scope.videolist =  videoss;    
    }
    else{
        $scope.videolist =  [];   
    }

    $scope.videotemp = {};
    $scope.variantsCombinationData = [];
    //$scope.productDesc1="<h1>Mithilesh </h2>";    
     $scope.mySelectArr =[{value :null}];
    //setting all data in respective fields
    $scope.product_details = product_detail;
    $scope.alias = $scope.product_details.alias;
    $scope.product_width = $scope.product_details.product_width;
    $scope.product_length = $scope.product_details.product_length;
    $scope.product_height = $scope.product_details.product_height;

    $scope.package_width = $scope.product_details.package_width;
    $scope.package_length = $scope.product_details.package_length;
    $scope.package_height = $scope.product_details.package_height;

    if($scope.product_details.rship==2){
        $scope.ready_ship = true;
    }else{
        $scope.ready_ship = false;
    }
    if($scope.product_details.nexpiry==2){
        $scope.exp_date = true;
    }else{
        $scope.exp_date = false;
    }

    if($scope.product_details.is_cod == '1'){
        console.log('173');
        $scope.cod = true;
        $scope.codrange = $scope.product_details.cod_range;    
    }
    
    $scope.product_weight = $scope.product_details.product_weight;
    $scope.total_weight = $scope.product_details.total_weight;
    $scope.deliverytime = $scope.product_details.delivertime;
    //$scope.prod_unit = $scope.mySelectArr[1];//$scope.product_details.product_unit;    
    $scope.processing_type = $scope.product_details.processing_type.toString();
    $scope.selectedOptions = JSON.parse(selectedattrstructure);
    $scope.selectedattvalues = selectedattvalues;

    $scope.selectedSpecification = JSON.parse(selectedspecstructure);
    $scope.selectedspecvalues = selectedspecvalues;
    $scope.currentlang = currentlang;

    $scope.config = sellerconfig;
   // This function used for selected specification
   $scope.selectedspecvalues.map((items,keys)=>{
        if(items.attribute.attribute_type_value =="plain_text" && items.attribute.front_input == "text"){
            $scope.selectedSpecification[keys].attribute = $scope.selectedspecvalues[keys].option_attr_value_detail[0].attribute_value;
        }else if(items.attribute.attribute_type_value =="plain_text" && items.attribute.front_input == "textarea"){
            $scope.selectedSpecification[keys].attribute = $scope.selectedspecvalues[keys].option_attr_value_detail[0].attribute_value;
        }else if(items.attribute.attribute_type_value =="text_color_image" && items.attribute.front_input == "multiselect"){
            $scope.selectedSpecification[keys].attribute = {};
             var index = 0;
             $scope.selectedSpecification[keys].get_all_attribute_value_detail.map((item,key)=>{
                if(item.attr_val_id == items.option_attr_value_detail[index].attribute_value_id){
                     $scope.selectedSpecification[keys].attribute[key] = true;
                     index++;
                      if(index>=items.option_attr_value_detail.length)
                        index =0;
                }else{
                    $scope.selectedSpecification[keys].attribute[key] = false;
                    if(index>=items.option_attr_value_detail.length)
                        index =0;
                }
            })
        }else if(items.attribute.attribute_type_value =="plain_text" && items.attribute.front_input == "select"){
            $scope.selectedSpecification[keys].get_all_attribute_value_detail.map((item,key)=>{

               if(items.attribute_id == item.attr_id && items.option_attr_value_detail[0].attribute_value_id ==item.attr_val_id){
                  //console.log('mithilesh');
                  //console.log(item);
                  $scope.selectedSpecification[keys].attribute = [];
                  $scope.selectedSpecification[keys].attribute[keys] = item;
                }
            })

        }else if(items.attribute.attribute_type_value =="plain_text" && items.attribute.front_input == "multiselect"){
            $scope.selectedSpecification[keys].attribute = {};
            var index = 0;
            $scope.selectedSpecification[keys].get_all_attribute_value_detail.map((item,key)=>{
                 if(item.attr_val_id == items.option_attr_value_detail[index].attribute_value_id){
                     $scope.selectedSpecification[keys].attribute[key] = true;
                     index++;
                      if(index>=items.option_attr_value_detail.length)
                        index =0;
                    } 
                else{
                    $scope.selectedSpecification[keys].attribute[key] = false;
                    if(index>=items.option_attr_value_detail.length)
                        index =0;
                }
            })
        }else if(items.attribute.attribute_type_value =="plain_text" && items.attribute.front_input == "date_picker"){
           $scope.selectedSpecification[keys].attribute = $filter('date')($scope.selectedspecvalues[keys].option_attr_value_detail[0].attribute_value, 'MM/dd/yyyy');
        }
    });

    $scope.$watch('mySelectArr', function () {
       // console.log($scope.mySelectArr); 
    });

    //$scope.tags=[{text:"electronics"}];

    angular.forEach($scope.product_details.has_description, function(val,key){
        $scope.productName[val.lang_id] = val.name;
        $scope.productDesc[val.lang_id] = val.description;
        $scope.metatitle[val.lang_id] = val.meta_title;
        $scope.metakeyword[val.lang_id] = val.meta_keyword;
        $scope.metadesc[val.lang_id] = val.meta_desc;
    }); 
    $scope.tags = product_tags;

    if($scope.product_details.auto_sku=='1'){
        $scope.autosku = true;
    }else{
        $scope.autosku = false;   
    }

    
    if($scope.product_details.is_sp_tp=='1'){
        $scope.allow_sp_tp = true;
    }else{
        $scope.allow_sp_tp = false;
    }

    $scope.sku = $scope.product_details.sku;
    $scope.initial_price = parseFloat($scope.product_details.initial_price); 
    $scope.special_price = parseFloat($scope.product_details.special_price);
    //$scope.sp_fromdate = $scope.product_details.sp_fromdate;
    //$scope.sp_todate = $scope.product_details.sp_todate;
    //$scope.priceswitch ='specialprice';
    
    if($scope.product_details.has_tire_price.length>0){
        $scope.tprices = $scope.product_details.has_tire_price;
    }else{
        $scope.tprices = [{id: 'choice1'}, {id: 'choice2'}];
    }
    if($scope.product_details.site_visibility=="1"){
        $scope.site_visibility=true;
    }else{
        $scope.site_visibility=false;
    }
    //$scope.site_visibility=$scope.product;

    angular.forEach($scope.product_details.has_tire_price, function(val,key){
        $scope.tire_quantity[key]= parseFloat(val.start_quantity);
        $scope.tire_quantity_price[key]=parseFloat(val.price);
    });

    if($scope.product_details.is_unlimited=='1'){
        $scope.stock=true;
    }
    else{
        $scope.stock = false;
        $scope.quantity = $scope.product_details.quantity;
    }
    
    $scope.producttype = $scope.product_details.product_sub_type;
    

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

    $scope.formattedid = product_detail.alias;
    $scope.queue = product_img;
    $scope.allprevioudefaultfiles={};
    
     $scope.queue.map((item)=>{
        if(item.is_default == '1' || item.is_default == 1 || item.is_default == true){
            $scope.allprevioudefaultfiles['defaultselectedidprev']=item.id;
        }
     })



    /*********This function used for delete previous uploaded image on product add page**********/
    $scope.deletePrevUploadImg = function(fileId, index){
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
                var imgId = {"imageId" :  fileId};
                salesfactoryData.getData(image_delete_url,'POST',imgId).then(function(response){
                    if(response.status == 'success') {
                        swal(response.mesg_title, response.mesg, "success")
                        $scope.queue.splice(index,1); 
                    }
                    if(response.status=='error'){
                        swal({
                          title: response.mesg_title,
                          text: response.mesg,
                          type: "error",
                          confirmButtonText: response.c_btn_text
                        });
                    }
                });            
            }
        });
    };

    $scope.mainproductname = '';
    //$scope.sp_fromdate= new Date();
    //$scope.sp_todate= new Date();

    //date picker 
    $scope.sp_fromdate = $filter('date')(new Date(), 'dd-MM-yyyy');
    $scope.sp_todate = $filter('date')(new Date(), 'dd-MM-yyyy');

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
        
    };
    // to set the edit data
    if($scope.product_details.is_tire_price=='1'){
        $scope.switchPrice('tireprice');
    }else{
        $scope.switchPrice('specialprice');
    }   
    
    $scope.variantTagsData = [];

    // $scope.switchPrice = function(strPrice){
    //     ($scope.showspecialPriceSec === true) ?  $scope.showspecialPriceSec = false : $scope.showspecialPriceSec = true;
           
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
    $scope.removeVariants = function(index){
      if($scope.selectTags.length>1){
            $scope.disAddAnotherBtn= false;
            $scope.selectTags.splice(index,1);
            clickCount--;
            $scope.varientmodel.splice(index,1);
            $scope.variantTagsData.splice(index,1);
       }else{
        swal({
          type: 'warning',
          text: "You can't remove this variants because \n You have checked multiple variants"
        })
       }
       // $scope.disAddAnotherBtn= false;
       // $scope.selectTags.splice(index,1);
       // clickCount--;
       // $scope.varientmodel.splice(index,1);
       // $scope.variantTagsData.splice(index,1);
       // console.log($scope.selectTags.length);
       // console.log($scope.selectTags);
       // if($scope.selectTags.length<1){
       //     $scope.hasvariant=false;
       //      //console.log($scope.variants);
       // }

    }

    $scope.showVariantsSelections = function(vstatus){
        if(vstatus==true && $scope.selectTags.length<1){
            $scope.selectTags=[{value:null}];
        }
        /****This case used to remove vaitant if unchecked****/
        if(!vstatus){
            $scope.varientmodel =[];
            $scope.variantTagsData =[];
           // $scope.selectTags=[{value:null}];
        }
    }

    $scope.getAttributValuesAndAttribute = function(index,modelIndex,optIndex){
       // // if ($scope.varientmodel) 
        //  console.log($scope.varientmodel[index].id);
       //   console.log($scope.varientmodel[index].name);
        //  console.log(index); 

       //    console.log(optIndex);
        var data = {"vid":$scope.varientmodel[index].id};
        //$scope.tags = $scope.variants;
        var varientUrl =  $('#varientUrl').val()
        salesfactoryData.getData(varientUrl,'GET',data).then(function(response){
           // if(response.lenght>0){
            // console.log($scope.varients_all_data);
            // console.log(response);
            // $scope.varients_all_data.splice(optIndex,0,response);
            $scope.varients_all_data[optIndex] = response;
                //$scope.variantTagsData[optIndex]=response;
                // $scope.varients_all_data.remove();
                // $scope.varients_all_data.push(response);
            //}
            //$scope.varientmodel[index][id]['values']=response;
            // $scope.varients_all_data.splice(index,1);
            // $scope.varients_all_data.push(response);
            // console.log($scope.varients_all_data);
            //$scope.variantTagsData[optIndex]=response;
            //console.log(response);
            //console.log($scope.variantTagsData);
            // $scope.abcd = response;

            //console.log(response.length);
        });
    }

    $scope.saveVariants = function(){
        //console.log($scope.variantsCombinationData);
        var variantsaveurl = "/en/seller/product/savevariant";
        salesfactoryData.getData(variantsaveurl,'POST',$scope.variantsCombinationData).then(function(response){
           //console.log(response);
            if(response.status==true){
                // console.log('mmmm');
                // console.log(response);
                window.location.href = "en/seller/variantList/"+response.parent_id;
            }           
               
        });

    }

    $scope.copyProduct = function($event,productform){
       $event.preventDefault();       
       $scope.loader = true;
       if(typeof($scope.files)=='undefined' || $scope.files.length<1){
            $scope.fileerror = true;
       }else{
            $scope.fileerror = false;
       }
       if(productform.$invalid || $scope.fileerror == true){
            jQuery('#errormodal').modal('show');     
             $scope.loader = false;
            return false;
       }        
        data = angular.element('#productform').serializeArray();
        $scope.product = {};
        angular.forEach(data, function(key,val){
            $scope.product[key.name]= key.value;            
        });
        $scope.product['files'] = $scope.files; 
        $scope.product['specificationfiles'] = $scope.specificationfiles;
        $scope.product['videofilelist'] = $scope.videolist;
        //$scope.product['files']=$scope.files;
        angular.forEach($scope.files,function(val,key){
            $scope.product['files'][key] = val;
        });

        angular.forEach($scope.specificationfiles,function(val,key){
            $scope.product['specificationfiles'][key] = val;
        });
        var variants = [];
        angular.forEach($scope.varientmodel,function(val,key){
            var attributes = [];
            angular.forEach($scope.variantTagsData[key],function(atribute_val,at_key){
                attributes.push(atribute_val);
            });
            variants.push({'variant_id':val.id,'variant_name':val.name,'variant_attribute':attributes});
        });
        $scope.selected_variants = variants;
        
        $http({  
            method: 'POST',  
            url: prodcopy_url,  
            headers: { 'Content-Type': undefined },  
            transformRequest: function (data) {  
                var formData = new FormData();  
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

                formData.append('selectedoption',angular.toJson($scope.selectedOptions));
                formData.append('selectedspecification',angular.toJson($scope.selectedSpecification));
                formData.append('variants',angular.toJson($scope.selected_variants));
                formData.append('tire_quantity',angular.toJson($scope.tire_quantity));
                formData.append('tire_quantity_price',angular.toJson($scope.tire_quantity_price)); 
                formData.append('allprevioudefaultfile',angular.toJson($scope.allprevioudefaultfiles));
                if(typeof $scope.MkpCategories!=='undefined' && $scope.MkpCategories!==null){
                    angular.forEach(angular.element('#parentdiv select'),function(val,key){
                        var temp = angular.element(val).find('option:selected')[0].value;
                        console.log(temp);
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
            data: { formDatas: $scope.product, files: $scope.product.files, video_files: $scope.videoFile, specificationfiles: $scope.product.specificationfiles }  
        }).success(function (data, status, headers, config) { 
            $scope.loader = false;
            if(data.hasvariant==true){
                $scope.variantsCombinationData=data.product;
                $scope.editVariantData = new inlineEdit($scope.record);
                jQuery('#variantmodal').modal('show'); 
            }
            else{
                    // message after sussessfull product creation
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

        }).  
        error(function (data, status, headers, config) { 
            $scope.loader=false; 
            alert("failed!");  
        });

    }
    //This function used for clear file from scope
    $scope.cancelfile= function(){$scope.files =[];};
    //Listen on update product
    $scope.saveProduct = function ($event){
        $event.preventDefault(); 
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
        if(typeof $scope.related_marketplace_cat.marketplace_related_catid != 'undefined'){
            $scope.product['related_marketplace_id'] = $scope.related_marketplace_cat.marketplace_related_catid;    
        }
        // angular.forEach($scope.files,function(val,key){
        //     $scope.product['files'][key] = val;
        // });

        angular.forEach($scope.specificationfiles,function(val,key){
            $scope.product['specificationfiles'][key] = val;
        });


        var variants = [];
        angular.forEach($scope.varientmodel,function(val,key){
            var attributes = [];
            angular.forEach($scope.variantTagsData[key],function(atribute_val,at_key){
                attributes.push(atribute_val);
            });
            variants.push({'variant_id':val.id,'variant_name':val.name,'variant_attribute':attributes});
        });
        $scope.selected_variants = variants;
        $http({  
            method: 'POST',  
            url: prod_update_url,  
            headers: { 'Content-Type': undefined },  
            transformRequest: function (data) {  
                var formData = new FormData();  
                formData.append("formDatas", angular.toJson(data.formDatas));  
                if(typeof data.files !=='undefined' && data.files!==null){
                    for (var i = 0; i < data.files.length; i++) {  
                      formData.append("file["+i+"]", data.files[i]);  
                    }  
                }

                if(typeof data.specificationfiles !=='undefined' && data.specificationfiles!==null){
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

                formData.append('selectedoption',angular.toJson($scope.selectedOptions));
                formData.append('selectedspecification',angular.toJson($scope.selectedSpecification));
                formData.append('variants',angular.toJson($scope.selected_variants));
                formData.append('tire_quantity',angular.toJson($scope.tire_quantity));
                formData.append('tire_quantity_price',angular.toJson($scope.tire_quantity_price)); 
                formData.append('allprevioudefaultfile',angular.toJson($scope.allprevioudefaultfiles));
                if(typeof $scope.MkpCategories!=='undefined' && $scope.MkpCategories!==null){
                    $scope.MkpCategories={};
                    angular.forEach(angular.element('#parentdiv select'),function(val,key){
                        var temp = angular.element(val).find('option:selected')[0].value;
                        console.log(temp);
                        if(key ==0){
                          $scope.MkpCategories['cateId'] = temp
                        }
                        else{
                           $scope.MkpCategories['cateId'+temp] = temp
                        }
                    });
                    console.log('in loop print');
                    console.log($scope.MkpCategories);
                   formData.append('Marketplace_Categories',angular.toJson($scope.MkpCategories)); 
                }
                if(typeof $scope.treeNodeArrObj!=='undefined' && $scope.treeNodeArrObj!==null)
                    formData.append('sellerCategory' , angular.toJson($scope.treeNodeArrObj));
                return formData; 
            },  
            data: { formDatas: $scope.product, files: $scope.product.files, video_files: $scope.videoFile, specificationfiles: $scope.product.specificationfiles }  
        }).  
        success(function (data, status, headers, config) { 
            $scope.loader = false;
            console.log(data);
            console.log(data.hasvariant==true);
            if(data.status=='success'){
                swal({
                         title: "Good",
                         text: "Product successfully updated.",
                         type: "success",
                         showConfirmButton:false,
                         timer: 3000
                         }).then(
                          function () {},
                          function(dismiss){                           
                           window.location.href = "en/seller/variantList/"+data.pid;
                });
            }  
                       
            

        }).  
        error(function (data, status, headers, config) { 
            $scope.loader=false; 
            alert("failed!");  
        });

    };
    $scope.deleteVariantCombination = function(index){
         $scope.variantsCombinationData.splice(index, 1);
    }

    //Listen on file upload
    $scope.uploadedFileMJ = function(element,str) {
     $scope.$apply(function($scope) {
        if(typeof str!=="undefined" && str=== "droped_file"){
            angular.forEach(element,(item)=>{
               $scope.files.push(item);
            });
        }else{
            angular.forEach(element.files, (item)=>{
               $scope.files.push(item);
            });
        } 
     });
    };
    $(document).bind('drop dragover', function (e) {
    // Prevent the default browser drop action:
       e.preventDefault();
    });
    $(document).bind('drop', function (e) {
        let dropFile = $(e.originalEvent.dataTransfer.files);
        $scope.uploadedFileMJ(dropFile,"droped_file");

    });
    $scope.setPreviouDefaultImg = function(id){
       $scope.allprevioudefaultfiles['defaultselectedidprev']=id;
    };

    $scope.uploadSpecificationFiles = function(fileelement){        
        $scope.$apply(function($scope){
            $scope.specificationfiles = fileelement.files;
        });
    };

    $scope.myTxt = "You have not yet clicked submit";
    $scope.myFunc = function () {
        $scope.myTxt = "You clicked submit!";
    };
    $scope.prodtQutInput =[];
   
    $scope.gatherQuatData = function(ind,$event){
        if($event.target.value!=='')
           $scope.prodtQutInput[ind]=  parseInt($event.target.value);
    };
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
        var data = {'sku':sku,'pid':$scope.product_details.id,'case':'edit'};
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
    $scope.getSubCategory = function(sellercat){
        //console.log(sellercat);
        return $http.get($('#sellerCatUrl').val()+'?catid='+sellercat)
                    .then(function(response) {             
                        return response.data;
                    });

    };

    //This function used to validate tire price not greget than initial price
    $scope.validateTirePrice = function(index,str){
        if(pdc.initial_price==undefined){
            swal('Opps',"Please insert initial price","warning");
            $scope.tire_quantity_price.length=0;                
        }else{
            if((parseInt(pdc.initial_price)-1)<$scope.tire_quantity_price[index]){
                $scope.tire_quantity_price[index]=null;
                swal('Opps',"Tire price should be less than equal to initial price","warning");
            }else if(str!==undefined && str=="plus"){
                if($scope.tire_quantity_price[index]==undefined){
                    $scope.tire_quantity_price[index] = 1;
                }else if(!isNaN($scope.tire_quantity_price[index])){
                    $scope.tire_quantity_price[index] = parseInt($scope.tire_quantity_price[index])+1;
                }                    
            }else if(str!==undefined && str=="minus"){
                if(!isNaN($scope.tire_quantity_price[index]) && $scope.tire_quantity_price[index]!=0){
                    $scope.tire_quantity_price[index] = parseInt($scope.tire_quantity_price[index])-1;
                }else{
                    $scope.tire_quantity_price[index] = null;
                    return false;
                }
            }
        }       
    };
    //Listen on validate special price 
    $scope.validateSpecialPrice = ($event,str)=>{
        $event.stopPropagation();
        if(pdc.initial_price==undefined){
            swal('Opps',"Please insert initial price","warning"); 
        }else{
           if((parseInt(pdc.initial_price) - 1)<$scope.special_price){
               $scope.special_price=null;
               swal('Opps',"Tire price should be less than equal to initial price","warning");
           }else if(str!==undefined && str==="plus"){
                if($scope.special_price== undefined){
                    console.log()
                    $scope.special_price =1;
                }else if(!isNaN($scope.special_price)){
                    $scope.special_price = parseInt($scope.special_price)+1;
                }
           }else if(str!==undefined && str ==="minus"){
                if(!isNaN($scope.special_price) && $scope.special_price!=0){
                    $scope.special_price = parseInt($scope.special_price)-1;
                }else{
                    $scope.special_price = null
                    return false;
                }
           } 
        }      
    };
    $scope.loadTags = function(query) {       
        return $http.get( $('#tagurl').val() +'?query=' + query ).then(function(response) {
                  return response.data;

                // var index = $scope.tags.indexOf(response.data);
                // $scope.tags[index].id = $scope.tags.length;
        });
    };
    $scope.loadOptionSuggesion = function(query){
        var rdata = {'query':query };        
        return salesfactoryData.getData(optionurl,'GET',rdata).then(function(response){
           return response;           
        });        
    };

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


    $scope.loadSpecificationSuggesion = function(query){
        var rdata = {'query':query };        
        return salesfactoryData.getData(specificationurl,'GET',rdata).then(function(response){
           return response;           
        });    
    }
    // $scope.loadSpecificationValues = function(query,dataset){
    //     console.log(query);
    //     var response =  dataset.filter(function(sdata) {
    //         return sdata.value_name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    //     });
    //     console.log(response);
    //     return response;       
    // }

    $scope.addSpecifications = function(){
        //console.log($scope.specificationchoose);
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
                }
                else{
                    //alert('Already Added');
                }               
            });
        } 
        //for making tag field empty  
        $scope.specificationchoose = [];
    }

    $scope.removeSpecification = function(index){
        //$scope.disAddAnotherBtn= false;
       $scope.selectedSpecification.splice(index,1);
       
    }


    $scope.loadoptions = function(query,index) {
      
       //return $scope.varients_all_data[index];
       //for only matching element comment above line.
        return $scope.varients_all_data[index].filter(function(option) {
            return option.values.toLowerCase().indexOf(query.toLowerCase()) != -1;
        });        
    }
    

    $scope.getSubAdminCat= function(admincat,idStr){
        console.log('inside getsubadmin cat');       
        console.log(admincat);
        console.log(idStr);

        // console.log('inside getsubadmin cat');
        //console.log(admincat);
        // console.log(idStr);
        // console.log(typeof admincat[0]);

        //console.log(idStr);
        //console.log(relatedcaturl);
        $scope.related_marketplace_cat_length=false;
        $scope.related_marketplace_cat = {}; 
       
        
        console.log('adminvalue');
        console.log(angular.element('#adminCat').val());
        console.log( Object.values($scope.MkpCategories)[0]);
        if(angular.element('#adminCat').val()!=Object.values($scope.MkpCategories)[0]){
            
            $scope.MkpCategories={};            
        }

         $scope.MkpCategories['catId'+admincat] = admincat;

        console.log($scope.MkpCategories);
        angular.element('#show_sub_categories').append('<img id="loader" style="float: left; margin-top: 7px;" src="loader.gif" alt="" />');
        var rdata = {'marketplace_cat_ids':$scope.MkpCategories };

        //if(typeof admincat[0]=='undefined') return;             
             
        salesfactoryData.getData(relatedcaturl,'GET',rdata).then(function(response){
           $scope.related_marketplace_cat = response;

           console.log(1027);
           console.log(relatedcaturl);
           console.log(response);
           $scope.related_marketplace_cat_length = Object.keys(response.maketplace_related_cat_title).length;

        });    
       
       









        // var rdata = {'marketplace_cat_ids':$scope.MkpCategories };     
        // salesfactoryData.getData(relatedcaturl,'GET',rdata).then(function(response){
        //    $scope.related_marketplace_cat = response;
        //    $scope.related_marketplace_cat_length = Object.keys(response.maketplace_related_cat_title).length;

        // });
    }


  
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


    }

    this.expiryDate= {

        date:  $scope.product_details.expiry_datetime ? new Date($scope.product_details.expiry_datetime) : new Date(), 
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


    angular.element('.parent').livequery('change', function() {
        // console.log('inside parent cat change');
        // console.log(this);
        // console.log(angular.element(this).parent().nextAll('div'));

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
    var vidfile ='',user_uploadImg='',imgInd=0;
    $scope.videoFile =[];

    $scope.getVideoDetail=()=>{

        if(!pdc.videourl){
            return false;

        }

        $scope.vloader = true;
        //var obj ={'video_from' : pdc.video_from,'id':pdc.video_id};
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
            try{throw new Error("Something went badly wrong!");}
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

    

    $scope.addVideo = ()=>{
        if(typeof vidfile !='undefined' && vidfile!=''){
            $scope.videoFile.push(vidfile);
            $scope.videotemp.usrfileIndex = ++imgInd;
            vidfile ='';}else {$scope.videotemp.usrfileIndex = 0};

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
    }

    $scope.removeVideo = (vindex,videoobj)=>{
        // if((typeof videoobj.id=='number') && (typeof videoobj.vid=='string')){
        //     $scope.videoidstodel.push(videoobj.id);
        // }
        $scope.videolist.splice(vindex, 1);
       }
    //This function used to validate tire price not greget than initial price
        $scope.validateTirePrice = function(index,str){
            if(pdc.initial_price==undefined){
                swal('Opps',"Please insert initial price","warning");
                $scope.tire_quantity_price.length=0;                
            }else{
                if((parseInt(pdc.initial_price)-1)<$scope.tire_quantity_price[index]){
                    $scope.tire_quantity_price[index]=null;
                    swal('Opps',"Tire price should be less than equal to initial price","warning");
                }else if(str!==undefined && str=="plus"){
                    if($scope.tire_quantity_price[index]==undefined){
                        $scope.tire_quantity_price[index] = 1;
                    }else if(!isNaN($scope.tire_quantity_price[index])){
                        $scope.tire_quantity_price[index] = parseInt($scope.tire_quantity_price[index])+1;
                    }                    
                }else if(str!==undefined && str=="minus"){
                    if(!isNaN($scope.tire_quantity_price[index]) && $scope.tire_quantity_price[index]!=0){
                        $scope.tire_quantity_price[index] = parseInt($scope.tire_quantity_price[index])-1;
                    }else{
                        $scope.tire_quantity_price[index] = null;
                        return false;
                    }
                }
            }       
        };
/******* video section ends here *****/


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
               
                // for select parent

                // function parentNodecheck(p) {
                //  if(checkChildren(c)== length){
                        
                //  }
                // }



            };

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

app.factory("inlineEdit", function(){ 
        return function(recordCache, Resource){
            this.recordCache = recordCache;
            this.resource = Resource;
            //var btnv = angular.element('#productform').scope();
            this.edit = function(record){
                console.log(record);
                //console.log(data.allbtnvisibility);
                //$scope.allbtnvisibility = $scope.allbtnvisibility + 1;
                //btnv.allbtnvisibility = btnv.allbtnvisibility+1;
                angular.extend(this.recordCache = record, {editing:true});
            };
            this.cancel = function(){
                delete this.recordCache.editing;
                this.recordCache = {};
            };
            this.save = function(){
                //btnv.allbtnvisibility = btnv.allbtnvisibility-1;
                delete this.recordCache.editing;
                // new this.resource(this.recordCache).update().then( (response) ->)
                console.log(JSON.stringify(this.recordCache));
                this.recordCache = {};
            };
        }
});
app.directive("datepicker",()=>{
    function link(scope, element, attrs, controller){
        var options = {
            format: "dd/mm/yy",
            autoclose:true
        };
        element.datepicker(options).on('changeDate',function(dateText){
            scope.$apply(function(){
                // console.log(dateText);
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
})

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])