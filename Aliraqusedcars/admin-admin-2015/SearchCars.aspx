<%@ Page Title="نتيجة بحث السيارات" Language="C#" MasterPageFile="~/admin-admin-2015/master.master" AutoEventWireup="true" CodeFile="SearchCars.aspx.cs" Inherits="admin_admin_2015_CarSearchResult" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="breadcrumbs" class="hidden-print">
        <ul class="breadcrumb">
            <li><i class="icon-home"></i><a href="Home.aspx">الرئيسية</a> <span class="divider">
                <i class="icon-angle-left"></i></span></li>
            <li class="active">نتيجة بحث السيارات</li>
        </ul>
    </div>
    <div id="page-content" class="clearfix">
        <div class="page-header position-relative">
            <h1>نتيجة بحث السيارات</h1>
        </div>
        <div class="row-fluid">
            <form id="aspnetForm">
                <div class="form-horizontal">
                    <div class="offset3 span6">
                        <div class="control-group">
                            <label class="control-label">بحــث</label>
                            <div class="controls">
                                <select tabindex="0" id="searchType" class="form-control">
                                    <option value="CarID">برقم السيارة</option>
                                    <option value="LotNo">برقم اللوت</option>
                                    <option value="ChassisNo">برقم الشاصي</option>
                                </select>
                                <input tabindex="1" type="text" id="SearchKey" placeholder="ادخل رقم السيارة" class="form-control" />
                                <button type="submit" tabindex="2" id="SearchAll" class="btn btn-info btn-mini btn-search"><i class="icon-search"></i>&nbsp;بحـــث</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="row-fluid">
            <div class="table-header">
                عـــــــرض نتيجة بحث السيارات
            </div>
            <table id="listItems" class="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th width="57" title="رقم السيارة">#
                        </th>
                        <th width="50">صورة
                        </th>
                        <th>نوع السيارة
                        </th>
                        <th width="80">سعر الشراء <sub>$</sub></th>
                        <th>الباير
                        </th>
                        <th width="80">مكان السيارة
                        </th>
                        <th>خيارات</th>
                    </tr>
                </thead>
            </table>
            <script src="/Scripts/app/CarsSearchResult.min.js?v=1.3"></script>
        </div>
    </div>
    <style>
        .main-img img {
            height: 50px;
        }

        td .btn-mini {
            margin-left: 5px;
        }
    </style>
</asp:Content>
