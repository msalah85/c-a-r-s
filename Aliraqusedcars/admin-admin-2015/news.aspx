<%@ Page Title="إدارة الأخبار" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="news.aspx.cs" Inherits="news" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">أخبار الشركة</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة أخبار الشركة</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض الأخبار <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="80%">العنوان</th>
                        <th>مفعل</th>
                        <th>خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true" style="width: 790px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    ×</button>
                <h3 id="editModalLabel">
                    <i class="icon-edit"></i>
                </h3>
            </div>
            <div class="modal-body" style="overflow-y: auto;">
                <form id="aspnetForm" rol="form">
                    <div id="addForm" class="form-horizontal">
                        <div class="">
                            <div class="controls">
                                <input type="hidden" id="id" name="id" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="news_title">الخبر:</label>
                            <div class="controls">
                                <textarea rows="5" class="span6" required id="news_title" name="news_title"></textarea>
                            </div>
                        </div>
                        <div class="hide">
                            <div class="controls">
                                <input type="text" id="RouteURL" name="RouteURL" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="active">مفعل</label>
                            <div class="controls">
                                <div>
                                    <input type="checkbox" id="active" name="active" />
                                    <label class="lbl" for="active">
                                        &nbsp;
                                    نعم! فعل العرض بالموقع.
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-success pull-right savedate">
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
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.1"></script>
    <script src="/Scripts/App/newsManger.min.js"></script>
</asp:Content>