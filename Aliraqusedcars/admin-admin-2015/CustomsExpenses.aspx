<%@ Page Title="إدارة مصروفات التخليص" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="CustomsExpenses.aspx.cs" Inherits="CustomsExpenses" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .empty-cell {background: #eee;}
    </style>
    <script src="/Scripts/App/CustomExpensesManager.min.js?v=2.7"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="Home.aspx">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">مصروفات التخليص</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة مصروفات التخليص
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="ShipperSearch">اختر المخلص</label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر" id="ShipperSearch">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="expenseTypeSearch">نوع المصروف</label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-contro" id="expenseTypeSearch">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="distinationSearch">بلد الوصول</label>
                        <div class="controls">
                            <div class="span12">
                                <select class="form-control" id="distinationSearch">
                                    <option></option>
                                </select>
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض مصروفات التخليص <a data-toggle="tooltip" id="btnAddNew" title="اضافة شاحن جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>شركة التخليص
                        </th>
                        <th>نوع المصروف
                        </th>
                        <th>جهة الوصول
                        </th>
                        <th>قيمة المصروف
                        </th>
                        <th>شركة الملاحة</th>
                        <th width="60px" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- edit modal-->
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
                    <form runat="server" id="aspnetForm" class="form-horizontal" clientidmode="Static">
                        <div class="control-group">
                            <label>
                            </label>
                            <div class="controls">
                                <input type="hidden" value="0" id="ShipperExpenseID" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CustomsCompanyID">
                                الشاحن:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="CustomsCompanyID" ClientIDMode="Static" CssClass="span12 required">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="CustomsCompanyID"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ExpenseTypeID">
                                نوع المصروف:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="ExpenseTypeID" ClientIDMode="Static" CssClass="span12 required">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ExpenseTypeID"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group hide" id="divTrackingLines">
                            <label class="control-label" for="NavigationCo">
                                شركة الملاحة:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="NavigationCo" ClientIDMode="Static" CssClass="span12 required" required>
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group" id="divDistinationID">
                            <label class="control-label" for="DistinationID">
                                جهة الوصول:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="DistinationID" ClientIDMode="Static" CssClass="span12 required">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="DistinationID"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ExpenseCalcType">
                                المصروف على:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList ID="ExpenseCalcType" CssClass="radioList" runat="server" RepeatDirection="Horizontal" RepeatLayout="Flow" ClientIDMode="Static" ViewStateMode="Enabled" EnableViewState="true">
                                        <asp:ListItem Value="" Text="المصروف على"></asp:ListItem>
                                        <asp:ListItem Value="1" Text="الحاوية" />
                                        <asp:ListItem Value="2" Text="السيارة" />
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFiwweldValidator3"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ExpenseCalcType"
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
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVasslidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="ExpensesCharge" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
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
    <script>ShipperExpensesManager.Init();</script>
    <link href="/App_Themes/iraq/expense-style.min.css" rel="stylesheet" />
</asp:Content>