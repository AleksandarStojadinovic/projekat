using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using System.Collections.Generic;


namespace Web_Projekat_Sah.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KlubController : ControllerBase
    {
        public Context Context { get; set; }

        public KlubController(Context context)
        {
            Context = context;
        }

        //---------------------------------------------------------------------------------------------------------

        //              GET METODE

       [Route("Svi_klubovi/{Sezona}")]
        [HttpGet]
        public async Task<List<Klub>> Svi_klubovi(string Sezona)
        {

            var klubs = Context.Klubovi
            .Include(p => p.Sezona)
            .Where(p => p.Sezona.Godina.CompareTo(Sezona) == 0);

            return await klubs.ToListAsync();
        }

        
    }
}
