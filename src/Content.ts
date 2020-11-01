import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Jedlik Ts Template</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        //1. feladat
        const megold: Megoldas = new Megoldas("ajto.txt");
        //2. feladat
        res.write("2. feladat\n");
        res.write(`Az első belépő: ${megold.elso_belepo}\n`);
        res.write(`Az utolsó belépő: ${megold.utolso_belepo}\n\n`);
        megold.belepesek_szama("athaladas.txt");
        res.write("4. feladat\n");
        res.write(`A végén a társalgóban voltak: ${megold.bent_maradtak}\n\n`);
        res.write("5. feladat\n");
        res.write(`Például ${megold.legtobben_bent}-kor voltak bent a legtöbben a tásalgóban\n\n`);
        res.write("7. feladat\n");
        let azonosito_input: number = parseInt(params.input as string);
        if (isNaN(azonosito_input)) azonosito_input = 22;
        res.write(`Adja meg a személy azonosítóját! <input type='number' name='input' value=${azonosito_input} style='max-width:40px;' onChange='this.form.submit();'>\n`);
        res.write(megold.bent_tartozkodott(azonosito_input));
        res.write("\n8. feladat\n");
        res.write(`A(z) ${azonosito_input}. személy összesen ${megold.bent_toltott_ido(azonosito_input)} percet volt bent, a megfigyelés végén ${megold.bent_maradt_e(azonosito_input)}.`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
