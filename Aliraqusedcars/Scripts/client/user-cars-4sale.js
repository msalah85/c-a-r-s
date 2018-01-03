var
    
    filllistItems = function () {
        var _existTotal = $('.totalRequired'), _debit = $('.debit');
        _existTotal.text(0);
        var oTable = $('#listItems').dataTable({
            "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BT>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
            "language": { "url": "/Scripts/datatable/Arabic.min.js" }, responsive: true,
            buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { text: 'طباعة', action: function (e, dt, node, config) { window.print(); } }],
            "bServerSide": true,
            "bRetrieve": false,
            "bDestroy": true,
            "sAjaxSource": sURL + "ClientCars4Sale",
            "fnServerData": function (sSource, aoData, fnCallback) {
                dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, errorException);
            },
            "iDisplayLength": 50,
            "aaSorting": [],
            "aoColumns": [
                {
                    "mData": 'CarID',
                    "bSortable": false,
                    "render": function (data, type, row) {
                        return '<a title="طباعة الفاتورة" target="_blank" href="/InvoicePrint.aspx?id=' + row.SaleInvoiceID + '">' + data + '</a>';
                    }
                },
                    {
                        "mDataProp": "MainPicture",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return row.MainPicture != null ? '<a data-rel=\"tooltip\" title=\"سيارة رقم: ' + row.CarID + '\" href=\"/car/' + (row.CarID + '-' + row.MakerNameEn + '-' + row.TypeNameEn + '-' + row.Year).replace(/[_\W]+/g, "-") + '\"><img alt=\"car\" width=\"60\" src=\"/public/cars/' + row.CarID + '/_thumb/' + row.MainPicture + '\" /></a>' : '<a href=\"/car/' + row.CarID + '-' + row.MakerNameEn + '-' + row.TypeNameEn + '-' + row.Year + '\"><img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "mDataProp": "",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return '<a data-rel=\"tooltip\" title=\"عرض صور السيارة\" title=\"عرض صور السيارة\" href="/car/' + (row.CarID + '-' + row.MakerNameEn + '-' + row.TypeNameEn + '-' + row.Year).replace(/[_\W]+/g, "-") + '">' + row.MakerNameEn + ' - ' + row.TypeNameEn + ' - ' + row.Year + (row.PayInvTypeID == 3 ? ' - Relist' : '') + '</a>';
                        }
                    },
                    {
                        "mDataProp": 'ChassisNo',
                        "bSortable": false
                    },
                    {
                        "mData": 'LotNo',
                        "bSortable": false,
                    },
                    {
                        "mDataProp": 'WorkingStatusName',
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ColorNameAr",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "WesitePrice",
                        "bSortable": false
                    },
                    {
                        "mData": null,
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return '<a title="إلغاء عرض السيارة بالموقع" href="/mycarsetforsale?id=' + row.CarID + '"><i class="fa fa-eye-slash fa-2x"></i></a>';
                        }
                    }
            ]
        });
        searchDataTables(oTable);
    };

// initialize data
filllistItems();