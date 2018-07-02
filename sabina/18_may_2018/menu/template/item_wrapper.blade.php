<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item <% node.menuParentIcon %>">
    <i class="icon glyphicon glyphicon-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
    @foreach(json_decode($langCodes) as $lngTab) 
      <span ng-if="node.default_lang_id=={{$lngTab->id}}"><%node.{{$lngTab->code}}Title.input%></span>
    @endforeach
<!--      <span ng-if="node.default_lang_id==1"><%node.enTitle.input%></span>
    <span ng-if="node.default_lang_id==2"><%node.thTitle.input%></span>
    <span ng-if="node.default_lang_id==3"><%node.chTitle.input%></span>
    <span ng-if="node.default_lang_id==4"><%node.jpTitle.input%></span>
 -->    
    <div class="pull-right irem-wrap-icon">Item Wrapper
        <a href="javascript:void(0)" data-nodrag  ng-click="openItem($event, node, node.menuTypeId, $index)">
            <i class="glyphicon glyphicon-pencil"></i>
        </a>
        <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>" data-nodrag  ng-click="openItem($event, node, node.menuTypeId, $index)" ng-class="node.toggle_class ? 'glyphicon-menu-down' : 'glyphicon-menu-right'"></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%$index%>">                      <%parentindex%>       
    <ul class="nav nav-tabs lang-nav-tabs">
        @foreach(json_decode($langCodes) as $lng) 
        <li ng-class="node.default_lang_id=={{$lng->id}}?'active':''">
        	<a data-toggle="tab" href="#" ng-click="setLangTab(node,{{$lng->id}})">
        		<img src="{{asset($lng->Flag)}}" alt="">
        	</a>
        </li>
        @endforeach
    </ul>
    <div class="tab-content language-tab">
            @foreach(json_decode($langCodes) as $lngTab) 
            <div class="form-row" id="lang<%node.id%>_{{$lngTab->code}}" ng-if="node.default_lang_id=={{$lngTab->id}}">
                <label><%node.enTitle.title%></label>
                <input type="text" ng-model="node.{{$lngTab->code}}Title.input" value="" id="title_<% node.id %>">
            </div>
            @endforeach

            <!-- <div class="form-row" id="lang<%node.id%>_th" ng-if="node.default_lang_id==2">
                <label><%node.thTitle.title%></label>
                <input type="text" ng-model="node.thTitle.input" value="" id="title_<% node.id %>">
            </div>

            <div class="form-row" id="lang<%node.id%>_ch" ng-if="node.default_lang_id==3">
                <label><%node.chTitle.title%></label>
                <input type="text" ng-model="node.chTitle.input" value="" id="title_<% node.id %>">
            </div>

            <div class="form-row" id="lang<%node.id%>_jp" ng-if="node.default_lang_id==4">
                <label><%node.jpTitle.title%></label>
                <input type="text" ng-model="node.jpTitle.input" value="" id="title_<% node.id %>">
            </div> -->

           <div class="form-row">
                <label>Menu item URL </label>
                <div class="radio-group mt-5 mb-5">
                    <label class="radio-wrap" ng-model="link" ng-click="openLink(node.id,'1')">
                        <input name="url" type="radio" checked="checked" checked="" ng-model="node.atrlinkoptions" value="1" > <span class="radio-label ">Link</span>
                    </label>
                    <label class="radio-wrap" ng-model="nolink" ng-click="noLink(node.id,2)">
                        <input name="url" type="radio" ng-model="node.atrlinkoptions" value="0">
                        <span class="radio-label" >No Link</span>
                    </label>
                </div>
                <input type="text" ng-model="node.atrLinkInput" value="" ng-if="node.atrlinkoptions==1">
            </div>

            <div class="form-row">
                <label>Custom CSS Class </label>
                <input type="text" ng-model="node.atrcustomcss" value="dasdsa" id="customcss_<% node.id %>">
            </div>
        </div>
        
<div class="menu-edit-icon-wrap" id="" style="display:block;">
<h3>Menu Icon</h3>                      
<div class="lib-icon-wrap">
    <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)"> Icon Library</button>
    <div class="list-icon">
        <span><i id="linkMenuIcon_<% node.id %>" class="">
        </i> Icon Item use <i class="icon-remove" ng-click="removeIcon(node.id)" ></i> </span>
    </div>
</div>
</div>
    </div>   



</div>
</div>



