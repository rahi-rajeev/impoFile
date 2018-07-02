
@extends('layouts.admin.default')
@section('title')
    @lang('admin.system_configuration')
@stop
@section('header_styles')
@stop
@section('content')
<script>
    var action = '{{ action("Admin\Category\CategoryController@store")}}';
    var cat_id = '{{ $category->id}}';
    var fieldSetJson = {!! $fieldsetdata  !!};
    var catesearchUrl = "{{ action('Admin\Category\CategoryController@getCatFilteredProduct') }}";
    var categoryList = "{{action('Admin\Category\CategoryController@categorieslist')}}";
    var action = '{{action("Admin\Category\CategoryController@store")}}';
    
    var variantlisturl ='#';
    var dataJsonUrl ='{{ action("Admin\Category\CategoryController@categorieslist")}}';
    var imageurl="#";
    var currency = "{{session('default_currency_code')}}";
    window.userFolderDefaultPath = "{{Config::get('constants.froala_img_path').md5(Auth::id()).'/'}}";

    var catesearchUrl = "{{ action('Admin\Category\CategoryController@getCatFilteredProduct') }}"
    var savecateUrl = "{{action('Admin\Category\CategoryController@saveProductIntoCat')}}";
    var checkcatmovepossilbe_url = "{{action('Admin\Category\CategoryController@checkCategoryMove')}}";
    var categoryList = "{{action('Admin\Category\CategoryController@categorieslist')}}";
    var catdragdropurl = "{{ action('Admin\Category\CategoryController@moveCategory')}}";
    var cateEditurl = "{{ action('Admin\Category\CategoryController@categoryedit') }}";
    
    var catediturl ="{{action('Admin\Category\CategoryController@categoryedit')}}";
    var showHeadrePagination = true;
    var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
    //pagination config 
    var pagination = {!! getPagination() !!};
    var per_page_limt = {{ getPagination('limit') }};
    //for enable external pagination (get data from server on every click)
    var ext_pagination = false;
    var ext_pagination = false;

    var columsSetting = [
        {   
            "field":"product_id",
            "displayName":"Id"
        },
        {   
            "field":"thumbnail_image",
            "displayName":"Image",
            "cellTemplate":'<span><img src="<%row.entity.thumbnail_image%>"></span>'
        },
        {   
            "field":"name",
            "displayName":"Product Name"
        },
        {
            "field":"sku",
            "displayName":"SKU"
        },
        {
            'field':'product_type',
            'displayName':"Type"
        },
        {
            "field":"initial_price",
            "displayName":"Initial Price",
            "cellTemplate":"<span><%row.entity.initial_price%><%row.entity.currency_code%><\/span>"
        },
        {   
            "field":"special_price",
            "displayName":"Special Price",
            "cellTemplate":"<span><%row.entity.special_price%><%row.entity.currency_code%><\/span>"
        },
        {
            "field":"cat_id",
            "displayName":"Cat ID",
            "visible":false
        }
    ];
</script>
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css">
<div class="content" data-ng-controller="sellerCateCtrl" data-ng-cloak>
     <div class="header-title">
        <h1 class="title">@lang('category.cat_title')</h1>  
        <div class="pull-right">
                        @php( $confirm = "'".Lang::get('product.are_sure_delete_this_data')."'")
                        {!! Form::open(['style' => 'display: inline-block;', 'method' => Lang::get('product.delete'), 'onsubmit' => "return confirm($confirm);",  'route' => ['catalog.destroy', $category->id]]) !!}
                         {!! Form::button(Lang::get('product.remove_category'), ['class' => 'btn btn-md', 'type'=>'submit']) !!}
                        {!! Form::close() !!}
                        
                        <button class="btn" onclick="document.getElementById('sellerCategoryForm').submit();">@lang('product.save_category')</button>
                    </div>     
    </div>
    <div class="content-wrap clearfix">
        
            <div class="row">
                <div class="col-sm-12">
                    @if (Session::exists('message'))
                    <div class="alert alert-success alert-dismissable margin5 mb-10">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        {{Session::get('message')}}
                    </div>
                    @endif
                </div>
            </div>
            <div class="content-left">
                <!-- BEGIN SIDEBAR MENU -->
                     @include('admin.includes.category_menu')
                <!-- END SIDEBAR MENU -->
            </div>

            <div class="category-right content-right border-none">

                <div ng-if="!cat_mesg">
                    <h2 id="cat_mesg">
                        @if(isset($subcat_mesg))
                            @lang('product.name'): {{$subcat_mesg}}                        
                        @endif
                    </h2>                    
                </div>
                <div ng-if="cat_mesg">
                    <h2>@lang('product.name'): <%cat_mesg%></h2>
                </div>

                <div class="category-tab">
                    

                    <ul class="tab-list">
                        <li class="active" data-ng-click="enableTab('deactive')"><a href="#cetegory-general-info" data-toggle="tab">@lang('product.general_infomation_tab')</a></li>
                        <li data-ng-if="showcatprod" data-ng-click="enableTab('active')"><a href="#cetegory-cat-product" data-toggle="tab">@lang('product.category_products')</a></li>
                    </ul>
                </div>
                {!! Form::open(['action' => ['Admin\Category\CategoryController@update', $category->id], 'method' => 'put','id'=>'sellerCategoryForm', 'class'=>'form-horizontal']) !!}
                <div class="detail-box" style="clear:both;">
                    <div class="tab-content row">
                    
                        <div id="cetegory-general-info" class="tab-pane  col-sm-7 fade in active" >
                         {{--    <div ng-show="edit">
                                <label>@lang('product.rootcategory')</label>
                                <input type="checkbox" name="rootcategory" ng-model="root_category" ng-checked="setIndividualCat()">
                            </div>

                            <div class="form-row" ng-show="edit && !root_category"  >
                                <label>@lang('product.parent_category')</label>
                                <select name="parent_cat" ng-model="parent_category" ng-options="item.cat_name for item in allcategorylist track by item.cat_id" ng-change="getCategoryPosition()">
                                    <option value="" selected="selected">@lang('product.select_category')</option>
                                </select>
                                <span class="error error-msg" ng-show="catmoveerror">
                                    @lang('product.cat_move_notallowed')
                                </span>
                                
                            </div> --}}
                                <input type="hidden" name="catmoveerror" value="<%catmoveerror%>">

                           

                            {!! Form::hidden('parent_id', old('parent_id', $category->parent_id?$category->parent_id:0), ['id'=>'parent_id']) !!}
                        
                            {!! Form::hidden('category_id', old('category_id', $category->id), ['id'=>'category_id']) !!}
                            
                            <div class="category-gen-form">


                                 {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'category_name', 'label'=>Lang::get('product.category_name'), 'cssClass'=>'', 'errorkey'=>'url'], ['field'=>'textarea', 'name'=>'cat_description', 'label'=>Lang::get('product.category_description'), 'cssClass'=>'']], '3', $errors)!!}



                                <div class="form-row mt-15">
                                    <label>@lang('product.active') <i class="strick">*</i></label>
                                    {!! Form::select('status', [],  null, ['ng-model'=>'status', 'ng-options'=> ' template.name for template in statusdropdown.configs track by template.value']) !!}
                                </div>
                                
                            </div>
                           

                            <div class="advance-setting-option"> 
                                {!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'cat_footer_seo', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1', 'froala'=>'froala' ]],'1')!!}
                                
                                @if($seo_status == '1')
                                    {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'meta_title', 'label'=>Lang::get('product.meta_title'), 'cssClass'=>''], ['field'=>'text', 'name'=>'meta_keyword', 'label'=>Lang::get('product.meta_keyword'), 'cssClass'=>''], ['field'=>'textarea', 'name'=>'meta_description', 'label'=>Lang::get('product.meta_description'), 'cssClass'=>'']], '2')!!}
                                @endif
                            </div>

                            <button type="submit" class="btn">@lang('product.save_category')</button>

                            {!! Form::close() !!}

                        </div>
                        <div id="cetegory-cat-product" class="tab-pane fade " data-ng-if="showcatprod">
                             @include('admin.includes.category_product_tab')
                            
                        </div>
                    </div>
                </div>
                
                 {!! Form::close() !!}
             </div>

             <div class="loading-more-indicator loader-container hide" ng-show="loadingMore">
               <div class="loader"></div>
             </div>    


    </div>  
   <div class="push-content"></div>
</div>
@endsection 
@section('footer_scripts')
@include('includes.gridtablejsdeps')
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/sellerCateCtrl.js"></script>
@include('includes.froalaeditor_dependencies')
<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script> 
<script src="{{ asset('js/seller.category.js') }}" type="text/javascript"></script>

@stop