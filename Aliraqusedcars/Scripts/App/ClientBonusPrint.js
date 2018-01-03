var
    pageManager = pageManager || {},
    pageManager = function () {
        Init = function () {
            // get report details
            var urlIds = decodeURIComponent(commonManger.getUrlVars()["id"]);
            if (urlIds != '' && urlIds != 'undefined' && urlIds != null) {
                setDataToControlandGrid(urlIds);
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
            var functionName = "ClientsBonus_One", DTO = { 'actionName': functionName, 'value': pkvalue };
            dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetData',
              function (data) {
                  var jsn = commonManger.comp2json(data.d), json = jsn.list;

                  if (json) {
                      // set all data
                      $.each(json, function (k, v) {
                          $('#masterForm #' + k).text(v);
                      });


                      $('#full_name').html('<a title="حساب العميل" href="ClientCars.aspx?id=' + json.ClientID + '">' + json.full_name + '</a>');

                      // additional enhance
                      //$('.clientAccount').attr('href', 'ClientCars.aspx?id=' + json.ClientID);
                      $('#Amount,#AmountDhs').text(function () {
                          return numeral($(this).text()).format('0,0');
                      });

                      $('#AddDate').text(function () {
                          return commonManger.formatJSONDateCal($(this).text(), 'dd/MM/yyyy');
                      });

                      if (json.Revised === 'false' && commonManger.fullRoles()) {
                          $('.edit-me').removeClass('hidden').attr('href', 'ClientBonusAdd.aspx?id=' + pkvalue);
                      }

                      // canceled receipt
                      if (json.Deleted === 'true') {
                          $('#divCanceled').removeClass('hidden').html('خصم ملغي').closest('.hidden').removeClass('hidden');
                      }
                      else {
                          if (json.DeleteFromClientBalance === 'true') { // Receipt removed from client balance.
                              $('#divCanceled').removeClass('hidden').html('خصم ملغي من رصيد العميل').closest('.hidden').removeClass('hidden');
                              $('#DeleteReason').removeClass('hidden').html(json.ClientPaymentDeleteReason).closest('.hidden').removeClass('hidden');
                          }
                      }
                  }
              }, commonManger.errorException);
        };

        return {
            Init: Init
        };

    }();