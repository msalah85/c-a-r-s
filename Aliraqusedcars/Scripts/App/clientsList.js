var ClientsListManager = function () {
    $.fn.afterLoadClients = function () { }
    var $clientSelect = $('#ClientID'),
        Init = function () {
            $('#ClientID_chosen .chosen-search input[type=text]').live('keyup', function (e) {
                var $val = $(this).val();
                if ($val.length > 1 && ((e.which <= 90 && e.which >= 48) || e.which === 8)) {
                    getClientsList($val);
                }
            });
            $clientSelect.live('chosen:showing_dropdown', function (e) {
                var childs = $(this).children('option').length;
                if (childs <= 1)
                    getClientsList(null);
            });
        },
        bindClientList = function (jsn, text) {
            $clientSelect.empty().append('<option value="" />').trigger('chosen:updated'); // reset
            $(jsn).each(function (i, item) {
                $clientSelect.append($('<option />').val(item.ClientID).text(item.full_name));
            }).promise().done(function () {
                $.fn.afterLoadClients();
                $clientSelect.trigger('chosen:updated');
                $('#ClientID_chosen .chosen-search input[type=text]').val(text);
            });
        },
        getClientsList = function (text) {
            var DTO = { actionName: 'Clients_SelectNames2', value: text };
            dataService.callAjax('post', JSON.stringify(DTO), sUrl + 'GetData', function (data) { var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list; bindClientList(jsn, text); }, commonManger.errorException);
        };
    return {
        Init: Init,
        Client: $clientSelect,
        SearchClientsList: getClientsList
    };
}();
ClientsListManager.Init();