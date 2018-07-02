@extends(session('default_theme').'.layouts.app')
@section('header_style')
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','slick.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','magicscroll.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','magiczoomplus.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','sweetalert2.min.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','toastr.css') }}" />
<script type="text/javascript">
 /***for related product****/ 
 /******Comman variable for product detail page *******/
  var showProductPopup = "";
  var productPopupUrl = "";
  var checkProductBeforeCart = "{{action('ProductDetailController@checkProductBeforeCart')}}";
  var addProductToCart = "{{action('ProductDetailController@addProductToCart')}}";
  var getVarientProduct = "{{action('ProductDetailController@getVarientProduct')}}";
  var productPriceByOption = "{{action('ProductDetailController@productPriceByOption')}}";
  var insertProductReview = "";
  var deleteProductReview = "";
  var locationObj = document.location;
  var stateUrl =  locationObj.pathname;
  var curCode = "{{session('default_currency_code')}}";
  var suggestionUrl = "";
  var uploadAction = "{{ action('AjaxController@uploadBase64ImageAjax') }}";
  var upload_path = "{{Config::get('constants.cart_option_path')}}";
  var page = "marketplace";
  var shopproductlisturl = "";
  var listingPrd = "";
 /***end related oroduct***********/
  var getAllDataFromServerOnce = true;
  var upload_url = "{{Config::get('constants.cart_option_url')}}";
  var productData = {!! $dataArray !!};
  var cartUrl = "{{ action('Checkout\CartController@index') }}";
  //var varientInfo = productData.varientInfo;
  var prdBlogUrl = "{{ Config::get('constants.product_url')}}";
  var curCode = "{{session('default_currency_code')}}";
  var colorPath = "{{Config::get('constants.color_url')}}";
  var btnloaderpath ='http://192.168.1.200:8000/loader/loading_small.gif';
  //add remove wishlist url
  var addIntoWishlist = "{{ action('ProductsController@addIntoWishlist') }}";
  var removeFromWishlist = "{{ action('ProductsController@removeFromWishlist') }}";


 // retrun false;
</script>
<script type="application/ld+json"> {!!$richTextSnippetjson!!} </script> 
@endsection
@section('content')
<!-- Content section start -->
    <div class="productDisplay ng-cloak"  data-ng-app="productDetailApp" data-ng-controller="productDetailCtrl as rvCtrl" ng-cloak>
        <!--Overlay loader show on save or save and continue click -->
        <div class="loader-wrapper" ng-if="rvCtrl.loading.addTocart_and_bynow">
          <span class="loader">
              <img ng-src="<%rvCtrl.loading.btnloaderpath%>" alt="Loader" width="30" height="30"> 
              <div>Please wait...</div>
          </span>
        </div>

        <div class="product-view row clearfix">
            <div class="product-media col-sm-6 app-figure"  id="zoom-fig">
                <div class="zoom-gallery">
                    <div class="selectors vertical-thumb MagicScroll" id="MagicScrollDiv"> 
                                        
                    </div>              
                    <div class="product-main-img">
                        <div data-slide-id="zoom" class="zoom-gallery-slide active" id="imgZoomPreview">
                           
                        </div>
                        <div data-slide-id="video-1" class="zoom-gallery-slide video-slide" id="vidZoomPreview">
                          
                           <iframe width="560" height="515" src="" id="vidIframe" frameborder="0" allowfullscreen></iframe>                    
                        </div>
                    </div>
                </div>
                <div class="image" ng-if="rvCtrl.productImg.length < 1">
                  <img src="{{ GeneralFunctions::getPlaceholderImage('PRODUCT_IMAGE_405') }}">
                </div>
            </div>
            <div class="product-info-main col-sm-6" >
                <div class="product-info-row" ng-repeat ="prdDetails in rvCtrl.productInfo track by $index">
                    <div class="form-row">
                       @if(Auth::check())  
                        <span class="pull-right addto-wish" ng-click="rvCtrl.addIntoWishlist($event, prdDetails.id, $index)" ng-if="prdDetails.wishlist != true">
                            <i class="icon-heart" ng-class="{'active' : prdDetails.wishlist==true}"></i> 
                            @lang('product.add_to_wishlist')
                        </span>
                        <span class="pull-right addto-wish" ng-click="rvCtrl.removeFromWishlist($event, prdDetails.id, $index)" ng-if="prdDetails.wishlist == true">
                            <i class="icon-heart" ng-class="{'active' : prdDetails.wishlist==true}"></i> 
                            @lang('product.add_to_wishlist')
                        </span>
                        @else
                          <a href="#" data-toggle="modal" data-target="#loginModal">
                            <span class="pull-right addto-wish">
                              <i class="icon-heart"></i> 
                              @lang('product.add_to_wishlist')
                            </span>
                          </a>
                        @endif

                        <h1 class="title"><a href="<% prdDetails.productUrl %>"><% prdDetails.prd_name %></a> </h1>
                        <span class="sku"><% prdDetails.sku %></span>
                        <div class="price-wrap">
                            <span class="old-price"  data-ng-if="prdDetails.isDisc"><%prdDetails.initial_price%>  {{session('default_currency_code')}}</span>

                            <span ng-class="{'new-price':prdDetails.isDisc}" ><%prdDetails.productPrice%> {{session('default_currency_code')}}</span>

                            <span class="discount-price"  data-ng-if="prdDetails.isDisc"><%prdDetails.discountPer%>%</span>
                        </div>
                    </div>             
                    <div class="row">
                       <div class="pdetail-row select-row" data-ng-if="rvCtrl.attrRes[prdDetails.mainProductId].length > 0">
                            <h3 class="col-sm-12">@lang('checkout.please_choose_before_add_to_shopping_bag')</h3>
                                <div class="size col-sm-6" data-ng-repeat="atr in rvCtrl.attrRes[prdDetails.mainProductId] track by $index">
                                    <label class=""><%atr.attributedesc.name%> <span class="star-top">*</span></label>
                                       <span class="custom-select" data-ng-if="atr.attribute.attribute_type_value == 'plain_text'">
                                          <select class="select attrVal" id="attributeValueId[]" data-ng-model="rvCtrl.selAttrVal[prdDetails.mainProductId][$index]" data-ng-change="rvCtrl.changeContent($index,atr.attributedesc.attr_id,prdDetails.mainProductId,prdDetails.id,$parent.$parent.$index)" ng-options="attrname.value for attrname in rvCtrl.attrValRes[prdDetails.mainProductId][atr.attribute_id] track by attrname.valId" required>
                                          <option value="" disabled="disabled">@lang('common.select')</option>
                                        </select>
                                    </span>
                                    <span class="custom-select block" data-ng-if="atr.attribute.attribute_type_value == 'text_color_image'">
                                       <div class="pdetail-row color-choose"> 
                                            <ul id="colorVariant">
                                                <li ng-repeat="attrname in rvCtrl.attrValRes[prdDetails.mainProductId][atr.attribute_id] track by attrname.valId" uib-popover-html="rvCtrl.prdTooltip" popover-trigger="'mouseenter'" ng-mouseover="rvCtrl.getTooltipContent(attrname.color_image,attrname)">
                                                    <span class="select-color">
                                                    <input type="radio" name="color" id="attributeValueId[]" ng-model="rvCtrl.selAttrVal[prdDetails.mainProductId][$parent.$index].valId" ng-change="rvCtrl.changeContent($parent.$index,atr.attributedesc.attr_id,prdDetails.mainProductId,prdDetails.id,$parent.$parent.$parent.$index)" value="<%attrname.valId%>"  class="multiSelectRadioBtn">
                                                        <span class="color-wrapper" ng-style="rvCtrl.selAttrVal[1] && { 'background' : 'red' }">
                                                            <span class="product-img" ng-if="attrname.color_image !=''">
                                                             <img ng-src="<%rvCtrl.colorPath + attrname.color_image%>" width="" height="30">
                                                            </span>

                                                             <span class="product-img" data-ng-if="attrname.color_image =='' && attrname.color_code !=''">
                                                             <div class="" style="background: <%attrname.color_code%>; width:30px; display: inline-block; height: 30px;"></div>
                                                            </span>
                                                            <span class="product-img" data-ng-if="attrname.color_image =='' && attrname.color_code =='' && attrname.value !=''">
                                                             <div class="" style=" display: inline-block; height: 30px;"><%attrname.value%></div>
                                                            </span>
                                                          <!-- <span class="color-name"><%attrname.value%> </span> -->
                                                        </span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </span> 
                            </div>
                        </div>
                        <div class="pdetail-row pdetail-choseinfo" data-ng-if="rvCtrl.optionInfo[prdDetails.mainProductId].length > 0">
                            <div class="" ng-repeat="optionRes in rvCtrl.optionInfo[prdDetails.mainProductId] track by $index">
                                <div class="col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='text'">
                                       <label><%optionRes.option_attr_desc.name %> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   ) </label>
                                       <input type="text" class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id][prdDetails.mainProductId]" ng-blur="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$parent.$index)">
                                </div>
                                <div class="col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='textarea'">
                                       <label><%optionRes.option_attr_desc.name%> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %> ) </label>
                                        <textarea class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id][prdDetails.mainProductId]" ng-blur="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$parent.$index)"></textarea>
                                  </div>

                                <div class="col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='browse_file'">

                                    <div class="custom-upload upload-btn-wrapper" id="image_upload" uploader="uploader">
                                        <span class="upload-btn-wrapper" id="image_upload">
                                            <div class="file-upload1">
                                              <input disabled="disabled" value="Attach file" class="form-control">
                                              (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   )
                                              <button type="file" class="btn-md btn"  optionId="<%optionRes.id%>"  id="fileUpdBtn">@lang('product.browse')</button>
                                              {{-- <droplet-upload-single ng-model="rvCtrl.file_interface" product-id="<%prdDetails.id%>" product-index="<%$parent.$parent.$index%>"></droplet-upload-single> --}}
                                              <droplet-upload-single ng-model="rvCtrl.file_interface" product-id="<%prdDetails.id%>" product-index="<%$parent.$parent.$index%>" option-id="<%optionRes.id%>" main-prd-id="<%prdDetails.mainProductId%>"></droplet-upload-single>
                                            </div>
                                            <span id="image_upload_status"></span>
                                        </span>
                                    </div> 
                                    <div class="file-img" id="image_display">
                                        <droplet ng-model="rvCtrl.file_interface">
                                            <div ng-repeat="model in rvCtrl.file_interface.getFiles(rvCtrl.file_interface.FILE_TYPES.VALID)"> 
                                                <droplet-preview ng-model="model"></droplet-preview>
                                                <%model.file.name%>
                                                <section class="filename" ng-show="!model.isImage()"><%model.file.name%></section>
                                            </div>
                                        </droplet>
                                    </div>
                                          
                                </div>

                                <div class="col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='multiselect'">
                                    <label><%optionRes.option_attr_desc.name %> </label>
                                    <div class="check-wrap">
                                        <label ng-repeat="optionValueRes in optionRes.option_attr_value_detail"><input type="checkbox" class="optionValuefield" value="<%optionValueRes.id%>" ng-model="rvCtrl.optionValueCheck[optionValueRes.id][prdDetails.mainProductId]" ng-change="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$parent.$parent.$index)"> <span class="chk-label">
                                        <%rvCtrl.optnameArr[optionValueRes.attribute_value_id] %>
                                        (<%optionValueRes.price%> <%(optionValueRes.price_type==2)? '%' : rvCtrl.curCode %> ) </span></label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button type="button" class="btn disable-button" >Sold Out</button>
                        <div class="col-sm-6">
                            <label>@lang('product.qty')</label>
                            <span class="spiner" ng-class="{'disable-button' : prdDetails.totQty == 0 || prdDetails.totQty == ''}">
                                <span class="decrease icon-minus"  ng-click="rvCtrl.incDcrQuntity($event,prdDetails.totQty,'down',prdDetails.id,$index)"></span>
                                <input class="spinNum input-text qty" max="<% prdDetails.totQty %>" min="1"  ng-model="rvCtrl.totalQtyVal[$index]" ng-change="rvCtrl.getPriceByOption($event,'tqchange',prdDetails.id,$index)" value="1" type="number" id="quantity" name="quantity" ng-pattern="/^\d+$/"> 
                                <span class="increase icon-plus" ng-click="rvCtrl.incDcrQuntity($event,prdDetails.totQty,'up',prdDetails.id,$index)">  </span>
                            </span>
                        </div>
                    </div>
                  
                </div>
                <div class="prod-share">
                    {{-- <label>Share:</label>
                    <div class="social">                        
                        <ul class="product-social">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i class="fa fa-commenting-o"></i></a></li>
                            <li><a href="#"><i class="fa fa-envelope-o" ></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter" ></i></a></li>
                            <li><a href="#"><i class="fa fa-whatsapp"></i></a></li>
                        </ul>
                    </div> --}}
                    <div class="pull-right"> 
                      <a href="javascript:void(0)" class="btn"  id="addToCart" ng-click="rvCtrl.addToCartHandler($event,'')" ng-disabled="rvCtrl.loading.disableBtn">
                        @lang('product.add_to_cart')                         
                      </a>
                      <button type="button" id="buynow-btn" class="btn" ng-click="rvCtrl.addToCartHandler($event,'buynow')" ng-disabled="rvCtrl.loading.disableBtn">  @lang('product.buy_now')
                      </button>
                      <button type="button" class="btn disable-button" >Sold Out</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-desc clearfix">                           
            <ul class="nav nav-tabs lang-nav-tabs">
                <li class="active"><a data-toggle="tab" href="#product-desc">@lang('product.details')</a></li>
                <li class="" style="display: none;" data-ng-if="rvCtrl.spcfAttr.length > 0"><a data-toggle="tab" href="#product-spec">@lang('product.specification')</a></li>
            </ul>
            <div class="tab-content language-tab">
                <div id="product-desc" class="tab-pane form-row fade in active" ng-bind-html="rvCtrl.oneProductInfo.prd_desc | unsafe">
                    <%rvCtrl.oneProductInfo.prd_desc%>  
                </div>
                <div  style="display: none;" id="product-spec" class="tab-pane form-row fade in active" ng-repeat="specification in rvCtrl.spcfAttr track by $index">
                  <%specification.attributedesc.name%>
                      <!--  <><%specification.attribute.front_input%> -->:

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='select' || specification.attribute.front_input =='multiselect'">
                  <label ng-repeat="specificationVal in rvCtrl.spcfAttrVal[specification.attribute_id] ">
                  <%specificationVal['value']%><%$last ? '' : ', '%> </label> 
                  </span>

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='browse_file'">
                      <div ng-repeat="specificationVal in rvCtrl.spcfAttrVal[specification.attribute_id] "> <a href="<%specificationVal['path']%> " class="skyblue" target="_blank"><%specificationVal['value']%> </a>  </div> 
                  </span>

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='text' || specification.attribute.front_input =='textarea' || specification.attribute.front_input =='date_picker'">
                      <label"> <%rvCtrl.spcfAttrVal[specification.attribute_id]['value']%> </label> 
                  </span>

                </div>
            </div>            
        </div>
        <div class="product-desc clearfix"  data-ng-if="rvCtrl.spcfAttr.length > 0">                           
            <ul class="nav nav-tabs lang-nav-tabs">
                <li class="active"><a data-toggle="tab" href="#product-desc">@lang('product.specification')</a></li>
            </ul>
            <div class="tab-content language-tab">
                <div ng-repeat="specification in rvCtrl.spcfAttr track by $index">
                  <%specification.attributedesc.name%>
                      <!--  <><%specification.attribute.front_input%> -->:

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='select' || specification.attribute.front_input =='multiselect'">
                  <label ng-repeat="specificationVal in rvCtrl.spcfAttrVal[specification.attribute_id] ">
                  <%specificationVal['value']%><%$last ? '' : ', '%> </label> 
                  </span>

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='browse_file'">
                      <div ng-repeat="specificationVal in rvCtrl.spcfAttrVal[specification.attribute_id] "> <a href="<%specificationVal['path']%> " class="skyblue" target="_blank"><%specificationVal['value']%> </a>  </div> 
                  </span>

                  <span class="custom-select" data-ng-if="specification.attribute.front_input =='text' || specification.attribute.front_input =='textarea' || specification.attribute.front_input =='date_picker'">
                      <label"> <%rvCtrl.spcfAttrVal[specification.attribute_id]['value']%> </label> 
                  </span>

                </div>
            </div>            
        </div>
        <!-- Recommend Product  -->
       
        <div class="recommend-product" style="display: none;">
            <h2 class="title">You Might Also Like </h2>
            <ul class="recomend-slider">
                <li>
                    <a href="#"><img src="images/product/product-slide1.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product3.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product5.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product4.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product-slide1.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product2.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product7.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#"><img src="images/product/product3.jpg" height="285" alt=""></a>
                    <div class="product-info">
                        <h2 class="product-name">MODERN V</h2>
                        <span class="sku">Sku name</span>
                        <div class="price-wrap">
                            <span class="old-price">250.00 THB</span>
                            <span class="new-price">250.00 THB</span>
                            <span class="discount-price">36%</span>
                        </div>
                    </div>
                </li>                  
            </ul>
        </div>

        <div id="addToCartdiv" class="modal modal-Cartdiv modal-address in" role="dialog">
            <div class="modal-dialog model-md">
                <!-- Modal content-->
                <div class="modal-content txt-center">
                    <div class="modal-header">
                      <h3 class="primary-color"><% rvCtrl.productInfo.prd_name %> <span>@lang('checkout.added_successfully').</span></h3>
                    </div>
                    <div class="modal-body">
                        <div class="mt-10">
                          <div class="mt-10"><button class="btn" class="close" data-dismiss="modal" aria-label="Close">@lang('checkout.continue_shopping')</button></div>
                          <div class="mt-10 or">@lang('checkout.or')</div>
                          <div class="mt-10"><a class="btn" href="{{ action('Checkout\CartController@index') }}" target="_self">@lang('checkout.view_cart_checkout')</a>
                              
                          </div>
                        </div>
                  </div>
                </div>
            </div>        
        </div>
    </div>
<!-- Content end -->  
@endsection
@section('footer_scripts')
    @include('sabina.includes.prdDetailRouteDependency')
    <script type="text/javascript" src="{{ Config('constants.angular_url') }}sabinaApp/services/service.js"></script>
    <script type="text/javascript" src="{{ Config('constants.angular_url') }}sabinaApp/model/productDetailApp.js"></script>
    <script type="text/javascript" src="{{ Config('constants.angular_url') }}sabinaApp/controller/frontend/productDetailCtrl.js"></script>
    <script>
      (function(){
          MagicScrollOptions = {
                items:3,
                step: 1,
                orientation: "vertical",
                draggable: true,
                height: 400,
          };
          MagicScrollMobileOptions = {
               items: 3,
               draggable: true,
               step: 1,
          };
      })(jQuery);
    </script>
@stop


