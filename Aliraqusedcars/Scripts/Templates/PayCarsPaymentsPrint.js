var PayCarsPaymentsPrint = function () {
    var oTable = "",
    idUpdatevalue = "",
    Init = function () {
        var arraydatepost = $.cookie('ReportInfo').split(',');
        var PaymentFlag = "0";
        if (arraydatepost[3] == "false") {
            PaymentFlag = "0";
            $('.TitleValue').text('كشف بالسيارات الغير مدفوعة');

        } else {
            PaymentFlag = "1";
            $('.TitleValue').text('كشف بالسيارات المدفوعة');
        }
        var DTO = { 'AuctionID': arraydatepost[0], 'fromdate': arraydatepost[1], 'todate': arraydatepost[2], 'PaymentFlag': PaymentFlag };
        dataService.callAjax('Post', JSON.stringify(DTO), 'rpt/PayCarsPaymentsPrint.aspx/GetData',
          function (data) {
              if (data.d.FormulaValues[0] != "") {
                  $('#AuctionIDtr').removeClass('hide');
                  $('#AuctionID').text(arraydatepost[4]);
              }
              if (data.d.FormulaValues[1] != "") {
                  $('#FromDatetr').removeClass('hide');
                  $('#FromDate').text(data.d.FormulaValues[1]);
              }
              if (data.d.FormulaValues[2] != "") {
                  $('#ToDatetr').removeClass('hide');
                  $('#ToDate').text(data.d.FormulaValues[2]);
              }
              var selectList = JSON.parse(data.d.serializdata);
              fillitemsDataTable(selectList);
          }, function (jqXhr, textStatus, errorThrown) {
              error(jqXhr, textStatus, errorThrown);
          });
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
            var valuesids = [];
            var Elements = [];
            valuesids.push('LotNo', 'MakerNameAr', 'TypeNameAr', 'ColorNameAr', 'PayPrice');;
            $.each(gridData, function (index, Basicdata) {
                if (Basicdata.tbl_name == "150") {
                    for (var i = 0; i < valuesids.length; i++) {
                        Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                    }
                    oTable.row.add(Elements).draw(false);
                    Elements = [];
                }
            });
            var valuet = 0;
            $('#listItems tbody').find('tr').find('td:nth-child(5)').each(function () {
                valuet += parseFloat($(this).text());
                $('#Total').val(value = valuet);
            });
        };
    return {
        Init: Init
    };
}();