var
    ProfitLossReport = function () {
        var
            Init = function () {
                getReport();
            },
            getReport = function (pkvalue) {
                var functionName = "ProfitLoss_Select", DTO = { 'actionName': functionName };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect',
                    bindReportControls, commonManger.errorException);
            },
            bindReportControls = function (data) {
                var jsnData = commonManger.comp2json(data.d), jsn = jsnData.list;

                if (jsn) {
                    var totalSales = jsn.TotalSalePrices ? jsn.TotalSalePrices * 1 : 0,
                        soldCarsCosts = jsn.SoldCarsCosts ? jsn.SoldCarsCosts * 1 : 0,
                        generalExps = jsn.GeneralExp ? jsn.GeneralExp * 1 : 0,
                        otherVouchers = jsn.OtherIncom ? jsn.OtherIncom * 1 : 0;

                    totalSales += jsn.Extras ? jsn.Extras * 1 : 0;
                    // totalSales -= (jsn.Discounts ? jsn.Discounts * 1 : 0); // تم اقتطاع اجمالى الخصومات فى التكلفة

                    $('.totalSales').text(numeral(totalSales).format('0,0'));
                    $('.otherVouchers').text(numeral(otherVouchers).format('0,0'));

                    totalSales += otherVouchers;
                    $('.totalIncome').text(numeral(totalSales).format('0,0'));

                    $('.totalCarsCosts').text(numeral(soldCarsCosts).format('0,0'));
                    $('.general-exp').text(numeral(generalExps).format('0,0'));


                    $('.totalProfit').text(numeral((totalSales - soldCarsCosts)).format('0,0'));
                    var _rofit = (totalSales - soldCarsCosts - generalExps);
                    $('.netProfit').text(numeral(_rofit).format('0,0'));
                    
                    $('#AddDate').text(commonManger.formatJSONDateCal(jsn.AddDate, 'dd/MM/yyyy'));
                }
            };

        return {
            Init: Init
        };
    }();