var vl = 0, showPageData = function (data) {
    var xmlDoc = $.parseXML(data.d), xml = $(xmlDoc).find("list"), jsnPictures = $.xml2json(xmlDoc).list1, navigationLinks = $.xml2json(xmlDoc).list2;
    if (xml.length > 0) {
        var title = $(xml).find('MakerNameEn').text() + ' ' + $(xml).find('TypeNameEn').text() + ' ' + $(xml).find('Year').text(), _carID = $(xml).find('CarID').text(), _carURL = 'https://www.iraqusedcars.ae/car/' + _carID;
        document.title = title + ' - $' + numeral($(xml).find("WesitePrice").text()).format('0,0') + ' - ' + document.title;
        // seo information
        $('meta[property="og\\:title"],meta[name="keywords"],meta[name="description"],meta[property="twitter\\:description"],meta[property="og\\:description"],meta[property="twitter\\:title"]\
link[rel="canonical"],meta[property="og\\:url"],meta[property="og\\:site_names"],meta[property="og\\:image"],meta[property="twitter\\:image\\:src"],\
link[rel="apple-touch-icon"]').remove();

        //var _header = $('head');
        //$('meta[property="og\\:title"],meta[name="description"],meta[property="twitter\\:description"],meta[property="og\\:description"],meta[property="twitter\\:title"]').attr('content', function () { return document.title; }).appendTo(_header);
        //$('meta[name=keywords]').attr('content', function () {
        //    return $(this).attr('content') + ',' + document.title.match(/[^ ,]+/g).join(',');
        //});
        //$('meta[property="og\\:url"]').attr('content', _carURL).appendTo(_header);
        //$('link[rel="canonical"]').attr('href', _carURL).appendTo(_header);
        //$('meta[property="og\\:site_names"],meta[property="og\\:image"],meta[property="twitter\\:image\\:src"]').attr('content', 'https://www.iraqusedcars.ae/content/cars/' + _carID + '/_thumb/' + $(xml).find('MainPicture').text()).appendTo(_header);

        $('head').append('<meta name="description" content="' + document.title + '." />\
                          <meta name="keywords" content="سيارات مستعملة، سكراب، قطع الغيار، سيارات جديدة، سيارات مصدومة، سيارات الخليج، الامارات العربية المتحدة، العراق، الأردن، السعودية، دبي، الشارقة,' + document.title.match(/[^ ,]+/g).join(',') + '" />\
                          <meta property="og:title" content="' + document.title + '" />\
                          <meta property="og:description" content="السيارات في الإمارات العربية المتحدة وشحن السيارات للعملاء فى العراق والأردن وعمان والسعودية ' + document.title + '." />\
                          <meta property="og:image" content="https://www.iraqusedcars.ae/public/cars/' + _carID + '/' + $(xml).find('MainPicture').text() + '" />\
                          <meta property="og:url" content="https://www.iraqusedcars.ae/car/' + _carID + '" />\
                          <link rel="canonical" href="https://www.iraqusedcars.ae/car/' + _carID + '" />');

        $('.page-title').append(title);
        $('.post-title').html(title);
        $('.price').html('$ ' + numeral($(xml).find("WesitePrice").text()).format('0,0'));
        $('._id').html($(xml).find('CarID').text());
        $('.mker').html($(xml).find('MakerNameEn').text());
        $('.model').html($(xml).find('TypeNameEn').text());
        $('.year').html($(xml).find('Year').text());
        $('.lotno').html($(xml).find('LotNo').text());
        $('.chassisno').html($(xml).find('ChassisNo').text());
        $('.maker').html($(xml).find('LotNo').text());
        $('.color').html($(xml).find('ColorNameAr').text());
        $('.transmi').html($(xml).find('TransmissionNameAr').text());
        $('.status').html($(xml).find('WorkingStatusName').text());
        $('.arrive-date').html($(xml).find('ArrivalDate').text());
        $('.notes').html($(xml).find('Notes').text());
        if ($(xml).find('full_name').text() != '') { // seller info
            $('.vehicle-enquiry-foot strong').html($(xml).find('phone').text());
            $('.vehicle-enquiry-foot a').html($(xml).find('full_name').text());
        }

        if ($(xml).find('OwnerID').text() === '2') { // client car
            $('ul.list-group').append('<li class="list-group-item"><span class="inf"><i class="fa fa-info-circle"></i></span> <b>سيارة عميل لدي شركة</b></li>\
                                        <li class="list-group-item"><span class="inf">للإتصال</span> <b>' + $(xml).find('phone').text() + '</b></li>');
        }



        //if ($(xml).find('MainPicture').text() != '') { // seller info
        //$('.featured-image a').attr('href', '/public/cars/' + $(xml).find('CarID').text() + '/' + $(xml).find('MainPicture').text());
        //$('.featured-image img').attr('src', '/public/cars/' + $(xml).find('CarID').text() + '/' + $(xml).find('MainPicture').text());
        //}
        // car images
        if (jsnPictures) {
            $('#divCarImages').html("");
            $(jsnPictures).each(function (i, item) {
                var path = '/public/cars/' + vl + '/' + item.URL;
                $('#divCarImages').append("<div data-p='144.50' style='display: none;'><img data-rel='prettyPhoto[gallery]' data-u='image' src='" + path + "' /><img data-u='thumb' src='" + path + "' /></div>");
            }).promise().done(function () {
                jssor_1_slider_init();// fire jssor
            });
        }
        // next , prev navigation.
        if (navigationLinks) {
            var mainNav = '/car/';
            if (navigationLinks.NextID && navigationLinks.NextID !== null)
                $('.nextCar').attr('href', mainNav + navigationLinks.NextID + '-details').removeClass('hidden');
            if (navigationLinks.PrevID && navigationLinks.PrevID !== null)
                $('.prevCar').attr('href', mainNav + navigationLinks.PrevID + '-details').removeClass('hidden');
        }
    }
    $('.sidebar-widget ul li b:empty').each(function (i, item) {
        $(item).html('---');
    });
},
getpageData = function (value) {
    var url = "/car-details.aspx/GetData", dto = JSON.stringify({ "actionName": "CarsData_SelectOne", "value": value });
    dataService.callAjax('Post', dto, url, showPageData, errorException);
}, // page initialization
loadPage = function () {
    vl = urlManager.getSelectedURLSegment(4); //the latest segment.    
    if (vl !== undefined && vl != null && vl != '') {
        vl = vl.slice(0, vl.indexOf('-'));
        getpageData(vl);
    }
},
friendSuccess = function (data) {
    data = data.d;
    $('#sendModal').modal("hide");
    $sendFriend.trigger("reset");
    showMessageAlert('success', 'تهانينا', messagesAr.sendRequestSuccess);
};
// fire loading data.
loadPage();
// users event
var $sendFriend = $('#send-friend'), $btnFriend = $sendFriend.find('input[type=submit]');
$sendFriend.validate({
    showErrors: function (errorMap, errorList) {
        // Clean up any tooltips for valid elements
        $.each(this.validElements(), function (index, element) {
            var $element = $(element);
            $element.data("title", "") // Clear the title - there is no error associated anymore
                .removeClass("error").tooltip("destroy");
        });
        // Create new tooltips for invalid elements
        $.each(errorList, function (index, error) {
            var $element = $(error.element);
            $element.tooltip("destroy") // Destroy any pre-existing tooltip so we can repopulate with new tooltip content
                .data("title", error.message).addClass("error").tooltip(); // Create a new tooltip based on the error messsage we just set in the title
        });
    },
});
$sendFriend.submit(function (e) {
    e.preventDefault();
    // check validate form
    if ($(this).valid()) {
        enableControl($btnFriend, false);
        var dta = returnFieldsValues('send-friend'), img = $('.featured-image img').attr('src'), cId = $('._id').text(), carName = $('.post-title').text();
        dta[1].push(cId, img, carName);
        if (dta.length > 0 && dta[0] !== "" && dta[1] !== "" && dta[2] !== "") {
            var url = sURL + "SendFriend";
            var dto = { 'values': dta[1] };
            dataService.callAjax('Post', JSON.stringify(dto), url, friendSuccess, errorException);
        }
        enableControl($btnFriend, true); // enable go on button
    }
});