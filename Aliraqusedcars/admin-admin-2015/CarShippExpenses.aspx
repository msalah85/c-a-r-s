<%@ Page Title="تسجيل موفوعات للعميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CarShippExpenses.aspx.cs" Inherits="CarShippExpenses"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }
    </style>
    <script src="/Scripts/Templates/CarShippExpenses.min.js?v=1.3"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a class="client-Acc" href="#">حساب العميل</a> <span class="divider"><i class="icon-angle-left"></i></span>
            </li>
            <li class="active">مصروفات الشحن على السيارة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>مصروفات الشحن على السيارة</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="headerForm">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label">العميل</label>
                        <div class="controls">
                            <div class="span12">
                                <span id="full_name"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="CarIDNo"><span>رقم السيارة</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" readonly class="no-border" id="CarIDNo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="model">الموديل</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" readonly class="no-border" id="model" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <button class="btn btn-gery btn-small printExp" title="طباعة">
                <i class="icon-print"></i>
                طباعة المصروفات
            </button>
            <button id="divAddEdit" title="اضافة جديد" class="btn btn-danger btn-small icon-animated-vertical">
                <i class="icon-plus"></i>
                اضافة مصروف
            </button>
        </div>
        <div class="space-2"></div>
        <div class="table-header">
            عرض مصروف الشحن 
        </div>
        <div class="row-fluid">
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>نوع الشحن
                        </th>
                        <th>تاريخ الدفع
                        </th>
                        <th>المبلغ
                        </th>
                        <th>التفاصيل
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="row-fluid">
            <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="addModalLabel">إضافة جديد</h4>
                        </div>
                        <div class="modal-body sideAdd">
                            <div class="form-horizontal">
                                <form id="aspnetForm">
                                    <div class="">
                                        <div class="controls">
                                            <input type="hidden" class="required hasfunction" id="CarID" value="0" /><input type="hidden" class="required hasfunction" id="ExpenseID" value="0" />
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="CarShippExpenseTypeID"><span>نوع الشحن</span></label>
                                        <div class="controls">
                                            <select class="required" required data-placeholder="اختــر نوع الشحن" id="CarShippExpenseTypeID" name="CarShippExpenseTypeID">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="ExpenseDate"><span>تاريخ الدفع</span></label>
                                        <div class="controls">
                                            <input type="text" dir="ltr" class="date-picker current-date required" required data-date-format="dd/mm/yyyy" id="ExpenseDate" name="ExpenseDate" />
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="ExpenseCost"><span>المبلغ</span></label>
                                        <div class="controls">
                                            <div class="span12">
                                                <input type="text" dir="ltr" class="required" required id="ExpenseCost" name="ExpenseCost" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="ExpenseDetails"><span>التفاصيل </span></label>
                                        <div class="controls">
                                            <div class="span12">
                                                <textarea cols="3" rows="2" required class="required" id="ExpenseDetails" name="ExpenseDetails"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <span class="pull-right small">جميع الحقول ذات العلامة <em>*</em>
                                إجبارية. </span><span class="sinpper"></span>
                            <button class="btn btn-success" aria-hidden="true" id="SaveAll">
                                حفظ</button>
                            <button class="btn" data-dismiss="modal" aria-hidden="true">
                                إلغاء</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        CarShippExpenses.Init();
    </script>
</asp:Content>
