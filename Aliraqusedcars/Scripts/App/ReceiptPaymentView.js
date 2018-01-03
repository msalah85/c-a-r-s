var
    ReceiptPayment = ReceiptPayment || {},
ReceiptPayment = function () {
    var toName = '', BankID = '', from = '', to = '', xType = '',

        Init = function () {
            filllistItems();
            pageEvents();
        },
        pageEvents = function () {
            $('#SearchAll').on('click', function (e) {
                e.preventDefault();
                // get search parameters
                toName = $('#ToName').val(),
                BankID = $('#BankID').val() != '' ? $('#BankID').val() : '',
                from = commonManger.dateFormat($('#From').val()) != '' ? commonManger.dateFormat($('#From').val()) : '',
                to = commonManger.dateFormat($('#To').val()) != '' ? commonManger.dateFormat($('#To').val()) : '',
                xType = $('#ReceiptExpenseTypeID').val() != '' ? $('#ReceiptExpenseTypeID').val() : '';

                updateGrid(); // refresh list
            });

            // apply cancellation
            $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                e.preventDefault();
                var _payID = $('#ReceiptID').val(), reason = $('#DeleteReason').val();

                if (_payID && reason != '') { // not empty
                    // delete parameters
                    var names = ['ReceiptID', 'DeleteReason'], values = [_payID, reason],
                        functionName = "ReceiptPayments_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };

                    dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                } else {
                    commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                    $('#DeleteReason').focus();
                }
            });
        },
        successDelete = function (data) {
            $('.modal').modal('hide');
            data = data.d;
            commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
            if (data.Status) {
                updateGrid();
            }
        },       
        delButton = function () {
            var _delBtn = '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button> ', deleteMe = commonManger.fullRoles();
            return deleteMe ? _delBtn : '';
        },
        updateGrid = function () {
            $('#listItems').DataTable().draw();
        },
        filllistItems = function () {
            var pTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                ],
                "bDestroy": true,
                "bServerSide": true, responsive: true, 
                "sAjaxSource": sUrl + "LoadDataTablesXML",
                "fnServerParams": function (aoData) {
                    var vals = toName + '~' + BankID + '~' + from + '~' + to + '~' + xType;
                    aoData.push({ "name": "funName", "value": 'ReceiptPayments_SelectList' },
                        { "name": "names", "value": 'ToName~BankID~From~To~Type' },
                        { "name": "values", "value": vals });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { // get data as json format from xml
                        commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                    }, commonManger.errorException);
                },
                "footerCallback": function (tfoot, data, start, end, display) {
                    var api = this.api(),
                        totalAmount = api.column(6).data().reduce(function (a, b) { // Amount
                            return numeral().unformat(a) + numeral().unformat(b);
                        }, 0);

                    $('strong.debit').html(numeral(totalAmount).format('0,0'));
                },
                "aaSorting": [],
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "ReceiptID",
                        "bSortable": true,
                        "type": 'number'
                    }, {
                        "mDataProp": "AddDate",
                        "bSortable": true,
                        "mData": function (data) {
                            return commonManger.formatJSONDateCal(data.AddDate);
                        }
                    },
                    {
                        "mDataProp": "ExpenseTypeName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ToName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "BankName",
                        "bSortable": true,
                        "mData": function (d) {
                            return d.BankName ? d.BankName : '';
                        }
                    },
                    {
                        "mDataProp": "CheckNo",
                        "bSortable": true,
                        "mData": function (d) {
                            return d.CheckNo ? d.CheckNo : '';
                        }
                    },
                    {
                        "mDataProp": "Amount",
                        "bSortable": true,
                        "mData": function (d) {
                            return numeral(d.Amount).format('0,0');
                        }
                    },
                    {
                        "mDataProp": "AmountDhs",
                        "bSortable": true,
                        "mData": function (d) {
                            return numeral(d.AmountDhs).format('0,0');
                        }
                    },
                    {
                        "sClass": 'hidden-print',
                        "mData": function (oObj) {
                            var revised = '';
                            if (oObj.Revised == 0) {
                                revised = '<a class="btn btn-minier btn-info" href="ReceiptPaymentsAdd.aspx?id=' + oObj.ReceiptID + '" title="تعديل"><i class="icon-edit"></i></a> ' + delButton();
                            }
                            return revised +
                                '<a href="ReceiptPaymentsPrint.aspx?id=' + oObj["ReceiptID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>';
                        }
                    }
                ]
            });

            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();
                var self = $(this), pos = self.closest('tr').index(), aData;
                if (pos != null) {
                    if (self.hasClass('remove')) {
                        var title = "إلغاء إيداع عميل", modalDialog = 'cancelModal';
                        aData = pTable.row(pos).data(); //get data of the clicked row
                        $('#ReceiptID').val(aData['ReceiptID']);
                        $('#AddDate').val(commonManger.formatJSONDateCal(aData['AddDate']));
                        $('#Amount').val(aData['Amount']);
                        commonManger.showPopUpDialog(title, '', modalDialog);
                    }
                }
            });
        };

    return {
        Init: Init
    };
}();