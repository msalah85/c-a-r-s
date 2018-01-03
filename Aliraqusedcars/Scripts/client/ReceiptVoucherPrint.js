var ClientsPaymentsPrint = function () {
    Init = function () {
        // get report details
        var urlIds = decodeURIComponent(getQueryStrs()["id"]);
        if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
            setDataToControlandGrid(urlIds);
        }

        // signature board
        $('#sig').signature({ color: '#145394' });
        $('#clear').click(function () { $('#sig').signature('clear'); });
        $('#SaveSignature').click(function (e) {
            e.preventDefault();
            saveSignature();
        });
    },
        comp2Json = function (compressedData) {
            var cdata = LZString.decompressFromUTF16(compressedData), // decompress data
                xml = $.parseXML(cdata), // xml format
                jsn = $.xml2json(xml); // json format
            return jsn;
        },
        renderSVG = function (svg, width, height, divId) {
            document.createElement('canvas')
            var c = document.createElement('canvas');
            c.width = width || 500;
            c.height = height || 188;
            document.getElementById(divId).innerHTML = '';
            document.getElementById(divId).appendChild(c);
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

                // view signature
                var sigSVG = $('#sig').signature('toSVG');
                renderSVG(sigSVG, 100, 80, 'sigView');

                // hide modal & disable board
                $('.add-sig').remove();
                $('#sig').signature('disable');
                $('.modal').modal('hide');


                showMessageAlert('success', 'تم الحفظ', data.message);
            } else {
                showMessageAlert('danger', 'خطأ أثناء تنفيذ الإجراء', data.message);
            }
        },
        saveSignature = function () { // save signature
            var obj = {
                ID: $('#ReceiptID').text(),
                Picture: $('#sig').signature('toSVG'),
                actionName: 'ReceiptVoucher_Signature'
            },
                dto = { 'actionName': obj.actionName, 'names': ['ID', 'Sig'], 'values': [obj.ID, obj.Picture] };
            if (obj.ID && obj.Picture !== '') {
                dataService.callAjax('Post', JSON.stringify(dto), sURL + 'saveData', sigSaved, errorException);
            } else {
                showMessageAlert('danger', 'بيانات مطلوبة', 'يرجي التأكد من رسم التوقيع اولا.');
            }
        },
        getFromName = function (clientName, byHandName) {
            clientName = clientName ? $.trim(clientName) : '';
            byHandName = byHandName ? $.trim(byHandName) : '';

            var index = byHandName.localeCompare(clientName), returnFullName = '';


            if (index === 0 || clientName === '') { // is equals
                returnFullName = byHandName;
            } else {
                returnFullName = clientName + '،  &nbsp; <span class="static-content">بيـد:</span> ' + byHandName;
            }

            return returnFullName;
        },
        setDataToControlandGrid = function (pkvalue) {
            var functionName = "ReceiptVouchers_SelectRow",
                DTO = { 'actionName': functionName, 'value': pkvalue },
                successCall = function (data) {
                    var jsn = comp2json(data.d), json = jsn.list;

                    if (json) {
                        // set all data
                        $.each(json, function (k, v) {
                            $('#masterForm #' + k).text(v);
                        });


                        // emp signature
                        $('.sig').html(json.Sig);

                        // from name
                        $('#FromName').html(getFromName(json.full_name, json.FromName));

                        // additional inhance
                        //$('.clientAccount').attr('href', 'ClientCars.aspx?id=' + json.ClientID);
                        $('#Amount,#AmountDhs').text(function () {
                            return numeral($(this).text()).format('0,0');
                        });

                        $('#AddDate,#BankDate,#ExchangeDate').text(function () {
                            var _date = $(this).text();
                            return _date ? moment(_date).format('D/M/YYYY') : '';
                        });

                        // show/hide client name
                        if (json.ReceiptTypeID == 2) {
                            $('.divfull_name').removeClass('hidden');
                        }
                        // show-hide exchange company
                        if (json.PayTypeID == 3) {
                            $('.exchangeCo').removeClass('hidden');
                        }

                        // hide cache
                        if (json.PaymentTypeID !== '1') {
                            $('#PaymentTypeName').text('');
                            if (json.PayTypeID == 4) { // bank transfer
                                $('.check-no').text(json.PaymentTypeName + ': ');
                                $('#BankCheckNo').html(json.BankTransferNo);
                            }
                        }

                        // canceled receipt
                        if (json.Deleted === 'true') {
                            $('#divCanceled').removeClass('hidden').html('سند قبض ملغي').closest('.hidden').removeClass('hidden');
                        }
                        else {
                            if (json.DeleteFromClientBalance === 'true') { // Receipt removed from client balance.
                                $('#divCanceled').removeClass('hidden').html('سند ملغي من رصيد العميل').closest('.hidden').removeClass('hidden');
                                $('#DeleteReason').removeClass('hidden').html(json.ClientPaymentDeleteReason).closest('.hidden').removeClass('hidden');
                            }

                            // view un revised receipt by manager
                            if (json.full_name && json.PayTypeID === '3' && !json.ClientPaymentsID)
                                $('#divCanceled').removeClass('hidden').html('سند قبض غير معتمد').closest('.hidden').removeClass('hidden');
                        }

                        // view signature
                        if (json.FromSig) {
                            $('.add-sig').remove();
                            renderSVG(json.FromSig, 500, 188, 'sigView');
                        }
                    }
                };

            dataService.callAjax('Post', JSON.stringify(DTO), sURL + 'GetData',
                successCall, errorException);
        };

    return {
        Init: Init
    };

}();