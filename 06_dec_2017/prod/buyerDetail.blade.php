@extends('layouts.buyer.default')

<!-- Content section start -->
@section('content')
{{-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> --}} 

<!-- for image crop -->
<link rel="stylesheet" href="{{asset('crop_dist/cropper.min.css')}}">
<link rel="stylesheet" href="{{asset('css/cropper_main.css')}}">
<!-- for image crop end-->

<!-- Content start here -->
	<div class="buyer-heading">
		<div class="container">
			<div class="row">
				<!-- <ul class="breadcrumb">
				  <li class="breadcrumb-item active">@lang('user.account')</li> 
				</ul> -->		
				<h2><span class="buyer-title">@lang('user.account_infomation')</span></h2>
			</div>		
		</div>
	</div>

	@if(Session::has('succMsg'))
	<div class="alert alert-success alert-dismissable margin5">
	    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
	    <strong>@lang('user.success'):</strong> {{ Session::get('succMsg') }}
	</div>
	@endif
	
	<div class="container">
		<div class="row acount-info">
			<div class="col-sm-6 lt-accInfo">
					<h2>@lang('user.personal_infomation')</h2>
					<div class="form-row" >
						<div class="" id="crop-avatar">
					    <!-- Current avatar -->
					    <div class="avatar-view" title="@lang('user.change_the_avatar')">
					      <img src="{{ getUserImageUrl() }}" width="136px;" height="136px;" alt="" id="pfimage">
					    </div>

					    <!-- Cropping modal -->
					    <div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
					      <div class="modal-dialog modal-lg">
					        <div class="modal-content">
					          <form class="avatar-form" action="{{action('ImageCropperController@cropProfileImage')}}" enctype="multipart/form-data" method="post">
					           <input type="hidden" name="_token" id="csrf-token" value="{{ Session::token() }}" />

					            <div class="modal-header">
					              <button type="button" class="close" data-dismiss="modal">&times;</button>
					              <h4 class="modal-title" id="avatar-modal-label">@lang('user.change')</h4>
					            </div>
					            <div class="modal-body">
					              <div class="avatar-body">

					                <!-- Upload image and data -->
					                <div class="avatar-upload">
					                  <input type="hidden" class="avatar-src" name="avatar_src">
					                  <input type="hidden" class="avatar-data" name="avatar_data">
					                  <label for="avatarInput">@lang('user.local_upload')</label>
					                  <input type="file" class="avatar-input" id="avatarInput" name="avatar_file" accept="image/*">
					                </div>

					                <!-- Crop and preview -->
					                <div class="row">
					                  <div class="col-md-9">
					                    <div class="avatar-wrapper"></div>
					                  </div>
					                  <div class="col-md-3">
					                    <div class="avatar-preview preview-lg circle"></div>
					                    {{-- <div class="avatar-preview preview-md"></div>
					                    <div class="avatar-preview preview-sm"></div> --}}
					                  </div>
					                </div>

					                <div class="row avatar-btns">
					                  <div class="col-md-9">
					                    <div class="btn-group">
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate -90 degrees">@lang('user.rotate_left')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-15">-15@lang('user.deg')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-30">-30@lang('user.deg')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45">-45@lang('user.deg')</button>
					                    </div>
					                    <div class="btn-group">
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate 90 degrees">@lang('user.rotate_right')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="15">15@lang('user.deg')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="30">30@lang('user.deg')</button>
					                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="45">45@lang('user.deg')</button>
					                    </div>
					                  </div>
					                  <div class="col-md-3">
					                    <button type="submit" class="btn btn-primary btn-block avatar-save">@lang('user.done')</button>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <!-- <div class="modal-footer">
					              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					            </div> -->
					          </form>
					        </div>
					      </div>
					    </div><!-- /.modal -->

					    <!-- Loading state -->
					    <div class="loading" aria-label="Loading" role="img" tabindex="-1"></div>
						</div>
					</div>
			<form method="post" action="{{ action('Buyer\BuyerProfileController@update', $buyerDetail->id) }}" class="acount-info">
				{{ csrf_field() }}
				{{ method_field('PUT') }}			
				
					{{-- <div class="form-row fileUp">
						<div class="file-img" id="image_display">
							<img src="{{ Config::get('constants.users_url').$buyerDetail->image }}" width="136px;" height="136px;">
						</div>
						<span class="upload-btn-wrapper" id="image_upload">
							<input type="file">
							<button class="btn-md btn-skyblue">@lang('user.choose_profile_image')</button>
						</span>
						<span id="image_upload_status"></span>
					</div> --}}

					
					<input type="hidden" name="image" id="pimage" />

					<div class="form-row row">
						<div class="col-sm-4 col-xs-5">
							<label>@lang('user.user_email')</label>
						</div>
						<div class="col-sm-8 col-xs-7">
							<a href="mailto:{{ $buyerDetail->email }}">{{ $buyerDetail->email }}</a>
						</div>
					</div>
					<div class="form-row">
						<label>@lang('user.social_url')</label>
						<input type="text" name="user_name" value="{{ $buyerDetail->user_name }}">
						@if ($errors->has('user_name'))
						    <p class="error error-msg">{{ $errors->first('user_name') }}</p>
						@endif						
					</div>					
					<div class="form-row">
						<label>@lang('user.first_name')</label>
						<input type="text" name="name" value="{{ $buyerDetail->name }}">
						@if ($errors->has('name'))
						    <p class="error error-msg">{{ $errors->first('name') }}</p>
						@endif						
					</div>
					<div class="form-row">
						<label>@lang('user.last_name')</label>
						<input type="text" name="sur_name" value="{{ $buyerDetail->sur_name }}">
						@if ($errors->has('sur_name'))
						    <p class="error error-msg">{{ $errors->first('sur_name') }}</p>
						@endif						
					</div>										
					<div class="form-row">
						<label>@lang('user.display_name')</label>
						<input type="text" name="display_name" value="{{ $buyerDetail->display_name }}">
						@if ($errors->has('display_name'))
						    <p class="error error-msg">{{ $errors->first('display_name') }}</p>
						@endif						
					</div>
					<div class="form-row">
						<label>@lang('user.password')</label>
						<input type="password" name="password" placeholder="**********">
					</div>
					<div class="form-row">
						<label>@lang('user.confirm_password')</label>
						<input type="password" name="confirm_password" placeholder="**********">
						@if ($errors->has('confirm_password'))
						    <p class="error error-msg">{{ $errors->first('confirm_password') }}</p>
						@endif						
					</div>
					<div class="form-row">
						<label>@lang('user.sex')</label>
						<div class="radio-group">
							<label class="radio-wrap">
								<input name="sex" type="radio" name="gender" value="M" @if($buyerDetail->gender == 'M') checked @endif>
								<span class="radio-label">  @lang('user.male')</span>
							</label>
							<label class="radio-wrap">
								<input name="sex" type="radio" name="gender" value="F"  @if($buyerDetail->gender == 'F') checked @endif>
								<span class="radio-label">  @lang('user.female')</span>
							</label>
							<label class="radio-wrap">
								<input name="sex" type="radio" name="gender" value="U"  @if($buyerDetail->gender == 'U') checked @endif>
								<span class="radio-label">  @lang('user.undefine')</span>
							</label>							
						</div>
					</div>
					<div class="form-row">
						<label>@lang('user.birthday')</label>
						<div class="row">
							<div class="col-sm-4 col-xs-4 birthday-sel">
								{!! Form::selectRange('dob[day]', 01, 31, $buyerDetail->dob_d) !!}
							</div>
							<div class="col-sm-4 col-xs-4 birthday-sel">
								{!! Form::selectMonth('dob[month]', $buyerDetail->dob_m, array(), '%b') !!}
							</div>
							<div class="col-sm-4 col-xs-4 birthday-sel">
								{!! Form::selectYear('dob[year]', date('Y')-80, date('Y')-20, $buyerDetail->dob_y) !!}
							</div>
						</div>
						
					</div>
					<div class="form-row">
						<label>@lang('user.country')</label>
						<select name="default_country">
							<option value="">--@lang('user.select')--</option>
							{!! CustomHelpers::getCountryDorpDown($buyerDetail->default_country) !!}
						</select>
						@if ($errors->has('default_country'))
						    <p class="error error-msg">{{ $errors->first('default_country') }}</p>
						@endif						
					</div>
					<div class="form-row">
						<label>@lang('user.time_zone')</label>
						<select name="time_zone">
							<option value="">--@lang('user.select')--</option>
							@foreach($timezones as $val)
								<option value="{{ $val->timezone }}" @if($buyerDetail->time_zone == $val->timezone) selected="selected" @endif>{!! $val->gmt_offset.' '.$val->timezone !!}</option>
							@endforeach
						</select>
						@if ($errors->has('time_zone'))
						    <p class="error error-msg">{{ $errors->first('time_zone') }}</p>
						@endif						
					</div>										

                   <h3 class="form-row mt-10"> 

                       <a href="{{ action('HomeController@viewtopics') }}"  data-toggle="modal" data-target="#topicManagement" class="skyblue">Update Interest</a>

                   </h3>



				</div>
				<div class="col-sm-5">
					<h2>@lang('user.language')</h2>
					<ul class="select-lang">

						@foreach($lang as $language)

							<li>
								<span class="lang-warpper @if($buyerDetail->default_language == $language->id) checked-class @endif">
									<input type="radio" name="default_language" value="{{ $language->id }}" @if($buyerDetail->default_language == $language->id) checked="checked" @endif>
									<div class="lang-name">
										<span class="lang-icon"><img src="{{ Config::get('constants.language_url').$language->languageFlag }}"></span>
										<span class="name">{{ $language->languageName }}</span>
									</div>
								</span>								
							</li>

						@endforeach

					</ul>
					<h2>@lang('user.mail_language')</h2>
					<ul class="select-lang">

						@foreach($lang as $language)

							<li>
								<span class="lang-warpper @if($buyerDetail->default_language == $language->id) checked-class @endif">
									<input type="radio" name="default_email_language" value="{{ $language->id }}" @if($buyerDetail->default_email_language == $language->id) checked="checked" @endif>
									<div class="lang-name">
										<span class="lang-icon"><img src="{{ Config::get('constants.language_url').$language->languageFlag }}"></span>
										<span class="name">{{ $language->languageName }}</span>
									</div>
								</span>								
							</li>

						@endforeach						

					</ul>
					<h2>@lang('user.currency')</h2>
					<ul class="select-lang">

						@foreach($currency as $cur)

							<li>
								<span class="lang-warpper @if($buyerDetail->default_currency == $cur->id) checked-class @endif">
									<input type="radio" name="default_currency" value="{{ $cur->id }}" @if($buyerDetail->default_currency == $cur->id) checked="checked" @endif>
									<div class="lang-name">
										<span class="lang-icon"><img src="{{ Config::get('constants.currency_url').$cur->currency_image }}"></span>
										<span class="name">{{ $cur->currency_code }}</span>
									</div>
								</span>								
							</li>

						@endforeach	

					</ul>

				</div>
				<div class="save-prof-btn col-sm-12">
					<button type="submit" class="btn-md btn-skyblue">@lang('user.save_profile')</button>
				</div>
			</form>
		</div>	
	</div>

	{!!PopUpHelpers::TopicManagementpopUp()!!}

@stop

@section('footer_scripts')

<!-- for file upload -->
{{-- 
<script type="text/javascript" src="{{ Config::get('constants.js_url') }}Ajaxfileupload-jquery-1.3.2.js" ></script>
<script type="text/javascript" src="{{ Config::get('constants.js_url') }}ajaxupload.3.5.js" ></script>

<script>

$(function(){

	var loader = '<img src="{{ Config::get('constants.loader_url') }}Loading_icon.gif" height="136" width="136"/>';

	var upload_path = "{{ Config::get('constants.users_path') }}";
	var upload_url = "{{ Config::get('constants.users_url') }}";	

    var image_upload = $('#image_upload');
    var image_upload_status = $('#image_upload_status');
    var image_display = $('#image_display');

    //alert(user_id+'=='+image_upload+'=='+image_upload_status+'=='+image_display);

    new AjaxUpload(image_upload, {

    	dataType: 'json',
        action: "{{ action('AjaxController@uploadImageAjax') }}",
        name: "uploadfile",
        data: {'upload_path':upload_path, 'width':136, 'height':138, '_token':window.Laravel.csrfToken},

        onSubmit: function(file, ext){
            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))){
                image_upload_status.text("Only jpg|png|jpeg|gif files are allowed");
                return false;
            }
            image_display.html(loader);
        },
        onComplete: function(file, response){
            var json = JSON.parse(response);
            if(json.status == "success"){

            	image_display.html('<img src="'+upload_url+json.file_name+'" alt="profile photo" width="136" height="138" /><input type="hidden" name="image" value="'+json.file_name+'" />');
            } else{
                image_upload_status.text("Unable to uload file");
            }
        }
    });
});

</script> --}}
<!-- for file upload end-->

{{-- <script src="http://code.jquery.com/jquery-1.12.4.min.js"></script> --}}
{{-- <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>  --}}

<!-- for image crop -->
<script src="{{asset('crop_dist/cropper.js')}}"></script>
<script src="{{asset('js/crop_main.js')}}"></script>
<!-- for image crop -->

@stop
