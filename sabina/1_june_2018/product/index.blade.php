@extends('layouts/admin/default')
@section('title')
  @lang('product.product') - {{getSiteName()}}
@stop
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 
  <link type="text/css" rel="stylesheet"  href="{{ Config('constants.css_url') }}sweetalert2.min.css" > 
  <link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}ng-tags-input.min.css">
@stop
@section('content')

    <script type="text/javascript">
        var dataJsonUrl = "{{ action('Admin\Product\ProductController@productListData') }}";
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";
        var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
        //pagination config 
        var pagination = {!! getPagination() !!};
        var per_page_limt = {{ getPagination('limit') }};
        var general_actions = {!! tableGeneralAction() !!};
       
        //filter tab data set
        var filterOptionJson = {!! $addfilterdata !!};
        
        var filterTab =  {!! $filterArrFinal !!};
        //var filter_action_url = "{{ action('Admin\Newsletter\NewsletterController@createtab') }}";  
        var filter_action_url = "{{ action('Admin\Product\ProductController@createtab') }}";  
        //var filter_delete_url = "{{ action('Admin\Newsletter\NewsletterController@deletefiltertab') }}";
        var filter_delete_url = "{{ action('Admin\Product\ProductController@deletefiltertab') }}";
        var filter_tab_page = "filterTabPage";
        var change_status_url = "{{action('Admin\Product\ProductController@changeStatus')}}";
        var actionUrl = "{{ action('Admin\Product\ProductController@bulkAction') }}"; 
        var actionOptions   = {!! getBulkActionOption() !!};
        var product_image_url = "{{Config::get('constants.product_thumb185185_url')}}";
        //for save table structure
        var save_table_setting_url = "{{ $tableSettingUrl }}";
        //for table tab active
        var currentActiveTab = "all";
        
    </script>
    <style>

  </style>
<div class="content" data-ng-controller="gridtableCtrl" ng-cloak>
        <div class="header-title">
          <span class="pull-left">
                <h1 class="title">@lang('product.product')</h2>
            </span>
          <div class="pull-right btn-groups">
            
            <span class="pull-right">
                <a class="btn ecport_rates" href="javascript:void(0)" onClick="exportProduct()"> Export Product</a>
            </span>
            <a class="btn" href="{{action('Admin\Product\ProductController@create')}}">@lang('product.create_new_product')</a>
          </div>
        </div>
        <div class="content-wrap">       
            <ul class="nav nav-tabs lang-nav-tabs">
              <li class="active"><a data-toggle="tab" href="#home" data-ng-click="enableTab('all')">@lang('product.all_products')</a></li>
              <li class="add-filter1" data-ng-repeat="ftab in filterTab track by $index">
                <a  href="#tab3_<%$index%>" data-toggle="tab" aria-expanded="false" data-ng-click="enableTab('filter_tab',ftab)">
                  <span ng-if="$index!== $last"> <%ftab.filter_model.filter_name%> </span>
                  <span ng-if="$last"> Add New Filter </span>
                  <i class="glyphicon glyphicon-menu-down"></i>
                </a>
              </li>
            </ul>

            <div class="tab-content language-tab">
              <div id="home" class="tab-pane fade in active">
                <div class="ng-cloak">
                  <div class="">
                     @include('includes.gridtable')
                  </div>
                </div>
              </div>
              @include('includes.filter_tab')          
            </div>
        </div>

        
</div>
@stop
@section('footer_scripts') 
  @include('includes.gridtablejsdeps')
  <script src="{{ Config('constants.js_url') }}SweetAlert.min.js" type="text/javascript"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/productList.js"></script>

  <script>  
        jQuery(document).ready(function(e){
            jQuery('#info-content-tab a').click(function(e){
                jQuery('#info-content').toggle(); 
            
            })
        })


        //For table action on status change by user
        function _changeStatusHandler($event, rowstatus, rowid, rowIndex, _scope, salesfactoryData){
          var data = {'status': rowstatus,'id':rowid};

          _scope.$evalAsync(function(){
              _scope.showLoaderTable = true;
          });
          
          salesfactoryData.getData(change_status_url,'POST',data)
          .then(function(response) {
            var data = response.data;
            if(data!==undefined && data.status === "success"){
              _scope.$evalAsync(function(){
                _scope.gridOptions.data[rowIndex].status = data.vstatus;
                swal("Done", data.mesg, data.status);
              });                  
            }                
          },function(error){
            //
          }).finally(function(){
             _scope.$evalAsync(function(){
                _scope.showLoaderTable = false;               
             });
          });                  
        }



        function exportProduct(){
         swal({
              title: 'Select Product Type to Export',
              input: 'select',
              inputOptions: {
                '1': 'Normal',
                '2': 'Configurable',
                '3': 'Bundle'
              },
              inputPlaceholder: 'Please Choose Type',
              showCancelButton: true,
              inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                  if (value !== '') {
                    resolve();
                  } else {
                    reject('You need to select product type.');
                  }
                });
              }
            }).then(function (result) {
             if(result==1){
               document.location.href ="{{action('Admin\Product\ExportController@exportProduct',1)}}";
             }
             if(result==2){
              document.location.href ="{{action('Admin\Product\ExportController@exportProduct',2)}}";

             }
             if(result==3){
              document.location.href ="{{action('Admin\Product\ExportController@exportProduct',3)}}";

             }
              // swal({
              //   type: 'success',
              //   html: 'You selected: ' + result
              // });
            });
        }
  </script>
  
@stop