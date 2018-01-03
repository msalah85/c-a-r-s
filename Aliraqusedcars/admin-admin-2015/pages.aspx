<%@ Page Title="إدارة صفحات الموقع" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="pages.aspx.cs" Inherits="pages" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="news.aspx">أخبار الشركة</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="Active">صفحات الموقع</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة صفحات الموقع</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض صفحات الموقع <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>العنوان</th>
                        <th>وصف مختصر</th>
                        <th width="40">مفعل</th>
                        <th width="40">خيارات</th>
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
                <form id="aspnetForm">
                    <div id="addForm" class="form-horizontal">
                        <div class="">
                            <div class="controls">
                                <input type="hidden" id="ArticleID" name="ArticleID" value="0" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ArticleTitle">العنوان:</label>
                            <div class="controls">
                                <input type="text" class="span6" required id="ArticleTitle" name="ArticleTitle" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="BriefDesc">وصف مختصر:</label>
                            <div class="controls">
                                <textarea class="span6" id="BriefDesc" name="BriefDesc" rows="3" cols="4"></textarea>
                            </div>
                        </div>
                        <div class="hide">
                            <div class="controls">
                                <input type="text" id="RouteURL" name="RouteURL" />
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Details">التفاصيل:</label>
                            <div class="controls">
                                <textarea cols="3" rows="4" name="Details" id="Details" class="span6 textareaSpecial"></textarea>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Active">مفعل</label>
                            <div class="controls">
                                <div>
                                    <input type="checkbox" id="Active" name="Active" />
                                    <label class="lbl" for="Active">
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
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.2"></script>
    <script src="/Scripts/App/pagesManager.min.js"></script>
    <script src="/Scripts/ckeditor/ckeditor.min.js?v=1.1"></script>
    <script type="text/javascript">
        CKEDITOR.replace('Details');
    </script>
</asp:Content>

