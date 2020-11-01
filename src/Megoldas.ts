import Ajto from "./Ajto";
import fs from "fs";
import { isNull } from "util";

export default class Megoldas {
    private _ajtok: Ajto[] = [];
    private _fajl: string[] = [];

    public get elso_belepo(): number {
        for (let index = 0; index < this._ajtok.length; index++) {
            if (this._ajtok[index].irany == "be") {
                return this._ajtok[index].azonosito;
            }
        }
        return -1;
    }

    public get utolso_belepo(): number {
        let utolso_belepo_azonosito: number = 0;
        for (let index = 0; index < this._ajtok.length; index++) {
            if (this._ajtok[index].irany == "ki") {
                utolso_belepo_azonosito = this._ajtok[index].azonosito;
            }
        }
        return utolso_belepo_azonosito;
    }

    public belepesek_szama(állományNeve: string): void {
        const azonositok: number[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (!azonositok.includes(this._ajtok[i].azonosito)) {
                azonositok.push(this._ajtok[i].azonosito);
            }
        }
        azonositok.sort((x, y) => x - y);
        const ki: string[] = [];
        azonositok.forEach(i => {
            let athaladasok_szama: number = 0;
            for (let j = 0; j < this._ajtok.length; j++) {
                if (i == this._ajtok[j].azonosito) {
                    athaladasok_szama++;
                }
            }
            ki.push(`${i} ${athaladasok_szama}`);
            fs.writeFileSync(állományNeve, ki.join("\r\n") + "\r\n");
        });
    }
    public get bent_maradtak(): string {
        const eredmeny: number[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].irany == "be") {
                if (!eredmeny.includes(this._ajtok[i].azonosito)) {
                    eredmeny.push(this._ajtok[i].azonosito);
                }
            } else if (this._ajtok[i].irany == "ki") {
                const index = eredmeny.indexOf(this._ajtok[i].azonosito, 0);
                eredmeny.splice(index, 1);
            }
        }
        eredmeny.sort((a, b) => a - b);
        let eredmeny2: string = "";
        for (let i = 0; i < eredmeny.length; i++) {
            eredmeny2 += ` ${eredmeny[i]}`;
        }
        return eredmeny2;
    }

    public get legtobben_bent(): string {
        let max: number = 0;
        let eredmeny: number[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].irany == "be") {
                if (!eredmeny.includes(this._ajtok[i].azonosito)) {
                    eredmeny.push(this._ajtok[i].azonosito);
                }
            } else if (this._ajtok[i].irany == "ki") {
                const index = eredmeny.indexOf(this._ajtok[i].azonosito, 0);
                eredmeny.splice(index, 1);
            }
            if (eredmeny.length > max) {
                max = eredmeny.length;
            }
        }
        eredmeny = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].irany == "be") {
                if (!eredmeny.includes(this._ajtok[i].azonosito)) {
                    eredmeny.push(this._ajtok[i].azonosito);
                }
            } else if (this._ajtok[i].irany == "ki") {
                const index = eredmeny.indexOf(this._ajtok[i].azonosito, 0);
                eredmeny.splice(index, 1);
            }
            if (eredmeny.length == max) {
                return this._ajtok[i].ido;
            }
        }
        return "";
    }

    public bent_tartozkodott(azonosito: number): string {
        const athaladasok: string[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].azonosito == azonosito) {
                athaladasok.push(this._ajtok[i].ido);
            }
        }
        let valasz: string = "";
        for (let i = 0; i < athaladasok.length; i += 2) {
            if (athaladasok[i + 1] === undefined) {
                valasz += athaladasok[i] + "-\n";
            } else {
                valasz += athaladasok[i] + "-" + athaladasok[i + 1] + "\n";
            }
            // valasz += athaladasok[i] + "-" + athaladasok[i + 1] + "\n";
        }
        return valasz;
    }

    public bent_toltott_ido(azonosito: number): number {
        const athaladasok: Date[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].azonosito == azonosito) {
                athaladasok.push(this._ajtok[i].Date);
            }
        }
        let valasz: number = 0;
        for (let i = 0; i < athaladasok.length; i += 2) {
            if (athaladasok[i + 1] === undefined) {
                valasz += Math.abs(parseInt(new Date(1, 0, 1, 15, 0).getTime().toString()) - parseInt(athaladasok[i].getTime().toString()));
            } else {
                valasz += Math.abs(parseInt(athaladasok[i + 1].getTime().toString()) - parseInt(athaladasok[i].getTime().toString()));
            }
        }
        return valasz / 1000 / 60;
    }

    public bent_maradt_e(azonosito: number): string {
        const athaladasok: string[] = [];
        for (let i = 0; i < this._ajtok.length; i++) {
            if (this._ajtok[i].azonosito == azonosito) {
                athaladasok.push(this._ajtok[i].ido);
            }
        }
        let bent_maradt: boolean = false;
        for (let i = 0; i < athaladasok.length; i += 2) {
            if (athaladasok[i + 1] === undefined) {
                bent_maradt = true;
            }
        }
        if (bent_maradt) {
            return "a társalgóban volt";
        } else {
            return "nem volt a társalgóban";
        }
    }

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor: string = i.trim(); //vezérlő karakterek levágása
                this._ajtok.push(new Ajto(aktSor));
            });
    }
}
