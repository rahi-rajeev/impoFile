@extends('layouts.seller.default')

	<!-- Content section start -->
<script>
  var apply_actions = '{!!json_encode($apply_actions)!!}';
  var pro_id = '{{ $result->id }}';
  var conditions_serialized = {!! $result->conditions_serialized !!};
  var customer_groups =  {!! json_encode($customer_groups_dropdown)!!}

  var pay_option =  {!! $pay_option !!};
  var shipping_profile = {!! $shipping_profile !!};
  var province_name  = {!! $province_name !!};
  var country_name = {!! $country_name !!};

  var dataJsonUrl = "{{ action('Seller\PromotionController@productlist') }}";
   var fieldSetJsonUrl  = "{{ action('Seller\PromotionController@searchData') }}";
   var pagelimit = "{{ action('JsonController@pageLimit') }}";
        //var showSearchSection = true;
   var showHeadrePagination = true;
        var getAllDataFromServerOnce = true;
        var user_type = "sellers";
        var product_ids = []; 

</script>

@section('header_styles')
<link rel="stylesheet" type="text/css" href="{{ asset('TableDemo/assets/css/ui-grid-unstable.css') }}" />
    <!--page level css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/vendors/datatables/css/dataTables.bootstrap.css') }}" />
    <link href="{{ asset('assets/css/pages/tables.css') }}" rel="stylesheet" type="text/css" />
    <!-- end of page level css -->
    <link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">


    <link href="{{asset('css/chosen.min.css')}}" type="text/css">
    <link rel="stylesheet" type="text/css" href="{{asset('css/chosen.css')}}">
    <link rel="stylesheet" href="{{asset('css/ng-tags-input.min.css')}}"/>
    <!-- <link rel="stylesheet" type="text/css" href="{{url('/')}}/css/bootstrap-datetimepicker.min.css" /> -->
    <link rel="stylesheet" type="text/css" href="{{asset('css/bootstrap-datepicker.css')}}" />
    
    <link rel="stylesheet" type="text/css" href="{{asset('css/chosen.css')}}">
    <link href="{{ asset('css/query-builder.default.css')}}" rel="stylesheet">
    
    
   @stop
  
	@section('content')
		

        <div ng-app="tableApp" ng-controller="PromotionAddEdit">

        

			 	
			 	<section class="content sidebar-content">

         <div class="row">
            <div class="col-sm-12">
                @if (Session::exists('message'))
                <div class="alert alert-success alert-dismissable margin5">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    {{Session::get('message')}}
                </div>
                @endif
            </div>
        </div>
	
					<div class="content-section">		
						<div class="content-mid">
							<div class="content-info-list">
								<ul>
									<li><h3>@lang('product.attribute_information')</h3></li>
									<li class="active">
										<a data-toggle="tab" href="#general">@lang('product.general')<i class="glyphicon glyphicon-pencil"></i></a>
									</li>
									<li>
										<a data-toggle="tab" href="#procondition">@lang('product.condition')<i class="glyphicon glyphicon-pencil"></i></a>
									</li>

									<li>
										<a data-toggle="tab" href="#proaction">@lang('product.action')<i class="glyphicon glyphicon-pencil"></i></a>
									</li>
									<li ng-if="dynamic.use_auto_generation == true">
										<a data-toggle="tab" href="#procoupon">@lang('product.coupon_code')<i class="glyphicon glyphicon-pencil"></i></a>
									</li>
								</ul>
							</div>             							
        					<div class="content-mid-right">
							    <div class="content-heading">
									<h2 class="seller-heading category-left-heading pull-left">
										<span>@lang('product.edit_promotion')</span>
									</h2>
								</div>

								<form name="sellerpromotionform" method ="POST" id="sellerpromotionform" action="{{action('Seller\PromotionController@update', [$result->id])}}">

								{{ csrf_field() }}

                 <input name="_method" type="hidden" value="PUT">

        						   <div class="tab-content">
								        <div id="general" class="tab-pane in active">
								          <div class="detail-box product-detail-create" >

                          

                                            <!--div class="row"><h3>Rule Infomartion</h3></div-->

								        	<div class="row">
                              <div class="form-row">
                                <div class="col-sm-4">
                                 <label>@lang('product.promotion_name')<span class="star-top">*</span></label>
                                   {!! Form::text('rule_name', old('rule_name'), ['placeholder'=>'10% Discount Coupon', 'ng-model'=>'rule_name'] ) !!}

                                 </div>
                              </div>
                              <div class="form-row">
                               <div class="col-sm-3">
                                  <label>Active <span class="star-top">*</span></label>
                                   {!! Form::select('status', [],  $result->status, ['ng-model'=>'status', 'ng-options'=> 'template.name for template in statusdropdown.configs track by template.value']) !!}
                               </div>

                               @if ($errors->has('rule_name'))
                                   <p id="rule_name-error" class="error error-msg">{{ $errors->first('rule_name') }}</p>
                                @endif
                              </div>
                              <div class="form-row">
                                  <div class="col-sm-4">
                                      <label>@lang('product.priority')</label>
                                        <!-- {!! Form::text('menu_order', old('menu_order'), ['placeholder'=>'1', 'ng-model'=>'menu_order'] ) !!} -->
                                        <div class="qty-form-input spinner">  
                                        {!! Form::text('menu_order', old('menu_order'), ['placeholder'=>'1', 'ng-model'=>'menu_order', 'ng-pattern'=>'/^\d{0,9}(\.\d{1,2})?$/' ] ) !!}
                                        <i class="glyphicon glyphicon-triangle-top" ng-click="menu_order = menu_order+1;"></i>
                                        <i class="glyphicon glyphicon-triangle-bottom" ng-click="(menu_order!=0)?menu_order = menu_order-1 : false"></i>
                                      </div>
                                  </div>
                              </div>
                                    
                          </div>
                                <div class="form-row row" ng-if="!edit">
                                   <div class="col-sm-8">
                                      <label>Description<span class="star-top">*</span></label>
                                        {!! Form::textarea('description', old('description'), ['ng-model'=>'description']) !!}

                                        @if ($errors->has('description'))
                                          <p id="description-error" class="error error-msg">{{ $errors->first('description') }}</p>
                                        @endif
                                   </div> 
                                 </div>
                                  <div class="mt-5">

                                  {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'label', 'label'=>'Promotiom Label<span class="star-top">*</span>', 'errorkey'=>'promotiom_label']],'1', $errors)!!}
                                  </div>
                                   
                                    <div class="form-row">
                                         <label>For Customer Groups <span class="star-top">*</span></label>
                                        <select ng-model="customer_group_id"  name="customer_group_id[]" size="5" multiple="multiple" ng-options=" customer_group.name for  customer_group in customer_groups track by customer_group.id">

                                                 </select>
                                                  @if ($errors->has('group'))
                                                        <p id="customer_group_id-error" class="error error-msg">{{ $errors->first('group') }}</p>
                                                  @endif
                                               
                                                </div>

                                                <div class="row form-row">
			                    				<div class="col-sm-3 date">
													<label>Date From/Time<span class="star-top">*</span></label>
													<input type="text" id ="date-from" name="from_date" ng-model="from_date" class="date-select" readonly="readonly" >
												 @if ($errors->has('from_date'))
                            <p id="from_date-error" class="error error-msg">{{ $errors->first('from_date') }}</p>
                         @endif
												</div>
												<div class="col-sm-3 date">
													<label>Expire Date From/Time<span class="star-top">*</span></label>
													<input type="text" id ="date-to" name="to_date" ng-model="to_date" class="date-select" readonly="readonly">

													@if ($errors->has('to_date'))
                            <p id="from_date-error" class="error error-msg">{{ $errors->first('to_date') }}</p>
                          @endif
												</div>
												</div>

                        <div class="row form-row">
                        <div class="col-sm-6">
                          <label>Uses per Customer</label>
                            <div class="qty-form-input spinner">
                                  <input id="uses_per_customer" name="uses_per_customer" ng-model='uses_per_customer'  class="form-control input-text qty" type="text" ng-pattern="/^\d{0,9}(\.\d{1,2})?$/"  required value="{{$result->uses_per_customer}}">
                                    <i class="glyphicon glyphicon-triangle-top" ng-click="uses_per_customer = uses_per_customer+1;"></i>
                                    <i class="glyphicon glyphicon-triangle-bottom" ng-click="(uses_per_customer!=0)?uses_per_customer = uses_per_customer-1 : false"></i>
                            </div> &nbsp; &nbsp;
                            <span class="inline-block mt-5">
                               <label class="check-wrap">
                             {!! Form::checkbox('uses_per_customer_no_limit', 1, false, ['class' => 'checkbox', 'id'=>'uses_per_customer_no_limit', 'aria-required'=>'true', 'aria-describedby'=>'maximum_promotion_uses-error', 'aria-invalid'=>'true', 'ng-model'=>'dynamic.uses_per_customer_no_limit'] ) !!}  

                               <span class="chk-label">
                                 {{ Lang::get('product.no_limit') }}
                               </span> 
                            </label>
                            </span>
                        </div>
          
                           @if ($errors->has('uses_per_customer'))
                                    <p id="uses_per_customer-error" class="error error-msg">{{ $errors->first('uses_per_customer') }}</p>
                           @endif

                      </div>

                      <div class="row form-row">
                        <div class="col-sm-4">
                          <label>Maximum Promotion Uses
                          </label>
                            <div class="qty-form-input spinner">
                                  <input id="maximum_promotion_uses" name="maximum_promotion_uses" ng-model='maximum_promotion_uses'  class="form-control input-text qty" type="text" ng-pattern="/^\d{0,9}(\.\d{1,2})?$/"  required>
                                    <i class="glyphicon glyphicon-triangle-top" ng-click="maximum_promotion_uses = maximum_promotion_uses+1;"></i>
                                    <i class="glyphicon glyphicon-triangle-bottom" ng-click="(maximum_promotion_uses!=0)?maximum_promotion_uses = maximum_promotion_uses-1 : false"></i>
                            </div> &nbsp; &nbsp;
                            <span class="inline-block mt-5">
                              <label class="check-wrap">
                               {!! Form::checkbox('maximum_promotion_uses_no_limit', 1, false, ['class' => 'checkbox', 'id'=>'maximum_promotion_uses_no_limit', 'aria-required'=>'true', 'aria-describedby'=>'maximum_promotion_uses_no_limit-error', 'aria-invalid'=>'true', 'ng-model'=>'dynamic.maximum_promotion_uses_no_limit'] ) !!}  

                                <span class="chk-label">
                                     {{ Lang::get('product.no_limit') }}
                                  </span> 
                              </label>
                            </span>
                        </div>                        

                      </div>


                       <div class="form-row">
                          <label>Do you want to use coupon or not</label>
                          <div class="form-row">
                             <label class="radio-wrap">
                              {!! Form::radio('coupon_type', '2', (old('coupon_type') == '2'),['class' => 'radio', 'ng-model'=>'coupon_type', 'ng-checked' => 'coupon_type == 2'] ) !!}
                              <span class="radio-label">No Coupon</span> 
                            </label>
                          </div>
                            
                          <div class="form-row">
                            <label class="radio-wrap">
                              {!! Form::radio('coupon_type', '1', (old('coupon_type') == '1'),['class' => 'radio', 'ng-model'=>'coupon_type', 'ng-checked' => 'coupon_type == 1'] ) !!}
                              <span class="radio-label">Coupon</span> 
                            </label>
                         </div>   



                      </div>
                      <div ng-if="coupon_type == 1">
                         <div class="form-row" >
    						                {!! Form::checkbox('use_auto_generation', 1, false, ['class' => 'checkbox', 'id'=>'use_auto_generation', 'aria-required'=>'true', 'aria-describedby'=>'use_auto_generation-error', 'aria-invalid'=>'true', 'ng-model'=>'dynamic.use_auto_generation', 'ng-checked'=>'dynamic.use_auto_generation==1'] ) !!}
    						                {!! Form::label('use_auto_generation', 'Multiple coupon code', ['class'=>'checkbox-label']) !!}	
    									   </div>
                         <div class="form-row" ng-if="dynamic.use_auto_generation != true">

                           <label>Coupon Code (for one coupon) <span class="star-top">*</span></label>
                                   {!! Form::text('coupon_code', old('coupon_code'), ['ng-model'=>'dynamic.coupon_code']) !!}
                                       @if ($errors->has('coupon'))
                                          <p id="description-error" class="error error-msg">{{ $errors->first('coupon') }}</p>
                                   @endif

                            
                         </div>

                         <div class="form-row row">
                           <div class="col-sm-6">
    											   <label>User per Coupon<span class="star-top">*</span></label>
    												 <div class="qty-form-input spinner">
      							                <input id="user_per_coupon" name="user_per_coupon" ng-model='user_per_coupon'  class="form-control input-text qty" type="text" ng-pattern="/^\d{0,9}(\.\d{1,2})?$/"  required>
      			                        <i class="glyphicon glyphicon-triangle-top" ng-click="user_per_coupon = user_per_coupon + 1;"></i>
      			                        <i class="glyphicon glyphicon-triangle-bottom" ng-click="(user_per_coupon!=0)? user_per_coupon = user_per_coupon -1 : false"></i>
    			                      </div> &nbsp; &nbsp;
                                <span class="inline-block mt-5">
                                   <label class="check-wrap">

                                   {!! Form::checkbox('user_per_coupon_no_limit', 1, false, ['class' => 'checkbox', 'id'=>'user_per_coupon_no_limit', 'aria-required'=>'true', 'aria-describedby'=>'user_per_coupon-error', 'aria-invalid'=>'true', 'ng-model'=>'dynamic.user_per_coupon_no_limit'] ) !!}  

                                  <span class="chk-label">
                                     {{ Lang::get('product.no_limit') }}
                                  </span> 

                                </label> 
                                </span>

                                @if ($errors->has('user_per_coupon'))
                                     <p id="uses_per_customer-error" class="error error-msg">{{ $errors->first('user_per_coupon') }}</p>
                                @endif
                          </div>
                             

    		                 </div>

                        </div>
                         <input type="submit" name="save" class="btn-skyblue btn-md parse-json mt-5" value="Save Promotion">
											</div>

								  </div>

						      <div id="procondition" class="tab-pane in">
								     <div class="detail-box product-detail-create" >
                        <div class="row"><h3>Rule Condition</h3></div>
                         <div id="builder"></div>

                             <input type="hidden" name="conditions_serialized" id="conditions_serialized" value="">
                               <input type="submit" name="save" class="btn-skyblue btn-md parse-json mt-10" value="Save Promotion">    

                        </div>
                       </div>

                                  <div id="proaction" class="tab-pane in">
								                     <div class="detail-box product-detail-create">
                                       <div class="row1"><label>Set Action</label></div>
                                        <div class="form-row">
                                             <label class="radio-wrap">
                                                  {!! Form::radio('apply_action', '1', (old('apply_action') == '1'),['class' => 'radio', 'ng-model'=>'dynamic.apply_action', 'ng-checked'=>'dynamic.apply_action == 1'] ) !!}
                                                  <span class="radio-label">Discount per Item</span> 
                                                </label>
                                           </div>       
                                          <div class="form-row">
                                              <label class="radio-wrap">
                                                {!! Form::radio('apply_action', '2', (old('apply_action') == '2'),['class' => 'radio', 'ng-model'=>'dynamic.apply_action', 'ng-checked'=>'dynamic.apply_action == 2'] ) !!}
                                                <span class="radio-label">Discount for whole cart</span> 
                                              </label>

                                              @if ($errors->has('apply_action'))
                                                <p id="apply_action-error" class="error error-msg">{{ $errors->first('apply_action') }}</p>
                                              @endif     
                                         </div>
                                         <div class="form-row">
                                            <label>Discount Amount<span class="star-top">*</span></label>
                                               {!! Form::text('discount_amount', old('discount_amount'), [ 'ng-model'=>'discount_amount'] ) !!}
                                          </div>
                                          <div class="form-row">
                                                   <div class="discount_in_amount_or_percent">
                                                   <label class="radio-wrap">
                                                    {!! Form::radio('discount_in_amount_or_percent', '1', (old('discount_in_amount_or_percent') == '1'),['class' => 'radio', 'ng-model'=>'discount_in_amount_or_percent', 'ng-checked'=>'dynamic.discount_in_amount_or_percent == 1'] ) !!}
                                                    <span class="radio-label">B</span> 
                                                  </label>

                                                  <label class="radio-wrap">
                                                    {!! Form::radio('discount_in_amount_or_percent', '2', (old('discount_in_amount_or_percent') == '2'),['class' => 'radio', 'ng-model'=>'discount_in_amount_or_percent', 'ng-checked'=>'dynamic.discount_in_amount_or_percent == 2'] ) !!}
                                                    <span class="radio-label">%</span> 
                                                  </label>
                                                  </div>


                                               @if ($errors->has('discount_amount'))
                                                    <p id="discount_amount-error" class="error error-msg">{{ $errors->first('discount_amount') }}</p>
                                                @endif
                                            </div>

                                            <div class="form-row">
                                                <label>Maximum Qty Discount is Applied To<span class="star-top">*</span></label>
                                                   {!! Form::text('max_qty_discount', old('max_qty_discount'), ['ng-model'=>'max_qty_discount'] ) !!}
                                                
                                               @if ($errors->has('max_qty_discount'))
                                                    <p id="max_qty_discount-error" class="error error-msg">{{ $errors->first('max_qty_discount') }}</p>
                                                @endif
                                            </div>
                                            
                                             <div class="form-row" ng-if='dynamic.apply_action == 1'>
                                                  <label>Discount Qty Step<span class="star-top">*</span></label>
                                                     {!! Form::text('discount_qty_step', old('discount_qty_step'), [ 'ng-model'=>'discount_qty_step'] ) !!}
                                                  
                                                 @if ($errors->has('discount_quantity_step'))
                                                      <p id="dis_qty_step-error" class="error error-msg">{{ $errors->first('discount_quantity_step') }}</p>
                                                  @endif
                                            </div>
                                             <div class="form-row">
                                                  <label>Free Shipping<span class="star-top">*</span>

                                                  <label class="radio-wrap">
                                                    {!! Form::radio('apply_to_free_shipping', '1', (old('apply_to_free_shipping') == '1'),['class' => 'radio', 'ng-model'=>'apply_to_free_shipping','ng-checked'=>'dynamic.apply_to_free_shipping == 1'] ) !!}
                                                    <span class="radio-label">Yes</span> 
                                                  </label>

                                                  <label class="radio-wrap">
                                                    {!! Form::radio('apply_to_free_shipping', '2', (old('apply_to_free_shipping') == '2'),['class' => 'radio', 'ng-model'=>'apply_to_free_shipping', 'ng-checked'=>'dynamic.apply_to_free_shipping == 2'] ) !!}
                                                    <span class="radio-label">No</span> 
                                                  </label>

                                          </div>

                                          <div class="form-row">
                                                  <label>Stop Rules Processing<span class="star-top">*</span>

                                                  <label class="radio-wrap">
                                                    {!! Form::radio('stop_rules_processing', '1', (old('stop_rules_processing') == '1'),['class' => 'radio', 'ng-model'=>'stop_rules_processing', 'ng-checked'=>'dynamic.stop_rules_processing == 1'] ) !!}
                                                    <span class="radio-label">Yes</span> 
                                                  </label>

                                                  <label class="radio-wrap">
                                                    {!! Form::radio('stop_rules_processing', '2', (old('stop_rules_processing') == '2'),['class' => 'radio', 'ng-model'=>'stop_rules_processing', 'ng-checked'=>'dynamic.stop_rules_processing == 2'] ) !!}
                                                    <span class="radio-label">No</span> 
                                                  </label>
                                          </div>

                                        <div class="form-row">
                                           <label>@lang('product.apply_action_for_products')</label>

                                         {!! Form::select('product_action_condition', [],  null, ['ng-model'=>'product_action_condition', 'ng-options'=> ' template.name for template in dynamic.product_action_conditions track by template.value']) !!}

                                        
                                          <input type="hidden" name="product_ids" id="product_ids" value="">
                                        </div>

                                        <div class="form-row">
                                              <hr/>
                                  </div>

                                  <div class="form-row">

                                      <div class="blog-box">
                                              <div class="detail-box"  ng-clock>
                                                   <div class="table-wrapper category-ship-table">
                                            <!-- table select all btn panel  -->
                                            <div class="select-tag-btn" ng-if="tableSelectBtnConfig">
                                              <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectAllColumnFunAll('select')">Select All</a>
                                              <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectAllColumnFunAll('unselect')">Unselect All</a>
                                              <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectVisibleColumnsAll('visible')">Select Visible</a>
                                              <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectVisibleColumnsAll('unVisible')">Unselect Visible</a>
                                              <span><%selectItemTotalAll%> Items selected</span>
                                  </div>

                                <div class="filter-criteria" ng-show="tableFilterContainer">
                                    <div ng-repeat="field in $root.filedsSet"  ng-if="field.filterable == true" class="col-sm-3">
                                        <!-- <label><%field.fieldName%></label> -->
                                        <label>Product Name</label>
                                        <input type="text" placeholder="<%field.fieldName.split('_').join(' ')%>"  name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'single'"  ng-keyup="textChangeFunction(field.fieldName,$event)"/>
                                        <input type="text" placeholder="from" name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_From',$event)">
                                        <input type="text" placeholder="to" name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_To',$event)">
                                        <!---selection type single and value type collection--->
                                        <select ng-model="filedSetModel[$index]" ng-options="opt.value for opt in field.optionArr"  ng-if="field.fieldType == 'selectbox' && field.optionValType == 'collection' && field.selectionType == 'single'" ng-change="filterSelectBoxChange(filedSetModel[$index],field.fieldName)"></select>
                                        <!--- selection type single and value type url--
                                        <select ng-model="filedSetModel[$index]" ng-if="field.fieldType == 'selectbox' && field.optionValType == 'url' && field.selectionType == 'single'" ng-options="opt.value for opt in $root.optionJsonArr[$index]"  ng-change="filterSelectBoxChange(filedSetModel[$index],field.fieldName)">
                                            <option value="">Please Select..</option>
                                        </select>
                                        <!----- selection type multiple and value type url ------>
                                        <dropdown-multiselect model="filedSetModel[$index]"  name="<%field.fieldName%>" options="field.optionArr" ng-if="field.fieldType == 'selectbox' && field.optionValType == 'collection' && field.selectionType == 'multiple'"></dropdown-multiselect>
                                        <!--- selection type multiple and value type collection---->
                                        <dropdown-multiselect model="filedSetModel[$index]"  name="<%field.fieldName%>" options="$rootScope.optionJsonArr[$index]" ng-if="field.fieldType == 'selectbox' && field.optionValType == 'url' && field.selectionType == 'multiple'"></dropdown-multiselect>
                                    </div>
                                    <div class="btn-row">
                                        <button type="button" class="btn  btn-md" ng-click="searchDataFromGrid()">
                                            Search
                                        </button>
                                    </div>
                                </div>

                                <div class="table-record-row">                                  
                                    <!--select ng-model="actionSelectBox" ng-change="actionOnDataGrid()" ng-options="option.name for option in actioOptions" ng-init="actionSelectBox= actioOptions[0]">
                                    </select-->
                                    <!--button type="button" class="btn-md btn-skyblue" ng-show="selBoxActBtn" ng-click="actionBtnClick()">Submit</button-->
                                    <span class="filter-action-icon" ng-show="tableFilterConfig" ng-click="tableFilterContainer = !tableFilterContainer"> <span class=""><img src="assets/images/filter.png" alt="" ></span> Filters </span>
                                    <span>Total Records  <%displayTotalNumItems%></span>
                                    <div class="pull-right pager" ng-if="tableHeaderPaginationConfig">
                                        <dir-header-pagination></dir-header-pagination>
                                    </div>
                                </div>                
                                
                                <div class="table">
                                  <div id="sellerTable" data-ng-if="gridOptions.data.length" ui-grid="gridOptions" ui-grid-pagination="" class="tableWidth"  ui-grid-resize-columns ui-grid-selection ui-grid-move-columns ui-grid-draggable-rows ui-grid-save-state ui-grid-auto-resize data-ng-style="getTableHeight()"></div>               
                                </div>                  
                               </div>
                               <div class="pagination" data-ng-show="gridOptions.data.length">
                                    <pagination class="pagination-lg" total-items="gridOptions.totalItems" items-per-page="gridOptions.paginationPageSize" ng-model="gridOptions.paginationCurrentPage" max-size="10" rotate="false" boundary-links="true"></pagination>
                                </div>
                                 </div>
                              </div>
                          
                            </div>  
                                 <div class="form-row">     
                                        <input type="submit" name="save" class="btn-skyblue btn-md parse-json" value="Save Promotion"> 
                                  </div>
                                    </div>
                            </div>
                                 <div id="procoupon" class="tab-pane in">
								                       <div class="detail-box product-detail-create">
                                           <div class="row"><h3>Coupon Information</h3></div>
                                             
                                            <div class="use_auto_generation" ng-if="dynamic.use_auto_generation">

	                                             <div class="form-row">
	                                                    <label>Coupon Qty</label>
	                                                       {!! Form::text('coupon_qty', old('coupon_qty'), ['placeholder'=>'5'] ) !!}
	                                             </div>

	                                             <div class="form-row">
	                                                    <label>Code Length</label>
	                                                       {!! Form::text('code_length', old('code_length'), ['placeholder'=>'10', 'value'=>'10'] ) !!}
	                                             </div>

	                                             <div class="form-row">
	                                                    <label>Coupon Format</label>

	                                                       {!! Form::select('coupon_format', [],  null, ['ng-model'=>'coupon_format', 'ng-options'=> 'template.name for template in dynamic.coupon_formats track by template.value']) !!}
	                                             </div>

	                                            

	                                              <div class="form-row">
	                                                    <label>Code Prefix</label>
	                                                       {!! Form::text('code_prefix', old('code_prefix'), ['placeholder'=>''] ) !!}
	                                             </div>


	                                             <div class="form-row">
	                                                    <label>Code Suffix</label>
	                                                       {!! Form::text('code_suffix', old('code_suffix'), ['placeholder'=>''] ) !!}
	                                             </div>

	                                              <div class="form-row">
	                                                    <label>Dash Every X Characters</label>
	                                                       {!! Form::text('dash_every_x_characters', old('dash_every_x_characters'), ['placeholder'=>''] ) !!}
	                                             </div>


                                           </div>
                                       <div class="form-row">

                                           <input type="submit" name="save" class="btn-skyblue btn-md parse-json" value="Generate Coupon">
                                       </div>

                                       
                                           <div class="form-row">
                                             <hr/>
                                           </div>
                                           <div class="form-row">
                                                <input type="submit" name="deleteall" class="btn-skyblue btn-md  pull-right" value="All Delete">
                                                <input type="submit" name="deleteselected" class="btn-skyblue btn-md pull-right" value="Selected Delete">
                                            </div>                                                
                                             <table class="table table-bordered " id="table">
                                                <thead>
                                                    <tr class="filters">
                                                         <th><input type="checkbox" name="check_all"  id="check_all"></th>
                                                         <th>Sno</th>
                                                          <th>Code</th>
                                                          <th>Used</th>
                                                          <th>Create at</th>
                                                          <th>Quota</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                  @php( $i = 0)
                                                    @foreach($result->promotionRuleCoupon as $res)
                                                      <tr>
                                                         <td align="center"><input type="checkbox" name="coupons_id[]" value="{{$res->id}}"></td>
                                                          <td>{!! ++$i !!}</td>
                                                          <td>{!! $res->code !!}</td>
                                                          <td>{!! $res->times_used !!}</td>
                                                          <td>{!! $res->created_at !!}</td>
                                                          <td>{!! $res->user_per_coupon !!}</td>


                                                      </tr> 
                                                     @endforeach
                                                
                                                   </tbody>
                                             </table>

                                         
                                 </div>
                                   
                              </div>
                              
								 </form>

							</div>
						</div>

						<!-- help section start -->
						<div class="help-content visible-lg">
							<h3><span class="question-icon">?</span> Help</h3>
							<div class="help-row">
								<h3>Product Details</h3>
								<p>Specify what category this product  falls under in your product catalogue. </p>
								<p><span class="example"> EXAMPLE </span> Men's T-Shirts, Women's Accessories, Sports Shoes. Specify what category this product falls under in your product catalogue.</p>
							</div>
							<div class="help-row">
								<h3>Product Advance Setting</h3>
								<p>Specify what category this product falls under in your product catalogue. </p>
								<p><span class="example"> EXAMPLE </span> Men's T-Shirts, Women's Accessories, Sports Shoes. Specify what category this product falls under in your product catalogue.</p>
							</div>
						</div> 
						<!-- help section end -->
						<div class="push-content"></div>
					
				</section>

	 </div>

@stop
@section('footer_scripts')

<script type="text/javascript" src="{{ asset('/js/bootstrap-datepicker.js')}}"></script>
<script src="{{ asset('/node_modules/Query-Builder/dist/js/query-builder.standalone.js')}}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/datatables/js/jquery.dataTables.js') }}"></script>
    <script type="text/javascript" src="{{ asset('assets/vendors/datatables/js/dataTables.bootstrap.js') }}"></script>
 <script type="text/javascript" src="{{ Config::get('constants.js_url') }}promotion.js" >   

 <script src="{{ asset('js/angular.js')}}"></script>
      <script src="{{ asset('angular/seller/App/Directive/pagination.js')}}"></script>
     <script src="{{ asset('angular/seller/App/Directive/dropdownDir.js')}}"></script>
     <script src="{{ asset('TableDemo/assets/lib/angular/ui-grid.js')}}"></script>
     <script src="{{ asset('TableDemo/assets/lib/angular/draggable-rows.js')}}"></script>
     <script src="{{ asset('js/ng-tags-input.js') }}" type="text/javascript"></script>
     <script src="{{ asset('angular/admin/App/Model/app.js')}}"></script>
     <script src="{{ asset('angular/seller/App/Directive/singleInputBoxDir.js')}}"></script>
     <script src="{{ asset('angular/seller/App/Service/table_service.js')}}"></script>
     <script src="{{ asset('angular/seller/App/Controller/PromotionController.js') }}" type="text/javascript"></script> 
    
 

@stop
