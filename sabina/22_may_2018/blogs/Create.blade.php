@extends('layouts/admin/default')

@section('title')
    @lang('cms.create_page')
@stop

@section('header_styles')
<link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}sweetalert2.min.css">
<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}ng-tags-input.min.css">
<!--page level css -->
<script type="text/javascript">
    var file_upload_setting ={
        allowed_extension :['png','jpeg','jpg', 'bmp', 'gif', 'svg'],
        max_number_file :5,
        max_file_size :5,
    };
   var form_action_url = "{{ action('Admin\Blogs\BlogController@store') }}";
   var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
   var categorylisturl="{{ action('Admin\Blogs\BlogController@getAllCategory') }}";
   //for form field name 
   var prdtagurl =  "{{ action('Admin\Blogs\BlogController@getTags') }}";
   var nodehtml = "{{ Config('constants.angular_url') }}sabinaApp/view/treeView.html";
   var formFieldName = ["category","cms_url","status","features","comment","publish","blog_title","blog_desc","tagss","meta_title","meta_keyword","meta_desc"];
   var errorMsg = ["Please select category", "Please enter url", "Please select status", "Please select feature", "Please select comment","Please select publish","Please enter blog title","Please enter blog description","Please enter blog tag","Please enter blog meta title","Please enter blog meta keyword","Please enter blog meta description"];

    
</script>
<!-- end of page level css -->
    
@stop

@section('content')
    <div class="content" ng-app="blogApp" ng-controller="blogAddEditCtrl" ng-cloak>
        @if(Session::has('succMsg'))
        <div class="alert alert-success alert-dismissable margin5">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>@lang('common.success'):</strong> {{ Session::get('succMsg') }}
        </div>
        @endif 
        <!--Overlay loader show on save or save and continue click -->
        <div class="loader-wrapper" ng-if="blogData.loading.save_and_continue">
            <span class="loader">
                <img ng-src="<%blogData.loading.btnloaderpath%>" alt="Loader" width="30" height="30"> 
                <div>Please wait...</div>
            </span>
        </div>
        <form id="cmsForm" class="form-horizontal form-bordered" name="cmsForm" enctype="multipart/form-data" novalidate>
            <div class="header-title">
                <h1 class="title">@lang('blog.create_blog')</h1>
                <div class="pull-right btn-groups">
                    <a href="{{ action('Admin\Blogs\BlogController@index') }}"><button type="button" class="btn-default">@lang('common.back')</button></a>
                    <button type="submit" name="submit_type" value="save_and_continue" class="secondary" ng-click="saveBlog($event, cmsForm, 'save_and_continue')" ng-disabled="blogData.loading.disableBtn">@lang('common.save_and_continue')</button>                    
                    <button type="submit" name="submit_type" value="save" class="btn btn-effect-ripple btn-primary" ng-click="saveBlog($event, cmsForm, 'save')" ng-disabled="blogData.loading.disableBtn">@lang('common.save')</button>
                </div>
            </div>   

            <div class="content-wrap">

                <div class="content-left">
                    <div class="tablist">
                        <ul>
                            <li data-toggle="tab" data-target="#blogDetail" class="active">Blog Details</li>
                            <li data-toggle="tab" data-target="#blogSeo">SEO</li>
                        </ul>
                    </div>
                </div>
                <div class="content-right container">                  
                
                    {{ csrf_field() }}
                    
                    <div class="tab-content">

                        <div id="blogDetail" class="tab-pane fade in active">
                            <h2 class="title-prod">
                              <i class="count">1</i> Blog Image      
                            </h2>
                            <div class="form-row">
                                <label>@lang('common.thumb_image') <i class="strick">*</i></label> 
                                <div class="single-file-upload">
                                   <input type="file" name="thumb_image" value="{{ old('thumb_image') }}" id="thumb_image" required>
                                </div>
                            </div>
                            <div class="form-row">
                                <label>@lang('common.blog_image') <i class="strick">*</i></label>                                
                                <div class="multiple-file-upload">
                                    <div class="upload-row">
                                     @lang('blog.drag_drop_file')
                                    </div>                                         


                                    <div class="table table-striped files">
                                       <droplet ng-model="blog.file_interface">
                                        <ul class="files">
                                            <li ng-repeat="item in blog.file_interface.getFiles(blog.file_interface.FILE_TYPES.VALID)">
                                                <div class="col-sm-2">
                                                    <droplet-preview ng-model="item"></droplet-preview>
                                                </div>
                                                <div class="col-sm-6">
                                                   <div class="size"><%item.file.size / 1024 / 1024 | number: 1%>MB</div>
                                                   <p> 
                                                     <input name="default_image" type="radio" value="<%$index%>" ng-model="blog.defaultImage"> 
                                                     @lang('blog.set_as_display_img')
                                                    </p>
                                                </div>
                                                <div class="col-sm-2">
                                                    <div class="secondary cancel" ng-click="onDeleteImageFromImageUploadList(item,$index)">
                                                       <span>@lang('blog.cancel')</span>
                                                    </div>
                                                </div>
                                            </li>
                                          </ul>
                                        </droplet>
                                        <div class="upload-row">
                                            <span class="fileinput-button file-upload-btn" ng-class="{disabled: disabled}">
                                                <img src="/images/upload-btn2.jpg">
                                                <droplet-upload-multiple ng-model="blog.file_interface"></droplet-upload-multiple>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row fileupload-buttonbar">
                                        <div class="col-lg-12">
                                            <!-- The fileinput-button span is used to style the file input field as button -->
                                            <span class="secondary fileinput-button" ng-class="{disabled: disabled}">
                                                <i class="glyphicon glyphicon-plus"></i>
                                                <span> 
                                                @lang('blog.add')
                                                </span>
                                             <droplet-upload-multiple ng-model="blog.file_interface"></droplet-upload-multiple>
                                            </span>
                                            <button type="button" class="btn-md btn cancel" ng-click="_clearallfiles()">
                                                <i class="icon-remove"></i>
                                                <span>
                                               
                                                @lang('blog.clear_upload')
                                                 </span>
                                            </button>
                                            <!-- The global file processing state -->
                                            <span class="fileupload-process"></span>
                                        </div>                 
                                    </div>
                                    <!-- </form> -->
                                </div>                                
                            </div>

                            <h2 class="title-prod">
                                <i class="count">2</i> Blog Details 
                            </h2>
                            <div class="form-row row">
                                <div class="col-md-5">
                                <label>@lang('cms.url_key') <i class="strick">*</i></label> 
                                
                                    <input type="text" name="cms_url" value="{{ old('page_url') }}" ng-model="blog.cms_url" required>
                                   
                                    {{-- @if ($errors->has('url'))
                                        <p class="error error-msg">{{ $errors->first('url') }}</p>
                                    @endif --}}                        
                                </div>
                            </div> 
                            <div class="form-row row">
                                <div class="col-md-5">
                                <label>@lang('common.status') <i class="strick">*</i></label> 
                                
                                    <select class="select" name="status" ng-model="blog.status" required="">
                                        <option value="">@lang('blog.default_option')</option>
                                        <option value="1">@lang('common.enable')</option>
                                        <option value="0">@lang('common.disable')</option>
                                    </select>
                                </div>
                            </div>                          

                                            

                            <div class="form-row row">
                                <div class="col-md-8">
                                
                                    {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'blog_title', 'label'=>'Title <i class="strick">*</i>', 'errorkey'=>'blog_ttl','required'=>'required','ng-model'=>'blog_title    '],['field'=>'textarea', 'name'=>'short_description', 'label'=>'Short Description <i class="strick">*</i>', 'errorkey'=>'short_description','required'=>'required','ng-model'=>'short_description    '],['field'=>'textarea', 'name'=>'blog_desc','cssClass'=>'froala-editor-apply', 'froala'=>'froala', 'label'=>'Description <i class="strick">*</i>', 'errorkey'=>'blog_description','required'=>'required','ng-model'=>'blog_desc[]']], '1', $errors) !!}

                                </div>
                            </div>

                                  

                            <div class="form-row row">
                                <div class="col-md-5">
                                <label>@lang('cms.features') <i class="strick">*</i></label> 
                                
                                    <select class="select" name="features"  ng-model="blog.features" required >
                                        <option value="">@lang('blog.default_option')</option>
                                        <option value="0">@lang('common.no')</option>
                                        <option value="1">@lang('common.yes')</option>
                                    </select>
                                </div>
                            </div>  

                            <div class="form-row row">
                                <div class="col-md-5">
                                <label>@lang('common.comment') <i class="strick">*</i></label> 
                                
                                    <select class="select" name="comment" ng-model="blog.comment" required>
                                        <option value="">@lang('blog.default_option')</option>
                                        <option value="1">@lang('common.enable')</option>
                                        <option value="0">@lang('common.disable')</option>
                                    </select>
                                </div>
                            </div>  

                            

                            <div class="form-row row">
                                <div class="col-md-5">
                                <label>@lang('cms.publish') <i class="strick">*</i></label> 
                                
                                    <select class="select" name="publish" ng-model="blog.publish" required>
                                        <option value="">@lang('blog.default_option')</option>
                                        <option value="1">@lang('common.enable')</option>
                                        <option value="0">@lang('common.disable')</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row row">
                                <span class="col-sm-5">
                                    <label>@lang('blog.tags')<i class="strick">*</i></label>
                                    <tags-input placeholder="@lang('blog.tags')" data-ng-model="blog.tags" name="tagss" display-property="tag_title" required>
                                    <auto-complete  load-on-focus="false" load-on-empty="false" source="_loadProdTags($query)"></auto-complete>
                                    </tags-input>
                                </span>
                            </div>

                            <h2 class="title-prod">
                                  <i class="count">3</i> Blog's Categories                       
                            </h2>
                            <div class="form-row">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <tree-list-dir dataset="blogData.blogCate" selected="blog.category"> </tree-list-dir>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div id="blogSeo" class="tab-pane fade">
                            <h2 class="title-prod">
                                <i class="count icon-search"></i> SEO
                            </h2>
                            <div class="form-row"> 
                                {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'meta_title', 'label'=>'Meta Title <i class="strick">*</i>', 'errorkey'=>'meta_title','required'=>'required','ng-model'=>'meta_title'],['field'=>'text', 'name'=>'meta_keyword', 'label'=>'Meta Keyword <i class="strick">*</i>', 'errorkey'=>'meta_keyword','required'=>'required','ng-model'=>'meta_keyword'],['field'=>'textarea', 'name'=>'meta_desc', 'label'=>'Meta Description <i class="strick">*</i>', 'errorkey'=>'meta_desc','ng-model'=>'meta_desc']], '4', $errors) !!}
                
                            </div>

                            
                        </div>

                    </div>
    

                </div>                                                  
            </div>
        </form>
    </div>
      
@stop

@section('footer_scripts')
 
<!-- begining of page level js -->
<script src="{{ Config('constants.page_js_url') }}validateCMS.js" type="text/javascript"></script>
<!-- end of page level js --> 

@include('includes.froalaeditor_dependencies')
<script type="text/javascript">
   var csrftoken = window.Laravel.csrfToken;
</script>
@include('includes.blog_js_lib')
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/blogAddEditCtrl.js"></script>        
@stop
