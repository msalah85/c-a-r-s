<%@ Page Title="ألوان السيارات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="Colours.aspx.cs" Inherits="Colours" EnableViewState="false" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">ألوان السيارات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة ألوان السيارات
            </h1>
        </div>
        <div class="row-fulid">
            <div class="table-header">
                عرض ألوان السيارات <a data-toggle="tooltip" id="btnAddNew" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>لون السيارة
                        </th>
                        <th>Color
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div id="ColorModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body">
                    <form runat="server" id="aspnetForm" clientidmode="Static">
                        <asp:ScriptManager ID="ScriptManager1" runat="server" />
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="ColorID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ColorNameAr">
                                    لون السيارة:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="ColorNameAr" CssClass="required" required ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator5"
                                            Display="Dynamic" runat="server" ControlToValidate="ColorNameAr" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="ColorNameEn">
                                    Color:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div>
                                        <asp:TextBox runat="server" ID="ColorNameEn" CssClass="required" required ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldVssalidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="ColorNameEn" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="modal-footer">
                    <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                        إجبارية. </span><span class="sinpper"></span>
                    <button class="btn btn-success" aria-hidden="true">
                        حفظ</button>
                    <button class="btn clse" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="DeleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="H1">حذف بيان</h4>
                        </div>
                        <div class="modal-body sideAdd">
                            <form action="#" class="form-horizontal" id="removeForm">
                                <label id="Label2">هل أنت متأكد من حذف البيان رقم (<label class="removeField"></label>) الذى تم اختياره؟</label>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary btn-delete" aria-hidden="true">نعم</button>
                            <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">إلغاء</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/DefaultGridManager.min.js?v=1.2"></script>
    <script>
        formName = 'formMain'; tableName = 'Colors'; pKey = 'ColorID'; gridId = 'listItems'; modalDialog = 'ColorModal';
        TitlePage = "لون";
        gridColumns = [];
        gridColumns.push({
            "mDataProp": "ColorID",
            "bSortable": true
        },
        {
            "mDataProp": "ColorNameAr",
            "bSortable": true
        },
        {
            "mDataProp": "ColorNameEn",
            "bSortable": true
        },
        {
            "bSortable": false,
            "mData": function () {
                return '<button class="btn btn-default btn-mini btn-primary edit" title="تعديل"><i class="icon-edit"></i></button>' +
                       '<button class="btn btn-default btn-mini btn-danger remove" title="حذف"><i class="icon-trash"></i></button>';
            }
        });
        DefaultGridManager.Init();
    </script>
</asp:Content>

