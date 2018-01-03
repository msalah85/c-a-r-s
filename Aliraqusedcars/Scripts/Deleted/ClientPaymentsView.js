
var ReceiptVoucher = function () {
    var cid = '', BankID = '', from = '', to = '',
        Init = function () {
            $('#SearchAll').on('click', function (e) {
                e.preventDefault();
                // get search parameters
                cid = $('#ClientID').val(),
                BankID = $('#BankID').val() != '' ? $('#BankID').val() : '',
                from = commonManger.dateFormat($('#From').val()) != '' ? commonManger.dateFormat($('#From').val()) : '',
                to = commonManger.dateFormat($('#To').val()) != '' ? commonManger.dateFormat($('#To').val()) : '';
                updateGrid(); // refresh list
            });

            // apply cancellation
            $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                e.preventDefault();
                var _payID = $('#ReceiptID').val(), reason = $('#DeleteReason').val();

                if (_payID && reason != '') { // not empty
                    // delete parameters
                    var names = ['ReceiptID', 'DeleteReason'], values = [_payID, reason],
                        functionName = "ReceiptVouchers_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
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
                 updateGrid();
             }
         },
         setDataToControlandGrid = function () {
             var functionName = "ReceiptVouchers_Properties", DTO = { 'actionName': functionName, 'value': '' };
             dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
               function (data) {
                   var selectList = JSON.parse(data.d);
                   commonManger.Filllist(selectList, "masterForm");
               }, commonManger.errorException);
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
                "bServerSide": true, responsive: true, responsive: true,
                "sAjaxSource": sUrl + "LoadDataTablesXML",
                "fnServerParams": function (aoData) {
                    var vals = cid + '~' + BankID + '~' + from + '~' + to;
                    aoData.push({ "name": "funName", "value": 'ReceiptVouchers_SelectList2' },
                        { "name": "names", "value": 'ClientID~BankID~From~To' }, { "name": "values", "value": vals });
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
                        "mDataProp": "FromName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CheckNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "BankName",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "DeleteReason",
                        "bSortable": false,
                        "mData": function (d) {
                            return '<span title="' + d.DeleteReason + '">' + (d.DeleteReason && d.DeleteReason.length > 50 ? d.DeleteReason.substring(50) + '..' : d.DeleteReason) + '</span>';
                        }

                    },
                    {
                        "mDataProp": "Amount",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.Amount).format('0,0.0');
                        }
                    },
                    {
                        "mDataProp": "AmountDhs",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.AmountDhs).format('0,0.0');
                        }
                    },
                    {
                        "sClass": 'hidden-print',
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<a href="ReceiptVoucherPrint.aspx?id=' + oObj["ReceiptID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>';
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