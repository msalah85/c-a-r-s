<%@ Page Title="ادارة إدارة سداد السلف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="AdvanceRepays.aspx.cs" Inherits="admin_admin_2015_hr_AdvanceRepays" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="hr/Default.aspx">شئون العاملين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">إدارة سداد السلف</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة سداد السلف : <small class="username"></small>&nbsp; ورصيد السلف: <span class="balance text-warning currency">0</span> <sub>درهم</sub>
            </h1>
        </div>
        <!--/.page-header-->
        <div class="row-fluid">
            <div class="table-header">
                عرض سداد السلف :
                <span class="username"></span>&nbsp; ورصيد السلف: <span class="balance currency">0</span> <sub>درهم</sub>
                <a class="addition btn btn-mini btn-yellow pull-left" title="السلف - القروض" data-toggle="tooltip" href="hr/Advances.aspx?id=0">+ السلف/القروض</a>
                <a data-toggle="tooltip" title="+ سداد سلفة" href="ReceiptVoucherAdd.aspx"
                    class="pull-left icon-animated-vertical btn-add hidden">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>التاريخ
                        </th>
                        <th>طريقة الدفع
                        </th>
                        <th>المبلغ <sub>درهم</sub>
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
                                <label class="control-label" for="AdvanceTypeID">السداد من</label>
                                <div class="controls">
                                    <div class="span12">
                                        <select id="AdvanceTypeID" class="required form-control span12">
                                            <option value="1">موظف</option>
                                            <option value="2">جهة خارجية</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="UserID">
                                    اسم المقترض</label>
                                <div class="controls">
                                    <div class="span12">
                                        <select id="UserID" class="required form-control span12">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="RepayAmount" title="رصيد السلف" id="lblRepayAmount">
                                    المبلغ:<span title='حقل إجبارى' class="text-error">!*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="number" data-toggle="tooltip" title="رصيد السلف" id="RepayAmount" class="span12 required" required />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="CheckNo">رقم سند القبض</label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="CheckNo" class="required form-control span12" />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Revised">
                                    المراجعة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="checkbox" id="Revised" class="ace-checkbox-2" />
                                        <label class="lbl" for="Revised">
                                            نعم! تمت المراجعة - وسداد المبلغ من رصيد المقترض.</label>
                                        <em class="red">تنبيه: إجراء (نعم) سوف يمنعك من تعديل أو حذف قيمة السداد.</em>
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
                    <button class="btn btn-small btn-danger pull-right btn-delete pull-left">
                        <i class="icon-trash"></i>
                        تأكيد الحذف
                    </button>
                </div>
            </div>
            <!-- delete modal-->
        </div>
    </div>
    <script src="/Scripts/hr/gridManager.min.js?v=1.4"></script>
    <script src="/Scripts/hr/advance-repays.min.js?v=1.3"></script>
</asp:Content>

