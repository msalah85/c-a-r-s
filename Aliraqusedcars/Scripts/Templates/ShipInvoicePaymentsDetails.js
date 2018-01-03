var
    ShipInvoicePaymentsDetails = function () {
        var
            $ShipCompanyID = $('#ShipCompanyID'),
            $ContainerNo = $('#ContainerNo'),
            idUpdatevalue = "", shipperId = '', ids = [],
            gTable = $('#listItems').DataTable({
                "sDom": "<'row'>t<'row'>",
                searching: false, paging: false, sort: false
            }),


            init = function () {
                bindQueryString();
                doEvents();
            },

            bindQueryString = function () {
                var qs = commonManger.getUrlVars();


                // bind selected shipper
                if (qs.sh)
                    shipperId = qs.sh;
                if (qs.ids)
                    ids = qs.ids.split(',');

                // populate lists
                setDataToControlandGrid();
                GetStaticData();
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
                    commonManger.showMessage('تم الحفظ', data.message);
                    window.location.href = 'ShipInvoicePaymentsPrint.aspx?id=' + data.ID;
                }
                else {
                    if (data.message.indexOf('The duplicate key value is') > 0) // منع تكرار رقم الحوالة مع شركة الصرافة والتاريخ
                        commonManger.showMessage('خطأ بالحفظ:', 'رقم الحوالة الذى ادخلته موجود بالفعل فى الحوالات مع اسم شركة الصرافة، برجاء اختيار رقم حوالة آخر أو شركة صرافة أخري.');
                    else // general message
                        commonManger.showMessage('خطأ بالحفظ:', data.message);
                }
            },

            resetMyForm = function (formId) {
                $('#ContainerNo').val('').change().trigger('chosen:updated').trigger("liszt:updated");
                $('#ShippPrice').val(0);
            },

            gridTotalAmount = function () {
                var Amount = 0, rate = 1, _counter = 0,
                    obj = {
                        ConvertAmount: $('#Convertamount').val() * 1,
                        vat: $('#VAT').val() * 1
                    };

                $('#listItems tbody').find('tr').find('td:nth-child(3)').each(function () {
                    Amount += parseFloat($(this).text());
                    _counter++;
                });

                Amount = numeral(Amount).format('0.00') * 1;
                $('#Amount').val(Amount); $('#lblInvoiceTotal').text(Amount);

                var invTotal = parseFloat(Amount) * parseFloat(rate); // dirhamss
                invTotal += parseFloat(obj.ConvertAmount) + parseFloat(obj.vat);   // dirhamss

                $('#AmountDhs').val((invTotal * 1).toFixed(2));
                $('.invoicesCount').text(_counter);

                //net amount
                paymentNetAmount();
            },

            doEvents = function () {
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    var checkMe = applyValidation('masterForm');
                    if (checkMe) {
                        var fieldsDetails = commonManger.returnFiledsNamesToSave("detailsForm"),
                            valueaitem = "",
                            ii = 0,
                            valuesDetails = [];


                        $('#listItems tbody').find('tr').each(function () {
                            if (!$(this).hasClass("row_neglict")) {
                                $(this).find('td').each(function () {
                                    if ($(this).find('span').hasClass('label-success')) {
                                        valueaitem += "true,";
                                    }
                                    else if ($(this).find('span').hasClass('label-danger')) { valueaitem += "false,"; }
                                    else {
                                        valueaitem += $(this).text() + ",";
                                    }
                                });
                                if (valueaitem.toLowerCase().indexOf(",") >= 0) {
                                    valueaitem = valueaitem.substring(0, valueaitem.length - 1);
                                }
                                if (valueaitem.toLowerCase().indexOf("عفواً") >= 0) {
                                    valueaitem = '0,,0,0';
                                }
                                valuesDetails.push(valueaitem);
                                valueaitem = "";
                                ii++;
                            }
                        }); // this works...


                        saveDataMasterDetails("masterForm", succesSaveAll, fieldsDetails, valuesDetails, "ShipInvoicePayments_Save");
                    }
                    else {
                        commonManger.showMessage('حقول مطلوبة:', '<p>برجاء ادخال جميع الحقول الاجبارية ذات العلامة (*)</p><p>برجاء التحقق من مبلغ الحوالة $</p>');
                    }
                });

                $('#ContainerNo').on('change', function () {
                    if ($(this).val() !== "") {
                        var DTO = { 'value': $(this).val() },
                            bindDataDetails = function (data) {

                                var selectList = JSON.parse(data.d);
                                $.each(selectList, function (index, Basicdata) {
                                    $('#Bol').val(value = Basicdata.Bol);
                                    $('#ShippPrice').val(value = Basicdata.ShippPrice);
                                });

                            },
                            _url = 'ShipInvoicePaymentsDetails.aspx/GetContainerNosDate';



                        dataService.callAjax('Post', JSON.stringify(DTO), _url, bindDataDetails, commonManger.errorException);
                    }
                    else
                        commonManger.ResetControls('detailsForm');
                });

                $ShipCompanyID.change(function () {
                    getContainers($(this).val());
                });

                $('#Savetemp').on('click', function (e) {
                    e.preventDefault();
                    var cid = $('#ContainerNo').val();

                    if (cid !== '') {
                        var ifexite = 0, itemesRows = gTable.table().node(), valuesids = [], Elements = [];
                        for (var i = 0; i < itemesRows.length; i++) {
                            if ($(itemesRows[i]).hasClass('row_selected')) {
                                $(itemesRows[i]).addClass('row_neglict');
                                $(itemesRows[i]).hide();
                            }
                        }

                        valuesids = commonManger.returnFiledsNames("detailsForm");
                        $('#listItems tbody').find('tr').find('td:nth-child(1)').each(function () {
                            if ($(this).text() === $('#' + valuesids[0]).val())
                                ifexite = 1;
                        });
                        for (var i = 0; i < valuesids.length; i++) {
                            if (valuesids[i].substring(0, 4) === "hide") {
                                Elements.push('<td>hide' + $('#' + valuesids[i]).val() + '</td>');
                            }
                            else {
                                var itemVal = $('#' + valuesids[i]).val();
                                Elements.push('<td>' + ((i > 1) ? (itemVal * 1).toFixed() : itemVal) + '</td>');
                            };
                        }
                        Elements.push('<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');


                        if (ifexite !== 1) {
                            gTable.row.add(Elements).draw(false);
                            commonManger.showMessage('تم الحفظ بنجاح:', 'تمت عملية الحفظ بنجاح');
                        } else {
                            commonManger.showMessage('الفاتورة موجودة من قبل:', 'الفاتورة التى تود اضافتها موجود بالفعل بالحواله، يمكنك حذف الفاتورة واعادة اضافتها من جديد.');
                        }


                        resetMyForm('detailsForm');
                        $('#PayInvoicePaymentsID').val(idUpdatevalue);


                        gridTotalAmount();
                    } else {
                        commonManger.showMessage('بيانات مطلوبة:', 'برجاء التحقق من مبلغ الحوالة واختيار رقم الفاتورة أولاً.');
                    }
                });

                // set discount.
                $('#Discount').on('keyup', function () {
                    paymentNetAmount();
                });

                $('#VAT').on('change', function () {
                    gridTotalAmount();
                    console.log('changed..')
                });
            },

            saveDataMasterDetails = function (form, success, fieldsDetails, valuesDetails, actionName) {
                var
                    arrayall = commonManger.Returncontrolsval(form),
                    paramNames = arrayall[0],
                    paramValues = arrayall[1];

                // add discount amount with reason
                paramNames.push('Discount', 'DiscountReason', 'NetAmount');
                paramValues.push($('#Discount').val(), $('#DiscountReason').val(), $('#lblNetAmount').text());

                var
                    DTO = {
                        values: paramValues,
                        actionName: actionName,
                        Parm_names: paramNames,
                        fieldsDetails: fieldsDetails,
                        valuesDetails: valuesDetails,
                        flage: '1'
                    },
                    successSaveCallBack = function (data) {
                        commonManger.showMessage('تم الحفظ بنجاح:', data.d.message);
                        $.fn.afterSave(paramValues);
                        success(data);
                    };

                dataService.callAjax('Post', JSON.stringify(DTO),
                    mainServiceUrl + 'SaveDataMasterDetails',
                    successSaveCallBack, commonManger.errorException);
            },

            paymentNetAmount = function () {
                var obj = {
                    total: $('#lblInvoiceTotal').text() * 1,
                    discount: $('#Discount').val() * 1,
                    net: $('#lblNetAmount')
                };


                // final amount
                if ($.isNumeric(obj.total) && $.isNumeric(obj.discount)) {
                    var _net = numeral(obj.total - obj.discount).format('0.0');
                    obj.net.text(_net);
                }
            },

            fillContainers = function (data) {
                var selectList = JSON.parse(data.d);
                $ContainerNo.empty().append('<option></option>') // reset.

                // buyers
                $.each(selectList, function (index, Basicdata) {
                    $ContainerNo.append("<option value='" + Basicdata.ContainerNo + "'>" + Basicdata.ContainerNo + "</option>");

                    if (ids.length > -1) {
                        var i = (jQuery.inArray(Basicdata.ShippInvoiceID.toString(), ids) !== -1);

                        if (i) {
                            gTable.row.add([Basicdata.ContainerNo, Basicdata.Bol, Basicdata.ShippPrice, '<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>']).draw();
                        }
                    }
                });
                $ContainerNo.chosen().trigger('chosen:updated').trigger("liszt:updated");

                gridTotalAmount();
            },

            getContainers = function (pkvalue) {
                if (pkvalue !== "") {
                    // get buyers and cars to pay invoice payment
                    functionName = 'ShipInvoicePayments_PropertiesFilter', DTO = { 'actionName': functionName, 'value': pkvalue };
                    dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData', fillContainers, function () {
                        commonManger.showMessage('خطأ بالبيانات:', 'لقد حدث خطأ أثناء تحميل البيانات.');
                    });
                }
                else
                    $('#ContainerNo').empty().append('<option></option>').chosen().trigger('chosen:updated').trigger("liszt:updated");
            },

            setDataToControlandGrid = function () {
                var pkvalue = '';
                $('#PayInvoicePaymentsID').val(pkvalue);

                var functionName = "ShipInvoicePayments_PropertiesDetails",
                    DTO = { 'actionName': functionName, 'value': pkvalue },
                    _bindInvData = function (data) {
                        var selectList = JSON.parse(data.d);

                        $.each(selectList, function (index, Basicdata) {
                            if (Basicdata.tbl_name === 1) {
                                $('#ShipCompanyID').append("<option " + (Basicdata.ID == shipperId ? "selected='selected'" : "") + " value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                            }
                        });

                        $('#ShipCompanyID').change().chosen().trigger('chosen:updated').trigger("liszt:updated");

                        $.each(selectList, function (index, Basicdata) {
                            if (Basicdata.tbl_name === 2) {
                                $('#ContainerNo').append("<option value='" + Basicdata.ID + "'>" + Basicdata.Name + "</option>");
                            }
                        });

                        $('#ContainerNo').chosen().trigger('chosen:updated').trigger("liszt:updated");

                        $.each(selectList, function (index, Basicdata) {
                            if (Basicdata.tbl_name === 150)
                                commonManger.getDataForUpdate(Basicdata, "masterForm");
                        });
                        
                        fillitemsDataTable(selectList);
                    };


                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    _bindInvData, commonManger.errorException);
            },

            fillitemsDataTable = function (gridData) {
                var valuesids = [], Elements = [];
                valuesids = commonManger.returnFiledsNames("detailsForm");

                $.each(gridData, function (index, Basicdata) {
                    if (Basicdata.tbl_name === 160) {
                        for (var i = 0; i < valuesids.length; i++) {
                            if (valuesids[i].substring(0, 4) == "hide") {
                                Elements.push('<td>hide' + Basicdata[valuesids[i].replace("hide", "")] + '</td>');
                            }
                            else {
                                Elements.push('<td>' + Basicdata[valuesids[i]] + '</td>');
                            }
                        }

                        Elements.push('<button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>');
                        gTable.row.add(Elements).draw(false);
                        Elements = [];
                    }
                });

                $('#listItems tbody').find('tr').find('td').each(function () {
                    if ($(this).text().substring(0, 4) === "hide") {
                        $(this).html($(this).text().replace("hide", ""));
                        $(this).hide();
                    }
                });

                $("#listItems tbody").delegate("tr button", "click", function (event) {
                    event.preventDefault();
                    var self = $(this), pos = self.closest('tr').index();
                    if (pos !== null) {
                        if (self.hasClass('edit')) {

                            commonManger.ResetControls("detailsForm");
                            var valuesids = commonManger.returnFiledsNames("detailsForm");

                            var titleedit = "تعديل",
                                operation = 'edit',
                                indexdt = 0;

                            self.closest('tr').find('td').each(function () {
                                var Ctype = $('#' + valuesids[indexdt]).prop('type');
                                if (Ctype === "checkbox") {
                                    if ($(this).find('span').hasClass('label-success')) {
                                        $('#' + valuesids[indexdt]).prop("checked", true)
                                    }
                                    else { $('#' + valuesids[indexdt]).prop("checked", false) }
                                }
                                else {
                                    $('#' + valuesids[indexdt]).val($(this).text());
                                    if ($('#' + valuesids[indexdt]).hasClass("chzn-select")) {
                                        $('#' + valuesids[indexdt]).chosen().trigger('chosen:updated').trigger("liszt:updated");
                                    }
                                }
                                indexdt++;
                            });


                            self.closest('tr').addClass('row_selected');
                            commonManger.enableAllFormElements("DetailsModal");
                            commonManger.showPopUpDialog(titleedit, operation, "DetailsModal");
                        }
                        else if (self.hasClass('remove')) {
                            var doDelete = function () {
                                var row = gTable.row(self.closest('tr'));
                                row.remove().draw();
                                gridTotalAmount();
                            };

                            DeleteConfirmation(doDelete);
                        }
                    }
                });
            },

            confirmDel = function () {
                var isOK = false;
                bootbox.confirm("Are you sure?", function (result) {
                    if (result)
                        isOK = result;
                });
                return isOK;
            },

            GetStaticData = function () {
                var _bindData = function (data) {
                    var selectList = JSON.parse(data.d);
                    $.each(selectList, function (index, Basicdata) {
                        $('#Convertamount').val(Basicdata.Convertamount);
                    });
                };

                dataService.callAjax('Post', JSON.stringify({ 'value': '' }),
                    mainServiceUrl + 'GetConvetAmount', _bindData, commonManger.errorException);
            };

        return {
            Init: init
        };

    }();