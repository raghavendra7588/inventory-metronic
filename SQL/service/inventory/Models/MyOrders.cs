using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class MyOrders
    {
        public  string VendorCode { get; set; }
        public string VendorName { get; set; }
        public string OrderDate { get; set; }
        public string DeliveryDate { get; set; }
        public string SellerId { get; set; }
        public string OrderNo { get; set; }

    }

    public class EditItems
    {
        public int PurchaseProductId { get; set; }
        public int PurchaseProductsItemId { get; set; }
        public string name { get; set; }

        public string Unit { get; set; }
        public int MRP { get; set; }
        public int Quantity { get; set; }

        public int RequiredQuantity { get; set; }
        public int FinalPrice { get; set; }
        public int Discount { get; set; }

    }

    public class DeleteMyOrdersItems
    {
        public int PurchaseProductId { get; set; }
        public int PurchaseProductsItemId { get; set; }
    }

    public class MyOrdersBL
    {

        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();


        public DataTable getAllData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetMyOrdersDataByPurchaseProductId";
            command.Parameters.AddWithValue("@PurchaseProductId", id);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }



        public DataTable postAllData(MyOrders objMyOrders)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            //string sql = BuildQuery(purchaseReport.sellerId, purchaseReport.vendorId, purchaseReport.orderNo, purchaseReport.startDate, purchaseReport.endDate);
            conn.Open();

            command.Connection = conn;

            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetMyOrdersData";

            command.Parameters.AddWithValue("@VendorCode", objMyOrders.VendorCode);
            command.Parameters.AddWithValue("@VendorName", objMyOrders.VendorName);
            command.Parameters.AddWithValue("@OrderDate", objMyOrders.OrderDate);
            command.Parameters.AddWithValue("@DeliveryDate", objMyOrders.DeliveryDate);
            command.Parameters.AddWithValue("@SellerId", objMyOrders.SellerId);
            command.Parameters.AddWithValue("@OrderNo", objMyOrders.OrderNo);



            SqlDataAdapter adapter = new SqlDataAdapter(command);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;
        }

        public string postEditItemsData(List<EditItems> editItemsData)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_updateMyOrders", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            string strPurchaseProductId = editItemsData[0].PurchaseProductId.ToString();


            for (int i = 0; i < editItemsData.Count; i++)
            {
                cmd.Parameters.Clear();


                cmd.Parameters.AddWithValue("@PurchaseProductsItemId", editItemsData[i].PurchaseProductsItemId);
                cmd.Parameters.AddWithValue("@Discount", Convert.ToDouble(editItemsData[i].Discount));

                cmd.Parameters.AddWithValue("@FinalPrice", Convert.ToDouble(editItemsData[i].FinalPrice));
                cmd.Parameters.AddWithValue("@MRP", editItemsData[i].MRP);
                cmd.Parameters.AddWithValue("@Quantity", editItemsData[i].Quantity);

                cmd.Parameters.AddWithValue("@RequiredQuantity", editItemsData[i].RequiredQuantity);
                cmd.Parameters.AddWithValue("@Unit", editItemsData[i].Unit);
                cmd.Parameters.AddWithValue("@name", editItemsData[i].name);

                cmd.ExecuteNonQuery();
            }

            conn.Close();
            return strPurchaseProductId;
        }


        public string deleteMyOrdersProducts(DeleteMyOrdersItems objDeleteMyOrdersItems)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            conn.Open();
            command.CommandText = "Mst_delete_MyOrdersData";
            command.Parameters.AddWithValue("@PurchaseProductId", objDeleteMyOrdersItems.PurchaseProductId);
            command.Parameters.AddWithValue("@PurchaseProductsItemId", objDeleteMyOrdersItems.PurchaseProductsItemId);
            SqlDataAdapter adapter = new SqlDataAdapter(command);
     

            conn.Close();

            return "Record Deleted";
        }
    }
}