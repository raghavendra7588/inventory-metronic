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
    public class MyOrdersController : ApiController
    {
        MyOrdersBL objMyOrdersBL = new MyOrdersBL();


        [HttpGet]
        public HttpResponseMessage getall(int id)
        {
            try
            {
                Vendor ObjVendor = new Vendor();
                DataTable dt = objMyOrdersBL.getAllData(id);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        [Route("api/MyOrders/getMyOrders")]
        public HttpResponseMessage postall(MyOrders objMyOrders)
        {
            try
            {
                DataTable dt = objMyOrdersBL.postAllData(objMyOrders);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/MyOrders/editMyOrders")]
        public HttpResponseMessage postEditItemsData(List<EditItems> editItemsData)
        {
            try
            {
                string response = objMyOrdersBL.postEditItemsData(editItemsData);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/MyOrders/deleteMyOrders")]
        public HttpResponseMessage deleteMyOrdersData(DeleteMyOrdersItems objDeleteMyOrdersItems)
        {
            try
            {
                string dt = objMyOrdersBL.deleteMyOrdersProducts(objDeleteMyOrdersItems);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

    }
}
