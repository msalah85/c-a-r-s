var
    _id = commonManger.getQueryStrs()['id'], gridId = 'listItems',
    oTable = $('#' + gridId).DataTable({
        "sDom": "<'row'>t<'row'>", searching: false, retrieve: true, paging: false, destroy: true, sort: false, "rowsGroup": [2, 3, 4]
    }),
    bindmyData = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

        if (jsn) {
            $('#NoCars').text(jsn.NoCars);
            $('#NoCustoms').text(jsn.NoCustoms);
            $('#Revised').html(jsn.Revised ? '<i class="icon-ok green"></i>' : '<i class="icon-remove red"></i>');
            $('#DateFrom').text(jsn.DateFrom.slice(0, 10));
            $('#DateTo').text(jsn.DateTo.slice(0, 10));
            $('.TotalAmount').text(numeral(jsn.TotalAmount).format('0,0.00'));
            $('.RealAmount').text(numeral(jsn.RealAmount).format('0,0.00'));
        }
        if (jsn1) {
            $(jsn1).each(function (i, item) {
                var __list = []; // handle data for grid
                __list.push(item.MakerNameEn + ' - ' + item.TypeNameEn + ' - ' + item.Year, numeral(item.CustomsOnCar).format('0,0.00'), item.CustomsNo, item.CustomsDate.slice(0, 10), numeral(item.GroupTotalAmount).format('0,0.00'));
                var rowNode = oTable.row.add(__list).draw(false).node();
                $(rowNode).children(':eq(2)').addClass('v-middle'); $(rowNode).children(':eq(3)').addClass('v-middle'); $(rowNode).children(':eq(4)').addClass('v-middle');
                if (item.Active !== 'true') {
                    $(rowNode).children(':eq(0)').addClass('line-thro'); $(rowNode).children(':eq(1)').addClass('line-thro');
                }
            });
        }
    },
    getSalaryFile = function () {
        $('#ExportID').text(_id);
        if (_id !== undefined && _id > 0) {
            var functionName = "ReExportInvoices_GetDetails", dto = { 'actionName': functionName, 'value': _id };
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindmyData, commonManger.errorException);
        }
    };

getSalaryFile();