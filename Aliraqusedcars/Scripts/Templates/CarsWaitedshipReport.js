var CarsWaitedshipReport = function () {
    var
        Init = function () {
            $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' });
            var functionName = "CarsWaitedshipReport_Properties";
            var DTO = { 'actionName': functionName, 'value': "" };
            dataService.callAjax('Post', JSON.stringify(DTO), '/api/general.aspx/GetData',
              function (data) {
                  var selectList = JSON.parse(data.d);
                  $.each(selectList, function (index, Basicdata) {
                      if (Basicdata.tbl_name == 0) {
                          $('#ShipCompanyID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                      }
                  });
                  $('#ShipCompanyID').chosen().trigger('chosen:updated').trigger("liszt:updated");
              }, function (jqXhr, textStatus, errorThrown) {
                  error(jqXhr, textStatus, errorThrown);
              });
            $('#PrintAll').on('click', function () {
                var arraydata = [];
                arraydata.push($('#ShipCompanyID').val(), $('#ShipCompanyID option:selected').text());
                $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' });
                window.open("rpt/CarsWaitedshipReportPrint.aspx", "_self");
            });
        }
    return {
        Init: Init
    };
}();