var
    pageManager = pageManager || {},
    pageManager = function () {

        var
            // variables
            pageElem = {}, cTable = null,


            // methods
            init = function () {
                initPageElemnts();
                pageEvents();
            },
            initPageElemnts = function () {

                // page elements
                pageElem = {
                    modalId: '#addModal',
                    allModalElm: $('#divMyForm input,#divMyForm textarea'),
                    rendDetailsID: $('#RentDetailsID'),
                    addNewBtn: $('a.addition'),
                    saveCheckBtn: $('button.btnAddRow'),
                    SaveAll: $('#SaveAll'),
                    totalAmounts: $('#TotalAmount'),
                    RentID: $('#RentID'),
                    deleteBtn: '<button class="btn btn-minier btn-danger remove" title="حــذف"><i class="icon-remove"></i></button>',
                    editBtn: '<button class="btn btn-minier btn-info edit" title="تعديل"><i class="icon-edit"></i></button>',
                    tableRowIndex: $('[name=RowIndex]'),
                },
                cTable = $('#listItems').DataTable({
                    "sDom": "<'row'>t<'row'>",
                    retrieve: true, searching: false, paging: false, sort: false,
                    "columnDefs": [{ "targets": [0], "visible": false }]
                });


                // id to edit 
                var qs = commonManger.getUrlVars();
                if (qs.id) {
                    var iD = decodeURIComponent(qs.id);
                    pageElem.RentID.val(iD);
                    getRentDetails(iD)
                }
            },
            getRentDetails = function (rentId) {
                var dto = { actionName: 'Rents_Details', value: rentId },
                    showData = function (data) {
                        var allData = commonManger.comp2json(data.d), jsn = allData.list, jsn1 = allData.list1;


                        // master info
                        $.each(jsn, function (k, v) {
                            var ctrl = $('#' + k);

                            if (ctrl.hasClass('date-picker')) { // date format
                                ctrl.val(commonManger.formatJSONDateCal(v, 'dd/MM/yyyy'));
                            }
                            else if (ctrl.hasClass('money')) { // money format
                                ctrl.val(numeral(v).format('0'));
                            }
                            else
                                ctrl.val(v);
                        });


                        // details grid
                        $(jsn1).each(function (i, item) {

                            var ctrolIDs = commonManger.returnFiledsNames("divMyForm"), elemnts = [];

                            // get row details
                            for (var i = 0; i < ctrolIDs.length; i++) {
                                elemnts.push(item[ctrolIDs[i]]);
                            }

                            // handle data as an array
                            elemnts[1] = numeral(elemnts[1]).format('0');
                            elemnts[2] = commonManger.formatJSONDateCal(elemnts[2], 'dd/MM/yyyy'); // date format

                            if (item.ReceiptID)
                                elemnts.push(''); // prevent editing
                            else
                                elemnts.push(pageElem.editBtn + ' ' + pageElem.deleteBtn);

                            // insert to table
                            cTable.row.add(elemnts).draw();

                            gridTotalAmount();
                        });

                    };


                dataService.callAjax('POST', JSON.stringify(dto), sUrl + 'GetData', showData, commonManger.errorException);
            },
            resetModalForm = function () {
                pageElem.allModalElm.val('');
                pageElem.rendDetailsID.val(0);
                pageElem.tableRowIndex.val(-1);
            },
            validateModalForm = function () {
                var isValid = true;

                pageElem.allModalElm.each(function () {
                    var _this = $(this);
                    if (_this.hasClass('required') && _this.val() === '') {
                        isValid = false;
                        _this.closest('div.control-group').addClass('error');
                    } else {
                        _this.closest('div.control-group').removeClass('error').addClass('info');
                    }
                });

                return isValid;
            },
            pageEvents = function () {
                pageElem.addNewBtn.click(function (e) {
                    e.preventDefault();

                    // reset form
                    resetModalForm();

                    // show modal
                    showHideModal(true);
                });


                // save check
                pageElem.saveCheckBtn.click(function (e) {
                    e.preventDefault();

                    var isValidForm = validateModalForm();
                    if (isValidForm) {
                        startAddCheck();
                    }

                });

                // remove row
                $("#listItems tbody").delegate("tr button.remove", "click", function (event) {
                    event.preventDefault();
                    var self = $(this), pos = self.closest('tr');
                    if (pos) {
                        var doDelete = function () {
                            var row = cTable.row(pos);
                            row.remove().draw();
                            gridTotalAmount();
                        };

                        DeleteConfirmation(doDelete);

                    }
                });

                // edit row
                $("#listItems tbody").delegate("tr button.edit", "click", function (event) {
                    event.preventDefault();
                    var self = $(this), pos = self.closest('tr');
                    if (pos) {
                        var row = cTable.row(pos).data();

                        //reset modal form
                        resetModalForm();

                        pageElem.tableRowIndex.val(pos.index());


                        // bind all elements with id on form
                        $('#divMyForm [id]').each(function (i, item) {
                            $(this).val(row[i]);
                        });

                        // show modal
                        showHideModal(true);

                    }
                });

                // save all
                pageElem.SaveAll.click(function (e) {
                    e.preventDefault();

                    var formId = 'aspnetForm',
                        checkMe = applyValidation(formId);


                    if (checkMe) {
                        var fieldsDetails = commonManger.returnFiledsNamesToSave("divMyForm"),
                            valuesDetails = [];


                        cTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
                            var row = this.data();
                            row.pop(); // remove latest cell

                            // handle date format
                            if (row[2]) {
                                row[2] = commonManger.dateFormat(row[2], 'D/M/YYYY', 'MM/DD/YYYY');
                            }

                            var rowStr = row.join(',');
                            valuesDetails.push(rowStr);
                        });

                        commonManger.SaveDataMasterDetails("", formId, succesSaveAll, "", fieldsDetails, valuesDetails, "Rents_Save", "1");
                    }
                });
            },
            applyValidation = function (formId) {
                var isValid = true;
                $('#' + formId + ' .required').each(function () {
                    if ($(this).val() === '')
                        isValid = false
                });

                return isValid;
            },
            showHideModal = function (show) {
                if (show)
                    $(pageElem.modalId).modal('show');
                else
                    $(pageElem.modalId).modal('hide');
            },
            startAddCheck = function () {
                var
                    elemnts = [],
                    ctrolIDs = commonManger.returnFiledsNames("divMyForm"),
                    rentDetailsID = $('#RentDetailsID').val() * 1,
                    row_index = pageElem.tableRowIndex.val() * 1;

                // get row details
                for (var i = 0; i < ctrolIDs.length; i++) {
                    elemnts.push($('#' + ctrolIDs[i]).val());
                }


                elemnts.push(pageElem.editBtn + ' ' + pageElem.deleteBtn);



                // add to table
                if (row_index > -1) {
                    // update old row
                    var TR = $('#listItems tbody tr:eq(' + row_index + ')'); // row tr

                    if (TR)
                        cTable.row(TR).data(elemnts).draw();
                } else {
                    // add as a new
                    cTable.row.add(elemnts).draw();
                }

                commonManger.showMessage('تمت الاضافة:', 'تم اضافة الشيك بنجاح.');

                // finish touch
                showHideModal(false);
                fireGridTooltip();
                gridTotalAmount();
            },
            gridTotalAmount = function () {
                var totalAmount = 0,
                    rowsTotal = cTable.column(1).data().each(function (value, index) {
                        totalAmount = totalAmount + (value * 1);
                    });

                pageElem.totalAmounts.val(totalAmount);

                if (totalAmount > 0) {
                    pageElem.SaveAll.removeClass('hidden');
                } else {
                    pageElem.SaveAll.addClass('hidden');
                }
            },
            fireGridTooltip = function () {
                $('[data-rel="tooltip"]').tooltip();
            },
            succesSaveAll = function (data) {
                data = data.d;
                if (data.Status) {
                    commonManger.showMessage('تم الحفظ', data.message);
                    window.location.href = 'CompanyRents.aspx?id=' + data.ID;
                }
                else {
                    if (data.message.indexOf('The duplicate key value is') > 0) // منع تكرار رقم الحوالة مع شركة الصرافة والتاريخ
                        commonManger.showMessage('خطأ بالحفظ:', 'رقم الحوالة الذى ادخلته موجود بالفعل فى الحوالات مع اسم شركة الصرافة، برجاء اختيار رقم حوالة آخر أو شركة صرافة أخري.');
                    else // general message
                        commonManger.showMessage('خطأ بالحفظ:', data.message);
                }
            };


        // returned class
        return {
            Init: init
        };
    }();