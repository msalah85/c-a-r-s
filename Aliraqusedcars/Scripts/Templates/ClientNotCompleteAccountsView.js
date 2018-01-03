var CarsReceivedWithoutView = function () {
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
                "sAjaxSource": "/api/general.aspx/LoadData?funName=Clients_CompleteAmountsList",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        fnCallback(data.d);
                    }, errorCallBack);
                },
                "iDisplayLength": 50,
                "aaSorting": [[0, 'desc']],
                "aoColumns": [
                    {
                        "mDataProp": "full_name", // client name.
                        "bSearchable": true,
                        "bSortable": true,
                        "mData": function (oObj) {
                            return '<a href="ClientCars.aspx?id=' + oObj['ClientID'] + '" title="سيارات العميل">' + oObj['full_name'] + '</a>';
                        }
                    },
                    {
                        "mDataProp": "ClientBalance",
                        "bSearchable": true,
                        "bSortable": false
                    },
                    {
                        "mData": 'ClientRequired',
                        "sClass": "text-center",
                        "bSearchable": false,
                        "bSortable": false
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
CarsReceivedWithoutView.Init();