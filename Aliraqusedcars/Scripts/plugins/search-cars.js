var pageIndex = 0, pageCount = 0, $carsHome = $('#results-holder'), $loader = $(".home-pager"), sort = 0, dir = 'asc', resultView,
carBlock = '<div class="result-item format-image slideRight">\
                                    <div class="result-item-image">\
                                        <div class="media-box">\
                                            <div class="flexslider flexslider-rtl galleryflex" data-autoplay="yes" data-pagination="yes" data-arrows="yes" data-style="slide" data-pause="yes">\
                                                <ul class="slides">\
                                                    <li class="item"><a href="/Content/images/cars/car%20(1).jpg" data-rel="prettyPhoto[car1]">\
                                                        <img src="/Content/images/cars/car%20(1).jpg" alt=""></a></li>\
                                                    <li class="item"><a href="/Content/images/cars/car%20(4).jpg" data-rel="prettyPhoto[car1]">\
                                                        <img src="/Content/images/cars/car%20(4).jpg" alt=""></a></li>\
                                                    <li class="item"><a href="/Content/images/cars/car%20(3).jpg" data-rel="prettyPhoto[car1]">\
                                                        <img src="/Content/images/cars/car%20(3).jpg" alt=""></a></li>\
                                                    <li class="item"><a href="/Content/images/cars/car%20(2).jpg" data-rel="prettyPhoto[car1]">\
                                                        <img src="/Content/images/cars/car%20(2).jpg" alt=""></a></li>\
                                                    <li class="item"><a href="/Content/images/cars/car%20(5).jpg" data-rel="prettyPhoto[car1]">\
                                                        <img src="/Content/images/cars/car%20(5).jpg" alt=""></a></li>\
                                                </ul>\
                                            </div>\
                                        </div>\
                                        <span class="label label-warning vehicle-age">سيارة الشركة</span>\
                                        <div class="result-item-view-buttons">\
                                            <a class="car-detls" href="#car-details"><i class="fa fa-arrow-left"></i>التفاصيل</a>\
                                            <a class="client-phone" href="#" data-toggle="tooltip" title="00971559857503"><i class="fa fa-phone"></i>عرض الهاتف</a>\
                                        </div>\
                                    </div>\
                                    <div class="result-item-in">\
                                        <h4 class="result-item-title"><a class="car-link" href="#/car-details"><span class="Year"></span>   <span class="car-ttle"></span><i class="fa fa-external-link"></i></a></h4>\
                                        <div class="result-item-cont">\
                                            <div class="result-item-block col2">\
                                                <div class="result-item-pricing">\
                                                    <div class="price">$00</div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        <div class="result-item-features">\
                                            <ul class="inline">\
                                                <li>رقم السيـارة: <span class="car-info-theme CarID">---</span></li>\
                                                <li>رقــم اللـــــوت: <span class="car-info-theme LotNo">---</span></li>\
                                                <li>رقم الشاصي: <span class="car-info-theme ChassisNo">---</span></li>\
                                                <li>لـون السيــارة: <span class="car-info-theme Color">---</span></li>\
                                                <li>حالة السيـارة: <span class="car-info-theme Status">---</span></li>\
                                                <li>تاريخ الوصول: <span class="car-info-theme ArrivalDate">---</span></li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>',
OnSuccess = function (response) {
    var xmlDoc = $.parseXML(response.d);
    var xml = $(xmlDoc);
    pageCount = parseInt(xml.find("PageCount").eq(0).find("PageCount").text());
    var carslist = xml.find("list");
    $carsHome.fadeIn(200);
    carslist.each(function (i, item) {
        var carblk = $(carBlock).clone(true);
        var carId = $(this).find("CarID").text();
        $(".slides", carblk).addClass('slides_car_' + carId);
        GetImages(carId); // car images
        $(".ChassisNo", carblk).html($(this).find('ChassisNo').text());
        $(".CarID", carblk).html($(this).find("CarID").text());
        $(".LotNo", carblk).html($(this).find("LotNo").text());
        $(".Year", carblk).html($(this).find("Year").text());
        $(".Status", carblk).html($(this).find("WorkingStatusName").text());
        $(".car-ttle", carblk).html($(this).find("MakerNameEn").text() + ' - ' + $(this).find("TypeNameEn").text());
        $(".car-link, .client-phone, .car-detls", carblk).attr('href', 'car/' + $(this).find("CarID").text() + '-' + $(this).find("MakerNameEn").text() + '-' + $(this).find("TypeNameEn").text() + '-' + $(this).find("Year").text());
        $(".Color", carblk).html($(this).find("ColorNameAr").text());
        $(".price", carblk).html('$' + $(this).find("WesitePrice").text());
        $(".ArrivalDate", carblk).html($(this).find("ArrivalDate").text());
        $(".vehicle-age", carblk).html($(this).find("OwnerName").text());
        //$(".premium-listing", carblk).html($(this).find("phone").text());
        $carsHome.append(carblk).slideDown('slow');
    }).promise().done(function () {
        // fire sorting & filter
        IRAQCARS.toolTip();
        //IRAQCARS.wowAnim();
        //IRAQCARS.PrettyPhoto();
        //IRAQCARS.galleryflex();
        // page info
        if (pageCount > 0)
            $('#back-to-top span').text(pageIndex + '/' + pageCount);
        else
            $('#back-to-top span').text('');
        // show empty message
        if ($carsHome.is(':empty')) {
            $carsHome.append('<li class="col-md-12 col-sm-12 scroll_effect fadeInUp"><div class="alert alert-warning fade in"> <a class="close" data-dismiss="alert" href="#">×</a> <strong>عفواً!</strong> ' + messagesAr.noDataFound + ' </div></li>');
        }
    });
    $loader.hide();
},
GetRecords = function () {
    pageIndex++;
    var qs = getQueryStrs(), prm = ['PageIndex', 'PageSize', 'sort', 'dir'], vl = [pageIndex, 3, sort, dir];
    for (var i = 0; i < qs.length; i++) {
        var itm = qs[i];
        prm.push(itm); // name
        vl.push(qs[itm]); // value
    }
    if (pageIndex == 1 || pageIndex <= pageCount) {
        var _url = sURL + "GetCarsList", data = { 'param': prm, 'values': vl };
        $loader.show();
        dataService.callAjax('Post', JSON.stringify(data), _url, OnSuccess, errorException);
    }
    // hide loading
    $(".waiting").hide();
},
OnImagesSuccess = function (data, cid) {
    var $img = $('ul.slides_car_' + cid);
    if (data.length > 0) // reset gallery
        $img.html('');
    $(data).each(function (i, item) {
        var img = '<li class="item"><a href="/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']"><img src="/public/cars/' + cid + '/' + item + '" alt=""></a></li>';
        $img.append(img);
    }).promise().done(function () { // fire sorting & filter
        IRAQCARS.PrettyPhoto();

        // apply flex on this car gallery
        var carouselInstance = $img.parent();
        var carouselAutoplay = carouselInstance.attr("data-autoplay") == 'yes' ? true : false
        var carouselPagination = carouselInstance.attr("data-pagination") == 'yes' ? true : false
        var carouselArrows = carouselInstance.attr("data-arrows") == 'yes' ? true : false
        var carouselDirection = carouselInstance.attr("data-direction") ? carouselInstance.attr("data-direction") : "horizontal"
        var carouselStyle = carouselInstance.attr("data-style") ? carouselInstance.attr("data-style") : "fade"
        var carouselSpeed = carouselInstance.attr("data-speed") ? carouselInstance.attr("data-speed") : "5000"
        var carouselPause = carouselInstance.attr("data-pause") == 'yes' ? true : false

        carouselInstance.flexslider({
            animation: carouselStyle,
            easing: "swing",
            direction: carouselDirection,
            slideshow: carouselAutoplay,
            slideshowSpeed: carouselSpeed,
            animationSpeed: 600,
            initDelay: 0,
            randomize: false,
            pauseOnHover: carouselPause,
            controlNav: carouselPagination,
            directionNav: carouselArrows,
            prevText: "",
            nextText: "", rtl: true
        });
    });
},
GetImages = function (id) {
    var _url = sURL + "ShowCarImages", data = { 'id': id };
    dataService.callAjax('Post', JSON.stringify(data), _url, success = function (data) { OnImagesSuccess(data.d, id) }, errorException);
},
stopshowingResult = function () {
    clearTimeout(resultView);
},
startGetResult = function (sorting, direction) {
    sort = sorting; dir = direction;
    pageIndex = 0; pageCount = 0;
    var resultView = setTimeout(function () {
        GetRecords(); // get data
    }, 700);
};
// initialize data & event.
GetRecords();
// events
$(function () {
    // get more by scroll
    $(window).scroll(function () {
        // fill by scroll window
        if (($(window).scrollTop() == $(document).height() - $(window).height()) && pageIndex <= pageCount) {
            $(".waiting").fadeIn(); // waiting
            GetRecords();
        }
    });
    // sort result
    $('.results-sorter ul li a').click(function (e) {
        e.preventDefault();
        $(".waiting").fadeIn();

        // get new sorting option
        var $this = $(this),
        sort = $this.data('id'),
        dir = $this.data('sort');

        // go to top
        $('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo');

        // clear existing data
        $('#results-holder').empty();
        startGetResult(sort, dir); stopshowingResult();

        // show selected text
        var sortText = $this.html();
        $('.listing-sort-btn').html(sortText);

        // show selected item style
        $this.closest('ul').find('li').removeClass('active');
        $this.closest('li').addClass('active');
    });

});

