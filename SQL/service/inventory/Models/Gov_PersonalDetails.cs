using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace inventory.Models
{
    public class Gov_PersonalDetails
    {
        public string id { get; set; }
        public string ArtistSystemCode { get; set; }

        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string DOB { get; set; }
        public string AnnualIncome { get; set; }
        public string ArtType { get; set; }
        public string PeriodOfWork { get; set; }
        public string Grade { get; set; }
        public string Address { get; set; }

        public string Taluka { get; set; }
        public string District { get; set; }

        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }

        public string AadharNo { get; set; }
        public string PanNo { get; set; }

        public string SpouseName { get; set; }
        public string AccountName { get; set; }

        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankIFSCCode { get; set; }
        public string City { get; set; }
    }

    public class Gov_PersonalDetailsBL
    {
        string strConn = ConfigurationManager.ConnectionStrings["sqlConnection"].ToString();


        public DataTable getAllData()
        {
            SqlCommand command = new SqlCommand();
            SqlConnection conn = new SqlConnection(strConn);
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "Mst_Get_Gov_Personal_Detail";
     
            SqlDataAdapter adapter = new SqlDataAdapter(command);
            conn.Open();

            DataSet fileData = new DataSet();
            adapter.Fill(fileData, "fileData");
            conn.Close();
            DataTable firstTable = fileData.Tables[0];
            return firstTable;

        }

        public string PostGovPersonalDetails(Gov_PersonalDetails objGov_PersonalDetails)
        {

            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_InsertGovPersonalDetails", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ArtistSystemCode", objGov_PersonalDetails.ArtistSystemCode);
            cmd.Parameters.AddWithValue("@FirstName", objGov_PersonalDetails.FirstName);
            cmd.Parameters.AddWithValue("@MiddleName", objGov_PersonalDetails.MiddleName);
            cmd.Parameters.AddWithValue("@LastName", objGov_PersonalDetails.LastName);
            cmd.Parameters.AddWithValue("@DOB", objGov_PersonalDetails.DOB);

            cmd.Parameters.AddWithValue("@AnnualIncome", objGov_PersonalDetails.AnnualIncome);
            cmd.Parameters.AddWithValue("@ArtType", objGov_PersonalDetails.ArtType);
            cmd.Parameters.AddWithValue("@PeriodOfWork", objGov_PersonalDetails.PeriodOfWork);
            cmd.Parameters.AddWithValue("@Grade", objGov_PersonalDetails.Grade);
            cmd.Parameters.AddWithValue("@Address", objGov_PersonalDetails.Address);
            cmd.Parameters.AddWithValue("@Taluka", objGov_PersonalDetails.Taluka);

            cmd.Parameters.AddWithValue("@District", objGov_PersonalDetails.District);
            cmd.Parameters.AddWithValue("@ContactNo1", objGov_PersonalDetails.ContactNo1);
            cmd.Parameters.AddWithValue("@ContactNo2", objGov_PersonalDetails.ContactNo2);
            cmd.Parameters.AddWithValue("@AadharNo", objGov_PersonalDetails.AadharNo);
            cmd.Parameters.AddWithValue("@PanNo", objGov_PersonalDetails.PanNo);
            cmd.Parameters.AddWithValue("@SpouseName", objGov_PersonalDetails.SpouseName);

            cmd.Parameters.AddWithValue("@AccountName", objGov_PersonalDetails.AccountName);
            cmd.Parameters.AddWithValue("@AccountNumber", objGov_PersonalDetails.AccountNumber);
            cmd.Parameters.AddWithValue("@BankName", objGov_PersonalDetails.BankName);

            cmd.Parameters.AddWithValue("@BankIFSCCode", objGov_PersonalDetails.BankIFSCCode);
            cmd.Parameters.AddWithValue("@City", objGov_PersonalDetails.City);

            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";

        }

        //Mst_update_Gov_Personal_Detail
        public string updateAddressToDb(Gov_PersonalDetails objGov_PersonalDetails, int id)
        {
            SqlConnection conn = new SqlConnection(strConn);
            conn.Open();
            SqlCommand cmd = new SqlCommand("Mst_update_Gov_Personal_Detail", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@id", Convert.ToInt32(id));
            cmd.Parameters.AddWithValue("@ArtistSystemCode", objGov_PersonalDetails.ArtistSystemCode);
            cmd.Parameters.AddWithValue("@FirstName", objGov_PersonalDetails.FirstName);
            cmd.Parameters.AddWithValue("@MiddleName", objGov_PersonalDetails.MiddleName);
            cmd.Parameters.AddWithValue("@LastName", objGov_PersonalDetails.LastName);
            cmd.Parameters.AddWithValue("@DOB", objGov_PersonalDetails.DOB);

            cmd.Parameters.AddWithValue("@AnnualIncome", objGov_PersonalDetails.AnnualIncome);
            cmd.Parameters.AddWithValue("@ArtType", objGov_PersonalDetails.ArtType);
            cmd.Parameters.AddWithValue("@PeriodOfWork", objGov_PersonalDetails.PeriodOfWork);
            cmd.Parameters.AddWithValue("@Grade", objGov_PersonalDetails.Grade);
            cmd.Parameters.AddWithValue("@Address", objGov_PersonalDetails.Address);
            cmd.Parameters.AddWithValue("@Taluka", objGov_PersonalDetails.Taluka);

            cmd.Parameters.AddWithValue("@District", objGov_PersonalDetails.District);
            cmd.Parameters.AddWithValue("@ContactNo1", objGov_PersonalDetails.ContactNo1);
            cmd.Parameters.AddWithValue("@ContactNo2", objGov_PersonalDetails.ContactNo2);
            cmd.Parameters.AddWithValue("@AadharNo", objGov_PersonalDetails.AadharNo);
            cmd.Parameters.AddWithValue("@PanNo", objGov_PersonalDetails.PanNo);
            cmd.Parameters.AddWithValue("@SpouseName", objGov_PersonalDetails.SpouseName);

            cmd.Parameters.AddWithValue("@AccountName", objGov_PersonalDetails.AccountName);
            cmd.Parameters.AddWithValue("@AccountNumber", objGov_PersonalDetails.AccountNumber);
            cmd.Parameters.AddWithValue("@BankName", objGov_PersonalDetails.BankName);

            cmd.Parameters.AddWithValue("@BankIFSCCode", objGov_PersonalDetails.BankIFSCCode);
            cmd.Parameters.AddWithValue("@City", objGov_PersonalDetails.City);

            cmd.ExecuteNonQuery();
            conn.Close();
            return "ok";
        }
    }
}