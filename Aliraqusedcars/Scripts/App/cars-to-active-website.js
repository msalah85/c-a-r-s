//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var pageManager = function () {
    "use strict";
    var 
        Init = function () {
            filllistItems();
        },
        filllistItems = function () {
            var pTable = $('#listItems').dataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'T>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                //"bProcessing": true,
                "bServerSide": true,responsive:true,responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "cars-to-active-website.aspx/LoadData",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "CarID",
                        "bSortable": true,
                        'sType': 'numeric',
                    },
                    {
                        "mDataProp": "MainPicture",
                        "bSortable": false,
                        "mData": function (d) {
                            return '<a title="صور السيارة رقم: ' + d.CarID + '" href="images.aspx?id=' + d.CarID + '">' + ((d.MainPicture && d.MainPicture !== null) ? '<img alt=\"car\" src=\"/public/cars/' + d.CarID + '/_thumb/' + d.MainPicture + '\" />' : '<img alt=\"car\" src="/public/cars/noimage.gif" />') + '</a>';
                        }
                    },
                    {
                        "mDataProp": "TypeNameEn",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + (oObj['PayInvTypeID'] == 3 ? ' - Relist' : '') + '</a>';
                        }
                    },
                    {
                        "mDataProp": "LotNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": false
                    },
                    {
                        "mData": "SaleClientName",
                        "bSortable": false
                    },
                    {
                        "mData": function (d) {
                            return numeral(d.WesitePrice).format('0,0');
                        },
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "sClass": "hidden-print",
                        "mData": function (d) {
                            return '<a href="pay/' + d["CarID"] + '/InvoicePayAdd.aspx" class="hidden-print btn btn-mini btn-info" data-rel="tooltip" data-placement="top" title="عرض بالموقع" data-original-title="عرض بالموقع"><i class="icon-eye-open icon-only"></i></a>';
                        }
                    }
                ]
            });
            commonManger.searchData(pTable);
        };
    return {
        Init: Init
    };
}();
pageManager.Init();