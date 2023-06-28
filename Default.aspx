<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="MobileCompany._Default"%>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link href="FirstPageStyle.css" rel="stylesheet" />
    <center>
        <img src="Images/Logo.png" style="height:120px; width:175px; align-content:center; margin-left:0px;" /><br />
        <h2>A2Z MOBILES</h2>
    </center>
    <div id="phoneImageCarousel" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#phoneImageCarousel"></li>
            <li data-target="#phoneImageCarousel" class="active"></li>
            <li data-target="#phoneImageCarousel"></li>
            <li data-target="#phoneImageCarousel"></li>
        </ol>
        <div class="carousel-inner">
            <div class="item">
                <img src="\Images\Iphone.jpg" alt="Slide 1" style="margin: 0 auto; width:1200px;height:450px;">
                <div class="carousel-caption">
                    <h3>Iphone</h3>
                </div>
            </div>
            <div class="item active">
                <img src="\Images\Pixel.jpg" alt="Slide 2" style="margin: 0 auto;width:1200px;height:450px;">
                <div class="carousel-caption">
                    <h3>Pixel</h3>
                </div>
            </div>
            <div class="item">
                <img src="\Images\s23.jpg" alt="Slide 3" style="margin: 0 auto;width:1200px;height:450px;">
                <div class="carousel-caption">
                    <h3>Samsung</h3>
                </div>
            </div>
            <div class="item">
                <img src="\Images\Realme.jpg" alt="Slide 3" style="margin: 0 auto;width:1200px;height:450px;">
                <div class="carousel-caption">
                    <h3>Realme</h3>
                </div>
            </div>
        </div>
        <a class="left carousel-control" href="#phoneImageCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#phoneImageCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <br>
      <p class="lead">We are one of the world's leading personal technology companies, producing innovative PCs and mobile internet devices. Now, #286 on fortune 500 list, ABC mobile is the world's largest PC vendor and fourth largest smartphone company.</p>
     <div class="button-container">
         <%--<a class="btn btn-primary mt-2" href ="FirstPage.aspx">Sales</a>--%>
    <button type="button" id="showCompanyData" class="button">Sales data &raquo;</button>
    <button type="button" id="Visualize" class="button">Visualize &raquo;</button>
 <%--<button type="button" id="Dashboard" class="btn btn-primary mt-2">PowerBI Dashboard</button>--%>
  </div>
    <div class="row">
        <center>
            <h3>Our Top Brands</h3>
        </center>
        <hr />
        <div class="col-md-4">
            <h2>iPhone</h2>
            <p>
                iPhone is a smartphone made by Apple that combines a computer, iPod, digital camera and cellular phone into one device with a touchscreen interface. The iPhone runs the iOS operating system, it offered up to 1 TB of storage
            </p>
            <p>
                <a class="btn btn-default" href="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjKt4aMnqb-AhWpkmYCHYZBDFwYABAAGgJzbQ&ohost=www.google.com&cid=CAASJeRopa90DEP9Q3Ca6huDiMYZ-S3K6pBRdxY_T9BMMOOvt0RC0jc&sig=AOD64_1QW-RS_SrZa9LyG7jgqrl6RhlDlw&q&adurl&ved=2ahUKEwi4gYCMnqb-AhXHV2wGHUl3A80Q0Qx6BAgIEAE">Learn More &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Samsung</h2>
            <p>
                Samsung Electronics is a South Korean multinational electronics company engaged in consumer electronics, information technology and mobile communications, and device solutions businesses worldwide.
            </p>
            <p>
                <a class="btn btn-default" href="https://www.google.com/aclk?sa=l&ai=DChcSEwie1Y2An6b-AhUbKbMAHUdvA-4YABAEGgJ5bQ&sig=AOD64_2OAiwumvl0tVRKTrGnYIjfDErnXA&q&adurl&ved=2ahUKEwjAx4OAn6b-AhWIEFkFHTxqBaoQ0Qx6BAgKEAE">Learn More &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Realme</h2>
            <p>
                Realme (stylized as realme) is a Chinese consumer electronics manufacturer based in Shenzhen, Guangdong. Starting originally as a sub-brand of Oppo, Realme eventually ventured as its own brand.
            </p>
            <p>
                <a class="btn btn-default" href="https://www.realme.com/in/">Learn More &raquo;</a>
            </p>
        </div>
    </div>
    <script src="DefaultScript.js"></script>
</asp:Content>
