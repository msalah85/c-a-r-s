<%@ Page Title="تسجيل خصم مكتسب لعميل" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master"
    EnableEventValidation="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <link async href="/Scripts/select2/select2.min.css?v=1.2" rel="stylesheet" />
    <style>h1 .pink {text-decoration:underline;}</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيــسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li><a href="ClientBonusView.aspx">عرض الخصومات</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">خصم مكتسب لعميل</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1><span>اضافة</span> خصم مكتسب لعميل 
                <small class="pink"></small></h1>
        </div>
        <div class="row-fluid">
            <div class="message"></div>
            <form id="aspnetForm" autocomplete="off">
                <div class="form-horizontal">
                    <fieldset id="masterForm" data-operation="save" autocomplete="off">
                        <div class="span6">
                            <div class="control-group">
                                <label class="control-label" for="ClientID">العميل<span class="red">*</span></label>
                                <div class="controls">
                                    <input type="hidden" id="BonusID" value="0" />
                                    <input type="text" id="ClientID" name="ClientID" required class="required select2 form-control" data-fn-name="Clients_SelectNames3" />
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Amount"><span>المبلغ $</span><span class="red">*</span></label>
                                <div class="controls">
                                    <label>
                                        <input type="number" class="required" id="Amount" value="0" name="Amount" required="" autocomplete="off" />
                                    </label>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="AmountDhs"><span>المبلغ بالدرهم</span><span class="red">*</span></label>
                                <div class="controls">
                                    <label>
                                        <input type="text" class="required" readonly value="0" id="AmountDhs" name="AmountDhs" required autocomplete="off" />
                                    </label>
                                </div>
                            </div>
                            <div class="control-group">
                                <label class="control-label" for="Notes">السبب</label>
                                <div class="controls">
                                    <label>
                                        <textarea cols="2" rows="6" id="Notes"></textarea>
                                    </label>
                                </div>
                            </div>
                            <div class="control-group hidden">
                                <label class="control-label" for="Revised" data-rel="tooltip" title="✓ تعني اعتماد المبلغ فى رصيد العميل.">تمت المراجعة <i class="icon-info-sign"></i></label>
                                <div class="controls">
                                    <label class="alert alert-danger">
                                        <input type="checkbox" id="Revised" />
                                        <span class="lbl">نعم اعتمد المبلغ فى رصيد العميل.</span>
                                    </label>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="submit" id="SaveAll" class="btn btn-success" data-last="Finish"><i class="icon-save"></i>حفـــظ</button>
                                <a href="ClientBonusView.aspx" class="btn btn-grey btn-mini">عودة للخصومات <i class="icon-arrow-left"></i></a>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </form>
        </div>
    </div>
    <script src="/Scripts/select2/select2.min.js?v=1.3"></script>
    <script src="/Scripts/select2/select2-optinal.min.js?v=1.3"></script>
    <script src="/Scripts/app/ClientsBonusAdd.min.js?v=2.8"></script>
    <script>pageManager.Init();</script>
</asp:Content>