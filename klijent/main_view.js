var header = document.createElement("header");

document.body.appendChild(header);


var kontejner = document.createElement("div");
document.body.appendChild(kontejner);
document.body.style.backgroundColor="rgb(220,105,0)";


kontejner.className="pdiv";
kontejner.style.alignItems="center";
kontejner.style.margin="50px";


let img = document.createElement("img");
img.src ="ABA.jpg"
img.height = "65";
img.width = "43";
header.appendChild(img);

var labela1= document.createElement("label");
labela1.innerHTML="ABA liga";
header.appendChild(labela1);

img.style.cursor = "pointer"

img.addEventListener("click",(e) => {
    window.location = "http://127.0.0.1:5500/klijent/main_view.html";
})

var kontejnerh = document.createElement("div");
header.appendChild(kontejnerh);
kontejnerh.style.display="flex";
kontejnerh.style.flexDirection="row";
kontejnerh.style.alignItems="center";


let sel= document.createElement("select");
let labela = document.createElement("label");
labela.innerHTML="Sezona:"
kontejnerh.appendChild(labela);
kontejnerh.appendChild(sel);
labela.style.fontSize="20px";
labela.style.fontWeight = "normal";
let opcija0 = document.createElement("option");
opcija0.innerHTML = "Izaberite sezonu";
sel.appendChild(opcija0);
fetch("https://localhost:5001/Sezona/Pregledaj_sezonu")
.then(p=>{
    p.json().then(sezone=>{
        sezone.forEach(sezona=>{
                let opcija=document.createElement("option");
                opcija.innerHTML=sezona.godina;
                opcija.value=sezona.godina;
                sel.appendChild(opcija);
        })
    })
})



var s = sel.value;
var value1= s;


var queryString;

sel.onchange = function() {
    sz(sel.value);
    }

async function sz(sezona) {
var s = sel.value;
var value1= s;
queryString = "?para1" + value1;
}


const dugme1 = document.createElement("button");
dugme1.innerHTML="Tabela";
dugme1.className="pocetnib";
kontejner.appendChild(dugme1);
dugme1.onclick=(ev)=>{
    if (sel.selectedIndex==0)
    {
    window.alert("Izaberi sezonu");
    }
    else
    window.location = "http://127.0.0.1:5500/klijent/tabela_view.html" + queryString;
}

const dugme2 = document.createElement("button");
dugme2.innerHTML="Statistika igraca";
dugme2.className="pocetnib";
kontejner.appendChild(dugme2);
dugme2.onclick=(ev)=>{
    if (sel.selectedIndex==0)
    {
    window.alert("Izaberi sezonu");
    }
    else
    window.location = "http://127.0.0.1:5500/klijent/igrac_view.html"+queryString;
}

const dugme3 = document.createElement("button");
dugme3.innerHTML="Mecevi";
dugme3.className="pocetnib";
kontejner.appendChild(dugme3);
dugme3.onclick=(ev)=>{
    if (sel.selectedIndex==0)
    {
    window.alert("Izaberi sezonu");
    }
    else
    window.location = "http://127.0.0.1:5500/klijent/mec_view.html"+queryString;
}

