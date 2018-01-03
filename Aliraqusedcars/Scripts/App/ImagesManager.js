// M.Salah <eng.msalah.abdullah@gmail.com>
// Last update: 09-03-2016

//#region images manager
// upload selected files
var
    imagesManger = imagesManger || {},
    imagesManger = function () {

        var
            btnUpload = $('#btnUpload'), 
			mysURL = '/photo/UploadPicture.ashx/',
            init = function () {
                assignCarId();
                doPageEvents();
            },

        doPageEvents = function () {

            btnUpload.click(function (e) {
                e.preventDefault();
                enableCTRL(btnUpload, false);
                uploadPictures();
            });

            $('#deleteAll').on("click", function (e) {
                e.preventDefault();
                if (confirm('هل أنت متأكد من حذف جميع صور السيارة')) {
                    enableCTRL(btnUpload, false);
                    deleteAllPictures();
                }
            });

            $(document).on('click', 'a.itemToDelete', function (e) {
                e.preventDefault();
                var _this = $(this);
                DeleteConfirmation(function () {
                    enableCTRL(btnUpload, false);
                    var p = _this.attr('data-id');
                    deletePicture(p);
                });
            });

            $(document).on('click', 'a.set-main', function (e) {
                e.preventDefault();

                var _this = $(this),
                    p = _this.data('id'),
                    setMainPic = function () {
                        enableCTRL(btnUpload, false);
                        setMainPicture(p);
                    };

                resetConfirmation(setMainPic);
            });

            $(document).on('click', '#UpdatePriority', function (e) {
                e.preventDefault();
                enableCTRL(btnUpload, false);
                var pics = $(':input[type=number]').map(function (i, v) {
                    return $('#carId').val() + ',' + $(this).data('id') + ',' + $(this).val();
                }).get(),

                // start save priorities.
                _url = mainServiceUrl + "UpdateImagesIndexes", data = { 'values': pics };
                dataService.callAjax('Post', JSON.stringify(data), _url, function (d) { enableCTRL(btnUpload, true); commonManger.showMessage('تم التحديث', 'تم تحديث ترتيب العرض بنجاح.'); }, commonManger.errorException);
            });

            $(document).on('click', 'a.ShareCar', function (e) {
                e.preventDefault();

                newwindow = window.open($(this).attr('href'), 'Share Car', 'height=700,width=525');
                if (window.focus) { newwindow.focus() }

                return false;
            });

            // hide/show image on visitors website
            $(document).on('click', 'a.show-hide-pic', function (e) {
                e.preventDefault();

                var _this = $(this),
                    ob = {
                        id: _this.data('id'),
                        active: _this.data('active'),
                    },
                    onSuccessFun = function (data) {
                        data = data.d;

                        if (data.Status) {
                            var msgg = ob.active === 1 ? 'إخفاء الصورة من العرض بالموقع.' : 'إعادة عرض الصورة بالموقع.';
                            showMessage('success', 'تم بنجاح:', 'تم تنفيذ الإجراء بنجاح، ' + msgg);
                            getMainImage();
                        }
                        else {
                            showMessage('success', 'خطأ بالإجراء:', 'لقد حدث خطأ أثناء تنفيذ الإجراء بنجاح.');
                        }

                        enableCTRL(btnUpload, true);
                    },
                    ShowHideImg = function () {
                        enableCTRL(btnUpload, false);


                        var dto = { actionName: 'PicturesHide_Show', names: ['ID', 'Hide'], values: [ob.id, ob.active] };
                        dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', onSuccessFun, errCall);
                    };


                confirmMessage(ShowHideImg, ob.active);
            });

            // temp
            $(document).on('click', '#updateOldPics', function (e) {
                e.preventDefault();
                // only bring all 
                _url = mainServiceUrl + "UpdateCarImages", data = { 'id': $('#carId').val() };
                dataService.callAjax('Post', JSON.stringify(data), _url, function (d) { getMainImage(); commonManger.showMessage('تم التحديث', 'تم تحديث ترتيب العرض بنجاح.'); }, commonManger.errorException);
                $(this).addClass('hidden');
            });

        },
        confirmMessage = function (funCallBack, active) {

            var msgg = (active === 1 ? 'إخفاء الصورة' : 'إعادة عرض الصورة');

            if ($.isFunction(funCallBack)) {
                bootbox.confirm("هل أنت متأكد من تنفيذ الإجراء (" + msgg + ") الذى تم اختيارها؟",
                    function (result) { if (result) { funCallBack(); } });
            } else {
                return confirm("هل أنت متأكد من تنفيذ الإجراء (" + msgg + ") الذى تم اختيارها؟");
            }
        },
        resetConfirmation = function (funCallBack) {
            if ($.isFunction(funCallBack)) {
                bootbox.confirm("هل أنت متأكد من وضع هذه الصورة كصورة رئيسية للسيارة؟",
                    function (result) { if (result) { funCallBack(); } });
            } else {
                return confirm("هل أنت متأكد من وضع هذه الصورة كصورة رئيسية للسيارة؟");
            }
        },
        assignCarId = function () {
            var cId = commonManger.getUrlVars().id;
            $('#carId').val(cId);
            $('#divTitle').append(" رقم : " + cId);
            $('#ShareCar').attr('href', $('#ShareCar').attr('href') + cId);
            document.title += 'للسيارة رقم: ' + cId;
            // get images
            getMainImage();
        },
        enableCTRL = function (ctrl, isEnabled) {
            if (isEnabled)
                ctrl.removeAttr("disabled").text('ارفع الآن');
            else
                ctrl.prop('disabled', 'disabled').text('جارى رفع الصور...');
        },
        resetForm = function () {
            $('.ace-file-input a.remove').click();
        },
        showMessage = function (type, title, message) {
            type = (type == undefined || type == '') ? 'warning' : type;
            $('#divMessage').html('<div class="alert alert-' + type + ' fade in"><a class="close" data-dismiss="alert" href="#">×</a> <strong>' + title + '</strong>: ' + message + '</div>');
            commonManger.showMessage(title, message);
        },
        successAttach = function (data) {
            data = data.d != undefined ? data.d : data;
            if (data.indexOf('تمت') > -1) {
                showMessage('success', 'تم الرفع', data);
                resetForm(); getMainImage(); //GetImages();
            }
            else {
                showMessage('danger', 'لم يتم الرفع', data);
            }
            enableCTRL(btnUpload, true);
        },
        errCall = function (jqXhr, textStatus, errorThrown) {
            title = textStatus + ": " + errorThrown;
            message = JSON.parse(jqXhr.responseText).Message;
            console.log(title + ': ' + message);
            showMessage('danger', 'خطأ بالنظام: ' + title, 'برجاء الاتصال بادارة النظام: ' + message);
        },
        OnImagesSuccess = function (data) {
            data = data.d;
            var $img = $('#divIMagesList'), cid = $('#carId').val(), main = $('#hfMainImage').val();
            // reset gallery
            $img.html('');
            $(data).each(function (i, item) {
                var img = '<li><a target="_blank" href="/public/cars/' + cid + '/' + item + '" data-rel="colorbox">\
                    <img style="width: 150px; height: 150px" src="/public/cars/' + cid + '/_thumb/' + item + '" />\
                    <div class="text">\
                        <div class="inner">' + (main == item ? "صورة رئيسية" : "صورة السيارة") + '</div>\
                    </div>\
                </a>\
                    <div class="tools tools-bottom">\
                        <a href="javascript:void(0);" class="set-main ' + (main == item ? "hidden" : "") + '" data-id="' + item + '" title="' + (main == item ? "صورة رئيسية" : "") + '"><i class="icon-paper-clip"></i></a>\
                        <a class="itemToDelete" href="javascript:void(0);" data-id="' + item + '" title="حذف الصورة"><i class="icon-remove red"></i></a>\
                    </div>\
                </li>';
                $img.append(img);
            }).promise().done(function () { // fire sorting & filter
                //$('[data-rel="colorbox"]').colorbox();
            });
        },
        GetImages = function (id) {
            var _url = mainServiceUrl + "ShowCarImages", data = { 'id': $('#carId').val() };
            dataService.callAjax('Post', JSON.stringify(data), _url, OnImagesSuccess, errCall);
        },
        uploadPictures = function () {
            var fileUpload = $("#FileUpload2").get(0);
            var files = fileUpload.files;
            var data = new FormData();
            var id = $('#carId').val();
            data.append('cid', id);
            // validate images
            var isImage = false;
            for (var i = 0 ; i < files.length; i++) {
                var file = files[i];
                if (typeof file === "string") {
                    //ie8 and browsers that don't support file object
                    if ((/\.(jpe?g|png|gif|bmp)$/i).test(file)) {
                        data.append(files[i].name, files[i]);
                        isImage = true;
                    }
                }
                else {
                    var type = $.trim(file.type);
                    if ((type.length > 0 && (/^image\/(jpe?g|png|gif|bmp)$/i).test(type)) || ((/\.(jpe?g|png|gif|bmp)$/i).test(file.name))//for android's default browser which gives an empty string for file.type
                        ) { //not an image so don't keep this file
                        data.append(files[i].name, files[i]); isImage = true;
                    }
                }
            }
            if (isImage && id != '') {
                $.ajax({
                    type: "POST",
                    url: mysURL,
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: successAttach,
                    error: errCall
                });
            }
            else {
                showMessage('', 'اختر الصور', 'برجاء اختيار صور السيارة أولاً.');
                enableCTRL(btnUpload, true); //scrollTop();
            }
        },
        OnDeleteSuccess = function (data) {
            data = data.d;
            if (data == "1") {
                showMessage('success', 'تم الحذف', 'تمت عملية الحذف بنجاح.');
                getMainImage();  //GetImages(); // refresh list
            }
            else
                showMessage('danger', 'خطأ', 'لم تتم عملية الحذف.');

            // enable uploading
            enableCTRL(btnUpload, true);
        },
        deletePicture = function (name) {
            var id = $('#carId').val(), main = $('#hfMainImage').val(),
                _url = mainServiceUrl + "DeleteImage", data = { 'id': id, 'p': name, 'main': main };
            dataService.callAjax('Post', JSON.stringify(data), _url, OnDeleteSuccess, errCall);
        },
        deleteAllPictures = function () {
            var id = $('#carId').val();
            var _url = mainServiceUrl + "DeleteCarImage", data = { 'id': id };
            dataService.callAjax('Post', JSON.stringify(data), _url, OnDeleteSuccess, errCall);
        },
        OnMainSuccess = function (d) {
            var cdata = commonManger.comp2json(d.d), jsn = cdata.list, jsn1 = cdata.list1,
                $img = $('#divIMagesList'), cid = $('#carId').val();

            // reset list
            $img.html('');

            if (jsn) {
                $(jsn).each(function (i, item) {
                    var img = '<li><div class="text">' + (item.MainPicture == item.URL ? "<span class='red'>صورة رئيسية</span>" : "<span>ترتيب:</span>") + ' <input data-id="' + item.ID + '" class="thumb-index" type="number" value="' + item.Priority + '" /></div><a target="_blank" class="colorbox" href="/public/cars/' + cid + '/' + item.URL + '" data-rel="colorbox">\
                    <img style="width: 150px; height: 150px" src="/public/cars/' + cid + '/_thumb/' + item.URL + '" /></a>\
                    <div class="tools tools-bottom">\
                        <a href="javascript:void(0);" class="set-main ' + (item.MainPicture == item.URL ? "hidden" : "") + '" data-id="' + item.URL + '" title="' + (item.MainPicture == item.URL ? "صورة رئيسية" : "ثبتها كصورة رئيسية للسيارة") + '"><i class="icon-paper-clip"></i></a>\
                        <a data-id="' + item.ID + '" data-active="' + (item.HidePicID ? 0 : 1) + '" href="javascript:void(0);" title="' + (item.HidePicID ? 'عرض الصورة بالموقع' : 'إخفاء الصورة من العرض بالموقع') + '" class="show-hide-pic"><i class="icon-eye-' + (item.HidePicID ? 'close orange' : 'open green') + '"></i></a>\
                        <a class="itemToDelete" href="javascript:void(0);" data-id="' + item.URL + '" title="حذف الصورة"><i class="icon-remove red"></i></a>\
                    </div>\
                </li>';
                    $img.append(img);
                }).promise().done(function () {
                    var colorbox_params = {
                        reposition: true,
                        scalePhotos: true,
                        scrolling: false,
                        previous: '<i class="icon-arrow-left"></i>',
                        next: '<i class="icon-arrow-right"></i>',
                        close: '&times;',
                        current: '{current} من {total}',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        onOpen: function () {
                            document.body.style.overflow = 'hidden';
                        },
                        onClosed: function () {
                            document.body.style.overflow = 'auto';
                        },
                        onComplete: function () {
                            $.colorbox.resize();
                        },
                        rel: 'group1'
                    };
                    $('[data-rel="colorbox"]').colorbox(colorbox_params);
                    $("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");
                });
            }


            if (jsn1) {
                $('.carInfo').html('<a class="purple" href="CarDetailsPrint.aspx?id=' + $('#carId').val() + '">' + jsn1.MakerNameEn + ' - ' + jsn1.TypeNameEn + ' - ' + jsn1.Year + ' - <span data-rel="tooltip" title="Lot No">' + jsn1.LotNo + '</span> - <span data-rel="tooltip" title="شاصي">' + jsn1.ChassisNo + '</span></a>');
            }

            updateTooltip();

            if ($('#divIMagesList li').length > 0) {
                $('#updateOldPics').addClass('hidden');
            }
        },
        updateTooltip = function () {
            $('[data-toggle="tooltip"],[data-rel=tooltip],.ace-tooltip').tooltip();
        },
        getMainImage = function () {
            var id = $('#carId').val(), _url = sUrl + "GetData", data = { 'actionName': 'Images_GetMain', 'value': id };
            dataService.callAjax('Post', JSON.stringify(data), _url, OnMainSuccess, errCall);
        },
        onSetMainSuccess = function (d, p) {
            d = d.d;
            if (d == "1") {
                // set main pic & (hidden link)
                $('#hfMainImage').val(p);
                $('#divIMagesList li a.hidden').removeClass('hidden').attr('title', 'صورة السيارة').closest('li').find('div.text span').html('ترتيب: ').removeClass('red');
                $('#divIMagesList li a[data-id="' + p + '"]').attr('title', 'صورة رئيسية').addClass('hidden').closest('li').find('div.text span').html("<span class='red'>صورة رئيسية</span>");
                // show success message
                showMessage('success', 'تم الاجراء بنجاح:', 'تم وضع الصورة الرئيسية للسيارة بنجاح.');
            } else
                showMessage('danger', 'لم يتم الاجراء:', 'لم يتم وضع الصورة الرئيسية للسيارة، برجاء إعادة تحميل الصفحة والمحاولة مرة أخري.');

            // enable uploading
            enableCTRL(btnUpload, true);
        },
        setMainPicture = function (name) {
            var id = $('#carId').val(),
                _url = mainServiceUrl + "SetMainImage", data = { 'id': id, 'p': name };
            dataService.callAjax('Post', JSON.stringify(data), _url, success = function (data) { onSetMainSuccess(data, name); }, errCall);
        };

        return {
            Init: init,
        };
    }();

imagesManger.Init();
//#endregion

