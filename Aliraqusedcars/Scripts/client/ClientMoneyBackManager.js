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
                "sAjaxSource": sURL + "ClientDT",
                "fnServerParams": function (aoData) {
                    aoData.push(
                        { name: 'names', value: '' }, { name: 'values', value: '' },
                        { name: "funName", value: 'ClientsMoneyBacks_List' });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { // get data as json format from encrypted xml                        
                        commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                    }, commonManger.errorException);
                },
                "footerCallback": function (tfoot, data, start, end, display) {
                    var api = this.api(), _data = api.column(4).data();
                    if (_data.length > 0) {
                        var ttal = _data.reduce(function (a, b) { return (a * 1) + (b * 1); });
                        $('.total').text(
                            numeral(ttal).format('0,0')
                        );
                    }
                },
                iDisplayLength: 50,
                aaSorting: [],
                aoColumns: [
                    {
                        "mDataProp": "ReceiptID",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "CarID",
                        "bSortable": false,
                        "mData": function (d) {
                            return `<a target="_blank" title="تفاصيل السيارة" href="/car/${d.CarID}-car-details">${d.CarID}</a>`;
                        }
                    },
                    {
                        mData: function (d) { return moment(d.AddDate).format('D/M/YYYY'); },
                        "bSortable": false
                    },
                    {
                        "mDataProp": "Notes",
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