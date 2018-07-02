                   <div id="preview-modal" class="modal fade preview-modal" role="dialog">
                    <div class="modal-dialog">

                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">
                                 <i class="icon-remove"></i>
                                </button>
                                <h2 class="modal-title">Preview</h2>
                            </div>
                            <div class="megamenu-wrap">
                                <div class="horizontal-preview">
                                    <img class="menubanner" src="images/banner-menu.jpg" alt="">
                                </div>

                                  <!-- recursive template -->
                                    <script type="text/ng-template" id="categoryTree">
                                       <a class="menu-link" href="#">
                                       <span><%category.name%></span>
                                       <!-- <%category | json%> -->
                                        <i class="glyphicon glyphicon-menu-right"></i></a>
                                        <ul ng-if="category.children" class="level1 groupmenu-drop">
                                            <li ng-repeat="category in category.children" ng-include="'categoryTree'" class="item level2 nav-2-1">      
                                            <a class="menu-link" href="#">
                                               <span><%category.name%></span>
                                                <i class="glyphicon glyphicon-menu-right"></i></a>     
                                            </li>
                                        </ul>
                                    </script>
                                    <!-- use -->






                                <ul class="groupmenu">

                                    <!--Template For Tab Section start here-->
                                    <li class="item lavel0" ng-class="(list.menuTypeId==6 || list.nodes[0].menuTypeId==3)? 'catmenu-lavel0':'item lavel0'" ng-repeat="list in data">
                                        <a href="<%list.atrLinkInput%>" ng-if="list.atrlinkoptions==1">
                                        <i class="fa fa-<%list.atrmenuIcon%>"></i> <%list.enTitle.input%> </a>
                                        <a href="javascript:void(0)" ng-if="list.atrlinkoptions==0">
                                        <i class="fa fa-<%list.atrmenuIcon%>"></i> <%list.enTitle.input%> </a>
                                        
                                        <ul class="groupmenu-drop  slideInUp" ng-if="list.nodes" ng-repeat="node in list.nodes">
                                            <li class="item level1 text-content" ng-if="node.menuTypeId==4">
                                                <div class="groupmenu-wrap">
                                                    <!-- <%node%> -->
                                                <div ng-if="node.menuTypeId==4" ng-if="node.nodes.menuTypeId==4">
                                                    @include('admin.menu.preview.tabs_template')
                                                </div>
                                                </div>
                                            </li>

                                            <li class="item level1 text-content" ng-if="list.menuTypeId==1">
                                                <div class="groupmenu-wrap ">
                                                    <div class="row" ng-repeat="nodes in list.nodes">

                                                        @include('admin.menu.preview.content_template')
                                                        
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="item level0 catmenu-lavel0" ng-if="list.menuTypeId==1">
                                                 @include('admin.menu.preview.itemLinks_template')
                                           </li>
                                        </ul> 

                                        <ul class="cat-tree groupmenu-drop" ng-if="list.menuTypeId==6">
                                            <a class="menu-link" href="#"><span><%category.name%></span><i class="glyphicon glyphicon-menu-right"></i></a>
                                            <li ng-repeat="category in cattree" ng-include="'categoryTree'" ></li>
                                        </ul>
                                        
                                      
                                           
                                        
                                    </li>
                                    <!--Template For Tab Section Ends Here-->
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>



