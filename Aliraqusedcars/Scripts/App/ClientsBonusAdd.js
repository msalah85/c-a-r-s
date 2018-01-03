var
    pageManager = function () {
        var
            Init = function () {
                editReceipt();
                pageEvents();

                // review for super admins only.
                var _prm = commonManger.fullRoles();
                if (_prm) {
                    $('#Revised').closest('div.control-group').removeClass('hidden');
                }
            },

            editReceipt = function () {
                // get data to edit
                var qs = commonManger.getUrlVars();
                if (qs) {
                    if (qs.id) {
                        $('.page-header h1 span').html('تعديل');
                        getDataToUpdate(qs.id);
                    }

                    if (qs.cid) { // clientId
                        var _cName = decodeURIComponent(qs.cname.split('-').join(' '));
                        $('#ClientID').select2('data', { id: qs.cid, text: _cName }).closest('.control-group').addClass('hidden');
                        $('h1:eq(0) small').html(' - <a class="pink" href="clientcars.aspx?id=' + qs.cid + '">' + _cName + '</a>');

                        // hide dhs amount field..
                        $('#AmountDhs').closest('.control-group').addClass('hidden');
                    }
                }
            },
            pageEvents = function () {
                $('input[type=text]').on('focus click', function () { $(this).select(); });

                // currency rate from $ to Dirham.
                $('#Amount').on('blur change', function () {
                    var payType = $('#PayTypeID input:checked').val(),
                        amount = $('#Amount').val();

                    amount = $.isNumeric(amount) ? (amount * 3.667) : 0;
                    $('#AmountDhs').val(amount.toFixed(2));

                });

                // save data
                $('#SaveAll').click(function (e) {
                    e.preventDefault();
                    commonManger.disableControl('SaveAll', true);

                    var isValid = validateMe();
                    if (isValid) {
                        commonManger.saveData("masterForm", "masterForm", success, "", "ClientsBonus_Save", "1", aftersave);
                    } else
                        commonManger.disableControl('SaveAll', false);
                });


            },
            showDuplicateMessage = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                if (jsn) { // exist before
                    // show message
                    $('.message').html('<div class="alert alert-danger span12"><i class="icon-warning-sign red"></i> <strong>إيصال مكرر:</strong> رقم الايصال الذى تم ادخاله موجود من قبل لسند قبض رقم: <a href="ClientBonusPrint.aspx?id=' + jsn.ReceiptID + '">' + jsn.ReceiptID + '</a><button type="button" class="close" data-dismiss="alert"><i class="icon-remove"></i></button></div>');

                    commonManger.showMessage('ايصال مكرر', 'هذا الايصال موجود بالفعل من قبل برقم: ' + jsn.ReceiptID);

                    // disable save button
                    $('#SaveAll').attr('disabled', 'disabled');
                } else {
                    $('#SaveAll').removeAttr('disabled');
                    $('.message').html('');
                }
            },
            updateChosen = function () {
                $(".select2").trigger("change");
            },
            validateMe = function () {
                var valid = true, inputs = $('#masterForm :input:not(:hidden).required');

                for (var i = 0; i < inputs.length; i++) {
                    if ($(inputs[i]).val() == "" || $(inputs[i]).val() == "0") {
                        valid = false;
                        $(inputs[i]).focus();
                    }
                }

                return valid;
            },
            getDataToUpdate = function (iD) {
                var functionName = "ClientsBonus_One", DTO = { 'actionName': functionName, 'value': iD },
                    bindDataResult = function (data) {
                        var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                        if (jsn) {
                            // revised receipt
                            $('#Revised').attr('checked', (jsn.Revised === 'true'));

                            // assign old values to update
                            $.each(jsn, function (k, v) {
                                $('#masterForm #' + k).val(v);
                            });

                            $('#ClientID').select2('data', { id: jsn.ClientID, text: jsn.full_name });
                            //$('#ClientID').data('options', jsn.full_name).select2('val', jsn.ClientID);

                            // update money format
                            $('#Amount,#AmountDhs').val(function () {
                                return numeral($(this).val()).format('0.0');
                            });
                        }
                    };

                dataService.callAjax('Post', JSON.stringify(DTO),
                    sUrl + 'GetData', bindDataResult, commonManger.errorException);
            },
            aftersave = function (data) {
                //console.log(data);
            },
            success = function (d) {
                window.location.href = 'ClientBonusPrint.aspx?id=' + d.ID;
            };

        return {
            Init: Init
        };

    }();