<ul class="cat-tree ">
     <li class="item level1 first" ng-repeat="node in list.nodes" ng-if="node.menuType==3">
      <a  href="en/<%node.pageLink%>" ng-if="node.default_lang_id==1" ng-class="node.atrcustomcss"><%node.enTitle.input%></a>
      <a  href="th/<%node.pageLink%>" ng-if="node.default_lang_id==2" ng-class="node.atrcustomcss"><%node.thTitle.input%></a>
      <a  href="ch/<%node.pageLink%>" ng-if="node.default_lang_id==3" ng-class="node.atrcustomcss"><%node.chTitle.input%></a>
      <a  href="jp/<%node.pageLink%>" ng-if="node.default_lang_id==4" ng-class="node.atrcustomcss"><%node.jpTitle.input%></a>
    </li>
    <li class="item level1 first" ng-repeat="node in list.nodes" ng-if="node.menuType==5">
  		<a href="en/<%node.productObj.front_url%>" ng-if="node.default_lang_id==1" ng-class="node.atrcustomcss">
  			<%node.productObj.input%>
  		</a>
    	<a href="th/<%node.productObj.front_url%>" ng-if="node.default_lang_id==2" ng-class="node.atrcustomcss">
    		<%node.thTitle.input%>
   		</a>
      	<a href="ch/<%node.productObj.front_url%>" ng-if="node.default_lang_id==3" ng-class="node.atrcustomcss">
      		<%node.chTitle.input%>
      	</a>
      	<a href="jp/<%node.productObj.front_url%>" ng-if="node.default_lang_id==4" ng-class="node.atrcustomcss">
      		<%node.jpTitle.input%>
     	</a>
    </li>
</ul>