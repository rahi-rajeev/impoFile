//Rajeev write code for guest checkout 
//Date - 07/03/2018
;(function ($) {
  var user_address = [];
  var requireFieldName=[{"name" :"title","required" : false},{"name":"password","required" : false},{"name" : "confirm_password", "required" : false},{"name" : "email", "required" : false},{"name" : "first_name", "required" : false},{"name" : "last_name", "required" : false},{"name" : "address", "required" : false},{"name" : "city_district", "required" : false},{"name" : "sub_district", "required" : false},{"name" : "zip_code", "required" : false},{"name" : "ph_number", "required" : false},{"name" : "province_state", "required" : false}];
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
      var reqLen = requireFieldName.length;
      var count = 0;
      var errorHtml = '';

      //check error and create message
      // $.map(requireFieldName, function(item){
      //   if(item.name!== undefined && item.name && item.required === true){
      //     count++;
      //   }else{
      //     errorHtml += "please fill " + item.name.replace(/\_/g, " ") + "\n";
      //   }
      // });

      //if(!isNaN(count) && count ===  reqLen){
        $.ajax({
          type : "POST",
          url  : guest_checkout_url,
          beforeSend : function(){
            //
          },
          headers : {"X-CSRF-Token" : window.Laravel.csrfToken},
          data :dataArray,
          success:function(result){
            //alert("Hello");
            var response = jQuery.parseJSON(result); 
            if(response.success==false){
             
              $('.error-msg').text('');
              $.each(response.message_shipping, function(key,val){
                //alert(key+'=='+val);
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
            return false;
                
          }
          }
        });     
      //}else{
      //  swal("Alert", errorHtml, "warning");
     // }

      // $("#guestAddressSection").children(".cart-SetAddress").each(function(index, el) {
      //     console.log($(this).find(":input").val());
      //     console.log(el);
      // });     
    });
    console.log($("#country option:selected").attr("isd_code"));
    console.log($("#billing_country option:selected").attr("isd_code"));
    //validate then subimt
    $(document).on("blur", ".addr_field_req", function(e){
      var that = $(this);
      var _value = that.val();
      var _name = that.attr("name");
      //if(_value!== undefined && _name!=="email")
      if(_value!== undefined){
        var index =  _getIndex(dataArray, _name, "name");
        var reqInd = _getIndex(requireFieldName, _name, "name");

        if(index!= -1){
          if(_value== ""){
            dataArray[index].value = _value;
            //set required field true/false
            if(reqInd!= -1){
              //requireFieldName[reqInd].required = false;
            }            
          }else{
            dataArray[index].value = _value;
            //set required field true/false
            if(reqInd!= -1){
              //requireFieldName[reqInd].required = true;
            }else{
              //requireFieldName[reqInd].required = false;
            }
          }
        }else{
          dataArray.push({"name" : _name, "value" : _value}); 
          //set required field true/false
          if(reqInd!= -1){
            //requireFieldName[reqInd].required = true;
          }else{
            //requireFieldName[reqInd].required = false;
          }         
        }       
      }
     // console.log(dataArray);
      // var userEmail =  $(this).val();
      // if($.trim(userEmail).length === 0){
      //   alert("Please enter email");
      //   e.preventDefault();
      // }

      // if(isEmail(userEmail)){
      //   alert("valid email")
      // }else{
      //   alert("in valid email");
      //   e.preventDefault();
      // }
    });
  }


  //Listen on check valid emial or nor
  function isEmail(email){
    var regex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return regex.test(email);
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

})(jQuery);