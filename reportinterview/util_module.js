/***
 *@doc
 *@File Name : util_module.js
 *@Description : This module used for common function.
 *@Autor : SMOOTHGRAPH CONNECT PVT LTD.
 ***/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['UtilFunction', 'jQuery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('UtilFunction'), require('jQuery'));
  } else {
    // Browser globals (Note: root is window)
    root.returnExports = factory(root.UtilFunction, root.jQuery);
  }
}(this, function (UtilFunction, jQuery) {
    //check data is number or not
    var isNumber = function(){
        //
    };

    //check response is valid json or not
    var validJson = function(){
        //
    };

    //check input type["text"] can accept onlu number only
    function acceptOnlyNum(){
        //
    };

    /*
    *@description : sweetalert handler
    *@param : type -> error/ warring
    *@param : setting {object} -> setting of sweet alert
    *@param : callback {function} -> return call back after execution
    */
    function swalHandler(type, message, setting,callback){
        //
    };

    /*Listen for get index 
     *@param : destObj (oject/array)
     *@param : matchEle (string)
     *@param : matchType (string -optional)
     */
    function getIndex(destObj, matchEle, matchType) {
        var index;
        index = destObj.findIndex(function(item) {
            if (matchType !== undefined && matchType) {
                return (item[matchType] == matchEle);
            } else {
                return (item == matchEle);
            }
        });
        return index;
    };

    //Listen on error 
    function _error() {
        try {
            throw new Error("Something went badly wrong!");
        } catch (e) {
            messageHandler("Oops... \n Something went wrong!", "error");
            console.log("Opps " + e);
        };
    };

    /*
     *@Description : for toastr like message display using bootsrap alert
     *@param : mesg {string}
     *@param : classType {string} ->error/success
     */
    function messageHandler(mesg, classType) {
        var _div = document.createElement('div');
        var _class = "alert custom-message";
        //conditional class
        if (classType === "success") {
            _class += " alert-success";
        } else {
            _class += " alert-danger";
        }
        _div.className = _class;

        var text = document.createTextNode(mesg);
        _div.appendChild(text);
        document.body.appendChild(_div);
        jQuery(_div).fadeOut(4000, function() {
            jQuery(this).remove();
        });
    };

    /*
     *@Description : function to animate scrollbar to top after page change 
     */
    function animate_top() {
        var body = $("html, body");
        body.stop().animate({
            scrollTop: 0
        }, 500, 'swing');
    };

    /*
     *@description : get clone of object without refrence
     *@param : obj {object}
     */

    function getObjectClone(obj) {
        var clone = {};
        //if(obj == undefined || typeof obj != "object") return;
        angular.forEach(obj, function(item, index) {
            if (angular.isObject(item) === true) {
                clone[index] = item.key;
            } else {
                clone[index] = item;
            }
        });
        return clone;
    };

    /*
    *@doc : function 
    *@description : This module used for toastr message in user section with user setting
    *@param : setting {object} ->optional (if setting have then replace default setting)
    *@param : status {string} ->like error/sucess ->required
    *@param : message : {string} -> display message ->required
    */
    var toasterSetting = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "9000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };

    //Toastr option setting for message display
    try{
        toastr.options = toasterSetting;
    }catch(e){
      if(e instanceof ReferenceError)
        console.log;
    }

    function toastMsg(status, message, setting){
      //in case user have update some setting of toastr
      if(setting!== undefined && typeof setting == "object"){
        $.extend(toasterSetting, setting);
        toastr.options = toasterSetting;
      }

      Command: toastr[status](message);
    };


    /*
    *@description : New promice for $.ajax call return callback function after execution.
    *@param : type {string} -> get/post ->required
    *@param : action_url : {string} -> api url  ->required
    *@param : dataObj : {object} -> request data to server  ->required
    *@param : callback function {function} -> required
    *@param : loader_flag {boolean} ->enable /disable loadre ->{optional}
    *@param : loader_elem {string} -> calss name or id of loader element (means which loader u want to 
      enable in this section please pass loader id or class name ) ->{optional}
    */
    function ajaxCallHandler(type, action_url, dataObj, callback, loader_flag, loader_elem){

        if(type == undefined || action_url == undefined || dataObj == undefined) return;

        $.ajax({
          url : action_url,
          method : type.toUpperCase(),
          data : dataObj,
          beforeSend : function(xhr){
            //execute loader here
          }
        }).done(function(data){
          //in case of status done 
          callback(data);
        }).fail(function(error){
          //in case of error from server
          callback(error);
          _error();          
        }).always(function(){
          //in every case
        });
    };


    return {
        _getIndex: getIndex,
        _messageHandler: messageHandler,
        animate_top: animate_top,
        getObjectClone: getObjectClone,
        _errorHandler: _error,
        toastrMessage : toastMsg,
        _ajaxCallHandler : ajaxCallHandler,
    };
}));