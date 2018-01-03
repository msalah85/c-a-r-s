// check user logged on.
var checkLoginSuccess = function (name) {
    if (name.d) { name = name.d.Name; }
    if (name) {
        var $lgnLonk = $('#clientsLogin');
        $lgnLonk.attr('data-toggle', 'dropdown').attr('href', 'avascript:void(0);').addClass('logged-in-width');
        $lgnLonk.removeAttr('data-target');
        $lgnLonk.html('<i class="fa fa-user fa-3x margin-buttom-5"></i><br><i class="fa fa-caret-down"></i> مرحباً: ' + name);
    }
},
checkLogin = function () {
    var url = sURL + "checklogin";
    dataService.callAjax('Post', {}, url, checkLoginSuccess, errorException);
};
//checkLogin();

function logEvent(event) {
    checkLogin();
}

window.applicationCache.addEventListener('checking', logEvent, false);
//window.applicationCache.addEventListener('noupdate', logEvent, false);