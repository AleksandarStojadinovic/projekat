import {Igrac} from "./Igrac.js"
import {Mec} from "./Mec.js"

var queryString = decodeURIComponent(window.location.search);
var god = queryString.substring(6,10);
var cl= queryString.substring(16);



zaglavlje();

var glkontejner = document.createElement("div");
document.body.appendChild(glkontejner);
glkontejner.className="pdiv";

var kontejnerp = document.createElement("div");
kontejnerp.className="mdiv";



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
labela1.innerHTML=cl;
labela2.innerHTML="";
labela2.style.width="43px";
header.appendChild(labela1);
header.appendChild(labela2);
img.style.cursor = "pointer"

img.addEventListener("click",(e) => {
    window.location = "http://127.0.0.1:5500/klijent/main_view.html";
})
}

var kontejner = document.createElement("div");
glkontejner.appendChild(kontejner);
kontejner.className="mdiv";

let imgg = document.createElement("img");
imgg.src ="grb/"+cl+".jpg"
imgg.height = "300";
imgg.width = "270";
imgg.style.marginRight="100px";
kontejner.appendChild(imgg);

var table1 = document.createElement("table");
kontejner.appendChild(table1);
table1.style.marginRight="10px";

var tr = document.createElement("tr");
let th;
var Head = ["Ime", "Prezime", "Godina rodjenja", "Drzavljanstvo","Utakmica", "Poeni", "Skokovi","Asistencije","",""];
Head.forEach(el => {
     th = document.createElement("th");
    th.innerHTML = el;
    tr.appendChild(th);
})
table1.appendChild(tr);

var listaIgraca=[];
let result =await fetch("https://localhost:5001/Igrac/Svi_igraci/" + cl + "/"+ god);
let igraci=await result.json();
        igraci.forEach(async (igrac)=>{
            var i = new Igrac(igrac.ime,igrac.prezime,igrac.utakmica,igrac.poena,igrac.skokova,igrac.asistencija,igrac.godina_rodjenja,igrac.drzava,igrac.klub);
            listaIgraca.push(i);
            var tr = document.createElement("tr");
                table1.appendChild(tr);
        
                var el = document.createElement("td");
                el.innerHTML = i.ime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.prezime;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.godina_rodjenja;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.drzava;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.utakmica;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.poena;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.skokova;
                tr.appendChild(el);
        
                var el = document.createElement("td");
                el.innerHTML = i.asistencija;
                tr.appendChild(el);

                var el = document.createElement("td");
                el.innerHTML = "Brisi";
                tr.appendChild(el);

                el.addEventListener("click", (e) => {
                    var ime = tr.cells[0].innerHTML;
                    var prezime = tr.cells[1].innerHTML;
                    fetch("https://localhost:5001/Igrac/Brisanje_igraca/" + ime + "/" + prezime + "/" + cl + "/" + god,{
                    method: 'DELETE'})
                    document.location.reload(true);
                })

                var el = document.createElement("td");
                el.innerHTML = "Izmeni";
                tr.appendChild(el);

                el.addEventListener("click", (e) => {
                    var ime = tr.cells[0].innerHTML;
                    var prezime = tr.cells[1].innerHTML;
                    let person=prompt("Unesi statistiku","poeni,asistencije,skokovi");
                    const myArray = person.split(",");
                    if (person!=null && person!="")
                    {
                    fetch("https://localhost:5001/Igrac/Promeni_statistiku/" + ime + "/" + prezime + "/" + myArray[2] + "/" + myArray[0]+"/"+myArray[1]+"/"+cl+"/"+god,{
                    method: 'PUT'})
                    document.location.reload(true);
                    }
                    else
                    window.alert("Losa statistika");
                })
        })

        var kontejner2 = document.createElement("div");
        kontejner.appendChild(kontejner2);
        
        var lista = ["Ime:", "Prezime:", "Godina rodjenja:", "Drzavljanstvo:","Utakmica:","Poeni:", "Asistencije:","Skokovi:"];
        var lista2 = ["ime", "prezime", "godina_rodjenja", "drzava","utakmica","poeni", "asistencije","skokovi"];
        
        for (let i=0;i<lista.length;i++)
        {
        let elLabela = document.createElement("label");
        elLabela.innerHTML=lista[i];
        kontejner2.appendChild(elLabela);
        
        let tb= document.createElement("input");
        tb.className=lista2[i];
        kontejner2.appendChild(tb);
        }
        const dugme = document.createElement("button");
        dugme.innerHTML="Dodaj igraca";
        kontejner2.appendChild(dugme);
        dugme.style.marginTop="5px";
        dugme.onclick=(ev)=>{
            fetch("https://localhost:5001/Igrac/Unos_igraca/" + kontejner.querySelector(".ime").value + "/" + kontejner.querySelector(".prezime").value + "/" + kontejner.querySelector(".utakmica").value + "/"+ kontejner.querySelector(".poeni").value + "/" + kontejner.querySelector(".asistencije").value + "/" + kontejner.querySelector(".skokovi").value+ "/" + kontejner.querySelector(".godina_rodjenja").value + "/" + kontejner.querySelector(".drzava").value  + "/" + cl + "/"+god,{
            method: 'POST'})
            document.location.reload(true);
        }


//-----------------------------------------------------



var table2 = document.createElement("table");
kontejnerp.appendChild(table2);
table2.id = "table2";


var tr2 = document.createElement("tr");
let th2;
var Head = ["Domacin", "", "", "Gost","Kolo", "Sudija"];
Head.forEach(el => {
    th2 = document.createElement("th");
    th2.innerHTML = el;
    tr2.appendChild(th2);
})
table2.appendChild(tr2);

var listaMeceva=[];
fetch("https://localhost:5001/Sezona/Mecevi_klub/" + god + "/"+ cl)
.then(p=>{
    p.json().then(mecevi=>{
        mecevi.forEach(mec=>{
            var u = new Mec(mec.domacin,mec.gost,mec.poenidomacin,mec.poenigost,mec.kolo,mec.sudija,mec.sezona);
            listaMeceva.push(u);
            u.crtaj(table2);
        })
    })
})

var rows,switching, i, x, y, shouldSwitch;
    rows=table2.rows;
    switching = true;

    while (switching) {
        switching = false;
        for (i = 1; i < rows.length-1; i++) {
            shouldSwitch = false;

            x = rows[i].childNodes[0];
            y = rows[i+1].childNodes[0];

            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }





let kontejner5 = document.createElement("div");
document.body.appendChild(kontejner5);

let sel= document.createElement("select");
sel.className="statistika";
kontejner5.appendChild(sel);
let opcija0 = document.createElement("option");
opcija0.innerHTML = " ";
sel.appendChild(opcija0);
opcija0 = document.createElement("option");
opcija0.innerHTML = "poeni";
sel.appendChild(opcija0);
opcija0 = document.createElement("option");
opcija0.innerHTML = "skokovi";
sel.appendChild(opcija0);
opcija0 = document.createElement("option");
opcija0.innerHTML = "asistencije";
sel.appendChild(opcija0);

var xValues = [];
var y1Values = [];
var y2Values = [];
var y3Values = [];

listaIgraca.forEach(async (i) =>{
    var x,y1,y2,y3;
    x=i.ime+ " " +i.prezime;
    y1=i.poena/i.utakmica;
    y2=i.skokova/i.utakmica;
    y3=i.asistencija/i.utakmica;
xValues.push(x);
y1Values.push(y1);
y2Values.push(y2);
y3Values.push(y3);
})
console.log(y1Values);
var barColors = "rgb(220,105,0)";

sel.onchange = function() {
    
    var yValues = [];
    if (sel.selectedIndex==1)
{
    y1Values.forEach(y =>{ yValues.push(y)})
}
if (sel.selectedIndex==2)
{
    y2Values.forEach(y =>{ yValues.push(y)})
}
if (sel.selectedIndex==3)
{
    y3Values.forEach(y =>{ yValues.push(y)})
}
new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "STATISTIKA"
    }
  }
});
}
kontejner5.style.marginTop="20px"
kontejner5.appendChild(myChart);
table2.style.marginRight="20px";
glkontejner.appendChild(kontejnerp);

kontejnerp.appendChild(kontejner5); 