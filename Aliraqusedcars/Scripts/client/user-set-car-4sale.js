var
    showPageData = function (data) {
        var jsnData = comp2json(data.d), item = jsnData.list;
        
        if (item) {
            $('#Carmodel').val(item.MakerNameEn + ' ' + item.TypeNameEn + ' ' + item.Year);
            var _Id = item.CarID;
            $('#CarID').val(_Id);
            $('#WesitePrice').val(numeral(item.WesitePrice).format('0.0'));
            $('#ChassisNo').val(item.ChassisNo);
            $('#LotNo').val(item.LotNo);
            $('#CarColor').val(item.ColorNameAr);
            $('#CarStatus').val(item.WorkingStatusName);
            $('#Notes').val(item.Notes);
            var mainImg = item.MainPicture;
            if (mainImg !== '') {
                $('#main-image').attr('src', '//www.iraqusedcars.ae/public/cars/' + _Id + '/' + mainImg);
            }
            var aci = item.view_website;
            $(':radio[name=view_website][value=' + (aci != "" ? aci : "null") + ']').prop("checked", true);
        }
    },
    getpageData = function (value) {
        var url = sURL + "GetData",
            dto = JSON.stringify({ "actionName": "CarsData_Select4Client", "value": value });
        
        dataService.callAjax('Post', dto, url, showPageData, errorException);
    },
    loadPage = function () {
        var vl = urlManager.getUrlVars().id;

        if (vl)
            getpageData(vl);
    },
    PriceSaved = function (data) {
        data = data.d;
        if (data.Status) {

            var mesg = messagesAr.saveSuccess,
            viewSite = $(':radio[name=view_website]:checked').val();


            if (viewSite === 'null')
                mesg += messagesAr.saveViewWebsite;
            else if (viewSite === 'true') // post
                potingToSocial();


            showMessageAlert('success', messagesAr.doneTitle, mesg);
        } else {
            showMessageAlert('danger', messagesAr.errorTitle, messagesAr.saveError);
        }
    },
    savePrice = function () {
        // data 4 update
        var viewSite = $(':radio[name=view_website]:checked').val(),
            dta = [['Id', 'view_website', 'WesitePrice'], [$('#CarID').val(), (viewSite === 'null' ? null : viewSite), $('#WesitePrice').val()]], actionName = 'CarsData_SaveClientPrice',
            DTO = { 'actionName': actionName, 'names': dta[0], 'values': dta[1] };

        dataService.callAjax('Post', JSON.stringify(DTO), sURL + 'saveData', PriceSaved, errorException);
    },
    potingToSocial = function () {
        var data = {
            title: $('#Carmodel').val(),
            message: 'رقم السيارة: ' + $('#CarID').val() + '\r\nالموديل: ' + $('#Carmodel').val() + '\r\nالحالة: ' + $('#CarStatus').val() + '،\r\nالسعر: ' + $('#WesitePrice').val() + ' $',
            url: 'https://www.iraqusedcars.ae/car/' + $('#CarID').val() + '-' + $('#Carmodel').val().replace(' ', '-').replace(' ', '-').replace(' ', '-'),
            image: 'https:' + $('#main-image').attr('src'),
        },
        PostedSocial = function (d) {

        };

        dataService.callAjax('Post', JSON.stringify(data), '/api/social.aspx/postToAll', PostedSocial, errorException);

    };

// initialize data.
loadPage();

// validate me
var form = $('#car-Price'); form.validate({
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

$('#car-Price').submit(function (e) {
    e.preventDefault();
    if (form.valid()) { // start save data
        savePrice();
    }
    else {
        showMessageAlert('', messagesAr.requiredTitle, messagesAr.required);
    }
});