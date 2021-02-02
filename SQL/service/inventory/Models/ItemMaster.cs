using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class ItemMaster
    {
        public int itemMasterId { get; set; }
        public string productName { get; set; }
        public string underGroup { get; set; }
        public string barCode { get; set; }
        public string categoryId { get; set; }
        public string subCategoryId { get; set; }
        public string brandId { get; set; }
        public string gstClassification { get; set; }
        public string activeStatus { get; set; }
        public string purchaseDescription { get; set; }
        public string purchaseMeasurementUnit { get; set; }
        public string purchaseVarient { get; set; }
        public double purchasePrice { get; set; }
        public double purchaseDiscount { get; set; }   
        public double finalPurchasePrice { get; set; }
        public string sellingDescription { get; set; }
        public string sellingMeasurementUnit { get; set; }
        public string sellingVarient { get; set; }
        public double sellingPrice { get; set; }
        public double sellingDiscount { get; set; }
        public double finalSellingPrice { get; set; }
        public string itemType { get; set; }
        public string minimumLevel { get; set; }
        public string serialTracking { get; set; }  
        public string sellerId { get; set; }
    }

    public class ItemMasterBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();


        public DataTable getAllData(int id)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_GetItemMaster";
            command.Parameters.AddWithValue("@SellerId", id.ToString());
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }



        public string postItemMasterToDb(ItemMaster objItemMaster)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_insertItemMaster", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ProductName", objItemMaster.productName);
            cmd.Parameters.AddWithValue("@UnderGroup", objItemMaster.underGroup);
            cmd.Parameters.AddWithValue("@BarCode", objItemMaster.barCode);
            cmd.Parameters.AddWithValue("@CategoryId", objItemMaster.categoryId);
            cmd.Parameters.AddWithValue("@SubCategoryId", objItemMaster.subCategoryId);
            cmd.Parameters.AddWithValue("@BrandId", objItemMaster.brandId);
            cmd.Parameters.AddWithValue("@GstClassification", objItemMaster.gstClassification);
            cmd.Parameters.AddWithValue("@ActiveStatus", objItemMaster.activeStatus);
            cmd.Parameters.AddWithValue("@PurchaseDescription", objItemMaster.purchaseDescription);

            cmd.Parameters.AddWithValue("@PurchaseMeasurementUnit", objItemMaster.purchaseMeasurementUnit);
            cmd.Parameters.AddWithValue("@PurchaseVarient", objItemMaster.purchaseVarient);
            cmd.Parameters.AddWithValue("@PurchasePrice", objItemMaster.purchasePrice);
            cmd.Parameters.AddWithValue("@PurchaseDiscount", objItemMaster.purchaseDiscount);
            cmd.Parameters.AddWithValue("@FinalPurchasePrice", objItemMaster.finalPurchasePrice);
            cmd.Parameters.AddWithValue("@SellingDescription", objItemMaster.sellingDescription);
            cmd.Parameters.AddWithValue("@SellingMeasurementUnit", objItemMaster.sellingMeasurementUnit);

            cmd.Parameters.AddWithValue("@SellingVarient", objItemMaster.sellingVarient);
            cmd.Parameters.AddWithValue("@SellingPrice", Convert.ToDouble(objItemMaster.sellingPrice));
            cmd.Parameters.AddWithValue("@SellingDiscount", objItemMaster.sellingDiscount);
            cmd.Parameters.AddWithValue("@FinalSellingPrice", objItemMaster.finalSellingPrice);

            cmd.Parameters.AddWithValue("@ItemType", objItemMaster.itemType);
            cmd.Parameters.AddWithValue("@MinimumLevel", objItemMaster.minimumLevel);
            cmd.Parameters.AddWithValue("@SerialTracking", objItemMaster.serialTracking);

            cmd.Parameters.AddWithValue("@SellerId", objItemMaster.sellerId);
            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";
        }


        public string updateItemMasterToDb(ItemMaster objItemMaster, int ItemMasterId)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_updateItemMaster", conn);
            cmd.CommandType = CommandType.StoredProcedure;


            cmd.Parameters.AddWithValue("@ItemMasterId", Convert.ToInt32(ItemMasterId));
            cmd.Parameters.AddWithValue("@ProductName", objItemMaster.productName);
            cmd.Parameters.AddWithValue("@UnderGroup", objItemMaster.underGroup);
            cmd.Parameters.AddWithValue("@BarCode", objItemMaster.barCode);
            cmd.Parameters.AddWithValue("@CategoryId", objItemMaster.categoryId);
            cmd.Parameters.AddWithValue("@SubCategoryId", objItemMaster.subCategoryId);
            cmd.Parameters.AddWithValue("@BrandId", objItemMaster.brandId);
            cmd.Parameters.AddWithValue("@GstClassification", objItemMaster.gstClassification);
            cmd.Parameters.AddWithValue("@ActiveStatus", objItemMaster.activeStatus);
            cmd.Parameters.AddWithValue("@PurchaseDescription", objItemMaster.purchaseDescription);

            cmd.Parameters.AddWithValue("@PurchaseMeasurementUnit", objItemMaster.purchaseMeasurementUnit);
            cmd.Parameters.AddWithValue("@PurchaseVarient", objItemMaster.purchaseVarient);
            cmd.Parameters.AddWithValue("@PurchasePrice", objItemMaster.purchasePrice);
            cmd.Parameters.AddWithValue("@PurchaseDiscount", objItemMaster.purchaseDiscount);
            cmd.Parameters.AddWithValue("@FinalPurchasePrice", objItemMaster.finalPurchasePrice);
            cmd.Parameters.AddWithValue("@SellingDescription", objItemMaster.sellingDescription);
            cmd.Parameters.AddWithValue("@SellingMeasurementUnit", objItemMaster.sellingMeasurementUnit);

            cmd.Parameters.AddWithValue("@SellingVarient", objItemMaster.sellingVarient);
            cmd.Parameters.AddWithValue("@SellingPrice", objItemMaster.sellingPrice);
            cmd.Parameters.AddWithValue("@SellingDiscount", objItemMaster.sellingDiscount);
            cmd.Parameters.AddWithValue("@FinalSellingPrice", objItemMaster.finalSellingPrice);

            cmd.Parameters.AddWithValue("@ItemType", objItemMaster.itemType);
            cmd.Parameters.AddWithValue("@MinimumLevel", objItemMaster.minimumLevel);
            cmd.Parameters.AddWithValue("@SerialTracking", objItemMaster.serialTracking);

            cmd.Parameters.AddWithValue("@SellerId", objItemMaster.sellerId);
            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";
        }
    }
}