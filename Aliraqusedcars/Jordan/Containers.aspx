<%@ Page Title="الحاويات إلى الأردن" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Containers.aspx.cs" Inherits="Jordan_Containers" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container-padding" id="page-contents">
        <div class="sub-menu">
            <ol class="breadcrumb">
                <li><a href="home">الرئيسية</a></li>
                <li><a href="Clients">العملاء</a></li>
                <li><a href="Cars">السيارات</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h1 class="page-header">قائمة الحاويات إلى الأردن</h1>
            </div>            
            <div class="col-sm-12">
                <table id="listItems" class="table table-bordered containers-list" width="100%">
                    <thead>
                        <tr>
                            <th>الشاحن</th>
                            <th>السيارة</th>
                            <th>العميل</th>
                            <th>رقم اللوت</th>
                            <th>بلد الوصول</th>
                            <th>تاريخ الوصول</th>
                            <th>رقـم الحـاويـة</th>
                            <th>BOL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="100%">جاري تحميل البيانات...</td>
                        </tr>
                    </tbody>
                </table>
                <div class="alert alert-block alert-info">
                    <strong>عدد الحاويات:</strong>
                    <span data-rel="tooltip" title="عدد الحاويات بالصفحة" class="containersNum"></span>
                    /
                <span data-rel="tooltip" title="إجمالى عدد الحاويات" class="allContainersCount"></span>
                </div>
                <div class="clearfix">&nbsp;</div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentScripts" runat="Server">
    <script src="/Scripts/DataTables/media/js/dataTables.rowsGroup.min.js?v=1.6"></script>
    <script src="/Scripts/jordan/containers.js?v=0.1"></script>
</asp:Content>