
var
    pageManager = pageManager || {},
    pageManager = function () {
        var
            client = '', from = '', to = '',

            Init = function () {
                filllistItems();

                // pageEvents();
                pageEvents();
            },
            pageEvents = function () {

                // start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    client = $('#clientId').val() ? $('#clientId').val() : '',
                    from = commonManger.dateFormat($('#From').val()) ? commonManger.dateFormat($('#From').val()) : '',
                    to = commonManger.dateFormat($('#To').val()) ? commonManger.dateFormat($('#To').val()) : '';

                    $('#listItems').DataTable().draw();
                });
            },
            reInitTooltip = function () {
                $('.ace-tooltip').tooltip();
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
                    "bServerSide": true,
                    responsive: true,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": "InvoicesSales_Deleted" },
                                    { "name": 'names', "value": "Client~From~To" },
                                    { "name": "values", "value": client + '~' + from + '~' + to });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                            reInitTooltip();
                        }, commonManger.errorException);
                    },
                    "aaSorting": [],
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "mDataProp": "SaleInvoiceID",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a target="_blank" href="InvoiceSalePrint.aspx?id=' + d["SaleInvoiceID"] + '" title="طباعة السيارة">' + d.SaleInvoiceID + '</a>';
                            }
                        },
                        {
                            "mDataProp": "CarID",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "InvoiceDate",
                            "bSortable": true,
                            "mData": function (oObj) {
                                return commonManger.formatJSONDateCal(oObj['InvoiceDate']);
                            }
                        },
                        {
                            "mDataProp": "full_name",
                            "bSortable": true,
                            "mData": function (d) {
                                return '<a href="ClientCars.aspx?id=' + d.ClientID + '" title="حساب العميل">' + d.full_name + '</a>';
                            }
                        },
                        {
                            "mDataProp": "TypeNameEn",
                            "bSortable": true,
                            "mData": function (oObj) {
                                return oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"];
                            }
                        },
                        {
                            "mData": "DistinationNameAr",
                            "bSortable": false,
                            "mData": function (d) {
                                return d.DistinationNameAr ? d.DistinationNameAr : '';
                            }
                        },
                        {
                            "mData": "SalePrice",
                            "bSortable": false,
                            "mData": function (oObj) {
                                return numeral(oObj['SalePrice']).format('0,0');
                            }
                        },
                        {
                            "mDataProp": "DeleteUserName",
                            "bSortable": true,
                            "mData": function (d) {
                                return (d.DeleteUserName ? d.DeleteUserName : '') +
                                    (d.DeleteReason ? ' <i title="' + d.DeleteReason + '" class="ace-tooltip icon-info-sign red pull-left"></i>' : '');
                            }
                        },
                        {
                            "mDataProp": "DeleteDate",
                            "bSortable": true,
                            "mData": function (d) {
                                return d.DeleteDate ? commonManger.formatJSONDateCal(d['DeleteDate']) : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (d) {
                                return '<a target="_blank" class="btn btn-mini btn-grey" href="InvoiceSalePrint.aspx?id=' + d.SaleInvoiceID + '" title="طباعة الفاتورة"><i class="icon-print"></i></a>';
                            }
                        }]
                });

            };
        return {
            Init: Init
        };
    }();