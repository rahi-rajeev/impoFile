@extends('layouts.blog.default')

@section('content')    
<link rel="stylesheet" href="{{asset('crop_dist/cropper.min.css')}}">
<link rel="stylesheet" href="{{asset('css/cropper_main.css')}}">


<div class="buyer-heading">
    

    <div class="container">
        <div class="breadcrumb-wrapper">
            <ul class="breadcrumb row">
              <li class="breadcrumb-item"><a href="{{ action('Blog\BlogController@index') }}">@lang('blog.blog')</a></li>
              <li class="breadcrumb-item active"> @lang('blog.blogger_setting')</li>
            </ul>
        </div>
        <h2><span class="buyer-title">@lang('blog.blogger_setting')</span></h2>
    </div>
</div>
<div class="container" id="crop-avatar">
    <div class="row blog-box shop-setting-content">
        @if(Session::has('succMsg'))
        <div class="alert alert-success alert-dismissable margin5">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>Success:</strong> {{ Session::get('succMsg') }}
        </div>
        @endif        
        <h2>@lang('blog.blogger_infomation')</h2>

        <div class="shop-info-row">
            <div class="row">
                <div class="col-sm-6">
                    
                    <div class="shop-setting-avtar" id="avtr-small">                                
                        <div class="avatar-view" title="Change the avatar" id="shop_banner_thumb" >
                            <img src="{{ $blogger_detail->thumb_image }}" alt="" height="95" width="95">
                        </div>
                    </div>

                    <form name="blo_update_frm" id="blog_update_frm" action="{{ action('Blog\BlogController@blogSettingUpdate', $blogger_detail->id) }}" method="post" enctype="multipart/form-data">		
                    {{ csrf_field() }}        
                    
                    <input type="hidden" name="blog_image"  id="blog_thumb_image_file" value="{{$blogger_detail->image }}"/>
                    <input type="hidden" name="blog_banner" id="blog_banner_file" value="{{$blogger_detail->banner}}"/>
                                        
                    <div class="shop-avtar-info">
                        <div class="shop-avtar-row">
                            <label>@lang('blog.blogger_name')</label> {{ strtoupper($blogger_detail->nickname) }}
                        </div>

                        <div class="shop-avtar-row">
                            <label>@lang('blog.blogger_id')</label> {{ $blogger_detail->blogger_id_show }}
                        </div>
                        <div class="shop-avtar-row">
                            <label>@lang('blog.joined')</label> {{ GeneralFunctions::getDateFormat($blogger_detail->created_at, '2') }}
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 shop-avtar-url">
                    <div class="shop-avtar-row">
                        <label>@lang('blog.your_blog_url')</label> <a href="{{ getBloggerDetailUrl($blogger_detail->url) }}">{{ $blogger_detail->url }}</a>
                    </div>
                    <div class="shop-avtar-row">
                        <label>@lang('blog.email')</label> <a href="mailto:{{ Auth::user()->email }}">{{ Auth::user()->email }}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="shop-info-row">
            <h2>@lang('blog.blog`s_banner')</h2>
            <div class="row">
                <div class="shop-banner-sm col-sm-12 col-md-10">
                    <label>@lang('blog.size_830x240')</label>
                    <div class="upload-img">
                        <div class="avatar-view" title="Change the avatar" id="shop_banner">
                            <img src="{{ $blogger_detail->banner_img }}" alt="" height="240" width="830">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="shop-info-row last">
            <h2>@lang('blog.landing_page_infomation')</h2>
        </div>              
        <div class="landing-info-tab text-editor">
            {!! CustomHelpers::tabWithLanuageEdit([['field'=>'textarea', 'name'=>'description', '', '']], '1', 'blogger_id', $blogger_detail->id, $tblBloggerDesc) !!}

            <div class="form-row btn-group-row">
                <button type="submit" class="btn-md btn-skyblue">@lang('blog.save')</button>
            </div>              
        </div>      

        </form>
    </div>

    <div class="modal fade" id="avatar-modal" aria-hidden="true" aria-labelledby="avatar-modal-label" role="dialog" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <form class="avatar-form" action="{{action('ImageCropperController@cropShopBlogImage')}}" enctype="multipart/form-data" method="post">
          <input type="hidden" name="modelfor" id="modelfor">
          <input type="hidden" name="type" value="blog">
          <input type="hidden" name="blogerdetailid" value="{{$blogger_detail->id}}">
           {{ csrf_field() }}

            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title" id="avatar-modal-label">Change Avatar</h4>
            </div>
            <div class="modal-body">
              <div class="avatar-body">

                <!-- Upload image and data -->
                <div class="avatar-upload">
                  <input type="hidden" class="avatar-src" name="avatar_src">
                  <input type="hidden" class="avatar-data" name="avatar_data">
                  <label for="avatarInput">Local upload</label>
                  <input type="file" class="avatar-input" id="avatarInput" name="avatar_file" accept="image/*">
                </div>

                <!-- Crop and preview -->
                <div class="row">
                  <div class="col-md-9">
                    <div class="avatar-wrapper"></div>
                  </div>
                  <div class="col-md-3">
                    <div class="avatar-preview preview-lg" id="imgprev"></div>
                  </div>
                </div>

                <div class="row avatar-btns">
                  <div class="col-md-9">
                    <div class="btn-group">
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-90" title="Rotate -90 degrees">Rotate Left</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-15">-15deg</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-30">-30deg</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45">-45deg</button>
                    </div>
                    <div class="btn-group">
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="90" title="Rotate 90 degrees">Rotate Right</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="15">15deg</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="30">30deg</button>
                      <button type="button" class="btn btn-primary" data-method="rotate" data-option="45">45deg</button>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <button type="submit" class="btn btn-primary btn-block avatar-save">Done</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

</div>

@endsection 

@section('footer_scripts')

@include('includes.froalaeditor_dependencies')
<script src="{{asset('js/normal_froala_editor_setting.js')}}"></script>
<script src="{{asset('crop_dist/cropper.js')}}"></script>
<script src="{{asset('js/blogsetting_crop_main.js')}}"></script>
@stop