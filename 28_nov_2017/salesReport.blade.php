@extends('layouts.seller.default')
@section('header_styles') 
<link rel="stylesheet" type="text/css" href="{{ asset('TableDemo/assets/css/ui-grid-unstable.css')}}">
<style type="text/css">
   .chosen-container-single .chosen-search {
    	display: block;
    }
    .filter-report-row{display: none;}
</style>
<link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap-datepicker.css')}}" />
@stop
<!-- Content section start -->
@section('content')
<script>
    var dataJsonUrl = "{{action('Seller\SalesReportController@listData')}}";
    var fieldSetJsonUrl  = "{{ action('Seller\OrderShipmentController@searchData') }}";
    var pagelimit = "{{ action('JsonController@pageLimit') }}";
    var showSearchSection = false;
    var showHeadrePagination = true;
    var getAllDataFromServerOnce = true;
</script>
<section class="content sidebar-content ng-cloak" data-ng-app="tableApp" data-ng-controller="salesReportListController" ng-cloak>
	<div class="content-section">		
		<div class="content-mid">
			<div class="content-heading">
				<h2 class="seller-heading pull-left"><span>@lang('report.sales_report_by_order')</span></h2>
				
			</div>
			<div class="detail-box">		
				<div class="promotion-rulebox sales-reportbox">
					<form method="get" action="{{ action('Seller\SalesReportController@index') }}">
					<div class="form-row">
						<div class="column">
							<label>@lang('report.show_by')</label>
							<select name="showBy">
								<option value="day" @if(isset($_GET['showBy']) && $_GET['showBy']=='day') selected="selected" @endif>@lang('report.day')</option>
								<option value="week" @if(isset($_GET['showBy']) && $_GET['showBy']=='week') selected="selected" @endif>@lang('report.week')</option>
								<option value="month" @if(isset($_GET['showBy']) && $_GET['showBy']=='month') selected="selected" @endif>@lang('report.month')</option>
							</select>
						</div>
				
						@include('seller.report.dateCal')
						<div class="column">
							<label>@lang('report.date_range'):</label>
							<input name="fdate" id="fdate" type="text" value="{{ isset($_GET['showBy'])?$_GET['fdate']:'' }}" class="date-select">
						</div>
						<div class="column">
							<label>@lang('report.to')</label>
							<input name="todate" id="todate" value="{{ isset($_GET['showBy']) ? $_GET['todate'] :'' }}" type="text" class="date-select">
						</div>
						
					</div>
					
					@include('seller.report.attribute')
				
					<div class="btn-group-promo">
						<button type="submit" id="UpdateReport" class="btn-md btn-green">Update Report</button>
						<a href="{{ action('Seller\SalesReportController@index') }}" class="btn-md btn-skyblue">Reset</a>
					</div>
					
					</form>
				</div>

				<div class="chart-wrapper">
					{{-- <div google-chart chart="salerReoprtchart" style="height:600px; width:100%;"></div> --}}
					<div id="salerReoprtchart" style="height:300px;"></div>
					<!-- <a class="btn-md btn pull-right" id="export_link" target="_blank" href="">Save chart</a> -->
				</div>

				<div class="order-tab-content ng-cloak">
		            <div class="table-wrapper category-ship-table">
		             <!-- table select all btn panel  -->
		                <!--<div class="select-tag-btn" ng-if="tableSelectBtnConfig">
		                    <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectAllColumnFunAll('select')">Select All</a>
		                    <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectAllColumnFunAll('unselect')">Unselect All</a>
		                    <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectVisibleColumnsAll('visible')">Select Visible</a>
		                    <a href="javascript:void(0)" class="btn btn-md select-all" ng-click="selectVisibleColumnsAll('unVisible')">Unselect Visible</a>
		                    <span><%selectItemTotalAll%> Items selected</span>
		                </div>-->
		                <div class="filter-criteria" ng-show="tableFilterContainer && gridOptions.data.length">
		                    <div ng-repeat="field in $root.filedsSet"  ng-if="field.filterable == true" class="col-sm-3">
		                        <label><%field.fieldName.split('_').join(' ')%></label>
		                        <input type="text" placeholder="<%field.fieldName.split('_').join(' ')%>"  name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'single'"  ng-keyup="textChangeFunction(field.fieldName,$event)"/>
		                        <input type="text" placeholder="from" name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_From',$event)">
		                        <input type="text" placeholder="to" name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_To',$event)">
		                        <dropdown-multiselect model="filedSetModel[$index]"  name="<%field.fieldName%>" options="field.optionArr" ng-if="field.fieldType == 'selectbox' && field.optionValType == 'collection' && field.selectionType == 'multiple'"></dropdown-multiselect>
		                        <dropdown-multiselect model="filedSetModel[$index]"  name="<%field.fieldName%>" options="$rootScope.optionJsonArr[$index]" ng-if="field.fieldType == 'selectbox' && field.optionValType == 'url' && field.selectionType == 'multiple'"></dropdown-multiselect>
		                    </div>
		                        <div class="btn-row updbtn">
			                    <label class="hidden-xs">&nbsp;</label>
			                        <button type="button" class="btn  btn-md" ng-click="searchDataFromGrid()">
			                            @lang('order.search')
			                        </button>
			                    </div>
		                    
		                </div>

		                <div class="table-record-row" data-ng-show="gridOptions.data.length">    
		                	<span class="filter-action-icon" ng-show="tableFilterConfig" ng-click="tableFilterContainer = !tableFilterContainer"> <span class=""><img src="assets/images/filter.png" alt="" ></span> @lang('order.filters') </span>
		                    <span>@lang('order.total_records') <%displayTotalNumItems%></span>
		                    <div class="pull-right pager pagiTablet" ng-if="tableHeaderPaginationConfig">
		                        <dir-header-pagination></dir-header-pagination>
		                    </div>
		                </div>                
		                <div class="table table-responsive">
		                  <div id="sellerTable" data-ng-if="gridOptions.data.length>0" ui-grid="gridOptions" ui-grid-pagination="" class="tableWidth"  ui-grid-resize-columns ui-grid-selection ui-grid-move-columns ui-grid-draggable-rows ui-grid-save-state ui-grid-auto-resize ng-style="getTableHeight()"></div> 
		                  <div class="error-container" data-ng-bind-html="errorInfoLog | unsafe" data-ng-if="no_result_found"></div>
						  <div class="loder-wrapper" data-ng-if="showLoaderTable">
								<div class="loader loader-medium"></div>
						   </div>               
		                </div>  
		            </div>
		             <div class="pagination" data-ng-show="gridOptions.data.length">
		               	<pagination class="pagination-lg" total-items="gridOptions.totalItems" items-per-page="gridOptions.paginationPageSize" ng-model="gridOptions.paginationCurrentPage" max-size="10" rotate="false" boundary-links="true"></pagination>
		           	</div> 
	        	</div>

			</div>
		</div>

		<!-- help section start -->
		
		<!-- help section end -->

	</div>  
	<div class="push-content"></div>
</section>

@stop

@section('footer_scripts')
<script type="text/javascript" src="js/bootstrap-datepicker.js"></script>

<script type="text/javascript" src="{{ Config::get('constants.js_url') }}bootstrap.3.3.5.min.js"></script>
<script type="text/javascript" src="{{ Config::get('constants.js_url') }}bootstrap-tagsinput.0.8.0.min.js"></script>
<script type="text/javascript" src="{{ Config::get('constants.js_url') }}bootstrap3-typeahead.4.0.2.min.js"></script> 
<script type="text/javascript" src="//www.gstatic.com/charts/loader.js"></script>
{{-- <script type="text/javascript" src="https://www.google.com/jsapi"></script> --}}

<script type="text/javascript">
var search_email_url = '{{ action('AjaxController@getSuggestion','email') }}';
var search_country_url = '{{ action('AjaxController@getSuggestion','country') }}';
var search_sku_url = '{{ action('AjaxController@getSuggestion','sku') }}';
var search_product_url = '{{ action('AjaxController@getSuggestion','product') }}';
</script> 
<script src="{{ asset('js/report.js')}}"></script>
<!-- code for bootstrap-tag-input ended -->

<script src="{{ asset('TableDemo/assets/lib/angular/jquery-ui.min.js')}}"></script>
@include('includes.bloggerCatalogAppDep')
<script src="{{ asset('angular/seller/App/Controller/salesReportListController.js')}}"></script>
@stop
