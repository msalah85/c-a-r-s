<%@ Page Title="توزيع الشاحنين" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="ShippersBinding.aspx.cs" Inherits="admin_admin_2015_ShippersBinding" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><a href="InvoicePayAdd.aspx">اضافة فاتورة شراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="InvoicesPayView.aspx">فواتير الشراء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">توزيع الشاحنين</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>توزيع الشاحنين
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="Buyer">الباير</label>
                        <div class="controls">
                            <input type="text" id="Buyer" name="Buyer" class="select2 form-control" data-fn-name="Buyers_GetNames" />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label" for="ChassisN">بـحث</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ChassisN" class="form-control" placeholder="الشاصي - اللوت" />
                                <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-info btn-mini"><i class="icon-search"></i>بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="hr hr-dotted"></div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عــرض السيارات وتوزيع الشاحنين                
                <a href="america/carnotes.aspx" class="btn btn-mini btn-success pull-left addition" data-dismiss="modal" aria-hidden="true" data-rel="tooltip" data-original-title="عرض السيارات المنتظرة">السيارات المنتظرة</a>
            </div>
            <table id="listItems" class="table table-bordered table-hover table-striped" width="100%">
                <thead>
                    <tr>
                        <th width="20%">الباير
                        </th>
                        <th width="59" title="رقم السيارة">#
                        </th>
                        <th width="100">التاريخ
                        </th>
                        <th>اللوت
                        </th>
                        <th width="20%">السيارة
                        </th>
                        <th>الشاصي
                        </th>
                        <th width="15%">الشاحن
                        </th>
                        <th>سعر الشراء <sub class="text-warning">$</sub></th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <script src="/Scripts/select2/select2.min.js?v=1.6"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.3"></script>
    <script src="/Scripts/App/shippers-bindings.min.js?v1.6"></script>
    <script>pageManager.Init();</script>
    <style>
        .editable-buttons .btn {
            padding: 3px 5px 4px 1px;
            line-height: 17px;
        }
        .editable-error-block {
            color: orangered;
        }
    </style>
</asp:Content>