@extends('layouts/admin/default')

@section('title')
    @lang('admin.all_translation_banner')
@stop

@section('header_styles')
    <!--page level css -->
   
    <link href="{{ asset('assets/css/pages/form_layouts.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/flatpickr.min.css') }}" rel="stylesheet">
    <link rel="stylesheet"  type="text/css" href="{{ asset('assets/css/bootstrap-colorpicker.css') }}"/>

    <!--page level css -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/vendors/datatables/css/dataTables.bootstrap.css') }}" />

    <link href="{{ asset('assets/css/pages/tables.css') }}" rel="stylesheet" type="text/css" />
    <!-- end of page level css -->


 
@stop


@section('content')

<!-- Content start here -->


 <div class="content">
        <div class="header-title">
            <h1 class="title">@lang('attribute.attribute_set_management')</h1>
            <div class="pull-right btn-groups">
                <a class="btn" onclick="document.getElementById('AttributeSetForm').submit();">@lang('attribute.save')</a>
            </div>
        </div>
        <div class="content-wrap clearfix">

            <div class="col-sm-3 attribute-wrap">
               <h2 class="attr-title"><strong>@lang('attribute.attribute')</strong></h2>
               <a href="javascript:void(0)" class="secondary">@lang('attribute.create_new_attribute')</a>
               <div class="drag-wrap">
                   <div class="form-row">
                       <label>@lang('attribute.drag_attribute_to_use')
                         <i class="pull-right glyphicon glyphicon-share-alt"></i>
                       </label>
                       <!--form action="">
                           <div class="attr-search-warp">
                           <input type="text" placeholder="Search Attribute">
                           <button type="submit" class="btn-search"><span class="icon-search"></span></button>
                           </div>
                       </form>
                       <div class="pager">
                           <span class="glyphicon glyphicon-menu-left prev" ></span>
                           <input type="text">
                           <span class="count-num">@lang('attribute.of') {{ count($results)}}</span>
                           <span class="glyphicon glyphicon-menu-right next" ></span>
                       </div-->

                                
                          <table class="table">
                            <thead>
                              <tr style="display:none">
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                                <th>#</th>
                              </tr>
                            </thead>
                            <tbody class="attr-row-wrap" id="attr-row-wrap">
                             @php($i = 1)
                             @foreach($results as $result) 
                              <tr class="attr-row" itemid="itm-{{ $result['id']}}">
                                <td>{{$i++}}
                                    <input type="hidden" name="attributes_id[]" value="{{ $result['id'] }}">

                                  </td>
                                <td><span class="glyphicon glyphicon-menu-hamburger"></span></td>
                                <td>{{ $result['name'] }}</td>
                                <td><span class="pull-right glyphicon {{ $result['front_class'] }}"></span></td>
                              </tr>
                               @endforeach
                            </tbody>
                          </table>
                     



                       <!--div class="attr-row-wrap" id="attr-row-wrap">  
                          @php($i = 1)
                          @foreach($results as $result) 
                           
                           <div class="attr-row" itemid="itm-{{ $result['id']}}">
                               <span class="count">{{$i++}}</span>
                               <span class="glyphicon glyphicon-menu-hamburger"></span>
                               <span class="attr-name">{{ $result['name'] }}</span>
                               <span class="pull-right glyphicon {{ $result['front_class'] }}"></span>
                               <input type="hidden" name="attributes_id[]" value="{{ $result['id'] }}">

                           </div>
                          @endforeach

                        </div-->
                       
                   </div>
               </div>
            </div>

            <div class="col-sm-7">
                <h2 class="attr-title"><strong>@lang('attribute.attribute_set')</strong></h2>



               {!! Form::open(['action' => 'Admin\Attribute\AttributeController@storeset', 'id'=>'AttributeSetForm', 'class'=>'form-horizontal', 'files'=>true]) !!}

                <div class="row">
                    <div class="form-row">
                       

                       <div class="col-sm-4 {{ $errors->has('attribute_code') ? 'error' : '' }}"">  <label>@lang('attribute.set_name')<i class="red">*</i> </label>
                          {!! Form::text('name', old('name'), ['placeholder'=>'']) !!}
                          @if ($errors->has('name'))
                            <p id="name-error" class="error error-msg">{{ $errors->first('name') }}</p>
                          @endif
                       </div>
                       
                       <div class="col-sm-4">
                         <label>@lang('attribute.base_on')</label>
                           {!! Form::select('base_on_id', $attributesets,  null)  !!}
                       </div>

                    </div>
                    <div class="form-row">
                        <div class="col-sm-8">
                          <label>@lang('attribute.description')</label>
                           {!! Form::textarea('description', old('description'), ['placeholder'=>'']) !!}
                         </div>
                    </div>
                    <div class="form-row color-group">
                        <div class="col-sm-2">
                           
                           <label>@lang('attribute.label_flag')</label>
                           {!! Form::text('label_flag', old('label_flag'), ['placeholder'=>Lang::get('attribute.label_flag')]) !!}

                        </div>
                        <div class="col-sm-2">
                           
                            <label>@lang('attribute.font_color')</label>
                            <span id="font-color" class="input-group colorpicker-component">
                               {!! Form::text('font_color', old('font_color'), ['placeholder'=>'', 'value'=>'#ff004a']) !!}
                               <span class="input-group-addon"><i style="background-color: #ff004a;"></i></span> 
                            </span>
                        </div>
                        <div class="col-sm-2">
                            <label>@lang('attribute.flag_bg_color')</label>
                            <span id="bg-color" class="input-group colorpicker-component"> 
                                 {!! Form::text('flag_bg_color', old('flag_bg_color'), ['placeholder'=>'', 'value'=>'#000']) !!}
                                <span class="input-group-addon"><i style="background-color: #000;"></i></span> 
                            </span>
                            
                        </div>
                        <div class="col-sm-2">
                            <label>@lang('attribute.remind_icon')</label>
                            <div class="file-wrapper">
                              <span class="add-files">

                                 <img src="images/browse-btn3.png" width="38" height="38">
                              </span>
                              {!! Form::file('remind_icon', ['class'=>'form-control']) !!}
                              
                              @if ($errors->has('remind_icon'))
                                <p id="name-error" class="error error-msg">{{ $errors->first('remind_icon') }}</p>
                              @endif

                            </div>

                        </div>
                        <div class="col-sm-2">
                            <label for="">&nbsp;</label>
                            <a class="primary-color" href="javascript:void(0)" data-toggle="modal" data-target="#help"> @lang('attribute.help')</a>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-sm-8">
                            <div class="box">
                                <div class="blank-drag" id="drag">
                                    <p class="blank-txt"><i class="glyphicon glyphicon-share-alt"></i> @lang('attribute.drag_your_attribute_drop_here')</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               {!! Form::close() !!}




            </div> 

            <!-- Help  -->

            <div id="help" class="modal fade" role="dialog">
              <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                  <div class="modal-header">
                    <span class="close icon-remove" data-dismiss="modal"></span>
                    <h2 class="modal-title">@lang('attribute.modal_header')</h2>
                  </div>
                  <div class="modal-body">
                    <p>@lang('attribute.some_text_in_the_modal')</p>
                    <button type="button" class="btn btn-default" data-dismiss="modal">@lang('attribute.close')</button>
                  </div>
                 
                    
                 
                </div>

              </div>
            </div>

        
        </div>
    </div>





@stop

@section('footer_scripts')

   
  <script type="text/javascript" src="js/jquery.sortable.js"></script>
<script>
    $(function() {

      $('.attr-row-wrap').sortable({
          placeholderClass: 'attr-row',
          handle: 'span.glyphicon-menu-hamburger'
      });

    });

</script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {

  /*$('.box-item').draggable({
    cursor: 'move',
    helper: "clone"

  });*/

$("#drag").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
      $('.attr-row-wrap .attr-row').each(function() {
        if ($(this).attr("itemid") === itemid) {
          $(this).appendTo("#drag");
          //alert('hi');
          $('#drag p').hide();


        }
      });
    }
  });

  /*$("#attr-row-wrap").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
      $('#drag .attr-row').each(function() {
        if ($(this).attr("itemid") === itemid) {
          $(this).appendTo("#attr-row-wrap");
          //alert('hi');
          //$('#drag p').hide();

          
        }
      });
    }
  });*/





});


</script>

 <script src="{{ asset('assets/js/bootstrap-colorpicker.js') }}" type="text/javascript"></script>
 <script type="text/javascript">
     jQuery('#bg-color').colorpicker();
     jQuery('#font-color').colorpicker();

     var readURL = function(input) {
     //alert(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
             //alert(e.target.result);
            jQuery(input).siblings('.add-files').children('img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
  }

jQuery('body').on('change','.file-wrapper input[type="file"]',function(){

      //alert('hi');
      var file = this.files[0];
      var ext = file.name.split('.').pop().toLowerCase();
      if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
      jQuery(this).val('');
      jQuery(this).siblings('.add-files').children('img').attr('src', '');
        alert('invalid extension!');
        return false;
      }
      var KBsize = (file.size/1024).toFixed(2);
      name = file.name;
      size = file.size;
      type = file.type;
      readURL(this);
     
})


 </script>  

<script type="text/javascript" src="{{ asset('assets/vendors/datatables/js/jquery.dataTables.js') }}"></script>
<script type="text/javascript" src="{{ asset('assets/vendors/datatables/js/dataTables.bootstrap.js') }}"></script>
    <script>
    $(document).ready(function() {
        $('.table').dataTable();
    });
    </script>
    

  
    
@stop
