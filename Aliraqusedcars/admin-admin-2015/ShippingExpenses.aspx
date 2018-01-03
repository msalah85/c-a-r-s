<%@ Page Title="إدارة مصروفات الشحن" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ShippingExpenses.aspx.cs" Inherits="ShipperExpenses" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/App_Themes/iraq/expense-style.min.css?v=1.1" rel="stylesheet" />
    <link href="/App_Themes/iraq/utilities/ShippingExpensesUtility.min.css?v=1.1" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="Home.aspx">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">مصروفات الشحن</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>مصروفات الشحن: 
                <span class="title orange"></span>
            </h1>
        </div>
        <div class="row-fluid " dir="ltr" id="expFilter">
            <div class="span8 offset2 shippingDiv">
                <div class="accordion">
                    <dl id="accord"></dl>
                </div>
            </div>
        </div>
        <div class="row-fluid hidden">
            <form class="form-horizontal">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="ShipperSearch">اختر الشاحن</label>
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
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini">
                                    <i class="icon-search"></i>
                                    بحـــث
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid hidden" id="expList">
            <a data-toggle="tooltip" id="btnAddNew" title="اضافة شاحن جديد" data-dismiss="modal"
                aria-hidden="true" class="btn btn-small icon-animated-vertical btn-success">
                <i class="icon-plus-sign"></i>
                إضافة جديد
            </a>
            <div class="table-header">
                عرض مصروفات الشحن
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>نوع المصروف
                        </th>
                        <th>شركة الملاحة</th>
                        <th>حجم الحاوية</th>
                        <th title="عدد السيارات بالحاوية" width="8%">السيارات بالحاوية</th>
                        <th>قيمة المصروف</th>
                        <th width="60px" class="hidden-print">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="hr hr-double hr-10"></div>
            <div class="span10">
                <button id="finishEdting" class="btn btn-app btn-info pull-left">
                    <i class="icon-ok-sign bigger-200"></i>
                    إنهاء</button>
            </div>
        </div>
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
                <div class="row-fluid">
                    <form runat="server" id="aspnetForm" class="form-horizontal" clientidmode="Static">
                        <div class="control-group">
                            <label>
                            </label>
                            <div class="controls">
                                <input type="hidden" value="0" id="ShipperExpenseID" />
                            </div>
                        </div>
                        <div class="control-group hidden">
                            <label class="control-label" for="ShipCompanyID">
                                الشاحن:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="ShipCompanyID" ClientIDMode="Static" CssClass="span12 noreset required">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ShipCompanyID"
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
                        <div class="control-group hide" id="divContainerSize">
                            <label class="control-label" for="ContainerSize">
                                حجم الحاوية:</label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="ContainerSize" ClientIDMode="Static" CssClass="span12 required" required>
                                        <asp:ListItem Value="40">40</asp:ListItem>
                                        <asp:ListItem Value="45">45</asp:ListItem>
                                        <asp:ListItem Value="20">20</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group hide" id="divCarsNo">
                            <label class="control-label" for="CarsNo">
                                # السيارات بالحاوية:</label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="CarsNo" ClientIDMode="Static" CssClass="span12 required" required>
                                        <asp:ListItem Value="4">4</asp:ListItem>
                                        <asp:ListItem Value="5">5</asp:ListItem>
                                        <asp:ListItem Value="3">3</asp:ListItem>
                                        <asp:ListItem Value="2">2</asp:ListItem>
                                        <asp:ListItem Value="1">1</asp:ListItem>
                                        <asp:ListItem Value="6">6</asp:ListItem>
                                        <asp:ListItem Value="7">7</asp:ListItem>
                                        <asp:ListItem Value="8">8</asp:ListItem>
                                        <asp:ListItem Value="9">9</asp:ListItem>
                                        <asp:ListItem Value="10">10</asp:ListItem>
                                        <asp:ListItem Value="11">11</asp:ListItem>
                                        <asp:ListItem Value="12">12</asp:ListItem>
                                        <asp:ListItem Value="13">13</asp:ListItem>
                                        <asp:ListItem Value="14">14</asp:ListItem>
                                        <asp:ListItem Value="15">15</asp:ListItem>
                                        <asp:ListItem Value="16">16</asp:ListItem>
                                        <asp:ListItem Value="17">17</asp:ListItem>
                                        <asp:ListItem Value="18">18</asp:ListItem>
                                        <asp:ListItem Value="19">19</asp:ListItem>
                                        <asp:ListItem Value="20">20</asp:ListItem>
                                        <asp:ListItem Value="21">21</asp:ListItem>
                                        <asp:ListItem Value="22">22</asp:ListItem>
                                        <asp:ListItem Value="23">23</asp:ListItem>
                                        <asp:ListItem Value="24">24</asp:ListItem>
                                        <asp:ListItem Value="25">25</asp:ListItem>
                                        <asp:ListItem Value="26">26</asp:ListItem>
                                    </asp:DropDownList>
                                </div>
                            </div>
                        </div>
                        <div class="control-group hidden">
                            <label class="control-label" for="DistinationID">
                                جهة الوصول:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="DistinationID" ClientIDMode="Static" CssClass="span12 noreset required">
                                    </asp:DropDownList>
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                        Display="Dynamic" InitialValue="" runat="server" ControlToValidate="DistinationID"
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
            </div>
            <div class="modal-footer">
                <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                    إجبارية. </span><span class="sinpper"></span>
                <button class="btn btn-success  radius-4" aria-hidden="true">
                    حفظ</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
    </div>
    <script src="/Scripts/utilities/ShippingExpensesUtility.min.js?v=1.1"></script>
    <script src="/Scripts/App/ShipperExpensesManager.min.js?v=2.2"></script>
</asp:Content>