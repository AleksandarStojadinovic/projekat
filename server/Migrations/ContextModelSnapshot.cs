﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace server.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("Models.Igrac", b =>
                {
                    b.Property<int>("IgracID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("Asistencija")
                        .HasColumnType("int");

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Godina_rodjenja")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("KlubID")
                        .HasColumnType("int");

                    b.Property<int>("Poena")
                        .HasColumnType("int");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Skokova")
                        .HasColumnType("int");

                    b.Property<int>("Utakmica")
                        .HasColumnType("int");

                    b.HasKey("IgracID");

                    b.HasIndex("KlubID");

                    b.ToTable("Igrac");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.Property<int>("KlubID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("SezonaID")
                        .HasColumnType("int");

                    b.HasKey("KlubID");

                    b.HasIndex("SezonaID");

                    b.ToTable("Klub");
                });

            modelBuilder.Entity("Models.Mec", b =>
                {
                    b.Property<int>("MecID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("DomacinKlubID")
                        .HasColumnType("int");

                    b.Property<int?>("GostKlubID")
                        .HasColumnType("int");

                    b.Property<int>("Kolo")
                        .HasColumnType("int");

                    b.Property<int>("Poenidomacin")
                        .HasColumnType("int");

                    b.Property<int>("Poenigost")
                        .HasColumnType("int");

                    b.Property<int>("SezonaID")
                        .HasColumnType("int");

                    b.Property<int>("SudijaID")
                        .HasColumnType("int");

                    b.HasKey("MecID");

                    b.HasIndex("DomacinKlubID");

                    b.HasIndex("GostKlubID");

                    b.HasIndex("SezonaID");

                    b.HasIndex("SudijaID");

                    b.ToTable("Mec");
                });

            modelBuilder.Entity("Models.Sezona", b =>
                {
                    b.Property<int>("SezonaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Godina")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("SezonaID");

                    b.ToTable("Sezona");
                });

            modelBuilder.Entity("Models.Sudija", b =>
                {
                    b.Property<int>("SudijaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("SudijaID");

                    b.ToTable("Sudija");
                });

            modelBuilder.Entity("Models.Igrac", b =>
                {
                    b.HasOne("Models.Klub", "Klub")
                        .WithMany("Igraci")
                        .HasForeignKey("KlubID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Klub");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.HasOne("Models.Sezona", "Sezona")
                        .WithMany("Klubovi")
                        .HasForeignKey("SezonaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sezona");
                });

            modelBuilder.Entity("Models.Mec", b =>
                {
                    b.HasOne("Models.Klub", "Domacin")
                        .WithMany()
                        .HasForeignKey("DomacinKlubID");

                    b.HasOne("Models.Klub", "Gost")
                        .WithMany()
                        .HasForeignKey("GostKlubID");

                    b.HasOne("Models.Sezona", "Sezona")
                        .WithMany("Mecevi")
                        .HasForeignKey("SezonaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Sudija", "Sudija")
                        .WithMany("Sudjene_utakmice")
                        .HasForeignKey("SudijaID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Domacin");

                    b.Navigation("Gost");

                    b.Navigation("Sezona");

                    b.Navigation("Sudija");
                });

            modelBuilder.Entity("Models.Klub", b =>
                {
                    b.Navigation("Igraci");
                });

            modelBuilder.Entity("Models.Sezona", b =>
                {
                    b.Navigation("Klubovi");

                    b.Navigation("Mecevi");
                });

            modelBuilder.Entity("Models.Sudija", b =>
                {
                    b.Navigation("Sudjene_utakmice");
                });
#pragma warning restore 612, 618
        }
    }
}
