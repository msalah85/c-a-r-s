<%@ Page Title="طباعة ايصال الايداع" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="ReceiptPrint.aspx.cs" Inherits="client_ReceiptPrint" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <link href="/scripts/signature/css/jquery.signature.min.css?v=1.1" rel="stylesheet" />
    <script src="/Scripts/client/receiptvoucherprint.min.js?v=2.5"></script>
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

        .print-footer {
            margin-top: -25px;
        }

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
                margin-bottom: 10px;
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
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBanner" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu hidden-print">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
            <li><a href="mypayments">الحولات</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1 invoice-body" id="masterForm">
            <div class="inv-banner">
                <img alt="" class="img-print" src="/Content/images/print/print-header.png" />
            </div>
            <a href="javascript:window.print();" class="pull-left hidden-print padding-left-20" title="طباعه">
                <i class="fa fa-print fa-2x"></i>
            </a>
            <div class="space-10"></div>
            <div class="row-fluid padding-right-10">
                <div class="col-sm-4">
                    <ul class="item-list">
                        <li class="item-red clearfix">رقم السند/ <span class="red bolder" id="ReceiptID"></span></li>
                        <li class="item-blue clearfix">التاريخ/ <span class="blue bolder" id="AddDate"></span></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <div class="text-center">
                        <h2 class="top-title text-info">Receipt Voucher</h2>
                        <h2 class="down-title">سـنــــــــد قـبـــــــــــض</h2>
                    </div>
                </div>
                <div class="col-sm-4 padding-left-20">
                    <table class="table table-bordered pull-left">
                        <tr>
                            <td>
                                <strong class="green" id="Amount"></strong>
                            </td>
                            <td>$</td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="orange" id="AmountDhs"></strong>
                            </td>
                            <td>درهم</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="space-24"></div>
            <div class="row-fluid padding-right-10 contentes">
                <p><span class="static-content">استلمنا من السيد / السادة:</span> <span class="bolder" id="FromName"></span></p>
                <p><span class="static-content">مبلغ وقدره:</span> <span class="bolder" id="AmountArabic"></span></p>
                <p><span class="static-content">وذلك عن:</span> <span class="bolder" id="Notes"></span></p>
                <p><span class="static-content">نقداً:</span> <span id="PaymentTypeName"></span><span class="text-space"></span><span class="static-content check-no">شيك رقم:</span> <span class="bolder" id="BankCheckNo"></span><span class="text-space"></span><span class="static-content">البنك:</span> <span class="bolder" id="BankName"></span><span class="text-space"></span><span class="static-content">بتاريخ:</span> <span class="bolder" id="BankDate"></span></p>
                <p><span class="static-content">شركة الصرافة:</span> <span class="bolder" id="ExchangeCompanyNameAr"></span><span class="text-space"></span><span class="static-content">إيصال رقم:</span> <span class="bolder" id="CheckNo"></span><span class="text-space"></span><span class="static-content">بتاريخ:</span> <span class="bolder" id="ExchangeDate"></span></p>
            </div>
            <div class="row-fluid padding-right-10 hidden">
                <div class="col-sm-3 center">
                    <h3 id="divCanceled" class="red"></h3>
                </div>
                <div class="col-sm-9">
                    <h3 class="red" id="DeleteReason"></h3>
                </div>
            </div>
            <div class="row">
                <table class="text-center table no-border">
                    <tr>
                        <td>توقيع العميل
                            <a title="أضف توقيع" data-toggle="modal" data-rel="tooltip" href="#sigModal" class="hidden-print add-sig"><i class="fa fa-plus-square fa-2x"></i></a></td>
                        <td>المحاسب</td>
                    </tr>
                    <tr>
                        <td id="sigView"></td>
                        <td>
                            <div id="UserFullName"></div>
                            <div class="sig"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="inv-footer">
                <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" />
            </div>
            <div class="space-6"></div>
            <div id="duplicateCopy">
                <span style="font-size: 21px">شركة العراق لتجارة السيارات المستعملة ذ. م. م &nbsp;</span>
            </div>
        </div>
        <!-- end voucher-->
        <!--signature modal-->
        <div id="sigModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">اضف توقيع</h4>
                    </div>
                    <div class="modal-body">
                        <fieldset id="sigForm" class="form-horizontal">
                            <p class="green">الرجاء رسم التوقيع وسط الإطار التالى:</p>
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
                    <
                </div>
            </div>
        </div>
        <!-- end-->
    </div>
    <script src="/Scripts/jquery-ui.js?v=1.0"></script>
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <script src="/Scripts/jquery.ui.touch-punch.min.js?v=1.0"></script>
    <script src="/Scripts/jquery.xml2json.min.js"></script>
    <script src="/Scripts/lz-string/lz-string.min.js"></script>
    <script src="/Scripts/plugins/utilities.min.js"></script>
    <script src="/scripts/signature/js/jquery.signature.min.js?v=1.1"></script>
    <script src="/scripts/signature/js/canvg.min.js?v=1.1"></script>
    <script src="/Scripts/moment.min.js"></script>
    <script>ClientsPaymentsPrint.Init();</script>
    <link href="/Content/css/user-profile.min.css" rel="stylesheet" />
    <style>
        .inv-banner, .inv-footer {
            margin: 0 -15px;
        }

            .inv-banner img,
            .inv-footer img {
                width: 100%;
            }

        table.no-border, table.no-border tr, table.no-border td, table.no-border th {
            border: 0 !important;
        }

        .down-title, .top-title {
            font-size: 23px;
            font-weight: 600;
        }

        .sub-menu {
            margin: -20px -20px 20px;
            text-align: center;
        }
    </style>
</asp:Content>

