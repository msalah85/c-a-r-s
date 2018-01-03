<%@ Page Title="جهات السلف الخارجية" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="AdvanceOutsideMemebers.aspx.cs" Inherits="admin_admin_2015_AdvanceOutsideMemebers" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/hr/gridManager.min.js?v=1.7"></script>
    <script src="/Scripts/hr/advance-outsides.min.js?v=1.9"></script>
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">جهات السلف الخارجية</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>جهات السلف الخارجية<small class="username"></small>
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                جهات السلف الخارجية
                <span class="username"></span>
                <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد سلفة للموظف" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="70">الكود
                        </th>
                        <th>الاسم
                        </th>
                        <th>الهاتف
                        </th>
                        <th>رصيد القروض <sub>درهم</sub></th>
                        <th width="40" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><span class="pull-left">الاجمالى:</span></td>
                        <td class="loans-total bolder"></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <!-- add/edit modal -->
            <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-edit"></i>اضافة/تعديل
                    </h3>
                </div>
                <div class="modal-body">
                    <form id="aspnetForm">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="ID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Name">
                                    الاسم:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="Name" class="span12 required" required />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Phone">
                                    الهاتف:</label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="Phone" class="span12" />
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
    </div><script>DefaultGridManager.fillItemsDataTable(undefined, footerTotal);DefaultGridManager.Init();</script>
</asp:Content>