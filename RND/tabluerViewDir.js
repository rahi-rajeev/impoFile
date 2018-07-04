(function () {
    var tabularViewModule;
    try {
        tabularViewModule = angular.module("tabularViewModule")
    } catch (err) {
        tabularViewModule = null;
    }

    if (!tabularViewModule) {
        angular.module('tabularViewModule.services', []);
        angular.module('tabularViewModule.controllers', []);
        angular.module('tabularViewModule.directives', []);
        angular.module('tabularViewModule.constants', []);
        angular.module('tabularViewModule',
            [
                'tabularViewModule.services',
                'tabularViewModule.controllers',
                'tabularViewModule.directives',
                'tabularViewModule.constants'
            ]);
    }  

    String.prototype.toDate = function(dateFormat) {
        var dateStr = formattedStr = this;
        if (dateFormat) {
            var delimiter = dateFormat.match(/\W/g)[0];
            var arr = dateFormat.split(delimiter);
            var replaceStr = '$' + (arr.indexOf('YYYY') + 1) + '-$' + (arr.indexOf('MM')+1) + '-$' + (arr.indexOf('dd')+1);
            formattedStr = dateStr.replace(/(\d+)-(\d+)-(\d+)/, replaceStr);
            console.log(replaceStr + ' ' + formattedStr);
        }
        if (formattedStr.indexOf(':') === -1)
            formattedStr += ' 00:00';   
        var date = new Date(formattedStr);
        if (date.getTime() === date.getTime())
            return date;
        return new Date(-8640000000000000);
    };

    var euroTest = /[-+]?\s[0-9]{1,3}(.[0-9]{3}),[0-9]+/;
    var replaceFunc = function (x) { return x == "," ? "." : ","; }
    String.prototype.toFloat = function() {
        var str = this;
        var isEuroFormat = euroTest.test(str);
        // Swap commas and decimals
        if (isEuroFormat) { str = str.replace(/[,.]/g, replaceFunc(x)); }
        var retValue = parseFloat(str.replace(/[^0-9.-]+/g, ''));
        return isNaN(retValue) ? 0.0 : retValue;                           
    };

    var customTableConfig = {
        showSelectCheckbox: true,
        showSelectAll: true,
        singleSelect: false,        
        useRepeat: true,
        trackBy: '$index',        
    };

    var tablurController = function ($scope, $attrs, $parse, $timeout,$log, $window){
        var
            tblCtrl = this,
            isSorting = false,
            preserveSelection = false,
            attachedDelegates = false,
            start, end, time,
            ngModelCtrl = { $setViewValue: angular.noop },
            init = function () {
                document.msCSSOMElementFloatMetrics = true;
                tblCtrl.records = $scope.options.records;
                tblCtrl.pagedData = $scope.pagedData;
                console.log(tblCtrl.pagedData);
                tblCtrl.repeatFinish = function () {
                    end = new Date().getTime();
                    time = end - start;
                    $log.log('Render table time: ' + time);
                    redrawHeader(true);
                };                

                $scope.$watchCollection('options.records', function () {
                    tblCtrl.records = $scope.options.records;
                    start = new Date().getTime();
                  
                    $scope.pagedData = $scope.options.records;
                   

                    // onRepeatFinish seems to only fire on page one..
                    if (tblCtrl.useRepeat === false) {
                        redrawTable();
                        redrawHeader();
                    }

                    if (tblCtrl.useRepeat === true) {
                        // Trigger when number of children changes,
                        // including by directives like ng-repeat
                        var watch = $scope.$watch(function () {
                            return $scope.element.children().length;
                        }, function () {
                            // Wait for templates to render
                            $scope.$evalAsync(function () {
                                // Finally, directives are evaluated
                                // and templates are renderer here
                                tblCtrl.repeatFinish();
                                watch();
                            });
                        });
                    }

                    // Setup delegates
                    if (tblCtrl.useRepeat === false && attachedDelegates === false) {
                        initDelegates();
                    };

                    // Attach updatedRecords watcher
                    if (tblCtrl.useRepeat === false && attachedDelegates === false) {
                        $scope.$watch('options.updatedRecords', function () {
                            updateRows();
                        });
                        attachedDelegates = true;
                    };

                    if (!isSorting) {
                        $scope.$broadcast("masterSetOff");
                        isSorting = false;
                    } else {
                        if (preserveSelection && tblCtrl.clientSort) {
                            $scope.$broadcast("childClick");
                        }
                    }
                });
            },
            initDelegates = function () {
                var $tbody = $(tblCtrl.element.find("tbody"));

                $tbody.on('click', 'td.td-checkbox > input[type="checkbox"]', function (e) {
                    var $this = $(this);
                    var $tr = $this.parents("tr:first");
                    var model = $scope.$eval($tr.data("model"));
                    model.isSelected = $this.is(':checked');
                    if (tblCtrl.singleSelect) {
                        angular.forEach($scope.pagedData, function (tempModel) {
                            if (tempModel != model) {
                                tempModel.isSelected = false;
                            }
                        });
                        var $rows = $(tblCtrl.element.find("tbody > tr"));
                        $.each($rows, function (index, row) {
                            var $row = $(row);
                            var $checkbox = $row.find("td.td-checkbox > input[type='checkbox']");
                            $checkbox.prop('checked', false);
                        });

                        $this.prop('checked', model.isSelected);
                    };

                    if ($scope.options.callbacks && $scope.options.callbacks.checkboxClicked) {
                        $scope.options.callbacks.checkboxClicked({ item: model });
                    }

                    $scope.$broadcast("childClick", model);
                    $scope.$broadcast("tableUpdated");
                });

                $tbody.on('click', 'td.td-callback > a.callback', function (e) {
                    var $this = $(this);
                    var $tr = $this.parents("tr:first");
                    var model = $tr.data("model");
                    var callback = 'options.callbacks.' + $this.data("callback").replace(/r\./g, model + ".").replace(/\(r\)/g, '(' + model + ')');
                    $scope.$eval(callback);
                });

                $tbody.on('click', 'td > a[ui-sref]', function (e) {

                });
            },

            redrawHeader = function () {
                if (tblCtrl.isStickyHeader && $scope.options.records && $scope.options.records.length > 0) {
                    $timeout(function () { angular.element($window).trigger('redraw.customStickyHeader'); }, 20, false);
                } else if (tblCtrl.isStickyHeader && (!$scope.options.records || $scope.options.records.length == 0)) {
                    $timeout(function () { angular.element($window).trigger('hide.customStickyHeader'); }, 1, false);
                }
            },
            redrawTable = function () {
                start = new Date().getTime();
                var tableRows = tblCtrl.getNonRepeatRows();
                end = new Date().getTime();
                time = end - start;
                $log.log('Render rows time: ' + time);
                start = new Date().getTime();
                var tbody = $scope.element.find("tbody")[0];
                tbody.innerHTML = tableRows;

                // Attach popover
                if (typeof $.fn.popover !== 'undefined') {
                    $('.norepeat-popover').popover();
                }

                end = new Date().getTime();
                time = end - start;
                $log.log('Insert rows time: ' + time);
            },
            updateRows = function () {
                if ($scope.options.updatedRecords) {
                    if ($scope.options.updatedRecords.length > 10) {
                        redrawTable();
                    }
                    else {
                        var $rows = [],
                            indexes = [],
                            previousError = [],
                            $tbody = $(tblCtrl.element.find("tbody")),
                            indexRegex = /([\d]+)/g;
                        angular.forEach($scope.options.updatedRecords, function (model) {
                            var key = model.id;
                            $row = $tbody.find("tr[data-key=\"" + key + "\"]");
                            previousError.push($row.hasClass("is-error"));
                            var recordModel = $row.data("model");
                            $rows.push($row);
                            var index = recordModel.match(indexRegex)[0];
                            indexes.push(index);
                        });

                        var tableRows = tblCtrl.getNonRepeatRows(indexes);
                        var className = "is-error";
                        for (var i = 0; i < $rows.length; i++) {
                            var $newRow = $(tableRows[i]);
                            var isError = $scope.options.updatedRecords[i].isError;
                            if (isError || previousError[i]) {
                                if (previousError[i]) {
                                    //$animate.addClass($newRow, className);
                                } else {
                                    $newRow.addClass(className);
                                }
                            }
                            $rows[i].replaceWith($newRow);

                            if (previousError[i] && !isError) {
                                //$animate.removeClass($newRow, className);
                            };
                        }
                    }
                }
            },
            clearSelection = function () {
                $scope.$broadcast("masterSetOff");
                angular.forEach(tblCtrl.pagedData, function (model) {
                    model.isSelected = false;
                });

                if (tblCtrl.useRepeat === false) {
                    var $rows = $(tblCtrl.element.find("tbody > tr"));
                    $.each($rows, function (index, row) {
                        var $row = $(row);
                        var $checkbox = $row.find("td.td-checkbox > input[type='checkbox']");
                        $checkbox.prop('checked', false);
                    });
                }
            };

        tblCtrl.init = init;      

        tblCtrl.selectionChanged = function (model) {
            if (tblCtrl.singleSelect) {
                angular.forEach($scope.pagedData, function (tempModel) {
                    if (tempModel != model) {
                        tempModel.isSelected = false;
                    }
                });
            }

            if ($scope.options.callbacks && $scope.options.callbacks.checkboxClicked) {
                $scope.options.callbacks.checkboxClicked({ item: model });
            }

            $scope.$broadcast("childClick", model);
            $scope.$broadcast("tableUpdated");
        };

        tblCtrl.masterChange = function () {
            if (tblCtrl.useRepeat === false) {
                var $rows = $(tblCtrl.element.find("tbody > tr"));
                $.each($rows, function (index, row) {
                    var $row = $(row);
                    var model = $scope.$eval($row.data("model"));
                    var $checkbox = $row.find("td.td-checkbox > input[type='checkbox']");
                    $checkbox.prop('checked', model ? model.isSelected : false);
                });
            }
        };

        tblCtrl.masterClicked = function () {
            if ($scope.options.callbacks && $scope.options.callbacks.masterClicked) {
                $scope.options.callbacks.masterClicked();
            }
        };    
    }

    var tableViewDir = function ($q, $http, $parse, $compile, $templateCache,  tableConfig){
        return{
            restrict: 'EA',
            priorty: 1,
            scope: {
                options: '=',
                ngModel: '='
            },
            require: ['tabularView', '?ngModel'],
            controller: 'tabularCtrl',
            controllerAs: 'tblCtrl',
             link: function (scope, element, attrs, ctrls) {
                var tblCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                // Setup configuration parameters
                scope.vm = scope.$parent;
                var showSelectCheckbox = angular.isDefined(scope.options.config.showSelectCheckbox) ? scope.options.config.showSelectCheckbox : tableConfig.showSelectCheckbox,
                    singleSelect = showSelectCheckbox && (angular.isDefined(scope.options.config.singleSelect) ? scope.options.config.singleSelect : tableConfig.singleSelect),
                    showSelectAll = showSelectCheckbox && !singleSelect && (angular.isDefined(scope.options.config.showSelectAll) ? scope.options.config.showSelectAll : tableConfig.showSelectAll),
                    showSort = angular.isDefined(scope.options.config.showSort) ? scope.options.config.showSort : tableConfig.showSort,
                    useRepeat = angular.isDefined(scope.options.config.useRepeat) ? scope.options.config.useRepeat : tableConfig.useRepeat,
                    trackBy = angular.isDefined(scope.options.config.trackBy) ? scope.options.config.trackBy : tableConfig.trackBy,
                    tableTemplate,
                    tableHeadTemplate,                  
                    tableBodyTemplate,
                    tableRowTemplate,                   
                    tableCellTemplate,                    
                    tableCallbackCellTemplate;                        

                tblCtrl.useRepeat = useRepeat;               
                tblCtrl.config = scope.options.config;
                tblCtrl.trackBy = trackBy;
                tblCtrl.singleSelect = singleSelect;
                scope.pagedData = scope.options.records;
                scope.options.pagedData = scope.pagedData;

                scope.getTemplates = function () {
                    var promise = $q.all([
                        $http.get('template/table/tabular.html', { cache: $templateCache }),
                        $http.get('template/table/tabularTableHead.html', { cache: $templateCache }),
                        $http.get('template/table/tabularBody.html', { cache: $templateCache }),
                        $http.get('template/table/tabularRow.html', { cache: $templateCache }),
                        $http.get('template/table/tabularCell.html', { cache: $templateCache }),
                        
                        //$http.get('template/table/customTableComputedCell.html', { cache: $templateCache }),                       
                    ]).then(function (templates) {
                        var i = 0;
                        console.log(templates);
                        tableTemplate = templates[i++].data;
                        tableHeadTemplate = templates[i++].data;
                        tableBodyTemplate = templates[i++].data;
                        tableRowTemplate = templates[i++].data;                       
                        tableCellTemplate = templates[i++].data;                       
                       // tableComputedCellTemplate = templates[i++].data; 
                    });

                    return promise;
                };

                var getRepeatTable = function () {
                    var
                        tableCells = '',
                        tableRows = '',
                        tableBody = '',
                        tableHead = '',
                        tableHtml = '',
                        tableColumn,
                        recordName = 'r',
                        recordKey = trackBy,
                        tableCell = '',
                        cellClasses = '',
                        itemClasses = '',
                        pagerId = 'clientPager-' + scope.$id + '-' + Math.floor(Math.random() * 10000);

                    if (scope.options.rowDefns) {
                        itemClasses = scope.options.rowDefns.computedClass;
                    };
                   
                    for (var i = 0; i < scope.options.columnDefns.length; i++) {
                        tableColumn = scope.options.columnDefns[i];
                        
                        cellClasses = '';
                        var binding =  recordName + "." + tableColumn.field;

                        if (binding === 'r.') {
                            binding = '';
                        } else {
                            binding = tableColumn.isWatched === false ? "::(" + binding + ")" : binding;
                        }                        

                       if (tableColumn.callback) {                           
                            tableCell = tableCallbackCellTemplate.replace('<--BIND-->', binding)
                                .replace('<--CALLBACK-->', tableColumn.callback);
                        }
                        else {                            
                            tableCell = tableCellTemplate.replace('<--RECORD-->.<--BIND-->', binding);
                        }

                        tableCell = tableCell.replace('<--CELLSTYLE-->', tableColumn.bodyStyle ? tableColumn.bodyStyle : 'no-style').replace('<--CELLCLASS-->', cellClasses);
                        tableCells += tableCell;
                    };
                    console.log(tableCells);
                    

                    tableRows = tableRowTemplate.replace('<--CELLS-->', tableCells);
                    tableRows = tableRows.replace(/<--RECORDKEY-->/g, recordKey !== tableConfig.trackBy ? 'r.' + recordKey : recordKey);
                    tableRows = tableRows.replace('<--REPEATFINISH-->', ''); // 'on-repeat-finish=\"tblCtrl.repeatFinish()\"');
                    tableRows = tableRows.replace(/<--COMPUTEDCLASS-->/g, itemClasses);
                   
                    tableBody = tableBodyTemplate.replace('<--ROWS-->', tableRows).replace('<--RECORD-->', recordName);

                   
                    if (showSelectAll) {                     
                        tableHead = tableHeadTemplate.replace('<--ROWS-->', '');
                    }
                    
                    tableHtml = tableTemplate.replace('<--BODY-->', tableBody).replace('<--HEAD-->', tableHead).replace('<--FOOT-->', '');
                    tableHtml = tableHtml.replace(/<--RECORD-->/g, recordName);
                    
                    return tableHtml;
                };

                scope.getHtml = function () {
                    var tableHtml = useRepeat ? getRepeatTable() : getNonRepeatTable();

                    scope.element = element;
                    tblCtrl.element = element;
                    //element.html(tableHtml);
                    element[0].innerHTML = tableHtml;
                    $compile(element.contents())(scope);

                    if (!useRepeat) {
                        var
                            tbody = element.find("tbody"),
                            tableRows = getNonRepeatRows(),
                            tableBody = tableBodyTemplate.replace('<--ROWS-->', tableRows);
                        tbody.replaceWith(angular.element(tableBody));
                    }
                };

                $q.when(scope.getTemplates()).then(function () {
                    scope.getHtml();
                    tblCtrl.init();
                });
            }
        };
    }

    tablurController.$inject = ['$scope', '$attrs', '$parse', '$timeout', '$log', '$window'];
    tableViewDir.$inject = ['$q', '$http', '$parse', '$compile', '$templateCache', 'customTableConfig'];

    angular.module("tabularViewModule").run(["$templateCache", function ($templateCache) {
        $templateCache.put("template/table/tabular.html",
            "<table class=\"shop-table\">\n" +
            "  <--HEAD-->\n" +
            "  <--BODY-->\n" +
            "</table>" +
            "");

        $templateCache.put("template/table/tabularBody.html",
            "<tbody>\n" +
            "  <--ROWS-->\n" +
            "</tbody>");

        $templateCache.put("template/table/tabularRow.html",
            //"<tr ng-repeat='<--RECORD--> in ngModel track by $index' is-state='r.isError' is-state-class='is-error'>\n" +
            "<tr ng-repeat='<--RECORD--> in pagedData track by <--RECORDKEY-->' ng-class=\"<--COMPUTEDCLASS-->\" <--REPEATFINISH-->>\n" +
            "  <td class=\"td-checkbox chk\"><label class=\"check-wrap\"\><input type=\"checkbox\" ng-model=\"<--RECORD-->.isSelected\" ng-click=\"tblCtrl.selectionChanged(<--RECORD-->)\" /><span class=\"chk-label\"></span></label></td>\n" +
            "  <--CELLS-->\n" +
            "</tr>");
  
        $templateCache.put("template/table/tabularCell.html",
            "<td class='' ng-class='<--CELLCLASS-->' ng-bind='<--RECORD-->.<--BIND-->'>"+

            "</td>"
        );
      
        $templateCache.put("template/table/tabularTableHead.html",
            "<thead>\n" +
            "  <tr>\n" +
            "    <th class=\"th-checkbox chk\">\n" +
            "      <label class=\"check-wrap\"\>"+
            "       <input type=\"checkbox\" master-set-off=\"masterSetOff\" master-change=\"tblCtrl.masterChange()\" master-clicked=\"tblCtrl.masterClicked\" child-click=\"childClick\"> <span class=\"chk-label\"></span>"+
            "       </label>"+            
            "    </th>\n" +
            "    <th bindonce ng-repeat=\"c in options.columnDefns track by $index\" " +
            "      ng-click=\"tblCtrl.sortHeaderClicked(c.field)\" class=\"<%c.style%>\"><span ng-bind=\"c.displayName\">\n" +
            "    </th>\n" +
            "  </tr>\n" +
            "</thead>"
        ); 
     
       
    }]);

    angular
        .module('tabularViewModule.controllers')
        .controller('tabularCtrl', tablurController);



    angular
        .module('tabularViewModule.directives')
        .directive('tabularView', tableViewDir);

    angular
        .module('tabularViewModule.constants')
        .constant('customTableConfig', customTableConfig);   

})(window.angular);
