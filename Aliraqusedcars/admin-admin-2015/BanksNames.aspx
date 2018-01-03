<%@ Page Title="البنــوك" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        .chosen-container-multi {
            width: 270px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="Clients.aspx">العــملاء</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">البنــوك</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة البنــوك</h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عرض البنــوك                 
                <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>اسم البنــك</th>
                        <th width="100px">خيارات</th>
                    </tr>
                </thead>
            </table>
        </div>

        <div id="addModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h3 id="editModalLabel"><i class="icon-edit"></i></h3>
            </div>
            <div class="modal-body">
                <form id="aspnetForm" class="form-horizontal">
                    <div class="">
                        <div class="controls">
                            <input type="hidden" id="BankID" name="BankID" value="0" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="news_title">اسم البنــك:</label>
                        <div class="controls">
                            <input type="text" class="form-control" required id="BankName" name="BankName" />
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-small btn-success savedate">
                    <i class="icon-save"></i>
                    حفظ
                </button>
                <button class="btn btn-small pull-left" data-dismiss="modal" aria-hidden="true">
                    إلغاء</button>
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
    <!--balance-->
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.0"></script>
    <script src="/Scripts/App/banksManager.min.js"></script>
</asp:Content>
