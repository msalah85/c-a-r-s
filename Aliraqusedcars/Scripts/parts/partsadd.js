var partsManager = function () {
    var pageElements = {
        billBody: $("#listItems tbody"),
        billFooter: $("#listItems tfoot"),
        TotalAmount: $('#TotalAmount'),
        Discount: $('input[name="Discount"]'),
        NetAmount: $('#NetAmount'),
        newLine: $('.newLine'),
        rowClone: '<tr><td class="itemdiv center"><span class="num">1</span><input type="hidden" name="childID" value="0" /><div class="tools"><a href="#delete" class="btn btn-minier btn-danger"><i class="icon-only icon-trash"></i></a></div></td><td class="edit"><input name="PartName" required class="input-block-level form-control new" type="text"></td><td class="edit"><input name="Quantity" required class="input-block-level form-control number new" type="number" value="0"></td><td class="edit"><input name="Price" required class="input-block-level form-control money new" type="text" value="0"></td><td>0</td></tr>',
        saveAll: $('#SaveAll'),
        invoiceID: $('#ID'),
        clintId: $('#ClientID'),
        invoiceN: $('#InvoiceNo'),
        cName: $('#txtName'),
        cSave: $('#btnSave'),
        countryCode: $('#countryCode'),
        phone: $('#txtPhone'),

    },
    generateId = function () {
        var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },
    getInvoiceDetails = function () {
        var functionName = "PartsInvoices_SelectOne", DTO = { 'actionName': functionName, 'value': pageElements.invoiceID.val() };
        dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
          function (data) {
              var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1;
              if (jsn) {
                  $('#Discount').val(numeral(jsn.Discount).format('0,0.00'));
                  $('#InvoiceNo').val(jsn.InvoiceNo);
                  $('#AddDate').val(moment(jsn.AddDate).format('dd/MM/yyyy'));
                  $('#Notes').val(jsn.Notes);
                  $('[name="Discount"]').val(numeral(jsn.Discount).format('0,0.00'));

                  // select client
                  ClientsListManager.SearchClientsList(jsn.full_name);

                  $.fn.afterLoadClients = function () {
                      $('#ClientID').val(jsn.ClientID);
                  }
              }
              if (jsn1) {
                  pageElements.billBody.empty();// reset form.
                  $(jsn1).each(function (i, item) {
                      var _row = $(pageElements.rowClone).clone(true);
                      $(".num", _row).text(i + 1);
                      $("[name='childID']", _row).val(item.ID);
                      $("[name='PartName']", _row).val(item.PartName);
                      $("[name='Quantity']", _row).val(item.Quantity);
                      $("[name='Price']", _row).val(numeral(item.Price).format('0,0.00'));
                      $("td:eq(4)", _row).text(numeral(item.SubTotal).format('0,0.00'));
                      pageElements.billBody.append($(_row));
                  }).promise().done(function () {
                      invoiceTotalCalc();
                  });
              }
          }, commonManger.errorException);
    },
    Init = function () {
        // get data to edit
        var _id = commonManger.getQueryStrs().id;
        if (_id) {
            pageElements.invoiceID.val(_id);
            getInvoiceDetails();
        }
        $('.money').autoNumeric('init');
        // table sortable
        pageElements.billBody.sortable({
            opacity: 0.8,
            revert: true,
            forceHelperSize: true,
            placeholder: 'draggable-placeholder',
            forcePlaceholderSize: true,
            tolerance: 'pointer',
            stop: function (e, ui) { //just for Chrome!!!! so that dropdowns on items don't appear below other items after being moved
                $(ui.item).css('z-index', 'auto');
            }
        });
        // calculate total
        pageElements.billBody.delegate('input[name="Quantity"],input[name="Price"]', "keyup", function () {
            var tr = $(this).closest('tr'), subTotal = numeral().unformat(tr.find('input[name="Quantity"]').val()) * numeral().unformat(tr.find('input[name="Price"]').val());
            tr.find('td:eq(4)').text(numeral(subTotal).format('0,0.00'));
            invoiceTotalCalc();
        });
        // set discount value
        pageElements.billFooter.delegate(pageElements.Discount, "keyup", function () {
            calculateNetPrice();
        });
        // remove part from bill
        pageElements.billBody.delegate('tr td.itemdiv a', "click", function (e) {
            e.preventDefault(); var $this = $(this).closest('tr'); removeElement($this);
        });
        // add new line
        pageElements.newLine.on('click', function (e) {
            e.preventDefault();
            // add new row.
            var _row = pageElements.rowClone.replace("1", (pageElements.billBody.children('tr').length + 1));
            pageElements.billBody.append($(_row));

            // add validate rule.
            $('input.new').each(function () { $(this).rules("add", { required: true }); });
            pageElements.billBody.find('input[name="PartName"]:last').focus();
            $('.money').autoNumeric('init'); // apply format money.

            // apply validation on new controls.
            var valid = commonManger.applyValidation('aspnetForm');
            if (!valid)
                commonManger.showMessage('حقول مطلوبة', 'برجاء التأكد من ادخال جميع الحقول فى الفاتورة.');
        });
        // save invoice
        pageElements.saveAll.on('click', function (event) {
            event.preventDefault();

            // get master fields
            var valuesDetails = [],
                masterValues = [pageElements.invoiceID.val(), pageElements.clintId.val(), pageElements.invoiceN.val(), commonManger.dateFormat($('#AddDate').val()), $('#Notes').val(), numeral().unformat(pageElements.TotalAmount.text()), numeral().unformat(pageElements.Discount.val()), numeral().unformat(pageElements.NetAmount.text())];

            pageElements.billBody.children('tr').each(function (i, item) {
                var itm = { // child invoice row 
                    id: $(item).find('input:eq(0)').val(),
                    invoiceId: pageElements.invoiceID.val(),
                    title: $(item).find('input:eq(1)').val().replace('~', ' '),
                    quan: numeral().unformat($(item).find('input:eq(2)').val()),
                    price: numeral().unformat($(item).find('input:eq(3)').val()),
                    total: numeral().unformat($(item).find('td:last').text())
                };

                if (itm.title !== '' && itm.total > 0) { // add to save array
                    var childItm = itm.id + '~' + itm.invoiceId + '~' + itm.title + '~' + itm.quan + '~' + itm.price + '~' + itm.total;
                    valuesDetails.push(childItm);
                }
            });

            // start save data
            if (valuesDetails.length > 0 && pageElements.clintId.val() > 0 && pageElements.invoiceN.val() !== '') {
                var DTO = { 'masterValues': masterValues, 'detailsValues': valuesDetails };
                dataService.callAjax('Post', JSON.stringify(DTO), 'partsadd.aspx/SaveDataMasterDetails',
                function (data) { // go to print page
                    commonManger.showMessage('تم الحفظ بنجاح:', data.d.message);
                    if (data.d.ID > 0)
                        document.location.href = "PartsPrint.aspx?id=" + data.d.ID;
                }, commonManger.errorException);
            }
            else {
                commonManger.showMessage('لا توجد قطع غيار فى الفاتورة:', 'برجاء ادخال قطع الغيار فى الفاتورة أولاً.');
            }
        });

        // set new line
        pageElements.billBody.delegate('input[name="Price"]:last', "blur", function () {
            pageElements.newLine.trigger('click');
        });

        // save new client
        pageElements.cSave.click(function (e) {
            e.preventDefault();
            var scParam = {
                ClientID: 0,
                full_name: pageElements.cName.val(),
                phone: pageElements.phone.val(),
                countryCode: pageElements.countryCode.val(),
                user_name: generateId(),
                user_password: generateId(),
                user_type: 2,
                send_sms: false,
            }, form = 'formMain', url = 'Clients.aspx/SaveClient', DTO = { 'scParam': scParam };
            if (pageElements.cName.val() !== '') {
                commonManger.doWork('ClientModal', form, url, DTO, successSaveClient, commonManger.errorException);
            }
        });
    },
    successSaveClient = function (d) {
        d = d.d;
        commonManger.showMessage('تمت عملية الإضافه بنجاح.', d.Message); // save alert
        if (d.Status) {
            $('#ClientModal').modal('hide');
            //select current added client
            pageElements.clintId.append($('<option/>').text(pageElements.cName.val()).val(d.Id));
            pageElements.clintId.val(d.Id);
            pageElements.clintId.trigger('chosen:updated');
        }
    },
    reArrangBillIndexs = function () {
        pageElements.billBody.find('tr').each(function (i, n) {
            $(this).find('span.num').text(i + 1);
        });
    },
    removeElement = function (el) {
        el.css({ 'transition': 'background-color 1s', 'background-color': 'red' }).fadeOut('slow').promise().done(function () { el.remove(); reArrangBillIndexs(); });
    },
    calculateNetPrice = function () {
        var _net = numeral().unformat(pageElements.TotalAmount.text()) - numeral().unformat(pageElements.Discount.val());
        pageElements.NetAmount.text(numeral(_net).format('0,0.00'));
    },
    invoiceTotalCalc = function () {
        var billTot = 0;
        pageElements.billBody.children('tr').each(function () { billTot += numeral().unformat($(this).find('td:eq(4)').text()); })
        .promise().done(function () {
            pageElements.TotalAmount.text(numeral(billTot).format('0,0.00'));
            calculateNetPrice();
        });
    };
    return {
        Init: Init
    };
}();
partsManager.Init();