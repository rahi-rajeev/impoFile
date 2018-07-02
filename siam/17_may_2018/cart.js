//global variable
var deliveryPrice = 0;

//checking page type shopping cart || checkout
var is_cart_page = 'N';
var page_type_len = $('#page_type').length;
if(page_type_len > 0 && $('#page_type').val() == 'shoppingcart') {
    is_cart_page = 'Y';
}

// update product quantity
jQuery('.txtQuantity').change(function(){

    var id = $(this).closest('tr.cart-item-list').attr('id');
    var split = id.split('-');
    var cartId = split[1];
    var quantity = $(this).val();
    var is_int = Number.isInteger(Number(quantity));

    if(is_int == false || quantity == 0){
        alert('invalid Input');
        $(this).val(1);
        quantity = 1;
    }

    var shipAddressId = 0;

    var data = {cartId:cartId, quantity:quantity, shipAddressId:shipAddressId};

    showHideLoader('showLoader');

    callAjaxRequest(updateCart,"post",data,function(result){
        var response = jQuery.parseJSON(result); 
        //console.log(response);

        $('#totalCartProduct').html(response.cart_count_num);

        if(response.type=='error'){
            alert(response.msg);
        }else{
            //alert(response.ordAmount);
            $('#unitPrice_'+cartId).html(response.unitPrice);
            $('#productTotal_'+cartId).html(response.cartPrice);
            $('#orderTotal').html(response.sumOfCart);
            $('#shopPromo').html(response.shop_promo);
            $('#promoMsg').html(response.promo_name);
            $('#promoAmt').html(response.shop_promo);
            $('#deliveryTotal').html('0.00');
            $('#grandTotal').html(response.ordAmount);            
            if(response.shop_promo > 0) {
                $('#promo_div').show();
            }
            else {
                $('#promo_div').hide();
            }              
        }

        cleanCoupon();        
        showHideLoader('hideLoader');
    });
});

// remove item from cart
jQuery('body').on('click','.icon-cart-remove',function(event){

    var cartId = $(this).attr('val');
    var alertMsg = langMsg.are_you_sure_want_to_delete;

    swal({
        title: alertMsg, type: "warning", showCancelButton: true,
        confirmButtonColor: '#DD6B55'
    }).then(function(result) {
        showHideLoader('showLoader');
        var data = {cartId:cartId};
        callAjaxRequest(removeCart,"post",data,function(result){
            var response = jQuery.parseJSON(result); 

            $('#totalCartProduct').html(response.totCart);

            if(response.delete == 'cart'){
                $('#cartSection-'+cartId).html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
                $('#orderTotal').html(response.sumOfCart);
                $('#shopPromo').html(response.shop_promo);
                $('#promoMsg').html(response.promo_name);
                $('#promoAmt').html(response.shop_promo);
                $('#deliveryTotal').html('0.00');
                $('#grandTotal').html(response.ordAmount);
                if(response.shop_promo > 0) {
                    $('#promo_div').show();
                }
                else {
                    $('#promo_div').hide();
                }                  
            }else{
                $('#orderSection').html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
            }

            cleanCoupon();             
            showHideLoader('hideLoader');
        });

    },function(dismiss) {
        showHideLoader('hideLoader');
        return false;
    });
});

// apply coupon
jQuery('body').on('click','#coupon_code_button',function(event){

    var error = 0;

    if(is_cart_page === 'N') {

        var shipAddress = $('#dd_shipping').val();
        if(shipAddress == ''){
            error = 1;
            $('#shippingAddress').html(langMsg.select_shipping_address);
        }else{
            $('#shippingAddress').html('');
        }

        var shipProfile = jQuery('input[name=shipProfileMethod]:checked').val();
        if(typeof shipProfile == 'undefined'){
            error = 1;
            jQuery('#shipProfileMethod').html(langMsg.select_shipping);
        }else{
            jQuery('#shipProfileMethod').html('');
        }

        var payment = $('#sel-pay-method').val();
        if(payment == ''){
            error = 1;
            jQuery('#payMethod').html(langMsg.select_payment_method);
        }else{
            jQuery('#payMethod').html('');
        }
    }    

    var coupon_code = $.trim(jQuery('#coupon_code').val());

    jQuery('#coupon_div').removeClass('error');
    jQuery('#coupon_error').html('');
    if(coupon_code == '') {
        error = 1;
        jQuery('#coupon_div').addClass('error');
        jQuery('#coupon_error').html('Please enter coupon code');
    }

    if(error == 1){
        return false;
    }    

    var orderId = jQuery('#orderId').val();
    //alert(coupon_code+'===='+orderId);return;

    var data = {coupon_code:coupon_code, orderId:orderId};

    callAjaxRequest(applyCoupon,"get",data,function(result){
        var response = jQuery.parseJSON(result);
        if(response.type == 'false'){
      
            jQuery('#coupon_div').addClass('error');
            jQuery('#coupon_error').removeClass('success').addClass('error');
            jQuery('#coupon_error').html(response.text_msg);
            jQuery('#coupon_discount_row').hide();

            jQuery('#deliveryTotal').html(response.delPrice);
            jQuery('#grandTotal').html(response.orderAmount);

        }else{

            jQuery('#coupon_div').removeClass('error');
            jQuery('#coupon_error').removeClass('error').addClass('success');
            jQuery('#coupon_error').html(response.text_msg);            
            jQuery('#coupon_discount_text').html(response.name);
            jQuery('#coupon_discount').html(response.prom_disc_amt);
            jQuery('#coupon_discount_row').show();

            jQuery('#deliveryTotal').html(response.delPrice);
            jQuery('#grandTotal').html(response.orderAmount);
        }
    });
});

// when user change shipping address
jQuery('body').on('change','#dd_shipping',function(event){

  var shipId = jQuery(this).val();
  if(shipId){
    var orderId = $('#orderId').val();
    showHideLoader('showLoader');
    var data = {shipId:shipId,orderId:orderId};
    callAjaxRequest(updateShipAddress,"post",data,function(result){
          var response = jQuery.parseJSON(result); 
          if(response.type=='success'){
            $('#shippingAddress').html('');

            $('#shipping_address').html(response.shipVal);
            $('#shippingProfile').html(response.profileVal);

            $('#shopPromo').html(response.shop_promo);
            $('#promoMsg').html(response.promo_name);
            $('#promoAmt').html(response.shop_promo);
            $('#deliveryTotal').html('0.00');
            $('#grandTotal').html(response.ordAmount);
            if(response.shop_promo > 0) {
              $('#promo_div').show();
            }
            else {
              $('#promo_div').hide();
            }            
          }

          cleanCoupon();
          showHideLoader('hideLoader');
    });
  }else{
    $('#shipping_address').html('');
    showHideLoader('hideLoader');
  }
});

// when user change billing address
jQuery('body').on('change','#dd_billing',function(event){
    var billId = jQuery(this).val();
    showHideLoader('showLoader');
    if(billId){
        var data = {billId:billId};
        callAjaxRequest(getBillingAddress,"post",data,function(result){
            var response = jQuery.parseJSON(result); 
            if(response.type=='success'){
                $('#billing_address').html(response.shipVal);
                $('#billingAddress').html('');
            }
            showHideLoader('hideLoader');
        });
    }else{
        $('#billing_address').html('');
        showHideLoader('hideLoader');
    }
});

// when user checked delovery checkobox
jQuery('#delivery_address').click(function(){
    var _this = $(this);
    if($(this).is(":checked")){
        var shipAdd = $('#shipping_address').html();
        $('#same-billing-address').html(shipAdd);
        $('#billing_address').hide();
        $('#dd_billing_p').hide();
    }
    else if($(this).is(":not(:checked)")){
        $('#same-billing-address').html('');
        $('#billing_address').show();
        $('#dd_billing_p').show();
    }
});

// when user add new shipping/billing address
jQuery('#add-address').click(function(){

    data={'orderId':$('#orderId').val()};
    callAjaxRequest(addressUrl,"get",data,function(response){
        if(response){                
            $('#popupdiv').html(response);
            $('#popupdiv').modal('show');
        } 
    });
});

// when user submit shipping/billing address form
$('body').on('click',"#submit_popup_form",function(){ 

  var formAction = $("#add-edit-address-form").attr('action');
  var form_data = new FormData($("#add-edit-address-form")[0]);

  $.ajax({
    url: formAction,
    type:'post',
    data:form_data,
    processData: false, //prevent jQuery from converting your FormData into a string
    contentType: false, //jQuery does not add a Content-Type header for you
    success:function(result){  
        //console.log(result);
        //return false;
        var response = jQuery.parseJSON(result); 
        if(response.success==false){
             
            $('.error-msg').text('');
            $.each(response.message, function(key,val){
                $('input[name='+key+']').siblings('span').text(val);
                $('select[name='+key+']').siblings('span').text(val);
                $('textarea[name='+key+']').siblings('span').text(val);
                $('radio[name='+key+']').siblings('span').text(val);
            })
            return false;    
        }
        else if(response.success==true){

            $('#dd_shipping').append(response.shipdd);
            $('#dd_billing').append(response.billdd);
            if(response.profileVal)
                $('#shippingProfile').html(response.profileVal);
            if(response.shipVal)
                $('#shipping_address').html(response.shipVal);
            if(response.billVal)
                $('#billing_address').html(response.billVal);       
        }
        jQuery('#popupdiv').modal('hide');;
    }
  })
});

// when user select shipping profile
jQuery('body').on('click','.select-ship-profle',function(event){

    var shipProfileId = jQuery(this).val();
    var orderId = $('#orderId').val();
    var shipId = $('#dd_shipping').val();

    showHideLoader('showLoader');

    var data = {shipProfileId:shipProfileId,orderId:orderId,userShipId:shipId};
    callAjaxRequest(updateDeliveryPrice,"post",data,function(result){

        var response = jQuery.parseJSON(result); 
        if(response.type=='success'){
            $('#shipProfileMethod').html('');
            deliveryPrice = response.delPrice;
            $('#shopPromo').html(response.shop_promo);
            $('#promoMsg').html(response.promo_name);
            $('#promoAmt').html(response.shop_promo);            
            $('#deliveryTotal').html(response.delPrice);
            $('#grandTotal').html(response.ordAmount);
            if(response.shop_promo > 0) {
                $('#promo_div').show();
            }
            else {
                $('#promo_div').hide();
            }          
        }

        cleanCoupon();
        showHideLoader('hideLoader');
    });
});

// when user select admin seller
jQuery('body').on('change','#select_admin',function(event){

    admin_id =jQuery(this).val();

    if(admin_id==""){
        jQuery('#admin_image').attr("src",sellerImageUrl);        
        jQuery('#admin_team').html('');
        jQuery('#admin_email').html('');
        jQuery('#admin_tel').html('');
        jQuery('#admin_detail').fadeOut();
    }else{
        var data={'admin_id':admin_id};
        callAjaxRequest(getSellerInfo,"post",data,function(response){
            $('#admin').html('');
            jQuery('#admin_image').attr("src",response.image);
            jQuery('#admin_team').html(response.admin_team);
            jQuery('#admin_email').html(response.email);
            jQuery('#admin_tel').html(response.contact_no);
            jQuery('#admin_detail').fadeIn();
        });
    }    
});

// select payment method
jQuery('body').on('change','#sel-pay-method',function(event){
    var paymethodId = jQuery(this).val();
    var orderId = jQuery('#orderId').val();
    var type = jQuery(this).find('option:selected').attr('data-type');
    jQuery('input[name=coupon_code]').val('');
    if(type == 'bank-transfer'){
        jQuery('#bank-list').fadeIn();
    }else{
        jQuery('#bank-list').fadeOut();
    }
    //alert(paymethodId+'===='+orderId);

    showHideLoader('showLoader');

    var data = {paymethodId:paymethodId, orderId:orderId};
    callAjaxRequest(updatePaymentMethod,"post",data,function(result){
        var response = jQuery.parseJSON(result); 
        if(response.type=='success'){

            $('#payMethod').html('');
            $('#shopPromo').html(response.shop_promo);
            $('#promoMsg').html(response.promo_name);
            $('#promoAmt').html(response.shop_promo);
            $('#deliveryTotal').html(response.delPrice);
            $('#grandTotal').html(response.ordAmount);
            if(response.shop_promo > 0) {
                $('#promo_div').show();
            }
            else {
                $('#promo_div').hide();
            }            
        }

        cleanCoupon();
        showHideLoader('hideLoader');
    });
});

// when user change shippimng address country 
$('body').on('change','#country',function(){

    cleanCountryRelatedData();

    var country_id = $(this).val();  
    var ajax_url = $('#country_dtl_url').val();
    var data = {country_id:country_id};
    //alert(country_id+'===='+ajax_url);
    callAjax(ajax_url, 'post', data, function(result){

        var response = jQuery.parseJSON(result);
        alert(response.status+'=='+response.isd_code+'=='+response.province_state+'=='+response.city_district+'=='+response.sub_district); 
        if(response.status == 'success'){  
            $('.isd_code').val('+'+response.isd_code);
            $('#province_state_level').text(response.province_state);
            $('#city_district_level').text(response.city_district);
            $('#sub_district_level').text(response.sub_district); 
            if(response.country_code == 'TH') {
                $('#sub_district_div').removeClass('hide');
            }
            else {
                $('#sub_district_div').addClass('hide');
            }
        } 
    });
});

// when user change billing address country 
$('body').on('change','#billing_country',function(){

    cleanCountryRelatedData();

    var country_id = $(this).val();  
    var ajax_url = $('#country_dtl_url').val();
    var data = {country_id:country_id};
    //alert(country_id+'===='+ajax_url);
    callAjax(ajax_url, 'post', data, function(result){

        var response = jQuery.parseJSON(result);
        //alert(response.status+'=='+response.isd_code+'=='+response.province_state+'=='+response.city_district+'=='+response.sub_district); 
        if(response.status == 'success'){  
            $('.billing_isd_code').val('+'+response.isd_code);
            $('#billing_province_state_level').text(response.province_state);
            $('#billing_city_district_level').text(response.city_district);
            $('#billing_sub_district_level').text(response.sub_district); 
            if(response.country_code == 'TH') {
                $('#billing_sub_district_div').removeClass('hide');
            }
            else {
                $('#billing_sub_district_div').addClass('hide');
            }
        } 
    });
});

// address autofill for shippimng address
$('body').on('keyup','.autofill',function(){
    var country_isd_code = $('#country').find('option:selected').attr('isd_code');
    if(country_isd_code == '66') {
        var country_id = $('#country').val();
        var address_type  = $(this).attr('name');  
        var address_fill_url = $('#address_fill_url').val();

        $(".autofill").autocomplete({
            source: address_fill_url+'?country_id='+country_id+'&address_type='+address_type,  // data should be in json format
            minLength: 2,
            classes: {
                "ui-autocomplete": "address-autosearch"
            },
            select: function (event, ui) {
                event.preventDefault(); 

                //var str = ui.item.label;
                var str = ui.item.value;
                var str_arr = str.split('==>');
                $('#province_state').val(str_arr['0']);
                $('#city_district').val(str_arr['1']);
                $('#sub_district').val(str_arr['2']);
                $('#zip_code').val(str_arr['3']);
            }                
        }); 
    }
});

// address autofill for billing address
$('body').on('keyup','.billing-autofill',function(){

    var country_isd_code = $('#billing_country').find('option:selected').attr('isd_code');
    
    if(country_isd_code == '66') {

        var country_id = $('#billing_country').val();
        var address_type  = $(this).attr('name');  
        var address_fill_url = $('#address_fill_url').val();

        $(".billing-autofill").autocomplete({
            source: address_fill_url+'?country_id='+country_id+'&address_type='+address_type,  // data should be in json format
            minLength: 2,
            classes: {
                "ui-autocomplete": "address-autosearch"
            },
            select: function (event, ui) {
                event.preventDefault(); 

                //var str = ui.item.label;
                var str = ui.item.value;
                var str_arr = str.split('==>');
                $('#billing_province_state').val(str_arr['0']);
                $('#billing_city_district').val(str_arr['1']);
                $('#billing_sub_district').val(str_arr['2']);
                $('#billing_zip_code').val(str_arr['3']);
            }                
        }); 
    }
});

//code for add/update guest shipping/billing address 
$(document).on("click", "#add_submit_btn", function(event) {  
    $.ajax({
        type : "POST",
        url  : guest_checkout_url,
        beforeSend : function(){
            showHideLoader("showLoader");
        },
        headers : {"X-CSRF-Token" : window.Laravel.csrfToken},
        data : $('#guestAddressSection').find("select, textarea, input, checkbox").serialize(),          
    }).done(function(result){

        var response = jQuery.parseJSON(result); 

        if(response.success == false){
            $('.error-msg').text('');
            $.each(response.message_shipping, function(key,val){
                $('input[name='+key+']').siblings('span').text(val);
                $('select[name='+key+']').siblings('span').text(val);
                $('textarea[name='+key+']').siblings('span').text(val);
                $('radio[name='+key+']').siblings('span').text(val);
            });

            $.each(response.message_billing, function(key_bil,val_bil){
                //alert(key_bil+'=='+val_bil);
                $('input[name='+key_bil+']').siblings('span').text(val_bil);
                $('select[name='+key_bil+']').siblings('span').text(val_bil);
                $('textarea[name='+key_bil+']').siblings('span').text(val_bil);
                $('radio[name='+key_bil+']').siblings('span').text(val_bil);
            });

            if(response.account_email_error=='1'){
                $('#shipping_email').siblings('span').html('This email address is already used. Please click on <a href="#" data-toggle="modal" data-target="#loginModal">Login</a>');
            }else{
                $('#shipping_email').siblings('span').html('');
            }
            return false;
        }else{

            var shipId = response.shipping_id;
            if(shipId){
                var orderId = $('#orderId').val();
                showHideLoader('showLoader');
                var data = {shipId:shipId,orderId:orderId};
                callAjaxRequest(updateShipAddress,"post",data,function(result){
                    var response = jQuery.parseJSON(result); 
                    if(response.type=='success'){
                        $("#cancel_btn").addClass('hide');
                        $("#edit_btn").removeClass('hide');
                        $("#add_submit_btn").addClass('hide');
                        $(".readOnly").attr('readOnly',true);
                        $(".select_country").attr('disabled',true);
                        $("#billing_country").attr('disabled',true);
                        $("#shipping_profile_div").removeClass('hide');
                        $("#payment_detail_div").removeClass('hide');
                        $("#payment_button_div").removeClass('hide');

                        $('#shippingProfile').html(response.profileVal);
                        $('#shopPromo').html(response.shop_promo);
                        $('#promoMsg').html(response.promo_name);
                        $('#promoAmt').html(response.shop_promo);
                        $('#deliveryTotal').html('0.00');
                        $('#grandTotal').html(response.ordAmount);
                        if(response.shop_promo > 0) {
                          $('#promo_div').show();
                        }
                        else {
                          $('#promo_div').hide();
                        }                           
                    }                         
                });
            }
        }
    }).fail(function(){
       //
    }).always(function(){
        cleanCoupon();
        showHideLoader("hideLoader");
    });
});

$(document).ready( function (){

    var billing_address = $("#billing_address_chkbox").prop("checked");
    $("#create_account_div").html("");

    var account_html = '<div class="row form-row"><div class="col-sm-12"><label>Title <span class="strick">*</span></label><input type="text" name="title" /></div></div><div class="row form-row"><div class="col-sm-6"><label>Password <span class="strick">*</span></label><input type="password" name="password" /></div><div class="col-sm-6"><label>Confirm Password <span class="strick">*</span></label><input type="password" name="confirm_password" /></div></div>';

    if(billing_address===true){
        $("#billing_address_dynamic").addClass("hide");
    }

    $("#create_account").on('click', function () {
        var isChecked = $(this).is(":checked");
        if(isChecked===false){
            $("#create_account_div").html("");
            $('#shipping_email').siblings('span').html('');
        }else{
            $("#create_account_div").html(account_html);
        }
    });

    $("#billing_address_chkbox").on('click', function () {
        var isChecked = $(this).is(":checked");
        if(isChecked===true){
            $("#billing_address_dynamic").addClass("hide");
        }else{
            $("#billing_address_dynamic").removeClass('hide');
        }
    });

    $("#edit_btn").on('click', function(){
        $("#add_submit_btn").removeClass('hide');
        $("#edit_btn").addClass('hide');
        $("#cancel_btn").removeClass('hide');

        $(".readOnly").attr('readOnly',false);
        $(".select_country").attr('disabled',false);
        $("#billing_country").attr('disabled',false);

        $("#shipping_profile_div").addClass('hide');
        $("#payment_detail_div").addClass('hide');
        $("#payment_button_div").addClass('hide');
    });

    $("#cancel_btn").on('click', function(){

        $("#add_submit_btn").addClass('hide');
        $("#edit_btn").removeClass('hide');
        $("#cancel_btn").addClass('hide');
        
        $(".readOnly").attr('readOnly',true);
        $(".select_country").attr('disabled',true);
        $("#billing_country").attr('disabled',true);

        $("#shipping_profile_div").removeClass('hide');
        $("#payment_detail_div").removeClass('hide');
        $("#payment_button_div").removeClass('hide');
    });
});

$(window).on("load", function(){
    showHideLoader("hideLoader");
});

function validateCart(oid){

    var error =0;

    var ship_address_lenght = $('#dd_shipping').length;
    if(ship_address_lenght > 0){
        if($('#dd_shipping').val() == ''){
            error = 1;
            $('#shippingAddress').html(langMsg.select_shipping_address);
        }else{
            $('#shippingAddress').html('');
        }
    }

    if($('#delivery_address').is(":checked")){
        $('#billingAddress').html('');
    }else{
        var ship_address_lenght = $('#dd_billing').length;
        if(ship_address_lenght > 0){
            if($('#dd_billing').val() == ''){
              error =1;
              $('#billingAddress').html(langMsg.select_billing_address);
            }else{
              $('#billingAddress').html('');
            }
        }
    }

    if($('#select_admin').val() == ''){
        error = 1;
        $('#admin').html(langMsg.please_select_your_seller);
    }else{
        $('#admin').html('');
    }

    var shipProfile = $('input[name=shipProfileMethod]:checked').val();
    if(typeof shipProfile == 'undefined'){
        error = 1;
        $('#shipProfileMethod').html(langMsg.select_shipping);
    }else{
        $('#shipProfileMethod').html('');
    }

    var payment = $('#sel-pay-method').val();
    if(payment == '' || typeof payment == 'undefined'){
        error = 1;
        $('#payMethod').html(langMsg.select_payment_method);
    }else{
        $('#payMethod').html('');
    }

    if(error == 1){
        return false;
    }else{

        var submit_btn = $('#submit_btn_div').html();
        $('#submit_btn_div').html('');

        //$('.deliveryPrice').val(deliveryPrice);
        var formAction = $('#checkout_form').attr('action');
        var form = $('#checkout_form').serialize();
        //console.log(form);

        showHideLoader('showLoader');
      
        callAjaxRequest(formAction,'post',form,function(result){

            var response = JSON.parse(result); 
           
            if(response.success !== undefined && (response.success == "false" || response.success == false)){
                
                $.each(response.message, function(key,val){
                    $('#'+formId+' p[id='+key+']').html(val);
                });

                $('#submit_btn_div').html(submit_btn); 
                showHideLoader('hideLoader');

            }else if(response.success !== undefined && response.success == 'error'){
                
                if(response.cart){
                    $('#checkout_error').html(langMsg.Something_went_to_wrong);
                    $('#cart_error_'+response.cart).html(response.message);
                }else{
                    $('#checkout_error').html(response.message);
                }

                $('#checkout_error').show();
                $('#submit_btn_div').html(submit_btn);
                showHideLoader('hideLoader');

            }else if(response.success !== undefined && (response.success == "true" || response.success === true)){
                window.location = response.url;
            }
        });
    }
}

//clean coupon
function cleanCoupon(){
    jQuery('#coupon_code').val('');
    jQuery('#coupon_discount_row').hide();    
};

//Liste on show hide loader
function showHideLoader(strFlag){
  //In case strFlag is show then show loader
  if(strFlag!==undefined && strFlag === "showLoader"){
      $("#showHideLoader").show();
     // $(':input[type="button"]').prop('disabled', true);
  }else if(strFlag!==undefined && strFlag === "hideLoader"){
     $("#showHideLoader").hide();
  }
};

function cleanCountryRelatedData() {
    $('#province_state').val('');
    $('#city_district').val('');
    $('#sub_district').val('');    
}

/* for increament and decremanet */
var q = jQuery('.quantity');
q.on('click','button',function(e){
    e.preventDefault();
    var self = jQuery(this),
    data = self.data('count'),
    i = self.parent().children('input'),
    val = i.val();
    if(data === "plus"){
        i.val(++val);
    }
    else{
        if(val == 1) return false;
        i.val(--val);
    }
    self.siblings('.txtQuantity').trigger('change'); 
});