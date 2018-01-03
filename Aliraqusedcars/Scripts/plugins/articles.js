var errorException = function (jqXhr, textStatus, errorThrown) {
    title = textStatus + ": " + errorThrown;
    message = JSON.parse(jqXhr.responseText).Message;
    console.log(title + ': ' + message);
},
showPageData = function (data) {
    var dt = LZString.decompressFromUTF16(data.d),
        xmlDoc = $.parseXML(dt), xml = $(xmlDoc).find("list");
    if (xml.length > 0) {
        $('#page-header,.page-title').html($(xml).find('ArticleTitle').text());
        $('#page-brief').html($(xml).find('BriefDesc').text());
        $('#page-content').html($(xml).find('Details').text());
    }
},
mainServiceURL = '/api/data.aspx/',
getpageData = function (value) {
    var url = mainServiceURL + "GetData", dto = JSON.stringify({ "actionName": "Articles_Details", "value": value });
    dataService.callAjax('Post', dto, url, showPageData, errorException);
}, // page initialization
loadPage = function () {
    var vl = urlManager.getSelectedURLSegment(4); //the latest segment.
    if (vl !== undefined)
        getpageData(vl);
}; // fire loading data.