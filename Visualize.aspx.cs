using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using MobileCompanyConstance;
using Newtonsoft.Json;
using System.Web.Services;
public partial class Page : System.Web.UI.Page
{
    [WebMethod]
    public static string GetChartData()
    {
        Constance constance = new Constance();
        using (SqlConnection connection = new SqlConnection(constance.sqlConnectionString))
        {
            connection.Open();
            using (SqlCommand getDataCommand = new SqlCommand(constance. mainQuery, connection))
            {
                getDataCommand.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = getDataCommand.ExecuteReader();
                var dataTable = new DataTable();
                dataTable.Load(reader);
                string jsonData = JsonConvert.SerializeObject(dataTable);
                return jsonData;
            }
        }
    }
}