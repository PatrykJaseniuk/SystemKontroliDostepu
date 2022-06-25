import  dataBase  from '../../../database/db'

interface Argument {
    idKlienta: number
}

interface Result {
    uslugiKlienta: Array<Usluga>
}

interface Usluga {
    id: number,
    nazwa: string,
}

const URL = '/api/klient/uslugiKlienta';


var klienci = dataBase.tabele.klienci




export default function handler(req, res) {
    console.log('---------------uslugi klienta---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    console.log('id: ', req.body.idKlienta);

    const idKlienta = req.body.idKlienta;

    var klient = klienci.getById(idKlienta);
    console.log('klient: ', klient);

    let uslugiKlienta = klient.powiazaneEncje.subskrypcje.map(subskrypcja => {
        let usluga: Usluga = { id: subskrypcja.id, nazwa: subskrypcja.powiazaneEncje.typSubskrypcji.powiazaneEncje.usluga.komorki.nazwa }
        return usluga;
    }
    )
    let result: Result = {
        uslugiKlienta: uslugiKlienta
    }
    // = klient.powiazaneEncje.subskrypcje.map(subskrypcja => {
    //     console.log(subskrypcja.usluga.nazwa)
    //     let uslugaKlienta: Usluga = {
    //         id: subskrypcja.powiazaneEncje.typySubskrypcji[0].id,
    //         nazwa: subskrypcja.powiazaneEncje.typySubskrypcji[0].upowaznienie
    //     }
    //     return uslugaKlienta
    // }
    // )
    
    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----uslugi klienta---------------');
}

export async function getUslugiKlienta(argument: Argument): Promise<Result> {

    // Default options are marked with *
    const response = await fetch(URL, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(argument) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

