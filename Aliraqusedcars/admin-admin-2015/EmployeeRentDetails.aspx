<%@ Page Title="شيكات إيجارات الموظف" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="EmployeeRentDetails.aspx.cs" Inherits="admin_admin_2015_EmployeeRentDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/empRentDetails.min.js?v=1.4"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="UsersView.aspx">عرض الموظفين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a class="list" href="EmployeeRents.aspx">عرض إيجارات الموظف</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active title">إيجار الموظف السنوى</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1 class="title">إيجار الموظف السنوى:  <span class="orange emp-name"></span></h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <form id="aspnetForm">
                    <div class="span6">
                        <input type="hidden" value="0" class="noreset" id="RentID" />
                        <input type="hidden" value="0" class="noreset" id="EmpID" />
                        <div class="control-group">
                            <label class="control-label" for="DateFrom">الفترة  من<span class="red">*</span></label>
                            <div class="controls">
                                <span class="block input-icon input-icon-right">
                                    <input name="DateFrom" type="text" id="DateFrom" required class="required date-picker" dir="ltr" data-date-format="dd/mm/yyyy" title="تاريخ الفترة من" /><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="DateTo">الفترة إلى<span class="red">*</span></label>
                            <div class="controls">
                                <span class="block input-icon input-icon-right">
                                    <input name="DateTo" type="text" id="DateTo" required class="required date-picker" dir="ltr" data-date-format="dd/mm/yyyy" title="تاريخ الفترة إلى" /><i class="icon-calendar"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Year">لسنة<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required" name="Year" required id="Year" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="TotalAmount">المبلغ السنوي<span class="red">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" class="required money" required id="TotalAmount" name="TotalAmount" readonly="readonly" value="0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12 widget-container-span">
                <div class="widget-box">
                    <div class="widget-header header-color-green">
                        <h4 class="lighter"><i class="icon-list"></i>شيكات الإيجار
                        </h4>
                        <a class="btn btn-mini btn-warning pull-left addition" title="اضف شيك إيجار" role="button" data-toggle="modal" href="EmployeeRentDetails.aspx#addModal">+ اضف شيك</a>
                    </div>
                    <div class="widget-body">
                        <div class="widget-main no-padding">
                            <table id="listItems" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>م</th>
                                        <th>المبلغ <sub>درهم</sub>
                                        </th>
                                        <th>التاريخ
                                        </th>
                                        <th>رقم الشيك
                                        </th>
                                        <th class="hidden-480 hidden-tablet">ملاحظات
                                        </th>
                                        <th width="70">خيارات
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" id="SaveAll" class="btn btn-app btn-purple pull-left hidden" title="حفـــظ"><i class="icon icon-save bigger-200"></i>حفظ الإيجار</button>
        <div class="row-fluid">
            <form role="form">
                <div id="addModal" class="modal hide fade" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="modalLabel">
                            <i class="icon-plus"></i>
                            شيك الإيجار
                        </h3>
                    </div>
                    <div class="modal-body">
                        <div class="row-fluid">
                            <div class="form-horizontal" id="divMyForm">
                                <div class="span12">
                                    <input type="hidden" name="RowIndex" value="-1" />
                                    <input type="hidden" id="RentDetailsID" value="0" />
                                    <div class="control-group">
                                        <label class="control-label" for="Amount">المبلغ <sub class="red">*</sub></label>
                                        <div class="controls">
                                            <input type="text" required name="Amount" id="Amount" class="form-control span10 required" tabindex="1" />
                                            <sub>درهم</sub>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="DuDate">تاريخ الاستحقاق <sub class="red">*</sub></label>
                                        <div class="controls">
                                            <span class="block input-icon input-icon-right">
                                                <input type="text" required id="DuDate" name="DuDate" dir="ltr" data-date-format="dd/mm/yyyy" class="date-picker form-control span10 required" tabindex="2" />
                                                <i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="CheckNo">رقم الشيك <sub class="red">*</sub></label>
                                        <div class="controls">
                                            <input type="text" required id="CheckNo" name="CheckNo" class="form-control span10 required" tabindex="3" />
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="Notes">ملاحظات</label>
                                        <div class="controls">
                                            <textarea id="Notes" cols="3" rows="3" class="form-control span10" tabindex="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="btnSave" class="btn btn-success btnAddRow" aria-hidden="true" tabindex="5">
                            <i class="icon-save"></i>
                            حفــظ</button>
                        <button class="btn" data-dismiss="modal" aria-hidden="true">
                            إلغاء</button>
                    </div>
                </div>
            </form>
        </div>
        <!--end modal-->
    </div>
    <script>pageManager.Init();</script>
</asp:Content>

