$.fn.editable.defaults.mode = 'popup';

var CarsLateShipping = CarsLateShipping || {},
    CarsLateShipping = function () {
        var
            searchObj = {
                mainShipper: '',
                shipper: '',
                distination: '',
                from: '',
                to: '',
                BolFrom: '',
                BolTo: ''
            },

            Init = function () {
                filllistItems();
                workPerform();
            },
            workPerform = function () {
                // re-start search
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    searchObj = {
                        MainShipper: $('#MainShipper').val(),
                        Shipper: $('#Shipper').val(),
                        Distination: $('#Distin').val(),
                        From: commonManger.dateFormat($('#From').val()),
                        To: commonManger.dateFormat($('#To').val()),
                        BolFrom: commonManger.dateFormat($('#BolFrom').val()),
                        BolTo: commonManger.dateFormat($('#BolTo').val())
                    };


                    updateGrid();
                });

                $('#btnResetSearch').click(function (e) {
                    // reset select2 lists
                    $('input.select2').select2("val", "").trigger("change");

                    searchObj = {
                        mainShipper: '',
                        shipper: '',
                        distination: '',
                        from: '',
                        to: '',
                        BolFrom: '',
                        BolTo: ''
                    };

                    updateGrid();
                });
            },
            updateGrid = function () {
                var table = $('#listItems').DataTable();
                table.draw(false);
            },
            filllistItems = function () {
                var oaTable = $('#listItems').DataTable({
                    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BTf>r>t<'row-fluid'<'span6'i><'span6'p>>",
                    buttons: [{ extend: 'csv', text: 'تصدير إكسيل' }, { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            $('.dataTables_length,.form-horizontal').closest('div.row-fluid').addClass('hidden-print');
                            window.print();
                        }
                    }],
                    "language": { "url": "/Scripts/datatable/Arabic.min.js" },
                    'language': {
                        'search': '_INPUT_',
                        'searchPlaceholder': 'بحث برقم الحاوية - BOL'
                    },
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {
                        aoData.push({ "name": "funName", "value": 'Containers_4Shipper' },
                            { "name": "names", "value": 'MainShipper~Shipper~Distin~From~To~BolFrom~BolTo' },
                            {
                                "name": "values", "value": function () {
                                    return $.map(searchObj, function (el) { return el }).join('~');
                                }
                            });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            // get data as json format from xml
                            var jsnData = commonManger.comp2json(data.d),
                                aaData = jsnData.list,
                                jsn1 = jsnData.list1;

                            // create object for datatables control
                            var objDT = {
                                sEcho: aoData.sEcho ? aoData.sEcho : 0,
                                iTotalRecords: jsn1 ? jsn1.CNT : 0,
                                iTotalDisplayRecords: jsn1 ? jsn1.CNT : 0,
                                aaData: $.isArray(aaData) ? aaData : $.makeArray(aaData)
                            };

                            // bind DT data
                            fnCallback(objDT);

                        }, commonManger.errorException);
                    },
                    "iDisplayLength": 50,
                    "aoColumns": [
                        {
                            "bSortable": true,
                            "mData": function (data) {
                                return commonManger.formatJSONDateCal(data.TrxDate);
                            }
                        },
                        {
                            "bSortable": false,
                            "mDataProp": "ShipCompanyNameEn"
                        },
                        {
                            "mDataProp": "Bol",
                            "bSortable": false
                        },
                        {
                            "mDataProp": "ContainerNo",
                            "bSortable": false
                        },
                        {
                            "bSortable": true,
                            "mData": function (data) {
                                return data.ArrivalDate ? commonManger.formatJSONDateCal(data.ArrivalDate) : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return `<img width="25" src="/App_Themes/iraq/images/${d.Arrived === 'true' ? d.DistinationNameEn : 'usa'}.jpg" />`;
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": "NavigationCoName"
                        }]
                });
            };



        return {
            Init: Init
        };

    }();