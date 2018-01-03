
var _id = commonManger.getQueryStrs()['id'], gridId = 'listItems',
oTable = $('#' + gridId).DataTable({
    "sDom": "<'row'>t<'row'>", searching: false, retrieve: true, paging: false, destroy: true, sort: false
}),
bindmyData = function (data) {
    var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1, totalBefore = 0, ttal = 0;

    if (jsn1 !== undefined) {
        $(jsn1).each(function (i, item) {
            var __list = []; // handle data for grid
            __list.push(item.UserFullName, numeral(item.DefaultSalary).format('0,0'), numeral(item.SalaryIncrease).format('0,0'), numeral(item.Housing).format('0,0'),
                numeral(item.Travel).format('0,0'), numeral(item.Perks).format('0,0'), numeral(item.Other).format('0,0'), numeral(item.TotalSum).format('0,0'), numeral(item.Deduct).format('0,0'),
                numeral(item.RepayAmount).format('0,0'), numeral(item.Total).format('0,0'), ''); //, item.Notes
            oTable.row.add(__list).draw(false);
            ttal += parseFloat(item.Total);
            totalBefore += parseFloat(item.TotalSum);
        });

        $('#totalSum').text(numeral(totalBefore).format('0,0'));
        $('#TotalAmount').text(numeral(ttal).format('0,0'));
    }


    if (jsn !== undefined) {
        $('#AddDate').val(commonManger.formatJSONDateCal(jsn.AddDate));
        $('#CheckNo').val(jsn.CheckNo);
        $('#Year').text(jsn.Year);
        $('#Month').text(jsn.Month);
        $('#Commission').text(numeral(jsn.Commission).format('0,0'));
        $('#NetAmount').text(numeral(jsn.TotalAmount).format('0,0'));
    }
},
getSalaryFile = function () {
    $('#divNo').text(_id);
    if (_id !== undefined && _id > 0) {
        var functionName = "Salaries_GetDetails", dto = { 'actionName': functionName, 'value': _id };
        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindmyData, commonManger.errorException);
    }
};
getSalaryFile();