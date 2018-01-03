var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            Init = function () {
                // init properties.
                initProperties();

                // fill list.
                fillDataTableList();

                // events
                pageEvents();
            },
            initProperties = function () {

                // get last month/days
                var currDa = new Date();
                //currDa.setMonth(currDa.getMonth() - 1); // last month
                currDa.setDate(currDa.getDate() - 30); // last 15 days
                $("#From").datepicker('setDate', currDa);


                // grid fields.
                tableName = "Bank"; gridId = 'listItems';

            },
            pageEvents = function () {
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();
                    updateGrid();
                });
            },
            updateGrid = function () {
                $('#' + gridId).DataTable().draw();
            },
            fillDataTableList = function () {
                var pTable = $('#' + gridId).DataTable({
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
                    "language": { "url": "/Scripts/DataTables/Arabic.min.js" },
                    "sPaginationType": "bootstrap",
                    "bProcessing": true,
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": true,
                    "bDestroy": true,
                    "iDisplayLength": 100,
                    "sAjaxSource": 'CashFundsView.aspx/LoadData',
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "From", "value": commonManger.dateFormat($('#From').val()) }, { "name": "To", "value": commonManger.dateFormat($('#To').val()) });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            // get data as json format from xml
                            var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2, jsn3 = jsnData.list3;
                            jsn1 = jsn1 ? $.map(jsn1, function (el) { return el }) : [0];

                            // create object for datatables control
                            var objDT = {
                                sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                iTotalRecords: jsn1[0],
                                iTotalDisplayRecords: jsn1[0],
                                aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                            }

                            
                            // bind DT data
                            fnCallback(objDT);


                            if (jsn1) {
                                $('.sum-total-all').text(numeral(jsn1.TotalSum).format('0,0'));
                            }
                            // show balance
                            if (jsn2)
                                $('strong.Balance').text(numeral(jsn2.Balance).format('0,0.00'));
                            
                        }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        $('.page-header h1 small').remove();
                        if (aData.length > 0)
                            $('.page-header h1').append('<small>في الفترة من: ' + commonManger.formatJSONDateCal(aData[0]['Date']) + ' إلى: ' + commonManger.formatJSONDateCal(aData[aData.length - 1]['Date']));
                    },
                    "aaSorting": [], // default none sorting none.
                    "aoColumns": [{
                        "mDataProp": "ID",
                        "bSortable": false,
                        "mData": function (d) {
                            return '<a href="' + ((d.InAmount * 1) > 0 ? 'ReceiptVoucherPrint' : 'ReceiptPaymentsPrint') + '.aspx?id=' + d.ID + '">' + d.ID + '</a>';
                        }
                    },
                    {
                        "mDataProp": "Date",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return commonManger.formatJSONDateCal(oObj['Date'], 'dd/MM/yyyy');
                        }
                    },
                    {
                        "sClass": 'hidden-480 hidden-phone',
                        "mData": function (d) {
                            return d.Note ? d.Note : '';
                        },
                        "bSortable": false
                    },
                    {
                        "mDataProp": "InAmount",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return numeral(oObj['InAmount']).format('0,0.00');
                        }
                    },
                    {
                        "mDataProp": "OutAmount",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return numeral(oObj['OutAmount']).format('0,0.00');
                        }
                    },
                    {
                        "mDataProp": "Balance",
                        "bSortable": false,
                        "mData": function (oObj) {
                            return numeral(oObj['Balance']).format('0,0.00');
                        }
                    }]
                });
            };


        return {
            Init: Init
        };

    }();