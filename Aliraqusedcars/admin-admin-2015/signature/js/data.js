// current date
var $CarPaperTypeID = $('#CarPaperTypeID'), today = $.datepicker.formatDate('m/d/yy', new Date()),
    print_today = function () {
        $('.today').html(today);
        $('#contr-desc').val(function () {
            return $(this).val().replace('__/__/____', today);
        });
        return today;
    },
    renderSVG = function (svg, width, height) {
        document.createElement('canvas')
        var c = document.createElement('canvas');
        c.width = width || 500;
        c.height = height || 500;
        document.getElementById('sig').innerHTML = '';
        document.getElementById('sig').appendChild(c);
        if (typeof FlashCanvas != "undefined") {
            FlashCanvas.initElement(c);
        }
        canvg(c, svg, {
            log: true, renderCallback: function (dom) {
                if (typeof FlashCanvas != "undefined") {
                    document.getElementById('sig').innerHTML = 'svg not supported';
                } else {
                    var svg = (new XMLSerializer()).serializeToString(dom);
                    document.getElementById('sig').innerHTML = svg;
                }
            }
        });
    },
sURL = '/api/data.aspx/',
showPageData = function (data) {
    var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2;

    if (jsn) {
        $('.client:eq(0)').html('<a title="حساب العميل" href="../clientcars.aspx?id=' + jsn.ClientID + '">' + jsn.full_name + '</a>');
        $('.client:eq(1)').val(jsn.full_name);
        $('#model').html('<a title="تفاصيل السيارة" href="../CarDetailsPrint.aspx?id=' + jsn.CarID + '">' + jsn.MakerNameEn + ' - ' + jsn.TypeNameEn + ' - ' + jsn.Year + '</a>');
        $('#chassis').html(jsn.ChassisNo);
        $('#lotno').html(jsn.LotNo);
        $('#cid').html('<a title="تفاصيل السيارة" href="../CarDetailsPrint.aspx?id=' + jsn.CarID + '">' + jsn.CarID + '</a>');
        $('#color').html(jsn.ColorNameAr);
        $('#contr-desc').val(function () {
            return $(this).val().replace('00.00', numeral(jsn.SalePrice).format('0,0'));
        });
        if ($('#SigTypeID').val() === '2') { // format of type==> 2 signature.
            $('#header').html('إيصال إستلام VCC');
            $('#contr-desc').val(function () {
                return $(this).val().replace('الاوراق الاصلية مع', '');
            });
        }
    }

    if (jsn1) { // get ast signature
        $('#CarPaperTypeID').val(jsn1.CarPaperTypeID).change();
        $('#InsuranceAmount').val(jsn1.InsuranceAmount);
        $('#Shipper').val(jsn1.Shipper);
        $('#header').text(jsn1.Subject);
        $('#SigID').val(jsn1.ID);
        $('#contr-desc').val(jsn1.Description);
        $('#Recipient').val(jsn1.Recipient);
        $('.today').val(jsn1.AddDate);
        $('#Recipient').val(jsn1.Recipient);
        $('#sig').html(jsn1.Picture);
        //renderSVG(jsn1.Picture, 786, 200); //$('textarea').prop('disabled', true);
        printMode();
    }

    if (jsn2) {
        $('#Active').prop('checked', jsn2.Active);
        $('#CustomsNo').val(jsn2.CustomsNo);
        var date = $.datepicker.formatDate('m/d/yy', new Date(jsn2.CustomsDate))
        $('#CustomsDate').val(date);

        if (jsn2.Active) {
            $('.reexport-table').removeClass('hidden-print');
        }
    }

    // vcc show
    if ($('#SigTypeID').val() === '2') {
        $('#CarPaperTypeID').remove();
        var vccDesc = 'أقر أنا الموقع أدناه بأنى استلمت البطاقة الجمركية للسيارة المدرجه أوصافها أعلاه من شركة العراق لتجارة السيارات المستعملة ذ.م.م بغرض فحص السيارة.';
        $('#contr-desc').val(vccDesc);
        $('.reexport-table').addClass('hidden');

        $('.vcc').remove();
        $('.paper').attr('href', 'signature.aspx?id=' + $('#SaleInvoiceID').val() + '&type=1');
    } else { // paper
        $('.paper').remove();
        $('.vcc').attr('href', 'signature.aspx?id=' + $('#SaleInvoiceID').val() + '&type=2');
    }
},
printMode = function () {
    $('#clear,#svg,#fullcs,#CarPaperTypeID').remove();
    $('textarea').attr('disabled', true);
},
getcarDetails = function () { // get car info
    var qs = commonManger.getUrlVars(), cID = qs['id'], type = qs['type'], url = sURL + "GetDataList",
    dto = JSON.stringify({ "actionName": "CarSaleInvoices_SelectContract", 'names': ['id', 'type'], "values": [cID != undefined ? cID : 0, (type != undefined ? type : 0)] });
    $('#SaleInvoiceID').val(cID); $('#SigTypeID').val(type);
    dataService.callAjax('Post', dto, url, showPageData, commonManger.errorException);
},
sigSaved = function (data) {
    data = data.d;
    if (data.Status) {
        $('#sig').signature('disable');
        if ($('#Active').is(':checked')) {
            $('.reexport-table').removeClass('hidden-print');
        }
        printMode();
        commonManger.showMessage('تم الحفظ', data.message);
    } else {
        commonManger.showMessage('خطأ أثناء تنفيذ الإجراء', data.message);
    }
},
saveSignature = function () { // save signature
    var obj = {
        ID: $('#SigID').val(),
        SigTypeID: $('#SigTypeID').val(),
        CarID: $('#cid').text(),
        Recipient: $('#Recipient').val(),
        ContractDesc: $('#contr-desc').val(),
        AddDate: $('.today').text(),
        Picture: $('#sig').signature('toSVG'),
        actionName: 'CarSaleInvoiceSignatures_Save',
        Active: $('#Active').is(':checked'),
        CustNo: $('#CustomsNo').val(),
        CustDate: $('#CustomsDate').val(),

        CarPaperTypeID: $CarPaperTypeID.val(),
        Shipper: $('#Shipper').val(),
        InsuranceAmount: $('#InsuranceAmount').val(),
        Subject: $('#header').text(),
        SaleInvoiceID: $('#SaleInvoiceID').val()
    },
    dto = { 'actionName': obj.actionName, 'names': ['ID', 'SigTypeID', 'CarID', 'AddDate', 'Recipient', 'Description', 'Picture', 'Active', 'CustomsNo', 'CustomsDate', 'CarPaperTypeID', 'Subject', 'InsuranceAmount', 'SaleInvoiceID', 'Shipper'], 'values': [obj.ID, obj.SigTypeID, obj.CarID, obj.AddDate, obj.Recipient, obj.ContractDesc, obj.Picture, obj.Active, obj.CustNo, obj.CustDate, obj.CarPaperTypeID, obj.Subject, obj.InsuranceAmount, obj.SaleInvoiceID, obj.Shipper] };

    if ((obj.Active && obj.CustDate !== '' && obj.CustNo !== '') || !obj.Active) {
        dataService.callAjax('Post', JSON.stringify(dto), sURL + 'saveData', sigSaved, commonManger.errorException);
    } else {
        commonManger.showMessage('بيانات مطلوبة', 'يرجي التأكد من ادخال رقم وتاريخ البيان الجمركي.');
    }
},
ActiveMe = function (isActive) {
    if (isActive) {
        $(".reexport-table input[type=text]").attr('disabled', false);
    } else {
        $(".reexport-table input[type=text]").attr('disabled', true);
    }
},
setPaperDescription = function (typeID) {
    // addtional data required
    $('.shipper').addClass('hidden').find('textarea').val(''); // reset
    $('#contr-desc').val('');

    if (typeID === '3') {
        $('.shipper').removeClass('hidden');
    } else if (typeID === '4') {
        window.location.href = 'signature.aspx?id=' + $('#SaleInvoiceID').val() + '&type=2';
    }

    // dscription form
    var obj = {
        uaeForm: 'أقر أنا الموقع ادناه بأنى استلمت البطاقة الجمركية مع الرخصه التجارية للسيارة المدرجة أوصافها أعلاه من شركة العراق لتجارة السيارات المستعملة بعقد بيع رقم/000  بتاريخ: __/__/____\n\
ولأجله وقعت.',
        gulfForm: 'أقر أنا الموقع ادناه بأنى استلمت البطاقة الجمركية مع البيان الجمركى مع الرخصه التجارية للسيارة المدرجة أوصافها أعلاه  من شركة العراق لتجارة السيارات المستعملة بعقد بيع رقم/000  بتاريخ: __/__/____\n\
ولأجله وقعت.',
        insuranceForm: 'أقر أنا الموقع ادناه بأنى استلمت البطاقة الجمركية مع البيان الجمركى مع شهادة خروج للسيارة المدرجة أوصافها أعلاه من شركة العراق لتجارة السيارات المستعملة،\n\
ولأجله وقعت.'
    };

    // from json to array
    obj = $.map(obj, function (el) { return el });

    // selected description
    var desc = obj[(typeID * 1) - 1];

    $('#contr-desc').val(function () {
        return desc.replace('__/__/____', today);
    });
};

print_today();
getcarDetails();

// events
$('#Active').click(function () {
    ActiveMe($(this).prop('checked'));
});
$('#sig').signature({ color: '#145394' });
$('#clear').click(function () { $('#sig').signature('clear'); });
$('#svg').click(function () { saveSignature(); });
$('#fullcs').click(function () { $('.kbw-signature').toggleClass('fullscreen'); $('.btn-group').toggleClass('group-right'); });
$("#CustomsDate").datepicker({ dateFormat: 'm/d/yy' });
$CarPaperTypeID.change(function () {
    setPaperDescription($(this).val());
});