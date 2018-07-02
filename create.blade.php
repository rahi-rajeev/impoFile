@extends('layouts/admin/default')
@section('title')
  @lang('admin.new_role')
@stop
@section('header_styles')
@stop
@section('content')
 <link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}ng-tags-input.min.css">
 <link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}datetimepicker.css">
 <link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url')}}file-upload.css">
 <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css">
 <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}sweetalert2.min.css">
 <link href="{{asset('css/global.css')}}" rel="stylesheet" />
 <script type="text/javascript">
    var prdtagurl =  "{{ action('Admin\Product\ProductController@getTags') }}";
    var nodehtml = "{{ Config('constants.angular_url') }}sabinaApp/view/treeView.html";
    var activelangs = {!! $activelangs !!};
    var variantdata ={!! $variants !!};
    var variantUrl = "{{ action('Admin\Product\ProductController@getVarientValue')}}";
    var prodcatetreedata = {!! $categories !!};
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
    var variantsaveurl = "{{action('Admin\Product\ProductController@saveVariants')}}";
    var savenewcaturl= "{{ action('Admin\Product\ProductController@saveCat') }}";
    
    //console.log(defaultwarehouse);
    //console.log(defaultwarehouse.has_description.name);
    // _getInfo=(fName,fType)=>{
    //    let ind = fieldset.findIndex(x=>x.fieldName===fName);
    //    if(ind>=0){
    //         let r =false;
    //         if(fType==='sortable'){
    //           r= (typeof fieldset[ind].sortable!=='undefined')? fieldset[ind].sortable:false;
    //         }else if(fType==='width'){
    //           r= (typeof fieldset[ind].width!=='undefined')? fieldset[ind].width:100;
    //         }else if(fType==='align'){
    //            r= (typeof fieldset[ind].align!=='undefined')? 'text-'+fieldset[ind].align:'text-left';
    //         }
    //         return r;
    //    }else return false;
    //    return false;
    // };
    // var fieldset = fieldSetJson.fieldSets;
    var showHeadrePagination = true;
    /**** This code used for columns setting of table where field is field name of database filed.*****/
    var columsSetting = [
    {
    field : 'id',
    displayName : 'Id',
    cellTemplate : '<span><%grid.appScope.seqNumber(row)+1%></span>',
    // enableSorting : _getInfo('id','sortable'),
    //minWidth : _getInfo('id','width'),
    // cellClass : _getInfo('id','align'),
    },
    {   
    field : 'sku',
    displayName : 'SUK',
    //enableSorting : _getInfo('sku','sortable'),
    // minWidth : _getInfo('sku','width'),
    //cellClass : _getInfo('sku','align'),
    },
    { 
    field : 'name',
    displayName : 'Name',
    // enableSorting : _getInfo('name','sortable'),
    //minWidth : _getInfo('name','width'),
    //cellClass : _getInfo('name','align'),
    },
    {  
    field : 'initial_price',
    displayName : 'Price',
    cellTemplate:'<span><%row.entity.initial_price%> <%row.entity.currency_symbol%></span>',
    // enableSorting : _getInfo('initial_price','sortable'),
    //minWidth : _getInfo('initial_price','width'),
    // cellClass : _getInfo('initial_price','align'),
    }];
 </script>
 <div class="main-prodContainer ng-cloak" data-ng-controller="productCtrl" ng-cloak>
        <form name="productform" ng-submit="saveProduct($event,productform)" method ="post" id="productform" enctype='multipart/form-data' ng-class="{'fileupload-processing': processing() || loadingFiles}" file-upload="options" files ="true" novalidate>

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
                        <a href="{{ action('Admin\Role\GroupController@index') }}" class="btn-default">@lang('common.back')</a>
                        <button type="submit" name="submit_type" value="save_and_continue" class="secondary">@lang('common.save_and_continue')</button>
                        <button type="submit" name="submit_type" value="save" class="btn">@lang('common.save')</button>
                    </div>
                </div>

                <!-- left side tab list -->
                <div class="content-wrap clearfix">
                    <div class="content-left">
                        <div class="tablist">
                            {{-- <h3>@lang('product.create_new_product')</h3> --}}
                            <ul class="">
                                <li class="active" id="product">
                                  <a data-toggle="tab" href="#product_detail">
                                    @lang('product.details')
                                  </a>
                                </li>
                                <li id="warehouse">
                                  <a data-toggle="tab" href="#product_warehouse">
                                    {{-- @lang('product.warehouse') --}}
                                   {{--  Warehouse & Inventory --}}
                                   @lang('product.warehouse_inventory')
                                  </a>
                                  
                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_variants">
                                    @lang('product.variants_spec')
                                  </a>

                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_requirement">
                                    @lang('product.requirement')
                                  </a>
                                  
                                </li>
                                <li>
                                <a data-toggle="tab" href="#product_related">
                                    {{-- Related/Crossell/Upsell --}}
                                    @lang('product.related_product')
                                </a>
                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_video">
                                    @lang('product.video')
                                  </a>
                                  
                                </li>
                                <li>
                                  <a data-toggle="tab" href="#unit_dimension">
                                    {{-- Unit & Weight --}}
                                    @lang('product.unit_weight')
                                  </a>
                                  
                                </li>
                              
                                <li>
                                  <a data-toggle="tab" href="#product_private_zone">
                                    {{-- @lang('product.warehouse') --}}                                   
                                   @lang('product.private_zone')
                                  </a>
                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_reservation">
                                    {{-- @lang('product.warehouse') --}}
                                   {{-- Cart Reservation --}}
                                   @lang('product.cart_reservation')
                                  </a>
                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_point">
                                    {{-- @lang('product.warehouse') --}}
                                   {{-- Point --}}
                                   @lang('product.point')
                                  </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#view_price">
                                        {{-- View Price --}}
                                        @lang('product.view_price')
                                    </a>

                                </li>
                                <li>
                                  <a data-toggle="tab" href="#product_seo">
                                    @lang('product.seo')
                                  </a>                                  
                                </li>

                            </ul>
                        </div>
                    </div>
                    
                    <div class="content-right container"> 
                        <div class="tab-content">
                            <div id="product_detail" class="tab-pane fade in active">
                                <h2 class="title">@lang('product.details')</h2>
                               
                                    
                                    <div class="form-row">                            
                                         {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'product.name', 'label'=>Lang::get('product.name') ],['field'=>'textarea', 'name'=>'product.productDesc', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1','froala'=>'froala' ]],'1','','angular')!!}             
                                    </div>
                                       <div class="form-row row">
                                            <span class="col-sm-10">
                                                <label>@lang('product.tags')<i class="red">*</i></label>
                                                <tags-input placeholder="@lang('product.product_tag')" data-ng-model="product.prdtags" name="tagss" display-property="tag_title" required>
                                                <auto-complete  load-on-focus="true" load-on-empty="true" source="_loadProdTags($query)"></auto-complete>
                                                </tags-input>
                                            </span>
                                        </div>
                                        <div class="form-row row">
                                            <label class="col-sm-12">@lang('product.processingtime') <i class="red">*</i></label>
                                            <div class="col-sm-2 spiner">
                                              <counter-dir value="product.processing_time" min="0" editable></counter-dir>
                                            </div>
                                            {{-- <div class="col-sm-1 daysmiddle">
                                                Days
                                            </div> --}}
                                            <div class="col-sm-3">
                                                <div class="col-sm-1 daysmiddle">@lang('product.days')</div>
                                                <div class="col-sm-9">                                                         
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
                                        <div class="form-row row">
                                            <div class="col-sm-3">
                                                <label>
                                                    {{-- Expiry Date --}}
                                                    @lang('product.expiry_date')
                                                </label>
                                                <div class="expdate">
                                                  <a class="dropdown-toggle" id="expirydate" role="button" data-toggle="dropdown" data-target="expirydate"
                                                  href="javascript:void(0)">
                                                    <div class="input-group">
                                                         <input type="text" name="expiry_date" class="date-select" data-ng-model="product.expiry_date">
                                                    </div>
                                                   </a>
                                                   <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                                     <datetimepicker data-ng-model="product.expiry_date"
                                                        data-datetimepicker-config="{ dropdownSelector: '#expirydate'}"
                                                        <!-- data-on-set-time="onExpiryDateTimePickerSet(newDate, oldDate)" -->
                                                        data-before-render="beforeRender($dates)"></datetimepicker>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <label>{{-- sku --}} @lang('product.sku') <i class="red"> *</i></label>
                                            <label class="check-wrap">
                                            <input type="checkbox" ng-model="product.autosku" value="true"> <span class="chk-label">{{-- Autogenerate SKU --}} @lang('product.autosku')</span></label>
                                            <div ng-if="!product.autosku">
                                                <input type="text" name="sku" ng-model="product.sku" ng-blur="checksku(product.sku)" /> 
                                            </div>
                                            <%productform.sku.$error.required%>
                                            <span ng-hide="productform.sku.$error.required" ng-if="skuexists==true" class="error-msg">
                                                                {{-- SKU already exists choose others --}}
                                                                @lang('product.already_exists')
                                            </span>
                                        </div>
                                        <div class="form-row row">
                                            <div class="col-sm-3">
                                            <label>
                                                {{-- Initial Price --}} 
                                                @lang('product.initial_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span><i class="red">*</i>
                                            </label>
                                                <div class="spiner">
                                                  <counter-dir value="product.initial_price" min="0" editable></counter-dir> 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <label class="check-wrap">
                                                <input type="checkbox" name="sp_tp_bp" data-ng-model="product.sp_tp_bp" data-ng-click="sp_check_fun()"> 
                                                <span class="chk-label">
                                                    {{-- Special / Tire / Bundle Price  --}}
                                                    @lang('product.sptpbp')
                                                </span>
                                            </label>
                                            <div class="col-sm-12 mt-10" ng-if="product.sp_tp_bp">
                                                <div class="form-row radio-group">
                                                    <label class="radio-wrap">
                                                        <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="specialprice" data-ng-click="switchPecialPrice($event,product.stbprice)"> 
                                                        <span class="radio-label">{{-- Special Price --}}
                                                            @lang('product.special_price')
                                                        </span>
                                                    </label>
                                                    <label class="radio-wrap">
                                                    <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="tireprice" data-ng-click="switchPecialPrice($event,product.stbprice)"> 
                                                        <span class="radio-label ">
                                                            {{-- Tier Price --}}
                                                            @lang('product.tire_price')
                                                        </span></label>
                                                    <label class="radio-wrap">
                                                        <input name="specialprice" type="radio" data-ng-model="product.stbprice" value="bundleprice" data-ng-click="switchPecialPrice($event,product.stbprice)">  
                                                        <span class="radio-label ">
                                                           {{--  Bundle Price --}}
                                                           @lang('product.bundle_price')
                                                        </span>
                                                    </label>
                                                </div>
                                                <div class="special-pricedate" ng-if="product.stbprice=='specialprice'">
                                                    <div class="col-sm-2">
                                                        <label>{{-- Special Price --}}
                                                            @lang('product.special_price') <span class="currency_code">({{Session::get('default_currency_code')}})</span>
                                                        </label>
                                                        <div class="spiner">
                                                         <counter-dir value="product.special_price" min="0" editable></counter-dir>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3">
                                                        <label>
                                                            {{-- Date From --}}
                                                            @lang('product.date_from')
                                                        </label>
                                                        <a class="dropdown-toggle" id="spdatefrom" role="button" data-toggle="dropdown" data-target="spdatefrom"
                                                        href="javascript:void(0)">
                                                          <div class="input-group date">
                                                            <input type="text" class="date-select" data-ng-model="product.sp_fromdate">
                                                          </div>
                                                        </a>
                                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                                   {{--          <datetimepicker data-ng-model="product.sp_fromdate"
                                                            data-datetimepicker-config="{ dropdownSelector: '#spdatefrom', renderOn: 'end-date-changed',startView: 'day',minView: 'day'}"
                                                            data-before-render="startDateBeforeRender($dates,'sp_todate')"></datetimepicker>

                                                             <datetimepicker data-ng-model="product.expiry_date"
                                                        data-datetimepicker-config="{ dropdownSelector: '#expirydate'}"
                                                        
                                                        data-before-render="beforeRender($dates)"></datetimepicker> --}}

                                                        <datetimepicker data-ng-model="product.sp_fromdate"
                                                            data-datetimepicker-config="{ dropdownSelector: '#spdatefrom', renderOn: 'end-date-changed',startView: 'day',minView: 'day'}"
                                                            data-before-render="beforeRender($dates)">
                                                        </datetimepicker>
                                                        </ul>
                                                    </div>
                                                    <div class="col-sm-3">
                                                        <label>{{-- To --}}@lang('product.to')</label>
                                                        <a class="dropdown-toggle" id="spdateto" role="button" data-toggle="dropdown" data-target="spdateto"
                                                        href="javascript:void(0)">
                                                         <div class="input-group date">
                                                          <input type="text" class="date-select" data-ng-model="product.sp_todate">
                                                         </div>
                                                        </a>
                                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                             {{--              <datetimepicker data-ng-model="product.sp_todate"
                                                          data-datetimepicker-config="{ dropdownSelector: '#spdateto', renderOn: 'start-date-changed',startView: 'day',minView: 'day'}"
                                                          data-before-render="endDateBeforeRender($view, $dates, $leftDate, $upDate, $rightDate,'sp_fromdate')"></datetimepicker> --}}

                                                          <datetimepicker data-ng-model="product.sp_todate"
                                                          data-datetimepicker-config="{ dropdownSelector: '#spdateto', renderOn: 'start-date-changed',startView: 'day',minView: 'day'}"
                                                           data-before-render="beforeRender($dates)"></datetimepicker>

                                                        </ul>
                                                    </div>
                                                </div>

                                            <!--tire price start -->
                                               <div class="tire-price" ng-if="product.stbprice=='tireprice'">
                                                  <div class="col-sm-12 tier-price-box">
                                                     <div class="tier-price-row ng-scope" ng-repeat="tirerpice in product.tprices track by $index">
                                                        <div class="col-tier">
                                                           <label>{{-- Quantity --}}@lang('product.quantity')</label>
                                                           <div class="spiner">
                                                             <counter-dir value="tirerpice.tireQnt" editable></counter-dir>
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
                                                             <counter-dir value="tirerpice.tireQntPrice" editable></counter-dir>
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
                                                             <counter-dir value="bundelprice.bundelqunt" editable></counter-dir>
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
                                                             <counter-dir value="bundelprice.bundelprice" editable></counter-dir>
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
                                       
                                        <div class="form-row">
                                            <label>{{-- Product Image --}} @lang('product.image')<i class="red">*</i></label>
                                            <div class="multiple-file-upload">
                                                <div class="upload-row">
                                                 @lang('product.drag_drop_file')
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
                                                                 <input name="default_image" type="radio" value="<%$index%>" ng-model="product.defaultImage" ng-checked="<%product.defaultImage === $index%>"> 
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
                                                            <span> {{-- Add --}}
                                                            @lang('product.add')
                                                            </span>
                                                         <droplet-upload-multiple ng-model="product.file_interface"></droplet-upload-multiple>
                                                        </span>
                                                        <button type="button" class="btn-md btn cancel" ng-click="_clearallfiles()">
                                                            <i class="icon-remove"></i>
                                                            <span>
                                                            {{-- Clear upload  --}} 
                                                            @lang('product.clear_upload')
                                                             </span>
                                                        </button>
                                                        <!-- The global file processing state -->
                                                        <span class="fileupload-process"></span>
                                                    </div>                 
                                                </div>
                                                <!-- </form> -->
                                            </div>
                                        </div>

                                       <div class="form-row">
                                           <h3>
                                           {{-- Shop Categories --}} 
                                           @lang('product.shop_categories') 
                                           </h3>
                                            @if($add_cat_permission)
                                                <div class="col-sm-4" ng-hide="hidecreatebutton">
                                                    {{-- <a href="{{action('Admin\Category\CategoryController@create')}}" class="btn-grey" ng-click="showaddcatform()">+@lang('product.create_new_cat')</a> --}}
                                                    <button type="button" class="btn-grey" ng-click="hidecreatebutton=!hidecreatebutton ;showcatform=!showcatform">+@lang('product.create_new_cat')</button>

                                                </div>
                                                <div class="initial-cat-box" ng-show="showcatform">
                                                    <div class="col-sm-8" >
                                                        <label>Cat Name:</label>
                                                        <input id="catname" type="text" ng-model="catname">
                                                        
                                                    </div>
                                                    <div class="col-sm-4" >
                                                        <label>&nbsp;</label>
                                                        <button type="button" class="btn btn-default" ng-click="saveNewCat()">Save Cat</button>
                                                    </div>
                                                </div>
                                            @endif
                                            <prod-cate-tree dataset="prdData.cateTree" selected="product.selectedCateTree"></prod-cate-tree>
                                       </div>
                                       <div class="form-row">
                                            <label class="check-wrap"><input type="checkbox" ng-model="product.visibility"> 
                                            <span class="chk-label">{{-- Visible On Website --}}
                                                @lang('product.visibility') 
                                            </span></label>
                                        </div>
                            </div>

                            <div id="product_variants" class="tab-pane">
                                @include('admin.includes.product_specification')                             
                            </div>
                            <div id="product_requirement" class="tab-pane">
                                @include('admin.includes.product_requirement')
                            </div>
                            <div id="product_related" class="tab-pane">
                                @include('admin.includes.product_related_product') 
                            </div>
                            <div id="unit_dimension" class="tab-pane">
                                @include('admin.includes.product_unit_dimension') 
                            </div>
                            <div id="product_video" class="tab-pane">
                                @include('admin.includes.product_video') 
                            </div>
                            <div id="product_warehouse" class="tab-pane">
                                @include('admin.includes.product_warehouse') 
                            </div>  
                            <div id="product_private_zone" class="tab-pane">
                                @include('admin.includes.product_private_zone') 
                            </div>
                            <div id="product_reservation" class="tab-pane">
                                @include('admin.includes.product_reservation') 
                            </div>
                            <div id="product_point" class="tab-pane">
                                @include('admin.includes.product_points')
                            </div>
                            <div id="product_seo" class="tab-pane">
                                @include('admin.includes.product_seo') 
                            </div>
                            <div id="view_price" class="tab-pane">
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


    <div class="modal fade" id="variantmodal" role="dialog">
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
                        <h3 class="skyblue">You have success to create attribute</h3>
                        <div class="btn-group">
                            <button class="btn-default ok-msg" data-dismiss="modal">Cancel</button>
                            <button class="btn-grey ok-msg" data-dismiss="modal">Ok</button>
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
    <script src="{{ Config('constants.admin_js_url') }}roles.js"></script>
    <script type="text/javascript" src="//ng-droplet.herokuapp.com/js/vendor/progressbar.js/dist/progressbar.js"></script>
    @include('includes.gridtablejsdeps')
    <script src="{{ Config('constants.admin_js_url') }}bootstrap-colorpicker.js"></script>
    <script src="{{ Config('constants.angular_url') }}libs/underscore-min.js"></script>
    <script src="{{ Config('constants.angular_url') }}sabinaApp/directive/catetreeDir.js"></script>
   
    <!-- end of page level js -->    

    @include('includes.froalaeditor_dependencies')
    <script src="{{asset('angular-froala/src/angular-froala.js')}}"></script> 
    <!--- whill change according to our need -->
    {{-- <script src="{{asset('angular/Froala/app.js')}}"></script> --}}
    <!-- already on page -->

    <script src="{{asset('js/SweetAlert.min.js')}}" rel="stylesheet"></script>

    <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/productCtrl.js"></script>
    <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
  
    
@stop
