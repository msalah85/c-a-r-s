var ExpensesOnCarReport = function () {
    var
        Init = function () {
            $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' });
            $("#fromdate").val('');
            $("#todate").val('');
            var functionName = "ExpensesOnCarReport_Properties";
            var DTO = { 'actionName': functionName, 'value': "" };
            dataService.callAjax('Post', JSON.stringify(DTO), '/api/general.aspx/GetData',
              function (data) {
                  var selectList = JSON.parse(data.d);
                  $.each(selectList, function (index, Basicdata) {
                      if (Basicdata.tbl_name == 0) {
                          $('#AuctionID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                      }
                  });
                  $('#AuctionID').chosen().trigger('chosen:updated').trigger("liszt:updated");
                  $.each(selectList, function (index, Basicdata) {
                      if (Basicdata.tbl_name == 1) {
                          $('#ClientID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                      }
                  });
                  $('#ClientID').chosen().trigger('chosen:updated').trigger("liszt:updated");
              }, function (jqXhr, textStatus, errorThrown) {
                  error(jqXhr, textStatus, errorThrown);
              });

            $('#PrintAll').on('click', function () {
                //$.cookie('ReportInfo', null, { path: '' });
                var arraydata = [];
                arraydata.push($('#AuctionID').val(), $('#ClientID').val(), $('#fromdate').val(), $('#todate').val(), $('#LotNo').val(), $('#ChassisNo').val(), $('#AuctionID option:selected').text(), $('#ClientID option:selected').text());
                $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' });
                window.open("rpt/ExpensesOnCarReportPrint.aspx", "_self");
            });
        }
    return {
        Init: Init
    };
}();