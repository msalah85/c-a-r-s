var CarsWaitedshipReportPrint = function () {
    var oTable = "";
    var idUpdatevalue = "";
    var
        Init = function () {
            var arraydatepost = $.cookie('ReportInfo').split(',');
            $('#shipperId').val(arraydatepost[0]);
            var DTO = { 'ShipCompanyID': $('#shipperId').val() };
            dataService.callAjax('Post', JSON.stringify(DTO), 'rpt/CarsWaitedshipReportPrint.aspx/GetData',
              function (data) {
                  if (data.d.FormulaValues[0] != "") {
                      $('#ShipCompanyIDIDtr').removeClass('hide');
                      $('#ShipCompanyID').text(arraydatepost[1]);
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
                paging: false
            });
            var valuesids = [];
            var Elements = [];
            valuesids.push('CarID', 'LotNo', 'ChassisNo', 'InvoiceDate', 'DistinationNameEn', 'ShipCompanyNameEn', 'CarTitleAmrica');;
            $.each(gridData, function (index, Basicdata) {
                for (var i = 0; i < valuesids.length; i++) {
                    if (valuesids[i] == 'CarTitleAmrica' && Basicdata[valuesids[i]]) // checked flag
                        Elements.push('<td><input type="checkbox" class="title" style="opacity:1;" checked /></td>');
                    else if (valuesids[i] == 'CarTitleAmrica') // none checked flag
                        Elements.push('<td><input type="checkbox" class="title" style="opacity:1;" /></td>');
                    else
                        Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                }
                Elements.push('<td><input type="checkbox" class="select" style="opacity:1;" /></td>'); // Select to container
                oTable.row.add(Elements).draw(false);
                Elements = [];
            });

            // set grid events
            $("#listItems tbody").delegate("tr :checkbox", "change", function (e) {
                e.preventDefault();
                var self = $(this);
                var pos = self.closest('tr').index();
                if (pos != null) {
                    if (self.hasClass('title')) {
                        var cid = self.closest('tr').find('td:eq(0)').text();
                        var ctitle = self.is(':checked') ? true : false;
                        ////////// start save car title/////////////////////////
                        ParamValues = [cid, ctitle];
                        ParamNames = ["CarID", "CarTitleAmrica"];
                        var url = "/api/general.aspx/saveDefaultData",
                        DTO = { 'values': ParamValues, 'actionName': "CarsData_SetTitle", 'Parm_names': ParamNames };
                        var dto = JSON.stringify(DTO);
                        dataService.callAjax('Post', dto, url,
                           function (data) {
                               if (data.d.Status)
                                   commonManger.showMessage('تم الحفظ بنجاح', 'تم حفظ ورق (تايتل - Title) السيارة بنجاح.');
                           },
                           commonManger.errorException);
                        /////////////////////////////////////////////////////
                    }
                    else if (self.hasClass('select')) {
                        var cChecked = self.is(':checked') ? true : false;
                        var cid = self.closest('tr').find('td:eq(0)').text();
                        ////////// start save car bol/////////////////////////
                        ParamValues = [cid, $('#shipperId').val(), cChecked];
                        ParamNames = ["CarID", "ShipperID", "add"];
                        var url = "/api/general.aspx/saveDefaultData",
                        DTO = { 'values': ParamValues, 'actionName': "ShippInvoicesDetails_AutoSave", 'Parm_names': ParamNames };
                        var dto = JSON.stringify(DTO);
                        dataService.callAjax('Post', dto, url,
                           function (data) {
                               if (data.d.Status)
                                   commonManger.showMessage('تم اختيار السيارة', 'تم اختيار السيارة لحجزها فى الحاوية.');
                           },
                           commonManger.errorException);
                        /////////////////////////////////////////////////////
                        if ($('.select:checked').is(':checked'))
                            $('a.btn').removeClass('hidden');
                        else
                            $('a.btn').addClass('hidden');
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();
// initialize.
CarsWaitedshipReportPrint.Init();