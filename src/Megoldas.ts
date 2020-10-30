import Ajto from "./Ajto";
import fs from "fs";

export default class Megoldas {
    private _ajtok: Ajto[] = [];
    private _fajl: string[] = [];

    public get elso_belepo(): number {
        return this._ajtok[0].azonosito;
    }

    public get utolso_belepo() {
        return this._ajtok[this._ajtok.length - 1].azonosito;
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
