//selected seller list data
var selectedSellerList = []; 
var existingElem = [];

jQuery(function () {  	

	/*jQuery('.select').chosen({
		 disable_search_threshold: 10
	});*/

    /*jQuery('.date-select').datepicker({
    	format: 'dd-mm-yyyy',
         autoclose: true
    });*/
    $(document).on("change", "#category", function(){
    	var _option = $(this).val();
    	var _optionText = $(this).find('option:selected').text();
        $('#selectionType').val('category');
    	if(_option!== undefined && _option!= "Specific Product Category"){
    		var _template = '<li><input type="hidden" name="ingredients[]" value='+_option+'>' +  _optionText + '<span class="search-close remove-list"></span></li>';  
    		//add li in ul
    		$(".multiselect-value ul").append(_template);         		
    		//remove option from select box
    		$(this).find("option:selected").remove();
    	}
    });

    $(document).on("click", ".remove-list", function(event){
    	event.stopPropagation();
    	var _val = $(this).parent("li").clone().children().remove().end().text();
    	var _opt = '<option value='+_val+'>'+_val+'</option>';
    	$("#category").append(_opt);
    	$(this).parent("li").remove();
    });

    $('#trade_fair').change(function(){
    	var fair_id = $(this).val();
    	if(fair_id){
      	var detail_data = dataConfig[fair_id];
      	//console.log(detail_data);
      	$.ajax({
            	type: 'GET',
            	url: base_url+"business-matching/get-schedule.php",
            	data:{'id':fair_id,'datajson':detail_data},
            	
            	success: function (data) {
                $('#schedule_box').show();
            		$('.schedule-contain').html(data);
                  $('#hintDate').html(dataConfig[fair_id].hint);
                  $('#hintTime').html(dataConfig[fair_id].str_time+' - '+dataConfig[fair_id].end_time);
          		//console.log(data);
            	}
        })
      }
    })
$('#seller-select-modal').modal('show');
    /*$('#select_seller').click(function(){
        var trade_fair_id = $('#trade_fair').val();
        if(trade_fair_id == '' || trade_fair_id == undefined){
            alert('Please select fair first');
            return false;
        }
        $('#selectionType').val('seller');
        //console.log(trade_fair_id);
        $.ajax({
                type: 'GET',
                url: base_url+"business-matching/get-fair-seller.php",
                data:{'trade_fair_id':trade_fair_id},
                dataType:"json",
                success: function (data) {                    
                    selectedSellerList = data.resdata;                    
                    if(data.tot > 0){
                        $('#seller_list').html(data.res);
                        $('#totseller').html(data.tot);
                    }else{
                        $('#seller_list').html("No seller exist in this fair");
                    }
                    $('#seller-select-modal').modal('show');
                }
        })  
    })*/

});

$('body').on('click','#sel-seller',function(){
    var chkArray = [];
    $(".sellerchk:checked").each(function() {
        chkArray.push($(this).val());
    });
    
    var selected;
    selected = chkArray.join(',') ;
    $('#selected_seller').val(selected);    
    var result =  _getFilterData(selectedSellerList, chkArray);
    if(result!== undefined && result!== ""){
        jQuery("#selected_seller_list ul").append(result);
    }
    $('#seller-select-modal').modal('hide');
})

$('body').on('click','.btn-cancel',function(){
    var id = $(this).attr('attr');
    
    $('#sch_'+id).html('');
})

$('body').on('click','.chkall',function(){
    var id = $(this).val();
    if($(this).is(':checked')){
      $('.chktime_'+id).prop('checked', true);
    }else{
      $('.chktime_'+id).prop('checked', false);
    }
    
})

var passAjax = true;
$(document).ready(function(){
  //keyword OmTextComplete-------------------------------------------------------------------------------------
  
  $("#business_match_schedule").validationEngine({
      promptPosition : "bottomLeft",
    maxErrorsPerField:1,
    scroll: true,
    // autoHidePrompt:true,
    // autoHideDelay: 2000,
    doNotShowAllErrosOnSubmit: true,
    addFailureCssClassToField: "error",
      'custom_error_messages' :
      {
          '#fax':{'required': {'message': MSG_VALID_FIELD}},
          '#specification':{'required': {'message': MSG_VALID_FIELD}}

      },
      onValidationComplete: function(form, status){
      if(status){

        sendDataequotation();
        return false;

      }else{
        // $("select").each(function(){
        //  if($(this).hasClass("error")){
        //    $(this).parent().css("border","1px solid #DA2128");
        //  }
        // })
      }
      }
  });

  //for pagination and filter

  //seller_list
    $('#seller_list').jplist({       
      itemsBox: '#seller_list li', 
      // itemPath: '.list-item', 
      panelPath: '.jplist-panel',
      itemsPerPage : 2,  
    });
});

function sendDataequotation(){
  if(passAjax){
    passAjax = false;
    $("#btn-postLead").hide();
    $(".submit-loading").show();

    $.ajax({
      type: "POST",
      dataType:"json",
      cache: false,
      url: base_url+"business-matching/business_match_schedule_submit.php",
      data: $("#business_match_schedule").serialize(),
      success: function(msg){
        if(msg.status=="OK"){

          var url = base_url+'business-matching/thanks/'+msg.id+'?mess=ok';
          window.location.href=(url);
          redirect(url);
        }else{
          alert(msg.msg,"Error");
        }
      },
      complete:function(){
        $(".submit-loading").hide();
        $("#btn-postLead").show();
        passAjax = true;
      }

    });
  }
};

//generate selected seller template
function _getFilterData(data, matchArr){
  var template = "";  

  if(data === undefined || Object.keys(data).length === 0 || matchArr== undefined || matchArr.length === 0) return template;
  
    jQuery.each(data,function(key, elem){
      if(matchArr.indexOf(key)>=0 && existingElem.indexOf(key) == -1){
          existingElem.push(key);
          template += "<li><span>"+elem.company_name+"</span></li>";        
      }    
    });
  selectedSellerList = [];
  return template;
};