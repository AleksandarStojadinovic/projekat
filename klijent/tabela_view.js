import { Klub } from "./Klub.js";
import {Mec} from "./Mec.js"

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
labela1.innerHTML="Tabela";
labela2.innerHTML="";
header.appendChild(labela1);
header.appendChild(labela2);

img.style.cursor = "pointer"

img.addEventListener("click",(e) => {
    window.location = "http://127.0.0.1:5500/klijent/main_view.html";
})
}

var kontejner = document.createElement("div");
document.body.appendChild(kontejner);

var table = document.createElement("table");
kontejner.appendChild(table);
kontejner.className="igdiv";

await tabelac(queryString1)
async function tabelac(queryString1){
let test = 0;
let result = await fetch("https://localhost:5001/Klub/Svi_klubovi/" + queryString1);
let klubovi = await result.json();
for(let i = 0; i < klubovi.length; i++){
  let resultMecevi = await fetch("https://localhost:5001/Sezona/Mecevi_klub/" + queryString1 +"/" + klubovi[i].ime);
  let meceviKlub = await resultMecevi.json();
  test++;
                        var pobede=0,porazi=0,poeni_d=0,poeni_p=0;
                        meceviKlub.forEach(async (mec) => {
                            var k = new Mec(mec.domacin,mec.gost,mec.poenidomacin,mec.poenigost,mec.kolo,mec.sudija,mec.sezona);
                            var ime = klubovi[i].ime;
                            if (k.domacin.ime == ime)
                            {
                                poeni_d+=k.poenidomacin;
                                poeni_p+=k.poenigost;
                                if (k.poenidomacin > k.poenigost)
                                    {
                                        pobede++;
                                    }
                                if (k.poenidomacin < k.poenigost)
                                    {
                                        porazi++;
                                    }
                            }
                            if (k.gost.ime == ime)
                            {
                                poeni_d+=k.poenigost;
                                poeni_p+=k.poenidomacin;
                                if (k.poenigost > k.poenidomacin)
                                    {
                                        pobede++;
                                    }
                                if (k.poenigost < k.poenidomacin)
                                    {
                                        porazi++;
                                    }
                            }
                        })
                        var bodovi = pobede*2+porazi;
                        var kos_razlika = poeni_d - poeni_p;

                        var th = document.createElement("tr");
                        table.appendChild(th);

                        var el = document.createElement("td");
                        el.innerHTML = klubovi[i].ime;
                        th.appendChild(el);

                        var el = document.createElement("td");
                        el.innerHTML = pobede;
                        th.appendChild(el);

                        var el = document.createElement("td");
                        el.innerHTML = porazi;
                        th.appendChild(el);

                        var el = document.createElement("td");
                        el.innerHTML = bodovi;
                        th.appendChild(el);
                        
                        var el = document.createElement("td");
                        el.innerHTML = poeni_d;
                        th.appendChild(el);
                        
                        var el = document.createElement("td");
                        el.innerHTML = poeni_p;
                        th.appendChild(el);

                        var el = document.createElement("td");
                        el.innerHTML = kos_razlika;
                        th.appendChild(el);
                        
                        
                    }

        
var rows,switching, i, x, y,x1,y1, shouldSwitch;
rows=table.rows;
console.log(rows.length);
switching = true;

while (switching) {

      switching = false;
      for (i = 0; i < 13; i++) {

        shouldSwitch = false;

        x = rows[i].childNodes[3];
        y = rows[i+1].childNodes[3];
        x1 = rows[i].childNodes[6];
        y1 = rows[i+1].childNodes[6];

        if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
        if (parseInt(x.innerHTML) == parseInt(y.innerHTML) && parseInt(x1.innerHTML) < parseInt(y1.innerHTML)) {
            shouldSwitch = true;
            break;
      }
    }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        }
}

for (var i = 0,row; row = table.rows[i]; i++) {
    var col = row.cells[0];
    col.style.cursor = "pointer"
    col.addEventListener("click", (e) => {
        var id = e.target.innerHTML;
        var value1= id;
        var queryString = "?para1"+ queryString1+"&para2" + value1;
        window.location = "http://127.0.0.1:5500/klijent/klub_view.html" + queryString;
    })
}
}