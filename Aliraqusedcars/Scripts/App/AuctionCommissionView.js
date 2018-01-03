var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            auction = '', from = null, to = null,
            Init = function () {
                filllistItems();
                setDataToSearch();
                pageEvents();
            },
            pageEvents = function () {
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    auction = $('#AuctionType').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val());
                    updateGrid();
                });

                $('.bntCancelInvoice').click(function (e) {
                    e.preventDefault();

                    var _obj = {
                        id: $('#AuctionCommID').val(),
                        reason: $('#DeleteReason').val(),
                        fun: 'AuctionCommissions_Delete',
                        names: ['ID', 'Reason'],

                    },
                    dto = { 'actionName': _obj.fun, names: _obj.names, values: [_obj.id, _obj.reason] };


                    // validate
                    if (_obj.reason != '')
                        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', successDeleted, commonManger.errorException);
                    else {
                        $('#DeleteReason').focus();
                        commonManger.show('بيانات مطلوبه:', 'يرجي إدخال سبب الإلغاء.');
                    }


                });
            },
            successDeleted = function (data) {
                data = data.d;
                if (data.Status) {
                    commonManger.showMessage('تم الحذف بنجاح:', 'تمت عملية الحذف بنجاح.');
                    $('#cancelModal').modal('hide');
                    updateGrid();
                }
            },
            bindListSearch = function (list, id) { // shippers for search
                for (var i = 0; i < list.length; i++) {
                    $('#' + id).append($("<option></option>").attr("value", list[i].AuctionTypeID).text(list[i].AuctionTypeName));
                }
                $('#' + id).chosen().trigger('chosen:updated').trigger("liszt:updated");
            },
            setDataToSearch = function () {
                var functionName = "AuctionCommissions_Properties", DTO = { 'actionName': functionName, 'value': '' };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                  function (data) {
                      var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                      bindListSearch(jsn, 'AuctionType');
                  }, commonManger.errorException);
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var pTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
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
                    "bProcessing": true,
                    "bServerSide": true, responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "AuctionCommissionView.aspx/LoadData",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "auction", "value": auction }, { "name": "From", "value": from }, { "name": "To", "value": to });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api();

                        var $tot = api.column(5).data().reduce(function (a, b) {
                            return numeral().unformat(a) + numeral().unformat(b);
                        }, 0),
                            aedTot = api.column(6).data().reduce(function (a, b) {
                                return numeral().unformat(a) + numeral().unformat(b);
                            }, 0);

                        // $
                        $(api.column(5).footer()).html(
                            numeral($tot).format('0,0.00')
                        );

                        // AED
                        $(api.column(6).footer()).html(
                            numeral(aedTot).format('0,0.00')
                        );
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "AuctionCommID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a title="طباعه" href="AuctionCommissionPrint.aspx?id=' + d["AuctionCommID"] + '">' + d.AuctionCommID + '</a>'
                            }
                        },
                        {
                            "mData": function (d) { return commonManger.dateFormat(d.InvoiceDate, 'YYYY/M/D', 'DD/MM/YYYY'); },
                            "bSortable": true
                        },
                        {
                            "mDataProp": "AuctionTypeName",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ExchangeCompanyNameAr",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.CheckNo ? (d.DeskInvoice ? d.ExchangeCompanyNameAr : '<a href="AuctionCommissionPrint.aspx?id=' + d.AuctionCommID + '&review=1">تصفير الحوالة</a>') : '---';
                            }
                        },
                        {
                            "mDataProp": "CheckNo",
                            "bSortable": true,
                            "mData": function (d) {
                                var receiptUrl = '<a title="طباعة السند" href="ReceiptPaymentsPrint.aspx?id=' + d.CheckNo + '">' + (d.CheckNo) + '</a>';
                                return (d.CheckNo ? receiptUrl : '<a href="ReceiptPaymentsAdd.aspx?acmount=' + (parseFloat(d.CommAmountDhs).toFixed()) + '&ids=' + d.AuctionCommID + '">سند صرف</a>');
                            }
                        },
                        {
                            "mDataProp": "CommAmount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.CommAmount).format('0,0.00');
                            }
                        },
                        {
                            "mDataProp": "CommAmountDhs",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.CommAmountDhs).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (oObj) {

                                var _editBtn = ' <a href="AuctionCommissionAdd.aspx?id=' + oObj["AuctionCommID"] + '" class="btn btn-mini btn-info" data-rel="tooltip" title="تعديل"><i class="icon-edit"></i></a>',
                                    _delBtn = ' <button class="btn btn-mini btn-danger remove" data-rel="tooltip" title="حــذف"><i class="icon-remove icon-only"></i></button>',
                                    _deleteMe = commonManger.fullRoles();


                                return '<a href="AuctionCommissionPrint.aspx?id=' + oObj["AuctionCommID"] + '" class="btn btn-mini btn-grey" data-rel="tooltip" title="طبــاعه"><i class="icon-print icon-only"></i></a>' + (!oObj.CheckNo ? (_editBtn + (_deleteMe ? _delBtn : '')) : '');
                            }
                        }
                    ]
                });

                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr'), aData;

                    if (pos != null) {
                        if (self.hasClass('remove')) {

                            aData = pTable.row(pos).data();

                            $('#DeleteReason').val('');
                            $('#AuctionCommID').val(aData.AuctionCommID);
                            $('#CommAmount').val(aData.CommAmount);
                            $('#InvoiceDate').val(commonManger.formatJSONDate(aData.InvoiceDate));

                            $('#cancelModal').modal('show');

                        }
                    }
                });
            };
        return {
            Init: Init
        };
    }();