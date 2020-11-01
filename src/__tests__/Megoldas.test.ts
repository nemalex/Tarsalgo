import fs from "fs";
import Ajto from "../Ajto";
import Megoldas from "../Megoldas";

describe("Megoldas osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("ajto.txt");
    it("Megoldas osztálypéldány ellenőrzése", async => {
        expect(instance).toBeInstanceOf(Megoldas);
    });
    it("Első belépő", async => {
        expect(instance.elso_belepo).toBe(2);
    });
    it("Utolsó belépő", async => {
        expect(instance.utolso_belepo).toBe(30);
    });
    it("Belépések száma", async => {
        expect(fs.readFileSync("athaladas.txt").toString()).toBe(instance.belepesek_szama);
    });
    it("Bent maradtak", async => {
        expect(instance.bent_maradtak).toBe(" 1 11 22 24 29 30 35 37");
    });
    it("Legtöbben bent", async => {
        expect(instance.legtobben_bent).toBe("10:44");
    });
    it("Bent tartózkodott", async => {
        expect(instance.bent_tartozkodott(22)).toBe("");
    });
});
