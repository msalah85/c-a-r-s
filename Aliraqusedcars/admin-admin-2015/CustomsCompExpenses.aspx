<%@ Page Title=" مصروف العراق - مصروفات التخليص الجمركى" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CustomsCompExpenses.aspx.cs" Inherits="CustomsCompExpenses" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left">
            </i></span></li>
            <li class="active">مصروفات التخليص الجمركى</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>
                إدارة مصروفات التخليص الجمركى
            </h1>
        </div>
        <div class="row-fluid">
            <div class="row-fluid">
                <div class="table-header">
                    عرض مصروفات التخليص الجمركى <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                        aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                        <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="30px">
                                م
                            </th>
                            <th>
                                شركة التخليص
                            </th>
                            <th>
                                نوع الخدمة
                            </th>
                            <th>
                                جهة الوصول
                            </th>
                            <th>
                                قيمة المصروف
                            </th>
                            <th width="10%">
                                خيارات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <!-- Edit Template -->
                <div id="ShipExpenseModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="editModalLabel">
                            <i class="icon-edit"></i>
                        </h3>
                    </div>
                    <div class="modal-body">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="control-group">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="CustomsExpenseID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="DistinationID">
                                    جهة الوصول:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:DropDownList runat="server" ID="DistinationID" ClientIDMode="Static" CssClass="span12 required">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="DistinationID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="CustomsCompanyID">
                                    شركة التخليص:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:DropDownList runat="server" ID="CustomsCompanyID" ClientIDMode="Static" CssClass="span12 required">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="CustomsCompanyID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpenseTypeID">
                                    نوع الخدمة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:DropDownList runat="server" ID="ExpenseTypeID" ClientIDMode="Static" CssClass="span12 required">
                                        </asp:DropDownList>
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ExpenseTypeID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpensesCharge">
                                    قيمة المصروف:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:TextBox runat="server" ID="ExpensesCharge" Text="0" ClientIDMode="Static" CssClass="span12 required" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVasslidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="ExpensesCharge" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
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
            </div>
        </div>
    </div>
    <script src="/Scripts/App/CustomsExpensesManager.min.js?v=1.1"></script>
</asp:Content>
