import {Igrac} from "./Igrac.js"


var queryString1 = decodeURIComponent(window.location.search);
queryString1 = queryString1.substring(6);
console.log(queryString1);

zaglavlje();
function zaglavlje(){
var header = document.createElement("header");
document.body.appendChild(header);


let img = document.createElement("img");
img.src ="ABA.jpg"
img.height = "65";
img.width = "43";
header.appendChild(img);

var labela1= document.createElement("label");
var labela2= document.createElement("label");
labela1.innerHTML="Najbolji igraci";
labela2.innerHTML="";
header.appendChild(labela1);
header.appendChild(labela2);

img.style.cursor = "pointer"

img.addEventListener("click",(e) => {
    window.location = "http://127.0.0.1:5500/klijent/main_view.html";
})
}

var glavnikontejner = document.createElement("div");
document.body.appendChild(glavnikontejner);
glavnikontejner.className="igdiv";

var igr=[];

var result =await fetch("https://localhost:5001/Igrac/Svi_igraci_liga/" + queryString1)
let igraci = await result.json();
igraci.forEach(async (i)=>
{
    var ii = new Igrac(i.ime,i.prezime,i.utakmica,i.poena,i.skokova,i.asistencija,i.godina,i.drzava,i.klub)
igr.push(ii);
})

poenit(glavnikontejner);
function poenit(glavnikontejner){


var table = document.createElement("table");
table.style.margin="5px";
glavnikontejner.appendChild(table);

var tr = document.createElement("tr");
let th;
var Head = ["Ime", "Prezime", "Poeni","Klub"];
Head.forEach(el => {
    th = document.createElement("th");
    th.innerHTML = el;
    tr.appendChild(th);
})
table.appendChild(tr);


for(var i1=0; i1<igr.length-1; i1++)
{
    for(var i2=0; i2<igr.length-1; i2++)
{
    
    if (igr[i2].poena/igr[i2].utakmica < igr[i2+1].poena/igr[i2+1].utakmica)
    {
        
        var pom=igr[i2];
        igr[i2]=igr[i2+1];
        igr[i2+1]=pom;
    }
}
}



for(var i=0; i<20; i++)
{
                var tr = document.createElement("tr");
                table.appendChild(tr);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].ime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].prezime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML =(igr[i].poena/igr[i].utakmica).toFixed(2);
                //el.innerHTML =i.poena;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].klub.ime;
                tr.appendChild(el);       
}
}

skokovit(glavnikontejner);
function skokovit(glavnikontejner){


var table2 = document.createElement("table");
table2.style.margin="5px";
glavnikontejner.appendChild(table2);

var tr = document.createElement("tr");
var Head = ["Ime", "Prezime", "Skokovi","Klub"];
Head.forEach(el => {
    let th = document.createElement("th");
    th.innerHTML = el;
    tr.appendChild(th);
})
table2.appendChild(tr);


for(var i1=0; i1<igr.length-1; i1++)
{
    
    for(var i2=0; i2<igr.length-1; i2++)
{
    
    if (igr[i2].skokova/igr[i2].utakmica < igr[i2+1].skokova/igr[i2+1].utakmica)
    {
        
        var pom=igr[i2];
        igr[i2]=igr[i2+1];
        igr[i2+1]=pom;
    }
}
}



for(var i=0; i<20; i++)
{
                var tr = document.createElement("tr");
                table2.appendChild(tr);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].ime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].prezime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML =(igr[i].skokova/igr[i].utakmica).toFixed(2);
                //el.innerHTML =i.poena;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].klub.ime;
                tr.appendChild(el);       
}
}


asistencijet(glavnikontejner);
function asistencijet(glavnikontejner){


var table3 = document.createElement("table");
table3.style.margin="5px";
glavnikontejner.appendChild(table3);

tr = document.createElement("tr");
var Head = ["Ime", "Prezime", "Asistencije","Klub"];
Head.forEach(el => {
    var th = document.createElement("th");
    th.innerHTML = el;
    tr.appendChild(th);
})
table3.appendChild(tr);


for(var i1=0; i1<igr.length-1; i1++)
{
    
    for(var i2=0; i2<igr.length-1; i2++)
{
    
    if (igr[i2].asistencija/igr[i2].utakmica < igr[i2+1].asistencija/igr[i2+1].utakmica)
    {
        
        var pom=igr[i2];
        igr[i2]=igr[i2+1];
        igr[i2+1]=pom;
    }
}
}




for(var i=0; i<20; i++)
{
                var tr = document.createElement("tr");
                table3.appendChild(tr);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].ime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].prezime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML =(igr[i].asistencija/igr[i].utakmica).toFixed(2);
                //el.innerHTML =i.poena;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = igr[i].klub.ime;
                tr.appendChild(el);       
}
}
            


      