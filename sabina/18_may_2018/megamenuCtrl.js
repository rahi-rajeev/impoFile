(function(){
  /****
  *@This controller used for megamenu
  *@Create date 10/11/2017
  *@Ahthor : Smoothgraph Connect Pvt Ltd.
  *****/
  function _megaMenuHandler($scope,salesfactoryData,$timeout){
    $scope.langArr=langCodearr.split(',');
    $scope.globalTree=JSON.parse(globalTree);
    $scope.id=id;
    $scope.site_url=site_url;
    $scope.geturl=url;
    $scope.saveUrl=saveUrl;
    $scope.listingUrl=listingUrl;
    $scope.typelistUrl=typelistUrl;
    $scope.default_lang_id=default_lang_id;
    $scope.blockListUrl=blockListUrl;
    $scope.imagesListUrl=imagesListUrl;
    //Font Icon Library
    $scope.iconLibrabry = [{"label":"Web Application Icons","icons":["adjust","american-sign-language-interpreting","anchor","archive","area-chart","arrows","arrows-h","arrows-v","asl-interpreting","assistive-listening-systems","asterisk","at","audio-description","automobile","balance-scale","ban","bank","bar-chart","bar-chart-o","barcode","bars","battery-0","battery-1","battery-2","battery-3","battery-4","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed","beer","bell","bell-o","bell-slash","bell-slash-o","bicycle","binoculars","birthday-cake","blind","bluetooth","bluetooth-b","bolt","bomb","book","bookmark","bookmark-o","braille","briefcase","bug","building","building-o","bullhorn","bullseye","bus","cab","calculator","calendar","calendar-check-o","calendar-minus-o","calendar-o","calendar-plus-o","calendar-times-o","camera","camera-retro","car","caret-square-o-down","caret-square-o-left","caret-square-o-right","caret-square-o-up","cart-arrow-down","cart-plus","cc","certificate","check","check-circle","check-circle-o","check-square","check-square-o","child","circle","circle-o","circle-o-notch","circle-thin","clock-o","clone","close","cloud","cloud-download","cloud-upload","code","code-fork","coffee","cog","cogs","comment","comment-o","commenting","commenting-o","comments","comments-o","compass","copyright","creative-commons","credit-card","credit-card-alt","crop","crosshairs","cube","cubes","cutlery","dashboard","database","deaf","deafness","desktop","diamond","dot-circle-o","download","edit","ellipsis-h","ellipsis-v","envelope","envelope-o","envelope-square","eraser","exchange","exclamation","exclamation-circle","exclamation-triangle","external-link","external-link-square","eye","eye-slash","eyedropper","fax","feed","female","fighter-jet","file-archive-o","file-audio-o","file-code-o","file-excel-o","file-image-o","file-movie-o","file-pdf-o","file-photo-o","file-picture-o","file-powerpoint-o","file-sound-o","file-video-o","file-word-o","file-zip-o","film","filter","fire","fire-extinguisher","flag","flag-checkered","flag-o","flash","flask","folder","folder-o","folder-open","folder-open-o","frown-o","futbol-o","gamepad","gavel","gear","gears","gift","glass","globe","graduation-cap","group","hand-grab-o","hand-lizard-o","hand-paper-o","hand-peace-o","hand-pointer-o","hand-rock-o","hand-scissors-o","hand-spock-o","hand-stop-o","hard-of-hearing","hashtag","hdd-o","headphones","heart","heart-o","heartbeat","history","home","hotel","hourglass","hourglass-1","hourglass-2","hourglass-3","hourglass-end","hourglass-half","hourglass-o","hourglass-start","i-cursor","image","inbox","industry","info","info-circle","institution","key","keyboard-o","language","laptop","leaf","legal","lemon-o","level-down","level-up","life-bouy","life-buoy","life-ring","life-saver","lightbulb-o","line-chart","location-arrow","lock","low-vision","magic","magnet","mail-forward","mail-reply","mail-reply-all","male","map","map-marker","map-o","map-pin","map-signs","meh-o","microphone","microphone-slash","minus","minus-circle","minus-square","minus-square-o","mobile","mobile-phone","money","moon-o","mortar-board","motorcycle","mouse-pointer","music","navicon","newspaper-o","object-group","object-ungroup","paint-brush","paper-plane","paper-plane-o","paw","pencil","pencil-square","pencil-square-o","percent","phone","phone-square","photo","picture-o","pie-chart","plane","plug","plus","plus-circle","plus-square","plus-square-o","power-off","print","puzzle-piece","qrcode","question","question-circle","question-circle-o","quote-left","quote-right","random","recycle","refresh","registered","remove","reorder","reply","reply-all","retweet","road","rocket","rss","rss-square","search","search-minus","search-plus","send","send-o","server","share","share-alt","share-alt-square","share-square","share-square-o","shield","ship","shopping-bag","shopping-basket","shopping-cart","sign-in","sign-language","sign-out","signal","signing","sitemap","sliders","smile-o","soccer-ball-o","sort","sort-alpha-asc","sort-alpha-desc","sort-amount-asc","sort-amount-desc","sort-asc","sort-desc","sort-down","sort-numeric-asc","sort-numeric-desc","sort-up","space-shuttle","spinner","spoon","square","square-o","star","star-half","star-half-empty","star-half-full","star-half-o","star-o","sticky-note","sticky-note-o","street-view","suitcase","sun-o","support","tablet","tachometer","tag","tags","tasks","taxi","television","terminal","thumb-tack","thumbs-down","thumbs-o-down","thumbs-o-up","thumbs-up","ticket","times","times-circle","times-circle-o","tint","toggle-down","toggle-left","toggle-off","toggle-on","toggle-right","toggle-up","trademark","trash","trash-o","tree","trophy","truck","tty","tv","umbrella","universal-access","university","unlock","unlock-alt","unsorted","upload","user","user-plus","user-secret","user-times","users","video-camera","volume-control-phone","volume-down","volume-off","volume-up","warning","wheelchair","wheelchair-alt","wifi","wrench"]},{"label":"Accessibility Icons","icons":["american-sign-language-interpreting","asl-interpreting","assistive-listening-systems","audio-description","blind","braille","cc","deaf","deafness","hard-of-","low-vision","question-circle-o","sign-language","signing","tty","universal-access","volume-control-phone","wheelchair","wheelchair-al"]},{"label":"Hand Icons","icons":["hand-grab-o","hand-lizard-o","hand-o-down","hand-o-left","hand-o-right","hand-o-up","hand-paper-o","hand-peace-o","hand-pointer-o","hand-rock-o","hand-scissors-o","hand-spock-o","hand-stop-o","thumbs-down","thumbs-o-down","thumbs-o-up","thumbs-up"]},{"label":"Brand Icons","icons":["500px","adn","amazon","android","angellist","apple","behance","behance-square","bitbucket","bitbucket-square","bitcoin","black-tie","bluetooth","bluetooth-b","btc","buysellads","cc-amex","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","chrome","codepen","codiepie","connectdevelop","contao","css3","dashcube","delicious","deviantart","digg","dribbble","dropbox","drupal","edge","empire","envira","expeditedssl","fa","facebook","facebook-f","facebook-official","facebook-square","firefox","first-order","flickr","font-awesome","fonticons","fort-awesome","forumbee","foursquare","ge","get-pocket","gg","gg-circle","git","git-square","github","github-alt","github-square","gitlab","gittip","glide","glide-g","google","google-plus","google-plus-circle","google-plus-official","google-plus-square","google-wallet","gratipay","hacker-news","houzz","html5","instagram","internet-explorer","ioxhost","joomla","jsfiddle","lastfm","lastfm-square","leanpub","linkedin","linkedin-square","linux","maxcdn","meanpath","medium","mixcloud","modx","odnoklassniki","odnoklassniki-square","opencart","openid","opera","optin-monster","pagelines","paypal","pied-piper","pied-piper-alt","pied-piper-pp","pinterest","pinterest-p","pinterest-square","product-hunt","qq","ra","rebel","reddit","reddit-alien","reddit-square","renren","resistance","safari","scribd","sellsy","share-alt","share-alt-square","shirtsinbulk","simplybuilt","skyatlas","skype","slack","slideshare","snapchat","snapchat-ghost","snapchat-square","soundcloud","spotify","stack-exchange","stack-overflow","steam","steam-square","stumbleupon","stumbleupon-circle","tencent-weibo","themeisle","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","usb","viacoin","viadeo","viadeo-square","vimeo","vimeo-square","vine","vk","wechat","weibo","weixin","whatsapp","wikipedia-w","windows","wordpress","wpbeginner","wpforms","xing","xing-square","y-combinator","y-combinator-square","yahoo","yc","yc-square","yelp","yoast","youtube","youtube-play","youtube-square"]},{"label":"File Type Icons","icons":["file-archive-o","file-audio-o","file-code-o","file-excel-o","file-image-o","file-movie-o","file-o","file-pdf-o","file-photo-o","file-picture-o","file-powerpoint-o","file-sound-o","file-text","file-text-o","file-video-o","file-word-o","file-zip-o"]},{"label":"Text Editor Icons","icons":["align-center","align-justify","align-left","align-right","bold","chain","chain-broken","clipboard","columns","copy","cut","dedent","eraser","file","file-o","file-text","file-text-o","files-o","floppy-o","font","header","indent","italic","link","list","list-alt","list-ol","list-ul","outdent","paperclip","paragraph","paste","repeat","rotate-left","rotate-right","save","scissors","strikethrough","subscript","superscript","table","text-height","text-width","th","th-large","th-list","underline","undo"]},{"label":"Directional Icons","icons":["angle-double-down","angle-double-left","angle-double-right","angle-double-up","angle-down","angle-left","angle-right","angle-up","arrow-circle-down","arrow-circle-left","arrow-circle-o-down","arrow-circle-o-left","arrow-circle-o-right","arrow-circle-o-up","arrow-circle-right","arrow-circle-up","arrow-down","arrow-left","arrow-right","arrow-up","arrows","arrows-alt","arrows-h","arrows-v","caret-down","caret-left","caret-right","caret-square-o-down","caret-square-o-left","caret-square-o-right","caret-square-o-up","caret-up","chevron-circle-down","chevron-circle-left","chevron-circle-right","chevron-circle-up","chevron-down","chevron-left","chevron-right","chevron-up","exchange","hand-o-down","hand-o-left","hand-o-right","hand-o-up","long-arrow-down","long-arrow-left","long-arrow-right","long-arrow-up","toggle-down","toggle-left","toggle-right","toggle-up"]},{"label":"Video Player Icons","icons":["arrows-alt","backward","compress","eject","expand","fast-backward","fast-forward","forward","pause","pause-circle","pause-circle-o","play","play-circle","play-circle-o","random","step-backward","step-forward","stop","stop-circle","stop-circle-o","youtube-play"]},{"label":"Form Control Icons","icons":["check-square","check-square-o","circle","circle-o","dot-circle-o","minus-square","minus-square-o","plus-square","plus-square-o","square","square-o"]},{"label":"Chart Icons","icons":["area-chart","bar-chart","bar-chart-o","line-chart","pie-chart"]},{"label":"Currency Icons","icons":["bitcoin","btc","cny","dollar","eur","euro","gbp","gg","gg-circle","ils","inr","jpy","krw","money","rmb","rouble","rub","ruble","rupee","shekel","sheqel","try","turkish-lira","usd","won","yen"]},{"label":"Gender Icons","icons":["genderless","intersex","mars","mars-double","mars-stroke","mars-stroke-h","mars-stroke-v","mercury","neuter","transgender","transgender-alt","venus","venus-double","venus-mars"]},{"label":"Spinner Icons","icons":["circle-o-notch","cog","gear","refresh","spinner"]},{"label":"Transportation Icons","icons":["ambulance","automobile","bicycle","bus","cab","car","fighter-jet","motorcycle","plane","rocket","ship","space-shuttle","subway","taxi","train","truck","wheelchair"]},{"label":"Medical Icons","icons":["ambulance","h-square","heart","heart-o","heartbeat","hospital-o","medkit","plus-square","stethoscope","user-md","wheelchair"]}];
    $scope.parent_id=0; 
    $scope.item_1=false;
    //Decalare the Global Variables for Link Item
    $scope.linkTitle = "Item Wrapper";
    $scope.linkMenuUrl = "";
    $scope.linkMenuCustomClass = "";
    $scope.linkMenuIcon = "link";
    $scope.CurrentNodeKey='';
    $scope.menu={
      "title":'',
      "wrapper_id":'menuid'+Math.floor(Math.random(1111,9999) * 20000),
      "is_default_block":'',
      "wrapper_css_class":'',
      "dropdown_animation":'',
      "dropdown_style":'',
      "status":'',
      "block_id":'0',
      "block_name":'',
    };
    $scope.LinkMenuType=[];
    $scope.LinkMenuType=[{
                            'id'    : '1',
                            'title' : 'Product Category',
                            'class' : 'glyphicon glyphicon-gift'
                          },
                          {
                            'id'    : '2',
                            'title' : 'Blog Category',
                            'class' : 'glyphicon glyphicon-list'
                          },
                          {
                            'id'    : '3',
                            'title' : 'System Page Link',
                            'class' : 'glyphicon glyphicon-edit'
                          },
                          {
                            'id'    : '4',
                            'title' : 'Page Link',
                            'class' : 'glyphicon glyphicon-open-file'
                          },
                          {
                            'id'    : '5',
                            'title' : 'Product Link',
                            'class' : 'glyphicon glyphicon-cd'
                          },
                          {
                            'id'    : '6',
                            'title' : 'Blog Link',
                            'class' : 'glyphicon glyphicon-book'
                          }];

    $scope.systmePageLinks=[
                              {'title':'Homepage','url':$scope.site_url},
                              {'title':'Listing Page','url':$scope.site_url+'/category/lorem-ipsum'},
                              {'title':'Product Detail Page','url':$scope.site_url+'/product/panty/MC1509002649FG'},
                              {'title':'Cart Page','url':$scope.site_url+'/cart'},
                              {'title':'Checkout Page','url':$scope.site_url+'/cart'},
                              {'title':'Thank You Page','url':$scope.site_url+'/thanks'},
                              {'title':'Login Page','url':$scope.site_url+'/login'},
                              {'title':'Forgot Password Page','url':$scope.site_url+'/login'},
                              {'title':'Brand Listing Page','url':$scope.site_url+'/product/panty/MC1509002649FG'},
                              {'title':'Take it fast','url':$scope.site_url},
                              {'title':'Ok Page','url':$scope.site_url}
                            ];                      

    $scope.cattree = "";
    //Update Curent Object
    $scope.objId='';
    $scope.objType='';
    $scope.objIndexType='';
    $scope.latestElementIndex='';
    //tree node option config 
    $scope.megaMenuTreeOption ={
      dropped:function(event){
       var id = event.source.cloneModel.id;
       var i=0;
        //console.log(event.dest.nodesScope.$parent);
        //console.log(event.dest.nodesScope.$parent.$modelValue.id);
        
        angular.forEach(event.dest.nodesScope.$modelValue,function(item){
          if(item.id===id){
            i++;
            if(i>1){
              $timeout(function(){
                item.id+=parseInt(item.$$hashKey.split('object:')[1]); 
                 //item['parent_id'] = id;
              });
            }
          }
        });
        
        // alert(5454545);
        // if(event.dest.nodesScope.$parent.$modelValue!=undefined){
        //   angular.forEach(event.dest.nodesScope.$modelValue,function(item){
        //     item.parent_id=event.dest.nodesScope.$parent.$modelValue.id;
        //  });
        // }
        //$scope.setParentIdToChild($scope.data);

          //  var sourceValue = e.source.nodeScope.$modelValue.value,
          //   destValue = e.dest.nodesScope.node ? e.dest.nodesScope.node.value : undefined,
          //   modalInstance;

          // // display modal if the node is being dropped into a smaller container
          // alert(sourceValue);
          // alert(destValue);
          
          // if (sourceValue > destValue) {
          //   modalInstance = $modal.open({
          //     templateUrl: 'drop-modal.html'
          //   });
          //   // or return the simple boolean result from $modal
          //   if (!e.source.nodeScope.$treeScope.usePromise) {
          //     return modalInstance.result;
          //   } else { // return a promise
          //     return modalInstance.result.then(function (allowDrop) {
          //       if (!allowDrop) {
          //         return $q.reject();
          //       }
          //       return allowDrop;
          //     });
          //   }
          // }
      
      },
      dragMove: function(event){
          var id = event.source.cloneModel.id;
          var i=0;
          angular.forEach(event.dest.nodesScope.$modelValue,function(item){
          if(item.id===id){
            i++;
            if(i>1){
              $timeout(function(){
                item.id+=parseInt(item.$$hashKey.split('object:')[1]); 
                 //item['parent_id'] = id;
              });
            }
          }
        });
        //console.log(event);
        // if(event.dest.nodesScope.$parent.$modelValue!=undefined){
            //console.log(event.dest.nodesScope.$parent.$modelValue.id);
            //event.dest.nodesScope.$modelValue.parent_id=event.dest.nodesScope.$parent.$modelValue.id;
        // }
      },
      beforeDrop: function(event){
        
        console.log(event);
        // console.log(event.dest.nodesScope.$modelValue);
        // if(event.dest.nodesScope.$parent.$modelValue!=undefined){
        //   //event.dest.nodesScope.$modelValue.parent_id=event.dest.nodesScope.$parent.$modelValue.id;
        //   //console.log(event.dest.nodesScope.$parent.$modelValue.menutypeId);
        //   console.log(event.dest.nodesScope.$modelValue);
        //   if(event.dest.nodesScope.$parent.$modelValue.menuTypeId==1){

        //       if(event.dest.nodesScope.$modelValue.menuTypeId==2){ 
        //           return false; 
        //           alert('Not Allowed');

        //       }else{
                
        //         return true;
        //       }
        //   }
        // }
      },
    };





    //Get List of Images Library
    $scope.getImageList = function(type){
        _getImagesList(type);

    };

    /*
      * @delete Menu
      */
      $scope.updateStatus = function(url){
        alert(545);
      };




    //This function getting the result of 
    _getImagesList = function(typeId){
      salesfactoryData.getData($scope.imagesListUrl,'GET',{type:typeId})
      .then(function(r){
        if(typeId=='images'){
          $('#images').toggle();
          $scope.imageList = r.data.list;
          $scope.imageListCount = r.data.list.length;
        }

        if(typeId=='product'){
          $('#products').toggle();
          $scope.productsimageList = r.data.list;
          $scope.productsimageListCount = r.data.list.length;
        }

        if(typeId=='staticpages'){
          $('#pages').toggle();
          $scope.pagesimageList = r.data.list;
          $scope.pagesimageListCount = r.data.list.length;
        }



      },function(error){
        //error handler sectcion
      });
    };



    




    $scope.getObjectSeq = function(e){
        if(e.menuTypeId==1){
           $scope.updateKey='';
           $scope.prepareItemWrapper(e); 
        }  
    };
    //Update Item Wrapper Object
    $scope.prepareItemWrapper = function(e){
       /* for(key in $scope.Finaldata){ 
          if($scope.Finaldata[key].id==e.id){
            $scope.updateKey=key;
          }
        }  */  

        $scope.itemTitle = $('#title_'+e.id).val();
        $scope.class = '';
        $scope.menuIcon = '';
        $scope.menuParentIcon = '';
        $scope.link_ = $('#link_'+e.id).val();
        $scope.nolink_ = $('#nolink_'+e.id).val();
        $scope.customcss = $('#customcss_'+e.id).val();
        $scope.LinkInput = $('#LinkInput_'+e.id).val();
        $scope.ItemWrapperObj = {
          'id':e.id,
          'menuTypeId':1,
          'title':$scope.itemTitle,
          'class':$scope.class,
          'link':$scope.link,
          'menuIcon':$scope.menuIcon,
          'menuParentIcon':$scope.menuParentIcon,
          'attributes':{
                  'title'       : $scope.itemTitle,
                  'linkoptions' : $scope.link,
                  'LinkInput'   : $scope.LinkInput,
                  'customcss'   : $scope.customcss,
                  'menuIcon'    : $scope.menuIcon,
          }
        };


        /*$($scope.Finaldata).each(function(key,value){
          
          if(value.id==e.id){
            $scope.Finaldata[key]=$scope.ItemWrapperObj;
          }
        });*/
       // $scope.Finaldata=$scope.ItemWrapperObj;
        //console.log($scope.Finaldata);
    };
    //BackPage
    $scope.back = function(){
      location.href=$scope.listingUrl;
    };
    //Save Menu
    $scope.validForm =function(a,b,c){
      _toastrMessage(c,b);
    }

    $scope.saveMenu = function(){
      if($scope.menu.title==''){
        $scope.validForm('error','Please Enter Title.','error');
      }else if($scope.menu.wrapper_id==''){
        $scope.validForm('error','Please Enter wrapper ID.','error');
      }else if($scope.menu.block_id==''){
        $scope.validForm('error','Please Choose Block.','error');
      }else if($scope.data.length==0){
        $scope.validForm('error','Please add atlest one menu item.','error');
      }else{
        $('#msg').hide();
        $('#msg').addClass('');
      salesfactoryData.getData($scope.saveUrl,'POST',{menu:$scope.menu,data: $scope.data,id:$scope.id})
      .then(function(r){
        $scope.validForm('Success',r.data.message,'success');
      },function(error){
        $scope.validForm('Error',r.data.message,'error');
      });
    }
    };
    $scope.collapseAll = function () {
      $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    $scope.expandAll = function () {
       $scope.$broadcast('angular-ui-tree:expand-all');
    };



    $scope.openItem = function($event, node, e, index){
        $event.preventDefault();        
        var wraper_id = 'item_'+e+'_'+index;
        node.toggle_class = !node.toggle_class;
        $('#'+wraper_id).toggle(200); 
        $scope.objId=e;
        $scope.objType='';
        $scope.objType=index;
    }; 



    $scope.openChildItem = function($event, node, e, index, parentNodeId, currentNodeId){        
        node.toggle_class = !node.toggle_class;
        $('#item_'+e+'_'+index+'_'+parentNodeId+'_'+currentNodeId).toggle(200);         
        $scope.objId=e;
        $scope.objType='';
        $scope.objType=index;
    }; 





    //Open Modle Box For Getting Icon List, here we can choose Icon from Library
    $scope.showModelBox = function(node){
      //$('#myModal').modal("show");
      console.log($scope.data);
      $($scope.data).each(function(key,value){
        if(value.id==node.id){
          $('#hiddenNodeId').val(key);
        }
      });
    };




//Open Modle Box For Getting Icon List, here we can choose Icon from Library
    $scope.showModelBoxForImages = function(node){
      //$('#myModal').modal("show");
      $('#hiddenImageNodeId').val(node.id);
      $($scope.data).each(function(key,value){
        if(value.id==node.id){
          // $('#hiddenImageNodeId').val(key);
        }
      });
    };


    /*
     * @Author: Pradeep Kumar
     * @Description: To Set the Image for the Node
     */
     $scope.setImageForContent = function(imagePath){
      $scope.hiddenCurrentNode=$('#hiddenImageNodeId').val();
      angular.forEach($scope.data,function(v,k){
        if(v.id==$scope.hiddenCurrentNode){
          $scope.data[k].atrBackgroundImage=imagePath;
        }
      });
      $('#myImageModal').trigger('click');
    };





    $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
    };
    $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
    };

    $scope.noLink = function(e){
     $('#LinkInput_'+e).hide();
    };  

    $scope.openLink = function(e){
       $('#LinkInput_'+e).show();
    };  
 

    //get Icon 
     $scope.getIcon = function(iconName){
        $scope.linkMenuIcon =iconName;
        $scope.nodeIndex=$('#hiddenNodeId').val();
        $scope.data[$scope.nodeIndex].atrmenuIcon=iconName;
        $scope.data[$scope.nodeIndex].menuIcon=iconName;
        // $('#linkMenuIcon_'+$scope.data[$scope.nodeIndex].id).removeClass('glyphicon glyphicon-'+$scope.linkMenuIcon);
        $('#linkMenuIcon_'+$scope.data[$scope.nodeIndex].id).removeClass();
        $('#linkMenuIcon_'+$scope.data[$scope.nodeIndex].id).addClass('fa fa-'+iconName);
        $('#menuIcon_'+$scope.data[$scope.nodeIndex].id).removeClass();
        $('#menuIcon_'+$scope.data[$scope.nodeIndex].id).addClass('icon');
        $('#menuIcon_'+$scope.data[$scope.nodeIndex].id).addClass('fa fa-'+iconName);
        $('#linkMenuIcon_'+$scope.data[$scope.nodeIndex].menuIcon).addClass('fa fa-'+iconName);
        $('#hiddenNodeId').val('');
        $('#myModal').trigger('click');
     };


     $scope.removeIconFromNode = function(nodeId){
        $scope.linkMenuIcon ='';
     };






     /*
      * @Get Parent Node Index
      */
      $scope.getParentNodaIndex = function(node){
        //console.log(node);
      }

     //get Icon 
     $scope.removeIcon = function(node_id){
        $('#menuIcon_'+node_id).removeClass();
        $('#linkMenuIcon_'+node_id).removeClass();
        $('#menuIcon_'+node_id).addClass('icon glyphicon glyphicon-');
        $($scope.data).each(function(key,value){
         if(node_id==value.id){
            $scope.data[key].menuIcon='';
         } 
        });
     };

     $scope.CurrentNodeKey=0;
     $scope.getCurentNodeIndex = function(nodeId){
        $($scope.data).each(function(key,value){
         if(nodeId==value.id){
          $scope.CurrentNodeKey=key;
         } 
        });
     };

     //Set Layout for the Content
     $scope.tabContentLayout = function(Type,nodeId,index,parnetNodeId){
      // alert(Type);
      // alert(nodeId);
      // alert(index);
      // alert(parnetNodeId);
      if(Type==1)
      {
        $('#TABcolumn_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }

      if(Type==2)
      {
        $('#TABcolumn_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }


      if(Type==3)
      {
        $('#TABcolumn_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }

      if(Type==4)
      {
        $('#TABcolumn_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#TABcolumn_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }


      $('#TABcolumn_'+Type+'_'+index+'_'+nodeId+'_'+parnetNodeId).addClass('in active');
     
      
        //Get Current Node Keyalert(index);
        //$scope.getCurentNodeIndex(nodeId);
        // angular.forEach($scope.data,function(value,key){
        //   if(value.id==parnetNodeId){
        //       if($scope.data[key].nodes){
        //           angular.forEach($scope.data[key].nodes,function(v,k){
        //               if(v.id==nodeId){
        //                   $scope.data[key].nodes[k].atrLayoutType=Type;
        //               }else{
        //                 //$scope.contentLayout(Type,nodeId,index,v.id);
        //               }
        //           });
        //      }
        //   }
        // });

        angular.forEach($scope.data,function(value,key){
              if(value.id==parnetNodeId){
                if(value.nodes){
                    angular.forEach(value.nodes,function(v,k){
                      if(v.menuTypeId==4){
                        angular.forEach(v.nodes,function(vv,kk){
                          if(vv.id==nodeId){
                          $scope.data[key].nodes[k].nodes[kk].atrLayoutType=Type;
                        }
                      });
                    };
                  }); 
                }
              }
        });
        //$scope.data[$scope.CurrentNodeKey].atrLayoutType=Type;
        $scope.CurrentNodeKey=0;
     };




     //Set Layout for the Content
     $scope.contentLayout = function(Type,nodeId,index,parnetNodeId){
      if(Type==1)
      {
        $('#column_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }

      if(Type==2)
      {
        $('#column_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }


      if(Type==3)
      {
        $('#column_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_4_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }

      if(Type==4)
      {
        $('#column_1_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_2_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
        $('#column_3_'+index+'_'+nodeId+'_'+parnetNodeId).removeClass('in active');
      }


      $('#column_'+Type+'_'+index+'_'+nodeId+'_'+parnetNodeId).addClass('in active');
     
      
        //Get Current Node Keyalert(index);
        //$scope.getCurentNodeIndex(nodeId);
        // angular.forEach($scope.data,function(value,key){
        //   if(value.id==parnetNodeId){
        //       if($scope.data[key].nodes){
        //           angular.forEach($scope.data[key].nodes,function(v,k){
        //               if(v.id==nodeId){
        //                   $scope.data[key].nodes[k].atrLayoutType=Type;
        //               }else{
        //                 //$scope.contentLayout(Type,nodeId,index,v.id);
        //               }
        //           });
        //      }
        //   }
        // });

        angular.forEach($scope.data,function(value,key){
              if(value.id==parnetNodeId){
                if(value.nodes){
                    angular.forEach(value.nodes,function(v,k){
                      if(v.id==nodeId){
                        $scope.data[key].nodes[k].atrLayoutType=Type;
                      }
                    });
                } 
              }
        });
        //$scope.data[$scope.CurrentNodeKey].atrLayoutType=Type;
        $scope.CurrentNodeKey=0;
     };

     $scope.setContentPosition = function(Type,nodeId){
        $scope.getCurentNodeIndex(nodeId);
        setTimeout(function(){
          $scope.data[$scope.CurrentNodeKey].position=Type;
        for(i=1;i<=12;i++){
           $('#position_'+nodeId+'_'+i).removeClass('active'); 
        }
        $('#position_'+nodeId+'_'+Type).addClass('active'); 
        },1000);
        
     };



     //Set Language For Node title
     $scope.setLangTab=function(node,landId){
        angular.forEach($scope.data,function(value,key){
            if(node.id==value.id){
              $scope.data[key].default_lang_id=landId;
            }
        });
     };


     //Wrapper Item template Functionality
     $scope.itemWrapperTitle = 'Item Wrapper';
     $scope.itemWrapperLinkOptions = '0';
     $scope.itemWrapperLink = '';
     $scope.itemWrapperCSS = '';
     // $scope.linkMenuIcon='';
     $scope.data = [];
     $scope.tree2=$scope.globalTree; 

     //
     $scope.getPostionDefaultclass = function(){
      angular.forEach($scope.data,function(value,key){
          if(value.menuTypeId==2){
            $("#position_"+value.id+"_"+value.position).addClass('active');
          }
      });
     };  
     $scope._getCss= function(style){
     	if(angular.isUndefined(style)){
     		return;
      }
     	var tcss = {};
      if(style.length){
     	  var t = style.split(':');
     	  var a = t[1].split(';')[0];
     	  tcss[t[0].trim()] = a;
      }
     	return tcss;
     };               

    //This function self executable for get data megamenu data
    _getMegaMenuData = function(){
      salesfactoryData.getData($scope.geturl,'GET',{'id':$scope.id})
      .then(function(r){
        //response section
        // console.log(r.data);
        if($scope.id>0){
          $scope.data = r.data.menu_json;
            $scope.menu={
              "title":r.data.title,
              "wrapper_id":r.data.wrapper_id,
              "is_default_block":r.data.is_default_block,
              "wrapper_css_class":r.data.wrapper_css_class,
              "dropdown_animation" : r.data.dropdown_animation,
              "dropdown_style" : r.data.dropdown_style,
              "block_id" : r.data.block_id,
              "block_name" : r.data.block_name,
              "status" : r.data.status
            };   
            // console.log($scope.menu);
            //Set Position for Content Tab
        $scope.getPostionDefaultclass();       
        
        }else{
          $scope.data = [];
        }
      },function(error){
        //error handler sectcion
      });
      $scope.tree1 = $scope.tree2;
    };

    _getMegaMenuData();

    $scope.parJson = function (json) {
        return JSON.parse(json);
    };


     /*
   * @Get Category Id
   *
   */
   var currentNodeId = "";
   $scope.getParentId = function(node, $event){
      currentNodeId = node.id;
      node.checked = !node.checked;
      // console.log(node);
      var currentMenuListId;
      //get current list id from menu
      if($($event.currentTarget).parents(".menu-edit-inner").attr("id")!==undefined){
        currentMenuListId = $($event.currentTarget).parents(".menu-edit-inner").attr("id");
        currentMenuListId = currentMenuListId.split("_")[4];
      }
      

      angular.forEach($scope.data,function(value,key){
         //console.log(value);
          if(value.id==$scope.hiddenCurrentNode){
             value.parentId=currentNodeId;
          }
          //In case megamenu have node and node match with  obj id then set model
          if(value.nodes!==undefined && value.nodes.length){
             var index =  _getIndex(value.nodes, currentMenuListId, "id");
             if(index!= -1){
                value.nodes[index].atrlinkoptions = 1; 
                value.nodes[index].atrLinkInput = node.url;
                value.nodes[index].enTitle.input = node.categorydesc.category_name;
                value.nodes[index].category_id = currentNodeId;
             }             
          }
      });

      //console.log($scope.objId);

      $('#categoryList').trigger('click');
      //console.log(node)
      $.map($scope.cattree, function(item){
        checkedCateNode(item);
      })
   };

   //Listen on checked false all except current node
   function checkedCateNode(node){
      if(!node) return;

      if(node.id!== undefined && node.id != currentNodeId){
          node.checked = false;
      }

      if(node.children){
        node.children.forEach(function(childNode) {
           checkedCateNode(childNode);  
        })
      }
   };

   $scope.selectNode = function(e){
      // console.log("delect node");
      $scope.hiddenCurrentNode=e;
   };





   $scope.categoryTitle='';
   $scope.categoryShow=false;
   $scope.productShow=false;
   $scope.pageLinkShow=false;
   $scope.getTypeList = function(type){
      $scope.productShow=false;
      $scope.categoryShow=false;
      $scope.pageLinkShow=false;
      if(type==1){ 
        $scope.categoryShow=true;
        $scope.categoryTitle='Category Link';
      }else if(type==2){
         $scope.categoryTitle='Blog Category';
      }else if(type==3){
         $scope.categoryTitle='System Page Link';
      }else if(type==4){
         $scope.pageLinkShow=true;
         $scope.categoryTitle='Page Link';
      }else if(type==5){
         $scope.productShow=true;
         $scope.categoryTitle='Product Link';
      }else if(type==6){
         $scope.categoryTitle='Blog Link';
      }else{
        $scope.categoryTitle='';
        $scope.productShow=false;
        $scope.categoryShow=false;
        $scope.pageLinkShow=false;
      }
      _getCategoryTypeList(type);

   };

   $scope.nodeClickHandler = function(node){
     //    
   }

   $scope.productJson=[];
   
   $scope.staticPageLink=[];
   //Get List of Static Page
   _getStaticPageList = function(typeId){
        salesfactoryData.getData($scope.typelistUrl,'GET',{type:typeId})
        .then(function(r){
          if(typeId==4){
            $scope.staticPageLink = r.data.list;
          }
        },function(error){
          //error handler sectcion
        });
    };
    _getStaticPageList(4);

   //This function getting the result of 
    _getCategoryTypeList = function(typeId){
      salesfactoryData.getData($scope.typelistUrl,'GET',{type:typeId})
      .then(function(r){
        if(typeId==5){
          $scope.productJson=r.data.list;
          //console.log($scope.productJson);
        }
        if(typeId==1){
          $scope.cattree = r.data.list;
        }

        if(typeId==4){
          $scope.pageLinkShow = true;
        }

      },function(error){
        //error handler sectcion
      });
    };

   

    //Get Block List

   //This function getting the result of 
    _getBlockTypeList = function(typeId){
      salesfactoryData.getData($scope.blockListUrl,'GET',{type:typeId})
      .then(function(r){
         $scope.blockList = r.data.list;
      },function(error){
        //error handler sectcion
      });
    };

    /*
     *  @Author: Pradeep Kumar
     *  @Description: To Get the Product Details Once User Choose the Product
     */
     $scope.productNode =  function(node,product){
        // console.log(node);
        // console.log(product);
        angular.forEach($scope.data,function(v,k){
            if(v.id==node.id){
              $scope.data[k].productObj=product;
            }
        });
     };
    _getBlockTypeList(1);
    _getCategoryTypeList(1);
    _getCategoryTypeList(5);
    _getImagesList('images');
    _getImagesList('product');
    _getImagesList('staticpages');
  };
 

  /**Tree node directive section
  * @node : ([] array)
  */
  function _nodeTreeHandler(){
    return {
      template : '<node ng-repeat="node in cattree"></node>',
      replace : true,
      restrict : 'E',
      scope : {
        cattree : '=children',
      }
    };
  };
  function _nodeHandler($compile){
    return {
        restrict : 'E',
        replace : true,
        template : '<li class="tree-list"><span class="listName" ng-click="toggleVisibility(node)" ng-if="node.children.length"><i class="glyphicon glyphicon-plus plus" ng-if="node.childrenVisibility && node.children.length"></i><i class="glyphicon glyphicon-minus minus" ng-if="(!node.childrenVisibility && node.children.length)"></i></span><i><img src="images/folder.svg" alt=""></i><span ng-click="getParentId(node, $event)" ng-class="{\'category-node-active\' : node.checked }">{{ node.name }}</span></li>',
        link : function(scope, element) {
         //console.log(scope)
          /*
           * Here we are checking that if current node has children then compiling/rendering children.
           * */
          if (scope.node && scope.node.children && scope.node.children.length > 0) {
            scope.node.childrenVisibility = true;
            var childNode = $compile('<ul class="tree listName" ng-if="!node.childrenVisibility"><node-tree children="node.children"></node-tree></ul>')(scope);
            element.append(childNode);
          } else {
            scope.node.childrenVisibility = false;
          }
        },
        controller : ["$scope",
        function($scope) {
          // This function is for just toggle the visibility of children
          $scope.toggleVisibility = function(node) {
            if (node.children) {
              node.childrenVisibility = !node.childrenVisibility;
            }
          };
          // Here We are marking check/un-check all the nodes.
          $scope.checkNode = function(node,$event) {
            // console.log($event);
            $event.stopImmediatePropagation();
            node.checked = !node.checked;
            function checkChildren(c) {
              // console.log(node.length);
              angular.forEach(c.children, function(c) {
                c.checked = node.checked;
                checkChildren(c);
              });
            }
            checkChildren(node);
          };
        }]
    };
  };

  function _selectpickerHandler($timeout){
    return {
      restrict : 'A',
      link : function(scope,element,attr){
        var d_enable = (angular.isUndefined(attr.datatableEnable))?'' : attr.datatableEnable;
        $timeout(function(){
         if(d_enable==="enableSelect")
           element.selectpicker('refresh');
        else if(d_enable === "enableTable")
           element.DataTable();
        });
      }
    }
  };

  angular.module('megaMenuApp').controller('megamenuCtrl',_megaMenuHandler);
  angular.module('megaMenuApp').directive('nodeTree',_nodeTreeHandler);
  angular.module('megaMenuApp').directive('node',_nodeHandler);
  angular.module('megaMenuApp').directive('selectpickerConfig',_selectpickerHandler);

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

}).call(this);
