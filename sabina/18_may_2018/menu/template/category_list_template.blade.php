<div class="drop-menu-box">
<div class="menu-edit-box">

<%node%>
<div class="list-item <% node.menuParentIcon %>">
    <i class="icon fa fa-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
    @foreach(json_decode($langCodes) as $lng) 
    <span ng-if="node.default_lang_id=={{$lng->id}}"><%node.{{$lng->code}}Title.input%></span>
    @endforeach
    <div class="pull-right irem-wrap-icon">Category
        <%collapsed%>
        <a href="javascript:void(0)" data-nodrag  ng-click="openItem($event, node, node.menuTypeId, $index,nodes_key)">
            <i class="glyphicon glyphicon-pencil"></i>
        </a>
        <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>" data-nodrag  ng-click="openItem($event, node, node.menuTypeId, $index,nodes_key)" ng-class="node.toggle_class? 'glyphicon-menu-down' : 'glyphicon-menu-right' "></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%  $index %>">                                                               
    <ul class="nav nav-tabs lang-nav-tabs">
        @foreach(json_decode($langCodes) as $lng) 
        <li ng-class="node.default_lang_id=={{$lng->id}}?'active':''">
            <a data-toggle="tab" href="#" ng-click="setLangTab(node,{{$lng->id}})">
                <img src="{{ asset($lng->Flag) }}" alt="">
            </a>
        </li>
        @endforeach
    </ul>
    <div class="tab-content language-tab">
        <div id="lang-thai" class="tab-pane fade in active">
            @foreach(json_decode($langCodes) as $lng) 
            <div class="form-row" id="lang<%node.id%>_{{$lng->code}}" ng-if="node.default_lang_id=={{$lng->id}}">
                <label><%node.enTitle.title%></label>
                <input type="text" ng-model="node.{{$lng->code}}Title.input" value="" id="title_<% node.id %>">
            </div>
            @endforeach

          <div class="form-row">
            <label>URL </label>
            <div class="radio-group mt-5 mb-5">
                <label class="radio-wrap"  ng-click="openLink(node.id,'1')">
                    <input name="url" type="radio" checked="checked" checked="" ng-model="node.atrlinkoptions" name="link_<% node.id %>" id="link_<% node.id %>" value="1"> <span class="radio-label ">Link</span>
                </label>
                <label class="radio-wrap"  ng-click="noLink(node.id,2)">
                    <input name="url" type="radio" name="link_<% node.id %>" ng-model="node.atrlinkoptions" id="nolink_<% node.id %>" value="0">
                    <span class="radio-label" >No Link</span>
                </label>
            </div>
            <input type="text" ng-model="node.atrLinkInput" value="" id="LinkInput_<% node.id %>" ng-if="node.atrlinkoptions==1">
        </div>


        <div class="form-row">
            <label>Parent ID</label>
            <label>
                <input style="width: 85%;" type="text" ng-model="node.parentId" id="parentid_<% node.id %>">
                <button class="btn btn-danger" data-toggle="modal" data-target="#categoryList" ng-click=selectNode(node.id)>Select</button>
            </label>
        </div>

        <div class="form-row">
            <label>Maximum Depth</label>
            <label>
                <input style="width: 25%;" type="text" ng-model="node.depth">
            </label>
            <small>Leave empty or set value "0" to get all category depths</small>
        </div>
        </div>
       
    </div>   



<div class="menu-edit-icon-wrap" id="" style="display:block;">
<h3>Menu Icon</h3>                      
<div class="lib-icon-wrap">
    <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)"> Icon Library</button>
    <div class="list-icon">
        <span><i id="linkMenuIcon_<% node.id %>" class=""></i> Icon Item use <i class="icon-remove" ng-click="removeIcon(node.id)" ></i>
    </div>
</div>
</div>
</div>
</div>
</div>



