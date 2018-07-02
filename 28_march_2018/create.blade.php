@extends('layouts.admin.default')
@section('title')
    @lang('admin.system_configuration')
@stop
@section('header_styles')
@stop
@section('content')
<script>
    var action = '{{action("Admin\Category\CategoryController@store")}}';
    var cat_id = '';
    var variantlisturl ='#';
    var dataJsonUrl ='{{ action("Admin\Category\CategoryController@categorieslist")}}';
    var imageurl="#";
    var currency = "{{session('default_currency_code')}}";
    window.userFolderDefaultPath = "{{Config::get('constants.froala_img_path').md5(Auth::id()).'/'}}";
    var fieldSetJson = {!! $fieldsetdata  !!};
    var fieldset = fieldSetJson.fieldSets;
    
    var catesearchUrl = "{{ action('Admin\Category\CategoryController@getCatFilteredProduct') }}"
    var savecateUrl = "{{action('Admin\Category\CategoryController@saveProductIntoCat')}}";
    var checkcatmovepossilbe_url = "{{action('Admin\Category\CategoryController@checkCategoryMove')}}";
    var categoryList = "{{action('Admin\Category\CategoryController@categorieslist')}}";
    var catdragdropurl = "{{ action('Admin\Category\CategoryController@moveCategory')}}";
    var cateEditurl = "{{ action('Admin\Category\CategoryController@categoryedit') }}";
    
    var showHeadrePagination = true;
    var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
    //pagination config 
    var pagination = {!! getPagination() !!};
    var per_page_limt = {{ getPagination('limit') }};
    //for enable external pagination (get data from server on every click)
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
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}angular-ui-tree.min.css">  

<div class="content"  ng-controller="sellerCateCtrl" ng-cloak> 
    {!! Form::open(['action' => 'Admin\Category\CategoryController@store', 'id'=>'sellerCategoryForm', 'class'=>'form-horizontal']) !!}
    {!! Form::hidden('_method', old('_method', 'POST')) !!}
    {!! Form::hidden('category_id', old('category_id'), ['id'=>'category_id']) !!}
    <div class="header-title btn-group">
        <h1 class="title">@lang('category.cat_title')</h1>  

         @php( $confirm = "'".Lang::get('product.are_sure_delete_this_data')."'")


    
         <input type="submit" class="btn pull-right" value="@lang('product.save_category')" ng-disabled="catmoveerror" />
         <a ng-if="deleteUrl" onclick="return confirm({{$confirm}});" class="btn pull-right deleteUrlcate" ng-href="<%deleteUrl%>">@lang('product.remove_category')</a> 

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

         @include('admin.includes.category_menu')

        </div>
        <div class="content-right border-none">
            <!-- BEGIN SIDEBAR MENU -->
           
            <!-- END SIDEBAR MENU -->
            <div class="category-right">
                <div  ng-if="!cat_mesg">
                    <h2 id="cat_mesg">
                        @if(isset($subcat_mesg))
                            {{$subcat_mesg}}
                        @else
                            Create New Root Category
                        @endif
                    </h2>
                    
                </div>
                <div ng-if="cat_mesg">
                    <h2>@lang('product.name'): <%cat_mesg%></h2>
                </div> 
                <div class="category-tab saveCat clearfix">
                     
                    <ul class="tab-list">
                        <li class="active" data-ng-click="enableTab('deactive')"><a href="#cetegory-general-info" data-toggle="tab">@lang('product.general_infomation_tab')</a></li>
                        <li data-ng-if="showcatprod" data-ng-click="enableTab('active')"><a href="#cetegory-cat-product" data-toggle="tab">@lang('product.category_products')</a></li>
                    </ul>
                </div>

                <div class="detail-box">
                    <div class="tab-content row">
                        <div id="cetegory-general-info" class="tab-pane fade col-sm-7 in active" >
                            <div class="category-gen-form">

                                <input type="hidden" name="catmoveerror" value="<%catmoveerror%>">

                                @if(isset($category->id))

                                 {!! Form::hidden('parent_id', old('parent_id', $category->id))!!}
                                
                                @elseif(isset($categoriesids) && !empty($categoriesids))
                                    <div class="form-row" ng-if="parent_cat">
                                        <label>@lang('product.parent_category')<span class="star-top">*</span></label>


                                        <select name="parent_id" id="parent_id" class="form-control" >
                                         
                                           @foreach($categoriesids as $catoption) 
                                                @if(isset($catoption->categorydesc->category_name))
                                                <option value="{{$catoption->id}}">{{$catoption->categorydesc->category_name }}</option>
                                                @endif
                                           @endforeach  
                                       </select> 
                                        
                                    </div>

                                {!! Form::hidden('parent_id', old('parent_id', null), ['ng-if'=> '!parent_cat', 'id'=>'parent_id']) !!}
                                   
                                @else
                                {!! Form::hidden('parent_id', old('parent_id', 0)) !!}
                                @endif

                                
                                <div class="form-row" ng-if="!edit">
                                    <label>@lang('product.category_name')<i class="strick">*</i></label>
                                    {!! Form::text('category_name', old('category_name'), ['placeholder'=> Lang::get('product.category_name_place')] ) !!}
                                     @if ($errors->has('url'))
                                        <p id="name-error" class="error error-msg">{{ $errors->first('url') }}</p>
                                     @endif
                                    
                                </div>

                                <div class="form-row" ng-if="!edit">
                                    <label>@lang('product.category_description')</label>
                                    {!! Form::textarea('cat_description', old('cat_description')) !!}
                                </div>

                                <div class="form-row" ng-if="edit">
                                 {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'category_name', 'label'=>Lang::get('product.category_name'), 'cssClass'=>'', 'errorkey'=>'url'], ['field'=>'textarea', 'name'=>'cat_description', 'label'=>Lang::get('product.category_description'), 'cssClass'=>'']], '2', $errors)!!}
                                </div>
                                
                                <div class="form-row">
                                    <label>@lang('product.active')<i class="strick">*</i></label>
                                    {!! Form::select('status', [],  null, ['ng-model'=>'status', 'ng-options'=> ' template.name for template in statusdropdown.configs track by template.value']) !!}
                                </div>                                
                                
                            </div>
                            <div class="advance-setting" style="display:none">
                                <span class="checkbox-btn">
                                    {!! Form::checkbox('adv_setting', '1', (old('adv_setting') == '1'),['class' => 'checkbox', 'id'=>'adv-setting'] ) !!}
                                    <label for="adv-setting" class="checkbox-label">@lang('product.advance_setting')</label>
                                </span>                             
                            </div>

                            <div class="advance-setting-option"> 
                                {{-- {!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'cat_footer_seo', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1','ui-tinymce'=>'tinymceOptions' ]],'1')!!} --}}

                                {!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'cat_footer_seo', 'label'=>Lang::get('product.description'), 'cssClass'=>'texteditor1','froala'=>'froala' ]],'1')!!}
                                
                                @if($seo_status == '1')
                                    {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'meta_title', 'label'=>Lang::get('product.meta_title'), 'cssClass'=>''], ['field'=>'text', 'name'=>'meta_keyword', 'label'=>Lang::get('product.meta_keyword'), 'cssClass'=>''], ['field'=>'textarea', 'name'=>'meta_description', 'label'=>Lang::get('product.meta_description'), 'cssClass'=>'']], '4')!!}
                                @endif
                            </div>
                           

                        </div>
                        <div id="cetegory-cat-product" class="tab-pane fade " data-ng-if="showcatprod">
                            @include('admin.includes.category_product_tab')
                        </div>

                    </div>
                </div>
                
                
                
                

            </div>

            <div class="loading-more-indicator loader-container" ng-show="loadingMore">
               <div class="loader"></div>
            </div>
        </div>
       

    </div>  
    <div class="push-content"></div>
    {!! Form::close() !!}
</div>
@endsection 
@section('footer_scripts')

@include('includes.gridtablejsdeps')
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/sellerCateCtrl.js"></script>
 @include('includes.froalaeditor_dependencies')
<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script>
@stop