<%@ Page Title=" شركة العراق - كشف بكلفة السيارات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ExpensesOnCarReport.aspx.cs" Inherits="ExpensesOnCarReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

    <style type="text/css">
        .chosen-container {
            width: 238px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="rpt/ExpensesOnCarReport.aspx">عرض كشف بكلفة السيارات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">كشف بكلفة السيارات</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>كشف بكلفة السيارات</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div id="masterForm">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" id="Label3" for="ChassisNo"><span>الشاصية  </span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <input type="text" dir="ltr" id="ChassisNo" />
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label5" for="LotNo"><span>رقم اللوت  </span></label>

                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <input type="text" dir="ltr" id="LotNo" />
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="" for="fromdate"><span>من تاريخ  </span></label>

                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <input type="text" dir="ltr" class="date-picker required vaild"
                                                data-date-format="dd/mm/yyyy" id="fromdate" />
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label4" for="PaymentsDates"><span>إلى تاريخ  </span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <input type="text" dir="ltr" class="date-picker required vaild"
                                                data-date-format="dd/mm/yyyy" id="todate" />
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label1" for="AuctionID"><span>إسم المزاد</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر إسم المزاد" id="AuctionID">
                                                <option></option>
                                            </select>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" id="Label2" for="ClientID"><span>إسم العميل</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر إسم العميل" id="ClientID">
                                                <option></option>
                                            </select>
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <span class="hr hr8 hr-double hr-dotted"></span>
            <button type="submit" id="PrintAll" class="btn btn-success pull-left" title="حفـــظ"><i class="icon icon-print"></i>طباعة كلفة السيارات</button>
        </div>
    </div>
    <script type="text/javascript" src="/Scripts/Templates/ExpensesOnCarReport.js?v=1.0"></script>
    <script>
        ExpensesOnCarReport.Init();
    </script>
</asp:Content>
