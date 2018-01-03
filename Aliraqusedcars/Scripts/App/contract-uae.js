var sURL = '/api/data.aspx/',
bindReportData = function (data) {
    // today
    $('.current-date').html(moment().format('DD/MM/YYYY'));
    // commissions
    var cdata = LZString.decompressFromUTF16(data.d), xml = $.parseXML(cdata),
    json = $.xml2json(xml).list;
    if (json) {
        $('.client').html(json.full_name);
        $('.commissionCredit').html(numeral(json.CommissionCredit).format('0,0'));
        $('.commissionCash').html(numeral(json.CommissionCash).format('0,0'));
        $('.extraCredit').html(numeral(json.ExtraCredit).format('0,0'));
        $('.extraCash').html(numeral(json.ExtraCash).format('0,0'));
        $('.client-phone').text(json.phone);
        // credit list in table
        var index = 1, addedVal = parseFloat(json.CommissionCredit);
        for (var i = 10000; i < 25000; i += 5000) {
            addedVal += parseFloat(json.ExtraCredit);
            $('.commissionCredit' + index).html(numeral(addedVal).format('0,0'));
            index++;
        }
        //cash list
        index = 1, addedVal = parseFloat(json.CommissionCash);
        for (var i = 10000; i < 25000; i += 5000) {
            addedVal += parseFloat(json.ExtraCash);
            $('.commissionCash' + index).html(numeral(addedVal).format('0,0'));
            index++;
        }
    } else {
        $('body').addClass('fade');
    }
},
getReportData = function (funName) {
    var names = ['id1', 'id2'], values = [id, 1], // client, distination (iraq =1)
    dto = { 'actionName': funName, 'names': names, 'values': values };
    dataService.callAjax('Post', JSON.stringify(dto), sURL + 'GetDataList', bindReportData, commonManger.errorException);
};
// Initialization.
id = urlManager.getUrlVars()['id'];
getReportData("Contracts_Info");
