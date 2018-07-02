<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item <% node.menuParentIcon %>">
     <i class="icon glyphicon glyphicon-<%node.menuIcon%>" id="menuIcon_<% node.id %>" ></i>
    <%node.title%> 
    <div class="pull-right irem-wrap-icon" >
        <span class="pull-left">Content</span>
        <a href="javascript:void(0)" data-nodrag  ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)">
            <i class="glyphicon glyphicon-pencil"></i>
        </a>
        <i class="glyphicon" id="itemclass_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>" data-nodrag ng-class="node.toggle_class ? 'glyphicon-menu-down' : 'glyphicon-menu-right' " ng-click="openChildItem($event, node, node.menuTypeId,$index,data[key].id,node.id)"></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%  $index %>_<%data[key].id%>_<%node.id%>">        <div class="form-row">
            <label>Custom CSS Inline</label>
            <input type="text" ng-model="node.atrCustomCssInline">
        </div> 
        <div class="form-row">
            <label>Custom CSS Class</label>
            <input type="text" ng-model="node.atrCustomCss">
        </div>  
        <div class="form-row layout-wrap">
            <label>Layout</label>
            <ul class="nav nav-tabs col-lang-tab">
                <li class="active" ng-click="contentLayout(1,node.id,$index,data[key].id)"><a data-toggle="tab" href="#column_1_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col1.jpg" alt="" class="img">
                    <img src="images/col1-active.jpg" alt="" class="img-active">
                </a>
                </li>
                <li ng-click="contentLayout(2,node.id,$index,data[key].id)"><a data-toggle="tab" href="#column_2_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col2.jpg" alt="" class="img">
                    <img src="images/col2-active.jpg" alt="" class="img-active">
                </a></li>
                <li ng-click="contentLayout(3,node.id,$index,data[key].id)"><a data-toggle="tab" href="#column_3_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col3.jpg" alt="" class="img">
                    <img src="images/col3-active.jpg" alt="" class="img-active">
                </a></li>
                <li ng-click="contentLayout(4,node.id,$index,data[key].id)"><a data-toggle="tab" href="#column_4_<%$index%>_<%node.id%>_<%data[key].id%>">
                    <img src="images/col4.jpg" alt="" class="img">
                    <img src="images/col4-active.jpg" alt="" class="img-active">
                </a></li>
            </ul>
            <div class="tab-content language-tab col-lang-content">
                <div id="column_1_<%$index%>_<%node.id%>_<%data[key].id%>" ng-class="(node.atrLayoutType==1)?'tab-pane fade in active':'tab-pane fade'">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12"> Column one </label>
                        <div class="col-sm-12">              
                            <textarea row="4" ng-model="node.atrlayout.Coloum_1.body_1" placeholder='<p>Insert HTML Structure</p>' class="txtEditor froala-editor-apply" froala><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>                                            
                </div>
                <div id="column_2_<%$index%>_<%node.id%>_<%data[key].id%>" ng-class="(node.atrLayoutType==2)?'tab-pane fade in active':'tab-pane fade'">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row">
                        <label class="col-sm-12"> Column two </label>                    
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
                <div id="column_3_<%$index%>_<%node.id%>_<%data[key].id%>" ng-class="(node.atrLayoutType==3)?'tab-pane fade in active':'tab-pane fade'">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12"> Column Three </label> 
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_1" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_2" class="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-4">
                            <textarea  row="4" ng-model="node.atrlayout.Coloum_3.body_3" class="froala-editor-apply" froala  placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                    </div>
                </div>
                <div id="column_4_<%$index%>_<%node.id%>_<%data[key].id%>" ng-class="(node.atrLayoutType==4)?'tab-pane fade in active':'tab-pane fade'">
                    <div class="form-row tab-action">
                        <span class="fa fa-pencil" ng-click="getEditor()"></span>
                        <span class="fa fa-cog"></span>
                        <span class="fa fa-clipboard"></span>
                    </div>
                    <div class="form-row row"> 
                        <label class="col-sm-12"> Column Four </label>
                        <div class="col-sm-3">
                            <textarea   ng-model="node.atrlayout.Coloum_4.body_1" calss="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
                            </textarea>
                        </div>
                        <div class="col-sm-3">
                            <textarea  ng-model="node.atrlayout.Coloum_4.body_2" calss="froala-editor-apply" froala placeholder='<p>Insert HTML Structure</p>'><p>Insert HTML Structure</p>
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

        <div class="form-row">
            <p>Background for content </span>  <a href="javascript:void(0)" class="example-txt">Example </a></p>
            <button class="secondary" data-toggle="modal" data-target="#myImageModal" data-ng-model="node.atrBackgroundImage" ng-click="showModelBoxForImages(node)">Image Library</button>
            <div class="image-lib">
                <div class="img-lig-list">
                    <img src="<% node.atrBackgroundImage %>" alt="" id="img_parentDiv_<% node.id %>" >
                    <i class="icon-remove close" ng-click="removeImage()"></i>
                    <div class="img-name">Image Name .Jpeg</div>
                </div>
            </div>
        </div> 
        <div class="form-row" ng-if="node==1000">
            <h3>Position</h3>
             {{-- ng-class="{'active'}[node.position==1]" --}}
            <div class="position" id="parentDiv_<% node.id %>">
                <div class="pos-list" id="position_<% node.id %>_1"  id="position_<% node.id %>_1" ng-click="setContentPosition(1,node.id)">
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
                <div class="pos-list" ng-class="node.position==2?'active':''" id="position_<% node.id %>_2"   ng-click="setContentPosition(2,node.id)">
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
                <div class="pos-list" ng-class="node.position==3?'active':''" id="position_<% node.id %>_3"  ng-click="setContentPosition(3,node.id)">
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
                <div class="pos-list" ng-class="node.position==4?'active':''" id="position_<% node.id %>_4"  ng-click="setContentPosition(4,node.id)">
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
                <div class="pos-list" ng-class="node.position==5?'active':''" id="position_<% node.id %>_5"  ng-click="setContentPosition(5,node.id)">
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
                <div class="pos-list" ng-class="node.position==6?'active':''" id="position_<% node.id %>_6"  ng-click="setContentPosition(6,node.id)">
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
                <div class="pos-list" ng-class="node.position==7?'active':''" id="position_<% node.id %>_7" ng-click="setContentPosition(7,node.id)">
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
                <div class="pos-list" ng-class="node.position==8?'active':''" id="position_<% node.id %>_8" ng-click="setContentPosition(8,node.id)">
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
                <div class="pos-list" ng-class="node.position==9?'active':''" id="position_<% node.id %>_9" ng-click="setContentPosition(9,node.id)">
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
                <div class="pos-list big-pos" ng-class="node.position==10?'active':''" id="position_<% node.id %>_10" ng-click="setContentPosition(10,node.id)">
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list big-pos" ng-class="node.position==11?'active':''" id="position_<% node.id %>_11" ng-click="setContentPosition(11,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                    <span class="pos-box"></span>
                </div>
                <div class="pos-list big-pos" ng-class="node.position==12?'active':''" id="position_<% node.id %>_12" ng-click="setContentPosition(12,node.id)">
                    <span class="pos-box"></span>
                    <span class="pos-box"></span>
                    <span class="pos-box fill"></span>
                </div>
            </div>
        </div>    

        <div class="menu-edit-icon-wrap" id="" style="display:block;">
        <h3>Menu Icon</h3>                      
        <div class="lib-icon-wrap">
        <button class="secondary" data-ng-model="node.atrmenuIcon" data-toggle="modal" data-target="#myModal" ng-click="showModelBox(node)"> Icon Library</button>
        <div class="list-icon">
        <span><i id="linkMenuIcon_<% node.id %>" class="fa fa-<% node.menuIcon %>"></i> Icon Item use <i class="icon-remove" ng-click="removeIcon()" ></i>
        </div>
        </div>
        </div>



</div>
</div>


</div>



