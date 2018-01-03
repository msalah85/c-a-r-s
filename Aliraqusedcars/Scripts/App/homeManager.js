$(function () {
    // Portlets (boxes)
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

// search all
var searchForm = function (formId) {
    var searchKey = $('#' + formId + ' input.span12').val();
    if (searchKey != '')
        window.location.href = formId + '.aspx?key=' + searchKey;
    else
        commonManger.showMessage('حقل مطلوب:', 'برجاء ادخال كلمة البحث.');
};
// search boxes
$('form button.btn-success').click(function (e) {
    e.preventDefault();
    var formID = $(this).closest('form').attr('id');
    searchForm(formID);
});