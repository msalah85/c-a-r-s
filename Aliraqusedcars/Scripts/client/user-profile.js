var
    onSuccessProfile = function (response) {
        var jsnData = comp2json(response.d), item = jsnData.list;

        // bind data
        $("#ClientID").val(item.ClientID);
        $("#user_name").val(item.user_name);
        $("#full_name").val(item.full_name);
        $("#phone").val(item.phone);
        $("#phone2").val(item.phone2);
        $("#email").val(item.email);
        $("#country").val(item.country);
        $("#countryCode").val(item.countryCode);
        $("#countryCode2").val(item.countryCode2);
    },
    getProfile = function () {
        dataService.callAjax('Post', {}, sURL + 'GetProfile', onSuccessProfile, errorException);
    },
    profileSaved = function (data) {
        data = data.d;
        if (data.Status) {
            showMessageAlert('success', messagesAr.doneTitle, messagesAr.saveSuccess);
        } else {
            showMessageAlert('danger', messagesAr.errorTitle, messagesAr.saveError);
        }
    },
    saveProfile = function () {
        // data 4 update
        var dta = returnFieldsValues('client-profile'), actionName = 'Clients_Save', cid = dta[1][0];

        // custom validation
        if (cid != '') {
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
var form = $('#client-profile'); form.validate({
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
$('#client-profile').submit(function (e) {
    e.preventDefault();
    if (form.valid()) { // start save data
        saveProfile();
    }
    else {
        showMessageAlert('', messagesAr.requiredTitle, messagesAr.required);
    }
});
