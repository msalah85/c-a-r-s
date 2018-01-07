//<reference path="../DefaultGridVariables.js" />
var    
    DefaultGridManager = function () {
        var
            Init = function () {
                $('#btnAddNew').on('click', function () {
                    var title = "اضـــافة " + TitlePage, operation = "save";
                    commonManger.ResetControls(formName);
                    commonManger.showPopUpDialog(title, operation, modalDialog);
                });

                // initialize default properties   
                fillitemsDataTable();

                // fire delete and reset delegates
                workPerform();
            },
            workPerform = function () {
                $('#' + modalDialog + ' .btn-success').on('click', function (e) {
                    e.preventDefault();

                    btnProceessing($(this), true); // under process please wait

                    commonManger.saveDefaultData(modalDialog, formName, successCallback, commonManger.errorException);
                });
                // reset form after closing modal from x close button.
                $('#' + modalDialog + ' button.clse, .modal-header .close').on('click', function (e) {
                    commonManger.ResetControls(formName);
                    e.preventDefault();
                });
                $('#' + deleteModalDialog + ' .btn-delete').on('click', function (e) {
                    e.preventDefault();
                    commonManger.deleteDefaultData(deleteModalDialog, formName, successCallback, commonManger.errorException);
                });

                // focus button of save button
                $('.modal').on('show.bs.modal', function () {
                    btnProceessing($('#' + modalDialog + ' .btn[type="submit"]'), false);
                    var _this = $(this),
                        _thisBtn = _this.find('button.btn-success').eq(0);

                    _thisBtn.focus();
                    return;
                });
            },
            successCallback = function (data) {
                data = data.d;
                $('#' + modalDialog).modal('hide');
                btnProceessing($('#' + modalDialog + ' .btn[type="submit"]'), false);

                commonManger.showMessage('تم الحفظ بنجاح:', data.message);
                if (data.Status) {
                    updateGrid();
                }
            },
            updateGrid = function () {
                $('#' + gridId).DataTable().draw(false);
            },
            btnProceessing = function (btnElem, isProceessing) { // Under process, please waint
                if (isProceessing === true) {
                    btnElem.addClass('disabled').prop('disabled', true).text('قيد التنفيذ...');
                    // prevent click again on the same pay amount.
                    $('#listItems tbody td a.waitingPay').removeAttr('href');
                } else {
                    btnElem.removeClass('disabled').removeAttr('disabled').text(function () {
                        return $(this).attr('data-text');
                    });
                }
            },
            fillitemsDataTable = function () {
                var oTable = $('#' + gridId).DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                    ],
                    "language": { "url": "/Scripts/datatables/Arabic.min.js" },
                    "sPaginationType": "bootstrap",
                    "bServerSide": true,
                    responsive: true,
                    saveState: true,
                    "processing": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": tableName + '_SelectList' }, { "name": "names", "value": filterNames }, { "name": "values", "value": filterValues });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "aaSorting": [], // default none sorting none.
                    "aoColumns": gridColumns
                });

                commonManger.searchData(oTable);

                $("#" + gridId + " tbody").delegate("tr button", "click", function (event) {
                    event.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {
                        if (self.hasClass('edit')) {
                            var titleedit = "تعديل " + TitlePage, operation = 'save';
                            aData = oTable.row(pos).data(); // get data of the clicked row
                            commonManger.ResetControls(formName);
                            commonManger.getDataForUpdate(aData, formName);
                            commonManger.showPopUpDialog(titleedit, operation, modalDialog);
                        }
                        else if (self.hasClass('remove')) {
                            aData = oTable.row(pos).data();
                            var title = " حــذف " + TitlePage, peration = 'delete', ParamNames = [], _id = "";



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
                            if (procedureName === "") {
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
            btnProceessing: btnProceessing,
            updateGrid: updateGrid
        };

    }();