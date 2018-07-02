@extends('layouts.checkout')
<script>
    var checkProductBeforeCart = "{{action('Seller\ProductDetailController@checkProductBeforeCart')}}";
    var addProductToCart = "{{action('Seller\ProductDetailController@addProductToCart')}}";
    var getVarientProduct = "{{action('Seller\ProductDetailController@getVarientProduct')}}";
    var productPriceByOption = "{{action('Seller\ProductDetailController@productPriceByOption')}}";
    var getAllDataFromServerOnce = true;
    var uploadAction = "{{ action('AjaxController@uploadImageAjax') }}";
    var updateStatusUrl = "{{action('Seller\ShippingProfileController@updateStatus')}}";
    var variTemp = <?php echo json_encode($varientInfo); ?>;
    var varientInfo = (typeof variTemp!=='undefined' && variTemp!='') ?JSON.parse(variTemp) :'';
    var upload_path = "{{Config::get('constants.cart_option_path')}}";
    var upload_url = "{{Config::get('constants.cart_option_url')}}";
    var baseUrl = "{{ Config::get('constants.product_url')}}";
    var productData = {!! $dataArray !!};
    var insertProductReview = "{{action('Checkout\ProductReviewController@insertProductReview')}}";
    var deleteProductReview = "{{action('Checkout\ProductReviewController@deleteProductReview')}}";
</script>
<input type="hidden" id="upload_path" value="{{Config::get('constants.cart_option_path')}}">
<input type="hidden" id="upload_url" value="{{Config::get('constants.cart_option_url')}}">
@section('content')
<!-- Content section start -->
<section class="content-wrapper product-section ng-clock" ng-app="productDisplay" ng-controller="productDisplayCtrl" ng-cloak>
<div class="productOpc" ng-hide="!styleopacity"></div>
<!-- Breadcum section start here -->
<div class="container breadcrumb-wrapper">
    <ul class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a>  </li>
      <li class="breadcrumb-item"><a href="#">Library</a>  </li>
      <li class="breadcrumb-item active">Data</li>
    </ul>
</div>

<!-- Carosel -->
<div class="container">
    <div class="row">

        <div class="col-sm-6">
          <div class="zoom-img">
               <img id="img_01" ng-src="@{{baseUrl+'large_572/'+productInfo.user_id+'/'+productImg[0].image }}"  data-zoom-image="@{{baseUrl+'original/'+productInfo.user_id+'/'+productImg[0].image }}"  alt="img"/>
                
          </div>
        </div>

        <div class="col-sm-6 product-detail-right">
            <div id="gallery_01"> 
                <ul class="clearfix gallery-thumb">
                 <li ng-repeat ="imgItm in productImg track by $index">
                      <a href="javascript:void(0)" class="active" data-image="@{{ baseUrl+'large_572/'+productInfo.user_id+'/'+imgItm.image }}" data-zoom-image="@{{baseUrl+'original/'+productInfo.user_id+'/'+imgItm.image }}"> <img src="@{{ baseUrl+'thumb_170/'+productInfo.user_id+'/'+imgItm.image }}" alt="img"/> </a>
                  </li>
                </ul>

                <div class="nav-control">
                    <a href="#" class="prev"></a>
                    <a href="#" class="next"></a>
                </div>   

            </div>

            <div class="prod-box product-detail">
                <div class="plike-row">
                    <div class="plike-column">
                        <span class="icon-product-link hover like" ng-click="updateProductLike('remove',$event)" ng-if="productInfo.userLike > 0"></span>
                        <span class="icon-product-link hover" ng-click="updateProductLike('like',$event)" ng-if="productInfo.userLike == ''"></span>@{{ productInfo.total_likes }}
                    </div>
                    <div class="plike-column">
                         <span data-target="#spinPop1" data-toggle="modal" id="spinDataModalBtn" class="icon-product-spin" ng-click="openSpinDataModal(productInfo.prd_src ,productInfo.prd_name,productInfo.id)"><span>Spin it</span> @{{ productInfo.total_spins }}
                    </div>
                    <div class="plike-column">
                        <span class="icon-share-social" data-target="#productsharepopup" data-toggle="modal" ng-click="friendsData()"></span>@{{ productInfo.total_shares }}
                        {!!PopUpHelpers::ShareFriendspopUp('productsharepopup')!!}
                    </div>          
                </div>
                <div class="pdetail-row pname-sku">
                    <h2> @{{ productInfo.prd_name }} </h2>
                    @{{productInfo.avaragerating}}
                 <div id="satrRating" star-rating ng-model="productInfo.avaragerating" readonly="true"></div>
                  <span>
                    <span class="icon-product-review"><a  ng-click="scrollToReview()"><img src="images/review-icon.png" alt=""></a></span> @{{productInfo.totProductReview}} @lang('checkout.reviews') 
                  </span>
                    <input type="hidden" name="mainProductId" id="mainProductId" value="@{{productInfo.mainProductId}}"/>
                
                    <input type="hidden" name="productId" id="productId" value="@{{productInfo.id}}"/>
                    <div>&nbsp;</div>
                    <span class="instock" ng-if="productInfo.totQty > 100 ">
                    @lang('checkout.in_stock') <strong> More than 100 </strong> Pcs.
                    </span>
                    <span class="instock" ng-if="productInfo.totQty < 1 ">
                        @lang('checkout.out_of_stock')
                    </span>
                    <span class="instock" ng-if="productInfo.totQty < 100 && productInfo.totQty > 0 ">
                        @lang('checkout.in_stock') <strong> @{{productInfo.totQty }} </strong> Pcs.
                    </span>
                    

                    <span> @{{ productInfo.sku }}</span>
                </div>
                
                <div class="pdetail-row select-row" ng-if="attrRes.length > 0">
                    <h3>@lang('checkout.please_choose_before_add_to_shopping_bag')</h3>
                    <div class="size" ><!--  @lang('common.select') --> 
                         <span ng-repeat="atr in attrRes track by $index">@{{atr.attributedesc.name}} 
                            <span class="custom-select">
                                <select class="select attrVal" id="attributeValueId[]" ng-model="selAttrVal[$index]" ng-change="changeContent()" ng-options="attrname.value for attrname in attrValRes[atr.attribute_id] track by attrname.valId"  >
                                    <option value="">Select</option>
                                </select>
                               
                            </span>
                       </span>  
                   </div>
                </div>
                <div class="pdetail-row pdetail-choseinfo" ng-if="optionInfo.length > 0">
                    <div ng-repeat="optionRes in optionInfo track by $index">
                        <div class="form-row" ng-if="optionRes.option_attr_detail.front_input=='text'">
                             <label>@{{optionRes.option_attr_desc.name }} {{session('default_currency_code')}}   ) </label>
                                <input type="text" class="optionfield" optionId="@{{optionRes.id}}" ng-model="optionFieldId[optionRes.id]" ng-blur="getPriceByOption($event)">
                        </div>
                        <div class="form-row" ng-if="optionRes.option_attr_detail.front_input=='textarea'">
                             <label>@{{optionRes.option_attr_desc.name }} 
                             {{session('default_currency_code')}}   ) </label>
                                <textarea class="optionfield" optionId="@{{optionRes.id}}" ng-model="optionFieldId[optionRes.id]" ng-blur="getPriceByOption($event)"></textarea>
                        </div>

                        <div class="form-row" ng-if="optionRes.option_attr_detail.front_input=='browse_file'">

                            <div class="custom-upload upload-btn-wrapper" id="image_upload" uploader="uploader">
                                <span class="upload-btn-wrapper" id="image_upload">
                                  <div class="file-upload">
                                    <input disabled="disabled" value="Attach file*" class="form-control">
                                    <button type="file" ngf-select ngf-accept="'image/*'" ngf-max-height="1000" ngf-max-size="5MB" class="btn-md btn-skyblue" ng-model="myFiles" optionId="@{{optionRes.id}}" id="fileUpdBtn">Browse</button>
                                  </div>
                                <span id="image_upload_status"></span>
                            
                            </div> 
                            <div class="file-img" id="image_display">
                              <img ng-src="@{{filepreview}}" alt="profile photo" width="136" height="138" ng-show="filepreview">
                            </div>
                                
                        </div>

                        <div class="form-row" ng-if="optionRes.option_attr_detail.front_input=='multiselect'"> 
                                @{{optionRes.option_attr_desc.name }} </label>
                                <div class="check-wrap">
                                    <label ng-repeat="optionValueRes in optionRes.option_attr_value_detail"><input type="checkbox" class="optionValuefield" value="@{{optionValueRes.id}}" ng-model="optionValueCheck[optionValueRes.id]" ng-change="getPriceByOption($event)"> <span class="chk-label"> @{{optionValueRes.attribute_value}} 
                                    
                                    ( @{{optionValueRes.price}} {{session('default_currency_code')}}) </span></label>
                                
                                   
                                </div>
                        </div>

                    </div>
                </div>        
                    
                    <div class="form-row" style="display: none;">
                        <label>Choose With Drop down*</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                </div>

                {{--<div class="pdetail-row pdetail-choseinfo">
                @if(count($optionInfo))

                    @foreach($optionInfo as $key=> $optionRes)
                       @if($optionRes->optionAttrDetail->front_input=='text')
                            
                            <div class="form-row">
                            <label>{{$optionRes->optionAttrDesc->name.' ('.numberFormat($optionRes->price)}} @if($optionRes->price_type=='2') % @else @endif {{session('default_currency_code')}}   ) </label>
                            <input type="text" class="optionfield" optionId="{{$optionRes->id}}" ng-model="optionFieldId[{{$optionRes->id}}]" ng-blur="getPriceByOption($event)">
                            </div>
                                
                        @elseif($optionRes->optionAttrDetail->front_input=='textarea')
                            
                            <div class="form-row">
                            <label>{{$optionRes->optionAttrDesc->name.' ('.numberFormat($optionRes->price)}} @if($optionRes->price_type=='2') % @else @endif {{session('default_currency_code')}}) </label>
                            <textarea name="" class="optionfield" optionId="{{$optionRes->id}}" ng-model="optionFieldId[{{$optionRes->id}}]" ng-blur="getPriceByOption($event)"></textarea>
                            </div>
                               
                        @elseif($optionRes->optionAttrDetail->front_input=='browse_file')
                            
                            <div class="form-row">

                            <div class="custom-upload upload-btn-wrapper" id="image_upload" uploader="uploader">
                               <span class="upload-btn-wrapper" id="image_upload">
                                  <div class="file-upload">
                                    <!-- <span class="file-txt">attach icon </span> -->
                                    <!-- <input type="hidden" value="" id="imgOptionField" class="optionfield" optionId="{{$optionRes->id}}"> -->
                                    <input disabled="disabled" value="Attach file*" class="form-control">
                                    <button type="file" ngf-select ngf-accept="'image/*'" ngf-max-height="1000" ngf-max-size="5MB" class="btn-md btn-skyblue" ng-model="myFiles" optionId="{{$optionRes->id}}" id="fileUpdBtn">Browse</button>
                                  </div>
                              <span id="image_upload_status"></span>
                             
                            </div> 
                            <div class="file-img" id="image_display">
                              <img ng-src="@{{filepreview}}" alt="profile photo" width="136" height="138" ng-show="filepreview">
                            </div>
                                
                            </div>

                        @elseif($optionRes->optionAttrDetail->front_input=='multiselect')
                            <div class="form-row">
                                <label>{{$optionRes->optionAttrDesc->name}}</label>
                                <div class="check-wrap">
                                    @foreach($optionRes->optionAttrValueDetail as $optionValueRes)
                                    <label><input type="checkbox" class="optionValuefield" value="{{$optionValueRes->id}}" ng-model="optionValueCheck[{{$optionValueRes->id}}]" ng-change="getPriceByOption($event)"> <span class="chk-label">{{$optionValueRes->optionAttrValueDesc->values.' ('.numberFormat($optionValueRes->price)}} @if($optionValueRes->price_type=='2') % @else @endif {{session('default_currency_code')}}) </span></label>
                                    @endforeach
                                   
                                </div>
                            </div>
                        @endif
                    @endforeach
                @endif

                @if(count($optionValueInfo))

                @endif
                    
                    
                    <div class="form-row" style="display: none;">
                        <label>Choose With Drop down*</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                </div>--}}

                <div class="pdetail-row qty">
                    <div style="width: 58px;" class="qty-form-input spinner">
                        <input type="text" max="@{{ productInfo.totQty }}" min="1" value="1" id="quantity" name="quantity" ng-model="totalQtyVal" ng-change="getPriceByOption($event)"  class="form-control input-text qty">
                        <i class=" glyphicon glyphicon-triangle-top" ng-click="incDcrQuntity(productInfo.totQty,'up')"></i>
                        <i class="glyphicon glyphicon-triangle-bottom" ng-click="incDcrQuntity(productInfo.totQty,'down')"></i>
                    </div>

                    <div class="del-time">Delivery time <span class="amt">@{{ productInfo.delivertime }}</span> <span class="day">Days</span></div>
                </div>
                <div class="pdetail-row price">
                    <span class="discount"> @{{productInfo.initial_price}} {{session('default_currency_code')}}    </span>
                    <span class="discount-price">
                       <span id="totalfinalPrice"> @{{productInfo.productPrice}} </span><sub>{{session('default_currency_code')}}</sub>
                    </span>
                  

                <button class="btn-lg btn-skyblue" ng-if="productInfo.totQty < 1">@lang('checkout.add_to_shopping_bag')</button>
                   
                    <button id="addToCart" ng-if="productInfo.totQty > 0" class="btn-lg btn-skyblue" ng-click="addToCartHandler()">@lang('checkout.add_to_shopping_bag')</button>
                
                </div>              
                <!-- <div class="pdetail-row tag-item">
                    <h3>@lang('checkout.tags')</h3>
                    @if(count($productTags))
                    @foreach($productTags as $productTagRes)
                    <a href="javascript:void(0)">{{$productTagRes->getTags->tag_title}}</a>
                    @endforeach
                    @endif
                </div> -->
            </div>  
        </div>
     </div>

    <div class="row">
        <div class="col-sm-6 pull-right">
            <div class="prod-box delivery-detail" style="display: none;">
                <h3 class="border">Delivery Detail</h3>
                <div class="delivery-row"><span>Delivery from :</span> Thailand, Nonthaburi</div>
                <div class="delivery-row"><span>Shipping Agent : </span> DHL <a href="#">View Detail</a></div>
                <div class="delivery-row">Participant items 649</div>
            </div>
            <div class="prod-box comp-lcs">
                <img src="images/logo.png" alt="">
                <button class="btn-md btn-grey pull-right show-popup" id="complain-to-lcs?shopId=@{{ productInfo.shop_id }}">@lang('checkout.complain_to_lcs')</button>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="prod-box shop-detail-container">
                <div class="product-shop-img"><a href="@{{ productInfo.shop_url }}"><img src="@{{ productInfo.shop_img_url+productInfo.shop_image }}" alt=""></a></div>
                <div class="product-shop-name">
                    <h3><a href="@{{ productInfo.shop_url }}">@{{ productInfo.shop_name }}</a></h3>
                    <span>Last update</span> <span class="update-time">@{{productInfo.shop_up_date}}</span>
                </div>
                <div class="shop-detail">
                    <div class="shop-detail-column">
                        <span>Rating</span>
                        <div class="five-star">
                            <img src="images/five-star.png" alt="Five star">
                            <img src="images/five-star.png" alt="Five star">
                            <img src="images/five-star.png" alt="Five star">
                            <img src="images/five-star.png" alt="Five star">
                            <img src="images/five-star.png" alt="Five star">
                        </div>
                    </div>
                    <div class="shop-detail-column">
                        <span>Product List</span>
                        <span class="block">132</span>
                    </div>
                    <div class="shop-detail-column">
                        <span>Shipping</span>
                        <span class="block">80%</span>
                    </div>
                    <div class="shop-detail-column">
                        <span>Response</span>
                        <span class="block">92%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<!-- Prduct info  -->

<div class="container">

    <div class="prod-box">
        <div class="product-info">
            <h3 class="border">@lang('checkout.product_info')</h3>
            <p>@{{productInfo.prd_desc}}</p>
        </div>
    </div>

    @if(Auth::check())
    <div class="prod-box" ng-show="orderInfo">
        <div class="product-info" >
            <h3 class="border">Please give your Rating score</h3>
            <div>Order Id : @{{orderInfo.orderId}}</div>
            <div>Order Date : @{{orderInfo.created_at}}</div>
            <div>Qty : @{{orderInfo.qty}}</div>
            <div class="rateit" ng-show="feedbackForm" ><!-- ng-if="starModal==''" -->
              <div id="rateYo" star-rating ng-model="starModal" readonly="false"></div> 
              <textarea id="review"  ng-model="reviewValue"></textarea>
              <div><button  class="btn-lg btn-skyblue ng-scope" ng-click="writeReview()">@lang('checkout.leave_feedback')</button></div>
              </div>
            </div>
    </div>
    @endif
    <div class="prod-box" id="reviewBox">
        <div class="review">
            <h2>@lang('checkout.reviews')</h2>
            <div class="view-all-comment">              
                <a href="@{{productInfo.reviewUrl}}" target="_self" ng-if="productInfo.totProductReview > 1">@lang('checkout.view_all_previous_comments')</a>
                <span class="pull-right">@{{productInfo.totProductReview}} @lang('checkout.reviews')</span>
            </div>

            <div class="review-row" ng-repeat="prdReview in productReview track by $index">
                <div class="col-sm-3 review-dp">
                    <a href="#" class="pull-left"><img src="@{{prdReview.image}}" alt="" style="width: 52px;"></a>
                    <div class="review-user-name">
                        <h3><a href="#">@{{prdReview.userName}}</a></h3>
                    </div>
                </div>
                <div class="col-sm-9 review-content">

                  <span class="pull-right icon-remove" ng-click="removeReview(prdReview.id ,$index)" ng-if="prdReview.flag == '1'"></span>

                    <div class="five-star user-rating-star" ng-value="prdReview.rating">
                       {{-- <img src="images/five-star.png" alt="Five star">
                        <img src="images/five-star.png" alt="Five star">
                        <img src="images/five-star.png" alt="Five star">
                        <img src="images/five-star.png" alt="Five star">
                        <img src="images/five-star.png" alt="Five star">--}} 
                        <div class="star-rating" star-rating ng-model="prdReview.rating" readonly="true"></div>
                    </div>
                    <div class="review-txt">
                        <p>@{{prdReview.review}}</p>
                    </div>
                    <small class="pull-right time">@{{prdReview.time}}</small>
                </div>
            </div>
           
        </div>
    </div>

</div>
<!-- Product section start here -->

<div class="compass-item related" style="display: none;">

    <div class="container">
    <h2>Related Items</h2>

    <ul class="tiles-wrap animated " id="wookmark">
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product9.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name"><a href="#">Product Name </a></h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner2.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="#">Shop's Name</a> </span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>
                <div class="price-section">
                    <span> THB 950.00</span>
                </div>
                <button class="btn-md btn-skyblue">Take it to bag</button>  
            </div>
        </li>
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product4.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <span class="product-offer">50%</span>
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name">Product Name will be like this  If It's to long</h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name">Shop's Name will be  like this If It's to long </span>
                        <span><img src="images/five-arrow.png"></span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>

                <div class="price-section">
                    <span class="discount">THB 2,150.00</span>
                    <span class="discount-price">THB 750.00</span>
                </div>
                <button class="btn-md btn-skyblue">Take it to bag</button>  
            </div>
        </li>
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product15.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name"><a href="#">Product Name </a></h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner2.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="#">Shop's Name</a> </span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>
                <div class="price-section">
                    <span> THB 950.00</span>
                </div>
                <button class="btn-md btn-grey">Take it to bag</button> 
            </div>
        </li>   
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product18.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name"><a href="#">Product Name </a></h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner2.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="#">Shop's Name</a> </span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>
                <div class="price-section">
                    <span> THB 950.00</span>
                </div>
                <button class="btn-md btn-grey">Take it to bag</button> 
            </div>
        </li>   
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product10.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name"><a href="#">Product Name </a></h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner2.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="#">Shop's Name</a> </span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>
                <div class="price-section">
                    <span> THB 950.00</span>
                </div>
                <button class="btn-md btn-skyblue">Take it to bag</button>  
            </div>
        </li>
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product19.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <span class="product-offer">50%</span>
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name">Product Name will be like this  If It's to long</h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name">Shop's Name will be  like this If It's to long </span>
                        <span><img src="images/five-arrow.png"></span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>

                <div class="price-section">
                    <span class="discount">THB 2,150.00</span>
                    <span class="discount-price">THB 750.00</span>
                </div>
                <button class="btn-md btn-skyblue">Take it to bag</button>  
            </div>
        </li>
        <li>
            <div class="sendlike-icon">
                <span class="send">
                    <span class="icon-share-friend" data-toggle="modal" data-target="#sendPop1"></span></span>
                <span class="like">
                    <span class="icon-product-link"></span>                 
                </span>
                <span class="spin">
                    <span class="icon-product-spin" data-toggle="modal" data-target="#spinPop1"><span>Spin it</span></span></span>
            </div>
            <a href="#"><img src="images/product/product20.jpg" alt="" class="product-img" /></a>
            <div class="product-content">
                <div class="five-star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                    <img src="images/five-star.png" alt="Five star">
                </div>
                <div class="count-social-row">
                    <span class="count-social-col"> <span class="icon-product-link"></span></a> 250k</span>
                    <span class="count-social-col"> <a href="#"><span class="spin">Spin it</span> </a> 728k</span>
                    <span class="count-social-col pull-right"> <a href="#"><span class="icon-share-social"></span></a> 728k</span>
                </div>
                <h3 class="product-name"><a href="#">Product Name </a></h3>
                <div class="product-shop">
                    <a href="#" class="pull-left"><img src="images/shop-owner2.jpg" alt="" /></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="#">Shop's Name</a> </span>
                        <span class="prod-lang"><img src="images/lang-product-icon.jpg" alt="" /></span>
                    </div>
                    <a href="#" class="prod-item-name">#Lifecompass #Smoothgraph </a>
                </div>
                <div class="price-section">
                    <span> THB 950.00</span>
                </div>
                <button class="btn-md btn-grey">Take it to bag</button> 
            </div>
        </li>   
    </ul>
    </div>

    <div class="modal fade send-model" id="sendPop1" role="dialog">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">                
                </div>
                <div class="modal-body">
                        <div class="send-dropdown">
                            <div class="send-search">
                                <input type="text" placeholder="Name or email">
                                <button type="submit"><span class="icon-search"></span></button>
                                <span class="pull-right icon-remove" data-dismiss="modal"> </span>
                            </div>
                            <div class="sendUser_name">
                                <li><a href="#"><img src="images/user/send-user.jpg" alt="" /> <span>Thorntadh Marneenate </span></a></li>
                                <li><a href="#"><img src="images/user/send-user2.jpg" alt="" /> <span>Tylor Swift</span></a></li>
                                <li><a href="#"><img src="images/user/send-user3.jpg" alt="" /> <span>Old women</span></a></li>
                                <li><a href="#"><img src="images/user/send-user4.jpg" alt="" /> <span>Guy Tony </span></a></li>
                                <li><a href="#"><img src="images/user/send-user5.jpg" alt="" /> <span>Johny Depp </span></a></li>
                                <li><a href="#"><img src="images/user/send-user6.jpg" alt="" /> <span>Eli lehanna</span></a></li>
                                <li><a href="#"><img src="images/user/send-user4.jpg" alt="" /> <span>Guy Tony </span></a></li>
                                <li><a href="#"><img src="images/user/send-user5.jpg" alt="" /> <span>Johny Depp </span></a></li>
                                <li><a href="#"><img src="images/user/send-user6.jpg" alt="" /> <span>Eli lehanna</span></a></li>
                            </div>
                            <div class="share-board">
                                <span>Share this Board</span>
                                <div class="social-icon">
                                    <a href="#"><img src="images/fb.jpg" alt="" title=""></a>
                                    <a href="#"><img src="images/twitter.jpg" alt="" title=""></a>
                                    <a href="#"><img src="images/pin.jpg" alt="" title=""></a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="addToCartdiv" class="modal modal-Cartdiv modal-address in" role="dialog">
  <div class="modal-dialog model-md">
    <!-- Modal content-->
    <div class="modal-content txt-center">
      <div class="modal-header">
          <h3 class="skyblue">@{{ productInfo.prd_name }} <span>Added successfully.</span></h3>
      </div>
      <div class="modal-body">
      <div class="mt-10">
          <div class="mt-10"><button class="btn-lg btn-skyblue" class="close" data-dismiss="modal" aria-label="Close">Continue Shopping</button></div>
          <div class="mt-10 or">Or</div>
          <div class="mt-10"><a class="btn-lg btn-skyblue" ng-click="goToCart('{{ action('Checkout\CartController@index') }}')" href="javascript:void();">View cart / checkout</a>
             
          </div>
      </div>
      </div>
    </div>
  </div>        
</div>

</section>
    {!!PopUpHelpers::showBoardpopUp()!!}

<div id="popupdiv" class="modal modal-popupdiv fade in" role="dialog"></div>
<!-- Content end -->  
@endsection
@section('footer_scripts')
<script type="text/javascript" src="{{url('/')}}/js/jquery.dd.min.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/wookmark.min.js"></script>
<script type="text/javascript">
      window.onload = function () {
      // For product item   
      var wookmark1 = new Wookmark('#wookmark', {
          offset:10,
          itemWidth: 240
      });

  };
</script>
<script type="text/javascript" src="{{url('/')}}/js/jquery.elevateZoom-3.0.8.min.js"></script>
<script type="text/javascript">
    jQuery(document).ready(function(){
      jQuery("#img_01").elevateZoom({
            gallery: 'gallery_01',
            cursor: 'pointer',          //zoomEnabled: false,
            galleryActiveClass: 'active',
            imageCrossfade: true,
            responsive : true,
            easing : true,
            zoomWindowFadeIn: 500, 
            zoomWindowFadeOut: 500, 
            lensFadeIn: 300, 
            lensFadeOut: 300
      });      
    });
</script>

<script type="text/javascript" src="{{url('/')}}/js/ng-file-upload.min.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/html5lightbox.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/custom.js"></script>
<!-- <script type="text/javascript" src="{{ Config::get('constants.js_url') }}ajaxupload.3.5.js" ></script> -->
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular-animate.min.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/loading-bar.js"></script>
<script type="text/javascript" src="{{url('/')}}/js/product-display.js"></script>
<script type="text/javascript" src="{{url('/')}}/angular/frontend/productDisplayCtrl.js"></script>
<script type="text/javascript">
  jQuery(".user-rating-star").each(function() {
   //alert($(this).attr('value'));
   console.log('1');
});
</script>
@stop