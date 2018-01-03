var SoldCarsReportPrint = function () {
    var oTable = "";
    var idUpdatevalue = "";
    var
        Init = function () {
            var arraydatepost = $.cookie("ReportInfo").split(',');
            if (arraydatepost[4] == "1") {

                $('.TitleValue').text('عرض السيارات المباعة');
            } else {
                $('.TitleValue').text('عرض السيارات المتاحة');
            }
            var DTO = { 'ClientID': arraydatepost[0], 'fromdate': arraydatepost[1], 'todate': arraydatepost[2], 'PayFlag': arraydatepost[4] };
            dataService.callAjax('Post', JSON.stringify(DTO), 'rpt/SoldCarsReportPrint.aspx/GetData',
              function (data) {

                  if (data.d.FormulaValues[0] != "") {
                      $('#ClientIDIDtr').removeClass('hide');
                      $('#ClientID').text(arraydatepost[3]);
                  }
                  if (data.d.FormulaValues[1] != "") {
                      $('#FromToDatetr').removeClass('hide');
                      $('#FromDate').text(data.d.FormulaValues[1]);
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
            valuesids.push('CarID', 'TypeNameEn', 'LotNo', 'WorkingStatusName', 'WesitePrice', 'DistinationNameAr');;
            $.each(gridData, function (index, Basicdata) {
                for (var i = 0; i < valuesids.length; i++) {
                    Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                }
                oTable.row.add(Elements).draw(false);
                Elements = [];
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