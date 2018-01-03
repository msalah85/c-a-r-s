var
    filllistItems = function () {
        var
            

            oTable = $('#listItems').DataTable({
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BT>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
                "language": { "url": "/Scripts/datatable/Arabic.min.js" },
                responsive: true,
                buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                {
                    text: 'طباعة',
                    action: function (e, dt, node, config) {
                        window.print();
                    }
                }],
                "bServerSide": true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": sURL + "LoadPayments",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, errorException);
                },
                "footerCallback": function (tfoot, data, start, end, display) {
                    var api = this.api(), _data = api.column(4).data();
                    if (_data.length > 0) {
                        var ttal = _data.reduce(function (a, b) { return a + b; });
                        $('.debit').text(
                            numeral(ttal).format('0,0')
                        );
                    }
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "ClientPaymentsID",
                        "bSortable": false,
                        "mData": function (d) {
                            return d.ReceiptID ? `<a href="ReceiptPrint.aspx?id=${d.ReceiptID}">${d.ReceiptID}</a>` : d.ClientPaymentsID;
                        }
                    },
                    {
                        "mDataProp": "CheckNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "PaymentsDates",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ExchangeCompanyNameAr",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Amount",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return numeral(data).format('0,0');
                        }
                    }
                ]
            });
        searchDataTables(oTable);
    };

filllistItems();