/// Developer M.Salah <eng.msalah.abdullah@gmail.com>
/// Date: 25-01-2017
/// IRAQ USED CARS

var shipperImages = shipperImages || {},
    shipperImages = function () {
        var
            sUrl = '/api/data.aspx/getWebPage',
            init = function () {
                setVinVal();
                pageEvents();
            },
            loadingProgress = function (status) {
                var $btn = $('button.srchChass');
                if (status) {
                    $btn.text('جاري البحث...').prop('disabled', !status);
                }
                else {
                    $btn.html('<i class="fa fa-search"></i> بــحث');
                }
            },
            pageAtlCallBack = function (d) {
                var html = LZString.decompressFromUTF16(d.d),
                    atlObj = $('#atl');

                //#region new enhance
                $(html).filter(function () {
                    if ($(this).attr('id') === 'wrapper') {

                        // images list
                        var wc = $(this).find('div.container div.row div.col-md-5 div.well div.row div.col-md-12');

                        // enhance images
                        wc.find('[href]').attr('href', function () {
                            return 'https://client.atlanticexpresscorp.com' + $(this).attr('href');
                        })
                            .attr('data-rel', 'prettyPhoto[car]').removeAttr('data-url')
                            .find('[src]').attr('src', function () {
                                return 'https://client.atlanticexpresscorp.com' + $(this).attr('src');
                            });


                        atlObj.html(wc);

                        // fire full image modal
                        IRAQCARS.PrettyPhoto();
                        return;
                    }
                });

                //#endregion


                loadingProgress(false);
            },
            pageW8CallBack = function (d) {
                var htmlW8 = LZString.decompressFromUTF16(d.d),
                    w8Obj = $('#w8Results');


                $(htmlW8).filter(function () {
                    if ($(this).attr('id') === 'wrapper') {

                        var wc = $(this).find('#wide-content .images_table');
                        wc.find('a[href][rel]').attr('data-rel', 'prettyPhoto[car]');


                        w8Obj.html(wc);

                        // fire full image modal
                        IRAQCARS.PrettyPhoto();

                        return;
                    }
                });

                loadingProgress(false);

            },
            featchImages = function () {
                getW8Images();
                getAtlanticImages();
            },
            setVinVal = function () {
                var vin = urlManager.getUrlVars().vin
                $('input[name="vin"]').val(vin ? vin : '');
                featchImages();
            },
            getAtlanticImages = function () {

                var
                    vin = $('input[name="vin"]').val(),
                    data = { url: 'https://client.atlanticexpresscorp.com/tracking?vin=' + vin }; //5NPDH4AE9GH658697

                if (vin) {
                    loadingProgress(true);
                    dataService.callAjax('Post', JSON.stringify(data), sUrl, pageAtlCallBack, errorException);
                }
            },
            getW8Images = function () {
                var
                    vin = $('input[name="vin"]').val(),
                    data = { url: 'http://w8shipping.com/tracking/?lot=&vin=' + vin + '&searchAuto=Search' }; //5NPD84LF8HH001512

                if (vin) {
                    loadingProgress(true);
                    dataService.callAjax('Post', JSON.stringify(data), sUrl, pageW8CallBack, errorException);
                }
            },
            pageEvents = function () {
                // events
                $('form:eq(0)').submit(function (e) {
                    e.preventDefault();
                    var _vin = vin = $('input[name="vin"]').val();
                    if (_vin != '') {
                        featchImages();
                    }
                });
                $('[type="submit"]').submit(function (e) {
                    e.preventDefault();

                    var _vin = vin = $('input[name="vin"]').val();
                    if (_vin != '') {
                        featchImages();
                    }
                });
            };


        return {
            init: init
        }
    }();


