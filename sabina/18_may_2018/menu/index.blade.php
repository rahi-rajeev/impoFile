@extends('layouts/admin/default')
@section('title')
    @lang('admin.team_members')
@stop
@section('header_styles')
@stop
@section('content')
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 

    <script type="text/javascript">
        var dataJsonUrl = "{{ action('Admin\Menu\MenuController@menulisting') }}";
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";

        var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
      //pagination config 
      var pagination = {!! getPagination() !!};
      var per_page_limt = {{ getPagination('limit') }};

      //Listen on table columns setting
        _getInfo=(fName,fType)=>{
       let ind = fieldset.findIndex(x=>x.fieldName===fName);
       if(ind>=0){
            let r =false;
            if(fType==='sortable'){
              r= (typeof fieldset[ind].sortable!=='undefined')? fieldset[ind].sortable:false;
            }else if(fType==='width'){
              r= (typeof fieldset[ind].width!=='undefined')? fieldset[ind].width:100;
            }else if(fType==='align'){
               r= (typeof fieldset[ind].align!=='undefined')? 'text-'+fieldset[ind].align:'text-left';
            }
            return r;
       }else{
        return false;
       } 
       return false;
    };
    /**** This code used for columns setting of table where field is field name of database filed.*****/
        var columsSetting = [
         {
          field : 'id',
                displayName : 'Id',
                cellTemplate : '<span><%grid.appScope.seqNumber(row)+1%></span>',
                enableSorting : _getInfo('id','sortable'),
                minWidth : _getInfo('id','width'),
                cellClass : _getInfo('id','align'),
        },


        { 
          field : 'wrapper_id',
          displayName : 'Wrapper Id',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('title','sortable'),
          minWidth : _getInfo('title','width'),
          cellClass : _getInfo('title','align'),
      },
      { 
          field : 'block_id',
          displayName : 'Block',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('title','sortable'),
          minWidth : _getInfo('title','width'),
          cellClass : _getInfo('title','align'),
      },
       { 
          field : 'title',
          displayName : 'Title',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('title','sortable'),
          minWidth : _getInfo('title','width'),
          cellClass : _getInfo('title','align'),
      },
      { 
          field : 'status',
          displayName : 'Status',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('status','sortable'),
          minWidth : _getInfo('status','width'),
          cellClass : _getInfo('status','align'),
      },
      { 
          field : 'is_default_block',
          displayName : 'Default',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('description','sortable'),
          minWidth : _getInfo('default','width'),
          cellClass : _getInfo('default','align'),
      },
      //  { 
      //     field : 'description',
      //     displayName : 'Description',
      //     //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
      //     enableSorting : _getInfo('description','sortable'),
      //     minWidth : _getInfo('description','width'),
      //     cellClass : _getInfo('description','align'),
      // },
    {  
          field : 'updated_at',
          displayName : 'Updated Date',
          // cellTemplate: '<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.initial_price%>"><%row.entity.initial_price%> '+currency+'</a>',
          enableSorting : _getInfo('date','sortable'),
          minWidth : _getInfo('date','width'),
          cellClass:_getInfo('date','align'),
      },{  
          field : 'Action',
          displayName : 'Action',
          cellTemplate: '<div><a href="<%row.entity.edit_url%>" class="" title="<%row.entity.edit_text%>">Edit</a></div>',
          minWidth: 100,
          cellClass:_getInfo('updated_at','align'),
      }];
    </script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/megaMenuList.js"></script>

<div class="content">
        <div class="header-title">
          <h1 class="title">@lang('menu.menu_list')</h1>
          <!-- <div class="pull-right btn-groups">
            <a class="btn" href="{{action('Admin\Menu\MenuController@createMenu')}}">@lang('menu.create_new_menu')</a>
          </div> -->
        </div>


        <div class="content-wrap">
       
        <ul class="nav nav-tabs lang-nav-tabs">
          <li class="active"><a data-toggle="tab" href="#home">All Menu</a></li>
          {{-- <li><a data-toggle="tab" href="#menu1">Active</a></li> --}}
          
        </ul>

        <div class="tab-content language-tab">
          <div id="home" class="tab-pane fade in active">
            <div class="ng-cloak" data-ng-controller="gridtableCtrl" ng-cloak>
              <div class="">
                 @include('includes.gridtable')
              </div>
            </div>
          </div>
          {{-- <div id="menu1" class="tab-pane fade">
            
          </div> --}}
          
        </div>
        </div>




        
</div>
@stop
@section('footer_scripts') 
  @include('includes.gridtablejsdeps')
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/megamenuindexCtrl.js"></script>
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
<script>
  jQuery(document).ready(function(e){
      jQuery('#info-content-tab a').click(function(e){
          jQuery('#info-content').toggle(); 
      
      });


      

  })



</script>
@stop