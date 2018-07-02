@extends('layouts.app')
@section('header_style')
<link rel="stylesheet" type="text/css" href="{{Config::get('constants.css_url')}}magicscroll.css""/>
<link rel="stylesheet" type="text/css" href="{{Config::get('constants.css_url')}}magiczoomplus.css""/>
<script type="text/javascript">
	var homeurl ="{{action('HomeController@index')}}";
	var prdUrl = "{{ Config::get('constants.product_url')}}";
	var blogUrl = "{{ Config::get('constants.blog_url')}}";
	var page = 1;
	var varientInfo =[];
</script>
@stop

@section('content')
@if(isset($topics))
<div class="modal fade in preference-popup" id="preference-popup" role="dialog" style="opacity: 1; display: block;">
	<div class="modal-dialog modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->				          
			</div>
			<div class="modal-body manage-user-topic">
				<h2 class="modal-title">@lang('auth.follow') {{$topic_count}} @lang('auth.topics')</h2>
				<p>@lang('auth.then_we_ll_build_a_custom_home_feed')</p>
                <form id="manage-user-topic">
                                @if(!empty($topics))
				    <ul class="follow-topic">
                                     @foreach($topics as $topic )   
					   <li>
					        <a  rel="{{$topic->id}}"><img src="{{ Config::get('constants.topic_url').$topic->topics_image }}" alt="" title=""></a>
						<span class="ftopic-name">{{$topic->topicsLang->name or ''}}</span>
                                                <input type="checkbox" value="{{$topic->id}}" name="topics[]">
						<span class="check-icon glyphicon glyphicon-ok"></span>
					   </li>
					@endforeach
					</ul>
                                @endif
                                <button class="btn-skyblue btn-lg addtopic" type="submit">@lang('auth.let_s_start')</button>
                                 
                                <p id="addtopic-error" class="error error-msg"></p>
                                
                                <p id="addtopic-success" class="alert alert-success" style="display: none"></p>
                                   
                                          
                 </form>				
			</div>
		</div>
	</div>
</div>
@endif
<section class="content-wrapper">
  <section class="slider-content">
   <div id="slider" class="flexslider">
    <div class="flexslider_loader loader"></div>
      {!! LayoutHtml::showBanner('home_page')!!}
    </div>
    
  </section>
@if(!isset($topics))
<!-- Banner visiter section here -->
<div class="container banner-visiter">
	<div class="row">
		<div class="col-sm-4">
			<span class="block"> <span><img src="/images/icon-visiter.png"></span> @lang('auth.visitor')</span>
			<strong><span class="count"> 1020325115 {{ session('lang_code') }}</span></strong>
		</div>
		<div class="col-sm-4">
			<span class="block"> <span><img src="/images/icon-member.png"></span> @lang('auth.our_member')</span>
			<strong><span class="count"> 1020325115</span></strong>
		</div>
		<div class="col-sm-4">
			<span class="block"> <span><img src="/images/icon-sales.png"></span> @lang('auth.total_sales')</span>
			<strong><span class="count"> 1020325115</span> @lang('auth.thb')</strong>
		</div>
	</div>
</div>
<div class="container center-banner">
	<div class="row">
		<div class="col-sm-4 woment-banner">
			<a href="#">{!! getAdminBlock('home-page-women') !!}</a>
		</div>
		<div class="col-sm-4 men-banner">
			<a href="#">{!! getAdminBlock('home-page-men') !!}</a>
		</div>
		<div class="col-sm-4 thing-banner">
			<a href="#">{!! getAdminBlock('home-page-things') !!}</a>
		</div>
	</div>
</div>
 <div class="listing-view ng-cloak" id="buyerHomePageController" ng-controller="buyerHomePageController" ng-cloak>
   <div ui-view="main"></div>
 </div>
   {!!PopUpHelpers::showBoardpopUp()!!} 

@endif
@endsection
@section('footer_scripts')
 <script src="{{ asset('js/banner_slider.js') }}"></script>
 <script type="text/javascript" src="{{asset('js/product-display.js')}}"></script>
@stop