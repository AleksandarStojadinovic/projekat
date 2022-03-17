using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{

    [Table("Mec")]
    public class Mec
    {
        // Ovde pisemo propertije
        [Key]
        public int MecID { get; set; }

        [Required]
        public Sezona Sezona { get; set; }

        [Required]
        public int Kolo { get; set; }
        
        [Required]
        public Klub Domacin { get; set; }
        
        [Required]
        public Klub Gost { get; set; }

        [Required]
        public int Poenidomacin { get; set; }

        [Required]
        public int Poenigost { get; set; }

        [Required]
        public Sudija Sudija { get; set; }
    }
}