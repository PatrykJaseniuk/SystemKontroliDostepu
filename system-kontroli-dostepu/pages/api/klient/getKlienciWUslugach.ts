import { Argument, Result, Usluga } from '../../../APICaller&Interface/klient/getKlienciWUslugach';
import { prisma } from '../../../prisma/prismaClient';

export default async function handler(req, res) {
    console.log('---------------klienci w uslugach---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let result: Result = { uslugi: [] };
    // let argument: Argument = req.body;


    let uslugi = await prisma.usluga.findMany();

    // for ewery usluga find klients with karnet in use
    for await (const usluga of uslugi) {
        let klienci = await prisma.klient.findMany({
            where: {
                karnety: {

                    some: {
                        czyJestUzywany: true,
                        KarnetTyp: {
                            uslugi: {
                                some: {
                                    id: usluga.id
                                }
                            }
                        }
                    }
                }
            }
        })

        let tabela: Usluga['tabela'] = {
            columns: [{ nazwaKolumny: 'imie', typ: 'text' }, { nazwaKolumny: 'nazwisko', typ: 'text' }],
            rows: klienci.map(klient => {
                let id = klient.id;
                delete klient['id']
                return { id: id, komorki: klient }
            })
        }
        result.uslugi.push({ nazwa: usluga.nazwa, tabela: tabela })
    }

    console.log('result: ', result);
    console.log('<----klienci w uslugach---------------');
    res.status(200).json(result);
}
 // result.uslugi = upowaznia.rows.map(upowaznienie => {
    //     let usluga: Usluga = {
    //         nazwa: upowaznienie.komorki.nazwa,
    //         tabela: {
    //             columns: subskrypcje.columns,
    //             rows: subskrypcje.rows.map(subskrypcja => {
    //                 console.log(subskrypcja.powiazaneEncje.klient.komorki.imie, ' czyJestUzywana:', subskrypcja.komorki.czyJestUzywana)
    //                 if (subskrypcja.komorki.czyJestUzywana == true) {
    //                     return { id: subskrypcja.id, komorki: subskrypcja.komorki }
    //                 }
    //                 else {
    //                     return { id: subskrypcja.id, komorki: { nic: 'nic' } }
    //                 }
    //             })
    //         }
    //     }
    //     return usluga;
    // })
