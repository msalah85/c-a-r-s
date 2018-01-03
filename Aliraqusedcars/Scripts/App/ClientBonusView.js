var pageManager = pageManager | {},
    pageManager = function () {
        var
            cid = '', from = '', to = '',


            Init = function () {
                filllistItems();
                pageEvents();
            },
            pageEvents = function () {
                $('#SearchAll').on('click', function (e) {
                    e.preventDefault();
                    // get search parameters
                    cid = $('#ClientID').val(),
                    from = commonManger.dateFormat($('#From').val()) != '' ? commonManger.dateFormat($('#From').val()) : '',
                    to = commonManger.dateFormat($('#To').val()) != '' ? commonManger.dateFormat($('#To').val()) : '';
                    filllistItems(); // refresh list
                });

                // apply cancellation
                $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                    e.preventDefault();
                    var _bID = $('#BonusID').val(),
                        reason = $('#DeleteReason').val(),
                        successDelete = function (data) {
                            data = data.d;
                            $('.modal').modal('hide');
                            commonManger.showMessage('تم تنفيذ الإجراء بنجاح.', data.message);
                            if (data.Status) {
                                $('#listItems').DataTable().draw();
                            }
                        };


                    if (_bID && reason != '') { // not empty
                        // delete parameters
                        var names = ['BonusID', 'Reason'], values = [_bID, reason],
                            functionName = "ClientsBonus_Delete", DTO = { 'actionName': functionName, 'names': names, 'values': values };
                        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'saveData', successDelete, commonManger.errorException);
                    } else {
                        commonManger.showMessage('حقول مطلوبة', 'يرجي ادخال سبب الإلغاء أولاً.');
                        $('#DeleteReason').focus();
                    }
                });
            },
            delButton = function () {
                var _delBtn = ' <button class="btn btn-minier btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button> ', deleteMe = commonManger.fullRoles();            
                return deleteMe ? _delBtn : '';
            },
            filllistItems = function () {
                var
                    pTable = $('#listItems').DataTable({
                        "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                        buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                            {
                                text: 'طباعة',
                                action: function (e, dt, node, config) {
                                    $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                                    window.print();
                                }
                            }
                        ],
                        "bDestroy": true,
                        "bServerSide": true, responsive: true, stateSave: true,
                        "sAjaxSource": sUrl + "LoadDataTablesXML",
                        "fnServerParams": function (aoData) {
                            var vals = cid + '~' + from + '~' + to;
                            aoData.push({ "name": "funName", "value": 'ClientsBonus_SelectList' },
                                { "name": "names", "value": 'ClientID~From~To' }, { "name": "values", "value": vals });
                        },
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            dataService.callAjax('GET', aoData, sSource, function (data) { // get data as json format from xml
                                commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                            }, commonManger.errorException);
                        },
                        "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                            var tot = 0;
                            for (var i = 0; i < aData.length; i++) {
                                tot += aData[i]["Amount"] * 1;
                            }
                            $('strong.debit').text(numeral(tot).format('0,0'));
                        },
                        "aaSorting": [],
                        "iDisplayLength": 50,
                        "aoColumns": [
                            {
                                "mDataProp": "BonusID",
                                "bSortable": true,
                                "type": 'number'
                            },
                            {
                                "mDataProp": "AddDate",
                                "bSortable": true,
                                "mData": function (data) {
                                    return commonManger.formatJSONDateCal(data.AddDate);
                                }
                            },
                            {
                                "mDataProp": "full_name",
                                "bSortable": false,
                                "mData": function (data) {
                                    return '<a href="ClientCars.aspx?id=' + data.ClientID + '">' + data.full_name + '</a>';
                                }
                            },
                            {
                                "mDataProp": "Amount",
                                "bSortable": false,
                                "mData": function (d) {
                                    return numeral(d.Amount).format('0,0');
                                }
                            },
                            {
                                "mDataProp": "AmountDhs",
                                "bSortable": false,
                                "mData": function (d) {
                                    return numeral(d.AmountDhs).format('0,0.00');
                                }
                            },
                            {
                                "mDataProp": "Notes",
                                "bSortable": false
                            },
                            {
                                "sClass": 'hidden-print',
                                "bSortable": false,
                                "mData": function (oObj) {
                                    var revised = '';
                                    if (oObj.Revised === 'false') {
                                        revised = '<a class="btn btn-minier btn-info" href="ClientBonusAdd.aspx?id=' + oObj.BonusID + '" title="تعديل"><i class="icon-edit"></i></a> ';
                                    }
                                    
                                    return revised +
                                        '<a href="ClientBonusPrint.aspx?id=' + oObj["BonusID"] + '" class="btn btn-minier btn-success" data-rel="tooltip" title="طباعة" data-original-title="طباعة"><i class="icon-print"></i></a>' +
                                        delButton();
                                }
                            }
                        ]
                    });

                $("#listItems tbody").delegate("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr').index(), aData;
                    if (pos != null) {
                        if (self.hasClass('remove')) {
                            var title = "إلغاء إيداع عميل", modalDialog = 'cancelModal';
                            aData = pTable.row(pos).data(); //get data of the clicked row

                            $('#BonusID').val(aData['BonusID']);
                            $('#AddDate').val(commonManger.formatJSONDateCal(aData['AddDate']));
                            $('#Amount').val(numeral(aData['Amount']).format('0,0'));

                            commonManger.showPopUpDialog(title, '', modalDialog);
                        }
                    }
                });
            };
        return {
            Init: Init
        };
    }();