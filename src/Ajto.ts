export default class Ajto {
    private _ora: number;
    private _perc: number;
    private _azonosito: number;
    private _irany: string;

    public get azonosito(): number {
        return this._azonosito;
    }

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._ora = parseInt(sor[0]);
        this._perc = parseInt(sor[1]);
        this._azonosito = parseInt(sor[2]);
        this._irany = sor[3];
    }
}
