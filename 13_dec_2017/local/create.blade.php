@extends('layouts/admin/default')

@section('title')
    @lang('admin.all_translation_banner')
@stop

@section('header_styles')
    <!--page level css -->
    <link href="{{ asset('assets/vendors/jasny-bootstrap/css/jasny-bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendors/iCheck/css/all.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/pages/form_layouts.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/vendors/bootstrapvalidator/css/bootstrapValidator.min.css') }}" type="text/css" rel="stylesheet">
    <!-- end of page level css -->
    <link href="{{ asset('assets/vendors/jasny-bootstrap/css/jasny-bootstrap.css') }}" rel="stylesheet">

    <link href="{{ asset('assets/css/flatpickr.min.css') }}" rel="stylesheet">
    <link rel="stylesheet"  type="text/css" href="{{ asset('assets/css/bootstrap-colorpicker.css') }}"/>
 
@stop


@section('content')

<!-- Content start here -->

<script>
 var default_lang_id = '{{ $default_lang_id}}';  
 var type = '{{ $type }}';
</script>


    
    {!! Form::open(['action' => 'Admin\Attribute\AttributeController@store', 'id'=>'AttributeForm', 'class'=>'form-horizontal', 'files'=>true]) !!}
    <!-- content -->
    <div class="content">
        <div class="header-title">
            <h1 class="title">@lang('attribute.create_new_varaint_or_specification')</h1>
            <div class="pull-right btn-groups">
                <button class="">@lang('attribute.back')</button>
                <button class="btn-neg">@lang('attribute.reset')</button>
                <button class="secondary" type="submit">@lang('attribute.save')</button>
                <button class="btn manage-value-next" data-toggle="tab" href="#attr-manage" style="display: none" >@lang('attribute.next')</button>
            </div>
        </div>
        <div class="content-wrap clearfix">
            <div class="content-left">
                <div class="tablist">                    
                    <ul class="">
                        <li class="active"><a data-toggle="tab" href="#attr-general">@lang('attribute.general')</a></li>
                        <li class="manage-value" style="display: none">
                           <a data-toggle="tab" href="#attr-manage">@lang('attribute.manage_value')</a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="content-right">
                 
                   <div class="tab-content">
                     <div id="attr-general" class="tab-pane fade in active">
                      
                        <div class="row">
                            <div class="col-sm-5">
                                <h2 class="title">
                                    @lang('attribute.attribute_properties')
                                </h2>


                                 <!--div class="form-row">
                                   <label>Attribute Type</label>
                                    {!! Form::select('attribute_type', [ '1' => 'Attribute', '2'=>'Option'],  null) !!}

                                 </div-->
                                 

                                 {!! Form::hidden('attribute_type', old('attribute_type', $attribute_type),['id'=>'attribute_type'])!!}

                                  @if($type == 'variant')
                                    {!!  Form::hidden('is_varient', '1', ['id'=>'is_varient']) !!}
                                  @endif





                                <div class="form-row {{ $errors->has('attribute_code') ? 'error' : '' }}"">   
                                <label> 
                                 
                                @lang('attribute.attribute_code')

                                <i class="red">*</i> </label>
                                 {!! 
                                   Form::text('attribute_code', old('attribute_code'), ['placeholder'=>''])
                                 !!}
                                   @if ($errors->has('attribute_code'))
                                     <p id="name-error" class="error error-msg">{{ $errors->first('attribute_code') }}</p>
                                   @endif

                   


                                </div>

                                <div class="help-txt form-row">
                                    @lang('attribute.for_internal_use')
                                </div>



                            </div>
                            <div class="clear">
                                <div class="col-sm-7">
                                    <div class="form-row">    

                                    {!! CustomHelpers::fieldstabWithLanuage([['field'=>'text', 'name'=>'name', 'label'=>Lang::get('attribute.title_name').'<i class="red">*</i>','errorkey'=>'attribute_name']],'', $errors)!!}
                                    </div>
                                </div>
                            </div>
                           
                            <!--<span class="pull-right">Dropdown (Show Text and Color)</span><h3>Manage Titles (Size, Color, etc.)</h3>-->



                            <div class="col-sm-5">
                                <div class="form-row box">
                                    <!--span class="pull-right skyblue">help</span-->
                                    <label>@lang('attribute.catalog_input_type_for_store_owner')<i class="red">*</i> </label>
                                      {!! 
                                        Form::select('front_input', $front_input,  null) 
                                     !!}

                                    <div class="help-txt mt-5">
                                       @lang('attribute.for_internal_use')
                                    </div>
                                </div>
                                @if($type == 'specification')
                                   <div class="form-row" id="use_in_varient" style="display:none">
                                      <label>@lang('attribute.use_in_varient')</label>
                                         {!! Form::checkbox('is_varient', '1') !!}

                                     </div>
                                @endif     
                                <div class="form-row" id="attribute_type_value_cont" 
                                  style="display:none">
                                  <label>@lang('attribute.attribute_input_value')</label>
                                  {!! Form::select('attribute_type_value', ['plain_text'=>Lang::get('attribute.plain_text'), 'text_color_image'=>Lang::get('attribute.text_color_image')],  'plain_text', ['id'=>'attribute_type_value']) !!}

                               </div>
                            
                                 


                                <div class="form-row">
                                    <label>@lang('attribute.values_required')</label>

                                    {!! 
                                    Form::select('required', ['2'=>'No', '1'=>'Yes'],  null) 
                                    !!}

                                </div>

                                <div class="form-row">
                                    <label>@lang('attribute.use_in_search')</label>
                                    
                                    {!! 
                                    Form::select('use_in_search', ['2'=>'No', '1'=>'Yes'],  null) 
                                    !!}
                                </div>
                                <div class="form-row">
                                    <label>@lang('attribute.use_in_compare')
                                    </label>
                                    {!! 
                                    Form::select('use_in_compare', ['2'=>'No', '1'=>'Yes'],  null) 
                                    !!}
                                </div>
                                <div class="form-row row">
                                    <div class="col-sm-7">
                                        <label>
                                          @lang('attribute.use_in_layered_navigation')

                                        
                                        </label>
                                        {!! 
                                            Form::select('use_in_layered', ['2'=>'No', '1'=>'Yes'],  null) 
                                        !!}
                                    </div>
                                    <div class="col-sm-5">
                                        <label>@lang('attribute.position')</label>
                                         {!! 
                                           Form::text('positions', old('positions'), ['placeholder'=>'1'])
                                        !!}
                                    </div>
                                    
                                </div>
                                <div class="form-row help-txt">
                                   @lang('attribute.position_of_attribute')
                                    
                                </div>
                                <div class="form-row">
                                    <label>@lang('attribute.use_for_promo_rule_conditions')</label>

                                    {!! 

                                      Form::select('use_for_promo_rule', ['2'=>'No', '1'=>'Yes'],  null) 
                                        
                                    !!}
                                    
                                </div>
                                <div class="help-txt">
                                    @lang('attribute.can_be_used_only_with_catalog_input_type_dropdown')
                                </div>

                            </div>
                        </div>
                   
                    </div>
                    <div id="attr-manage" class="tab-pane fade">
                        <div class="form-row box original-group">  
                                                   
                          <div class="original row rows">   

                         
                            @php ($text_color_image = true) 

                            {!!CustomHelpers::texttabWithLanuageMultiArrayChangeDesign([['field'=>'text', 'name'=>'values', 'label'=>'']], '', $text_color_image)!!}


                          </div>

                        </div>

                        <div class="form-row actionsClone">
                            <a href="javascript:void(0)" class="add-clone secondary"><i class="icon-plus"></i> @lang('attribute.add_more')</a>
                         
                        </div>

                    </div>
                    
                    
                    
                    
                   </div>


               


            </div>




        </div>
    </div>

   {!! Form::close() !!}





@stop

@section('footer_scripts')

   
    <script src="{{ asset('assets/js/bootstrap-colorpicker.js') }}" type="text/javascript"></script>

    <script src="{{ asset('assets/js/attribute-validation.js') }}" type="text/javascript"></script>
    
    
@stop
