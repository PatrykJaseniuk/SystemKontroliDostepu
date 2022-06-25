import KlienciWUslugach from '../../../components/klienciWUslugach';
import dataBase from '../../../database/db'
import { TabelaProsta } from '../read/[nazwaTabeli]';


interface Argument {
}

interface Usluga {
    nazwa: string,
    tabela: TabelaProsta
}

export interface Result {
    uslugi: Usluga[]
}

const URL = '/api/klient/klienciWUslugach';


var subskrypcje = dataBase.tabele.subskrypcje;
var upowaznia = dataBase.tabele.upowaznienia;
var klienci = dataBase.tabele.klienci;

export default function handler(req, res) {
    console.log('---------------klienci w uslugach---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let result: Result;
    result = {} as Result;

    result.uslugi = upowaznia.rows.map(upowaznienie => {
        let usluga: Usluga = {
            nazwa: upowaznienie.komorki.nazwa,
            tabela: {
                columns: subskrypcje.columns,
                rows: subskrypcje.rows.map(subskrypcja => {
                    console.log(subskrypcja.powiazaneEncje.klient.komorki.imie, ' czyJestUzywana:', subskrypcja.komorki.czyJestUzywana)
                    if (subskrypcja.komorki.czyJestUzywana == true) {
                        return { id: subskrypcja.id, komorki: subskrypcja.komorki }
                    }
                    else {
                        return { id: subskrypcja.id, komorki: { nic: 'nic' } }
                    }
                })
            }
        }
        return usluga;

    })

    // subskrypcje.rows.forEach(subskrypcja => {
    //     if (subskrypcja.komorki.czyJestUzywana) {
    //         let usluga = subskrypcja.powiazaneEncje.typSubskrypcji.komorki.upowaznienie;
    //         let klient = subskrypcja.powiazaneEncje.klient;
    //         if (uslugi[usluga] == undefined) {
    //             let tabela: TabelaProsta = {
    //                 columns: [{ nazwaKolumny: 'imie', typ: 'text' }, { nazwaKolumny: 'nazwisko', typ: 'text' }],
    //                 rows: [{ id: klient.id, komorki: klient.komorki }]
    //             }
    //             uslugi[usluga] = {
    //                 nazwa: usluga,
    //                 tabela: tabela
    //             }
    //         }
    //         else {
    //             uslugi[usluga].tabela.rows.push({ id: klient.id, komorki: klient.komorki })
    //         }
    //         console.log(klient, ': klient');
    //     }
    // })

    // let result: Result;
    // result = {
    //     uslugi: [{
    //         nazwa: 'silka',
    //         tabela: { columns: [{ nazwaKolumny: 'imie', typ: 'text' }], rows: [] },
    //     }]
    // };
    // result = { uslugi: Object.values(uslugi) };
    console.log('result: ', result);
    res.status(200).json(result);
    console.log('<----klienci w uslugach---------------');
}

export async function getKlienciWUslugach(): Promise<Result> {
    // Default options are marked with *
    const response = await fetch(URL);
    return response.json(); // parses JSON response into native JavaScript objects
}

