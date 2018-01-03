var CarsLateShipping = function () {
    var
        Init = function () {
            filllistItems();
        },
        filllistItems = function () {
            var oaTable = $('#listItems').dataTable({
                "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                "bServerSide": true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "/api/general.aspx/LoadData?funName=CarsData_SelectCarsLateShipping",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, commonManger.errorException);
                },
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "CarID",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "MakerNameEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "TypeNameEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": true
                    },
                    {
                        "bSortable": true,
                        "mData": function (d) {
                            return commonManger.formatJSONDate(d.InvoiceDate);
                        }
                    },
                    {
                        "mDataProp": "PayPrice",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "ShipCompanyNameEn",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "BuyerName",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "WorkingStatusName",
                        "bSortable": true
                    },
                    {
                        "mData": function (d) {
                            return '<a href="CarDetailsPrint.aspx?id=' + d.CarID + '" class="btn btn-minier btn-info" data-rel="tooltip" title="مراجعة فاتورة الشراء"><i class="icon-edit"></i></a>';
                        }
                    }
                ]
            });
            commonManger.searchData(oaTable);
        };
    return {
        Init: Init
    };
}();
CarsLateShipping.Init();