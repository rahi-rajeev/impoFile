<link rel="stylesheet" type="text/css" href="{{Config('constants.admin_css_url') }}bootstrap-colorpicker.css">
<!--if there are no attribute condition- for create new attribute set-->
<div class="attr-mgt-view" data-ng-if="!prdData.specslist.length && !prdData.spesattrset.length">
    <!-- data-ng-if="!prdData.specslist.length && !prdData.spesattrset.length"> -->
    <h2 class="title">
      @lang('product.variants_spec')
    </h2>
    <!--- attribute first time -->
    <div class="row">
        <div class="form-row mt-5">
            <div class="col-sm-4">
                <a href="{{ action('Admin\Attribute\AttributeController@index') }}" class="secondary col-sm-12">Create New Attribute</a>
            </div>
        </div>
        <div class="form-row">
            <div class="col-sm-4">
                <a href="javascript:void(0)"><img src="images/product-variant.jpg" alt="" title=""></a>
                <h2>Product Varaint</h2>
                <p>Cut from tissue-weight silk crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly </p>
            </div>
        </div>
        <div class="form-row">
            <div class="col-sm-4">
                <a href="javascript:void(0)"><img src="images/specification.jpg" alt="" title=""></a>
                <h2>Specification</h2>
                <p>Cut from tissue-weight silk crepe de chine, this airy style features a ruched neckline with tie and an unfinished hem for a contrastinly </p>
            </div>
        </div>
    </div>
</div>
<!--- attribute first time end-->
<!--if attribute is available -->
<div class="attr-set-container">
    <!-- data-ng-if="prdData.specslist.length>0"> -->
    <div class="col-sm-4 attribute-wrap" data-ng-if="prdData.specslist.length>0 && !prdData.spesattrset.length">
        <h2 class="attr-title"><strong>Attribute</strong></h2>
        <a href="javascript:void(0)" class="secondary">Create New Attribute Set</a>
        <div class="drag-wrap">
            <div class="form-row">
                <label>Drag attribute to use <i class="pull-right glyphicon glyphicon-share-alt"></i></label>
                <form action="">
                    <div class="attr-search-warp">
                        <input placeholder="Search Attribute" type="text" ng-model="prdData.query" ng-change="specListQueryChanged(prdData.specslist | filter: {attributedesc: {name: prdData.query}})">
                        <button type="submit" class="btn-search"><span class="icon-search"></span></button>
                    </div>
                </form>
                <div class="pager">
                    <button type="button" class="glyphicon glyphicon-menu-left prev" ng-click="prdData.currentPage=prdData.currentPage-1" ng-disabled="prdData.currentPage == 0"></button>
                    <div class="col-sm-5">
                        <select ng-model="prdData.pageSize" id="pageSize" class="" ng-options="opt for opt in prdData.pagearr">
                        </select>
                    </div>
                    <span class="count-num"> <%(prdData.currentPage+1)%> of <%getSpecTotalPageCount((prdData.specslist | filter: {attributedesc: {name: prdData.query}}).length)%></span>
                    <button type="button" class="glyphicon glyphicon-menu-right next" ng-click="prdData.currentPage=prdData.currentPage+1" ng-disabled="prdData.currentPage >= (getSpecTotalPageCount((prdData.specslist | filter: {attributedesc: {name: prdData.query}}).length)-1)"></button>
                </div>
                <div class="attr-row-wrap ui-sortable dragdropElement" id="attr-dragElement" dnd-list="prdData.specslist" dnd-drop="dropCallback(index, item, external, type, 'specification-leftside')">
                    <div class="attr-row" itemid="itm-1" ng-repeat="list in prdData.specslist | filter: {attributedesc: {name: prdData.query}} | startFrom:prdData.currentPage*prdData.pageSize | limitTo:prdData.pageSize" dnd-draggable="list">
                        <!-- prdData.specslist.splice($index, 1); -->
                        <dnd-nodrag>
                            <span class="count"><%$index+1%> </span>
                            <span class="glyphicon glyphicon-menu-hamburger ui-sortable-handle handle" dnd-handle></span>
                            <span class="attr-name"><%list.attributedesc.name%></span>
                            <span class="pull-right  glyphicon glyphicon-font skyblue" ng-if="list.front_input=='textarea' || list.front_input=='text'"></span>
                            <span class="pull-right glyphicon glyphicon-menu-down" ng-if="list.front_input=='multiselect'"></span>
                            <span class="pull-right glyphicon glyphicon-menu-down" ng-if="list.front_input=='select'"></span>
                            <span class="pull-right glyphicon glyphicon-paperclip" ng-if="list.front_input=='browse_file'"></span>
                            <span class="pull-right glyphicon glyphicon-calendar" ng-if="list.front_input=='date_picker'"></span>
                        </dnd-nodrag>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--if attribute set is available data-ng-if="prdData.spesattrset.length>0" -->
    <div class="col-sm-8 attribute-set-wrap">
        <h3><strong>Attribute Set</strong></h3>
         <!-- if attribute set then choosen dropdown -->
        <div class="row" data-ng-if="prdData.spesattrset.length>0">
            <div class="col-sm-12">
                <div class="box">
                    <div class="form-row">
                        <span class="pull-right skyblue">
                        &lt;&lt; Hide
                    </span>
                        <label>Choose your Attribute Set</label>
                        <%product.speschoseattrset%>
                            <select class="control" ng-model="product.speschoseattrset" ng-options="attr.name for attr in prdData.spesattrset track by attr.id" ng-change="_attrSetChange()">
                                <option value="" selected="selected">Please select</option>
                            </select>
                            <p class="mt-15 mb-5">Cut from tissue-weight silk crepe de chine, this airy style features a ruched eckline with tie and an unfinished hem for a contrastinly </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row" ng-show="product.speschoseattrset.name">
            <h3>Base Attribute Set : <%product.speschoseattrset.name%></h3>
        </div>
        {{-- if don't have attribute set then create attribute set   prdData.spesattrset.length--}}
        <div ng-if="!prdData.spesattrset.length">
            <div class="col-sm-8">
                <div class="form-row">
                    <input placeholder="Attribute Set’s Name" type="text" ng-model="product.sepscreateset.attrname">
                </div>
                <div class="form-row">
                    <label>Discription</label>
                    <textarea placeholder="Attribute Set’s Name" ng-model="product.sepscreateset.attrdesp"> </textarea>
                </div>
            </div>
            <div class="flag-row col-sm-12">
                <div class="col-sm-2">
                    <label>Label Flag</label>
                    <input type="text" ng-model="product.sepscreateset.labelflag">
                </div>
                <div class="col-sm-2">
                    <label>Font Color</label>
                    <div id="cp2" class="input-group colorpicker-component colorpicker-element">
                        <input value="#ff0049" class="form-control" type="text" ng-model="product.sepscreateset.fontcolor"> <span class="input-group-addon"><i style="background-color: rgb(255, 0, 73);"></i></span> </div>

                </div>
                <div class="col-sm-3">
                    <label>Flag Bg Color</label>
                    <div id="cp3" class="input-group colorpicker-component colorpicker-element">
                        <input value="#020202" class="form-control" type="text" ng-model="product.sepscreateset.flagbgcolor"> <span class="input-group-addon"><i style="background-color: rgb(2, 2, 2);"></i></span> </div>
                </div>
                <div class="col-sm-3">
                    <label>Remind Icon</label>
                    <droplet ng-model="product.remind_icon_file_interface">
                        <div class="upload-wrap">
                            <img src="/images/upload-btn2.jpg"> <span class="upName"></span>
                            <droplet-upload-single ng-model="product.remind_icon_file_interface"></droplet-upload-single>
                        </div>
                    </droplet>
                </div>
                <div class="col-sm-2">
                    <label>&nbsp;</label>
                    <div class="skublue">Help</div>
                </div>
            </div>
        </div>
        <!-- drag and drop in both case if attribute set have or not  -->
        <div class="form-row row">
            <div class="col-sm-12 mt-15">
                <div class="box dragdropElement" id="attr-dropElement" dnd-list="prdData.specs_create_list" dnd-drop="dropCallback(index, item, external, type, 'specification')"> 
                        <div class="blank-drag" data-ng-if="prdData.specs_create_list.length === 0">
                            <p class="blank-txt"><i class="glyphicon glyphicon-share-alt"></i> Drag your Attribute drop here</p>
                        </div>
                        <div class="form-row select-color-row" ng-repeat="item in prdData.specs_create_list track by $index">
                            <label class="mb-5">
                                <span class="glyphicon glyphicon-menu-hamburger"></span>
                                <span class="attr-name"><%item.attributedesc.name%></span>
                            </label>
                            <div class="row">
                                <div class="col-sm-6" ng-if="item.front_input=='select'">
                                    
                                    <select ng-if="!product.specmodel[$index].usevaiant" class="multiple-select" ng-model="product.specmodel[$index].attrselect" ng-options="opt.values for opt in item.get_all_attribute_value_detail track by opt.attr_val_id">
                                        <option value="" selected="true">Please select...</option>
                                    </select>
                                    <tags-input ng-if="product.specmodel[$index].usevaiant" ng-init="product.specmodel[$index].attrselect = [];" placeholder="" data-ng-model="product.specmodel[$index].attrselect" name="tagss" display-property="values" key-property="values" track-by-expr="$index" required>
                                        <auto-complete load-on-focus="true" load-on-empty="true" source="item.get_all_attribute_value_detail"></auto-complete>
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
                                     <div class="input-group date-wrap">
                                         {{-- <input type="text" class="date-select" data-ng-model="product.sp_fromdate"> --}}
                                          <div class="input-group">
                                              <input class="form-control" datetimepicker ng-model="product.specmodel[$index].deldate"  options="prdData.dateOnlyOption"/>
                                              <span class="input-group-addon">
                                                  <span class="glyphicon glyphicon-calendar"></span>
                                              </span>
                                          </div>
                                     </div>                                                                 
                                </div>
                                <div class="col-sm-4 pull-right check-group label-option-use">
                                    <label class="check-wrap" ng-if="item.is_varient==='1'">
                                        <input type="checkbox" ng-model="product.specmodel[$index].usevaiant"> <span class="chk-label">Use variant</span></label>
                                    <span class="icon-close pull-right" ng-click="_removeSep($event,$index,'specification',item)"></span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
    <!--if attribute set is not available -->
   {{--  <div class="col-sm-8" data-ng-if="!prdData.spesattrset.length"> 
        <h2 class="attr-title"><strong>Attribute Set dgdfg dgdff</strong></h2>
        <div class="row">
            <div class="form-row">
                <div class="col-sm-6">
                    <label>Set Name <i class="red">*</i></label>
                    <input type="text" name="attribute_name">
                </div>
            </div>
            <div class="form-row">
                <div class="col-sm-12">
                    <label>Description</label>
                    <textarea></textarea>
                </div>
            </div>
            <div class="form-row color-group">
                <div class="col-sm-2">
                    <label>Label Flag</label>
                    <input type="text">
                </div>
                <div class="col-sm-3">
                    <label>font Color</label>
                    <span id="font-color" class="input-group colorpicker-component colorpicker-element"> 
                      <input value="#ff004a" type="text"> 
                      <span class="input-group-addon"><i style="background-color: rgb(255, 0, 74);"></i></span>
                    </span>
                </div>
                <div class="col-sm-3">
                    <label>Flag Bg Color</label>
                    <span id="bg-color" class="input-group colorpicker-component colorpicker-element"> 
                      <input value="#000" type="text"> 
                      <span class="input-group-addon"><i style="background-color: rgb(0, 0, 0);"></i></span>
                    </span>
                </div>
                <div class="col-sm-3">
                    <label>Remind Icon</label>
                    <select>
                        <option value=""></option>
                        <option value="">Option</option>
                        <option value="">Option 2</option>
                    </select>
                </div>
                <div class="col-sm-1">
                    <label for="">&nbsp;</label>
                    <a class="skyblue" href="javascript:void(0)" data-toggle="modal" data-target="#help"> Help</a>
                </div>
            </div>
            <div class="form-row">
                <div class="col-sm-12">
                    <div class="box">
                        <div class="blank-drag ui-droppable" id="drag">
                            <p class="blank-txt"><i class="glyphicon glyphicon-share-alt"></i> Drag your Attribute drop here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
</div>

<script type="text/javascript">
    jQuery(document).ready(function() {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    jQuery('.upload-wrap img').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        jQuery(".upload-wrap input[type='file']").change(function() {
            readURL(this);
        });
    });
</script>