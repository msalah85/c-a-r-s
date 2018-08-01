<%@ Page Title="حساب العميل" Language="C#" MasterPageFile="~/Jordan/Site.master" AutoEventWireup="true" CodeFile="Client.aspx.cs" Inherits="Jordan_Client" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="container-padding" id="page-contents">
        <div class="sub-menu">
            <ol class="breadcrumb">
                <li><a href="home">الرئيسية</a></li>
                <li><a href="Cars">السيارات</a></li>
                <li><a href="Clients">العملاء</a></li>
                <li><a href="Containers">الحاويات</a></li>
            </ol>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h1 class="page-header">حـسـاب العميل: <small class="clientName text-info"></small></h1>
            </div>
            <div class="col-md-6 col-md-offset-3">
                <div class="alert alert-block alert-warning text-center alert-summary" role="alert">
                    <span>الرصيد: <a href="#" title="حوالات العميل" class="lnk-pay"><strong class="debit green">0</strong>$</a>
                    </span>
                    <span>المطلوب: <strong class="totalRequired red">0</strong>$</span>
                    <span>الصافى: <strong data-toggle="tooltip" title="الصافي= المطلوب - الرصيد" class="clear orange">0</strong>$</span>
                </div>
            </div>
            <div class="col-md-12">
                <ul class="nav nav-tabs" id="carTabs">
                    <li class="active">
                        <a data-toggle="tab" data-id="0" data-action="reload" href="ClientCars.aspx#cars"><i class="fa fa-car"></i>
                            سيارات العميل</a>
                    </li>
                    <li><a data-toggle="tab" data-id="1" data-action="reload" href="ClientCars.aspx#cars">السيارات المسددة</a></li>
                </ul>
                <div id="cars" class="tab-pane in active">
                    <table id="listItems" class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th width="80" title="رقم السيارة"># السيارة</th>
                                <th width="55">صورة</th>
                                <th width="20%">نوع السيارة</th>
                                <th>سعر البيع</th>
                                <th>العربون</th>
                                <th>المتبقي</th>
                                <th>الشحن</th>
                                <th>الورشة</th>
                                <th title="ضريبة القيمة المضافة 5% دبي فقط">VAT</th>
                                <th>المطلوب</th>
                                <th width="85">الموقع</th>
                                <th width="120">ورق السيارة</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="100%">جاري تحميل البيانات...</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3"><span class="pull-left">الإجمالى:</span></th>
                                <th title="إجمالى سعر البيع"></th>
                                <th title="إجمالى العربون"></th>
                                <th title="إجمالى المتبقي على السيارات">
                                    <div class="btn-group dropup">
                                        <button data-toggle="dropdown" class="btn btn-small dropdown-toggle">
                                            <span class="caret"></span>&nbsp;
                                        </button>
                                        <ul class="dropdown-menu dropdown-default pull-right">
                                            <li>
                                                <a>واصل: <span class="arrived-delayed"></span></a>
                                            </li>
                                            <li>
                                                <a>غير واصل: <span class="not-arrived-delayed"></span></a>
                                            </li>
                                            <li>
                                                <a>الاجمالى: <span class="total-delayed"></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </th>
                                <th colspan="2"></th>
                                <th>
                                    <div class="btn-group dropup">
                                        <button data-toggle="dropdown" class="btn btn-small dropdown-toggle">
                                            <span class="caret"></span>&nbsp;
                                        </button>
                                        <ul class="dropdown-menu dropdown-default pull-right">
                                            <li>
                                                <a>واصل: <span class="arrived-vat"></span></a>
                                            </li>
                                            <li>
                                                <a>غير واصل: <span class="not-arrived-vat"></span></a>
                                            </li>
                                            <li>
                                                <a>الاجمالى: <span class="total-vat"></span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </th>
                                <th colspan="3"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div class="alert alert-block alert-info alert-summary">
                    <span>رصيد العميل: <a href="#" title="حوالات العميل" class="lnk-pay"><strong class="debit green">0</strong>$</a></span>
                    <span>وإجمالى المطلوب: <strong class="totalRequired red">0</strong>$</span>
                    <span>والصافى: <strong data-toggle="tooltip" title="الصافي= المطلوب - الرصيد" class="clear orange">0</strong>$</span>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentScripts" runat="Server">
    <script src="/Scripts/utilities/stickyTableHeader.min.js"></script>
    <script src="/Scripts/jordan/ClientCarsManager.js?v=0.1"></script>
</asp:Content>

