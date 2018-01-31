<%@ Page Title="اضافة الرواتب الموظفين" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="salaryadd.aspx.cs" Inherits="admin_admin_2015_hr_salariesadd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .chosen-container-single {
            width: 220px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="hr/salaries.aspx">الرواتب</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">اضافة الرواتب الموظفين</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>اضافة الرواتب الموظفين 
            </h1>
        </div>
        <div id="masterForm">
            <div class="row-fluid">
                <div class="form-horizontal">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="AddDate"><span>التاريخ</span></label>
                            <div class="controls">
                                <input type="hidden" id="ID" value="0" />
                                <input type="text" dir="ltr" class="date-picker required vaild current-date" required data-date-format="dd/mm/yyyy" id="AddDate" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Month"><span>شهر</span></label>
                            <div class="controls">
                                <select id="Month" name="Month" class="required span2 form-control" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>&nbsp; سنة&nbsp;
                            <input type="text" id="Year" name="Year" class="required span2" required />
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Commission">عمولة شركة الصرافة</label>
                            <div class="controls">
                                <input class="money" type="text" id="Commission" name="Commission" value="100" />درهم
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="VAT">ضريبة VAT 5%</label>
                            <div class="controls">
                                <input class="money" type="number" id="VAT" name="VAT" value="0" />درهم
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Revised">تمت المراجعة</label>
                            <div class="controls">
                                <input type="checkbox" id="Revised" class="ace-checkbox-2" />
                                <label class="lbl" for="Revised">
                                    نعم! تمت المراجعة - واعتماد مبلغ الرواتب.</label><br />
                                <em class="red">تنبيه: إجراء (نعم ✓) سوف يمنعك من تعديل أو حذف الرواتب لاحقاً.</em>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a data-toggle="tooltip" id="btnAddNew" title="اضافة راتب لموظف" data-dismiss="modal"
                aria-hidden="true" class="icon-animated-vertical btn btn-pink btn-small"><i class="icon-plus"></i>
                اضافة راتب موظف                    
            </a>
            <div class="row-fluid">
                <div class="table-header">
                    عرض رواتب الموظفين
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th class="hidden"></th>
                            <th>الموظف</th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th class="hidden"></th>
                            <th>صافي الراتب <sub>درهم</sub></th>
                            <th class="hidden"></th>
                            <th width="59">خيارات</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="hr hr8 hr-double hr-dotted"></div>
            <div class="row-fluid">
                <div class="span10">
                    <span class="pull-left">إجمالى الرواتب:
                    <input type="text" id="TotalAmount" disabled class="red" style="width: 91px" value="0" />
                        درهم</span>
                </div>
                <div class="span2">
                    <button type="submit" id="SaveAll" class="btn btn-success hidden"><i class="icon-save"></i>حفظ ملف الرواتب الشهري</button>
                </div>
            </div>
        </div>
        <!-- add/edit modal -->
        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="editModalLabel">
                    <i class="icon-edit"></i>اضافة راتب موظف
                </h3>
            </div>
            <div class="modal-body" style="overflow-y: auto;">
                <form id="aspnetForm">
                    <fieldset id="formMain" class="form-horizontal">
                        <div class="">
                            <label>
                            </label>
                            <div class="controls">
                                <input type="hidden" class="notshow" value="0" id="ID" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="UserID">
                                الموظف</label>
                            <div class="controls">
                                <select class="chzn-select chosen-rtl required showText" data-placeholder="اختــر الموظف" id="UserID">
                                    <option></option>
                                </select>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="DefaultSalary">
                                الراتب الأساسي:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <input type="number" id="DefaultSalary" class="notshow" name="plus" value="0" class="required" required />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="SalaryIncrease">
                                الزيادة فى الراتب</label>
                            <div class="controls">
                                <input type="number" id="SalaryIncrease" class="notshow" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Housing">
                                بدل سكن</label>
                            <div class="controls">
                                <input type="number" class="notshow" id="Housing" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Travel">
                                بدل تنقلات/سفر
                            </label>
                            <div class="controls">
                                <input type="number" id="Travel" class="notshow" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Perks">إكراميات</label>
                            <div class="controls">
                                <input type="number" id="Perks" class="notshow" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Other">
                                زيادة أخري</label>
                            <div class="controls">
                                <input type="number" id="Other" class="notshow" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Deduct">
                                مبلغ الخصم</label>
                            <div class="controls">
                                <input type="number" id="Deduct" class="notshow" name="minus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="RepayAmount">
                                سداد سلفة <span class="text-info advBalance" data-toggle="tooltip">!</span></label>
                            <div class="controls">
                                <input data-val="0" type="number" data-rel="tooltip" title="رصيد السلف للموظف: 0 درهم" id="RepayAmount" class="notshow" name="minus" value="0" />
                                <input type="hidden" id="AdvanceAmount" class="notshow hidden" name="plus" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Total">
                                صافي الراتب</label>
                            <div class="controls">
                                <input type="text" id="Total" disabled value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes">
                                بيان:</label>
                            <div class="controls">
                                <textarea cols="4" rows="4" id="Notes" class="notshow"></textarea>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="modal-footer">
                <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                    إجبارية. </span><span class="sinpper"></span>
                <button class="btn btn-success" aria-hidden="true" type="submit">
                    اضــف</button>
                <button class="btn" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
            </div>
        </div>
        <!-- end add/edit modal -->
        <!-- delete modal-->
        <div id="deleteModal" class="modal hide fade" tabindex="-1">
            <div class="modal-header no-padding">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 id="removeModalLabel">
                    <i class="icon-remove"></i>حذف البيان
                </h3>
            </div>
            <div class="modal-body">
                <fieldset class="form-horizontal" id="removeForm">
                    <div class="alert alert-warning">
                        <label>هل أنت متأكد من حذف البيان  (  #<strong class="removeField"></strong>  ) الذي تم اختياره؟</label>
                    </div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-danger pull-right btn-delete">
                    <i class="icon-trash"></i>
                    تأكيد الحذف
                </button>
            </div>
        </div>
    </div>
    <script src="/Scripts/hr/salaries-add.min.js?v=1.3"></script>
</asp:Content>
