// =================================================
// Developer M.Salah<eng.msalah.abdullah@gmail.com>
// Copyrights (c) WWW.IRAQUSEDCARS.AE
// Date: 14-07-2018
// =================================================

var
    dashboardManager = function () {
        var
            surl = '/api/data.aspx/',
            init = function () {
                getDashboard();
                pageEvents();
            },
            pageEvents = function () {
                $('.chat-us').click(function () {
                    var iframe = $('.zopim iframe:eq(0)').contents();
                    if (iframe) {
                        var chat = iframe.find('.meshim_widget_components_chatButton_Button');
                        if (chat)
                            chat.trigger('click');
                    }
                });

                // search options
                $('.search-options ul li').on('click', function () {
                    var _this = $(this),
                        selectedEl = _this.find('a'),
                        selectedText = selectedEl.text() + ' <span class="caret"></span>',
                        selectedID = selectedEl.data('id'),
                        searchTextBox = $('.searchNo');

                    searchTextBox.attr('name', selectedID);
                    $('.search-options button').html(selectedText);
                    searchTextBox.select(); // focus on the text search
                });


                $('#btnSearch').click(function (e) {
                    var searchTextBox = $('.searchNo'),
                        selectedOption = searchTextBox.attr('name');

                    if (selectedOption === undefined || searchTextBox.val() === '') {
                        alert('يرجي اختيار نوع البحث أولاً');
                        e.preventDefault();
                        return;
                    }
                });
                $('#frmSearchBox').submit(function (e) {
                    var searchTextBox = $('.searchNo'),
                        selectedOption = searchTextBox.attr('name');

                    if (selectedOption === undefined || searchTextBox.val() === '') {
                        alert('يرجي اختيار نوع البحث أولاً');
                        e.preventDefault();
                        return;
                    }
                });
            },
            searchCars = function (event) {
                var searchTextBox = $('.searchNo'),
                    selectedOption = searchTextBox.attr('name');

                if (!selectedOption && searchTextBox.val() === '') {
                    alert('يرجي اختيار نوع البحث أولاً');
                    e.preventDefault();
                    return;
                }
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
                        var dAll = comp2Json(data.d),
                            jsn = dAll.list, // cars count
                            jsn1 = dAll.list1, // clients count
                            jsn2 = dAll.list2; // containers count


                        $('.cars').text(jsn && jsn.Cnt ? jsn.Cnt : 0);
                        $('.clients').text(jsn1 && jsn1.Cnt ? jsn1.Cnt : 0);
                        $('.containers').text(jsn2 && jsn2.Cnt ? jsn2.Cnt : 0);

                    },
                    data = { "actionName": "Jordan_Dashboard" };

                dataService.callAjax('POST', JSON.stringify(data), surl + 'GetDataDirect', successCall, failException)
            };


        return {
            init: init
        }

    }();


dashboardManager.init();