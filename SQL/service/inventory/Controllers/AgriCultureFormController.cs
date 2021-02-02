using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inventory.Models;

namespace inventory.Controllers
{
    public class AgriCultureFormController : ApiController
    {
        AgriCultureFormBL objAgriCultureFormBL = new AgriCultureFormBL();
        [HttpPost]
        public HttpResponseMessage Post(AgriCultureForm objAgriCultureForm)
        {

            try
            {
                objAgriCultureFormBL.PostAgriculturalForm(objAgriCultureForm);

                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
