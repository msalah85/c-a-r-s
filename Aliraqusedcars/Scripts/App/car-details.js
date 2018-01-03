CarShippExpensesPrint.Init();
var __id = $('#divCarID').text();


$('#CarID').val(__id);
$('#lnkEdit').attr('href', 'pay/' + __id + '/InvoicePayAdd.aspx');
$('#lnkPicture').attr('href', 'images.aspx?id=' + __id);
$('#lnkShopExpenses').attr('href', 'CarShopExpenses.aspx?out=1&id=' + __id);
$('#lnkShippExpenses').attr('href', 'CarShippExpenses.aspx?id=' + __id);
$('#ShareCar').attr('href', '/share-car.aspx?carid=' + __id);


if (!$('#divIMagesList').is(':empty'))
    $('#downloadAllPictures').attr('href', '/DownloadCarImages.aspx?id=' + __id);
else
    $('#downloadAllPictures').addClass('hidden');


$('#lnkCarNotes').click(function (e) {
    e.preventDefault();

    var carTitle = $('h2.car-model').text(),
        title = "التعليقات على السيارة: " + carTitle, modalDialog = "commentsModal"; //, id = $('#CarID').text();

    commonManger.showPopUpDialog(title, '', modalDialog);

    //$('#CarID').val(id);
    $('#UserID').val(1);
    $('#car-comments-div').load('america/carcomments.html?carid=' + __id);
});


$(document).on('click', 'a.ShareCar', function (e) {
    e.preventDefault();

    newwindow = window.open($(this).attr('href'), 'Share Car', 'height=700,width=525');
    if (window.focus) { newwindow.focus() }

    return false;
});


$(function () {
    var colorbox_params = {
        reposition: true,
        scalePhotos: true,
        scrolling: false,
        previous: '<i class="icon-arrow-left"></i>',
        next: '<i class="icon-arrow-right"></i>',
        close: '&times;',
        current: '{current} من {total}',
        maxWidth: '100%',
        maxHeight: '100%',
        onOpen: function () {
            document.body.style.overflow = 'hidden';
        },
        onClosed: function () {
            document.body.style.overflow = 'auto';
        },
        onComplete: function () {
            $.colorbox.resize();
        },
        rel: 'group1',
        
        minWidth: 800,
        minHeight: 600
    };

    $('[data-rel="colorbox"]').colorbox(colorbox_params);
    $("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");
});