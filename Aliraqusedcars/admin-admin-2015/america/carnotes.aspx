<%@ Page Title="بحث السيارات - كتابة الملاحظات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="carnotes.aspx.cs" Inherits="admin_admin_2015_america_car_notes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="/Scripts/App/cars-notes.min.js?v=3.2"></script>
    <link href="/Scripts/select2/select2.min.css?v=1.7" rel="stylesheet" />
    <link href="america/notes.min.css?v=1.4" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">بحث السيارات وكتابة التعليقات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>السيارات المنتظرة عند الشاحن
            </h1>
        </div>
        <div class="row-fluid">
            <form class="form-horizontal" id="masterForm">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="shipper">الشاحن</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="shipper" name="shipper" class="form-control select2" data-fn-name="Shippers_GetNames" type="text" data-placeholder="اختر الشاحن" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ChassisN"><span>بحث ب</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ChassisN" class="form-control" placeholder="LOT - VIN" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Title1">وصول Title</label>
                        <div class="controls">
                            <span class="inline">
                                <input type="radio" id="Title1" name="Title" value="1" />
                                <label for="Title1" class="lbl">Yes</label>
                                <input type="radio" id="Title2" name="Title" value="0" />
                                <label for="Title2" class="lbl">No</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="BuyerID">الباير</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="BuyerID" name="BuyerID" class="form-control select2" data-fn-name="Buyers_GetNames" type="text" data-placeholder="اختر الباير" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="DistinationID">جهة الوصول</label>
                        <div class="controls">
                            <select id="DistinationID" class="form-control">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <label class="inline">
                                <input type="checkbox" id="CarTitleAmrica" />
                                <span class="lbl">&nbsp;متأخره Titles</span>
                            </label>
                            <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-success btn-mini">
                                <i class="icon-search"></i>
                                بحـــــــث</button>
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="alert alert-warning text-center" data-rel="tooltip" title="You have new notes">
                        <strong>Unread Messages:</strong>
                        <strong><a class="red" id="NewCarNotesCount" href="javascript:void(0);">0</a></strong>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                نتيجة بحث السيارات وكتابة التعليقات
                <a href="bookingbol.aspx?ids=" class="btn btn-app no-radius btn-warning btn-small hidden hidden-print pull-left bookingNow" data-rel="tooltip" title="انشاء حجز الحاوية BOL">+ BOL
                    <span class="badge badge-pink">0</span>
                </a>
                <button class="btn btn-small hidden hidden-print pull-left bookingUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></button>
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>الشاحن</th>
                        <th width="59" title="رقم السيارة">#</th>
                        <th width="59" class="hidden-phone hidden-480">صورة</th>
                        <th width="90" class="hidden-phone hidden-480">التاريخ</th>
                        <th>السيارة</th>
                        <th>العميل</th>
                        <th class="hidden-phone">اللوت</th>
                        <th class="hidden-phone hidden-480">الشاصي</th>
                        <th>المدينة</th>
                        <th class="hidden-phone">الباير</th>
                        <th>جهة الوصول</th>
                        <th width="30" title="وصول Title">Title</th>
                        <th class="hidden-print" width="70" title="اختر واحجز السيارة بحاوية">حجز للحاوية</th>
                        <th class="hidden-print" width="70px">التعليـــقات</th>
                    </tr>
                </thead>
            </table>
            <div class="row-fluid">
                <div class="span12 pull-left">
                    <a href="bookingbol.aspx?ids=" id="bookingNow" class="btn btn-warning hidden hidden-print pull-left bookingNow">+ انشاء حجز الحاوية BOL</a>
                    <button class="btn btn-small hidden hidden-print pull-left bookingUndo" data-rel="tooltip" title="إلغاء التحديد"><i class="icon-undo bigger-200"></i></button>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span12">&nbsp;</div>
        </div>
        <!-- start comments modal-->
        <div id="commentsModal" class="span8 modal hide fade" tabindex="-1" data-focus-on="input:first" aria-labelledby="myModalLabel" style="right: 30%;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                <h3 id="myModalLabel">
                    <i class="icon-comment blue"></i>
                </h3>
            </div>
            <div class="modal-body" style="overflow-y: scroll;">
                <!-- car no -->
                <input type="hidden" value="0" id="CarID" />
                <!-- show car info -->
                <div class="widget">
                    <div class="toolbar top">
                        <div class="user"><strong>Sale Date:</strong> <span class="car-inv-date"></span>,</div>
                        <div class="user"><strong class="car-shipper"></strong>,</div>
                        <div class="user"><strong class="car-auction"></strong>,</div>
                        <div class="user"><strong>Buyer:</strong> <span class="car-buyer"></span>,</div>
                        <div class="user"><span class="car-region"></span>,</div>
                        <div class="user"><strong>LOT:</strong> <span class="car-lot"></span>,</div>
                        <div class="user"><strong>VIN:</strong> <span class="car-vin"></span></div>
                    </div>
                    <!-- car notes -->
                    <div class="block messaging">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div id="pnlReply" class="">
                    <button class="btn btn-primary btn-small" id="startReply" type="button">Add note</button>
                    <button class="btn btn-small btn-danger closeNote" id="closeNotes" type="button">Close note</button>
                    <button type="button" class="btn btn-mini pull-right" data-dismiss="modal" title="Hide panel"><i class="icon-remove"></i></button>
                </div>
                <div class="row-fluid hidden" id="frmAddNote">
                    <form role="form" id="aspnetForm">
                        <div class="span10">
                            <textarea id="txtNote" class="form-control car-notes" placeholder="Write a note..." rows="2" cols="6"></textarea>
                            <div class="btn-group btn-group-vertical pull-right action-group">
                                <button class="btn btn-success btn-large btnAdd" type="submit" id="bntSendNote" title="Send note">
                                    <i class="icon-location-arrow icon-2x"></i>
                                </button>
                                <label class="inline">
                                    <input type="checkbox" class="self-msg" name="Self" />
                                    <span class="lbl">&nbsp;Self</span>
                                </label>
                                <button class="btn btn-default btn-mini" id="btnCancelRepaying" type="button" title="Cancel posting">Cancel</button>
                            </div>
                        </div>
                        <div class="span2">
                            <div class="widget-main">
                                <input type="file" id="attchFile" data-uploaded-file="" class="attachment-img" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- end comments modal-->
        <!-- start comments modal-->
        <div id="notifications" class="span8 modal hide fade" tabindex="-1" style="right: 30%; direction: ltr">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                <h4><i class="icon-comment blue"></i>
                    Notes Notifications
                </h4>
            </div>
            <div class="modal-body" style="overflow-y: scroll;">
                <div data-carid="0" class="notes-body-contents"></div>
            </div>
            <div class="modal-footer"></div>
        </div>
        <!-- end new comments modal-->
    </div>
    <input type="hidden" name="shipperToCheck" value="" />
    <input type="hidden" name="distToCheck" value="" />
    <script src="/Scripts/select2/select2.min.js?v=1.7"></script>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.6"></script>
</asp:Content>