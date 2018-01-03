var
    CarsViewManager = CarsViewManager || {},
    CarsViewManager = function () {
        var
            storage = $.localStorage,
            searchObj = {
                CarNo: '', Arrived: '', Owner: '', Distination: ''
            },
        Init = function () {
            filllistItems();
            getData4Search();
            doPageActions();
        },
        doPageActions = function () {
            // view all available
            $('#viewAllCars').click(function (e) {
                e.preventDefault();
                resetKeys();
                updateGrid();
            });

            // start search from top search box
            $('#SearchAll').click(function (e) {
                e.preventDefault();
                setSearchParam();
                updateGrid();
            });


            // show all company cars only
            $('#allIraqCars').click(function (e) {
                e.preventDefault();
                resetKeys();

                setCompanySearchParam();
                updateGrid();
            });
        },
        bindLists = function (d) {
            var decompressedData = LZString.decompressFromUTF16(d.d), xml = $.parseXML(decompressedData), jsn = $.xml2json(xml).list, jsn1 = $.xml2json(xml).list1, tempSearchParamters = storage.isSet('srchAvCars') ? storage.get('srchAvCars') : null;

            // distination
            if (jsn) {
                var options = $(jsn).map(function (i, v) { return $('<option ' + (tempSearchParamters && tempSearchParamters.Distination === v.DistinationID ? 'selected' : '') + ' />').val(v.DistinationID).text(v.DistinationNameAr); }).get();
                $('#Distination').append(options);
            }


            // clients list
            if (jsn1) {
                var options = $(jsn1).map(function (i, v) { return $('<option ' + (tempSearchParamters && tempSearchParamters.Owner === v.ClientID ? 'selected' : '') + ' />').val(v.ClientID).text(v.full_name); }).get();
                $('#Owner').append(options);
                updateSelect();
            }

            // put the latest search paramter value
            if (tempSearchParamters && tempSearchParamters.CarNo !== '')
                $('#CarNo').val(tempSearchParamters.CarNo);

        },
        updateSelect = function () {
            $('.chzn-select').trigger('chosen:updated');
        },
        getData4Search = function () {
            var functionName = "CarsData_Properties", DTO = { 'actionName': functionName };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindLists, commonManger.errorException);
        },
        setSearchParam = function () {
            searchObj = {
                CarNo: $('#CarNo').val() != '' ? $('#CarNo').val() : '',
                Arrived: $('#Arrived').val() != '' ? $('#Arrived').val() : '',
                Owner: $('#Owner').val() != '' ? $('#Owner').val() : '',
                Distination: $('#Distination').val() != '' ? $('#Distination').val() : ''
            };

            // save serach paramters as temperary
            storage.set('srchAvCars', searchObj);

        },
        setCompanySearchParam = function () {
            // reset all search paramters
            $('#aspnetForm input,#aspnetForm  select').val('');
            $('#Owner').val('1'); // set company as selected search paramter.
            updateSelect();

            searchObj.Owner = '1';

            // save serach paramters as temperary
            storage.set('srchAvCars', searchObj);

        },
        resetKeys = function () { // reset search keys.
            searchObj = {
                CarNo: '', Arrived: '',
                Owner: '', Distination: ''
            };

            // remove temperary search paramters
            storage.remove('srchAvCars');
        },
        updateGrid = function () {
            $('#listItems').DataTable().draw(false);
        },
        filllistItems = function () {
            var ooTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid tbl-head-options'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                deferRender: true,
                stateSave: true,
                "bFilter": false,
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
                    aoData.push({ "name": "funName", "value": 'CarsData_SelectCarsList' }, { "name": "names", "value": 'CarNo~Arrived~Distin~Owner' });

                    var tempSearchParamters = storage.isSet('srchAvCars') ? storage.get('srchAvCars') : null;
                    if (tempSearchParamters === null) {
                        aoData.push({ "name": "values", "value": searchObj.CarNo + '~' + searchObj.Arrived + '~' + searchObj.Distination + '~' + searchObj.Owner });
                    } else {
                        aoData.push({ "name": "values", "value": tempSearchParamters.CarNo + '~' + tempSearchParamters.Arrived + '~' + tempSearchParamters.Distination + '~' + tempSearchParamters.Owner });
                    }
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) {
                        commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                    }, commonManger.errorException);
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.WorkingStatusID === 4)
                        $(nRow).addClass("warning").attr('title', 'سيارة سكراب');
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
                            return oObj["MainPicture"] ? '<a title="صور السيارة رقم: ' + oObj["CarID"] + '" href="images.aspx?id=' + oObj["CarID"] + '"><img alt=\"car\" src=\"/public/cars/' + oObj["CarID"] + '/_thumb/' + oObj["MainPicture"] + '\" /></a>' : '<img alt=\"car\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "mDataProp": "ChassisNo",
                        "bSortable": true,
                        "mData": function (oObj) {
                            return '<a title="تفاصيل للسيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '&any=1" >' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                        }
                    },
                    {
                        "mDataProp": "LotNo",
                        "bSortable": true
                    },
                    {
                        "mDataProp": "full_name",
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
                        "mDataProp": "PayPrice",
                        "bSortable": false,
                        "mData": function (d) {
                            return numeral(d.PayPrice).format('0,0.0');
                        }
                    },
                    {
                        "sClass": "text-center",
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