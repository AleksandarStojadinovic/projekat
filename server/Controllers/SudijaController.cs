using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;
using System.Linq;
using Models;
using System.Collections.Generic;


namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SudijaController : ControllerBase
    {
        public Context Context { get; set; }

        public SudijaController(Context context)
        {
            Context = context;
        }


        [Route("Sve_sudije")]
        [HttpGet]
        public async Task<List<Sudija>> Sve_sudije()
        {
            var Sudije = Context.Sudije;
                    
            return await Sudije.ToListAsync();
        }

       
}}
