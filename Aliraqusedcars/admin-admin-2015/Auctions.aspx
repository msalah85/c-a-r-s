<%@ Page Title=" شركة العراق - المزادات" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" ViewStateMode="Disabled" EnableViewState="false"
    AutoEventWireup="true" CodeFile="Auctions.aspx.cs" Inherits="ETA_Auctions" %>

<%@ OutputCache Duration="60" VaryByParam="None" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li><a href="#">أســــاسيــــات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">المزادات</li>
        </ul>
        <!--.breadcrumb-->
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>إدارة المزادات</h1>
        </div>
        <!--/.page-header-->
        <div class="row-fulid">
            <div class="table-header">
                عرض المزادات <a data-toggle="tooltip" id="divAddEdit" title="اضافة جديد" data-dismiss="modal"
                    aria-hidden="true" class="pull-left icon-animated-vertical btn-add">
                    <img src="/App_Themes/iraq/images/add-new.png" alt="جديد" /></a>
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="30px">م
                        </th>
                        <th>اسم المزاد
                        </th>
                        <th>Auction
                        </th>
                        <th width="10%">خيارات
                        </th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <!-- Edit Template -->
            <div id="AuctionModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                aria-hidden="true">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        ×</button>
                    <h3 id="editModalLabel">
                        <i class="icon-edit"></i>
                    </h3>
                </div>
                <div class="modal-body">
                    <form id="aspnetForm">
                        <fieldset id="formMain" class="form-horizontal">
                            <div class="">
                                <label>
                                </label>
                                <div class="controls">
                                    <input type="hidden" value="0" id="AuctionID" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtAuctionAr">اسم المزاد:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <input type="text" id="txtAuctionAr" class="required" name="Sdstatic" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="txtAuctionEn">Auction:<span title='حقل إجبارى' class="text-error">*</span></label>
                                <div class="controls">
                                    <input type="text" id="txtAuctionEn" class="required" name="Sdsldtatic" />
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
                    <button class="btn" data-dismiss="modal" aria-hidden="true">
                        إلغاء</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/Scripts/App/AuctionsManager.min.js?v=1.0"></script>
    <script type="text/javascript">
        AuctionsManager.Init();
    </script>
</asp:Content>
