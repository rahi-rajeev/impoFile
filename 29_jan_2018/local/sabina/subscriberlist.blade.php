@extends('layouts/admin/default')
@section('title')
    @lang('admin.team_members')
@stop
@section('header_styles')
@stop
@section('content')
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}ui-grid-unstable.css"> 
    <link rel="stylesheet" type="text/css" href="{{Config('constants.css_url') }}bootstrap-datepicker.css">

    <script type="text/javascript">
       
        // @if($list_type!='')
        // var dataJsonUrl = "{{ action('Admin\Newsletter\NewsletterController@subscriberlisting', $list_type) }}";
        // @endif
        // @if($list_type=='')
        // var dataJsonUrl = "{{ action('Admin\Newsletter\NewsletterController@subscriberlisting', 'NA') }}";
        // @endif

       @if($list_type!='')
       var list_type = '{{$list_type}}';
       @else
       var list_type = 'NA';
       @endif


        var dataJsonUrl = "{{ action('Admin\Newsletter\NewsletterController@subscriberlisting', "+list_type+" ) }}";
        
        var fieldSetJson = {!! $fieldsetdata !!};
        var fieldset = fieldSetJson.fieldSets;
        var showHeadrePagination = true;
        //var actionUrl ="{{ action('Admin\Warehouse\WarehouseController@bulkAction') }}";
        var tableLoaderImgUrl = "{{ Config::get('constants.loader_url')}}ajax-loader.gif";
        //pagination config 
      var pagination = {!! getPagination() !!};
      var per_page_limt = {{ getPagination('limit') }};


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
           }else {
              return false;
           }
           return false;
      };
    /**** This code used for columns setting of table where field is field name of database filed.*****/
        var columsSetting = [
         {
          field : 'id',
          displayName : 'S.No.',
          cellTemplate : '<span><%grid.appScope.seqNumber(row)+1%></span>',
          enableSorting : _getInfo('id','sortable'),
          minWidth : _getInfo('id','width'),
          cellClass : _getInfo('id','align'),
        },
        { 
          field : 'first_name',
          displayName : 'First Name',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('Name','sortable'),
          minWidth : _getInfo('name','width'),
          cellClass : _getInfo('name','align'),
      },
       { 
          field : 'last_name',
          displayName : 'Last Name',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('Name','sortable'),
          minWidth : _getInfo('name','width'),
          cellClass : _getInfo('name','align'),
      },
       { 
          field : 'gender',
          displayName : 'Gender',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('gender','sortable'),
          minWidth : _getInfo('gender','width'),
          cellClass : _getInfo('gender','align'),
      },
      { 
          field : 'email',
          displayName : 'Email',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('email','sortable'),
          minWidth : _getInfo('email','width'),
          cellClass : _getInfo('email','align'),
      },
      { 
          field : 'phone',
          displayName : 'Phone',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('phone','sortable'),
          minWidth : _getInfo('phone','width'),
          cellClass : _getInfo('phone','align'),
      },
      { 
          field : 'list_type',
          displayName : 'Type',
          //cellTemplate:'<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.sku%>"><%row.entity.sku%></a>',
          enableSorting : _getInfo('list_type','sortable'),
          minWidth : _getInfo('list_type','width'),
          cellClass : _getInfo('list_type','align'),
      },
      {  
          field : 'created_at',
          displayName : 'Created Date',
          // cellTemplate: '<a href="'+variantlisturl+'<%row.entity.id%>" class="fulldiv" title="<%row.entity.initial_price%>"><%row.entity.initial_price%> '+currency+'</a>',
          enableSorting : _getInfo('date','sortable'),
          minWidth : _getInfo('date','width'),
          cellClass:_getInfo('date','align'),
      },{  
          field : 'Action',
          displayName : 'Action',
          cellTemplate: '<div><a href="<%row.entity.edit_url%>" class="" title="<%row.entity.edit_text%>">Edit</a> | <a href="<%row.entity.delete%>" ng-click="grid.appScope.updateStatus(\'delete\'); $event.preventDefault();" title="<%row.entity.delete_text%>">Delete</a></div>',
          minWidth: 100,
          cellClass:_getInfo('updated_at','align'),
      }];
    
    </script>
<!-- <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/newsletterList.js"></script> -->

<div class="content" data-ng-controller="gridtableCtrl">
        <div class="header-title">
          <div class="pull-right btn-groups">
            <!-- <a class="btn" href="{{action('Admin\Menu\MenuController@createMenu')}}">@lang('menu.create_new_menu')</a> -->
          </div>
        </div>


        <div class="content-wrap">
	       	<div class="alert alert-success" id="msg"></div>
        <ul class="nav nav-tabs lang-nav-tabs" >
          <li @if($list_type=='ALL') class="active" @endif class="active">
            <a data-toggle="tab" href="#home">Active</a></li>
          @foreach($filterArrFinal as $data) 
          <li @if($list_type==$data['filter_name']) class="active" @endif >
            <a data-toggle="tab" href="#EditTab<?php echo $data['id'];?>" ng-click="getFilterData($data['filter_value'])">{{$data['filter_name']}}&nbsp;
            	<i class="glyphicon glyphicon-menu-down"></i></a>
            </li>
          @endforeach
          <li class="nopadding"><a data-toggle="tab" href="#createTab">Add New Tab&nbsp;<i class="glyphicon glyphicon-plus"></i></a></li>
        </ul>

        <div class="tab-content language-tab" >

          <div id="home" class="tab-pane fade in active">
            <div class="ng-cloak"  ng-cloak>
              <div class="">
                 @include('includes.gridtable')
              </div>
            </div>
          </div>
          <h3 class="mb-15">Create Filter Tab</h3>
          <div id="createTab" class="tab-pane fade">
           <div class="row" style="margin-bottom: 5px;">
            <div class="col-sm-2">
               <h4 style="font-weight: bold;">Filter Name<span style="font-color:#FF0000">*</span></h4>
           </div>
          <div class="row">
           <div class="col-sm-3">
              <input type="text" ng-model="FilterTab.tabTitle">
              </div>
          </div>
          </div>

          <div class="row mb-5" ng-show="Type.statusBtn">
          <div class="col-sm-2">
             <label ><h4 style="font-weight: bold;">Status</h4></label>
          </div>
          <div class="col-sm-3">
			<div class="[ form-group ]">

				<label class="check-wrap"><input type="checkbox" name="fancy-checkbox-success" id="fancy-checkbox-success" autocomplete="off" ng-model="type.status.enable"> <span class="chk-label"></span></label>
				<div class="[ btn-group ]">
					
					<label for="fancy-checkbox-success" class="[ btn btn-default active ]">Enabled</label>
			</div>
			</div>
			<div class="[ form-group ]">

					<label class="check-wrap">
						<input type="checkbox" name="fancy-checkbox-danger" id="fancy-checkbox-danger" ng-model="type.status.disabled" autocomplete="off"> <span class="chk-label"></span>
					</label>
				<div class="[ btn-group ]">
					<label for="fancy-checkbox-danger" class="[ btn btn-default active ]">Disabled</label>
			</div>
			</div>
         </div>
         <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('statusBtn')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
         </div>

          <div class="row mb-5" ng-show="Type.registersBtn">
          <div class="col-sm-2">
             <label ><h4 style="font-weight: bold;">Register</h4></label>
          </div>
          <div class="col-sm-3">
            	<div class="[ form-group ]">

<label class="check-wrap"><input type="checkbox"  name="fancy-checkbox-warning" id="fancy-checkbox-warning" autocomplete="off" ng-model="type.registersBtn.registred"> <span class="chk-label"></span></label>
				<div class="[ btn-group ]">
					<label for="fancy-checkbox-warning" class="[ btn btn-default active ]">Registred</label>
			</div>
			</div>
			<div class="[ form-group ]">

<label class="check-wrap"><input type="checkbox" name="fancy-checkbox-info" id="fancy-checkbox-info" ng-model="type.registersBtn.guess" autocomplete="off"> <span class="chk-label"></span></label>
				<div class="[ btn-group ]">
					<label for="fancy-checkbox-info" class="[ btn btn-default active ]">Guess</label>
			</div>
			</div>
         </div>
         <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('registersBtn')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
         </div>

        <div class="row mb-5" ng-show="Type.userGroupFlag">
          <div class="col-sm-2">
             <label ><h4 style="font-weight: bold;">User Group</h4></label>
          </div>
          <div class="col-sm-3">
            <select ng-model="FilterTab.userGroupType" multiple="multiple">
              <option value="">Please Choose</option>   
              <option value="userGroup">Guest</option>   
              <option value="Registred">Registred</option> 
            </select>
         </div>
         <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('userGroupFlag')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
         </div>

        
          <div class="row mb-5" ng-show="Type.filteremailText">
          <div class="col-sm-2" >
            <h4 style="font-weight: bold;">Enter Email Address<i class="strick">*</i></h4>
          </div>
          <div class="col-sm-3" >
           <input type="email" ng-model="FilterTab.filteremail" >
          </div>
           <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('filteremailText')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
          </div>

          
          <div class="row mb-5" ng-show="Type.grandTotal">
          <div class="col-sm-2" >
            <h4 style="font-weight: bold;">Grand Total<i class="strick">*</i></h4>
          </div>
          <div class="col-sm-3" >
           <input type="text" ng-model="FilterTab.grandTotalFrom" placeholder="Grand total from" >
          </div>
          <div class="col-sm-3" >
           <input type="text"  ng-model="FilterTab.grandTotalTo" placeholder="Grand total to" >
          </div>
               <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('grandTotal')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
          </div>

           <div class="row mb-5"  ng-show="Type.filterDateText">
              <div class="col-sm-2">
                <h4 style="font-weight: bold;">Choose Date<i class="strick">*</i></h4>
              </div>

              <div class="col-sm-3">
                <label class="datepicker">
                  <div class="form-group">
                      <div class='input-group date '>
                          <input type='text' class="form-control " id='datetimepicker1' name="dob"  ng-model="FilterTab.filterdobfrom" placeholder="Date of Birth From " />
                          <span class="input-group-addon">
                              <span class="glyphicon glyphicon-calendar"></span>
                          </span>
                      </div>
                  </div>
                </label>              
                
              </div>
              <div class="col-sm-3">
                <label class="datepicker">
                  <div class="form-group">
                      <div class='input-group date '>
                          <input type='text' class="form-control " id='datetimepicker2' name="dob"  ng-model="FilterTab.filterdobto" placeholder="Date of Birth To " />
                          <span class="input-group-addon">
                              <span class="glyphicon glyphicon-calendar"></span>
                          </span>
                      </div>
                  </div>
                  </label>
              </div>

               <div class="col-sm-1">
            <a href="javascript:void(0)" ng-click="hideItem('filterDateText')">
              <h4 style="font-weight: bold;">X</h4>
            </a>
          </div>
          </div>
           @foreach($fieldArr as $key=>$value)
          <div class='row' 
            style='margin-bottom:5px;display:none;' id="attr_{{$value['id']}}">
            <div class='col-sm-2' ><h4 style='font-weight: bold;''>Enter <?php echo $value['attribute_key']; ?>*</h4></div>
             <div class='col-sm-3' >
            <?php if($value['input_type']=='droupdown'){ ?>
            <select name="droupdown_<?php echo $value['id']; ?>" id="droupdown_<?php echo $value['id']; ?>" class="attrDynamic">
            	<?php 
            	// echo "<pre>";  	print_r($value['values']);die;

            	if(!empty($value['values'])){ 
            			foreach($value['values'] as $valueoptions){
            			//print_r($valueoptions); die;
            		?>
           			<option value="<?php echo $valueoptions['id']; ?>"><?php echo ucwords(strtolower($valueoptions['value'])); ?></option>
            	<?php }} ?>
            </select>
            <?php }elseif($value['input_type']=='image'){ ?>
            	<input type="file" name="image_<?php echo $value['id']; ?>" id="image_<?php echo $value['id']; ?>" class="attrDynamic_<?php echo $value['id']; ?>">
        	<?php }elseif($value['input_type']=='datepicker'){ ?>
        	 <input type='text' class="form-control dateinputBox attrDynamic" id='datetimepicker_<?php echo $value['id']; ?>' name="datetimepicker_<?php echo $value['id']; ?>"  placeholder="Please Choose Date" />
        	<?php }elseif($value['input_type']=='radio'){ ?>
        	<label>
        		<input type='radio' class="form-control dateinputBox " 
        		id='radio_<?php echo $value['id']; ?>' 
        		name="radio_<?php echo $value['id']; ?>" class="attrDynamic_<?php echo $value['id']; ?>"/>&nbsp;<?php echo $value['value']; ?></label>
        		

        	<?php } else{ ?>
	           	<input type='text' id="input_<?php echo $value['id']; ?>" class="attrDynamic">
           	<?php } ?>
            </div>
            @if(isset($value->id))
              <div class='col-sm-1'><a href='javascript:void(0)' ng-click='hideItem({{$value->id}})'>
              <h4 style='font-weight: bold;''>X</h4></a>
              </div>
            @endif

          </div>
          @endforeach

          <div class="row mb-5">
          <div class="col-sm-2">
             <label ><h4 style="font-weight: bold;">List Type</h4></label>
          </div>

          <div class="col-sm-3">
            <select ng-model="FilterTab.listType" ng-change="getListTypeFileds(this.value)">
              <option value="status">Status</option>   
              <option value="register">Register</option>   
              <option value="userGroup">Customer Group</option>   
              <option value="email">Email</option>   
              <option value="grandTotal">Grand Total</option>   
              <option value="DOB">Date Subscribe</option>  
              @foreach($attribute_dtl as $key=>$value)
                <option value="{{$value->id}}">{{ isset($value->newsletterAttributeDesc->name)?$value->newsletterAttributeDesc->name:'' }}</option>
              @endforeach
           </select>
         </div>
         </div> 

          <div class="row form-row">
            <div class="col-sm-4 ">
               <label>
               	<button name="newtab" ng-click="createFilterTab('{{$lang_code}}')" class="btn btn-success">Create</button>
               		<button name="newtab" class="btn btn-success">Filter Result</button>
               </label>
            </div>
          </div>
		 </div>


      <!--Update Filter Here Start Now-->
      @include('admin/newsletter/editFilterTab')
      <!--Update Filter Tab Here ENds Now-->
    </div>
    </div>
        
</div>
@stop
@section('footer_scripts') 
@include('includes.gridtablejsdeps')
<script type="text/javascript">
  var pageName='subscriberlisting';
</script>
<!-- <script src="{{ Config('constants.angular_url') }}sabinaApp/controller/newsletterListCtrl.js"></script> -->
<script src="{{ Config('constants.angular_url') }}sabinaApp/controller/gridTableCtrl.js"></script>
<script src="{{ Config('constants.angular_url') }}libs/datetimepicker.js"></script>
<script>
    jQuery(document).ready(function(e){
        jQuery('#datetimepicker1').datepicker();
        jQuery('.dateinputBox').datepicker();
        jQuery('#datetimepicker2').datepicker();
        jQuery('#info-content-tab a').click(function(e){
          jQuery('#info-content').toggle(); 
        
        })
    })
</script>

@stop