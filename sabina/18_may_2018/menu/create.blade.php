@extends('layouts/admin/menu/add')
@section('title')
@lang('admin.all_translation_banner')
@stop
@section('header_styles')

<style type="text/css">
div.fadeMe {
    opacity:0.5;
    filter: alpha(opacity=20);
    background-color:#000; 
    width:100%; 
    height:100%; 
    z-index:10;
    top:0; 
    left:0; 
    position:fixed; 
    display:none;
  }
  
div span#text{
	text-align: center;
	margin-top: 450px;
	color: #FFF;
	display: block;
	font-weight: bold;
	font-size: 20px;
}    

.submainwrapper{
    margin-left: 20px;
}
    .drop-menu-box{
        padding: 5px 5px 5px 5px !important;
    }
    .modal-dialog{
        width: 95 !important%;
    }

ul.tree {
list-style: none;
}

ul.tree > li {
margin: 10px;
}

ul.tree > li > span {
cursor: pointer;
}
</style>
<!--page level css -->
<link rel="stylesheet"  type="text/css" href="{{ asset('css/angular-ui-tree.min.css') }}"/>
<!-- <link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/app.css') }}"/>  -->
<link rel="stylesheet"  type="text/css" href="{{ asset('css/bootstrap-select.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/font-awesome.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ asset('css/mega-menu.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ asset('css/megamenu/css/dataTables.bootstrap.min.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ asset('css/preview.css') }}"/>
<link rel="stylesheet"  type="text/css" href="{{ Config('constants.admin_css_url')}}toastr.min.css"/>

@stop
@section('content')
<!-- Content start here -->
<script>
var default_lang_id = '{{ $default_lang_id }}';  
var type = '{{ $type }}';

</script>
<div class="fadeMe"><span id="text">Please wait...</span></div>
<div class="content mainjs" data-ng-controller="megamenuCtrl" ng-cloak>
    <div class="header-title">
        <h1 class="title">@lang('menu.infomation')</h1>
        <div class="pull-right btn-groups">
            <label>
                <!-- <div style="margin:-10px 0px 0px -50px;display:none" class="alert" id="msg"></div> -->

            </label>
            <button class="" ng-click="back()">@lang('menu.back')</button>
            <button class="btn-neg">@lang('menu.reset')</button>
            <button class="secondary" type="submit" ng-click="saveMenu()">@lang('menu.save')</button>
        </div>
    </div>
   
    <div class="content-wrap mega-wrap ">     
            <div id="msg"></div>       
            <h2 class="title">@lang('menu.infomation')</h2>
            <div class="menu-info-wrap row">
                <div class="menu-info-inner">
                    <div class="col-sm-2">
                        <div class="form-row">
                            <label>Title</label>
                            <input type="text" ng-model="menu.title">
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-row">
                            <label>Wrapper ID</label>
                            <input type="text" ng-model="menu.wrapper_id" readonly="" disabled="">
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <div class="form-row">
                            <label>Wrapper CSS Class</label>
                            <input type="text" ng-model="menu.wrapper_css_class">
                        </div>
                    </div>
                      <div class="col-sm-2">
                          <div class="form-row">
                            <label>Dropdown Animation</label>
                            <select ng-model="menu.dropdown_animation">
                                <option value="Normal">Normal</option>
                                <option value="slideUp">Slide In Up</option>
                                <option value="slideInLeft">Slide In Left</option>
                                <option value="fadeIn">FadeIn</option>
                                <option value="fadeInDown">Fade In Down</option>
                                <option value="lightSpeedIn">Light Speed In</option>
                                <option value="zoomIn">zoomIn</option>
                            </select>
                        </div>
                    </div>
                   <!--  <div class="col-sm-2">
                       
                       
                       
                        <div class="form-row">
                            <label>Dropdown Style</label>
                            <select ng-model="menu.dropdown_style">
                                <option value="auto">Auto Width</option>
                                <option value="full">Full Width</option>
                            </select>
                        </div>
                        

                    </div> -->
                    <!-- <div class="col-sm-2">
                        <div class="form-row">
                            <label>Block</label>
                            <select ng-model="menu.block_id">
                                <option value="">Choose Block</option>
                                <option value="<%block.id%>|<%block.title%>" ng-repeat="block in blockList"  ng-selected="block.id == menu.block_id" ><%block.title%></option>
                            </select>
                        </div>
                    </div> -->


                    <!-- <div class="col-sm-2">
                        <div class="form-row">
                            <label>Status</label>
                            <select ng-model="menu.status">
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                            </select>
                        </div>
                    </div> -->


                   <!--  <div class="col-sm-2">
                        <div class="form-row">
                            <label>Default Menu</label>
                            <select ng-model="menu.is_default_block">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="box megamenu-box">
                <div class="row">
                    <div class="col-sm-4">
                    	<div class="left-side-content">
                        <div class="title-wrap">
                            <div class="pull-right" style="display: none;">
                                <a href="javascript:void(0)" class="help">help</a>
                            </div>
                            <h2>Megamenu Material</h2>                        
                        </div>
                        <div class="mega-item-wrap">
                            <div class="meag-item">
							<div ui-tree="megaMenuTreeOption" id="tree1-root" data-clone-enabled="true" data-nodrop-enabled="true">
								<ol ui-tree-nodes ng-model="tree1"><%node.title%>
								<li ng-repeat="node in tree1" ui-tree-node ng-include="'nodes_renderer2.html'" id="menu_<%node.id%>" ng-class="(node.id==5)?'second-last':''">
								</li>
							</ol>
							</div>
						
                            </div>
                        </div> 
                        </div>                      
                    </div>

                    <div class="col-sm-8">
                        <div class="title-wrap">
                            <div class="pull-right">
                            	<button ng-click="expandAll()" class="btn secondary btn-info"><i class=" glyphicon glyphicon-resize-full "></i>&nbsp;Expand all</button>
                                <button ng-click="collapseAll()" class="btn secondary btn-warning"><i class="glyphicon glyphicon-resize-small"></i>&nbsp;Collapse all</button>
                                <button class="btn preview-btn" style="display: none;" data-toggle="modal" data-target="#preview-modal">
                                    <i class="glyphicon glyphicon-eye-open"></i> Preview</button>
                            <a href="javascript:void(0)" class="help" style="display: none;">help</a>
                            </div>
                            <h2>Megamenu Structure</h2>                        
                        </div>
                        <div class="drop-menu-box" ui-tree="megaMenuTreeOption" id="tree-root">
                        	<!-- <div class="blank-icon-box meag-item">
							
                                <div class="blank-icon">
                                    <i class="glyphicon glyphicon-share-alt"></i>
                                </div>
                                <div class="list-item item-wrap">
                                    <i class="icon fa fa-link"></i>
                                    Item Wrapper
                                    <i class="fa fa-bars pull-right"></i>
                                </div>  
                                <h3>Drag to drop here</h3>                              
                            </div> -->
                          	<ol ui-tree-nodes="" ng-model="data">
								<li ng-repeat="(key,node) in data" ui-tree-node ng-include="'nodes_renderer.html'"> 
								</li>
							</ol>
                        </div>
                        <div>&nbsp;</div>
                       
                    </div>
                </div>
            </div>
        </div>
    <div class="content-wrap clearfix" >
        @include('admin.menu.script.template_menu')

        @include('admin.menu.script.template_container')

    </div>

<!-- <pre><%  data | json %></pre> -->
<!--Modal Box for Item wrapper Section Tab start here-->
  <div class="test">
     @include('admin.menu.item_wrapper_model')
  </div>
<!--Modal Box for Item wrapper Section Tab ends here-->


<!--Modal Box for Preview Section Tab start here-->
  <div class="test">
     @include('admin.menu.preview_model')
  </div>
<!--Modal Box for Preview Section Tab ends here-->


<!--Modal Box for Category List start here-->
  <div class="test">
     @include('admin.menu.category_model')
  </div>
<!--Modal Box for Category List ends here-->

<!--Modal Box for Category List start here-->
  <div class="test">
     @include('admin.menu.image_library_model')
  </div>
<!--Modal Box for Category List ends here-->
</div>


							
@stop
@section('footer_scripts')
<script>
    var id = '{{ $id }}';
    var site_url = '{{ $site_url }}';
    var url = '{{ $url }}';
    var saveUrl = '{{ $saveUrl }}';
    var listingUrl = '{{ $listingUrl }}';
    var typelistUrl = '{{ $typelistUrl }}';
    var blockListUrl = '{{ $blockListUrl }}';
    var imagesListUrl = '{{ $imagesListUrl }}';
    var langCodearr = '{{ $langCodearr }}';
    var globalTree = '{!! $globalTree !!}';
</script>
<script src="{{ asset('js/bootstrap-select.min.js') }}"></script>
<script src="{{ asset('js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('js/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ Config('constants.angular_url') }}libs/angular.min.js"></script>
@include('includes.froalaeditor_dependencies')
<script src="{{ asset('js/toastr.min.js') }}"></script>
<script src="{{asset('angular-froala/src/angular-froala.js')}}"></script>
<script src="{{ Config('constants.angular_url') }}libs/angular-ui-tree.min.js"></script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/services/service.js"></script>
<script type="text/javascript" src="{{ Config('constants.angular_url') }}sabinaApp/model/megaMenuApp.js"></script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/megamenuCtrl.js"></script>
<script type="text/javascript">
    jQuery('#menu_5').addClass('second-last');
    //$(".select-lang select").msDropdown({roundedBorder:false});
    // var headerHeight = jQuery('.header-top').height();
    // var headertitleHeight = jQuery('.header-title').height();
    // var totalHeaderHeight = headerHeight + headertitleHeight;
    // var stickyHeaderTop = jQuery('.left-side-content').offset().top;
    // jQuery(window).scroll(function(){
    //         if( jQuery(window).scrollTop() > stickyHeaderTop ) {
    //                 jQuery('.left-side-content').css({position: 'fixed', top: totalHeaderHeight + "px", width: '25%'});
    //         } else {
    //                 jQuery('.left-side-content').css({position: 'static', top: '0px', width: 'auto'});
    //         }
    // });

     $(function() {
        var offset = $(".left-side-content").offset();
        var topPadding = 130;
        $(window).scroll(function() {
            if ($(window).scrollTop() > offset.top) {
                $(".left-side-content").stop().animate({
                    marginTop: $(window).scrollTop() - offset.top + topPadding
                });
            } else {
                $(".left-side-content").stop().animate({
                    marginTop: 0
                });
            };
        });
    });
</script>

@stop

