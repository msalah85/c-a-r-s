<%@ Page Language="C#" AutoEventWireup="true" CodeFile="InvoicePrint.aspx.cs" Inherits="InvoicePrint" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>طباعة فاتورة البيع</title>
    <script>window.print(); </script>
    <link href="//fonts.googleapis.com/earlyaccess/droidarabickufi.css" rel="stylesheet" />
    <link href="/App_Themes/iraq/allcss.min.css" id="appStyles" rel="stylesheet" />
    <script src="/Scripts/jquery-1.10.2.min.js"></script>
    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/jquery.ui.touch-punch.min.js"></script>
    <script src="Scripts/jquery-ui.1.10.3.min.js"></script>
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
    <!--[if lt IE 9]>
        <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--[if IE]><script src="/Scripts/excanvas.min.js"></script><![endif]-->
</head>
<body>
    <div class="container">
        <div class="row-fluid">
            <div class="span10 offset1">
                <a href="/" title="الرئيسية">
                    <img alt="" class="img-print" src="/Content/images/print/print-header.png" /></a>
                <div class="row">
                    <div class="span6">
                        <h2 style="margin: 46px 84px 0 0">فاتورة بيع سيارة</h2>
                        <h3 style="margin: 0 84px 0 0" id="divCanceled" class="red" runat="server"></h3>
                    </div>
                    <div class="span6 well">
                        <table class="invoice-head" width="100%">
                            <tbody>
                                <tr>
                                    <td width="20%"><strong># الفـــاتـــــورة:</strong></td>
                                    <td id="divInvoiceNo" runat="server"></td>
                                </tr>
                                <tr>
                                    <td><strong>تاريخ الفاتورة:</strong></td>
                                    <td id="toDay" runat="server"></td>
                                </tr>
                                <tr>
                                    <td><strong>العمــــــــــــــــــــيل:</strong></td>
                                    <td>
                                        <span id="clientAccount" runat="server"></span>
                                        <a class="printme hidden-print pull-left" href="javascript:void(0);"><i class="icon-print bigger-150"></i></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="space-6"></div>
                <div class="row">
                    <div class="span6 well invoice-body">
                        <table class="table car-info">
                            <tbody>
                                <tr>
                                    <td width="39%">نوع السيارة</td>
                                    <td><span runat="server" id="divModel"></span></td>
                                </tr>
                                <tr>
                                    <td>سنة الصنع</td>
                                    <td><span runat="server" id="divYear"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم السيارة</td>
                                    <td><span runat="server" id="CarID"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم اللوت</td>
                                    <td><span runat="server" id="divLotNo"></span></td>
                                </tr>
                                <tr>
                                    <td>رقم الشاسية</td>
                                    <td><span runat="server" id="divChassis"></span></td>
                                </tr>
                                <tr>
                                    <td>حالة السيارة</td>
                                    <td><span runat="server" id="divStatus"></span></td>
                                </tr>
                                <tr>
                                    <td>اللون</td>
                                    <td><span runat="server" id="divColor"></span></td>
                                </tr>
                                <tr>
                                    <td>الجير</td>
                                    <td><span runat="server" id="DivGear"></span></td>
                                </tr>
                                <tr>
                                    <td>تاريخ الوصول</td>
                                    <td><span runat="server" id="divArriveDate"></span></td>
                                </tr>
                                <tr>
                                    <td>ملاحظات</td>
                                    <td><span runat="server" id="divNotes"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="span6 well invoice-body no-border">
                        <div class="row-fluid" runat="server" id="imagesThumb">
                            <ul class="ace-thumbnails">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="span6">
                        <div class="row-fluid">
                            <!--price box-->
                            <div class="span12 well invoice-thank alert">
                                <strong class="text-warning">سعر البيع:</strong>
                                <span id="divPrice" runat="server"></span>$
                            </div>
                        </div>
                    </div>
                    <div class="span6 well invoice-thank alert">
                        <strong>توقيع العميل/</strong>
                        <div class="widget-box" id="client-signature" title="توقيع العميل">
                            <div id="sig" title="توقيع العميل"></div>
                        </div>
                        <div class="delete-wpr hidden">
                            <div class="btn-group hidden-print">
                                <a id="clear" class="btn btn-warning btn-small" href="javascript:;">إعادة التوقيع</a>
                            </div>
                        </div>
                        <!--end signature board-->
                    </div>
                </div>
                <!--print footer-->
                <img alt="" class="print-footer" src="/Content/images/print/print-footer.png" />
                <!--end printed footer-->
            </div>
            <!--save client signature-->
            <button type="submit" id="SaveSignature" class="btn btn-info hidden hidden-print pull-left" title="حفـــظ">حفظ توقيع العميل</button>
        </div>
    </div>
    <style>
        .container {
            background: #fff;
            padding: 10px;
        }

        body, body:before {
            background: #525659;
        }

        .form-actions {
            margin: 0;
            padding: 9px 17px 9px;
        }

        .invoice-body.well {
            padding: 0;
        }

        #client-signature, .kbw-signature {
            min-height: 188px;
            overflow: hidden;
        }

            .kbw-signature canvas {
                width: 100%;
            }

        .widget-main.padding-6 {
            padding-bottom: 2px;
        }

        .bigger-150 {
            font-size: 25px;
        }

        .thumbnail {
            border: none;
        }

        .invoice-body table {
            margin-bottom: 0;
        }

            .invoice-body table tr:first-child td {
                border-top: 0;
            }

            .invoice-body table tr td {
                padding: 6pt;
            }

        .invoice-head td {
            padding: 1px 8px;
        }

        .stickyFooter input {
            border: 1px solid red;
        }

        input[type=text].form-control {
            height: 27px;
        }

        @media (max-width: 767px) {
            .row-fluid .span6 {
                display: block;
                float: right;
                width: 49%;
                margin-right: 10px;
            }

            .ace-thumbnails li {
                width: 47%;
            }

                .ace-thumbnails li img {
                    width: 100%;
                    height: auto;
                }
        }

        @media print {
            body, body:before {
                background: #fff !important;
            }

            #sig svg {
                max-height: 200px;
                width: 500px;
            }

            .print-footer {
                bottom: 5px;
                right: 0;
                position: fixed;
                display: block;
            }
        }
    </style>

    <script src="/admin-admin-2015/signature/js/jquery.signature.min.js"></script>
    <script src="/admin-admin-2015/signature/js/canvg.min.js"></script>
    <script>
        var renderSVG = function (svg, width, height) {
            document.createElement('canvas')
            var c = document.createElement('canvas');
            c.width = width || 500;
            c.height = height || 500;
            document.getElementById('sig').innerHTML = '';
            document.getElementById('sig').appendChild(c);
            if (typeof FlashCanvas != "undefined") {
                FlashCanvas.initElement(c);
            }
            canvg(c, svg, {
                log: true, renderCallback: function (dom) {
                    if (typeof FlashCanvas != "undefined") {
                        document.getElementById('sig').innerHTML = 'svg not supported';
                    } else {
                        var svg = (new XMLSerializer()).serializeToString(dom);
                        document.getElementById('sig').innerHTML = svg;
                    }
                }
            });
            $('#SaveSignature,#clear').addClass('hidden');
        };
        $('.printme').click(function () {
            window.print();
        });
    </script>
    <asp:Literal ID="Label1" runat="server" />
</body>
</html>
