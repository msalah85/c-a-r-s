var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            from = null, to = null, _id = '#listItems', exId = null,

            fillParamters = function () {

                bindQS();

                filllistItems();
            },
            bindQS = function () {
                var qs = commonManger.getQueryStrs();

                if (qs['id'] !== undefined && qs['id'] !== null && qs['id'] !== '') {
                    // bind dates from/to
                    $('#From').val(qs['from']); $('#To').val(qs['to']); $('#ExportID').val(qs['id']);
                    if (qs['re'] === 'true') {
                        $('#Revised').attr('checked', qs['re']);
                        $('.btnSave').hide();
                    } // get data
                }
            },
            Init = function () {
                fillParamters();
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    filllistItems();
                });
                $('.btnSave').click(function (e) {
                    e.preventDefault();
                    bootbox.confirm('هل أنت متأكد من حفظ ملف الجمارك/التأمينات', function (result) {
                        if (result) {
                            startSaveFile();
                        }
                    });
                });
            },
            startSaveFile = function () {
                // handle required data.
                var obj = { // master
                    exportID: $('#ExportID').val(),
                    funName: 'ReExportInvoices_Save',
                    dateFrom: commonManger.dateFormat($('#From').val()),
                    dateTo: commonManger.dateFormat($('#To').val()),
                    carsNo: $('.carsNo').text().replace('# ', ''),
                    totalCustoms: $('.carsCustoms').text().replace(' $', ''),
                    customsNo: $('.noCustoms').text().replace('# ', ''),
                    totalrealCustoms: $('.customsTotal').text().replace(' د.إ', ''),
                    revised: 0, //$('#Revised').is(':checked'),
                    masterFields: ['ExportID', 'DateFrom', 'DateTo', 'NoCars', 'NoCustoms', 'TotalAmount', 'RealAmount', 'Revised'],
                    detailFields: ['CarID', 'CustomsNo', 'GroupTotalAmount']
                }, // child data.
                mData = [obj.exportID, obj.dateFrom, obj.dateTo, obj.carsNo, obj.customsNo, obj.totalCustoms, obj.totalrealCustoms, obj.revised],
                childs = [], lastRealCustVal = 0, lastRealCustNo = null;


                $(_id + ' tbody tr').each(function () {
                    var $this = $(this), _tdcID = $this.find("td:eq(0) a").data('id'), _tdNo = $this.find("td:eq(3)").text(), _tdCust = $this.find("td:eq(5) input").val();
                    if (lastRealCustNo === _tdNo) {
                        _tdCust = lastRealCustVal;
                    }
                    else {
                        lastRealCustVal = _tdCust; lastRealCustNo = _tdNo;
                    }
                    // add current record.
                    childs.push(_tdcID + ',' + _tdNo + ',' + _tdCust);
                });

                // start save all
                if (obj.dateFrom != '' && obj.dateTo != '' && obj.totalrealCustoms * 1 > 0)
                    saveDataMasterDetails(obj.funName, obj.masterFields, mData, obj.detailFields, childs);
                else
                    commonManger.showMessage('بيانات مطلوبة:', 'يرجي التأكد من تاريخ البيان من وإلى ، وإجمالى المبلغ المسترد أولاً.')
            },
            savedAction = function (d) {
                d = d.d;
                if (d.Status) {
                    commonManger.showMessage('تم الحفظ', d.message);
                    window.location.href = 'ReExportCarsPrint.aspx?id=' + d.ID;
                }
                else {
                    commonManger.showMessage('خطأ أثناء الحفظ', 'لقد حدث خطأ أثناء عملية .. ' + d.message);
                }
            },
            saveDataMasterDetails = function (actionName, masterFields, masterValues, fieldsDetails, detailsValues) {
                var DTO = { 'values': masterValues, 'actionName': actionName, 'Parm_names': masterFields, 'fieldsDetails': fieldsDetails, 'valuesDetails': detailsValues, 'flage': '1' };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'SaveDataMasterDetails', savedAction, commonManger.errorException);
            },
            sumInvoiceTotal = function () {
                var tot = 0;
                $(_id + ' tbody tr').each(function () {
                    var itmVal = $(this).find('td:nth-child(6):visible input.span12:not(disabled)').val();
                    if (itmVal)
                        tot += itmVal * 1;
                });
                $(_id + ' tfoot th:eq(5),.customsTotal').html(tot.toFixed(2) + ' د.إ');
            },
            successfullyActivated = function (d) {
                d = d.d;
                if (d.Status) {
                    filllistItems();
                    commonManger.showMessage('تم تنفيذ طلبك', 'تم تنفيذ طلبك بنجاح.');
                } else {
                    commonManger.showMessage('خطأ فى التنفيذ', 'لقد حدث خطأ في تنفيذ الإجراء ، يرجي المحاولة فى وقت لاحق.');
                }
            },
            activateCarInList = function (cID, isActive) {
                var obj = { CarID: cID, Active: isActive, actionName: 'ReExportCars_Activate' },
                dto = { 'actionName': obj.actionName, 'names': ['CarID', 'Active'], 'values': [obj.CarID, obj.Active] };
                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', successfullyActivated, commonManger.errorException);
            },
            alertConfirmation = function (a) {
                return 'هل أنت متأكد من ' + (a ? 'اضافة' : 'إلغاء') + ' جمارك السيارة التى تم ختيارها؟';
            },
            filllistItems = function () {
                from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val()), exId = $('#ExportID').val();
                var pTable = $(_id).DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                        { extend: 'copy', text: 'نسـخ', },
                        {
                            text: 'طباعة',
                            action: function (e, dt, node, config) {
                                $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                                window.print();
                            }
                        }
                    ],
                    "bProcessing": true,
                    "bServerSide": true, responsive: true, responsive: true,
                    "bDestroy": true,
                    "bSort": false,
                    "sAjaxSource": "ReExportCarsList.aspx/LoadData",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "From", "value": from }, { "name": "To", "value": to }, { "name": "id", "value": ((exId * 1) > 0 ? exId : null) });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); countRowSpan(); }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var tot = 0, carsCount = 0;
                        for (var i = 0; i < aData.length; i++) { // customs total for active cars
                            if (aData[i]["Active"]) {
                                tot += aData[i]["CustomsOnCar"] * 1;
                                //repaid += aData[i]["GroupTotalAmount"] * 1;
                                carsCount++;
                            }
                        }
                        $(nFoot).find('th:eq(2)').html(tot.toFixed(2) + ' $');
                        $('.carsCustoms').html(tot.toFixed(2) + ' $');
                        $(nFoot).find('th:eq(1)').html('# ' + carsCount);
                        $('.carsNo').html('# ' + carsCount);
                    },
                    "createdRow": function (row, data, index) {
                        if (!data['Active']) { // cancel car from customs
                            if (data['ContainerActiveCount'] <= 0) {
                                $('td', row).addClass('line-thro'); $('input', row).addClass('disabled').attr('disabled', true);
                            }
                            else {
                                $('td', row).eq(1).addClass('line-thro');
                                $('td', row).eq(2).addClass('line-thro');
                            }
                        }
                    },
                    "orderCellsTop": true,
                    "rowsGroup": [3, 4, 5],
                    "iDisplayLength": 100,
                    "aoColumns": [
                        {
                            "bSortable": false,
                            "sClass": "center hidden-print",
                            "mData": function (d) {
                                return '<a data-id="' + d.CarID + '" class="btn btn-mini btn-' + (d.Active ? 'danger' : 'info') + ' remove" data-rel="tooltip" data-placement="top" data-original-title="' + (d.Active ? 'إلغاء' : 'اضافة') + ' قيمة جمرك السيارة" title="' + (d.Active ? 'إلغاء' : 'اضافة') + ' قيمة جمرك السيارة"><i class="icon-' + (d.Active ? 'remove' : 'share-alt') + ' icon-only"></i></a>';
                            }
                        },
                        {
                            "mDataProp": "CarID",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.MakerNameEn + ' - ' + d.TypeNameEn + ' - ' + d.Year;
                            }
                        },
                        {
                            "mData": "CustomsOnCar",
                            "sClass": "hidden-print",
                            "bClass": function (d) {
                                return d.Active ? '' : 'line-thro';
                            },
                            "bSortable": false
                        },
                        {
                            "mData": "CustomsNo",
                            "bSortable": true,
                            "sClass": "v-middle",
                        },
                        {
                            "mDataProp": "CustomsNo",
                            "bSortable": true,
                            "sClass": "v-middle",
                            "mData": function (oObj) {
                                return commonManger.formatJSONDate(oObj['CustomsDate']);
                            }
                        },
                        {
                            "mDataProp": "CustomsNo",
                            "bSortable": false,
                            "sClass": "v-middle hidden-print",
                            "mData": function (d) {
                                return '<input type="text" class="form-control span12" value="' + (d.GroupTotalAmount ? d.GroupTotalAmount : 0) + '" title="اضف المبلغ المسترد" />';
                            }
                        }]
                });
                $(document).off('click.pageManager');
                $(_id + " tbody").delegate("tr a", "click", function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    var self = $(this), aData, pos = self.closest('tr').index();
                    if (pos !== null) {
                        if (self.hasClass('remove')) {
                            aData = pTable.row(pos).data();
                            var _cid = self.data('id'), _active = aData["Active"] ? false : true;
                            bootbox.confirm(alertConfirmation(_active), function (result) {
                                if (result) {
                                    activateCarInList(_cid, _active);
                                }
                            });
                        }
                    }
                });
                $(_id + " tbody").delegate("tr input.span12", "change", function (e) {
                    sumInvoiceTotal();
                });
            },
            countRowSpan = function () { // # of active containers
                var n = $(_id + ' tbody tr td:nth-child(4):visible:not(.line-thro)').length; $(_id + ' tfoot th:eq(3),.noCustoms').text('# ' + n);
                sumInvoiceTotal();
            };


        return {
            Init: Init
        };


    }();


pageManager.Init();