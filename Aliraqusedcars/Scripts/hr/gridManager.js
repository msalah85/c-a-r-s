
//<reference path="../DefaultGridVariables.js" />
var
    DefaultGridManager = DefaultGridManager || {},
    DefaultGridManager = function () {
        var
            Init = function () {
                // initialize default properties        
                workPerform(); // fire delete and reset delegates
            },
            workPerform = function () {
                $('#btnAddNew').on('click', function () {
                    var title = "اضـــافة " + TitlePage;
                    var operation = "save";
                    commonManger.ResetControls(formName);
                    commonManger.showPopUpDialog(title, operation, modalDialog);
                });

                $('#' + modalDialog + ' .btn-success').on('click', function (e) {
                    e.preventDefault();
                    commonManger.saveDefaultData(modalDialog, formName, successCallback, errorCallBack);
                });

                // reset form after closing modal from x close button.
                $('#' + modalDialog + ' button.clse, .modal-header .close').on('click', function (e) {
                    commonManger.ResetControls(formName);
                    e.preventDefault();
                });

                $('#' + deleteModalDialog + ' .btn-delete').on('click', function (e) {
                    e.preventDefault();
                    commonManger.deleteDefaultData(deleteModalDialog, formName, successCallback, errorCallBack);
                });
            },
            successCallback = function (data) {
                data = data.d;
                $('#' + modalDialog).modal('hide');
                commonManger.showMessage('تم الحفظ بنجاح:', data.message);
                if (data.Status) {
                    updateGrid();
                    $.fn.afterSave(data);
                }
            },
            errorCallBack = function (jqXhr, textStatus, errorThrown) {
                var title = textStatus + ": " + errorThrown,
                    message = JSON.parse(jqXhr.responseText).Message;
                commonManger.showMessage(title, message);
            },
            updateGrid = function () {
                $('#' + gridId).DataTable().draw();
            },
            fillItemsDataTable = function (obj, footerFn) {
                var oTable = $('#' + gridId).DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة', action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                    ],
                    "language": { "url": "/Scripts/datatables/Arabic.min.js" },
                    "sPaginationType": "bootstrap",
                    "bServerSide": true,
                    "destroy": true,
                    "processing": true,
                    "sAjaxSource": mainServiceUrl + "LoadData",
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, errorCallBack);
                    },
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": 'funName', "value": tableName + '_SelectList' });
                        if (obj !== undefined) {
                            for (var key in obj) {
                                aoData.push({ "name": key, "value": obj[key] });
                            }
                        }
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        if (footerFn)
                            footerFn(nFoot, aData, iStart, iEnd, aiDisplay);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [], // default none sorting none.
                    "aoColumns": gridColumns
                });


                commonManger.searchData(oTable);
                $("#" + gridId + " tbody").delegate("tr button", "click", function (event) {
                    event.preventDefault();
                    var self = $(this);
                    var pos = self.closest('tr').index();
                    var aData;
                    if (pos != null) {
                        if (self.hasClass('edit')) {
                            var titleedit = "تعديل " + TitlePage, operation = 'save';

                            aData = oTable.row(pos).data(); // get data of the clicked row
                            commonManger.ResetControls(formName);
                            commonManger.getDataForUpdate(aData, formName);
                            commonManger.showPopUpDialog(titleedit, operation, modalDialog);
                        }
                        else if (self.hasClass('remove')) {
                            aData = oTable.row(pos).data();
                            var title = " حــذف " + TitlePage, operation = 'delete', ParamNames = [], _id = "";
                            if (pKey.toLowerCase().indexOf(",") >= 0) {
                                ParamNames = pKey.split(",");
                                for (var i = 0; i < ParamNames.length - 1; i++) {
                                    _id += aData[ParamNames[i]] + ",";
                                }
                                _id += aData[ParamNames[ParamNames.length - 1]];
                            }
                            else { _id = aData[pKey]; }
                            $('#' + deleteModalDialog).find('.removeField').text(_id);
                            commonManger.showPopUpDialog(title, operation, deleteModalDialog);
                        }
                        else if (self.hasClass('print')) {
                            var printdate = commonManger.convertcurrentdate();

                            aData = oTable.row(pos).data();
                            var ElementId = $(this).attr('id'), idvalue = "", ParamNames = [];

                            if (procedureName == "") {
                                procedureName = tableName;
                            }
                            if (pKey.toLowerCase().indexOf(",") >= 0) {
                                ParamNames = pKey.split(",");
                                idvalue = aData[ParamNames[0]] + ":" + aData[ParamNames[1]];
                            }
                            else { idvalue = aData[pKey]; }
                            commonManger.sendReportInfo(procedureName, idvalue, printdate);
                        }
                    }
                });
            };


        return {
            Init: Init,
            successCallback: successCallback,
            errorCallBack: errorCallBack,
            fillItemsDataTable: fillItemsDataTable,
            updateGrid: updateGrid
        };
    }();