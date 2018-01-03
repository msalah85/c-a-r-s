<%@ Page Title="طباعة سند الصرف" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <link href="signature/css/jquery.signature.min.css?v=1.1" rel="stylesheet" />
    <script src="signature/js/jquery.signature.min.js?v=1.4"></script>
    <script src="signature/js/canvg.min.js?v=1.1"></script>
    <script src="/Scripts/app/receiptPaymentsprint.min.js?v=2.7"></script>
    <style type="text/css">
        #sig {
            width: 500px;
            height: 187px;
            border: 3px solid #cac5c5;
        }
        #sigView canvas {
            max-height: 188px !important;
            max-width: 350px !important;
            overflow: hidden;
        }
        .top-title {
            text-decoration: underline;
        }
        .down-title {
            margin-top: -17px;
        }
        .invoice-body {
            border: 1px solid #DFE1B0;
            position: relative;
        }
        p {
            margin: 0 0 13px;
            border-bottom: 1px dashed #cac5c5;
            width: 98%;
        }
            p .static-content {
                height: 30px;
                background: #fff;
                padding: 0 5px;
            }
        .padding-right-10 {
            padding-right: 10px;
        }
        .padding-left-20 {
            padding-left: 20px;
        }
        .text-space {
            width: 50px;
            display: inline-block;
            height: 10px;
        }
        #duplicateCopy {
            visibility: hidden;
        }
        .print-footer{margin-top:-25px;}
        @media (max-width:797px) {
            .row-fluid .span4 {
                width: 33% !important;
                display: block;
                float: right;
            }
        }
        @media print {
            .img-print {
                display: none;
            }
            body #main-container::before {
                margin-bottom:10px;
            }
            .static-content {
                background: #fff !important;
            }
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
                vertical-align: middle;
                border-top: 1px solid #ddd;
            }
            .pull-left {
                float: left;
            }
            p .static-content {
                height: 40px;
                background: #fff;
                padding: 0 5px;
            }
            #duplicateCopy {
                -webkit-transform: rotate(-20deg);
                -moz-transform: rotate(-20deg);
                -o-transform: rotate(-20deg);
                transform: rotate(-20deg);
                color: #CCC;
                font-weight: bold;
                letter-spacing: 3px;
                position: absolute;
                z-index: 1000;
                top: 37%;
                right: 10%;
                opacity: 0.2;
                filter: alpha(opacity=50);
                display: inline-table;
                visibility: visible;
                font-weight: 700;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="ReceiptPaymentsAdd.aspx">اضافة سند صرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="receiptPayments" href="ReceiptPaymentsView.aspx">عرض سندات  الصرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة سند الصرف</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="span10 offset2 invoice-body" id="masterForm">
            <img alt="" class="img-print" src="/Content/images/print/print-header.png" />
            <a href="javascript:window.print();" class="pull-left hidden-print padding-left-20" title="طباعه">
                <i class="icon-print bigger-200"></i>
            </a>
            <div class="space-10"></div>
            <div class="row-fluid padding-right-10">
                <div class="span4">
                    <ul class="item-list">
                        <li class="item-red clearfix">رقم السند/ &nbsp; <span class="red bolder" id="ReceiptID"></span></li>
                        <li class="item-blue clearfix">التاريخ/ &nbsp; <span class="blue bolder" id="AddDate"></span></li>
                    </ul>
                </div>
                <div class="span4">
                    <center>
                        <h2 class="top-title text-info">Receipt Payment</h2>
                        <h2 class="down-title">سـنـــــد صــــــرف <small id="RecieptTypeName">عام</small></h2>
                    </center>
                </div>
                <div class="span4 padding-left-20">
                    <table class="table table-bordered pull-left">
                        <tr>
                            <td class="center">
                                <span class="green bolder" id="Amount"></span>
                            </td>
                            <td width="30%">$</td>
                        </tr>
                        <tr>
                            <td class="center">
                                <span class="orange bolder" id="AmountDhs"></span>
                            </td>
                            <td>درهم</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="space-24"></div>
            <div class="row-fluid padding-right-10 contentes">
                <p><span class="static-content">يصـرف إلى السيد / السادة:</span> <span class="bolder" id="ToName"></span></p>
                <p><span class="static-content">مبلغ وقدره:</span> <span class="bolder" id="AmountAlphabet"></span></p>
                <p><span class="static-content">وذلك عن:</span> <span class="bolder" id="ExpenseTypeName"></span>، <span class="bolder" id="Notes"></span></p>
                <p><span class="static-content">نقداً:</span> <span id="PaymentTypeName"></span><span class="text-space"></span><span class="static-content">شيك رقم:</span> <span class="bolder" id="CheckNo"></span><span class="text-space"></span><span class="static-content">البنك:</span> <span class="bolder" id="BankName"></span><span class="text-space"></span><span class="static-content">بتاريخ:</span> <span class="bolder" id="BankDate"></span></p>
            </div>
            <div class="row-fluid padding-right-10 hidden">
                <div class="span3 center">
                    <h3 id="divCanceled" class="red"></h3>
                </div>
                <div class="span9">
                    <h3 class="red" id="DeleteReason"></h3>
                </div>
            </div>
            <table width="100%" class="center">
                <tr>
                    <td width="40%">توقيع المستلم <a title="أضف توقيع" data-toggle="modal" data-rel="tooltip" href="#sigModal" class="hidden-print add-sig"><i class="icon-plus-sign bigger-120"></i></a></td>
                    <td>المحاسب</td>
                </tr>
                <tr>
                    <td>
                        <div id="sigView" style="max-width: 500px!important"></div>
                    </td>
                    <td valign="top">
                        <div id="EmployeeName"></div>
                        <div class="sig"></div>
                    </td>
                </tr>
            </table>
            <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" /><div class="space-6"></div>
            <div id="duplicateCopy">
                <span style="font-size: 21px">شركة العراق لتجارة السيارات المستعملة ذ. م. م &nbsp;</span>
            </div>
        </div>
        <!-- end Payments-->
        <!--signature modal-->
        <div id="sigModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="sigModalLabel" aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="sigModalLabel"><i class="icon-pencil"></i>&nbsp;اضـف توقيع</h3>
            </div>
            <div class="modal-body">
                <fieldset id="sigForm" class="form-horizontal">
                    <p class="green">برجاء تشغيل جهاز التوقيع الإلكتروني ورسم التوقيع وسط الإطار التالى:</p>
                    <div class="center">
                        <div id="sig" title="ارسم التوقيع هنا"></div>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <a id="clear" class="pull-right btn btn-warning btn-small" href="javascript:;">إعادة التوقيع</a>
                <a class="btn btn-success" id="SaveSignature" aria-hidden="true">حفظ التوقيع</a>
                <button class="btn" data-dismiss="modal" aria-hidden="true">إلغاء</button>
            </div>
        </div>
        <!-- end-->
    </div>
    <script>ClientsPaymentsPrint.Init();</script>
</asp:Content>
