 @extends('layouts/admin/default')
@section('title')
    @lang('admin.team_members')
@stop
@section('header_styles')
@stop
@section('content')
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 

    <script type="text/javascript">
        var dataJsonUrl = "{{ action('Admin\Attribute\AttributeController@attributelisting') }}";
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";
    </script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/attributeTab.js"></script>

<div class="content">
        <div class="header-title">
            <h1 class="title">@lang('attribute.create_new_varaint_or_specification')
            </h1>
            <div class="pull-right btn-groups">
                <a class="btn" href="{{action('Admin\Attribute\AttributeController@createAttribute','specification')}}">@lang('attribute.create_a_new_attribute')</a>
            </div>
        </div>
        <div class="content-wrap clearfix"  id="info-content">
            <div class="attr-mgt-view col-sm-10" >
                <div class="col-sm-4">
                    <a href="{{action('Admin\Attribute\AttributeController@createAttribute','variant')}}"><img src="{{Config('constants.image_url')}}product-variant.jpg"></a>
                    <h2>@lang('attribute.product_varaint')</h2>

                    <p> @lang('attribute.cut_from_tissue-weight')</p>
                </div>
                <div class="col-sm-4">
                    <a href="{{action('Admin\Attribute\AttributeController@createAttribute','specification')}}"><img src="{{Config('constants.image_url')}}specification.jpg" alt="" title=""></a>
                    <h2>@lang('attribute.specification')</h2>
                    <p>@lang('attribute.cut_from_tissue-weight') </p>
                    <a href="{{action('Admin\Attribute\AttributeController@createAttribute', 'specification')}}" class="btn">@lang('attribute.create_new_varaint_or_specification')</a>
                </div>
                <div class="col-sm-4">
                    <a href="{{action('Admin\Attribute\AttributeController@createAttribute','requirement')}}"><img src="{{Config('constants.image_url')}}product-requirement.jpg" alt="" title=""></a>
                    <h2>@lang('attribute.what_is_product_requirement')</h2>
                     <p>@lang('attribute.cut_from_tissue-weight')</p>

                    <a href="{{action('Admin\Attribute\AttributeController@createAttribute','requirement')}}" class="btn">
                        
                        @lang('attribute.create_product_requirement')
                    </a>
                </div>

            </div>
            <div class="attr-mgt-view col-sm-2" id="info-content-tab">
               <a  href="javascript:;">@lang('attribute.hide')</a>
            </div>



        </div>
     <div class="ng-cloak" data-ng-controller="gridtableCtrl" ng-cloak>
        <div class="content-wrap ">
           @include('includes.gridtable')
        </div>

       </div>

         @if(Session::has('message'))
                     {!! 
                        CustomHelpers::getSuccessMessage(Session::get('message')) 
                     !!}
                 @endif

    </div>
@stop
@section('footer_scripts') 
  @include('includes.gridtablejsdeps')
  <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
  <script>
       
     jQuery(document).ready(function(e){
         jQuery('#info-content-tab a').click(function(e){
            jQuery('#info-content').toggle(); 
            
         })
    })




  </script>
  
@stop