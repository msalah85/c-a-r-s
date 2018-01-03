<%@ Page Title="طباعة سند القبض" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/app/ClientBonusPrint.min.js?v=2.5"></script>
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
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><a href="ClientBonusAdd.aspx">اضافة خصم لعميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="receiptvoucher" href="ClientBonusView.aspx">عرض الخصومات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طباعة خصم لعميل</li>
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
                        <li class="item-red clearfix">#/ <span class="red bolder" id="BonusID"></span></li>
                        <li class="item-blue clearfix">التاريخ/ <span class="blue bolder" id="AddDate"></span></li>
                    </ul>
                </div>
                <div class="span4">
                    <center>
                        <h2 class="top-title text-info">Bonus for Client</h2>
                        <h2 class="down-title">خصم مكتسب <small id="RecieptTypeName">لعميل</small></h2>
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
                <p>خصم مكتسب من شركة العراق للعميل/ <span class="bolder" id="full_name"></span></p>
                <p><span class="static-content">وذلك عن:</span> <span class="bolder" id="Notes"></span></p>
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
                    <td width="40%"></td>
                    <td>المحاسب</td>
                </tr>
                <tr>
                    <td><a class="edit-me btn btn-small btn-danger hidden">اعتمد فى رصيد العميل</a></td>
                    <td valign="top">
                        <div id="UserFullName"></div>
                        <div></div>
                    </td>
                </tr>
            </table>
            <img alt="center" class="print-footer" src="/Content/images/print/print-footer.png" /><div class="space-6"></div>
            <div id="duplicateCopy">
                <span style="font-size: 21px">شركة العراق لتجارة السيارات المستعملة ذ. م. م &nbsp;</span>
            </div>
        </div>        
        <div class="row-fluid padding-right-10">
            <div class="span10 offset2 hidden-print">
                <a href="ClientBonusAdd.aspx" class="btn btn-info btn-small">خصم جديد</a>
                <a href="ClientBonusView.aspx" class="btn btn-grey btn-small">عرض الخصومات</a>
            </div>
        </div>
        <!-- end voucher-->
    </div>
    <script>pageManager.Init();</script>
</asp:Content>