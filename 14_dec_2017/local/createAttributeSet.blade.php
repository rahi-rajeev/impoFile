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

<script type="text/javascript">
  
  var attributes = '';


</script>>
 
@stop


@section('content')

<!-- Content start here -->


 <div class="content">
        <div class="header-title" style="top:62px;">
            <h1 class="title">@lang('attribute.attribute_set_management')</h1>
            <div class="pull-right btn-groups">
                <a class="btn" onclick="document.getElementById('AttributeSetForm').submit();">@lang('attribute.save')</a>
            </div>
        </div>
        <div class="content-wrap clearfix" ng-controller="AttributeCtrl">
             <div class="col-sm-3 attribute-wrap">
               <h2 class="attr-title"><strong>@lang('attribute.attribute')</strong></h2>
                <a href="javascript:void(0)" class="secondary">@lang('attribute.create_new_attribute')</a>

               <?php /*?> <div class="drag-wrap">
                 <div class="form-row">
                     <label>Drag attribute to use <i class="pull-right glyphicon glyphicon-share-alt"></i></label>
                     <form action="">
                         <div class="attr-search-warp">
                         <input placeholder="Search Attribute" type="text" ng-model="prdData.query" ng-change="specListQueryChanged(prdData.specslist | filter:{name: prdData.query})">
                         <button type="submit" class="btn-search"><span class="icon-search"></span></button>
                         </div>
                     </form>
                     <div class="pager">
                        <button type="button" class="glyphicon glyphicon-menu-left prev"  ng-click="prdData.currentPage=prdData.currentPage-1" ng-disabled="prdData.currentPage == 0"></button>
                        <div class="col-sm-5">
                            <select ng-model="prdData.pageSize" id="pageSize" class="" ng-options="opt for opt in prdData.pagearr">
                            </select>
                         </div>
                         <span class="count-num"> <%(prdData.currentPage+1)%> of <%getSpecTotalPageCount((prdData.specslist | filter: {name: prdData.query}).length)%></span>
                         <button type="button" class="glyphicon glyphicon-menu-right next" ng-click="prdData.currentPage=prdData.currentPage+1"  ng-disabled="prdData.currentPage >= (getSpecTotalPageCount((prdData.specslist | filter:  {name: prdData.query}).length)-1)"></button>
                     </div>
                     <div class="attr-row-wrap ui-sortable dragdropElement" id="attr-dragElement" dnd-list="prdData.specslist" dnd-drop="dropCallback(index, item, external, type, 'specification-leftside')">
                        <div class="attr-row"  itemid="itm-1" ng-repeat="list in prdData.specslist | filter: {name: prdData.query}| startFrom:prdData.currentPage*prdData.pageSize | limitTo:prdData.pageSize" dnd-draggable="list">
                         <dnd-nodrag>
                             <span class="count"><%$index+1%> </span>
                             <span class="glyphicon glyphicon-menu-hamburger ui-sortable-handle handle" dnd-handle></span>
                             <span class="attr-name"><%list.name%></span>
                             <span class="pull-right  glyphicon glyphicon-font skyblue" ng-if="list.front_input=='textarea' || list.front_input=='text'"></span>
                             <span class="pull-right glyphicon glyphicon-menu-down" ng-if="list.front_input=='multiselect'"></span>
                             <span class="pull-right glyphicon glyphicon-menu-down" ng-if="list.front_input=='select'"></span>
                             <span class="pull-right glyphicon glyphicon-paperclip" ng-if="list.front_input=='browse_file'"></span>
                             <span class="pull-right glyphicon glyphicon-calendar" ng-if="list.front_input=='date_picker'"></span>
                          </dnd-nodrag>
                         </div>
                    </div>
                 </div>
             </div>  */?>


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

                <!--div class="form-row">
        <div class="col-sm-8">
            <div class="box dragdropElement" id="attr-dropElement" dnd-list="prdData.specs_create_list" dnd-drop="dropCallback(index, item, external, type, 'specification')">
                <div class="blank-drag" data-ng-if="prdData.specs_create_list.length === 0">
                    <p class="blank-txt"><i class="glyphicon glyphicon-share-alt"></i> Drag your Attribute drop here</p>
                </div>
              <?php /* ?>  <div class="form-row select-color-row" ng-repeat="item in prdData.specs_create_list track by $index"> 
                    <label class="mb-5">
                        <span class="glyphicon glyphicon-menu-hamburger"></span>
                        <span class="attr-name"><%item.attributedesc.name%></span>
                    </label>   
                    <div class="row">
                        <div class="col-sm-6" ng-if="item.front_input=='select'">
                            <select ng-if="!product.specmodel[$index].usevaiant"  class="multiple-select" ng-model="product.specmodel[$index].attrselect" ng-options="opt.values for opt in item.get_all_attribute_value_detail track by opt.attr_val_id">
                                <option value="" selected="true">Please select...</option>
                            </select>
                            <tags-input ng-if="product.specmodel[$index].usevaiant" ng-init="product.specmodel[$index].attrselect = [];" placeholder="" data-ng-model="product.specmodel[$index].attrselect" name="tagss" display-property="values" key-property="values" track-by-expr="$index" required>
                                <auto-complete  load-on-focus="true" load-on-empty="true" source="item.get_all_attribute_value_detail"></auto-complete>
                            </tags-input>
                         </div>
                         <div class="col-sm-6" ng-if="item.front_input=='multiselect'">
                            <select multiple class="multiple-select" ng-model="product.specmodel[$index].mulattrselect" ng-options="opt.values for opt in item.get_all_attribute_value_detail track by opt.attr_val_id">
                                <option value="" selected="true">Please select...</option>
                            </select>
                            
                         </div>
                         <div class="col-sm-6" ng-if="item.front_input=='text'">
                            <input placeholder="Input text" type="text" ng-model="product.specmodel[$index].textVal"> 
                         </div>
                         <div class="col-sm-6" ng-if="item.front_input=='textarea'">
                            <textarea name="" placeholder="Input text" ng-model="product.specmodel[$index].textareaVal"></textarea>
                         </div>
                         <div class="col-sm-6" ng-if="item.front_input=='browse_file'">
                            <div class="file-wrapper1">
                                <input type="file" files-input ng-model="product.specmodel[$index].filepickerFile">
                            </div>
                         </div>
                         <div class="col-sm-6" ng-if="item.front_input=='date_picker'">
                            <a class="dropdown-toggle" id="delvdate" role="button" data-toggle="dropdown" data-target="delvdate"
                            href="javascript:void(0)">
                              <div class="input-group date">
                                <input type="text" class="date-select" data-ng-model="product.specmodel[$index].deldate">
                              </div>
                            </a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                  <datetimepicker data-ng-model="product.specmodel[$index].deldate"
                                  <!-- data-on-set-time="onSpecDateTimePickerSet(newDate, oldDate, $index)" -->
                                  data-datetimepicker-config="{ dropdownSelector: '#delvdate',minView: 'day'}"></datetimepicker>
                            </ul>
                          </div>
                       <div class="col-sm-4 pull-right check-group label-option-use">
                             <label class="check-wrap" ng-if="item.is_varient==='1'"><input type="checkbox" ng-model="product.specmodel[$index].usevaiant"> <span class="chk-label">Use variant</span></label>
                             <span class="icon-close pull-right" ng-click="_removeSep($event,$index,'specification',item)"></span>
                        </div>
                    </div>
                </div> <?php */ ?>
           </div>
        </div>
    </div-->
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
<!--script type="text/javascript" src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script-->

<script src="{{ asset('js/jquery-ui.min.js') }}" type="text/javascript"></script>

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

  $("#attr-row-wrap").droppable({
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
  });





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

@include('includes.gridtablejsdeps')    
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/attributeSet.js"></script>
  
    
@stop
