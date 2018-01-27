var printSaleCarsBill = printSaleCarsBill || {};

(function () {

    var _link = document.createElement('a');

    /**
     * Convert a `link` tag's URL from a relative to an absolute address so it will
     * work correctly in the popup window which has no base URL.
     * @param  {node} el Element to convert
     **/
    var
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


        // Function to open the popup
        htmlPage = '', 

        getSelectedInvoicesData = function (bolNo) {
            var
                successCallBack = function (data) {
                    var dAll = commonManger.comp2json(data.d),
                        list = dAll.list,
                        list1 = dAll.list1,
                        list2 = dAll.list2,
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

                    // bind data by related data
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

                // get children (discounts/Extras) rows in table as string.
                getChildrenHtmlElements = function (_list) {
                    var childrenHtml = $(_list).map(function (i, v) {
                        return `<tr><td>${numeral(v.Amount).format('0,0')}</td><td>${v.Notes}</td></tr>`;
                    }).get().join('');

                    return childrenHtml;
                },

                // json parmters for ajax
                dta = {
                    actionName: 'CarSaleInvoices_ByBol',
                    value: bolNo
                };

            dataService.callAjax('POST', JSON.stringify(dta), sUrl + 'GetData',
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

            // Write the content to the popup
            $(winPrint.document.head).html(head);
            $(winPrint.document.body).html('<div id="content">' + html2string(newHtml) + '</div>');
        },

        html2string = function (htmlObj) {
            var el = document.createElement('div');
            $(el).html(htmlObj);
            return $(el).html();
        },

        filterHTML = function (htmlStr, bolNo) {
            // enhance invoice details
            htmlStr = removeElements(htmlStr, 'title,div.stickyFooter.hidden-print,button,.printme,.delete-wpr,.widget-box');
            htmlStr = removeElements(htmlStr, 'script[src*="/Scripts/App/carsaleInvoicesManager"]');
            htmlStr = removeElements(htmlStr, 'script[src*="signature/js/canvg"]');
            htmlStr = removeElements(htmlStr, 'script[src*="signature/js/jquery.signature"]');

            htmlPage = htmlStr + `<style>@media print {@page { margin: 0; }.container{ page-break-before: always; }}</style>`;

            getSelectedInvoicesData(bolNo);
        };

    // get sale car invoices (details) by Bol No
    // clone invoice details print page
    // create new window and new frame for every bill in this window
    // do print function.
    printSaleCarsBill.printBolCars = function (bol) {
        // clone empty inoive details.
        $.get("/admin-admin-2015/InvoiceSalePrint.aspx",
            function (data) {
                // success fun callback
                filterHTML(data, bol);
            },
            'html');
    };
})();