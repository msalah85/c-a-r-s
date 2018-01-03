var
sURL = '/api/data.aspx/',
isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
},
getNumbersFromString = function (input) {
    if (isNumeric(input)) {
        return input;
    }
    else if (input !== undefined && input !== null && input.length > 0)
        return parseFloat(input.replace(/[^\d.]/g, ''));
    else
        return 0;
},
formatJSONDate = function (jsonDate) {
    if (jsonDate == null)
        return '';
    var newDate = new Date(parseInt(jsonDate.substr(6))); //dateFormat(jsonDate, "dd/MM/yyyy");
    var dat = newDate.getMonth() + 1 + "/" + newDate.getDate() + "/" + newDate.getFullYear();
    return dat;
},
errorException = function (jqXhr, textStatus, errorThrown) {
    title = textStatus + ": " + errorThrown;
    message = JSON.parse(jqXhr.responseText).Message;
    console.log(title + ': ' + message);
},
validateForm = function (formId) {
    var form = $('#' + formId); form.validate();
    return form.valid();
},
returnFieldsNames = function (targetForm) {
    var iDs = [];
    $("#" + targetForm).find('input,select,textarea')
        .each(function () {
            if ($(this).attr('id')) {
                if (!$(this).hasClass("notneed")) {
                    if (!$(this).hasClass("notshow")) {
                        iDs.push($(this).attr('id'));
                    }
                    else { iDs.push('hide' + $(this).attr('id')); }
                }
            }
        });
    return iDs;
},
returnFieldsValues = function (targetForm) {
    var values = [];
    var iDs = [];
    $("#" + targetForm).find('input,select,textarea')
        .each(function () {
            if ($(this).attr('id')) {
                if (!$(this).hasClass("notneed")) {
                    var cId = $(this).attr('id'), cType = $(this).prop('type'), cVal = $(this).val();
                    if (cType !== undefined || cType != '') {
                        if (cType == "text" || cType == "hidden" || cType == "number" || cType == "email" || cType == "date" || cType == "textarea" || cType == 'tel' || cType == 'password') {
                            values.push(cVal);
                            iDs.push(cId);
                        }
                        else if (cType == "select-one") {
                            values.push($(this).find('option:selected').val());
                            iDs.push(cId);
                        }
                        else if (cType == "checkbox") {
                            $(this).prop('checked', function (i, value) {
                                values.push(value);
                            });
                            iDs.push(cId);
                        }
                        //else if ($(this).is("label")) {
                        //    iDs.push(cVal);
                        //    values.push($(this).text());
                        //}
                    }
                }
            }

        });
    var all = [iDs, values];
    return all;
},
getFieldsValues = function (targetForm) {
    var values = [], iDs = [];
    $("#" + targetForm).find('input,select,textarea')
        .each(function () {
            if ($(this).attr('name')) {
                if (!$(this).hasClass("notneed")) {
                    var cId = $(this).attr('name'), cType = $(this).prop('type'), cVal = $(this).val();
                    if (cType !== undefined || cType != '') {
                        if (cType == "text" || cType == "hidden" || cType == "number" || cType == "email" || cType == "date" || cType == "textarea" || cType == 'tel' || cType == 'password') {
                            values.push(cVal);
                            iDs.push(cId);
                        }
                        else if (cType == "select-one") {
                            values.push($(this).find('option:selected').val());
                            iDs.push(cId);
                        }
                        else if (cType == "checkbox") {
                            $(this).prop('checked', function (i, value) {
                                values.push(value);
                            });
                            iDs.push(cId);
                        }
                        else if (cType == "radio") {
                            values.push($(this).val());
                            iDs.push(cId);
                        }
                        //else if ($(this).is("label")) {
                        //    iDs.push(cVal);
                        //    values.push($(this).text());
                        //}
                    }
                }
            }
        });
    var all = [iDs, values];
    return all;
},
searchDataTables = function (oTable) {
    var searchWait = 0, searchWaitInterval;
    $('.dataTables_filter input')
    .unbind('keypress keyup')
    .bind('keypress keyup', function (e) {
        var item = $(this);
        searchWait = 0;
        if (!searchWaitInterval) searchWaitInterval = setInterval(function () {
            if (searchWait >= 3) {
                clearInterval(searchWaitInterval);
                searchWaitInterval = '';
                var searchTerm = $(item).val();
                oTable.fnFilter(searchTerm);
                searchWait = 0;
            }
            searchWait++;
        }, 200);
    });
},
showMessageAlert = function (type, title, message) {
    type = (type == undefined || type == '') ? 'warning' : type;
    $('.myMessage').html('<div class="alert alert-' + type + ' fade in"><a class="close" data-dismiss="alert" href="#">×</a> <strong>' + title + '</strong>: ' + message + '</div>');
},
getQueryStrs = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
},
getHashQueryStrs = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
},
getStringFromHTML = function (input) {
    return $(input).text();
},
getTextFromHTML = function (input) {
    return $(input).text();
},
//IsNumeric = function (input) {
//    return (input - 0) == input && input.length > 0;
//},
addition = function () {
    var sumNum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        var value = arguments[i];
        value = value == null || value == undefined ? 0 : value;
        value = getTextFromHTML(arguments[i]);
        value = getNumbersFromString(arguments[i]);
        //if (isNumeric(value)) {
        sumNum += parseFloat(value);
        //}
    }
    return sumNum;
},
enableControl = function (ctrl, isEnabled) {
    if (isEnabled)
        ctrl.removeAttr("disabled");
    else
        ctrl.prop("disabled", isEnabled);
};