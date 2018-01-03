var
    CustomspaymentsDetails = CustomspaymentsDetails || {},
    CustomspaymentsDetails = function () {
        var compId = '', ids = [],
            gTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                searching: false,
                retrieve: true,
                paging: false,
                sort: false
            }),

            Init = function () {
                bindQueryString();
                bindEvents();
            },
            applyValidation = function (formId) {
                var isValid = true;
                $('#' + formId + ' .required').each(function () {
                    if ($(this).val() === '')
                        isValid = false
                });

                return isValid;
            },
            succesSaveAll = function (data) {
                data = data.d;
                if (data.Status) {
                    commonManger.showMessage('', data.message);
                    window.location.href = 'CustomsPayments.aspx?pend=1';
                }
                else {
                    if (data.message.indexOf('The duplicate key value is') > 0) // منع تكرار رقم الحوالة مع شركة الصرافة والتاريخ
                        commonManger.showMessage('خط بالحفظ:', 'رقم الحوالة الذى ادخلته موجود بالفعل فى الحوالات مع اسم شركة الصرافة، برجاء اختيار رقم حوالة آخر أو شركة صرافة أخري.');
                    else // general message
                        commonManger.showMessage('خط بالحفظ:', data.message);
                }
            },
            gridTotalAmount = function () {
                var _Amount = 0, AmountDh = 0;
                $('#listItems tbody').find('tr').find('td:nth-child(3)').each(function () {
                    _Amount += parseFloat($(this).text());
                });

                $('#masterForm #Amount,#TotalAmount').val(numeral(_Amount).format('0'));

                $('#listItems tbody').find('tr').find('td:nth-child(4)').each(function () {
                    AmountDh += parseFloat($(this).text());
                });

                $('#lblInvoiceTotal').text(numeral(AmountDh).format('0')); // AED

                var commition = $('#Commission').val();
                commition = isNaN(commition) ? 0 : commition * 1;

                AmountDh = AmountDh + commition;
                $('#AmountDhs').val(numeral(AmountDh).format('0')); // AED
            },
            resetMyForm = function (formId) {

                $('#' + formId + ' input').val('');
                $('#ContainerNo').val('');
                $('#' + formId + ' #Amount,#' + formId + ' #AmountDh').val(0);
            },
            bindQueryString = function () {
                var qs = commonManger.getUrlVars();

                // bind selected shipper
                if (qs.co) {
                    compId = qs.co;
                    $('#CustomsCompanyID').val(compId);
                }
                if (qs.ids)
                    ids = qs.ids.split(',');

                // populate lists
                setDataToControlandGrid();

                // all data to edit
                if (qs.id) {

                    // assign payment id
                    getPaymentDetails(qs.id);

                }
            },
            bindEvents = function () {
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    var checkMe = applyValidation('masterForm');
                    if (checkMe) {
                        var fieldsDetails = commonManger.returnFiledsNamesToSave("detailsForm"), valueaitem = "", ii = 0, valuesDetails = [];

                        $('#listItems tbody').find('tr').each(function () {
                            if (!$(this).hasClass("row_neglict")) {

                                $(this).find('td').each(function () {
                                    valueaitem += $(this).text() + ",";
                                });


                                if (valueaitem.toLowerCase().indexOf(",") >= 0) {
                                    valueaitem = valueaitem.substring(0, valueaitem.length - 1);
                                }
                                if (valueaitem.toLowerCase().indexOf("عفواً") >= 0) {
                                    valueaitem = '0,,0';
                                }

                                valuesDetails.push(valueaitem);
                                valueaitem = "";
                                ii++;
                            }
                        });

                        commonManger.SaveDataMasterDetails("", "masterForm", succesSaveAll, errorCallBack, fieldsDetails, valuesDetails, "Customspaymentsmaster_Save", "1");
                    }
                    else {
                        commonManger.showMessage('حقول مطلوبة:', '<p>- برجاء التأكد من مطابقة مبلغ الحوالة مع إجمالى الحاويات.</p><p>- برجاء ادخال جميع الحقول الاجبارية ذات العلامة (*)</p>');
                    }
                });

                $('#ContainerNo').on('change', function () {
                    var DTO = { 'value': $(this).val() };
                    dataService.callAjax('Post', JSON.stringify(DTO), 'CustomspaymentsDetails.aspx/GetDataContainer',
                        function (data) {
                            var selectList = JSON.parse(data.d);

                            $.each(selectList, function (i, Basicdata) {
                                $('#ContainerDate').val(Basicdata.ContainerDate);
                                $('#detailsForm #Amount').val(numeral(Basicdata.Amount).format('0.00'));
                                $('#detailsForm #AmountDh').val(numeral(Basicdata.AmountDh).format('0.00'));
                            });

                        }, commonManger.errorException);
                });

                $('#Savetemp').on('click', function (e) {
                    e.preventDefault();
                    var cid = $('#CheckNo').val(), chkVal = $('#detailsForm #AmountDhs').val(), containr = $('#ContainerNo').val();
                    if (cid !== '' && chkVal !== '' && chkVal !== '0' && containr != '') {
                        var ifexite = 0, itemesRows = gTable.table().node();
                        for (var i = 0; i < itemesRows.length; i++) {
                            if ($(itemesRows[i]).hasClass('row_selected')) {
                                $(itemesRows[i]).addClass('row_neglict');
                                $(itemesRows[i]).hide();
                            }
                        }
                        var valuesids = [], Elements = [];
                        valuesids = commonManger.returnFiledsNames("detailsForm");
                        $('#listItems tbody').find('tr').find('td:nth-child(1)').each(function () {
                            if ($(this).text() == $('#' + valuesids[0]).val())
                                ifexite = 1;
                        });
                        for (var i = 0; i < valuesids.length; i++) {
                            if (valuesids[i].substring(0, 4) == "hide") {
                                Elements.push('<td>hide' + $('#' + valuesids[i]).val() + '</td>');
                            }
                            else {
                                var Ctype = $('#' + valuesids[i]).prop('type');
                                if (Ctype == "checkbox") {
                                    $('#' + valuesids[i]).prop('checked', function (i, value) {
                                        if (value == true) {
                                            Elements.push('<td><span class="label label-success"><i class="icon icon-check"></i></span></td>');
                                        }
                                        else if (value == false) {
                                            Elements.push('<td><span class="label label-danger"><i class="icon icon-remove"></i></span></td>');
                                        }
                                    });
                                }
                                else {
                                    Elements.push('<td>' + $('#' + valuesids[i]).val() + '</td>');
                                }
                            };
                        }
                        Elements.push('<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');
                        if (ifexite !== 1) {
                            gTable.row.add(Elements).draw(false);
                            commonManger.showMessage('تم الحفظ بنجاح:', 'تمت عملية الحفظ بنجاح');
                        } else {
                            commonManger.showMessage('السيارة موجودة من قبل:', 'السيارة التى تود اضافتها موجود بالفعل بالحواله، يمكنك حذف السيارة واعادة اضافتها من جديد.');
                        }

                        resetMyForm('detailsForm');
                        gridTotalAmount();
                    } else {
                        commonManger.showMessage('بيانات مطلوبة:', 'برجاء التأكد من رقم الشيك ومبلغ الحوالة واختيار رقم الحاوية أولاً.');
                        $('#masterForm #AmountDhs').focus();
                    }
                });

                $('#Commission').on('keyup', function () {
                    gridTotalAmount();
                });

                // delete from grid
                $("#listItems tbody").delegate("tr button.remove", "click", function (event) {
                    event.preventDefault();
                    var self = $(this), pos = self.closest('tr').index();

                    if (pos != null) {
                        DeleteConfirmation(function () {
                            var row = gTable.row($(this).parents('tr')), containerNo = row.data()[0];

                            // enable this container from chosen control
                            $('#ContainerNo').find("option").each(function () {
                                if (this.value == containerNo) {
                                    this.disabled = false;
                                }
                            })

                            // remove row from grid
                            row.remove().draw();
                            gridTotalAmount();


                        })
                    }
                });
            },
            getPaymentDetails = function (pID) {

                var dto = { actionName: 'CustomsPaymentsMaster_Print', names: ['pkId'], values: [pID] },
                    bindPaymnetControls = function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

                        // master form
                        if (jsn) {
                            $.each(jsn, function (i, v) {
                                var ctrl = $('#' + i);

                                if (ctrl.hasClass('money'))
                                    ctrl.val(numeral(v).format('0.0'));
                                else
                                    ctrl.val(v);

                            });
                        }


                        // details grid
                        if (jsn1) {
                            var rows = $(jsn1).map(function (i, v) { return '<tr><td>' + v.ContainerNo + '</td><td>' + commonManger.dateFormat(v.InvoiceDate) + '</td><td>' + numeral(v.Amount).format('0.00') + '</td><td>' + numeral(v.AmountDh).format('0.00') + '</td><td></td></tr>' }).get();


                            $('#listItems tbody').html(rows);
                            $('#detailsForm').addClass('hidden');


                            gridTotalAmount();
                        }

                    };


                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindPaymnetControls, commonManger.errorException);
            },
            // bind data with its controls
            bindControlsData = function (d) {
                var jsnData = commonManger.comp2json(d.d), jsn = jsnData.list;

                // bind select list
                var $options = '';
                $(jsn).each(function (i, v) {
                    // bind grid and containers select list
                    if (ids.length > -1) {
                        var i = (jQuery.inArray(v.CustomsInvoiceID.toString(), ids) !== -1);

                        if (i) {
                            gTable.row.add([v.ContainerNo, v.InvoiceNo, numeral(v.TotalAmount).format('0.00'), numeral(v.TotalAmountDhs).format('0.00'), '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" title="حــذف"><i class="icon-remove"></i></button>']).draw();


                            // show option as diabed
                            $options += '<option disabled value="' + v.ContainerNo + '">' + v.ContainerNo + '</option>';
                        }
                        else {
                            // show as fresh option
                            $options += '<option value="' + v.ContainerNo + '">' + v.ContainerNo + '</option>';
                        }
                    }
                });


                gridTotalAmount();
                // update chosen control
                $('#ContainerNo').append($options);//.chosen().trigger('chosen:updated');
            },
            setDataToControlandGrid = function () {
                var functionName = "Customspaymentsmaster_PropertiesDetails", names = ['pkId'], values = [compId], DTO = { 'actionName': functionName, names: names, values: values };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataList', bindControlsData, commonManger.errorException);
            },
            fillListsByDistinaion = function (pkvalue) {
                var functionName = "Customspaymentsmaster_ContainerByDist", DTO = { 'actionName': functionName, 'value': pkvalue };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    function (data) {
                        var selectList = JSON.parse(data.d);

                        $.each(selectList, function (index, Basicdata) {
                            if (Basicdata.tbl_name == 1) {
                                $('#ContainerNo').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                            }
                        });

                    }, commonManger.errorException);
            },
            fillitemsDataTable = function (gridData) {
                var valuesids = [], Elements = [];
                valuesids = commonManger.returnFiledsNames("detailsForm");
                $.each(gridData, function (index, Basicdata) {
                    if (Basicdata.tbl_name == "160") {
                        for (var i = 0; i < valuesids.length; i++) {
                            if (valuesids[i].substring(0, 4) == "hide") {
                                Elements.push('<td>hide' + Basicdata[valuesids[i].replace("hide", "")] + '</td>');
                            }
                            else {
                                var Ctype = $('#' + valuesids[i]).prop('type');
                                if (Ctype == "checkbox") {
                                    if (Basicdata[valuesids[i]] == true) {
                                        Elements.push('<td><span class="label label-success"><i class="fa fa-check"></i></span></td>');
                                    }
                                    else if (Basicdata[valuesids[i]] == false) {
                                        Elements.push('<td><span class="label label-danger"><i class="fa fa-remove"></i></span></td>');
                                    }
                                }
                                else {
                                    Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                                }
                            }
                        }
                        Elements.push('<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');
                        gTable.row.add(Elements).draw(false);
                        Elements = [];
                    }
                });
                $('#listItems tbody').find('tr').find('td').each(function () {
                    if ($(this).text().substring(0, 4) == "hide") {
                        $(this).html($(this).text().replace("hide", ""));
                        $(this).hide();
                    }
                });
            },
            errorCallBack = function (jqXhr, textStatus, errorThrown) {
                title = textStatus + ": " + errorThrown;
                message = JSON.parse(jqXhr.responseText).Message;
                commonManger.showMessage(title, message);
            };


        return {
            Init: Init
        };
    }();