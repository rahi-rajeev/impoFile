<div class="overlay" id="overlayLoader" style="display: none">
  <div class="loading-content loader1">
    <div class="html5-ui-img">
       <div class="loader loader-medium"></div>
    </div>
    <div class="load-filepath trn">
       Loading Just a few seconds.....
    </div>
  </div>
</div>
<span class="pull-right icon-remove" data-dismiss="modal" data-ng-click="pMCtrl.closeModal()"> </span>
<section class="content-wrapper product-section" id="ModalresolveCtrl">
  <div class="productOpc" data-ng-hide="!styleopacity"></div>
  <!-- Breadcum section start here -->
  <section productContainer="product" data-ng-if="rvCtrl.include_product_blog=='product' ">
    @include('productDisplayInclude')
  </section>
  <section blogContainer="blog-section" data-ng-if="rvCtrl.include_product_blog=='blog' "> 
    @include('includes/blogIncludePopup')
  </section>
 <div class="arrow-nav">
      <span ui-sref="item({type:rvCtrl.prevPrdType,id: rvCtrl.prevId})" data-ng-if="rvCtrl.prevId" class="prev glyphicon glyphicon-menu-left" data-ng-click="rvCtrl.getPrevPrdDetail()"></span>
      <span ui-sref="item({type:rvCtrl.nextPrdType,id: rvCtrl.nextId})" data-ng-if="rvCtrl.nextId" class="next glyphicon glyphicon-menu-right" data-ng-click="rvCtrl.getNextPrdDetail()" ></span>
  </div>
</section>
<div id="popupdiv" class="modal modal-popupdiv fade in" role="dialog"></div>
<script type="text/javascript">
jQuery(document).ready(function(){
  //zoomSlideEnable();
  jQuery("#gallery_01 ul.gallery-thumb").slick({
    dots : false,slidesToShow : 3,slidesToScroll : 1,autoplay : false,
    infinite : false,variableWidth : true,centerMode : false,
    adaptiveHeight : true
  });
});
(function(Modal) {
   Modal.prototype.hideModal = function() {
    var that = this;
    this.$element.hide();
    this.backdrop(function() {
       if (that.modalOpen) {
       that.$body.removeClass('modal-open');
       }
       that.resetScrollbar();
       that.$element.trigger('hidden.bs.modal');
       //zoomSlideEnable();
    });
  };
})($.fn.modal.Constructor);

</script>