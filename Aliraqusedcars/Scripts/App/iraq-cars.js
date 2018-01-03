var storage = $.localStorage,
    CarsViewManager = function () {
        var searchObj = {
            WithoutShipp: 0
        },
        Init = function () {
            openLastActiveTab();

            doPageActions();
        },
        openLastActiveTab = function () {
            // get latest selected tab
            var lastSavedParm = storage.isSet('srchIrCars') ? storage.get('srchIrCars') : null;

            // put its value in search criteria
            if (lastSavedParm !== null) {
                searchObj.WithoutShipp = lastSavedParm.WithoutShipp;
            }

            // activate related tab
            if (searchObj.WithoutShipp === 1) {
                $('#iraq-carsTabs li.active').removeClass('active');// reset tabs
                $('a[data-id="' + searchObj.WithoutShipp + '"][data-toggle="tab"]').closest('li').addClass('active'); // set active tab
            }


            // get related cars list
            filllistItems();
        },
        doPageActions = function () {
            // show cars by (WithShipping - WithoutShipping).
            $('#iraq-carsTabs li a').click(function (e) {
                e.preventDefault();

                if (!$(this).closest('li').hasClass('active')) {
                    // reset search paramters
                    resetKeys();

                    // set current criteria
                    setSearchParam($(this).data('id'));

                }

            });
        },
        setSearchParam = function (prmVal) {
            searchObj.WithoutShipp = prmVal;

            // save serach paramters as temperary
            storage.set('srchIrCars', searchObj);


            // update result
            updateGrid();

        },
        resetKeys = function () { // reset search keys.
            searchObj = {
                WithoutShipp: ''
            };

            // remove temporary search parameters
            storage.remove('srchIrCars');
        },
        updateGrid = function () {
            $('#listItems').DataTable().draw(false);
        },
        filllistItems = function () {
            var ooTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid tbl-head-options'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                deferRender: true,
                //"bFilter": false,
                stateSave: true,
                buttons: [{ extend: 'csv', text: 'تصدير إكسيل' },
                    { extend: 'copy', text: 'نسـخ', },
                    {
                        text: 'طباعة',
                        action: function (e, dt, node, config) {
                            window.print();
                        }
                    }
                ],
                'language': {
                    'search': '_INPUT_',
                    'searchPlaceholder': 'رقم السيارة - اللوت'
                },
                "bDestroy": true,
                "bServerSide": true, responsive: true,
                "sAjaxSource": sUrl + 'LoadDataTablesXML',
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "funName", "value": 'CarsData_IraqCarsList' }, { name: 'names', value: 'WithoutShipp' }, { name: 'values', value: searchObj.WithoutShipp });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        
                        var jsnData = commonManger.comp2json(data.d), aaData = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2;
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
                            console.log(jsn2.ClientsCarsPaidNotSold);
                        }


                        // total costs
                        $('.withShippingCosts').text(numeral(jsn1[1]).format('0,0'));
                        $('.withoutShippingCosts').text(numeral(jsn1[2]).format('0,0'));

                        var totalAll = (jsn1[1] * 1) + (jsn1[2] * 1);

                        $('.allCarsCosts').text(numeral(totalAll).format('0,0'));
                        
                    }, commonManger.errorException);
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.WorkingStatusID === 4)
                        $(nRow).addClass("warning").attr('title', 'سيارة سكراب');
                },
                "footerCallback": function (tfoot, data, start, end, display) {
                    var api = this.api(),
                        _total = api.column(3).data().reduce(function (a, b) {
                            return (numeral().unformat(a) * 1) + (numeral().unformat(b) * 1);
                        }, 0);

                    // total
                    $(api.column(3).footer()).text(numeral(_total).format('0,0'));
                },
                "iDisplayLength": 25,
                "aaSorting": [[0, 'desc']],
                "aoColumns": [
                    {
                        "mDataProp": "CarID",
                        "bSortable": true,
                        "sClass": "text-center"
                    },
                    {
                        "mDataProp": "MainPicture",
                        "bSortable": false,
                        "sClass": "text-center",
                        "mData": function (oObj) {
                            return oObj["MainPicture"] != null ? '<a title="صور السيارة رقم: ' + oObj["CarID"] + '" href="images.aspx?id=' + oObj["CarID"] + '"><img alt=\"car\" src=\"/public/cars/' + oObj["CarID"] + '/_thumb/' + oObj["MainPicture"] + '\" /></a>' : '<img alt=\"car\" width=\"60\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "bSortable": true,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل للسيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '&any=1" >' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                        }
                    },
                    {
                        "mData": function (d) {
                            return numeral(d.CarCosts).format('0,0');
                        },
                        "bSortable": true
                    },
                    {
                        "mDataProp": "DistinationNameAr",
                        "bSortable": false,
                        "mData": function (oObj) {
                            if (oObj["Arrived"] || oObj.DistinationNameEn.toLowerCase() == 'gulfauto')
                                return '<img src="/App_Themes/iraq/images/' + oObj["DistinationNameEn"] + '.jpg" width="25" /> ' + oObj["DistinationNameAr"];
                            else
                                return '<img src="/App_Themes/iraq/images/USA.jpg" width="25" /> أمريكا';
                        }
                    },
                    {
                        "sClass": "text-center hidden-print",
                        "bSortable": false,
                        "mData": function (d) {
                            var printLabale = '';
                            return '<a href="InvoiceSaleAdd.aspx?id=' + d.CarID + '" class="btn btn-minier btn-success" data-rel="tooltip" title="بــيع" data-original-title="انشاء فاتورة بــيع">بيع</a> ' + printLabale;
                        }
                    }
                ]
            });
        };
        return {
            Init: Init
        };
    }();