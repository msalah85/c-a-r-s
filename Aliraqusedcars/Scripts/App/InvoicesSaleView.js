var
    pageManager = function () {
        var client = '',
            from = '',
            to = '',
            _link = document.createElement('a'),

            /**
             * Convert a `link` tag's URL from a relative to an absolute address so it will
             * work correctly in the popup window which has no base URL.
             *
             * @param  {node}     el Element to convert
             */

            _relToAbs = function (el) {
                var url;
                var clone = $(el).clone()[0];
                var linkHost;

                if (clone.nodeName.toLowerCase() === 'link') {
                    _link.href = clone.href;
                    linkHost = _link.host;

                    // IE doesn't have a trailing slash on the host
                    // Chrome has it on the pathname
                    if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
                        linkHost += '/';
                    }

                    clone.href = _link.protocol + "//" + linkHost + _link.pathname + _link.search;
                }

                if (clone.nodeName.toLowerCase() === 'img') {
                    _link.href = clone.src;
                    linkHost = _link.host;

                    // IE doesn't have a trailing slash on the host
                    // Chrome has it on the pathname
                    if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
                        linkHost += '/';
                    }

                    clone.src = _link.protocol + "//" + linkHost + _link.pathname + _link.search;
                }

                return clone.outerHTML;
            },

            _absoluteURL = function (el) {
                var url;
                var clone = $(el).clone()[0];
                var linkHost;

                if (clone.nodeName.toLowerCase() === 'img') {
                    _link.href = clone.src;
                    linkHost = _link.host;

                    // IE doesn't have a trailing slash on the host
                    // Chrome has it on the pathname
                    if (linkHost.indexOf('/') === -1 && _link.pathname.indexOf('/') !== 0) {
                        linkHost += '/';
                    }

                    url = _link.protocol + "//" + linkHost + _link.pathname + _link.search;
                }

                return url;
            },

            Init = function () {
                filllistItems();
                pageEvents();
            },

            pageEvents = function () {
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    client = $('#client').val(),
                        from = commonManger.dateFormat($('#From').val()),
                        to = commonManger.dateFormat($('#To').val());


                    updareGrid();
                });

                $("#listItems tbody").live("tr button", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), pos = self.closest('tr').index(), aData;
                    if (pos !== null) {
                        if (self.hasClass('remove')) {
                            DeleteConfirmation(function () {
                                aData = pTable.data(pos).data();
                                var _id = aData.SaleInvoiceID;
                                commonManger.deleteData('anyThing', commonManger.successDeleted, commonManger.errorException, 'CarSaleInvoices', 'SaleInvoiceID', _id);
                            });
                        }
                    }
                });

                // get all selected invoices (details)
                // clone invoice details print page
                // create new window and new frame for every bill in this window
                // do print function.
                $('.print-all-selected').click(function (e) {
                    e.preventDefault();


                    // get all selected ids
                    var selectedIDs = $('input.select:checked').map(function () {
                        return $(this).val();
                    }).get();


                    if (selectedIDs.length <= 0) {
                        alert('يرجي اختيار فاتورة أو أكثر أولاً لطباعتها');
                        return;
                    }

                    // Function to open the popup                    
                    var
                        htmlPage = '',
                        getSelectedInvoicesData = function () {
                            var
                                successCallBack = function (data) {
                                    var dAll = commonManger.comp2json(data.d),
                                        list = dAll.list,
                                        list1 = dAll.list1, // updated 9-7-2017
                                        list2 = dAll.list2, // updated 9-7-2017
                                        allInvoicesString = '',
                                        firstBlock = $(htmlPage).clone(true),
                                        nextBlock = firstBlock.filter('div.container'),
                                        bindCarExtraDiscountToInvoice = function (mainInvoiceId, childElemntId, dtaList, netPrice, hasValue) {
                                            var $allWinHtml = $('<div />', { html: allInvoicesString });

                                            if (hasValue)
                                                $allWinHtml.find(mainInvoiceId + " ." + childElemntId + "-list tbody")
                                                    .html(getChildrenHtmlElements(dtaList))
                                                    .closest('div.span6').removeClass('hidden'); // show addtional/dicounts block
                                            else
                                                $allWinHtml.find(mainInvoiceId + " ." + childElemntId + "-list tbody")
                                                    .html(getChildrenHtmlElements(dtaList))
                                                    .closest('div.span6').remove(); // show addtional/dicounts block

                                            $allWinHtml.find(mainInvoiceId + " .carTotal").text(numeral(netPrice).format('0,0')); // car total price.

                                            allInvoicesString = $allWinHtml.html();
                                        };

                                    //// bind data by related data
                                    $(list).each(function (i, itm) {
                                        var billblock = i === 0 ? firstBlock : nextBlock;

                                        $(billblock).attr('id', 'InvoiceNo_' + i);
                                        $("#ContentPlaceHolder1_divInvoiceNo", billblock).text(itm.SaleInvoiceID);
                                        $("#ContentPlaceHolder1_divVatRegistrationNumber", billblock).text(itm.VatRegisterNo);
                                        $("#ContentPlaceHolder1_clientAccount", billblock).text(itm.full_name);
                                        $("#ContentPlaceHolder1_toDay", billblock).text(commonManger.formatJSONDateCal(itm.InvoiceDate));
                                        $("#ContentPlaceHolder1_divModel", billblock).text(itm["MakerNameEn"] + ' - ' + itm["TypeNameEn"]);
                                        $("#ContentPlaceHolder1_divYear", billblock).text(itm.Year);
                                        $("#ContentPlaceHolder1_CarID", billblock).text(itm.CarID);
                                        $("#ContentPlaceHolder1_divLotNo", billblock).text(itm.LotNo);
                                        $("#ContentPlaceHolder1_divChassis", billblock).text(itm.ChassisNo);
                                        $("#ContentPlaceHolder1_divStatus", billblock).text(itm.WorkingStatusName);
                                        $("#ContentPlaceHolder1_divColor", billblock).text(itm.ColorNameEn);
                                        $("#ContentPlaceHolder1_DivGear", billblock).text(itm.TransmissionNameEn);
                                        $("#ContentPlaceHolder1_divArriveDate", billblock).text(commonManger.formatJSONDateCal(itm.ArrivalDate));
                                        $("#ContentPlaceHolder1_divSaleTypeName", billblock).text(itm.SaleTypeName);
                                        $("#ContentPlaceHolder1_divNotes", billblock).text(itm.Notes);
                                        $("#ContentPlaceHolder1_VAT", billblock).text(numeral(itm.VAT).format('0,0') || 0);
                                        $("#ContentPlaceHolder1_divPrice", billblock).text(numeral(itm.PayPrice).format('0,0'));
                                        $(".ace-thumbnails", billblock).html(
                                            `<img class="thumb" src="/public/cars/${itm.CarID}/${itm.MainPicture}" />`
                                        );

                                        var finalBillStr = html2string(billblock);
                                        allInvoicesString += finalBillStr + '<br>';

                                        // bind extra list by CarID if exits.
                                        var netCarPrice = (itm.PayPrice * 1) + ((itm.VAT || 0) * 1), // after extra and discounts
                                            mainBlockId = '#InvoiceNo_' + i,
                                            thisCarId = itm.CarID,
                                            carDiscountList = [],
                                            carExtrasList = [];

                                        if (list1) { // extra values on the car.
                                            carExtrasList = $(list1).map(function (i, el) {
                                                if (el.CarID === itm.CarID) {
                                                    // total of car sale price
                                                    netCarPrice += (el.ExtraAmount * 1);
                                                    return {
                                                        Notes: el.Notes,
                                                        Amount: el.ExtraAmount
                                                    };
                                                }
                                            });
                                        }

                                        // bind discounts list by CarID if exists.
                                        if (list2) { // dicount lits on the car
                                            carDiscountList = $(list2).map(function (i, el) {
                                                if (el.CarID === itm.CarID) {
                                                    // total of car sale price
                                                    netCarPrice -= (el.DiscountAmount * 1);
                                                    return {
                                                        Notes: el.Notes,
                                                        Amount: el.DiscountAmount
                                                    };
                                                }
                                            });

                                        }

                                        // dicounts block
                                        bindCarExtraDiscountToInvoice(mainBlockId, 'disc', carDiscountList, netCarPrice, (carDiscountList.length > 0));

                                        // extras block
                                        bindCarExtraDiscountToInvoice(mainBlockId, 'extra', carExtrasList, netCarPrice, (carExtrasList.length > 0));
                                    });

                                    // draw all invoices to print
                                    openPopup(allInvoicesString);

                                },
                                getChildrenHtmlElements = function (childList) {
                                    var childrenHtml = $(childList).map(function (i, v) {
                                        return `<tr><td>${numeral(v.Amount).format('0,0')}</td><td>${v.Notes}</td></tr>`;
                                    }).get().join('');

                                    return childrenHtml;
                                },
                                dta = {
                                    actionName: 'CarSaleInvoices_Selectd',
                                    names: ['IDs'], values: [selectedIDs.join()]
                                };


                            dataService.callAjax('POST', JSON.stringify(dta), sUrl + 'GetDataList',
                                successCallBack, commonManger.errorException);

                        },
                        removeElements = function (text, selector) {
                            var wrapped = $("<div>" + text + "</div>");
                            wrapped.find(selector).remove();
                            return wrapped.html();
                        },
                        openPopup = function (content) {
                            var winPrint = window.open('', ''),
                                head = '<title>طباعة فواتير البيع</title>';

                            $(content).filter('link').each(function (i, itm) {
                                head += _relToAbs(this);
                            });

                            var newHtml = $(content).clone(true);
                            $("img", newHtml).attr('src', function () {
                                return _absoluteURL(this);
                            });

                            winPrint.document.close();

                            // Write the content to the popup
                            $(winPrint.document.head).html(head);
                            $(winPrint.document.body).html('<div id="content">' + html2string(newHtml) + '</div>');
                        },
                        html2string = function (htmlObj) {
                            var el = document.createElement('div');
                            $(el).html(htmlObj);
                            return $(el).html();
                        },
                        filterHTML = function (htmlStr) {

                            // enhance invoice details
                            htmlStr = removeElements(htmlStr, 'title,div.stickyFooter.hidden-print,button,.printme,.delete-wpr,.widget-box');
                            htmlStr = removeElements(htmlStr, 'script[src*="/Scripts/App/carsaleInvoicesManager"]');
                            htmlStr = removeElements(htmlStr, 'script[src*="signature/js/canvg"]');
                            htmlStr = removeElements(htmlStr, 'script[src*="signature/js/jquery.signature"]');

                            htmlPage = htmlStr + `<style> 
                                                    @media print {
                                                        @page { margin: 0; }
                                                        .container{ page-break-before: always; }
                                                    }
                                                  </style>`;

                            getSelectedInvoicesData();
                        };



                    // clone of inoive details
                    $.get("/admin-admin-2015/InvoiceSalePrint.aspx", filterHTML, 'html');

                });

                // select all
                //select/deselect all rows according to table header checkbox
                var active_class = 'active';
                $('#listItems thead').on('click', '.select-all', function () {
                    var th_checked = this.checked; //checkbox inside "TH" table header

                    $(this).closest('table').find('tbody > tr').each(function () {
                        var row = this;
                        if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
                        else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
                    });
                });

                //select/deselect a row when the checkbox is checked/unchecked
                $('#listItems').on('click', 'td input[type=checkbox]', function () {
                    var $row = $(this).closest('tr');
                    if ($row.is('.detail-row ')) return;
                    if (this.checked) $row.addClass(active_class);
                    else $row.removeClass(active_class);
                });
            },

            updareGrid = function () {
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
                    "bProcessing": true,
                    "bServerSide": true,
                    responsive: true,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + 'LoadDataTablesXML',
                    "fnServerParams": function (aoData) {
                        aoData.push({ name: "funName", value: 'InvoicesSale_SelectList' },
                            { name: "names", value: 'Client~From~To' },
                            { name: "values", value: `${client}~${from}~${to}` });
                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {


                            var jsnData = commonManger.comp2json(data.d),
                                aaData = jsnData.list,
                                jsn1 = jsnData.list1;


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



                            if (jsn1)
                                $('.sum-total-all').text(numeral(jsn1[1]).format('0,0'));

                        }, commonManger.errorException);
                    },
                    "fnFooterCallback": function (nFoot, aData, iStart, iEnd, aiDisplay) {
                        var tot = 0;
                        for (var i = 0; i < aData.length; i++) {
                            tot += aData[i]["SalePrice"] * 1;
                        }
                        $(nFoot).find('th:eq(1)').html(numeral(tot).format('0,0'));
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
                            "mData": function (d) {
                                return d["MakerNameEn"] + ' - ' + d["TypeNameEn"];
                            }
                        },
                        {
                            "mDataProp": "ArrivalDate",
                            "bSortable": true,
                            "mData": function (oObj) {
                                return oObj.ArrivalDate ? commonManger.formatJSONDateCal(oObj['ArrivalDate']) : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (d) {
                                return d.DistinationNameAr ? d.DistinationNameAr : '';
                            }
                        },
                        {
                            "bSortable": false,
                            "mData": function (oObj) {
                                return numeral(oObj['SalePrice']).format('0,0');
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print text-center",
                            "mData": function (d) {
                                return `<input type="checkbox" class="select" data-carid="${d.SaleInvoiceID}" value="${d.SaleInvoiceID}" />`;
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": "hidden-print",
                            "mData": function (oObj) {
                                return '<div class="btn-group"><button data-toggle="dropdown" class="btn btn-small btn-info dropdown-toggle">اخـتـر <i class="icon-angle-down icon-on-right"></i></button>\
                                    <ul class="dropdown-menu pull-right">\
                                        <li>\
<a target="_blank" href="signature/signature.aspx?id=' + oObj["SaleInvoiceID"] + '&type=1" title="طباعة استلام أوراق السيارة">طباعة استلام أوراق السيارة</a>\
                                        </li>\
                                        <li>\
                                            <a target="_blank" href="signature/signature.aspx?id=' + oObj["SaleInvoiceID"] + '&type=2" title="طباعة استلام VCC">طباعة استلام VCC</a>\
                                        </li>\
                                        <li>\
                                            <a target="_blank" href="InvoiceSalePrint.aspx?sig=1&id=' + oObj["SaleInvoiceID"] + '" title="طباعة الفاتورة">طباعة الفاتورة</a>\
                                        </li></div>';

                                //return '<div class="tools pull-left hidden-print"><a target="_blank" class="btn btn-mini btn-inverse" href="signature/signature.aspx?id=' + oObj["CarID"] + '&type=1" title="طباعة استلام أوراق السيارة"><i class="icon-file"></i></a>\
                                //             <a target="_blank" class="btn btn-mini btn-inverse" href="signature/signature.aspx?id=' + oObj["CarID"] + '&type=2" title="طباعة استلام VCC"><img src="/content/images/vcc.jpg" alt="vcc" /></a>\
                                //             <a class="btn btn-mini btn-grey" href="InvoiceSalePrint.aspx?id=' + oObj["SaleInvoiceID"] + '" title="طباعة الفاتورة"><i class="icon-print"></i></a></div>';
                            }
                        }]
                });
            };

        return {
            Init: Init
        };
    }();