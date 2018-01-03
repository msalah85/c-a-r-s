<%@ Page Title="تسجيل مصروفات ورشة" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    AutoEventWireup="true" CodeFile="CarShopExpenses.aspx.cs" Inherits="CarShopExpenses"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .control-group {
            margin-bottom: 10px !important;
        }

        .chosen-container {
            width: 238px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="client-Acc" href="#">حساب العميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">مصروفات ورشة للسيارة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>مصروفات ورشة للسيارة</h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal" id="headerForm">
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="CarIDNo"><span>رقم السيارة</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" readonly class="no-border" id="CarIDNo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label" for="model">الموديل</label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" readonly class="no-border" id="model" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="control-group">
                        <label class="control-label">العميل</label>
                        <div class="controls">
                            <span id="full_name"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-16"></div>
        <div class="clearfix">
            <a class="btn btn-small printcar btn-grey" data-rel="tooltip" title="طباعة"><i class="icon-print"></i>
                طباعه
            </a>&nbsp;
            <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                aria-hidden="true" class="btn btn-danger btn-small"><i class="icon-plus"></i>
                اضف مصروف
            </a>
        </div>
        <div class="space-2"></div>
        <div class="row-fulid">
            <div class="table-header">
                عرض مصروفات ورشة على السيارة
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>المادة
                        </th>
                        <th>سعر الوحدة
                        </th>
                        <th>العدد
                        </th>
                        <th>إجمالى
                        </th>
                        <th>التفاصيل
                        </th>
                        <th width="90">خيارات
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="addModalLabel"
            aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="addModalLabel">إضافة جديد</h4>
                </div>
                <div class="modal-body">
                    <div class="form-horizontal">
                        <form id="aspnetForm">
                            <div class="">
                                <div class="controls">
                                    <div class="span12">
                                        <input type="hidden" class="required hasfunction" id="CarShopExpenseID" value="0" />
                                        <input type="hidden" class="required hasfunction" id="CarID" value="0" />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpenseSubject"><span>المادة</span></label>
                                <div class="controls">
                                    <input type="text" class="required " id="ExpenseSubject" name="ExpenseSubject" value="" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="UnitPrice"><span>سعر الوحدة</span></label>
                                <div class="controls">
                                    <input type="text" required class="required" id="UnitPrice" name="UnitPrice" value="0" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="UnitsCount"><span>العدد</span></label>
                                <div class="controls">
                                    <input type="text" required class="required" id="UnitsCount" name="UnitsCount" value="0" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="TotalPrice"><span>إجمالى </span></label>
                                <div class="controls">
                                    <input type="text" required class="required" id="TotalPrice" name="TotalPrice" value="0" readonly />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="OutOfRequired">المصروف على</label>
                                <div class="controls">
                                    <select name="OutOfRequired" id="OutOfRequired" required class="required">
                                        <option value="0">العميل</option>
                                        <option value="1">ضمن تكاليف السيارة</option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ExpenseDetails"><span>التفاصيل </span></label>
                                <div class="controls">
                                    <input type="text" id="ExpenseDetails" style="height: 45px;" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <span class="pull-right">جميع الحقول ذات العلامة <em class="red">*</em>
                        إجبارية. </span><span class="sinpper"></span>
                    <button class="btn btn-success" aria-hidden="true" id="SaveAll">حفظ</button>
                    <button class="btn" data-dismiss="modal" aria-hidden="true">إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/Templates/CarShopExpenses.min.js?v=1.4"></script>
    <script type="text/javascript">
        CarShopExpenses.Init();
    </script>
</asp:Content>