using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sezona",
                columns: table => new
                {
                    SezonaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Godina = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sezona", x => x.SezonaID);
                });

            migrationBuilder.CreateTable(
                name: "Sudija",
                columns: table => new
                {
                    SudijaID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sudija", x => x.SudijaID);
                });

            migrationBuilder.CreateTable(
                name: "Klub",
                columns: table => new
                {
                    KlubID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    SezonaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klub", x => x.KlubID);
                    table.ForeignKey(
                        name: "FK_Klub_Sezona_SezonaID",
                        column: x => x.SezonaID,
                        principalTable: "Sezona",
                        principalColumn: "SezonaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Igrac",
                columns: table => new
                {
                    IgracID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Utakmica = table.Column<int>(type: "int", nullable: false),
                    Poena = table.Column<int>(type: "int", nullable: false),
                    Asistencija = table.Column<int>(type: "int", nullable: false),
                    Skokova = table.Column<int>(type: "int", nullable: false),
                    Godina_rodjenja = table.Column<int>(type: "int", nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KlubID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Igrac", x => x.IgracID);
                    table.ForeignKey(
                        name: "FK_Igrac_Klub_KlubID",
                        column: x => x.KlubID,
                        principalTable: "Klub",
                        principalColumn: "KlubID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mec",
                columns: table => new
                {
                    MecID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SezonaID = table.Column<int>(type: "int", nullable: false),
                    Kolo = table.Column<int>(type: "int", nullable: false),
                    DomacinKlubID = table.Column<int>(type: "int", nullable: true),
                    GostKlubID = table.Column<int>(type: "int", nullable: true),
                    Poenidomacin = table.Column<int>(type: "int", nullable: false),
                    Poenigost = table.Column<int>(type: "int", nullable: false),
                    SudijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mec", x => x.MecID);
                    table.ForeignKey(
                        name: "FK_Mec_Klub_DomacinKlubID",
                        column: x => x.DomacinKlubID,
                        principalTable: "Klub",
                        principalColumn: "KlubID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mec_Klub_GostKlubID",
                        column: x => x.GostKlubID,
                        principalTable: "Klub",
                        principalColumn: "KlubID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mec_Sezona_SezonaID",
                        column: x => x.SezonaID,
                        principalTable: "Sezona",
                        principalColumn: "SezonaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mec_Sudija_SudijaID",
                        column: x => x.SudijaID,
                        principalTable: "Sudija",
                        principalColumn: "SudijaID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Igrac_KlubID",
                table: "Igrac",
                column: "KlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Klub_SezonaID",
                table: "Klub",
                column: "SezonaID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_DomacinKlubID",
                table: "Mec",
                column: "DomacinKlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_GostKlubID",
                table: "Mec",
                column: "GostKlubID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_SezonaID",
                table: "Mec",
                column: "SezonaID");

            migrationBuilder.CreateIndex(
                name: "IX_Mec_SudijaID",
                table: "Mec",
                column: "SudijaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Igrac");

            migrationBuilder.DropTable(
                name: "Mec");

            migrationBuilder.DropTable(
                name: "Klub");

            migrationBuilder.DropTable(
                name: "Sudija");

            migrationBuilder.DropTable(
                name: "Sezona");
        }
    }
}
