//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var pageManager = pageManager || {},
    pageManager = function () {
        "use strict";

        var
            // GLOBAL VARIABLES

            // PAGE METHODS
            Init = function () {
                filllistItems();
            },
            bindEvent = function () {

                // search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    buyer = $('#Buyer').val(), chassis = $('#ChassisN').val(), paid = $('#Paid').val(), from = commonManger.dateFormat($('#From').val()), to = commonManger.dateFormat($('#To').val());
                    // show header title for print
                    commonManger.showOptionPrintTitle($('#Paid option:selected').text());
                    updateGrid();
                });


                // calculate total amount
                $('#CreateReceiptPayment').on('show.bs.modal', function (e) {
                    var __amount = 0, buyersNo = 0, carsNo = 0, latestBuyerName = null, carIds = [];

                    $('input[name="payReceipt"]').each(function () {
                        __amount += parseFloat($(this).val());
                        carIds.push($(this).attr('data-id'));
                        carsNo++;

                        var bName = $(this).attr('data-buyer');
                        if (bName !== latestBuyerName) {
                            buyersNo++;
                            latestBuyerName = bName;
                        }
                    });

                    $('#IDs').val(carIds.join(','));
                    $('#noCars').val(carsNo);
                    $('#noBuyers').val(buyersNo);
                    $('#totalAmount').val(__amount);

                    calculateTotalDhs();
                });

                // recalculate after adding Fines
                $('#Fines').on('blur change keyup', function () {
                    calculateTotalDhs();
                });

                // go to receipt
                $('#CreateReceiptPayment .modal-footer .btn-success').click(function (e) {
                    e.preventDefault();
                    var ids = $('#IDs').val(), amount = $('#totalAmountDhs').val();

                    if (amount > 0)
                        window.location.href = 'ReceiptPaymentsAdd.aspx?pamount=' + amount + '&ids=' + ids;
                    else
                        $('.modal').modal('hide');
                });

            },
            //calculateTotalDhs = function () {
            //    var _amount = $('#totalAmount').val(), buyersNo = $('#noBuyers').val(), fines = $('#Fines').val(), commiss = $('#commission').val();
            //    var totalAmountDhs = ((parseFloat(_amount) + parseFloat(fines)) * 3.674) + (parseInt(buyersNo) * parseFloat(commiss));
            //    $('#totalAmountDhs').val(totalAmountDhs.toFixed());
            //},
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
                    deferRender: true,
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": 'Rents_List' }); //, { "name": "names", "value": 'Buyer~Paid~Chassis~From~To' }, { "name": "values", "value": buyer + '~' + paid + '~' + chassis + '~' + from + '~' + to });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "bSortable": true,
                            "mData": "Year",
                        },
                        {
                            "mData": function (d) {
                                return commonManger.formatJSONDateCal(d.DuDate, 'dd/MM/yyyy');
                            },
                        },
                        {
                            "mData": function (d) {
                                return numeral(d.Amount).format('0,0');
                            },
                            "bSortable": false
                        },
                        {
                            "mData": "Notes",
                            "bSortable": false
                        },
                        {
                            "mData": function (d) {
                                // view or create Receipt payment
                                return d.ReceiptID ? '<i class="icon-ok green"></i> <a title="عرض سند الصرف" href="ReceiptPaymentsPrint.aspx?id=' + d.ReceiptID + '">' + d.ReceiptID + '</a>' : '<a title="انشاء سند صرف" href="ReceiptPaymentsAdd.aspx?rentamount=' + numeral(d.Amount).format('0') + '&ids=' + d.RentDetailsID + '">سند صرف</a>';
                            },
                            "bSortable": false
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (d) {
                                return d.ReceiptID ? '' : '<a href="CompanyRentsAdd.aspx?id=' + d.RentID + '" class="hidden-print btn btn-mini btn-info pull-left" title="تعــديل"><i class="icon-edit icon-only"></i></a>';
                            }
                        }
                    ]
                });
            };
        return {
            Init: Init
        };
    }();