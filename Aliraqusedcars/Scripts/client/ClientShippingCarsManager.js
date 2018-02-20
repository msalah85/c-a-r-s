var
    filllistItems = function () {
        var
            oTable = $('#listItems').DataTable({
                "sDom": "<'row'<'col-sm-6'l><'col-sm-6'BTf>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
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
                        { name: "funName", value: 'ClientCars_ShippingList' });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { // get data as json format from encrypted xml                        
                        commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                    }, commonManger.errorException);
                },
                "drawCallback": function () {
                    var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null;
                    api.column(6, { page: 'current' }).data().each(function (group, i) { // show invoice info
                        if (last !== group) {
                            $(rows).eq(i).before('<tr class="alert alert-success"><td colspan="100%"><strong>نقطة الشحن: </strong>' + group + '</td></tr>');
                            last = group;
                        }
                    });
                },
                iDisplayLength: 50,
                aaSorting: [],
                aoColumns: [
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
                            return row.MainPicture && row.MainPicture !== undefined ? '<a target="_blank" data-rel=\"tooltip\" title=\"سيارة رقم: ' + row.CarID + '\" href=\"/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '\"><img alt=\"car\" width=\"60\" src=\"/public/cars/' + row.CarID + '/_thumb/' + row.MainPicture + '\" /></a>' : '<a href=\"/car/' + row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year + '\"><img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return '<a target="_blank" data-rel=\"tooltip\" class="model" title=\"عرض تفاصيل السيارة\" title=\"عرض تفاصيل السيارة\" href="/car/' + (row.CarID + '-' + row.MakerNameAr + '-' + row.TypeNameAr + '-' + row.Year).replace(/[_\W]+/g, "-") + '">' + row.MakerNameAr + ' - ' + row.TypeNameAr + ' - ' + row.Year + (row.PayInvTypeID == 3 ? ' - Relist' : '') + '</a>\
                            <span title="الشاصي">'+ row.ChassisNo + '</span>\
                            <span title="اللوت">اللوت:' + row.LotNo + '</span>';
                        }
                    },
                    {
                        "mDataProp": 'SalePrice',
                        "bSortable": false,
                        "mData": function (d) {
                            return '<span class="red" data-rel="tooltip" title="سعر الشراء:  ' + numeral(d.PayPrice).format('0,0') + '$  -  عمولة الشركة: ' + numeral(d.SalePrice - d.PayPrice).format('0,0') + '$">' + numeral(d.SalePrice).format('0,0') + '</span>';
                        }
                    },
                    {// pay date
                        "mData": function (d) { return d.InvoiceDate ? moment(d.InvoiceDate).format('D/M/YYYY') : ''; },
                        "bSortable": false
                    },
                    {// arrive date
                        "mData": function (d) { return d.ArrivalDate ? moment(d.ArrivalDate).format('D/M/YYYY') : 'قيد التحميل'; },
                        "bSortable": false
                    },
                    {// car location
                        "mData": function (d) {
                            // America flag 
                            // Point name (NY, TX, ..)
                            return ('<img src= "/App_Themes/iraq/images/USA.jpg" width= "25" />') +
                                (d.ShipCompanyNameEn ? (' ' + d.ShipCompanyNameEn.split('-')[1]) : '');
                        },
                        "bSortable": false
                    },
                    { // view in site
                        "mData": null,
                        "bSortable": false,
                        'sClass': 'hidden-print',
                        "render": function (data, type, row) {
                            return '<a target="_blank" title="عرض السيارة بالموقع" href="mycarsetforsale?id=' + row.CarID + '"><i class="fa fa-eye fa-2x"></i></a>';
                        }
                    }
                ]
            });

        //searchDataTables(oTable);
    };

filllistItems();