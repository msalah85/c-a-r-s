<%@ Page Title="مصروفات الإقامه" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="EmpResidences.aspx.cs" Inherits="admin_admin_2015_EmpResidences" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="news.aspx">الموظفين</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="Active">مصروفات الإقامه <span class="emp-name"></span></li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>مصروفات الإقامه <span class="emp-name"></span></h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض مصروفات الإقامه 
                <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>المبلغ</th>
                        <th>ملاحظات</th>
                        <th width="40">التاريخ</th>
                        <th width="40">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="editModalLabel">
                    <i class="icon-edit"></i>
                </h3>
            </div>
            <div class="modal-body">
                <form id="aspnetForm">
                    <div id="addForm" class="form-horizontal">
                        <div class="">
                            <div class="controls">
                                <input type="hidden" id="ResidenceID" name="ResidenceID" value="0" />
                                <input type="hidden" id="EmpID" name="EmpID" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Amount">المبلغ:</label>
                            <div class="controls">
                                <input type="text" class="required" required id="Amount" name="Amount" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes">ملاحظات:</label>
                            <div class="controls">
                                <textarea cols="3" rows="4" name="Notes" id="Notes"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-success pull-left savedate">
                    <i class="icon-save"></i>
                    حفظ
                </button>
            </div>
        </div>
        <div id="deleteModal" class="modal hide fade" tabindex="-1">
            <div class="modal-header no-padding">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h3 id="removeModalLabel">
                    <i class="icon-remove"></i>حذف البيان
                </h3>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="removeForm">
                    <div class="alert alert-warning">
                        <label>هل أنت متأكد من حذف البيان  (  #<strong class="removeField"></strong>  ) الذي تم اختياره؟</label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-danger pull-right btn-delete">
                    <i class="icon-trash"></i>
                    تأكيد الحذف
                </button>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.3"></script>
    <script type="text/javascript">
        var targetdata; modalDialog = "addModal"; formName = 'aspnetForm';
        tableName = "EmpResidences"; pKey = "ResidenceID"; gridId = "listItems";
        gridColumns = [
        {
            "mData": function (d) {
                return numeral(d.Amount).format('0,0');
            },
            "bSortable": false
        },
        {
            "mData": function (d) {
                return commonManger.formatJSONDateCal(d.AddDate);
            },
            "bSortable": false
        },
        {
            "mDataProp": "Notes",
            "bSortable": false
        },
        {
            "bSortable": false,
            "mData": function () {
                return '<button class="btn btn-primary btn-mini edit" title="تعديل"><i class="icon-pencil"></i></button>';
            }
        }];

        DefaultGridManager.Init();
    </script>
</asp:Content>
