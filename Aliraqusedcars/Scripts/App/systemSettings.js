var
    Password = $('#Password'), ConvertAmount = $('#ConvertAmount'), Storage = $('#Storage'), LatePayment = $('#LatePayment'),
    CustomValue = $('#CustomValue'), Commission = $('#Commission'),


    bindData = function (d) {
        var jsnData = commonManger.comp2json(d.d), jsn = jsnData.list;
        if (jsn) {
            Storage.val(numeral(jsn.Storage).format('0.00'));
            LatePayment.val(numeral(jsn.LatePayment).format('0.00'));
            CustomValue.val(numeral(jsn.CustomValue).format('0.00'));
            Commission.val(numeral(jsn.Commission).format('0.00'));
            ConvertAmount.val(numeral(jsn.ConvertAmount).format('0.00'));

            //Password
            dataService.callAjax('Post', JSON.stringify({ 'value': jsn.Password }),
                sUrl + 'decryptPassword', function (d) { Password.val(d.d); }, commonManger.errorException);
        }
    },
    getData = function () {
        var DTO = { 'actionName': "SystemSettings_SelectRow", 'value': '' };
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData', bindData, commonManger.errorException);
    },
    saveData = function () {
        var isValid = commonManger.applyValidation('aspnetForm');
        var dto = {
            'actionName': 'SystemSettings_Update',
            'names': ['Password', 'LatePayment', 'CustomValue', 'Commission', 'Storage', 'ConvertAmount'],
            'values': [Password.val(), LatePayment.val(), CustomValue.val(), Commission.val(), Storage.val(), ConvertAmount.val()]
        };

        if (isValid) {
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData',
                commonManger.successSaved, commonManger.errorException);
        } else {
            commonManger.showMessage('بيانات مطلوبة', 'يرجي التأكد من ادخال رقم وتاريخ البيان الجمركي.');
        }
    };
// load data
getData();
$('#SaveAll').click(function (e) {
    e.preventDefault();
    saveData();
});