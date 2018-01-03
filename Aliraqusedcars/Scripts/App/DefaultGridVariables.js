// set default variables.
var TitlePage = "",
modalDialog = "addModal",
formName = "addForm", // master form and defalut
detailsForm = "detailsForm",
gridId = 'itemsDataTable',
//gridId = 'itemsDataTableDetails',
//gridId = 'itemsDataTableDetails',
mainServiceUrl = "/api/general.aspx/",
sUrl = "/api/data.aspx/",
deleteModalDialog = 'deleteModal',
tableName = "", // grid or master tabel
tableDetails = "", // details form table
pKey = "", // prim key for master
pKeyDetails = "", // prim key for details
gridColumns = [], // master grid columns
gridColumnsDetails = [], // details grid columns
hijriDates = [],
hidienDates = [],// grid columns
FormulaFields = [],
FormulaValues = [],
controlSearch = "",
controlSearchResult = "",
funNameSearch = "",
idUpdatevalue = "",
procedureName = "";
monthNames = ['المحرّم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الاول', 'جمادى الآخر', 'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'],
flagReport_Properites = 0,
flagReportandLook = 0;
// default language for grid
$.extend(true, $.fn.dataTable.defaults, {
    "language": { "url": "/Scripts/datatable/Arabic.min.js" },
    "oTableTools": { "aButtons": ["copy", "xls", "print"] },
    "sDom": "<'row-fluid'<'span6'l><'span6 lft-pane'Tf>r>t<'row-fluid'<'span6'i><'span6'p>>"
});
