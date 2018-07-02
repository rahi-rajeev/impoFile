@extends('layouts/admin/default')

@section('title')
    @lang('cms.block_list')
@stop

@section('header_styles')

    <!--page level css -->

    <!-- end of page level css -->
    
@stop

@section('content')
    <!-- Right side column. Contains the navbar and content of the page -->
    <div class="content">
        <div class="header-title">
            <h1 class="title">@lang('cms.block_list')</h1>
            <div class="pull-right"><input type="button" id="btnSave" value="Save" class="btn"></div>
        </div>
        <div class="content-wrap">
            @if(Session::has('succMsg'))
            <div class="alert alert-success alert-dismissable margin5">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>@lang('common.success'):</strong> {{ Session::get('succMsg') }}
            </div>
            @endif 
            <div class="table ">
                <div  id="msgDiv" style="display: none">
                    <div class="alert alert-success">
                        @lang('common.block_deleted_successfully')
                    </div>
                </div>
                <ul class="blockConfig">
                    <li>
                        <div class="col-sm-4"><h3><strong>@lang('cms.block')</strong></h3></div>
                        <div class="col-sm-4">
                            <h3><strong>@lang('cms.region')</strong></h3>
                        </div>
                        <div class="col-sm-4">
                            <h3><strong>@lang('cms.opertation')</strong></h3>
                        </div>
                    </li>
                @foreach($section as $key => $sec_res)

                    <li>
                        <div class="col-sm-12"><strong class="configblock-title">{{ $sec_res->sec_name }}</strong></div>
                    </li>
                    @if(isset($sec_res->block_list) && count($sec_res->block_list))
                        @foreach($sec_res->block_list as $bkey => $block)
                    <li class="list-group-item @if($block->is_fix == '1') dragFalse @endif" data-block="{{ $block->id }}" data-attr="sec_{{ $sec_res->id }}">
                        <div class="col-sm-4"><span class="glyphicon glyphicon-menu-hamburger"></span> {{ $block->title }}</div>
                        <div class="col-sm-4">
                            <select class="section-dd" @if($block->is_fix == '1') disabled="disabled" @endif>
                            <option value="0">@lang('common.none')</option>
                            @foreach($section as $skey => $detail)
                            <option value="{{ $detail->id }}" @if($detail->id == $sec_res->id) selected="selected" @endif>{{ $detail->sec_name }}</option>
                            @endforeach
                            </select>
                        </div>
                        <div class="col-sm-4">
                        @if($block->is_fix == '0')
                            <a href="javascript:;" class="del-block">@lang('common.delete')</a> |
                        @endif
                            <a href="{{ action('Admin\Block\BlockController@edit',$block->id) }}">@lang('common.edit')</a> | 
                            <a href="javascript:;" class="preview" id="{{ $block->id }}">@lang('common.preview')</a>
                        </div>
                    </li>
                        @endforeach
                    @endif
                @endforeach

                @if(isset($block_disable[0]) && count($block_disable[0]))
                    <li>
                        <div class="col-sm-12"><strong class="configblock-title">@lang('common.disable')</strong></div>
                    </li>
                    @foreach($block_disable[0] as $dkey => $disable)
                        <li class="list-group-item" data-block="{{ $disable->id }}" data-attr="sec_0">
                            <div class="col-sm-4"><span class="glyphicon glyphicon-menu-hamburger"> </span> {{ $disable->title }}</div>
                            <div class="col-sm-4">
                                <select class="section-dd">
                                <option value="0">@lang('common.none')</option>
                                @foreach($section as $skey => $detail)
                                <option value="{{ $detail->id }}">{{ $detail->sec_name }}</option>
                                @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4">
                                <a href="javascript:;" class="del-block">@lang('common.delete')</a>
                                 <a href="{{ action('Admin\Block\BlockController@edit',$disable->id) }}">@lang('common.edit')</a>
                                 <a href="javascript:;" class="preview" id="{{ $block->id }}">@lang('common.preview')</a>
                            </div>
                        </li>
                    @endforeach
                @endif
                
                </ul>
            </div> 
        </div>
    </div>
    <div id="popupdiv" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <span class="close icon-remove" data-dismiss="modal"></span>
            {{-- <h2 class="modal-title">Modal Header</h2> --}}
          </div>
          <div class="modal-body" id="contentSec">
            <h3></h3>         
            
          </div>
          <div class="col-sm-12 form-row">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
@stop

@section('footer_scripts')
{{-- <script src="{{ Config('constants.admin_js_url')}}jquery.sortable.js"></script> --}}
<script type="text/javascript">
    //variable declare
    var delUrl = "{{ action('Admin\Block\BlockController@delectBlock') }}";
    var saveUrl = "{{ action('Admin\Block\BlockController@updateBlockSection') }}";
    var prevUrl = "{{ action('Admin\Block\BlockController@previewBlock') }}";
    ;(function($){
        //Listen on content change
        $(document).on('change','.section-dd',function(){
            var sec_id = $(this).val();
            var $lisec = $(this).closest("li");
            let sind =0;
            $('.blockConfig li.list-group-item').each(function(){
                if($(this).attr('data-attr') ==='sec_'+sec_id){
                    sind = $(this).index();
                }
            });
            $($lisec).attr('data-attr','sec_'+sec_id);
            $('.blockConfig li:eq('+sind+')').after($lisec);
        });
        $(document).on('click','#btnSave',function(){
            var output =[];
            $('.blockConfig li.list-group-item').each(function(index){
                var section = $(this).attr('data-attr');
                var sid = section.replace('sec_','');
                var block = $(this).attr('data-block');
                let existing = output.filter(function(v, i) {return v.name == section;});
                if(existing.length){
                   var existingIndex = output.indexOf(existing[0]);
                   output[existingIndex].value = output[existingIndex].value.concat(block);
                }else{
                output.push({"name" :section,"value":[block]});
                }
            });
            if(confirm('Are u sure want to save ?')){
                $.post(saveUrl,{data : output,_token : window.Laravel.csrfToken},function(response){
                    if(response == 'error'){
                        alert('error');
                    }else{
                        $('#msgDiv').show();
                        $('#msgDiv').append('<div class="alert alert-success">'+response+'</div>');
                    }
                })
            }
        });
        $(document).on('click','.del-block',function(){
            var blockId = $(this).closest("li").attr('data-block');
            var _this = $(this);
            if(confirm('Are u sure want to delete ?')){
                $.post(delUrl,{id : blockId,_token : window.Laravel.csrfToken},function(response){
                    if(response == 'error'){
                        alert('error')
                    }else{
                        _this.closest('li').remove();
                        $('#msgDiv').show();
                        $('#msgDiv').html(response);
                    }
                })
            }
        });
        $(document).on('click','.preview',function(){
            var id = $(this).attr('id');
            $.post(prevUrl,{id : id,_token : window.Laravel.csrfToken},function(response){
                    $('#contentSec h3').html(response);
                  jQuery('#popupdiv').modal('show');
            })
        });
        $('.blockConfig').sortable({
          placeholderClass: 'list-group-item',
          handle: 'span.glyphicon-menu-hamburger',
          update : function(event,ui){
            var $nextSiblingElement=ui.item[0].nextElementSibling,
                $prevSiblingElement =ui.item[0].previousElementSibling;
                currentDataAttr =ui.item[0].dataset,
                prevDataAttr ='';
           // var $liElemt = ui.item;
           //  console.log($liElemt);
           //  console.log('on update??');
           //  console.log(ui.item[0].dataset);
           //  console.log('nextSiblingElement');
           //  console.log($nextSiblingElement);
           //  console.log('prevSiblingElement');
           //  console.log($prevSiblingElement);
           //  console.log('currentDataAttr');
           //  console.log(currentDataAttr.attr);
           //  console.log($($prevSiblingElement).attr('data-attr'));
            if(typeof $prevSiblingElement!==undefined && $($prevSiblingElement).length>0 && typeof $($prevSiblingElement).attr('data-attr')!=="undefined"){               
              let sec = $($prevSiblingElement).attr('data-attr'); 
               if(sec!=currentDataAttr.attr){
                    $(ui.item[0]).attr('data-attr',sec);
                   console.log('sdfsdf');
               }                     
            }else if(typeof $nextSiblingElement!==undefined && $($nextSiblingElement).length>0 && typeof $($nextSiblingElement).attr('data-attr')!=="undefined"){
                let sec = $($nextSiblingElement).attr('data-attr'); 
                if(sec!=currentDataAttr.attr){
                    $(ui.item[0]).attr('data-attr',sec);   
                    //console.log('ther??!!');                   
               }                            
            }
          },         
        });
        $('.blockConfig li.dragFalse').each(function(){
            $(this).attr('draggable',false);
        });

    })(jQuery);
</script>
    
@stop
