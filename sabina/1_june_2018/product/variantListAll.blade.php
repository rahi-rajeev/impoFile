@extends('layouts/admin/default')
@section('title')
    All Varients - {{getSiteName()}}
@stop
@section('header_styles')
@stop
@section('content')
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 
    <link type="text/css" rel="stylesheet"  href="{{ Config('constants.css_url') }}sweetalert2.min.css" > 

    <script type="text/javascript">
        var dataJsonUrl = "{{action('Admin\Product\VariantController@allVariantListData')}}";
        //var fieldSetJson = "{{action('Admin\Product\VariantController@varinatListHeadingData')}}"
        var change_status_url = "{{action('Admin\Product\ProductController@changeStatus')}}";

        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
        //pagination config 
        var general_actions = {!! tableGeneralAction() !!};
        var pagination = {!! getPagination() !!};
        var per_page_limt = {{ getPagination('limit') }};
        //for table tab active
        var currentActiveTab = "all";
    </script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/productList.js"></script>

<div class="content" data-ng-controller="gridtableCtrl" ng-cloak>
        <div class="header-title">
          <div class="pull-right btn-groups">
            <a class="btn" href="{{action('Admin\Product\ProductController@create')}}">@lang('attribute.create_new_product')</a>
          </div>
        </div>


        <div class="content-wrap">
       
          <ul class="nav nav-tabs lang-nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">All Varients</a></li>
            {{-- <li><a data-toggle="tab" href="#menu1">Active</a></li> --}}
            
          </ul>

          <div class="tab-content language-tab">
            <div id="home" class="tab-pane fade in active">
              <div class="ng-cloak" >
                <div class="">
                   @include('includes.gridtable')
                </div>
              </div>
            </div>
          </div>
        </div>
        
</div>
@stop
@section('footer_scripts') 
  @include('includes.gridtablejsdeps')
  <script src="{{ Config('constants.js_url') }}SweetAlert.min.js" type="text/javascript"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/allVaiantListingTable.js"></script>
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
  </script>
  
@stop