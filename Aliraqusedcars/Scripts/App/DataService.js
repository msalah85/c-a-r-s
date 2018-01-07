
/// <reference path="../vendor/jquery-1.9.1.min.js" />
var dataService = dataService || {},
    dataService = function () {
        var
            callAjax = function (reqestType, postedData, url, successCallback, errorCallback) {
                jqueryAjax(reqestType, postedData, url, successCallback, errorCallback);
            },
            jqueryAjax = function (reqestType, postedData, url, successCallback, errorCallback) {
                $.ajax({
                    type: reqestType,
                    data: postedData,
                    processData: false,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    url: url,
                    success: function (data) {
                        successCallback(data);
                    },
                    beforeSend: function (xhr, settings) {
                        // xhr.setRequestHeader("Content-Encoding", "gzip");
                        $(".sinpper").html("<i class='icon-spinner icon-spin orange bigger-125 fa fa-spinner'></i>");
                        $('div[id$=UpdateProgress1]').css('display', 'block');

                        // adding csrf-token to Ajax requests
                        function getCookie(name) {
                            var cookieValue = null;
                            if (document.cookie && document.cookie != '') {
                                var cookies = document.cookie.split(';');
                                for (var i = 0; i < cookies.length; i++) {
                                    var cookie = jQuery.trim(cookies[i]);
                                    // Does this cookie string begin with the name we want?
                                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                        break;
                                    }
                                }
                            }
                            return cookieValue;
                        }
                        //if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                        //    // Only send the token to relative URLs i.e. locally.
                        //    xhr.setRequestHeader("X-CSRFToken", getCookie('__smToken'));
                        //} // end csrf
                    },
                    complete: function () {
                        $(".sinpper").html(""); $('div[id$=UpdateProgress1]').css('display', 'none');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    }
                });
            },
            inlineAjax = function (postedData, successCallback, errorCallback) {
                return $.ajax({
                    type: 'POST',
                    url: sUrl + 'InlineEdit',
                    data: JSON.stringify(postedData),
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    async: true,
                    cache: false,
                    timeout: 10000,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Content-Encoding", "gzip");
                        $(".sinpper").html("<i class='icon-spinner icon-spin orange bigger-125'></i>"); $('div[id$=UpdateProgress1]').css('display', 'block');
                    },
                    complete: function () {
                        $(".sinpper").html(""); $('div[id$=UpdateProgress1]').css('display', 'none');
                    },
                    success: function (data) {
                        successCallback(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        errorCallback(jqXHR, textStatus, errorThrown);
                    }
                });
            };
        return {
            callAjax: callAjax,
            inlineAjax: inlineAjax
        };
    }();


