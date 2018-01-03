<%@ Page Title="حوالة عمولة البيرات الخاصة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="AuctionCommissionAdd.aspx.cs" Inherits="AuctionCommissionPayment" %>

<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        textarea {
            height: 25px;
        }

        .btnSearch {
            width: 220px;
        }

        .hr {
            margin: 0;
        }
    </style>
    <script src="/scripts/app/AuctionCommissionPayment.min.js?v=2.01"></script>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="AuctionCommissionview.aspx">حوالات البيرات</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">حوالة عمولة البيرات الخاصة</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>حوالة عمولة البيرات الخاصة &nbsp; <span id="divSpinner"></span>
                </h1>
            </div>
            <div class="row-fluid">
                <div class="form-horizontal" id="masterForm">
                    <div class="span6">
                        <div class="control-group">
                            <asp:Label runat="server" class="control-label" AssociatedControlID="InvoiceDate">التاريخ<span class="text-error">*</span></asp:Label>
                            <div class="controls">
                                <span class="block input-icon input-icon-right">
                                    <input type="hidden" id="AuctionCommID" value="0" />
                                    <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="date-picker current-date required"
                                        data-date-format="dd/mm/yyyy" ID="InvoiceDate" ClientIDMode="Static" />
                                    <i class="icon-calendar"></i>&nbsp;<asp:RequiredFieldValidator SetFocusOnError="true"
                                        CssClass="red-txt" ID="RequiredFieldValidator2" Display="Dynamic" runat="server"
                                        ControlToValidate="InvoiceDate" ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator></span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ExchangeCompanyID"><span>مكتب الصرافة</span><span class="text-error">*</span></label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required" required data-placeholder="اختــر مكتب الصرافة" name="ExchangeCompanyID" id="ExchangeCompanyID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="AuctionTypeID"><span>تصنيف المزاد</span><span class="text-error">*</span></label>
                            <div class="controls">
                                <select required class="chzn-select chosen-rtl required" data-placeholder="اختر تصنيف المزاد" id="AuctionTypeID" name="AuctionTypeID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="DateFrom">تاريخ الشراء<span class="text-error">*</span></label>
                            <div class="controls">
                                من<input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="DateFrom" name="DateFrom" required />
                                إلى<input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="DateTo" name="DateTo" required />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <button class="btn btn-info btn-mini btnSearch"><i class="icon-search"></i>&nbsp; بحث السيارات</button>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Convertamount">أجر التحويل <sub class="text-warning">درهم</sub></label>
                            <div class="controls">
                                <input type="text" class="no-border money" name="Convertamount" id="Convertamount" readonly value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CommAmount">قيمة الحوالة <sub class="text-warning">$</sub></label>
                            <div class="controls">
                                <input type="text" class="no-border money" name="CommAmount" id="CommAmount" readonly value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CommAmountDhs">قيمة الحوالة <sub class="text-warning">درهم</sub></label>
                            <div class="controls">
                                <input type="text" class="required no-border money" readonly name="CommAmountDhs" id="CommAmountDhs" required value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ExtraAmount">مبالغ اضافية <sub class="text-warning">$</sub></label>
                            <div class="controls">
                                <input type="text" class="form-control money" name="ExtraAmount" id="ExtraAmount" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CommissionExtraNoteID">بيان المبلغ الاضافي</label>
                            <div class="controls">
                                <select class="form-control" id="CommissionExtraNoteID">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label2" for="Notes"><span>ملاحظات</span></label>
                            <div class="controls">
                                <textarea cols="10" rows="3" id="Notes"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted">
            </div>
            <div class="row-fluid">
                <div class="widget-box">
                    <div class="widget-header header-color-blue2">
                        <h5 class="bigger lighter">
                            <i class="icon-car"></i>
                            عرض السيارات والبيرات بالعمولة
                        </h5>
                        <div class="widget-toolbar no-border">
                            <a href="#up" data-action="collapse"><i class="icon-chevron-up"></i></a>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                                <thead>
                                    <tr>
                                        <th>م</th>
                                        <th width="20%">السيارة
                                        </th>
                                        <th>رقم اللوت
                                        </th>
                                        <th>الشاصي
                                        </th>
                                        <th>الباير
                                        </th>
                                        <th width="20%">المدينة
                                        </th>
                                        <th>رقم السيارة</th>
                                        <th>العمولة<sub>$</sub>
                                        </th>
                                        <th>الاضافي<sub>$</sub>
                                        </th>
                                        <th>الاجمالى<sub>$</sub>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="hr hr8 hr-double hr-dotted"></div>
                            <table class="table table-striped table-bordered">
                                <tr>
                                    <td width="90%"><strong class="pull-left">إجمالى الحوالة :</strong></td>
                                    <td width="10%"><strong class="CommAmount" id="AuctionCommTotal">0</strong> $</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-app btn-success pull-left btnFinish hidden" id="SaveAll"
                    data-last="Finish">
                    <i class="icon-save"></i>حفظ الفاتورة</button>
            </div>
        </div>
    </form>
    <script>pageManager.init();</script>
</asp:Content>
