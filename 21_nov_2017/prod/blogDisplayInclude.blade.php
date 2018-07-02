<!-- Carosel -->
<div class="container">
  <div class="row">
    <div class="col-sm-6 product-main-img">
      <div class="product-media">
        <div class="zoom-gallery" ng-if="rvCtrl.productImg.length > 0">
            <div class="selectors vertical-thumb MagicScroll magic-slider">
                <a data-slide-id="zoom" ng-repeat ="imgItm in rvCtrl.productImg track by $index" class="active"  href="<%imgItm.original %>" data-image="<% imgItm.large %>" data-zoom-id="zoom-v">
                    <img ng-src="<% imgItm.thumb %>"/>
                </a>
                <a href="#" data-slide-id="video-1" ng-repeat="vdo in rvCtrl.productVideo track by vdo.id" ng-click="thumbimagevedio($event,'video',vdo.site,vdo.vid)">
                    <span class="glyphicon glyphicon-play"></span>
                    <img ng-src="<%vdo.thumb_small%>" alt="<%vdo.title%>"/>
                </a>   
                 
            </div>

            <div class="product-main-img">

                <div data-slide-id="zoom" class="zoom-gallery-slide active">
                    <a href="<%rvCtrl.productImg[0].original%>" class="MagicZoom" id="zoom-v">
                        <img ng-src="<%rvCtrl.productImg[0].large%>"/>
                    </a>
                </div>
                <div data-slide-id="video-1" class="zoom-gallery-slide video-slide" ng-show="!rvCtrl.activeimgprevtab">
                  <iframe width="560" height="515" ng-src="<% rvCtrl.prdvideourl | trustAsResourceUrl%>" frameborder="0" allowfullscreen></iframe>        
                </div>

            </div>
            
        </div>
        <div class="image" ng-if="rvCtrl.productImg.length < 1">
          <img src="{{ GeneralFunctions::getPaceholderImage('PRODUCT_IMAGE_572') }}">
        </div>
      </div>
    </div>
    <div class="col-sm-6 product-detail-right">
      
    <div class="prod-box blog-detail"  data-ng-if="rvCtrl.productInfo.prdType=='blog'">

      <div class="blog-heading">
        <h2><% rvCtrl.productInfo.prd_name %> <span class="blog-date"><% rvCtrl.productInfo.created_at %></span></h2>
      </div>

      <div class="plike-row blog-plike">
        <div class="plike-column">
          <span class="icon-product-link hover like" ng-click="rvCtrl.updateProductLike('remove',$event)" data-ng-if="rvCtrl.productInfo.userLike > 0"></span>
          <span class="icon-product-link hover" ng-click="rvCtrl.updateProductLike('like',$event)" data-ng-if="rvCtrl.productInfo.userLike == ''"></span><% rvCtrl.productInfo.total_likes %>
        </div>
        <div class="plike-column">
         <span data-target="#spinPop1" data-toggle="modal" id="spinDataModalBtn" class="icon-product-spin" ng-click="rvCtrl.openSpinDataModal(rvCtrl.productInfo.prd_src ,rvCtrl.productInfo.prd_name,rvCtrl.productInfo.id)"><span>@lang('product.spin_it')</span> <% rvCtrl.productInfo.total_spins %>
        </div>
        <div class="plike-column">
          <span class="icon-share-social" data-target="#productsharepopup" data-toggle="modal" ng-click="rvCtrl.friendsData()"></span><% rvCtrl.productInfo.total_shares %>
          {!!PopUpHelpers::ShareFriendspopUp('productsharepopup','rvCtrl.', 'productDisplay')!!}
        </div> 
        <div class="plike-column">
          <span class="icon-product-review">
            <span class="path1"></span><span class="path2"></span>
          </span> <% rvCtrl.productInfo.blog_ttl_comment %> @lang('product.comment')
        </div>          
      </div>    

      <div class="shop-name-owner">
        <div class="shop-name" ng-if="rvCtrl.productInfo.shop_url">
            <span class="shop-img">
                <a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><img ng-src="<% rvCtrl.productInfo.shop_img_url %>" width="70" alt=""></a>
            </span>
            <div class="shop-nameContent">
                <span class="sname"><a href="<% rvCtrl.productInfo.shop_url %>" target="_self"><% rvCtrl.productInfo.shop_name %></a></span>
                <span class="update">@lang('checkout.last_update')</span>
                <span class="update-time"><% rvCtrl.productInfo.shop_updated_at %></span>
            </div>
        </div>
        <div class="shop-owner">
            <span class="owner-img">
                <a href="<% rvCtrl.productInfo.user_board_url %>"><img ng-src="<% rvCtrl.productInfo.userImg %>" width="72" height="72" alt=""></a>
            </span>
            <div class="ownerContent">
                <span>@lang('checkout.shop_owner')</span>
                <a href="<% rvCtrl.productInfo.user_board_url %>" class="sname"><% rvCtrl.productInfo.userName %></a>
                <a href="javascript:void(0)" class="owner-follow">@lang('checkout.follow')</a>
            </div>
        </div>
      </div>
  </div> 

  <div class="prod-box shop-blog-owner">
    <div class="shop-owner">
      <span class="owner-img">
        <a href="<% rvCtrl.productInfo.blogger_url %>"><img src="<% rvCtrl.productInfo.blogger_image %>" alt=""></a>
      </span>
      <div class="ownerContent">
        <span class="pull-right blog-icon">
          <a href="<% rvCtrl.productInfo.blogger_url %>">
            <img src="images/blogger-icon.png" alt="">@lang('product.blogger')
          </a>
        </span>
        <h3><a href="<% rvCtrl.productInfo.blogger_url %>"><% rvCtrl.productInfo.blogger_name %></a></h3>
        
        <div class="gotoshop">
          <a href="<% rvCtrl.productInfo.blogger_url %>" class="btn-md btn-light-blue">@lang('product.go_to_blog')</a>
          <!-- <a href="javascript:void(0)" class="owner-follow">@lang('product.follow')</a> -->
        </div>
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
       <h3 class="border">@lang('blog.blog_info')</h3>
       <p ng-bind-html="rvCtrl.productInfo.prd_desc | unsafe"></p>
     </div>
  </div>

  <!--blog comment-->
  <div class="prod-box" id="comment_main">
    <input type="hidden" id="loader_url" value="{{ Config::get('constants.loader_url').'loading.gif' }}">
    <input type="hidden" id="blog_id" value="<%rvCtrl.productInfo.id%>">
    <div class="review rmvBorder">
      <h2>@lang('product.comments')</h2>
      <div class="view-all-comment">        
        <!-- <a href="#">View All Previous Comments</a> -->
        @if(Auth::check())
          <div class="boxWrite-reply clearfix">
            <div class="user-writeimg ">
              <img src="{{ Config::get('constants.users_url').Auth::user()->image }}" alt="{{ Auth::user()->display_name?Auth::user()->display_name:Auth::user()->name }}" width="52">
            </div>
            <div class="wrapper-reply">
              <input placeholder="Write a Reply" type="text" class="wr-placeholder" data-attribute="0" value="">
              <input value="Comment" class="btn-md btn-skyblue writeReplybtn" type="button">
              <span class="error"></span>
            </div>
          </div>
        @endif
      </div>
      @foreach($blog_comment as $comments)

        <div class="review-row bdr-top" id="parent_div_{{ $comments->id }}">
          <div class="userReplycomment clearfix">
            <div class="col-sm-3 review-dp">
              <a href="javascript:void(0);" class="pull-left"><img src="{{ Config::get('constants.users_url').$comments->user->image }}" alt="{{ $comments->user->display_name?$comments->user->display_name:$comments->user->name }}" width="52"></a>
              <div class="review-user-name">
                <h3><a href="javascript:void(0);">{{ $comments->user->display_name?$comments->user->display_name:$comments->user->name }} </a></h3>

                @if(Auth::check())
                  <div class="review-like-reply">               
                    <span class="icon-reply review-reply"><span>@lang('product.reply')</span></span>
                  </div>
                @endif
              </div>
            </div>
            <div class="col-sm-9 review-content">           
              <div class="review-txt">
                <p>{{ $comments->comment }}</p>
              </div>
              <small class="pull-right time">{{ GeneralFunctions::getcommentDateFormat($comments->created_at) }}</small>
            </div>
          </div>
          @if(Auth::check())
            <div class="boxWrite-reply clearfix pLeftReply dpReply">
              <div class="user-writeimg ">
                <img src="{{ Config::get('constants.users_url').Auth::user()->image }}" alt="{{ Auth::user()->display_name?Auth::user()->display_name:Auth::user()->name }}" width="52">
              </div>
              <div class="wrapper-reply">
                <input placeholder="Write a Reply" type="text" class="wr-placeholder" data-attribute="{{$comments->id}}" value="">
                <input value="Comment" class="btn-md btn-skyblue writeReplybtn" type="button">
                <span class="error"></span>
              </div>
            </div>
          @endif        
        </div>

        @if(count($comments->reply) > 0)
        @foreach($comments->reply as $reply)
        <div class="review-row bdr-top pLeftReply">
          <div class="userReplycomment clearfix">
            <div class="col-sm-3 review-dp">
              <a href="javascript:void(0);" class="pull-left"><img src="{{ Config::get('constants.users_url').$reply->user->image }}" alt="{{ $reply->user->display_name?$reply->user->display_name:$reply->user->name }}" width="52"></a>
              <div class="review-user-name">
                <h3><a href="javascript:void(0);">{{ $reply->user->display_name?$reply->user->display_name:$reply->user->name }} </a></h3>
              </div>
            </div>
            <div class="col-sm-9 review-content">           
              <div class="review-txt">
                <p>{{ $reply->comment }}  </p>
              </div>
              <small class="pull-right time">{{ GeneralFunctions::getcommentDateFormat($reply->created_at) }}</small>
            </div>
          </div>     
        </div>
        @endforeach
        @endif

      @endforeach

      <div class="review-row" id="view_more_div">
        <span id="more_span"></span>
        <div class="linkcomments row">
        <div class="col-sm-6">
          <div class="linkblk">
          @if(count($blog_comment) < $comment_count)
          <a href="javascript:void(0);" id="view_more">@lang('product.view_more_comments')</a> <br>
          @endif
          @if(Auth::check())
            <a href="javascript:void(0);" onclick="$(window).scrollTop($('#comment_main').offset().top-62)">@lang('product.write_a_comments')</a>
          @endif
          </div>    
        </div>
        <div class="col-sm-6">
          <div class="linkblk">
          <span><level id="comment_display">{{ count($blog_comment) }}</level> @lang('product.of') {{ $comment_count }}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <!--blog comment ended--> 

</div>

<!--- related produc---->
<div class="compass-item related">
  <h2>@lang('blog.related_blog')</h2>
  {!! LayoutHtml::realtedProductsRender('rvCtrl')!!}  
</div>
{!!PopUpHelpers::showBoardpopUp()!!}
<script type="text/javascript" src="{{Config::get('constants.js_url')}}magicscroll.js"></script>
<script type="text/javascript" src="{{Config::get('constants.js_url')}}magiczoomplus.js"></script>
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
<!--end relatd product -->


