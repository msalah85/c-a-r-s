var ClientsPayments = function () {
    var
        Init = function () {
            var qs = getUrlVars(), searchStr = qs['key'], kid = qs['kid'];
            filllistItems(searchStr, kid);
        },
        filllistItems = function (value, keyID) {
            var oTable = $('#listItems').dataTable({
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
                "bFilter": false,
                "bServerSide": true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "SearchPayments.aspx/GetClintsPayments" + "?key=" + value + '&kid=' + keyID,
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { data.d.aaData = $.parseJSON(data.d.aaData); fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "ClientPaymentsID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "full_name",
                        "bSortable": true
                    }, {
                        "mDataProp": "PaymentsDates",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ExchangeCompanyNameAr",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "CheckNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Amount",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.Amount).format('0,0.0');
                        }
                    },
                    {
                        "bSortable": false,
                        "mData": function (oObj) {
                            var canceled = '';
                            if (oObj.IsDeleted) {
                                canceled = '<b class="red">ملغاه</b>';
                            }
                            return canceled + '<a href="ClientsPaymentsPrint.aspx?id=' + oObj["ClientPaymentsID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>';
                        }
                    }
                ]
            });
            commonManger.searchData(oTable);
        };
    return {
        Init: Init
    };
}();
