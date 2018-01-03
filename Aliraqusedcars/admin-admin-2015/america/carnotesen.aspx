<%@ Page Title="Cars" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <script src="/Scripts/App/cars-notes-en.min.js?v=4.5"></script>
    <link href="/Scripts/select2/select2.min.css?v=1.5" rel="stylesheet" />
    <style>
        #main-content {
            margin-right: 0;
        }

        #notifications .ace-file-input {
            float: left;
            max-width: 50px;
        }

        .btn.btn-app.btn-mini > [class*=icon] {
            font-size: 20px;
            line-height: 15px;
        }

        #notifications .form-actions textarea, #notifications .ace-file-input {
            margin-right: 15px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li class="active">Cars & Notes</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>Cars & Notes
            </h1>
        </div>
        <div class="row-fluid">
            <div class="form-horizontal">
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="shipper"><span>Shipper</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input id="shipper" name="shipper" class="form-control select2" data-fn-name="Shippers_GetNames" type="text" data-placeholder="Select shipper" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="ChassisN"><span>Search by</span></label>
                        <div class="controls">
                            <div class="span12">
                                <input type="text" id="ChassisN" class="form-control" placeholder="LOT - VIN" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <div class="span12">
                                <label class="inline">
                                    <input type="checkbox" id="CarTitleAmrica" />
                                    <span class="lbl">&nbsp;Delayed Titles</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="span4">
                    <div class="control-group">
                        <label class="control-label" for="BuyerID">Buyer</label>
                        <div class="controls">
                            <div class="span12">
                                <input id="BuyerID" name="BuyerID" class="form-control select2" data-fn-name="Buyers_GetNames" type="text" data-placeholder="Select buyer" />
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="Title1">Title</label>
                        <div class="controls">
                            <div class="span12">
                                <span class="inline">
                                    <input type="radio" id="Title1" name="Title" value="1" />
                                    <label for="Title1" class="lbl">Yes</label>
                                    <input type="radio" id="Title2" name="Title" value="0" />
                                    <label for="Title2" class="lbl">No</label>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <button type="submit" tabindex="4" id="btnSearchAll" class="btn btn-success btn-mini">
                                <i class="icon-search"></i>
                                Search</button>
                        </div>
                    </div>
                </div>
                <div class="span2">
                    <div class="alert alert-warning text-center" data-rel="tooltip" title="You have new notes">
                        <strong>Unread Messages:</strong>
                        <strong><a class="red" id="NewCarNotesCount" href="javascript:void(0);">0</a></strong>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                Cars & Notes
            </div>
            <table id="listItems" class="table table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th>Shipper</th>
                        <th width="59" title="Car ID">#</th>
                        <th width="59" class="hidden-phone hidden-480">Photo</th>
                        <th width="90" class="hidden-phone hidden-480">Date</th>
                        <th>Model</th>
                        <th class="hidden-phone">LOT</th>
                        <th class="hidden-phone hidden-480">VIN</th>
                        <th>City</th>
                        <th class="hidden-phone">Buyer</th>
                        <th>Destination</th>
                        <th width="30" title="Title Received">Title</th>
                        <th class="hidden-print" width="100px">Notes</th>
                    </tr>
                </thead>
            </table>
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
                    <button type="button" class="btn btn-mini pull-right" data-dismiss="modal" title="Hide panel"><i class="icon-remove"></i></button>
                </div>
                <div class="row-fluid hidden" id="frmAddNote">
                    <form id="aspnetForm">
                        <div class="span10">
                            <textarea id="txtNote" class="form-control" placeholder="Write a note..." rows="2" cols="6" style="width: 85%"></textarea>
                            <div class="pull-right btn-group btn-group-vertical" style="width: 50px">
                                <button class="btn btn-success btn-mini" type="submit" id="bntSendNote">Send&nbsp;&nbsp;</button>
                                <button class="btn btn-default btn-mini" id="btnCancelRepaying" type="button">Cancel</button>
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
    <script src="/Scripts/select2/select2.min.js?v=1.5"></script>
    <script>pageManager.Init();</script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=2.6"></script>
    <input type="hidden" name="shipperToCheck" value="" />
    <input type="hidden" name="distToCheck" value="" />
    <link href="america/notes.min.css" rel="stylesheet" />
</asp:Content>
