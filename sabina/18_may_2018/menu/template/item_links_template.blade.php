<style type="text/css">
	.bootstrap-select ul.dropdown-menu li:first-child {
    display: none;
}

</style>
<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item <% node.menuParentIcon %>">
 <i class="icon glyphicon glyphicon-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
    @foreach(json_decode($langCodes) as $lngTab) 
      <span ng-if="node.default_lang_id=={{$lngTab->id}}"><%node.{{$lngTab->code}}Title.input%></span>
    @endforeach
<div class="pull-right irem-wrap-icon" >
    <span class="pull-left">Item Link</span>
    <a href="javascript:void(0)" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)">
        <i class="glyphicon glyphicon-pencil"></i>
    </a>
    <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>" data-nodrag ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)" ng-class="node.toggle_class ? 'glyphicon-menu-down' : 'glyphicon-menu-right' "></i>
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
</ul>
<div class="tab-content language-tab">
    <div id="lang-thai" class="tab-pane fade in active">
            @foreach(json_decode($langCodes) as $lngTab) 
            <div class="form-row" id="lang<%node.id%>_{{$lngTab->code}}" ng-if="node.default_lang_id=={{$lngTab->id}}">
                <label><%node.{{$lngTab->code}}Title.title%></label>
                <input type="text" ng-model="node.{{$lngTab->code}}Title.input" value="" id="title_<% node.id %>">
            </div>
            @endforeach
       
        <div class="form-row">
            <label>Menu item URL </label>
            <div class="radio-group mt-5 mb-5">
                <label class="radio-wrap"  ng-click="openLink(node.id,'1')">
                    <input type="radio" ng-model="node.atrlinkoptions" ng-value="1" name="link_<%node.id%>" id="link_<% node.id %>"> 
                    <span class="radio-label">Link</span>
                </label>
                <label class="radio-wrap"  ng-click="noLink(node.id,2)">
                    <input type="radio" ng-model="node.atrlinkoptions" ng-value="0" name="link_<%node.id%>"  id="nolink_<% node.id %>" >
                    <span class="radio-label">No Link</span>
                </label>
            </div>
            <input type="text" ng-model="node.atrLinkInput" value="" id="LinkInput_<% node.id %>" ng-if="node.atrlinkoptions==1">
        </div>


        <div class="form-row">
            <label>Menu Type </label>
            <select  class="selectpicker" ng-model="node.menuType" ng-change="getTypeList(node.menuType)" data-live-search="true" selectpicker-Config datatable-enable="enableSelect">
            	<option value=""></option>
                <option data-icon="<%objList.class%>" value="<%objList.id%>" ng-repeat="objList in LinkMenuType"><%objList.title%></option>
            </select>
        </div>          
        <!-- //ng-show="categoryShow"   -->
        <div class="form-row"  ng-if="node.menuType==1">
            <label>Choose <% categoryTitle %></label>
            <div class="" id="treeMenuContainer">
                <div class="megatree-menu">
                    <ul class="tree megamenu_tree">
                        <node-tree children="cattree"></node-tree>
                    </ul>
                </div>
            </div>
        </div>

        

        <!--Profuct List-->
        <!-- // ng-show="productShow" -->
        <div class="form-row" ng-if="node.menuType==5">    
            <table id="megaTable_<% node.id %>" class="table table-striped table-bordered" width="100%" cellspacing="0" selectpicker-Config datatable-enable="enableTable">
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>SKU</th>
                        <th>Price</th>>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key,product) in productJson">
                        <td><input type="radio" value="<%product.id%>" ng-model="node.productId" name="productId" ng-click="productNode(node,product)"></td>
                        <td><% product.id %></td>
                        <td><% product.name %></td>
                        <td align="center"><img src="<% product.thumbnail_image %>" alt="" width="35px"></td>
                        <td><% product.sku %></td>
                        <td>฿ <% product.initial_price %></td>                                            
                    </tr>
                    
                </tbody>
            </table>
        </div>


        <!--Profuct List-->

        <!--Page Link Start-->
        <!-- // ng-if="node.menuType==4" -->
        <div class="form-row" ng-if="node.menuType==4">
            <label>Static Page Link</label>
            <select  class="selectpicker" ng-model="node.pageLink" data-live-search="true" selectpicker-Config datatable-enable="enableSelect">
                <option data-icon="glyphicon-folder-close" ng-repeat="objList in staticPageLink" value="<%objList.url%>"><%objList.title%></option>
            </select>
        </div>

        <!--Page Link Start-->


         <!--System Page Link Start-->
        <div class="form-row" ng-if="node.menuType==3">
            <label>System Page Link</label>
            <select  class="selectpicker" ng-model="node.systmePageLinks" data-live-search="true" selectpicker-Config datatable-enable="enableSelect">
                <option data-icon="glyphicon-folder-close" ng-repeat="objList in systmePageLinks" value="<%objList.url%>"><%objList.title%></option>
            </select>
        </div>

        <!--Page Link Start-->


        

        
        <div class="form-row">
            <label>Custom CSS Class </label>
            <input type="text" ng-model="node.atrcustomcss">
        </div>
    </div>

   


    <div class="menu-edit-icon-wrap" id="" style="display:block;">
    <h3>Menu Icon</h3>                      
    <div class="lib-icon-wrap">
        <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)"> Icon Library</button>
        <div class="list-icon">

            <span><i id="linkMenuIcon_<% node.id %>" class="fa fa-<%node.menuIcon%>"></i> Icon Item use <i class="icon-remove" ng-click="removeIcon()" ></i>
        </div>
    </div>
    </div>
</div>         
</div>
</div>
</div>

