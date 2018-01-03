CarsNotReceivedView = function () {
    var
        Init = function () {
            filllistItems();
        },
        errorCallBack = function (jqXhr, textStatus, errorThrown) {
            var title = textStatus + ": " + errorThrown;
            var message = JSON.parse(jqXhr.responseText).Message;
            commonManger.showMessage(title, message);
        },
        filllistItems = function () {
            var oaTable = $('#listItems').dataTable({
                "bServerSide": true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": "/api/general.aspx/LoadData?funName=CarsData_NotReceivedList",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); }, errorCallBack);
                },
                "iDisplayLength": 50,
                "aaSorting": [[0, 'desc']],
                "aoColumns": [
                    {
                        "mDataProp": "CarID",
                        "bSearchable": true,
                        "bSortable": true,
                        "sClass": "text-center"
                    },
                    {
                        "mDataProp": "MainPicture",
                        "bSearchable": false,
                        "bSortable": false,
                        "sClass": "text-center",
                        "mData": function (oObj) {
                            return oObj["MainPicture"] != null ? '<a title="صور السيارة رقم: ' + oObj["CarID"] + '" href="images.aspx?id=' + oObj["CarID"] + '"><img alt=\"car\" width=\"60\" src=\"/public/cars/' + oObj["CarID"] + '_thumb/' + oObj["MainPicture"] + '\" /></a>' : '<img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "mDataProp": 'MakerNameEn',
                        "bSearchable": true,
                        "bSortable": true,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل للسيارة" href="pay/' + oObj["CarID"] + 'InvoicePayAdd.aspx" >' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                        }
                    },
                    {
                        "mDataProp": "LotNo",
                        "bSearchable": true,
                        "bSortable": true
                    },
                    {
                        "mDataProp": "full_name", // client name.
                        "bSearchable": true,
                        "bSortable": true,
                        "mData": function (oObj) {
                            return '<a href="ClientCars.aspx?id=' + oObj['ClientID'] + '" title="سيارات العميل">' + oObj['full_name'] + '</a>';
                        }
                    },
                    {
                        "mDataProp": "DistinationNameAr",
                        "bSearchable": true,
                        "bSortable": true,
                        "mData": function (oObj) {
                            if (oObj["Arrived"])
                                return '<img src="/App_Themes/iraq/images/' + oObj["DistinationNameEn"] + '.jpg" width="25" /> ' + oObj["DistinationNameAr"];
                            else
                                return '<img src="/App_Themes/iraq/images/USA.jpg" width="25" /> أمريكا';
                        }
                    },
                    {
                        "mData": 'ReceiveWithPaper',
                        "sClass": "text-center",
                        "bSearchable": false,
                        "bSortable": false,
                        "mData": function () {
                            return 'غير مستلمة';
                        }
                    }
                ]
            });
            commonManger.searchData(oaTable);
        };
    return {
        Init: Init,
        errorCallBack: errorCallBack
    };
}();
CarsNotReceivedView.Init();