// search all
var searchfieldset = function (fieldsetId) {
    var searchKey = $('#' + fieldsetId + ' input.span12').val(),
        searchID = $('#' + fieldsetId + ' input[type=radio]:checked').val();
    if (searchKey != '')
        // search receipt voucher then show in details.
        if (fieldsetId === 'receiptvoucherprint')
            window.location.href = fieldsetId + '.aspx?id=' + searchKey;
            // search car id or car lotno then show it direct in details page.
        else if (fieldsetId === 'SearchCars' && (searchID === 'CarID' || searchID === 'LotNo')) {
            window.location.href = 'CarDetailsPrint.aspx?' + (searchID === 'LotNo' ? 'lot' : 'id') + '=' + searchKey;
        }
        else
            window.location.href = fieldsetId + '.aspx?kid=' + searchID + '&key=' + searchKey;
    else {
        commonManger.showMessage('حقل مطلوب:', 'برجاء ادخال كلمة البحث.');
        $('#' + fieldsetId + ' input.span12').focus();
    }
};
$(function () { // Portlets (boxes)
    $('.widget-container-span').sortable({
        connectWith: '.widget-container-span',
        items: '> .widget-box',
        opacity: 0.8,
        revert: true,
        forceHelperSize: true,
        placeholder: 'widget-placeholder',
        forcePlaceholderSize: true,
        tolerance: 'pointer'
    });
});
// search boxes
$('fieldset button.btn-success').click(function (e) {
    e.preventDefault();
    var fieldsetID = $(this).closest('fieldset').attr('id');
    searchfieldset(fieldsetID);
});
$('input[type=text]').bind('click,change', function (e) {
    e.preventDefault();
    var fieldsetID = $(this).closest('fieldset').attr('id');
    searchfieldset(fieldsetID);
});
$('input[type=text]').on('keydown', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        var fieldsetID = $(this).closest('fieldset').attr('id');
        searchfieldset(fieldsetID);
    }
});