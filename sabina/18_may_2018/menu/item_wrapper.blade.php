<div class="drop-menu-box">
<div class="menu-edit-box">
<div class="list-item item-wrap">
    <i class="icon fa fa-link"></i>
    <%node.title%> <%  $index %>
    <div class="pull-right irem-wrap-icon" >
        Item Wrapper
        <a href="javascript:void(0)" data-nodrag  ng-click="openItem(node.menuTypeId, $index)"><i class="glyphicon glyphicon-pencil"></i></a>
        <i class="glyphicon glyphicon-menu-right"></i>
        <i class="icon-remove" data-nodrag ng-click="remove(this)"></i>
    </div>
</div>
<div class="menu-edit-inner" data-nodrag  style="display:none" id="item_<% node.menuTypeId %>_<%  $index %>">                                                               
    <ul class="nav nav-tabs lang-nav-tabs">
        <li class="active"><a data-toggle="tab" href="#lang-thai"><img src="{{ asset('images/flag/thai-lang.png') }}" alt=""></a></li>
        <li><a data-toggle="tab" href="#lang-usa"><img src="{{ asset('images/flag/usa-lang.png') }}" alt=""></a></li>
        <li><a data-toggle="tab" href="#lang-china"><img src="{{ asset('images/flag/china-lang.png') }} " alt=""></a></li>
        <li><a data-toggle="tab" href="#lang-korea"><img src="{{ asset('images/flag/korea-lang.png') }}" alt=""></a></li>
        
    </ul>
    <div class="tab-content language-tab">
        <div id="lang-thai" class="tab-pane fade in active">
            <div class="form-row">
                <label>Menu item title </label>
                <input type="text">
            </div>
            <div class="form-row">
                <label>Menu item URL </label>
                <div class="radio-group mt-5 mb-5">
                    <label class="radio-wrap"><input name="url" type="radio" checked="checked"> <span class="radio-label ">Link</span></label>
                    <label class="radio-wrap"><input name="url" type="radio"> <span class="radio-label ">No Link</span></label>
                </div>
                <input type="text">
            </div>
            <div class="form-row">
                <label>Custom CSS Class </label>
                <input type="text">
            </div>
        </div>
        <div id="lang-china" class="form-row tab-pane fade">
            <label>Warehouse Name <i class="red">*</i></label>
            <input placeholder="maisondulogiciel" type="text">
        </div>
        <div id="lang-korea" class="form-row tab-pane fade">
            <label>Warehouse Name <i class="red">*</i></label>
            <input placeholder="maisondulogiciel" type="text">
        </div>
        <div id="lang-usa" class="form-row tab-pane fade">
            <label>Warehouse Name <i class="red">*</i></label>
            <input placeholder="maisondulogiciel" type="text">
        </div>
    </div>   

    <div class="menu-edit-icon-wrap" id="" style="display:block;">
        <h3>Menu Icon</h3>                      
        <div class="lib-icon-wrap">
            <button class="secondary"> Icon Library</button>
            <div class="list-icon">
                <span><i class="fa fa-camera"></i> Icon Item use <i class="icon-remove"></i></span>
            </div>
        </div>
    </div>
</div>
</div>
</div>



