var SoldCarsReport = function () {

    var
        Init = function () {
            $.cookie('ReportInfo', null, { expires: -1, path: 'rpt' });
            $("#fromdate").val('');
            $("#todate").val('');
            var functionName = "SoldCarsReport_Properties";
            var DTO = { 'actionName': functionName, 'value': "" };
            dataService.callAjax('Post', JSON.stringify(DTO), '/api/general.aspx/GetData',
              function (data) {
                  var selectList = JSON.parse(data.d);
                  $.each(selectList, function (index, Basicdata) {
                      if (Basicdata.tbl_name == 0) {
                          $('#ClientID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                      }

                  });
                  $('#ClientID').chosen().trigger('chosen:updated').trigger("liszt:updated");
              }, function (jqXhr, textStatus, errorThrown) {
                  error(jqXhr, textStatus, errorThrown);
              });

            $('#PrintAll').on('click', function () {

                var arraydata = [];
                arraydata.push($('#ClientID').val(), $('#fromdate').val(), $('#todate').val(), $('#ClientID option:selected').text(), $("input:radio:checked").val());
                $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' });
                window.open("rpt/SoldCarsReportPrint.aspx", "_self");
            });
        }
    return {
        Init: Init
    };
}();