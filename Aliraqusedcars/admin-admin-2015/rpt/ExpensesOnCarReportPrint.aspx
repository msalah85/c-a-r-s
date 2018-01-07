<%@ Page Title="كلفة السيارات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" EnableViewState="false"
    AutoEventWireup="true" CodeFile="ExpensesOnCarReportPrint.aspx.cs" Inherits="ExpensesOnCarReport_Print" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        td p {
            margin: 0;
        }
        @media print {
            #listItems td {
                font-size: 11px;
            }
        }
        #searchForm .control-group{
            margin-bottom:5px;
        }
        input.date_range_filter {
    width: 80px;
}
    </style>    
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <script src="/Scripts/templates/ExpensesOnCarReportPrint.min.js?v=3.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">كلفة السيارات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير كلفة السيارات</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="searchForm">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="Auction">بحث بالمزاد</label>
                        <div class="controls">
                            <input type="text" id="Auction" name="Auction" class="select2 form-control" data-fn-name="Auctions_Names" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Buyer">رقم الباير</label>
                        <div class="controls">
                            <input type="text" id="Buyer" name="Buyer" class="select2 form-control" data-fn-name="Buyers_GetNames" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Client">العميل</label>
                        <div class="controls">
                            <input type="text" id="Client" name="Client" class="select2 form-control" data-fn-name="Clients_SelectNames3" />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="From">تاريخ الشراء</label>
                        <div class="controls">
                            <span class="filter_column filter_date_range">من 
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="From" />
                                إلى
                                    <input type="text" dir="ltr" data-date-format="dd/mm/yyyy" class="date_range_filter date-picker form-control" id="To" /></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ChassisN">الشاصي</label>
                        <div class="controls">
                            <input type="text" id="ChassisN" style="width: 224px" class="form-control" />
                            <a tabindex="4" href="javascript:void(0);" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض كلفة السيارات
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>م</th>
                        <th>التاريخ</th>
                        <th width="19%">السيارة</th>
                        <th title="تكاليف شراء">شراء</th>
                        <th title="عمولة تحويل">م. حوالة</th>
                        <th>Towing</th>
                        <th>شحن/تحميل</th>
                        <th>أخري</th>
                        <th>تخليص</th>
                        <th>جمارك</th>
                        <th>خصم</th>
                        <th title="مصروف شحن بالإمارات">م. شحن</th>
                        <th title="مصروف ورشة بالإمارات">م. ورشة</th>
                        <th>ع. باير</th>
                        <th>إجمالى</th>
                        <th>ف. البيع</th>
                        <th>الربح</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th colspan="14"><span class="pull-left">الاجمالى <sub>$</sub>:</span></th>
                        <th class="cel-bg"></th>
                        <th class="cel-bg"></th>
                        <th class="cel-bg"></th>
                    </tr>
                </tfoot>
            </table>
            <div class="alert alert-block alert-info">
                <p>إجمالى تكاليف السيارات المباعه: <strong class="sum-total-all"><a href="javascript:void(0);" class="getTotalCosts">اضغط هنا</a></strong></p>
            </div>
            <div class="clearfix">&nbsp;</div>
        </div>
    </div>
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.2"></script>
    <script>pageManager.Init();</script>
</asp:Content>