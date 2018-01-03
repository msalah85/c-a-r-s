// page load animation
$(".animsition").animsition({
    inClass: 'fade-in-up-lg',
    outClass: 'fade-out-left-sm',
    inDuration: 700,
    outDuration: 700,
    linkElement: 'a[href]:not([target="_blank"]):not([href*="#"]):not([href*="javascript"]):not([href*="return"]):not([href*="mailto"]):not([href*="@"])',
    loading: true,
    loadingParentElement: '#main-content',
    loadingClass: 'animsition-loading',
    unSupportCss: ['animation-duration', '-webkit-animation-duration', '-o-animation-duration'],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: '#main-content'
});

// fast search
$('.stickyFooter form').submit(function (e) {
    e.preventDefault();
    var obj = {
        lotno: $(this).find('input:eq(1)').val(),
        carno: $(this).find('input:eq(2)').val(),
        action: $(this).attr('action') + '?',
        receipt: $('#search-receipt-id').val()
    }

    if (obj.receipt !== '') { // Receipt voucher search
        window.location.href = 'receiptvoucherprint.aspx?id=' + obj.receipt;
    }
    else { // search car
        if (obj.lotno.trim() !== '') {
            obj.action += 'lot=' + obj.lotno;
            window.location.href = obj.action;
        }
        else if (obj.carno.trim() !== '') {
            obj.action += 'id=' + obj.carno;
            window.location.href = obj.action;
        }
    }
});

// get notifications list
$(document).on('click', "li.noti-li a[data-type]", function () {
    var
        _this = $(this), // a element
        _notificationType = _this.data('type'), // notification type (0, warning), (1, danger)
        parentNode = _this.closest('li.noti-li.open'), // li container element
        succCall = function (data) {
            var dAll = commonManger.comp2json(data.d),
                jsn = dAll.list,
                htmlEl = '';
            
            // notifications list in li
            $(jsn).each(function (i, v) {
                htmlEl += '<li><a href="' + v.NotURL + '"><div class="clearfix"><span class="pull-right">' + v.NotTitle + ' </span><span class="pull-left badge-red">' + v.Counts + '</span></div></a></li>';
            });

            // bind & view li list
            htmlEl = htmlEl != '' ? htmlEl + '<li></li>' : '<li>لا توجد تنبيهات لديك الآن.</li>';
            parentNode.find('ul.noti-list').append(htmlEl);
            
        },
        dta = { actionName: 'MasterNotifications', value: _notificationType },
        existsNotiList = parentNode.find('ul.noti-list li').size();
    
    if (existsNotiList === 1) // count only 1.
        dataService.callAjax("POST", JSON.stringify(dta), sUrl + 'GetData', succCall, commonManger.errorException);

});

// user skin (style)
var _skin = $.cookie("AlIraq.Skin"); applySkin(_skin);
setNavigation();
activateDelSection();