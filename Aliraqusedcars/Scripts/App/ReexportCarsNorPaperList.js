var pageManager = pageManager || {},
    pageManager = function () {
        var
            _id = '#listItems',

            fillParamters = function () {
                filllistItems();
            },
            Init = function () {
                fillParamters();
                //pageEvents();
            },
            pageEvents = function () {
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    filllistItems();
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
                    revised: $('#Revised').is(':checked'),
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
                saveDataMasterDetails(obj.funName, obj.masterFields, mData, obj.detailFields, childs);
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

            successfullyActivated = function (d) {
                d = d.d;
                if (d.Status) {
                    updateGrid();
                    commonManger.showMessage('تم تنفيذ طلبك', 'تم تنفيذ طلبك بنجاح.');
                } else {
                    commonManger.showMessage('خطأ فى التنفيذ', 'لقد حدث خطأ في تنفيذ الإجراء ، يرجي المحاولة فى وقت لاحق.');
                }
            },
            activateCarPaper = function (cID) {

                var obj = { CarID: cID, actionName: 'ReExportCarsReceive_Paper' },
                    dto = { 'actionName': obj.actionName, 'names': ['CarID'], 'values': [obj.CarID] };

                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', successfullyActivated, commonManger.errorException);
            },

            updateGrid = function () {
                $(_id).DataTable().draw(false);
            },
            filllistItems = function () {

                var pTable = $(_id).DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                        { extend: 'copy', text: 'نسـخ', },
                        {
                            text: 'طباعة',
                            action: function (e, dt, node, config) {
                                window.print();
                            }
                        }
                    ],
                    "bProcessing": true,
                    "bServerSide": true, responsive: true,
                    "bDestroy": true,
                    "bSort": false,

                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "ReExportCars_PaperList" });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "CarID",
                            "bSortable": false
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + d.CarID + '">' + d.MakerNameEn + ' - ' + d.TypeNameEn + ' - ' + d.Year + '</a>';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return d.Shipper ? d.Shipper : '';
                            }
                        },
                        {
                            "mData": function (d) {
                                return d.full_name ? '<a title="حساب العميل" href="ClientCars.aspx?id=' + d.ClientID + '">' + d.full_name + '</a>' : '';
                            },
                            "bSortable": true,
                            "sClass": "v-middle",
                        },
                        {
                            "mDataProp": "CustomsDate",
                            "bSortable": true,
                            "sClass": "v-middle",
                            "mData": function (oObj) {
                                return commonManger.formatJSONDateCal(oObj['CustomsDate']);
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "center",
                            "mData": function (d) {
                                return '<a data-id="' + d.CarID + '" class="btn btn-mini btn-success btnReceive" data-rel="tooltip" title="استلام ورق السيارة من العميل"><i class="icon-ok icon-only"></i></a>';
                            }
                        }]
                });



                // apply grid actions
                $(_id + " tbody").delegate("tr a.btnReceive", "click", function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();

                    // get car id of the selection row
                    var self = $(this),
                        _id = self.attr('data-id');
                    
                    if (_id) {
                        // show receive paper
                        // confirm receiving from 
                        bootbox.confirm('هل أنت متأكد من استلام ورق السيارة مرة أخري من العميل؟', function (result) {
                            if (result) {
                                activateCarPaper(_id);
                            }
                        });// end confirm
                    } // end fi
                }); // end click event

            };

        return {
            Init: Init
        };
    }();