<div class="modal fade iconModal" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close icon-remove" data-dismiss="modal"></button>
          <h3 class="modal-title">Icon List</h3>
        </div>
        <div class="modal-body">
          <div style="max-height: 500px; overflow-x: hidden; overflow-y: auto;">
            <input type="text" value="hiddenNodeId" id="hiddenNodeId">
            <div class="" ng-repeat="icon in iconLibrabry">
                <div class="classTitle">
                  <h3 class="mb-5"><% icon.label %></h3>
                </div>
                <div class="glyph-icon-item" ng-repeat="class in icon.icons">
                  <a href="javascript:void(0)" ng-click="getIcon(class)">
                    <i class="fa fa-<% class %>" ></i>&nbsp;<% class %>
                  </a>
                </div>
              </div>
          </div>
        </div>       
      </div>
   </div>
</div>