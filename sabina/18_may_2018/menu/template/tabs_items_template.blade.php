<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item <% node.menuParentIcon %>">
    <i class="icon glyphicon glyphicon-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
     @foreach(json_decode($langCodes) as $lngTab) 
      <span ng-if="node.default_lang_id=={{$lngTab->id}}"><%node.{{$lngTab->code}}Title.input%></span>
    @endforeach
    <div class="pull-right irem-wrap-icon">@lang('menu.tab_items')
        <a href="javascript:void(0)" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)">
            <i class="glyphicon glyphicon-pencil"></i>
        </a>
        <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)" ng-class="node.toggle_class ? 'glyphicon-menu-down' : 'glyphicon-menu-right' "></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>">                                                               
    <ul class="nav nav-tabs lang-nav-tabs">
        @foreach(json_decode($langCodes) as $lng) 
        <li ng-class="node.default_lang_id=={{$lng->id}}?'active':''">
            <a data-toggle="tab" href="#" ng-click="setLangTab(node,{{$lng->id}})">
                <img src="{{asset($lng->Flag)}}" alt="">
            </a>
        </li>
        @endforeach
       <!--  <li ng-class="node.default_lang_id==2?'active':''">
            <a data-toggle="tab" href="#" ng-click="setLangTab(node,2)">
                <img src="{{ asset('images/flag/usa-lang.png') }}" alt="">
            </a>
        </li>
        <li ng-class="node.default_lang_id==3?'active':''">
            <a data-toggle="tab" href="#" ng-click="setLangTab(node,3)">
                <img src="{{ asset('images/flag/china-lang.png') }} " alt="">
            </a>
        </li>
        <li ng-class="node.default_lang_id==4?'active':''">
            <a data-toggle="tab" href="#" ng-click="setLangTab(node,4)">
                <img src="{{ asset('images/flag/korea-lang.png') }}" alt="">
            </a>
        </li> -->
        
    </ul>
    <div class="tab-content language-tab">
        <div id="lang-thai" class="tab-pane fade in active">
            @foreach(json_decode($langCodes) as $lngTab) 
            <div class="form-row" id="lang<%node.id%>_{{$lngTab->code}}" ng-if="node.default_lang_id=={{$lngTab->id}}">
                <label><%node.enTitle.title%></label>
                <input type="text" ng-model="node.{{$lngTab->code}}Title.input" value="" id="title_<% node.id %>">
            </div>
            @endforeach


            <div class="form-row">
            <label>Menu item URL </label>
            <div class="radio-group mt-5 mb-5">
                <label class="radio-wrap"  ng-click="openLink(node.id,'1')">
                    <input name="url" type="radio" checked="checked" checked="" ng-model="node.atrlinkoptions" name="link_<% node.id %>" id="link_<% node.id %>" value="1"> <span class="radio-label ">@lang('menu.links')</span>
                </label>
                <label class="radio-wrap"  ng-click="noLink(node.id,2)">
                    <input name="url" type="radio" name="link_<% node.id %>" ng-model="node.atrlinkoptions" id="nolink_<% node.id %>" value="0">
                    <span class="radio-label" >@lang('menu.no_links')</span>
                </label>
            </div>
            <input type="text" ng-model="node.atrLinkInput" value="" id="LinkInput_<% node.id %>" ng-if="node.atrlinkoptions==1">
        </div>


            <div class="form-row">
                <label>@lang('menu.custom_css_class')</label>
                <input type="text" ng-model="node.atrcustomcss" value="dasdsa" id="customcss_<% node.id %>">
            </div>



             <div class="form-row layout-wrap">
            <label>@lang('menu.layout')</label>
            <ul class="nav nav-tabs col-lang-tab">
                <li class="active" ng-click="tabContentLayout(1,node.id,$index,data[key].id)"><a data-toggle="tab" href="#TABcolumn_1_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col1.jpg" alt="" class="img">
                    <img src="images/col1-active.jpg" alt="" class="img-active">
                </a>
                </li>
                <li ng-click="tabContentLayout(2,node.id,$index,data[key].id)"><a data-toggle="tab" href="#TABcolumn_2_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col2.jpg" alt="" class="img">
                    <img src="images/col2-active.jpg" alt="" class="img-active">
                </a></li>
                <li ng-click="tabContentLayout(3,node.id,$index,data[key].id)"><a data-toggle="tab" href="#TABcolumn_3_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col3.jpg" alt="" class="img">
                    <img src="images/col3-active.jpg" alt="" class="img-active">
                </a></li>
                <li ng-click="tabContentLayout(4,node.id,$index,data[key].id)"><a data-toggle="tab" href="#TABcolumn_4_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col4.jpg" alt="" class="img">
                    <img src="images/col4-active.jpg" alt="" class="img-active">
                </a></li>
            </ul>
            <div class="tab-content language-tab col-lang-content">
                <div id="TABcolumn_1_<%$index%>_<%node.id%>_<%data[key].id%>" class="tab-pane fade in active">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12"> @lang('menu.column_one')</label>
                        <div class="col-sm-12">                                                    
                            <textarea row="4" ng-model="node.atrlayout.Coloum_1.body_1" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>                                            
                </div>
                <div id="TABcolumn_2_<%$index%>_<%node.id%>_<%data[key].id%>" class="form-row tab-pane fade">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row">
                        <label class="col-sm-12">@lang('menu.column_two')</label>                    
                        <div class="col-sm-6">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_2.body_1" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-6">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_2.body_2" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div id="TABcolumn_3_<%$index%>_<%node.id%>_<%data[key].id%>" class="form-row tab-pane fade">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12"> @lang('menu.column_three')</label> 
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_1" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_2" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_3" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div id="TABcolumn_4_<%$index%>_<%node.id%>_<%data[key].id%>" class="form-row tab-pane fade">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12">  @lang('menu.column_four') </label>
                        <div class="col-sm-3">
                            <textarea   ng-model="node.atrlayout.Coloum_4.body_1" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-3">
                            <textarea  ng-model="node.atrlayout.Coloum_4.body_2" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-3">
                            <textarea  ng-model="node.atrlayout.Coloum_4.body_3" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-3">
                           <textarea  ng-model="node.atrlayout.Coloum_4.body_4" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        
        </div>
      
    </div>   



<div class="menu-edit-icon-wrap" id="" style="display:block;">
<h3>@lang('menu.menu_icon')</h3>                      
<div class="lib-icon-wrap">
    <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)">@lang('menu.icon_library')</button>
    <div class="list-icon">
        <span><i id="linkMenuIcon_<% node.id %>" class=""></i> @lang('menu.icon_item_use')<i class="icon-remove" ng-click="removeIcon()" ></i>
    </div>
</div>
</div>
</div>
</div>
</div>



