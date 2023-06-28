//loading Excel
var sheet_data;
        const excelFile = document.getElementById('excelFile');
        excelFile.addEventListener('change', (event) => {
            if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
                document.getElementById('excelData').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are only allowed</div>';
                excelFile.value = '';
                return false;
            }
            //alert(event.target.value + " is loaded");
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
                                tableOutput += '<th>' + sheetData[row][cell] + '</th>';
                            } else {       
                                    tableOutput += '<td contenteditable="false">' + sheetData[row][cell] + '</td>';
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
//sorting
function SortTable(column)
{
    var table, rows, switching, i, firstRow, secondRow, shouldSwitch;
    table = document.getElementById("excelDataTable");
    switching = true;
    while (switching)
    {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++)
        {
            shouldSwitch = false;
            firstRow = rows[i].getElementsByTagName("TD")[column];
            secondRow = rows[i + 1].getElementsByTagName("TD")[column];
            if (parseFloat(firstRow.innerHTML) > parseFloat(secondRow.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch)
        {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function SortTableDesc(column)
{
    var table, rows, switching, i, firstRow, secondRow, shouldSwitch;
    table = document.getElementById("excelDataTable");
    switching = true;
    while (switching)
    {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++)
        {
            shouldSwitch = false;
            firstRow = rows[i].getElementsByTagName("TD")[column];
            secondRow = rows[i + 1].getElementsByTagName("TD")[column];
            if (parseFloat(firstRow.innerHTML) < parseFloat(secondRow.innerHTML))
            {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch)
        {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
//delete row
function deleteLastRow() {
    var table = document.getElementById('excelDataTable');
    var rowCount = table.rows.length;
    var rowNumber = prompt("Enter the row number to delete ");
    var row = parseInt(rowNumber);
    debugger;
    if (rowNumber != null) {
        if (rowCount > 1) {
            if (Number.isInteger(row)) {
                if (row == 0) {
                    alert("You can not delete table header");
                }
                else if (row < 0 || row >= rowCount) {
                    alert("Invalid row number");
                }
                else {
                    var confirmDelete = confirm("Are you sure to delete row " + row);
                    if (confirmDelete) {
                        table.deleteRow(row);
                    }
                }
            }
            else {
                alert("Only a number");
            }
        }
        else {
            alert("Nothing to delete");
        }
    }
}
//insert new sales
function addNewRow() {
    document.getElementById('insertForm').style.display = 'block';
    document.getElementById('excelButton').disabled = true;
    document.getElementById('sqlButton').disabled = true;
    document.getElementById('truncateButton').disabled = true;
    document.getElementById('editButton').disabled = true;
    document.getElementById('newRow').disabled = true;
    document.getElementById('deleteRow').disabled = true;
    document.getElementById('Item_Id').value = '';
    document.getElementById('Name').value = '';
    document.getElementById('Descripton').value = '';
    document.getElementById('Color').value = '';
    document.getElementById('Price').value = '';
    document.getElementById('OS').value = '';
    document.getElementById('RAM').value = '';
    document.getElementById('ROM').value = '';
    document.getElementById('Battery').value = '';
    document.getElementById('Camera').value = '';
    document.getElementById('Dimension').value = '';
    document.getElementById('Weight').value = '';
    document.getElementById('Country_Id').value = '';
    document.getElementById('Country_Name').value = '';
    document.getElementById('Sales_quantity').value = '';
    document.getElementById('Customer_Id').value = '';
    document.getElementById('Customer_Name').value = '';
    document.getElementById('Age').value = '';
    document.getElementById('Gender').value = '';
    document.getElementById('Address').value = '';
    document.getElementById('Payment_Type').value = '';
    document.getElementById('Purchase_Type').value = '';
    document.getElementById('Purchase_Date').value = '';   
}
function saveForm() {
    document.getElementById('excelButton').disabled = false;
    document.getElementById('sqlButton').disabled = false;
    document.getElementById('truncateButton').disabled = false;
    document.getElementById('editButton').disabled = false;
    document.getElementById('newRow').disabled = false;
    document.getElementById('deleteRow').disabled = false;
    var itemId = document.getElementById('Item_Id').value;
    var name = document.getElementById('Name').value;
    var description = document.getElementById('Descripton').value;
    var color = document.getElementById('Color').value;
    var price = document.getElementById('Price').value;
    var os = document.getElementById('OS').value;
    var ram = document.getElementById('RAM').value;
    var rom = document.getElementById('ROM').value;
    var battery = document.getElementById('Battery').value;
    var camera = document.getElementById('Camera').value;
    var dimension = document.getElementById('Dimension').value;
    var weight = document.getElementById('Weight').value;
    var countryId = document.getElementById('Country_Id').value;
    var countryName = document.getElementById('Country_Name').value;
    var salesQuantity = document.getElementById('Sales_quantity').value;
    var customerId = document.getElementById('Customer_Id').value;
    var customerName = document.getElementById('Customer_Name').value;
    var age = document.getElementById('Age').value;
    var gender = document.getElementById('Gender').value;
    var address = document.getElementById('Address').value;
    var paymentType = document.getElementById('Payment_Type').value;
    var purchaseType = document.getElementById('Purchase_Type').value;
    var purchaseDate = document.getElementById('Purchase_Date').value;
    var errorMessages = [];
    if (!validatePositiveInteger(itemId)) {
        errorMessages.push('Item_Id can have only poaistive integer values.');
        document.getElementById('ItemIdError').innerHTML = "Item_Id can have only positive integer values.";
        document.getElementById('ItemIdError').style.color = "red";
    }
    else {
        document.getElementById('ItemIdError').innerHTML = "";
    }
    if (!validateString(name)) {
        errorMessages.push('Name should be a string value and no special characters');
        document.getElementById('nameError').innerHTML = "Name should be a string value and no special characters.";
        document.getElementById('nameError').style.color = "red";
    }
    else {
        document.getElementById('nameError').innerHTML = "";
    }
    if (!validateDescription(description)) {
        errorMessages.push('Description should be a string value.');
        document.getElementById('descriptionError').innerHTML = "Description can not be empty and maximum allowed charaters are 50.";
        document.getElementById('descriptionError').style.color = "red";
    }
    else {
        document.getElementById('descriptionError').innerHTML = "";
    }
    if (color === '') {
        errorMessages.push('Select the color');
        document.getElementById('colorError').innerHTML = "Select the color.";
        document.getElementById('colorError').style.color = "red";
    }
    else {
        document.getElementById('colorError').innerHTML = "";
    }
    if (os === '') {
        errorMessages.push('Select OS.');
        document.getElementById('osError').innerHTML = "Select OS.";
        document.getElementById('osError').style.color = "red";
    }
    else {
        document.getElementById('osError').innerHTML = "";
    }
    if (!validatePrice(price)) {
        errorMessages.push('Price should be a positive integer.');
        document.getElementById('priceError').innerHTML = "Price should be between 5000 Rs and 300000 Rs.";
        document.getElementById('priceError').style.color = "red";
    }
    else {
        document.getElementById('priceError').innerHTML = "";
    }
    if (ram === '') {
        errorMessages.push('Select RAM');
        document.getElementById('ramError').innerHTML = "Select RAM.";
        document.getElementById('ramError').style.color = "red";
    }
    else {
        document.getElementById('ramError').innerHTML = "";
    }
    if (rom === '') {
        errorMessages.push('Select ROM');
        document.getElementById('romError').innerHTML = "Select ROM.";
        document.getElementById('romError').style.color = "red";
    }
    else {
        document.getElementById('romError').innerHTML = "";
    }
    if (!validateBattery(battery)) {
        errorMessages.push('Battery can have only poaistive integer values.');
        document.getElementById('batteryError').innerHTML = "Battery capacity must be between 2000 mAh and 10000 mAh.";
        document.getElementById('batteryError').style.color = "red";
    }
    else {
        document.getElementById('batteryError').innerHTML = "";
    }
    if (!validateCamera(camera)) {
        errorMessages.push('Invalid pixel.');
        document.getElementById('cameraError').innerHTML = "Invalid pixel.";
        document.getElementById('cameraError').style.color = "red";
    }
    else {
        document.getElementById('cameraError').innerHTML = "";
    }
    if (!validateDimension(dimension)) {
        errorMessages.push('Invalid dimension.Ex:1234*123');
        document.getElementById('dimensionError').innerHTML = "Invalid dimension.Ex:1234*123";
        document.getElementById('dimensionError').style.color = "red";
    }
    else {
        document.getElementById('dimensionError').innerHTML = "";
    }
    if (!validateWeight(weight)) {
        errorMessages.push('Weight should be a positive integer and between 100 and 500');
        document.getElementById('weightError').innerHTML = "Weight should be a positive integer and between 100 and 500";
        document.getElementById('weightError').style.color = "red";
    }
    else {
        document.getElementById('weightError').innerHTML = "";
    }
    if (!validatePositiveInteger(countryId)) {
        errorMessages.push('Country_Id should be a positive integer.');
        document.getElementById('countryIdError').innerHTML = "Country_Id should be a positive integer.";
        document.getElementById('countryIdError').style.color = "red";
    }
    else {
        document.getElementById('countryIdError').innerHTML = "";
    }
    if (countryName === '') {
        errorMessages.push('Select Country_Name');
        document.getElementById('countryNameError').innerHTML = "Select Country_Name";
        document.getElementById('countryNameError').style.color = "red";
    }
    else {
        document.getElementById('countryNameError').innerHTML = "";
    }
    if (!validateSalesQuantity(salesQuantity)) {
        errorMessages.push('Sales_quantity should be a string value.');
        document.getElementById('salesQuantityError').innerHTML = "Sales quantity should positive number.";
        document.getElementById('salesQuantityError').style.color = "red";
    }
    else {
        document.getElementById('salesQuantityError').innerHTML = "";
    }
    if (!validateCustomerId(customerId)) {
        errorMessages.push('Customer_Id should be a string value.');
        document.getElementById('customerIdError').innerHTML = "Customer Id should be in the format name_numbers and maximum character limit is 25.";
        document.getElementById('customerIdError').style.color = "red";
    }
    else {
        document.getElementById('customerIdError').innerHTML = "";
    }
    if (!validateString(customerName)) {
        errorMessages.push('Customer_Name should be a string value.');
        document.getElementById('customerNameError').innerHTML = "Customer Name should be a string value and maximum capacity is 20 characters.";
        document.getElementById('customerNameError').style.color = "red";
    }
    else {
        document.getElementById('customerNameError').innerHTML = "";
    }
    if (!validateAge(age)) {
        errorMessages.push('Age should be between 15 and 120.');
        document.getElementById('ageError').innerHTML = "Age should be between 15 and 120.";
        document.getElementById('ageError').style.color = "red";
    }
    else {
        document.getElementById('ageError').innerHTML = "";
    }
    if (gender === '') {
       errorMessages.push('Select Gender');
       document.getElementById('genderError').innerHTML = "Select Gender";
       document.getElementById('genderError').style.color = "red";
    }
    else {
       document.getElementById('genderError').innerHTML = "";
    }
    if (!validateDescription(address)) {
        errorMessages.push('Address should be a string value.');
        document.getElementById('addressError').innerHTML = "Address can not be empty and maximum allowed charaters are 50.";
        document.getElementById('addressError').style.color = "red";
    }
    else {
        document.getElementById('addressError').innerHTML = "";
    }
    if (paymentType === '') {
        errorMessages.push('Select Payment_Type');
        document.getElementById('paymentError').innerHTML = "Select Payment Type";
        document.getElementById('paymentError').style.color = "red";
    }
    else {
        document.getElementById('paymentError').innerHTML = "";
    }
    if (purchaseType ==='') {
        errorMessages.push('Select Purchase_Type');
        document.getElementById('purchaseError').innerHTML = "Select Purchase Type";
        document.getElementById('purchaseError').style.color = "red";
    }
    else {
        document.getElementById('purchaseError').innerHTML = "";
    }
    if (!validateDate(purchaseDate)) {
        errorMessages.push('Purchase Date should be a valid date format (DD-MM-YYYY) and date should be todays or before todays');
        document.getElementById('dateError').innerHTML = "Purchase Date should be a valid date format (DD-MM-YYYY) and date should be todays or before todays";
        document.getElementById('dateError').style.color = "red";
    }
    else {
        document.getElementById('dateError').innerHTML = "";
    }
    if (errorMessages.length > 0) {
        //var errorMessage = errorMessages.join('\n');
        alert("There are invalid fields");
        return;
    }
    var table = document.getElementById('excelDataTable');
    var newRow = table.insertRow(-1); 
    var newCell1 = newRow.insertCell(0);
    newCell1.innerHTML = itemId;
    var newCell2 = newRow.insertCell(1);
    newCell2.innerHTML = name;
    var newCell3 = newRow.insertCell(2);
    newCell3.innerHTML = description;
    var newCell4 = newRow.insertCell(3);
    newCell4.innerHTML = color;
    var newCell5 = newRow.insertCell(4);
    newCell5.innerHTML = price;
    var newCell6 = newRow.insertCell(5);
    newCell6.innerHTML = os;
    var newCell7 = newRow.insertCell(6);
    newCell7.innerHTML = ram;
    var newCell8 = newRow.insertCell(7);
    newCell8.innerHTML = rom;
    var newCell9 = newRow.insertCell(8);
    newCell9.innerHTML = battery;
    var newCell10 = newRow.insertCell(9);
    newCell10.innerHTML = camera;
    var newCell11 = newRow.insertCell(10);
    newCell11.innerHTML = dimension;
    var newCell12 = newRow.insertCell(11);
    newCell12.innerHTML = weight;
    var newCell13 = newRow.insertCell(12);
    newCell13.innerHTML = countryId;
    var newCell14 = newRow.insertCell(13);
    newCell14.innerHTML = countryName;
    var newCell15 = newRow.insertCell(14);
    newCell15.innerHTML = salesQuantity;
    var newCell16 = newRow.insertCell(15);
    newCell16.innerHTML = customerId;
    var newCell17 = newRow.insertCell(16);
    newCell17.innerHTML = customerName;
    var newCell18 = newRow.insertCell(17);
    newCell18.innerHTML = age;
    var newCell19 = newRow.insertCell(18);
    newCell19.innerHTML = gender;
    var newCell20 = newRow.insertCell(19);
    newCell20.innerHTML = address;
    var newCell21 = newRow.insertCell(20);
    newCell21.innerHTML = paymentType;
    var newCell22 = newRow.insertCell(21);
    newCell22.innerHTML = purchaseType;
    var newCell23 = newRow.insertCell(22);
    newCell23.innerHTML = purchaseDate;
    document.getElementById('insertForm').style.display = 'none';
    alert("New sales is added to the table.");
}
function selectCountyId(value)
{
    var selectedValue = value.value;
    if (selectedValue == "India") {
        document.getElementById('Country_Id').value = 2;
    }
    if (selectedValue == "America") {
        document.getElementById('Country_Id').value = 1;
    }
    if (selectedValue == "Korea") {
        document.getElementById('Country_Id').value = 4;
    }
    if (selectedValue == "Japan") {
        document.getElementById('Country_Id').value = 3;
    }
    if (selectedValue == "Taiwan") {
        document.getElementById('Country_Id').value = 8;
    }
    if (selectedValue == "Russia") {
        document.getElementById('Country_Id').value = 7;
    }
}
function validatePositiveInteger(value) {
    var integerRegex = /^[1-9]\d*$/;
    return integerRegex.test(value) && value.length < 6;
}
function validateCustomerId(value) {
    var custIdRegex = /^[a-zA-Z]+_\d*$/;
    return custIdRegex.test(value) && value.length < 25;
}
function validateSalesQuantity(value) {
    if (value > 0 && value < 100000) {
        return true
    }
    else {
        return false;
    }
}
function validatePrice(value) {
    //var integerRegex = /^[1-9]\d*$/;
    if (value > 5000 && value < 300000) {
        return true
    }
    else {
        return false;
    }
}
function validateCamera(value) {
    if (value >= 10 && value <= 120) {
        return true
    }
    else {
        return false;
    }
}
function validateWeight(value) {
    if (value > 100 && value < 500) {
        return true
    }
    else {
        return false;
    }
}
function validateDimension(value) {
    var dimensionRegex = /^\d{4}\*\d{3}$/;
    return dimensionRegex.test(value);
}
function validateAge(value) {
    if (value >= 15 && value <= 120) {
        return true
    }
    else {
        return false;
    }
}
function validateBattery(value) {
    if (value >= 2000 && value <= 10000) {
        return true
    }
    else {
        return false;
    }
}
function validateDate(dateString) {
    var dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    var matches = dateRegex.exec(dateString);
    if (!matches) {
        return false;
    }
    var day = parseInt(matches[1], 10);
    var month = parseInt(matches[2], 10);
    var year = parseInt(matches[3], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
    }
    if (year < 2010 || year > 2023 || month === 0 || month > 12) {
        return false;
    }
    var maxDay = 31;
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        maxDay = 30;
    } else if (month === 2) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            maxDay = 29;
        } else {
            maxDay = 28;
        }
    }
    return day > 0 && day <= maxDay;
}
function validateString(value) {
    var stringRegex = /^[a-zA-Z][a-zA-Z\s\d]*$/;
    //var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return stringRegex.test(value) && value.length<20;
}
function validateDescription(value) {
    var stringRegex = /^[a-zA-Z\s\d!@#$%^&*(),.?":{}|<>]+$/;
    //var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return value.length < 50 && stringRegex.test(value);
}
function removeDiv() {
    document.getElementById('ItemIdError').innerHTML = "";
    document.getElementById('nameError').innerHTML = "";
    document.getElementById('descriptionError').innerHTML = "";
    document.getElementById('colorError').innerHTML = "";
    document.getElementById('osError').innerHTML = "";
    document.getElementById('ramError').innerHTML = "";
    document.getElementById('romError').innerHTML = "";
    document.getElementById('batteryError').innerHTML = "";
    document.getElementById('cameraError').innerHTML = "";
    document.getElementById('dimensionError').innerHTML = "";
    document.getElementById('weightError').innerHTML = "";
    document.getElementById('countryIdError').innerHTML = "";
    document.getElementById('countryNameError').innerHTML = "";
    document.getElementById('countryIdError').innerHTML = "";
    document.getElementById('priceError').innerHTML = "";
    document.getElementById('salesQuantityError').innerHTML = "";
    document.getElementById('customerIdError').innerHTML = "";
    document.getElementById('customerNameError').innerHTML = "";
    document.getElementById('ageError').innerHTML = "";
    document.getElementById('genderError').innerHTML = "";
    document.getElementById('addressError').innerHTML = "";
    document.getElementById('paymentError').innerHTML = "";
    document.getElementById('purchaseError').innerHTML = "";
    document.getElementById('dateError').innerHTML = "";
    document.getElementById('insertForm').style.display = 'none';
    document.getElementById('editButton').disabled = false;
    document.getElementById('excelButton').disabled = false;
    document.getElementById('sqlButton').disabled = false;
    document.getElementById('truncateButton').disabled = false;
    document.getElementById('newRow').disabled = false;
    document.getElementById('deleteRow').disabled = false;
}
function resetForm()
{
    document.getElementById('Item_Id').value = '';
    document.getElementById('Name').value = '';
    document.getElementById('Descripton').value = '';
    document.getElementById('Color').value = '';
    document.getElementById('Price').value = '';
    document.getElementById('OS').value = '';
    document.getElementById('RAM').value = '';
    document.getElementById('ROM').value = '';
    document.getElementById('Battery').value = '';
    document.getElementById('Camera').value = '';
    document.getElementById('Dimension').value = '';
    document.getElementById('Weight').value = '';
    document.getElementById('Country_Id').value = '';
    document.getElementById('Country_Name').value = '';
    document.getElementById('Sales_quantity').value = '';
    document.getElementById('Customer_Id').value = '';
    document.getElementById('Customer_Name').value = '';
    document.getElementById('Age').value = '';
    document.getElementById('Gender').value = '';
    document.getElementById('Address').value = '';
    document.getElementById('Payment_Type').value = '';
    document.getElementById('Purchase_Type').value = '';
    document.getElementById('Purchase_Date').value = '';
    document.getElementById('ItemIdError').innerHTML = "";
    document.getElementById('nameError').innerHTML = "";
    document.getElementById('descriptionError').innerHTML = "";
    document.getElementById('colorError').innerHTML = "";
    document.getElementById('osError').innerHTML = "";
    document.getElementById('ramError').innerHTML = "";
    document.getElementById('romError').innerHTML = "";
    document.getElementById('batteryError').innerHTML = "";
    document.getElementById('cameraError').innerHTML = "";
    document.getElementById('dimensionError').innerHTML = "";
    document.getElementById('weightError').innerHTML = "";
    document.getElementById('countryIdError').innerHTML = "";
    document.getElementById('countryNameError').innerHTML = "";
    document.getElementById('countryIdError').innerHTML = "";
    document.getElementById('priceError').innerHTML = "";
    document.getElementById('salesQuantityError').innerHTML = "";
    document.getElementById('customerIdError').innerHTML = "";
    document.getElementById('customerNameError').innerHTML = "";
    document.getElementById('ageError').innerHTML = "";
    document.getElementById('genderError').innerHTML = "";
    document.getElementById('addressError').innerHTML = "";
    document.getElementById('paymentError').innerHTML = "";
    document.getElementById('purchaseError').innerHTML = "";
    document.getElementById('dateError').innerHTML = "";
}
//Editing table
function makeEditable() {
    document.getElementById('saveButton').disabled = false;
    document.getElementById('excelFile').disabled = true;
    document.getElementById('excelButton').disabled = true;
    document.getElementById('sqlButton').disabled = true;
    document.getElementById('truncateButton').disabled = true;
    document.getElementById('editButton').disabled = true;
    document.getElementById('newRow').disabled = true;
    document.getElementById('deleteRow').disabled = true;
    const table = document.getElementById('excelDataTable');
    const columnDataTypes = {
        0: 'number',
        1: 'string',
        2: 'string',
        3: 'allowedColour',
        4: 'number',
        5: 'allowedOs',
        6: 'allowedRam',
        7: 'allowedRom',
        8: 'number',
        9: 'number',
        10: 'string',
        11: 'number',
        12: 'number',
        13: 'allowedCountry',
        14: 'number',
        15: 'string',
        16: 'string',
        17: 'number',
        19: 'string',
        18: 'allowedGender',
        20: 'allowedPayment',
        21: 'allowedPurchase',
        22: 'date',
    };
    const weightLimits = {
        11: { lower: 100, upper: 500 },
    };
    const ageLimits = {
        17: { lower: 15, upper: 120 },
    };
    /*const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;*/
    for (let row = 1; row < table.rows.length; row++) {
        for (let cell = 1; cell < table.rows[row].cells.length; cell++) {
            table.rows[row].cells[cell].style.borderRadius = "10px";
            table.rows[row].cells[cell].style.border = "2px solid black";
            table.rows[row].cells[cell].style.backgroundColor = "#F1F6F5";
            if (cell == 3 || cell == 5 || cell == 6 || cell == 7 || cell == 13 || cell == 18 || cell == 20 || cell == 21) {             
                    const expectedType = columnDataTypes[cell];
                    switch (expectedType) {
                        case 'allowedColour':
                            var defaultColor = table.rows[row].cells[cell].innerHTML;
                            var selectColorElement = document.createElement("select");
                            selectColorElement.id = "color";
                            var optionRed = document.createElement("option");
                            optionRed.name = "Red";
                            optionRed.value = "Red";
                            optionRed.textContent = "Red";
                            var optionBlack = document.createElement("option");
                            optionBlack.name = "Black";
                            optionBlack.value = "Black";
                            optionBlack.textContent = "Black";
                            var optionWhite = document.createElement("option");
                            optionWhite.name = "White";
                            optionWhite.value = "White";
                            optionWhite.textContent = "White";
                            var optionYellow = document.createElement("option");
                            optionYellow.name = "Yellow";
                            optionYellow.value = "Yellow";
                            optionYellow.textContent = "Yellow";
                            var optionBlue = document.createElement("option");
                            optionBlue.name = "Blue";
                            optionBlue.value = "Blue";
                            optionBlue.textContent = "Blue";
                            var optionGreen = document.createElement("option");
                            optionGreen.name = "Green";
                            optionGreen.value = "Green";
                            optionGreen.textContent = "Green";
                            selectColorElement.appendChild(optionBlack);
                            selectColorElement.appendChild(optionBlue);
                            selectColorElement.appendChild(optionYellow);
                            selectColorElement.appendChild(optionWhite);
                            selectColorElement.appendChild(optionRed);
                            selectColorElement.appendChild(optionGreen);
                            var ColorOptions = selectColorElement.options;
                            for (var i = 0; i < ColorOptions.length; i++) {
                                if (ColorOptions[i].value === defaultColor) {
                                    ColorOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectColorElement);
                            break;
                        case 'allowedCountry':
                            var defaultCountry = table.rows[row].cells[cell].innerHTML;
                            var selectCountryElement = document.createElement("select");
                            selectCountryElement.id = "country";
                            var optionIndia = document.createElement("option");
                            optionIndia.name = "India";
                            optionIndia.value = "India";
                            optionIndia.textContent = "India";
                            var optionAmerica = document.createElement("option");
                            optionAmerica.name = "America";
                            optionAmerica.value = "America";
                            optionAmerica.textContent = "America";
                            var optionJapan = document.createElement("option");
                            optionJapan.name = "Japan";
                            optionJapan.value = "Japan";
                            optionJapan.textContent = "Japan";
                            var optionKorea = document.createElement("option");
                            optionKorea.name = "Korea";
                            optionKorea.value = "Korea";
                            optionKorea.textContent = "Korea";
                            var optionRussia = document.createElement("option");
                            optionRussia.name = "Russia";
                            optionRussia.value = "Russia";
                            optionRussia.textContent = "Russia";
                            var optionTaiwan = document.createElement("option");
                            optionTaiwan.name = "Taiwan";
                            optionTaiwan.value = "Taiwan";
                            optionTaiwan.textContent = "Taiwan";
                            selectCountryElement.appendChild(optionIndia);
                            selectCountryElement.appendChild(optionAmerica);
                            selectCountryElement.appendChild(optionJapan);
                            selectCountryElement.appendChild(optionRussia);
                            selectCountryElement.appendChild(optionKorea);
                            selectCountryElement.appendChild(optionTaiwan);
                            var countryOptions = selectCountryElement.options;
                            for (var i = 0; i < countryOptions.length; i++) {
                                if (countryOptions[i].value === defaultCountry) {
                                    countryOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectCountryElement);
                        break;
                        case 'allowedGender':
                            var defaultGender = table.rows[row].cells[cell].innerHTML;
                            var selectGenderElement = document.createElement("select");
                            selectGenderElement.id = "gender";
                            var optionMale = document.createElement("option");
                            optionMale.name = "Male";
                            optionMale.value = "Male";
                            optionMale.textContent = "Male";
                            var optionFemale = document.createElement("option");
                            optionFemale.name = "Female";
                            optionFemale.value = "Female";
                            optionFemale.textContent = "Female";
                            var optionOther = document.createElement("option");
                            optionOther.name = "Other";
                            optionOther.value = "Other";
                            optionOther.textContent = "Other";
                            selectGenderElement.appendChild(optionMale);
                            selectGenderElement.appendChild(optionFemale);
                            selectGenderElement.appendChild(optionOther);
                            var genderOptions = selectGenderElement.options;
                            for (var i = 0; i < genderOptions.length; i++) {
                                if (genderOptions[i].value === defaultGender) {
                                    genderOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectGenderElement);
                            break;
                        case 'allowedPayment':
                            var defaultPayment = table.rows[row].cells[cell].innerHTML;
                            var selectPaymentElement = document.createElement("select");
                            selectPaymentElement.id = "payment";
                            var optionCash = document.createElement("option");
                            optionCash.name = "Cash";
                            optionCash.value = "Cash";
                            optionCash.textContent = "Cash";
                            var optionUPI = document.createElement("option");
                            optionUPI.name = "UPI";
                            optionUPI.value = "UPI";
                            optionUPI.textContent = "UPI";
                            var optionNetbanking = document.createElement("option");
                            optionNetbanking.name = "Net Banking";
                            optionNetbanking.value = "Net Banking";
                            optionNetbanking.textContent = "Net Banking";
                            var optionCheque = document.createElement("option");
                            optionCheque.name = "Cheque";
                            optionCheque.value = "Cheque";
                            optionCheque.textContent = "Cheque";
                            selectPaymentElement.appendChild(optionCheque);
                            selectPaymentElement.appendChild(optionNetbanking);
                            selectPaymentElement.appendChild(optionUPI);
                            selectPaymentElement.appendChild(optionCash);
                            var paymentOptions = selectPaymentElement.options;
                            for (var i = 0; i < paymentOptions.length; i++) {
                                if (paymentOptions[i].value === defaultPayment) {
                                    paymentOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectPaymentElement);
                            break;
                        case 'allowedPurchase':
                            var defaultPurchase = table.rows[row].cells[cell].innerHTML;
                            var selectPurchaseElement = document.createElement("select");
                            selectPurchaseElement.id = "purchase";
                            var optionWholesales = document.createElement("option");
                            optionWholesales.name = "Wholesales";
                            optionWholesales.value = "Wholesales";
                            optionWholesales.textContent = "Wholesales";
                            var optionRetails = document.createElement("option");
                            optionRetails.name = "Retails";
                            optionRetails.value = "Retails";
                            optionRetails.textContent = "Retails";
                            selectPurchaseElement.appendChild(optionWholesales);
                            selectPurchaseElement.appendChild(optionRetails);
                            var purchaseOptions = selectPurchaseElement.options;
                            for (var i = 0; i < purchaseOptions.length; i++) {
                                if (purchaseOptions[i].value === defaultPurchase) {
                                    purchaseOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectPurchaseElement);
                            break;
                        case 'allowedOs':
                            var defaultOs = table.rows[row].cells[cell].innerHTML;
                            var selectOsElement = document.createElement("select");
                            selectOsElement.id = "os";
                            var optionAndroid = document.createElement("option");
                            optionAndroid.name = "Android";
                            optionAndroid.value = "Android";
                            optionAndroid.textContent = "Android";
                            var optionIos = document.createElement("option");
                            optionIos.name = "IOS";
                            optionIos.value = "IOS";
                            optionIos.textContent = "IOS";
                            selectOsElement.appendChild(optionAndroid);
                            selectOsElement.appendChild(optionIos);
                            var osOptions = selectOsElement.options;
                            for (var i = 0; i < osOptions.length; i++) {
                                if (osOptions[i].value === defaultOs) {
                                    osOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectOsElement);
                            break;
                        case 'allowedRam':
                            var defaultRam = table.rows[row].cells[cell].innerHTML;
                            var selectRamElement = document.createElement("select");
                            selectRamElement.id = "ram";
                            var option4 = document.createElement("option");
                            option4.name = "4";
                            option4.value = "4";
                            option4.textContent = "4";
                            var option8 = document.createElement("option");
                            option8.name = "8";
                            option8.value = "8";
                            option8.textContent = "8";
                            var option16 = document.createElement("option");
                            option16.name = "16";
                            option16.value = "16";
                            option16.textContent = "16";
                            selectRamElement.appendChild(option16);
                            selectRamElement.appendChild(option8);
                            selectRamElement.appendChild(option4);                            
                            var ramOptions = selectRamElement.options;
                            for (var i = 0; i < ramOptions.length; i++) {
                                if (ramOptions[i].value === defaultRam) {
                                    ramOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectRamElement);
                            break;
                        case 'allowedRom':
                            var defaultRom = table.rows[row].cells[cell].innerHTML;
                            var selectRomElement = document.createElement("select");
                            selectRomElement.id = "rom";
                            var option32 = document.createElement("option");
                            option32.name = "32";
                            option32.value = "32";
                            option32.textContent = "32";
                            var option64 = document.createElement("option");
                            option64.name = "64";
                            option64.value = "64";
                            option64.textContent = "64";
                            var option128 = document.createElement("option");
                            option128.name = "128";
                            option128.value = "128";
                            option128.textContent = "128";
                            var option256 = document.createElement("option");
                            option256.name = "256";
                            option256.value = "256";
                            option256.textContent = "256";
                            selectRomElement.appendChild(option32);
                            selectRomElement.appendChild(option64);
                            selectRomElement.appendChild(option128);
                            selectRomElement.appendChild(option256);
                            var romOptions = selectRomElement.options;
                            for (var i = 0; i < romOptions.length; i++) {
                                if (romOptions[i].value === defaultRom) {
                                    romOptions[i].selected = true;
                                    break;
                                }
                            }
                            table.rows[row].cells[cell].innerHTML = "";
                            table.rows[row].cells[cell].appendChild(selectRomElement);
                            break;
                    }
            }
            else {
                table.rows[row].cells[cell].setAttribute('contenteditable', true);
                let originalValue = table.rows[row].cells[cell].innerText;
                table.rows[row].cells[cell].addEventListener('blur', function () {
                    const expectedType = columnDataTypes[cell];
                    const cellValue = this.innerText;
                    let isValid = true;
                    var errorMessages = [];
                    switch (expectedType) {
                        case 'number':
                            if (cell === 11) {
                                const { lower, upper } = weightLimits[cell];
                                isValid = Number.isInteger(Number(cellValue)); 
                                if (Number(cellValue) < lower || Number(cellValue) > upper) {
                                    errorMessages.push("Weight should be between 100 grams and 500 grams");
                                    isValid = false;
                                }
                            }
                            else if (cell === 4) {
                                /*const { lower, upper } = weightLimits[cell];*/
                                isValid = Number.isInteger(Number(cellValue));
                                if (Number(cellValue) < 5000 || Number(cellValue) > 300000) {
                                    errorMessages.push("Price should be between 5000 Rs and 300000 Rs");
                                    isValid = false;
                                }
                            }
                            else if (cell === 17) {
                                    const { lower, upper } = ageLimits[cell];
                                    isValid = Number.isInteger(Number(cellValue));
                                if (Number(cellValue) < lower || Number(cellValue) > upper) {
                                    errorMessages.push("Age should be between 15 and 120");
                                        isValid = false;
                                    }
                            }
                            else if (cell === 8) {
                                /*const { lower, upper } = ageLimits[cell];*/
                                isValid = Number.isInteger(Number(cellValue));
                                if (Number(cellValue) < 2000 || Number(cellValue) > 10000) {
                                    errorMessages.push("Battery capacity should be between 2000 mAh and 10000 mAh.");
                                    isValid = false;
                                }
                            }
                            else if (cell === 9) {
                                //const pixcelFormatRegx = /^[0-9]\d{0,2}$/;
                                isValid = Number.isInteger(Number(cellValue));
                                if (Number(cellValue) <= 10 || Number(cellValue) >= 120) {
                                    errorMessages.push("Maximum pixel capacity is 120 and minimum pixel capacity is 10");
                                    isValid = false;
                                }
                            }
                            else if (cell === 12) {
                                //const pixcelFormatRegx = /^[0-9]\d{0,2}$/;
                                isValid = Number.isInteger(Number(cellValue));
                                if (Number(cellValue) < 1 || Number(cellValue) >= 10) {
                                    errorMessages.push("Invalid Country Id");
                                    isValid = false;
                                }
                            }
                            else {
                                    isValid = Number.isInteger(Number(cellValue)) && Number(cellValue) >= 0;
                            }
                            break;                           
                        case 'string':
                            const stringPattern = /^[a-zA-Z][a-zA-Z\s\d]*$/;
                            if (cell === 1) {
                                var value = table.rows[row].cells[cell].innerHTML;
                                var length = value.length;
                                isValid = isNaN(cellValue) && length < 20 && stringPattern.test(cellValue);
                                if (!isValid) {
                                    errorMessages.push("Special characters are not allowed, can't start with numbers and maximum length should be less than 20");
                                }
                            }
                            else if (cell === 16) {
                                const customerNameFormatRegx = /^[A-Z][a-zA-Z.\s]*$/;
                                var value = cellValue.length;
                                isValid = customerNameFormatRegx.test(cellValue) && value < 20;
                                if (!isValid) {
                                    errorMessages.push("Name should start with capital letter and can not contain special characters, numbers and maximum characters should be less than 20.");
                                }
                            }
                            else if (cell === 10) {
                                const dimensionFormatRegx = /^\d{4}\*\d{3}$/;
                                const value = cellValue
                                if (!dimensionFormatRegx.test(value)) {
                                    errorMessages.push("Dimension should be in the format:nnnn*nnn");
                                    isValid = false;
                                }
                            }
                            else if (cell === 15) {
                                const custIdFormatRegx = /^[a-zA-Z]+_\d{1,20}$/;
                                var value = cellValue.length;
                                isValid = custIdFormatRegx.test(cellValue) && value < 20;
                                if (!isValid) {
                                    errorMessages.push("Customer Id should be in the format name_number and maximum characters should be less than 20.");
                                }
                            }
                            else if (cell === 2 || cell === 19) {
                                var value = table.rows[row].cells[cell].innerHTML;
                                var discriptionLength = value.length;
                                isValid = discriptionLength < 50;
                                if (!isValid) {
                                    errorMessages.push("Character length should be less than 50");
                                }
                            }
                            else {
                                isValid = isNaN(cellValue) && stringPattern.test(cellValue);
                            }
                            break;
                        case 'date':
                            var dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
                            var matches = dateRegex.exec(cellValue);
                            if (!matches) {
                                isValid = false;
                                break;
                            }
                            var day = parseInt(matches[1], 10);
                            var month = parseInt(matches[2], 10);
                            var year = parseInt(matches[3], 10);
                            //if (isNaN(day) || isNaN(month) || isNaN(year)) {
                            //    isValid = false;
                            //    break;
                            //}
                            if (year < 2010 || year > 2023 || month === 0 || month > 12) {
                                isValid = false;
                                break;
                            }
                            var maxDay = 31;
                            if (month === 4 || month === 6 || month === 9 || month === 11) {
                                maxDay = 30;
                            } else if (month === 2) {
                                if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                                    maxDay = 29;
                                } else {
                                    maxDay = 28;
                                }
                            }
                            isValid = (day > 0 && day <= maxDay);
                            break;
                    }
                    if (isValid) {
                        originalValue = cellValue;
                        document.getElementById('errorMessage').innerHTML = "";
                    } else {
                        this.innerText = originalValue;
                        errorMessages.push("Invalid change");
                        if (errorMessages.length > 0) {
                            var errorMessage = errorMessages.join('\n');
                            //document.getElementById('errorMessage').innerHTML = errorMessage;
                            //console.log(errorMessage);
                            alert(errorMessage);
                        }
                    }
                });
            }
        }
    }
}
//save changes
function Save() {
    document.getElementById('excelFile').disabled = false;
    document.getElementById('editButton').disabled = false;
    document.getElementById('excelButton').disabled = false;
    document.getElementById('sqlButton').disabled = false;
    document.getElementById('truncateButton').disabled = false;
    document.getElementById('newRow').disabled = false;
    document.getElementById('deleteRow').disabled = false;
    document.getElementById('saveButton').disabled = true;
    document.getElementById('errorMessage').innerHTML = "";
    const table = document.getElementById('excelDataTable');
    for (let row = 1; row < table.rows.length; row++) {
        for (let cell = 0; cell < table.rows[row].cells.length; cell++) {
            table.rows[row].cells[cell].setAttribute('contenteditable', false);
            table.rows[row].cells[cell].style.border = '';
            table.rows[row].cells[cell].style.borderRadius = '';
            table.rows[row].cells[cell].style.backgroundColor = '';
            if (cell == 3) {               
                    var colors = document.getElementById("color");
                    var colorValue = colors.value;
                    table.rows[row].cells[cell].innerHTML = colorValue;               
            }
            if (cell == 5) {
                var os = document.getElementById("os");
                var osValue = os.value;
                table.rows[row].cells[cell].innerHTML = osValue;
            }
            if (cell == 6) {
                var ram = document.getElementById("ram");
                var ramValue = ram.value;
                table.rows[row].cells[cell].innerHTML = ramValue;
            }
            if (cell == 7) {
                var rom = document.getElementById("rom");
                var romValue = rom.value;
                table.rows[row].cells[cell].innerHTML = romValue;
            }
            if (cell == 13) {
                var country = document.getElementById("country");
                var countryValue = country.value;
                table.rows[row].cells[cell].innerHTML = countryValue;
            }
            if (cell == 18) {
                var gender = document.getElementById("gender");
                var genderValue = gender.value;
                table.rows[row].cells[cell].innerHTML = genderValue;
            }
            if (cell == 20) {
                var payment = document.getElementById("payment");
                var paymentValue = payment.value;
                table.rows[row].cells[cell].innerHTML = paymentValue;
            }
            if (cell == 21) {
                var purchase = document.getElementById("purchase");
                var purchaseValue = purchase.value;
                table.rows[row].cells[cell].innerHTML = purchaseValue;
            }
        }
    }
}
//Searching
function searchTable() {
    let input, filter, table, tableRow, tableData, i, cellContent;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase().trim();
    table = document.getElementById("excelDataTable");
    tableRow = table.getElementsByTagName("tr");
    for (i = 1; i < tableRow.length; i++) {
        tableData = tableRow[i].getElementsByTagName("td")[1];
        if (tableData) {
            cellContent = tableData.textContent || tableData.innerText;
            if (cellContent.toUpperCase().indexOf(filter) > -1) {
                tableRow[i].style.display = "";
            }
            else {
                tableRow[i].style.display = "none";
            }
        }
    }
}
//Excel download
//function exportTableToExcel(tableId, filename = '') {
//    var downloadLink;
//    var dataType = 'application/vnd.ms-excel';
//    var tableSelect = document.getElementById(tableId);
//    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
//    console.log(tableHTML);
//    filename = filename ? filename + '.xls' : 'A2ZmobileDetails.xls';
//    downloadLink = document.createElement("a");
//    document.body.appendChild(downloadLink);
//    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
//    downloadLink.download = filename;
//    downloadLink.click();
//}
function exportTableToExcel(type) {
    var data = document.getElementById('excelDataTable');
    var excelFile = XLSX.utils.table_to_book(data, { sheet: "A2Z mobiles" });
    XLSX.write(excelFile, { bookType: type, bookSST: true, type: 'base64' });
    XLSX.writeFile(excelFile, 'A2Z mobiles sales.' + type);
}
 //Export to SQL
function SendToSQL() {
    var table = document.getElementById("excelDataTable");
    var rows = table.rows;
    var data = [];
    //var duplicateCheck = {};
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.cells;
        var rowData = {};
        //var firstColumnValue = cells[0].textContent.trim(); 
        //if (duplicateCheck[firstColumnValue]) {
        //    alert("No duplicate value allowed in Item_Id");
        //    return; 
        //}
        //duplicateCheck[firstColumnValue] = true;
        for (var j = 0; j < cells.length; j++) {
            var cell = cells[j];
            var columnName = table.rows[0].cells[j].textContent;
            var cellValue = cell.textContent.trim();
            if (cellValue === "") {
                alert("Blank cell found at row " + (i) + ", column " + columnName);
                return;
            }
            if (columnName == 'Price (Rs)') {
                columnName = 'Price';
            }
            if (columnName == 'RAM (GB)') {
                columnName = 'RAM';
            }
            if (columnName == 'ROM (GB)') {
                columnName = 'ROM';
            }
            if (columnName == 'Battery (mAh)') {
                columnName = 'Battery';
            }
            if (columnName == 'Camera (px)') {
                columnName = 'Camera';
            }
            if (columnName == 'Dimension (mm) ') {
                columnName = 'Dimension';
            }
            if (columnName == 'Weight (grams)') {
                columnName = 'Weight';
            }
            rowData[columnName] = cell.textContent;
        }
        data.push(rowData);
    }
    var jsonData = JSON.stringify(data);
    $.ajax({
        type: "POST",
        url: "FirstPage.aspx/AddData",
        data: JSON.stringify({ jsonData: jsonData }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d !== " ") {
                document.getElementById('errorMessage').innerHTML = "Something went wrong, connect to the Administrator";
                console.log(response.d);
            }
            else {
                document.getElementById('errorMessage').innerHTML = "";
                alert("Successfully insert the data.");
            }
        },
        error: function (xhr) {
            alert("Failed to insert data");
            console.log(xhr.status + ": " + xhr.statusText);
        }
    });
}
//Truncate Table
function TruncateTable() {
    $.ajax({
        type: "POST",
        url: "FirstPage.aspx/TruncateTable",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Table truncated successfully.");
        },
        error: function (xhr) {
            alert("Error in truncating table.");
            console.log(xhr.status + ": " + xhr.statusText);
        }
    });
}



