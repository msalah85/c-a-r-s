<!DOCTYPE html>
<html xmlns=http://www.w3.org/1999/xhtml>
<head runat=server>
<meta charset=utf-8 />
<title>طباعة Label السيارة</title>
<style>body{width:8.5in;font:16px/1.5 tahoma,serif}.label{width:3.25in;height:1.5in;padding:.1in;float:left;text-align:right;overflow:hidden;outline:1px dotted #c2c2c2}table{border:1px solid #c2c2c2;border-collapse:collapse}table td{padding:3px}table tr{height:35px}.page-break{clear:left;display:block;page-break-after:always}.bolder{font-weight:700;font-family:Arial;background-color:#eee;text-align:left;font-size:17px}input{width:100%;height:100%;border:0}input:hover,input:focus{background-color:#EF8}</style>
<script src=/App_Themes/iraq/js/app.min.js?v=1.0></script>
<script type=text/javascript>var id = commonManger.getQueryStrs().id, functionName = "CarsData_SelectOne", DTO = { actionName: functionName, value: id ? id : 0 }; dataService.callAjax("Post", JSON.stringify(DTO), sUrl + "GetData", function (b) { var d = $.parseXML(b.d), c = $.xml2json(d).list; c && ($("#model").val(c.MakerNameEn + " - " + c.TypeNameEn + " - " + c.Year), $("#color").text(c.ColorNameAr), $("#chassis").text(c.ChassisNo)) }, commonManger.errorException);</script>
</head>
<body title="للطباعة اضغط CTL + P">
<div class=label>
<table style=width:100% border=1 dir=rtl>
<tr>
<td class=bolder width=26%>نوع السيارة</td>
<td>
<input type=text id=model /></td>
</tr>
<tr>
<td class=bolder>اللون</td>
<td id=color></td>
</tr>
<tr>
<td class=bolder>الشاصي</td>
<td id=chassis></td>
</tr>
<tr>
<td class=bolder>المصدر</td>
<td><input type=text value="شركة العراق - 00971506751025" /></td>
</tr>
</table>
</div>
<div class=page-break></div>
</body>
</html>
