using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Klub")]
    public class Klub
    {
        // Ovde pisemo propertije
        [Key]
        public int KlubID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(50)]
        [Required]
        public string Drzava { get; set; }

        [Required]
        public virtual Sezona Sezona {get; set; }

        [JsonIgnore]
        public virtual List<Igrac> Igraci { get; set;}
    }
}