<%@ Page Title="إيداع/صرف شيك من البنك" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="InOutBank.aspx.cs" Inherits="InOutBank" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">إيداع/صرف شيك من البنك</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>إيداع/صرف شيك من البنك</h1>
            </div>
            <div class="row-fluid">
                <div id="addForm" class="form-horizontal">
                    <div class="span6">
                        <div class="control-group">
                            <input type="hidden" value="0" id="InOutID" />
                            <asp:Label ID="Label1" runat="server" class="control-label" AssociatedControlID="InOutDate">التاريخ<span class="text-error">*</span></asp:Label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <asp:TextBox dir="ltr" runat="server" CssClass="date-picker current-date required noreset" data-date-format="dd/mm/yyyy"
                                            ID="InOutDate" ClientIDMode="Static" />
                                        &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator3"
                                            Display="Dynamic" runat="server" ControlToValidate="InOutDate" ValidationGroup="s"
                                            ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Type">
                                نوع الإجراء:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:DropDownList runat="server" ID="Type" ClientIDMode="Static" class="required noreset"
                                        data-placeholder="اختــر">
                                        <asp:ListItem Value="0">ســــحب</asp:ListItem>
                                        <asp:ListItem Value="1">إيـــداع</asp:ListItem>
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValisdfdator5"
                                        Display="Dynamic" runat="server" ControlToValidate="Type" ValidationGroup="s" InitialValue=""
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CheckNo">
                                رقم الشيك:</label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="CheckNo" ClientIDMode="Static" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="Amount">
                                المبلغ:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <asp:TextBox runat="server" ID="Amount" CssClass="required" ClientIDMode="Static" />
                                    <asp:RequiredFieldValidator SetFocusOnError="true" CssClass="text-error" ID="RequiredFieldValidator4"
                                        Display="Dynamic" runat="server" ControlToValidate="Amount"
                                        ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Notes">
                                البيان:<span title='حقل إجبارى' class="text-error">*</span></label>
                            <div class="controls">
                                <div>
                                    <textarea rows="2" id="Notes" class="form-control" cols="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label"></label>
                            <div class="controls">
                                <button type="submit" id="btnSaveItem" class="btn btn-success btn-mini"><i class='icon-save'></i>&nbsp;حفـــــــظ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <div class="table-header">
                    عرض إيداع/صرف شيك من البنك 
                <a data-toggle="tooltip" id="divAddEdit" title="تقرير أرصدة البنك"
                    href="BankBalancesView.aspx" class="pull-left icon-animated-vertical btn-add">
                    <i class="icon-list-alt white"></i></a>
                </div>
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th>م
                            </th>
                            <th>التاريخ
                            </th>
                            <th>رقم الشيـك
                            </th>
                            <th width="30%">البيان
                            </th>
                            <th>إيداع <sub>درهم</sub></th>
                            <th>سحـب <sub>درهم</sub></th>
                            <th width="50" class="hidden-print">حذف
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        $.extend(true, $.fn.dataTable.defaults, {
            "searching": false,
            "ordering": false
        });
        tableName = "InOutBank"; gridId = 'listItems'; dataOperation = 'insert';
        gridColumns = [];
        gridColumns.push({
            "mDataProp": "InOutID",
            "bSortable": true
        },
        {
            "mDataProp": "InOutDate",
            "bSortable": true,
            "mData": function (oObj) {
                return commonManger.formatJSONDate(oObj['InOutDate']);
            }
        },
        {
            "mDataProp": "CheckNo",
            "bSortable": false
        },
        {
            "mDataProp": "Notes",
            "bSortable": false
        },
        {
            "mDataProp": "InAmount",
            "bSortable": false,
            "mData": function (oObj) {
                return numeral(oObj['InAmount']).format('0,0.00');
            }
        },
        {
            "mDataProp": "OutAmount",
            "bSortable": false,
            "mData": function (oObj) {
                return numeral(oObj['OutAmount']).format('0,0.00');
            }
        },
        {
            "sClass": "center hidden-print",
            "bSortable": false,
            "mData": function (d) {
                return (d.Deleted) ? '---' : '<button class="btn btn-mini btn-danger remove" data-rel="tooltip" data-placement="top" data-original-title="حــذف"><i class="icon-remove"></i></button>';
            }
        });
    </script>
    <script type="text/javascript" src="/Scripts/App/InOutBanks.min.js?v=1.1"></script>
</asp:Content>

