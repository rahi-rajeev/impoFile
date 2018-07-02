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
		var form_submit_url = '{{ $blog_detail_arr['form_submit_url'] }}';
		var form_submit_type = '{{ $blog_detail_arr['form_submit_type'] }}';
		var form_submit_redirect_url = '{{ action('Blog\BlogController@index') }}';
		var image_delete_url = '{{ action('Blog\BlogController@deleteImage') }}';
		var relatedcaturl = "{{ action('Blog\BlogController@getBlogRelatedCategories') }}";

		var blog_tag = {!! $blog_tag !!};
		var prod_img = {!! $prod_img !!};
		var prod_seller_cat = {!! $prod_seller_cat !!};
		var main_cat = {!! $catAdmin !!};
		var relatedcats = {!! $related_categories !!};

		var related_cat_count = {{ $blog_detail_arr['related_cat_count'] }};

		var videoss = {!! $videos !!}; 
		var videodurl = "{{action('Seller\ProductController@deleteVideo')}}";

	</script>
	<style>
		.red {
		  border: solid 1px red;
		}
	</style>

	@include('includes.froalaeditor_dependencies')
	<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script>	

	<div ng-app="productApp" ng-controller="productController as pdc"  ng-cloak>
		<div ng-if="createprodsec">
			<form name="productform" ng-submit="saveProduct($event)" method ="post" id="productform" enctype='multipart/form-data' ng-class="{'fileupload-processing': processing() || loadingFiles}" file-upload="options" files ="true" novalidate>
				<input type="hidden" name="blog_id" value="{{ $blog_detail_arr['id'] }}">

				<div class="buyer-heading">
					<div class="container">
					<div class="breadcrumb-wrapper">
						<ul class="breadcrumb row">
						  <li class="breadcrumb-item"><a href="{{ action('Blog\BlogController@index') }}">@lang('blog.blog')</a>  </li>
						  <li class="breadcrumb-item active"> @lang('blog.edit_blog')</li>
						</ul>
						</div>						
					</div>

					<div class="container">
						<div class="blog-header clearfix">
							<h2><span class="buyer-title">@lang('blog.edit_blog')</span></h2>
							<div class="pull-right mbleftPull">
								<span class="span_loader" style="display: none;"><img src="{{ Config('constants.loader_url') }}loading_small.gif"></span>
								@if($blog_detail_arr['form_submit_type'] == 'create')
									<button type="submit" ng-click="addAction('draft')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_draft')</button>
									<button type="submit" ng-click="addAction('publish')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_and_publish')</button>
								@else
									<button type="submit" class="btn-md btn-skyblue submit-buttom">@lang('blog.update_and_publish')</button>
								@endif
							</div>
						</div>
					</div>
				</div>		

				<div class="container">		
					<div class="newBlog-box row">							
						<div class="col-sm-3 nopadding clearfix">
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
    					<div class="col-sm-9">       				
						        <div class="tab-content">
							        <div id="general" class="tab-pane in active">
							        
							        	<div class="blog-tabcontent" >
						                <div id="" class="form-row">
							         			{!! CustomHelpers::fieldstabWithLanuageEdit([['field'=>'text', 'name'=>'name', 'label'=>Lang::get('blog.blog_name').' <span class="star-top">*</span>']],'1','product_id',$blog_detail_arr['id'], $tblProdDesc) !!}
								           		<span id='error_blog_name' class="error-msg error-msg-top"></span>	

												{!! CustomHelpers::fieldstabWithLanuageEdit([['field'=>'textarea', 'name'=>'short_desc', 'label'=>Lang::get('blog.short_description').' <span class="star-top">*</span>']], '2', 'product_id', $blog_detail_arr['id'], $tblProdDesc) !!}
						                		<span id='error_blog_short_desc' class="error-msg error-msg-top"></span>

												{!! CustomHelpers::fieldstabWithLanuageEdit([['field'=>'textarea', 'name'=>'description', 'label'=>Lang::get('blog.blog_content').' <span class="star-top">*</span>']], '3', 'product_id', $blog_detail_arr['id'], $tblProdDesc, '', 'angular') !!}
						                		<span id='error_blog_desc' class="error-msg error-msg-top"></span>

							                </div>
							                <div class="form-row">
							                	<div ng-bind="$scope.newTag.text"></div>
							                	<label>@lang('blog.blog_tags')<span class="star-top">*</span></label>
							                	<div class="bs-example">
													<input name="tags" type="hidden" value="<% edit_tags %>">
													<tags-input placeholder="Product Tag" ng-model="edit_tags" name="tagss" display-property="tag_title">
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
																	 <img src="<%file.thumbnailUrl%>" alt="" height="40px" width="40px">
																	</div>
																	<div class="preview" switch-default data-file-upload-preview="file"></div>
																</td>
																<td>
																<p class="name" ng-switch data-on="!!file.url">
																	<span ng-switch-when="true" ng-switch data-on="!!file.thumbnailUrl">
																		<%file.name%>
																	</span>
																	<span ng-switch-default><%file.name%></span>
																</p>
																<strong show="file.error" class="error text-danger"><%file.error%></strong>
																<p> 
																	<input name="default_image" type="radio" value="<%file.name%>" ng-checked="checkVal" ng-init="(file.is_default=='1')?checkVal=true:checkVal=false"> @lang('blog.set_as_display_image') 
																</p>
																<%file.file_size%>
																<p class="size"><%file.size | formatFileSize%></p>
																<div class="progress progress-striped active fade" class="{pending: 'in'}[file.$state()]" data-file-upload-progress="file.$progress()"><div class="progress-bar progress-bar-success" style="{width: num + '%'}"></div></div>
																</td>
																<td>
																	<div class="pull-right">
																	
																		<button type="button" class="btn btn-skyblue  delete" ng-click="deletePrevUploadImg(file.id, $index)" ng-hide="file.$cancel || file.is_default=='1'" >@lang('blog.delete')</button>

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
													          
													            <span class="btn-md btn-skyblue fileinput-button" ng-class="{disabled: disabled}">
													                <i class="glyphicon glyphicon-plus"></i>
													                <span>@lang('blog.add')</span>
													                <input type="file" name="files[]" multiple  onchange="angular.element(this).scope().uploadedFileMJ(this)">
													            </span>
													            <button type="button" class="btn-md btn cancel" ng-click="cancel()">
													                <i class="icon-remove"></i>
													                <span>@lang('blog.clear_upload')</span>
													            </button>

													            <span class="fileupload-process"></span>
													        </div>				   
													    </div>
													</div>
													<div class="product-tag">
														<div class="form-row">
															<label>@lang('blog.blogs_categories') <span class="star-top">*</span></label>	
																<a href="{{ action('Blog\BlogCategoryController@create') }}" target="_blank">
																	<button class="btn-md btn" type="button">+ @lang('blog.create_new_category')</button>
																</a>
														</div>
														<div class="tree-menu">
															<div>
															<ul class="tree">
																<node-tree children="tree"></node-tree>
															 </ul>
															</div>
														</div>
														<span id='error_seller_category' class="error-msg" ng-hide="node.checked"></span>
														<input type="hidden" id="sellerCatUrl" value="{{ action('Seller\ProductController@getSellerCategoryDroupdown')}}">
								                        <input type="hidden" id="adminCatUrl" value="{{ action('Seller\ProductController@getAdminCategoryDroupdown')}}">   
								                        <input type="hidden" id="tagurl" value = "{{action('Seller\ProductController@getTags')}}">  
														<input type="hidden" id="lang" value = "{{Lang::locale()}}" >
													</div>
													<div class="mkp-catg">
														<h3>@lang('blog.marketplace_categories') <span class="star-top">*</span></h3>
														<div class="form-row row" id="parentdiv">
															<div class="col-sm-4" ng-repeat="catItem in main_cat track by $index">

																<select id="adminCat" class="parent" data="0"  ng-model="admincatmodel[$index]" name="admincat" ng-change="getSubAdminCat(admincatmodel,'cateId',$index)"  ng-options ="cat.cat_id as cat.cat_name for cat in catItem track by cat.cat_id">
						           						<option value="" selected="selected">@lang('blog.please_select')</option>
																</select>
															</div>			
														</div>
														<span id='error_category' class="error-msg"></span>

														<p>
														<small ng-show="related_marketplace_cat_length">@lang('blog.bloggers_will_find_your_blog_in')
														<% related_marketplace_cat_length %> @lang('blog.places')
														</small>
														</p>
														<div ng-show="related_marketplace_cat.maketplace_related_cat_title" class="category-breadcum frmmax">
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
													<option value="1" @if($blog_detail_arr['status'] == '1') selected="selected" @endif>@lang('blog.yes')</option>
													<option value="0" @if($blog_detail_arr['status'] == '0') selected="selected" @endif>@lang('blog.no')</option>
												</select>
											</div>
											<div class="form-row">
							              		{!! CustomHelpers::fieldstabWithLanuageEdit([['field'=>'textarea', 'name'=>'comment', 'label'=>Lang::get('blog.comment_note')]],'3', 'product_id', $blog_detail_arr['id'], $tblProdDesc) !!}		
											</div>
										</div>

									</div>

									<div id="video" class="tab-pane detail-box">
										@include('includes.blog_video')	
									</div>

						        	<div id="seo" class="tab-pane detail-box ">
							    		<div class="form-row">
											{!! CustomHelpers::fieldstabWithLanuageEdit([['field'=>'text', 'name'=>'meta_keyword', 'label'=>Lang::get('blog.meta_keywords')],['field'=>'textarea', 'name'=>'meta_desc', 'label'=>Lang::get('blog.meta_description')]],'4', 'product_id', $blog_detail_arr['id'], $tblProdDesc) !!}
										</div>        	
						       		</div>

									<div class="pull-right">
										<span class="span_loader" style="display: none;"><img src="{{ Config('constants.loader_url') }}loading_small.gif"></span>
										@if($blog_detail_arr['form_submit_type'] == 'create')
											<button type="submit" ng-click="addAction('draft')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_draft')</button>
											<button type="submit" ng-click="addAction('publish')" class="btn-md btn-skyblue submit-buttom">@lang('blog.save_and_publish')</button>
										@else
											<button type="submit" class="btn-md btn-skyblue submit-buttom">@lang('blog.update_and_publish')</button>
										@endif
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
