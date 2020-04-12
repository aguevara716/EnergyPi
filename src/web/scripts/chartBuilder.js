function populateDataPoints(results, graphType) {
    var dataPoints = [];
    if (graphType === "raw") {
        results.forEach(element => {
            dataPoints.push({ x: new Date(element.Timestamp), y: element.Delta });
        });
    }
    else if (graphType === "hourly") {
        results.forEach(element => {
            dataPoints.push({ x: new Date(element.Timestamp), y: element.kWh });
        });
    }
    else if (graphType === "tou") {
        results.forEach(element => {
            dataPoints.push({ x: new Date(element.Timestamp), y: element.kWh });
        });
    }

    return dataPoints;
}

function buildEnergyChart(divId, chartTitle, xAxisTitle, yAxisTitle, data) {
    var chart = new CanvasJS.Chart(divId, {
        title: {
            text: chartTitle
        },
        axisX: {
            includeZero: false,
            title: xAxisTitle,
            gridThickness: 1
        },
        axisY: {
            includeZero: true,
            title: yAxisTitle,
            gridThickness: 1
        },
        data: [
            {
                type: "line",
                xValueFormatString: "HH:mm",
                yValueFormatString: "##.## kWh",
                dataPoints: data
            }
        ]
    });
    return chart;
}

function buildWeatherChart(divId, chartTitle, xAxisTitle, yAxisTitle, data) {
    var chart = new CanvasJS.Chart(divId, {
        title: {
            text: chartTitle
        },
        axisX: {
            includeZero: false,
            title: xAxisTitle,
            gridThickness: 1
        },
        axisY: {
            includeZero: true,
            title: yAxisTitle,
            gridThickness: 1
        },
        data: [
            {
                type: "line",
                xValueFormatString: "HH:mm",
                yValueFormatString: "#.## °F",
                dataPoints: data
            }
        ]
    });
    return chart;
}
