export class Mec {

    constructor(domacin,gost,poenidomacin,poenigost,kolo,sudija,sezona) {
        this.domacin = domacin;
        this.gost = gost;
        this.poenidomacin = poenidomacin;
        this.kolo = kolo;
        this.poenigost = poenigost;
        this.sudija=sudija;
        this.sezona=sezona;
    }

    crtaj(host) {

        var tr = document.createElement("tr");
        host.appendChild(tr);

        var el = document.createElement("td");
        el.innerHTML = this.domacin.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.poenidomacin;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.poenigost;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.gost.ime;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.kolo;
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.sudija.ime + " " + this.sudija.prezime;
        tr.appendChild(el);
    }
}