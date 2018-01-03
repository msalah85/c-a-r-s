<%@ Page Title="السيارات المسددة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="myfinishedcars.aspx.cs" Inherits="myfinishedcars" %>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="Server">    
    <link href="/Scripts/datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/buttons/buttons.dataTables.min.css" rel="stylesheet" />
    <link href="/Scripts/datatable/responsive.bootstrap.min.css" rel="stylesheet" />
    <link href="/App_Themes/client/css/table-page.min.css" rel="stylesheet" />
    <style>
        i.addionalAmount {
            cursor: pointer;
        }
    </style>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="sub-menu">
        <ol class="breadcrumb">
            <li><a href="dashboard">منصة حسابي</a></li>
            <li><a href="requiredcars">سيارات مطلوبة</a></li>
            <li><a href="mycarsforsale">سيارات معروضه بالموقع</a></li>
            <li><a href="ClientShippingCars">سيارات قيد الشحن</a></li>
        </ol>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <h1 class="page-header">السيارات المسددة</h1>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="60">#رقم
                        </th>
                        <th width="75">الصورة</th>
                        <th width="20%">نوع السيارة
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
                        <th>زيادة/خصم
                        </th>
                        <th width="80">عرض
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>    
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
                        <tbody></tbody>
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
    <script src="/Scripts/client/user-cars-finished.min.js?v=1.2"></script>
</asp:Content>