@extends('layouts/admin/menu/add')

@section('title')
    @lang('admin.all_translation_banner')
@stop

@section('header_styles')
    <link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/bootstrap.min.css') }}"/>
    <link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/angular-ui-tree.css') }}"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/app.css') }}"/>
 
@stop


 @section('content')

<!-- Content start here -->

<script>
 var default_lang_id = '@{{ $default_lang_id}}';  
 var type = '@{{ $type }}';
</script>
 


<div class="container" ng-controller="megamenuCtrl">
  <div class="row">
    <div class="col-sm-12">
   


      <!-- Nested node template -->
<script type="text/ng-template" id="nodes_renderer1.html">
  <div ui-tree-handle class="tree-node tree-node-content">
    <a class="btn btn-success btn-xs" data-nodrag ng-click="toggle(this)"><span class="glyphicon" ng-class="{'glyphicon-chevron-right': collapsed, 'glyphicon-chevron-down': !collapsed}"></span></a>
    <input type="text" ng-model="node.title">
    <a class="pull-right btn btn-danger btn-xs" data-nodrag ng-click="remove(this)"><span class="glyphicon glyphicon-remove"></span></a>
    <a class="pull-right btn btn-primary btn-xs" data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;"><span class="glyphicon glyphicon-plus"></span></a>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer1.html'">
    </li>
  </ol>
</script>
<script type="text/ng-template" id="nodes_renderer2.html">
  <div class="tree-node">
    <div class="pull-left tree-handle" ui-tree-handle>
      <span class="glyphicon glyphicon-list"></span>
    </div>
    <div class="tree-node-content">
      <a class="btn btn-success btn-xs" data-nodrag ng-click="toggle(this)">
        <span class="glyphicon" ng-class="{
          'glyphicon-chevron-right': collapsed,
          'glyphicon-chevron-down': !collapsed
          }">
        </span>
      </a>

      <input type="text" ng-model="node.title">

      <a class="pull-right btn btn-danger btn-xs" data-nodrag ng-click="remove(this)"><span class="glyphicon glyphicon-remove"></span></a>
      <a class="pull-right btn btn-primary btn-xs" data-nodrag ng-click="newSubItem(this)" style="margin-right: 8px;"><span class="glyphicon glyphicon-plus"></span></a>
    </div>
  </div>
  <ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}">
    <li ng-repeat="node in node.nodes" ui-tree-node ng-include="'nodes_renderer2.html'">
    </li>
  </ol>
</script>



<div class="row">
  <div class="col-sm-6">
    <h3>Tree 1 - Source</h3>
    <div ui-tree id="tree1-root" data-clone-enabled="true" data-nodrop-enabled="true">
      <ol ui-tree-nodes="" ng-model="tree1">
        <li ng-repeat="node in tree1" ui-tree-node ng-include="'nodes_renderer1.html'"></li>
      </ol>
    </div>
  </div>

  <div class="col-sm-6">
    <h3>Tree 2 - Destination</h3>
    <div ui-tree id="tree2-root" data-clone-enabled="true">
      <ol ui-tree-nodes="" ng-model="tree2">
        <li ng-repeat="node in tree2" ui-tree-node ng-include="'nodes_renderer2.html'"></li>
      </ol>
    </div>
  </div>
</div>

<h3>Data binding</h3>
<div class="row">
  <div class="col-sm-6">
    <pre class="code">@{{ tree1 | json }}</pre>
  </div>

  <div class="col-sm-6">
    <pre class="code">@{{ tree2 | json }}</pre>
  </div>
</div>

</div>
  </div>

</div>

<!-- JavaScript -->
<!--[if IE 8]>
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js"></script>
<![endif]-->
@stop
<!-- @section('footer_scripts') -->
<!-- @include('includes.gridtablejsdeps') -->
    <script src='{{ asset("js/megamenu/bower_components/angular/angular.min.js") }}'></script>    
    <script src='{{ asset("js/megamenu/bower_components/angular-route/angular-route.min.js") }}'></script>    
    <script src='{{ asset("js/megamenu/source/main.js") }}'></script>
    <script src="{{ asset('js/megamenu/source/controllers/handleCtrl.js') }}"></script>
    <script src="{{ asset('js/megamenu/source/controllers/nodeCtrl.js') }}"></script>
    <script src="{{ asset('js/megamenu/source/controllers/nodesCtrl.js') }}"></script>
    <script src="{{ asset('js/megamenu/source/controllers/treeCtrl.js') }}"></script>
    <script src="{{ asset('js/megamenu/source/directives/uiTree.js') }}"></script>    
    <script src="{{ asset('js/megamenu/source/directives/uiTreeHandle.js') }}"></script>    
    <script src="{{ asset('js/megamenu/source/directives/uiTreeNode.js') }}"></script>    
    <script src="{{ asset('js/megamenu/source/directives/uiTreeNodes.js') }}"></script>    
    <script src="{{ asset('js/megamenu/source/services/helper.js') }}"></script>  
    <script src="{{ asset('js/megamenu/js/ui-bootstrap-tpls.js') }}"></script>  
    <script src="{{ asset('js/angular/sabinaApp/model/menuApp.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/angular/sabinaApp/controller/megamenuCtrl.js') }}" type="text/javascript"></script>
      
@stop

