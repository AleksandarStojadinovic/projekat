using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Igrac")]
    public class Igrac
    {
        // Ovde pisemo propertije
        [Key]
        public int IgracID { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        [Required]
        public int Utakmica { get; set; }

        [Required]
        public int Poena { get; set; }

        [Required]
        public int Asistencija { get; set; }

        [Required]
        public int Skokova { get; set; }

        [Required]
        public int Godina_rodjenja { get; set; }

        
        [Required]
        public string Drzava { get; set; }

        [Required]
        public virtual Klub Klub { get; set; }
    }
}