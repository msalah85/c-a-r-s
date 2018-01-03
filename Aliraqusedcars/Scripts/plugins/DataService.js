/// <reference path="../vendor/jquery-1.9.1.min.js" />

var dataService = function () {
    var
        callAjax = function (reqestType, postedData, url, successCallback, errorCallback) {
            jqueryAjax(reqestType, postedData, url, successCallback, errorCallback);
        },
        jqueryAjax = function (reqestType, postedData, url, successCallback, errorCallback) {
            $.ajax({
                type: reqestType,
                data: postedData,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                url: url,
                success: function (data) {
                    successCallback(data);
                },
                beforeSend: function () {
                    $(".sinpper").html("<i class='icon-spinner icon-spin orange bigger-125'></i>");
                    $('div[id$=UpdateProgress1]').css('display', 'block');
                },
                complete: function () {
                    $(".sinpper").html(""); $('div[id$=UpdateProgress1]').css('display', 'none');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    errorCallback(jqXHR, textStatus, errorThrown);
                }
            });
        };
    return {
        callAjax: callAjax
    };
}();


