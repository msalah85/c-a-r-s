var dashboardManager = function () {

    var
        names = [],
        values = [],
        $shipperExpChartId = '#shippers-charts',
        $shipperExpChart = $($shipperExpChartId),
        init = function () {
            loadChartData();
        },
        parseJsonDate = function parseJsonDate(jsonDateString) {
            var _dte = new Date(parseInt(jsonDateString)),
                monthIndex = _dte.getMonth() + 1,
                year = _dte.getFullYear();

            return monthIndex + '-' + year;
        },
        bindChartData = function (data) {
            var dAll = commonManger.comp2json(data.d),
                list = dAll.list;

            //save json
            $shipperExpChart.data('chart-main-data', JSON.stringify(list));

            enhanceData(list);
        },
        enhanceData = function (list, expenseType) {
            // expenseType => 'loading' || 'of';
            // set date format
            var monthYear = $('.YearMonth').val(),

                // grouped data
                groupedData = _.groupBy(list, 'ShipCompanyNameEn'),
                _dtaBarChart = [], _dataPieCountChart = [];

            // enhanced children data
            $.each(groupedData, function (key, item) {
                _dtaBarChart.push({
                    label: key, data: $.map(item, function (v, i) {
                        var subData = [];
                        //subData.push([moment(v.InvYear + '-' + v.InvMonth, 'YYYY-MM').valueOf(), v.LoadAvg]);
                        subData.push([
                            //(monthYear === 'year' ? v.InvYear : moment(v.InvMonth + '/' + v.InvYear, 'MM/YYYY').valueOf()),
                            moment((v.InvMonth || 1) + '/' + v.InvYear, 'MM/YYYY').valueOf(),
                            (expenseType === 'of' ? v.ShipAvg : v.LoadAvg)
                        ]);
                        return subData;
                    })
                });

                // format data for pie chart
                _dataPieCountChart.push({
                    label: key, data: item.reduce(function (sum, itm) {
                        return (sum * 1) + (itm.InvCount * 1);
                    }, 0)
                });
            });


            $shipperExpChart.data('json', _dtaBarChart);
            poltChart();


            // draw pie chart            
            drawPieChart(_dataPieCountChart)
        },
        poltChart = function () {
            var sales_charts = $shipperExpChart.css({ 'width': '100%', 'height': '270px' }),
                data = $shipperExpChart.data('json'),
                xAxisFormat = $('.YearMonth').val(),
                drawChart = function (chartData) {
                    ////////////////////////////////////////////////////////
                    $.plot($shipperExpChartId, chartData, {
                        shadowSize: 0,
                        series: {
                            lines: { show: true },
                            points: { show: true },
                            label: { show: true }
                        },
                        legend: {
                            noColumns: 4,
                            position: "se", //
                            margin: [0, -99]
                        },
                        xaxes: [{
                            mode: "time",
                            //tickDecimals: 0,
                            minTickSize: [1, xAxisFormat ? xAxisFormat : "month"]
                        }], // year
                        //xaxis: { tickDecimals: 0 }, //for year mode
                        grid: {
                            backgroundColor: { colors: ["#fff", "#fff"] },
                            borderWidth: 1,
                            borderColor: '#d9d9d9',
                            clickable: true,
                            hoverable: true
                        },
                        selection: {
                            mode: "x"
                        }
                    });
                    ////////////////////////////////////////////////////////
                };


            //==============================================================================
            var i = 0;
            $.each(data, function (key, val) {
                val.color = i;
                ++i;
            });

            // insert checkboxes 
            var choiceContainer = $("#choices");
            choiceContainer.html(''); // reset
            $.each(data, function (key, val) {
                choiceContainer.append(`<label for='id${key}' class="inline">
                                                <input type='checkbox' name='${key}' ${(key < 3 ? 'checked' : '')} id='id${key}' />
                                                <span class="lbl">${val.label}</span></label>`);
            });


            choiceContainer.find("input").click(plotAccordingToChoices);
            function plotAccordingToChoices() {
                var _data = [];
                choiceContainer.find("input:checked").each(function () {
                    var key = $(this).attr("name");
                    if (key && data[key]) {
                        _data.push(data[key]);
                    }
                });

                if (_data.length > 0) {
                    drawChart(_data);
                }
            }

            plotAccordingToChoices();
            //==============================================================================

            chartEvents();
        },
        chartEvents = function () {
            // hover on the graph
            var $tooltip = $("<div class='tooltip top in hide'><div class='tooltip-inner'></div></div>").appendTo('body'),
                previousPoint = null,
                $year = $('.Year'),
                $yearMonthType = $('.YearMonth');

            // expense type (Shipping exp, Loading exp)
            $('.ExpTypes').change(function () {
                var _this = $(this),
                    expenseType = _this.val(),
                    mainDta = $shipperExpChart.data('chart-main-data');

                mainDta = mainDta.length ? JSON.parse(mainDta) : [];
                enhanceData(mainDta, expenseType);
            });


            $yearMonthType.change(function () {
                var _this = $(this),

                    yearMonthType = _this.val();

                // reset
                $year.prop('disabled', true);
                names = values = [];

                if (yearMonthType === 'month') {
                    $year.prop('disabled', false);


                    names = ['ChartType', 'Year'];
                    values = [yearMonthType, $year.val()];
                }
                else { // year
                    names = ['ChartType'];
                    values = [yearMonthType];
                }

                loadChartData();

            });

            $year.change(function () {
                var _this = $(this),
                    yearNum = _this.val();

                if (yearNum * 1 > 0) {
                    names = ['ChartType', 'Year'];
                    values = [$yearMonthType.val(), $year.val()];
                }

                loadChartData();
            });


            $shipperExpChart.on('plothover', function (event, pos, item) {
                if (item) {
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    if (previousPoint != item.seriesIndex) {
                        previousPoint = item.seriesIndex;
                        x = x.split('.')[0];
                        x = parseJsonDate(x);
                        var tip = `${item.series.label} in: ${x} = ${y}$`;
                        $tooltip.show().children(0).text(tip);
                    }
                    $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
                } else {
                    $tooltip.hide();
                    previousPoint = null;
                }
            });//end tooltip                        

            // click event on the chart
            $shipperExpChart.bind("plotclick", function (event, pos, item) {

                if (item) {
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2),
                        x = x.split('.')[0],
                        x = parseJsonDate(x);
                    tip = `${item.series.label} in: ${x} = ${y}$`;

                    alert(tip);
                    //plot.highlight(item.series, item.datapoint);
                }
            }); // end click

            //Android's default browser somehow is confused when tapping on label which will lead to dragging the task
            //so disable dragging when clicking on label
            var agent = navigator.userAgent.toLowerCase();
            if ("ontouchstart" in document && /applewebkit/.test(agent) && /android/.test(agent))
                $('#tasks').on('touchstart', function (e) {
                    var li = $(e.target).closest('#tasks li');
                    if (li.length == 0) return;
                    var label = li.find('label.inline').get(0);
                    if (label == e.target || $.contains(label, e.target)) e.stopImmediatePropagation();
                });
        },
        loadChartData = function () {
            // get data
            var dto = { 'actionName': 'HomeShipperExpStatistics', 'names': names, 'values': values };
            dataService.callAjax('Post', JSON.stringify(dto), sUrl + 'GetDataList', bindChartData, commonManger.errorException);
        },
        labelFormatter = function (label, series) {
            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
        },
        drawPieChart = function (data) {

            var _pieId = '.shippers-counts-charts',                $pieChart = $(_pieId).css({ 'width': '100%', 'height': '350px' });
            $.plot(_pieId, data, {
                series: {
                    pie: {
                        tilt: 0.8,
                        highlight: {
                            opacity: 0.25
                        },
                        startAngle: 2,
                        innerRadius: 0.5,
                        show: true,
                        radius: 1,
                        stroke: {
                            color: '#fff',
                            width: 2
                        }
                    }
                },
                legend: {
                    show: true
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }
            });


            //events
            var $tooltip = $("<div class='tooltip top in hide'><div class='tooltip-inner'></div></div>").appendTo('body');
            var previousPoint = null;

            $pieChart.on('plothover', function (event, pos, item) {
                if (item) {
                    if (previousPoint != item.seriesIndex) {
                        previousPoint = item.seriesIndex;
                        var tip = item.series['label'] + " : " + parseFloat(item.series['percent']).toFixed(1) + '%  => #' + item.series.data[0][1];
                        $tooltip.show().children(0).text(tip);
                    }
                    $tooltip.css({ top: pos.pageY + 10, left: pos.pageX + 10 });
                } else {
                    $tooltip.hide();
                    previousPoint = null;
                }
            });

        };


    return {
        Init: init
    };

}();


dashboardManager.Init();