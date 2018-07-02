<div class="modal fade" id="myImageModal" role="dialog">
    <div class="modal-dialog" style="width: 95%">

    <!-- Modal content Start Here-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Image Library</h4>
          <input value="hiddenImageNodeId" id="hiddenImageNodeId" type="text">
        </div>
        <div class="modal-body">
          <div style="max-height: 500px;overflow: auto;">
             <div class="col-sm-12">
                
                        <div class="row">
                          <div class="col-sm-12">
                        <div style="width: 100%; margin-bottom: 5px;">
                          <h3>
                            <a href="javascript:void(0)" ng-click="getImageList('images')">
                              <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;Images(<%imageListCount%>)
                            </a>
                          </h3>
                          <div style="display: none;" id="images">
                            
                            <div ng-repeat="Images in imageList" style="width: 120px; float: left;list-style: none; border-radius: 1px; border: solid 1px #CCC; max-height: 100px; margin:1px;">
                              <a href="javascript:void(0)" ng-click="setImageForContent(Images)">
                                <img src="<%Images%>" width="100px" height="100px" style="position: relative">
                              </a>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>

<div class="row">
                          <div class="col-sm-12">
                        <div style="width: 100%">
                          <h3>
                            <a href="javascript:void(0)" ng-click="getImageList('product')">
                              <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;Product Images(<%productsimageListCount%>)
                            </a>
                            </h3>
                          <div style="display: none; position: relative;" id="products">
                            <div ng-repeat="Images in productsimageList" style="width: 120px; float: left;list-style: none; border-radius: 1px; border: solid 1px #CCC; max-height: 100px; margin:1px;">
                              <a href="javascript:void(0)" ng-click="setImageForContent(Images)">
                                <img src="<%Images%>" width="100px" height="100px" style="position: relative">
                              </a>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>


<div class="row">
                          <div class="col-sm-12">
                        <div style="width: 100%">
                          <h3 style="padding: 2px;  ">
                            <a href="javascript:void(0)" ng-click="getImageList('staticpages')">
                          <i class="glyphicon glyphicon-folder-open"></i>&nbsp;&nbsp;Pages Images(<%pagesimageListCount%>)</a>
                        </h3>
                          <div style="display: none;position: relative;" id="pages">

                            <div ng-repeat="Images in pagesimageList" style="width: 120px; float: left;list-style: none; border-radius: 1px; border: solid 1px #CCC; max-height: 100px; margin:1px;">
                              <a href="javascript:void(0)" ng-click="setImageForContent(Images)">
                              <img src="<%Images%>" width="100px" height="100px" style="position: relative">
                            </a>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>
             
                </div>
            
          </div>
        </div>
       
      </div>
<!-- Modal content Start Here-->
 </div>
</div>