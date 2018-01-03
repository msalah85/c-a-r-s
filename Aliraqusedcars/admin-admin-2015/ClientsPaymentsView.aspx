<%@ Page Title="عرض إيداعات/حــوالات العميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ClientsPaymentsView.aspx.cs" Inherits="ClientsPaymentsView" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/Templates/ClientsPayments.min.js?v=2.4"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .chosen-container {
            width: 238px !important;
        }

        .grid4 {
            width: 18% !important;
            margin: 0 5px !important;
            padding: 1px 3px !important;
        }

            .grid4 strong.shw {
                cursor: pointer;
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <input type="hidden" id="ClientIDFilter" />
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="addPay" href="ClientsPaymentsAdd.aspx">اضافة إيداع</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">إيداعات العميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>الإيداعات - الخصومات للعميل <a class="clientName orange"></a></h1>
        </div>
        <div class="row-fluid">
            <div class="span4">
                <a href="ClientsPaymentsAdd.aspx" class="btn btn-success btn-mini addPay hidden">+ اضافة إيداع</a>
                <a href="ClientDiscounts.aspx?id=" class="btn btn-danger btn-mini add-disount hidden">+ اضافة خصم</a>
            </div>
            <div class="span8">
                <div class="alert alert-block" style="margin-bottom: 5px; padding: 5px 10px;">
                    <div class="clearfix">
                        <span class="grid4" title="إجمالى الإيداعات">إيداعات: <strong class="debit blue clPaymentClc shw">0</strong></span>
                        <span class="grid4" title="إجمالى الخصومات">خصومات: <strong class="discounts totalDiscounts blue shw">0</strong></span>
                        <span class="grid4" title="إجمالى تخفيض/منح/بونص للعميل">تخفيض: <strong class="clientBonus red clientBonusClk shw">0</strong></span>
                        <span class="grid4" title="رصيد مسترد للعميل">مرتجعات: <strong class="moneyBacks red moneyBackClk shw">0</strong></span>
                        <span class="grid4" title="الرصيد الحالى">الرصيد: <strong class="balance red">0</strong></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="clients-widget-box">
                    <div class="widget-header">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="paymentTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="0" data-action="reload" href="ClientsPaymentsView.aspx#paymentsPanel">إيداعات - حوالات</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" data-id="1" data-action="reload" class="discounts" href="ClientsPaymentsView.aspx#discountPanel">خصومات</a>
                                </li>
                                <li class="hidden-480">
                                    <a data-toggle="tab" data-id="2" class="clientBonusClk" data-action="reload" title="تخفيض/بونص للعميل" href="ClientsPaymentsView.aspx#clientBonus">تخفيض</a>
                                </li>
                                <li class="hidden-480">
                                    <a data-toggle="tab" class="moneyBackClk" data-action="reload" title="مبالغ مسترد للعميل" href="ClientsPaymentsView.aspx#moneyBack">مرتجعات</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="paymentsPanel" class="tab-pane in active">
                                    <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                                        <thead>
                                            <tr>
                                                <th>م</th>
                                                <th>رقم الايصال/الحوالة</th>
                                                <th>إسم العميل
                                                </th>
                                                <th>التاريخ
                                                </th>
                                                <th>شركة الصرافة
                                                </th>
                                                <th>المبلغ <sub>درهم</sub>
                                                </th>
                                                <th>المبلغ <sub>$</sub></th>
                                                <th width="59" class="hidden-print"></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div id="discountPanel" class="tab-pane">
                                    <table id="listItems2" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>مبلغ الخصم</th>
                                                <th>التاريخ</th>
                                                <th>سيارة رقم</th>
                                                <th>السبب</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div id="moneyBack" class="tab-pane">
                                    <table id="listItems3" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>التاريخ</th>
                                                <th>مبلغ الخصم</th>
                                                <th>السبب</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div id="clientBonus" class="tab-pane">
                                    <table id="listItems4" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>التاريخ</th>
                                                <th>المبلغ</th>
                                                <th>تفاصيل</th>
                                                <th width="59" class="hidden-print"></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end tabs-->
        <div id="cancelModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="cancelLbl"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="cancelLbl">إلغاء الايداع
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــــــــيه: سوف يتم إلغـــاء الايداع وحـذف  قيمـــته من رصيــد العمـــيل تماماً.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم السند</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="ReceiptID" type="text" value="0" readonly />
                                <input id="ClientPaymentID" type="hidden" value="0" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">بتاريخ</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="PaymentsDates" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">المبلغ $</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="Amount" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">العمـــيل</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="full_name" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">سبب الإلغاء <span class="red">*</span></label>
                        <div class="controls">
                            <div class="span12">
                                <textarea id="DeleteReason" rows="4" cols="4" name="DeleteReason" class="required" required></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger bntCancelInvoice" aria-hidden="true">اعتمد الإلغاء</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    تجاهل</button>
            </div>
        </div>
        <!--cancel bonus-->
        <!--start cancel modal-->
        <div id="cancelBonus" class="modal hide fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3>إلغاء تخفيض/بونص
                </h3>
            </div>
            <div class="modal-body">
                <form id="cancelBonusForm" class="form-horizontal" role="form">
                    <div class="control-group">
                        <p class="red bolder"><i class="red icon-2x icon-warning-sign"></i>&nbsp;تـنـبــيه: سوف يتم إلغـــاء مبلغ التخفيض تماماً من حساب العميل.</p>
                    </div>
                    <div class="control-group">
                        <label class="control-label">رقم السند</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="BonusID" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">المبلغ $</label>
                        <div class="controls">
                            <div class="span12">
                                <input class="Amount" type="text" value="0" readonly />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label">سبب الإلغاء <span class="red">*</span></label>
                        <div class="controls">
                            <div class="span12">
                                <textarea id="Reason" rows="4" cols="4" name="Reason" class="required" required></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger bntCancelInvoice" aria-hidden="true">اعتمد الإلغاء</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    تجاهل</button>
            </div>
        </div>
        <!--end cancel bonus-->
        <div class="hr hr8 hr-double hr-dotted"></div>
    </div>
    <script type="text/javascript">
        ClientsPayments.Init();
    </script>
</asp:Content>
