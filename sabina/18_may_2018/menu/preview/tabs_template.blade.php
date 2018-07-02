<div ng-class="(node.atrLayoutType==1)?'row vertical-tab':''">
<div ng-class="(node.atrLayoutType==1)?'col-sm-2':''">
<ul class="nav nav-tabs lang-nav-tabs">
    <li ng-class="($index==0)?'active':''" ng-repeat="tabNode in node.nodes">
        <a data-toggle="tab" href="#menutab<%tabNode.id%>" data-hover="tab" ng-if="tabNode.default_lang_id==1" ng-class="tabNode.atrcustomcss"><%tabNode.enTitle.input%></a>
        <a data-toggle="tab" href="#menutab<%tabNode.id%>" data-hover="tab" ng-if="tabNode.default_lang_id==2"><%tabNode.thTitle.input%></a>
        <a data-toggle="tab" href="#menutab<%tabNode.id%>" data-hover="tab" ng-if="tabNode.default_lang_id==3"><%tabNode.chTitle.input%></a>
        <a data-toggle="tab" href="#menutab<%tabNode.id%>" data-hover="tab" ng-if="tabNode.default_lang_id==4" ><%tabNode.jpTitle.input%></a>
    </li>
</ul>
</div>
<div ng-class="(node.atrLayoutType==1)?'col-sm-10':''">
<div class="tab-content language-tab" ng-class="node.atrCustomCss"  ng-style="_getCss(node.atrCustomCssInline)">
    <div id="menutab<%content.id%>" ng-class="($index==0)?'form-row tab-pane fade in active active':'form-row tab-pane fade'" ng-repeat="content in node.nodes">
    <!-- <pre><%content | json%> -->
        <div class="row">
            <!-- {{-- <div class="col-sm-12" ng-repeat="content in node.nodes"> --}} -->
            <div class="col-sm-12" ng-if="content.atrLayoutType==1" ng-bind-html="content.atrlayout.Coloum_1.body_1 | to_trusted"></div>

            <!--Two coloum start here -->
            <div class="col-sm-6" ng-if="content.atrLayoutType==2" ng-bind-html="content.atrlayout.Coloum_2.body_1 | to_trusted"></div>

            <div class="col-sm-6" ng-if="content.atrLayoutType==2" ng-bind-html="content.atrlayout.Coloum_2.body_2 | to_trusted"></div>
            <!--Two coloum Ends Here-->
            <!--Three coloum start here -->
            <div class="col-sm-4" ng-if="content.atrLayoutType==3" ng-bind-html="content.atrlayout.Coloum_3.body_1 | to_trusted"></div>

            <div class="col-sm-4" ng-if="content.atrLayoutType==3" ng-bind-html="content.atrlayout.Coloum_3.body_2 | to_trusted"></div>

            <div class="col-sm-4" ng-if="content.atrLayoutType==3" ng-bind-html="content.atrlayout.Coloum_3.body_3 | to_trusted"></div>
            <!--Three coloum Ends Here-->


            <!--Four coloum start here -->
            <div class="col-sm-3" ng-if="content.atrLayoutType==4" ng-bind-html="content.atrlayout.Coloum_4.body_1 | to_trusted"></div>

            <div class="col-sm-3" ng-if="content.atrLayoutType==4" ng-bind-html="content.atrlayout.Coloum_4.body_2 | to_trusted"></div>

            <div class="col-sm-3" ng-if="content.atrLayoutType==4" ng-bind-html="content.atrlayout.Coloum_4.body_3 | to_trusted"></div>

            <div class="col-sm-3" ng-if="content.atrLayoutType==4" ng-bind-html="content.atrlayout.Coloum_4.body_4 | to_trusted"></div>
            <!--Four coloum Ends Here-->

            <!-- {{-- </div> --}} -->
            
        </div>
    </div>
</div>
</div>
</div>
