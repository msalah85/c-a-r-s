<%@ Page Title="تقرير ضريبة القيمة المضافة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="VatReports.aspx.cs" Inherits="Vat_GeneralReports" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .chosen-container {
            width: 238px !important;
        }

        .grid4 {
            /*width: 18% !important;*/
            margin: 0 5px !important;
            padding: 1px 3px !important;
        }

            .grid4 strong.shw {
                cursor: pointer;
            }

        .op-acity {
            opacity: 1 !important;
            position: relative !important;
        }
        .search-form{
            margin:10px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">تقرير ضريبة القيمة المضافة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير ضريبة القيمة المضافة VAT</h1>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="alert alert-block" style="margin-bottom: 5px; padding: 5px 10px;" title="ملخص ضريبة القيمة المضافة VAT">
                    <div class="clearfix">
                        <span class="grid4" title="إجمالى الضريبة مخرجات">ضريبة مخرجات: <strong data-id="1" class="vatOutTotal blue vat-out shw">0</strong></span>
                        <span class="grid4" title="إجمالى الضريبة مدخلات">ضريبة مدخلات: <strong data-id="2" class="vatInTotal vat-in blue shw">0</strong></span>
                        <span class="grid4" title="إجمالى الضريبة المسددة للجمارك">إجمالى الضريبة المسددة: <strong class="vatTotalPaid red vat-out-paidClk shw">0</strong></span>
                        <span class="grid4" title="المبلغ المستحق للجمارك">المبلغ المستحق: <strong class="DueTotalAmount red">0</strong></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="clients-widget-box">
                    <div class="widget-header">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="vatTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="1" data-action="reload" href="VatReports.aspx#paymentsPanel">ضريبة المخرجات</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" data-id="2" data-action="reload" href="VatReports.aspx#paymentsPanel">ضريبة المدخلات</a>
                                </li>
                                <%--<li class="hidden-480">
                                    <a data-toggle="tab" data-id="2" class="vat-out-paidClk" data-action="reload" title="ضريبة مخرجات مسدده" href="VatReports.aspx#vat-out-paid">مخرجات مسدده</a>
                                </li><li class="hidden-480">
                                    <a data-toggle="tab" class="moneyBackClk" data-action="reload" title="ضريبة مدخلات مسدده" href="VatReports.aspx#moneyBack">مدخلات مسدده</a>
                                </li>--%>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="paymentsPanel" class="tab-pane in active">                                    
                                        <div class="form-inline search-form">
                                            بحيث بـ
                                            <input type="text" id="VatTypeID" name="VatTypeID" class="select2 form-control" data-fn-name="VatTypes_Names" data-placeholder="نوع الضريبة VAT" />
                                            <input type="text" id="ClientID" name="ClientID" class="select2 form-control" data-fn-name="Clients_SelectNames3" data-placeholder="العميل" />
                                            <span class="filter_column filter_date_range">
                                                <div class="input-prepend">
                                                    <span class="add-on"><i class="icon-calendar"></i></span>
                                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" placeholder="الوصول من" />
                                                </div>
                                                <div class="input-prepend">
                                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" placeholder="الوصول إلى" />
                                                </div>
                                            </span>
                                            <button tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</button>
                                        </div>
                                    
                                    <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>التاريخ</th>
                                                <th>التصنيف</th>
                                                <th>العميل/الشركة</th>
                                                <th>السعر <sub>درهم</sub></th>
                                                <th>الضريبة <sub>درهم</sub></th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td class="bolder _total"></td>
                                                <td class="bolder _totalVat"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hr hr8 hr-double hr-dotted"></div>
    </div>
    <script src="/Scripts/App/vat/vat-reports.js?v=1.25"></script>
    <script type="text/javascript">
        vatReports.Init();
    </script>
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script async src="/Scripts/select2/select2-optinal.min.js?v=2.1"></script>
</asp:Content>
