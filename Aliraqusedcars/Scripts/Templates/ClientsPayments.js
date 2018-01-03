var cid = ''; //, custom = '', from = null, to = null;
var
    ClientsPayments = ClientsPayments || {},
    ClientsPayments = function () {
        var
            Init = function () {

                cid = commonManger.getUrlVars().id
                cid = cid ? cid : '';

                setDataToControlandGrid();
                pageEvents();
                filllistItems();
            },
            pageEvents = function () {
                // apply cancellation
                $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();
                    var _payID = $('#ClientPaymentID').val(), reason = $('#DeleteReason').val();
                    if (_payID && reason !== '') {
                        var names = ['ClientPaymentsID', 'DeleteReason'], values = [_payID, reason];
                        var functionName = "ClientsPayments_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                    } else {
                        commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                        $('#DeleteReason').focus();
                    }
                });

                // show money backs list
                $('.moneyBackClk').click(function () {
                    var getBefore = $('#listItems3 tbody tr').length;
                    if (!getBefore || getBefore < 1)
                        fillListItems3();

                    $('#paymentTabs li:last a').tab('show');
                });

                // discount 
                $('.discounts').click(function () {
                    var gotBefore = $('#listItems2 tbody tr').length;
                    if (!gotBefore || gotBefore < 1)
                        filllistItems2();

                    $('#paymentTabs li:eq(1) a').tab('show');
                });


                // bonus
                $('.clientBonusClk').click(function () {
                    var gotDataBefore = $('#listItems4 tbody tr').length;
                    if (!gotDataBefore || gotDataBefore < 1)
                        fillListItems4();

                    $('#paymentTabs li:eq(2) a').tab('show');
                });


                // client payments click
                $('.clPaymentClc').click(function () {
                    var gotDataBefore = $('#listItems tbody tr').length;
                    if (!gotDataBefore || gotDataBefore < 1)
                        fillListItems();

                    $('#paymentTabs li:first a').tab('show');
                });


                // delete bonus
                $('#cancelBonus .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();
                    var _bID = $('#BonusID').val(),
                        reason = $('#Reason').val(),
                        successDelete = function (data) {
                            data = data.d;
                            $('.modal').modal('hide');
                            commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                            if (data.Status) {
                                $('#listItems4').DataTable().draw(); // refresh list after deletion
                                setDataToControlandGrid();
                            }
                        };


                    if (_bID && reason !== '') { // not empty
                        // delete parameters
                        var names = ['BonusID', 'Reason'], values = [_bID, reason],
                            functionName = "ClientsBonus_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                    } else {
                        commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                        $('#DeleteReason').focus();
                    }
                });
            },
            successDelete = function (data) {
                data = data.d;
                $('.modal').modal('hide');
                commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                if (data.Status) {
                    $('#listItems').DataTable().draw();
                }
            },
            setDataToControlandGrid = function () {
                var
                    DTO = { actionName: "ClientsPayments_Summary", 'value': (cid ? cid : '') },
                    successCall = function (data) {
                        var dAll = commonManger.comp2json(data.d),
                            jsn = dAll.list;

                        // client summary
                        $('.debit').text(numeral(jsn.Payments).format('0,0'));
                        $('.moneyBacks').text(numeral(jsn.MoneyBack).format('0,0'));
                        $('.totalDiscounts').text(numeral(jsn.Discounts).format('0,0'));
                        $('.clientBonus').text(numeral(jsn.Bonus).format('0,0'));
                        $('.balance').text(numeral(jsn.Balance).format('0,0'));
                        $('.clientName').text(jsn.ClientName);
                    };


                // bind client id
                if (cid) {
                    $('.clientName').attr('href', 'ClientCars.aspx?id=' + cid);
                    $('.add-disount').removeClass('hidden').attr('href', 'ClientDiscounts.aspx?id=' + cid);
                    $('.addPay').removeClass('hidden').attr('href', 'ClientsPaymentsAdd.aspx?cid=' + cid);
                }

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData', successCall, commonManger.errorException);

            },
            delButton = function () {
                var _delBtn = '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>', deleteMe = commonManger.fullRoles();
                return deleteMe ? _delBtn : '';
            },
            bindDiscountTotal = function (data) {
                if (data) {
                    $('.totalDiscounts').text(numeral(data.TotalDiscounts).format('0,0'));
                    $('.balance').text(numeral(data.Balance).format('0,0'));
                    $('.clientName').text(data.ClientName).attr('href', 'ClientCars.aspx?id=' + cid);
                }
            },
            filllistItems = function () {
                cid = (cid == 0 ? "" : cid);

                var oTable = $('#listItems').DataTable({
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
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    stateSave: true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "ClientsPayments_SelectList" }, { "name": 'names', "value": 'ClientID' }, { "name": 'values', "value": cid });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var tot = 0;
                        for (var i = 0; i < aData.length; i++) {
                            tot += (parseFloat(aData[i]["Amount"]) * 1);
                        }
                        $('strong.debit').text(numeral(tot).format('0,0'));
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "ClientPaymentsID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="ClientsPaymentsPrint.aspx?id=' + d["ClientPaymentsID"] + '">' + d.ReceiptID + '</a>';
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
                            "mDataProp": "full_name",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="ClientCars.aspx?id=' + d.ClientID + '" title="حساب العميل">' + d.full_name + '</a>';
                            }
                        },
                        {
                            "mDataProp": "PaymentsDates",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.PaymentsDates ? commonManger.dateFormat(d.PaymentsDates, 'M/D/YYYY', 'DD/MM/YYYY') : '';
                            }
                        },
                        {
                            "mDataProp": "ExchangeCompanyNameAr",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.ExchangeCompanyNameAr ? d.ExchangeCompanyNameAr : '';
                            }
                        },
                        {
                            "mDataProp": "AmountDhs",
                            "bSortable": false,
                            "mData": function (oObj) {
                                return numeral(oObj['AmountDhs']).format('0,0');
                            }
                        },
                        {
                            "mDataProp": "Amount",
                            "bSortable": false,
                            "mData": function (oObj) {
                                return numeral(oObj['Amount']).format('0,0');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (oObj) {
                                return '<div class="tools pull-left hidden-print"><a href="ClientsPaymentsPrint.aspx?id=' + oObj["ClientPaymentsID"] + '" class="btn btn-mini btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a> ' + delButton() + '</div>';
                            }
                        }
                    ]
                });

                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr').index(), aData;
                    if (pos !== null) {
                        if (self.hasClass('remove')) {
                            var title = "إلغاء إيداع عميل", operation = 'insert', modalDialog = 'cancelModal';
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            $('#ReceiptID').val(aData['ReceiptID']);
                            $('#ClientPaymentID').val(aData['ClientPaymentsID']);
                            $('#PaymentsDates').val(aData['PaymentsDates']);
                            $('#Amount').val(aData['Amount']);
                            $('#full_name').val(aData['full_name']);

                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                    }
                });
            },

            // discounts
            filllistItems2 = function () {
                cid = (!cid || cid == 0 ? "" : cid);
                var oTable = $('#listItems2').DataTable({
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
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "ClientDiscounts_SelectList" }, { "name": 'names', "value": 'ClientID' }, { "name": 'values', "value": cid });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "DiscountAmount",
                            "bSortable": true,
                            "mData": function (d) {
                                return numeral(d.DiscountAmount).format('0,0');
                            }
                        },
                        {
                            "mDataProp": "AddDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return commonManger.formatJSONDateCal(d.AddDate);
                            }
                        },
                        {
                            "mDataProp": "CarID",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "Notes",
                            "bSortable": true
                        }
                    ]
                });
            },

            // money back
            fillListItems3 = function () {
                cid = (cid == 0 ? "" : cid);
                var oTable = $('#listItems3').DataTable({
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
                    "bServerSide": true,
                    "bRetrieve": false,
                    saveState: true,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "ClientsMoneyBacks_List" }, { "name": 'names', "value": 'ClientID' }, { "name": 'values', "value": cid });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "ReceiptID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a title="طباعة سند الصرف" target="_blank" href="ReceiptPaymentsPrint.aspx?id=' + d.ReceiptID + '">' + d.ReceiptID + '</a>';
                            }
                        },
                        {
                            "mDataProp": "AddDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return commonManger.formatJSONDateCal(d.AddDate);
                            }
                        },
                        {
                            "mDataProp": "Amount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.Amount).format('0,0');
                            }
                        },
                        {
                            "mDataProp": "Notes",
                            "bSortable": false
                        }
                    ]
                });
            },

            // bonus
            fillListItems4 = function () {
                cid = (cid == 0 ? "" : cid);
                var oTable = $('#listItems4').DataTable({
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
                    "bServerSide": true,
                    "bRetrieve": false,
                    saveState: true,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "ClientsBonus_SelectList" }, { "name": 'names', "value": 'ClientID~Revised' }, { "name": 'values', "value": cid + '~1' });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "BonusID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a title="التفاصيل" target="_blank" href="ClientBonusPrint.aspx?id=' + d.BonusID + '">' + d.BonusID + '</a>';
                            }
                        },
                        {
                            "mDataProp": "AddDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return commonManger.formatJSONDateCal(d.AddDate);
                            }
                        },
                        {
                            "mDataProp": "Amount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.Amount).format('0,0');
                            }
                        },
                        {
                            "mDataProp": "Notes",
                            "bSortable": false
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (d) {
                                return '<a href="ClientBonusPrint.aspx?id=' + d.BonusID + '" class="btn btn-mini btn-success" title="طباعة"><i class="icon-print"></i></a> ' + delButton();
                            }
                        }
                    ]
                });

                $("#listItems4 tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr').index(), aData;
                    if (pos !== null) {
                        if (self.hasClass('remove')) {
                            var title = "إلغاء تخفيض",
                                operation = 'save',
                                modalDialog = 'cancelBonus';

                            aData = oTable.row(pos).data(); //get data of the clicked row

                            $('#BonusID').val(aData['BonusID']);
                            $('.Amount').val(numeral(aData['Amount']).format('0,0'));
                            $('.full_name').val($('a.clientName').text());

                            commonManger.showPopUpDialog(title, operation, modalDialog);
                        }
                    }
                });
            };

        return {
            Init: Init
        };

    }();
