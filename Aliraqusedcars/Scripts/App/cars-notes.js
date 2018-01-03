var
    pageManager = function () {

        var
            buyer = '', chassis = '', shipper = '', dist = '', lateDays = '', lateTitle = '', title = '',
            ToGroupID = { UAE: 1, USA: 2 },

            addNoteForm = 'frmAddNote',
            startReplyPanel = 'pnlReply',
            resetNoteForm = function () {
                $('.modal-footer textarea,.modal-footer input,.modal-footer select').val('');
                $('.ace-file-input .remove').trigger('click');
                $('#attchFile').attr('data-uploaded-file', '');
                $('#frmAddNote .self-msg').attr('checked', false);
            },
            resetModalPanels = function () {
                $('#' + addNoteForm).addClass('hidden');
                $('#' + startReplyPanel).removeClass('hidden');
            },
            saveUrl = 'america/carnotes.aspx/',


            Init = function () {

                var qString = commonManger.getUrlVars();
                lateDays = qString['latedays']; lateDays = lateDays ? lateDays : '';


                // check late title 
                if (qString.latetitle && qString.latetitle !== '') {
                    lateTitle = 1;
                    $('#CarTitleAmrica').attr('checked', true);
                }


                filllistItems();


                setDataToControlandGrid();
                getNotesNotofication();

                doEvents();

                fireUploadControl();
            },
            doEvents = function () {
                $('#shipper').change(function () { // get cars list by select shipping co.
                    shipper = $(this).val();
                    updateGrid();
                });


                // start search cars
                $('#btnSearchAll').click(function (e) {
                    e.preventDefault();

                    // reset selected cars
                    resetSelectedCars();

                    // get search paramters & show result.
                    buyer = $('#Buyer').val(),
                        chassis = $('#ChassisN').val(),
                        shipper = $('#shipper').val(),
                        dist = $('#DistinationID').val(),
                        lateTitle = $('#CarTitleAmrica').is(':checked') ? 1 : '',
                        title = $('[name="Title"]:checked').val() ? $('[name="Title"]:checked').val() : '';


                    updateGrid();
                });


                // undo selection
                $('.bookingUndo').click(function (e) {
                    e.preventDefault();
                    resetSelectedCars();
                });


                // start reply 
                $('#startReply').click(function (e) {
                    e.preventDefault();

                    $('#' + addNoteForm).removeClass('hidden');
                    $('#' + startReplyPanel).addClass('hidden');
                });


                // cancel replaying
                $('#btnCancelRepaying').click(function (e) {
                    e.preventDefault();
                    // reset modal add panels.
                    resetModalPanels();
                    // reset form.
                    resetNoteForm();
                });


                // add new note
                $('#bntSendNote').click(function (e) {
                    e.preventDefault();
                    startSaveNoteOnCar();
                });


                $('textarea#txtNote').bind('keydown', 'return', function (e) {
                    e.preventDefault();
                    startSaveNoteOnCar();
                });


                // fast reply
                // notifications panel
                $('.notes-body-contents').delegate("button.fastReply", "click", function (e) {
                    e.preventDefault();

                    var _this = $(this),
                        mainDiv = _this.closest('.btn-group'),
                        attchedFile = mainDiv.closest('div.form-panel').find('input').attr('data-uploaded-file'),

                        data = {
                            carId: mainDiv.prev('textarea').attr('data-carid'),
                            toID: ToGroupID.USA, // to emp. group USA Alaa
                            note: mainDiv.prev('textarea').val(),
                            file: attchedFile ? attchedFile : '',
                            isSelf: false
                        },
                        resetFastReplyForm = function () {
                            mainDiv.prev('textarea').val('');
                            mainDiv.closest('div.form-panel').find('input').attr('data-uploaded-file', '');
                            mainDiv.closest('div.form-panel').find('a.remove').trigger('click');
                        },
                        replySaved = function (result) {

                            var dataAll = commonManger.comp2json(result.d), jsn = dataAll.list;

                            if (jsn) {
                                // show the latest post

                                var containerDiv = _this.closest('form').prev('.dialogs'),
                                    postHtml = '<div class="itemdiv dialogdiv"> <div class="user"> <img alt="' + jsn.AuthorName + '" src="/' + jsn.Photo + '"> </div> <div class="body"> <div class="time"> <i class="icon-time"></i> <span class="grey">' + moment(jsn.AddDate).format("DD-MM-YYYY") + '</span> </div> <div class="name"> <a>' + jsn.AuthorName + '</a> </div> <div class="text">' + jsn.Notes + (jsn.FileUrl ? ' <a href="/public/notes/' + jsn.FileUrl + '" target="_blank" title="Download Attachment" class="green"><i class="icon-paper-clip green bigger-120"></i></a>' : '') + '</div> </div> </div>';

                                // show latest post.
                                containerDiv.append(postHtml);

                                // reset Fast Reply Form
                                resetFastReplyForm();
                                // refresh
                            } else {
                                alert('Please reload the web page to review your login, Thanks');
                                window.location.reload();
                            }
                        };


                    if (data.note != '') {
                        dataService.callAjax('Post',
                            JSON.stringify(data),
                            saveUrl + 'ReplyNote',
                            replySaved,
                            commonManger.errorException);
                    }
                    else {
                        mainDiv.prev('textarea').focus();
                        commonManger.showMessage('Required fields:', 'Please enter your note first.');
                    }
                });


                // close note
                $('.notes-body-contents').delegate("button.closeNote", "click", function (e) {
                    e.preventDefault();

                    var _this = $(this),
                        carId = _this.attr('data-carid');

                    // close note
                    if (carId != '') {
                        var closed = closeCurrentNote(carId);
                        _this.closest('.widget-box').remove();
                    }

                });


                // close note
                $('#commentsModal .modal-footer .closeNote').click(function (e) {
                    e.preventDefault();

                    var carId = $('#CarID').val();

                    if (carId) {
                        closeCurrentNote(carId);
                        $('#commentsModal').modal('hide');
                    }
                });


                // show all new notes
                $('#NewCarNotesCount').click(function (e) {
                    e.preventDefault();

                    getAllNotesNotoficationList();
                    $('#notifications').modal('show');
                });


                // update all notifications after replying
                $('#notifications .close').click(function (e) {
                    e.preventDefault();

                    getNotesNotofication();
                });
            },
            startSaveNoteOnCar = function () {
                var
                    data = {
                        carId: $('#CarID').val(),
                        toID: ToGroupID.USA, // to emp. group USA (Alaa)
                        note: $('#txtNote').val(),
                        isSelf: $('#frmAddNote .self-msg').is(':checked') ? true : false,
                        file: $('#attchFile').attr('data-uploaded-file') ? $('#attchFile').attr('data-uploaded-file') : '',
                    },
                    noteSaved = function (result) {
                        if (result.d) {
                            resetNoteForm();

                            resetModalPanels();

                            // refresh notes.
                            getCarNotes(data.carId);
                        } else {
                            alert('Please reload the web page to review your login, Thanks');
                            window.location.reload();
                        }
                    };

                if (data.note != '') {
                    dataService.callAjax('Post', JSON.stringify(data), saveUrl + 'ReplyNote', noteSaved, commonManger.errorException);
                }
                else {
                    $('#txtNote').focus();
                    commonManger.showMessage('Required fields:', 'Please enter your note first.');
                }
            },
            getNotesNotofication = function () {
                var showNotifications = function (data) {
                    var dataAll = commonManger.comp2json(data.d), jsn = dataAll.list, newNotificId = 'NewCarNotesCount';

                    if (jsn && jsn.NewNotes * 1 > 0) {
                        $('#' + newNotificId).text(jsn.NewNotes).closest('div.alert-warning').removeClass('hidden');
                    }
                };


                dataService.callAjax('Post', {}, saveUrl + 'GetNoteNotifications', showNotifications, commonManger.errorException);
            },
            getAllNotesNotoficationList = function () {
                var bindNotes = function (data) {

                    var dataAll = commonManger.comp2json(data.d), jsn = dataAll.list, jsn1 = dataAll.list1;
                    jsn1 = $.isArray(jsn1) ? jsn1 : $.makeArray(jsn1);


                    var nList = $(jsn).map(function (i, vl) {
                        var detailsObj = $.grep(jsn1, function (n, i2) {
                            return n.CarID === vl.CarID;
                        }),
                            detailsHtml = $(detailsObj).map(function (i3, v) { return '<div class="itemdiv dialogdiv"> <div class="user"> <img alt="' + v.AuthorName + '" src="/' + v.Photo + '"> </div> <div class="body"> <div class="time"> <i class="icon-time"></i> <span class="grey">' + moment(v.AddDate).format("DD-MM-YYYY") + '</span> </div> <div class="name"> <a>' + v.AuthorName + '</a> </div> <div class="text"><i class="icon-quote-left"></i> ' + v.Notes + (v.FileUrl ? ' <a href="/public/notes/' + v.FileUrl + '" target="_blank" title="Download Attachment" class="green"><i class="icon-paper-clip green bigger-120"></i></a>' : '') + '</div> </div> </div>'; }).get();



                        return '<div dir="ltr" class="widget-box"> <div class="widget-header header-color-blue5"> <h6 class="smaller"> <i class="icon-car"></i> ' + vl.Year + ' ' + vl.MakerNameEn + ' - ' + vl.TypeNameEn + ', Lot: ' + vl.LotNo + ', ' + vl.ShipCompanyNameEn + ', ' + vl.AuctionName + '</h6> </div> <div class="widget-body"> <div class="widget-main no-padding"> <div class="slimScrollDiv"><div class="dialogs">' + detailsHtml.join('') + '</div> <form> <div class="form-panel"><input id="AttachFile_' + vl.CarID + '" type="file" data-uploaded-file="" class="attachment-img attchFile" /> <textarea class="width-75 fast-reply-text" data-carid="' + vl.CarID + '" placeholder="Type your message here ..." name="message"></textarea> <div class="btn-group btn-group-vertical pull-right"><button class="btn btn-small btn-info no-radius fastReply"> <i class="icon-share-alt"></i> Reply&nbsp;</button> <button class="btn btn-small btn-danger no-radius closeNote" data-carid="' + vl.CarID + '">Close note</button></div></div> </form> </div> </div> </div></div>';
                    }).get();



                    $('.notes-body-contents').html(nList);
                    // re-fire events


                    // attach file
                    $('#notifications .modal-body .attachment-img').ace_file_input({
                        style: 'well',
                        btn_choose: 'Attch',
                        btn_change: null,
                        droppable: true,
                        no_icon: 'icon-cloud-upload',
                        thumbnail: 'small',
                        allowExt: ["jpeg", "jpg", "png", "gif", "pdf"],
                        whitelist: 'gif|png|jpg|jpeg|pdf',
                        allowMime: ["image/jpg", "image/jpeg", "image/png", "image/gif", "application/pdf"],
                        before_remove: function () {

                            // delete uploaded file
                            //console.log('before_remove');

                            //don't remove/reset files while being uploaded
                            return true;
                        },
                        before_change: function (files, dropped) {
                            var file = files[0];

                            if (typeof file === "string") {
                                //console.log('string:', file, file.name, $.trim(file.type));

                                //file is just a file name here (in browsers that don't support FileReader API)
                                if (!(/\.(jpe?g|png|gif|bmp|pdf)$/i).test(file)) return false;
                            }
                            else {//file is a File object
                                var type = $.trim(file.type);

                                //console.log('by type:', file, file.name, type);

                                if ((type.length > 0 && !(/^(image|application)\/(jpe?g|png|gif|bmp|pdf)$/i).test(type))
                                    || (type.length == 0 && !(/\.(jpe?g|png|gif|bmp|pdf)$/i).test(file.name))//for android's default browser which gives an empty string for file.type
                                ) return false;


                                if (file.size > 10000000) {//~10MB
                                    return false;
                                }
                            }


                            var _this = $(this);
                            uploadFile(file, _this);
                            return true;
                        },
                        preview_error: function (filename, code) {
                            //console.log(filename, code);
                            //code = 1 means file load error
                            //code = 2 image load error (possibly file is not an image)
                            //code = 3 preview failed
                        }
                    }).on('change', function () {
                        //console.log($(this).data('ace_input_files'));
                        //console.log($(this).data('ace_input_method'));
                    }).on('file.error.ace', function (ev, info) {
                        if (info.error_count['ext'] || info.error_count['mime']) alert('Invalid file type! Please select an image!');
                        if (info.error_count['size']) alert('Invalid file size! Maximum 100KB');

                        //you can reset previous selection on error
                        //ev.preventDefault();
                        //file_input.ace_file_input('reset_input');
                    });
                };



                dataService.callAjax('Post', {}, saveUrl + 'GetNotificationsNotes', bindNotes, commonManger.errorException);
            },
            fireUploadControl = function () {

                // attach file
                $('.attachment-img').ace_file_input({
                    style: 'well',
                    btn_choose: 'Attch',
                    btn_change: null,
                    droppable: true,
                    no_icon: 'icon-cloud-upload',
                    thumbnail: 'small',
                    allowExt: ["jpeg", "jpg", "png", "gif", "pdf"],
                    whitelist: 'gif|png|jpg|jpeg|pdf',
                    allowMime: ["image/jpg", "image/jpeg", "image/png", "image/gif", "application/pdf"],
                    before_remove: function () {

                        // delete uploaded file
                        //console.log('before_remove');

                        //don't remove/reset files while being uploaded
                        return true;
                    },
                    before_change: function (files, dropped) {
                        var file = files[0];

                        if (typeof file === "string") {
                            //console.log('string:', file, file.name, $.trim(file.type));
                            //file is just a file name here (in browsers that don't support FileReader API)
                            if (!(/\.(jpe?g|png|gif|bmp|pdf)$/i).test(file)) return false;
                        }
                        else {//file is a File object
                            var type = $.trim(file.type);

                            //console.log('by type:', file, file.name, type);

                            if ((type.length > 0 && !(/^(image|application)\/(jpe?g|png|gif|bmp|pdf)$/i).test(type))
                                || (type.length == 0 && !(/\.(jpe?g|png|gif|bmp|pdf)$/i).test(file.name))//for android's default browser which gives an empty string for file.type
                            ) return false;


                            if (file.size > 10000000) {//~10MB
                                return false;
                            }
                        }


                        var _this = $(this);
                        uploadFile(file, _this);
                        return true;
                    },
                    preview_error: function (filename, code) {
                        //console.log(filename, code);
                        //code = 1 means file load error
                        //code = 2 image load error (possibly file is not an image)
                        //code = 3 preview failed
                    }
                }).on('change', function () {
                    //console.log($(this).data('ace_input_files'));
                    //console.log($(this).data('ace_input_method'));
                }).on('file.error.ace', function (ev, info) {
                    if (info.error_count['ext'] || info.error_count['mime']) alert('Invalid file type! Please select an image!');
                    if (info.error_count['size']) alert('Invalid file size! Maximum 100KB');

                    //you can reset previous selection on error
                    //ev.preventDefault();
                    //file_input.ace_file_input('reset_input');
                }).on('file.error.ace', function (ev, info) {
                    if (info.error_count['ext'] || info.error_count['mime']) alert('Invalid file type! Please select an image!');
                    if (info.error_count['size']) alert('Invalid file size! Maximum 100KB');

                    //you can reset previous selection on error
                    //ev.preventDefault();
                    //file_input.ace_file_input('reset_input');
                });

            },
            uploadFile = function (fileToUpload, fileCtrl) {
                var data = new FormData(),
                    successAttach = function (data) {
                        fileCtrl.attr('data-uploaded-file', data);
                    };


                if (fileToUpload) {
                    data.append(fileToUpload.name, fileToUpload);


                    $.ajax({
                        type: "POST",
                        url: "/photo/AttachFile.ashx",
                        data: data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: successAttach,
                        error: commonManger.errorException
                    });
                }
            },
            closeCurrentNote = function (cID) {
                var dto = { carid: cID },
                    noteClosed = function (data) {
                        if (data.d * 1 > 0) {
                            commonManger.showMessage('Note Closed', 'Notes on this car has been closed successfully.');
                            return data.d * 1;
                        } else {
                            commonManger.showMessage('Not found:', 'There are no notes to be closed.');
                        }
                    };


                dataService.callAjax('Post', JSON.stringify(dto), saveUrl + 'CloseNote',
                    noteClosed, commonManger.errorException);
            },
            resetSelectedCars = function () {
                $('.bookingNow .badge-pink').text('0');
                $('.bookingNow,.bookingUndo').addClass('hidden'); $('input[name$=ToCheck]').val('');
                var count = $("input[name=CarID]:checked").map(function () { $(this).attr("checked", false); return this.value; });
            },
            assignCarsToBol = function (cntrol) {
                // validate the same shipper & distination
                var $shippCheck = $('input[name=shipperToCheck]'), $distCheck = $('input[name=distToCheck]'), // place for compareson
                    currentShipp = cntrol.attr('data-shipper'), currentDist = cntrol.attr('data-distination'); // data to compare

                if ($shippCheck.val() !== '' && $distCheck.val() !== '') {
                    if ($shippCheck.val() !== currentShipp || $distCheck.val() !== currentDist) {
                        commonManger.showMessage('خطأ بالاختيار', 'برجاء اختيار السيارات التابعة لشاحن واحد وجهة وصول واحدة.');
                        cntrol.removeAttr('checked');
                        return;
                    }
                } else { // save selected shipper & distination
                    $shippCheck.val(currentShipp);
                    $distCheck.val(currentDist);
                }
                // get all of selected cars
                var ids = $("input[name=CarID]:checked").map(function () { return this.value; }).get().join(",");
                $('.bookingNow').attr('href', 'bookingbol.aspx?ids=' + ids);
                // show/hide go to bol button.
                if ($('.select:checked').is(':checked')) {
                    $('.bookingNow,.bookingUndo').removeClass('hidden');
                }
                else {
                    $('.bookingNow,.bookingUndo').addClass('hidden');
                    $('input[name$=ToCheck]').val('');
                }

                $('.bookingNow .badge-pink').text(ids.split(',').length);
            },
            setDataToControlandGrid = function () {
                var DTO = { 'actionName': "CarsData_ShippCompanies", 'value': '' };
                dataService.callAjax('Post', JSON.stringify(DTO), mainServiceUrl + 'GetData',
                    function (data) {
                        var selectList = JSON.parse(data.d);
                        commonManger.Filllist(selectList, "masterForm");
                    }, commonManger.errorException);
            },
            triggerRowNotes = function (notesCount, carId) {
                $('span[data-carID=' + carId + ']').text(notesCount); // show back notes count on the button.
            },
            updateGrid = function () {
                $('#listItems').DataTable().draw();
            },
            filllistItems = function () {
                var oTable = $('#listItems').DataTable({
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
                    "bServerSide": true,
                    responsive: true,
                    "bRetrieve": false,
                    "bDestroy": true,
                    "sAjaxSource": sUrl + "LoadDataTablesXML",
                    "fnServerParams": function (aoData) {

                        aoData.push({ "name": "funName", "value": "CarsData_Search4Notes" },
                            { "name": 'names', "value": "chassis~Shipper~Dist~LateTitle~LateDays~Title" },
                            { "name": "values", "value": chassis + '~' + shipper + '~' + dist + '~' + lateTitle + '~' + lateDays + '~' + title });

                    },
                    "fnServerData": function (sSource, aoData, fnCallback) {
                        dataService.callAjax('GET', aoData, sSource, function (data) {
                            commonManger.setData2Grid(data, aoData.sEcho, fnCallback);
                        }, commonManger.errorException);
                    },
                    "drawCallback": function () {
                        var api = this.api(), rows = api.rows({ page: 'current' }).nodes(), last = null;
                        api.column(0, { page: 'current' }).data().each(function (group, i) { // show invoice info
                            if (last !== group) {
                                $(rows).eq(i).before('<tr class="alert alert-success"><td colspan="100%"><strong>الشاحن: </strong>' + group + '</td></tr>');
                                last = group;
                            }
                        });
                    },
                    "iDisplayLength": 50,
                    "aaSorting": [],
                    "aoColumns": [
                        {
                            "mData": function (d) {
                                return d.ShipCompanyNameEn ? d.ShipCompanyNameEn : '';
                            },
                            "bVisible": false,
                            "bSortable": false
                        },
                        {
                            "mDataProp": "CarID",
                            "sClass": 'text-center',
                            "bSortable": true
                        },
                        {
                            "mDataProp": "MainPicture",
                            "bSortable": false,
                            "sClass": "text-center hidden-phone hidden-480",
                            "mData": function (oObj) {
                                return (oObj["MainPicture"] != null ? '<img alt=\"car\" src=\"/public/cars/' + oObj["CarID"] + '/_thumb/' + oObj["MainPicture"] + '\" />' : '<img alt=\"car\" src="/public/cars/noimage.gif" />');
                            }
                        },
                        {
                            "mDataProp": "InvoiceDate",
                            "bSortable": true,
                            'sClass': 'hidden-phone hidden-480',
                            "mData": function (oObj) {
                                return commonManger.formatJSONDateCal(oObj['InvoiceDate']);
                            }
                        },
                        {
                            "mDataProp": null,
                            "bSortable": false,
                            "mData": function (oObj) {
                                return oObj["MakerNameEn"] + ' - ' + oObj["TypeNameEn"] + ' - ' + oObj["Year"];
                            }
                        },
                        {
                            "mDataProp": "full_name",
                            "bSortable": false,
                            "mData": function (oObj) {
                                return (oObj.SaleClientName ? oObj.SaleClientName : oObj.full_name);
                            }
                        },
                        {
                            "mDataProp": "LotNo",
                            'sClass': 'hidden-phone',
                            "bSortable": false
                        },
                        {
                            "mDataProp": "ChassisNo",
                            'sClass': 'hidden-phone hidden-480',
                            "bSortable": false
                        },
                        {
                            "mDataProp": "RegionEn",
                            "mData": function (d) { return d.RegionEn ? d.RegionEn : ""; },
                            "bSortable": false
                        },
                        {
                            "mDataProp": "BuyerName",
                            'sClass': 'hidden-phone',
                            "bSortable": false,
                            "mData": function (d) {
                                return d.BuyerName ? d.BuyerName : ''
                            }
                        },
                        {
                            "mDataProp": "DistinationNameEn",
                            "bSortable": false,
                            "mData": function (d) {
                                return '<img src="/App_Themes/iraq/images/' + d.DistinationNameEn + '.jpg" width="25" /> ' + d.DistinationNameEn;
                            }
                        },
                        {
                            "mDataProp": "CarTitleAmrica",
                            "sClass": 'text-center',
                            "bSortable": false,
                            "mData": function (d) {

                                if (d.Boocked) {
                                    return '';
                                }

                                if (d.CarTitleAmrica === 'true')
                                    return '<input type="checkbox" class="title" style="opacity:1;" checked />';
                                else
                                    return '<input type="checkbox" class="title" style="opacity:1;" />';
                            }
                        },
                        {
                            "bSortable": false,
                            "sClass": 'text-center hidden-print',
                            "mData": function (d) {
                                if (d.Boocked) {
                                    return '';
                                }

                                if (d.CarTitleAmrica === 'true')
                                    return '<input type="checkbox" class="select" data-shipper="' + d.ShipperID + '" data-distination="' + d.DistinationID + '" name="CarID" value="' + d.CarID + '" style="opacity:1;" />';
                                else
                                    return '<input type="checkbox" class="select" disabled data-shipper="' + d.ShipperID + '" data-distination="' + d.DistinationID + '" name="CarID" value="' + d.CarID + '" />';
                            }
                        },
                        {
                            "mDataProp": "Notes",
                            'sClass': 'hidden-print',
                            "bSortable": false,
                            "mData": function (data) {
                                return '<a data-car-id="' + data.CarID + '" class="btn btn-app btn-primary no-radius notes" data-rel="tooltip" data-placement="top" title="عرض التعليقات">Notes<span data-carID=' + data.CarID + ' class="badge badge-warning badge-right">' + data.NotesCount + '</span></a>';
                            }
                        }
                    ]
                });


                $("#listItems tbody").delegate("tr a", "click", function (e) {
                    e.preventDefault();
                    var self = $(this),
                        pos = self.closest('tr');

                    if (pos !== null) {
                        var aData = oTable.row(pos).data();
                        if (self.hasClass('notes')) {

                            var carTitle = (aData["MakerNameEn"] + ' - ' + aData["TypeNameEn"] + ' - ' + aData["Year"]),
                                carID = self.attr('data-car-id'),
                                _title = "Notes: " + carTitle, modalDialog = "commentsModal";


                            // show car info
                            $('#CarID').val(carID);


                            // get car notes by car number
                            if (carID)
                                getCarNotes(carID);


                            // show comments panel
                            commonManger.showPopUpDialog(_title, '', modalDialog);

                        }
                    }
                });
                $("#listItems tbody").delegate("tr :checkbox", "change", function (e) {
                    e.preventDefault();

                    var self = $(this), pos = self.closest('tr');
                    if (pos !== null) {
                        var aData = oTable.row(pos).data();
                        if (self.hasClass('title')) {
                            var cid = $(this).closest('tr').find('td:eq(0)').text(), ctitle = self.is(':checked') ? true : false,
                                ////////// start save car title/////////////////
                                ParamValues = [cid, ctitle],
                                ParamNames = ["CarID", "CarTitle"];
                            var url = mainServiceUrl + "saveDefaultData",
                                DTO = { 'values': ParamValues, 'actionName': "CarsData_SetTitle", 'Parm_names': ParamNames },
                                dto = JSON.stringify(DTO);
                            dataService.callAjax('Post', dto, url,
                                function (data) {
                                    if (data.d.Status) {
                                        if (ctitle) {
                                            commonManger.showMessage('تم الحفظ بنجاح', 'تم حفظ وصول ورق (تايتل - Title) السيارة بنجاح.');
                                            // activate car to bol
                                            self.closest('tr').find('.select:checkbox').removeAttr('disabled').css('opacity', '1');
                                        }
                                        else {
                                            commonManger.showMessage('تم الحفظ بنجاح', 'تم إلغاء وصول ورق (تايتل - Title) السيارة بنجاح.');
                                            // disable car to bol
                                            self.closest('tr').find('.select:checkbox').attr("disabled", true).attr("checked", false).css('opacity', '0');
                                        }
                                    }
                                }, commonManger.errorException);
                        }
                        else if (self.hasClass('select')) {
                            assignCarsToBol(self);
                        }
                    }
                });
            },
            getCarNotes = function (carId) {

                var dto = { actionName: 'CarNotes_List', id: carId },
                    surl = saveUrl + 'GetNotes',
                    showNotesList = function (d) {

                        var dataAll = commonManger.comp2json(d.d), jsn = dataAll.list, jsn1 = dataAll.list1,

                            nList = $(jsn1).map(function (i, v) {
                                return '<div class="item"><div class="image"><img src="/' + v.Photo + '" class="img-thumbnail"></div><div class="date"><i class="icon-time"></i> ' + moment(v.AddDate).format("DD-MM-YYYY") + '</div><div class="text"><a>' + v.AuthorName + '</a><p><i class="icon-quote-left"></i> ' + v.Notes + (v.FileUrl ? ' <a href="/public/notes/' + v.FileUrl + '" target="_blank" title="Download Attachment" class="green"><i class="icon-paper-clip green bigger-120"></i></a>' : '') + '</p></div></div>';
                            }).get(),
                            renderHtml = function (list) {
                                $('div.block.messaging').html(list);
                            };


                        if (jsn) {
                            $('.car-inv-date').text(moment(jsn.InvoiceDate).format('DD-MM-YYYY'));
                            $('.car-shipper').text(jsn.ShipCompanyNameEn);
                            $('.car-auction').text(jsn.AuctionName);
                            $('.car-region').text(jsn.RegionEn);
                            $('.car-lot').text(jsn.LotNo);
                            $('.car-vin').text(jsn.ChassisNo);
                            $('.car-buyer').text(jsn.BuyerName);
                        }


                        // show notes
                        $.when(renderHtml(nList)).then(function () {
                            var divId = '#commentsModal .modal-body';
                            $(divId).scrollTop($(divId)[0].scrollHeight);
                        });


                        // notes list count
                        // update notes count on car
                        if (nList.length) {
                            triggerRowNotes(nList.length, carId);
                        }
                    };


                dataService.callAjax('Post', JSON.stringify(dto), surl, showNotesList, commonManger.errorException);
            };


        return {
            Init: Init
        };

    }();