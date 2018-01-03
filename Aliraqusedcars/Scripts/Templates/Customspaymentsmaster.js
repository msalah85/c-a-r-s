var
    Customspaymentsmaster = Customspaymentsmaster || {},
    Customspaymentsmaster = function () {
        var
            pend = '', coID = '', paymentType = 0,


            Init = function () {
                filllistItems();
                setDataToControlandGrid();
                doEvents();
                setTitle();
            },
            doEvents = function () {
                $('#SearchAll').click(function (e) {
                    e.preventDefault();
                    coID = $('#CustomsCompanyID').val(),
                        updateGrid();
                });
            },
            setTitle = function () {
                paymentType = commonManger.getQueryStrs().pend;
                if (paymentType > 0) {
                    $('.title').text('عرض حوالات التخليص قيد الدفع');
                    $('.table-header').css({ 'border-color': '#666', 'background': '#404040' });
                }
            },
            setDataToControlandGrid = function () {
                var functionName = "Customspaymentsmaster_Properties", DTO = { 'actionName': functionName, 'value': 0 };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    function (data) {
                        var selectList = JSON.parse(data.d);
                        $.each(selectList, function (index, Basicdata) {
                            if (Basicdata.tbl_name == 0) {
                                $('#CustomsCompanyID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                            }
                        });
                        $('#CustomsCompanyID').chosen().trigger('chosen:updated').trigger("liszt:updated");

                    }, commonManger.errorException);
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                paymentType = commonManger.getQueryStrs().pend;
                paymentType = (paymentType > 0) ? 1 : 0;

                var oTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid tbl-head-options'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            //$('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }
                    ],
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "CustomsPayments.aspx/GetCustomspaymentsmaster",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "CustomsCompanyID", "value": coID }, { "name": "Type", "value": paymentType });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var totDhs = 0;
                        for (var i = 0; i < aData.length; i++) {
                            totDhs += (aData[i]["AmountDhs"]);
                        }
                        $(nFoot).find('th:eq(1)').html(numeral(totDhs).format('0,0'));
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "PaymentsId",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="CustomspaymentsmasterPrint.aspx?id=' + d["PaymentsId"] + '" title="طباعة">' + d["PaymentsId"] + '</a>';
                            }
                        }, {
                            "mDataProp": "PaymentsDates",
                            "mData": function (d) { return commonManger.dateFormat(d.PaymentsDates, 'YYYY/M/D', 'DD/MM/YYYY'); },
                            "bSortable": true
                        },
                        {
                            "mDataProp": "CustomsCompanyNameAr",
                            "bSortable": true
                        },
                        {
                            "mDataProp": "CheckNo",
                            "bSortable": false,
                            "mData": function (d) {
                                var receiptUrl = '<a title="طباعة السند" href="ReceiptPaymentsPrint.aspx?id=' + d.CheckNo + '">' + (d.CheckNo) + '</a>';
                                return (d.CheckNo ? receiptUrl : '<a href="ReceiptPaymentsAdd.aspx?camount=' + (parseFloat(d.AmountDhs).toFixed()) + '&ids=' + d.PaymentsId + '">سند صرف</a>');

                            }
                        },
                        {
                            "mDataProp": "TotalAmount",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.TotalAmount).format('0,0.00');
                            }
                        },
                        {
                            "mDataProp": "AmountDhs",
                            "bSortable": false,
                            "mData": function (d) {
                                return numeral(d.AmountDhs).format('0,0.00');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": 'hidden-print',
                            "mData": function (oObj) {
                                var _delBtn = ' <button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" title="حــذف"><i class="icon-remove icon-only"></i></button>';
                                return '<a href="CustomspaymentsmasterPrint.aspx?id=' + oObj["PaymentsId"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>' + (oObj.CheckNo ? '' : ' <a class="btn btn-minier btn-info" title="تعديل" href="CustomspaymentsDetails.aspx?id=' + oObj.PaymentsId + '"><i class="icon-edit"></i></a>' + _delBtn);
                            }
                        }
                    ]
                });


                $("#listItems tbody").delegate("tr button.remove", "click", function (e) {
                    e.preventDefault();
                    var self = $(this),
                        pos = self.closest('tr').index(),
                        aData;

                    if (pos !== null) {
                        DeleteConfirmation(function () {
                            aData = oTable.row(pos).data(); //get data of the clicked row

                            var DTO = { value: aData["PaymentsId"] },
                                _url = 'CustomsPayments.aspx/updatedate',
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
