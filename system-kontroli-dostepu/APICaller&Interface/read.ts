type TypPola = 'text' | 'boolean' | 'date' | 'array' | 'object';
type Wartosc = string | boolean | Date | number;
export interface Result {
    columns: { nazwaKolumny: string, typ: TypPola }[];
    rows: {
        id: number;
        komorki: {
            //dynamiczny klucz
            [key: nazwaKolumny]: Wartosc
        };
    }[]
}

type nazwaKolumny = string;
type szukanaWartosc = string;

export interface Argument {
    filter: {
        //dynamiczny klucz
        [key: nazwaKolumny]: szukanaWartosc;
    };
    sort: {
        direction: 'asc' | 'desc' | 'none';
        column: nazwaKolumny;
    }
}

const URL = '/api/read';
const URLKlienci = '/klienci';

async function getData(url: string, argument: Argument) {
    // Default options are marked with *
    const response = await fetch(url, {
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

export async function getKlienci(argument: Argument): Promise<Result> {
    var url = URL + URLKlienci;
    return getData(url, argument);
}