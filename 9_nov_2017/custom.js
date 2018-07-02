/*

 1) For Sidebar left Menu
 2) For Sidebar fixed bottom
 3) For Equal height in login page

 ===============================*/

jQuery(document).ready(function() {
	var winWidht = jQuery(window).width();
	var winHeight = jQuery(window).height();

	// 1) For Sidebar left Menu

	jQuery('.submenu >a').click(function() {
		jQuery(this).find('.glyphicon-menu-down').toggleClass("glyphicon-menu-up");
		jQuery(this).siblings('ul').slideToggle();
		// jQuery(this).find('ul').slideToggle();
	});

	// 2) For Sidebar fixed bottom

	jQuery('.order-bottom-slide').click(function() {
		jQuery(this).toggleClass("glyphicon-menu-up");
		jQuery('.sidebar-fixed-slide').slideToggle();
	});

	// search select 
	
	jQuery('.search-selectitem').change(function(){
		var optionSelected = jQuery(".search-selectitem option:selected").text();
		jQuery('.nav-search-selected .nav-search-text').text(optionSelected);
	});

	//
	jQuery('.b-buyer').parent().addClass('buyer');
	jQuery('.header-top .h-shop-card').click(function() {
		jQuery('.cart-dropdown-wrap').fadeIn();
		jQuery('.cart-dropdown').animate({
			right : '0px'
		});
	});
	jQuery('.header-icon').click(function() {
		jQuery(this).siblings('.menu-wrap-slide').fadeIn();
		jQuery(this).siblings('.menu-wrap-slide').find('.dropdown-menu').animate({
			left : '0px'
		});
	});

	// For sendpopup

	jQuery('.send-dropdown .sendUser_name li').click(function() {
		jQuery(this).parents('.send-dropdown').hide();
		jQuery('.send-share').show();
	});
	jQuery('.send-share .select-user-name .close ').click(function() {
		jQuery(this).parents('.send-share').hide();
		jQuery('.send-dropdown').show();
	});

	// For Search Page

	jQuery('.filter-top .filter-btn').click(function(){
		jQuery('.left-search').addClass('active');
		jQuery('.content').addClass('active');
	});
	jQuery('.close-sidebar').click(function(){
		jQuery('.left-search').removeClass('active');
		jQuery('.content').removeClass('active');
	});
	jQuery('.search-row .search-title').click(function(){
		jQuery(this).find('i').toggleClass('glyphicon-menu-up');
		jQuery(this).siblings('.search-select-item').slideToggle();
	});


	// For add class in product detail 

	// function stickyProduct(){
	// 	var productht = jQuery('.product-detail-right').height();
	// 	var productimg = jQuery('.zoom-img').height();
	// 	var productScoll =  productht - productimg;
	
	// 	if(productht>productimg) {		  
	// 		if(winWidht>767){
	// 			jQuery(window).scroll(function() {					
	// 				if (jQuery(this).scrollTop() > 100) {
	// 					jQuery('.zoom-img').css('position','fixed');
	// 				}
	// 				if (jQuery(this).scrollTop() >= productScoll) {
	// 					jQuery('.zoom-img').css('position','static');
	// 				}													
	// 			});
	// 		}
	// 	}	
	// }
	// jQuery(window).scroll(function(){
	// 	stickyProduct();
	// });
	// jQuery(window).resize(function(){
	// 	stickyProduct();
	// });


	// 3) For count text animation

	jQuery('.count').each(function() {
		//var jQuery(this) = jQuery(this);
		jQuery({
			Counter : 0
		}).animate({
			Counter : jQuery(this).text()
		}, {
			duration : 1500,
			easing : 'swing',
			step : function() {
				var num = Math.ceil(this.Counter).toString();
				if (Number(num) > 999) {
					while (/(\d+)(\d{3})/.test(num)) {
						num = num.replace(/(\d+)(\d{3})/, 'jQuery1' + ',' + 'jQuery2');
					}
				}
				jQuery(this).text(num);
			}
		});
	});

	// onclick show coupon button

	jQuery('.apply-input-group .apply-coupon-btn').click(function(){
		jQuery(this).hide();
		jQuery('.apply-input-group .opencoupon').show();
	}) ;

	// close dropdown

	jQuery('.close').click(function() {
		jQuery(this).parent('.dropdown-menu').hide();
	});

	// click class add

	jQuery('.like span, .review-like').click(function() {
		jQuery(this).toggleClass('like');
	});

	// Add Modal class in choose item at login time

	if(jQuery('#preference-popup').css('display') == 'block') {
	  jQuery('#preference-popup').parents('body').addClass('modal-open');
	}
	else {
	  jQuery('#preference-popup').parents('body').removeClass('modal-open');
	}

	// Help Section

	jQuery('.help-side-btn').click(function(){
		jQuery('#overlay').show();
	});
	jQuery('.help-Newcontent .modal-close-btn').click(function(){
		jQuery('#overlay').hide();
	});

	// Product detail page mobile version

	jQuery('.product-help-icon.icon-info').click(function(){
		jQuery('.product-detail-slide').fadeOut();			
		// jQuery('.product-help-icon.icon-info').hide();
		// jQuery('.product-help-icon.icon-remove').show();
		jQuery('.product-slide').fadeIn();
		jQuery('.product-slide-inner').animate({
			left : '0px'
		});
		jQuery('.addtoShoppingBag').hide();	
		jQuery('.addtocart').show();
	});
	jQuery('.product-help-icon.icon-remove').click(function(){
		// jQuery('.product-help-icon.icon-remove').hide();
		// jQuery('.product-help-icon.icon-info').show();		
		jQuery('.product-slide').fadeOut();
		jQuery('.product-slide-inner').animate({
			left : '-550px'
		});
		jQuery('.addtoShoppingBag').hide();	
		jQuery('.addtocart').show();
	});
	jQuery('.sticky-footer .addtocart').click(function(){
		jQuery(this).hide();
		jQuery('.addtoShoppingBag').show();	
		jQuery('.product-slide').fadeOut();	
		// jQuery('.product-help-icon.icon-remove').hide();
		// jQuery('.product-help-icon.icon-info').show();
		jQuery('.product-detail-slide').fadeIn();	
		jQuery('.product-detail-right').animate({
			left : '0px'
		});
	});
	jQuery('.product-detail-slide .icon-remove').click(function(){
		jQuery(' .product-detail-slide').fadeOut();	
		jQuery('.product-detail-right').animate({
			left : '-550px'
		});
		jQuery('.addtoShoppingBag').hide();	
		jQuery('.addtocart').show();	
	});
	// product detail hide show for Mobile
	jQuery('.mobile-product-detail').siblings('.breadcrumb-wrapper').hide();

	jQuery('.accordian').unbind().click(function(e){
		e.stopPropagation();
		jQuery(this).find('i').toggleClass('icon-minus');
		jQuery(this).siblings().slideToggle();
	});
	
	
	// Back to Top

	// jQuery(function() {
	// 	jQuery(window).scroll(function() {
	// 		if (jQuery(this).scrollTop() > 200) {
	// 			jQuery('a.top-page').fadeIn();
	// 		} else {
	// 			jQuery('a.top-page').fadeOut();
	// 		}
	// 	})
	// 	jQuery("a.top-page").click(function() {
	// 		jQuery("html, body").animate({
	// 			scrollTop : 0
	// 		}, "slow");
	// 		return false;
	// 	});
	// });
	

	// For left sidebar shop page

	var leftSide = jQuery('.left-sidebar').height();
	leftsp = leftSide - winHeight;
	//alert(leftsp);

	if (winWidht > 767) {

		var sidHeight = jQuery('#sidebar').height();
		jQuery('#sidebar').siblings('.content-section').addClass('sidebar-page');
		jQuery('.sidebar-page').css('min-height', sidHeight);

		// jQuery('.left-sidebar').height(winHeight);

		jQuery(function() {
			jQuery(window).scroll(function() {
				if(sidHeight<winHeight) {
					jQuery('.left-sidebar').addClass('sider-fixed-top');
				}
				if (jQuery(this).scrollTop() > leftsp) {
					jQuery('.left-sidebar').addClass('sider-fixed');
					jQuery('.left-sidebar').css('top', '-leftsp');
				} else {
					jQuery('.left-sidebar').removeClass('sider-fixed');
				}
			})
		});
	}

	jQuery('.menu .glyphicon-menu-right').click(function() {
		jQuery(this).toggleClass('glyphicon-menu-down');
		jQuery(this).siblings('.submenu-category').slideToggle();
	});

	// For Cart expand button

	jQuery('.cart-table .expand').on('click', function() {
		if (jQuery(this).hasClass('shrink')) {
			jQuery(this).removeClass('shrink');
			jQuery(this).html('Expand All');
			jQuery(this).siblings('.cart-item-container').animate({
				"max-height" : 400
			}, 500);
		} else {
			jQuery(this).addClass('shrink');
			jQuery(this).siblings('.cart-item-container').animate({
				"max-height" : 2000
			}, 1000);
			jQuery(this).html('Shrink');
		}
	});

	// Delete cart row

	jQuery('.delete-cart-item').click(function() {
		jQuery(this).parents('.cart-item-list').hide();
	});
	jQuery('.cart-box .icon-remove').click(function() {
		jQuery(this).parent('.cart-box').hide();
	});

	// For filter menu

	//   For Filter dropdown

	jQuery(function() {
		jQuery(".dropdown-menu > li > a.trigger").on("click", function(e) {
			var current = jQuery(this).next();
			var grandparent = jQuery(this).parent().parent();
			if (jQuery(this).hasClass('left-caret') || jQuery(this).hasClass('right-caret'))
				jQuery(this).toggleClass('right-caret left-caret');
			grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
			grandparent.find(".sub-menu:visible").not(current).hide();
			current.toggle();
			e.stopPropagation();
		});
		jQuery(".dropdown-menu > li > a:not(.trigger)").on("click", function() {
			var root = jQuery(this).closest('.dropdown');
			root.find('.left-caret').toggleClass('right-caret left-caret');
			root.find('.sub-menu:visible').hide();
		});
	});

	// Tree Menu

	jQuery(function() {
		jQuery('.tree li:has(ul)').addClass('parent_li').find(' > a .menuIcon').attr('title', 'Collapse');
		jQuery('.tree li.parent_li > a .menuIcon').on('click', function(e) {
			e.preventDefault();
			var children = jQuery(this).parent().parent('li.parent_li').find(' > ul ');
			if (children.is(":visible")) {
				children.hide('fast');
				jQuery(this).attr('title', 'Expand').addClass('glyphicon-plus').removeClass('glyphicon-minus');
			} else {
				children.show('fast');
				jQuery(this).attr('title', 'Collapse').addClass('glyphicon-minus').removeClass('glyphicon-plus');
			}
			e.stopPropagation();
		});
	});

	// For popup hide show
	jQuery(document).on('click', '.addBoard', function() {
		jQuery('.new-board-pane').animate({
			'right' : 0
		});
	});
	jQuery(document).on('click', '.new-board-pane .closeBoard', function() {
		jQuery('.new-board-pane').animate({
			'right' : -350
		});
	});
	// For hide menu in mobile

	if (winWidht < 768) {
		jQuery('#menu').mmenu();
	}

	// Prevent auto close dropdown in header 

	jQuery('.header-top .dropdown .dropdown-menu').on('click', function(event){
	    event.stopPropagation();
	});

	// for height search page

	var searchHt= winHeight -100;
	if(winWidht > 767) {
		jQuery('.left-search + .content').css('min-height',searchHt);
	}
		

	/* 
		For file upload image 
	===============================*/	

	jQuery('.shipment-browse-btn input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;  
        jQuery('.shipment-img-name').html(fileName);          
 	});

 	jQuery('.file-wrapper input[type="file"]').change(function(e){
        var fileName = e.target.files[0].name;  
        jQuery('.file-wrapper .add-file').html(fileName);          
 	});


 	jQuery('.product-shop-name .menu-icon ').click(function(){
 		// jQuery(this).toggleClass('mbMobile');
 		jQuery('.left-menu-container').slideToggle();
 	});

	

	// jQuery('.menu-wrapper .close ').click(function(){

	// 	jQuery('body').removeClass('.mm-opened .mm-blocking .mm-background .mm-opening');
	// 	jQuery('.menu-wrapper').removeClass('.mm-opened');
	// });
		

	// choosen

	// jQuery('.select').chosen();
	// var Event_Type = 'ontouchend' in document ? 'touchend' : 'click';
	// jQuery(document).on(Event_Type, 'div.qty-form-input i', function(event) {
	// 	event.preventDefault();
	// 	var textVal = 0;
	// 	if (jQuery(this).hasClass('glyphicon-triangle-top')) {
	// 		textVal = parseInt(jQuery('div.qty-form-input #quantity').val());
	// 		var maxVal = parseInt(jQuery('div.qty-form-input #quantity').attr('max'));
	// 		if (textVal < maxVal) {
	// 			textVal++;
	// 			jQuery('div.qty-form-input #quantity').val(textVal);
	// 		}
	// 	} else if (jQuery(this).hasClass('glyphicon-triangle-bottom')) {
	// 		textVal = parseInt(jQuery('div.qty-form-input #quantity').val());
	// 		var minVal = parseInt(jQuery('div.qty-form-input #quantity').attr('min'));
	// 		if (textVal > minVal) {
	// 			textVal--;
	// 			jQuery('div.qty-form-input #quantity').val(textVal);
	// 		}
	// 	}
	// })

	jQuery(document).on('keyup', '#quantity', function(e) {
		var maxVal = parseInt(jQuery(this).attr('max'));
		if (jQuery(this).val() > maxVal && e.keyCode != 46 && e.keyCode != 8) {
			e.preventDefault();
			jQuery(this).val(maxVal);
		}
	})
	jQuery('body').on('click', '.dropheader .close', function() {
		jQuery('.cart-dropdown-wrap').fadeOut();
		jQuery('.cart-dropdown').animate({
			right : '-425px'
		});
	});
	jQuery('body').on('click', '.menu-wrap-slide .close', function() {
		jQuery('.menu-wrap-slide').fadeOut();
		jQuery('.menu-wrap-slide .dropdown-menu').animate({
			left : '-550px'
		});
	});

	jQuery('.currencySwitch').change(function() {
		var currencyId = jQuery(this).val();
		$.get(siteUrl + '/switchCurrency', {
			currencyId : currencyId
		}, function(res) {
			if (res == '1') {
				location.reload();
			}
		})
	})
	/******This section used for zoomer and modal controller for product detail page and home page*****/
	if(jQuery('#img_01').length)
		zoomSlideEnable();


});
/****This function used for Controlle Zoom and slide****/
zoomSlideEnable =(newURL)=> {
	console.log('zoomSlideEnable');
	jQuery("#img_01").elevateZoom({
		gallery : 'gallery_01',	cursor : 'pointer',galleryActiveClass : 'active',imageCrossfade : false,
		responsive : true,easing : true,zoomWindowFadeIn : 500,zoomWindowFadeOut : 500,
		lensFadeIn : 300,lensFadeOut : 300
	});
	if(typeof newURL!=='undefined'){
		jQuery("#img_01").data('zoom-image', newURL).elevateZoom({
			gallery : 'gallery_01',	cursor : 'pointer',galleryActiveClass : 'active',imageCrossfade : false,
			responsive : true,easing : true,zoomWindowFadeIn : 500,zoomWindowFadeOut : 500,
			lensFadeIn : 300,lensFadeOut : 300
		});
	}
};
zoomSlideDisable = ()=>{
	jQuery.removeData(jQuery('#img_01'), 'elevateZoom');
	jQuery('.zoomContainer').remove();
};
/**This function used for update image in modal on spinit***/
openSpinData = (prodtImg,prodtName,prodtId)=>{
	jQuery('#createboard input[type="text"]').val('');
	jQuery('#createboard textarea').val('');
	jQuery('.spin-img img').attr('src', prodtImg);
	jQuery('.spin-prod-name a').text(prodtName);
	jQuery('.spin-img img').attr('proid',prodtId);
}
/******This function used for show hide loader********/
showHideLoader = (type,atrId)=>{
	if(type=='hide')
		jQuery('#'+atrId).css({'display' : 'none'});
	else
		jQuery('#'+atrId).css({'display' : 'block'});
};


// 3) Hide Show History

jQuery('.hideHistory').click(function(){
	jQuery('.history-list').slideToggle();
	if(jQuery(this).text() == 'Hide History'){
	  jQuery(this).text('Show History');
	} 
	else {
	  jQuery(this).text('Hide History');
	}		
});


//Slick slider

if (jQuery(window).width() < 768) {
	jQuery(document).ready(function(){	
		 jQuery(".center").slick({
	        dots: false,
	        infinite: false,        
	        slidesToShow: 3,
	        slidesToScroll: 1,
	        variableWidth: true,
	      });
	});
}

// Fuction for custom on off slide
// jQuery(document).ready(function(){
// 	if(jQuery('.myonoffswitch input').is(':checked')){
// 			alert('test');			
// 			jQuery('.onofftravelbox').addClass('travelon-onoff');
// 			jQuery('.myonoffswitch-circle').addClass('circletravel');
// 	}
// 	else {
// 		jQuery('.onofftravelbox').removeClass('travelon-onoff');
// 		jQuery('.myonoffswitch-circle').removeClass('circletravel');
// 	}	
// });	

jQuery(document).on('click','.myonoffswitch',function(){
	if(jQuery(".myonoffswitch input").is(':checked')){		
		jQuery('.onofftravelbox').toggleClass('travelon-onoff');
		jQuery('.myonoffswitch-circle').toggleClass('circletravel');
	}
	else {
		jQuery('.onofftravelbox').removeClass('travelon-onoff');
		jQuery('.myonoffswitch-circle').removeClass('circletravel');
	}	
});	

jQuery(document).on('click','.mbSlide',function(){		
	jQuery('.mbSlide').toggleClass('mbMobile');		
	jQuery('#left-sidebar').toggleClass('sellerboxMenu');
});	





// Hide Header on on scroll down

			
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = jQuery('.mbheader-bottom').outerHeight();

	jQuery(window).scroll(function(event){		
	    didScroll = true;
	});

	setInterval(function() {	
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	function hasScrolled() {	
	    var st = jQuery(this).scrollTop();
	    
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) < delta)
	        return;
	   
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (st >= lastScrollTop && st >= navbarHeight){
	    	// Scroll Down
	        jQuery('.mbheader-bottom').removeClass('nav-down').addClass('nav-up');
	    } 
	    else {
	        // Scroll Up
	       // if(st + jQuery(window).height() <= jQuery(document).height()) {
	        	jQuery('.mbheader-bottom').removeClass('nav-up').addClass('nav-down');
	       // }
	    }
	    
	    lastScrollTop = st;
	}


if (jQuery(window).width() < 768) {
	// Function for Buyer Menu Click on mobile
	jQuery(".buyer-menu > li a").on("click", function(e) {		
		jQuery(".buyer-submenu").removeClass("buyerBlock-menu");
		if (jQuery(this).next().hasClass('buyer-submenu')) {			
			e.preventDefault();
			jQuery(this).next(".buyer-submenu").toggleClass("buyerBlock-menu");
		} else{			
			jQuery(".buyer-submenu").removeClass("buyerBlock-menu");
		}		
		var mbSlideMenu = jQuery(".buyerBlock-menu").offset().left;
		var slkoffset = mbSlideMenu;			
		jQuery(".buyerBlock-menu").css("margin-left", "-"+slkoffset+"px");
	});


	jQuery(".blogger-menu > li a").on("click", function(e) {		
		jQuery(".buyer-submenu").removeClass("buyerBlock-menu");
		if (jQuery(this).next().hasClass('buyer-submenu')) {			
			e.preventDefault();
			jQuery(this).next(".buyer-submenu").toggleClass("buyerBlock-menu");
		} else{			
			jQuery(".buyer-submenu").removeClass("buyerBlock-menu");
		}		
		var mbSlideMenu = jQuery(".buyerBlock-menu").offset().left;
		var slkoffset = mbSlideMenu;			
		jQuery(".buyerBlock-menu").css("margin-left", "-"+slkoffset+"px");
	});



	//Seller Tab in Mobile view function
	jQuery(document).on('click','.content-info-list li a',function(){
		jQuery('.content-info-list li').each(function(){			
			jQuery(this).removeClass('active');	
		})
		jQuery(this).parent('li').addClass('active');
	});

}


// Animation box script

var closeFn;
	function closeShowingModal(liked) {
		if (liked !== undefined) {
			_gaq.push(['_trackEvent', 'ctajs', liked ? 'liked' : 'unliked']);
		}
		var showingModal = document.querySelector('.modalHelp.show');
		if (!showingModal) return;
		showingModal.classList.remove('show');
		// document.body.classList.remove('disable-mouse');
		document.body.classList.remove('disable-scroll');
		if (closeFn) {
			closeFn();
			closeFn = null;
		}
	}
	document.addEventListener('click', function (e) {
		var target = e.target;
		try{
			if (target.dataset.ctaTarget) {
				_gaq.push(['_trackEvent', 'ctajs', 'modal']);
				closeFn = cta(target, document.querySelector(target.dataset.ctaTarget), { relativeToWindow: true }, function showModal(modal) {
					modal.classList.add('show');
					// document.body.classList.add('disable-mouse');
					if (target.dataset.disableScroll) {
						document.body.classList.add('disable-scroll');
					}
				});
			}
			else if (target.classList.contains('modal-close-btn')) {
				console.log('sd hf f sd')
				closeShowingModal();
			}
	    }catch(e){
	    	console.log("error: " + e);
	    }
	});
	document.addEventListener('keyup', function (e) {
		if (e.which === 27) {
			closeShowingModal();
		}
	})


// For button animation
if (location.host.indexOf('localhost') === -1) {
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-19798102-1']);
	_gaq.push(['_trackPageview']);
}

/******This load used for filter page ******/
Loader = (type)=>{ 
	if(!jQuery('#commanLoader').length) return;
	if(type=='hide') document.getElementById('commanLoader').style.display = "none"; 
    else document.getElementById('commanLoader').style.display = "block"; 
};
jQuery(document).on('mouseup',function(e){
	if(!jQuery(".left-search").length) return;
    let container = jQuery(".left-search");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && container.hasClass('active')){
    	container.removeClass('active');
    	if(jQuery('.content-wrapper .content').hasClass('active'))jQuery('.content').removeClass('active');
    }
});




jQuery(document).ready(function(){
	// Add Class

	 jQuery('#people .create-board-icon').parent().parent().parent().addClass('additem');
})




// jQuery(document).click(function(){
//     jQuery('.ms-li').hide();
//     jQuery('.bg-change').hide();
    
// });

// jQuery(document).ready(function(){

// 	jQuery(".ms-nav").click(function(e){
// 		jQuery('.ms-li').how();
//     	jQuery('.bg-change').show();
// 	    e.stopPropagation();
// 	});

// 	jQuery('.ms-main').click(function(){
		
// 	});
// });



// window.addEventListener('click', function(e){
	
// 	if (jQuery('.ms-nav li ').contains(e.target)){
//   	alert("Clicked in Box");
//   } else{
//   	alert("Clicked outside Box");
//   }
// })