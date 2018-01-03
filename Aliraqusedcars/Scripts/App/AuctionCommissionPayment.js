// www.iraqusedcars.ae
// Update: 10-10-2016


//#region Auctions Commissions
var
    pageManager = function () {

        var
            // global variables
            oaTable = $('#listItems'),
            $from = $('#DateFrom'),
            $to = $('#DateTo'),
            $auction = $('#AuctionTypeID'),
            $extra = $('#ExtraAmount'),

            // page methods
            populateLists = function (controlId, List) {
                $(List).each(function (i, item) {
                    $('#' + controlId).append($('<option />').val(item.ID).text(item.Name));
                });
                $('#' + controlId).trigger('chosen:updated').trigger("liszt:updated");
            },
            gridTotalAmount = function () {
                var Amount = $('#CommAmount').val(), rate = $('#ExchangeCompanyID').find('option:selected').text().split(':')[1];
                rate = (rate !== undefined && rate != null && rate > 0) ? rate : 3.674;
                Amount = Amount ? Amount : 0;
                var invTotal = parseFloat(Amount) * parseFloat(rate); // dirhamss
                invTotal += parseFloat($('#Convertamount').val());   // dirhamss
                $('#CommAmountDhs').val(invTotal.toFixed(2));
            },
            loadLists = function () {
                var
                    functionName = "AuctionCommPayments_Properties",
                    DTO = { actionName: functionName, value: "" },
                    successBindLists = function (data) {
                        var jsnData = commonManger.comp2json(data.d),
                            jsn = jsnData.list,
                            jsn1 = jsnData.list1,
                            jsn2 = jsnData.list2;

                        console.log(jsn, jsn1, jsn2); // test

                        if (jsn) {
                            populateLists('ExchangeCompanyID', jsn);
                        }
                        if (jsn1) {
                            populateLists('AuctionTypeID', jsn1);
                        }
                        if (jsn2) {
                            populateLists('CommissionExtraNoteID', jsn2);
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
                    successBindLists, commonManger.errorException);
            },
            sumInvoiceTotal = function () {
                var tot = 0, $extraAmount = $extra.val();
                oaTable.find('tbody tr').each(function () {
                    var itmVal = $(this).find('td:nth-child(9)').text();
                    tot += parseFloat(itmVal);
                });
                if (($extraAmount * 1) > 0) {
                    tot += ($extraAmount * 1);
                }
                if (tot > 0) { // show final save button
                    $('#CommAmount').val(tot);
                    $('#AuctionCommTotal').text(tot);
                    gridTotalAmount();
                    $('.btnFinish').removeClass('hidden');
                } else {
                    $('.btnFinish').addClass('hidden');
                }
            },
            filllistItems = function () {
                var pTable = oaTable.dataTable({
                    "sDom": "t",
                    "bProcessing": true,
                    "bServerSide": true, responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": "AuctionCommissionAdd.aspx/LoadData",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "AuctionTypeID", "value": $auction.val() }, { "name": "From", "value": commonManger.dateFormat($from.val()) }, { "name": "To", "value": commonManger.dateFormat($to.val()) });

                        var _id = commonManger.getQueryStrs().id;
                        if (_id && (_id * 1) > 0) {
                            aoData.push({ "name": "PID", "value": _id });
                        }
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) { fnCallback(data.d); sumInvoiceTotal(); }, commonManger.errorException);
                    },
                    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) { // show index
                        $(nRow).find('td:nth-child(1)').text(iDisplayIndex + 1);
                    },
                    "iDisplayLength": 500,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mDataProp": "CarID",

                            "bSortable": true
                        },
                        {
                            "mDataProp": "TypeNameEn",

                            "bSortable": true,
                            "mData": function (oObj) {
                                return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + (oObj['PayInvTypeID'] == 3 ? ' - Relist' : '') + '</a>';
                            }
                        },
                        {
                            "mDataProp": "LotNo",

                            "bSortable": true
                        },
                        {
                            "mDataProp": "ChassisNo",

                            "bSortable": true
                        },
                        {
                            "mData": "BuyerName",
                            "bSearchable": false,
                            "bSortable": false
                        },
                        {
                            "mDataProp": "RegionEn",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "CarID",
                            "bVisible": false
                        },
                        {
                            "mData": "BuyerFee",
                            "bSortable": false
                        },
                        {
                            "bSortable": false,
                            "mData": function (oObj) {
                                return '<input type="text" id="extra_' + oObj["CarID"] + '" value="' + (oObj.AuctionCommCost ? numeral(oObj.AuctionCommCost).format('0') : 0) + '" class="span6" />';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (oObj) {
                                return (oObj["BuyerFee"] * 1) + (oObj.AuctionCommCost * 1);
                            }
                        }
                    ]
                });

            },
            savePaymentInvice = function (scParam, scParamVal) {
                var actionName = "AuctionCommPayments_Save", DTO = { 'values': scParamVal, 'actionName': actionName, 'Parm_names': scParam };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'saveDefaultData',
                    function (data) {
                        if (data.d.Status) // show success message if done.
                            window.location.href = 'AuctionCommissionview.aspx'
                        else // show error message
                            commonManger.showMessage('خطأ أثناء الحفظ', data.d.message);
                    }, commonManger.errorException);
            },
            GetStaticData = function () {
                dataService.callAjax('Post', JSON.stringify({ 'value': '' }), mainServiceUrl + 'GetConvetAmount',
                    function (data) {
                        var selectList = JSON.parse(data.d);
                        $.each(selectList, function (i, d) {
                            $('#Convertamount').val(d.Convertamount);
                        });
                    }, commonManger.errorException);
            },
            invoiceSaveSuccess = function (data) { // go to print page                
                console.log(data);
                if (data.d.ID > 0) {
                    commonManger.showMessage('تم الحفظ بنجاح:', data.d.message);
                    document.location.href = "AuctionCommissionPrint.aspx?id=" + data.d.ID;
                }
            },
            getPaymentToEdit = function () {
                var _id = commonManger.getQueryStrs().id;
                _id = commonManger.getNumbersFromString(_id);

                if (_id && (_id * 1) > 0) {
                    startGettingData(_id);
                }

            },
            updateChosen = function () {
                $(".chzn-select").chosen({ allow_single_deselect: true, no_results_text: "اختـــر", search_contains: false }).trigger('chosen:updated');
            },
            startGettingData = function (pId) {

                var bindData = function (data) {
                    var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;


                    // fill master controls
                    $.each(jsn, function (k, v) {
                        $('#' + k).val(v);
                    });

                    // controls format
                    updateChosen(); // update chosen
                    $('.date-picker').val(function () {
                        return commonManger.formatJSONDateCal($(this).val());
                    });
                    $('.money').val(function () {
                        return numeral($(this).val()).format('0.00');
                    });


                    //$('.CommAmount').text(numeral(jsn ? jsn.CommAmount : 0).format('0.00'));                    
                    filllistItems(); // get related cars list

                },
                    dto = { actionName: 'AuctionCommissions_SelectOne', value: pId };


                // get by ajax
                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindData, commonManger.errorException);
            },
            pageEvents = function () {
                ///events//////////
                $('#SaveAll').on('click', function (e) { // Save shipping invoice
                    e.preventDefault();

                    // get master fields
                    var masterValues = [$('#AuctionCommID').val(),
                    $auction.val(), $('#ExchangeCompanyID').val(),
                    commonManger.dateFormat($('#InvoiceDate').val()),
                    $('#CommAmount').val(), $('#ConvertAmount').val(),
                    $('#CommAmountDhs').val(), $('#Notes').val(),
                    commonManger.dateFormat($from.val()),
                    commonManger.dateFormat($to.val()),
                    $extra.val(), $('#CommissionExtraNoteID').val()];

                    // get child array
                    var valuesDetails = [];
                    var list = $('#listItems').dataTable().fnGetData();


                    $(list).each(function (i, item) {
                        //                        carid               fee                   extra                                 total
                        var childItm = '0,0,' + item.CarID + ',' + item.BuyerFee + ',' + $('#extra_' + item.CarID).val() + ',' + oaTable.find('tbody tr:eq(' + i + ') td:nth-child(9)').text();
                        valuesDetails.push(childItm);
                    });



                    // start save data
                    if (valuesDetails.length > 0) {
                        if (($extra.val() * 1) === 0 || (($extra.val() * 1) > 0 && $('#CommissionExtraNoteID').val() !== '' && $('#ExchangeCompanyID').val() != '')) {

                            var DTO = { 'masterValues': masterValues, 'detailsValues': valuesDetails },
                                _sUrl = 'AuctionCommissionAdd.aspx/SaveDataMasterDetails';

                            dataService.callAjax('Post', JSON.stringify(DTO), _sUrl, invoiceSaveSuccess, commonManger.errorException);

                        } else {
                            commonManger.showMessage('يجب اختيار البيان:', 'برجاء تحديد بيان المبلغ الاضافى.');
                            $('#CommissionExtraNoteID').focus();
                        }
                    }
                    else {
                        commonManger.showMessage('لا توجد سيارات:', 'برجاء البحث عن سيارات بأعلى لاضافتها للحوالة.');
                    }
                });


                $('#ExchangeCompanyID').change(function (e) {
                    gridTotalAmount();
                });


                // filter cars
                $('.btnSearch').click(function (e) {
                    e.preventDefault();
                    filllistItems();
                });


                // get invoice value.
                $auction.change(function (e) {
                    e.preventDefault();
                    if ($(this).val() !== '')
                        filllistItems();
                });


                $extra.change(function () {
                    sumInvoiceTotal();
                });


                // grid events
                $(document).delegate("#listItems tbody tr input.span6", "keyup", function (e) {
                    e.preventDefault();
                    var self = $(this),
                        pos = self.closest('tr').index(),
                        aData, pTable = oaTable.dataTable();

                    if (pos !== null) {
                        aData = pTable.fnGetData(pos); //get data of the clicked row

                        //prepare for update total.
                        var carId = aData["CarID"],
                            fee = aData["BuyerFee"],
                            exraVal = $('#extra_' + carId).val();


                        self.closest('tr').find('td:nth-child(9)').text(parseFloat(exraVal) + parseFloat(fee));
                        sumInvoiceTotal();
                    }
                });
            },
            setDefaultProp = function () {
                oaTable = $('#listItems'),
                    $from = $('#DateFrom'),
                    $to = $('#DateTo'),
                    $auction = $('#AuctionTypeID'),
                    $extra = $('#ExtraAmount');
            },
            int = function () {
                setDefaultProp();

                //initialize all
                loadLists();

                GetStaticData();

                getPaymentToEdit();

                pageEvents();
            };

        return {
            init: int
        };

    }();
//#endregion