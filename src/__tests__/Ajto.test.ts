import Ajto from "../Ajto";

describe("Ajto osztály unit tesztek: ", () => {
    const tesztAjto = new Ajto("10 15 5 be");
    it("Ajto osztálypéldány ellenőrzése", async () => {
        expect(tesztAjto).toBeInstanceOf(Ajto);
    });
    it("Ajto-n áthaladó azonosítójának ellenőrzése", async () => {
        expect(tesztAjto.azonosito).toBe(5);
    });
    it("Ajto-n áthaladó irányának ellenőrzése", async () => {
        expect(tesztAjto.irany).toBe("be");
    });
    it("Ajto-n áthaladás idejének ellenőrzése", async () => {
        expect(tesztAjto.ido).toBe("10:15");
    });
});
