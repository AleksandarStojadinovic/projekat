import { Klub } from "./Klub.js";
import {Mec} from "./Mec.js"

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
labela1.innerHTML="Mecevi";
labela2.innerHTML="";
header.appendChild(labela1);
header.appendChild(labela2);
img.style.cursor = "pointer"

img.addEventListener("click",(e) => {
    window.location = "http://127.0.0.1:5500/klijent/main_view.html";
})
}

var glkontejner = document.createElement("div");
document.body.appendChild(glkontejner);
glkontejner.className="mdiv";


var kontejner2 = document.createElement("div");
glkontejner.appendChild(kontejner2);
kontejner2.className="k2div";


var queryString1 = decodeURIComponent(window.location.search);
queryString1 = queryString1.substring(6);
console.log(queryString1);

let listamec=[];



let selX= document.createElement("select");
var labela = document.createElement("label");
labela.innerHTML="Kolo:"
kontejner2.appendChild(labela);
kontejner2.appendChild(selX);
for(let i=1; i<27;i++){
    let opcija=document.createElement("option");
    opcija.innerHTML=i;
    opcija.value=i;
    selX.appendChild(opcija);
}

//tabela utakmica

var table2 = document.createElement("table");
kontejner2.appendChild(table2);
table2.style.marginTop="5px";

var tr2 = document.createElement("tr");
let th2;
var Head = ["Domacin", "", "", "Gost","Kolo", "Sudija"];
Head.forEach(el => {
    th2 = document.createElement("th");
    th2.innerHTML = el;
    tr2.appendChild(th2);
})
table2.appendChild(tr2);

selX.value=1;
fetch("https://localhost:5001/Sezona/Pogledaj_kolo/" + queryString1 + "/"+ selX.value)
.then(p=>{
    p.json().then(mecevi=>{
        mecevi.forEach(mec=>{
            var u = new Mec(mec.domacin, mec.gost, mec.poenidomacin, mec.poenigost, mec.kolo,mec.sudija, mec.sezona);
            listamec.push(u);
            u.crtaj(table2);
        })
    })
})

selX.onchange = function() {
if(table2.rows.length != 1)
for (let i=table2.rows.length-1;i>=1;i--)
    table2.deleteRow(i);

fetch("https://localhost:5001/Sezona/Pogledaj_kolo/" + queryString1 + "/"+ selX.value)
.then(p=>{
    p.json().then(mecevi=>{
        mecevi.forEach(mec=>{
            var u = new Mec(mec.domacin, mec.gost, mec.poenidomacin, mec.poenigost, mec.kolo,mec.sudija, mec.sezona);
            listamec.push(u);
            u.crtaj(table2);
        })
    })
})
}

var kontejner1 = document.createElement("div");
glkontejner.appendChild(kontejner1);
kontejner1.style.paddingTop="35px";
kontejner1.style.paddingLeft="10px";

var clubs=[];
//forma za unos meceva
let result = await fetch("https://localhost:5001/Klub/Svi_klubovi/"+queryString1);
let klubovi = await result.json();

let elLabela = document.createElement("label");
elLabela.innerHTML="Domacin:";
kontejner1.appendChild(elLabela);

let sel= document.createElement("select");
sel.className="domacin";
kontejner1.appendChild(sel);
let opcija0 = document.createElement("option");
opcija0.innerHTML = "Izaberite klub";
sel.appendChild(opcija0);
klubovi.forEach(k => 
    {
        let opcija=document.createElement("option");
        opcija.innerHTML=k.ime;
        sel.appendChild(opcija);
    })


elLabela = document.createElement("label");
elLabela.innerHTML="Gost:";
kontejner1.appendChild(elLabela);

sel= document.createElement("select");
sel.className="gost";
kontejner1.appendChild(sel);
opcija0 = document.createElement("option");
opcija0.innerHTML = "Izaberite klub";
sel.appendChild(opcija0);
klubovi.forEach(k => 
    {
        let opcija=document.createElement("option");
        opcija.innerHTML=k.ime;
        sel.appendChild(opcija);
    })


elLabela = document.createElement("label");
elLabela.innerHTML="Poeni domacin:";
kontejner1.appendChild(elLabela);

let tb= document.createElement("input");
tb.className="poeni_domacin";
kontejner1.appendChild(tb);

elLabela = document.createElement("label");
elLabela.innerHTML="Poeni gost:";
kontejner1.appendChild(elLabela);

tb= document.createElement("input");
tb.className="poeni_gost";
kontejner1.appendChild(tb);

sel= document.createElement("select");
sel.className="sudija";
labela = document.createElement("label");
labela.innerHTML="Sudije:"
kontejner1.appendChild(labela);
kontejner1.appendChild(sel);
opcija0 = document.createElement("option");
opcija0.innerHTML = "Izaberite sudiju";
sel.appendChild(opcija0);
fetch("https://localhost:5001/Sudija/Sve_sudije")
.then(p=>{
    p.json().then(sudije=>{
        sudije.forEach(sudija=>{
                let opcija=document.createElement("option");
                opcija.innerHTML=sudija.ime+ " " + sudija.prezime;
                sel.appendChild(opcija);
        })
    })
})

const dugme = document.createElement("button");
dugme.innerHTML="Dodaj mec";
kontejner1.appendChild(dugme);
kontejner1.className="kmec";
dugme.style.marginTop="5px";



dugme.onclick=(ev)=>{
    const myArray = kontejner1.querySelector(".sudija").value.split(" ");

    fetch("https://localhost:5001/Sezona/Unos_mec/" + kontejner1.querySelector(".domacin").value + "/" + kontejner1.querySelector(".gost").value + "/" +queryString1+ "/"+ kontejner1.querySelector(".poeni_domacin").value + "/"+ kontejner1.querySelector(".poeni_gost").value + "/" + myArray[0] + "/" + myArray[1]+"/"+selX.value,{
    method: 'POST'})
    document.location.reload(true);
}