var
    BudgetReport = function () {
        var
            Init = function () {
                getReport();
                pageEvents();
            },
            pageEvents = function () {
                $('#btnSaveBudjet').click(function (e) {
                    e.preventDefault();

                    var
                        elm = {
                            date: commonManger.formatJSONDateCal(new Date(), 'MM/dd/yyyy'),

                            bank: $('.bank-balance').text(),
                            cars: $('.comp-cars-costs').text(),
                            clients: $('.clients-required').text(),
                            inTotal: $('.total-required').text(),

                            shipp: $('.waiting-shipp').text(),
                            cust: $('.waiting-cust').text(),
                            outTotal: $('.total-waiting-inv').text(),

                            net: $('.total-budget').text()
                        };

                    // 
                    var dto = {
                        actionName: 'Budgets_Save', names: ['Date', 'Bank', 'Cars', 'Clients', 'InTotal', 'Shipp', 'Cust', 'OutTotal', 'Net'],
                        values: [elm.date, elm.bank, elm.cars, elm.clients, elm.inTotal, elm.shipp, elm.cust, elm.outTotal, elm.net]
                    };


                    dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'saveData', saveCallBack, commonManger.errorException);

                });
            },
            saveCallBack = function (d) {
                console.log(d.d);

                commonManger.showMessage('تم الحفظ:', 'تم أخذ نسخه من تقرير رأس المال الحالى.');
            },
            getReport = function () {
                var DTO = { actionName: 'Budget_Select' };
                dataService.callAjax('Post', JSON.stringify(DTO), sUrl + 'GetDataDirect', bindReportControls, commonManger.errorException);
            },
            bindReportControls = function (data) {
                var jsnData = commonManger.comp2json(data.d),
                    jsn = jsnData.list,    // Client`s required & Cars costs.
                    //jsn = jsnData.list1,  // Shipping (loading-shipping - towing - partitioning - transportation costs), (pending shipping invoices -- BOL invoices), (Costs on sold cars not setted on shipping invoice).
                    //jsn = jsnData.list2,  // Postpond or not paid shipping invoices, (Custom invoices not paid or pending).
                    //jsn = jsnData.list3,  // Emps, Ouside Loans statistics

                    totalRequired = 0,
                    totalWatingShipp = 0,
                    totalWatingCust = 0,
                    totalWaitingInv = 0;


                //
                if (jsn) {

                    $('#AddDate').text(commonManger.formatJSONDateCal(jsn.AddDate, 'dd/MM/yyyy'));

                    var
                        currentBankBalance = jsn.CurrentBankBalance ? jsn.CurrentBankBalance * 1 : 0,
                        clientsCarsPayPricesNotSold = jsn.ClientsCarsPayPricesNotSold ? (jsn.ClientsCarsPayPricesNotSold * 1) : 0,
                        IraqCarCost = jsn.IraqCarCost ? (jsn.IraqCarCost * 1) : 0,


                        clRequired = jsn.ClientsRequired ? jsn.ClientsRequired * 1 : 0,
                        totalRequired = currentBankBalance + clRequired + IraqCarCost + clientsCarsPayPricesNotSold;

                    $('.bank-balance').text(numeral(currentBankBalance).format('0,0'));
                    $('.clients-required').text(numeral(clRequired).format('0,0'));
                    $('.comp-cars-costs').text(numeral(IraqCarCost + clientsCarsPayPricesNotSold).format('0,0'));

                    showHiddenBtns(true);

                    var WaitingShippInvoices = jsn.WaitingShippInvoicesToPay ? jsn.WaitingShippInvoicesToPay * 1 : 0,
                        CarsCostsWaitingToShipp = jsn.CarsCostsWaitingToShipp ? jsn.CarsCostsWaitingToShipp * 1 : 0,
                        totalWatingShipp = WaitingShippInvoices + CarsCostsWaitingToShipp;

                    $('.waiting-shipp').text(numeral(totalWatingShipp).format('0,0'));

                    WaitingCustomInvoices = jsn.WaitingCustomInvoices ? (jsn.WaitingCustomInvoices * 1) : 0,
                        WaitingCustInvToPay = jsn.WaitingCustInvToPay ? (jsn.WaitingCustInvToPay * 1) : 0,
                        totalWatingCust = WaitingCustomInvoices + WaitingCustInvToPay;

                    $('.waiting-cust').text(numeral(totalWatingCust).format('0,0'));


                    // loans

                    var outsideReceivable = jsn.AdvOutsideReceivable * 1,
                        outsideCreditor = jsn.AdvOutsideCreditor * 1,
                        usersReceivable = jsn.AdvUsersReceivable * 1;


                    totalRequired += (outsideReceivable + usersReceivable);
                    totalWaitingInv = outsideCreditor;

                    $('.AdvOutsideReceivable').text(numeral(outsideReceivable).format('0,0'));
                    $('.AdvOutsideCreditor').text(numeral(outsideCreditor).format('0,0'));
                    $('.AdvUsersReceivable').text(numeral(usersReceivable).format('0,0'));
                }



                // total receivable.
                $('.total-required').text(numeral(totalRequired).format('0,0'));


                totalWaitingInv += totalWatingShipp + totalWatingCust;
                $('.total-waiting-inv').text(numeral(totalWaitingInv).format('0,0'));


                // total incom - outcome
                $('.total-budget').text(numeral(totalRequired - totalWaitingInv).format('0,0'));
            },
            showHiddenBtns = function (show) {
                if (show)
                    $('.btns').removeClass('hidden');
            };


        return {
            Init: Init
        };

    }();