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
    public class APPAddressController : ApiController
    {

        APPAddressBL ObjAddressBL = new APPAddressBL();

        [HttpGet]
        public HttpResponseMessage getall(string id)
        {
            try
            {
                Vendor ObjVendor = new Vendor();
                DataTable dt = ObjAddressBL.getAllAPPAdressData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        public HttpResponseMessage Post(APPAddress addressData)
        {
            int intId = addressData.id;
            try
            {
                if (intId == 0)
                {
                    ObjAddressBL.postAPPAdressToDb(addressData);
                }
                else
                {
                    ObjAddressBL.updateAPPAdressToDb(addressData, intId);
                }

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}

