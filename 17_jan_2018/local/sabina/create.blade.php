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
    var catesearchUrl = "{{ action('Admin\Category\CategoryController@getCatFilteredProduct') }}"
    var savecateUrl = "{{action('Admin\Category\CategoryController@saveProductIntoCat')}}";
    var checkcatmovepossilbe_url = "{{action('Admin\Category\CategoryController@checkCategoryMove')}}";
    var categoryList = "{{action('Admin\Category\CategoryController@categorieslist')}}";
    var catdragdropurl = "{{ action('Admin\Category\CategoryController@moveCategory')}}";
    var cateEditurl = "{{ action('Admin\Category\CategoryController@categoryedit') }}";
    var tableHeadurl = "{{ action('Admin\Category\CategoryController@getCategoryTableHeading') }}";
    var showHeadrePagination = true;
</script>
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css">  
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}angular-ui-tree.min.css">  

<div class="content"  ng-controller="sellerCateCtrl" ng-cloak> 

    <div class="header-title">
        <h1 class="title">@lang('category.cat_title')</h1>       
    </div>
    <div class="content-wrap clearfix">
        <div class="row">
            <div class="col-sm-12">
                @if (Session::exists('message'))
                <div class="alert alert-success alert-dismissable margin5">
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
                 {!! Form::open(['action' => 'Admin\Category\CategoryController@store', 'id'=>'sellerCategoryForm', 'class'=>'form-horizontal']) !!}
                  {!! Form::hidden('_method', old('_method', 'POST')) !!}
                  {!! Form::hidden('category_id', old('category_id'), ['id'=>'category_id']) !!}
                <div class="category-tab saveCat clearfix">
                    {{-- <div class="pull-right mrgnbtn ">
                        
                    </div> --}}
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
                                    <label>@lang('product.category_name')<span class="star-top">*</span></label>
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
                                    <label>@lang('product.active')<span class="star-top">*</span></label>
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

                            <input type="submit" class="btn" value="@lang('product.save_category')" ng-disabled="catmoveerror">

                            

                        </div>

                        <div id="cetegory-cat-product" class="tab-pane fade " data-ng-if="showcatprod">

                            {{-- <div class="view-number">
                                View <a href="#">30</a> 
                                <a href="#">90</a>
                                <a href="#">120</a>
                            </div> --}}

                            {{-- <div data-ng-if="hidecategorytable"> --}}
                            <div class="col-sm-12">
                                <!-- table select all btn panel  -->
                                <div class="select-tag-btn" ng-if="tableSelectBtnConfig">
                                    <a href="javascript:void(0)" class="btn-grey select-all" ng-click="selectAllColumnFunAll('select')">Select All</a>
                                    <a href="javascript:void(0)" class="btn-grey select-all" ng-click="selectAllColumnFunAll('unselect')">Unselect All</a>
                                    <a href="javascript:void(0)" class="btn-grey select-all" ng-click="selectVisibleColumnsAll('visible')">Select Visible</a>
                                    <a href="javascript:void(0)" class="btn-grey select-all" ng-click="selectVisibleColumnsAll('unVisible')">Unselect Visible</a>
                                    <span><%selectItemTotalAll%> Items selected</span>
                                </div>
                                <div class="filter-criteria" data-ng-show="tableFilterContainer">
                                    <div class="form-row">
                                        <div ng-repeat="field in $root.filedsSet"  data-ng-if="field.filterable == true" class="col-sm-3">
                                            <label><%field.displayName%></label>
                                            <input type="text" placeholder="<%field.displayName.split('_').join(' ')%>" data-ng-model="filedSetModel[$index]"  name="<%field.fieldName%>"  data-ng-if="field.fieldType == 'textbox' && field.textBoxType == 'single'"  data-ng-keyup="textChangeFunction(field.fieldName,$event)"/>
                                            <input type="text" placeholder="from" data-ng-model="filedSetModel[$index]" name="<%field.fieldName%>"  data-ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_From',$event)">
                                            <input type="text" placeholder="to" data-ng-model="filedSetModel[$index]" name="<%field.fieldName%>"  ng-if="field.fieldType == 'textbox' && field.textBoxType == 'range'" ng-keyup="textChangeFunction(field.fieldName+'_To',$event)">
                                           {{-- selection type single and value type collection --}}
                                           <select data-ng-model="filedSetModel[$index]" ng-options="opt.value for opt in field.optionArr"  data-ng-if="field.fieldType == 'selectbox' && field.optionValType == 'collection' && field.selectionType == 'single'" data-ng-change="filterSelectBoxChange(filedSetModel[$index],field.fieldName)"></select>
                                        </div>
                                    </div>
                                   {{--  <div class="btn-row updbtn"> --}}
                                   <div class="">
                                       <div class="col-sm-3">
                                            <button type="button" class="secondary" ng-click="searchDataInGrid()">
                                                @lang('product.search')
                                            </button>
                                        </div>
                                        <div class="col-sm-3">
                                                <button type="button" class="secondary" ng-click="searchDataInGrid('','resetfilter')">
                                                @lang('product.reset_filter')
                                            </button>  
                                        </div>
                                        <div class="col-sm-3">
                                            <button type="button" class="btn btn-md" data-ng-click="save_category()"> @lang('product.save_category')
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                                <div class="table-wrapper catelog-mgt-table" >
                                    <div class="table-record-row">                                  
                                        <!--<select ng-model="actionSelectBox" ng-change="actionOnDataGrid()" ng-options="option.name for option in actioOptions" ng-init="actionSelectBox= actioOptions[0]">
                                        </select>
                                        <button type="button" class="btn-md btn-skyblue" ng-show="selBoxActBtn" ng-click="actionBtnClick()">Submit</button>-->
                                        <span class="filter-action-icon" data-ng-show="tableFilterConfig" ng-click="tableFilterContainer = !tableFilterContainer"> <span class=""><img src="assets/images/filter.png" alt="" ></span> @lang('category.filters') </span>
                                        <span>@lang('category.total_records') <%displayTotalNumItems%></span>

                                        <div class="pull-right pager pagiTablet" data-ng-if="tableHeaderPaginationConfig">
                                            <dir-header-pagination></dir-header-pagination>
                                        </div>
                                    </div> 
                                    <div>
                                        <div id="productTable" data-ng-if="tabActive && gridOptions.data.length>0" ui-grid="gridOptions" ui-grid-pagination="" class="tableWidth ui-grid-selectable"  ui-grid-resize-columns ui-grid-selection ui-grid-move-columns ui-grid-draggable-rows ui-grid-save-state ui-grid-exporter ui-grid-auto-resize ng-style="getTableHeight()"></div>
                                        <div class="error-container" data-ng-bind-html="errorInfoLog | unsafe" data-ng-if="no_result_found"></div>
                                        <div class="loder-wrapper" data-ng-if="showLoaderTable">
                                            <div class="loader loader-medium"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination" data-ng-show="gridOptions.data.length>0">
                                    <pagination class="pagination-lg" total-items="gridOptions.totalItems" items-per-page="gridOptions.paginationPageSize" ng-model="gridOptions.paginationCurrentPage" max-size="10" rotate="false" boundary-links="true"></pagination>
                                </div>

                            </div>
                             {{-- <div ng-if="!hidecategorytable">
                                <h1> @lang('product.there_are_no_matching_records')</h1>
                             </div> --}}


                        </div>

                    </div>
                </div>
                
                {!! Form::close() !!}
                
                

            </div>

            <div class="loading-more-indicator loader-container" ng-show="loadingMore">
               <div class="loader"></div>
            </div>
        </div>
       

    </div>  
    <div class="push-content"></div>
</div>
@endsection 
@section('footer_scripts')
{{-- <script src="{{ asset('TableDemo/assets/lib/angular/jquery-ui.min.js')}}"></script>
<script src="{{ asset('angular/seller/App/Directive/pagination.js')}}"></script>
<script src="{{ asset('angular/seller/App/Directive/dropdownDir.js')}}"></script>
<script src="{{ asset('TableDemo/assets/lib/angular/ui-grid.js')}}"></script>  --}}
{{-- 
<script src="{{ asset('js/angular-ui-tinymce.js') }}" type="text/javascript"></script> --}}
@include('includes.gridtablejsdeps')
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/sellerCateCtrl.js"></script>
 @include('includes.froalaeditor_dependencies')
<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script> 
<!--- whill change according to our need -->
{{-- <script src="{{asset('angular/Froala/app.js')}}"></script> --}}
<script src="{{ asset('js/seller.category.js') }}" type="text/javascript"></script>
{{-- <script src="{{ asset('angular/seller/App/Controller/SellerCategoryController.js') }}" type="text/javascript"></script> --}}

@stop