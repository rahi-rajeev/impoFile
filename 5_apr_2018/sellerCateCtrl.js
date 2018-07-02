/*
 *@Name : sellerCateCtrl.js
 *@Description : This controller used for admin product categories listing.
 *@Author : Smoothgrapg Connect pvt. Ltd.
 */
(function() {

   "use strict";

   function categoryCtrl($scope, salesfactoryData, uiGridConstants, $rootScope, $timeout) {
      $scope.page = 0;
      $scope.tree = [];
      $scope.loadingMore = false;
      $scope.id = 0;
      $scope.edit = false;
      $scope.method = '';
      $scope.deleteUrl = '';
      $scope.data = [];
      $scope.parent_cat = true;
      $scope.parent_id;
      $scope.icon_name = '';
      $scope.icon_type = 'image';
      $scope.category_name = [];
      $scope.cat_description = [];
      $scope.cat_footer_seo = [];
      $scope.meta_title = [];
      $scope.meta_keyword = [];
      $scope.meta_description = [];
      $scope.status = 1;
      $scope.showcatprod = false;
      $scope.statusdropdown = [];
      $scope.allcategorylist = [];
      $scope.hidecategorytable = false;
      $scope.tabActive = false;
      $scope.no_result_found = false;
      $scope.errorInfoLog = '<div class="no-info-blank"><h3><i class="icon-doc"></i> You have no information </h3></div>';
      $scope.statusdropdown.configs = [{
            'name': 'Yes',
            'value': '1'
         },
         {
            'name': 'No',
            'value': '0'
         }
      ];

      //$scope.cat_comment = $scope.

      $scope.status = $scope.statusdropdown.configs[0];
      //configration of filter button table
      $scope.tableFilterConfig = (tableConfig.filter !== undefined) ? tableConfig.filter : false;
      /*****hide show table filter container******/
      $scope.tableFilterContainer = false;
      /******* This variable used for select button config section ********/
      $scope.tableSelectBtnConfig = (tableConfig.chk_action !== undefined) ? tableConfig.chk_action : false;
      /**** This variable used for headre section pagination config***********/
      $scope.tableHeaderPaginationConfig = showHeadrePagination;
      /****this variable used for add row config*****/
      $scope.addrowConfig = true;
      $scope.showLoaderTable = false;
      /******This variable used for get all data from server at a time ******/
      $scope.getAllDataFromServerOnce = false;
      $scope.root_category = false;
      $scope.catmoveerror = false;
      $scope.tableLoaderImgUrl = (typeof tableLoaderImgUrl != "undefined") ? tableLoaderImgUrl : "";

      var scat_id = [],
         rcat_id = [],
         cat_idInd = 0,
         sub_action_type = "";

      /***
       * This code used for columns setting
       * where field is field name of table and displayName is what you want to display name of filed.
       * cellTemplate used for add template(Means html as per as your requirement).
       * Assign Action on template(HTML) Like ng-click="grid.appScope.funEdit(row)"
       * where row is attribute which is use to get entire row attribute with the help of row.entity.
       * Where ng-click is click event and grid.appScope is scope accessibility that means funEdit belons to grid scope
       * so if you want to access this scope then you need to write this line grid.appScope.
       * After that you declare function in controller like $scope.funEdit = function(dataAttr){/ any action here/}.
       * where dataAttr.entity to get all attribute of this field like name id totla amount etc.
       ***/


      $scope.columsSetting = columsSetting;
      //Table grid setting
      $scope.gridOptions = {
         columnDefs: $scope.columsSetting,
         enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
         rowTemplate: '<div grid="grid" class="ui-grid-draggable-row" draggable="true"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'custom\': true }" ui-grid-cell></div></div>',
         onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
         }
      };

      //This section used for get page view data from gloabl variable(paination setting).
      $scope.gridOptions.paginationPageSizes = getPaginationData("getpagination");
      $scope.gridOptions.paginationPageSize = getPaginationData("per_page_limt");
      $scope.gridOptions.PageSize = $scope.gridOptions.paginationPageSize;
      $scope.viewItemPerPage = $scope.gridOptions.paginationPageSize;
      $scope.gridOptions.minRowsToShow = $scope.gridOptions.paginationPageSize;
      $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;


      /*******
       * This grid Api function to handel All function as per as requirement.
       * This function used for drag row update database table row position.
       * Row selection and batch rwo selection.
       * ********/
      $scope.gridOptions.onRegisterApi = function(gridApi) {
         $scope.gridApi = gridApi;
         var rowdragdrop = (tableConfig.row_rearrange !== undefined) ? tableConfig.row_rearrange : false;
         gridApi.dragndrop.setDragDisabled(!rowdragdrop);

         gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            scat_id = [];

            if ($rootScope.filedSetModel["id"] !== undefined && $rootScope.filedSetModel["id"].value !== undefined && angular.lowercase($rootScope.filedSetModel["id"].value) == 'no') {
               if (gridApi.selection.getSelectedGridRows().length > 0) {
                  gridApi.selection.getSelectedGridRows().map(function(t) {
                     scat_id.push(t.entity.product_id);
                  })
               }
            } else if ($rootScope.filedSetModel["id"] !== undefined && $rootScope.filedSetModel["id"].value !== undefined && angular.lowercase($rootScope.filedSetModel["id"].value) == 'yes') {
               rcat_id = [];
               if (gridApi.grid.rows.length > 0) {
                  (gridApi.grid.rows).map(function(it) {
                     if (angular.isUndefined(it.isSelected) || it.isSelected === false)
                        rcat_id.push(it.entity.product_id)
                  })
               }
            } else if ($rootScope.filedSetModel["id"] !== undefined && $rootScope.filedSetModel["id"].value !== undefined && angular.lowercase($rootScope.filedSetModel["id"].value) == 'any') {
               rcat_id = [], scat_id = [];
               if (gridApi.grid.rows.length > 0) {
                  (gridApi.grid.rows).map(function(it) {
                     if (angular.isUndefined(it.isSelected) || it.isSelected === false)
                        rcat_id.push(it.entity.product_id);
                     else if (!angular.isUndefined(it.isSelected) || it.isSelected === true)
                        scat_id.push(it.entity.product_id);
                  })
               }
            }

            //add category id in hidden field         
            $("#assigned_product_ids").val(scat_id.join());
         });

         gridApi.selection.on.rowSelectionChangedBatch($scope, function() {
            scat_id = [];
            if (gridApi.selection.getSelectedGridRows().length > 0) {
               gridApi.selection.getSelectedGridRows().map(function(t) {
                  scat_id.push(t.entity.product_id);
               })
            }

            //add category id in hidden field
            $("#assigned_product_ids").val(scat_id.join());
         });

         gridApi.grid.registerDataChangeCallback(function(data) {
            if (cat_idInd.length > 0) {
               cat_idInd.map(function(it, k) {
                  $scope.gridApi.selection.selectRow($scope.gridOptions.data[it]);
               });
            } else $scope.gridApi.selection.clearSelectedRows();
         }, [uiGridConstants.dataChange.ROW]);

         gridApi.pagination.on.paginationChanged($scope, function(pageNumber, pageSize) {
            //$scope.gridOptions.minRowsToShow =3;
            //$scope.gridOptions.minimumColumnSize =3;
            $scope.gridApi.grid.refresh();
            //pageNumberOrPageSizeChanged(pageNumber, pageSize);
         });
      };

      /******* This function used for Header pagination control********/
      $scope.HeaderPagination = {
         getTotalPages: function() {
            return Math.ceil($scope.gridOptions.totalItems / $scope.gridOptions.PageSize);
         },
         nextPage: function() {
            if ($scope.gridOptions.paginationCurrentPage < this.getTotalPages()) {
               $scope.gridOptions.paginationCurrentPage++;
            }
         },
         previousPage: function() {
            if ($scope.gridOptions.paginationCurrentPage > 1) {
               $scope.gridOptions.paginationCurrentPage--;
            }
         },
         pageSizeChange: function(num) {
            $scope.viewItemPerPage = num;
            $scope.gridOptions.minRowsToShow = num;
            $scope.gridOptions.paginationPageSize = num;
            $scope.gridOptions.PageSize = num;
         }
      };

      /***this function used for select an unselect all column in table**/
      $scope.selectAllColumnFunActive = function(actionName) {
         if (actionName == 'select') {
            $scope.gridApi.selection.selectAllRows();
            $scope.selectItemTotalActive = $scope.gridOptions.data.length;
         } else if (actionName == 'unselect') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalActive = 0;
         }
      };

      $scope.selectAllColumnFunFilter = function(actionName) {
         if (actionName == 'select') {
            $scope.gridApi.selection.selectAllRows();
            $scope.selectItemTotalFilter = $scope.gridOptions.data.length;
         } else if (actionName == 'unselect') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalFilter = 0;
         }
      };

      $scope.selectAllColumnFunAll = function(actionName) {
         if (actionName == 'select') {
            $scope.gridApi.selection.selectAllRows();
            $scope.selectItemTotalAll = $scope.gridOptions.data.length;
         } else if (actionName == 'unselect') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalAll = 0;
         }
      };

      /***** This fnction used for select visible part of table in active section*****/
      $scope.selectVisibleColumnsActive = function(strFlag) {
         $scope.selectVisibleItem = $scope.selectVisibleItemAll = $scope.selectVisibleItemFilter = 0;
         if (strFlag == 'visible') {
            $scope.gridApi.selection.selectAllVisibleRows();
            $scope.selectItemTotalActive = ($scope.gridApi.core.getVisibleRows($scope.gridApi.grid).length);
         } else if (strFlag == 'unVisible') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalActive = 0;
         }
      };

      $scope.selectVisibleColumnsAll = function(strFlag) {
         if (strFlag == 'visible') {
            $scope.gridApi.selection.selectAllVisibleRows();
            $scope.selectItemTotalAll = ($scope.gridApi.core.getVisibleRows($scope.gridApi.grid).length);
         } else if (strFlag == 'unVisible') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalAll = 0;
         }
      };

      $scope.selectVisibleColumnsFilter = function(strFlag) {
         if (strFlag == 'visible') {
            $scope.gridApi.selection.selectAllVisibleRows();
            $scope.selectItemTotalFilter = ($scope.gridApi.core.getVisibleRows($scope.gridApi.grid).length);
         } else if (strFlag == 'unVisible') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.selectItemTotalFilter = 0;
         }
      };

      /*****
       * This function used for search data from grid when you are not used searching from server.
       * Where searchDataFromGrid function call on button click
       * and searchDataInGrid function used for searching.
       * ********/
      $scope.searchDataFromGrid = function(resetFlag) {
         resetFlag = resetFlag || '';
         sub_action_type = "filter";

         if (resetFlag === 'resetfilter') {
            sub_action_type = "";
            //empty model
            angular.forEach($rootScope.filedSetModel, function(item, index) {
               if (angular.isObject(item) === true) {
                  $rootScope.filedSetModel[index] = item;
               } else {
                  $rootScope.filedSetModel[index] = "";
               }
            });
         }

         $scope.searchDataInGrid();

      };

      $scope.searchDataInGrid = function() {
         var filetrObject = getObjectClone($rootScope.filedSetModel);
         filetrObject.cat_id = $scope.id;
         filetrObject.sub_action_type = sub_action_type;

         //get filter from server
         $scope.showLoaderTable = true;

         salesfactoryData.getData(catesearchUrl, 'GET', filetrObject)
            .then(function(r) {
               $scope.gridOptions.data = [];
               cat_idInd = [];
               var rsd = r.data;

               if (angular.isDefined(rsd.catproductlist) && rsd.catproductlist.length > 0) {
                  rsd.catproductlist.map(function(t, k) {
                     if (t.cat_id == $scope.id) cat_idInd.push(k);
                     delete rsd.catproductlist[k].cat_id;
                  });
                  $scope.gridOptions.data = rsd.catproductlist;
                  $scope.displayTotalNumItems = $scope.gridOptions.data.length;
                  $scope.no_result_found = false;
                  $scope.gridApi.grid.refresh();
               } else {
                  $scope.no_result_found = true;
                  $scope.displayTotalNumItems = 0;
               }
               $scope.showLoaderTable = false;
            }, function(error) {
               $scope.showLoaderTable = false;
               _errorHandler();
            }).finally(function() {
               $scope.showLoaderTable = false;
            });
      };

      $scope.enableTab = function(str) {
         if (str == 'deactive') {
            $scope.tabActive = false;
         } else {
            $scope.tabActive = true;
         }
      };

      $scope.save_category = function() {
         var incat = angular.lowercase($rootScope.filedSetModel["id"].value);
         var o = {
            'rm_cat_pid': rcat_id,
            'add_cat_pid': scat_id,
            'cat_id': $scope.id,
            'in_cat': incat
         };

         salesfactoryData.getData(savecateUrl, 'POST', o).then(function(resp) {
            if (incat == 'yes') {
               rcat_id = [];
               $scope.gridOptions.data.reduceRight(function(acc, obj, idx) {
                  if (rcat_id.indexOf(obj.product_id) > -1)
                     $scope.gridOptions.data.splice(idx, 1);
               }, 0);
               $scope.gridApi.grid.selection.selectAll = true;
            }
            if (incat == 'no') {
               console.log('mkjadd');
               $scope.gridOptions.data.reduceRight(function(acc, obj, idx) {
                  if (scat_id.indexOf(obj.product_id) > -1)
                     $scope.gridOptions.data.splice(idx, 1);
               }, 0);
            }
         }, function(error) {
            try {
               throw new Error("Something went badly wrong!");
            } catch (e) {
               console.log('Log Info ' + e)
            };
         }).finally(function() {
            //in all case
            console.log('fjksgf sd gshdfgjsdf');
         });
      };
      //catdragdropurl
      /*****category tree action section*****/
      $scope.catTreeOpt = {
         //beforeDrop dropped
         beforeDrop: function(event) {

            if (angular.isUndefined(event.pos.moving) || event.pos.moving === false) return;

            var o = {};

            if (event.source.nodeScope.$modelValue) {
               o["source_id"] = (event.source.nodeScope.$modelValue.id);
            }

            o["dest_id"] = (event.dest.nodesScope.$nodeScope !== null) ? (event.dest.nodesScope.$nodeScope.$modelValue.id) : false;

            return salesfactoryData.getData(catdragdropurl, 'POST', o).then(function(r) {
               // if(r.data.status==='unsuccess') $scope.catemove=false;
               // else $scope.catemove= true;
               if (r.data.status === 'unsuccess') {
                  return false;
               } else {
                  return true;
               }
            }, function(e) {
               //
            });
         },

         cateOpen: function(that) {
            var curentNodeId = '';
            sub_action_type = "";            

            if (that.$nodeScope !== null) {
               that.$nodeScope.$modelValue.checked = !that.$nodeScope.$modelValue.checked;
               curentNodeId = that.$nodeScope.$modelValue.id;
               //remove active class from all remaining node except current node
               $.map($scope.tree, function(item) {
                  loopUtilLeafNode(item);
               });

               $scope.categoriesopen(that.$nodeScope.$modelValue.id);
               //set status of category
               if(that.$nodeScope.$modelValue.status!== undefined){
                  var st_index = _getIndex($scope.statusdropdown.configs, that.$nodeScope.$modelValue.status, "value");
                  $scope.status = (!isNaN(st_index) && st_index >= 0) ? $scope.statusdropdown.configs[st_index] : $scope.statusdropdown.configs[0];
               }
            }

            function loopUtilLeafNode(node) {
               if (!node) return;

               if (!isNaN(curentNodeId) && node.id != curentNodeId) {
                  node.checked = false;
               }
               //In case node have children
               if (node.children) {
                  node.children.forEach(function(childNode) {
                     loopUtilLeafNode(childNode);
                  })
               }
            }
         }
      };

      /*
       *This section used to expand node using id in case of edit page.
       *private method(getRootNodesScope - > to get parent scope of current node).
       *private method (expandNode -> to expand current node by id).
       *private method (getScopePath -> get path of scope).
       *private method (getScopePathIter -> loop until leanf node and return scope of node).
       */
      var cate_time_out = 0;

      function getRootNodesScope() {
         var parent_cat_index = 0;

         if (typeof top_cat_id != "undefined") {
            parent_cat_index = _getIndex($scope.tree, top_cat_id, "id");
         }

         parent_cat_index = (parent_cat_index != -1) ? parent_cat_index : 0;

         //return parent node scope of tree
         return angular.element(document.getElementById("treeMenuContainer")).scope().$nodesScope.childNodes()[parent_cat_index];
      }

      function expandNode(nodeId) {
         // We need to get the whole path to the node to open all the nodes on the path
         var parentScopes = getScopePath(nodeId);

         if (parentScopes == null) return;

         for (var i = 0; i < parentScopes.length; i++) {
            //for open category if model value is eqal to cat id
            var mid = parentScopes[i].$modelValue.id;

            if (mid !== undefined && mid == cat_id) {
               parentScopes[i].$modelValue.checked = true;

               //set status of category
               if(parentScopes[i].$modelValue.status!== undefined){
                  var st_index = _getIndex($scope.statusdropdown.configs, parentScopes[i].$modelValue.status, "value");
                  $scope.status = (!isNaN(st_index) && st_index >= 0) ? $scope.statusdropdown.configs[st_index] : $scope.statusdropdown.configs[0];
               }
            }

            parentScopes[i].expand();
         }

         $scope.categoriesopen(cat_id);
      }

      function getScopePath(nodeId) {
         return getScopePathIter(nodeId, getRootNodesScope(), []);
      }

      function getScopePathIter(nodeId, scope, parentScopeList) {
         if (!scope) return null;

         var newParentScopeList = parentScopeList.slice();
         newParentScopeList.push(scope);

         if (scope.$modelValue && scope.$modelValue.id === nodeId) return newParentScopeList;

         var foundScopesPath = null;
         // var childNodes = scope.childNodes();
         var childNodes = scope.$element[0].children[1].children;
         //console.log(childNodes);          

         for (var i = 0; foundScopesPath === null && i < childNodes.length; i++) {
            var childNode = angular.element(childNodes[i]).scope();
            foundScopesPath = getScopePathIter(nodeId, childNode, newParentScopeList);
            //foundScopesPath = getScopePathIter(nodeId, childNodes[i], newParentScopeList);
         }

         return foundScopesPath;
      } //end this section

      /*** end code******/
      $scope.getCategoryPosition = function() {
         var objPage = {
            'cat_id': $scope.id,
            'parent_cat_id': $scope.parent_category.cat_id
         };
         salesfactoryData.getData(checkcatmovepossilbe_url, 'GET', objPage).then(function(res) {

            if (res.type == 'success') {
               $scope.catmoveerror = false;
            }
            if (res.type == "error") {
               $scope.catmoveerror = true;
            }
         }, function(error) {
            try {
               throw new Error("Something went badly wrong!");
            } catch (e) {
               console.log('Log Info ' + e)
            };
         });
      };

      /*****Category data get and set section****/
      //this function used to get catory data (self excutive function on page load)
      function getCategoryList() {
         salesfactoryData.getData(categoryList, 'GET', '').then(function(res) {
            if (res) {
               $scope.tree = res.data;
               // Stop the pending timeout
               //$timeout.cancel(cate_time_out);          
            }
         }, function(error) {
            _errorHandler();
         });
      };

      getCategoryList();

      $scope.categoryopen = function() {
         $scope.showLoaderTable = true;
         $scope.loadingMore = true;
         $scope.id = cat_id;

         var objPage = {
            id: $scope.id
         }
         //get category by id
         salesfactoryData.getData(catediturl, 'GET', objPage).then(function(res) {
            if (res.status == 1) {              
               $scope.allcategorylist = res.allcategorylist;
               //$scope.status = $scope.statusdropdown.configs[0];
               $scope.edit = true;

            } else {
                //$scope.status = $scope.statusdropdown.configs[1];
            }

            angular.element('#select_' + cat_id).addClass('skyblue');

            angular.forEach(res.data.categorydesces, function(val, key) {
               $scope.category_name[val.lang_id] = val.category_name;
               $scope.cat_description[val.lang_id] = val.cat_description;
               $scope.cat_footer_seo[val.lang_id] = val.cat_footer_seo;
               // console.log(val);
               $scope.meta_title[val.lang_id] = val.meta_title;
               $scope.meta_keyword[val.lang_id] = val.meta_keyword;
               $scope.meta_description[val.lang_id] = val.meta_description;
            });

            //for category icon 
            if (res.icon_type !== undefined && res.icon_type == "image") {
               $scope.icon_type = res.icon_type;
               $scope.icon_name = res.icon_name;
            } else if (res.icon_type !== undefined && res.icon_type == "bootstrap_code") {
               $scope.icon_type = res.icon_type;
               $scope.icon_name = res.icon_name;
            }            
            
            $scope.loadingMore = false;
         }, function(error) {
            $scope.showLoaderTable = false;
            _errorHandler();
         });

      };

      //In case of edit page 
      if (cat_id != '') {
         $scope.categoryopen();
      }

      $scope.categoriesopen = function(catid) {
         //$scope.parent_category = $scope.allcategorylist[0];
         $scope.showLoaderTable = true;
         $scope.loadingMore = true;
         $scope.id = catid;
         $scope.edit = true;
         $scope.parent_cat = false;

         angular.element('input[name="_method"]').val('PUT');
         angular.element('#category_id').val(catid);
         angular.element('.listName').removeClass('skyblue');
         angular.element('#select_' + catid).addClass('skyblue');
         var formaction = angular.element('form#sellerCategoryForm').attr('action');
         formaction = action + '/' + catid;
         angular.element('form#sellerCategoryForm').attr('action', formaction);
         var objPage = {
            id: $scope.id
         }
         //console.log($scope.icon_type);
         //defaultVal
         salesfactoryData.getData(cateEditurl, 'GET', objPage).then(function(res) {
            $scope.gridOptions.data = [], cat_idInd = [];
            var rsd = res.data;
            //console.log(rsd);
            rsd.catproductlist.map(function(t, k) {
               if (t.cat_id == $scope.id)
                  cat_idInd.push(k);
               delete rsd.catproductlist[k].cat_id;
            });



            //for category icon 
            if (rsd.icon_type !== undefined && rsd.icon_type == "image") {
               $scope.icon_type = rsd.icon_type;
               $scope.icon_name = rsd.icon_name;
            } else if (rsd.icon_type !== undefined && rsd.icon_type == "bootstrap_code") {
               $scope.icon_type = rsd.icon_type;
               $scope.icon_name = rsd.icon_name;
            }

            $scope.showLoaderTable = false;
            $scope.gridOptions.data = rsd.catproductlist;

            $scope.gridOptions.totalItems = $scope.gridOptions.data.length;
            $scope.displayTotalNumItems = $scope.gridOptions.data.length;
            $scope.parent_id = rsd.parent_id;

            if (angular.isDefined(rsd.catproductlist) && rsd.catproductlist.length > 0) {
               //$scope.gridOptions.data=res.catproductlist;
               //$scope.displayTotalNumItems = $scope.gridOptions.data.length;
               $scope.no_result_found = false;
            } else {
               $scope.no_result_found = true;
               //$scope.displayTotalNumItems =0;
            }

            if (($scope.gridOptions.data).length > 0) {
               $scope.hidecategorytable = true;
            } else {
               $scope.hidecategorytable = false;
            }



            $scope.loadingMore = false;
            if (res.status == 1) {
               $scope.showcatprod = true;
               //$scope.status = $scope.statusdropdown.configs[0];
               $scope.allcategorylist = rsd.allcategorylist;

            } else {
               $scope.showcatprod = true;
               //$scope.status = $scope.statusdropdown.configs[1];
            }


            $scope.deleteUrl = rsd.deleteUrl;
            $scope.comment = rsd.comment;
            angular.element('#parent_id').val(rsd.parent_id);
            (rsd.categorydesces).map(function(val) {
               $scope.category_name[val.lang_id] = val.category_name;
               $scope.cat_description[val.lang_id] = val.cat_description;
               $scope.cat_footer_seo[val.lang_id] = val.cat_footer_seo;

               $scope.meta_title[val.lang_id] = val.meta_title;
               $scope.meta_keyword[val.lang_id] = val.meta_keyword;
               $scope.meta_description[val.lang_id] = val.meta_description;
               $scope.edit = true;
               $scope.cat_mesg = val.category_name;
            });
         }, function(error) {
            $scope.showLoaderTable = false;
            _errorHandler();
         });
      };

      $scope.getTableHeight = function() {
         var rowHeight = 45; // your row height
         var headerHeight = 39; // your header height
         //var footerRowHeight = 32; // pre-calculated
         var as = $scope.gridApi.core.getVisibleRows().length;

         return {
            height: (as * rowHeight + headerHeight) + "px"
         };
      };

      /****
       *Listen on click on next footer pagination
       *@url : service url
       *@type : product type(ex. related , upsell etc)
       *@page : page number 
       *@prd_type_flag : which tab is enable like simple,config and related product 
       *****/
      $scope.clickOnNext = function(page) {
         //$scope.showLoaderTable=true;
         //_getTableListData('', '', page,$scope.gridOptions.PageSize, $scope.filterDataObj);            
      };

      //Invoke on finish node tree repeat 
      $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
         //in case of edit open category
         if(typeof cat_id!= "undefined" && cat_id){
             var rootScope = getRootNodesScope();

            if (rootScope != undefined) {
               var c = parseInt(cat_id);
               expandNode(c);
            }
         }         
      });

   };

   angular.module('sabinaAdminApp').controller('sellerCateCtrl', categoryCtrl);

   //directive to check render complet of data
   angular.module("sabinaAdminApp").directive("onFinishRender", function($timeout) {
      return {
         link: function(scope, element, attr) {
            if (scope.$last === true) {
               $timeout(function() {
                  scope.$emit(attr.onFinishRender);
               });
            }
         }
      }
   });

   /*Listen for get index 
    *@param : destObj (oject/array)
    *@param : matchEle (string)
    *@param : matchType (string -optional)
    */
   function _getIndex(destObj, matchEle, matchType) {
      var index;
      index = destObj.findIndex(function(item) {
         if (matchType !== undefined && matchType) {
            return (item[matchType] == matchEle);
         } else {
            return (item == matchEle);
         }
      });
      return index;
   }

   //Listen on get clone of filter object
   function getObjectClone(obj) {
      var clone = {};
      angular.forEach(obj, function(item, index) {
         if (angular.isObject(item) === true) {
            clone["f_type"] = item.value;
         } else {
            clone[index] = item;
         }
      });
      return clone;
   };

   //error handler function
   function _errorHandler(errMsg) {
      console.log('hi??');
      try {
         throw new Error("Something went badly wrong!");
      } catch (e) {
         console.log("Opps " + e);
         _createMsgDiv(e, "error");
      };
   };

   //for toastr like message display using bootsrap alert
   function _createMsgDiv(mesg, classType) {
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
})(window.angular);

//handles clicks and keydowns on the link
var sap = {ui:{keycodes:{SPACE:32, ENTER:13 }}};

function navigateLink(evt, x) {
    if (evt.type=="click" ||
        evt.keyCode == sap.ui.keycodes.SPACE ||
        evt.keyCode == sap.ui.keycodes.ENTER) {
        var ref = evt.target != null ? evt.target : evt.srcElement;
        if (ref && (x!==undefined && x)){
          window.location = x;
        } 
    }
};