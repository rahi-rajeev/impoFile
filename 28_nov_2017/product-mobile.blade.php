@extends('layouts.checkout')
@include('includes.productDetailsVariable')
<script>
  /***for related product****/
  var page = "marketplace";
  var getAllDataFromServerOnce = true;
  var updateStatusUrl = "{{action('Seller\ShippingProfileController@updateStatus')}}";
  var upload_url = "{{Config::get('constants.cart_option_url')}}";
  var productData = {!! $dataArray !!};
  var varientInfo = productData.varientInfo;
  var prdBlogUrl = (productData.productInfo.prdType=='product')?"{{ Config::get('constants.product_url')}}":"{{ Config::get('constants.blog_url')}}";
  var nonSalableProductUrl = "{{action('Seller\ProductDetailController@contactNonSalableProduct')}}";
  var colorPath = "{{Config::get('constants.color_url')}}";
 </script>
@section('header_style')
<link rel="stylesheet" type="text/css" href="{{ asset('css/slick.css') }}"/>
 <script type="application/ld+json">
   {!!$richTextSnippetjson!!}
</script>
@stop
<input type="hidden" id="upload_path" value="{{Config::get('constants.cart_option_path')}}">
<input type="hidden" id="upload_url" value="{{Config::get('constants.cart_option_url')}}">
@section('content')
<!-- Content section start -->
<section class="content-wrapper product-section ng-clock" data-ng-app="buyerHomePageApp" data-ng-controller="productDisplayCtrl as rvCtrl" ng-cloak>
<div class="productOpc" data-ng-hide="!styleopacity"></div>
<!-- Breadcum section start here -->
{!! Breadcrumb::getBreadCrumb('product',$productId) !!}

 <!-- This page used for product detail and product popup and controller used as rvCtrl 
 so please prefix before any model as well as function used exp rvCtrl.name -->
  @include('productMobileInclude')
{{-- <div id="popupdiv" class="modal modal-popupdiv fade in" role="dialog"></div> --}}
<!-- Content end -->  
@endsection
@section('footer_scripts')
<script type="text/javascript" src="{{url('/')}}/js/jquery.dd.min.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/custom.js"></script>
{{-- <script type="text/javascript" src="{{ Config::get('constants.js_url') }}ajaxupload.3.5.js" ></script>  --}}
@include('includes.prdDisplayRouteDependency')
<script type="text/javascript" src="{{ Config::get('constants.public_url')}}angular/buyer/App/Model/buyerApp.js"></script> 
<script type="text/javascript" src="{{url('/')}}/angular/frontend/productDisplayCtrl.js"></script>
<script type="text/javascript" src="{{ Config::get('constants.public_url')}}angular/buyer/App/Controller/mainRouteCtrl.js"></script>
<script type="text/javascript">
  jQuery(".user-rating-star").each(function() {
   //alert($(this).attr('value'));
   console.log('1');
});
</script>
@stop