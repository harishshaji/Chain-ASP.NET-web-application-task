using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Web.Services;
using MobileCompanyConstance;
using System.Text;
using System.Text.RegularExpressions;
using System.Net;
using System.Globalization;
namespace MobileCompany
{
    public partial class FirstPage : System.Web.UI.Page
    {
        [WebMethod]
        public static string AddData(string jsonData)
        {
            Constance constance = new Constance();
            try
            {
                List<TableData> dataList = JsonConvert.DeserializeObject<List<TableData>>(jsonData);
                if (dataList == null)
                {
                    constance.errorMessages.AppendLine(constance.emptyDataValidationMessage);
                }
                using (SqlConnection connection = new SqlConnection(constance.sqlConnectionString))
                {
                    foreach (TableData data in dataList)
                    {
                        string stringItem_Id = data.Item_Id.ToString();
                        if (string.IsNullOrEmpty(stringItem_Id))
                        {
                            constance.errorMessages.AppendLine(constance.itemIdValidationMessage);
                        }
                        if (data.Price <= 5000 || data.Price > 300000)
                        {
                            constance.errorMessages.AppendLine(constance.priceValidationMessage);
                        }
                        if (!constance.ramList.Contains(data.RAM))
                        {
                            constance.errorMessages.AppendLine(constance.ramValidationMessage);
                        }
                        if (!constance.romList.Contains(data.ROM))
                        {
                            constance.errorMessages.AppendLine(constance.romValidationMessage);
                        }
                        if (data.Battery < 2000 || data.Battery > 10000)
                        {
                            constance.errorMessages.AppendLine(constance.batteryValidationMessage);
                        }
                        if (data.Weight < 100 || data.Weight > 500)
                        {
                            constance.errorMessages.AppendLine(constance.weightValidationMessage);
                        }
                        if (data.Sales_quantity <= 0 || data.Sales_quantity > 300000)
                        {
                            constance.errorMessages.AppendLine(constance.quantityValidationMessage);
                        }
                        Regex nameRegex = new Regex(constance.nameString);
                        if (!nameRegex.IsMatch(data.Name) || data.Name.Length >= 25)
                        {
                            constance.errorMessages.AppendLine(constance.nameValidationMessage);
                        }
                        //Regex descriptionRegex = new Regex(constance.descriptionString);
                        if (data.Descripton.Length > 50)
                        {
                            constance.errorMessages.AppendLine(constance.descriptionValidationMessage);
                        }
                        if (!constance.colorList.Contains(data.Color))
                        {
                            constance.errorMessages.AppendLine(constance.colorValidationMessage);
                        }
                        if (!constance.osList.Contains(data.OS))
                        {
                            constance.errorMessages.AppendLine(constance.osValidationMessage);
                        }
                        //Regex cameraRegex = new Regex(constance.cameraString);
                        if (data.Camera<=10 || data.Camera>=120)
                        {
                            constance.errorMessages.AppendLine(constance.cameraValidationMessage);
                        }
                        Regex dimensionRegex = new Regex(constance.dimensionString);
                        if (!dimensionRegex.IsMatch(data.Dimension))
                        {
                            constance.errorMessages.AppendLine(constance.dimensionValidationMessage);
                        }
                        if (!constance.countryList.Contains(data.Country_Name))
                        {
                            constance.errorMessages.AppendLine(constance.countryValidationMessage);
                        }
                        Regex customerRegex = new Regex(constance.customerString);
                        if (!customerRegex.IsMatch(data.Customer_Name) || data.Customer_Name.Length >= 20)
                        {
                            constance.errorMessages.AppendLine(constance.customerValidationMessage);
                        }
                        Regex customerIdRegex = new Regex(constance.customerIdString);
                        if (!customerIdRegex.IsMatch(data.Customer_Id) || data.Customer_Id.Length >= 25)
                        {
                            constance.errorMessages.AppendLine(constance.customerIdValidationMessage);
                        }
                        if (!constance.genderList.Contains(data.Gender))
                        {
                            constance.errorMessages.AppendLine(constance.genderValidationMessage);
                        }
                        if (data.Address.Length > 50)
                        {
                            constance.errorMessages.AppendLine(constance.addressValidationMessage);
                        }
                        if (!constance.paymentList.Contains(data.Payment_Type))
                        {
                            constance.errorMessages.AppendLine(constance.paymentValidationMessage);
                        }
                        if (!constance.purchaseList.Contains(data.Purchase_Type))
                        {
                            constance.errorMessages.AppendLine(constance.purchaseValidationMessage);
                        }
                        //var countryIdNamePair = new Dictionary<int, string> { { 1, "America" }, { 2, "India" } };
                        if(!(data.Country_Id == 1 && data.Country_Name == constance.country1) && !(data.Country_Id == 2 && data.Country_Name == constance.country2) && !(data.Country_Id == 3 && data.Country_Name == constance.country3) && !(data.Country_Id == 4 && data.Country_Name == constance.country4) && !(data.Country_Id == 7 && data.Country_Name == constance.country5) && !(data.Country_Id == 8 && data.Country_Name == constance.country6))
                        {
                            constance.errorMessages.AppendLine(constance.countryMissmatchValidationMessage);
                        }
                        Regex dateRegex = new Regex(constance.datePattern);
                        if (!dateRegex.IsMatch(data.Purchase_Date))
                        {
                            constance.errorMessages.AppendLine(constance.dateIdValidationMessage);
                        }
                        if (data.Purchase_Date != null)
                        {
                            DateTime currentDate = DateTime.Today;
                            DateTime inputDate = DateTime.ParseExact(data.Purchase_Date, constance.dateFormat, CultureInfo.InvariantCulture);
                            int result = DateTime.Compare(currentDate, inputDate);
                            if (result < 0)
                            {
                                constance.errorMessages.AppendLine(constance.dateIdValidationMessage);
                            }
                        }
                        if( data.Age<15 || data.Age>120)
                        {
                            constance.errorMessages.AppendLine("Age should be between 15 and 120");
                        }
                        if (constance.errorMessages.Length > 0)
                        {
                            return constance.errorMessages.ToString();
                        }                        
                        using (SqlCommand commandItem = new SqlCommand(constance.itemSqlQuery, connection))
                        {
                            commandItem.CommandType = System.Data.CommandType.StoredProcedure;
                            commandItem.Parameters.AddWithValue(constance.Item_id, data.Item_Id);
                            commandItem.Parameters.AddWithValue(constance.Name, data.Name);
                            commandItem.Parameters.AddWithValue(constance.Descripton, data.Descripton);
                            commandItem.Parameters.AddWithValue(constance.Color, data.Color);
                            commandItem.Parameters.AddWithValue(constance.Price, data.Price);
                            commandItem.Parameters.AddWithValue(constance.Country_Id, data.Country_Id);
                            commandItem.Parameters.AddWithValue(constance.RAM, data.RAM);
                            commandItem.Parameters.AddWithValue(constance.ROM, data.ROM);
                            commandItem.Parameters.AddWithValue(constance.Battery, data.Battery);
                            commandItem.Parameters.AddWithValue(constance.Camera, data.Camera);
                            commandItem.Parameters.AddWithValue(constance.Dimension, data.Dimension);
                            commandItem.Parameters.AddWithValue(constance.OS, data.OS);
                            commandItem.Parameters.AddWithValue(constance.Weight, data.Weight);
                            connection.Open();
                            commandItem.ExecuteNonQuery();
                            connection.Close();
                        }
                        DateTime purchaseDate = DateTime.ParseExact(data.Purchase_Date,"d", null);
                        constance.totalPrice = data.Sales_quantity * data.Price;
                        using (SqlCommand commandSales = new SqlCommand(constance.salesSqlQuery, connection))
                        {
                            commandSales.CommandType = System.Data.CommandType.StoredProcedure;
                            commandSales.Parameters.AddWithValue(constance.Item_id, data.Item_Id);
                            commandSales.Parameters.AddWithValue(constance.Country_Id, data.Country_Id);
                            commandSales.Parameters.AddWithValue(constance.Price, constance.totalPrice);
                            commandSales.Parameters.AddWithValue(constance.Customer_Id, data.Customer_Id);
                            commandSales.Parameters.AddWithValue(constance.Payment_Type, data.Payment_Type);
                            commandSales.Parameters.AddWithValue(constance.Purchase_Type, data.Purchase_Type);
                            commandSales.Parameters.AddWithValue(constance.Purchase_Date, purchaseDate);
                            commandSales.Parameters.AddWithValue(constance.Sales_quantity, data.Sales_quantity);
                            connection.Open();
                            commandSales.ExecuteNonQuery();
                            connection.Close();
                        }
                        using (SqlCommand commandCustomer = new SqlCommand(constance.customerSqlQuery, connection))
                        {
                            commandCustomer.CommandType = System.Data.CommandType.StoredProcedure;
                            commandCustomer.Parameters.AddWithValue(constance.Customer_Id, data.Customer_Id);
                            commandCustomer.Parameters.AddWithValue(constance.Customer_Name, data.Customer_Name);
                            commandCustomer.Parameters.AddWithValue(constance.Gender, data.Gender);
                            commandCustomer.Parameters.AddWithValue(constance.Age, data.Age);
                            commandCustomer.Parameters.AddWithValue(constance.Address, data.Address);
                            commandCustomer.Parameters.AddWithValue(constance.Country_Id, data.Country_Id);
                            connection.Open();
                            commandCustomer.ExecuteNonQuery();
                            connection.Close();
                        }
                        using (SqlCommand commandCountry = new SqlCommand(constance.countrySqlQuery, connection))
                        {
                            commandCountry.CommandType = System.Data.CommandType.StoredProcedure;
                            commandCountry.Parameters.AddWithValue(constance.Country_Id, data.Country_Id);
                            commandCountry.Parameters.AddWithValue(constance.Country_Name, data.Country_Name);
                            connection.Open();
                            commandCountry.ExecuteNonQuery();
                            connection.Close();
                        }
                    }
                    return constance.emptyString;
                }
            }
            catch (Exception ex)
            {
                //return "Something wrong happened, connect to the Admin ";
                return ex.Message;
            }
        }
        [WebMethod]
        public static void TruncateTable()
        {
            Constance constance = new Constance();
            using (SqlConnection connection = new SqlConnection(constance.sqlConnectionString))
            {
            using (SqlCommand ItemDeletecommand = new SqlCommand(constance.truncateItemQuery, connection))
                {
                    ItemDeletecommand.CommandType = System.Data.CommandType.StoredProcedure;
                    connection.Open();
                    ItemDeletecommand.ExecuteNonQuery();
                    connection.Close();
                }
                using (SqlCommand SalesDeletecommand = new SqlCommand(constance.truncateSalesQuery, connection))
                {
                    SalesDeletecommand.CommandType = System.Data.CommandType.StoredProcedure;
                    connection.Open();
                    SalesDeletecommand.ExecuteNonQuery();
                    connection.Close();
                }
                using (SqlCommand CustomerDeletecommand = new SqlCommand(constance.truncateCustomerQuery, connection))
                {
                    CustomerDeletecommand.CommandType = System.Data.CommandType.StoredProcedure;
                    connection.Open();
                    CustomerDeletecommand.ExecuteNonQuery();
                    connection.Close();
                }
                using (SqlCommand CountryDeletecommand = new SqlCommand(constance.truncateCountryQuery, connection))
                {
                    CountryDeletecommand.CommandType = System.Data.CommandType.StoredProcedure;
                    connection.Open();
                    CountryDeletecommand.ExecuteNonQuery();
                    connection.Close();
                }
            }
        }
        public class TableData
        {
            public int Item_Id { get; set; }
            public string Name { get; set; }
            public string Descripton { get; set; }
            public string Color { get; set; }
            public int Price { get; set; }
            public string OS { get; set; }
            public int RAM { get; set; }
            public int ROM { get; set; }
            public int Battery { get; set; }
            public int Camera { get; set; }
            public string Dimension { get; set; }
            public int Weight { get; set; }
            public int Country_Id { get; set; }
            public string Country_Name { get; set; }
            public int Sales_quantity { get; set; }
            public string Customer_Id { get; set; }
            public string Customer_Name { get; set; }
            public int Age { get; set; }
            public string Gender { get; set; }
            public string Address { get; set; }
            public string Payment_Type { get; set; }
            public string Purchase_Type { get; set; }
            public string Purchase_Date { get; set; }
        }
    }
}
