<%@ Page Title="طباعة التأمينات جمركية" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ReExportCarsPrint.aspx.cs" Inherits="admin_admin_2015_ReExportCarsPrint" %>

<asp:Content ID="Content2" runat="server" ContentPlaceHolderID="ContentPlaceHolder1">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="ReExportInvoicesList.aspx">عرض التأمينات الجمركية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">طبــاعة التأمينات الجمركية</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-body">
                            <div class="widget-main">
                                <div class="row-fluid">
                                    <h3 class="">التأمينات الجمركية المستردة</h3>
                                    <a class="printme hidden-print pull-left" href="javascript:void(0);"><i class="icon-print bigger-150"></i>
                                    </a>
                                    <div class="row-fluid" id="formMaster">
                                        <div class="span6">
                                            <ul class="unstyled spaced">
                                                <li><i class="icon-caret-left green"></i><strong>رقم الملف:</strong><span class="red" id="ExportID"></span></li>
                                                <li><i class="icon-caret-left green"></i><strong>التاريخ من:</strong><span id="DateFrom"></span></li>
                                                <li><i class="icon-caret-left green"></i><strong>التاريخ إلى:</strong><span id="DateTo"></span></li>
                                                <li><i class="icon-caret-left green"></i><strong>#السيارات:</strong><span id="NoCars"></span></li>
                                            </ul>
                                        </div>
                                        <div class="span6">
                                            <ul class="unstyled spaced">
                                                <li><i class="icon-caret-left green"></i><strong>#البيانات الجمركية:</strong><span id="NoCustoms"></span></li>
                                                <li><i class="icon-caret-left green"></i><strong>مبــــــــلغ الجمـــــــــارك:</strong><sub> $</sub><span class="TotalAmount"></span></li>
                                                <li><i class="icon-caret-left green"></i><strong>المبـــــلغ المســـــــترد: </strong><span class="RealAmount"></span><sub>درهم</sub></li>
                                                <li><i class="icon-caret-left green"></i><strong>المــــــــــــــــــــــــراجــعــة؟:</strong><span id="Revised"></span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="space"></div>
                                    <div class="row-fluid">
                                        <table id="listItems" class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th width="33%">السيارة
                                                    </th>
                                                    <th>الجمارك/السيارة
                                                    </th>
                                                    <th>رقم البيان
                                                    </th>
                                                    <th>تاريخ البيان
                                                    </th>
                                                    <th>المبلغ المسترد/الحاوية
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th></th>
                                                    <th><sub>$</sub><span class="TotalAmount"></span></th>
                                                    <th colspan="2"></th>
                                                    <th><span class="RealAmount"></span><sub>درهم</sub></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="row-fluid">
                                        <div class="space-28"></div>
                                        <div class="space-28"></div>
                                        <div class="space-28"></div>
                                        <hr />
                                        <div class="span12">
                                            <p class="text-center">Website: <a href="http://iraqusedcars.ae">www.iraqusedcars.ae</a> - Email: <a href="mailto:iraqusedcar@gmail.com">iraqusedcar@gmail.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/DataTables/media/js/dataTables.rowsGroup.min.js?v=1.1"></script>
    <script type="text/javascript" src="/Scripts/app/reexport-print.min.js?v=1.3"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
        #formMaster li strong {
            min-width: 127px;
            display: inline-block;
        }
        #page-content {
            padding: 0 !important;
        }
        .widget-box.transparent > .widget-header-large {
            padding-bottom: 0;
        }
        @media (max-width: 767px) {
            .table th, .table td {
                padding: 7px;
                line-height: 17px;
                text-align: right;
                font-size: 14px;
                vertical-align: top;
                border-top: 1px solid #ddd;
            }

            #formMaster.row-fluid .span6 {
                width: 50%;
                float: right;
            }
        }
    </style>
</asp:Content>
