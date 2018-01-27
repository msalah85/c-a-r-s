<%@ Page Title="الزيادات على العميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .chosen-container-multi {
            width: 270px !important;
        }
        a.red {
            text-decoration: underline;
        }.select2-container{width:220px}
    </style>
    <link href="/Scripts/select2/select2.min.css?v=1.1" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="Clients.aspx">العــملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a id="clientLink">حساب العميل</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">الزيادات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>الزيادات على العميل: <a class="client-name red"></a></h1>
        </div>
        <!-- add new-->
        <div class="row-fluid" id="addModal">
            <form id="aspnetForm" class="form-horizontal">
                <div class="span4">
                    <div class="">
                        <div class="controls">
                            <input type="hidden" id="ClientExtraID" name="ClientExtraID" value="0" />
                            <input type="hidden" id="ClientID" class="noreset" value="" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="CarID">رقم السيارة: <span class="red">*</span></label>
                        <div class="controls">
                            <input id="CarID" name="id" class="form-control select2 rtl" data-srch-names="ClientID" data-fn-name="ClientCars_GetBySearch" type="text" value="" dir="rtl" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ExtraAmount">المبلغ: <span class="red">*</span></label>
                        <div class="controls">
                            <input type="text" class="form-control" data-rule-required="true" required id="ExtraAmount" name="ExtraAmount" />$
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="Notes">سبب الزيادة: <span class="red">*</span></label>
                        <div class="controls">
                            <textarea cols="5" rows="3" class="form-control" required id="Notes" name="Notes"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label"></label>
                        <div class="controls">
                            <button type="submit" class="btn btn-small btn-success savedate" data-text="اضف زيادة">
                                <i class="icon-save"></i>
                                اضف زيادة على سيارة للعميل
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <!--end form-->
        <div class="row-fluid">
            <div class="table-header">
                عرض الزيادات
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th title="مسلسل">#</th>
                        <th>سيارة رقم</th>
                        <th>التاريخ</th>
                        <th>السبب</th>
                        <th>مبلغ الزيادة$</th>
                        <th width="40px">إلغاء</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="deleteModal" class="modal hide fade" tabindex="-1">
            <div class="modal-header no-padding">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 id="removeModalLabel">
                    <i class="icon-remove"></i>
                    حذف البيان
                </h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="removeForm">
                    <div class="alert alert-danger">
                        <label>هل أنت متأكد من حذف البيان  (  #<strong class="removeField"></strong>  ) الذي تم اختياره؟</label>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Reason">سبب الحذف:</label>
                        <div class="controls">
                            <div class="span12">
                                <textarea id="Reason" name="Reason" required class="required" cols="5" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-danger" id="btnDelete">
                    <i class="icon-trash"></i>
                    تأكيد الحذف
                </button>
            </div>
        </div>
    </div>
    <!--balance-->
    <script src="/Scripts/select2/select2.min.js?v=2.2"></script>
    <script src="/Scripts/App/DefaultGridFilterManager.min.js?v=4.3"></script>
    <script src="/Scripts/DataTables/media/js/dataTables.rowsGroup.min.js?v=1.6"></script>
    <script src="/Scripts/App/clientExtrasManager.min.js?v=1.7"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=1.3"></script>
</asp:Content>