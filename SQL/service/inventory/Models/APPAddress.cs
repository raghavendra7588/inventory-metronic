using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class APPAddress
    {

        public int id { get; set; }
        public int sellerId { get; set; }
        public string vendorId { get; set; }
        public string name { get; set; }
        public string mobileNumber { get; set; }
        public string houseNO { get; set; }
        public string society { get; set; }
        public string landmark { get; set; }
        public int pincode { get; set; }
        public string city { get; set; }
        public string area { get; set; }
        public string state { get; set; }

    }
    public class APPAddressBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public DataTable getAllAPPAdressData(string id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "getAllAPPAddress";
            command.Parameters.AddWithValue("@vendorId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public string postAPPAdressToDb(APPAddress addressData)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_App_InsertAddress", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@sellerId", addressData.sellerId);
            cmd.Parameters.AddWithValue("@vendorId", addressData.vendorId);
            cmd.Parameters.AddWithValue("@name", addressData.name);
            cmd.Parameters.AddWithValue("@mobileNumber", addressData.mobileNumber);
            cmd.Parameters.AddWithValue("@houseNO", addressData.houseNO);
            cmd.Parameters.AddWithValue("@society", addressData.society);
            cmd.Parameters.AddWithValue("@landmark", addressData.landmark);
            cmd.Parameters.AddWithValue("@pincode", Convert.ToInt32(addressData.pincode));
            cmd.Parameters.AddWithValue("@city", addressData.city);
            cmd.Parameters.AddWithValue("@area", addressData.area);
            cmd.Parameters.AddWithValue("@state", addressData.state);

            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";
        }

        public string updateAPPAdressToDb(APPAddress addressData, int id)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_App_updateAddressMaster", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@sellerId", addressData.sellerId);
            cmd.Parameters.AddWithValue("@vendorId", addressData.vendorId);
            cmd.Parameters.AddWithValue("@name", addressData.name);
            cmd.Parameters.AddWithValue("@mobileNumber", addressData.mobileNumber);
            cmd.Parameters.AddWithValue("@houseNO", addressData.houseNO);
            cmd.Parameters.AddWithValue("@society", addressData.society);
            cmd.Parameters.AddWithValue("@pincode", Convert.ToInt32(addressData.pincode));
            cmd.Parameters.AddWithValue("@landmark", addressData.landmark);
            cmd.Parameters.AddWithValue("@city", addressData.city);
            cmd.Parameters.AddWithValue("@area", addressData.area);
            cmd.Parameters.AddWithValue("@state", addressData.state);


            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";
        }
    }
}