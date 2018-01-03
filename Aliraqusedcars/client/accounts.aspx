<%@ Page Title="حسابات العميل الفرعية" Language="C#" MasterPageFile="~/client/Client.master" AutoEventWireup="true" CodeFile="accounts.aspx.cs" Inherits="client_accounts" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentMain" runat="Server">
    <div class="row">
        <div class="col-sm-12">
            <h1 class="page-header">حسابات العميل الفرعية
            </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            <blockquote class="blockquote-info">
                <h3>مرحبا بك فى حسابك على موقع شركة العراق</h3>
                <p>
                    يرجي اختيار حساب من حساباتك التالية لعرض الرصيد والسيارات الموجودة به.
                </p>
            </blockquote>
        </div>
    </div>
    <div class="space-50"></div>
    <div class="row acc-list"></div>
    <script src="/Scripts/client/accounts.min.js"></script>
</asp:Content>
