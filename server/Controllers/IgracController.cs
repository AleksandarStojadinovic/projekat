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
    public class IgracController : ControllerBase
    {
        public Context Context { get; set; }

        public IgracController(Context context)
        {
            Context = context;
        }

        //---------------------------------------------------------------------------------------------------------

        //              POST METODE

        [Route("Unos_igraca/{Ime}/{Prezime}/{Utakmica}/{Poena}/{Asistencija}/{Skokova}/{Godina_rodjenja}/{Drzava}/{Ime_kluba}/{Sezona}")]
        [HttpPost]
        public async Task<ActionResult> Dodaj_igraca(string Ime,string Prezime,int Utakmica,int Poena,int Asistencija,int Skokova,int Godina_rodjenja,string Drzava,string Ime_kluba,string Sezona)
        {
            if (Ime == "") return BadRequest("Morate uneti ime igraca");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime igraca");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Drzava == "") return BadRequest("Morate uneti drzavu");

            if (Ime_kluba == "") return BadRequest("Morate uneti ime Kluba");

            Igrac player = new Igrac();

            player.Ime = Ime;
            player.Prezime = Prezime;
            player.Godina_rodjenja = Godina_rodjenja;
            player.Poena=Poena;
            player.Utakmica=Utakmica;
            player.Asistencija=Asistencija;
            player.Skokova=Skokova;
            player.Drzava=Drzava;

             var club = Context.Klubovi.Where(p => p.Ime.CompareTo(Ime_kluba) == 0 && p.Sezona.Godina.CompareTo(Sezona)==0).FirstOrDefault();
            

            if (club == null)
            {
                return BadRequest($"Uneti klub {Ime_kluba} ne postoji!");
            }

            player.Klub = club;

            try
            {
                Context.Igraci.Add(player);
                await Context.SaveChangesAsync();
                return Ok($"Igrac {Ime} {Prezime} je dodat u bazu!");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException.Message);
            }
        }

        //---------------------------------------------------------------------------------------------------------

        //              DELETE METODE

        [Route("Brisanje_igraca/{Ime}/{Prezime}/{Ime_kluba}/{Sezona}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi_igraca(string Ime, string Prezime, string Ime_kluba, string Sezona)
        {
            if (Ime == "") return BadRequest("Morate uneti ime igraca");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime sudije");
            if (Prezime.Length > 20) return BadRequest("Pogresna igraca!");

            var club = Context.Klubovi.Where(p => p.Ime.CompareTo(Ime_kluba) == 0 && p.Sezona.Godina.CompareTo(Sezona)==0).FirstOrDefault();

            try
            {
                var Igrac = Context.Igraci.Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0 && p.Klub==club).FirstOrDefault();
                if (Igrac != null)
                {
                    string Name = Igrac.Ime;
                    string SurName = Igrac.Prezime;

                    Context.Igraci.Remove(Igrac);
                    await Context.SaveChangesAsync();
                    return Ok($"Igrac {Name} {SurName} je uspesno izbrisan!");
                }
                else
                {
                    return Ok("Takav igrac ne postoji!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        //---------------------------------------------------------------------------------------------------------

        //              GET METODE


        [Route("Svi_igraci/{Klub}/{Sezona}")]
        [HttpGet]
        public async Task<List<Igrac>> Svi_igraci(string Klub,string Sezona)
        {

            var Igraci = Context.Igraci
            .Include(p=> p.Klub)
            .Include(p=> p.Klub.Sezona)
            .Where(p => p.Klub.Ime.CompareTo(Klub) == 0  && p.Klub.Sezona.Godina.CompareTo(Sezona)==0);

           return await Igraci.ToListAsync();
        }

        [Route("Svi_igraci_liga/{Sezona}")]
        [HttpGet]
        public async Task<List<Igrac>> Svi_igraci_liga(string Sezona)
        {

            var Igraci = Context.Igraci
            .Include(p=> p.Klub)
            .Include(p=> p.Klub.Sezona)
            .Where(p => p.Klub.Sezona.Godina.CompareTo(Sezona)==0);

            return await Igraci.ToListAsync();
        }

         //---------------------------------------------------------------------------------------------------------

        //              PUT METODE

        [Route("Promeni_statistiku/{Ime}/{Prezime}/{skokova}/{poena}/{asistencija}/{Ime_kluba}/{Sezona}")]
        [HttpPut]
        public async Task<ActionResult> PromeniStatistiku(string Ime, string Prezime, int skokova, int poena, int asistencija,string Ime_kluba, string Sezona)
        {
            if (Ime == "") return BadRequest("Morate uneti ime igraca");
            if (Ime.Length > 20) return BadRequest("Pogresna duzina!");

            if (Prezime == "") return BadRequest("Morate uneti prezime igraca");
            if (Prezime.Length > 20) return BadRequest("Pogresna duzina!");

            if (skokova<0) return BadRequest("Greska");
            if (poena<0) return BadRequest("Greska");
            if (asistencija<0) return BadRequest("Greska");

             var club = Context.Klubovi.Where(p => p.Ime.CompareTo(Ime_kluba) == 0 && p.Sezona.Godina.CompareTo(Sezona)==0).FirstOrDefault();

            try
            {
                 var Igrac = Context.Igraci.Where(p => p.Ime.CompareTo(Ime) == 0 && p.Prezime.CompareTo(Prezime) == 0 && p.Klub==club).FirstOrDefault();

                Igrac.Poena = Igrac.Poena + poena;
                Igrac.Asistencija = Igrac.Asistencija + asistencija;
                Igrac.Skokova = Igrac.Skokova + skokova;
                Igrac.Utakmica++;

                Context.Igraci.Update(Igrac);
                await Context.SaveChangesAsync();
                return Ok($"Izmenjeni podaci o igracu {Igrac.Ime} {Igrac.Prezime}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
