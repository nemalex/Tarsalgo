export default class Ajto {
    private _ora: number;
    private _perc: number;
    private _azonosito: number;
    private _irany: string;

    public get azonosito(): number {
        return this._azonosito;
    }

    public get irany(): string {
        return this._irany;
    }
    public get ido(): string {
        return `${this._ora}:${this._perc}`;
    }
    public get Date(): Date {
        return new Date(1, 0, 1, this._ora, this._perc, 0, 0);
    }

    constructor(sor: string) {
        const adatok: string[] = sor.split(" ");
        this._ora = parseInt(adatok[0]);
        this._perc = parseInt(adatok[1]);
        this._azonosito = parseInt(adatok[2]);
        this._irany = adatok[3];
    }
}
