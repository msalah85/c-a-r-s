var
    ClientsManager = function () {
        var
            type = 0, client_search_char = null, gridId = 'listItems', client = '',

            Init = function () {

                getURLHash();


                filllistItems(); // init loading grid
                workPerform(); // events
            },
            successSentData = function (data) {
                data = data.d;

                // show sending result
                if (data.Result && data.Result.indexOf('Successful') > 0) {
                    commonManger.showMessage('تم الارسال بنجاح.', 'تم ارسال الرسالة بنجاح.');
                } else {
                    commonManger.showMessage('خطأ بالارسال:', 'لقد حدث خطأ أثناء تنفيذ العملية:' + data.Result);
                }

                // hide modal
                $('.modal').modal('hide');
            },
            enaleControl = function (control, enabled) {
                if (enabled) {
                    $('#' + control).removeAttr('disabled').html('<i class="icon-save"></i> ارسـل رسالة');
                } else {
                    $('#' + control).removeAttr('disabled').text('جاري الارسال ...');
                }
            },
            resetSearchByChar = function () {
                client_search_char = null;
                $('a.by-char').removeClass('active'); // reset clicks history.
            },
            assignSearchResultStyle = function () {
                $('#clientsTabs li').removeClass('active').last().addClass('active');
            },
            resetMyForm = function () {
                // reset
                $('#MasterID').select2("data", null);
                $('#aspnetForm')[0].reset(); $('#ClientID').val('0');
                $('.client-options').removeClass('hidden');
            },
            updateGrid = function () {
                $('#' + gridId).DataTable().draw(false);
            },
            SaveDataDetails = function (valuesDetails) {
                var DTO = { 'valuesDetails': valuesDetails };
                dataService.callAjax('Post', JSON.stringify(DTO), 'Clients.aspx/SaveDataMasterDetails',
                    function (data) {
                        if (data.d.Status) {
                            $('#ClientModal').modal('hide');
                            commonManger.showMessage('تم الحفظ بنجاح:', data.d.Message);
                            updateGrid();
                        }
                    }, commonManger.errorException);
            },
            getClientDetails = function (clientID, bindRowsFn, fnName) {
                var dto = { actionName: fnName, value: clientID };
                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetData', bindRowsFn, commonManger.errorException);
            },
            changeURL = function (parm) {
                // set url hash
                window.history.pushState('', "العملاء", 'clients.aspx' + parm);
            },
            getURLHash = function () {
                if (window.location.hash) {

                    var allPrm = window.location.hash.match(/^#?(.*)$/)[1];



                    var prm = allPrm.split('=');
                    if (prm.length > 0) {


                        if (prm[0] === 't') { // type
                            type = prm[1];

                            // activate tab
                            $('#clientsTabs li').removeClass('active');
                            $('#clientsTabs li a[data-id="' + type + '"]').closest('li').addClass('active');
                        }
                        else if (prm[0] === 'c') // char
                            client_search_char = prm[1];

                    }



                } else {
                    return '';
                }
            },
            workPerform = function () {
                // search by first character inside top select.
                $('a.by-char').click(function (e) {
                    e.preventDefault();
                    var $this = $(this);
                    if (!$this.hasClass('active')) {
                        resetSearchByChar()
                        client_search_char = $this.addClass('active').text().replace(/\s/g, '');
                        updateGrid();
                        assignSearchResultStyle();


                        // set url hash
                        if (client_search_char)
                            changeURL('#c=' + client_search_char);
                    }
                });

                // show clients by type (active, finished, all)
                $('#clientsTabs li a').click(function (e) {
                    e.preventDefault();
                    if (!$(this).closest('li').hasClass('active')) {
                        type = $(this).data('id');

                        resetSearchByChar();

                        // change url                        
                        changeURL('#t=' + type);

                        updateGrid();
                    }
                });

                // add new client
                $('a.addition').on('click', function () {
                    var title = "اضافة عميــــــل", modalDialog = "ClientModal", operation = "insert";
                    resetMyForm();
                    getUsername();
                    commonManger.showPopUpDialog(title, operation, modalDialog);
                });

                // checked clients
                $('#send-sms').click(function (e) {
                    e.preventDefault();
                    var mobile = $('.mobileNo').text(),
                        message = $('#msg').val();

                    if (message != '') {
                        var url = "sms-templates.aspx/SendSMS", dtoObject = { phones: mobile, message: message };
                        dataService.callAjax('Post', JSON.stringify(dtoObject), url, successSentData, commonManger.errorException);
                        enaleControl('send-sms', true);
                    } else {
                        commonManger.showMessage('حقول مطلوبة', 'برجاء التأكد من إدخال  نص الرسالة.');
                    }
                });

                // save client info
                $('.btn-save').on('click', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        form = 'aspnetForm',
                        url = 'Clients.aspx/SaveClient',
                        scParam = {
                            ClientID: $('#ClientID').val(),
                            full_name: $('#txtName').val(),
                            phone: $('#txtPhone').val(),
                            phone2: $('#phone2').val(),
                            countryCode: $('#countryCode').val(),
                            countryCode2: $('#countryCode2').val(),
                            user_name: $('#txtUsername').val(),
                            user_password: $('#txtPassword').val(),
                            user_type: $('#user_type').val(),
                            Notes: $('#Notes').val(),
                            send_sms: $('#cbSMS').is(':checked') ? true : false
                        },
                        DTO = { 'scParam': scParam, masterId: $('#MasterID').val() },

                        validFlag = applyValidation(); // validate form first


                    if (validFlag)
                        commonManger.doWork('ClientModal', form, url, DTO, function (data) {
                            successCallback(data.d, scParam);
                        }, commonManger.errorException);
                    else
                        return false;

                });


                // grid click events
                var oTable = $('#' + gridId).DataTable();

                // show children contractor
                $(document).delegate("#" + gridId + " tbody tr a.show-details-btn", "click", function (e) {
                    e.preventDefault();

                    var
                        _thisBtn = $(this),
                        _clientId = _thisBtn.data('cid'),
                        masterTR = _thisBtn.closest('tr'),
                        childsTR = masterTR.nextAll('tr[data-masterid="' + _clientId + '"]');


                    // exists before
                    if (childsTR.hasClass('detail-row')) {
                        masterTR.toggleClass('master-row')
                        childsTR.toggleClass('open');
                    }
                    else { // get childes rows
                        var bindRows = function (d) {
                            var dAll = commonManger.comp2json(d.d), jsn = dAll.list;

                            // children rows
                            var rowsHTML = $(jsn).map(function (i, v) {

                                // build row details
                                var $newRow = masterTR.clone(true);

                                $newRow.removeClass('master-row odd even').addClass('detail-row open').attr('data-masterid', v.MasterID)
                                    .find('td:eq(0)').html('<a data-rel="tooltip" title="سيارات العميل" href="ClientCars.aspx?id=' + v.ClientID + '"><i class="icon-long-arrow-left"></i> ' + v.full_name + '</a>');
                                $newRow.find('td:eq(1),td:eq(2)').text('');
                                $newRow.find('td:eq(3)').text(numeral(parseFloat(v.BalanceDebit) - parseFloat(v.BalanceCredit)).format('0,0'));
                                $newRow.find('td:eq(4)').text(numeral(v.PresentRequired).format('0,0'));
                                var net = (parseFloat(v.BalanceDebit * 1) - parseFloat(v.BalanceCredit * 1)) - (v.PresentRequired * 1);
                                $newRow.find('td:eq(5)').text(numeral(net).format('0,0'));
                                $newRow.find('td:eq(6)').html(
                                    '<span data-rel="tooltip" title="رصيد: ' + numeral((v.BalanceDebit * 1) - (v.BalanceCredit * 1)).format('0,0') + ' - مطلوب:' + numeral(v.TotalRequired).format('0,0') + '">' + numeral((v.BalanceDebit * 1) - (v.BalanceCredit * 1) - (v.TotalRequired * 1)).format('0,0') + '</span>'
                                );
                                var contracts = '';
                                if (v.user_type === '1') {
                                    contracts = '<li><a data-cid="' + v.ClientID + '" class="click contr" data-toggle="modal" data-target="#contracts" href="#contracts" title="عقود البيع">عقود البيع</a></li>';
                                }
                                var options = '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">اخـتـر <i class="icon-angle-down icon-on-right"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                        <li>\
                                            <a href="ClientCars.aspx?id=' + v.ClientID + '">سيارات العميل</a>\
                                        </li>\
                                        <li>\
                                            <a data-cid="' + v.ClientID + '" class="edit click" data-toggle="modal" data-target="#ClientModal" href="#ClientModal">تعديل بيانات العميل</a>\
                                        </li>' + contracts + '</div>';

                                $newRow.find('td:eq(7)').html(options);


                                // add children rows after master row
                                $($newRow).insertAfter(masterTR);


                                return $newRow;
                            }).get();


                            if (rowsHTML) {
                                masterTR.toggleClass('master-row');

                                updatableEvents();
                            }
                        };

                        getClientDetails(_clientId, bindRows, "Client_ChildsList");
                    }


                    $(this).find('i.ace-icon').toggleClass('icon-chevron-down').toggleClass('icon-chevron-up');

                });

                // edit, sms events
                $(document).delegate("#" + gridId + " tbody tr a.click", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr'), aData; // .index()
                    if (pos !== null) {
                        if (self.hasClass('edit')) {
                            var title = "تعديل بيانات العميــــــل", operation = 'edit',
                                modalDialog = 'ClientModal',
                                aData = oTable.row(pos).data(),
                                formCtrlBinding = function (row) {
                                    $('#ClientID').val(row.ClientID);
                                    if (row.MasterID) {
                                        $('#MasterID').select2("data", { id: row.MasterID, text: row.MasterName });
                                        $('.client-options').addClass('hidden');
                                    }
                                    $('#txtName').val(row.full_name);
                                    $('#txtPhone').val(row.phone);
                                    $('#phone2').val(row.phone2);
                                    $('#countryCode').val($.trim(row.countryCode));
                                    $('#countryCode2').val($.trim(row.countryCode2));
                                    $('#txtUsername').val(row.user_name);
                                    $('#txtPassword').val(row.user_password);
                                    $('#Notes').val(row.Notes);
                                    $('#user_type').val(row.user_type);
                                    $('#cbSMS').attr("checked", row.send_sms == '1' ? true : false);
                                };

                            // reset
                            resetMyForm();

                            if (aData != null) {
                                //assign value to hidden field
                                formCtrlBinding(aData);

                            }
                            else {

                                var bindFormContrls = function (data) {
                                    var dAll = commonManger.comp2json(data.d), jsn = dAll.list;


                                    if (jsn) {
                                        formCtrlBinding(jsn);
                                    }

                                },
                                    fName = 'Clients_One',
                                    cID = self.data('cid');

                                getClientDetails(cID, bindFormContrls, fName);
                            }
                        }
                        else if (self.hasClass('remove')) {
                            //assign value to hidden field
                            DeleteConfirmation(function () {
                                //aData = oTable.row(pos).data();
                                aData = oTable.row(pos).data();
                                var _id = aData["ClientID"];
                                commonManger.deleteData('anyThing', successDeleteback, commonManger.errorException, 'Clients', 'id', _id);
                            });
                        }
                        else if (self.hasClass('sms')) {
                            aData = oTable.row(pos).data();
                            // reset form
                            document.getElementById("smsForm").reset();
                            $('#smsForm')[0].reset();

                            if (aData != null) {
                                $('.mobileNo').text((aData.countryCode != null ? $.trim(aData.countryCode) : '00971') + aData.phone);
                                $('#msg').val($('#msg').val().replace('@username', aData.user_name).replace('@password', aData.user_password));
                            }
                        }
                    }
                });

                // select master contract (add/edit)
                $('#MasterID').on("change", function (e) {
                    var _masterId = $(this).val();
                    if (_masterId != '') {
                        $('.client-options').addClass('hidden');
                    } else {
                        $('.client-options').removeClass('hidden');
                    }

                });

                // fire grid instant search event.
                commonManger.searchData(oTable);


                // select all text in input focus
                $('input[type=text]').on('focus click', function () { $(this).select(); });

                // reset contract modal while hidden
                $('#contracts').on('hidden.bs.modal', function () {
                    // reset colors
                    resetContractBoxes();
                });

                // get destinations while contract popup open
                $('#contracts').on('show.bs.modal', function (e) {
                    var $invoker = $(e.relatedTarget);
                    
                    // fill contracts based on destination ports
                    // get all on the first open only.
                    var
                        __clientId = $invoker.attr('data-cid'),
                        dto = { actionName: 'Distinations_List' },
                        bindDestinations = function (data) {
                            var // result data in json fromat.
                                destList = commonManger.comp2json(data.d),
                                mainContractUrl = 'Contract.aspx?',
                                // full cars contracts/destination
                                fullCarsContracts = $(destList.list).map(function (i, v) {
                                    return `<div class="span4 widget-container-span">
                                                <div class="widget-box light-border">
                                                    <div class="widget-header">
                                                        <h5 class="smaller">${v.DistinationNameEn}</h5>
                                                    </div>
                                                    <div class="widget-body">
                                                        <div class="widget-main padding-6">
                                                            <a id="cont${v.DistinationID}11" data-href="${mainContractUrl}cotype=1&catype=1&dist=${v.DistinationID}&cid=" href="javascript:;" class="btn btn-block btn-app btn-light btn-mini">عمولة ثابتة</a>
                                                            <a id="cont${v.DistinationID}21" data-href="${mainContractUrl}cotype=2&catype=1&dist=${v.DistinationID}&cid=" href="javascript:;" class="btn btn-block btn-app btn-light btn-mini">عمولة قائمة</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                                }).get(),
                                // parts cars contracts
                                partsCarsContracts = $(destList.list).map(function (i, v) {
                                    return `<div class="span4 widget-container-span">
                                                <div class="widget-box light-border">
                                                    <div class="widget-header">
                                                        <h5 class="smaller">${v.DistinationNameEn}</h5>
                                                    </div>
                                                    <div class="widget-body">
                                                        <div class="widget-main padding-6">
                                                            <a id="cont${v.DistinationID}12" data-href="${mainContractUrl}cotype=1&catype=2&dist=${v.DistinationID}&cid=" href="javascript:;" class="btn btn-block btn-app btn-light btn-mini">عمولة ثابتة</a>
                                                            <a id="cont${v.DistinationID}22" data-href="${mainContractUrl}cotype=2&catype=2&dist=${v.DistinationID}&cid=" href="javascript:;" class="btn btn-block btn-app btn-light btn-mini">عمولة قائمة</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                                }).get();


                            // show full & parts contract for every destination port.
                            $('.full-Contracts').html(fullCarsContracts);
                            $('.part-Contracts').html(partsCarsContracts);


                            // wrap boxes with row-fluid class to
                            // enhance design view.
                            $.fn.wrapEvery = function (cLen, wrapperEl) {
                                while (this.length) {
                                    $(this.splice(0, cLen)).wrapAll(wrapperEl);
                                }
                            };
                            $('.full-Contracts').wrapEvery(3, '<div class="row-fluid">');
                            $('.part-Contracts').wrapEvery(3, '<div class="row-fluid">');

                            if (__clientId)
                                getClientCommissions(__clientId);
                        },
                        gotBefore = $('.list-contracts .span4').length;
                    
                    if (gotBefore <= 0)
                        dataService.callAjax('Post', JSON.stringify(dto),
                            sUrl + 'GetDataDirect', bindDestinations, commonManger.errorException);
                    else
                        if (__clientId)
                            getClientCommissions(__clientId);
                });

                updatableEvents();
            },
            updatableEvents = function () {
                // re init. tooltip
                $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip({ delay: 0 })
                    .on('hide.bs.tooltip', function (e) {
                        $('div.tooltip').hide();
                    }); // "container": 'body'

                //hide tooltip in grid
                $(document).on('mouseleave', '[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip', function () {
                    $(this).tooltip('hide');
                    $('.tooltip.fade.in').remove();
                });

            },
            resetContractBoxes = function () {
                $('#contracts div.header-color-pink').removeClass('header-color-pink'); // reset box color
                $('#contracts a[id].btn-danger').removeClass('btn-danger').addClass('btn-light').attr('href', 'javascript:;');
                $('#contracts a[id].disabled').removeClass('disabled').attr('href', 'javascript:;');
            },
            populateControls = function (data, id) {
                var
                    jsn = commonManger.comp2json(data),
                    json = jsn.list,

                    contr = 'Contract.aspx?',
                    fullCar = $('a[data-href]').map(function (i, v) {
                        return $(v).attr('data-href');
                    }).get();



                // assign current contract id for the client
                var assignClientCommission = function () {
                    $(json).each(function (i, v) {
                        var linkId = 'cont' + v.DistinationID + v.CommTypeID + v.ShippingCalcID, link = $('#' + linkId);

                        if (link) {
                            // assign contract link
                            link.attr('href', contr + 'id=' + v.ClientCommID);

                            // set link color
                            link.removeClass('btn-light').addClass('btn-danger');

                            // set container color
                            link.closest('div.widget-box').find('div.widget-header').addClass('header-color-pink');

                            // prevent assign other contract type for the same destination
                            link.closest('div').find('a:not([id=' + linkId + '])').attr('href', 'javascript:;').addClass('disabled');
                        }
                    });
                }


                // set default urls
                $('#contracts .modal-body a[id]').each(function () {
                    var $this = $(this), _id = $this.attr('data-href');
                    $this.attr('href', fullCar[fullCar.indexOf(_id)] + id).removeClass('disabled');
                    //// reset colors
                    resetContractBoxes();
                }).promise().done(function () {
                    assignClientCommission();
                });
                // setTimeout(assignClientCommission, 5000);
            },
            getClientCommissions = function (id) {
                var DTO = { actionName: 'ClientCommissons_SelectRow', value: id };

                dataService.callAjax('Post', JSON.stringify(DTO),
                    sUrl + 'GetData', function (data) {
                        populateControls(data.d, id);
                    }, commonManger.errorException);
            },
            getUsername = function () {
                $.ajax({
                    type: "POST",
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    url: 'Clients.aspx/GetUsername',
                    data: '{ }',
                    success: function (data) {
                        $('#txtUsername,#txtPassword').val(data.d);
                    },
                    beforeSend: function () {
                        $(".sinpper").html("<i class='icon-spinner icon-spin orange bigger-125'></i>");
                    },
                    complete: function () {
                        $(".sinpper").html("");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        commonManger.showMessage("خطأ فى انشاء اسم المستخدم!", "لم يتم العثور على اسم مستخدم لهذا العميل.");
                    }
                });
            },
            successCallback = function (savedResult, clientInfo) {
                if (savedResult.Status) {
                    // success save

                    // hide modal
                    $('#ClientModal').modal('hide');

                    // refresh grid
                    updateGrid();

                    // show save notification
                    commonManger.showMessage('تمت عملية الإضافه بنجاح.', savedResult.Message); // save alert


                    // if new and permanent clients send sms to his mobile.
                    if (clientInfo.ClientID == '0') { // && clientInfo.user_type == '1')
                        // new client
                        //sendSMS(clientInfo);
                    }
                }
            },
            successDeleteback = function (data) {
                data = data.d;
                if (data.Status) {
                    commonManger.showMessage('تمت العملية بنجاح.', data.message);
                    updateGrid();
                } else {
                    commonManger.showMessage('لم يتم الحذف.', data.Message);
                }
            },
            applyValidation = function (formId) {
                // Validate the form and retain the result.
                var isValid = false;
                if ($('#txtName').val() !== "" && $('#txtUsername').val() !== "" && $('#txtPassword').val() !== "")
                    isValid = true;
                return isValid;
            },
            showHideButton = function () {
                var cnt = $('#' + gridId + ' tbody td input[type=checkbox]:checked');
                $('.sms-adding a.btnArchiveList').remove();
                if (cnt.length > 0)
                    $('.sms-adding').append('<a href="javascript:void(0)" onclick="pageManager.archiveExpenses();" class="btn btn-info btn-mini btnArchiveList">ارسل رسالة</a>')
            },
            xhr = null,
            filllistItems = function () {
                var oTable = $('#' + gridId).DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }],
                    "processing": true,
                    "bServerSide": true,
                    responsive: true,
                    "bDestroy": true,
                    'language': {
                        'search': '_INPUT_',
                        'searchPlaceholder': 'باسم العميل - رقم الجوال',
                        "processing": "<div class='widget-box-overlay'><i class='ace-icon fa fa-spinner fa-spin orange bigger-125'></i></div>"
                    },
                    "sAjaxSource": "Clients.aspx/LoadData",
                    "iDisplayLength": 25,
                    "order": [[0, "asc"]],
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "type", "value": type });
                        if (client !== '') {
                            aoData.push({ "name": "client", "value": client });
                        }
                        if (client_search_char !== undefined && client_search_char !== null) {
                            aoData.push({ "name": "client_char", "value": client_search_char });
                        }
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {

                        // cancel previous response
                        if (xhr && xhr !== null) {
                            xhr.abort();
                        }

                        xhr = dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                            updatableEvents();
                        }, commonManger.errorException);
                    },
                    stateSaveCallback: function (settings, data) {
                        localStorage.setItem('DTC_' + settings.sInstance, JSON.stringify(data))
                    },
                    stateLoadCallback: function (settings) {
                        return JSON.parse(localStorage.getItem('DTC_' + settings.sInstance))
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var _net = 0, allRequired = 0;

                        for (var i = 0; i < aData.length; i++) {
                            var __required = (parseFloat(aData[i].BalanceDebit) - parseFloat(aData[i].BalanceCredit)) - (aData[i].PresentRequired * 1);
                            _net += __required;

                            allRequired += parseFloat(((aData[i].BalanceDebit * 1) - (aData[i].BalanceCredit * 1)) + ((aData[i].SubDebit * 1) - (aData[i].SubCredit * 1)) - (aData[i].TotalRequired * 1) - (aData[i].SubTotal * 1));
                        }


                        // net total (الصافي)
                        $('.netTotal').text(numeral(_net).format('0,0'));


                        // total all required on clients
                        $('.all-required').html(numeral(allRequired).format('0,0'))

                    },
                    "createdRow": function (row, data, dataIndex) {
                        // check if a child account.
                        if (data.MasterID) {
                            $(row).addClass('detail-row');
                        }
                    },
                    "aoColumns": [
                        {
                            "bSortable": true,
                            "mData": function (d) {
                                var starClient = '';

                                if (d.user_type === '1') {
                                    starClient = '<span class="badge badge-yellow" data-rel="tooltip" title="عميل دائم/عقد"><i class="icon-asterisk"></i></span>';
                                    starClient += (d.MasterAs && d.MasterAs > 0) ? '<div class="action-buttons pull-left"><a data-cid="' + d.ClientID + '" data-rel="tooltip" title="حسابات فرعية" href="javascript:void(0);" class="blue bigger-150 show-details-btn"><i class="ace-icon icon-chevron-down"></i></a></div>' : '';
                                }

                                return '<a data-rel="tooltip" href="ClientCars.aspx?id=' + d.ClientID + '" title="سيارات العميل">' + d.full_name + '</a> ' + starClient;
                            }
                        },
                        {
                            "mDataProp": "phone",
                            "bSortable": false,
                            "sClass": "hidden-480"
                        },
                        {
                            "mDataProp": "user_name",
                            "bSortable": false,
                            "sClass": "hidden-480"
                        },
                        {
                            "mDataProp": "BalanceDebit",
                            "bSortable": false,
                            "mData": function (data) {
                                return numeral(parseFloat(data.BalanceDebit) - parseFloat(data.BalanceCredit)).format('0,0');
                            }
                        },
                        {
                            "mData": "PresentRequired",
                            "bSortable": false,
                            'mData': function (d) {
                                return numeral(d.PresentRequired).format('0,0');
                            }
                        },
                        {
                            "bSortable": false, // the net = balance - required
                            "mData": function (d) {
                                var net = (parseFloat(d.BalanceDebit ? d.BalanceDebit * 1 : 0) - parseFloat(d.BalanceCredit ? d.BalanceCredit * 1 : 0)) - (d.PresentRequired * 1);
                                return numeral(net).format('0,0');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-480",
                            "mData": function (d) { // All required after current balance
                                return '<span data-rel="tooltip" title="رصيد: ' + numeral((d.BalanceDebit * 1) - (d.BalanceCredit * 1)).format('0,0') + ' - مطلوب:' + numeral(d.TotalRequired).format('0,0') + '">' + numeral((d.BalanceDebit * 1) - (d.BalanceCredit * 1) - (d.TotalRequired * 1)).format('0,0') + '</span>';
                            }
                        },
                        {
                            "sClass": "hidden-print",
                            "bSortable": false,
                            "mData": function (oObj) {
                                var contracts = '';
                                if (oObj.user_type === '1') {
                                    contracts = '<li><a href="clientbuyers.aspx?client=' + oObj.ClientID + '" title="تحديد الباير">تحديد الباير</a></li>\
                                             <li><a data-cid="'+ oObj.ClientID + '" class="click contr" data-toggle="modal" data-target="#contracts" href="#contracts" title="عقود البيع">عقود البيع</a></li>';
                                }
                                return '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">اخـتـر <i class="icon-angle-down icon-on-right"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                        <li>\
                                            <a href="ClientCars.aspx?id=' + oObj.ClientID + '">سيارات العميل</a>\
                                        </li>\
                                        <li>\
                                            <a data-cid="' + oObj.ClientID + '" class="edit click" data-toggle="modal" data-target="#ClientModal" href="#ClientModal">تعديل بيانات العميل</a>\
                                        </li>\
                                        <li>\
                                            <a class="sms click" data-toggle="modal" data-target="#addSMS" href="#addSMS" title="ارسل بيانات الدخول في رسالة للجوال">ارسل رسالة جوال</a>\
                                        </li>' + contracts + '</div>'
                            }
                        }
                    ]
                });
            },
            sendSMS = function (info) {

                var smsObj = {
                    // sms message contains Car No.
                    message: 'تم إنشاء حسابك باسم: ' + info.user_name + ' كلمة سر: ' + info.user_password + ' www.iraqusedcars.ae',
                    // mobile(s) number that will receive the message
                    phones: ((info.phone != '' && info.countryCode != '' ? info.countryCode + info.phone + ',' : '') +
                        (info.phone2 != '' && info.countryCode2 != '' ? info.countryCode2 + info.phone2 : '')).replace(/,(\s+)?$/, '')
                },


                    arrSMS = [smsObj.phones + '|' + smsObj.message + '|' + info.full_name];


                // call web service
                var url = "sms-templates.aspx/BulkSMS", dtObject = { messages: arrSMS };
                dataService.callAjax('Post', JSON.stringify(dtObject), url, successSMSSent, commonManger.errorException);


            },
            successSMSSent = function (data) {
                data = data.d;

                var sentMessage = '';

                // create user notofication
                for (var i = 0; i < data.length; i++) {

                    // cliet name and sending results
                    var msgClient = data[i].split('|');

                    // success sending the message
                    if (msgClient[0].indexOf('Successful') > 0)
                        sentMessage += '<p>تم ارسال بيانات الدخول لجوال العميل: ' + msgClient[1] + '</p>';
                    else
                        sentMessage += '<p>لم ترسل رسالة لجوال العميل: ' + msgClient[1] + '</p>';
                }

                if (sentMessage != '')
                    commonManger.showMessage('تم حفظ بيانات العميل بنجاح:', sentMessage);
            };

        return {
            Init: Init,
            applyValidation: applyValidation,
            successCallback: successCallback
        };

    }();