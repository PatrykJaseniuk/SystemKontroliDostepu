import { Argument,Result,Usluga } from '../../../APICaller&Interface/klient/getKlienciWUslugach';

import getDataBase from '../../../database/db'



// interface Argument {
// }

// interface Usluga {
//     nazwa: string,
//     tabela: TabelaProsta
// }

// export interface Result {
//     uslugi: Usluga[]
// }

// const URL = '/api/klient/klienciWUslugach';


var subskrypcje = getDataBase().tabele.subskrypcje;
var upowaznia = getDataBase().tabele.upowaznienia;
var klienci = getDataBase().tabele.klienci;

export default function handler(req, res) {
    console.log('---------------klienci w uslugach---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let result: Result ={} as Result;

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

    console.log('result: ', result);
    console.log('<----klienci w uslugach---------------');
    res.status(200).json(result);    
}



