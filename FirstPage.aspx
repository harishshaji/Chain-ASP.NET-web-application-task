<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FirstPage.aspx.cs" Inherits="MobileCompany.FirstPage" MasterPageFile="~/Site.Master" %>
<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="https://unpkg.com/xlsx@0.15.1/dist/xlsx.full.min.js"></script>
<%--    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"></script>--%>
    <link href="FirstPageStyle.css" rel="stylesheet" />
    <div class="container">
        <h2 class="text-center mt-4 mb-4">Sales Details</h2>
        <br>
        <br>
        <div class="custom-card">
            <label for="excelFile" class="custom-file-label">Select Excel File</label>
            <input type="file" id="excelFile" class="custom-file-input">
        </div>
    </div>
    <%--<script>
        var sheet_data;
        const excelFile = document.getElementById('excelFile');
        excelFile.addEventListener('change', (event) => {
            if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
                document.getElementById('excelData').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are only allowed</div>';
                excelFile.value = '';
                return false;
            }
            var reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onload = function () {
                var data = new Uint8Array(reader.result);
                var workBook = XLSX.read(data, { type: 'array' });
                var sheetName = workBook.SheetNames;
                sheetData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName[0]], { header: 1});
                if (sheetData.length > 0) {
                    document.getElementById('buttonBox').style.display = 'block';                 
                    var tableOutput = '<div class="tableFixHead">';
                    tableOutput += '<table id="excelDataTable" class="table table-sm table-hover table-striped table-bordered" style="font-size: 14px; background-color:#E6FFFD; height:200px;">';
                    for (var row = 0; row < sheetData.length; row++) {
                        tableOutput += '<tr>';
                        for (var cell = 0; cell < sheetData[row].length; cell++) {
                            if (row == 0) {
                                tableOutput += '<th data-sort="' + cell + '">' + sheetData[row][cell] + '</th>';
                            } else {
                                if (cell == 0) {
                                    tableOutput += '<td contenteditable="false">' + sheetData[row][cell] + '</td>';
                                }
                                else {
                                    tableOutput += '<td contenteditable="false">' + sheetData[row][cell] + '</td>';
                                }
                            }
                        }
                        tableOutput += '</tr>';
                    }
                    tableOutput += '</table></div><br>';
                    document.getElementById('excelData').innerHTML = tableOutput;
                    document.getElementById('excelData').style.display = 'block';
                    excelFile.value = '';                    
                }
            }
        });
    </script>--%>
  <div id="buttonBox" class="mt-5">
      <button id="editButton" type="button" class="button" onclick="makeEditable()">Edit Data</button>
      <button id="saveButton" type="button" class="button" onclick="Save()" disabled>Save Data</button>
      <button id="newRow"type="button" class="button" onclick="addNewRow()">Insert New Sales</button>
      <button id="deleteRow" type="button" class="button" onclick="deleteLastRow()">Delete Row</button>
      <button id="excelButton" type="button" class="button" onClick="exportTableToExcel('xlsx');">Download Excel</button>
      <button id="sqlButton" type="button" class="button" onclick="SendToSQL()">Insert to Database</button>
      <button id="truncateButton" type="button" class="buttonTruncate" onclick="TruncateTable()">Truncate Database</button>
      <input type="text" placeholder="Product Name" style="float:right;" id="searchInput" onkeyup="searchTable()"/>
      <label for="searchInput" style="float:right;" >Search:</label>
      <div class="dropdown"><br>
            <button class="btn button dropdown-toggle" type="button" id="sortingDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sorting &#8794;</button>
                <div class="dropdown-menu" aria-labelledby="sortingDropdown">
                    <button class="dropdown-item" type="button" onClick="SortTable(4)">Price (Low to High)</button>
                    <button class="dropdown-item" type="button" onClick="SortTableDesc(4)">Price (High to Low)</button>
                    <button class="dropdown-item" type="button" onClick="SortTable(14)">Quantity (Low to High)</button>
                    <button class="dropdown-item" type="button" onClick="SortTableDesc(14)">Quantity (High to Low)</button>
                </div>
       <label style="width:800px; background-color:#84D2C5;border:none;color:red"; id="errorMessage"></label>
          </div>
         </div>     
  <div id="excelData" class="mt-5">
        </div>
  <%--<a href="NewItem.aspx" class="btn btn-secondary">Add New Sales</a>--%>
   <div id="insertForm" style="display:none;">
   <h2>Insert New Sales</h2>
        <div class="row">
            <div class="col-25">
                <label for="Item_Id">Item Id:</label> </div>         
            <div class="col-75">
        </div>
            <div class="col-75">
                <input type="text" id="Item_Id" placeholder="Item Id">
                 <label id="ItemIdError" style="font-size:small;"></label>
            </div>
        </div>
        <div class="row">
            <div class="col-25">
                <label for="Name">Name:</label> 
            </div>
            <div class="col-75">
                <input type="text" id="Name" placeholder="Name">
                <label id="nameError" style="font-size:small;"></label>
           </div>
        </div>
          <div class="row">
      <div class="col-25">
  <label for="Descripton">Descripton:</label> </div><div class="col-75">
  <input type="text" id="Descripton" placeholder="Descripton">
      <label id="descriptionError" style="font-size:small;"></label>
       </div>
    </div>
          <div class="row">
      <div class="col-25">
  <label for="Color">Color:</label> </div><div class="col-75">
  <select id="Color">
    <option value="" disabled selected hidden>Choose the colour</option>
    <option value="Red">Red</option>
    <option value="Yellow">Yellow</option>
    <option value="Black">Black</option>
    <option value="White">White</option>
  </select> 
      <label id="colorError" style="font-size:small;"></label>
       </div>
    </div>
          <div class="row">
      <div class="col-25">
    <label for="Price">Price (Rs):</label> </div><div class="col-75">
  <input type="text" id="Price" placeholder="Price">
        <label id="priceError" style="font-size:small;"></label>
         </div>
    </div>
          <div class="row">
      <div class="col-25">
  <label for="OS">Operating System:</label> </div><div class="col-75">
  <select id="OS">
    <option value="" disabled selected hidden>Choose the Operating System:</option>
    <option value="Android">Android</option>
    <option value="IOS">IOS</option>
  </select> 
      <label id="osError" style="font-size:small;"></label>
       </div>
    </div>
          <div class="row">
      <div class="col-25">
  <label for="RAM">RAM:</label> </div><div class="col-75">
  <select id="RAM">
    <option value="" disabled selected hidden>Choose the Ram:</option>
    <option value=2>2 GB</option>
    <option value=4>4 GB</option>
    <option value=8>8 GB</option>
    <option value=16>16 GB</option>
    <option value=32>32 GB</option>
  </select> 
      <label id="ramError" style="font-size:small;"></label>
       </div>
    </div>
          <div class="row">
      <div class="col-25">
 <label for="ROM">ROM:</label> </div><div class="col-75">
    <select id="ROM">
     <option value="" disabled selected hidden>Choose the Rom:</option>
    <option value=16>16 GB</option>
    <option value=32>32 GB</option>
    <option value=64>64 GB</option>
    <option value=128>128 GB</option>
    <option value=256>256 GB</option>
  </select> 
     <label id="romError" style="font-size:small;"></label>
      </div>
    </div>
          <div class="row">
      <div class="col-25">
  <label for="Battery">Battery (mAh):</label> </div><div class="col-75">
  <input type="text" id="Battery" placeholder="Battery"> <label id="batteryError" style="font-size:small;"></label>
     </div>
    </div>
          <div class="row">
      <div class="col-25">
        <label for="Camera">Camera (px):</label> </div><div class="col-75">
  <input type="text" id="Camera" placeholder="Camera">
            <label id="cameraError" style="font-size:small;"></label>
               </div></div>
          <div class="row">
      <div class="col-25">
        <label for="Dimension">Dimension (mm*mm):</label> </div><div class="col-75">
  <input type="text" id="Dimension" placeholder="Dimension">
            <label id="dimensionError" style="font-size:small;"></label>
             </div></div>
          <div class="row">
      <div class="col-25">
        <label for="Weight">Weight (grams):</label> </div><div class="col-75">
  <input type="text" id="Weight" placeholder="Weight">
            <label id="weightError" style="font-size:small;"></label>
             </div>
    </div>          
       <div class="row">
      <div class="col-25">
          <label for="Country_Name">Country Name:</label> </div><div class="col-75">
  <select id="Country_Name" onchange="selectCountyId(this)">
    <option value="" disabled selected hidden>Choose the Country:</option>
    <option value="India">India</option>
    <option value="America">America</option>
    <option value="Korea">Korea	</option>
    <option value="Japan">Japan</option>
    <option value="Russia">Russia</option>
   </select> 
              <label id="countryNameError" style="font-size:small;"></label>
</div>
    </div>
       <div class="row">
      <div class="col-25">
        <label for="Country_Id">Country Id:</label> </div><div class="col-75">
  <input type="text" id="Country_Id" placeholder="Country_Id" disabled>
              <label id="countryIdError" style="font-size:small;"></label>
             </div>
    </div>
          <div class="row">
      <div class="col-25">
   <label for="Sales_quantity">Sales Quantity:</label> </div>
              <div class="col-75">
   <input type="text" id="Sales_quantity" placeholder="Sales Quantity">
                    <label id="salesQuantityError" style="font-size:small;"></label>
        </div>
    </div>
       <div class="row">
           <div class="col-25">
   <label for="Customer_Id">Customer Id:</label> </div><div class="col-75">
   <input type="text" id="Customer_Id" placeholder="Customer Id">
       <label id="customerIdError" style="font-size:small;"></label>
        </div>
    </div>
       <div class="row">
           <div class="col-25">
   <label for="Customer_Name">Customer Name:</label></div><div class="col-75">
   <input type="text" id="Customer_Name" placeholder="Customer Name">
       <label id="customerNameError" style="font-size:small;"></label>
        </div>
    </div>
        <div class="row">
           <div class="col-25">
   <label for="Age">Age:</label> </div><div class="col-75">
   <input type="text" id="Age" placeholder="Age">
       <label id="ageError" style="font-size:small;"></label>
        </div>
    </div>
      <div class="row">
      <div class="col-25">
   <label for="Gender">Gender:</label> </div><div class="col-75">
   <select id="Gender">
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>  
       <label id="genderError" style="font-size:small;"></label>
        </div>
    </div>
          <div class="row">
      <div class="col-25">
   <label for="Address">Address:</label></div><div class="col-75"> 
          <input type="text" id="Address" placeholder="Address">
       <label id="addressError" style="font-size:small;"></label>
           </div>
    </div>
          <div class="row">
      <div class="col-25">
  <label for="Payment_Type">Payment Type:</label></div><div class="col-75"> 
          <select id="Payment_Type">
     <option value="" disabled selected hidden>Choose a Payment Type</option>
    <option value="Cash">Cash</option>
    <option value="UPI">UPI</option>
    <option value="Net Banking">Net Banking</option>
    <option value="Cheque">Cheque</option>
   </select> 
      <label id="paymentError" style="font-size:small;"></label>
           </div>
    </div>
          <div class="row">
      <div class="col-25">
     <label for="Purchase_Type">Purchase Type:</label> </div><div class="col-75">       
    <select id="Purchase_Type">
      <option value="" disabled selected hidden>Choose a Purchase Type</option>
    <option value="Retails">Retails</option>
    <option value="Wholesales">wholesales</option>
   </select> 
         <label id="purchaseError" style="font-size:small;"></label>
           </div>
    </div>
          <div class="row">
      <div class="col-25">
   <label for="Purchase_Date">Purchase Date:</label></div><div class="col-75">
  <input type="text" id="Purchase_Date" placeholder="DD-MM-YYYY">
       <label id="dateError" style="font-size:small;"></label>
               </div>
    </div>
  <br>
  <button type="button" class="btn btn-success" onclick="saveForm()">Save</button>
  <button type="button" class="btn btn-success" onclick="removeDiv()">Cancel</button>
  <button type="button" class="btn btn-danger" onclick="resetForm()">Reset</button>
        </div>  
    <script src="Scripts/EditGrid.js"></script>
</asp:Content>
