var PayCarsPaymentsReport = function () {
    var
        Init = function () {
            $.cookie('ReportInfo', null, { expires: -2, path: 'rpt' });
            $("#fromdate").val('');
            $("#todate").val('');
            var functionName = "PayCarsPaymentsReport_Properties";
            var DTO = { 'actionName': functionName, 'value': "" };
            dataService.callAjax('Post', JSON.stringify(DTO), '/api/general.aspx/GetData',
              function (data) {
                  var selectList = JSON.parse(data.d);
                  $('#BuyerID').chosen().trigger('chosen:updated').trigger("liszt:updated");
                  $.each(selectList, function (index, Basicdata) {
                      if (Basicdata.tbl_name == 0) {
                          $('#AuctionID').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                      }
                  });
                  $('#AuctionID').chosen().trigger('chosen:updated').trigger("liszt:updated");
              }, function (jqXhr, textStatus, errorThrown) {
                  error(jqXhr, textStatus, errorThrown);
              });
            $('#PrintAll').on('click', function () {
                var PaymentFlag;
                $('#PaymentFlag').prop('checked', function (i, value) { PaymentFlag = value });
                var arraydata = [];
                arraydata.push($('#AuctionID').val(), $('#fromdate').val(), $('#todate').val(), PaymentFlag, $('#AuctionID option:selected').text());
                $.cookie('ReportInfo', arraydata, { expires: 1, path: 'rpt' });
                window.open("rpt/PayCarsPaymentsPrint.aspx", "_self");
            });
        }
    return {
        Init: Init
    };
}();