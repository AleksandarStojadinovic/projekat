using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq;
using Models;


namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SezonaController : ControllerBase
    {
        public Context Context { get; set; }

        public SezonaController(Context context)
        {
            Context = context;
        }

        //---------------------------------------------------------------------------------------------------------

        //              GET METODE

        [Route("Pregledaj_sezonu")]
        [HttpGet]
        public ActionResult Pogledaj_sezone()
        {
            var Sezona = Context.Sezone;
        

            return Ok(Sezona);
        }


        [Route("Pogledaj_kolo/{godina}/{BrKola}")]
        [HttpGet]
        public async Task<List<Mec>> Vrati_kolo(string godina,int BrKola)
        {
            var Kolo_utakmice=Context.Mecevi
            .Include(p=>p.Domacin)
            .Include(p=>p.Gost)
            .Include(p=>p.Sudija)
            .Include(p=>p.Sezona)
            .Where(p=>p.Kolo==BrKola)
            .Where(p => p.Sezona.Godina.CompareTo(godina) == 0);

            return await Kolo_utakmice.ToListAsync();
        }

        [Route("Svi_mecevi")]
        [HttpGet]
        public ActionResult Svi_mecevi(string godina)
        {
            if (godina == "") return BadRequest("Morate uneti sezonu!");
            if (godina.Length > 10) return BadRequest("Pogresan format sezone!");


            var Sve_mecevi=Context.Mecevi
            .Include(p=>p.Domacin)
            .Include(p=>p.Gost)
            .Include(p=>p.Sudija)
            .Include(p=>p.Sezona)
            .Where(p => p.Sezona.Godina.CompareTo(godina) == 0);

            return Ok(Sve_mecevi);
        }

       [Route("Mecevi_klub/{godina}/{naziv}")]
        [HttpGet]
        public async Task<List<Mec>> Svi_mecevi_klub(string godina,string naziv)
        {

            var Klub_utakmice=Context.Mecevi
            .Include(p=>p.Domacin)
            .Include(p=>p.Gost)
            .Include(p=>p.Sudija)
            .Include(p=>p.Sezona)
            .Where(p => p.Sezona.Godina.CompareTo(godina) == 0)
            .Where(p=>(p.Domacin.Ime.CompareTo(naziv)==0 || p.Gost.Ime.CompareTo(naziv)==0));

            return await Klub_utakmice.ToListAsync();
        }

        //----------------------------------------------------------------------------------------------------//

        [Route("Unos_mec/{domacin}/{gost}/{godina}/{poenidomacin}/{poenigost}/{sudijai}/{sudijap}/{kolo}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_mec(string domacin, string gost, string godina, int poenidomacin, int poenigost, string sudijai, string sudijap,int kolo)
        {
           if (godina == "") return BadRequest("Morate uneti sezonu!");
           if (godina.Length > 15) return BadRequest("Pogresan format sezone!");

            if (domacin == "") return BadRequest("Morate uneti naziv domacina");
            if (domacin.Length > 50) return BadRequest("Pogresna duzina!");

            if (gost == "") return BadRequest("Morate uneti naziv gosta");
            if (gost.Length > 50) return BadRequest("Pogresna duzina!");

            if (kolo<0 && kolo>26) return BadRequest("Kolo ne postoji!");

            if (poenidomacin<0) return BadRequest("Pogresan broj golova domacina!");

            if (poenigost<0) return BadRequest("Pogresan broj golova gosta!");

            if (sudijai == "") return BadRequest("Morate uneti ime sudije");
            if (sudijai.Length > 20) return BadRequest("Pogresna duzina!");

            if (sudijap == "") return BadRequest("Morate uneti prezime sudije");
            if (sudijap.Length > 20) return BadRequest("Pogresna duzina!");

          

            Mec mec = new Mec();

            var sezona = Context.Sezone.Where(p => p.Godina.CompareTo(godina) == 0).FirstOrDefault();

            if (sezona == null)
            {
                return BadRequest($"Uneti sezona ne postoji!");
            }
            mec.Sezona = sezona;

            var klubd = Context.Klubovi.Where(p => p.Ime.CompareTo(domacin) == 0).FirstOrDefault();

            if (klubd == null)
            {
                return BadRequest($"Uneti klub ne postoji!");
            }

            mec.Domacin = klubd;
            mec.Poenidomacin = poenidomacin;

            var klubg = Context.Klubovi.Where(p => p.Ime.CompareTo(gost) == 0).FirstOrDefault();

            if (klubg == null)
            {
                return BadRequest($"Uneti klub ne postoji!");
            }
            mec.Gost = klubg;
            mec.Poenigost = poenigost;

             var sud = Context.Sudije.Where(p => p.Ime.CompareTo(sudijai) == 0 && p.Prezime.CompareTo(sudijap) == 0).FirstOrDefault();

            if (sud == null)
            {
                return BadRequest($"Uneti sudija ne postoji!");
            }
            mec.Sudija = sud;
            mec.Kolo = kolo;

            try
            {
                Context.Mecevi.Add(mec);
                await Context.SaveChangesAsync();
                return Ok($"Utakmica {domacin} {gost} je dodata u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }
    }
}