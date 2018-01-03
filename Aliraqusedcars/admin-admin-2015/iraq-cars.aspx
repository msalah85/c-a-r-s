<%@ Page Title="سيارات الشركة" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="iraq-cars.aspx.cs" Inherits="admin_admin_2015_iraq_cars" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        button {
            font-family: 'Droid Arabic Kufi',Tahoma,Verdana;
        }
        .control-group.info [class*="icon-"] {
            color: #fff;
        }
        td a img {
            height: 25px;
        }
        .alert-block {
            padding: 8px 35px 8px 14px;
        }
    </style>
    <script src="/Scripts/App/iraq-cars.min.js?v=1.1"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="iraq-cars.aspx">العملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="budgetreport.aspx">تقرير رأس المال</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="available/1/carslist.aspx">السيارات المتاحه</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">سيارات الشركة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>سيارات الشركة
            </h1>
        </div>
        <div class="row-fluid">
            <div class="span12">
                <div class="alert alert-block alert-info">
                    <div class="row">
                        <span class="grid3">تكاليف سيارات الشراء/الشحن: <strong class="withoutShippingCosts">0</strong></span>
                        <span class="grid3">تكالف سيارات بدون شحن: <strong class="withShippingCosts">0</strong></span>
                        <span class="grid3">الاجمالى: <strong class="allCarsCosts">0</strong></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box widget-box-tabs" id="iraq-cars-widget-box">
                    <div class="widget-header">
                        <div class="widget-toolbar no-border">
                            <ul class="nav nav-tabs" id="iraq-carsTabs">
                                <li class="active">
                                    <a data-toggle="tab" data-id="0" data-action="reload" href="iraq-cars.aspx#activeiraq-cars"><i class="icon-car"></i>
                                        سيارات شراء/شحن
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" data-id="1" data-action="reload" href="iraq-cars.aspx#finishediraq-cars">سيارات بدون شحن</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <div class="tab-content no-padding">
                                <div id="activeiraq-cars" class="tab-pane in active">
                                    <table id="listItems" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="80">#</th>
                                                <th width="50">صورة</th>
                                                <th>الموديل</th>
                                                <th>التكاليف <sub>$</sub></th>
                                                <th width="100">مكان السيارة</th>
                                                <th width="40" class="hidden-print"></th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th><span class="pull-left">الاجمالى</span></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
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
    </div>
    <div class="space-10"></div>
    <script>CarsViewManager.Init();</script>
</asp:Content>
