//=======================================
// Developer: M. Salah (09-02-2016)
// Email: eng.msalah.abdullah@gmail.com
//=======================================
var 
    pageManager = function () {
        "use strict";
        var
            buyer = '', chassis = '', shippers = [],
            Init = function () {

                // fill default cars list in the grid.
                filllistItems();


                // set buyers and shippers lists for binding.
                setDataToSearch();


                pageEvents();
            },
            pageEvents = function () {
                // search car result
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    buyer = $('#Buyer').val(), chassis = $('#ChassisN').val();
                    // show header title for print
                    commonManger.showOptionPrintTitle($('#Paid option:selected').text());

                    updateGrid();
                });
            },
            BindListSearch = function (d) { // shippers for search
                //var cdata = LZString.decompressFromUTF16(d.d), xml = $.parseXML(cdata), jsn = $.xml2json(xml).list, jsn1 = $.xml2json(xml).list1;
                var data = commonManger.comp2json(d.d), jsn1 = data.list1;

                //// buyers list
                //if (jsn) {
                //    var options = $(jsn).map(function (i, v) { return $('<option />').val(v.BuyerName).text(v.BuyerName); }).get();
                //    $('#Buyer').append(options).trigger('chosen:updated').trigger("liszt:updated");
                //}

                // shippers list
                if (jsn1) {
                    var shippersOptions = $(jsn1).map(function (i, v) { return { value: v.ShipCompanyID, text: v.ShipCompanyNameEn }; }).get();
                    shippers = shippersOptions;
                }
            },
            setDataToSearch = function () {
                var functionName = "ShipperBindings_Properties", DTO = { 'actionName': functionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', BindListSearch, commonManger.errorException);
            },
            //setCarShipper = function () {

            //    // select2 control options
            //    var select2Defaults = {
            //        pageSize: 10,
            //        serviceUrl: sUrl + 'getSelect2',
            //        _names: ['RID', 'DID'],
            //        funName: 'ShipperBindings_GeByRegionID',
            //    };


            //    // instance edit shipper
            //    $('a.editable').editable({
            //        type: 'select2',
            //        select2: {
            //            placeholder: 'اختر الشاحن',
            //            allowClear: true,
            //            width: '200px',
            //            minimumInputLength: 0,

            //            ajax: {
            //                quietMillis: 150,
            //                url: select2Defaults.serviceUrl,

            //                dataType: 'json', type: "POST",
            //                params: {
            //                    contentType: 'application/json; charset=utf-8'
            //                },

            //                // shippers filter paramters
            //                data: function (term, page) {

            //                    var _thisCtrl = $(this).closest('td').find('a[data-id]'),
            //                        select2_values = [_thisCtrl.attr('data-region-id'), _thisCtrl.attr('data-dest-id')],

            //                     dta = JSON.stringify({
            //                         fnName: select2Defaults.funName,
            //                         pageNum: page,
            //                         pageSize: select2Defaults.pageSize,
            //                         searchTerm: term,

            //                         // addtional paramters as string separated by (~) char.
            //                         names: select2Defaults._names.join('~'),
            //                         values: select2_values.join('~')
            //                     });

            //                    return dta;
            //                },

            //                // result format
            //                results: function (data, page) {
            //                    var dAll = commonManger.comp2json(data.d), // decompress data from server
            //                        resultJson = (dAll.list ? dAll.list : []), // result data (id, text1)
            //                        resultCount = (dAll.list1 ? dAll.list1.CNT : 0), // results count
            //                        resultAsArray = $.isArray(resultJson)
            //                                        ? $.map(resultJson, function (el) { return { id: el.id, text: el.text1 } }) // convert json to array with enhanced nodes (multiple rows).
            //                                        : [{ id: resultJson.id, text: resultJson.text1 }], // single results data
            //                        more = ((page * select2Defaults.pageSize) < resultCount);

            //                    return { results: resultAsArray, more: more };
            //                }
            //            },
            //        },
            //        value: $(this).data('currentVal'),
            //        validate: function (value) {
            //            if ($.trim(value) === '') {
            //                return 'مطلوب.';
            //            }
            //        },
            //        url: function (params) {

            //            // prepare editing paramters
            //            params.table = $(this).data('table');
            //            params.id = $(this).data('id');


            //            // apply inline exiting
            //            return dataService.inlineAjax(params, function () {
            //                commonManger.showMessage('تم الحفظ:', 'تم توزيع السيارة على الشاحن بنجاح');
            //                updateGrid();
            //            },
            //            function () {
            //                commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
            //            });
            //        }
            //    });
            //},
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var
                    pTable = $('#listItems').DataTable({
                        "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'T>r>t<'row-fluid'<'span6'i><'span6'p>>",
                        "oTableTools": { "aButtons": ["copy", "xls", "print"] },
                        "bServerSide": true, responsive: true,
                        "bRetrieve": false,
                        "bDestroy": true,
                        "sAjaxSource": sUrl + "LoadDataTablesXML",
                        "fnServerParams": function (aoData) {
                            aoData.push({ "name": "funName", "value": "ShipperBinding_SelectList" }, { "name": 'names', "value": "Buyer~Chassis" }, { "name": "values", "value": buyer + '~' + chassis });
                        },
                        "fnServerData": function (sSource, aoData, fnCallback) {
                            dataService.callAjax('GET', aoData, sSource, function (data) {
                                commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                            }, commonManger.errorException);
                        },
                        "drawCallback": function () {
                            select2Manager.carBindingShippersInGrid();
                        },
                        "iDisplayLength": 50,
                        "aaSorting": [],
                        "aoColumns": [
                            {
                                "bSortable": false,
                                "mData": function (data) {
                                    return data["BuyerName"] + ' - ' + data.AuctionName + ' - ' + data["full_name"];
                                }
                            },
                            {
                                "mDataProp": "CarID",
                                "bSortable": true,
                                'sType': 'numeric',
                                'mData': function (d) {
                                    return '<a title="تعديل السيارة" href="pay/' + d.CarID + '/InvoicePayAdd.aspx">' + d.CarID + '</a>';
                                }
                            },
                            {
                                "mDataProp": "InvoiceDate",
                                "bSortable": true,
                                "mData": function (oObj) {
                                    return commonManger.formatJSONDateCal(oObj['InvoiceDate']);
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
                                    return '<a title="تفاصيل السيارة" href="CarDetailsPrint.aspx?id=' + oObj["CarID"] + '">' + oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"] + '</a>';
                                }
                            },
                            {
                                "mDataProp": "ChassisNo",
                                "bSortable": false
                            },
                            {
                                "bSortable": false,
                                "mData": function (d) {
                                    return '<a title="اختر الشاحن" data-dest-id="' + (d.DistinationID || 0) + '" data-region-id="' + (d.RegionID || 0) + '" data-id="CarID" data-pk="' + d.CarID + '"  data-value="" data-table="CarsData" data-name="ShipperID" class="editable shipper" href="#" data-placeholder="اختر الشاحن"><i class="icon-location-arrow"></i> ' + ((d.ShipCompanyNameEn != '' && d.ShipCompanyNameEn) != null ? d.ShipCompanyNameEn : 'اختر الشاحن') + '</a>';
                                }
                            },
                            {
                                "mData": function (d) {
                                    return numeral(d.PayPrice).format('0,0');
                                },
                                "bSortable": false
                            }
                        ]
                    });
            };
        return {
            Init: Init,
            updateShippersGrid: updateGrid
        };
    }();