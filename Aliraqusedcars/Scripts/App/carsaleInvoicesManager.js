
var
    pageManager = function () {

        var
            init = function () {
                // show/hide signature box.
                var qs = commonManger.getUrlVars(),
                    sigId = qs.sig;


                showHideSig(sigId);

                getCarExtraDiscounts();

                pageEvents();
            },
            getCarExtraDiscounts = function () {
                var carID = $('span[id$=CarID] a').text();

                console.log(carID);

                if (carID && carID !== '') {

                    var dto = { actionName: 'CarSaleInvoices_GetDiscountsExtras', value: carID };
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindExtraOutData, commonManger.errorException);

                }
            },
            bindExtraOutData = function (data) {
                var dt = commonManger.comp2json(data.d), jsn = dt.list, jsn1 = dt.list1,

                    carTotal = numeral().unformat($('span[id$=divPrice]').text()) * 1;

                console.log(dt);

                // extra
                if (jsn) {
                    var rows = $(jsn).map(function (i, v) {
                        carTotal += (v.ExtraAmount * 1);
                        return '<tr><td>' + numeral(v.ExtraAmount).format('0,0') + '</td><td>' + v.Notes + '</td></tr>';
                    }).get();
                    $('table.extra-list tbody').append(rows).closest('div.extra-div').removeClass('hidden');
                } else {
                    $('div.extra-div').remove();
                }

                // discounts
                if (jsn1) {
                    var rows = $(jsn1).map(function (i, v) {
                        carTotal -= (v.DiscountAmount * 1);
                        return '<tr><td>' + numeral(v.DiscountAmount).format('0,0') + '</td><td>' + v.Notes + '</td></tr>';
                    }).get();
                    $('table.disc-list tbody').append(rows).closest('div.disc-div').removeClass('hidden');
                } else {
                    $('div.disc-div').remove();
                }

                var vatDollar = numeral().unformat($('span[id$=VAT]').text());
                carTotal += (vatDollar * 1);


                // car total after extra and discounts
                $('.carTotal').text(numeral(carTotal).format('0,0'))
            },


            showHideSig = function (sigId) {
                if (sigId && sigId !== '') {
                    $('.hidden,#sig').removeClass('hidden');
                } else { $('#client-signature').addClass('hidden'); }
            },
            pageEvents = function () {
                $('#sig').signature({ color: '#145394' });
                $('#clear').click(function () { $('#sig').signature('clear'); });
                $('#SaveSignature').click(function (e) {
                    e.preventDefault();
                    saveSignature();
                });
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
                $('#SaveSignature,#clear').addClass('hidden');
            },


            sigSaved = function (data) {
                data = data.d;
                if (data.Status) {
                    $('#sig').signature('disable');
                    commonManger.showMessage('تم الحفظ', data.message);
                } else {
                    commonManger.showMessage('خطأ أثناء تنفيذ الإجراء', data.message);
                }
            },


            saveSignature = function () { // save signature
                var obj = {
                    ID: $('td[id$=divInvoiceNo]').text(),
                    Picture: $('#sig').signature('toSVG'),
                    actionName: 'CarSaleInvoices_ClientSignature'
                },
                    dto = { 'actionName': obj.actionName, 'names': ['ID', 'Sig'], 'values': [obj.ID, obj.Picture] };
                if (obj.ID && obj.Picture !== '') {
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', sigSaved, commonManger.errorException);
                } else {
                    commonManger.showMessage('بيانات مطلوبة', 'يرجي التأكد من توقيع العميل اولا.');
                }
            };


        return {
            Init: init
        };

    }();

pageManager.Init();