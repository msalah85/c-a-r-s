
var
    select2Manager = function () {
        var select2Defaults = {
            pageSize: 10,
            serviceUrl: sUrl + 'getSelect2'
        },
        init = function () {;
            $('.select2').select2({
                placeholder: 'اختــــر',
                minimumInputLength: 0, //Does the user have to enter any data before sending the ajax request
                allowClear: true,
                //initSelection: function (elem, callback) {
                //    var id = elem.val(), text = elem.data('option'), data = { id: id, text: text };
                //    callback(data);
                //},
                ajax: {
                    quietMillis: 150,
                    url: select2Defaults.serviceUrl,
                    dataType: 'json',
                    delay: 0,
                    dir: "rtl",
                    type: "POST",
                    params: {
                        contentType: 'application/json; charset=utf-8'
                    },
                    //Our search term and what page we are on
                    data: function (term, page) {

                        var _names = $(this).data('srch-names') ? $(this).data('srch-names').split('~') : [],
                        _values = (_names.length > 0 ? $(_names).map(function (i, el) { return $('#' + el).val(); }).get() : []),
                        funName = $(this).data('fn-name'),

                        dta = {
                            fnName: funName,
                            pageNum: page,
                            pageSize: select2Defaults.pageSize,
                            searchTerm: term,

                            // additional parameters as string separated by (~) char.
                            names: _names.join('~'),
                            values: _values.join('~')
                        };

                        return JSON.stringify(dta);
                    },
                    results: function (data, page) {
                        var results = getSelect2ResultFormat(data, page);
                        return results;
                    }
                }
            });
        },
        getSelect2ResultFormat = function (data, page) {
            var dAll = commonManger.comp2json(data.d), // decompress data from server
                                    resultJson = (dAll.list ? dAll.list : []), // result data (id, text1)
                                    resultCount = (dAll.list1 ? dAll.list1.CNT : 0), // results count
                                    resultAsArray = $.isArray(resultJson)
                                                    ? $.map(resultJson, function (el) { return { id: el.id, text: el.text1 } }) // convert json to array with enhanced nodes (multiple rows).
                                                    : [{ id: resultJson.id, text: resultJson.text1 }], // single results data
                                    more = ((page * select2Defaults.pageSize) < resultCount);

            return { results: resultAsArray, more: more };
        },
        setBindingCarShippers = function () {
            // select2 control options
            var select2Defaults = {
                pageSize: 10,
                serviceUrl: sUrl + 'getSelect2',
                _names: ['RID', 'DID'],
                funName: 'ShipperBindings_GeByRegionID',
            };

            // instance edit shipper
            $('a.editable.shipper').editable({
                type: 'select2',
                select2: {
                    placeholder: 'اختر الشاحن',
                    allowClear: true,
                    width: '200px',
                    minimumInputLength: 0,

                    ajax: {
                        quietMillis: 150,
                        url: select2Defaults.serviceUrl,

                        dataType: 'json', type: "POST",
                        params: {
                            contentType: 'application/json; charset=utf-8'
                        },

                        // shippers filter parameters
                        data: function (term, page) {

                            var _thisCtrl = $(this).closest('td').find('a[data-id]'),
                                select2_values = [_thisCtrl.attr('data-region-id'), _thisCtrl.attr('data-dest-id')],

                             dta = JSON.stringify({
                                 fnName: select2Defaults.funName,
                                 pageNum: page,
                                 pageSize: select2Defaults.pageSize,
                                 searchTerm: term,

                                 // additional parameters as string separated by (~) char.
                                 names: select2Defaults._names.join('~'),
                                 values: select2_values.join('~')
                             });

                            return dta;
                        },

                        // result format
                        results: function (data, page) {
                            var results = getSelect2ResultFormat(data, page);
                            return results;
                        }
                    },
                },
                value: $(this).data('currentVal'),
                validate: function (value) {
                    if ($.trim(value) === '') {
                        return 'مطلوب.';
                    }
                },
                url: function (params) {

                    // prepare editing parameters
                    params.table = $(this).data('table');
                    params.id = $(this).data('id');


                    // apply in-line exiting
                    return dataService.inlineAjax(params, function () {
                        commonManger.showMessage('تم الحفظ:', 'تم توزيع السيارة على الشاحن بنجاح');
                        pageManager.updateShippersGrid();
                    },
                    function () {
                        commonManger.showMessage('خطأ:', 'لقد حدث خطأ فى تنفيذ الإجراء.');
                    });
                }
            });
        };

        return {
            Init: init,
            carBindingShippersInGrid: setBindingCarShippers
        }

    }();

select2Manager.Init();