@extends('layouts/admin/default')
@section('title')
@lang('product.create_product')
@stop
@section('header_styles')
@stop
@section('content')
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}ng-tags-input.min.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}datetimepicker.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url')}}file-upload.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}sweetalert2.min.css">
<script type="text/javascript">
  var prdtagurl =  "{{ action('Admin\Product\ProductController@getTags') }}";
  var nodehtml = "{{ Config('constants.angular_url') }}sabinaApp/view/treeView.html";
  var activelangs = {!! $activelangs !!};
  var variantdata ={!! $variants !!};
  var variantUrl = "{{ action('Admin\Product\ProductController@getVarientValue')}}";
  var _getvideourl = "{{ action('Admin\Product\VideoAPIController@getVideoDetail')}}";
  var producturl = "{{action('Admin\Product\ProductController@store')}}";
  var attributeurl = "{{action('Admin\Product\ProductController@getExceptAttributeDetails')}}";
  var attribute_requirment_url = "{{action('Admin\Product\ProductController@getAttrRequAttrsets')}}";
  var warehoseurl = "{{action('Admin\Product\ProductController@getAllWarehouseData')}}";
  var dataJsonUrl ="{{ action('Admin\Product\ProductController@getAllProducts')}}";
  var skucheckurl = "{{action('Admin\Product\ProductController@checkSku')}}";
  var defaultwarehouse = {!! json_encode($defaultwarehouse) !!};  
  var fieldSetJson = {!! $fieldSetJson !!};
  //var productvarianturl = "{{action('Admin\Product\VariantController@allVariantList')}}"+"/";
  var productvarianturl = "{{action('Admin\Product\ProductController@index')}}";
  var productcreateurl = "{{action('Admin\Product\ProductController@create')}}"; 
  var variantsaveurl = "{{action('Admin\Product\ProductController@saveVariants')}}";
  var savenewcaturl= "{{ action('Admin\Product\ProductController@saveCat') }}";
  var categorylisturl="{{ action('Admin\Product\ProductController@getAllCategory') }}";
  var product_detail_url = siteUrl + '/product/';
  var product_type = 'product';
  var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
  var showHeadrePagination = true;
  var currency_symbol = "{{ session('default_currency_symbol') }}";
  //file upload setting where allowed_extension uesd for file extension and max_file for number of file user can upload
  var file_upload_setting ={
    allowed_extension :['png','jpeg','jpg', 'bmp', 'gif', 'svg'],
    max_number_file :12,
    max_file_size :5,//in mb
    min_file_size : 200,//in mb
  };
  //for form field name 
   var formFieldName = ["sku","stock_value","tagss", "product.name_1", "product.name_2","product.name_3","product.name_4","ready_ship","initial_price","special_price","sp_fromdate","sp_todate"];
   var errorMsg = ["Sku is required", "Stock value is required", "Tags is required","Name is required","Name is required","Name is required","Name is required","Processing time is required","Price is required","Special price is required","Special price from date is required","Special price to date is required"];

</script>
<div class="main-prodContainer ng-cloak" data-ng-controller="productCtrl" ng-cloak>
    <form name="productform" method ="post" id="productform" enctype='multipart/form-data' ng-class="{'fileupload-processing': processing() || loadingFiles}" file-upload="options" files ="true" novalidate>
     <!--Overlay loader show on save or save and continue click -->
     <div class="loader-wrapper" ng-if="prdData.loading.save_and_continue">
        <span class="loader">
            <img ng-src="<%prdData.loading.btnloaderpath%>" alt="Loader" width="30" height="30"> 
            <div>Please wait...</div>
        </span>
     </div>

    <!-- Right side column. Contains the navbar and content of the page -->
    <div class="content">
        @if(Session::has('succMsg'))
        <div class="alert alert-success alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>@lang('common.success'):</strong> {{ Session::get('succMsg') }}
        </div>    
        @endif       
            <div class="header-title">
                <h1 class="title">@lang('product.create_new_product')</h1>
                <div class="pull-right btn-groups">
                    <a href="{{action('Admin\Product\ProductController@index')}}" class="btn-default" ng-class="{disabled:prdData.loading.disableBtn}">@lang('common.back')</a>
                    <button  name="submit_type" ng-click="saveProduct($event, productform, 'save_and_continue')" value="save_and_continue" class="secondary save_and_continue" ng-disabled="prdData.loading.disableBtn">
                      @lang('common.save_and_continue')                      
                    </button>
                    <button  name="submit_type" ng-click="saveProduct($event, productform, 'save')" value="save" class="btn" ng-disabled="prdData.loading.disableBtn">
                      @lang('common.save')
                    </button>
                </div>
            </div>

            <!-- left side tab list -->
            <div class="content-wrap clearfix">
                <div class="content-left">
                    <div class="tablist">
                        <ul class="">
                            <li class="active" id="product" ng-class="{'active' : $root.prd_tab.enable_product_tab}" ng-click="liActiveHandler($event,'enable_product_tab')" data-toggle="tab" data-target="#product_detail">       @lang('product.details')
                              
                            </li>
                            @if($warehouse_enabled)
                              <li id="warehouse" ng-class="{'active':$root.prd_tab.enable_warehouse_tab}" ng-click="liActiveHandler($event,'enable_warehouse_tab')" data-toggle="tab" data-target="#product_warehouse">
                                 @lang('product.warehouse_inventory')
                              </li>
                            @endif
                            <li ng-class="{'active' : $root.prd_tab.enable_variants_tab}" ng-click="liActiveHandler($event,'enable_variants_tab')" data-toggle="tab" data-target="#product_variants">
                              {{-- <a data-toggle="tab" href="#product_variants"> --}}
                                @lang('product.variants_spec')
                              {{-- </a> --}}
                            </li>
                            <li ng-class="{'active' : $root.prd_tab.enable_requirement_tab}" ng-click="liActiveHandler($event,'enable_requirement_tab')" data-toggle="tab" data-target="#product_requirement">
                              {{-- <a data-toggle="tab" href="#product_requirement"> --}}
                                @lang('product.requirement')
                              {{-- </a> --}}                              
                            </li>
                            <li ng-class="{'active' : $root.prd_tab.enable_related_tab}" ng-click="liActiveHandler($event,'enable_related_tab')" data-toggle="tab" data-target="#product_related">
                              {{-- <a data-toggle="tab" href="#product_related"> --}}
                                  {{-- Related/Crossell/Upsell --}}
                                  @lang('product.related_product')
                              {{-- </a> --}}
                            </li>
                           
                            <li ng-class="{'active':$root.prd_tab.enable_unit_dimension_tab}" ng-click="liActiveHandler($event,'enable_unit_dimension_tab')" data-toggle="tab" data-target="#unit_dimension">
                              {{-- <a data-toggle="tab" href="#unit_dimension"> --}}
                                {{-- Unit & Weight --}}
                                @lang('product.unit_weight')
                              {{-- </a> --}}                              
                            </li>                          
                            <!--<li ng-class="{'active':$root.prd_tab.enable_private_zone_tab}" ng-click="liActiveHandler($event,'enable_private_zone_tab')" data-toggle="tab" data-target="#product_private_zone">
                              {{-- <a data-toggle="tab" href="#product_private_zone"> --}}
                                {{-- @lang('product.warehouse') --}}                                   
                               @lang('product.private_zone')
                              {{-- </a> --}}
                            </li>
                            <li ng-class="{'active':$root.prd_tab.enable_reservation_tab}" ng-click="liActiveHandler($event,'enable_reservation_tab')" data-toggle="tab" data-target="#product_reservation">
                              {{-- <a data-toggle="tab" href="#product_reservation"> --}}
                                {{-- @lang('product.warehouse') --}}
                               {{-- Cart Reservation --}}
                               @lang('product.cart_reservation')
                              {{-- </a> --}}
                            </li>
                            <li ng-class="{'active':$root.prd_tab.enable_point_tab}" ng-click="liActiveHandler($event,'enable_point_tab')" data-toggle="tab" href="#product_point">
                              {{-- <a data-toggle="tab" href="#product_point"> --}}
                                {{-- @lang('product.warehouse') --}}
                               {{-- Point --}}
                               @lang('product.point')
                              {{-- </a> --}}
                            </li>
                            <li ng-class="{'active':$root.prd_tab.enable_view_price_tab}" ng-click="liActiveHandler($event,'enable_view_price_tab')" data-toggle="tab" data-target="#view_price">
                                {{-- <a data-toggle="tab" href="#view_price"> --}}
                                    {{-- View Price --}}
                                    @lang('product.view_price')
                                {{-- </a> --}}
                            </li>-->
                            <li ng-class="{'active':$root.prd_tab.enable_seo_tab}" ng-click="liActiveHandler($event,'enable_seo_tab')" data-toggle="tab" data-target="#product_seo">
                              
                                @lang('product.seo')
                              
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="content-right container"> 
                    <div class="tab-content">
                        <div id="product_detail" class="tab-pane fade" ng-class="{'in active' : $root.prd_tab.enable_product_tab}">

                            <!--  Product image and video start -->
                            <div class="form-row">
                                <h2 class="title-prod">
                                  <i class="count">1</i> 
                                  @lang('product.product_img_video')
                                  <i class="red">*</i>     
                                </h2>                                
                                <div class="multiple-file-upload">
                                    <div class="upload-row">
                                     @lang('product.drag_drop_file')
                                     Dimenstion must be higher than 405X608 and size must be less than {{GeneralFunctions::systemConfig('MAX_FILE_SIZE')}} MB in size
                                    </div>                                         


                                    <div class="table table-striped files">
                                       <droplet ng-model="product.file_interface">
                                        <ul class="files">
                                            <li ng-repeat="item in product.file_interface.getFiles(product.file_interface.FILE_TYPES.VALID)">
                                                <div class="col-sm-2">
                                                    <droplet-preview ng-model="item"></droplet-preview>
                                                </div>
                                                <div class="col-sm-6">
                                                   <div class="size"><%item.file.size / 1024 / 1024 | number: 1%>MB</div>
                                                   <p> 
                                                     <input name="default_image" type="radio" value="<%$index%>" ng-model="product.defaultImage" /> 
                                                     @lang('product.set_as_display_img')
                                                    </p>
                                                </div>
                                                <div class="col-sm-2">
                                                    <div class="secondary cancel" ng-click="onDeleteImageFromImageUploadList(item)">
                                                       <span>@lang('product.cancel')</span>
                                                    </div>
                                                </div>
                                            </li>
                                          </ul>
                                        </droplet>
                                        <div class="upload-row">
                                            <span class="fileinput-button file-upload-btn" ng-class="{disabled: disabled}">
                                                <img src="/images/upload-btn2.jpg">
                                                <droplet-upload-multiple ng-model="product.file_interface"></droplet-upload-multiple>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row fileupload-buttonbar">
                                        <div class="col-lg-12">
                                            <!-- The fileinput-button span is used to style the file input field as button -->
                                            <span class="secondary fileinput-button" ng-class="{disabled: disabled}">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span> 
                                                @lang('product.add')
                                                </span>
                                             <droplet-upload-multiple ng-model="product.file_interface"></droplet-upload-multiple>
                                            </span>
                                            <button type="button" class="btn-md btn cancel" ng-click="_clearallfiles()">
                                                <i class="icon-remove"></i>
                                                <span>
                                               
                                                @lang('product.clear_upload')
                                                 </span>
                                            </button>
                                            <!-- The global file processing state -->
                                            <span class="fileupload-process"></span>
                                        </div>                 
                                    </div>
                                    <!-- </form> -->
                                </div>
                                @include('admin.includes.product_video')
                            </div>
                            <!-- Product Detail Start -->
                        
                            <h2 class="title-prod">
                                <i class="count">2</i> @lang('product.details')
                            </h2> 

                            <div class="form-row">
                                <label>@lang('product.sku') <i class="red"> *</i></label>
                                <label class="check-wrap">
                                <input type="checkbox" ng-model="product.autosku" value="true"> <span class="chk-label">{{-- Autogenerate SKU --}} @lang('product.autosku')</span></label>
                                <div ng-if="!product.autosku">
                                    <input type="text" name="sku" ng-model="product.sku" ng-blur="checksku(product.sku)" required="" /> 
                                </div>                                
                                <span ng-hide="productform.sku.$error.required" ng-if="skuexists==true" class="error-msg">
                                  @lang('product.already_exists')
                                </span>
                            </div>                          
                                
                            <div class="form-row">                            
                                 {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'product.name', 'label'=>Lang::get('product.name') ],['field'=>'textarea', 'name'=>'product.productDesc', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1','froala'=>'froala' ]],'1','','angular')!!}             
                            </div>
                            <div class="form-row row">
                                <span class="col-sm-5">
                                    <label>@lang('product.tags')<i class="red">*</i></label>
                                    <tags-input placeholder="@lang('product.product_tag')" data-ng-model="product.prdtags" name="tagss" display-property="tag_title" required>
                                    <auto-complete  load-on-focus="true" load-on-empty="true" source="_loadProdTags($query)"></auto-complete>
                                    </tags-input>
                                </span>
                            </div>
                            <div class="form-row row">
                                <label class="col-sm-12">@lang('product.processingtime') <i class="red">*</i></label>
                                <div class="check-group mt-5 mb-5 col-sm-12">
                                  <label class="check-wrap">
                                    <input type="checkbox" name="ready_ship" class="checkbox" id="ready_ship" ng-model="product.ready_ship"> 
                                    <span class="chk-label" value="true">
                                      @lang('product.ready_ship') 
                                    </span>
                                  </label>
                                </div>
                                <div ng-if="!product.ready_ship">
                                  
                                 <div class="col-sm-2 inline spiner">
                                    <number-input field="product.processing_time" symbol="false" name-attr="ready_ship" required-attr="true"></number-input>
                                  </div>                                  
                                  <div class="inline">
                                      <div class="inline daysmiddle">@lang('product.days')</div>
                                      <div class="inline ready-ship-date-sel">
                                          <select data-ng-model="product.processing_type" name="processing_type"   ng-init="product.processing_type='1'">
                                              
                                              <option value="1" >
                                                  @lang('product.perorder')
                                              </option>
                                              <option value="2">                                   
                                                  @lang('product.preitem')
                                              </option>
                                          </select>
                                      </div>
                                  </div> 
                                </div>
                            </div>
                            <div class="form-row row">
                                <div class="col-sm-3">
                                    <label>@lang('product.expiry_date')</label>
                                    <div class="check-group mt-5 mb-5">
                                      <label class="check-wrap"> 
                                        <input type="checkbox" name="exp_date" class="checkbox" id="exp_date" ng-model="product.nexpiry"> 
                                        <span class="chk-label">
                                        <!-- No Expire date -->
                                        @lang('product.no_expiry_date') 
                                        </span>
                                      </label>
                                    </div>
                                    <div class="expdate" class="date-wrapper exp-date-wrapper"  ng-if="!product.nexpiry">
                                      <div class="input-group date-wrap">
                                          <div class="input-group">
                                                  <input class="form-control" datetimepicker ng-model="product.expiry_date" options="prdData.dateTimeOption" />
                                                  <span class="input-group-addon">
                                                      <span class="glyphicon glyphicon-calendar"></span>
                                                  </span>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-row"> 
                             <!--  productcod:<%product.cod%> 
                              productvisibility:<%product.visibility%> -->
                              <label class="check-wrap">
                                 <input type="checkbox" ng-model="product.cod" name="cod" class="checkbox1" id="cod"  />
                                 <span class="chk-label">@lang('product.cod') </span>
                              </label>
                              <div class="" ng-if="product.cod">
                                <input type="text" name="codrange" ng-model="product.codrange" >
                                <div class="skyblue">
                                  @lang('product.zip_code_range')
                                </div>
                              </div>
                            </div>

                            <div class="form-row">
                                <label class="check-wrap">
                                  <input type="checkbox" ng-model="product.visibility" name="visibility"  />
                                  <span class="chk-label">
                                      @lang('product.visibility')  
                                  </span>
                                </label>
                            </div>
                                  
                            <!-- Price section start -->
                            <h2 class="title-prod">
                                <i class="count">3</i> @lang('product.price') <i class="strick">*</i>
                            </h2> 
                            <div class="form-row row">
                                <div class="col-sm-2">
                                <label>
                                    
                                    @lang('product.initial_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span><i class="red">*</i>
                                </label>
                                    <div class="spiner">
                            
                                      <number-input field="product.initial_price" name-attr="initial_price" required-attr="true"></number-input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <label class="check-wrap">
                                    <input type="checkbox" name="sp_tp_bp" data-ng-model="product.sp_tp_bp" data-ng-click="sp_check_fun()"> 
                                    <span class="chk-label">
                                        @lang('product.sptpbp')
                                    </span>
                                </label>
                                <div class="col-sm-12 mt-10" ng-if="product.sp_tp_bp">
                                    <div class="form-row radio-group">
                                        <label class="radio-wrap">
                                            <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="specialprice" data-ng-click="switchPecialPrice($event,product.stbprice)"> 
                                            <span class="radio-label">@lang('product.special_price')
                                            </span>
                                        </label>
                                        <label class="radio-wrap">
                                        <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="tireprice" data-ng-click="switchPecialPrice($event,product.stbprice)"> 
                                            <span class="radio-label ">
                                              @lang('product.tire_price')
                                            </span></label>
                                        <label class="radio-wrap">
                                            <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="bundleprice" data-ng-click="switchPecialPrice($event,product.stbprice)">  
                                            <span class="radio-label ">
                                               @lang('product.bundle_price')
                                            </span>
                                        </label>
                                    </div>
                                    <div class="special-pricedate" ng-if="product.stbprice=='specialprice'">
                                        <div class="col-sm-2">
                                            <label>@lang('product.special_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span>
                                            </label>
                                            <div class="spiner">  
                                             {{-- <counter-dir value="product.special_price" min="0" editable></counter-dir>   --}}              
                                             <number-input field="product.special_price" name-attr="special_price" required-attr="true"></number-input>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>
                                                
                                                @lang('product.date_from')
                                            </label>
                                            <div class="input-group date-wrap">
                                              
                                                <div class="input-group">
                                                    <input name="sp_fromdate" class="form-control" datetimepicker ng-model="product.sp_fromdate"  options="prdData.dateFromOption" on-change="_updateDatePicker(product.sp_fromdate,product.sp_todate,'dateFromOption','dateToOption')" required="" />
                                                    <span class="input-group-addon">
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>@lang('product.to')</label>
                                            <div class="input-group  date-wrap">
                                                 
                                                  <div class="input-group">
                                                      <input name="sp_todate" class="form-control" datetimepicker ng-model="product.sp_todate" options="prdData.dateToOption" on-change="_updateDatePicker(product.sp_fromdate,product.sp_todate,'dateFromOption','dateToOption')"  required="" />
                                                      <span class="input-group-addon">
                                                          <span class="glyphicon glyphicon-calendar"></span>
                                                      </span>
                                                  </div>
                                            </div>
                                          </div>
                                    </div>

                                <!--tire price start -->
                                   <div class="tire-price" ng-if="product.stbprice=='tireprice'">
                                      <div class="col-sm-12 tier-price-box">
                                         <div class="tier-price-row ng-scope" ng-repeat="tirerpice in product.tprices track by $index">
                                            <div class="col-tier">
                                               <label>{{-- Quantity --}}@lang('product.quantity')</label>
                                               <div class="spiner">
                                                 {{-- <counter-dir value="tirerpice.tireQnt" editable></counter-dir> --}}
                                                 <number-input field="tirerpice.tireQnt"></number-input>
                                               </div>
                                               <span class="morend">{{-- and more --}}
                                                    @lang('product.and_more')
                                               </span>
                                               <div ng-show="(productform.tire_quantity_0.$touched || productform.$submitted) &amp;&amp; productform.tire_quantity_0.$error.required" class="error-msg ng-hide">
                                                {{-- Quantity --}}
                                                    @lang('product.quantity')
                                               </div>
                                               <div ng-show="productform.tire_quantity_0.$error.pattern" class="error-msg ng-hide"> {{-- Not a valid --}} 
                                                    @lang('product.not_a_valid')
                                               </div>
                                            </div>
                                            <div class="col-tier">
                                                <label> {{-- price --}}
                                                    @lang('product.price')<span class="currency_code">({{Session::get('default_currency_code')}})</span>
                                                </label>
                                                <div class="spiner">
                                                 {{-- <counter-dir value="tirerpice.tireQntPrice" editable></counter-dir> --}}
                                                 <number-input field="tirerpice.tireQntPrice"></number-input>
                                                </div>
                                                <button class="btn-md btn-skyblue" data-ng-click="removeTireprice($index,'tirerpice')" type="button"><i class="icon-remove"></i> {{-- Remove --}}
                                                @lang('product.remove')
                                                </button>
                                                <div ng-show="(productform.tire_quantity_price_0.$touched || productform.$submitted) &amp;&amp; productform.tire_quantity_price_0.$error.required" class="error-msg ng-hide">{{-- This field is required --}}
                                                @lang('product.required_mesg')
                                                </div>
                                                <div ng-show="productform.tire_quantity_price_0.$error.pattern" class="error-msg ng-hide">{{-- Not a valid number! --}}
                                                @lang('product.validnumber_mesg')
                                                </div>
                                            </div>
                                         </div>
                                      </div>
                                      <div class="clearfix add-another">
                                        <button class="btn btn-md" data-ng-click="addTireprice($event,'tirerpice')" type="button">
                                          {{-- Add Another Option  --}}
                                          @lang('product.add_more')
                                        </button>
                                      </div>
                                   </div>
                                <!--trie price end -->
                                    <div class="bundle-price" ng-if="product.stbprice=='bundleprice'">
                                       <div class="col-sm-12 tier-price-box">
                                         <div class="tier-price-row ng-scope" ng-repeat="bundelprice in product.bundelprice track by $index">
                                            <div class="col-tier">
                                               <label>{{-- Quantity --}}
                                                    @lang('product.quantity')
                                               </label>
                                               <div class="spiner">
                                                 {{-- <counter-dir value="bundelprice.bundelqunt" editable></counter-dir> --}}
                                                 <number-input field="bundelprice.bundelqunt"></number-input>
                                               </div>
                                               <span class="morend">{{-- and more --}}@lang('product.and_more')</span>
                                               <div ng-show="(productform.tire_quantity_0.$touched || productform.$submitted) &amp;&amp; productform.tire_quantity_0.$error.required" class="error-msg ng-hide">
                                                {{-- Quantity --}}
                                                @lang('product.quantity')
                                               </div>
                                               <div ng-show="productform.tire_quantity_0.$error.pattern" class="error-msg ng-hide"> {{-- Not a valid --}}@lang('product.notvalid') </div>
                                            </div>
                                            <div class="col-tier">
                                                <label> {{-- price --}}
                                                @lang('product.price') <span class="currency_code">({{Session::get('default_currency_code')}})</span>
                                                </label>
                                                <div class="spiner">
                                                 {{-- <counter-dir value="bundelprice.bundelprice" editable></counter-dir> --}}
                                                 <number-input field="bundelprice.bundelprice"></number-input>
                                                </div>
                                                <button class="btn-md btn-skyblue" data-ng-click="removeTireprice($index,'bundelprice')" type="button"><i class="icon-remove"></i> {{-- Remove --}}@lang('product.remove')</button>
                                                <div ng-show="(productform.tire_quantity_price_0.$touched || productform.$submitted) &amp;&amp; productform.tire_quantity_price_0.$error.required" class="error-msg ng-hide">{{-- This field is required --}}
                                                @lang('product.required_mesg')
                                                </div>
                                                <div ng-show="productform.tire_quantity_price_0.$error.pattern" class="error-msg ng-hide">{{-- Not a valid number! --}}
                                                    @lang('product.validnumber_mesg')
                                                </div>
                                            </div>
                                         </div>
                                      </div>
                                      <div class="clearfix add-another">
                                        <button class="btn btn-md" data-ng-click="addTireprice($event,'bundelprice')" type="button">
                                          {{-- Add Another Option --}} 
                                          @lang('product.add_more')
                                          </button>
                                      </div>
                                    </div>
                                </div>
                            </div>
                             
                            <!-- Stock section start -->
                            @include('admin.includes.product_warehouse_disabled')
                            <!-- Shop Category section start -->
                           

                            <div class="form-row">
                                <h2 class="title-prod">
                                  <i class="count">4</i> @lang('product.shop_categories')
                                </h2>
                            
                                  @if($add_cat_permission)
                                      <div class="col-sm-4" ng-hide="hidecreatebutton">
                                          <button type="button" class="btn-grey" ng-click="hidecreatebutton=!hidecreatebutton ;showcatform=!showcatform">+@lang('product.create_new_cat')</button>

                                      </div>
                                      <div class="initial-cat-box" ng-show="showcatform">
                                          <div class="col-sm-8" >
                                              <label>Cat Name:</label>
                                              <input id="catname" name="catname" type="text" ng-model="catname">
                                              
                                          </div>
                                          <div class="col-sm-4" >
                                              <label>&nbsp;</label>
                                              <button type="button" class="btn btn-default" ng-click="saveNewCat()">Save Cat</button>
                                          </div>
                                      </div>
                                  @endif
                                  <!-- <%product.selectedCateTree%> -->
                                  <prod-cate-tree dataset="prdData.cateTree" selected="product.selectedCateTree"></prod-cate-tree>
                            </div>
                                
                        </div>

                        <div id="product_variants" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_variants_tab}">
                            @include('admin.includes.product_specification')                             
                        </div>
                        <div id="product_requirement" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_requirement_tab}">
                            @include('admin.includes.product_requirement')
                        </div>
                        <div id="product_related" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_related_tab}">
                            @include('admin.includes.product_related_product') 
                        </div>
                        <div id="unit_dimension" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_unit_dimension_tab}">
                            @include('admin.includes.product_unit_dimension') 
                        </div>
                        <div id="product_video" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_video_tab}">
                            @include('admin.includes.product_video') 
                        </div>
                        @if($warehouse_enabled)
                          <div id="product_warehouse" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_warehouse_tab}">
                            @include('admin.includes.product_warehouse') 
                          </div>  
                        @endif
                        <div id="product_private_zone" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_private_zone_tab}">
                            @include('admin.includes.product_private_zone') 
                        </div>
                        <div id="product_reservation" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_reservation_tab}">
                            @include('admin.includes.product_reservation') 
                        </div>
                        <div id="product_point" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_point_tab}">
                            @include('admin.includes.product_points')
                        </div>
                        <div id="product_seo" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_seo_tab}">
                            @include('admin.includes.product_seo') 
                        </div>
                        <div id="view_price" class="tab-pane" ng-class="{'in active':$root.prd_tab.enable_view_price_tab}">
                            @include('admin.includes.product_viewprice_credit') 
                        </div>
                    </div>
                </div>
            </div>
        
    </div>

    <div class="error-msg-container" id="error_div_main">
        <div class="sucess-msg">
            <div class="clearfix">
                <span class="close icon-remove close-msg"></span>
            </div>                    
            <div class="ok">
                <span class="icon-remove error-icon glyphicon-ok"></span>
            </div>
            <div id="error_div">                    
            </div>
            <button class="ok-msg">@lang('common.ok')</button>
        </div>
    </div> 
</form>


<div class="modal fade" id="variantmodal" role="dialog" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg">
            @include('admin.includes.variant_combination')
    </div>
</div>

<div id="sucess-msg" class="modal fade" role="dialog">
        <div class="modal-dialog modal-sm">
            <!-- Modal content-->
            <div class="modal-content">                  
                <div class="sucess-msg">
                    <div class="clearfix">
                        <span class="close icon-remove close-msg" data-dismiss="modal"></span>
                    </div>                    
                    <div class="ok">
                        <span class="icon-checkbox error-icon glyphicon-ok"></span>
                    </div>
                    <h3 class="skyblue">@lang('product.you_have_success_to_create_attribute')</h3>
                    <div class="btn-group">
                        <button class="btn-default ok-msg" data-dismiss="modal">@lang('common.cancel')</button>
                        <button class="btn-grey ok-msg" data-dismiss="modal">@lang('common.ok')</button>
                    </div>
                </div>                   
            </div>

        </div>
    </div>


</div>  
    
@stop

@section('footer_scripts')
  <!-- begining of page level js -->
  <script src="{{ Config('constants.admin_js_url') }}lang/{{ session('lang_code') }}.lang.js"></script>
  <script type="text/javascript" src="{{ Config('constants.admin_js_url') }}progressbar.js"></script> 
  <!-- end of page level js -->   
  @include('includes.productjsdeps')

  <!--- whill change according to our need -->
  <!-- already on page -->
  <script src="{{asset('js/SweetAlert.min.js')}}"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/productCtrl.js"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/product_table_handler_ctrl.js"></script>
@stop