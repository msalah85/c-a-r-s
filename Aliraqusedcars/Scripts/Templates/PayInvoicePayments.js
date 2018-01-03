var
    PayInvoicePayments = PayInvoicePayments || {},
    PayInvoicePayments = function () {
        var
            buyer = null, changeco = null, from = null, to = null, pendType = 0,

            Init = function () {
                filllistItems();
                setDataToControlandGrid();
                setTitle();
                pageEvents();
            },
            pageEvents = function () {
                // search list
                $('#SearchAll').click(function (e) {
                    e.preventDefault();
                    buyer = $('#Buyer').val(),
                        changeco = $('#ExchangeCompanyID').val(),
                        from = commonManger.dateFormat($('#From').val()),
                        to = commonManger.dateFormat($('#To').val());

                    updareGrid();
                });

                // cancel payment
                $('.bntCancelInvoice').click(function (e) {
                    e.preventDefault();

                    // prepare data to delete
                    var obj = {
                        id: $('#PayInvoicePaymentsID').val(),
                        reason: $('#deleteReason').val(),
                    },
                        dto = {
                            actionName: 'PayInvoicePayments_Delete',
                            names: ['ID', 'Reason'],
                            values: [obj.id, obj.reason],
                            setUserIP: true
                        };


                    // start delete row.
                    // validate reason.
                    if (obj.id != '' && obj.reason != '') {
                        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveDataByUser', successDeleteCallback, commonManger.errorException);
                    } else {
                        // required fields alert.
                        commonManger.showMessage('بيانات مطلوبة:', 'يرجي ادخال سبب الحذف، والتأكد من كود الحوالة..');
                        $('#deleteReason').focus();
                    }

                });
            },
            successDeleteCallback = function (data) {
                data = data.d;

                // success deleted
                if (data.Status) {

                    // refresh list after delete
                    updareGrid();

                    // hide delete confirm modal.
                    $('.modal').modal('hide');

                    // success delete alert
                    commonManger.showMessage('تم الحذف بنجاح:', 'تم حذف البيان بنجاح.');
                }
                else {
                    // error delete alert
                    commonManger.showMessage('خطأ بالحذف:', 'لقد حدث خطأ أثناء الحذف: ' + data.message);
                }
            },
            setTitle = function () {
                pendType = commonManger.getQueryStrs().pend;
                if (pendType > 0) {
                    $('.title').text('عرض حوالات الشراء قيد الدفع');
                    $('.table-header').css({ 'border-color': '#666', 'background': '#404040' });
                }
            },
            bindControls = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

                if (jsn) {
                    $('#ExchangeCompanyID').append($.map(jsn, function (v, i) { return $('<option />').text(v.Name).val(v.ID); }));
                }

                if (jsn1) {
                    $('#Buyer').append($.map(jsn1, function (v, i) { return $('<option />').text(v.BuyerName).val(v.BuyerName); }));
                }

                $('.chzn-select').trigger('chosen:updated').trigger("liszt:updated");
            },
            setDataToControlandGrid = function () {
                var functionName = "PayInvoicePayments_Properties", DTO = { 'actionName': functionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindControls, commonManger.errorException);
            },
            updareGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                pendType = commonManger.getQueryStrs().pend;
                pendType = (pendType > 0) ? 1 : 0;

                var oTable = $('#listItems').DataTable({
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
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "PayInvoicePayments.aspx/GetPayInvoicePayments",
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { commonManger.setData2Grid(data, aoData.sEcho, fnCallback); }, commonManger.errorException);
                    },
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "ExchangeCompanyID", "value": changeco }, { "name": "Buyer", "value": buyer }, { "name": "From", "value": from }, { "name": "To", "value": to }, { "name": "Pend", "value": pendType });
                    },
                    "footerCallback": function (tfoot, data, start, end, display) {
                        var api = this.api();

                        var $tot = api.column(6).data().reduce(function (a, b) {
                            return numeral().unformat(a) + numeral().unformat(b);
                        }, 0);

                        $(api.column(6).footer()).html(
                            numeral($tot).format('0,0.00')
                        );
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "PayInvoicePaymentsID",
                            "bSortable": true
                        }, {
                            "mData": function (d) { return commonManger.dateFormat(d.PaymentsDates, 'YYYY/M/D', 'DD/MM/YYYY'); },
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ExchangeCompanyNameAr",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.CheckNo ? d.ExchangeCompanyNameAr ? d.ExchangeCompanyNameAr : '<a href="payinvoicepaymentsprint.aspx?id=' + d.PayInvoicePaymentsID + '&review=1">تصفير الحوالة</a>' : '<a href="payinvoicepaymentspendingprint.aspx">سند صرف</a>';
                            }
                        },
                        {
                            "mDataProp": "AuctionNameAr",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "BuyerName",
                            "bSortable": true
                        },
                        {
                            "mData": 'Notes',
                            "bSortable": false
                        },
                        {
                            "mDataProp": "TotalAmount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.TotalAmount).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (oObj) {
                                var _delBtn = ' <button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" title="حــذف"><i class="icon-remove icon-only"></i></button>';

                                return '<a href="PayInvoicePaymentsPrint.aspx?id=' + oObj["PayInvoicePaymentsID"] + '" class="btn btn-mini" data-rel="tooltip" title="طباعة"><i class="icon-print"></i></a>' + (!oObj.CheckNo ? ' <a href="PayInvoicePaymentDetails.aspx?id=' + oObj.PayInvoicePaymentsID + '" class="btn btn-mini btn-info" data-rel="tooltip" title="تعديل"><i class="icon-edit"></i></a>' : '')
                                    + (oObj.ExchangeCompanyNameAr ? '' : _delBtn);
                            }
                        }
                    ]
                });


                $("#listItems tbody").delegate("tr button.remove", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData;

                    if (pos != null) {
                        aData = oTable.row(pos).data();

                        // reset cancel form
                        $('#cancelForm textarea, #cancelForm input[type="text"]').val('');

                        // set payment details
                        $('#PayInvoicePaymentsID').val(aData.PayInvoicePaymentsID);
                        $('#buyer').val(aData.BuyerName);
                        $('#auction').val(aData.AuctionNameAr);

                        // show modal
                        $('#cancelModal').modal('show');
                    }
                });
            };

        return {
            Init: Init
        };
    }();
