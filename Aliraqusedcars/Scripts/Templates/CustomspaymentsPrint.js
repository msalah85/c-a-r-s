var CustomspaymentsPrint = function () {
    var oTable = "",
        idUpdatevalue = "",
        Init = function () {
            var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                idUpdatevalue = urlIds;
                setDataToControlandGrid("masterForm", urlIds, "1");
                $('#PaymentsIdH').text(urlIds);
                $('#PaymentsId').text(urlIds);
            }
            else {
                setDataToControlandGrid("masterForm", "", "1");
                $('#PaymentsId').val(value = '0');
            }
        },
       setDataToControlandGrid = function (formName, pkvalue, flag) {
           var functionName = "CustomsPaymentsMaster_Print";
           DTO = { 'actionName': functionName, 'value': pkvalue };
           dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
             function (data) {
                 var selectList = JSON.parse(data.d);

                 $.each(selectList, function (index, Basicdata) {
                     if (Basicdata.tbl_name == "150")
                         commonManger.getDataForUpdate(Basicdata, "masterForm");
                 });

                 // عرض تفاصيل سند الصرف
                 $('#CheckNo').html(function () { return '<a href="ReceiptPaymentsPrint.aspx?id=' + $(this).text() + '">' + $(this).text() + '</a>' });

                 fillitemsDataTable(selectList);
             }, commonManger.errorException);

       },
        fillitemsDataTable = function (gridData) {
            oTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                bDestroy: true,
                bLengthChange: false,
                bFilter: false,
                searching: false,
                //retrieve: true,
                paging: false
            });

            var valuesids = ['InvoiceNo', 'ContainerNo', 'InvoiceDate', 'Amount', 'AmountDh'];
            $.each(gridData, function (index, Basicdata) {
                if (Basicdata.tbl_name == "160") {
                    var Elements = ['<td>' + (index) + '</td>'];
                    for (var i = 0; i < valuesids.length; i++) {
                        Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                    }
                    oTable.row.add(Elements).draw(false);
                }
            });
        };
    return {
        Init: Init
    };
}();