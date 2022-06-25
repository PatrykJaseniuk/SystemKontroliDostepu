
import dataBase from '../../../database/db'


interface Argument {
    idKlienta: number
}

interface Result {
    czyKozystaZUslugi: boolean
}

const URL = '/api/klient/czyKozystaZUslugi';


var klienci = dataBase.tabele.klienci;

export default function handler(req, res) {
    console.log('---------------czy klient kozysta z uslugi---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let argument: Argument = req.body;
    var klient = klienci.getById(argument.idKlienta)
    let czyKozystaZUslugi: boolean = false;
    klient.powiazaneEncje.subskrypcje.forEach(subskrypcja => {
        czyKozystaZUslugi = czyKozystaZUslugi || subskrypcja.komorki.czyJestUzywana;
    })

    let result: Result = { czyKozystaZUslugi: czyKozystaZUslugi };

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----czy klient kozysta z uslugi--------------------');
}

export async function getCzyKozystaZUslugi(argument: Argument): Promise<Result> {
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

