@extends('layouts/admin/default')
@section('title')
 Edit bundle - {{getSiteName()}}
@stop
@section('header_styles')
@stop
@section('content')
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}ng-tags-input.min.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}flatpickr.min.css">
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
  @if(isset($action_type) && $action_type == 'copy')
    var producturl = "{{action('Admin\Product\ProductController@copyExistingProduct')}}";
  @else
    var producturl = "{{action('Admin\Product\ProductController@updateProduct',$product_detail['id'])}}";
  @endif
  var defaultwarehouse = {!! json_encode($defaultwarehouse) !!}; 
  
  var attributeurl = "{{action('Admin\Product\ProductController@getEditExceptAttributeDetails')}}";
  var attribute_requirment_url = "{{action('Admin\Product\ProductController@getAttrRequAttrsets')}}";
  var warehoseurl = "{{action('Admin\Product\ProductController@getAllWarehouseData')}}";
  var dataJsonUrl ="{{ action('Admin\Product\ProductController@getAllProducts')}}";
  var skucheckurl = "{{action('Admin\Product\ProductController@checkSku')}}";
  var product_detail = {!! json_encode($product_detail) !!};
  var simple_prd_details = {!! $simple_prd_details !!};
  var config_prd_details = {!! $config_prd_details !!};
  var selected_requirment = undefined;
  var spec_selected_value = undefined;
  var getattributestructrue = undefined;
  var categorylisturl="{{ action('Admin\Product\ProductController@getAllCategory') }}";
  var prdimage_delete_url ="{{ action('Admin\Product\ProductController@deleteProductImg') }}";
  var prdvideo_delete_url ="{{ action('Admin\Product\ProductController@deleteProductVideo') }}";
  var product_detail_url = siteUrl + '/product/';
  var product_type = 'bundle';
  var selected_rel_bundle = {!! $sel_related_bundle !!};
  var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
  var showHeadrePagination = true;
  var currency_symbol = "{{ session('default_currency_symbol') }}";
  var simple_product_url ="{{ action('Admin\Product\ProductController@getAllSimpleProducts')}}";
  var config_product_url = "{{ action('Admin\Product\ProductController@getAllConfigProducts')}}";
  var get_config_prd_url = "{{action('Admin\Product\ProductController@getConfigProductDetail') }}";
  var get_simple_prd_url = "{{action('Admin\Product\ProductController@getSimpleProductDetail') }}";
  var config_bundel_prd_HtmlUrl = "{{ Config('constants.angular_url') }}sabinaApp/view/config_product_display.html";
  var simple_bundel_prd_HtmlUrl = "{{ Config('constants.angular_url') }}sabinaApp/view/simple_bundel_product.html";
   var productvarianturl = "{{action('Admin\Product\ProductController@index')}}";
  //file upload setting where allowed_extension uesd for file extension and max_file for number of file user can upload
  var file_upload_setting = {
    allowed_extension :['png','jpeg','jpg', 'bmp', 'gif', 'svg'],
    max_number_file :5,
    max_file_size :5,//in mb
    min_file_size : 200,//in mb
  };

  //for table  
  var fieldSetJson = {!! $fieldSetJson !!};
  var fieldset = fieldSetJson.fieldSets;
  var filterOptionJson = {!! $addfilterdata !!};

  //for form field name 
   var formFieldName = ["sku","stock_value","tagss", "product.name_1", "product.name_2","product.name_3","product.name_4","ready_ship","initial_price","special_price","sp_fromdate","sp_todate"];
   var errorMsg = ["Sku is required", "Stock value is required", "Tags is required","Name is required","Name is required","Name is required","Name is required","Processing time is required","Price is required","Special price is required","Special price from date is required","Special price to date is required"];
  //file upload/delete url
  var img_temp_delete_url = "{{ action('Admin\Product\ProductController@deleteTempImage') }}";
  var upload_image_url = "{{action('Admin\Product\ProductController@uploadUnitImage')}}";
   var current_blade_type = "{{$action_type  or ''}}";
</script>
<div class="main-prodContainer ng-cloak" data-ng-controller="productCtrl" ng-cloak>
  <form name="productform"  method ="post" id="productform" enctype='multipart/form-data' ng-class="{'fileupload-processing': processing() || loadingFiles}" file-upload="options" files ="true" novalidate>
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

              @if(isset($action_type) &&  $action_type == 'copy')
                <h1 class="title">@lang('product.edit_bundle_product') : {{$product_detail['has_description'][$default_lang_id-1]['name']}}</h1>
              @else
                <h1 class="title">@lang('product.edit_product') : {{$product_detail['has_description'][$default_lang_id-1]['name']}}</h1>
              @endif
                <div class="pull-right btn-groups">
                    @if(isset($action_type) && $action_type == 'copy')

                    @else
                      <a href="{{action('Admin\Product\ProductController@copyProduct',['id'=>$product_detail['id']])}}" class="btn-default">@lang('common.copy')</a>
                    @endif
                    <a href="{{ action('Admin\Product\ProductController@index') }}" class="btn-default" ng-class="{disabled:prdData.loading.disableBtn}">@lang('common.back')</a>
                    <button name="submit_type" value="save_and_continue" class="secondary" ng-disabled="prdData.loading.disableBtn" ng-click="saveProduct($event, productform, 'save_and_continue')">@lang('common.save_and_continue')</button>
                    <button  name="submit_type" value="save" class="btn" ng-disabled="prdData.loading.disableBtn" ng-click="saveProduct($event, productform, 'save')">
                    @lang('common.save')</button>
                </div>
          </div>

          <!-- left side tab list -->
          <div class="content-wrap clearfix">
              <div class="content-left">
                  <div class="tablist">
                      {{-- <h3>@lang('product.create_new_product')</h3> --}}
                      <ul class="">
                          <li class="active" ng-class="{'active' : $root.prd_tab.enable_product_tab}" ng-click="liActiveHandler($event,'enable_product_tab')" data-toggle="tab" data-target="#product_detail">
                            @lang('product.details')
                            
                          </li>
                          @if($warehouse_enabled)
                          <li ng-class="{'active':$root.prd_tab.enable_warehouse_tab}" ng-click="liActiveHandler($event,'enable_warehouse_tab')" data-toggle="tab" data-target="#product_warehouse">
                            @lang('product.warehouse_inventory')
                            
                          </li>
                          @endif
                          <li ng-class="{'active' : $root.prd_tab.enable_bundel_tab}" ng-click="liActiveHandler($event,'enable_bundel_tab')" data-toggle="tab" data-target="#product_bundle">
                               @lang('product.bundle_product')
                          </li>
                     
                          <li ng-class="{'active' : $root.prd_tab.enable_related_tab}" ng-click="liActiveHandler($event,'enable_related_tab')" data-toggle="tab" data-target="#product_related">
                            @lang('product.related_product')
                            
                          </li>
             
                          <li ng-class="{'active':$root.prd_tab.enable_unit_dimension_tab}" ng-click="liActiveHandler($event,'enable_unit_dimension_tab')" data-toggle="tab" data-target="#unit_dimension">
                            @lang('product.unit_weight')
                          </li>
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
                             @include('admin.includes.product_edit_image_upload')
                             @include('admin.includes.product_video')
                        </div>
                          <h2 class="title-prod">
                            <i class="count">2</i> @lang('product.details') <i class="red">*</i>                                  
                          </h2>
                          <div class="form-row">
                              <label>@lang('product.sku') <i class="strick">*</i></label>                              
                              
                              <input type="text" value="product.sku" name="sku" ng-model="product.sku" ng-blur="checksku(product.sku)" /> 
                              
                              <span ng-hide="productform.sku.$error.required" ng-if="skuexists==true && !productform.sku.$error.required" class="error-msg">
                                   @lang('product.already_exists')
                              </span>
                          </div>
                          <div class="form-row">                            
                              {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'product.name', 'label'=>Lang::get('product.name') ],['field'=>'textarea', 'name'=>'product.productDesc', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1','froala'=>'froala' ]],'1','','angular')!!}
                          </div>
                          <div class="form-row row">
                              <span class="col-sm-10">
                                  <label>@lang('product.tags')<i class="strick">*</i></label>
                                  <tags-input placeholder="@lang('product.product_tag')" data-ng-model="product.prdtags" name="tagss" display-property="tag_title" required>
                                     <auto-complete  load-on-focus="true" load-on-empty="true" source="_loadProdTags($query)"></auto-complete>
                                  </tags-input>
                              </span>
                          </div>
                          <div class="form-row row">
                              <label class="col-sm-12">@lang('product.processingtime') <i class="strick">*</i></label>
                              <div class="check-group mt-5 mb-5 col-sm-12">
                                <label class="check-wrap">
                                  <input type="checkbox" name="ready_ship" class="checkbox" id="ready_ship" ng-model="product.ready_ship"> 
                                  <span class="chk-label" value="true">
                                    @lang('product.ready_ship')
                                  </span>
                                </label>
                              </div>
                              <div ng-if="!product.ready_ship">
                              <div class="inline col-sm-2 spiner" >
                                {{-- <counter-dir value="product.processing_time" min="0" editable></counter-dir> --}}
                                <number-input field="product.processing_time" symbol="false"></number-input>
                              </div>
                              <div class="inline">
                                  <div class="inline daysmiddle">@lang('product.days')</div>
                                  <div class="inline ready-ship-date-sel">     
                                         
                                      <select data-ng-model="product.processing_type" name="processing_type"> 
                                         
                                          <option ng-value="1" ng-selected="product.processing_type==1">
                                              @lang('product.perorder')
                                          </option>
                                          <option ng-value="2" ng-selected="product.processing_type==2">                                   
                                              @lang('product.preitem')
                                          </option>
                                      </select>
                                  </div>
                              </div>
                            </div>
                          </div>
                          <div class="form-row row">
                              <div class="col-sm-3">
                                  <label>                                      
                                      @lang('product.expiry_date')
                                  </label>
                                  <div class="check-group mt-5 mb-5">
                                              <label class="check-wrap"> 
                                                <input type="checkbox" name="exp_date" class="checkbox" id="exp_date" ng-model="product.nexpiry"> 
                                                <span class="chk-label">
                                                <!-- No Expire date -->
                                                @lang('product.no_expiry_date')
                                                </span>
                                              </label>
                                            </div>
                                  <div class="expdate" ng-if="!product.nexpiry">
                                    <div class="input-group date-wrap">
                                       <div class="input-group" enable-datepicker options="prdData.dateOption" ng-model="product.expiry_date">
                                            <input type="text" placeholder="Select Date.." class="form-control"  ng-model="product.expiry_date" data-input />
                                            <span class="input-group-addon" data-toggle>
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
                              <label class="check-wrap"><input type="checkbox" ng-model="product.visibility"> 
                              <span class="chk-label">{{-- Visible On Website --}}
                                  @lang('product.visibility') 
                              </span></label>
                          </div>

                          <!-- Price section start -->
                          <h2 class="title-prod">
                              <i class="count">3</i> @lang('product.price') <i class="strick">*</i>
                          </h2>
                          <div class="form-row row">
                              <div class="col-sm-3">
                              <label>
                                  {{-- Initial Price --}} 
                                  @lang('product.initial_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span><i class="strick">*</i>
                              </label>
                                  <div class="spiner">
                                    {{-- <counter-dir value="product.initial_price" min="0" editable></counter-dir> --}} 
                                    <number-input field="product.initial_price"></number-input>
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
                                          <span class="radio-label">
                                              @lang('product.special_price')
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
                                          <label>
                                              @lang('product.special_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span>
                                          </label>
                                          <div class="spiner">
                                           {{-- <counter-dir value="product.special_price" min="0" editable></counter-dir> --}}
                                           <number-input field="product.special_price"></number-input>
                                          </div>
                                      </div>
                                      <div class="col-sm-3">
                                          <label>
                                              
                                              @lang('product.date_from')
                                          </label>
                                          <div class="input-group date-wrap">
                                             <div class="input-group" enable-datepicker options="prdData.dateFromOption" ng-model="product.sp_fromdate">
                                                    <input type="text" name="sp_fromdate" placeholder="Select Date.." ng-model="product.sp_fromdate" data-input ng-change="_updateDatePicker(product.sp_fromdate,product.sp_todate,'dateFromOption','dateToOption')" required="">
                                                    <span class="input-group-addon" data-toggle>
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>            
                                             </div>
                                          </div>
                                      </div>
                                      <div class="col-sm-3">
                                          <label>@lang('product.to')</label>
                                          <div class="input-group  date-wrap">
                                             <div class="input-group" enable-datepicker options="prdData.dateToOption" ng-model="product.sp_todate">
                                                      <input type="text" name="sp_todate" placeholder="Select Date.." ng-model="product.sp_todate" data-input  ng-change="_updateDatePicker(product.sp_fromdate,product.sp_todate,'dateFromOption','dateToOption')"  required="">
                                                      <span class="input-group-addon" data-toggle>
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
                                             <label>@lang('product.quantity')</label>
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
                          

                          @include('admin.includes.product_warehouse_disabled')

                          <div class="form-row">
                            <h2 class="title-prod">
                              <i class="count">4</i> {{-- Shop Categories --}} @lang('product.shop_categories') <i class="red">*</i>                              
                            </h2>
                            <div ng-show="prdData.cateTree.length<1">
                             <a href="{{action('Admin\Category\CategoryController@create')}}" class="btn-grey">+ {{-- Create new category --}}@lang('product.create_new_cat')</a>
                            </div>
                             <prod-cate-tree dataset="prdData.cateTree" selected="product.selectedCateTree"></prod-cate-tree>
                          </div>
                          
                      </div>

                      {{-- <div id="product_variants" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_variants_tab}">
                          @include('admin.includes.product_specification')                             
                      </div>
                      <div id="product_requirement" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_requirement_tab}">
                          @include('admin.includes.product_requirement')
                      </div> --}}
                      <div id="product_bundle" class="tab-pane" ng-class="{'in active' : $root.prd_tab.enable_bundel_tab}">
                          @include('admin.includes.product_bundle')
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
</div>  

@stop

@section('footer_scripts')
<!-- begining of page level js -->
<script src="{{ Config('constants.admin_js_url') }}lang/{{ session('lang_code') }}.lang.js"></script>

<script type="text/javascript" src="{{ Config('constants.admin_js_url') }}progressbar.js"></script> 
@include('includes.productjsdeps')
<!--- whill change according to our need -->
{{-- <script src="{{asset('angular/Froala/app.js')}}"></script> --}}
<!-- already on page -->
<script src="{{asset('js/SweetAlert.min.js')}}"></script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/directive/simple_config_prod_listDir.js"></script> 
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/productEditCtrl.js"></script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/product_table_handler_ctrl.js"></script>
@stop
