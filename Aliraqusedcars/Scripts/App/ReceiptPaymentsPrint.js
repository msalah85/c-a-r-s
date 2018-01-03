var
    ClientsPaymentsPrint = ClientsPaymentsPrint || {},
    ClientsPaymentsPrint = function () {
        Init = function () {
            // get report details
            var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                setDataToControlandGrid(urlIds);
            }

            // signature board
            $('#sig').signature({ color: '#145394' });
            $('#clear').click(function () { $('#sig').signature('clear'); });
            $('#SaveSignature').click(function (e) {
                e.preventDefault();
                saveSignature();
            });
        },
        renderSVG = function (svg, width, height, divId) {
            document.createElement('canvas')
            var c = document.createElement('canvas');
            c.width = width || 500;
            c.height = height || 188;
            document.getElementById(divId).innerHTML = '';
            document.getElementById(divId).appendChild(c);
            if (typeof FlashCanvas != "undefined") {
                FlashCanvas.initElement(c);
            }
            canvg(c, svg, {
                log: true, renderCallback: function (dom) {
                    if (typeof FlashCanvas != "undefined") {
                        document.getElementById('sig').innerHTML = 'svg not supported';
                    } else {
                        var svg = (new XMLSerializer()).serializeToString(dom);
                        document.getElementById('sig').innerHTML = svg;
                    }
                }
            });
            $('#SaveSignature,#clear').addClass('hidden');
        },
        sigSaved = function (data) {
            data = data.d;
            if (data.Status) {

                // view signature
                var sigSVG = $('#sig').signature('toSVG');
                renderSVG(sigSVG, 100, 80, 'sigView');

                // hide modal & disable board
                $('.add-sig').remove();
                $('#sig').signature('disable');
                $('.modal').modal('hide');


                commonManger.showMessage('تم الحفظ', data.message);
            } else {
                commonManger.showMessage('خطأ أثناء تنفيذ الإجراء', data.message);
            }
        },
        saveSignature = function () { // save signature
            var obj = {
                ID: $('#ReceiptID').text(),
                Picture: $('#sig').signature('toSVG'),
                actionName: 'ReceiptPayments_Signature'
            },
            dto = { 'actionName': obj.actionName, 'names': ['ID', 'Sig'], 'values': [obj.ID, obj.Picture] };
            if (obj.ID && obj.Picture !== '') {
                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', sigSaved, commonManger.errorException);
            } else {
                commonManger.showMessage('بيانات مطلوبة', 'يرجي التأكد من رسم التوقيع اولا.');
            }
        },
        getFromName = function (clientName, byHandName) {
            clientName = clientName ? $.trim(clientName) : '';
            byHandName = byHandName ? $.trim(byHandName) : '';

            var index = byHandName.localeCompare(clientName), returnFullName = '';


            if (index === 0 || clientName === '') { // is equals
                returnFullName = byHandName;
            } else {
                returnFullName = clientName + '،  &nbsp; <span class="static-content">بيـد:</span> ' + byHandName;
            }
            
            return returnFullName;
        },
        setDataToControlandGrid = function (pkvalue) {
            var functionName = "ReceiptPayments_SelectRow", DTO = { 'actionName': functionName, 'value': pkvalue };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
              function (data) {
                  var jsn = commonManger.comp2json(data.d), json = jsn.list;

                  if (json) {
                      // set all data
                      $.each(json, function (k, v) {
                          $('#masterForm #' + k).text(v);
                      });

                      // emp signature
                      $('.sig').html(json.Sig);

                      // to name
                      var toName = '';
                      switch (json.ReceiptTypeID) {
                          case '2': { // client
                              toName = json.full_name;
                              toName = getFromName(json.full_name, json.ToName);
                              break;
                          }
                          case '3': { // employee
                              toName = getFromName(json.FullUserName, json.ToName);
                              break;
                          }
                          case '4': { // outside advance member
                              toName = getFromName(json.OutsideMemberName, json.ToName);
                              break;
                          }
                          default: {
                              toName = json.ToName;
                              break;
                          }
                      }

                      $('#ToName').html(toName);


                      // additional enhance
                      //$('.clientAccount').attr('href', 'ClientCars.aspx?id=' + json.ClientID);
                      $('#Amount,#AmountDhs').text(function () {
                          return numeral($(this).text()).format('0,0');
                      });

                      $('#AddDate,#BankDate,#ExchangeDate').text(function () {
                          return commonManger.formatJSONDateCal($(this).text(), 'dd/MM/yyyy');
                      });

                      // hide cache
                      if (json.PayTypeID !== '1') {
                          $('#PaymentTypeName').text('');
                      }

                      // canceled receipt
                      if (json.Deleted === 'true') {
                          $('#divCanceled').removeClass('hidden').html('سند صرف ملغي').closest('.hidden').removeClass('hidden');
                      }

                      // view signature
                      if (json.Signature) {
                          $('.add-sig').remove();
                          //$('#sigView').html(json.Signature);
                          renderSVG(json.Signature, 100, 80, 'sigView');
                      }
                  }
              }, commonManger.errorException);
        };

        return {
            Init: Init
        };

    }();