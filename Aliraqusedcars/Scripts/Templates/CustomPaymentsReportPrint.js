var CustomPaymentsReportPrint = function () {
    var oTable = "",
        idUpdatevalue = "",
        Init = function () {
            var arraydatepost = $.cookie("ReportInfo").split(','), PaymentFlag = arraydatepost[3];

            if (arraydatepost[3] == "0" || arraydatepost[3] == "false") {
                PaymentFlag = "0";
                $('.TitleValue').text('عرض كشف فواتير التخليص الجمركى الغير مدفوعة');
            } else {
                PaymentFlag = "1";
                $('.TitleValue').text('عرض كشف فواتير التخليص الجمركى المدفوعة');
            }

            var DTO = { 'CustomsCompanyID': arraydatepost[0], 'fromdate': arraydatepost[1], 'todate': arraydatepost[2], 'PaymentFlag': PaymentFlag };
            dataService.callAjax('Post', JSON.stringify(DTO), 'rpt/CustomPaymentsReportPrint.aspx/GetData',
              function (data) {
                  if (data.d.FormulaValues[0] != "") {
                      $('#CustomsCompanyIDIDtr').removeClass('hide');
                      $('#CustomsCompanyID').text(arraydatepost[4]);
                  }
                  if (data.d.FormulaValues[1] != "" && data.d.FormulaValues[2] != "") {
                      $('#FromToDatetr').removeClass('hide');
                      $('#FromDate').text(data.d.FormulaValues[1]);
                      $('#ToDate').text(data.d.FormulaValues[2]);
                  }
                  var selectList = JSON.parse(data.d.serializdata);
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

            var valuesids = [], Elements = [];

            valuesids.push('CustomsPrice', 'CustomsCompanyNameAr', 'ContainerNo', 'InvoiceDate', 'InvoiceNo');;
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
            $('#listItems tbody').find('tr').find('td:nth-child(1)').each(function () {
                valuet += parseFloat($(this).text());
                $('#Total').val(value = valuet);
            });
        };
    return {
        Init: Init
    };
}();