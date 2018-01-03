<%@ Page Title="قروض الموظفين" Language="C#" EnableSessionState="ReadOnly" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <script src="/Scripts/hr/gridManager.min.js?v=1.8"></script>
    <script src="/Scripts/hr/emps-loans.min.js?v=1.1"></script>
    <div id="breadcrumbs">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider"><i class="icon-angle-left"></i></span></li>
            <li class="active">قروض الموظفين</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>تقرير قروض الموظفين
            </h1>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                قروض الموظفين
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover" width="100%">
                <thead>
                    <tr>
                        <th width="70">#</th>
                        <th>الاسم</th>
                        <th>رصيد القروض <sub>درهم</sub></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><span class="pull-left">الاجمالى:</span></td>
                        <td class="loans-total bolder"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
    <script>DefaultGridManager.fillItemsDataTable(undefined, footerTotal); DefaultGridManager.Init();</script>
</asp:Content>
