var pageManager = function () {
    var shipper = null, paid = null, from = null, to = null, container = null,
        Init = function () {
            filllistItems();
            setDataToSearch();
            bindEvents();
        },
        bindEvents = function () {
            // start search
            $('#btnSearchAll').click(function (e) {
                e.preventDefault();
                shipper = $('#Shipper').val(), paid = $('#Paid').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val()), container = $('#ContainerNo').val();
                // show header title for print
                commonManger.showOptionPrintTitle($('#Paid option:selected').text());
                updateGrid();
            });

            // undo selection
            $('.payUndo').click(function (e) {
                e.preventDefault();
                resetSelectedInvoices();
            });
        },
        resetSelectedInvoices = function () {
            $('.payNow,.payUndo').addClass('hidden'); $('input[name$=ToCheck]').val('');
            $(".op-acity:checked").map(function () { $(this).attr("checked", false); return this.value; });
        },
        BindListSearch = function (list, id) { // shippers for search          
            for (var i = 0; i < list.length; i++) {
                if (list[i].CustomsCompanyID > 0)
                    $('#' + id).append($("<option />").attr("value", list[i].CustomsCompanyID).text(list[i].CustomsCompanyNameAr));
            }
            $('#' + id).chosen().trigger('chosen:updated').trigger("liszt:updated");
        },
        setDataToSearch = function () {
            var functionName = "CustomsInvoices_Properties2", DTO = { 'actionName': functionName };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect',
              function (data) {
                  var jsnData = commonManger.comp2json(data.d), myList = jsnData.list;
                  BindListSearch(myList, 'Shipper');
              }, commonManger.errorException);
        },
        assignInvoicesToPay = function (cntrol) {
            // validate the same shipper & distination
            var $compCheck = $('input[name=compToCheck]'), // place for compareson
                currentComp = cntrol.attr('data-comp'); // data to compare

            if ($compCheck.val() !== '') {
                if ($compCheck.val() !== currentComp) {
                    commonManger.showMessage('خطأ بالاختيار', 'برجاء اختيار الفواتير التابعة لشاحن واحد.');
                    cntrol.removeAttr('checked');
                    return;
                }
            } else { // save selected shipper & distination
                $compCheck.val(currentComp);
            }

            // get all of selected cars
            var ids = $("input[data-comp]:checked").map(function () { return this.value; }).get().join(",");
            $('.payNow').attr('href', 'CustomspaymentsDetails.aspx?co=' + $compCheck.val() + '&ids=' + ids);

            // show/hide go to bol button.
            if ($('.op-acity:checked').is(':checked')) {
                $('.payNow,.payUndo').removeClass('hidden');
            }
            else {
                $('.payNow,.payUndo').addClass('hidden');
                $('input[name$=ToCheck]').val('');
            }
        },
        updateGrid = function () {
            $('#listItems').DataTable().draw();
        },
        filllistItems = function () {
            var pTable = $('#listItems').DataTable({
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
                "bDestroy": true,
                "bServerSide": true, responsive: true,
                "sAjaxSource": "InvoicesCustomsView.aspx/LoadData",
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        data.d.aaData = $.parseJSON(data.d.aaData); fnCallback(data.d);

                        $('.sum-total-all').text(numeral(data.d.TotalSum).format('0,0'));
                        $('.sum-total-all-dhs').text(numeral(data.d.TotalSumDhs).format('0,0'));
                    }, commonManger.errorException);
                },
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "Shipper", "value": shipper },
                                { "name": "Paid", "value": paid }, { "name": "From", "value": from },
                                { "name": "Container", "value": container }, { "name": "To", "value": to });
                },
                "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                    var tot = 0, totDhs = 0;
                    for (var i = 0; i < aData.length; i++) {
                        tot += (aData[i]["TotalAmount"] * 1);
                        totDhs += (aData[i]["TotalAmountDhs"] * 1);
                    }
                    $(nFoot).find('th:eq(1)').text(numeral(tot).format('0,0'));
                    $(nFoot).find('th:eq(2)').text(numeral(totDhs).format('0,0'));
                },
                //"drawCallback": function (settings) {
                //    var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), invHeader = $('#listItems thead').html(), last0 = null, spacer = '<tr class="spacer"><td colspan="100%"></td>';
                //    // show every invoice info
                //    api.column(0, { page: 'current' }).data().each(function (group, i) {
                //        if (last0 !== group) {
                //            $(rows).eq(i).before('</tr><tr class="group alert alert-warning"><td colspan="100%">' + group + '</td></tr>' + invHeader);
                //            last0 = group;
                //        }
                //    });
                //    // show subtotal for every invoice
                //    var invNo = '', lastIndex = 0, lastTotAmount = 0;
                //    // sub total after every group
                //    api.rows().every(function (rowIdx, tableLoop, rowLoop) {
                //        var data = this.data();
                //        if (invNo !== '' && data.InvoiceNo !== invNo) {
                //            $(rows).eq(lastIndex).after('<tr class="alert alert-info"><td class="sp-bord-btom" colspan="2"><span class="pull-left">إجمالى الفاتورة</span></td><td class="sp-bord-btom">' + lastTotAmount + '</td></tr>' + spacer);
                //        }
                //        invNo = data.InvoiceNo; lastIndex = rowIdx; lastTotAmount = data.TotalAmount;
                //    });
                //    // set latest group subtotal
                //    if (lastIndex > 0 && lastTotAmount > 0) {
                //        $(rows).eq(lastIndex).after('<tr class="alert alert-info"><td class="sp-bord-btom" colspan="2"><span class="pull-left">إجمالى الفاتورة</span></td><td class="sp-bord-btom">' + lastTotAmount + '</td></tr>' + spacer);
                //    }
                //},
                "iDisplayLength": 50,
                "aoColumns": [
                    {
                        "mDataProp": "CustomsInvoiceID",
                    },
                    {
                        "mDataProp": "InvoiceDate",
                        "mData": function (d) {
                            return commonManger.formatJSONDateCal(d.InvoiceDate);
                        }
                    },
                    {
                        "mDataProp": "InvoiceNo",
                    },
                    {
                        "mDataProp": "CustomsCompanyNameAr"
                    },
                    {
                        "mDataProp": "ArrivalDate",
                        "bSortable": false,
                        "mData": function (d) {
                            return commonManger.formatJSONDateCal(d.ArrivalDate);
                        }
                    },
                    {
                        "mDataProp": "ContainerNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "TotalAmount", // اجمالى
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.TotalAmount).format('0,0');
                        }
                    },
                    {
                        "mDataProp": "TotalAmountDhs", // اجمالى
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.TotalAmountDhs).format('0,0');
                        }
                    },
                    {
                        "bSortable": false,
                        'sClass': 'hidden-print',
                        "mData": function (oObj) {
                            var selectToPay = '';
                            if (!oObj.Paid) {
                                selectToPay = '<input title="اختر لدفع الفاتورة" type="checkbox" data-comp=' + oObj.CustomsCompanyID + ' value=' + oObj.CustomsInvoiceID + ' class="op-acity" />';
                            }

                            var editctrl = oObj.IsEdit ? '<a class="btn btn-mini btn-danger remove" title="حــذف" href="javascript:void(0);"><i class="icon-trash icon-only"></i></a>' : '';
                            return '<div class="tools pull-left hidden-print">' + selectToPay + ' <a class="btn btn-mini btn-grey" title="طباعه" href="InvoicesCustomsPrint.aspx?id=' + oObj['CustomsInvoiceID'] + '"><i class="icon-print icon-only"></i></a> ' + editctrl + '</div>';
                        }
                    },
                ]
            });

            $("#listItems tbody").delegate("tr a.remove", "click", function (e) {
                e.preventDefault();
                var self = $(this), pos = self.closest('tr').index(), aData;
                if (pos !== null) {
                    DeleteConfirmation(function () {
                        aData = pTable.fnGetData(pos);
                        var _id = aData["CustomsInvoiceID"];
                        commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'CustomsInvoices', 'CustomsInvoiceID', _id);
                    });
                }
            });
            $("#listItems tbody").delegate("tr .op-acity:checkbox", "change", function (e) {
                e.preventDefault();

                var self = $(this);
                assignInvoicesToPay(self);
            });
        };
    return {
        Init: Init
    };
}();