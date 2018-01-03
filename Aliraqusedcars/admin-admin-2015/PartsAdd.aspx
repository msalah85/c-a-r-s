<%@ Page Title="اضافة فاتورة قطع غيار" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="PartsAdd.aspx.cs" Inherits="admin_admin_2015_PartsAdd" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="home">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="PartsView.aspx">قطع الغيار</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="Active">اضافة فاتورة قطع غيار</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>اضافة فاتورة قطع غيار</h1>
        </div>
        <form id="aspnetForm">
            <div class="row-fluid">
                <div class="form-horizontal">
                    <div id="masterForm">
                        <div class="span6">
                            <input type="hidden" id="ID" value="0" />
                            <div class="control-group">
                                <label class="control-label" for="ClientID">العميل</label><div class="controls">
                                    <div class="span12">
                                        <select class="chzn-select chosen-rtl required showvalue" data-placeholder="اختــر العميل" id="ClientID" name="ClientID">
                                            <option></option>
                                        </select>
                                        <!-- add new -->
                                        <a data-toggle="modal" href="#ClientModal"><i class="icon-plus-sign-alt"></i>اضافة عميل</a>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="InvoiceNo"><span>رقم الفاتورة</span></label><div class="controls">
                                    <div class="span12">
                                        <label>
                                            <input type="text" dir="rtl" class="required" required name="InvoiceNo" id="InvoiceNo"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="AddDate"><span>التاريخ</span></label><div class="controls">
                                    <div class="span12">
                                        <input type="text" dir="ltr" class="date-picker required vaild current-date" data-date-format="dd/mm/yyyy" id="AddDate" name="AddDate">
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Notes">التفاصيل</label><div class="controls">
                                    <div class="span12">
                                        <textarea id="Notes" cols="3" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row-fluid">
                <table id="listItems" class="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50" class="center">م</th>
                            <th>القطعة / البيان</th>
                            <th width="90px">العدد</th>
                            <th width="90px">سعر القطعة <sub>$</sub></th>
                            <th width="90px">الاجمالى <sub>$</sub></th>
                        </tr>
                    </thead>
                    <tbody class="ui-sortable">
                        <tr>
                            <td class="itemdiv center"><span class="num">1</span><input type="hidden" name="childID" value="0" /></td>
                            <td class="edit">
                                <input name="PartName" required class="input-block-level form-control" type="text" /></td>
                            <td class="edit">
                                <input name="Quantity" required class="input-block-level form-control" type="number" value="0" /></td>
                            <td class="edit">
                                <input name="Price" required class="input-block-level form-control money" type="text" value="0" /></td>
                            <td class="money">0</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="4" class="edit" style="padding-left: 7px!important;">
                                <button class="btn btn-blue newLine btn-mini" data-toggle="tooltip" title="اضافة سطر جديد">قطعه جديدة</button>
                                <strong class="pull-left blue">الإجمالى <sub>$</sub></strong>
                            </th>
                            <th style="border-right: 0.5px dotted rgba(213, 213, 213, 0.63)!important;" id="TotalAmount">0</th>
                        </tr>
                        <tr>
                            <th colspan="4"><strong class="pull-left purple">مبلغ الخصم <sub>$</sub></strong></th>
                            <th style="border-right: 0!important;" class="edit">
                                <input name="Discount" required class="input-block-level form-control bolder money" type="text" value="0" />
                            </th>
                        </tr>
                        <tr>
                            <th colspan="4"><strong class="pull-left green">الصافي <sub>$</sub></strong></th>
                            <th style="border-right: 0.5px dotted rgba(213, 213, 213, 0.63)!important;" id="NetAmount">0</th>
                        </tr>
                    </tfoot>
                </table>
                <button type="submit" id="SaveAll" class="btn btn-app btn-success pull-left" title="اضف جديد"><i class="icon icon-save"></i>حفظ الفاتورة</button>
            </div>
            <div class="row-fluid">
                <div id="ClientModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            ×</button>
                        <h3 id="editModalLabel">
                            <i class="icon-plus"></i>اضافة عميل جديد
                        </h3>
                    </div>
                    <div class="modal-body">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="control-group">
                                <label class="control-label" for="txtName">
                                    اسم العميل:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="txtName" name="name" class="required span10" />
                                    </div>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtPhone">
                                    رقم الجوال:</label>
                                <div class="controls">
                                    <div class="span12">
                                        <input type="text" id="txtPhone" class="span5" />&nbsp;
                                    <select class="form-control span5" id="countryCode">
                                        <option value="00971">الإمارات (00971)</option>
                                        <option value="00964">العراق (00964)</option>
                                        <option value="00962">الأردن (00962)</option>
                                        <option value="00968">عمان (00968)</option>
                                        <option value="00966">السعودية (00966)</option>
                                        <option value="00965">الكويت (00965)</option>
                                        <option value="00974">قطر (00974)</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="modal-footer">
                        <span class="pull-right small">جميع الحقول ذات العلامة <em class="text-error">*</em>
                            إجبارية. </span><span class="sinpper"></span>
                        <button id="btnSave" class="btn btn-success btn-small btn-next" data-last="إنهاء "
                            aria-hidden="true">
                            <i class="icon-save"></i>
                            حفظ 
                        </button>
                        <button class="btn btn-small" data-dismiss="modal" aria-hidden="true" id="cancelModal">
                            إلغاء</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <style>
        .table input {
            margin-bottom: 0 !important;
        }

        #Notes {
            height: 20px;
        }

        .table input.error {
            border: 1px solid #f09784 !important;
        }

        .table td.edit, .table th.edit {
            padding: 0 !important;
            vertical-align: middle !important;
        }

            .table td.edit input, .table th.edit input {
                border: 0.5px dotted rgba(213, 213, 213, 0.63);
            }

        .table tbody tr td, .table tfoot tr th {
            background-color: rgba(239, 239, 239, 0.61);
        }

        .newLine {
            margin-right: 2.8px !important;
        }

        .edit strong {
            margin-top: 4px !important;
        }

        .table tr:hover .tools {
            display: inline-block;
            right: -3px;
        }

        .table tr:last-child td {
            border-bottom: 1px double #ACACAC;
        }

        .hide {
            display: none;
        }

        #editModalLabel i {
            margin-left: 5px;
        }
    </style>
    <script src="/Scripts/autoNumeric.min.js?v=1.1"></script>
    <script src="/Scripts/App/clientsList.min.js?v=1.1"></script>
    <script src="/Scripts/parts/partsadd.min.js?v=1.1"></script>
</asp:Content>
