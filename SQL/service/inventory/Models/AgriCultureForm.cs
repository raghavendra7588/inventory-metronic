using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class AgriCultureForm
    {
        public string Fpo { get; set; }
        public string FpoDistrictName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DOB { get; set; }
        public string PanNo { get; set; }
        public string AadharNo { get; set; }
        public string MobileNo { get; set; }
        public string EmailId { get; set; }
        public string Address { get; set; }
        public string Gaon { get; set; }
        public string Taluka { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string PinCode { get; set; }
        public string AreaGuntha { get; set; }

        public string AreaInAcre { get; set; }
        public string Well { get; set; }
        public string WaterLevelPerYear { get; set; }
        public string CropType { get; set; }
        public string NoOfTimesInYear { get; set; }
        public string MajorCrop { get; set; }
        public string MinorCrop { get; set; }
        public string MajorCropArea { get; set; }
        public string SmallCropArea { get; set; }
        public string MajorCropOutput { get; set; }
        public string SmallCropOutput { get; set; }
        public string LiveStock { get; set; }
        public string Tractor { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string YearOfPurchase { get; set; }
        public string Capacity { get; set; }
        public string Trollies { get; set; }
        public string PermanentLabour { get; set; }
        public string TemporaryLabour { get; set; }

        public string LiveStockDetails { get; set; }

        public string FaceBookDetails { get; set; }
        public string FaceBookID { get; set; }
    }

    public class AgriCultureFormBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();

        public string PostAgriculturalForm(AgriCultureForm objAgriCultureForm)
        {

            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_InsertAgicultureForm", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Fpo", objAgriCultureForm.Fpo);
            cmd.Parameters.AddWithValue("@FpoDistrictName", objAgriCultureForm.FpoDistrictName);
            cmd.Parameters.AddWithValue("@FirstName", objAgriCultureForm.FirstName);
            cmd.Parameters.AddWithValue("@LastName", objAgriCultureForm.LastName);
            cmd.Parameters.AddWithValue("@DOB", objAgriCultureForm.DOB);
            cmd.Parameters.AddWithValue("@PanNo", objAgriCultureForm.PanNo);

            cmd.Parameters.AddWithValue("@AadharNo", objAgriCultureForm.AadharNo);
            cmd.Parameters.AddWithValue("@EmailId", objAgriCultureForm.EmailId);
            cmd.Parameters.AddWithValue("@MobileNo", objAgriCultureForm.MobileNo);
            cmd.Parameters.AddWithValue("@Address", objAgriCultureForm.Address);
            cmd.Parameters.AddWithValue("@Gaon", objAgriCultureForm.Gaon);
            cmd.Parameters.AddWithValue("@Taluka", objAgriCultureForm.Taluka);

            cmd.Parameters.AddWithValue("@District", objAgriCultureForm.District);
            cmd.Parameters.AddWithValue("@State", objAgriCultureForm.State);
            cmd.Parameters.AddWithValue("@PinCode", objAgriCultureForm.PinCode);
            cmd.Parameters.AddWithValue("@AreaGuntha", objAgriCultureForm.AreaGuntha);
            cmd.Parameters.AddWithValue("@AreaInAcre", objAgriCultureForm.AreaInAcre);
            cmd.Parameters.AddWithValue("@Well", objAgriCultureForm.Well);
            cmd.Parameters.AddWithValue("@WaterLevelPerYear", objAgriCultureForm.WaterLevelPerYear);

            cmd.Parameters.AddWithValue("@CropType", objAgriCultureForm.CropType);
            cmd.Parameters.AddWithValue("@NoOfTimesInYear", objAgriCultureForm.NoOfTimesInYear);
            cmd.Parameters.AddWithValue("@MajorCrop", objAgriCultureForm.MajorCrop);
            cmd.Parameters.AddWithValue("@MinorCrop", objAgriCultureForm.MinorCrop);
            cmd.Parameters.AddWithValue("@MajorCropArea", objAgriCultureForm.MajorCropArea);
            cmd.Parameters.AddWithValue("@SmallCropArea", objAgriCultureForm.SmallCropArea);
            cmd.Parameters.AddWithValue("@MajorCropOutput", objAgriCultureForm.MajorCropOutput);
            cmd.Parameters.AddWithValue("@SmallCropOutput", objAgriCultureForm.SmallCropOutput);


            cmd.Parameters.AddWithValue("@LiveStock", objAgriCultureForm.LiveStock);
            cmd.Parameters.AddWithValue("@Tractor", objAgriCultureForm.Tractor);
            cmd.Parameters.AddWithValue("@Make", objAgriCultureForm.Make);
            cmd.Parameters.AddWithValue("@Model", objAgriCultureForm.Model);
            cmd.Parameters.AddWithValue("@YearOfPurchase", objAgriCultureForm.YearOfPurchase);
            cmd.Parameters.AddWithValue("@Capacity", objAgriCultureForm.Capacity);

            cmd.Parameters.AddWithValue("@Trollies", objAgriCultureForm.Trollies);
            cmd.Parameters.AddWithValue("@PermanentLabour", objAgriCultureForm.PermanentLabour);
            cmd.Parameters.AddWithValue("@TemporaryLabour", objAgriCultureForm.TemporaryLabour);

            cmd.Parameters.AddWithValue("@LiveStockDetails", objAgriCultureForm.LiveStockDetails);
            cmd.Parameters.AddWithValue("@FaceBookDetails", objAgriCultureForm.FaceBookDetails);
            cmd.Parameters.AddWithValue("@FaceBookID", objAgriCultureForm.FaceBookID);

            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";

        }
    }
}
