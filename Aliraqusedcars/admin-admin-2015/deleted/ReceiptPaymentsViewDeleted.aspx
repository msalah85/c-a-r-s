<%@ Page Title="عرض سندات الصرف الملغاه" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/deleted/ReceiptPaymentView.min.js?v=1.5"></script>
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ReceiptPaymentsAdd.aspx">اضافة سند صرف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سندات الصرف الملغاه</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="red">تقرير سندات الصرف الملغاه</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="masterForm">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ClientID">بحث بالمستلم</label>
                        <div class="controls">
                           <input type="text" id="ToName" class="form-control" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="CustomCo">البنك</label>
                        <div class="controls">
                            <label>
                                <span class="block input-icon input-icon-right">
                                    <select tabindex="1" class="chzn-select chosen-rtl" data-placeholder="اختــر البنك" id="BankID">
                                        <option></option>
                                    </select>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="divDates"><span>التاريخ</span></label>
                        <div class="controls">
                            <div class="span12">
                                <span class="filter_column filter_date_range">من
                                    <input tabindex="2" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                    إلى
                                    <input tabindex="3" type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <div class="span12">
                                <button type="submit" tabindex="4" id="SearchAll" class="btn btn-info btn-small"><i class="icon-search"></i>&nbsp;بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="table-header red2-bg">
                عرض سندات الصرف الملغاه <a data-toggle="tooltip" href="ReceiptPaymentsAdd.aspx" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>التاريخ</th>
                        <th>نوع السند</th>
                        <th>المستلم</th>
                        <th>البنك</th>
                        <th>رقم الشيك</th>
                        <th>المبلغ <sub>$</sub></th>
                        <th>المبلغ <sub>درهم</sub></th>
                        <th width="45" class="hidden-print">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>        
        <!--end cancel modal-->
        <div class="hr hr8 hr-double hr-dotted">
        </div>
        <div class="row-fluid">
            <div class="span11">
                <span class="pull-left">إجمالى السندات: <strong class="debit green">0</strong><sub>$</sub></span>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        ReceiptPayment.Init();
    </script>
</asp:Content>
