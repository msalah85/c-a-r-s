// Sum the values in a data set in DataTables 1.10+
jQuery.fn.dataTable.Api.register('sum()', function () {
    function isHTML(str) {
        return /^<.*?>$/.test(str) && !!$(str)[0];
    }
    return this.flatten().reduce(function (a, b) {
        if (typeof a === 'string') {

            if (isHTML(a))
                a = $(a).text();

            a = a.replace(/[^\d.-]/g, '') * 1;
        }
        if (typeof b === 'string') {

            if (isHTML(b))
                b = $(b).text();

            b = b.replace(/[^\d.-]/g, '') * 1;
        }

        return a + b;
    }, 0);
});

// custom invoice class
var continerId = "",
    CustomsInvoicesManager = function () {
        var $customComp = $('select[id$=CustomsCompanyID]'),
            $continerId = $('select[id$=ContainerNo]'),
            myTable1 = null, //$("#listItems").DataTable(),
            myTable2 = null, //$("#listItems2").DataTable(),
            customsRate = function () {
                // Jordan rate (3.67)
                return $('#DistinationID').val() === '2' ? 3.67 : 3.667;
            },
            Init = function () {
                // after save using editable
                $.fn.afterSave = function (data) {
                    updateGrid(); expensesGridTotal()
                    window.setTimeout(expensesGridTotal, 3000);
                }


                $('#ExpenseTypeID').on('change', function (e) { // show custom expense value.
                    var mVal = $(this).val();
                    if (mVal !== '') {
                        mVal = mVal.split('|');
                        $('#CustomsExpenseValue').val(mVal[1]).attr('data-val', mVal[1]);
                    } else { $('#CustomsExpenseValue').val(); }
                });
                $('button.btnAddExpens').on('click', function (e) { // Save shipping car.
                    e.preventDefault();
                    if (validateForm()) {
                        var exVal = $('#CustomsExpenseValue').val(), exValToValid = $('#CustomsExpenseValue').attr('data-val'), itemVals = $('#ExpenseTypeID').val().split('|'),
                            _row = {
                                id: itemVals[0],
                                no: itemVals[3],
                                total: (parseFloat(exVal) * parseInt(itemVals[3])),
                                expValue: parseFloat(exVal),
                                expValueToValid: parseFloat(exValToValid),
                                name: $('#ExpenseTypeID option:selected').text(),
                                del: '<button class="btn btn-mini btn-danger remove"><i class="icon-remove"></i></button>'
                            },
                            myTable = $('#listItems2').DataTable(),
                            editButton = '<a data-index="' + _row.id + '" href="#CustomExpenseModal" data-toggle="modal" class="btn btn-mini btn-info edit"><i class="icon-edit"></i></a> ';



                        if (_row.expValue > _row.expValueToValid) {
                            commonManger.showMessage("برجاء التحقق من قيمة المصروف", 'برجاء ادخال قيمة مصروف أقل من أو تساوى القيمة الافتراضية.');
                        } else {
                            if (checkExpenseExist(_row.id)) { // update row
                                var updatedData = [_row.id, _row.name, _row.expValue, _row.no, _row.total, editButton + _row.del],
                                    _trIndex = $('#listItems2 a[data-index=' + _row.id + ']').closest('tr'); //.index();

                                $(updatedData).each(function (i, v) {
                                    if (i === 2 || i === 4) // expense, total
                                        myTable.cell(_trIndex, i).data(numeral(updatedData[i]).format('0.00')).draw();
                                });

                                commonManger.showMessage("تم تحديث البيانات", 'تم تحديث المصروف بنجاح.');
                            }
                            else { // new row
                                myTable.row.add([_row.id, _row.name, _row.expValue, _row.no, _row.total, editButton + _row.del]).draw(false);
                                commonManger.showMessage("تم الحفظ", 'تم حفظ المصروف بنجاح.');
                            }

                            $('#CustomExpenseModal').modal('hide');
                            expensesGridTotal();
                        }
                    }
                });
                $('button.btnFinish').on('click', function (e) { // Save shipping invoice                
                    var $btn = $(e.target);
                    $(this).preventDoubleClick(); // prevent double click
                    e.preventDefault();

                    // start prevent double click
                    if (!$btn.data('lockedAt') || +new Date() - $btn.data('lockedAt') > 300) { // start button event

                        // start save invoice
                        checkMe = applyValidation('masterForm');
                        if (checkMe) {
                            var invID = $('#CustomsInvoiceID').val(), fieldsDetails = ['CustomsDetailsID', 'CustomsInvoiceID', 'ExpenseTypeID', 'CustomsExpenseValue', 'CarsNo', 'TotalExpensesValue'],
                                valuesDetails = [];
                            $('#listItems2 tbody').find('tr').each(function () {
                                var valueaitem = "0," + invID + ",";
                                $(this).find('td:not(:eq(1))').each(function () {
                                    valueaitem += $(this).text() + ",";
                                });
                                if (valueaitem.indexOf(",,") >= 0) {
                                    valueaitem = valueaitem.substring(0, valueaitem.length - 2);
                                }
                                if (valueaitem.indexOf("عفواً") >= 0) {
                                    valueaitem = '0,0,0,0,0,0';
                                }
                                valuesDetails.push(valueaitem);
                            }); // end save invoice
                            SaveDataMasterDetails("masterForm", fieldsDetails, valuesDetails, "CustomsInvoices_Save");
                        }

                    } // end button event
                    $btn.data('lockedAt', +new Date()); // end prevent double click
                });
                $('input[name=CustomVal]').on('keyup change blur', function (e) {
                    var vl = $(this).val(), $custVal = $('#CustomsPrice');
                    if (vl !== "") {
                        vl = parseFloat(vl);
                        var cutm = (vl / 3.6930) / 4
                        $custVal.val(cutm.toFixed(2));
                    } else { $custVal.val(0) }
                }); // Custom Value
                // edit expense
                $("#listItems2 tbody").delegate("tr a.edit", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr');
                    if (pos !== null) {
                        var dData = myTable2.row(pos).data(),
                            selected = $('#ExpenseTypeID option:contains("' + dData[1] + '")').val();
                        $('#ExpenseTypeID').val(selected).change();
                    }
                });
                // remove expense
                $("#listItems2 tbody").delegate("tr button.remove", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr');
                    if (pos !== null) {
                        DeleteConfirmation(function () {
                            myTable2.row(pos).remove().draw();
                            expensesGridTotal();
                            commonManger.showMessage('تم الحذف', 'تمت عملية الحذف بنجاح.');
                        });
                    }
                });

                // filter containers by custom companies.
                $customComp.change(function () {
                    var value = $(this).val();
                    if (value !== "") {
                        var url = mainServiceUrl + 'GetData', DTO = { 'actionName': 'CustomInvoices_FilterContainers', 'value': value };
                        dataService.callAjax('Post', JSON.stringify(DTO), url, CustomsInvoicesManager.BindContainers, commonManger.errorException);
                    }
                    else {
                        $continerId.empty().append('<option></option>');
                        $continerId.chosen().trigger('chosen:updated').trigger("liszt:updated");
                    }
                });

                $customComp.find('.search-choice-close').click(function () {
                    $continerId.empty().append('<option></option>');
                    $continerId.chosen().trigger('chosen:updated').trigger("liszt:updated");
                });

                $('.contNo, input[name=CustomVal]').on('change', function (e) { // show shipped car. // #CustomsPrice
                    if ($('#ContainerNo').val() !== null && $('#ContainerNo').val() !== "" && $('#CustomsPrice').val() !== "0") {
                        filllistItems();
                    }
                });

                $('input[name=VAT]').on('keyup', function (e) {
                    expensesGridTotal();
                });

            },
            SaveDataMasterDetails = function (form, fieldsDetails, valuesDetails, actionName) {
                var ParamValues = [], ParamNames = [], arrayall = commonManger.Returncontrolsval(form);
                ParamNames = arrayall[0];
                ParamNames.push('TotalCustoms', 'TotalExpenses', 'TotalAmount', 'TotalCustomsDhs', 'TotalExpensesDhs', 'TotalAmountDhs', 'VAT');
                ParamValues = arrayall[1];
                var custTotal = parseFloat($('#lblCustomTotal').text()),
                    expenTotal = parseFloat($('#lblTotalExpenses').text()),
                    vat = parseFloat($('#VAT').val() || 0),
                    invTotal = parseFloat($('#lblInvoiceTotal').text());

                ParamValues.push(custTotal, expenTotal, invTotal, custTotal * 3.6930, expenTotal * customsRate(), (custTotal * 3.6930) + (expenTotal * customsRate()) + vat, vat);
                var DTO = { 'values': ParamValues, 'actionName': actionName, 'Parm_names': ParamNames, 'fieldsDetails': fieldsDetails, 'valuesDetails': valuesDetails, 'flage': '1' };

                // start save
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'SaveDataMasterDetails',
                    function (data) { commonManger.showMessage('تم الحفظ بنجاح:', data.d.message); window.location.href = 'InvoicesCustomsView.aspx'; }, commonManger.errorException);
            },
            checkExpenseExist = function (id) {
                var exists = false;
                $('#listItems2 tbody tr').each(function () {
                    $(this).find('td:eq(0)').each(function () {
                        if ($(this).text() === id)
                            exists = true;
                    });
                });
                return exists;
            },
            applyValidation = function (formId) {
                var isValid = true;
                $('#' + formId + ' .required').each(function () {
                    if ($(this).val() === '')
                        isValid = false
                });
                return isValid;
            },
            expensesGridTotal = function () {

                var totalTtal = 0, customTotal = 0;

                // in case updating customs on car
                $('a[data-name="CustomsOnCar"]').each(function () { customTotal += ($(this).text() * 1); });
                if (customTotal === 0) // in case fisrt loading data
                    customTotal = myTable1.column(3).data().sum();

                totalTtal = myTable2 ? myTable2.column(4).data().sum() : 0;

                customTotal = customTotal.toFixed(2);
                totalTtal = totalTtal.toFixed(2);

                $('#lblCustomTotal').text(numeral(customTotal).format('0.00'));
                $('#lblTotalExpenses').text(numeral(totalTtal).format('0.00')); // expenses total


                var totalDollar = ((customTotal * 1) + (totalTtal * 1));

                $('#lblInvoiceTotal').text(numeral(totalDollar).format('0.00')); // invoice total

                var totalInvoiceDhs = (customTotal * 3.6930) + (totalTtal * customsRate()),
                    _vat = $('#VAT').val(),
                    totalNetAmountDhs = totalInvoiceDhs + ((_vat || 0) * 1);


                $('#lblInvoiceCalculatedDhs').text(numeral(totalInvoiceDhs).format('0')); // total dirham
                $('#lblInvoiceTotalDhs').text(numeral(totalNetAmountDhs).format('0')); // total dirham
            },
            validateForm = function () {
                var _val1 = $('#ExpenseTypeID option:selected').val(), _val2 = $('#CustomsExpenseValue').val();
                if (_val1 !== undefined && _val1 !== '' && _val2 !== '' && _val2 > 0) { return true; }
                else {
                    $('#CustomsExpenseValue').focus(); //commonManger.showMessage('لم تتم عملية الحفظ', 'برجاء التأكد من  اختيار نوع وقيمة المصروف.'); return false;
                }
            },
            populateExpList = function (data, expTotal) {
                var $option = $('<option />').val(data.ExpenseTypeID + '|' + data.ExpensesCharge + '|' + expTotal + '|' + data.CarsNo).text(data.ExpenseTypeNameAr);
                $('#ExpenseTypeID').append($option);;
            },
            bindLists = function (d) {
                var cdata = LZString.decompressFromUTF16(d.d), xml = $.parseXML(cdata), jsn = $.xml2json(xml).list, jsn1 = $.xml2json(xml).list1, __cars = [], _cTotal = 0; // handle cars data

                if (jsn) {
                    // reset datatable
                    if (myTable1 !== null)
                        $('#listItems').DataTable().destroy();


                    $(jsn).each(function (i, item) {

                        $('#DistinationID').val(item['CarDistinationID']);


                        __cars.push([item['MakerNameEn'] + ' - ' + item['TypeNameEn'] + ' - ' + item['Year'], item['LotNo'], numeral(item['PayPrice']).format('0.00'),
                        '<a title="تعديل المبلغ" data-type="text" data-id="CarID" data-pk="' + item['CarID'] + '" data-table="CarsData" data-name="CustomsOnCar" class="editable" href="#" data-placeholder="أدخل المبلغ">' + numeral(item['CustomCostOnCar']).format('0.00') + '</a>'
                        ]);
                        _cTotal += parseFloat(item['CustomCostOnCar']);
                    });
                }

                if (__cars.length)
                    myTable1 = commonManger.populateDataTable(__cars, 'listItems');

                // expenses data
                var __expen = [], _eTotal = 0; $('#ExpenseTypeID').html('<option />');

                if (jsn1) {
                    // reset datatable
                    if (myTable2 !== null)
                        $('#listItems2').DataTable().destroy();

                    $(jsn1).each(function (i, item) {
                        var itmTotal = parseFloat(item['ExpensesCharge']) * parseInt(item['CarsNo']);
                        populateExpList(item, itmTotal);
                        if (item.ExpenseTypeID !== '11') {
                            __expen.push([item['ExpenseTypeID'], item['ExpenseTypeNameAr'], numeral(item['ExpensesCharge']).format('0.00'), item['CarsNo'], numeral(itmTotal).format('0.00'), '<a data-index="' + item['ExpenseTypeID'] + '" href="#CustomExpenseModal" data-toggle="modal" class="btn btn-mini btn-info edit"><i class="icon-edit"></i></a> <button class="btn btn-mini btn-danger remove"><i class="icon-remove"></i></button>']);
                            _eTotal += itmTotal;
                        }
                    });
                }
                if (__expen.length > 0)
                    myTable2 = commonManger.populateDataTable(__expen, 'listItems2');

                expensesGridTotal();

                // show/hide final save button
                if (__expen.length > 0) { $('.btnFinish,.btn-addExp').removeClass('hidden'); } else { $('.btnFinish,.btn-addExp').addClass('hidden'); }
            },
            filllistItems = function () {
                var containerNo = $('.contNo').val(), customCost = $('#CustomsPrice').val(), names = ['pkId', 'CustomVal', 'CustomCoID'],
                    values = [containerNo, customCost, $customComp.val()], funName = 'CustomsInvoices_GetCarsWithCustoms',
                    dto = { 'actionName': funName, 'names': names, 'values': values };
                if (containerNo !== null && containerNo !== '')
                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindLists, commonManger.errorException);
            },
            GetCompCustomsExpenseTypes = function (_container) {
                var $expensType = $('select[id$=ExpenseTypeID]');
                filllistItems();
                if (_container !== "")
                    $.ajax({
                        type: "POST",
                        url: 'InvoiceCustomsAdd.aspx/GetCustomCompExpenses',
                        data: "{container: '" + _container + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        beforeSend: function () {
                            $("#divSpinner").html("<i class='icon-spinner icon-spin orange bigger-125'></i>");
                        },
                        complete: function () {
                            $("#divSpinner").html("");
                        },
                        success: function (response) {
                            var items = (typeof response.d) === 'string' ? eval('(' + response.d + ')') : response.d;
                            //Show Customs expense types for selected company from top list.             
                            $expensType.empty().append('<option val="">اختر نوع المصروف</option>');
                            $(items.ExpenseTypes).each(function (i, item) {
                                $('<option>', { value: item.ExpenseTypeID }).html(item.ExpenseTypeNameAr).appendTo($expensType);
                            });
                        }
                    });
            },
            BindContainers = function (response) {
                var list = (typeof response.d) === 'string' ? eval('(' + response.d + ')') : response.d;
                $continerId.empty().append('<option></option>');
                $(list).each(function (i, item) {
                    $('<option>', { value: item.ID }).html(item.Name).appendTo($continerId);
                });
                if (continerId !== "")
                    $continerId.val(_shipperId);
                $continerId.chosen().trigger('chosen:updated').trigger("liszt:updated");
            },
            updateGrid = function () {
                myTable1.draw();
            };
        return {
            Init: Init,
            BindContainers: BindContainers,
            GetCompCustomsExpenseTypes: GetCompCustomsExpenseTypes,
            filllistItems: filllistItems,
            expensesGridTotal: expensesGridTotal,
            updateGrid: updateGrid
        };
    }();

// page init
CustomsInvoicesManager.Init();
