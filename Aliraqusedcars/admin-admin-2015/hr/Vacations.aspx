<%@ Page Title="ادارة أجازات الموظف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Vacations.aspx.cs" Inherits="admin_admin_2015_hr_Vacations" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="hr/Default.aspx">شئون العاملين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أجازات الموظف</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة أجازات الموظف <small class="username orange"></small>
            </h1>
        </div>
        <!--/.page-header-->
        <div class="row-fluid">
            <div class="table-header">
                عرض أجازات الموظف 
                <span class="username"></span>
                <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>التاريخ من
                        </th>
                        <th>التاريخ إلى
                        </th>
                        <th>ملاحظات
                        </th>
                        <th width="10%" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
            </table>
            <!-- add/edit modal -->
            <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body">
                    <form role="form" id="aspnetForm">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="ID" />
                                    <input type="hidden" value="0" id="UserID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="UserName">
                                    الموظف</label>
                                <div class="controls">
                                    <div class="span12">
                                        <p class="username"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="StartDate">
                                    التاريخ من:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="StartDate" placeholder="dd/mm/yyyy" date-current-format="YYYY/M/D" date-to-format="DD/MM/YYYY" data-date-format="dd/mm/yyyy" class="date-picker span12 required" required />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="EndDate">
                                    التاريخ إلى:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="EndDate" placeholder="dd/mm/yyyy" date-current-format="YYYY/M/D" date-to-format="DD/MM/YYYY" data-date-format="dd/mm/yyyy" class="date-picker span12 required" required />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="EndDate">
                                    بيان:</label>
                                <div class="controls">
                                    <div class="span12">
                                        <textarea cols="4" rows="4" id="Notes" class="span12"></textarea>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer">
                    <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                        إجبارية. </span><span class="sinpper"></span>
                    <button class="btn btn-success" aria-hidden="true">
                        حفظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <!-- end add/edit modal -->
            <!-- delete modal-->
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
                    <button class="btn btn-small btn-danger pull-right btn-delete">
                        <i class="icon-trash"></i>
                        تأكيد الحذف
                    </button>
                </div>
            </div>
            <!-- delete modal-->
        </div>
    </div>
    <script src="/Scripts/hr/gridManager.min.js?v=1.1"></script>
    <script src="/Scripts/hr/Vacations.min.js?v=1.5"></script>
</asp:Content>