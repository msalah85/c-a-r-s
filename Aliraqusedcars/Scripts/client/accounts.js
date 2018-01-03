// =================================================
// Developer M.Salah<eng.msalah.abdullah@gmail.com>
// Copyrights (c) WWW.IRAQUSEDCARS.AE
// Date: 28-02-2017
// =================================================

var
    accountsManager = accountsManager || {},
    accountsManager = function () {

        var
            surl = '/client/accounts.aspx/',
            init = function () {
                getChildsList();

                pageEvents();
            },
            pageEvents = function () {
                // open account details
                $(document).on("click", "a.tile-title[data-id]", function (e) {
                    e.preventDefault();

                    var _id = $(this).data('id'), // client ID
                        _name = $(this).data('name'), // client name
                        _masterId = $(this).data('master'), // master ID

                        dto = { id: _id, name: _name, masterId: _masterId },
                        successCall = function (data) {
                            if (data.d) {
                                window.location.href = 'dashboard';
                            }
                        };


                    dataService.callAjax('POST', JSON.stringify(dto), surl + 'Open', successCall, failException)
                });
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
            getChildsList = function () {
                var
                    successCall = function (data) {
                        var dAll = comp2Json(data.d), // decompress data
                            jsn = dAll.list, // accounts list
                            accClass = ['blue', 'green', 'orange', 'pink', 'cyan', 'aqua', 'purple', 'primary', 'gray']; // account color

                        // bind list
                        var accs = $(jsn).map(function (i, v) {
                            return '<div class="col-sm-12"><a class="tile-title tile-' + (accClass[i]) + '" data-master="' + (v.MasterID ? v.MasterID : v.ClientID) + '" data-id="' + v.ClientID + '" data-name="' + v.full_name + '" href="javascript:void(0);"><div class="title"><h3>' + v.full_name + '</h3><p>حساب ' + (v.MasterID ? 'فرعي' : 'رئيسي') + '</p></div></a></div>';
                        }).get();

                        // show acc list
                        $('.acc-list').html(accs);
                    };


                dataService.callAjax('GET', {}, surl + 'Childs', successCall, failException)
            };


        return {
            init: init
        }

    }();


accountsManager.init();