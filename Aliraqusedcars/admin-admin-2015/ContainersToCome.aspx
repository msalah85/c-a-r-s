<%@ Page Title="متابعة وصول الحاويات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ContainersToCome.aspx.cs" Inherits="ContainersToCome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .options {
            width: 115px;
        }

            .options .btn-grey {
                margin-bottom: 2px;
            }

        .dataTable th[class*=sort]:after {
            content: '';
        }

        .v-middle, .groupSeparator td, #listItems > tbody > tr:last-child td {
            border-bottom: 2px solid #b47cbf;
        }

        @media print {
            .table th:nth-child(8) {
                width: 3% !important;
            }
        }

        .editable-empty, .editable-empty:hover, .editable-empty:focus {
            color: #dd11b1;
        }

        .editable-click, a.editable-click, a.editable-click:hover {
            border-bottom: none;
            margin-top: 10px;
        }

            a.editable-click:before {
                content: "\a";
                white-space: pre;
            }

        td.recent-saved {
            animation: recent-saved 1s steps(5, start) 2;
            -webkit-animation: recent-saved 1s steps(5, start) 2;
            background-color: cornsilk;
        }

        @keyframes recent-saved {
            to {
                background-color: #fae98f;
            }
        }

        @-webkit-keyframes recent-saved {
            to {
                background-color: #f7e169;
            }
        }
    </style>
    <script src="/Scripts/App/printContainerSaleCarsBill.js?v=1.1"></script>
    <script src="/Scripts/Templates/container-come-shipping.min.js?v=6.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesShippView.aspx">فواتير الشحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="InvoiceShippingAdd.aspx">اضف فاتورة شحن</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">حاويات بالطريق</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>حاويات بالطريق</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="Shipper">بحث بالشاحن</label>
                        <div class="controls">
                            <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر الشاحن" id="Shipper">
                                <option></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="Distin">جهة الوصول</label>
                        <div class="controls">
                            <select class="form-control chzn-select chosen-rtl" data-placeholder="اختــر بلد الوصول" id="Distin">
                                <option></option>
                            </select>
                            <button tabindex="2" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                قائمة متابعة وصول الحاويات
            </div>
            <table id="listItems" class="table table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>الشاحن</th>
                        <th>السيارة</th>
                        <th>العميل</th>
                        <th>رقم اللوت</th>
                        <th>بلد الوصول</th>
                        <th>تاريخ الوصول</th>
                        <th>رقـم الحـاويـة</th>
                        <th style="max-width: 20%">BOL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="100%">جاري التحميل...</td>
                    </tr>
                </tbody>
            </table>
            <div class="alert alert-block alert-info">
                <strong>عدد الحاويات:</strong>
                <span data-rel="tooltip" title="عدد الحاويات بالصفحة" class="containersNum"></span>
                /
                <span data-rel="tooltip" title="إجمالى عدد الحاويات" class="allContainersCount"></span>
            </div>
        </div>
    </div>
    <div id="carArrive" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="carArriveLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="carArriveLabel"><i class="icon-location"></i>توصيل الحاوية</h3>
        </div>
        <div class="modal-body">
            <form id="aspnetForm">
                <p class="alert alert-success">برجاء تأكيد توصيل الحاوية.</p>
                <fieldset class="form-horizontal">
                    <div class="control-group">
                        <input type="hidden" id="No" value="0" />
                        <input type="hidden" id="Bol" value="0" />
                        <input type="hidden" id="Type" value="0" />
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ArrivalDate">التاريخ<span class="text-error">*</span></label>
                        <div class="controls">
                            <label>
                                <span class="input-icon input-icon-right">
                                    <input type="text" dir="ltr" class="date-picker current-date required" required name="ArrivalDate" id="ArrivalDate" data-date-format="dd/mm/yyyy" />
                                    <i class="icon-calendar"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-small btn-success" aria-hidden="true">توصيل الحاوية</button>
            <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">إلغاء</button>
        </div>
    </div>
    <div id="printedModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="printedModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="printedModalLabel"><i class="icon-location"></i>طباعة الفاتورة</h3>
        </div>
        <div class="modal-body">
            <form id="aspnetForm2">
                <p class="alert alert-success">برجاء تأكيد طباعة الفاتورة الواردة من الشاحن.</p>
                <fieldset class="form-horizontal">
                    <div class="control-group">
                        <input type="hidden" id="InvoiceID" value="0" />
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="containerNoo">رقم الحاوية</label>
                        <div class="controls">
                            <span class="warning" id="containerNoo"></span>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-small btn-success" aria-hidden="true">تأكيد الطباعة</button>
            <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">إلغاء</button>
        </div>
    </div>
    <div id="downloadMeModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="downloadModalLabel"
        aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="downloadModalLabel"><i class="icon-location"></i>تنزيل/تفريغ الحاوية</h3>
        </div>
        <div class="modal-body">
            <form id="aspnetForm3">
                <p class="alert alert-success">برجاء تأكيد تنزيل/تفريغ الحاوية فى مقر الشركة.</p>
                <fieldset class="form-horizontal">
                    <div class="control-group">
                        <input type="hidden" id="InvID" value="0" />
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="contNo">رقم الحاوية</label>
                        <div class="controls">
                            <span class="warning" id="contNo"></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="contNo">تنزيل الحاوية</label>
                        <div class="controls">
                            <div class="control-group">
                                <label class="bolder blue">هل تود تفريع/تنزيل الحاوية عند مقر الشركة؟</label>
                                <div class="radio">
                                    <label>
                                        <input name="DownloadContainer" type="radio" class="ace" value="1" />
                                        <span class="lbl">نعم قم بتنزيل/تفريغ الحاوية</span>
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input name="DownloadContainer" type="radio" class="ace" value="0" />
                                        <span class="lbl">لا تقم بتحميل/تفريغ الحاوية</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
        <div class="modal-footer">
            <button class="btn btn-small btn-success" aria-hidden="true">تأكيد</button>
            <button class="btn btn-small" data-dismiss="modal" aria-hidden="true">إلغاء</button>
        </div>
    </div>
    <script src="/Scripts/DataTables/media/js/dataTables.rowsGroup.min.js?v=1.6"></script>
    <script>CarsLateShipping.Init();</script>
</asp:Content>
