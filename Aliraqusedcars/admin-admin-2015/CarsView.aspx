<%@ Page Title=" عــرض السيارات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

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
    </style>
    <script src="/Scripts/App/CarsViewManager.js?v=2.2"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="clients.aspx">العملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ClientsPaymentsAdd.aspx">إيداع عميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">السيارات المتاحــه للبيع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>السيارات المتاحــــه للبيع
            </h1>
        </div>
        <div class="row-fluid">
            <form id="aspnetForm" role="form">
                <div class="form-horizontal">
                    <div class="span4">
                        <div class="control-group">
                            <label class="control-label" for="Arrived">بحــث بحالة الوصول</label>
                            <div class="controls">
                                <select tabindex="0" id="Arrived" class="form-control">
                                    <option value="">---عرض الكل----</option>
                                    <option value="1">واصلــه</option>
                                    <option value="0">غير واصلــه</option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Owner">العميل</label>
                            <div class="controls">
                                <select tabindex="0" id="Owner" class="form-control chzn-select chosen-rtl" data-placeholder="----عرض الكل----">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Distination">جهة الوصول</label>
                            <div class="controls">
                                <select id="Distination" class="form-control">
                                    <option value="">---عرض الكل----</option>
                                </select>
                                <a href="javascript:;" type="submit" tabindex="5" data-rel="tooltip" title="عرض جميع سيارات الشركة فقط" id="allIraqCars" class="btn btn-purple btn-mini btn-search">عـرض سيــارات الـشركة</a>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CarNo">بحــث برقم</label>
                            <div class="controls">
                                <input tabindex="1" type="text" id="CarNo" placeholder="اللوت  - رقم السيارة" class="form-control" />
                                <button type="submit" tabindex="2" id="SearchAll" class="btn btn-info btn-mini btn-search"><i class="icon-search"></i>&nbsp;بحـــث</button>
                                <a tabindex="2" href="javascript:void(0);" id="viewAllCars" class="btn btn-primary btn-mini">عرض الكل</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">عرض السيارات المتاحه وانشاء فاتورة بيع</div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="80"># السيارة</th>
                        <th width="50">صورة</th>
                        <th>نوع السيارة</th>
                        <th>رقم اللوت</th>
                        <th>العميل</th>
                        <th width="90">الوجهة</th>
                        <th width="90">سعر الشراء</th>
                        <th width="80"><%= Request.Url.AbsolutePath.Contains("sold") ? "طباعه" : "انشاء فاتورة"%></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script>CarsViewManager.Init();</script>
</asp:Content>