<%@ Page Title="ورق سيارات للتصدير" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/ReexportCarsNorPaperList.min.js?v=1.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ReExportCarsList.aspx">استرجاع تأمينات جمركية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">استلام ورق سيارات إعادة تصدير</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>عرض/استلام ورق سيارات للتصدير 
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض/استلام سيارات إعادة تصدير
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>رقم السيارة</th>
                        <th>نوع السيارة
                        </th>
                        <th>الشاحن
                        </th>
                        <th>العميل
                        </th>
                        <th>تاريخ البيان الجمركي
                        </th>
                        <th width="30px" title="استلام ورق السيارة من العميل">استلام</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script>pageManager.Init();</script>
</asp:Content>
