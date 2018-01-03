var fastClientAddManager = function () {
    var pageElements = {
        clintId: $('#ddlClient'),
        cName: $('#txtName'),
        cSave: $('#btnSaveClient'),
        countryCode: $('#countryCode'),
        phone: $('#txtPhone'),
        Notes: $('#Notes')
    },
    generateId = function () {
        var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    successSaveClient = function (d) {
        d = d.d;
        commonManger.showMessage('تمت عملية الإضافه بنجاح.', d.Message); // save alert
        if (d.Status) {
            $('#ClientModal').modal('hide');
            //select current added client
            pageElements.clintId.append($('<option/>').text(pageElements.cName.val()).val(d.Id));
            pageElements.clintId.val(d.Id);
            pageElements.clintId.trigger('chosen:updated');
        }
    },
    Init = function () {
        pageElements.cSave.click(function (e) {
            e.preventDefault();
            var scParam = {
                ClientID: 0,
                full_name: pageElements.cName.val(),
                phone: pageElements.phone.val(),
                countryCode: pageElements.countryCode.val(),
                user_name: generateId(),
                user_password: generateId(),
                user_type: 2,
                send_sms: false,
                Notes: pageElements.Notes
            }, form = 'formMain', url = 'Clients.aspx/SaveClient', DTO = { 'scParam': scParam };
            if (pageElements.cName.val() !== '') {
                commonManger.doWork('ClientModal', form, url, DTO, successSaveClient, commonManger.errorException);
            }
        });
    };
    return {
        Init: Init
    };
}();
fastClientAddManager.Init();