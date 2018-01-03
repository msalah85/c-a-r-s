<%@ Page Title="عرض الرواتب الشهرية" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="salaries.aspx.cs"
    Inherits="admin_admin_2015_hr_salaries" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/hr/gridManager.min.js?v=1.4"></script>
    <script src="/Scripts/hr/salaries-view.js?v=1.8"></script>
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="hr/Default.aspx">شئون العاملين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">الرواتب الموظفين</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة الرواتب الموظفين <small class="username"></small>
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض الرواتب الموظفين 
                <a data-toggle="tooltip" href="hr/salaryadd.aspx" id="btnAdd" title="اضافة جديد" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>التاريخ</th>
                        <th>عن شهر</th>
                        <th>رقم سند الصرف</th>
                        <th>مبلغ الرواتب <sub>درهم</sub></th>
                        <th>تمت المراجعة</th>
                        <th width="50" class="hidden-print">طباعة</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="deleteModal" class="modal hide fade" tabindex="-1">
            <div class="modal-header no-padding">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 id="removeModalLabel">
                    <i class="icon-remove"></i>حذف البيان
                </h3>
            </div>
            <div class="modal-body">
                <fieldset class="form-horizontal" id="removeForm">
                    <div class="alert alert-warning">
                        <label>هل أنت متأكد من حذف البيان  (  #<strong class="removeField"></strong>  ) الذي تم اختياره؟</label>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-danger btn-delete">
                    <i class="icon-trash"></i>
                    تأكيد الحذف
                </button>
                <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
    </div>
    <script>
        DefaultGridManager.fillItemsDataTable(undefined);
        DefaultGridManager.Init();
    </script>
</asp:Content>
