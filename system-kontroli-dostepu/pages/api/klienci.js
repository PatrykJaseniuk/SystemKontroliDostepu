import { getDomainLocale } from "next/dist/shared/lib/router/router"

const klienci =
{
    columns: [
        { name: "imie", type: "text" },
        { name: "nazwisko", type: "text" },
        { name: "dataUrodzenia", type: "date" },
    ],
    rows: [
        {
            id: 1,
            cells: [
                "Jan",
                "Kowalski",
            ]
        },
        {
            id: 2,
            cells: [
                "Jan",
                "Kowalski",
            ]
        },
        {
            id: 3,
            cells: [
                "Jan",
                "Kowalski",
            ]
        },
        {
            id: 4,
            cells: [
                "Jan",
                "Kowalski",
            ]
        },
        {
            id: 5,
            cells: [
                "Maniek",
                "Kowalski",
            ]
        }
    ]
}


export default function handler(req, res) {
    // get all query params
    for (let [key, value] of Object.entries(req.query)) {
        console.log(key, value);

    }
    //  map column name to column index
    let query = Object.entries(req.query).map(([key, value]) => {
        return {
            index: klienci.columns.findIndex(column => column.name === key),
            value: value
        }
    }
    )
    console.log('maped : ', query);


    // find index of column were name is equal to key
    // let index = klienci.columns.findIndex(column => column.name === key)


    // filter klienci by query params
    let filteredRows = klienci.rows.filter(row => {
        let result = true;
        query.forEach(element => {
            // console.log('sprawdzana wartosc:',element.index, element.value,'zawarotsc komorki:', row.cells[element.index]);
            // console.log(!row.cells[element.index].toLowerCase().includes(element.value.toLowerCase()));
            if (!row.cells[element.index].toLowerCase().includes(element.value.toLowerCase())) {
                result = false;
                return false;
            }
        }
        );
        return result;
    }
        // for (let [key, value] of query) {
        //     if (!row.cells[key].includes(value)) {
        //         return false;
        //     }
        // }
    )


    let string1 = "string fsdf";
    let string2 = "string fsdffsdfsd";

    // if string 1 conteins string 2




    let filteredKlienci = { columns: klienci.columns, rows: filteredRows };
    res.status(200).json(filteredKlienci);
}

export function apiURLgenerator(query) {
    console.log(query)
    let urlQuery = "?"
    for (let key in query) {
        console.log(key)
        urlQuery += `${key}=${query[key]}&`;
    }

    return ('/api/klienci' + urlQuery);
}

export async function getData(query) {
    return fetch(apiURLgenerator(query)).then(r => r.json())
}