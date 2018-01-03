var
    onSuccessProfile = function (data) {
        var jsnData = comp2json(data.d), item = jsnData.list
        // bind data
        $("#ClientID").val(item.ClientID);
    },
    getProfile = function () {
        dataService.callAjax('Post', {}, sURL + 'GetProfile', onSuccessProfile, errorException);
    },
    profileSaved = function (data) {
        data = data.d;
        if (data.Status) {
            showMessageAlert('success', messagesAr.doneTitle, messagesAr.saveSuccess);
        } else {
            showMessageAlert('danger', messagesAr.errorTitle, messagesAr.passWrongeOld);
        }
    },
    saveProfile = function () {
        $('.myMessage').html('');

        // data 4 update
        var dta = returnFieldsValues('client-PasswordChange'), actionName = 'Clients_ChangePassword', cid = dta[1][0], pass = dta[1][2], cPass = dta[1][3];

        // custom validation
        if (cid != '' && cPass != '' && pass != '') {

            if (pass.length < 6) { // password length should be 6 charachters
                showMessageAlert('', messagesAr.requiredTitle, messagesAr.passLengthRequired);
                return;
            }

            if (pass != cPass) { // confirm password
                showMessageAlert('', messagesAr.requiredTitle, messagesAr.passConfirmRequired);
                return;
            }

            var DTO = { 'actionName': actionName, 'names': dta[0], 'values': dta[1] };
            dataService.callAjax('Post', JSON.stringify(DTO), sURL + 'saveData', profileSaved, errorException);
        }
        else {
            showMessageAlert('', messagesAr.requiredTitle, messagesAr.required);
        }
    };

// initialize data.
getProfile();
// validate me
var form = $('#client-PasswordChange'); form.validate({
    showErrors: function (errorMap, errorList) {
        // Clean up any tooltips for valid elements
        $.each(this.validElements(), function (index, element) {
            var $element = $(element);
            $element.data("title", "") // Clear the title - there is no error associated anymore
                .removeClass("error")
                .tooltip("destroy");
        });
        // Create new tooltips for invalid elements
        $.each(errorList, function (index, error) {
            var $element = $(error.element);
            $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                .data("title", error.message)
                .addClass("error")
                .tooltip(); // Create a new tooltip based on the error messsage we just set in the title
        });
    },
});
$('#client-PasswordChange').submit(function (e) {
    e.preventDefault();
    if (form.valid()) { // start save data
        saveProfile();
    }
    else {
        showMessageAlert('', messagesAr.requiredTitle, messagesAr.required);
    }
});
