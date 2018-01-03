var contractManager = function () {
    var pageElements = {
        listBody: $("#listItems tbody"),
        saveAll: $('#SaveAll'),
        removeAll: $('#DeleteAll'),

        // master controls
        masterControls: {
            ClientCommID: $('#ClientCommID'),
            ClientID: $('#ClientID'),
            DistinationID: $('#DistinationID'),
            CommTypeID: $('#CommTypeID'), //
            ShippingCalcID: $('#ShippingCalcID'), //
            ExtraCash: $('#ExtraCash'),
            ExtraCredit: $('#ExtraCredit'),
            CommissionCash: $('#CommissionCash'),
            CommissionCredit: $('#CommissionCredit'),
            LoadingOFContainer: $('#LoadingOFContainer'),
            CustomsContainer: $('#CustomsContainer'),
            CarsNo: $('#CarsNo'),
            Notes: $('#Notes'),
            ExtraCreditList: $('#ExtraCreditList')
        },
        detailsControls: {
            ClientTowingID: 0,
            ClientCommID: 0,
            RegionID: 0,
            Towing: 0,
            Partitioning: 0,
            LoadingOF: 0,
            Customs: 0,
            Extra: 0
        },

        // feach contract
        searchParam: ['id', 'cid', 'dist', 'cotype', 'catype'],

        // copy contract
        copyControls: {
            distin: $('#DistIDCopy'),
            client: $('#ClientIDCopy'),
            btnCopy: $('#btn-getCopy'),
            copyContBtn: $('.add-copy')
        },

        // repeat amount on the contract
        repeatControls: {
            btn: $('#btn-startRepeat'),
            amount: $('#Amount'),
            columnIndex: $('#repeatIndex'),
            startRepeatBtn: $('.repeat-plus'),
            isPlusAmmount: $('#plusAmount')
        }

    },
    getInvoiceDetails = function () {
        var qs = commonManger.getQueryStrs(),
            searchParamValues = [
                qs.id ? qs.id : '',
                qs.cid ? qs.cid : '',
                qs.dist ? qs.dist : '',
                qs.cotype ? qs.cotype : '',
                qs.catype ? qs.catype : '',
            ],
           functionName = "ClientContract_Select", DTO = { 'actionName': functionName, names: pageElements.searchParam, values: searchParamValues };

        showHidecontrols(qs.id && qs.id !== '' ? true : false);

        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataList', bindContractDetails, commonManger.errorException);
    },
    showHidecontrols = function (isVisible) {
        if (isVisible)
            $('#DeleteAll').removeClass('hidden');
    },
    setInputFormat = function () {
        // set money format
        $('.money').val(function () {
            return numeral($(this).val()).format('0');
        });

        // auto size for notes
        $('textarea').trigger('autosize');
    },
    bindContractDetails = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;

        if (jsn) {

            // set master data
            $.each(jsn, function (k, v) {
                $('#' + k).text(v);
                $('#' + k).val(v);
            });

            // date and money format
            setInputFormat();

            // distination flag
            $('#DistinationNameAr').prepend('<img width="25px" src="/App_Themes/iraq/images/' + jsn.DistinationNameAr + '.jpg"> ');


            // move extracredit control list
            if (isMoveExtraCommList()) {
                $('.ExtraCreditToMove').prependTo('.movedExtraCredit')
            }


            // show/hide contracts fields
            if (jsn.CommTypeID === '1') { // static values
                $('.basicContract').removeClass('hidden');
                $('.listContract').addClass('hidden');
            }
            else { // list regions
                if (jsn1) {
                    // bind list of regions
                    buildContractGrid(jsn1);

                    // view copy button
                    $('.repeat-plus').removeClass('hidden');
                    if (pageElements.masterControls.ClientCommID.val() == 0) {
                        pageElements.copyControls.copyContBtn.closest('div').removeClass('hidden');
                    }
                }
            }
        }
    },
    buildContractGrid = function (data) {
        var regionsList = $(data).map(function (i, v) {

            pageElements.detailsControls.Towing = (v.Towing ? numeral(v.Towing).format('0') : 0) * 1;
            pageElements.detailsControls.Partitioning = (v.Partitioning ? numeral(v.Partitioning).format('0') : 0) * 1;
            pageElements.detailsControls.LoadingOF = (v.LoadingOF ? numeral(v.LoadingOF).format('0') : 0) * 1;
            pageElements.detailsControls.Customs = (v.Customs ? numeral(v.Customs).format('0') : 0) * 1;
            pageElements.detailsControls.Extra = (v.Extra ? numeral(v.Extra).format('0') : 0) * 1;

            var rowAmountsSum = (pageElements.detailsControls.Towing +
                pageElements.detailsControls.Partitioning +
                pageElements.detailsControls.LoadingOF +
                pageElements.detailsControls.Customs +
                pageElements.detailsControls.Extra);


            return '<tr><td class="center" data-id="' + (v.ClientTowingID ? v.ClientTowingID : 0) + '" data-regionid="' + v.RegionID + '">' + (i + 1) + '</td><td>' + v.RegionEn + '</td><td class="edit"><input name="Towing" required class="input-block-level form-control" type="text" value="' + pageElements.detailsControls.Towing + '" /></td><td class="edit"><input name="Partitioning" required class="input-block-level form-control" type="text" value="' + pageElements.detailsControls.Partitioning + '" /></td><td class="edit"><input name="LoadingOF" required class="input-block-level form-control" type="text" value="' + pageElements.detailsControls.LoadingOF + '" /></td><td class="edit"><input name="Customs" required class="input-block-level form-control" type="text" value="' + pageElements.detailsControls.Customs + '" /></td><td class="edit"><input name="Extra" required class="input-block-level form-control" type="text" value="' + pageElements.detailsControls.Extra + '" /></td><td>' + rowAmountsSum + '</td></tr>';

        }).get();


        pageElements.listBody.append(regionsList);


        // apply table events
        fireGridEvents();
    }
    fireGridEvents = function () {
        // select all text in input focus
        $('input[type=text]').on('focus click', function () { $(this).select(); });

        $('#listItems td input[type=text]').bind('keydown', 'up', function () {
            var tdIndex = $(this).closest('td').index(),
                prevText = $(this).closest('tr').prev('tr').find('td:eq(' + tdIndex + ') input[type=text]');

            if (prevText) {
                prevText.focus();
            }

            return false;
        }).bind('keydown', 'down', function () {

            var tdIndex = $(this).closest('td').index(),
                nextText = $(this).closest('tr').next('tr').find('td:eq(' + tdIndex + ') input[type=text]');

            if (nextText) {
                nextText.focus();
            }

            return false;
        }).bind('keydown', 'right', function () {

            var tdIndex = $(this).closest('td').index(),
                rightText = $(this).closest('tr').find('td:eq(' + (tdIndex - 1) + ') input[type=text]');

            if (rightText) {
                rightText.focus();
            }

            return false;
        }).bind('keydown', 'left', function () {

            var tdIndex = $(this).closest('td').index(),
                leftText = $(this).closest('tr').find('td:eq(' + (tdIndex + 1) + ') input[type=text]');

            if (leftText) {
                leftText.focus();
            }

            return false;
        });
    },
    Init = function () {
        // get data to edit            
        getInvoiceDetails();
        pageEventsHandlar();
    },
    pageEventsHandlar = function () {
        // calculate row total
        pageElements.listBody.delegate('input[type="text"]', "keyup change", function () {
            var tr = $(this).closest('tr'), subTotal = 0;

            // do sum
            tr.find('input[type="text"]').each(function () {
                if ($.isNumeric(this.value)) {
                    subTotal += parseFloat(this.value);
                }
            });

            // show sub total
            tr.find('td:eq(7)').text(numeral(subTotal).format('0'));
        });

        // save invoice
        pageElements.saveAll.on('click', function (event) {
            event.preventDefault();
            startSaveContract();
        });

        // remove all event
        pageElements.removeAll.click(function (e) {
            e.preventDefault();

        });

        // remove contract
        pageElements.removeAll.on("click", function (e) {
            e.preventDefault();

            bootbox.confirm("هل أنت متأكد من إيقاف العقد الحالى للعميل؟", function (result) {
                if (result) {
                    removeContract();
                }
            });
        });

        // clients 4 copy
        pageElements.copyControls.distin.change(function () {
            var selectedID = $(this).val();

            if (selectedID != '') {
                getClients4Copy();
            }
        });

        // copy contract
        pageElements.copyControls.btnCopy.click(function (e) {
            e.preventDefault();
            startCopyContract();
        });

        // repeat amount
        // start repeat amount on
        pageElements.repeatControls.startRepeatBtn.click(function () {
            // column index
            var currentIndex = $(this).closest('th').index();
            pageElements.repeatControls.columnIndex.val(currentIndex);

            // reset repeat modal form
            pageElements.repeatControls.amount.val(0);
            pageElements.repeatControls.amount.focus();
            pageElements.repeatControls.isPlusAmmount.prop('checked', false);
        });

        // update grid column with the same amount.
        pageElements.repeatControls.btn.click(function (e) {
            e.preventDefault();

            startRepeatAmountOnColumn();
        });

        // end repeat amount
    },
    startRepeatAmountOnColumn = function () {

        // update column with this amount
        var updateObj = {

            // value to update
            amount: pageElements.repeatControls.amount.val(),

            // update column index
            index: pageElements.repeatControls.columnIndex.val(),

            // only for add this amount plus current value in every cell
            isPlus: pageElements.repeatControls.isPlusAmmount.is(':checked') ? true : false,


            // sum all toings in the table.
            // 4 check existing towings in the table (yes/no)
            sumTowings: $('#listItems tbody tr').map(function () {
                var twng = $(this).find('td:eq(2) input[type=text]').val();

                if ($.isNumeric(twng) && (twng * 1) > 0) {
                    return twng;
                }
            }).get(),
        };

        // validate amount to update
        if ($.isNumeric(updateObj.amount) && updateObj.index > 0) {

            // loop grid rows
            pageElements.listBody.find('tr').each(function () {

                // every text in our current column
                var _tdInput = $(this).find('td:eq(' + updateObj.index + ') input[type=text]'),
                     // related towing in the same row
                    _towingInput = $(this).find('td:eq(2) input[type=text]');


                if (_tdInput) { // set the amount and fire subtotal function

                    // add this amount + current amount
                    if (updateObj.isPlus && (_tdInput.val() * 1) > 0) {
                        _tdInput.val(function () {
                            return ((updateObj.amount * 1) + (_tdInput.val() * 1));
                        }).change();
                    }
                    else if (_towingInput) {

                        // update other column (no 6) 
                        if (updateObj.sumTowings.length === 0 && updateObj.index == 6 && !updateObj.isPlus) {
                            // other amount column
                            _tdInput.val(updateObj.amount).change();
                        }
                        else if (_towingInput.val() * 1 > 0) {
                            // normal update columns
                            _tdInput.val(updateObj.amount).change();
                        }

                    }
                }


            }).promise().done(function () {
                $('.modal').modal('hide');
            });

        }
        else {
            commonManger.showMessage('حقول مطلوبة', 'يرجي التحقق من القيمة أولاً.');
            pageElements.repeatControls.amount.focus();
        }
    },

    //#region copy contract
    startCopyContract = function () {
        var cpyObj = {
            id: pageElements.copyControls.client.val() != '' ? pageElements.copyControls.client.val() : '',
            functionName: 'ClientContractList_Copy'
        }

        if (cpyObj.id != '') {

            dto = {
                actionName: cpyObj.functionName,
                names: ['id'],
                values: [cpyObj.id]
            };


            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', rebuildContract, commonManger.errorException);

        }
        else
            commonManger.showMessage('بيانات مطلوبة', 'برجاء اختيار العميل وجهة الوصول أولاً.');

    },
    rebuildContract = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

        $('.modal').modal('hide');


        if (jsn) {
            pageElements.listBody.html(''); // reset 

            // build contract list
            buildContractGrid(jsn);
        }
        else
            commonManger.showMessage('خطأ فى تحميل العقد', 'يرجي التأكد من عقد العميل أولاً.');
    },
    getClients4Copy = function (distinationId) {
        var functionName = "ClientContractList_ToCopy",
            dto = {
                'actionName': functionName,
                names: ['dist', 'catype'],
                values: [distinationId, pageElements.masterControls.ShippingCalcID.val()]
            };
        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindClientsList, commonManger.errorException);
    },
    bindClientsList = function (data) {
        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, $option = $('<option />');

        // reset select
        pageElements.copyControls.client.find('option').remove();
        pageElements.copyControls.client.append($option.val('').text('جاري التحميل...'));


        // populate clients list
        if (jsn) {
            var _options = $(jsn).map(function (i, v) {
                return $('<option />').val(v.ClientCommID).text(v.full_name);
            }).get();


            pageElements.copyControls.client.append($option.val('').text(''));
            pageElements.copyControls.client.append(_options);
        } else {
            pageElements.copyControls.client.html('').append($option.val('').text('')); // empty
        }

    },
    //endregion copy contract

    isMoveExtraCommList = function () {
        // Full cars ==> 1
        // List contracts ==> 2
        var isFullCarListContract = (pageElements.masterControls.CommTypeID.val() == 2 && pageElements.masterControls.ShippingCalcID.val() == 1);
        return isFullCarListContract;
    },
    applyValidation = function () {
        var isValid = false;

        if (pageElements.masterControls.ClientID.val() > 0 &&
            pageElements.masterControls.DistinationID.val() > 0 &&
            pageElements.masterControls.ShippingCalcID.val() > 0 &&
            pageElements.masterControls.CommTypeID.val() > 0)
            isValid = true;

        return isValid;
    },
    startSaveContract = function () {
        // get master fields
        var masterValues = [], masterParms = [], detailsParams = [], detailsValues = [];

        // populate master from variables and values.
        $.each(pageElements.masterControls, function (k, v) {
            masterParms.push(k);
            masterValues.push(v.val());
        });

        // populate details paramters
        $.each(pageElements.detailsControls, function (k, v) {
            detailsParams.push(k);
        });

        // populate details values
        pageElements.listBody.children('tr').each(function (i, item) {
            var itm = { // child invoice row 
                ClientTowingID: $(item).find('td:eq(0)').data('id'),
                ClientCommID: pageElements.masterControls.ClientCommID.val(),
                RegionID: $(item).find('td:eq(0)').data('regionid'),
                Towing: $(item).find('input:eq(0)').val(),
                Partitioning: $(item).find('input:eq(1)').val(),
                LoadingOF: $(item).find('input:eq(2)').val(),
                Customs: $(item).find('input:eq(3)').val(),
                Extra: $(item).find('input:eq(4)').val()
            };

            if (itm.RegionID > 0) { // add to save array
                var childItm = itm.ClientTowingID + ',' + itm.ClientCommID + ',' + itm.RegionID + ',' + itm.Towing + ',' + itm.Partitioning + ',' + itm.LoadingOF + ',' + itm.Customs + ',' + itm.Extra;
                detailsValues.push(childItm);
            }
        });


        // start save data
        if (applyValidation()) {

            var dto = { values: masterValues, actionName: 'ClientCommissons_Save', Parm_names: masterParms, fieldsDetails: detailsParams, valuesDetails: detailsValues, flage: '1' };

            dataService.callAjax('Post', JSON.stringify(dto), mainServiceUrl + 'SaveDataMasterDetails', succesSaveCallBack, commonManger.errorException);
        }
        else {
            commonManger.showMessage('بيانات مطلوبة:', 'برجاء التأكد من ادخال جميع بنود العقد أولاً.');
        }

    },
    succesSaveCallBack = function (data) { // go to print page
        bootbox.alert(data.d.message);
        commonManger.showMessage('تم الحفظ بنجاح:', data.d.message);

        if (data.d.ID > 0)
            setTimeout(function () {
                document.location.href = "clients.aspx?id=" + data.d.ID;
            }, 3000);

    },
    removeContract = function () {
        var contractId = pageElements.masterControls.ClientCommID.val();

        if (contractId != '') {
            var functionName = "ClientCommissons_Delete", dto = { 'actionName': functionName, names: ['id'], values: [contractId] };
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', successDeleteCallback, commonManger.errorException);
        }
    },
    successDeleteCallback = function (data) {
        data = data.d;

        bootbox.alert(data.message);

        if (data.ID > 0)
            setTimeout(function () {
                document.location.href = "clients.aspx?id=" + data.ID;
            }, 3000);
    };
    return {
        Init: Init
    };
}();
contractManager.Init();