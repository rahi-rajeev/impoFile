<div class="col-sm-4 attribute-wrap">
   <h2 class="attr-title"><strong>@lang('attribute.attribute')</strong></h2>
    <a href="javascript:void(0)" class="secondary">@lang('attribute.create_new_attribute')</a>

   <div class="drag-wrap">
     <div class="form-row">
         <label>Drag attribute to use <i class="pull-right glyphicon glyphicon-share-alt"></i></label>
         <div class="attr-search-warp">
             <input placeholder="Search Attribute" type="text" ng-model="prdData.query" ng-change="specListQueryChanged(prdData.specslist | filter:{name: prdData.query})">
             <button type="submit" class="btn-search"><span class="icon-search"></span></button>
         </div>
         <div class="pager">
            <button type="button" class="glyphicon glyphicon-menu-left prev"  ng-click="prdData.currentPage=prdData.currentPage-1" ng-disabled="prdData.currentPage == 0"></button>
            <div class="col-sm-5">
                <select ng-model="prdData.pageSize" id="pageSize" class="" ng-options="opt for opt in prdData.pagearr">
                </select>
             </div>
             <span class="count-num"> <%(prdData.currentPage+1)%> of <%getSpecTotalPageCount((prdData.specslist | filter: {name: prdData.query}).length)%></span>
             <button type="button" class="glyphicon glyphicon-menu-right next" ng-click="prdData.currentPage=prdData.currentPage+1"  ng-disabled="prdData.currentPage >= (getSpecTotalPageCount((prdData.specslist | filter:  {name: prdData.query}).length)-1)"></button>
         </div>
         <div class="attr-row-wrap attribute-wrap-table ui-sortable dragdropElement" id="attr-dragElement" dnd-list="prdData.specslist" dnd-drop="dropCallback(index, item, external, type, 'specification-leftside')" dnd-allowed-types="['container']">
            <div class="attr-row"  itemid="itm-1" ng-repeat="list in prdData.specslist | filter: {name: prdData.query}| startFrom:prdData.currentPage*prdData.pageSize | limitTo:prdData.pageSize" dnd-draggable="list">
             <dnd-nodrag class="table-row">
                 <span class="count col"><%$index+1%> </span>
                 <span class="glyphicon col glyphicon-menu-hamburger ui-sortable-handle handle" dnd-handle></span>
                 <span class="col name"><span class="attr-name"><%list.name%></span></span>
                 <span class="col code"><span class="attr-name"><%list.attribute_code%></span></span>
                 <span class="pull-right col glyphicon glyphicon-font skyblue" ng-if="list.front_input=='textarea' || list.front_input=='text'"></span>
                 <span class="pull-right col glyphicon glyphicon-menu-down" ng-if="list.front_input=='multiselect'"></span>
                 <span class="pull-right col glyphicon glyphicon-menu-down" ng-if="list.front_input=='select'"></span>
                 <span class="pull-right col glyphicon glyphicon-paperclip" ng-if="list.front_input=='browse_file'"></span>
                 <span class="pull-right col glyphicon glyphicon-calendar" ng-if="list.front_input=='date_picker'"></span>
              </dnd-nodrag>
             </div>
        </div>
     </div>
   </div>
</div>
<div class="col-sm-8">
    <h2 class="attr-title"><strong>@lang('attribute.attribute_set')</strong></h2>
    
    <div class="row">
        <div class="form-row"> 
           <div class="col-sm-4 {{ $errors->has('attribute_code') ? 'error' : '' }}"">  <label>@lang('attribute.set_name')<i class="strick">*</i> </label>
              {!! Form::text('name', old('name') ,['ng-model' =>'attrset.name', 'placeholder'=>'','ng-disabled'=>'prdData.sec_disable','required'] ) !!}
              <!--p id="name-error" ng-show="showError('name')" class="error error-msg">The attribute set name is requreid</p-->
              
              <p id="name-error" ng-if="errors.name[0]" class="error error-msg"><%errors.name[0]%></p>

              @if ($errors->has('name'))
                <p id="name-error" class="error error-msg"></p>
              @endif
           </div>                       
           <div class="col-sm-4">
             <label>@lang('attribute.base_on')</label>
             <select ng-options="item.name for item in prdData.attributesets track by item.id" ng-model="attrset.base_on_id" ng-change='_attrSetChange()' ng-disabled="prdData.sec_disable">
              <option value="">Please select</option>
             </select>
               {{-- {!! Form::select('base_on_id',null, ['ng-model'=>'attrset.base_on_id','ng-change'=>'_attrSetChange()','ng-options'=>"item as item.name for prdData.attributesets"])  !!} --}}
           </div>
        </div>
        <div class="form-row">
            <div class="col-sm-8">
              <label>@lang('attribute.description')</label>
               {!! Form::textarea('description', old('description'),['ng-model' =>'attrset.description', 'placeholder'=>'' ] ) !!}
             </div>
        </div>
        <div class="form-row color-group">
            <div class="col-sm-2">                           
               <label>@lang('attribute.label_flag')</label>
               {!! Form::text('label_flag', old('label_flag'), ['placeholder'=>Lang::get('attribute.label_flag'),'ng-model'=>'attrset.label_flag']) !!}
            </div>
            <div class="col-sm-2">                           
                <label>@lang('attribute.font_color')</label>
                <span id="font-color" class="input-group colorpicker-component">
                   {!! Form::text('font_color', old('font_color'), ['placeholder'=>'', 'value'=>'#ff004a' ,'ng-model'=>'attrset.font_color']) !!}
                   <span class="input-group-addon"><i style="background-color: #ff004a;"></i></span> 
                </span>
            </div>
            <div class="col-sm-2">
                <label>@lang('attribute.flag_bg_color')</label>
                <span id="bg-color" class="input-group colorpicker-component"> 
                     {!! Form::text('flag_bg_color', old('flag_bg_color'), ['placeholder'=>'', 'value'=>'#000','ng-model'=>'attrset.flag_bg_color']) !!}
                    <span class="input-group-addon"><i style="background-color: #000;"></i></span> 
                </span>                            
            </div>
            <div class="col-sm-2">
                <label>@lang('attribute.remind_icon')</label>
                <div class="file-wrapper">
                  <span class="add-files">
                     <img ng-src="<%prdData.browserImgSrc%>" width="38" height="38">
                  </span>                 
                  {!! Form::file('remind_icon', ['class'=>'form-control','onchange'=>'angular.element(this).scope().fileNameChanged(this)','ng-model'=>'remind_icon']) !!}
                  <p id="name-error" ng-show="showError('remind_icon')" class="error error-msg">Remind icon will required</p>
                  @if ($errors->has('remind_icon'))
                    <p id="name-error" class="error error-msg">{{ $errors->first('remind_icon') }}</p>
                  @endif
                </div>
            </div>
            {{-- <div class="col-sm-2">
                <label for="">&nbsp;</label>
                <a class="primary-color" href="javascript:void(0)" data-toggle="modal" data-target="#help"> @lang('attribute.help')</a>
            </div> --}}
        </div>
        <!-- drag and drop in both case if attribute set have or not  -->
        <div class="form-row row">
            <div class="col-sm-12 mt-15">
                <div class="box dragdropElement" id="attr-dropElement" dnd-list="prdData.specs_create_list" dnd-drop="dropCallback(index, item, external, type, 'specification')"> 
                    <div class="blank-drag" data-ng-if="prdData.specs_create_list.length === 0">
                        <p class="blank-txt"><i class="glyphicon glyphicon-share-alt"></i> Drag your Attribute drop here</p>
                    </div>
                    <div class="blank-drag drag-attr-table" data-ng-if="prdData.specs_create_list.length">
                      <div class="form-row table" ng-repeat="item in prdData.specs_create_list track by $index" dnd-draggable="item"  dnd-moved="prdData.specs_create_list.splice($index, 1)" dnd-effect-allowed="move">
                          <dnd-nodrag class="select-color-row">
                              <span class="count col"><%$index+1%> </span>
                              <span dnd-handle class="glyphicon col glyphicon-menu-hamburger ui-sortable-handle handle" ></span>
                              <span class="col name"><span class="attr-name"><%item.name%></span></span>
                              <span class="col code"><span class="attr-name"><%item.attribute_code%></span></span>
                             {{-- <span class="pull-right  glyphicon glyphicon-font skyblue" ng-if="item.front_input=='textarea' || item.front_input=='text'"></span>
                              <span class="pull-right glyphicon glyphicon-menu-down" ng-if="item.front_input=='multiselect'"></span>
                              <span class="pull-right glyphicon glyphicon-menu-down" ng-if="item.front_input=='select'"></span>
                              <span class="pull-right glyphicon glyphicon-paperclip" ng-if="item.front_input=='browse_file'"></span>
                              <span class="pull-right glyphicon glyphicon-calendar" ng-if="item.front_input=='date_picker'"></span> --}}
                              <span class="icon-close pull-right" ng-click="_removeSep($event,$index,'specification',item)"></span>
                          </dnd-nodrag>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>       
</div>