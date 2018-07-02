<script type="text/ng-template" id="nodes_renderer2.html">
  <div class="parent">
    <div  ui-tree-handle class="tree-node tree-node-content list-item <% node.menuParentIcon %>">
      <i class="icon glyphicon glyphicon-<%node.menuIcon%>"></i>
      &nbsp;&nbsp;<%node.title%>
      <i class="fa fa-bars pull-right"></i>
    </div>
    </div>
    <ol  style="margin-left: 25px;"  ui-tree-nodes="" ng-model="node.nodes" ng-class="{'hidden': collapsed}">
    <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer2.html'" ng-if="node.menuTypeId==5">
    </li>
  </ol>    
</script>
