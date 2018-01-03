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
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var
                    empId = commonManger.getQueryStrs().id,
                    pTable = $('#listItems').DataTable({
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
                            aoData.push({ "name": "funName", "value": 'Rents_List' }, { "name": "names", "value": 'EmpID' }, { "name": "values", "value": empId ? empId : '' });
                        },
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            dataService.callAjax('GET', aoData, sSource, function (data) {
                                var jsnData = comp2Json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2;

                                jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];

                                // create obejct for datatables control
                                var objDT = {
                                    sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                    iTotalRecords: jsn1[0],
                                    iTotalDisplayRecords: jsn1[0],
                                    aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                                }

                                // bind DT data
                                fnCallback(objDT);

                                if (jsn2) {
                                    $('.emp-name').text(jsn2.UserFullName);
                                }

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
                                    return d.ReceiptID ? '<i class="icon-ok green"></i> <a title="عرض سند الصرف" href="ReceiptPaymentsPrint.aspx?id=' + d.ReceiptID + '">' + d.ReceiptID + '</a>' : '<a title="انشاء سند صرف" href="ReceiptPaymentsAdd.aspx?emprentamount=' + numeral(d.Amount).format('0') + '&ids=' + d.RentDetailsID + '">سند صرف</a>';
                                },
                                "bSortable": false
                            },
                            {
                                "bSortable": false,
                                "sClass": "hidden-print",
                                "mData": function (d) {
                                    return d.ReceiptID ? '' : '<a href="EmployeeRentDetails.aspx?id=' + d.RentID + '&eid=' + empId + '" class="hidden-print btn btn-mini btn-info pull-left" title="تعــديل"><i class="icon-edit icon-only"></i></a>';
                                }
                            }
                        ]
                    });

                $('a.new').attr('href', 'EmployeeRentDetails.aspx?eid=' + empId);
            };
        return {
            Init: Init
        };
    }();