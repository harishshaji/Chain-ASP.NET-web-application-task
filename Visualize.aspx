<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Visualize.aspx.cs" Inherits="MobileCompany._Default"%>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">  
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/6.6.2/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.12/crossfilter.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dc/4.2.0/dc.min.js"></script>
           <center> <h2 class="display-1">Sales History</h2> </center>
    <link href="visualizeStyle.css" rel="stylesheet" />
    <%--<script src="Scripts/EditGrid.js"></script>--%>
    <div id="content">
        <div id="chart"></div>
        <div id="filterBox">
            <div id="osFilter" class="selectMenu"></div>         
            <div id="countryFilter" class="selectMenu"></div>
            <div id="paymentFilter" class="selectMenu"></div>
            <div id="priceFilter" class="selectMenu"></div>
        </div>
    </div>
    <%--<script>
        $(document).ready(function () {
            $.ajax({
                type: "POST",
                url: "Visualize.aspx/GetChartData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (jsonData) {
                    var sqlData = JSON.parse(jsonData.d);
                    console.log(sqlData);
                    var crossfilterInstance = crossfilter(sqlData);
                    var nameDim = crossfilterInstance.dimension(function (currentName) { return currentName.Name; });
                    var salesGroup = nameDim.group().reduceSum(function (currentQty) { return currentQty.Sales_quantity; });
                    var chart = dc.barChart("#chart");
                    chart
                        .width(950)
                        .height(470)
                        .barPadding(0.1)
                        .colors(['#525FE1'])
                        .x(d3.scaleBand())
                        .xUnits(dc.units.ordinal)
                        .yAxisLabel("Sales Quantity")
                        .xAxisLabel("Mobile Names")
                        .dimension(nameDim)
                        .group(salesGroup);
                    //OS version Filter
                    var osSelect = dc.selectMenu("#osFilter").promptText("Operating System").multiple(true);
                    var osDim = crossfilterInstance.dimension(function (currentGender) { return currentGender.OS_version; });
                    var osGroup = osDim.group().reduceSum(function (currentQty) { return currentQty.Sales_quantity; });
                    osSelect
                        .dimension(osDim)
                        .group(osGroup)
                        .title(function (currentValue) { return currentValue.key; });
                    osSelect.on("filtered", function () {
                        var osFilter = osSelect.filters()[0];
                        if (osFilter !== undefined) {
                            chart.filterAll();
                        }
                        dc.redrawAll();
                    });
                    //Country Filter
                    var countrySelect = dc.selectMenu("#countryFilter").promptText("Country").multiple(true);
                    var countryDim = crossfilterInstance.dimension(function (currentCountry) { return currentCountry.country_name; });
                    var countryGroup = countryDim.group().reduceSum(function (currentQty) { return currentQty.Sales_quantity; });
                    countrySelect
                        .dimension(countryDim)
                        .group(countryGroup)
                        .title(function (currentValue) { return currentValue.key; });
                    countrySelect.on("filtered", function () {
                        var countryFilter = countrySelect.filters()[0];
                        if (countryFilter !== undefined) {
                            chart.filterAll();
                        }
                        dc.redrawAll();
                    });
                    //Payment Type Filter
                    var paymentSelect = dc.selectMenu("#paymentFilter").promptText("Payment Type").multiple(true);
                    var paymentDim = crossfilterInstance.dimension(function (currentType) { return currentType.Payment_type; });
                    var paymentGroup = paymentDim.group().reduceSum(function (currentQty) { return currentQty.Sales_quantity; });
                    paymentSelect
                        .dimension(paymentDim)
                        .group(paymentGroup)
                        .title(function (currentValue) { return currentValue.key; });
                    paymentSelect.on("filtered", function () {
                        var paymentFilter = paymentSelect.filters()[0];
                        if (paymentFilter !== undefined) {
                            chart.filterAll();
                        }
                        dc.redrawAll();
                    });
                    //Price Filter
                    var priceSelect = dc.selectMenu("#priceFilter")
                        .promptText("Price")
                        .multiple(true)
                        .options(["Under Rs.15000", "Over Rs.15000"]);
                    var priceDim = crossfilterInstance.dimension(function (currentPrice) {
                        if (currentPrice.Price < 15000) {
                            return "Under Rs.15000";
                        } else {
                            return "Over Rs.15000";
                        }
                    });
                    var priceGroup = priceDim.group().reduceSum(function (currentQty) { return currentQty.Sales_quantity; });
                    priceSelect
                        .dimension(priceDim)
                        .group(priceGroup)
                        .title(function (currentValue) { return currentValue.key; });
                    priceSelect.on("filtered", function () {
                        var priceFilter = priceSelect.filters()[0];
                        if (priceFilter !== undefined) {
                            chart.filterAll();
                        }
                        dc.redrawAll();
                    });
                    dc.renderAll();
                },
                error: function (xhr) {
                    console.log(xhr.responseText);
                }
            });
        });
    </script>--%>
    <script src="Visualize.js"></script>
</asp:Content>
