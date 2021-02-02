using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class ProductsVendorWisePurchaseReport
    {

        public string categoryId { get; set; }
        public string subcategoryId { get; set; }
        public string brandId { get; set; }
        public string productId { get; set; }
        public string startDate { get; set; }
        public string endDate { get; set; }
        public string sellerId { get; set; }
        public string vendorId { get; set; }
    }

    public class ProductsVendorWisePurchaseReportBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public DataTable postAllData(ProductsVendorWisePurchaseReport objProductsVendorWisePurchaseReport)
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            //string sql = BuildQuery(purchaseReportInventory.sellerId, purchaseReportInventory.subcategoryId, purchaseReportInventory.brandId, purchaseReportInventory.productId, purchaseReportInventory.startDate, purchaseReportInventory.endDate);
            conn.Open();
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "ProductVendor_Wise_Purchase_Report";


            command.Parameters.AddWithValue("@SellerId", objProductsVendorWisePurchaseReport.sellerId);
            command.Parameters.AddWithValue("@SubCategoryId", objProductsVendorWisePurchaseReport.subcategoryId);
            command.Parameters.AddWithValue("@BrandId", objProductsVendorWisePurchaseReport.brandId);
            command.Parameters.AddWithValue("@ProductId", objProductsVendorWisePurchaseReport.productId);
            command.Parameters.AddWithValue("@OrderDate", objProductsVendorWisePurchaseReport.startDate);
            command.Parameters.AddWithValue("@DeliveryDate", objProductsVendorWisePurchaseReport.endDate);
            command.Parameters.AddWithValue("@VendorId", objProductsVendorWisePurchaseReport.vendorId);

            SqlDataAdapter adapter = new SqlDataAdapter(command);

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }



        public DataTable createReportData(DataTable dt)
        {
            DataTable table = new DataTable();

            table.Columns.Add("ProductName", typeof(string));
            table.Columns.Add("Brand", typeof(string));
            table.Columns.Add("Varient", typeof(string));


            table.Columns.Add("BuyingPrice", typeof(string));
            table.Columns.Add("Discount", typeof(int));
            table.Columns.Add("ProductVarientId", typeof(string));
            table.Columns.Add("ProductId", typeof(int));
            table.Columns.Add("TotalQuantityOrder", typeof(int));

            table.Columns.Add("TotalFinalPrice", typeof(int));
            table.Columns.Add("TotalDiscountPrice", typeof(int));
            table.Columns.Add("FinalPurchaseAmount", typeof(int));

            table.Columns.Add("BrandTotal", typeof(int));
            table.Columns.Add("TotalOrder", typeof(int));




            for (int i = 0; i < dt.Rows.Count; i++)
            {

                string strProductName = dt.Rows[i]["ProductName"].ToString();
                string strBrandName = dt.Rows[i]["BrandName"].ToString();
                string strVarientName = dt.Rows[i]["Varient"].ToString();
                string strVendorName = dt.Rows[i]["name"].ToString();
                string strBuyingPrice = dt.Rows[i]["BuyingPrice"].ToString();
                string strDiscount = dt.Rows[i]["Discount"].ToString();
                string strProductVarientId = dt.Rows[i]["ProductVarientId"].ToString();

                string strProductId = dt.Rows[i]["ProductId"].ToString();
                string strFinalPrice = dt.Rows[i]["FinalPrice"].ToString();
                string strPurchaseQuantity = dt.Rows[i]["PurchaseQuantity"].ToString();
                string strOrderNo = dt.Rows[i]["OrderNo"].ToString();
                int intBrandId= Convert.ToInt32(dt.Rows[i]["BrandName"].ToString());

                int totalQuantityOrder = 0;
                int totalFinalPrice = 0;
                int totalDiscountPrice = 0;
                int finalPurchaseAmount = 0;
                int totalOrderNo = 0;

                int brandWiseTotal = 0;

                for (int j = 0; j < dt.Rows.Count; j++)
                {
                    if (strProductVarientId == dt.Rows[j]["ProductVarientId"].ToString())
                    {
                        totalQuantityOrder += Convert.ToInt32(dt.Rows[j]["PurchaseQuantity"].ToString());
                        totalFinalPrice += Convert.ToInt32(dt.Rows[j]["FinalPrice"].ToString());
                        totalDiscountPrice = totalDiscountPrice+ Convert.ToInt32(dt.Rows[j]["Discount"].ToString()) * Convert.ToInt32(dt.Rows[j]["PurchaseQuantity"].ToString());
                        finalPurchaseAmount = totalFinalPrice - totalDiscountPrice;
                      

                        if (intBrandId == Convert.ToInt32(dt.Rows[j]["BrandID"].ToString()))
                        {
                            totalOrderNo++; 
                            brandWiseTotal += ( (Convert.ToInt32(dt.Rows[j]["FinalPrice"].ToString())) ); 

                        }
                     
                    }
                }
                table.Rows.Add(strProductName, strBrandName, strVarientName, strBuyingPrice,
                     strDiscount, strProductVarientId, strProductId,
                    totalQuantityOrder, totalFinalPrice, totalDiscountPrice,
                    finalPurchaseAmount, brandWiseTotal, totalOrderNo);
            }

            // table = table.DefaultView.ToTable(true, "ProductVarientId", "ProductName", "Brand", "Varient", "VendorName", "OrderNo", "TotalOrderNo", "BuyingPrice", "ProductId", "Discount", "FinalPrice", "PurchaseQuantity", "TotalQuantityOrder", "TotalFinalPrice", "TotalDiscountPrice", "FinalPurchaseAmount");
            return table;
        }

    }
}
 
