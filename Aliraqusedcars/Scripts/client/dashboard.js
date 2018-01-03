// =================================================
// Developer M.Salah<eng.msalah.abdullah@gmail.com>
// Copyrights (c) WWW.IRAQUSEDCARS.AE
// Date: 28-02-2017
// =================================================

var    
    dashboardManager = function () {
        var
            surl = '/client/dashboard.aspx/',
            init = function () {
                getDashboard();

                // pageEvents();
            },
            pageEvents = function () {
                //// open account details
                //$(document).on("click", "a.tile-title[data-id]", function (e) {
                //    e.preventDefault();

                //    var _id = $(this).data('id'), // client ID
                //        _name = $(this).data('name'), // client name
                //        _masterId = $(this).data('master'), // master ID

                //        dto = { id: _id, name: _name, masterId: _masterId },
                //        successCall = function (data) {
                //            if (data.d) {
                //                window.location.href = 'dashboard';
                //            }
                //        };
                
                //    dataService.callAjax('POST', JSON.stringify(dto), surl + 'Open', successCall, failException)
                //});
            },
            comp2Json = function (compressedData) {
                var cdata = LZString.decompressFromUTF16(compressedData), // decompress data
                    xml = $.parseXML(cdata), // xml format
                    jsn = $.xml2json(xml);  // json format
                return jsn;
            },
            showMessage = function (type, title, message) {
                type = type !== undefined ? type : 'warning';
                $('.alert-message').html('<div class="alert alert-' + type + '"><strong>' + title + '</strong>: ' + message + '</div>')
            },
            failException = function (jqXhr, textStatus, errorThrown) {
                var title = textStatus + ": " + errorThrown;
                var message = JSON.parse(jqXhr.responseText).Message;
                showMessage('danger', title, message)
            },
            getDashboard = function () {
                var
                    successCall = function (data) {
                        var dAll = comp2Json(data.d), // decompress data
                            jsn = dAll.list, // client
                            jsn1 = dAll.list1, // account money
                            jsn2 = dAll.list2; // cars
                        
                        // client
                        if (jsn) {
                            $('.full_name').text(jsn.full_name);
                            var balance = (jsn.Debit * 1) - (jsn.Credit * 1);
                            $('.Balance').text(numeral(balance).format('0,0') + ' $');
                        }

                        // account money
                        console.log(jsn1);

                        $.each(jsn1, function (k, v) {
                            $('.' + k).text(numeral(v).format('0,0') + ' $');
                        });

                        // cars
                        $.each(jsn2, function (k, v) {
                            $('.' + k).text(v);
                        });
                    };
                
                dataService.callAjax('GET', {}, surl + 'Dash', successCall, failException)
            };
        
        return {
            init: init
        }

    }();


dashboardManager.init();