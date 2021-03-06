﻿<%@ Page Title="عرض السيارات المباعة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="SoldCarsReportPrint.aspx.cs" Inherits="SoldCarsReportPrint"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        #page-content {
            font-family: Tahoma,Verdana;
        }

        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb hidden-print">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="rpt/SoldCarsReport.aspx">
                <label dir="ltr" class="TitleValue " id="Label2"></label>
            </a><span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">
                <label dir="ltr" class="TitleValue " id="Label1"></label>
            </li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!--PAGE CONTENT BEGINS HERE-->
            <div class="space-6">
            </div>
            <div class="row-fluid">
                <div class="span10 offset1">
                    <div class="widget-box transparent invoice-box">
                        <div class="widget-header widget-header-large">
                            <h3 class="grey lighter pull-left position-relative TitleValue"></h3>
                            <div class="widget-toolbar no-border invoice-info">
                                <span class="invoice-info-label">التاريخ:</span> <span class="blue">
                                    <%= DateTime.UtcNow.ToShortDateString() %></span>
                            </div>
                            <div class="widget-toolbar hidden-480">
                                <a class="printme hidden-print" href="javascript:void(0);"><i class="icon-print"></i>
                                </a>
                            </div>
                        </div>
                        <div class="widget-body">
                            <div class="widget-main padding-24">
                                <div class="row-fluid">
                                    <!--row-->
                                    <div class="space">
                                    </div>
                                    <div id="masterForm">
                                        <div class="row-fluid">
                                            <table class="table table-striped table-bordered">
                                                <thead>
                                                    <tr id="ClientIDIDtr" class="hide">
                                                        <th width="25%">إسم العميل
                                                        </th>
                                                        <th>
                                                            <label dir="ltr" class="required hasfunction" id="ClientID"></label>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr id="FromToDatetr" class="hide">
                                                        <td>من تاريخ
                                                        </td>
                                                        <td>
                                                            <label dir="ltr" class="required " id="FromDate"></label>
                                                        </td>
                                                        <td>إلى تاريخ
                                                        </td>
                                                        <td>
                                                            <label dir="ltr" class="required " id="ToDate"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>رقم السيارة
                                                </th>
                                                <th>نوع السيارة
                                                </th>
                                                <th>رقم اللوت
                                                </th>
                                                <th>حالة الشراء
                                                </th>
                                                <th>السعر
                                                </th>
                                                <th>مكان السيارة
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <div class="form-horizontal pull-left">
                                        <div class="control-group">
                                            <label class="control-label" id="Label4" for="Total"><span>إجمالى</span></label>
                                            <div class="controls">
                                                <div class="span6">
                                                    <label>
                                                        <span class="block input-icon input-icon-right">
                                                            <input type="text" dir="rtl" class="no-border" id="Total" readonly value="0" />
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hr hr8 hr-double hr-dotted">
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span7 pull-left">
                                        </div>
                                    </div>
                                    <div class="space-6">
                                    </div>
                                    <div class="row-fluid">
                                        <div class="span12 well">
                                            نشكركم على ثقتكم فى شركة العراق لتجارة السيارات ، ونرجو أن تنال خدماتنا رضاكم.
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--/row-->
            </div>
        </div>
    </div>
    <script src="/Scripts/Templates/SoldCarsReportPrint.js?v=1.0"></script>
    <script>
        SoldCarsReportPrint.Init();
    </script>
</asp:Content>
