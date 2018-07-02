<script type="text/ng-template" id="nodes_renderer.html" >
    <div ui-tree-handle style="position: relative;"  >
      {{-- Item Wrapper Tab Start Here --}}
       <div ng-if="node.menuTypeId==1">
       @include('admin.menu.template.item_wrapper')
   	   </div>
      {{-- Item Wrapper Tab Ends  Here  --}}


      {{-- Content Start Here --}}
       <div ng-if="node.menuTypeId==2">
       @include('admin.menu.template.content_template')
   	   </div>
      {{-- Content Ends  Here  --}}


       {{-- Item Wrapper Tab Start Here --}}
       <div ng-if="node.menuTypeId==3">
       
       @include('admin.menu.template.item_links_template')
   	   </div>
      {{-- Item Wrapper Tab Ends  Here  --}}


      {{-- Tab Container Start Here --}}
       <div ng-if="node.menuTypeId==4">
       <!-- <%data[key].id%> -->
       @include('admin.menu.template.tab_container_template')
   	   </div>
      {{-- Tab Container Ends  Here  --}}




      {{-- Category list Tab Start Here --}}
       <div ng-if="node.menuTypeId==6">
       @include('admin.menu.template.category_list_template')
   	   </div>
      {{-- Category List Ends  Here  --}}


      {{-- Tabs item Tab Start Here --}}
       <div ng-if="node.menuTypeId==5">
       @include('admin.menu.template.tabs_items_template')
   	   </div>
      {{-- Tab Item Ends  Here  --}}


   </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <!--<ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">-->
    <li ng-repeat="(nodes_key,node) in node.nodes" ui-tree-node ng-include="'nodes_renderer.html'">
    </li>
  </ol>  


</script>

{{-- <script type="text/javascript">
  function _configSelectPickerDataTable(){
        console.log('sfdsfsdf');
        $('.selectpicker').selectpicker('refresh');
        $('.selectpicker1').selectpicker('refresh');
        $('#megaTable').DataTable();
    };

</script> --}}

