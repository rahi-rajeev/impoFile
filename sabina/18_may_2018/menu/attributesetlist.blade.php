 @extends('layouts/admin/default')
@section('title')
    @lang('admin.team_members')
@stop
@section('header_styles')
@stop
@section('content')
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 

    <script type="text/javascript">
        var dataJsonUrl = "{{ action('Admin\Attribute\AttributeController@allsetlisting') }}";
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";
    </script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/attributeSetTab.js"></script>

<div class="content">
        <div class="header-title">
            <h1 class="title">@lang('attribute.attribute_set_management')
            </h1>
            <div class="pull-right btn-groups">
                <a class="btn" href="{{action('Admin\Attribute\AttributeController@createAttributeSet')}}">@lang('attribute.create_attribute_set')</a>
            </div>
        </div>

        @if(empty($totalAttr))

        <div class="content-wrap clearfix">

            <div class="row">
                <div class="col-sm-8">
                    <h2 class="title">What is Attribute Set</h2>
                    <div class="form-row">
                        <p>Cur from tissue-wight slick crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly Cut from tissue-wight slick crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly Cut from tissue-weight silk crep de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly</p>
                        <div class="attribut-setimg">
                            <img src="images/attribute-set.jpg" alt="">
                        </div>
                        <p>Cur from tissue-wight slick crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly Cut from tissue-wight slick crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly Cut from tissue-weight silk crep de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly</p>
                    </div>
                    <div class="form-row">
                        <a class="btn" href="{{action('Admin\Attribute\AttributeController@createAttributeSet')}}">Create Attribute Set</a>
                    </div>
                </div>
            </div>
            
        </div>

        @endif


    @if(!empty($totalAttr))  
          
       <div class="ng-cloak" data-ng-controller="gridtableCtrl" ng-cloak>
 
        <div class="content-wrap">
           @include('includes.gridtable')
        </div>

       </div>

    @endif





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
  
@stop