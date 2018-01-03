<%@ Page Title=" شركة العراق - عمولة الشركة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    ViewStateMode="Disabled" EnableViewState="false" AutoEventWireup="true" CodeFile="Commissions.aspx.cs"
    Inherits="MinutesuaeCommissions" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">عمولة الشركة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة عمولة الشركة
            </h1>
        </div>
        <div class="row-fluid">
            <div class="row-fluid">
                <div class="table-header">
                    عرض عمولة الشركة <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                        aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                        <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th>م</th>
                            <th>جهة الوصول
                            </th>
                            <th>العمولة نقداً
                            </th>
                            <th>عمولة آجل
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
                                <input type="hidden" id="CommissionID" value="0" />
                                <div class="control-group">
                                    <label class="control-label" for="DistinationID">
                                        جهة الوصول:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div class="span12">
                                            <asp:DropDownList runat="server" ID="DistinationID" ClientIDMode="Static" CssClass="required">
                                            </asp:DropDownList>
                                            <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                                Display="Dynamic" InitialValue="" runat="server" ControlToValidate="DistinationID"
                                                ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="CommissionCash">
                                        العمولة نقداً:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <div class="span12">
                                            <asp:TextBox runat="server" ID="CommissionCash" Text="0" ClientIDMode="Static" CssClass="required" />
                                            <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                                Display="Dynamic" runat="server" ControlToValidate="CommissionCash" ValidationGroup="s"
                                                ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="CommissionCredit">
                                        العمولة آجل:<span title='حقل إجبارى' class="text-error">*</span></label>
                                    <div class="controls">
                                        <asp:TextBox runat="server" ID="CommissionCredit" Text="0" ClientIDMode="Static" CssClass="required" />
                                        <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVasslsidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="CommissionCredit" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
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
    <script type="text/javascript" src="/Scripts/App/CommissionsManager.min.js?v=1.1"></script>
</asp:Content>
