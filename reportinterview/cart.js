
// added by sandeep for shipping address 
$('body').on('change','#country',function(){

    cleanCountryRelatedData();

    var country_id = $(this).val();  
    var ajax_url = $('#country_dtl_url').val();
    var data = {country_id:country_id};
    //alert(country_id+'===='+ajax_url);
    callAjax(ajax_url, 'post', data, function(result){

        var response = jQuery.parseJSON(result);
        //alert(response.status+'=='+response.isd_code+'=='+response.province_state+'=='+response.city_district+'=='+response.sub_district); 
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

$('body').on('keyup','.autofill',function(){
    var country_isd_code = $('#country').find('option:selected').attr('isd_code');
    if(country_isd_code == '66') {
        var country_id = $('#country').val();
        var address_type  = $(this).attr('name');  
        var address_fill_url = $('#address_fill_url').val();

        $(".autofill").autocomplete({
            source: address_fill_url+'?country_id='+country_id+'&address_type='+address_type,                                             // data should be in json format
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

$('body').on('keyup','.billing-autofill',function(){

    var country_isd_code = $('#billing_country').find('option:selected').attr('isd_code');
    
    if(country_isd_code == '66') {

        var country_id = $('#billing_country').val();
        var address_type  = $(this).attr('name');  
        var address_fill_url = $('#address_fill_url').val();

        $(".billing-autofill").autocomplete({
            source: address_fill_url+'?country_id='+country_id+'&address_type='+address_type,                                             // data should be in json format
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

// function SubmitAddressForm(ajax_url) {
    
//     var form_data = $("#addess_frm").serialize();
//     $.ajax({

//         dataType:'json',
//         url:ajax_url,
//         method:'POST',
//         data:form_data,
//         success:function(response) {

//             if(response.status == 'success'){
//                 $('.modal-content').html(response.message);
//             }
//             else if(response.status == 'validate_error'){
//                 $('.error-msg').text('');
//                 $.each(response.message, function(key,val){
//                     $('#error_'+key).text(val);
//                 });
//             }
//         }
//     });    
// }

function cleanCountryRelatedData() {

    $('#province_state').val('');
    $('#city_district').val('');
    $('#sub_district').val('');    
}

// added by sandeep for shipping address ended



jQuery('#add-address').click(function(){
  data={'orderId':$('#orderId').val()};
  callAjaxRequest(addressUrl,"get",data,function(response){
        if(response){                
              $('#popupdiv').html(response);
              jQuery('#popupdiv').modal('show');
          } 
  // console.log(response);
  })
})

$('body').on('click',".submit-popup",function(){ 
  if ($('#param').length) {
    $('#param').val($(this).attr('param'));
  }
  var formAction = $(this).closest('form').attr('action');
  var formId = $(this).closest('form').attr('id');
  var formMethod = $(this).closest('form').attr('method');
  //var form = $("#"+formId).serialize();
  var form_data = new FormData($("#"+formId)[0]);

  $.ajax({
    url: formAction,
    type:formMethod,
    data:form_data,
    processData: false, //prevent jQuery from converting your FormData into a string
    contentType: false, //jQuery does not add a Content-Type header for you
    success:function(result){  
         console.log(result);
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
                
          }else{
             if(response.success==true){
                if(response.action=='reload'){
                  
                  location.reload();
                }
                if(response.action=='successMsg'){
                  jQuery('.modal-body').html('<div class="alert alert-success">'+response.message+'</div>');
                  return false;
                }
                if(response.section == 'cart'){
                  var orderId = $('#orderId').val();
                  $('.address_section').show();
                  $('.empty-address').hide();
                  $('#dd_shipping').append(response.shipdd);
                  $('#dd_billing').append(response.billdd);
                  if(response.profileVal)
                    $('#shippingProfile').html(response.profileVal);
                  if(response.shipVal)
                    $('#shipping_address').html(response.shipVal);
                  if(response.billVal)
                    $('#billing_address').html(response.billVal);
                }
             }        
        }
        jQuery('#popupdiv').modal('hide');;
    }
  })
});

$('body').on('change','.countrydd',function(){
  var countryId = $(this).val();  
  var data = {countryId:countryId,provinceId:0};
  callAjaxRequest(getProvince,"post",data,function(result){
          var response = jQuery.parseJSON(result); 
          if(response){                
                $('#provinceData').html(response.province);
                $('.isdCodeData').html(response.isdCode); 
            }
            for(i=2; i<=4; i++){
          $('#provinceVal-'+i).html('');
          $('#provinceDiv'+i).hide();
        } 
  })
})

jQuery('.txtQuantity').change(function(){
  var formId = $(this).closest('form').attr('id');
  var shipAddressId = jQuery('#'+formId+' select[name=shippingAddress]').val();
  var id = $(this).closest('ul.cart-item-list').attr('id');
  var split = id.split('-');
  var cartId = split[1];
  var quantity = $(this).val();
  var is_int = Number.isInteger(Number(quantity));

  if(is_int == false || quantity == 0){
    alert('invalid Input');
    $(this).val(1);
    quantity = 1;
  }

  if($.type(shipAddressId) == 'undefined') {
      $(".select_country").attr('disabled',false);
      $("#billing_country").attr('disabled',false);
      $(".readOnly").attr('readOnly',false);
      
      $("#edit_btn").addClass('hide');
      $("#add_submit_btn").removeClass('hide');
      $(".step_2_3_4_div").addClass('hide');
  }
  //console.log(shipAddressId);return;

  var data = {cartId:cartId, quantity:quantity, shipAddressId:shipAddressId};

  showHideLoader('showLoader');

  callAjaxRequest(updateCart,"post",data,function(result){
            var response = jQuery.parseJSON(result); 
            //console.log(response);
            if(response.type=='error'){
              alert(response.msg);
             }else{
              //alert(response.ordAmount);
              $('#unitPrice_'+cartId).html(response.unitPrice);
              $('#productTotal_'+cartId).html(response.cartPrice);
              $('#orderTotal').html(response.ordAmount);
              // Added for grand Total price of order | By @Dinesh Kumar Kovid | Start
              $('#grandTotal').html(response.ordAmount);
              // Added for grand Total price of order | By @Dinesh Kumar Kovid | End
              $('#deliveryTotal').html('0.00');
              $('#shippingProfile').html(response.profileVal);
              $('#shopPromo_'+response.orderId).html(response.shop_promo);
              $('#promoMsg_'+response.orderId).html(response.promo_name);
              $('#'+formId+' .coupon-prom-div').hide();
              if(response.shop_promo > 0) {
                $('#promo_div').show();
              }
              else {
                $('#promo_div').hide();
              }              
             }
            $(".select-ship-profle").each(function(i) 
             { 
              this.checked = false;
            });
        showHideLoader('hideLoader');
   });

});

/****remove order****/
jQuery(document).on('click','.deleteOrder',function(event){
  var ordersection = jQuery(this).parent('form').parent('div.cart-box').attr('id');
  swal({title: langMsg.are_you_sure_want_to_delete,type: "warning",showCancelButton: true,
        confirmButtonColor: '#DD6B55'
      }).then(function(result) {
        //alert('deliveryAddress');
          showHideLoader('showLoader');
          var split = ordersection.split('-');
          var orderId = split[1].trim();
          var data = {orderId:orderId};
          callAjaxRequest(removeOrder,"post",data,function(result){
                  var response = jQuery.parseJSON(result); 
                  console.log(response);
                  if(response.type=='error'){
                    alert(response.msg);
                  }else{
                    jQuery('#totalCartProduct').html(response.totCart);
                    $('#'+ordersection).html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
                    if(Number(response.totCart > 0)){
                      jQuery('.totCart').html(response.totCart); 
                      jQuery('.totShop').html(response.totShop);
                    }else{
                      jQuery('.item-name-cart').hide();
                      jQuery('.empty-cart').show();
                    }
                  }
            showHideLoader('hideLoader');      
         });
    }, function(dismiss) {
        showHideLoader('hideLoader');
        return false;
    }
  );
});

/**remove item from cart**/
jQuery('body').on('click','.icon-cart-remove',function(event){
  var cartId = $(this).attr('val');
  var formId = $(this).closest('form').attr('id');

  var alertMsg = langMsg.are_you_sure_want_to_delete;

    swal({title: alertMsg,type: "warning",showCancelButton: true,
        confirmButtonColor: '#DD6B55'
      }).then(function(result) {
            showHideLoader('showLoader');
            var data = {cartId:cartId};
            callAjaxRequest(removeCart,"post",data,function(result){
                var response = jQuery.parseJSON(result); 
                var orderId = response.orderId;
                jQuery('#totalCartProduct').html(response.totCart);
                if(response.delete == 'cart'){
                  $('#orderTotal').html(response.ordAmount);
                  // Added for grand Total price of order | By @Dinesh Kumar Kovid | Start
                  $('#grandTotal').html(response.ordAmount);
                  // Added for grand Total price of order | By @Dinesh Kumar Kovid | End
                  $('#cartSection-'+cartId).html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
                  $('#deliveryTotal').html('0.00');
                  $('#shopPromo_'+orderId).html(response.shop_promo);
                  $('#promoMsg_'+orderId).html(response.promo_name);
                  $('#checkout_'+orderId+' .coupon-prom-div').hide();
                  if(response.shop_promo > 0) {
                    $('#promo_div').show();
                  }
                  else {
                    $('#promo_div').hide();
                  }                  
                }else{
                  if(Number(response.totCart > 0)){
                      $('#orderSection').html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
                      jQuery('.totCart').html(response.totCart); 
                      jQuery('.totShop').html(response.totShop);
                    }else{
                      jQuery('.item-name-cart').hide();
                      jQuery('.empty-cart').show();
                      $('#orderSection').html('<div class="alert alert-danger fade in">'+response.msg+'</div>');
                      $('#orderAmountSec').html('');
                    }
                }   

                $(".select-ship-profle").each(function(i) 
                { 
                this.checked = false;
                });
                showHideLoader('hideLoader');
            });
      },function(dismiss) {
          showHideLoader('hideLoader');
          return false;
        }
      );
});

/****when user change shipping address********/
jQuery('body').on('change','#dd_shipping',function(event){

  var shipId = jQuery(this).val();
  if(shipId){
    var orderId = $('#orderId').val();
    showHideLoader('showLoader');
    var data = {shipId:shipId,orderId:orderId};
    callAjaxRequest(updateShipAddress,"post",data,function(result){
          var response = jQuery.parseJSON(result); 
          if(response.type=='success'){
            $('#shipping_address').html(response.shipVal);
            $('#shippingProfile').html(response.profileVal);
            $('#orderTotal').html(response.ordAmount);
            $('#deliveryTotal').html('0.00');
            $('#shopPromo_'+orderId).html(response.shop_promo);
            $('#promoMsg_'+orderId).html(response.promo_name);
            $('#checkout_'+orderId+' .coupon-prom-div').hide();
            if(response.shop_promo > 0) {
              $('#promo_div').show();
            }
            else {
              $('#promo_div').hide();
            }            
          }
          showHideLoader('hideLoader');
    });
  }else{
    $('#shipping_address').html('');
    showHideLoader('hideLoader');
  }
});

/****when user change billing address********/
jQuery('body').on('change','#dd_billing',function(event){
  var billId = jQuery(this).val();
  showHideLoader('showLoader');
  if(billId){
    var data = {billId:billId};
    callAjaxRequest(getBillingAddress,"post",data,function(result){
          var response = jQuery.parseJSON(result); 
          if(response.type=='success'){
            $('#billing_address').html(response.shipVal);
          }
          showHideLoader('hideLoader');
    });
  }else{
    $('#billing_address').html('');
    showHideLoader('hideLoader');
  }
});

/*******when user checked delovery checkobox************/
jQuery('input[name="deliveryAddress"]').click(function(){
  var _this = $(this);
  var index = _this.attr('index');
  if($(this).is(":checked")){
    var shipAdd = $('#shipping_address').html();
    $('#same-billing-address').html(shipAdd);
    $('#billing_address').hide();
    $('#dd_billing').hide();
    //console.log(shipAdd);
      //alert("Checkbox is checked.");
  }
  else if($(this).is(":not(:checked)")){
    $('#same-billing-address').html('');
    $('#billing_address').show();
    $('#dd_billing').show();
  }
})

var deliveryPrice = 0;
/***when user select shipping profile*******/
jQuery('body').on('click','.select-ship-profle',function(event){
  var shipProfileId = jQuery(this).val();
  var orderProfile = jQuery(this).closest('.shipProfie').attr('id');

  var orderId = $('#orderId').val();
  var shipId = $('#dd_shipping').val();
  showHideLoader('showLoader');
  jQuery('input[name=coupon_code]').val('');
  var data = {shipProfileId:shipProfileId,orderId:orderId,userShipId:shipId};
  callAjaxRequest(updateDeliveryPrice,"post",data,function(result){
        var response = jQuery.parseJSON(result); 
        if(response.type=='success'){
          deliveryPrice = response.delPrice;
          $('#deliveryTotal').html(response.delPrice);
          $('#orderTotal').html(response.ordAmount);
          $('#shopPromo_'+orderId).html(response.shop_promo);
          $('#promoMsg_'+orderId).html(response.promo_name);
          $('#checkout_'+orderId+' .coupon-prom-div').hide();
          if(response.shop_promo > 0) {
            $('#promo_div').show();
          }
          else {
            $('#promo_div').hide();
          }          
        }
        showHideLoader('hideLoader');
  });
});

/***when user select payment method*******/
jQuery('body').on('click','.sel-pay-method',function(event){
    var paymethodId = jQuery(this).val();
    var orderProfile = jQuery(this).closest('form').attr('id');
    var split = orderProfile.split('_');
    var orderId = split[1].trim();
    var id = jQuery(this).attr('id');
    jQuery('input[name=coupon_code]').val('');
    if(id == 'bank-transfer'){
        jQuery('.bank-list').show();
    }else{
        jQuery('.bank-list').hide();
    }
    showHideLoader('showLoader');
    var data = {paymethodId:paymethodId,orderId:orderId};
    callAjaxRequest(updatePaymentMethod,"post",data,function(result){
        var response = jQuery.parseJSON(result); 
        if(response.type=='success'){
            $('#deliveryTotal').html(response.delPrice);
            $('#orderTotal').html(response.ordAmount);
            $('#shopPromo_'+orderId).html(response.shop_promo);
            $('#promoMsg_'+orderId).html(response.promo_name);
            $('#vatTotal_'+orderId).html(response.vatAmount);
            $('#checkout_'+orderId+' .coupon-prom-div').hide();
            if(response.shop_promo > 0) {
                $('#promo_div').show();
            }
            else {
                $('#promo_div').hide();
            }            
        }
        showHideLoader('hideLoader');
    });
});

// jQuery('body').on('click','.sel-pay-method',function(event){

//   var id = jQuery(this).attr('id');
//   if(id == 'bank-transfer'){
//       jQuery('.bank-list').show();
//   }else{
//       jQuery('.bank-list').hide();
//   }
// })

/***when user select payment method bank*******/
// jQuery('body').on('click','.sel-bank',function(event){
//   var paymethodId = jQuery(this).val();
//   var orderProfile = jQuery(this).closest('form').attr('id');
//   var split = orderProfile.split('_');
//   var orderId = split[1].trim();
//   showHideLoader('showLoader');
//   var data = {paymethodId:paymethodId,orderId:orderId,btype:'bank'};
//   callAjaxRequest(updatePaymentMethod,"post",data,function(result){
//         var response = jQuery.parseJSON(result); 
//         if(response.type=='success'){
//           $('#deliveryTotal_'+orderId).html(response.delPrice);
//           $('#orderTotal_'+orderId).html(response.ordAmount);
//           $('#shopPromo_'+orderId).html(response.shop_promo);
//           $('#promoMsg_'+orderId).html(response.promo_name);
//           $('#checkout_'+orderId+' .coupon-prom-div').hide();
//           if(response.shop_promo > 0) {
//             $('#promo_div').show();
//           }
//           else {
//             $('#promo_div').hide();
//           }          
//         }
//         showHideLoader('hideLoader');
//   });
// });

function validateCart(oid){

  var formId = 'checkout_'+oid;
  var shipAddress = jQuery('#'+formId+' select[name=shippingAddress]').val();
  var error =0;
  
  if(shipAddress == ''){
    error = 1;
    jQuery('#'+formId+' p[id=shippingAddress]').html(langMsg.select_shipping_address);
  }else{
    jQuery('#'+formId+' p[id=shippingAddress]').html('');
  }
 if(jQuery('#'+formId+' input[name=deliveryAddress]').is(":checked")){
  jQuery('#'+formId+' p[id=billingAddress]').html('');
  }else{
  var billAddress = jQuery('#'+formId+' select[name=billingAddress]').val();
    if(billAddress == ''){
      error =1;
      jQuery('#'+formId+' p[id=billingAddress]').html(langMsg.select_billing_address);
    }else{
      jQuery('#'+formId+' p[id=billingAddress]').html('');
    }
  }

  var shipProfile = jQuery('#'+formId+' input[name=shipProfileMethod]:checked').val();
  if(typeof shipProfile == 'undefined'){
    error = 1;
    jQuery('#'+formId+' p[id=shipProfileMethod]').html(langMsg.select_shipping);
  }else{
    jQuery('#'+formId+' p[id=shipProfileMethod]').html('');
  }

  var payment = jQuery('#'+formId+' input[name=payMethod]:checked').val();
  if(typeof payment == '' || typeof payment == 'undefined'){
    error = 1;
    jQuery('#'+formId+' p[id=payMethod]').html(langMsg.select_payment_method);
  }else{
    jQuery('#'+formId+' p[id=payMethod]').html('');
  }
  if(error == 1){
    return false;
  }else{
  jQuery('.deliveryPrice').val(deliveryPrice);
  var formAction = jQuery('#'+formId).attr('action');
  var formMethod = jQuery('#'+formId).attr('method');
  var form = jQuery('#'+formId).serialize();
  showHideLoader('showLoader');
  //$('#btn_cart_submit').prop('disabled', true);
  
    callAjaxRequest(formAction,formMethod,form,function(result){
        var response = JSON.parse(result); 
       
         if(response.success!== undefined && (response.success == "false" || response.success == false)){
              $.each(response.message, function(key,val){
                jQuery('#'+formId+' p[id='+key+']').html(val);
              });                
         }else if(response.success!== undefined && response.success == 'error'){
            if(response.cart){
              jQuery('#orderSection .checkout_error').html(langMsg.Something_went_to_wrong);
              jQuery('#cartError_'+response.cart).html(response.message);
            }else{
              jQuery('#orderSection .checkout_error').html(response.message);
            }
            $('.checkout_error').show();
         }else{
             if(response.success!== undefined && (response.success == "true" || response.success ===  true)){
                window.location = response.url;
                //window.location.replace(response.url);
                //window.location.href=response.url;
             }
             
        }
        $('#btn_cart_submit').prop('disabled', false);
        showHideLoader('hideLoader');
    })
  }
}

function makeOffer(oid,makeUrl){
  var formId = 'checkout_'+oid;
  var error = 0;
  var payMethod = jQuery('#'+formId+' input[name=emptyPaymentMethod]').val();
  if(payMethod == '1'){
    error = 1;
    jQuery('#'+formId+' p[id=payMethod]').html(langMsg.select_payment_method);
  }
  var shipMethod = jQuery('#'+formId+' input[name=emptyProfileMethod]').val();
  if(shipMethod == '1'){
    error = 1;
    jQuery('#'+formId+' p[id=shipProfileMethod]').html(langMsg.select_shipping);
  }
  if(error == 1){
    return false;
  }
  window.location.href = makeUrl;
}
/****when buyer cancel his make offer request*******/
function cancelMakeOffer(oid,cancelUrl){
  
  swal({title: langMsg.are_you_sure_want_to_cancel,type: "warning",showCancelButton: true,
        confirmButtonColor: '#DD6B55'
      }).then(function(result) {
        //alert('deliveryAddress');
          showHideLoader('showLoader');
          var data = {id:oid};
          callAjaxRequest(cancelUrl,"get",data,function(result){
            location.reload();
            showHideLoader('hideLoader'); 
         });
    }, function(dismiss) {
            return false;
            }
  );
}
jQuery(".bankRadio .radio").change(function() {
    if (jQuery(this).is(':checked')) {
      var id = jQuery(this).attr('id');
      if(id == 'bank-transfer'){
      jQuery('.bank-list').show();
      }else{
          jQuery('.bank-list').hide();
      }
      } else {
      // jQuery('#r1edit:input').attr('disabled', true);
      jQuery('.bank-list').hide();
    }
    
  });

jQuery('body').on('click','.btn-coupon',function(event){
  var formId = $(this).closest('form').attr('id');

  //alert(formId);

  var shipAddress = jQuery('#'+formId+' select[name=shippingAddress]').val();
  var error =0;

  if(shipAddress == ''){
    error = 1;
    jQuery('#'+formId+' p[id=shippingAddress]').html(langMsg.select_shipping_address);
  }else{
    jQuery('#'+formId+' p[id=shippingAddress]').html('');
  }

  var shipProfile = jQuery('#'+formId+' input[name=shipProfileMethod]:checked').val();
  if(typeof shipProfile == 'undefined'){
    error = 1;
    jQuery('#'+formId+' p[id=shipProfileMethod]').html(langMsg.select_shipping);
  }else{
    jQuery('#'+formId+' p[id=shipProfileMethod]').html('');
  }

  var payment = jQuery('#'+formId+' input[name=payMethod]:checked').val();
  if(typeof payment == '' || typeof payment == 'undefined'){
    error = 1;
    jQuery('#'+formId+' p[id=payMethod]').html(langMsg.select_payment_method);
  }else{
    jQuery('#'+formId+' p[id=payMethod]').html('');
  }

  if(error == 1){
    return false;
  }
  var coupon_code = jQuery('#'+formId+' #coupon_code').val();

  //alert(coupon_code);
  
  var split = formId.split('_');
  var orderId = split[1].trim();

  var form = jQuery('#'+formId).serialize();
  //alert(form);
  callAjaxRequest(applyCoupon,"get",form,function(result){
    var response = jQuery.parseJSON(result);
    if(response.type == 'false'){
      
       $('#orderTotal').html(response.ordAmount);
       $('#deliveryTotal_'+orderId).html(response.delPrice);
       jQuery('#'+formId+' .coupon-prom-div').hide();
       jQuery('#'+formId+' .coupan').addClass('error');
       jQuery('#'+formId+' .coupan .used-coupon').html(response.text_msg);
       jQuery('#'+formId+' .coupan .used-coupon').show();

      //$('#vatTotal_'+orderId).html(response.vatAmount);

       console.log(response);

       //alert('invalid');

    }else{
      
       var response = jQuery.parseJSON(result);

       $('#orderTotal').html(response.orderAmount);

       /*$('#shopPromo_'+orderId).html(response.shop_promo);

       $('#promoMsg_'+orderId).html(response.promo_name);

       $('#checkout_'+orderId+' .coupon-prom-div').hide();*/
      
        /*$('#orderTotal_'+orderId).html(response.ordAmount);
        $('#deliveryTotal_'+orderId).html(response.delPrice);
        $('#vatTotal_'+orderId).html(response.vatAmount);*/

      
        $('#coupon_discount_row .coupon_discount_text').html(response.name);
        $('#coupon_discount_row #coupon_discount').html(response.prom_disc_amt);
        jQuery('#coupon_discount_row').show();

       jQuery('#'+formId+' .coupan').removeClass('error');
       jQuery('#'+formId+' .coupan .used-coupon').html('');
       jQuery('#'+formId+' .coupan .used-coupon').hide();
    }
  })
});


//Rajeev write code for guest checkout 
//Date - 07/03/2018
;(function ($) {
  var user_address = [];
  var requireFieldName=[{"name" :"title","required" : false},{"name":"main_password","required" : false},{"name" : "confirm_password", "required" : false},{"name" : "email", "required" : false},{"name" : "first_name", "required" : false},{"name" : "last_name", "required" : false},{"name" : "address", "required" : false},{"name" : "city_district", "required" : false},{"name" : "sub_district", "required" : false},{"name" : "zip_code", "required" : false},{"name" : "ph_number", "required" : false},{"name" : "province_state", "required" : false}];
  var dataArray =[];

  if($("#guestAddressSection").length){
    //for country 
    var country = $("#country option:selected").attr("value");
    var billing_country = $("#billing_country option:selected").attr("value");

    dataArray.push({"name" : $("#country").attr("name"), "value" : country});
    dataArray.push({"name" : $("#billing_country").attr("name"), "value" : billing_country});

    //listen on conuntry cahnge 
    $(document).on("change", "#country, #billing_country", function(){
       var _value = $(this).find("option:selected").attr("value");
       var _name =  $(this).attr("name");
       var index =  _getIndex(dataArray, _name, "name");
       if(index!= -1){
          dataArray[index].value = _value;
       }else{
        dataArray.push({"name" : _name, "value" : _value});
      }
    });

    //Listen on submit (save and continue) button
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
            if(response.success==false){
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
                $('input[name=email]').siblings('span').html('This email address is already used. Please click on <a href="#" data-toggle="modal" data-target="#loginModal">Login</a>');
              }else{
                $('input[name=email]').siblings('span').html('');
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
                            $(".step_2_3_4_div").removeClass('hide');
                            $('#shipping_address').html(response.shipVal);
                            $('#shippingProfile').html(response.profileVal);
                            $('#orderTotal').html(response.ordAmount);
                            $('#deliveryTotal').html('0.00');
                            $('#shopPromo_'+orderId).html(response.shop_promo);
                            $('#promoMsg_'+orderId).html(response.promo_name);
                            $('#checkout_'+orderId+' .coupon-prom-div').hide();
                            if(response.shop_promo > 0) {
                              $('#promo_div').show();
                            }
                            else {
                              $('#promo_div').hide();
                            }                            
                          }                         
                    });
                  }else{
                    $('#shipping_address').html('');                    
                  }
            }
        }).fail(function(){
           //
        }).always(function(){
          showHideLoader("hideLoader");
        })
    });
  
    //validate then subimt
    $(document).on("blur", ".addr_field_req", function(e){
      var that = $(this);
      var _value = that.val();
      var _name = that.attr("name");
      //console.log(that.attr("name"));
      //if(_value!== undefined && _name!=="email")
      if(_value!== undefined){
        var index =  _getIndex(dataArray, _name, "name");      
        if(index!= -1){
            dataArray[index].value = _value;
        }else{
          dataArray.push({"name" : _name, "value" : _value});
        }       
      }
    });
  }
  /*Listen for get index 
  *@param : destObj (oject/array)
  *@param : matchEle (string)
  *@param : matchType (string -optional)
  */
  function _getIndex(destObj, matchEle, matchType){
      var index;
      index = destObj.findIndex(function(item){
          if(matchType!== undefined && matchType){
              return (item[matchType] == matchEle);
          }else{
              return (item == matchEle);
          }
      });
      return index;
  }  
  
  $(window).on("load", function(){
     showHideLoader("hideLoader");
  });

})(jQuery);

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