<!--Content Type Template Start Here-->
<div class="col-sm-12" ng-if="nodes.menuTypeId==2"  ng-if="nodes.atrBackgroundImage">

<div class="col-sm-12" ng-if="nodes.atrLayoutType==1" ng-bind-html="nodes.atrlayout.Coloum_1.body_1 | to_trusted"></div>



<!--Two coloum start here -->
<div class="col-sm-3" ng-if="nodes.atrLayoutType==2" ng-bind-html="nodes.atrlayout.Coloum_2.body_1 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==2" ng-bind-html="nodes.atrlayout.Coloum_2.body_2 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==2">
	<img ng-if="nodes.atrBackgroundImage!='images/img-lib.jpg'" src="<%nodes.atrBackgroundImage%>">
</div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==2">&nbsp;</div>
<!--Two coloum Ends Here-->


<!--Three coloum start here -->
<div class="col-sm-3" ng-if="nodes.atrLayoutType==3" ng-bind-html="nodes.atrlayout.Coloum_3.body_1 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==3" ng-bind-html="nodes.atrlayout.Coloum_3.body_2 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==3" ng-bind-html="nodes.atrlayout.Coloum_3.body_3 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==3" >
		<img src="<%nodes.atrBackgroundImage%>" ng-if="nodes.atrBackgroundImage!='images/img-lib.jpg'">
</div>
<!--Three coloum Ends Here-->


<!--Four coloum start here -->
<div class="col-sm-3" ng-if="nodes.atrLayoutType==4" ng-bind-html="nodes.atrlayout.Coloum_4.body_1 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==4" ng-bind-html="nodes.atrlayout.Coloum_4.body_2 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==4" ng-bind-html="nodes.atrlayout.Coloum_4.body_3 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==4" ng-bind-html="nodes.atrlayout.Coloum_4.body_4 | to_trusted"></div>

<div class="col-sm-3" ng-if="nodes.atrLayoutType==4">
	<img src="<%nodes.atrBackgroundImage%>" ng-if="nodes.atrBackgroundImage!='images/img-lib.jpg'">
</div>
<!--Four coloum Ends Here-->
</div>
<!--Content Type Template Ends Here-->


