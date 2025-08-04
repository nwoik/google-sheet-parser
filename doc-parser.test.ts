import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Participant, PlayerData, Season } from '.';

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

            if (tableData[0].innerHTML.length !== 0 && tableData[0].innerHTML !== 'Player') {
                const playerData: PlayerData = { name: tableData[0].innerHTML }

                if (!tableData[4].innerHTML.includes('?')) {
                    playerData.mmr = parseInt(tableData[4].innerHTML, 10)
                }

                if (tableData[5].innerHTML !== "") {
                    const img: HTMLImageElement | null = tableData[5].querySelector('img')
                    playerData.mii = img?.src
                }

                players.push(playerData)
            }
        }

        const jsonData = JSON.stringify(players, null, 2);
        fs.writeFileSync('./out/players.json', jsonData);
    })

    it("exporting season data", () => {
        const tbody = document.querySelector('tbody');
        const playerRows: HTMLTableRowElement[] = Array.from(tbody?.querySelectorAll('tr') ?? []);
        const seasons: Season[] = []

        const season1: Season = {
            name: 'S1',
            active: false,
            participants: []
        }

        const season2: Season = {
            name: 'S2',
            active: false,
            participants: []
        }

        const season3: Season = {
            name: 'S3',
            active: true,
            participants: []
        }

        seasons.push(season1)
        seasons.push(season2)
        seasons.push(season3)

        for (const playerRow of playerRows) {
            const tableData: HTMLTableCellElement[] = Array.from(playerRow?.querySelectorAll('td') ?? []);
            if (tableData[0].innerHTML.length !== 0 && tableData[0].innerHTML !== 'Player') {
                if (parseInt(tableData[11].innerHTML, 10)) {
                    const participant: Participant = {
                        name: tableData[0].innerHTML,
                        mmr: parseInt(tableData[11].innerHTML, 10)
                    }

                    season3.participants.push(participant)
                }

                if (parseInt(tableData[12].innerHTML, 10)) {
                    const participant: Participant = {
                        name: tableData[0].innerHTML,
                        mmr: parseInt(tableData[12].innerHTML, 10)
                    }

                    season2.participants.push(participant)
                }

                if (parseInt(tableData[13].innerHTML, 10)) {
                    const participant: Participant = {
                        name: tableData[0].innerHTML,
                        mmr: parseInt(tableData[13].innerHTML, 10)
                    }

                    season1.participants.push(participant)
                }
            }
        }

        const jsonData = JSON.stringify(seasons, null, 2);
        fs.writeFileSync('./out/seasons.json', jsonData);
    })
})