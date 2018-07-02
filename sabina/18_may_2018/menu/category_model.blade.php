<div class="modal fade iconModal" id="categoryList" role="dialog">
    <div class="modal-dialog modal-lg">
    <!-- Modal content Start Here-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close icon-remove" data-dismiss="modal"></button>
          <h3 class="modal-title">Category List</h3>
        </div>
        <div class="modal-body">
          <div style="">
             <!-- //ng-show="categoryShow"   -->
              <div class="form-row">
                  <label>Choose Category ID</label>
                  <input type="hidden" name=""  ng-model="hiddenCurrentNode">
                  <div class="" id="treeMenuContainer">
                  <div class="megatree-menu">
                      <ul class="tree">
                          <li class="tree-list">
                          <a href="javascript:void(0)"><i class="menuIcon glyphicon glyphicon-minus"></i>
                          <i><img src="images/folder.svg" alt=""></i> Default Category</a>
                              <ul> 
                                  <node-tree children="cattree"></node-tree>
                              </ul>
                          </li>
                      </ul>
                  </div>

                      
                  </div>
              </div>

          </div>
        </div>       
      </div>
    <!-- Modal content Start Here-->
   </div>
</div>