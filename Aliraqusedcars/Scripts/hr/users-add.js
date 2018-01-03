
var successCallback = function (d) {
    d = d.d;

    if (d.Status) {
        window.location.href = 'usersview.aspx';
    } else
        commonManger.showMessage('خطأ بالحفظ:', d.message);
},
        saveUser = function () {
            formName = 'addForm';
            var arrayall = commonManger.Returncontrolsval(formName), actionName = "Users_Save";
            DTO = { actionName: actionName, names: arrayall[0], values: arrayall[1] };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successCallback, commonManger.errorException);
        },
        sigSaved = function (data) {
            data = data.d;
            if (data.Status) {

                // view signature
                var sigSVG = $('#sig').signature('toSVG');
                //renderSVG(sigSVG, 100, 80, 'sigView');

                // hide modal & disable board
                //$('.add-sig').remove();
                $('#sig').signature('disable');
                $('.modal').modal('hide');

                commonManger.showMessage('تم الحفظ', data.message);
            } else {
                commonManger.showMessage('خطأ أثناء تنفيذ الإجراء', data.message);
            }
        },
    saveSignature = function () { // save signature
        var obj = {
            ID: $('#UserID').val(),
            Picture: $('#sig').signature('toSVG'),
            actionName: 'Users_Signature'
        },
        dto = { 'actionName': obj.actionName, 'names': ['ID', 'Sig'], 'values': [obj.ID, obj.Picture] };
        if (obj.ID && obj.Picture !== '') {
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', sigSaved, commonManger.errorException);
        } else {
            commonManger.showMessage('بيانات مطلوبة', 'يرجي التأكد من رسم التوقيع اولا.');
        }
    };

// signature board
$('#sig').signature({ color: '#145394' });
$('#clear').click(function () { $('#sig').signature('clear'); });
$('#SaveSignature').click(function (e) {
    e.preventDefault();
    saveSignature();
});

$('.btnSaveUser').click(function (e) {
    e.preventDefault();
    var isValid = commonManger.applyValidation('aspnetForm');
    if (isValid) {
        saveUser();
    }
});