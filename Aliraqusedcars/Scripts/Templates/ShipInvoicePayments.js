var
    ShipInvoicePayments = ShipInvoicePayments || {},
    ShipInvoicePayments = function () {
        var

            shipper = '', paymentType = 0,

            Init = function () {
                $('#btnSearchAll').on('click', function () {
                    updareGrid();
                });


                filllistItems();
                setDataToControlandGrid();
                setTitle();
            },
            setTitle = function () {
                paymentType = commonManger.getQueryStrs().type;
                if (paymentType > 0) {
                    $('.title').text('عرض حوالات الشحن قيد الدفع');
                    $('.table-header').css({ 'border-color': '#666', 'background': '#404040' });
                }
            },
            setDataToControlandGrid = function () {
                var functionName = "ShipInvoicePayments_Properties",
                    DTO = { actionName: functionName, value: '' };

                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    function (data) {
                        var selectList = JSON.parse(data.d);
                        $.each(selectList, function (i, Basicdata) {
                            $('#ShipCompanyID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                        });
                        $('#ShipCompanyID').chosen().trigger('chosen:updated').trigger("liszt:updated");
                    }, commonManger.errorException);
            },
            updareGrid = function () {
                $('#listItems').DataTable().draw(true);
            },
            filllistItems = function () {
                shipper = $('#ShipCompanyID').val(),
                    paymentType = commonManger.getQueryStrs().type;

                paymentType = (paymentType > 0) ? 1 : 0;

                var oTable = $('#listItems').DataTable({
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
                    ], 'language': {
                        'search': '_INPUT_',
                        'searchPlaceholder': 'برقم الحواله'
                    },
                    "aaSorting": [],
                    "bServerSide": true,
                    "bRetrieve": false,
                    "bDestroy": true, responsive: true,
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "ShipCompanyID", "value": shipper }, { "name": "Type", "value": paymentType });
                    },
                    "sAjaxSource": "ShipInvoicePayments.aspx/GetShipInvoicePayments",
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "ShipInvoicePaymentsID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="ShipInvoicePaymentsPrint.aspx?id=' + d["ShipInvoicePaymentsID"] + '" data-rel="tooltip" title="طباعة" data-original-title="طباعة">' + d.ShipInvoicePaymentsID + '</i></a>';
                            }
                        }, {
                            "mData": function (d) { return commonManger.dateFormat(d.PaymentsDates, 'M/D/YYYY', 'DD/MM/YYYY'); },
                            "bSortable": true
                        },
                        {
                            "mDataProp": "ExchangeCompanyNameAr",
                            "bSortable": false,
                            "mData": function (d) {
                                var receiptUrl = (d.CheckNo ? '' : '<a href="ReceiptPaymentsAdd.aspx?samount=' + (parseFloat(d.AmountDhs).toFixed()) + '&ids=' + d.ShipInvoicePaymentsID + '">سند صرف</a>'),
                                    reviewUrl = d.ExchangeCompanyNameAr ? '' : '<a href="ShipInvoicePaymentsPrint.aspx?review=1&id=' + d.ShipInvoicePaymentsID + '">تصفير الحوالة</a>';
                                // make receipt first then do review end show exchange company
                                return d.ExchangeCompanyNameAr ? d.ExchangeCompanyNameAr : (receiptUrl != '' ? receiptUrl : reviewUrl);
                            }
                        },
                        {
                            "mDataProp": "ShipMainCompanyNameAr",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "Amount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.Amount).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": 'hidden-print',
                            "mData": function (d) {
                                var _delBtn = ' <button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" title="حــذف"><i class="icon-remove icon-only"></i></button>';
                                return '<a href="ShipInvoicePaymentsPrint.aspx?id=' + d["ShipInvoicePaymentsID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>' + (!d.CheckNo ? _delBtn : '');
                            }
                        }]
                });

                commonManger.searchData(oTable);

                $("#listItems tbody").delegate("tr button.remove", "click", function (e) {
                    e.preventDefault();

                    var self = $(this),
                        pos = self.closest('tr'), aData;


                    if (pos !== null) {
                        DeleteConfirmation(function () {
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            var DTO = { 'value': aData["ShipInvoicePaymentsID"] },
                                _url = 'ShipInvoicePayments.aspx/updatedate',
                                succBack = function (data) {
                                    oTable.draw();
                                };


                            dataService.callAjax('Post', JSON.stringify(DTO), _url, succBack, commonManger.errorException);
                        });
                    }

                });
            };

        return {
            Init: Init
        };

    }();



// initailize
ShipInvoicePayments.Init();