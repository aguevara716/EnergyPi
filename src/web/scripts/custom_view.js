$(document).ready(function() {
    console.log("Ready");
    
    $("#submit-btn").on("click", function() {
        let tableName = $("#table-name").val();
        let startDate = $("#start-date").val();
        let endDate = $("#end-date").val();

        console.log("button clicked w/ params: V=" + tableName + ", S: " + startDate + ", E: " + endDate);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                view: tableName,
                startDate: startDate,
                endDate: endDate
            }),
            url: "/getCustomViewData",
            success: function(result) {
                console.log(JSON.stringify(result));

                var dataPoints = [];
                result.forEach(element => {
                    dataPoints.push({ x: new Date(element.Timestamp), y: element.Delta });
                });
                var chart = buildEnergyChart("custom-chart",
                                             `Data from ${startDate} to ${endDate}`,
                                             "Timestamp",
                                             "kWh",
                                             dataPoints);
                chart.render();
            }
        })
    });
    
});