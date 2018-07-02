<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item <% node.menuParentIcon %>">
      <i class="icon glyphicon glyphicon-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
    <%node.title%> 
    <div class="pull-right irem-wrap-icon" >
        <span class="pull-left">Tab Container</span>
        <a href="javascript:void(0)" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)">
            <i class="glyphicon glyphicon-pencil"></i>
        </a>
        <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)" ng-class="node.toggle_class ? 'glyphicon-menu-down' : 'glyphicon-menu-right' "></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>">                                                               
      <div class="form-row">
            <label>Custom CSS Inline</label>
            <input type="text" ng-model="node.atrCustomCssInline">
        </div> 
        <div class="form-row">
            <label>Custom CSS Class</label>
            <input type="text" ng-model="node.atrCustomCss">
        </div>                                    
    <div class="layout-wrap">
        <div class="form-row">
           <label>Tab Type</label>
           <div class="layout-example">
               <label class="radio-wrap">
               <input type="radio" name="layout-ex" checked="checked" value="1" ng-model="node.atrLayoutType"> <span class="radio-label">Vertical</span>
               <div class="layout-exImg selected">
                   <img src="images/vertical.jpg" alt="">
               </div>
               </label>
           </div>
           <div class="layout-example">
               <label class="radio-wrap">
                <input ng-model="node.atrLayoutType" value="2" type="radio"> <span class="radio-label">Horizontal</span>
               <div class="layout-exImg">
                   <img src="images/horizontal.jpg" alt="">
               </div>
               </label>
           </div>
       </div>
    </div>
    <div class="form-row">
        <p>Background</span>  <a href="javascript:void(0)" class="example-txt">Example </a></p>
        <button class="secondary" data-toggle="modal" data-target="#myImageModal" data-ng-model="node.atrBackgroundImage" ng-click="showModelBoxForImages(node)">Image Library</button>
        <div class="image-lib">
            <div class="img-lig-list">
                <img src="<% node.atrBackgroundImage %>" alt="">
                <i class="icon-remove close"></i>
                <div class="img-name">Image Name .Jpeg</div>
            </div>
        </div>
    </div> 
    <div class="form-row">
        <h3>Position</h3>
        {{-- ng-class="{'active'}[node.position==1]" --}}
        <div class="position" id="parentDiv_<% node.id %>">
                <div class="pos-list"  id="position_<% node.id %>_1" ng-click="setContentPosition(1,node.id)">
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                {{-- ng-class="{'active'}[node.position==2]" --}}
                <div class="pos-list"  id="position_<% node.id %>_2" ng-click="setContentPosition(2,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_3" ng-click="setContentPosition(3,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_4" ng-click="setContentPosition(4,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_5" ng-click="setContentPosition(5,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_6" ng-click="setContentPosition(6,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_7" ng-click="setContentPosition(7,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_8" ng-click="setContentPosition(8,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list" id="position_<% node.id %>_9" ng-click="setContentPosition(9,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                </div>
                <div class="pos-list big-pos"  id="position_<% node.id %>_10" ng-click="setContentPosition(10,node.id)">
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list big-pos" id="position_<% node.id %>_11" ng-click="setContentPosition(11,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list big-pos" id="position_<% node.id %>_12" ng-click="setContentPosition(12,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                </div>
            </div>
        <div class="pos-measure">
            <span class="block">X (px)</span>
            <input type="text" ng-model="node.positionX">
        </div>
        <div class="pos-measure">
            <span class="block">Y (px)</span>
            <input type="text" ng-model="node.positionY">  
        </div>
    </div>   

        <div class="menu-edit-icon-wrap" id="" style="display:block;">
        <h3>Menu Icon</h3>                      
        <div class="lib-icon-wrap">
            <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)"> Icon Library</button>
            <div class="list-icon">
                <span><i id="linkMenuIcon_<% node.id %>" class=""></i> Icon Item use <i class="icon-remove" ng-click="removeIcon()" ></i>
            </div>
        </div>
        </div>     
</div>

</div>





</div>



