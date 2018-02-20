/*!Developer: eng.msalah.abdullah@gmail.com, www.share-web-design.com*/
//#region iraq-home-cars
var pageIndex = 1, pageCount = 0, prm = [], vl = [], sort = 0, dir = 'desc', $carsHome = $('#cars-search-result'), $loader = $(".loadmoree"), $maker = $('#carMakerFilter'),
    //  data-interval="4000" data-ride="carousel"
    carBlock = '<div class="item-car-box col-lg-4 col-md-6 col-xs-12 animated fadeInUp">\
                        <div class="carousel slide items-cars-slider" id="car-box">\
                            <ol class="carousel-indicators">\
                                <li data-target="#car-box" data-slide-to="0"></li>\
                            </ol>\
                            <div class="carousel-inner" role="listbox">\
                                <div class="item active">\
                                    <a href="javascript:void(0);" class="itemm-img-a">\
                                        <img src="/public/cars/noimage.gif" class="itemm-img" alt="car"></a>\
                                </div>\
                            </div>\
                            <a class="left carousel-control" href="#car-box" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">السابق</span> </a><a class="right carousel-control" href="#car-box" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">التالي</span> </a>\
                        </div>\
                        <ul class="item-car-ul">\
                            <li>\
                                <h2 class="item-car-title"><span class="Year" title="سنة الصنع"></span> <a data-toggle="tooltip" href="#car-details" class="CarType"></a></h2>\
                            </li>\
                            <li class="pricetxt" title="سعر السيارة">$0</li>\
                            <li>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم السيـارة: </div>\
                                    <div class="label-desc CarID"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم اللـــــــوت: </div>\
                                    <div class="label-desc LotNo"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">رقـم الشاصي: </div>\
                                    <div class="label-desc ChassisNo" data-toggle="tooltip"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">لـون الســـيارة: </div>\
                                    <div class="label-desc Color"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">حـالة السيــارة: </div>\
                                    <div class="label-desc Status"></div>\
                                </div>\
                                <div class="car-desc-list">\
                                    <div class="label-titlee">وصول السيارة:</div>\
                                    <div class="label-desc ArrivalDate"></div>\
                                </div>\
                            </li>\
                            <li><a class="btn btn-default call-btn car-detls pull-left" data-toggle="tooltip" role="button"><span class="glyphicon glyphicon glyphicon-menu-left"></span> التفاصيل</a></li>\
                        </ul>\
                    </div>',//methods
    scrollToCars = function () {
        $('html,body').animate({ scrollTop: $("#cars-type-filter").offset().top - 27 }, 'slow');
    },
    //region home cars
    OnSuccess = function (data) {
        var cdata = LZString.decompressFromUTF16(data.d), xml = $.parseXML(cdata), carslist = $.xml2json(xml).list, jsnCount = $.xml2json(xml).PageCount, carImages = $.xml2json(xml).list1;
        pageCount = parseInt(jsnCount.PageCount);
        $(carslist).each(function (i, item) {
            var carblk = $(carBlock).clone(true), carId = item.CarID, boxID = 'slides_car_' + carId;
            $(".CarID", carblk).html(carId);
            if (item.OwnerID === 2) { // سيارة عميل
                $("ul.item-car-ul", carblk).addClass('car-client');
                $(".CarID", carblk).append(' <i class="fa fa-info-circle fa-2x" data-toggle="tooltip" title="هذه السيارة معروضه لعميل شركة العراق"></i>');
            }
            $(".items-cars-slider", carblk).attr('id', boxID).children('.carousel-control').attr('href', '#' + boxID);
            // imgs
            $(".ChassisNo", carblk).html(item.ChassisNo).attr('title', item.ChassisNo);
            $(".LotNo", carblk).html(item.LotNo);
            $(".Year", carblk).html(item.Year);
            $(".Status", carblk).html(item.WorkingStatusName);
            var url = '/car/' + carId + '-' + item.MakerNameEn + '-' + item.TypeNameEn + '-' + item.Year, title = item.MakerNameEn + ' - ' + item.TypeNameEn;
            url = url.replace(/[_\W]+/g, "-");
            $(".CarType", carblk).html('<i class="fa fa-external-link fa-small"></i> ' + title).attr('href', url).attr('title', title);
            $(".car-detls", carblk).attr('href', url);
            $(".Color", carblk).html(item.ColorNameAr);
            $(".pricetxt", carblk).html(numeral(item.WesitePrice).format('0,0') + ' $');
            if (item.ArrivalDate)
                //if (moment().diff(item.ArrivalDate, 'days') > 0) // today > arriveDate
                $(".ArrivalDate", carblk).html('واصــــــلة');
            else
                $(".ArrivalDate", carblk).html(item.ArrivalDate);

            $(".contact-phone", carblk).html(item.phone).attr('title', item.OwnerName);
            $(".car-detls", carblk).attr('title', title);
            $carsHome.animate({ opacity: 1 }).append(carblk);

            // bind car images
            if (carImages) {
                // filter images
                var _carImages = $.grep(carImages, function (v, i) {
                    return v.CarID == carId;
                });
                GetImages2(carId, _carImages, item.MainPicture); // car images
            }

        }).promise().done(function () { // fire sorting & filter
            IRAQCARS.toolTip();
            // page info
            if (pageCount > 1)
                $('#back-to-top span').text(pageIndex - 1 + '/' + pageCount);
            else
                $('#back-to-top span').text('');
            // show empty message
            if ($carsHome.is(':empty')) {
                $carsHome.append('<li class="col-md-12 col-sm-12 scroll_effect animated fadeInUp"><div class="alert alert-warning fade in"><a class="close" data-dismiss="alert" href="#remove">×</a> <strong>عفواً!</strong> ' + messagesAr.noDataFound + '</div></li>');
            }
            // hide loading
            $(".waiting").hide();
            $loader.hide();

            //apply view type
            var savedViewType = $.cookie("homeview");
            savedViewType = (savedViewType !== undefined && savedViewType !== null) ? savedViewType : false;
            gridListViewHome(savedViewType);

        });
        $loader.hide();
        $(".waiting").hide();
    },
    GetRecords = function () {
        if (pageIndex == 1 || pageIndex <= pageCount) {
            var _url = sURL + "GetCarsList", data = { 'param': prm, 'values': vl };
            $loader.show(); $(".waiting").fadeIn();
            dataService.callAjax('Post', JSON.stringify(data), _url, OnSuccess, errorException);
        }
        pageIndex++;
    },
    startGetResult = function (sorting, direction) {
        sort = sorting; dir = direction;
        pageIndex = 1; pageCount = 0;
        $carsHome.empty(); // reset
        if (prm.indexOf('sort') == -1) {
            prm.push('sort', 'dir');
            vl.push(sort, dir);
        } else {
            vl[prm.indexOf('sort')] = sort;
            vl[prm.indexOf('dir')] = dir;
        }
    };
homeCarsFilter = function (typ) {
    $carsHome.empty(); pageIndex = 1; // reset
    // prepare paramters
    prm = ['PageIndex', 'PageSize', 'type'], vl = [pageIndex, 6, '0'];
    if (typ == 1) { // search by type
        _type = $('#cars-type-filter a.filtericon-sole-active').attr('data-value');
        vl[2] = _type;
    }
    else if (typ == 2) { // search by maker
        prm.push('make');
        var mk = getNumbersFromString($maker.val()); // get only numbers
        mk = (mk == 0 ? '' : mk);
        vl.push(mk);
    }
    else if (typ == 3) { // fast search
        var sp = getFieldsValues('search-fast');
        prm.push.apply(prm, sp[0]);
        vl.push.apply(vl, sp[1]);
    }
    else if (typ == 4) { // fast search car no
        var sp = getFieldsValues('search-no');
        prm.push.apply(prm, sp[0]);
        vl.push.apply(vl, sp[1]);
    }
    else if (typ == 6) { // search car by make
        prm.push('make', 'model');
        var mdlVal = $('.models :checkbox:checked').map(function () { return this.value; }).get().join(','), mker = $('.makes input[name="make"]:checked').val();
        if (mker === undefined || mker === '' || mker === '0')
            mker = null;
        vl.push(mker, mdlVal);
    }
    GetRecords(); // get cars
},
    //endregion
    //region car images
    OnImagesSuccess = function (data, cid, mainPic) {
        var imgID = '#slides_car_' + cid, $img = $(imgID);
        if (data.length > 0) // reset gallery
            $img.children('.carousel-inner').html(''); $img.children('.carousel-indicators').html('');
        $(data).each(function (i, item) {
            var pointer = '<li data-target="' + imgID + '" data-slide-to="' + i + '" class="' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"></li>';
            //var img = '<div class="item' + (i == 0 ? ' active' : '') + '"><a href="/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';
            var img = '<div class="item' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"><a href="/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';
            $img.children('div.carousel-inner').append(img); $img.children('ol.carousel-indicators').append(pointer);
            $img.find('a[href="#carousel-id"]').attr('href', imgID);
        }).promise().done(function () { // fire sorting & filter
            //$('a.right[data-slide="next"]').trigger('click');
            IRAQCARS.PrettyPhoto();
            // hide loading
            $(".waiting").hide();
            $loader.hide();
        });
    },

    GetImages2 = function (cid, pics, mainPic) {
        var imgID = '#slides_car_' + cid, $img = $(imgID);
        if (pics.length > 0) {
            $img.find('.carousel-inner').html(''); $img.find('.carousel-indicators').html('');
            $(pics).each(function (i, value) {
                var item = value.URL, pointer = '<li data-target="' + imgID + '" data-slide-to="' + i + '" class="' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"></li>',
                    img = '<div class="item' + (((mainPic !== null && mainPic !== '' && item == mainPic) || (mainPic == null && i == 0)) ? ' active' : '') + '"><a href="/public/cars/' + cid + '/' + item + '" data-rel="prettyPhoto[car_' + cid + ']" class="itemm-img-a"><img src="/public/cars/' + cid + '/_thumb/' + item + '" class="itemm-img" alt=""></a></div>';
                $img.children('div.carousel-inner').append(img); $img.children('ol.carousel-indicators').append(pointer);
                $img.find('a[href="#carousel-id"]').attr('href', imgID);

            }).promise().done(function () {
                //$('a.right[data-slide="next"]').trigger('click');
                IRAQCARS.PrettyPhoto();
                // hide loading
                $(".waiting").hide();
                $loader.hide();
            });
        }
    },
    GetImages = function (id, mainPicture) {
        var _url = sURL + "ShowCarImages", data = { 'id': id };
        dataService.callAjax('Post', JSON.stringify(data), _url, success = function (data) { OnImagesSuccess(data.d, id, mainPicture) }, errorException);
    };
//endregion
// initialize data & event.
$(function () {
    // filter by type.
    $('#cars-type-filter a.type').on("click", function (e) {
        //e.preventDefault();
        $('#cars-type-filter a.type').removeClass('filtericon-sole-active'); $(this).addClass('filtericon-sole-active'); // assign active        
    });
    // fats search.
    $('.btnSearchFast').on("click", function (e) {
        e.preventDefault();
        homeCarsFilter(3);
        scrollToCars();
    });
    // fats search car no.
    $('.btnSearchNo').on("click", function (e) {
        e.preventDefault();
        homeCarsFilter(4);
    });
    // serach cars by checked make from side bar
    $(".makes").on("click", 'input[name="make"]', function () {
        var mker = $(this).val();
        $maker.val(mker);
        homeCarsFilter(2);
    });
    $(".models").on("click", 'input[name="model"]', function () {
        homeCarsFilter(6);
    });
    // get more by scroll    
    $(window).scroll(function () {
        if ($('.waiting').is(':visible')) {
            $(".waiting").hide();
        }
        // fill by scroll window
        if (($(window).scrollTop() == $(document).height() - $(window).height()) && $(".item-car-box").length > 0 && pageIndex <= pageCount) {
            vl[0] = pageIndex;
            GetRecords();
        }
    });
    // sort result
    $('.results-sorter ul li a').click(function (e) {
        e.preventDefault();
        // get new sorting option
        var $this = $(this), sort = $this.data('id'), dir = $this.data('sort');
        // clear existing data
        startGetResult(sort, dir);
        // show selected text
        var sortText = $this.html();
        $('.listing-sort-btn').html(sortText);
        // show selected item style
        $this.closest('ul').find('li').removeClass('active');
        $this.closest('li').addClass('active');
    });
    // filter by makers in carousel
    $(window).hashchange(function (e) {
        e.preventDefault();
        var hash = location.hash; hash = hash.replace(/^#/, '');
        if (hash.indexOf('ake=') > 0) {
            var mker = getHashQueryStrs()['make']; mker = getNumbersFromString(mker);
            $maker.val(mker); scrollToCars(); homeCarsFilter(2);
        }
        else if (hash.indexOf('ype=') > 0) {
            $carsHome.empty(); scrollToCars();
            homeCarsFilter(1);
        }
        return false;
    });
});
homeCarsFilter(0);
jQuery(document).ready(function ($) {
    carousel = $('#carousel').carousel({
        width: 100,
        height: 350,
        itemWidth: 190,
        horizontalRadius: 430,
        verticalRadius: 120,
        scaleRatio: 0.4,
        mouseScroll: false, scrollOnClick: true, mouseDrag: true, autoScroll: true,
        scaleRatio: 0.6, scrollbar: false, tooltip: true, linkTarget: "_self",
        resize: true,
        mouseWheel: true,
        mouseWheelReverse: true
    });
    $('#carousel').removeClass('hide');
});
//#endregion