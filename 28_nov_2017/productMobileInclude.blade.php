
<div class="mobile-product-detail">
    <!-- product mobile header  -->
    <div class="container">
      <div class="product-header-mb">
        <span class="glyphicon glyphicon-menu-left back"> </span>
        <span class="name"><% rvCtrl.productInfo.prd_name %></span>
        <span class="icon-info product-help-icon"></span>
        <!-- <span class="icon-remove product-help-icon"></span> -->
      </div>
    </div>
    <!-- product section -->
    <div class="container">      
        <div class="rate-review clearfix" data-ng-if="rvCtrl.productInfo.prdType=='product'">
            <star-rating ng-model="rvCtrl.productInfo.avaragerating" read-only="true" ></star-rating>
            <span class="review">
              <span class="icon-product-review"><a  ng-click="scrollToReview()">
                    
                    <span class="path1"></span><span class="path2"></span>
                    
                </a></span> 
              <span class="" data-ng-if="rvCtrl.productInfo.totProductReview > 1"><%rvCtrl.productInfo.totProductReview%> @lang('checkout.reviews')</span>
             
            </span>
           
        </div>
        <div class="product-main-img">
            <div class="product-slick">
                <div class="product-slick-item" ng-repeat ="imgItm in rvCtrl.productImg track by $index">
                    <img ng-src="<% imgItm.large %>"    alt="img"/>
                </div>
            </div>
            
        </div>
          
        <div class="prod-box">
            <div class="plike-row">
                <div class="plike-column">
                    <span class="icon-product-link hover like" ng-click="rvCtrl.updateProductLike('remove',$event)" data-ng-if="rvCtrl.productInfo.userLike > 0"></span>
                    <span class="icon-product-link hover" ng-click="rvCtrl.updateProductLike('like',$event)" data-ng-if="rvCtrl.productInfo.userLike == ''"></span><span class="count"> <% rvCtrl.productInfo.total_likes %></span>
                </div>
                <div class="plike-column">
                    <span data-target="#spinPop1222" data-toggle="modal" id="spinDataModalBtn" class="icon-product-spin" ng-click="rvCtrl.openSpinDataModal(rvCtrl.productInfo.prd_src ,rvCtrl.productInfo.prd_name,rvCtrl.productInfo.id)">
                        <span>@lang('product.spin_it')</span> <span class="count"><% rvCtrl.productInfo.total_spins %></span>
                    </span>
                </div>
                <div class="plike-column">
                    <span class="icon-share-social" data-target="#productsharepopup" data-toggle="modal" ng-click="rvCtrl.friendsData()"></span><% rvCtrl.productInfo.total_shares %>
                    <span class="count">{!!PopUpHelpers::ShareFriendspopUp('productsharepopup','rvCtrl.', 'productDisplay')!!}</span>
                </div>          
            </div>
            <!-- <div class="pdetail-row tag-item" data-ng-if="rvCtrl.ptag.length > 0">
                <h3>@lang('checkout.tags')</h3>
                <a href="javascript:void(0)" ng-repeat="prdTags in rvCtrl.ptag"><%prdTags.tag_title%> </a>               
            </div> -->
        </div>

        <div class="prod-box delivery-detail" style="display: none;">
            <h3 class="accordian">Delivery Detail <i class="icon-plus"></i></h3>
            <div class="accodinan-content">
                <div class="delivery-row"><span>Delivery from :</span> Thailand, Nonthaburi</div>
                <div class="delivery-row"><span>Shipping Agent : </span> DHL <a href="javascript:void(0)">View Detail</a></div>
                <div class="delivery-row">Participant items 649</div>
            </div>
        </div>

        <div class="prod-box comp-lcs">
            <img src="{{ GeneralFunctions::getSiteLogo('SITE_LOGO_HEADER') }}" alt="logo" width="" height="33">
            <button class="btn-md btn-grey pull-right" data-toggle="modal" data-target="#complainToLcs">@lang('checkout.complain_to_lcs')</button>
        </div>

        <div class="prod-box" data-ng-if="rvCtrl.spcfAttr.length > 0">
            <div class="product-info">
                <h3 class="accordian">@lang('product.specification') <i class="icon-plus"></i></h3>
                <div ng-repeat="specification in rvCtrl.spcfAttr track by $index" class="accodinan-content">
                    <%specification.attributedesc.name%> <!--  <><%specification.attribute.front_input%> --> : 

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
  
        <div class="prod-box">
          <div class="product-info">
              <h3 class="accordian">@lang('checkout.product_info') <i class="icon-plus"></i></h3>
              <div class="accodinan-content">
                  <p ng-bind-html="rvCtrl.productInfo.prd_desc | unsafe"></p>
              </div>              
          </div>
        </div>
        @if(Auth::check())
        <div class="prod-box" data-ng-if="rvCtrl.orderInfo && rvCtrl.feedbackForm">
            <div class="product-info" >
                <h3 class="accordian">@lang('product.please_give_your_rating_score') <i class="icon-plus"></i></h3>
                <div class="accodinan-content">                   
                    <div>@lang('product.order_id') : <%rvCtrl.orderInfo.orderId%></div>
                    <div>@lang('product.order_date') : <%rvCtrl.orderInfo.created_at%></div>
                    <div>@lang('product.qty') : <%rvCtrl.orderInfo.qty%></div>
                    <div class="rateit">
                        <star-rating ng-model="rvCtrl.starModal" read-only="false" on-set="setReview"></star-rating>
                        <textarea id="review"  ng-model="rvCtrl.reviewValue"></textarea>
                        <div>
                            <button  class="btn-lg btn-skyblue ng-scope" ng-click="rvCtrl.writeReview()">@lang('checkout.leave_feedback')</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <div class="prod-box" id="reviewBox"  data-ng-if="rvCtrl.productInfo.prdType=='product'">
            <div class="review">
                <h2 class="accordian">@lang('checkout.reviews') <i class="icon-plus"></i></h2>
                <div class="view-all-comment accodinan-content">              
                    <a href="<%rvCtrl.productInfo.reviewUrl%>" target="_self" data-ng-if="rvCtrl.productInfo.totProductReview > 1">@lang('checkout.view_all_previous_comments')</a>
                    <span class="pull-right" data-ng-if="rvCtrl.productInfo.totProductReview > 1"><%rvCtrl.productInfo.totProductReview%> @lang('checkout.reviews')</span>
                    <div class="detail-box" data-ng-bind-html="rvCtrl.errorInfoLog | unsafe" data-ng-if="rvCtrl.productInfo.totProductReview < 1">
                        <div class="no-info-blank">
                          <h3><i class="icon-doc"></i> {{ getAdminBlock('no-record') }} </h3>
                        </div>
                  </div>
                </div>
                <div class="review-row" ng-repeat="prdReview in rvCtrl.productReview track by $index">
                    <div class="col-sm-2 review-dp">
                        <a href="javascript:void(0)" class="pull-left"><img ng-src="<%prdReview.image%>" alt="" width="52" height="52"></a>                        
                    </div>
                    <div class="col-sm-10 review-content">
                        <div class="review-user-name">
                            <h3><a href="javascript:void(0)"><%prdReview.userName%></a></h3>
                            <div class="mt-5">x <%prdReview.quantity%> @lang('product.pcs')</div>
                        </div>
                        <span class="pull-right icon-remove" ng-click="rvCtrl.removeReview(prdReview.id ,$index)" data-ng-if="prdReview.flag == '1'"></span>
                        <div class="five-star user-rating-star" ng-value="prdReview.rating"> 
                            <star-rating ng-model="prdReview.rating" read-only="true"></star-rating>
                        </div>
                        <div class="review-txt">
                            <p><%prdReview.review%></p>
                        </div>
                        <small class="pull-right time"><%prdReview.time%></small>
                    </div>
                </div>

            </div>
        </div>

        <!--- related produc---->
        <div class="compass-item related">
             <h2>Related Products</h2>
             {!! LayoutHtml::realtedProductsRender('rvCtrl')!!}       
        </div>
        <!--end relatd product -->
        <div id="addToCartdiv" class="modal modal-Cartdiv modal-address in" role="dialog">
          <div class="modal-dialog model-md">
            <!-- Modal content-->
            <div class="modal-content txt-center">
              <div class="modal-header">
                  <h3 class="skyblue"><% rvCtrl.productInfo.prd_name %> <span>@lang('product.added_successfully').</span></h3>
              </div>
              <div class="modal-body">
              <div class="mt-10">
                  <div class="mt-10"><button class="btn-lg btn-skyblue" class="close" data-dismiss="modal" aria-label="Close">@lang('checkout.continue_shopping')</button></div>
                  <div class="mt-10 or">Or</div>
                  <div class="mt-10"><a class="btn-lg btn-skyblue" href="{{ action('Checkout\CartController@index') }}" target="_self">@lang('checkout.view_cart_checkout')</a>
                     
                  </div>
              </div>
              </div>
            </div>
          </div>        
        </div>

         
    </div>
    <!-- -->

    <div class="product-detail-slide">
        <div class="product-detail-right prod-box">
            <span class="icon-remove"></span>

            <div class="pdetail-row select-row" data-ng-if="rvCtrl.attrRes.length > 0">
                <h3>@lang('checkout.please_choose_before_add_to_shopping_bag')</h3>
                <div class="size" >
                    <span class="block" ng-repeat="atr in rvCtrl.attrRes track by $index">
                        <span class=""><%atr.attributedesc.name%> <span class="star-top">*</span></span>
                        <span class="custom-select" data-ng-if="atr.attribute.attribute_type_value == 'plain_text'">
                            <select class="select attrVal" id="attributeValueId[]" ng-model="rvCtrl.selAttrVal[$index]" ng-change="rvCtrl.changeContentMobile()" ng-options="attrname.value for attrname in rvCtrl.attrValRes[atr.attribute_id] track by attrname.valId"  >
                                <option value="">Select</option>
                            </select>                           
                        </span>
                        <span class="custom-select block" data-ng-if="atr.attribute.attribute_type_value == 'text_color_image'">
                           <div class="pdetail-row color-choose"> <!-- color-choose -->
                              <ul id="colorVariant">
                                 <li ng-repeat="attrname in rvCtrl.attrValRes[atr.attribute_id] track by attrname.valId">
                                    <span class="select-color"> <%rvCtrl.selAttrVal[$index].valId%>
                                      <input type="radio" name="color" id="attributeValueId[]" data-ng-model="rvCtrl.selAttrVal[$index].valId" ng-value="<%attrname.valId%>" ng-change="rvCtrl.changeContentMobile()">
                                       <span class="color-wrapper" data-ng-style="rvCtrl.selAttrVal[1] && { 'background' : 'red' }">
                                          <span class="product-img" data-ng-if="attrname.color_image !=''">
                                             <img src="<%rvCtrl.colorPath+attrname.color_image%>" width="50" height="50">
                                          </span>
                                          <span class="product-img" data-ng-if="attrname.color_image ==''">
                                             <div class="" style="background: <%attrname.color_code%>; width:50">&nbsp;</div>
                                          </span>
                                       </span>
                                    </span>
                                 </li>
                              </ul>
                           </div>                          
                        </span>
                    </span>  
                </div>
            </div>

            <div class="blog-detail"  data-ng-if="rvCtrl.productInfo.prdType=='blog'">
                <div class="blog-heading">
                    <h2><% rvCtrl.productInfo.prd_name %> <span class="blog-date"><% rvCtrl.productInfo.created_at %></span></h2>
                </div>
                <div class="product-shop">
                    <a href="<%rvCtrl.productInfo.blogUrl%>" target="_self" class="pull-left"><img ng-src="<%rvCtrl.productInfo.userImg%>" alt="" width="72" height="72"></a>
                    <div class="product-shop-name">
                        <span class="shop-name"><a href="<%rvCtrl.productInfo.blogUrl%>" target="_self"><%rvCtrl.productInfo.userName%> </a></span>
                        <span class="rank-group">
                            <span class="icon-rank3"></span><span class="icon-rank3"></span><span class="icon-rank1"></span>
                        </span>
                        <span class="prod-lang"><img src="<%rvCtrl.productInfo.counrtySrc%>" alt=""></span>
                    </div>                  
                </div>
            </div>

            <div class="product-detail" data-ng-if="rvCtrl.productInfo.prdType=='product'">
                <div class="pdetail-row pdetail-choseinfo" data-ng-if="rvCtrl.optionInfo.length > 0">
                    <div ng-repeat="optionRes in rvCtrl.optionInfo track by $index">
                        <div class="form-row" data-ng-if="optionRes.option_attr_detail.front_input=='text'">
                            <label><%optionRes.option_attr_desc.name %> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   ) </label>
                            <input type="text" class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id]" ng-blur="rvCtrl.getPriceByOption($event)">
                        </div>
                        <div class="form-row" data-ng-if="optionRes.option_attr_detail.front_input=='textarea'">
                            <label><%optionRes.option_attr_desc.name%> (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %> ) </label>
                            <textarea class="optionfield" optionId="<%optionRes.id%>" ng-model="rvCtrl.optionFieldId[optionRes.id]" ng-blur="rvCtrl.getPriceByOption($event)"></textarea>
                        </div>
                        <div class="form-row" data-ng-if="optionRes.option_attr_detail.front_input=='browse_file'">
                            <div class="custom-upload upload-btn-wrapper" id="image_upload" uploader="uploader">
                                <span class="upload-btn-wrapper" id="image_upload">
                                    <div class="file-upload">
                                      <input disabled="disabled" value="Attach file" class="form-control">
                                      (<%optionRes.price%> <%(optionRes.price_type==2)? '%' : rvCtrl.curCode %>   )
                                      <button type="file" ngf-select ngf-accept="'image/*'" ngf-max-height="1000" ngf-max-size="5MB" class="btn-md btn-skyblue" ng-model="rvCtrl.myFiles" optionId="<%optionRes.id%>"  ngf-pattern="'.jpeg,.jpg,.gif,.png'" id="fileUpdBtn">@lang('product.browse')</button>
                                    </div>
                                <span id="image_upload_status"></span>                          
                            </div> 
                            <div class="file-img" id="image_display">
                                <img ng-src="<%filepreview%>" alt="profile photo" width="136" height="138" ng-show="filepreview">
                            </div> 
                        </div>
                        <div class="form-row" data-ng-if="optionRes.option_attr_detail.front_input=='multiselect'"> 
                            <label><%optionRes.option_attr_desc.name %> </label>
                            <div class="check-wrap">
                                <label ng-repeat="optionValueRes in optionRes.option_attr_value_detail"><input type="checkbox" class="optionValuefield" value="<%optionValueRes.id%>" ng-model="rvCtrl.optionValueCheck[optionValueRes.id]" ng-change="rvCtrl.getPriceByOption($event)"> <span class="chk-label"> <%optionValueRes.attribute_value%> 
                                
                                (<%optionValueRes.price%> <%(optionValueRes.price_type==2)? '%' : rvCtrl.curCode %> ) </span></label>
                            </div>
                        </div>

                    </div>
                </div> 

                <div class="pdetail-row qty"  data-ng-if="rvCtrl.productInfo.prdSubType=='normal'">
                    <span>Qty: </span>
                    <div style="width: 58px;" class="qty-form-input spinner">
                        <input type="text" max="<% rvCtrl.productInfo.totQty %>" min="1" value="1" id="quantity" name="quantity" ng-model="rvCtrl.totalQtyVal" ng-change="rvCtrl.getPriceByOption($event)"  class="form-control input-text qty">
                        <i class=" glyphicon glyphicon-triangle-top" ng-click="rvCtrl.incDcrQuntity(rvCtrl.productInfo.totQty,'up')"></i>
                        <i class="glyphicon glyphicon-triangle-bottom" ng-click="rvCtrl.incDcrQuntity(rvCtrl.productInfo.totQty,'down')"></i>
                    </div>

                    <div class="del-time">@lang('product.delivery_time')
                        <span class="amt"><% rvCtrl.productInfo.delivertime %></span> <span class="day">@lang('product.days')</span>
                    </div>
                </div>

                <div class="contactable-product" data-ng-if="rvCtrl.productInfo.prdSubType=='contactable'">               
                    <div class="write-msg">
                        <form method="post" data-ng-if="rvCtrl.contactProduct == null || rvCtrl.contactProduct.status == '0'"> 
                            <textarea placeholder="Write a Message " ng-model=" rvCtrl.contactMessage" name="message" ng-class="{error: !rvCtrl.contactMessage}"></textarea>
                            <button type="file" ngf-select ngf-accept="'image/*'" ngf-max-height="1000" ngf-max-size="5MB" ngf-pattern="'.jpeg,.jpg,.gif,.png'" ng-model="rvCtrl.contactFiles" id="fileUpdBtn" style="width: 130px">
                                <span class="addfile-icon"><i class="icon-attached"></i> @lang('checkout.add_file')</span>
                            </button>
                            <%rvCtrl.contactFiles.name%>
                        </form>
                        <div data-ng-if="rvCtrl.islogin == 0"><a href="{{ action('HomeController@index') }}" class="btn-md btn-skyblue"><%rvCtrl.productInfo.labelName%></a></div>
                        <div class="contact-msg" data-ng-if="rvCtrl.contactProduct.status == '1'">
                            <%rvCtrl.productInfo.labelMsg%>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- -->
    <div class="product-slide">
        <div class="product-slide-inner">
            <span class="icon-remove product-help-icon"></span>
            <div class="prod-box" data-ng-if="rvCtrl.productInfo.prdType=='blog'">
                <div class="blogger-user">
                    <div class="blog-img">
                        <img src="<%rvCtrl.productInfo.userImg%>" alt="">
                    </div>
                    <div class="blogger-name">
                        <span class="blogger-icon">
                            <img src="images/blogger-icon.png" alt=""> Bloger
                        </span>
                        <h3 class="name"><a href="<%rvCtrl.productInfo.blogUrl%>" target="_self"><%rvCtrl.productInfo.userName%></a> </h3>
                        <div class="btn-row">
                            <a href="<%rvCtrl.productInfo.blogUrl%>" class="btn-md btn-light-blue"> Go to Blog</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" data-ng-if="rvCtrl.productInfo.prdType=='product'">
                <div class="" data-ng-if="rvCtrl.productInfo.prdSubType=='normal'">
                    <div class="prod-box shop-detail-container">
                      <div class="product-shop-img"><a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><img ng-src="<% rvCtrl.productInfo.shop_img_url%>" width="72" height="72" alt=""></a></div>
                      <div class="product-shop-name">
                          <div class="shop-icon">
                            <span><a href="<% rvCtrl.productInfo.shop_url %>"> <img src="images/shop-icon.svg" alt=""> @lang('product.shop')</a></span>  
                          </div>
                          <h3 class="shop-name"><a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><% rvCtrl.productInfo.shop_name %></a></h3>
                          <span>@lang('checkout.last_update')</span> <span class="update-time"><%rvCtrl.productInfo.shop_up_date%></span>
                          <div class="btn-row">
                              <a href="<% rvCtrl.productInfo.shop_url %>" class="btn-md btn-skyblue">@lang('product.go_to_shop')</a>
                          </div>
                      </div>
                      <div class="shop-detail">
                          <div class="shop-detail-column">
                              <span>@lang('product.rating')</span>
                              <div class="five-star">
                                  <img src="images/five-star.png" alt="Five star">
                                  <img src="images/five-star.png" alt="Five star">
                                  <img src="images/five-star.png" alt="Five star">
                                  <img src="images/five-star.png" alt="Five star">
                                  <img src="images/five-star.png" alt="Five star">
                              </div>
                          </div>
                          <div class="shop-detail-column">
                              <span>@lang('product.product_list')</span>
                              <span class="block"><%rvCtrl.productInfo.shopTotProduct%></span>
                          </div>
                          <div class="shop-detail-column">
                              <span>@lang('product.shipping')</span>
                              <span class="block"><%rvCtrl.productInfo.shipping%>%</span>
                          </div>
                          <div class="shop-detail-column">
                              <span>@lang('product.response')</span>
                              <span class="block">100%</span>
                          </div>
                      </div>
                    </div>
                </div>
                <div class="contactable-product" data-ng-if="rvCtrl.productInfo.prdSubType=='contactable'">
                    <div class="shop-name-owner">
                        <div class="shop-name">
                            <span class="shop-img">
                                <a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><img ng-src="<% rvCtrl.productInfo.shop_img_url %>" width="70" alt=""></a>
                            </span>
                            <div class="shop-nameContent">
                                <span class="sname"><a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><% rvCtrl.productInfo.shop_name %></a></span>
                                <span class="update">@lang('checkout.last_update')</span>
                                <a href="javascript:void(0)" class="update-time"><% rvCtrl.productInfo.shop_up_date %></a>
                            </div>
                        </div>
                        <div class="shop-owner">
                            <span class="owner-img">
                                <a href="javascript:;"><img ng-src="<% rvCtrl.productInfo.userImg %>" width="72" height="72" alt=""></a>
                            </span>
                            <div class="ownerContent">
                                <span>@lang('checkout.shop_owner')</span>
                                <a href="javascript:;" class="sname"><% rvCtrl.productInfo.userName %></a>
                                <a href="javascript:void(0)" class="owner-follow">@lang('checkout.follow')</a>
                            </div>
                        </div>
                    </div>

                    <div class="rating-response">
                        <div class="res-column">
                            <span>Rating</span>
                            <div class="five-star">
                                <img src="images/five-star.png" alt="Five star">
                                <img src="images/five-star.png" alt="Five star">
                                <img src="images/five-star.png" alt="Five star">
                                <img src="images/five-star.png" alt="Five star">
                                <img src="images/five-star.png" alt="Five star">
                            </div>
                        </div>
                        <div class="res-column">
                            <span>Product List</span>
                            <span class="shop-count">2</span>
                        </div>
                        <div class="res-column">
                            <span>Shipping </span>
                            <span class="shop-count">0%</span>
                        </div>
                        <div class="res-column">
                            <span>Customer Respon</span>
                            <span class="shop-count">100%</span>
                        </div>
                    </div>

                    <div class="address">
                        <h3>@lang('checkout.shop_address')</h3>
                        <div ng-bind-html="rvCtrl.bindShopAddrs"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- -->

    <div id="complainToLcs" class="modal modal-complain fade in" role="dialog">
        <div class="modal-dialog modal-md complain-modal">
        <div class="modal-content">
            <div class="modal-header">
                <a href="javascript:void(0)">
                    <img src="{{ GeneralFunctions::getSiteLogo('SITE_LOGO_HEADER') }}" alt="logo" height="33">      
                    <span class="heading">@lang('product.complain_to_lcs')</span>
                </a>                    
                <span class="pull-right icon-remove" data-dismiss="modal"> </span>          
            </div>
            <div class="modal-body div-content">
                <form method="post" action="{{ action('Seller\ProductDetailController@complainToLcs') }}" id="add-complain">
                {{ csrf_field() }}
                <input type="hidden" name="shop_id" value="<% rvCtrl.productInfo.shop_id %>">
                <input type="hidden" name="product_id" value="<% rvCtrl.productInfo.id %>">
                    <div class="form-row" ng-repeat="compType in rvCtrl.complainType">
                    
                    <label class="radio-wrap">
                            <input name="reportetc" type="radio" value="<%compType.id%>" checked="checked">
                            <span class="radio-label"><%compType.type_name.title%></span>
                    </label>
                </div>

                    <div class="msg-wrapper">
                        <div class="msg-box">
                            <textarea name="message"></textarea>
                            <p id="message" class="error-msg"></p>
                            <!-- <div class="mt-5 mb-5"><img class="profile-pic img-circle" src="images/upload-blank.jpg" width="150" height="150" /></div> -->
                            <div class="file-wrapper">
                                <input type="file" name="complainFile" class="file-upload" accept="image/*">
                                <span class="add-file">@lang('product.add_file')</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <input type="button" class="submit-popup btn-md btn-skyblue pull-right" value="Send">
                    </div>
                </form>

            </div>
        </div>
        </div>
    </div>
    {!!PopUpHelpers::showBoardpopUp()!!}
        
    <div class="sticky-footer">
      <div class="fcolumn btn-group dropup share-social">
        <span class="glyphicon glyphicon-option-horizontal dropdown-toggle" data-toggle="dropdown"></span>
         <ul class="dropdown-menu">
            <li><i class="icon-product-link hover like" ng-click="rvCtrl.updateProductLike('remove',$event)" data-ng-if="rvCtrl.productInfo.userLike > 0"></i> <i class="icon-product-link hover" ng-click="rvCtrl.updateProductLike('like',$event)" data-ng-if="rvCtrl.productInfo.userLike == ''"></i> @lang('product.like_product')</li>

            <li  data-target="#spinPop1" data-toggle="modal" id="spinDataModalBtn" ng-click="rvCtrl.openSpinDataModal(rvCtrl.productInfo.prd_src ,rvCtrl.productInfo.prd_name,rvCtrl.productInfo.id)"><i class="icon-product-spin"></i> @lang('product.spin_it')</li>

            <li data-target="#productsharepopup" data-toggle="modal" ng-click="rvCtrl.friendsData()"><i class="icon-share-social"></i> @lang('product.share')</li>
          </ul>
      </div>
      <div class="fcolumn"> <i class="icon-large icon-conversation"></i></div>
      <div class="pull-right" data-ng-if="rvCtrl.productInfo.prdType=='product'">
        <div class="price fcolumn">
          <span class="discount"><%rvCtrl.productInfo.productPrice%></span> {{session('default_currency_code')}}
        </div>
        <div class="fcolumn addtocart">
          <button class="btn-md btn-skyblue">@lang('product.take_it_bag')</button>
        </div>
        <div class="fcolumn addtoShoppingBag" data-ng-if="rvCtrl.productInfo.prdSubType=='normal'">
            <button class="btn-md btn-skyblue" data-ng-if="rvCtrl.productInfo.totQty > 0 && rvCtrl.islogin == 1" ng-click="rvCtrl.addToCartHandler()">@lang('checkout.add_to_shopping_bag')</button>

            <a class="btn-md btn-skyblue" data-ng-if="rvCtrl.islogin==0" href="{{ action('HomeController@index') }}">@lang('checkout.add_to_shopping_bag')</a>

        </div>
        <span data-ng-if="rvCtrl.productInfo.prdSubType=='contactable'">
            <div class="fcolumn addtoShoppingBag" data-ng-if="rvCtrl.contactProduct == null || rvCtrl.contactProduct.status == '0'">

                <button class="btn-md btn-skyblue" ng-click="rvCtrl.contactNonSalableProduct()"><%rvCtrl.productInfo.labelName%></button>
        </div>
        </span>
        
      </div>
    </div>
</div>

<script type="text/javascript">
    jQuery(document).ready(function(){ 
      jQuery('.addtoShoppingBag').hide();
      setTimeout(function(){
        jQuery('.product-slick').slick({
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          lazyLoad: 'ondemand',
          lazyLoadBuffer: 0,
          adaptiveHeight: true
        });
       },100);
    });
</script>

