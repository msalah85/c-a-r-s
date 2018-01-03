var
    ShippInvoicesManager = function () {
        var
            id = '', _shipperId = "", gridUpdatedFlag = "",
            lloadingVal = '', sshippingVal = '', transportPrice = '',

            oaTable = $('#listItems').DataTable({
                "sDom": "t",
                "bDestroy": true, "iDisplayLength": 50,
                "bLengthChange": false,
                "bSortable": false, "bSort": false,
                "columnDefs": [{ "targets": [0], "visible": false }, { "targets": [1], "visible": false }, { "targets": [14], "visible": false }, { "targets": [15], "visible": false }, { "targets": [16], "visible": false }]
            }),

            $shipperSelect = $('select[id$=ddlShipper'),
            $distinationSelect = $('select[id$=ddlDistination]'),
            $cars = $('input[id$=ChassisNo]'),
            $bol = $('input[id$=txtBol]'),
            $containerN = $('input[id$=txtContainerNo]'),


            init = function () {
                GetBolDetails();
                activeEvents();
            },
            activeEvents = function () {
                // get invoice by BOL No.
                $bol.on('change', GetBolDetails);

                // update loading & O.F
                $('#txtLoadingCost, #txtShippPrice, #TransportationPrice').on('blur', function (e) {
                    e.preventDefault();

                    var cCount = $('#CarsNo').val(),
                        lloadingVal = $('#txtLoadingCost').val(),
                        sshippingVal = $('#txtShippPrice').val(),
                        transportPrice = $('#TransportationPrice').val();

                    if ((lloadingVal * 1) > -1 && (sshippingVal * 1) > -1 && (transportPrice * 1) > -1 && cCount > 0) {

                        // show alert if loading = 0
                        if ((lloadingVal * 1) <= 0) {
                            commonManger.showMessage('لم تتم عملية التحديث', 'برجاء التأكد من  قيمة التحميل أكبر من الصفر.');
                            return;
                        }

                        if (ApplyValidation()) { // validation
                            var url = sUrl + "GetDataList",
                                DTO = {
                                    'actionName': "ShippInvoices_UpdateInvoiceExpens",
                                    'names': ['id', 'load', 'shipp', 'trans', 'count'],
                                    'values': [$('#ShippInvoiceID').val(), lloadingVal, sshippingVal, transportPrice, cCount]
                                },
                                dto = JSON.stringify(DTO);

                            dataService.callAjax('POST', dto, url, successCallback2,
                                commonManger.errorException);
                        }
                    } else {
                        commonManger.showMessage('لم تتم عملية التحديث', 'برجاء التأكد من  قيمة التحميل، الشحن البحري، ,التحميل وعدد السيارات أكبر من الصفر.'); return false;
                    }
                });

                // save car in invoice
                $('button.btnAddCar').on('click', function (e) { // Save shipping car.
                    e.preventDefault();
                    if (ApplyValidation()) { // custom validation
                        var url = 'InvoiceShippingAdd.aspx/SaveShippCar',
                            scParam = {};

                        scParam.BillDetailsID = $('#BillDetailsID').val();
                        scParam.CarID = $('#CarID').val();
                        scParam.ShippInvoiceID = $('#ShippInvoiceID').val();
                        scParam.Towing = $('#txtTowingCost').val();
                        scParam.Notes = $('#Notes').val();

                        var _seaTrans = $('input[id$=txtShippPrice]').val(),
                            _loading = $('input[id$=txtLoadingCost]').val(),
                            _carsNo = $('input[id$=CarsNo]').val(),
                            _trans = $('input[id$=TransportationPrice]').val();


                        scParam.SeaTrans = _seaTrans / _carsNo;
                        scParam.Loading = _loading / _carsNo;
                        scParam.Transportation = _trans / _carsNo;

                        scParam.Partitioning = $('#txtCuttingCost').val() !== "" ? $('#txtCuttingCost').val() : 0;
                        scParam.Extra = $('#txtExtraCost').val() !== "" ? $('#txtExtraCost').val() : 0;

                        var DTO = { 'scParam': scParam };
                        if (scParam.CarID !== '' && (_carsNo * 1 > 0) && _seaTrans !== "" && _loading !== "") {
                            if (applyTowingValidation()) // validate towing
                                dataService.callAjax('Post', JSON.stringify(DTO), url, successCallback, commonManger.errorException);
                        }
                    }
                });

                // save invoice
                $('a.btnFinish').on('click', function (e) { // Save shipping invoice
                    e.preventDefault();
                    if (ApplyValidation()) { // custom validation
                        var url = 'InvoiceShippingAdd.aspx/SaveInvoice',
                            scParam = {
                                IsDeleted: false,
                                ShippInvoiceID: $('#ShippInvoiceID').val(),
                                CarsNo: $('input[id$=CarsNo]').val(),
                                ContainerNo: $('input[id$=txtContainerNo]').val(),
                                InvoiceDate: commonManger.dateFormat($('input[id$=txtBillDate]').val()),
                                InvoiceNo: $('input[id$=txtBillNo]').val(),
                                ShippPrice: $('input[id$=txtShippPrice]').val(),
                                LoadingPrice: $('input[id$=txtLoadingCost]').val(), // مبلغ التحميل
                                TransportationPrice: $('input[id$=TransportationPrice]').val(), // قيمة نقل الحاوية
                                TotalAmount: $('#lblInvoiceTotal').text(),//اجمالى الفاتورة
                                ShipperID: $('select[id$=ddlShipper] option:selected').val(),
                                ContainerSize: $('select[id$=ddlContainerSize] option:selected').val(),
                                DistinationID: $('select[id$=ddlDistination] option:selected').val(),
                                ArrivalDate: $('input[id$=txtArriveDate]').val() !== "" ? commonManger.dateFormat($('input[id$=txtArriveDate]').val()) : null,
                                Bol: $('input[id$=txtBol]').val(),
                                NavigationCoID: $('#NavigationCoID').val(),
                                Notes: $('#txtNotes').val(),
                                IsBol: $('#IsBol').val()
                            };

                        // no of car added to this invoice
                        var gridCarsNo = $('#listItems tbody tr').length, DTO = { 'scParam': scParam };
                        if (scParam.ShipperID !== undefined && scParam.ShipperID !== "" && scParam.CarsNo !== "" && scParam.InvoiceNo !== '' && scParam.InvoiceDate !== '') {
                            if ((scParam.CarsNo * 1) === gridCarsNo) {
                                dataService.callAjax('Post', JSON.stringify(DTO), url, function (data) {
                                    successCallback(data);
                                    if (data.d.ID > 0) {
                                        window.location.href = "InvoiceShippingPrint.aspx?id=" + data.d.ID;
                                    }
                                }, commonManger.errorException);
                            }
                            else {
                                commonManger.showMessage('لم تتم عملية الحفظ', 'برجاء التأكد من  عدد السيارات فى الفاتورة.'); return false;
                            }
                        }
                        else {
                            $('select[id$=ddlDistination]').focus();
                            //commonManger.showMessage('لم تتم عملية الحفظ', 'برجاء التأكد الحقول الاجبارية.'); return false;
                        }
                    }
                });

                // edit car
                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this);
                    var pos = self.closest('tr').index();
                    var aData;
                    if (pos !== null) {
                        aData = oaTable.row(pos).data(); // get data of the clicked row
                        if (self.hasClass('edit')) {

                            //prepare for update.
                            $('#BillDetailsID').val(aData[0]);
                            $('#CarID').val(aData[1]);
                            $cars.val(aData[3]);
                            $('#txtExtraCost').val(aData[10]);
                            $('#txtTowingCost').val(aData[5]).attr("data-value", (aData[14] ? aData[14] : 0));
                            $('#txtCuttingCost').val(aData[8]).attr("data-value", (aData[15] ? aData[15] : 0));
                            $('#TransOnCar').val(aData[9]).attr("data-value", (aData[16] ? aData[16] : 0));
                            $('#Notes').val(aData[11]);
                            $('.car-model').val(aData[2]);
                            $('.car-region').val(aData[4]);
                            $('#indexUpdate').val(pos);

                            var defaultText = 'القيمة الافتراضية: ';
                            $('i.default-towing').attr('data-original-title', defaultText + numeral(aData[14]).format('0,0.00'));
                            $('i.default-part').attr('data-original-title', defaultText + numeral(aData[15] ? aData[15] : 0).format('0,0.00'));
                            $('i.default-trans').attr('data-original-title', defaultText + numeral(aData[16] ? aData[16] : 0).format('0,0.00'));

                            showModal(true);
                        }
                    }
                });

                $.fn.afterLoadDatawithdata = function (data) {
                    _shipperId = data["CarShipperID"]; $('select[id$=ddlShipper]').val(data["CarShipperID"]);
                };
            },
            showModal = function (isShow) {
                isShow = isShow === true ? 'show' : 'hide';
                $('#editCarModal').modal(isShow);
            },
            applyTowingValidation = function () {
                var $towing = $('input[id$=txtTowingCost]'),
                    $part = $('input[id$=txtCuttingCost]'),
                    $trans = $('input[id$=txtCuttingCost]'),

                    towingVal = $towing.val(),
                    partVal = $part.val(),
                    transVal = $trans.val(),

                    towingDefault = $towing.attr("data-value"),
                    partDefault = $part.attr("data-value"),
                    transDefault = $trans.attr("data-value"),

                    _towingValid = parseFloat(towingVal) <= parseFloat(towingDefault),
                    _partitioningValid = (partDefault * 1 > 0) ? (parseFloat(partVal) <= parseFloat(partDefault)) : true,
                    _transportValid = (transDefault * 1 > 0) ? (parseFloat(transVal) <= parseFloat(transDefault)) : true;


                if (_towingValid === true && _partitioningValid === true && _transportValid === true) { return true; }
                else {
                    commonManger.showMessage('خطأ بالحفظ:', 'برجاء التأكد من  قيمة التونك والتقطيع والنقل بحيث لا تكون أكبر من القيمة الافتراضية.'); return false;
                }
            },
            ApplyValidation = function () {
                var _seaTrans = parseFloat($('input[id$=txtShippPrice]').val()) <= parseFloat($('input[id$=txtShippPrice]').attr("data-value"));
                var _loading = parseFloat($('input[id$=txtLoadingCost]').val()) <= parseFloat($('input[id$=txtLoadingCost]').attr("data-value"));
                var _trans = parseFloat($('input[id$=TransportationPrice]').val()) <= parseFloat($('input[id$=TransportationPrice]').attr("data-value"));
                if (_seaTrans && _loading && _trans) { return true; }
                else {
                    commonManger.showMessage('لم تتم عملية الحفظ', 'برجاء التأكد من  قيمة الشحن البحرى والتحميل والسحب بحيث ألا تكون أكبر من القيمة الافتراضية.'); return false;
                }
            },
            successCallback = function (data) {
                data = data.d;
                if (data.Status) {
                    var inx = $('#indexUpdate').val();
                    oaTable.cell(inx, 5).data($('#txtTowingCost').val());
                    oaTable.cell(inx, 8).data($('#txtCuttingCost').val());
                    oaTable.cell(inx, 9).data($('#Transportation').val());
                    oaTable.cell(inx, 10).data($('#txtExtraCost').val());
                    oaTable.cell(inx, 11).data($('#Notes').val());

                    // row total
                    var ttal = 0, aData = oaTable.rows(inx).data();
                    aData = aData[0];
                    
                    ttal = parseFloat(aData[5]) + parseFloat(aData[6]) + parseFloat(aData[7]) + parseFloat(aData[8]) + parseFloat(aData[9]) + parseFloat(aData[10]);
                    oaTable.cell(inx, 12).data(ttal.toFixed(2)); // row total
                    getGridTotal(); // grid total

                    // hide form
                    showModal(false);


                    ResetControls(); // reset form
                    commonManger.showMessage('تم تحديث البيانات', data.message); // show success message
                }
                else {
                    commonManger.showMessage('خطأ أثناء تنفيذ الإجراء', data.Message);
                }

            },
            successCallback2 = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list;

                updateGridData(jsn); // refresh grid

                // saved message
                commonManger.showMessage('تم تحديث البيانات', 'تم تحديث مبلغ التحميل والشحن البحري والنقل للحاوية بنجاح.');
            },
            ResetControls = function () {
                $('#divMyForm input').val('0');
            },
            ShowInvoiceTotal = function (dataArr) {
                // show invoice total
                var invTotal = 0, arr = dataArr;
                for (i = 0; i < arr.length; i++) {  //loop through the array
                    invTotal += arr[i].TotalCost;  //Do the math!
                }
                $('#lblInvoiceTotal').text(invTotal); // invoice total
            },
            isSearchById = function () {
                return (id !== undefined && id !== "" && id !== "0") ? true : false;
            },
            GetBolDetails = function () {
                var bol = $bol.val();
                id = commonManger.getUrlVars()['id']

                id = (id !== undefined && id !== "") ? id : "0";
                bol = (bol !== undefined && bol !== "") ? bol : "0";

                if (id === '0' && bol === '0') { return; }
                else {
                    var url = sUrl + "GetDataList", DTO = {
                        'actionName': "ShippInvoices_GetByBol",
                        'names': ['id', 'bol'], 'values': [id, bol]
                    }, dto = JSON.stringify(DTO);

                    dataService.callAjax('POST', dto, url, ShowBolData, commonManger.errorException);
                }
            },
            ShowBolData = function (data) {
                var cData = commonManger.comp2json(data.d),
                    l1 = cData.list,
                    defaultValStr = 'السعر الافتراضي: ';
                
                if (l1 !== undefined) {
                    if (l1.Message === undefined) { // not edit
                        $('input[id$=CarsNo]').val(l1.CarsNo);

                        $containerN.val(l1.ContainerNo);
                        $bol.val(l1.Bol);

                        $('#NavigationCoID').val(l1.NavigationCoID);
                        $('input[id$=txtBillNo]').val(l1.InvoiceNo);
                        $('input[id$=ShippInvoiceID]').val(l1.ShippInvoiceID);
                        $('select[id$=ddlContainerSize]').val(l1.ContainerSize);

                        lloadingVal = numeral(l1.LoadingPrice).format('0.00');
                        sshippingVal = numeral(l1.ShippPrice).format('0.00');
                        transportPrice = numeral(l1.TransportationPrice).format('0.00');

                        $('input[id$=txtLoadingCost]').val(lloadingVal).attr('data-value', numeral(l1.DefaultLoading).format('0.00'));
                        $('label[id$=lbltxtLoadingCost]').attr('data-original-title', defaultValStr + numeral(l1.DefaultLoading).format('0.00'));
                        $('input[id$=txtShippPrice]').val(sshippingVal).attr('data-value', numeral(l1.DefaultOF).format('0.00'));
                        $('label[id$=lbltxtShippPrice]').attr('data-original-title', defaultValStr + numeral(l1.DefaultOF).format('0.00'));

                        $('input[id$=TransportationPrice]').val(transportPrice).attr('data-value', numeral(l1.DefaultTrans).format('0.00'));
                        $('label[id$=lblTransportationPrice]').attr('data-original-title', defaultValStr + numeral(l1.DefaultTrans).format('0.00'));

                        // in BOL status only and not shipping invoice shipping
                        if (!l1.InvoiceNo) {
                            if (lloadingVal <= 0 && l1.DefaultLoading > 0) // real Loading in BOL =0 and default loading > 0.
                                $('input[id$=txtLoadingCost]').val(lloadingVal <= 0 ? numeral(l1.DefaultLoading).format('0.00') : lloadingVal).change();

                            if (sshippingVal <= 0 && l1.DefaultOF > 0) // real O.F. in BOL =0 and default O.F. > 0.
                                $('input[id$=txtShippPrice]').val(sshippingVal <= 0 ? numeral(l1.DefaultOF).format('0.00') : sshippingVal).change();

                            if (transportPrice <= 0 && l1.DefaultTrans > 0) // real transport. in BOL =0 and default transport. > 0.
                                $('input[id$=TransportationPrice]').val(transportPrice <= 0 ? numeral(l1.DefaultTrans).format('0.00') : transportPrice).change();
                        }


                        _shipperId = l1.ShipperID;
                        $distinationSelect.val(l1.DistinationID);
                        $shipperSelect.val(_shipperId);


                        if (l1.InvoiceDate !== null) {
                            var invDate = commonManger.formatJSONDateCal(l1.InvoiceDate);
                            $('input[id$=txtBillDate]').val(invDate);
                        }
                        if (l1.ArrivalDate !== null) {
                            var arrDate = commonManger.formatJSONDateCal(l1.ArrivalDate);
                            $('input[id$=txtArriveDate]').val(arrDate);
                        }


                        if (!isSearchById()) {
                            // update default values and fill grid
                            // after updating
                            $('#txtLoadingCost').blur();
                        } else {
                            // grid with current data
                            updateGridData(cData.list1);
                        }
                    }
                    else {
                        commonManger.showMessage('هذه الفاتورة موجودة من قبل', 'لا يمكن تعديل الفاتورة، نظراً لوجود حوالة لها فى النظام.');
                    }
                }
            },
            updateGridData = function (data) {
                // fill grid items
                oaTable.clear().draw();

                //var listGrid = $('#listItems tbody tr');
                //listGrid.remove();

                var $totalInv = $('#lblInvoiceTotal');
                $totalInv.text(0);

                $(data).each(function (i, item) {
                    oaTable.row.add([item.BillDetailsID,
                        item.CarID, item.MakerNameEn + ' - ' + item.TypeNameEn + ' - ' + item.Year, item.ChassisNo,
                        item.RegionEn, numeral(item.Towing).format('0.00'), numeral(item.Loading).format('0.00'), numeral(item.SeaTrans).format('0.00'), numeral(item.Partitioning).format('0.00'), numeral(item.Transportation).format('0.00'), numeral(item.Extra).format('0.00'), item.Notes, numeral(item.TotalCost).format('0.00'),
                        '<button class="btn btn-minier btn-info edit" data-rel="tooltip" data-placement="top" data-original-title="تعديل"><i class="icon-edit"></i></button>',
                        item.DefaultTowing,
                        (item.DefaultPartio ? item.DefaultPartio : ''),
                        (item.DefaultTransp ? item.DefaultTransp : '')
                    ]).draw();

                    $('.btnFinish').removeClass('hidden');

                    // calculate invoice total in this case.
                    //                           oldTotal         +     total of this row
                    var itemAmount = parseFloat($totalInv.text()) + parseFloat(item.TotalCost);
                    $totalInv.text(itemAmount.toFixed(2));
                });
            },
            getGridTotal = function () {
                var $totalInv = $('#lblInvoiceTotal');
                $totalInv.text(0);

                var _data = oaTable.rows().data();
                $(_data).each(function (i, item) {
                    var itemAmount = parseFloat($totalInv.text()) + parseFloat(item[12]);
                    $totalInv.text(itemAmount.toFixed(2));
                });
            };

        return {
            Init: init,
            ShowInvoiceTotal: ShowInvoiceTotal
        };

    }();

ShippInvoicesManager.Init();