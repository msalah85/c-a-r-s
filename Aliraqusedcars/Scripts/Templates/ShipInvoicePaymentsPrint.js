var ShipInvoicePaymentsPrint = function () {
    var oTable = "", idUpdatevalue = "", exchanger = [],
        qs = commonManger.getUrlVars(),

        Init = function () {
            var urlIds = decodeURIComponent(qs.id);

            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                idUpdatevalue = urlIds;
                setDataToControlandGrid(urlIds);
                $('#ShipInvoicePaymentsIDH').text(urlIds);
                $('#ShipInvoicePaymentsID').text(urlIds);

                $('a[data-pk]').attr('data-pk', urlIds);
            }
            else {
                setDataToControlandGrid("");
                $('#ShipInvoicePaymentsID').val(value = '0');
            }

            // show all data
            if (qs.review > 0) {
                $('.review').removeClass('hidden');
                $('.title').text('مراجعة حوالة فواتير الشحن');
            }
        },
        setDataToControlandGrid = function (pkvalue) {
            var functionName = "ShipInvoicePayments_PropertiesDetails",
                formName = 'masterForm',
                DTO = { 'actionName': functionName, 'value': pkvalue },
                bindData = function (data) {
                    var selectList = JSON.parse(data.d);

                    var masterFrm = $.grep(selectList, function (v) { return v.tbl_name == "150"; }),
                        detailsFrm = $.grep(selectList, function (v) { return v.tbl_name != "150"; });

                    $.each(masterFrm[0], function (i, v) {
                        if ($('#' + i).hasClass('money') && v) {
                            $('#' + i).text(numeral(v || 0).format('0,0.00'));
                        } else {
                            $('#' + i).text(v);
                        }

                        // date format
                        if (i == 'PaymentsDates' && v != '') {
                            $('#' + i).text(function () {
                                return commonManger.dateFormat(v, 'M/D/YYYY', 'DD/MM/YYYY');
                            });
                        }


                        // show all controls that was hidden and has data new.
                        if (($('#' + i).hasClass('editable') || $('#' + i).hasClass('editable-no')) && v && v != null) {
                            $('#' + i).removeClass('editable-no editable-click editable').removeAttr('href id data-table data-id data-name class data-pk data-type').closest('tr').removeClass('new hidden');
                        }
                    });

                    // عرض تفاصيل سند الصرف
                    $('#CheckNo').html(function () { return '<a href="ReceiptPaymentsPrint.aspx?id=' + $(this).text() + '">' + $(this).text() + '</a>' });

                    fillitemsDataTable(detailsFrm);
                };


            dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                bindData, commonManger.errorException);
        },
        applyEditable = function () {
            // editable row
            $('a.editable').editable({
                emptytext: 'لا يوجــد',
                source: exchanger,
                value: $(this).data('currentVal'),
                validate: function (value) {
                    if ($.trim(value) === '') {
                        return 'مطلوب.';
                    }
                },
                url: function (params) {
                    params.table = $(this).data('table'); params.id = $(this).data('id');
                    return $.ajax({
                        type: 'POST',
                        url: sUrl + 'InlineEdit',
                        data: JSON.stringify(params),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        async: true,
                        cache: false,
                        timeout: 10000,
                        success: function () {
                            commonManger.showMessage('تم الحفظ:', 'تم حفظ البيان بنجاح.');
                        },
                        error: function () {
                            commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                        }
                    });
                }
            });
        },
        fillitemsDataTable = function (gridData) {
            oTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                bDestroy: true,
                bLengthChange: false,
                bFilter: false,
                searching: false,
                retrieve: true,
                paging: false
            });

            var valuesids = [], Elements = [];
            valuesids.push('ContainerNo', 'InvoiceNo', 'ShippPrice');

            $.each(gridData, function (index, Basicdata) {
                Elements.push('<td>' + (index + 1) + '</td>');
                if (Basicdata.tbl_name == "160") {
                    for (var i = 0; i < valuesids.length; i++) {
                        Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                    }
                    oTable.row.add(Elements).draw(false);
                    Elements = [];
                }
                else if (Basicdata.tbl_name == "0") {
                    exchanger.push({ value: Basicdata.ID, text: Basicdata.Name });
                }
            });


            if (qs.cont) {
                $("#listItems").mark(qs.cont);
                $("window").scrollTop();

                var nn = $("*:contains('" + qs.cont + "'):last").offset().top;
                $('html, body').animate({
                    scrollTop: nn
                }, 1500);
            }

            // apply editable controls
            applyEditable();
            applyEditableControlNo();
        };
    return {
        Init: Init
    };
}();
// 
ShipInvoicePaymentsPrint.Init();