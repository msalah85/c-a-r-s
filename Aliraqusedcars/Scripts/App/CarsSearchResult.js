var CarsViewManager = function () {
    var type = 0, searchTextBox = $('#SearchKey'),
        Init = function () {
            doPageActions();
        },
        doPageActions = function () {
            // get & assign search paramters from url.
            var qs = commonManger.getQueryStrs();
            if (qs) {
                // bind search keys
                $('#searchType').val(qs.kid).change();
                searchTextBox.val(qs.key);
                // start get result
                filllistItems();
            }

            // start search from top search box
            $('#SearchAll').click(function (e) {
                e.preventDefault();
                if (searchTextBox.val() !== '') {
                    filllistItems();
                }
                else {
                    commonManger.showMessage('مطلوب رقم البحث:', 'برجاء ادخال بيان البحث أولاً.');
                }
            });

            // change search type
            $('#searchType').change(function (e) {
                e.preventDefault();
                if ($(this).val() === 'LotNo') {
                    searchTextBox.attr('placeholder', 'ادخل رقم اللوت');
                } else if ($(this).val() === 'ChassisNo') {
                    searchTextBox.attr('placeholder', 'ادخل رقم الشاصي');
                }
                else {
                    searchTextBox.attr('placeholder', 'ادخل رقم السيارة');
                }
            });


        },
        resetSearchKey = function () { // reset search keyword.
            searchTextBox.val('');
        },
        filllistItems = function () {
            var ooTable = $('#listItems').DataTable({
                "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'BT>r>t<'row-fluid'<'span6'i><'span6'p>>",
                "bFilter": false,
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
                "bDestroy": true,
                "bServerSide": true, responsive: true, responsive: true,
                "sAjaxSource": "SearchCars.aspx/GetCarsData",
                "fnServerParams": function (aoData) {
                    aoData.push({ "name": "searchKey", "value": searchTextBox.val() }, { "name": "searchType", "value": $('#searchType').val() });
                },
                "fnServerData": function (sSource, aoData, fnCallback) {
                    dataService.callAjax('GET', aoData, sSource, function (data) { data.d.aaData = $.parseJSON(data.d.aaData); fnCallback(data.d); }, commonManger.errorException);
                },
                "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    if (aData.WorkingStatusID === 4)
                        $(nRow).addClass("warning").attr('title', 'سيارة سكراب');
                },
                "iDisplayLength": 50,
                "aaSorting": [[0, 'desc']],
                "initComplete": function () {
                    $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip({ "container": 'body' });
                },
                "aoColumns": [
                    {
                        "mData": "CarID",
                        "bSortable": true,
                        "sClass": "text-center"
                    },
                    {
                        "bSortable": false,
                        "sClass": "text-center",
                        "mData": function (oObj) {
                            return oObj["MainPicture"] != null ? '<a class="main-img" data-rel="tooltip" title="صور السيارة رقم: ' + oObj["CarID"] + '" href="images.aspx?id=' + oObj["CarID"] + '"><img alt=\"car\" height=\"17\" src=\"/public/cars/' + oObj["CarID"] + '/_thumb/' + oObj["MainPicture"] + '\" /></a>' : '<img alt=\"car\" height=\"17\" src="/public/cars/noimage.gif" /></a>';
                        }
                    },
                    {
                        "bSortable": false,
                        "mData": function (d) {
                            return '<a data-rel="tooltip" title="تفاصيل للسيارة" href="CarDetailsPrint.aspx?id=' + d["CarID"] + '" >' + d["MakerNameEn"] + ' - ' + d["TypeNameEn"] + ' - ' + d["Year"] + '</a>\
                                <br><span data-rel="tooltip" title="الشاصي">' + d.ChassisNo + '</span><br>اللوت: ' + d.LotNo;
                        }
                    },
                    {
                        "mData": "PayPrice",
                        "bSortable": false
                    },
                    {
                        "mData": function (d) { // buyer
                            return d.BuyerName + ' - ' + d.full_name;
                        },
                        "bSortable": false
                    },
                    {
                        "bSortable": false,
                        "mData": function (oObj) {
                            if (oObj["Arrived"])
                                return '<img src="/App_Themes/iraq/images/' + oObj["DistinationNameEn"] + '.jpg" width="25" /> ' + oObj["DistinationNameAr"];
                            else
                                return '<img src="/App_Themes/iraq/images/USA.jpg" width="25" /> أمريكا';
                        }
                    },
                    {
                        "bSortable": false,
                        "mData": function (d) {
                            // view car details
                            var printLabale = '<a data-rel="tooltip" href="CarDetailsPrint.aspx?id=' + d.CarID + '" class="btn btn-info btn-mini pull-left hidden-print" data-rel="tooltip" title="عرض تفاصيل السيارة" >تفاصيل</a> '; // + (d.IsDeleted === 'true' ? '<span class="red">ملغاه</span>' : '');


                            if (d.IsDeleted === true) {
                                printLabale += ' <span class="red">ملغاه</span> ';
                            }

                            // sold status
                            if (d.Sold === true)
                                printLabale += 'مباعه لـ <a data-rel="tooltip" title="حساب العميل" href="ClientCars.aspx?id=' + d.SaleClientID + '">' + d.SaleClientName + '</a>';
                            else
                                printLabale += 'غير مباعه <a href="InvoiceSaleAdd.aspx?id=' + d.CarID + '" class="btn btn-mini btn-success pull-left hidden-print" data-rel="tooltip" title="عمل فاتورة بــيع" >بــيع</a> ';


                            // status of view in website
                            if (d.view_website === true) {
                                printLabale += '<a title="إلغاء العرض بالموقع" data-rel="tooltip" class="btn btn-mini btn-purple pull-left hidden-print" href="pay/' + d.CarID + '/InvoicePayAdd.aspx">معروضه</a>';
                            }
                            else
                                printLabale += '<a href="pay/' + d.CarID + '/InvoicePayAdd.aspx" class="btn btn-purple btn-mini pull-left hidden-print" data-rel="tooltip" title="عرض السيارة بالموقع" >عرض</a> ';


                            return printLabale;
                        }
                    }
                ]
            });
        };
    return {
        Init: Init
    };
}();
CarsViewManager.Init();