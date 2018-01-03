
// get employees
formName = 'formMain';
modalDialog = "addModal";
tableName = "SalariesTotal";
pKey = "ID";
gridId = "listItems";
gridColumns = [];
TitlePage = 'راتب لموظف';


var _id = commonManger.getQueryStrs()['id'],
    $userID = $("#UserID"),
    $month = $("#Month"),
    $year = $("#Year"),


    showEmps = function (data) {
        var jsnData = commonManger.comp2json(data.d),
            jsn = jsnData.list;

        if (jsn !== undefined) {
            $(jsn).each(function () {
                $userID.append($("<option />").val(this.UserID).text(this.UserFullName));
            });

            $userID.trigger('chosen:updated');
        }
    },
    oTable = $('#' + gridId).DataTable({
        "sDom": "<'row'>t<'row'>", searching: false, retrieve: true, paging: false, destroy: true,
        "aoColumnDefs": [{ "bVisible": false, "aTargets": [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13] }]
    }),
    getDefaults = function () {
        // default & current month, year.
        var d = new moment(), n = d.format('M'), y = d.format('YYYY'); $month.val(n); $year.val(y);
        // fill employees list
        var t = JSON.stringify({ actionName: "Salaries_Properties" }), e = sUrl + "GetDataDirect"; dataService.callAjax("Post", t, e, showEmps, commonManger.errorException)
    },
    getGridHeader = function () {
        return $("#" + formName).find('input[id],select[id],textarea[id]').map(function () { return this.id; }).get();
    },
    fillDataTable = function () {
        var ifexite = 0, gridTDs = [], gridControls = getGridHeader(), index = $('#UserID').val();
        // validate employee not repeated
        $('#' + gridId + ' tbody tr').find('td:nth-child(1)').each(function () {
            if ($(this).text() === $('#' + gridControls[1] + ' option:selected').text())
                ifexite = 1;
        });
        // bind grid with items from add form.
        for (var i = 0; i < gridControls.length; i++) {
            var Ctype = $('#' + gridControls[i]).prop('type');
            if (Ctype === "select-one") {
                gridTDs.push($('#' + gridControls[i] + ' option:selected').text());
                gridTDs.push($('#' + gridControls[i]).val());
            }
            else if (gridControls[i].indexOf('otal') > 0) {
                gridTDs.push(numeral($('#' + gridControls[i]).val()).format('0,0.00'));
            }
            else {
                gridTDs.push($('#' + formName + ' #' + gridControls[i]).val());
            }
        }

        if (ifexite !== 1) { // new
            gridTDs.push('<button data-id="' + index + '" class="btn btn-minier btn-info edit" data-rel="tooltip" title="تعديل"><i class="icon-edit"></i></button> <button class="btn btn-minier btn-danger remove" data-rel="tooltip" title="حــذف"><i class="icon-remove"></i></button>');

            oTable.row.add(gridTDs).draw(false);
        } else { // edit

            // update only the salary of this employee
            var obj = {
                _trIndex: $('button[data-id=' + index + ']').closest('tr'), //.index(),
                salValue: numeral($('#Total').val()).format('0,0.00')
            }

            $(gridTDs).each(function (i, v) {
                if (i > 2)
                    oTable.cell(obj._trIndex, i).data(gridTDs[i]).draw(); // 12 is column total salary index.
            });
        }
        gridTDs = [];

        // total salaries
        setSalariesTotal();

        // finish save
        $('#' + modalDialog).modal('hide');
        commonManger.showMessage('تم الاضافة بنجاح:', 'تمت عملية الاضافة بنجاح.');
    },
    setSalariesTotal = function () {
        var ttal = ($('#Commission').val() * 1);

        $('#' + gridId + ' tbody tr').find('td:nth-child(2)').each(function () {
            ttal += numeral().unformat($(this).text());
        });

        $('#TotalAmount').val(numeral(ttal).format('0,0.00'));

        if (ttal > 100) // show save button
            $('#SaveAll').removeClass('hidden');
        else
            $('#SaveAll').addClass('hidden');
    },
    resetSalaryForm = function () {
        $('#UserID').val('').trigger('chosen:updated');
        $('#' + formName + ' input[id]').val(0);
        $('#' + formName + ' textarea').val('');
        $('#' + formName + ' #RepayAmount').attr('data-val', 0);
    },
    sumSalaryTotal = function () {
        var totalPoints = 0;

        $('input[name$=plus]').each(function () { // الزيادات
            totalPoints += numeral().unformat($(this).val());
        });

        $('input[name$=minus]').each(function () { // الخصومات
            totalPoints -= numeral().unformat($(this).val());
        });

        $('#Total').val(totalPoints); // الاجمالى
    },
    showEmpDefaults = function (data) {
        var jsnData = commonManger.comp2json(data.d),
            jsn = jsnData.list;

        if (jsn !== undefined) {
            $('#DefaultSalary').val(numeral(jsn.DefaultSalary).format('0.00'));
            $('#Housing').val(numeral(jsn.Housing).format('0.00'));
            $('#Other').val(numeral(jsn.Other).format('0.00'));
            $('#Perks').val(numeral(jsn.Perks).format('0.00'));
            $('#SalaryIncrease').val(numeral(jsn.SalaryIncrease).format('0.00'));
            $('#Travel').val(numeral(jsn.Travel).format('0.00'));
            $('#RepayAmount,.advBalance').attr('title', 'رصيد السلف على الموظف: ' + numeral(jsn.AdvancesBalance).format('0,0.00') + ' درهم').
                attr('data-original-title', 'رصيد السلف على الموظف: ' + numeral(jsn.AdvancesBalance).format('0,0.00') + ' درهم').
                attr('data-val', jsn.AdvancesBalance);

            sumSalaryTotal();// total
        }
        else
            $('#' + formName).find('textarea,input[id]').val(0); //resetSalaryForm();
    },
    successSave = function (data) {
        data = data.d;

        if (data.Status)
            window.location.href = 'hr/salaries.aspx';
        else
            commonManger.showMessage('خطأ بالحفظ', 'برجاء التحقق من الرواتب والمحاولة مرة أخرى.' + data.message);
    },
    bindDataGrid = function (d) {
        $(d).each(function (i, item) {
            oTable.row.add(item).draw(false);
        });
    },
    bindmyData = function (data) {
        var jsnData = commonManger.comp2json(data.d),
            jsn = jsnData.list,
            jsn1 = jsnData.list1;

        if (jsn1) {
            $(jsn1).each(function (i, item) {
                var __list = []; // handle data for grid
                __list.push(
                    item.ID,
                    item.UserFullName,
                    item.UserID,
                    item.DefaultSalary,
                    item.SalaryIncrease,
                    item.Housing,
                    item.Travel,
                    item.Perks,
                    item.Other,
                    item.Deduct,
                    item.RepayAmount,
                    item.AdvanceAmount,
                    numeral(item.Total).format('0,0.00'),
                    item.Notes, (jsn.Revised === 'false' ? '<button data-id="' + item.UserID + '" class="btn btn-minier btn-info edit" data-rel="tooltip" title="تعديل"><i class="icon-edit"></i></button> <button class="btn btn-minier btn-danger remove" data-rel="tooltip" title="حــذف"><i class="icon-remove"></i></button>' : '---')
                );

                oTable.row.add(__list).draw(false);
            });

            // total salaries
            setSalariesTotal();
        }

        if (jsn) {
            $('#masterForm #ID').val(jsn.ID);
            $('#AddDate').val(commonManger.formatJSONDateCal(jsn.AddDate));
            //$('#CheckNo').val(jsn.CheckNo);
            $('#Year').val(jsn.Year);
            $('#Month').val(jsn.Month);


            // hide save
            if (jsn.Revised == 'true') {
                $('#Revised').prop('checked', true);
                $('#SaveAll').addClass('hidden');
            }
        }
    },
    getSalaryFile = function () {
        if (_id !== undefined && _id > 0) {
            var functionName = "Salaries_GetDetails", dto = { 'actionName': functionName, 'value': _id };
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindmyData, commonManger.errorException);
        }
    },
    applyValidation = function () {
        var valid = false, $advRepay = $('#RepayAmount'), balnceAdvances = parseFloat($advRepay.attr('data-val')), enteredAdvanceRepay = parseFloat($advRepay.val().replace(',', ''));
        if (enteredAdvanceRepay <= balnceAdvances)
            valid = true;
        return valid;
    };


// Events
// fire modal for add
$('#btnAddNew').click(function (e) {
    e.preventDefault();
    resetSalaryForm();
    $('#addModal').modal('show');
    $('#addModal .modal-header h3').html('<i class="icon-plus"></i> اضافة راتب موظف');
});

// salary defaults
$userID.change(function () {
    var selectedVal = $(this).val();
    if (selectedVal > 0) {
        var t = JSON.stringify({ actionName: "Salaries_GetEmpDefaults", value: selectedVal }), e = sUrl + "GetData"; dataService.callAjax("Post", t, e, showEmpDefaults, commonManger.errorException);
    }
    else
        resetSalaryForm();
});

// sum total
$('#' + formName + ' input[type=number]').change(function () {
    sumSalaryTotal();
});

// add emp salay
$('#' + modalDialog + ' .modal-footer .btn-success').click(function (e) {
    e.preventDefault();
    var isValid = applyValidation();
    if ($('#UserID').val() !== '')
        if (isValid)
            fillDataTable();
        else
            commonManger.showMessage('التحقق من البيانات', 'مبلغ سداد السلفة يكون اقل أو يساوى رصيد السلف.');
    else
        commonManger.showMessage('التحقق من البيانات', 'برجاء التحقق من اختيار الموظف.');
});

// delete from grid 
$('#' + gridId + ' tbody').delegate("tr button", "click", function (event) {
    event.preventDefault();
    var self = $(this), pos = self.closest('tr').index();

    //var aData;
    if (pos !== null) {
        if (self.hasClass('remove')) {
            DeleteConfirmation(function () {
                oTable.row(self.closest('tr')).remove().draw();
                // total salaries
                setSalariesTotal();
            })
        } else if (self.hasClass('edit')) {
            commonManger.ResetControls(formName); // reset
            $('input[name=minus]').val(0);

            var user_id = $(this).attr('data-id');
            $('#' + modalDialog).modal('show');
            $('#UserID').val(user_id).trigger('chosen:updated').change();
        }
    }
});

// save master/details
$('#SaveAll').click(function (e) {
    e.preventDefault();

    var fieldsDetails = getGridHeader(),
        valuesDetails = [];


    oTable.rows().every(function () {
        var itm = $.map(this.data(), function (n, i) {
            if (i !== 1 && i !== 14)
                return n.replace(/,/g, '');
        }).join(',');

        valuesDetails.push(itm);
    });

    commonManger.SaveDataMasterDetails("", "masterForm", successSave, "", fieldsDetails, valuesDetails, "SalariesTotal_Save", "1");
});


$('#Commission').blur(function () {
    setSalariesTotal();
});

// select
$('input[type="text"]').on('focus click', function () { $(this).select(); });

// Itialize me
getDefaults();
getSalaryFile();