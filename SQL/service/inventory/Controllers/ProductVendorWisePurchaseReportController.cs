using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inventory.Models;

namespace inventory.Controllers
{
    public class ProductVendorWisePurchaseReportController : ApiController
    {

        ProductsVendorWisePurchaseReportBL objProductsVendorWisePurchaseReportBL = new ProductsVendorWisePurchaseReportBL();

        [HttpPost]
        public HttpResponseMessage postall(ProductsVendorWisePurchaseReport objProductsVendorWisePurchaseReportReport)
        {
            try
            {
                DataTable dt = objProductsVendorWisePurchaseReportBL.postAllData(objProductsVendorWisePurchaseReportReport);
                DataTable reportData = objProductsVendorWisePurchaseReportBL.createReportData(dt);
                return Request.CreateResponse(HttpStatusCode.OK, reportData);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
