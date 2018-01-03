//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var pageManager = function () {
    "use strict";
    var
        // GLOBAL VARIABLES
        buyer = '', paid = '', chassis = '', from = '', to = '', client = '', isGroupingBuyer = false,

        // PAGE METHODS
        Init = function () {

            // chech late
            var qsPayType = commonManger.getQueryStrs().paid;
            if (qsPayType) {
                paid = qsPayType;
                $('#Paid').val(qsPayType);
            }

            filllistItems();
            bindEvent();
        },
        bindEvent = function () {
            // search
            $('#btnSearchAll').click(function (e) {
                e.preventDefault();
                buyer = $('#Buyer').val(), chassis = $('#ChassisN').val(), paid = $('#Paid').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val()), client = $('#ClientID').val(), isGroupingBuyer = $('.buyerGrouping').is(':checked');
                // show header title for print
                commonManger.showOptionPrintTitle($('#Paid option:selected').text());
                updateGrid();
            });
            
            // cancel invoice
            $('#cancelModal .modal-footer .btn-danger').on('click', function (e) {
                e.preventDefault();

                var _carID = $('#cancelCarID').val(),
                    cancelReason = $('#cancelNotes').val(),
                    successCallback = function (data) {
                        data = data.d;

                        //  show message.
                        $('div[id$=Modal].modal').modal('hide');
                        commonManger.showMessage('تم تنفيذ الإجراء:', data.message);

                        // update cars list.
                        if (data.Status) {
                            updateGrid();
                        }


                    };

                if (_carID && cancelReason != '') {
                    var form = 'aspnetForm', DTO = { actionName: 'CarsData_Delete', names: ['CarID', 'Reason'], values: [_carID, cancelReason] };
                    commonManger.doWork('cancelModal', form, sUrl + 'saveData', DTO, successCallback, commonManger.errorException);
                }
                else {
                    commonManger.showMessage('بيانات مطلوبة', 'يرجي التحقق من رقم السيارة وسبب الحذف أولاً.'); $('#cancelNotes').focus();
                }

            });

        },
        calculateTotalDhs = function () {
            var _amount = $('#totalAmount').val(), buyersNo = $('#noBuyers').val(), fines = $('#Fines').val(), commiss = $('#commission').val();
            var totalAmountDhs = ((parseFloat(_amount) + parseFloat(fines)) * 3.674) + (parseInt(buyersNo) * parseFloat(commiss));
            $('#totalAmountDhs').val(totalAmountDhs.toFixed());
        },
        updateGrid = function () {
            $('#listItems').DataTable().draw();
        },
        jsonToQueryString = function (json) {
            return '?' +
                Object.keys(json).map(function (key) {
                    return encodeURIComponent(key) + '=' +
                        encodeURIComponent(json[key]);
                }).join('&');
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
                }],
                "serverSide": true,
                "processing": true,
                stateSave: true,
                deferRender: true,
                responsive: true,
                "bRetrieve": false,
                "bDestroy": true,
                "sAjaxSource": sUrl + 'LoadDataTablesXML',
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "funName", "value": 'InvoicePay_SelectList' }, { "name": "names", "value": 'Buyer~Paid~Chassis~From~To~ClientID' }, { "name": "values", "value": buyer + '~' + paid + '~' + chassis + '~' + from + '~' + to + '~' + client });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {

                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1;
                        jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];

                        // create object for datatables control
                        var objDT = {
                            sEcho: aoData.sEcho ? aoData.sEcho : 0,
                            iTotalRecords: jsn1[0],
                            iTotalDisplayRecords: jsn1[0],
                            aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                        };


                        // bind DT data
                        fnCallback(objDT);


                        // show all pages total
                        if (jsn1) {
                            $('.sum-total-all').text(numeral(jsn1[1]).format('0,0'));
                        }

                    }, commonManger.errorException);
                },
                "drawCallback": function (settings) {
                    if (isGroupingBuyer) { // group by buyer
                        var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null; // repeater table header with every invoice.
                        // show invoice info
                        api.column(1, { page: 'current' }).data().each(function (group, i) {
                            if (last !== group) {
                                $(rows).eq(i).before('<tr class="alert alert-success"><td colspan="100%" title="رقم الباير واسم المزاد"><strong>رقم الباير: </strong>' + group + '</td></tr>');
                                last = group;
                            }
                        });
                    }
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.PayInvTypeID === 3)
                        $(nRow).addClass("car-relist");
                },
                "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                    var tot = 0; //, isNotReceipted = 0;
                    for (var i = 0; i < aData.length; i++) {
                        tot += aData[i]["PayPrice"] * 1;
                    }
                    $(nFoot).find('th:eq(1)').html(numeral(tot).format('0,0.00'));
                },
                "iDisplayLength": 50,
                "aaSorting": [],
                "aoColumns": [
                    {
                        "mDataProp": "MainPicture",
                        "bSortable": false,
                        "render": function (data, type, d) { // d==row
                            return '<a title="صور السيارة رقم: ' + d.CarID + '" href="images.aspx?id=' + d.CarID + '">' + ((d.MainPicture && d.MainPicture !== null) ? '<img alt=\"car\" src=\"/public/cars/' + d.CarID + '/_thumb/' + d.MainPicture + '\" />' : '<img alt=\"car\" src="/public/cars/noimage.gif" />') + '</a>';
                        }
                    },
                    {
                        "bSortable": false,
                        "bVisible": (!isGroupingBuyer), // group by buyer
                        "mData": function (data) {
                            if (data.PayInvTypeID === 3) // relist
                                return (data.BuyerName ? data.BuyerName + ' - ' : '') + data.full_name;
                            else
                                return (data.BuyerName ? data.BuyerName + ' - ' : '') + (data.AuctionName ? data.AuctionName + ' - ' : '') + data.full_name;
                        }
                    },
                    {
                        "mDataProp": "CarID",
                        "bSortable": true,
                        'sType': 'numeric',
                    },
                    {
                        "mDataProp": "InvoiceDate",
                        "bSortable": true,
                        "mData": function (oObj) {
                            return commonManger.formatJSONDateCal(oObj['InvoiceDate'], 'dd/MM/yyyy');
                        }
                    },
                    {
                        "mDataProp": "LotNo",
                        "bSortable": false
                    },
                    {
                        "mDataProp": "TypeNameEn",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + (oObj['PayInvTypeID'] == 3 ? ' - Relist' : '') + '</a>';
                        }
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": false
                    },
                    {
                        "mData": function (d) { return d.ShipCompanyNameEn ? d.ShipCompanyNameEn : ''; },
                        "bSortable": false
                    },
                    {
                        "mData": function (d) {
                            return numeral(d.PayPrice).format('0,0.00');
                        },
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "sClass": "hidden-print",
                        "mData": function (oObj) {
                            var _delBtn = '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف" title="حــذف"><i class="icon-remove icon-only"></i></button>', deleteMe = commonManger.fullRoles();

                            if (!oObj.SaleClientName || !oObj.PayInvoicePaymentsID || !oObj.IsShippingCarPaid)
                                return '<div class="tools pull-left hidden-print"><a href="pay/' + oObj["CarID"] + '/InvoicePayAdd.aspx" class="hidden-print btn btn-mini btn-info" data-rel="tooltip" data-placement="top" title="تعــديل" data-original-title="تعــديل"><i class="icon-edit icon-only"></i></a> ' + (deleteMe ? _delBtn : '') + '</div>';
                            else { return '---'; }
                        }
                    }
                ]
            });

            $("#listItems tbody").delegate("tr button", "click", function (e) {
                e.preventDefault();

                var self = $(this), pos = self.closest('tr').index(), aData;

                if (pos !== null) {
                    if (self.hasClass('remove')) {
                        aData = pTable.row(pos).data();

                        // bind car info.
                        $('#cancelCarID').val(aData.CarID);
                        $('#cancelCarModel').val(aData.MakerNameEn + ' - ' + aData.TypeNameEn + ' - ' + aData.Year);
                        $('#cancelNotes').val(''); // reset reason

                        // show cancel modal
                        $('#cancelModal').modal('show');

                        //DeleteConfirmation(function () {
                        //     var _id = aData["CarID"];
                        //    commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'CarsData', 'CarID', _id);
                        //});
                    }
                }
            });
        };
    return {
        Init: Init
    };
}();