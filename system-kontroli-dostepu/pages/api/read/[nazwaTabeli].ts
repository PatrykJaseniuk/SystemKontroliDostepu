import { Argument, Result } from '../../../APICaller&Interface/read';
// import { query, Tabela } from '../../../database/db'
// import getDatabase from '../../../database/db';
// const getDatabase = require('../../../database/db');
// import prisma client 
import { prisma } from '../../../prisma/prismaClient';


export default async function handler(req, res) {
    console.log('---------------tabele read---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);


    const { nazwaTabeli } = req.query
    // const tabela = getDatabase().getTabele(nazwaTabeli);

    let argument: Argument = req.body;
    let orderBy:Argument['sort']| {};
    if(argument.sort.direction!="none"){
        orderBy = {
            [argument.sort.column]: argument.sort.direction
        }
    }
    else{
        orderBy={};
    }
    

    let tabela = await prisma[nazwaTabeli].findMany({
        where: {
            AND: Object.entries(argument.filter).map(([nazwaKolumny, szukanaWartosc]) => {
                return {
                    [nazwaKolumny]: { contains: szukanaWartosc }
                }
            })

        },
        orderBy: orderBy
    }
    );

    // prisma.klient.findMany({
    //     where: {
    //         imie: { contains: argument.filter.imie }
    //     },
    //     orderBy: {
    //         imie: ''
    //     }
    // })
    // console.log(tabela);
    // let filteredAndSorted = tabela.getFilteredAndSorted(req.body as Argument);
    // remove powiazane encje from filteredAndSorted
    // let rows = filteredAndSorted.rows.map(row => {
    // return { id: row.id, komorki: row.komorki }
    // })

    // bugogenne rozwiazanie
    let result: Result = {
        columns: [], rows: tabela.map(row => {
            let id = row.id;
            delete row['id'];
            return { id: id, komorki: row }
        })
    }
    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----tabela read---------------');
}

// async function getData(url: string, query: query) {
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'same-origin', // include, *same-origin, omit
//         headers: {
//             'Content-Type': 'application/json'
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(query) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// export function getKlienci(query: query): Promise<TabelaProsta> {
//     var url = URL + URLKlienci;
//     return getData(url, query);
// }