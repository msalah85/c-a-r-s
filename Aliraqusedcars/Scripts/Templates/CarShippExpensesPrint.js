var CarShippExpensesPrint = function () {
    var oTable = "", idUpdatevalue = "";
    var
        Init = function () {
            var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                $('.linkList').attr('href', 'CarShippExpenses.aspx?id=' + urlIds);
                idUpdatevalue = urlIds;
                setDataToControlandGrid(urlIds);
                $('#CarID').text(urlIds);
                $('#CarID').text(urlIds);
            }
            else {
                setDataToControlandGrid("");
            }
        },
        bindClientInfo = function (info) {
            if (info.length) {
                $('#Client').html('<a href="ClientCars.aspx?id=' + info[0].ClientID + '">' + info[0].full_name + '</a>');
                $('.ID').text(idUpdatevalue);
                $('#Model').text(info[0].model);
            }
        },
       setDataToControlandGrid = function (pkvalue) {
           var functionName = "CarShippExpenses_PropertiesDetails", DTO = { 'actionName': functionName, 'value': pkvalue };
           dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
             function (data) {
                 var arr = JSON.parse(data.d);
                 var list = $.grep(arr, function (a) {
                     return a.tbl_name == 150;
                 });
                 fillitemsDataTable(list);
                 // report header
                 var info = $.grep(arr, function (a) {
                     return a.tbl_name == 0;
                 });
                 bindClientInfo(info);
             }, commonManger.errorException);
       },
        fillitemsDataTable = function (gridData) {
            oTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                bDestroy: true,
                bLengthChange: false,
                bFilter: false,
                searching: false,
                paging: false
            });
            var valuesids = [], Elements = [];
            valuesids.push('CarShippExpenseTypeName', 'ExpenseDate', 'ExpenseCost', 'ExpenseDetails');;
            $.each(gridData, function (i, Basicdata) {
                for (var i = 0; i < valuesids.length; i++) {
                    Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                }
                oTable.row.add(Elements).draw(false);
                Elements = [];
            });
        };
    return {
        Init: Init
    };
}();