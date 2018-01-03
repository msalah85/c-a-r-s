var funName = 'SiteSearchProperties', mk1 = $('select[name="make"]'), mk2 = $('input[name="make"]'), mdl = $('select[name="model"]'), mdl2 = $('ul.models'), $carsFeatured = $('#vehicle-slider')
featuredCarBlock = '<li class="results-list-view">\
                                        <div class="result-item format-image">\
                                            <div class="result-item-image">\
                                                <a href="#featured">\
                                                    <img class="home-car-height" src="/public/cars/noimage.png" alt="عروض مميزة"></a>\
                                            </div>\
                                            <div class="result-item-in">\
                                                <h4 class="result-item-title"><a class="car-link" href="#"><span class="Year"></span>   <span class="CarType"></span><i class="fa fa-external-link"></i></a></h4>\
                                                <div class="result-item-cont">\
                                                    <div class="result-item-block col2">\
                                                        <div class="result-item-pricing">\
                                                            <div class="price">$0</div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div class="result-item-features">\
                                                    <div class="dealer-block-add">\
                                                        <span>رقم السيـارة: <strong class="car-info-theme CarID">---</strong></span>\
                                                        <span>رقم الشاصي: <strong class="car-info-theme ChassisNo">---</strong></span>\
                                                        <span>لـون السيــارة: <strong class="car-info-theme Color">---</strong></span>\
                                                        <span>رقــم اللـــــوت: <strong class="car-info-theme LotNo">---</strong></span>\
                                                        <span>حالة السيـارة: <strong class="car-info-theme Status">---</strong></span>\
                                                        <span>تاريخ الوصول: <strong class="car-info-theme ArrivalDate">---</strong></span>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </li>',
refreshSelect = function () {
    $('.selectpicker').selectpicker('refresh'); // apply select`s theme
},
disableControl = function (control, disable) {
    if (disable) {
        control.attr("disabled", "disabled"); //btn.attr("disabled", "disabled");
        mdl2.empty(); //.find('li:not(:first)').remove();
        control.empty().append('<option selected="selected" value="">جارى التحميل...</option>');
        refreshSelect();
    }
    else {
        control.removeAttr("disabled"); //btn.removeAttr("disabled");
    }
},
showPageData = function (data) {
    var xmlDoc = $.parseXML(data.d), // home news bar
     xml4 = $.xml2json(xmlDoc).list4, jsn3 = $.xml2json(xmlDoc).list3;

    if (xml4) {
        var $news = $('#home-news ul');
        $news.html('');
        $(xml4).each(function (i, item) {
            $news.append('<li class="item"><a>' + item.news_title + '</a></li>');
        }).promise().done(function () {
            IRAQCARS.modernTicker();
        });
    } else {
        $('#layosut1').addClass('hidden');
    }
    if (jsn3) {
        var _divID = 'features-cars';
        $(jsn3).each(function (i, item) {
            var _active = (i == 0 ? ' class="active"' : ''), _carModel = item.MakerNameEn + ' - ' + item.TypeNameEn + ' - ' + item.Year, _carUrl = 'car/' + item.CarID + '-' + item.MakerNameEn + '-' + item.TypeNameEn + '-' + item.Year;
            $('#' + _divID + ' ol.carousel-indicators').append('<li data-target="#' + _divID + '" data-slide-to="' + i + '" ' + _active + '></li>');
            $('#' + _divID + ' div.carousel-inner').append('<div class="item ' + _active + '"> <a href="' + _carUrl + '" class="fets-img-a"><img src="/public/cars/' + item.CarID + '/_thumb/' + item.MainPicture + '" class="fets-img" alt="' + _carModel + '" /></a><div class="carousel-caption"><h4 class="pull-right fets-car-title"><a href="' + _carUrl + '">' + _carModel + '</a></h4><div class="pull-left pricetxt">$' + numeral(item.WesitePrice).format('0,0') + '</div></div></div>');
        });
    }
    // search paramters
    var xml0 = $(xmlDoc).find("list");
    if (xml0.length > 0) { // color filter
        $(xml0).each(function (i, item) {
            $('select[name="color"]').append('<option value="' + $(item).find('ColorID').text() + '">' + $(item).find('ColorNameAr').text() + '</option>');
        });
    }
    var xml1 = $(xmlDoc).find("list1"); // makers filter
    if (xml1.length > 0) {
        $(xml1).each(function (i, item) {
            var nme = $(item).find('MakerNameEn').text(), vlue = $(item).find('MakerID').text();
            mk1.append('<option value="' + vlue + '">' + nme + '</option>');
            $('ul.makes').append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(item).find('CarsCount').text() + '</span><label><input type="radio" name="make" value="' + vlue + '"> ' + nme + '</label></li>')
        });
    }
    var xml2 = $(xmlDoc).find("list2"); // model filter
    if (xml2.length > 0) {
        $(xml2).each(function (i, item) {
            var nme = $(item).find('TypeNameEn').text(), vlue = $(item).find('ModelID').text();
            mdl.append('<option value="' + vlue + '">' + nme + '</option>');
            mdl2.append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(item).find('CarsCount').text() + '</span><label><input type="checkbox" name="model" value="' + vlue + '"> ' + nme + '</label></li>');
        });
    }
    var yer = new Date().getFullYear(); // years
    for (var i = yer ; i >= 2000; i--) {
        $('select[name="minyear"],select[name="maxyear"]').append('<option value="' + i + '">' + i + '</option>');
    }
    refreshSelect();
    if (window.location.href.indexOf('/search-cars') > 0)
        showSearchPrm(); // set seected paramters.
},
searchFormProp = function () {
    var url = sURL + "GetData";
    var dto = JSON.stringify({ "actionName": funName, "value": '' });
    dataService.callAjax('Post', dto, url, showPageData, errorException);
},
showSearchPrm = function () {
    var qs = getQueryStrs();
    for (var i = 0; i < qs.length; i++) {
        var itm = qs[i];
        $('#topSearch [name="' + itm + '"]').val(qs[itm]);
        $('#sideSearch [name="' + itm + '"]:not(:radio)').val(qs[itm]);
        $('#sideSearch :radio[name=' + itm + '][value=' + qs[itm] + ']').prop("checked", true); //.val([qs[itm]]);
    }
},
showModelData = function (data) {
    var xmlDoc = $.parseXML(data.d), xml = $(xmlDoc).find("list");
    mdl.html($("<option />", { value: '', text: 'عرض الكل' })); //mdl2.html(''); // reset lists.
    if (xml.length > 0) {
        $(xml).each(function (i, item) {
            var nme = $(item).find('TypeNameEn').text(), vlue = $(item).find('ModelID').text();
            mdl.append($("<option/>", { value: vlue, text: nme }));
            mdl2.append('<li><i class="fa fa-caret-left"></i> <span class="label label-success pull-left">' + $(item).find('CarsCount').text() + '</span><label><input type="checkbox" name="model" value="' + vlue + '"> ' + nme + '</label></li>')
        });
    }
    disableControl(mdl, false); // active
    refreshSelect();
},
getModels = function (value) {
    var url = sURL + "GetData", _funName = 'CarsModel_Make',
    dto = JSON.stringify({ "actionName": _funName, "value": value });
    dataService.callAjax('Post', dto, url, showModelData, errorException);
};
// page initialization
searchFormProp();
// filter models by selected maker.
mk1.change(function () {
    var $this = $(this), selectedVal = $this.val(); mk1.val(selectedVal);
    if (selectedVal != '') {
        disableControl(mdl, true); // disable
        getModels(selectedVal);
    }
});
$("ul.makes").on("click", 'input[name="make"]', function () {
    var $this = $(this), selectedVal = $this.val(); //mk2.val(selectedVal);
    if (selectedVal != '') {
        mdl2.empty();
        getModels(selectedVal);
    }
});
$('select[name="minyear"]').change(function () {
    $('select[name="maxyear"]').val($(this).val()).selectpicker('refresh');
});