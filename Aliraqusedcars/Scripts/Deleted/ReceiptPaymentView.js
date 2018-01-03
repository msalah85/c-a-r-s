
var ReceiptPayment = function () {
    var toName = '', BankID = '', from = '', to = '',
        Init = function () {
            $('#SearchAll').on('click', function (e) {
                e.preventDefault();
                // get search parameters
                toName = $('#ToName').val(),
                BankID = $('#BankID').val() != '' ? $('#BankID').val() : '',
                from = commonManger.dateFormat($('#From').val()) != '' ? commonManger.dateFormat($('#From').val()) : '',
                to = commonManger.dateFormat($('#To').val()) != '' ? commonManger.dateFormat($('#To').val()) : '';
                filllistItems(); // refresh list
            });

            // apply cancellation
            $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                e.preventDefault();
                var _payID = $('#ReceiptID').val(), reason = $('#DeleteReason').val();

                if (_payID && reason != '') { // not empty
                    // delete paramters
                    var names = ['ReceiptID', 'DeleteReason'], values = [_payID, reason],
                        functionName = "ReceiptPayments_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                    dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                } else {
                    commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                    $('#DeleteReason').focus();
                }
            });

            filllistItems();
            setDataToControlandGrid();
        },
         successDelete = function (data) {
             data = data.d;
             $('.modal').modal('hide');
             commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
             if (data.Status) {
                 $('#listItems').DataTable().draw();
             }
         },
         bindSearchControls = function (data) {
             var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
             if (jsn) {
                 var options = $(jsn).map(function (i, v) { return $('<option />').val(v.BankID).text(v.BankName); }).get();
                 $('#BankID').append(options);
                 $(".chzn-select").trigger('chosen:updated').trigger("liszt:updated");
             }
         },
         setDataToControlandGrid = function () {
             var functionName = "ReceiptPayments_Properties", DTO = { 'actionName': functionName };
             dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindSearchControls, commonManger.errorException);
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
                "bServerSide": true, responsive: true, responsive: true,
                "sAjaxSource": sUrl + "LoadDataTablesXML",
                "fnServerParams": function (aoData) {
                    var vals = toName + '~' + BankID + '~' + from + '~' + to + '~1';
                    aoData.push({ "name": "funName", "value": 'ReceiptPayments_SelectList' },
                        { "name": "names", "value": 'ToName~BankID~From~To~Deleted' }, { "name": "values", "value": vals });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { // get data as json format from xml
                        commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                    }, commonManger.errorException);
                },
                fnFooterCallback: function (nRow, aaData, iStart, iEnd, aiDisplay) {
                    var TotalAmount = 0;
                    for (var i = iStart ; i < iEnd ; i++) {
                        var amm = aaData[aiDisplay[i]]['Amount'];
                        TotalAmount += parseFloat(amm);
                    }
                    $('strong.debit').text(numeral(TotalAmount).format('0,0'));
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
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ToName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "BankName",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "CheckNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Amount",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.Amount).format('0,0');
                        }
                    },
                    {
                        "mDataProp": "AmountDhs",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.AmountDhs).format('0,0');
                        }
                    },
                    {
                        "sClass": 'hidden-print',
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<a href="ReceiptPaymentsPrint.aspx?id=' + oObj["ReceiptID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>';
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