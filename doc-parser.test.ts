import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { PlayerData } from '.';

describe("basic parsing test", () => {
    it("reading in a doc", () => {
        const file: string = fs.readFileSync("./LTRC/Playerdata.html", "utf-8");
        const dom = new JSDOM(file);
        const document: Document = dom.window.document;
        expect(document).toBeDefined()
    })
})

describe("getting rows of players test", () => {
    const file: string = fs.readFileSync("./LTRC/Playerdata.html", "utf-8");
    const dom = new JSDOM(file);
    const document: Document = dom.window.document;

    it("reading a single player", () => {
        const tbody = document.querySelector('tbody');
        const trs: HTMLTableRowElement[] = Array.from(tbody?.querySelectorAll('tr') ?? []);
        const tr: HTMLTableRowElement = trs[3];
        const tds: HTMLTableCellElement[] = Array.from(tr?.querySelectorAll('td') ?? []);

        const playerData: PlayerData = { name: tds[0].innerHTML, mmr: parseInt(tds[4].innerHTML, 10) }

        expect(playerData).toBeDefined()
        expect(playerData.name).toBe('Gaberboo')
        expect(playerData.mmr).toBe(7261)
    })

    it("exporting player data", () => {
        const tbody = document.querySelector('tbody');
        const playerRows: HTMLTableRowElement[] = Array.from(tbody?.querySelectorAll('tr') ?? []);
        const players: PlayerData[] = []
        for (const playerRow of playerRows) {
            const tableData: HTMLTableCellElement[] = Array.from(playerRow?.querySelectorAll('td') ?? []);
            const playerData: PlayerData = { name: tableData[0].innerHTML }

            if (!tableData[4].innerHTML.includes('?')) {
                playerData.mmr = parseInt(tableData[4].innerHTML, 10)
            }

            if (tableData[5].innerHTML !== "") {
                const img: HTMLImageElement | null = tableData[5].querySelector('img')
                playerData.mii = img?.src
            }

            if (playerData.name?.length !== 0 && playerData.name !== 'Player') {
                players.push(playerData)
            }
        }

        const jsonData = JSON.stringify(players, null, 2);
        fs.writeFileSync('./out/players.json', jsonData);
    })

    it("exporting season data", () => {
        const tbody = document.querySelector('tbody');
        const playerRows: HTMLTableRowElement[] = Array.from(tbody?.querySelectorAll('tr') ?? []);

    })
})