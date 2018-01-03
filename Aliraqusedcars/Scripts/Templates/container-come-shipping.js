$.fn.editable.defaults.mode = 'popup';

var
    CarsLateShipping = function () {
        var shipper = '',
            distination = '',
            allContriners = commonManger.getQueryStrs().all,

            Init = function () {
                // change list title with neer comming
                if (allContriners > 0) {
                    var _title = 'اقتراب وصول حاويات';
                    $('li.active,.page-header h1').text(_title);
                    document.title = _title;
                }

                filllistItems();
                workPerform();
                setDataToSearch();
            },

            workPerform = function () {
                // save arrival date
                $('#carArrive .modal-footer button.btn-success').live('click', function (e) {
                    e.preventDefault();

                    $(this).prop('disabled', true).addClass('disabled');

                    startSaveDate();
                });

                // print invoice
                $('#printedModal .modal-footer button.btn-success').live('click', function (e) {
                    e.preventDefault();
                    startSavePrinted();
                });

                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    shipper = $('#Shipper').val(), distination = $('#Distin').val();
                    updateGrid();
                });


                $('.test').click(function () {
                    $('#listItems .bol-cell').each(function (k, v) {
                        var $itm = $(v);
                        console.log($itm.text())
                        if ($itm.text() === '958979529') {
                            $itm.closest('tr').find('td:eq(5)').text('Mohamed Salah');
                            var $dateCell = $itm.closest('tr').find('td:eq(5)').text();
                            console.log($dateCell)
                            return false;
                        }
                    });
                });
            },

            startSaveDate = function () {
                // get parameters values
                var no = $('#No').val(),
                    bol = $('#Bol').val(),
                    type = $('#Type').val(),
                    newDateText = $('#ArrivalDate').val(),
                    date = commonManger.dateFormat(newDateText),
                    successCallback = function (data) {
                        data = data.d;

                        // editing date only
                        if (type === '0') {
                            // updating date only without refresh
                            $('#listItems .bol-cell').each(function (k, v) {
                                var $itm = $(v);
                                if ($itm.text() === bol) {
                                    var $tr = $itm.closest('tr');

                                    // animate selected row
                                    $('.recent-saved').removeClass('recent-saved'); // reset
                                    $tr.find('td:eq(5)').text(newDateText).addClass("recent-saved"); // update date

                                    return false;
                                }
                            });
                        }
                        else {
                            // send sms to every client
                            sendSMS(data);

                            // refresh containers list.
                            updateGrid();
                        }


                        // hied modal and show success message
                        $('#carArrive').modal('hide');
                        commonManger.showMessage('تم بنجاح:', 'تم تنفيذ الإجراء بنجاح');
                    };

                // containers
                if (no !== "") {
                    // prepare final param
                    var names = ['no', 'type', 'date', 'Bol'],
                        values = [no, type, date, bol],
                        dtObj = {
                            actionName: 'CarsData_SetArrivalCarContainer',
                            names: names,
                            values: values
                        };

                    dataService.callAjax('Post',
                        JSON.stringify(dtObj),
                        sUrl + 'GetDataList',
                        successCallback,
                        commonManger.errorException);
                }
                else {
                    $('#carArrive').modal('hide');
                    commonManger.showMessage('خطأ بالحفظ:', 'لم يتم حفظ تاريخ الوصول.');
                }


                // enable save button
                $('button.disabled').prop('disabled', false).removeClass('disabled');
            },

            updateGrid = function () {
                var table = $('#listItems').DataTable();
                table.draw(false);
                //table.rowsgroup.update();
            },

            invoicePrintedSuccessfully = function (data) {
                data = data.d;
                if (data.Status) {
                    updateGrid();
                    $('.modal').modal('hide');
                    commonManger.showMessage('تم بنجاح:', 'تم اعتماد طباعة الفاتورة.');
                } else {
                    $('#printedModal').modal('hide');
                    commonManger.showMessage('خطأ بالحفظ:', 'لم يتم اعتماد طباعة الفاتورة.');
                }
            },

            startSavePrinted = function () {
                var no = $('#InvoiceID').val();
                if (no !== "") {
                    var dto = {
                        'actionName': 'ContainerToCom_PrintInvoice',
                        'names': ['id'],
                        'values': [no]
                    };

                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData',
                        invoicePrintedSuccessfully, commonManger.errorException);
                }
                else {
                    $('#printedModal').modal('hide');
                    commonManger.showMessage('خطأ بالحفظ:', 'لم يتم اعتماد طباعة الفاتورة.');
                }
            },

            filllistItems = function () {
                allContriners = (allContriners > 0 ? allContriners : '0'); // default show all=0

                var oaTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
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
                    "language": {
                        "url": "/Scripts/datatable/Arabic.min.js",
                        'search': '_INPUT_',
                        'searchPlaceholder': 'بحث برقم الحاوية - BOL'
                    },
                    "bServerSide": true,
                    ordering: false,
                    //stateSave: true,
                    //responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "orderCellsTop": true,
                    "rowsGroup": [6, 0, 4, 5, 7],
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": 'Containers_SelectListToCome' }, { "name": "names", "value": 'NeerPort~Shipper~Distin' }, { "name": "values", "value": allContriners + '~' + shipper + '~' + distination });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            // get data as json format from xml
                            var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1;

                            // create object for datatables control
                            var objDT = {
                                sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                iTotalRecords: jsn1 ? jsn1.CNT : 0,
                                iTotalDisplayRecords: jsn1 ? jsn1.CNT : 0,
                                aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                            }

                            // bind DT data
                            fnCallback(objDT);

                            // show all containers count
                            if (jsn1) {
                                $('.allContainersCount').text(jsn1.ContCount);
                            }
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var api = this.api(), last = null, containersCount = 0;

                        // loop containers column
                        api.column(6, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                last = group;
                                containersCount++;
                            }
                        });

                        // show page containers count.
                        $('.containersNum').text(containersCount);
                    },
                    "drawCallback": function (settings) {
                        var api = this.api(),
                            rows = api.rows({ page: 'current' }).nodes(),
                            last = null,
                            invHeader = $('#listItems thead').html(),
                            lastIndex = 0,
                            groupValToCheck = '';


                        // sub total after every group
                        api.rows().every(function (rowIdx, tableLoop, rowLoop) {

                            var data = this.data();

                            if (groupValToCheck !== '' && data.ContainerNo !== groupValToCheck) {
                                $(rows).eq(lastIndex).addClass('groupSeparator');
                            }
                            groupValToCheck = data.ContainerNo; lastIndex = rowIdx;
                        });


                        // editable containers notes
                        $('a.editable').editable({
                            emptytext: '+ ملاحظة',
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
                                        commonManger.showMessage('تم الحفظ:', 'تم حفظ الملاحظه بنجاح.');
                                    },
                                    error: function () {
                                        commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                                    }
                                });
                            },
                            display: function (value, sourceData) {
                                if (value) {
                                    $(this).html('<i class="icon-warning-sign orange"></i>');
                                }
                            }
                        });
                    },
                    "aoColumns": [
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return d.ShipCompanyNameEn +
                                    '<a class="hidden-print pull-left" href="javascript:printSaleCarsBill.printBolCars(\'' + d.Bol + '\');" title="طباعة فواتير البيع للسيارات بالحاوية"><i class="icon-print bigger-150"></i></a>';
                            },
                            "sClass": "v-middle",

                        },
                        {
                            "bSortable": false,
                            "mData": function (data) {
                                return `<a href="CarDetailsPrint.aspx?id=${data.CarID}" class="" data-rel="tooltip" title="وصول السيارة">${data.MakerNameEn}-${data.TypeNameEn}-${data.Year}</a>`;
                            }
                        },
                        {
                            "mDataProp": "full_name",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "LotNo",
                            "bSortable": false
                        },
                        {
                            "bSortable": false,
                            "sClass": "v-middle text-center",
                            "mData": "DistinationNameEn"
                        },
                        {
                            "bSortable": false,
                            "sClass": "v-middle text-center",
                            "mData": function (data) {
                                return commonManger.formatJSONDateCal(data.ArrivalDate);
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "v-middle",
                            "mData": function (d) {
                                return (d.InvoicePrinted === 'false' ? d.ContainerNo + '<a class="btn btn-mini hidden-print printMe" title="اعتمد طباعة الفاتورة الآن" data-id="' + d.ShippInvoiceID + '" href="#printedModal"><i class="icon-print"></i></a>' : '<span title="تمت طباعة الفاتورة" class="red">' + d.ContainerNo + '</span>' + (!d.InvoiceNo ? ' <a title="انشاء فاتورة شحن" href="InvoiceShippingAdd.aspx?id=' + d.ShippInvoiceID + '">+فاتورة</a>' : '')) + ' <p title="شركة الملاحة">' + (d.NavigationCoName ? d.NavigationCoName : '') + '</p>';
                            },
                        },
                        {
                            "mDataProp": "Bol",
                            "sClass": "v-middle",
                            "bSortable": true,
                            "mData": function (d) {

                                var addContNotes = '<a title="اضف ملاحظة على الحاوية" data-placement="right" data-type="textarea" data-id="ShippInvoiceID" data-pk="' + d.ShippInvoiceID + '" data-table="ShippInvoices" data-name="ContainersNotes" class="editable tooltip-warning" href="#" data-placeholder="اضافة ملاحظه">' + (d.ContainersNotes ? d.ContainersNotes : '') + '</a>';

                                return '<div class="pull-left options hidden-print"><a href="javascript:void(0);" class="btn btn-minier btn-grey change-date" data-rel="tooltip" data-placement="top" title="تعديل تاريخ الوصول">تعديل تاريخ الوصول</a><a href="javascript:void(0);" class="btn btn-minier btn-success container-come" data-rel="tooltip" data-placement="top" title="توصيل الحاوية">توصيــــل الحـاوية <i class="icon-anchor"></i></a> ' + addContNotes + '</div><div class="bol-cell">' + d.Bol + '</div>';
                            }
                        }]
                });
                //commonManger.searchData(oaTable);

                $("#listItems tbody").delegate("tr a.change-date", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {
                        aData = oaTable.row(pos).data();
                        var cont = aData.ContainerNo,
                            Bol = aData.Bol,
                            title = "تاريخ وصول الحاوية رقم: " + cont,
                            operation = 'insert',
                            modalDialog = 'carArrive';

                        $('#ArrivalDate').val(commonManger.formatJSONDateCal(aData.ArrivalDate));
                        $('#No').val(cont); // container No
                        $('#Bol').val(Bol); // Bol
                        $('#Type').val(0); // Change arrival date
                        $('#aspnetForm .alert').text('برجاء تأكيد تغيير تاريخ وصول الحاوية.');
                        $('#carArrive .btn-success').text('تغيير تاريخ الوصول');

                        // show modal
                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                });

                $("#listItems tbody").delegate("tr a.container-come", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {

                        aData = oaTable.row(pos).data();
                        var cont = aData.ContainerNo,
                            Bol = aData.Bol,
                            title = "توصيل الحاوية رقم: " + cont,
                            operation = 'insert',
                            modalDialog = 'carArrive';

                        $('#ArrivalDate').val(commonManger.formatJSONDateCal(new Date()));
                        $('#No').val(cont); // Container no
                        $('#Bol').val(Bol); // Bol
                        $('#Type').val(1); // Container Arrived
                        $('#aspnetForm .alert').text('برجاء تأكيد توصيل الحاوية.');
                        $('#carArrive .btn-success').text('توصيل الحاوية');

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                });

                $("#listItems tbody").delegate("tr a.printMe", "click", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr'), aData;
                    if (pos !== null) {
                        aData = oaTable.row(pos).data();
                        var cont = aData.ContainerNo, title = "طباعة الفاتورة: ", operation = 'insert', modalDialog = 'printedModal';

                        $('#InvoiceID').val(self.attr('data-id')); // Container no
                        $('#containerNoo').text(cont); // invoice id

                        commonManger.showPopUpDialog(title, operation, modalDialog);
                    }
                });
            },

            BindListSearch = function (d) { // list controls
                var cdata = LZString.decompressFromUTF16(d.d), xml = $.parseXML(cdata), jsn = $.xml2json(xml).list2, jsn1 = $.xml2json(xml).list1;
                // shipper
                if (jsn) {
                    var options = $(jsn).map(function (i, v) { return $('<option />').val(v.ShipMainCompanyID).text(v.ShipMainCompanyNameAr); }).get();
                    $('#Shipper').append(options);
                }
                // distinations
                if (jsn1) {
                    var _options = $(jsn1).map(function (i, v) { return $('<option />').val(v.DistinationID).text(v.DistinationNameAr); }).get();
                    $('#Distin').append(_options);
                }

                // update chosen control
                $('.chzn-select').trigger('chosen:updated').trigger("liszt:updated");
            },

            setDataToSearch = function () {
                var functionName = "ShippInvoices_Properties", DTO = { 'actionName': functionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindListSearch, commonManger.errorException);
            },

            sendSMS = function (data) {
                var jsnData = commonManger.comp2json(data), jsn = jsnData.list;

                if (jsn) {
                    // convert data to array
                    jsn = $.isArray(jsn) ? jsn : $.makeArray(jsn);

                    // if data contains mobile number
                    // start send sms`s to all clients
                    if (jsn[0].phone) {

                        // array one paramter will send to sms sending services 
                        var arrSMS = [];

                        // loop on current phones and create message for every car
                        for (var i = 0; i < jsn.length; i++) {

                            var smsObj = {
                                // sms message contains Car No.
                                message: 'وصول سيارة ' + jsn[i].TypeNameEn + '-' + jsn[i].Year + ' رقم ' + jsn[i].CarID + ' ' + jsn[i].ColorNameAr,
                                // mobile(s) number that will receive the message
                                phones: ((jsn[i].phone && jsn[i].countryCode ? jsn[i].countryCode + jsn[i].phone + ',' : '') +
                                    (jsn[i].phone2 && jsn[i].countryCode2 ? jsn[i].countryCode2 + jsn[i].phone2 : '')).replace(/,(\s+)?$/, '')
                            };

                            arrSMS.push(smsObj.phones + '|' + smsObj.message + '|' + jsn[i].full_name);

                        } // end for


                        // call web service
                        var url = "sms-templates.aspx/BulkSMS", dtObject = { messages: arrSMS };
                        dataService.callAjax('Post', JSON.stringify(dtObject), url, successSentData, commonManger.errorException);
                    } // end sending
                }
            },

            successSentData = function (data) {
                data = data.d;

                var sentMessage = '';

                // create user notofication
                for (var i = 0; i < data.length; i++) {

                    // cliet name and sending results
                    var msgClient = data[i].split('|');

                    // success sending the message
                    if (msgClient[0].indexOf('Successful') > 0)
                        sentMessage += '<p>تم ارسال رسالة لجوال العميل: ' + msgClient[1] + '</p>';
                    else
                        sentMessage += '<p>لم ترسل رسالة لجوال العميل: ' + msgClient[1] + '</p>';
                }

                if (sentMessage !== '')
                    commonManger.showMessage('تم توصيل الحاوية بنجاح:', sentMessage);
            };

        return {
            Init: Init
        };

    }();