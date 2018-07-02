@extends('sabina.layouts.app')
@section('header_style')
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','slick.css') }}" />
<link rel="stylesheet" type="text/css" href="{{ themeUrl('css','magiczoomplus.css') }}" />
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
  var uploadAction = "";
  var upload_path = "";
  var page = "marketplace";
  var shopproductlisturl = "";
  var listingPrd = "";
 /***end related oroduct***********/
  var getAllDataFromServerOnce = true;
  var upload_url = "{{Config::get('constants.cart_option_url')}}";
  var productData = {!! $dataArray !!};
  //var varientInfo = productData.varientInfo;
  var prdBlogUrl = "{{ Config::get('constants.product_url')}}";
  var curCode = "{{session('default_currency_code')}}";
  var colorPath = "{{Config::get('constants.color_url')}}";
 // retrun false;
</script>
<script type="application/ld+json"> {!!$richTextSnippetjson!!} </script> 
@endsection
@section('content')
<!-- Content section start -->
    <div class="productDisplay ng-cloak"  data-ng-app="productDetailApp" data-ng-controller="productDetailCtrl as rvCtrl" ng-cloak>
        <div class="product-view row clearfix">
            <div class="product-media col-sm-6 app-figure"  id="zoom-fig">
                <div class="zoom-gallery">
                    <div class="selectors vertical-thumb"> 
                        <a href="<%prdimage.large%>" data-slide-id="zoom" data-zoom-id="Zoom-1" data-image="<%prdimage.large%>"  ng-repeat="prdimage in rvCtrl.productImg track by $index" ng-click="thumbimagevedio($event,'thumbimage')">
                            <img ng-src="<%prdimage.thumb%>" alt="<%prdimage.image%>">
                        </a>                                                
                        <a href="#" data-slide-id="video-1" ng-repeat="prdvideo in rvCtrl.productVideo track by prdvideo.id" ng-click="thumbimagevedio($event,'video',prdvideo.site,prdvideo.vid)">
                            <span class="glyphicon glyphicon-play"></span>
                            <img ng-src="<%prdvideo.thumb_small%>" alt="<%prdvideo.title%>"/>
                        </a>                  
                    </div>              
                    <div class="product-main-img">
                        <div data-slide-id="zoom" class="zoom-gallery-slide" ng-show="rvCtrl.activeimgprevtab">
                            <a id="Zoom-1" class="MagicZoom" title="Show your product in stunning detail with Magic Zoom Plus."
                            href="<% rvCtrl.productImg[0].original %>">
                             <img ng-src="<% rvCtrl.productImg[0].large %>" alt=""/>
                            </a>
                        </div>
                        <div data-slide-id="video-1" class="zoom-gallery-slide video-slide" ng-show="!rvCtrl.activeimgprevtab">
                          <iframe width="560" height="515" ng-src="<% rvCtrl.prdvideourl | trustAsResourceUrl%>" frameborder="0" allowfullscreen></iframe>                       
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-info-main col-sm-6" >
                <div class="product-info-row" ng-repeat ="prdDetails in rvCtrl.productInfo track by $index"><%prdDetails.id%>
                    <div class="form-row">
                        <span class="pull-right addto-wish">
                            <i class="icon-heart"></i> @lang('product.add_to_wishlist')
                        </span>
                        <h1 class="title"><% prdDetails.prd_name %> </h1>
                        <span class="sku"><% prdDetails.sku %></span>
                        <div class="price-wrap">
                            <span class="old-price"  data-ng-if="prdDetails.isDisc"><%prdDetails.initial_price%>  {{session('default_currency_code')}}</span>

                            <span class="new-price"><%prdDetails.productPrice%> {{session('default_currency_code')}}</span>
                            <span class="discount-price"  data-ng-if="prdDetails.isDisc"><%prdDetails.discountPer%>%</span>
                        </div>
                    </div>             
                    <div class="row">
                       <div class="pdetail-row select-row" data-ng-if="rvCtrl.attrRes[prdDetails.mainProductId].length > 0">
                            <h3>@lang('checkout.please_choose_before_add_to_shopping_bag')</h3>
                                <div class="size col-sm-6" data-ng-repeat="atr in rvCtrl.attrRes[prdDetails.mainProductId] track by $index">
                                    <span class=""><%atr.attributedesc.name%> <span class="star-top">*</span></span>
                                    <span class="custom-select" data-ng-if="atr.attribute.attribute_type_value == 'plain_text'">
                                        <select class="select attrVal" id="attributeValueId[]" data-ng-model="rvCtrl.selAttrVal[prdDetails.mainProductId][$index]" data-ng-change="rvCtrl.changeContent($index,atr.attributedesc.attr_id,prdDetails.mainProductId,prdDetails.id,$parent.$parent.$index)" ng-options="attrname.value for attrname in rvCtrl.attrValRes[prdDetails.mainProductId][atr.attribute_id] track by attrname.valId">
                                          <option value="" disabled="disabled">@lang('common.select')</option>
                                        </select>
                                    </span>
                                    <span class="custom-select block" data-ng-if="atr.attribute.attribute_type_value == 'text_color_image'">
                                       <div class="pdetail-row color-choose"> 
                                            <ul id="colorVariant">
                                                <li ng-repeat="attrname in rvCtrl.attrValRes[atr.attribute_id] track by attrname.valId" uib-popover-html="rvCtrl.prdTooltip" popover-trigger="mouseenter" data-ng-mouseover="rvCtrl.getTooltipContent(attrname.color_image,attrname)">
                                                    <span class="select-color">
                                                    <input type="radio" name="color" id="attributeValueId[]" data-ng-model="rvCtrl.selAttrVal[$parent.$index].valId" data-ng-click="rvCtrl.changeContent($parent.$index,atr.attributedesc.attr_id,prdDetails.mainProductId)" data-ng-value="<%attrname.valId%>" class="multiSelectRadioBtn">
                                                        <span class="color-wrapper" data-ng-style="rvCtrl.selAttrVal[1] && { 'background' : 'red' }">
                                                            <span class="product-img" data-ng-if="attrname.color_image !=''">
                                                             {{-- <img src="<%rvCtrl.colorPath+attrname.color_image%>" width="50" height="50"> --}}
                                                            </span>

                                                             <span class="product-img" data-ng-if="attrname.color_image ==''">
                                                             <div class="" style="background: <%attrname.color_code%>; width:50">&nbsp;</div>
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
                                <div class="form-row col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='text'">
                                       <label><%optionRes.option_attr_desc.name %> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   ) </label>
                                        <input type="text" class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id]" ng-blur="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$index)">
                                </div>
                                <div class="form-row col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='textarea'">
                                       <label><%optionRes.option_attr_desc.name%> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %> ) </label>
                                        <textarea class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id]" ng-blur="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$index)"></textarea>
                                  </div>

                                <div class="form-row col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='browse_file'">

                                    <div class="custom-upload upload-btn-wrapper" id="image_upload" uploader="uploader">
                                        <span class="upload-btn-wrapper" id="image_upload">
                                            <div class="file-upload">
                                              <input disabled="disabled" value="Attach file" class="form-control">
                                              (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   )
                                              <button type="file" ngf-select ngf-accept="'image/*'" ngf-max-height="1000" ngf-max-size="5MB" class="btn-md btn" ng-model="rvCtrl.myFiles" optionId="<%optionRes.id%>"  ngf-pattern="'.jpeg,.jpg,.gif,.png'" id="fileUpdBtn">@lang('product.browse')</button>
                                            </div>
                                            <span id="image_upload_status"></span>
                                        </span>
                                    </div> 
                                    <div class="file-img" id="image_display">
                                        <img ng-src="<%filepreview%>" alt="profile photo" width="136" height="138" ng-show="filepreview">
                                    </div>
                                          
                                </div>

                                <div class="form-row col-sm-6" data-ng-if="optionRes.option_attr_detail.front_input=='multiselect'">
                                    <label><%optionRes.option_attr_desc.name %> </label>
                                    <div class="check-wrap">
                                        <label ng-repeat="optionValueRes in optionRes.option_attr_value_detail"><input type="checkbox" class="optionValuefield" value="<%optionValueRes.id%>" ng-model="rvCtrl.optionValueCheck[optionValueRes.id]" ng-change="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$parent.$index)"> <span class="chk-label"> <%optionValueRes.attribute_value%> 
                                        
                                        (<%optionValueRes.price%> <%(optionValueRes.price_type==2)? '%' : rvCtrl.curCode %> ) </span></label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-sm-6">
                            <label>@lang('product.qty')</label>
                            <span class="spiner"><%prdDetails.id%>
                                <span class="decrease icon-minus"  ng-click="rvCtrl.incDcrQuntity($event,prdDetails.totQty,'down',prdDetails.id,$index)"></span>
                                <input class="spinNum input-text qty" max="<% prdDetails.totQty %>" min="1"  ng-model="rvCtrl.totalQtyVal[$index]" ng-change="rvCtrl.getPriceByOption($event,'tqc',prdDetails.id,$index)" value="1" type="number" id="quantity" name="quantity" ng-pattern="/^[1-9]{1,7}$/">
                                <span class="increase icon-plus" ng-click="rvCtrl.incDcrQuntity($event,prdDetails.totQty,'up',prdDetails.id,$index)">  </span>
                            </span>
                        </div>
                    </div>
                  
                </div>

                <div class="prod-share">
                    <label>Share:</label>
                    <div class="social">                        
                        <ul class="product-social">
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i class="fa fa-commenting-o"></i></a></li>
                            <li><a href="#"><i class="fa fa-envelope-o" ></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter" ></i></a></li>
                            <li><a href="#"><i class="fa fa-whatsapp"></i></a></li>
                        </ul>
                    </div>
                    <div class="pull-right">
                        <a href="javascript:void(0)" class="btn" data-ng-if="prdDetails.totQty > 0" id="addToCart" ng-click="rvCtrl.addToCartHandler()">@lang('product.add_to_cart') </a>
                        <button type="submit">@lang('product.buy_now')</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="product-desc clearfix">                           
            <ul class="nav nav-tabs lang-nav-tabs">
                <li class="active"><a data-toggle="tab" href="#product-desc">@lang('product.details')</a></li>
            </ul>
            <div class="tab-content language-tab">
                <div id="product-desc" class="tab-pane form-row fade in active">
                    <p><%rvCtrl.productInfo.prd_desc%>  </p>
                    <p><strong>Composition :</strong> 92%Polyester 8%Elastane </p>
                    <h3>Care Instructions :</h3>
                    <ul class="care-list" style="display: none;">
                        <li>
                            <a href="#">
                                <img src="images/bleach.png">
                                <span>Do Not Bleach</span>
                            </a>                            
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/clean.png">
                                <span>Do Not Dry Clean</span>
                            </a>                            
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/iron.png">
                                <span>Do Not Iron</span>
                            </a>                            
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/dry.png">
                                <span>Do Not Trumble Dry</span>
                            </a>                            
                        </li>
                        <li>
                            <a href="#">
                                <img src="images/wash.png">
                                <span>Hand Wash</span>
                            </a>                            
                        </li>
                    </ul>
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
    <script type="text/javascript" src="{{ Config('constants.angular_url') }}sabinaApp/controller/productDetailCtrl.js"></script>
@stop


