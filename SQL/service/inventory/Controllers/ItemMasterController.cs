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
    public class ItemMasterController : ApiController
    {

        ItemMasterBL objItemMasterBL = new ItemMasterBL();


        [HttpGet]
        public HttpResponseMessage getall(int id)
        {
            try
            {

                DataTable dt = objItemMasterBL.getAllData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        public HttpResponseMessage Post(ItemMaster objItemMasterData)
        {
   
            int intItemMasterId = objItemMasterData.itemMasterId;
            try
            {
                
                if (Convert.ToInt32(intItemMasterId) == 0)
                {
                    objItemMasterBL.postItemMasterToDb(objItemMasterData);
                }
                else
                {
                    objItemMasterBL.updateItemMasterToDb(objItemMasterData, Convert.ToInt32(intItemMasterId));
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
