@extends('layouts/admin/default')

@section('title')
    @lang('product.new_promotion') - {{getSiteName()}}
@stop

@section('header_styles')

<script>
  var apply_actions = {!! json_encode($apply_actions) !!};
  var customer_groups =  {!! json_encode($customer_groups_dropdown)!!};
  var conditions_serialized = '';
  var pro_id = '';
  var pay_option =  {!! $pay_option !!};
  var shipping_profile = {!! $shipping_profile !!};
  var province_name  = {!! $province_name !!};
  var country_name = {!! $country_name !!};

  var attributes = {!! $attributes !!};

  var dataJsonUrl = "{{ action('Admin\Promotion\PromotionXonYController@productlist') }}";
  var pagelimit = "{{ action('JsonController@pageLimit') }}";
  var nodehtml = "{{ Config('constants.angular_url') }}sabinaApp/view/treeView.html";
 
  var showHeadrePagination = true;
  var getAllDataFromServerOnce = true;

  var product_ids = []; 
  var old_inputs = {!! $old_inputs !!};
  var pagination =[10,20,50,100,150,200];
  var page_type = "add_promotion";

  var fieldSetJson = {!! $fieldsetdata !!};
  var fieldset = fieldSetJson.fieldSets;

  var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
  var pagination = {!! getPagination() !!};
  var per_page_limt = {{ getPagination('limit') }};
  var currentActiveTab = "all";
  var categorylisturl="{{ action('Admin\Product\ProductController@getAllCategory') }}";
  
</script>

<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 

<link href="{{ asset('assets/vendors/jasny-bootstrap/css/jasny-bootstrap.css') }}" rel="stylesheet">
<link href="{{ asset('assets/vendors/iCheck/css/all.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/css/pages/form_layouts.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/vendors/bootstrapvalidator/css/bootstrapValidator.min.css') }}" type="text/css" rel="stylesheet">
<!-- end of page level css -->
<link href="{{ asset('assets/vendors/jasny-bootstrap/css/jasny-bootstrap.css') }}" rel="stylesheet">

<link href="{{ asset('assets/css/flatpickr.min.css') }}" rel="stylesheet">

<link rel="stylesheet"  type="text/css" href="{{ asset('assets/css/bootstrap-datepicker.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ asset('assets/css/bootstrap-timepicker.css') }}"/>
@stop

@section('content')

<div class="content">
    <div class="header-title">
        <h1 class="title">@lang('product.new_promotion')</h1>
        <div class="pull-right btn-groups">
            <a class="btn-default" href="{{ action('Admin\Promotion\PromotionXonYController@index') }}">@lang('attribute.back')</a>
            <button class="btn-neg">@lang('attribute.reset')</button>
            <button class="secondary savebuttion parse-json" >@lang('attribute.save')</button>     
        </div>
    </div>
    
    <div class="promotion-content content-wrap clearfix" data-ng-app="tableApp" data-ng-controller="promotionXYPrdCtrl" ng-cloak>
        <div class="content-left">
            <div class="tablist">                    
                <ul class="">
                   <!--li class="hidden-xs"><h3>@lang('product.attribute_information')</h3></li-->
                   <li class="active" data-toggle="tab" data-target="#general">
                      @lang('product.general')
                  </li>
                  <li data-toggle="tab" data-target="#proproductx" data-ng-click="enableTab('all')">
                      <!--@lang('product.condition')-->
                      Product X
                  </li>
                  <li data-toggle="tab" data-target="#proproducty" data-ng-click="enableTab('active')">
                      <!--@lang('product.action')-->
                      Product Y
                  </li>
                  <!--li data-toggle="tab" data-target="#procoupon" ng-if="promModel.use_auto_generation == true && promModel.coupon_type == 1">
                      @lang('product.coupon_code')
                  </li-->  
                </ul>
            </div>
        </div>
        <div class="content-right">
          <div class="tab-content">
              <div id="attr-general" class="tab-pane fade in active">
                  <div class="col-sm-12">
                        <h2 class="title">
                            @lang('attribute.attribute_properties')
                        </h2>
                   <form name="promotionform" method ="post" id="promotionform" enctype='multipart/form-data' action="{{action('Admin\Promotion\PromotionXonYController@store')}}">

                      {{ csrf_field() }}

                             <div class="tab-content">
                                 <div id="general" class="tab-pane in active">
                                       <div class="row form-row">
                                        <div class="col-sm-4">
                                           <label>@lang('product.promotion_name')<i class="strick">*</i></label>
                                               {!! Form::text('rule_name', old('rule_name'), ['ng-model'=>'promModel.rule_name'] ) !!}
                                        </div>
                                              @if ($errors->has('rule_name'))
                                                 <p id="rule_name-error" class="col-sm-12 error error-msg">{{ $errors->first('rule_name') }}</p>
                                              @endif                                                
                                        </div>
                                        <div class="row form-row">
                                          <div class="col-sm-4">
                                            <label>@lang('product.active')<i class="strick">*</i></label>
                                             {!! Form::select('status', [],  null, ['ng-model'=>'promModel.status', 'ng-options'=> ' template.name for template in promData.statusdropdown track by template.value']) !!}
                                          </div>              
                                        </div>  
                                      
                                        <div class="row form-row" ng-if="!edit">
                                              <div class="col-sm-8">
                                               <label>@lang('product.v_description')<i class="strick">*</i></label>
                                                    {!! Form::textarea('description', old('description'), ['ng-model'=>'promModel.description']) !!}

                                                    @if ($errors->has('description'))
                                                      <p id="description-error" class="error error-msg">{{ $errors->first('description') }}</p>
                                                    @endif
                                              </div>                                 

                                        </div>

                                        <div class="form-row">
                                               {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'label', 'label'=> Lang::get('product.promotiom_label').'<i class="strick">*</i>', 'errorkey'=>'promotiom_label']],'1', $errors) !!}
                                        </div>

                                        <div class="row form-row">
                                          <div class="col-sm-4">
                                             <label>{{ Lang::get('product.for_customer_groups') }}<i class="strick">*</i></label>
                                              <select ng-model="customer_group_id"  name="customer_group_id[]" size="5" multiple="multiple" ng-options=" customer_group.name for  customer_group in customer_groups track by customer_group.id">
                                                
                                              </select>
                                                @if ($errors->has('group'))
                                                   <p id="customer_group_id-error" class="error error-msg">{{ $errors->first('group') }}</p>
                                                @endif
                                          </div>
                                        </div>
                                        <div class="row form-row">
                                           <div class="col-sm-3 date">
                                              <label>{{ Lang::get('product.date_from_time') }}<i class="strick">*</i></label>
                                              <div class="input-group date-wrap"> 
                                                <div class="input-group" enable-datepicker options="promModel.dateFromOption" ng-model="promModel.from_date">
                                                    <input type="text" name="from_date" placeholder="Select Date.." ng-model="promModel.from_date" data-input ng-change="_updateDatePicker(promModel.from_date,promModel.to_date,'dateFromOption','dateToOption')" required="">
                                                    <span class="input-group-addon" data-toggle>
                                                        <span class="glyphicon glyphicon-calendar"></span>
                                                    </span>            
                                                </div>
                                              </div>    
                                               @if ($errors->has('from_date'))
                                                  <p id="from_date-error" class="error error-msg">{{ $errors->first('from_date') }}</p>
                                               @endif
                                           </div>
                                           <div class="col-sm-3 date">
                                                <label>{{ Lang::get('product.expire_to') }}<i class="strick">*</i></label>
                                                <div class="input-group  date-wrap"> 
                                                  <div class="input-group" enable-datepicker options="promModel.dateToOption" ng-model="promModel.to_date">
                                                      <input type="text" name="to_date" placeholder="Select Date.." ng-model="promModel.to_date" data-input  ng-change="_updateDatePicker(promModel.from_date,promModel.to_date,'dateFromOption','dateToOption')"  required="">
                                                      <span class="input-group-addon" data-toggle>
                                                          <span class="glyphicon glyphicon-calendar"></span>
                                                      </span>                   
                                                  </div>
                                                </div>
                                                @if ($errors->has('to_date'))
                                                  <p id="from_date-error" class="error error-msg">{{ $errors->first('to_date') }}</p>
                                                @endif
                                           </div>
                                        </div> 
                                        <div class="row form-row">
                                              <div class="col-sm-3 date">
                                                <label>{{ Lang::get('product.custom_date') }}<i class="strick">*</i></label>
                                                <div class="input-group  date-wrap"> 
                                                  <div class="input-group" enable-datepicker options="promModel.dateOption" ng-model="promModel.custom_date_promotion">
                                                      <input type="text" name="custom_date_promotion" placeholder="Select Date.." ng-model="promModel.custom_date_promotion" data-input   required="">
                                                      <span class="input-group-addon" data-toggle>
                                                          <span class="glyphicon glyphicon-calendar"></span>
                                                      </span>                   
                                                  </div>
                                                </div>     
                                               @if ($errors->has('custom_date_promotion'))
                                                  <p id="from_date-error" class="error error-msg">{{ $errors->first('custom_date_promotion') }}</p>
                                               @endif
                                              </div>
                                              <div class="col-sm-3">
                                                <label>{{ Lang::get('product.time') }}<i class="strick">*</i></label>
                                                <div class="input-group col-sm-6 pull-left flatpickr">    
                                                  <input type="text" id ="custom_time_from" name="custom_time_from" class="time-clock"  ng-model="promModel.custom_time_from" readonly="readonly">
                                                </div> 
                                               <div class="input-group flatpickr col-sm-6 pull-left"> 
                                                <input type="text" class="time-clock" id ="custom_time_to" name="custom_time_to" ng-model="promModel.custom_time_to" readonly="readonly">
                                                </div> 
                                              </div>
                                        </div>
                                    <div class="form-row">
                                      <label class="mb-5">@lang('product.apply_with_other_discount_promotion')
                                    <label class="radio-wrap">
                                      {!! Form::radio('stop_rules_processing', '2', (old('stop_rules_processing') == '2'),['class' => 'radio', 'ng-model'=>'promModel.stop_rules_processing'] ) !!}
                                      <span class="radio-label">@lang('product.yes')</span> 
                                    </label>
                               </div>
                                </div>
                              <!-- product x section -->
                              <div id="proproductx" class="tab-pane in">
                                <div class="form-row">
                                    <label class="radio-wrap"> Number of X Products<i class="strick">*</i></label>  
                                    {!! Form::text('no_x_products', old('no_x_products'), [ 'ng-model'=>'promModel.no_x_products', "onkeypress"=>"return isNumberKey(event)", "required"=>"required"] ) !!}
                                    @if ($errors->has('no_x_products'))
                                      <p id="no_x_products-error" class="error error-msg">{{ $errors->first('no_x_products') }}</p>
                                    @endif 
                                 </div>       
                                 <div class="form-row">
                                    <label class="radio-wrap"> Maximum Applied Time</label>
                                    {!! Form::text('maximum_applied_time', old('maximum_applied_time'), [ 'ng-model'=>'promModel.maximum_applied_time', "onkeypress"=>"return isNumberKey(event)", "required"=>"required"] ) !!}
                                 </div>
                                 <!-- product selection table -->
                                 <input type="hidden" name="x_product_ids" id="x_prd_id" />
                                 <div class="gridtable-content" ng-if="prom_prd_x_active">
                                    <div class="" >
                                       @include('includes.gridtable')
                                    </div>
                                 </div>
                                 <!-- product category selection section -->
                                 <div class="form-row">
                                    <input type="hidden" name="x_cat_ids" id="x_cat_ids" />
                                    <label>Choose Category Id</label>
                                    <prod-cate-tree dataset="promData.cateTree" selected="promModel.selectedCateTree"></prod-cate-tree>
                                 </div>
                              </div>
                              <!-- product y selection section -->
                              <div id="proproducty" class="tab-pane in">
                                  <div class="form-row">
                                      <label class="radio-wrap">Number of Y Products <i class="strick">*</i></label>
                                      {!! Form::text('no_y_products', old('no_y_products'), [ 'ng-model'=>'promModel.no_y_products', "onkeypress"=>"return isNumberKey(event)", "required"=>"required"] ) !!}
                                      @if ($errors->has('no_y_products'))
                                        <p id="no_y_products-error" class="error error-msg">{{ $errors->first('no_y_products') }}</p>
                                      @endif
                                  </div> 
                                  <div class="form-row">
                                    <div class="radio-group">
                                      <label class="mb-10">Discount Amount<i class="strick">*</i></label>
                                        {!! Form::text('discount_amount', old('discount_amount'), [ 'ng-model'=>'promModel.discount_amount'] ) !!}
                                        <div class="discount_in_amount_or_percent mt-10">
                                        <label class="radio-wrap">
                                          {!! Form::radio('discount_in_amount_or_percent', '1', (old('discount_in_amount_or_percent') == '1'),['class' => 'radio', 'ng-model'=>'promModel.discount_in_amount_or_percent'] ) !!}
                                          <span class="radio-label">B</span> 
                                        </label>  
                                        &nbsp;&nbsp;&nbsp;
                                        <label class="radio-wrap">
                                          {!! Form::radio('discount_in_amount_or_percent', '2', (old('discount_in_amount_or_percent') == '2'),['class' => 'radio', 'ng-model'=>'promModel.discount_in_amount_or_percent'] ) !!}
                                          <span class="radio-label">%</span>
                                        </label>
                                       &nbsp;&nbsp;&nbsp;

                                        <label class="radio-wrap">
                                          {!! Form::radio('discount_in_amount_or_percent', '3', (old('discount_in_amount_or_percent') == '3'),['class' => 'radio', 'ng-model'=>'promModel.discount_in_amount_or_percent'] ) !!}
                                          <span class="radio-label">Free</span> 
                                        </label> 
                                      </div>                                          
                                    </div> 
                                  </div>
                                  <!-- product selection table -->
                                  <input type="hidden" name="y_product_ids" id="y_prd_id" />
                                  <div class="gridtable-content" ng-if="prom_prd_y_active">
                                    <div class="" >
                                       @include('includes.gridtable')
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </form>
                   </div>
                </div>
            </div>
         </div>
    </div> 
</div>  

@stop

@section('footer_scripts')
  <script type="text/javascript" src="{{ Config::get('constants.js_url') }}promotion.js" ></script>
  @include('includes.gridtablejsdeps')
  <script src="{{ Config('constants.angular_url') }}libs/underscore-min.js"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/directive/catetreeDir.js"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/addProductXYPromotion.js"></script>
  <script type="text/javascript"> 
    ;(function($) {
      flatpickr("#custom_time_from, #custom_time_to", {
          enableTime: true,
          noCalendar: true,
          dateFormat: "h:i K",
      });  
    })(jQuery)
  </script>
       
@stop
