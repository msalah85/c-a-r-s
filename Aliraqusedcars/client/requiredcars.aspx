<%@ Page Title="السيارات المطلوبة للعميل" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="requiredcars.aspx.cs" Inherits="client_requiredcars" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
    <style>
        i.addionalAmount {
            cursor: pointer;
        }
    </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="myfinishedcars">سيارات مسددة</a></li>
            <li><a href="mycarsforsale">سيارات معروضه بالموقع</a></li>
            <li><a href="ClientShippingCars">سيارات قيد الشحن</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <h1 class="page-header">السيارات المطلوبة
                    &emsp;
                    <small>
                        <a id="lnkApproveNotif" data-toggle="modal" data-target="#myCancelledInv" href="#myCancelledInv" class="hidden" title="تنبيهات فواتير ملغاه"><i class="fa fa-info-circle fa-2x text-danger"></i></a>
                    </small>
            </h1>
            <div class="alert alert-info" style="text-align: left; margin-top: 10px;">
                <span>الرصيـــد: <a href="mypayments" title="حوالات العميل" class="lnkClientsPaymentsView"><strong class="debit text-success">0</strong></a>،  وإجمالى المطلوب: <strong class="totalRequired text-danger">0</strong>،   والصافى: <strong class="clear orange">0</strong>
                </span>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="60">#رقم
                        </th>
                        <th width="75">صورة</th>
                        <th width="20%">السيارة
                        </th>
                        <th>سعر البيع</th>
                        <th>العربون
                        </th>
                        <th>المتبقي
                        </th>
                        <th>الشحن
                        </th>
                        <th>الورشة
                        </th>
                        <th title="ضريبة القيمة المضافة 5% دبي فقط">VAT</th>
                        <th>المطلوب <sub>$</sub>
                        </th>
                        <th>الموقع</th>
                        <th width="30" class="hidden-print" title="عرض السيارة بالموقع">عرض
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="alert alert-info" style="text-align: left; margin-top: 10px;">
                <span>الرصيـــد: <a href="mypayments" title="حوالات العميل" class="lnkClientsPaymentsView"><strong class="debit text-success">0</strong></a>،  وإجمالى المطلوب: <strong class="totalRequired text-danger">0</strong>،   والصافى: <strong class="clear orange">0</strong>
                </span>
            </div>
        </div>
    </div>
    <!-- cancel notifi -->
    <div id="myCancelledInv" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">تنبيه بفواتير بيع ملغاه من حسابك</h4>
                </div>
                <div class="modal-body">
                    <p class="text-success">
                        إذا كان لديك أي استفسار يرجي الاتصال بنا، شكرا لتفهمكم.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary approveBtn">مــــوافـق</button>
                </div>
            </div>
        </div>
    </div>
    <!-- /.modal -->
    <div id="myAddionalAmounts" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title addtionalAmountTitle"></h4>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered" id="lists">
                        <thead>
                            <tr>
                                <th class="cel-bg">السيارة</th>
                                <th class="cel-bg">القيمه <sub>$</sub></th>
                                <th class="cel-bg">التاريخ</th>
                                <th class="cel-bg">السبب</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="100%">لا توجد بيانات متاحه.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" aria-label="Close" class="btn btn-primary">مــــوافـق</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/datatable/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="/Scripts/datatable/dataTables.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/dataTables.responsive.min.js"></script>
    <script src="/Scripts/datatable/responsive.bootstrap.min.js"></script>
    <script src="/Scripts/datatable/buttons/dataTables.buttons.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.flash.min.js"></script>
    <script src="/Scripts/datatable/buttons/buttons.html5.min.js"></script>
    <script src="/Scripts/datatable/buttons/jszip.min.js"></script>    
    <script src="/Scripts/moment.min.js"></script>
    <script src="/Scripts/numeral.min.js"></script>
    <script src="/Scripts/jquery.gritter.min.js"></script>
    <script src="/Scripts/App/Common.min.js"></script>
    <script src="/Scripts/client/user-cars.js?v=1.9"></script>
</asp:Content>

