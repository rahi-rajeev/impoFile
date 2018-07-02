@extends('layouts/admin/default')
@section('title')
    Varient List - {{getSiteName()}}
@stop
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 
  <link type="text/css" rel="stylesheet"  href="{{ Config('constants.css_url') }}sweetalert2.min.css" > 
    <script type="text/javascript">
        var dataJsonUrl = "{{action('Admin\Product\VariantController@listData', ['id'=>$main_product_detail->id])}}";
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";
        var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
        //pagination config 
        var pagination = {!! getPagination() !!};
        var per_page_limt = {{ getPagination('limit') }};
        var general_actions = {!! tableGeneralAction() !!};
        //for table tab active
        var currentActiveTab = "all";
    </script>
    
@if($main_product_detail->product_type=='configrable')
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/varientListCtrl.js"></script>
@else
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/bundleListCtrl.js"></script>
@endif

@stop
@section('content')
<div class="content">
        <div class="header-title">
          <div class="pull-right btn-groups">
          <a class="btn" href="{{action('Admin\Product\ProductController@index')}}"><< @lang('common.back')</a>
          <a class="btn" href="{{action('Admin\Product\ProductController@edit',$main_product_detail->id)}}">@lang('common.edit')</a>
          <a class="btn" target="_blank" href="{{getProductUrl($main_product_detail->url)}}">@lang('common.preview')</a>
            <a class="btn" href="{{action('Admin\Product\ProductController@create')}}">@lang('product.create_new_product')</a>
          </div>
        </div>
        <div class="content-wrap">
          <div class="row">
            <div class="col-sm-8">
              <div class="sal-req-img">
                <a href="javascript:void(0)">
                  
                  <!-- <img src="assets/images/seller-pic.jpg" alt=""> -->
                  
                
                  <!-- <img src="assets/images/seller-pic.jpg" alt=""> -->
                  <img ng-src="{{ getProductImageUrl($main_product_detail->thumbnail_image) }}" alt="" src="{{ getProductImageUrl($main_product_detail->thumbnail_image) }}"> 
                </a>
              </div>
              <div class="sal-req-detail">
                <div class="sal-detail-row">
                  @lang('product.product_name')   :  {{ $main_product_detail->getProductDetail->name or ''}}
                </div>
                <div class="sal-detail-row">
                  @lang('product.sku') : {{$main_product_detail->sku or ''}}
                </div>
                <div class="sal-detail-row">
                  @lang('product.product_type') : {{$main_product_detail->product_type or ''}}
                </div>
                <div class="sal-detail-row">
                 @lang('product.product_categories')  :  <b>{{$product_cat or ''}}</b>
                </div>


                <div class="sal-detail-row">
                  @lang('product.product_tag') : 
                  @foreach($tags_data as $tag)
                    <a href="javascript:void(0)" class="tag">{{$tag}}</a>
                  @endforeach
                </div>
              </div>
            </div>           
          </div>
        </div> 
        <div class="content-wrap">
       
          <ul class="nav nav-tabs lang-nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">All Products</a></li>
            {{-- <li><a data-toggle="tab" href="#menu1">Active</a></li> --}}
            
          </ul>

          <div class="tab-content language-tab">
            <div id="home" class="tab-pane fade in active">
              <div class="ng-cloak" data-ng-controller="gridtableCtrl" ng-cloak>
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
  
  <script>
   
        jQuery(document).ready(function(e){
            jQuery('#info-content-tab a').click(function(e){
                jQuery('#info-content').toggle(); 
            
            })
        })




  </script>
  
@stop