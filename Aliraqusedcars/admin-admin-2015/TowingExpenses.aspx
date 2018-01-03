<%@ Page Title=" مصروف العراق - مصروفات Towing" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="TowingExpenses.aspx.cs" Inherits="TowingExpenses" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .chosen-container {
            width: 340px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">مصروفات Towing</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة مصروفات Towing
            </h1>
        </div>
        <div class="row-fluid">
            <div class="row-fluid">
                <div class="table-header">
                    عرض مصروفات Towing <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                        aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                        <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th width="30px">م
                            </th>
                            <th>الشاحن
                            </th>
                            <th>المدينة
                            </th>
                            <th>قيمة المصروف/سيارة
                            </th>
                            <th width="10%" class="hidden-print">خيارات
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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
                        <form runat="server" id="aspnetForm" clientidmode="Static">
                            <asp:ScriptManager ID="ScriptManager1" runat="server" />
                            <fieldset id="formMain" class="form-horizontal">
                                <div class="control-group">
                                    <label>
                                    </label>
                                    <div class="controls">
                                        <input type="hidden" value="0" id="TowingExpenseID" />
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="ShipCompanyID">
                                        الشاحن:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div class="span12">
                                            <asp:DropDownList runat="server" ID="ShipCompanyID" ClientIDMode="Static" CssClass="span12 chzn-select chosen-rtl required">
                                            </asp:DropDownList>
                                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                                Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ShipCompanyID"
                                                ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="RegionID">
                                        المدينة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div class="span12">
                                            <asp:DropDownList runat="server" ID="RegionID" ClientIDMode="Static" CssClass="span12 chzn-select chosen-rtl required">
                                            </asp:DropDownList>
                                            &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                                Display="Dynamic" InitialValue="" runat="server" ControlToValidate="RegionID"
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
            </div>
        </div>
    </div>
    <script src="/Scripts/App/TowingExpensesManager.min.js?v=1.1"></script>
</asp:Content>
