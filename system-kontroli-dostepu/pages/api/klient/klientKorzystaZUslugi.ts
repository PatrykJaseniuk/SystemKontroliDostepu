import  dataBase  from '../../../database/db'

// todo:
interface Argument {
    idKlienta: number
    idUslugi: number
}

interface Result {
    czyZapisano: boolean
}

const URL = '/api/klient/klientKorzystaZUslugi';


var klienci = dataBase.tabele.klienci;

export default function handler(req, res) {
    console.log('---------------klient korzysta z uslugi---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let czyZapisano = false;
    let argument: Argument = req.body as Argument;
    var klient = klienci.getById(argument.idKlienta)
    klient.powiazaneEncje.subskrypcje.forEach(subskrypcja => {
        if (subskrypcja.id === argument.idUslugi) {
            subskrypcja.komorki.czyJestUzywana = true;
            czyZapisano = true;
            //to do dadac wizyte
            return;
        }
    })

    let result: Result = { czyZapisano: czyZapisano };

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----klient korzysta z uslugi---------------');
}

export async function klientKorzystaZUslugi(argument: Argument): Promise<Result> {
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

