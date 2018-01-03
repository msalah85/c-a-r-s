var sURL = '/api/data.aspx/',
bindReportData = function (data) {
    // today
    $('.current-date').html(moment().format('DD/MM/YYYY'));
    // commissions
    var jsn = commonManger.comp2json(data.d), json = jsn.list, json1 = $.xml2json(xml).list1;
    if (json1) {

        $('.client').html(json1.full_name);
        $('.client-phone').html(json1.phone);
        $('.clientCasheComm').html(numeral(json1.ExtraCredit).format('0,0'));

        var list1 = $.grep(json, function (v, i) {
            return i < 120;
        });

        $(list1).each(function (i, d) {
            $('#cities-list').append('<div class="span3">$' + numeral(d.RegionCommissionJor).format('0,0') + '<span class="pull-left  margin-left">' + (d.RegionEn.length > 19 ? d.RegionEn.substring(0,19) : d.RegionEn) + '</span></div>');
        });

        var list2 = $.grep(json, function (v, i) {
            return i >= 120;
        });
        $(list2).each(function (i, d) {
            $('#cities-list2').append('<div class="span3">$' + numeral(d.RegionCommissionJor).format('0,0') + '<span class="pull-left  margin-left">' + (d.RegionEn.length > 19 ? d.RegionEn.substring(0, 19) : d.RegionEn) + '</span></div>');
        });

    } else {
        $('body').addClass('fade-inv');
    }
},
getReportData = function (funName) {
    var names = ['id'], values = [id], // client, distination (iraq =3)
    dto = { 'actionName': funName, 'names': names, 'values': values };
    dataService.callAjax('Post', JSON.stringify(dto), sURL + 'GetDataList', bindReportData, commonManger.errorException);
};
// Initialization.
id = urlManager.getUrlVars()['id'];
getReportData("ContractJor_Cities");
