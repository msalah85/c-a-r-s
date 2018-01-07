
var 
    PayInvoicePaymentsPrint = function () {
        var
            oTable = "", oTable2 = "", idUpdatevalue = "", exchanger = [],


            Init = function () {
                var qs = commonManger.getUrlVars(), urlIds = decodeURIComponent(qs.id);

                if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {

                    idUpdatevalue = urlIds;
                    setDataToControlandGrid(urlIds);

                    $('#PayInvoicePaymentsIDH').text(urlIds);
                    $('#PayInvoicePaymentsID').text(urlIds);
                    $('a[data-pk]').attr('data-pk', urlIds);

                }
                else {
                    setDataToControlandGrid("");
                    $('#PayInvoicePaymentsID').val(value = '0');
                }


                // show all data
                if (qs.review > 0) {
                    $('.new').removeClass('hidden');
                    $('.title').text('مراجعة حوالة فواتير الشراء');
                }

            },
            setDataToControlandGrid = function (pkvalue) {
                var
                    functionName = "PayInvoicePayments_PropertiesPrint",
                    formName = 'masterForm',
                    DTO = { 'actionName': functionName, 'value': pkvalue };


                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    function (data) {
                        var selectList = JSON.parse(data.d);

                        var masterFrm = $.grep(selectList, function (v) { return v.tbl_name == "150"; }),
                            detailsFrm = $.grep(selectList, function (v) { return v.tbl_name != "150"; });



                        $.each(masterFrm[0], function (i, v) {
                            $('#' + i).text(v);


                            // view
                            if (i === 'CheckNo' && v !== '') {
                                $('.new').removeClass('hidden');
                            } else if (i === 'PaymentsDates' && v !== '') { // date format
                                $('#' + i).text(function () {
                                    return commonManger.dateFormat(v, 'M/D/YYYY', 'DD/MM/YYYY')
                                });
                            }


                            // show all controls that was hidden and has data new.
                            if (($('#' + i).hasClass('editable') || $('#' + i).hasClass('editable-no')) && v && v != null) {
                                $('#' + i).removeClass('editable editable-click editable-no').removeAttr('href id data-table data-id data-name class data-pk data-type').closest('tr').removeClass('new hidden');
                            }
                        });




                        // net amount
                        var _net = (masterFrm[0].TotalAmount * 1) - (masterFrm[0].DiscountAmount * 1);
                        $('.net-amount').text(_net);




                        // عرض تفاصيل سند الصرف
                        if (masterFrm[0].CheckNo * 1 > 0)
                            $('#CheckNo').attr('href', function () { return 'ReceiptPaymentsPrint.aspx?id=' + $(this).text() });


                        fillitemsDataTable(detailsFrm);


                        $('.money').text(function () { return numeral($(this).text()).format('0,0.00') });


                    }, commonManger.errorException);
            },
            applyEditableControl = function () {

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
                // Fines
                oTable2 = $('#listItems2').DataTable({ "sDom": "<'row'>t<'row'>", bDestroy: true, bLengthChange: false, bFilter: false, searching: false, paging: false });

                var sids = ['Model', 'LotNo', 'Storge', 'LatPayment'], elements = [],
                    lateTotal = 0, storTotal = 0;


                $.each(gridData, function (i, Basicdata) {
                    if (Basicdata.tbl_name === 161) {
                        for (var i = 0; i < sids.length; i++) {
                            elements.push(Basicdata[sids[i]]);
                            if (i == 2) {
                                storTotal += (Basicdata[sids[i]] * 1);

                            } else if (i == 3) {
                                lateTotal += (Basicdata[sids[i]] * 1);
                            }
                        }


                        var rowNode = oTable2.row.add(elements).draw(); elements = [];
                        rowNode.nodes().to$().children('td:eq(2)').addClass('red');
                        rowNode.nodes().to$().children('td:eq(3)').addClass('red');

                    }
                    else if (Basicdata.tbl_name == 0) {
                        exchanger.push({ value: Basicdata.ID, text: Basicdata.Name });
                    }
                });


                // sub total
                $('.storTotal').text(numeral(storTotal).format('0,0.00'));
                $('.lateTotal').text(numeral(lateTotal).format('0,0.00'));


                //Cars
                oTable = $('#listItems').DataTable({ "sDom": "<'row'>t<'row'>", bDestroy: true, bLengthChange: false, bFilter: false, searching: false, paging: false });
                var valuesids = ['CarID', 'Model', 'LotNo', 'full_name', 'PayPrice'], Elements = [], invTotal = 0;


                $.each(gridData, function (i, Basicdata) {
                    if (Basicdata.tbl_name === 160) {
                        for (var i = 0; i < valuesids.length; i++) {
                            Elements.push(Basicdata[valuesids[i]]);

                            if (i > 3)
                                invTotal += (Basicdata[valuesids[i]] * 1);
                        }


                        oTable.row.add(Elements).draw().nodes().to$().children('td:eq(4)').addClass('green').text(function () {
                            return numeral($(this).text()).format('0,0.00');
                        });


                        Elements = [];
                    }
                });


                // show total
                $('.carsTotal').text(numeral(invTotal).format('0,0.00'));


                // active editable controls
                applyEditableControl();
                applyEditableControlNo();
            };


        return {
            Init: Init
        };
    }();