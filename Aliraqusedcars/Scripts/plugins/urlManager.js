var urlManager = function () {
    var getUrlVars = function () {
        var vars = [], hash;
        var url = persianJs(window.location.href).fixURL().toString();
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getTextFromHTML = function (input) {
        return $(input).text();
    },
    getSelectedURLSegment = function (index) {
        var url = persianJs(window.location.href).fixURL().toString();
        var segments = url.split('/');
        return segments[index];
    };
    return {
        getUrlVars: getUrlVars,
        getTextFromHTML: getTextFromHTML,
        getSelectedURLSegment: getSelectedURLSegment
    };
}();