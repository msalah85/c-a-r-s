<%@ Page Title="حجز الحاوية BOL" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="bookingbol.aspx.cs" Inherits="admin_admin_2015_bookingbol" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><a href="InvoicesShippBolView.aspx">BOL List</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="america/carnotes.aspx">اضف سيارة</a> <span class="divider"><i class="icon-angle-left"></i></span>
            </li>
            <li class="active">حجز الحاوية</li>
        </ul>
    </div>
    <form runat="server" id="aspnetForm" clientidmode="Static">
        <asp:ScriptManager ID="ScriptManager1" runat="server" />
        <div id="page-content" class="clearfix">
            <div class="page-header position-relative">
                <h1>حجز الحاوية  - BOL
                </h1>
            </div>
            <div class="row-fluid">
                <div class="form-horizontal" id="masterForm">
                    <div class="span6">
                        <div class="control-group">
                            <label class="control-label" for="ContainerNo">رقم الحاوية</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="ContainerNo" class="form-control required" required />
                                    <input type="hidden" id="ShippInvoiceID" value="0" />
                                    <input type="hidden" id="ShipperID" value="0" />
                                    <input type="hidden" id="DistinationID" value="0" />
                                    <input type="hidden" id="ShippPrice" value="0" />
                                    <input type="hidden" id="LoadingPrice" value="0" />
                                    <input type="hidden" id="IsBol" value="1" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="Bol">BOL</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" id="Bol" class="form-control required" required />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="CarsNo">عدد السيارات</label>
                            <div class="controls">
                                <div class="span12">
                                    <input type="text" disabled="disabled" id="CarsNo" value="0" />
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ContainersNotes">ملاحظات</label>
                            <div class="controls">
                                <textarea cols="5" rows="3" id="ContainersNotes"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="span6">
                        <div class="control-group">
                            <asp:Label ID="Label1" runat="server" class="control-label" AssociatedControlID="ArrivalDate">تاريخ الوصول<span class="text-error">*</span></asp:Label>
                            <div class="controls">
                                <div class="span12">
                                    <label>
                                        <span class="block input-icon input-icon-right">
                                            <asp:TextBox Width="189" dir="ltr" runat="server" CssClass="date-picker current-date required"
                                                data-date-format="dd/mm/yyyy" ID="ArrivalDate" ClientIDMode="Static" />
                                            <i class="icon-calendar"></i>&nbsp;<asp:RequiredFieldValidator SetFocusOnError="true"
                                                CssClass="red-txt" ID="RequiredFieldValidator2" Display="Dynamic" runat="server"
                                                ControlToValidate="ArrivalDate" ValidationGroup="s" ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <asp:Label runat="server" class="control-label" AssociatedControlID="NavigationCoID">شركة الملاحة<span class="text-error">*</span></asp:Label>
                            <div class="controls">
                                <div class="span12">
                                    <asp:DropDownList class="required" placeholder="اختر" runat="server" ID="NavigationCoID" ClientIDMode="Static">
                                    </asp:DropDownList>
                                    &nbsp;<asp:RequiredFieldValidator SetFocusOnError="true" CssClass="red-txt" ID="RequiredFieldValidator3"
                                        Display="Dynamic" runat="server" ControlToValidate="NavigationCoID" ValidationGroup="s"
                                        ErrorMessage="Required.">مطلـــــوب.</asp:RequiredFieldValidator>
                                </div>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="ContainerSize">حجم الحاوية<span class="text-error">*</span></label>
                            <div class="controls">
                                <div class="span12">
                                    <select class="required" placeholder="اختر" id="ContainerSize" required>
                                        <option value="40">40</option>
                                        <option value="45">45</option>
                                        <option value="20">20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr hr-dotted"></div>
            <h4 class="red">اضف سيارة أخري للحاوية:</h4>
            <div class="row-fluid">
                <div class="form-horizontal" id="masterForm2">
                    <div class="span6 offset1">
                        <div class="control-group">
                            <label class="control-label" for="CarID">اختر السيارة</label>
                            <div class="controls">
                                <div class="span12">
                                    <select id="CarID" class="chzn-select chosen-rtl required" data-placeholder="اختــر اللوت">
                                        <option></option>
                                    </select>
                                    <!-- add new -->
                                    <a class="red" id="addNewCar" href="javascript:void(0);"><i class="icon-plus-sign-alt"></i>
                                        اضف سيارة</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:window.location.reload();" class="pull-left btn btn-mini" data-rel="tooltip" title="إعادة تعيين BOL"><i class="icon-undo"></i></a>
                </div>
            </div>
            <div class="row-fluid">
                <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                    <thead>
                        <tr>
                            <th width="50px">#</th>
                            <th width="20%">السيارة</th>
                            <th>الشاحن</th>
                            <th>المدينة</th>
                            <th>Towing</th>
                            <th width="30">خيارات</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div class="hr hr-double"></div>
                <button type="submit" runat="server" class="btn btn-success pull-left btnFinish"
                    data-last="Finish">
                    <i class="icon-save"></i>حفظ BOL</button>
            </div>
        </div>
    </form>
    <script src="/scripts/app/booking-bol.min.js?v=1.3"></script>
    <style type="text/css">
        .btnAddCar {
            border: 0;
            padding: 4px 11px;
        }
    </style>
</asp:Content>