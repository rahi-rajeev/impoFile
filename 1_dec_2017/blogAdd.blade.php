@extends('layouts.blog.default')

@section('header_styles')

	<link rel="stylesheet" type="text/css" href="http://www.jqueryscript.net/css/jquerysctipttop.css">
	<link rel="stylesheet" type="text/css" href="{{ Config::get('constants.css_url') }}chosen.min.css">
	<link rel="stylesheet" type="text/css" href="{{ Config::get('constants.css_url') }}chosen.css">
	<link rel="stylesheet" type="text/css" href="{{ Config::get('constants.css_url') }}file-upload.css"> 
	<link rel="stylesheet" type="text/css" href="{{ Config::get('constants.css_url') }}ng-tags-input.min.css">
	<link rel="stylesheet" type="text/css" href="{{ Config::get('constants.css_url') }}bootstrap-datepicker.css">

	<script src ="{{ Config::get('constants.js_url') }}bootstrap-datepicker.min.js"></script>
    
@stop

@section('content') 

	<script>
		var dataset = '<?php echo json_encode($catSeller); ?>';
		var form_submit_url = '{{ action('Blog\BlogController@store') }}';
		var form_submit_type = 'create';
		var form_submit_redirect_url = '{{ action('Blog\BlogController@index') }}';
		var relatedcaturl = "{{ action('Blog\BlogController@getBlogRelatedCategories') }}";

		var blog_tag = '';
		var prod_img = '';
		var prod_seller_cat = '';
		var main_cat = '';
		var relatedcats = '';

		var related_cat_count = 0;

		var videoss = ''; 
		var videodurl = "{{action('Seller\ProductController@deleteVideo')}}";

		window.userFolderDefaultPath = "{!! '/files/froala_uploads/'.md5(Auth::id()).'/' !!}";
		 //console.log(dataset);
	</script>
	@include('includes.froalaeditor_dependencies')
		<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script>
	<style>
		.red {
		  border: solid 1px red;
		}
	</style>

	<div ng-app="productApp" ng-controller="productController as pdc"  ng-cloak>
		<div ng-if="createprodsec">
			<form name="productform" ng-submit="saveProduct($event)" method ="post" id="productform" enctype='multipart/form-data' ng-class="{'fileupload-processing': processing() || loadingFiles}" file-upload="options" files ="true" novalidate>		
				<div class="buyer-heading">
					<div class="container">
						<div class="breadcrumb-wrapper">
							<ul class="breadcrumb row">
							  <li class="breadcrumb-item"><a href="{{ action('Blog\BlogController@index') }}">@lang('blog.blog')</a>  </li>
							  <li class="breadcrumb-item active">@lang('blog.create_blog')</li>
							</ul>
						</div>							
					</div>

					<div class="container">
						<div class="blog-header clearfix">
							<h2><span class="buyer-title">@lang('blog.new_blog')</span></h2>
							<div class="pull-right mbleftPull">
								<span class="span_loader" style="display: none;"><img src="{{ Config('constants.loader_url') }}loading_small.gif"></span>
								<button type="submit" ng-click="addAction('draft')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_draft')</button>
								<button type="submit" ng-click="addAction('publish')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_and_publish')</button>
								<button type="reset" class="btn-md btn-skyblue">@lang('blog.reset')</button>
							</div>
						</div>
					</div>
				</div>		

				<div class="container">		
					<div class="newBlog-box row">
						<!--productform.$valid && -->											
						<div class="col-sm-3 nopadding">
							<div class="content-info-list">
								<h3>@lang('blog.attribute_information')</h3>
								<ul class="center">
									<li class="active">
										<a data-toggle="tab" href="#general" >@lang('blog.general') <i class="glyphicon glyphicon-pencil"></i></a>
									</li>									
									<li>
										<a data-toggle="tab" href="#video">@lang('blog.video')<i class="glyphicon glyphicon-pencil"></i></a>
									</li>
									<li>
										<a data-toggle="tab" href="#seo">@lang('blog.seo') <i class="glyphicon glyphicon-pencil"></i></a>
									</li>
								</ul>
							</div> 
						</div>            							
					<div class="col-sm-9 contentindideTab">       				
			        <div class="tab-content">
				        <div id="general" class="tab-pane in active">
				        	<div class="blog-tabcontent" >
		                		<div class="form-row">
									{!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'name', 'label'=>Lang::get('blog.blog_name').' <span class="star-top">*</span>']],'1') !!}
				           			<span id='error_blog_name' class="error-msg error-msg-top"></span>	

									{!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'short_desc', 'label'=>Lang::get('blog.short_description').' <span class="star-top">*</span>']],'2', $errors) !!}
			                		<span id='error_blog_short_desc' class="error-msg error-msg-top"></span>

									{!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'description', 'label'=>Lang::get('blog.blog_content').' <span class="star-top">*</span>', 'errorkey'=>'short_desc', 'cssClass'=>'texteditor1','froala'=>'froala']],'3', $errors) !!}
			                		<span id='error_blog_desc' class="error-msg error-msg-top"></span>

		                		</div>
								<div class="form-row">
									<div ng-bind="$scope.newTag.text"></div>
									<label>@lang('blog.blog_tags')<span class="star-top">*</span> </label>
									<div class="bs-example">
										<input name="tags" type="hidden" value="<% tags %>" >
										<tags-input placeholder="Product Tag" ng-model="tags" name="tagss" display-property="tag_title">
											<auto-complete source="loadTags($query)"></auto-complete>
										</tags-input>
									</div>
									<span id='error_tags' class="error-msg" ng-hide="tags"></span>
								</div>
							</div>
							<div class="detail-box catelog-create-sku">
								<div class="detail-box-content">
									<div class="form-row">
						                <h3>@lang('blog.blog_image')</h3>
											<div class="multiple-file-upload">				
											    <table class="table table-striped files ng-cloak">
													<tr ng-repeat="file in queue" ng-class="{'processing': file.$processing()}">
														<td ng-switch data-on="!!file.thumbnailUrl">
															<div class="preview" ng-switch-when="true">
															</div>
															<div class="preview" switch-default data-file-upload-preview="file"></div>
														</td>
													<td>
														<p class="name" ng-switch data-on="!!file.url">
															<span ng-switch-when="true" ng-switch data-on="!!file.thumbnailUrl">
																<a ng-switch-when="true" href="<%file.url%>" title="<%file.name%>" download="<%file.name%>" data-gallery><%file.name%></a>
																<a ng-switch-default href="<%file.url%>" title="<%file.name%>" download="<%file.name%>"><%file.name%></a>
															</span>
															<span ng-switch-default><%file.name%></span>
														</p>
														<strong show="file.error" class="error text-danger"><%file.error%></strong>
														<p> 
															<input name="default_image" type="radio" value="<%file.name%>" ng-checked="checkVal" ng-init="($index)? checkVal= false : checkVal=true"> @lang('blog.set_as_display_image') 
														</p>
														 <p class="size"><%file.size | formatFileSize%></p>
														<div class="progress progress-striped active fade" class="{pending: 'in'}[file.$state()]" data-file-upload-progress="file.$progress()"><div class="progress-bar progress-bar-success" style="{width: num + '%'}"></div></div>
														</td>
														<td>
															<div class="pull-right">
																<button type="button" class="btn btn-skyblue  cancel" ng-click="file.$cancel()" ng-hide="!file.$cancel">
																	<span>@lang('blog.cancel')</span>
																</button>

														   </div>
														</td>
														</tr>
												    </table>
													<div class="upload-row">
														<span class="fileinput-button file-upload-btn" ng-class="{disabled: disabled}">
										                	<img src="/images/upload-btn2.jpg">
										                	<input type="file" name="files[]" multiple  onchange="angular.element(this).scope().uploadedFileMJ(this)" > 
								            			</span>
													</div>
												    <div class="row fileupload-buttonbar">
												        <div class="col-lg-12">
												            <!-- The fileinput-button span is used to style the file input field as button -->
												          
												            <span class="btn-md btn-skyblue fileinput-button" ng-class="{disabled: disabled}">
												                <i class="glyphicon glyphicon-plus"></i>
												                <span>@lang('blog.add')</span>
												                <input type="file" name="files[]" multiple  onchange="angular.element(this).scope().uploadedFileMJ(this)">
												            </span>
												            <button type="button" class="btn-md btn cancel" ng-click="cancel()">
												                <i class="icon-remove"></i>
												                <span>@lang('blog.clear_upload')</span>
												            </button>
												            <!-- The global file processing state -->
												            <span class="fileupload-process"></span>
												        </div>				   
												    </div>
													<!-- </form> -->
												</div>
												<div class="product-tag">
													<div class="form-row">
														<label>@lang('blog.blogs_categories') <span class="star-top">*</span></label>	
														<a href="{{ action('Blog\BlogCategoryController@create') }}" target="_blank">
															<button class="btn-md btn" type="button">+ @lang('blog.create_new_category')</button>
														</a>
													</div>
													@if(!empty($catSeller))
													<div class="tree-menu">
														<div>
														<ul class="tree">
															<node-tree children="tree"></node-tree>
														 </ul>
														</div>
													</div>
													@endif
													<span id='error_seller_category' class="error-msg" ng-hide="node.checked"></span>
													<input type="hidden" id="sellerCatUrl" value="{{ action('Seller\ProductController@getSellerCategoryDroupdown')}}">
							                        <input type="hidden" id="adminCatUrl" value="{{ action('Seller\ProductController@getAdminCategoryDroupdown')}}">   
							                        <input type="hidden" id="tagurl" value = "{{action('Seller\ProductController@getTags')}}">  
													<input type="hidden" id="lang" value = "{{Lang::locale()}}" >
												</div>
												<div class="mkp-catg">
													<h3>@lang('blog.marketplace_categories') <span class="star-top">*</span></h3>
													<div class="form-row row" id="parentdiv">
														<div class="col-sm-4" id="adminCatDiv_1">
															<select id="adminCat" class="parent" data="0" ng-model="admincatmodel" name="admincat" ng-change="getSubAdminCat(admincatmodel,'cateId')" ng-init="admincatmodel= admincatmodel[0]">
                              									<option value="" selected="selected">@lang('blog.please_select')</option>
							                                  	@foreach($catAdmin as $catres)
							                                     	<option value="{{ $catres->id }}">
							                                      		{{ $catres->name }}
							                                      	</option>
							                                  	@endforeach
															</select>
														</div>
														<span id='error_category' class="error-msg error-msg-top"></span>
													</div>
													<p>
													<small ng-show="related_marketplace_cat_length">@lang('blog.bloggers_will_find_your_blog_in')
													<% related_marketplace_cat_length %> @lang('blog.places')
													</small>
													</p>
													<div ng-show="related_marketplace_cat" class="category-breadcum frmmax">
														<div ng-repeat="item in related_marketplace_cat.maketplace_related_cat_title">
															<%item%>
														</div>
													</div>
												</div>	
											</div>
										</div>
									</div>
									<div class="comment-note">
										<div class="form-row">
											<label>@lang('blog.active')<span class="star-top">*</span></label>
											<select name="status">
												<option value="1">@lang('blog.yes')</option>
												<option value="0">@lang('blog.no')</option>
											</select>
										</div>
										<div class="form-row">
											{!! CustomHelpers::fieldstabWithLanuage([['field'=>'textarea', 'name'=>'comment', 'label'=>Lang::get('blog.comment_note')]]) !!}
										</div>
									</div>
								</div>

								<div id="video" class="tab-pane detail-box">
									@include('includes.blog_video')	
								</div>

				        <div id="seo" class="tab-pane detail-box ">
					    		<div class="form-row">
										{!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'meta_title', 'label'=>Lang::get('product.meta_title')], ['field'=>'text', 'name'=>'meta_keyword', 'label'=>Lang::get('blog.meta_keywords')], ['field'=>'textarea', 'name'=>'meta_desc', 'label'=>Lang::get('blog.meta_description'), 'cssClass'=>'text-editor']],'3')!!}
									</div>        	
				        </div>
				        <div class="blog-header">
									<div class="pull-right mbleftPull">
										<span class="span_loader" style="display: none;"><img src="{{ Config('constants.loader_url') }}loading_small.gif"></span>
										<button type="submit" ng-click="addAction('draft')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_draft')</button>
										<button type="submit" ng-click="addAction('publish')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_and_publish')</button>
										<button type="reset" class="btn-md btn-skyblue">@lang('blog.reset')</button>
									</div>	
								</div>						        	
			        </div>															
						</div>							
					</div>
				</div>  
				<div class="push-content"></div>
			</form>				
		</div>
	</div>
@stop
@section('footer_scripts')

<script src="{{ Config::get('constants.js_url') }}jquery.ui.widget.js"></script>
<script src="{{ Config::get('constants.js_url') }}load-image.all.min.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.iframe-transport.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.fileupload.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.fileupload-process.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.fileupload-image.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.fileupload-angular.js"></script>
<script src="{{ Config::get('constants.js_url') }}ng-tags-input.js"></script>
<script src="{{ Config::get('constants.js_url') }}jquery.livequery.js"></script>
<script src="{{ Config::get('constants.js_url') }}SweetAlert.min.js"></script>
<script src="{{ Config::get('constants.js_url') }}lodash.min.js"></script>
<script src="{{ Config::get('constants.js_url') }}bootstrap-datepicker.js"></script>

<script src="{{ Config::get('constants.angular_js_url') }}seller/App/Controller/blogAddEdit.js"></script>
<script src="{{ Config::get('constants.angular_js_url') }}Froala/froalaConfig.js"></script>

@stop
