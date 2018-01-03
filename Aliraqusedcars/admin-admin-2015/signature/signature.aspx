<%@ Page Language="C#" AutoEventWireup="true" CodeFile="signature.aspx.cs" Inherits="admin_admin_2015_signature_signature" EnableSessionState="ReadOnly" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" dir="rtl">
<head runat="server">
    <meta charset='UTF-8' />
    <title>إيصال إستلام سيارة</title>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css" />
    <link rel='stylesheet' href='css/style.min.css?v=1.2' />
    <link rel='stylesheet' href='css/print.min.css?v=1.2' media="print" />
    <link href="/App_Themes/iraq/css/jquery-ui.1.10.3.css?v=1.0" rel="stylesheet" />
    <link href="css/jquery.signature.min.css?v=1.0" rel="stylesheet" />
    <link href="/App_Themes/iraq/jquery.gritter.min.css?v=1.0" rel="stylesheet" />
    <script src="/Scripts/jquery-1.10.2.min.js?v=1.0"></script>
    <script src="/Scripts/jquery-ui.js?v=1.0"></script>
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <script src="/Scripts/jquery.ui.touch-punch.min.js?v=1.0"></script>
    <script src="js/jquery.signature.min.js?v=1.0"></script>
</head>
<body>
    <div id="page-wrap">
        <table class="logo-table">
            <tr>
                <td><a href="../home.aspx" title="الرئيسية">
                    <img alt="logo" class="logo" src="/Content/images/print/print-header.png" /></a>
                    <input type="hidden" id="SaleInvoiceID" value="0" />
                    <select id="CarPaperTypeID">
                        <option value="1">التسجيل بالإمارات</option>
                        <option value="2">أوراق تصدير للخليج</option>
                        <option value="3">تصدير مع إعادة تأمينات جمركية</option>
                        <option value="4">استلام VCC</option>
                    </select>
                    <a class="delete paper pull-left">أوراق السيارة ></a>
                </td>
            </tr>
        </table>
        <div class="wrap-padding">
            <textarea id="header">إيصال إستلام أوراق السيارة</textarea>
            <div style="clear: both"></div>
            <div id="customer">
                <table id="meta">
                    <tr>
                        <td width="150px" class="meta-head">رقم السيارة</td>
                        <td>
                            <input type="hidden" id="SigID" value="0" />
                            <input type="hidden" id="SigTypeID" value="0" />
                            <div id="cid"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="meta-head">نوع السيارة</td>
                        <td>
                            <div id="model"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="meta-head">الشاصي</td>
                        <td>
                            <div id="chassis"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="meta-head">اللوت</td>
                        <td>
                            <div id="lotno"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="meta-head">اللون</td>
                        <td>
                            <div id="color"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="meta-head">العميل</td>
                        <td>
                            <div class="client"></div>
                        </td>
                    </tr>
                </table>
                <table class="reexport-table hidden-print">
                    <thead>
                        <tr>
                            <th colspan="2">
                                <label>
                                    <input type="checkbox" id="Active" />
                                    إعادة تصدير السيارة للعراق</label>
                            </th>
                        </tr>
                    </thead>
                    <tr>
                        <td>رقم البيان الجمركي</td>
                        <td>
                            <input type="text" id="CustomsNo" name="CustomsNo" disabled />
                        </td>
                    </tr>
                    <tr>
                        <td>تاريخ البيان الجمركي</td>
                        <td>
                            <input type="text" id="CustomsDate" name="CustomsDate" disabled /></td>
                    </tr>
                </table>
            </div>
            <table id="items">
                <tr class="item-row">
                    <td class="description" colspan="2">
                        <textarea id="contr-desc">أقر أنا الموقع ادناه بأنى استلمت البطاقة الجمركية مع الرخصه التجارية للسيارة المدرجة أوصافها أعلاه من شركة العراق لتجارة السيارات المستعملة بعقد بيع رقم/000  بتاريخ: __/__/____ 
ولأجله وقعت.</textarea>
                    </td>
                </tr>
                <tr class="shipper hidden">
                    <td>الشاحن:
                        <textarea id="Shipper" placeholder="اسم الشاحن" rows="1" cols="30"></textarea>
                        </td><td>
                        بتأمينات:
                        <textarea id="InsuranceAmount" placeholder="0.00" rows="1" cols="10"></textarea>
                        درهم
                    </td>
                </tr>
                <tr class="space">
                    <td colspan="2"></td>
                </tr>
                <tr class="item-row">
                    <td colspan="2">
                        <div class="pull-left">المستلم/&nbsp;<textarea id="Recipient" class="client" rows="1" cols="30"></textarea></div>
                        تاريخ التوقيع: <span class="today"></span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <div class="widget-box" id="client-signature" title="توقيع العميل">
                            <div id="sig" title="توقيع العميل"></div>
                        </div>
                        <div class="delete-wpr">
                            <div class="btn-group">
                                <a id="fullcs" class="delete" href="javascript:;" title="تكبير/تصغير التوقيع">+/-</a>
                                <a id="clear" class="delete" href="javascript:;">إعادة التوقيع</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div id="terms">
                <img alt="footer" class="footer" src="/Content/images/print/print-footer.png" />
            </div>
            <div>
                <a id="svg" class="delete" href="javascript:void(0);">حفظ التوقيع</a>
                <a class="delete vcc pull-left">VCC</a>
                <a class="delete paper pull-left">أوراق السيارة</a>
                <a class="delete" href="javascript:window.print();">طباعة</a>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/DataService.min.js?v=1.0"></script>
    <script src="/Scripts/jquery.xml2json.min.js?v=1.0"></script>
    <script src="/Scripts/jquery.gritter.min.js?v=1.0"></script>
    <script src="/Scripts/lz-string/lz-string.min.js?v=1.0"></script>
    <script src="/Scripts/App/Common.min.js?v=1.0"></script>
    <script src="/Scripts/numeral.min.js?v=1.0"></script>
    <script src="js/canvg.min.js?v=1.0"></script>
    <script src='js/data.min.js?v=2.2'></script>
</body>
</html>