<%@ Page Title="تسجيل فاتورة التخليص الجمركي" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="InvoiceCustomsAdd.aspx.cs" Inherits="InvoiceCustomsAddEdit"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .editable-input .input-sm {
            max-width: 100px;
        }

        .sp {
            margin: 0;
        }

        .hr {
            margin-bottom: 1px;
        }

        .widget-main table thead tr {
            background-image: linear-gradient(to bottom,#F8F8F8,#ECECEC) !important;
            background-repeat: repeat-x !important;
            color: #307ECC !important;
        }

        #listItems2.dataTable th[class*=sorting_], #lblTotalExpenses, .widget-main #listItems2 thead tr, .texp {
            color: #82AF6F !important;
            margin-top: 4px;
        }

        .tcust, #lblCustomTotal {
            color: #307ECC;
        }

        .bg-footer {
            background-color: aliceblue;
        }

        .cst-footer {
            background-color: rgba(80,144,193,0.09);
        }

        .exp-footer {
            background-color: rgba(130,175,111,0.09);
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesCustomsView.aspx">الفواتير</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تسجيــل فاتورة التخليص الجمركي</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>فاتورة التخليص الجمركي &nbsp; <span id="divSpinner"></span>
            </h1>
        </div>
        <div class="row-fluid">
            <form runat="server" id="aspnetForm" clientidmode="Static">
                <div class="form-horizontal" id="masterForm">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="CustomsPrice">قيمة البيان الجمركي<span data-toggle="tooltip" title="البيان الجمركي المسجل فى فاتورة المخلص" class="text-error">!*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="hidden" id="CustomsInvoiceID" value="0" />
                                    <input type="text" class="span2" name="CustomVal" /><span data-toggle="tooltip" title="البيان الجمركي المسجل فى فاتورة المخلص">درهم</span>
                                    <asp:TextBox runat="server" Text="0" ReadOnly="true" ID="CustomsPrice" ClientIDMode="Static" CssClass="span2 required" />$
                                &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                    Display="Dynamic" runat="server" ControlToValidate="CustomsPrice" ValidationGroup="s"
                                    ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="InvoiceNo">رقم الفاتورة <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="InvoiceNo" CssClass=" required" ClientIDMode="Static" />
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                        Display="Dynamic" runat="server" ControlToValidate="InvoiceNo" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="InvoiceDate">تاريخ الفاتورة<span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <asp:TextBox dir="ltr" runat="server" CssClass="date-picker current-date required" data-date-format="dd/mm/yyyy" ClientIDMode="Static"
                                            ID="InvoiceDate" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator2"
                                            Display="Dynamic" runat="server" ControlToValidate="InvoiceDate" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group" id="divDepartment" runat="server">
                            <label class="control-label" for="CustomsCompanyID">شركة التخليص <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList class="chzn-select chosen-rtl required" data-placeholder="اختــر شركة التخليص" ClientIDMode="Static"
                                        runat="server" ID="CustomsCompanyID">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator1"
                                        Display="Dynamic" runat="server" ControlToValidate="CustomsCompanyID" InitialValue=""
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ContainerNo">رقم الحاوية <span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList runat="server" ID="ContainerNo" ClientIDMode="Static" placeholder="اختر" CssClass="contNo chzn-select chosen-rtl required">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator6"
                                        Display="Dynamic" runat="server" InitialValue="" ControlToValidate="ContainerNo" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes">ملاحظات </label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:TextBox runat="server" ID="Notes" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- start expense-->
                <div id="CustomExpenseModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                    aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="editModalLabel">
                            <i class="icon-plus"></i>&nbsp; اضافة مصروف تخليص
                        </h3>
                    </div>
                    <div class="modal-body">
                        <fieldset id="formMain" class="form-horizontal">
                            <div>
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="CustomsDetailsID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpenseTypeID">
                                    نوع المصروف:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:DropDownList runat="server" ID="ExpenseTypeID" ClientIDMode="Static" CssClass="span12 required">
                                        </asp:DropDownList>
                                        <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator7"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="ExpenseTypeID"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="CustomsExpenseValue">
                                    قيمة المصروف/السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <asp:TextBox ID="CustomsExpenseValue" runat="server" ClientIDMode="Static" CssClass="span12 required" />
                                        <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator3"
                                            Display="Dynamic" InitialValue="" runat="server" ControlToValidate="CustomsExpenseValue"
                                            ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                            إجبارية. </span><span class="sinpper"></span>
                        <button type="submit" class="btn btn-success btnAddExpens" aria-hidden="true">
                            حفظ</button>
                        <button class="btn" data-dismiss="modal" aria-hidden="true">
                            إلغاء</button>
                    </div>
                </div>
                <!-- end expense-->
            </form>
        </div>
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-header header-color-blue2">
                    <h5 class="bigger lighter">
                        <i class="icon-car"></i>
                        عرض السيارات داخل الحاوية
                    </h5>
                    <div class="widget-toolbar no-border">
                        <a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a>
                    </div>
                </div>
                <div class="widget-body">
                    <div class="widget-main no-padding">
                        <table id="listItems" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>السيارة
                                    </th>
                                    <th>اللوت
                                    </th>
                                    <th width="10%">سعر الشراء <sub>$</sub>
                                    </th>
                                    <th width="10%">الجمارك / السيارة <sub>$</sub>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <hr class="hr-double hr-dotted sp" />
                        <table class="table table-bordered">
                            <tr class="cst-footer">
                                <td><b class="pull-left tcust">إجمالى الجمارك على الحاوية <sub>$</sub></b></td>
                                <td width="10%"><strong id="lblCustomTotal">0</strong></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-6">
        </div>
        <div class="row-fluid">
            <div class="widget-box">
                <div class="widget-header header-color-green">
                    <h5 class="bigger lighter">
                        <i class="icon-list"></i>
                        مصروفات التخليص الجمركي
                    </h5>
                    <div class="widget-toolbar no-border">
                        <a href="#" data-action="collapse"><i class="icon-chevron-up"></i></a>
                    </div>
                </div>
                <div class="widget-body">
                    <div class="widget-main no-padding">
                        <table id="listItems2" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="100px">كود المصروف</th>
                                    <th>نوع المصروف
                                    </th>
                                    <th>المصروف / السيارة <sub>$</sub>
                                    </th>
                                    <th>عدد السيارات</th>
                                    <th width="150px">المصروف / الفاتورة <sub>$</sub></th>
                                    <th width="70">خيارات</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <hr class="hr-double hr-dotted sp" />
                        <table class="table table-bordered">
                            <tr class="exp-footer">
                                <td style="padding: 4px"><a href="#CustomExpenseModal" data-toggle="modal" class="btn btn-light btn-mini btn-addExp hidden"><i class="icon-plus"></i>&nbsp;اضافة مصروف</a>
                                    <b class="pull-left texp">إجمالى المصروفات على الفاتورة <sub>$</sub></b></td>
                                <td width="14%"><strong id="lblTotalExpenses">0</strong></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="hr hr8 hr-double hr-dotted"></div>
        <div class="row-fluid">
            <table class="table table-striped table-bordered">
                <tr class="bg-footer">
                    <td><b class="pull-left">إجمالى الجمارك و المصروفات على الفاتورة <sub>$</sub></b></td>
                    <td width="14%"><strong id="lblInvoiceTotal">0</strong></td>
                </tr>
                <tr class="bg-footer">
                    <td><b class="pull-left">إجمالى الفاتورة <sub>درهم</sub></b></td>
                    <td width="14%"><strong id="lblInvoiceTotalDhs">0</strong></td>
                </tr>
            </table>
        </div>
        <div class="row-fluid">
            <button type="submit" class="btn btn-success btnFinish hidden pull-left" data-loading-text="جارى الحفظ..." autocomplete="off"><i class="icon-save"></i>حفظ الفاتورة</button>
            <input type="hidden" id="DistinationID" value="0" />
        </div>
    </div>
    <script src="/Scripts/App/CustomsInvoicesManager.min.js?v=2.3" type="text/javascript"></script>
</asp:Content>
