// class manager
var pageManager = pageManager || {},
    pageManager = function () {
        var ids = '', id = '',

            Init = function () {
                var qs = commonManger.getUrlVars();

                if (qs) {
                    ids = qs.ids ? qs.ids : null; // selected cars ids.
                    id = qs.id ? qs.id : null; // invoice id.

                    // get bol data based on selected ids.
                    setBasicData();
                }

                pageEvents();
            },
            pageEvents = function () {
                // save all bol
                $('.btnFinish').click(function (e) {
                    e.preventDefault();
                    var isValid = commonManger.applyValidation('aspnetForm');
                    if (isValid) {

                        var fieldsDetails = ["ShippInvoiceID", "CarID", "Towing"],
                        valuesDetails = $($('#listItems tbody tr')).map(function (i, v) { return $(v).find('td:nth-child(1)').attr('data-billdetailsid') + ',' + $(v).find('td:nth-child(1)').text() + ',' + $(v).find('td:nth-child(5)').text().replace(',', '') }).get();

                        if (valuesDetails.length)
                            commonManger.SaveDataMasterDetails("", "masterForm", successSave, "", fieldsDetails, valuesDetails, "ShippInvoices_Save", "1");
                        else
                            commonManger.showMessage('اختر سيارات أولا', 'برجاء اختيار سيارات للحاوية.');
                    }
                });

                // remove car from grid
                $("#listItems tbody").delegate("tr a", "click", function (e) {
                    e.preventDefault();
                    var self = $(this), _tr = self.closest('tr');
                    removeElement(_tr);
                });

                //add new car
                $('#addNewCar').click(function (e) {
                    e.preventDefault();
                    var lot = $('#CarID').val();
                    if (lot != '') { // not empty
                        if (validateExistBefore(lot)) // exist before                    
                            commonManger.showMessage('السيارة موجودة', 'السيارة موجودة بالفعل، يرجي اختيار سيارة أخري.');
                        else {
                            var dto = { 'actionName': 'Booking_GetCarByLot', 'names': ['lot'], 'values': [lot] };
                            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', addCarToList, commonManger.errorException);
                        }
                    }
                    else
                        commonManger.showMessage('مطلوب', 'يرجي اختيار رقم اللوت أولاً.');
                });
            },
            validateExistBefore = function (id) {
                var exist = false;
                $('#listItems tbody').find('tr').find('td:nth-child(1)').each(function () {
                    if ($(this).text() == id)
                        exist = true;
                });
                return exist;
            },
            addCarToList = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;
                if (jsn) {
                    var carsList = $(jsn).map(function (i, v) { return '<tr><td data-billdetailsid=' + (v.BillDetailsID ? v.BillDetailsID : 0) + ' title="رقم السيارة">' + v.CarID + '</td><td title="LOT - Year - Maker - Model">' + (v.LotNo + ' - ' + v.Year + ' - ' + v.MakerNameEn + ' - ' + v.TypeNameEn) + '</td><td>' + v.ShipCompanyNameEn + '</td><td>' + v.RegionEn + '</td><td>' + numeral(v.Towing).format('0,0.00') + '</td><td><a class="btn btn-mini btn-danger remove" data-rel="tooltip" title="حذف السيارة"><i class="icon-remove"></i></a></td></tr>' }).get();
                    $('#listItems tbody').append(carsList);

                    // cars count                
                    setCarsCount();
                }
            },
            removeElement = function (el) {
                el.css({ 'transition': 'background-color 1s', 'background-color': 'red' }).fadeOut('slow').promise().done(function () { el.remove(); });
            },
            successSave = function (data) {
                data = data.d;
                if (data.Status) // go to booking list 
                    window.location.href = 'InvoicesShippBolView.aspx';
                else
                    console.log(data);
            },
            setBasicData = function () {
                var bindLists = function (data) {
                    var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list, jsn1 = jsnData.list1, jsn2 = jsnData.list2, $navigList = $('#NavigationCoID'); $navigList.append($('<option>'));

                    // track companies
                    $.each(jsn, function (i, item) {
                        $navigList.append($('<option>').text(this.NavigationCoName).attr('value', this.NavigationCoID));
                    });

                    // cars list
                    if (jsn1) {
                        var carsList = $(jsn1).map(function (i, v) { return '<tr><td data-billdetailsid=' + (v.BillDetailsID ? v.BillDetailsID : 0) + ' title="رقم السيارة">' + v.CarID + '</td><td title="LOT - Year - Maker - Model">' + (v.LotNo + ' - ' + v.Year + ' - ' + v.MakerNameEn + ' - ' + v.TypeNameEn) + '</td><td>' + v.ShipCompanyNameEn + '</td><td>' + v.RegionEn + '</td><td>' + numeral(v.Towing).format('0,0.00') + '</td><td><a class="btn btn-mini btn-danger remove" data-rel="tooltip" title="حذف السيارة"><i class="icon-remove"></i></a></td></tr>' }).get();
                        $('#listItems tbody').append(carsList);


                        // bind master form
                        var firstRow = [];
                        $(jsn1).each(function (index, element) {
                            if (index === 0)
                                firstRow.push(element);
                        });

                        $('#ShippInvoiceID').val(firstRow[0].ShippInvoiceID ? firstRow[0].ShippInvoiceID : 0);
                        $('#DistinationID').val(firstRow[0].DistinationID);
                        $('#ShipperID').val(firstRow[0].ShipperID);

                        $('#ArrivalDate').val(commonManger.formatJSONDateCal(firstRow[0].ArrivalDate));
                        $('#ContainerNo').val(firstRow[0].ContainerNo);
                        $('#NavigationCoID').val(firstRow[0].NavigationCoID);
                        $('#ContainerSize').val(firstRow[0].ContainerSize);
                        $('#Bol').val(firstRow[0].Bol);
                        $('#ContainersNotes').val(firstRow[0].ContainersNotes);

                        $('#ShippPrice').val(firstRow[0].ShippPrice ? firstRow[0].ShippPrice : 0); // default shipping price
                        $('#LoadingPrice').val(firstRow[0].LoadingPrice ? firstRow[0].LoadingPrice : 0); // default loading

                        setCarsCount();
                    }

                    // related cars to shipping
                    if (jsn2) {
                        var options = $(jsn2).map(function (i, v) { return $('<option />').val(v.CarID).text(v.LotNo); }).get();
                        $('#CarID').append(options).trigger('chosen:updated');
                    }
                },
                dto = { actionName: "Booking_Properties", 'names': ['Ids', 'Id'], 'values': [ids, id] };


                dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindLists, commonManger.errorException);
            },
            setCarsCount = function () {
                $('#CarsNo').val($('#listItems tbody tr').length);
            },
            removeValue = function (list, value, separator) { // remove item from string separated by ,
                separator = separator || ",";
                var values = list.split(separator);
                for (var i = 0 ; i < values.length ; i++) {
                    if (values[i] == value) {
                        values.splice(i, 1);
                        return values.join(separator);
                    }
                }
                return list;
            };

        return {
            Init: Init
        };
    }();
pageManager.Init();