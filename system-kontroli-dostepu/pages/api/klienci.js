import { getDomainLocale } from "next/dist/shared/lib/router/router"

const URL = '/api/klienci';

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
    for (let [key, value] of Object.entries(req.body.filter)) {
        console.log(key, value);

    }
    console.log('sort: ', req.body.sort);

    //  map column name to column index
    let query = Object.entries(req.body.filter).map(([key, value]) => {
        return {
            index: klienci.columns.findIndex(column => column.name === key),
            value: value
        }
    }
    )
    console.log('maped : ', query);

    // filter klienci by query params
    let filteredRows = klienci.rows.filter(row => {
        let result = true;
        query.forEach(element => {
            if (!row.cells[element.index].toLowerCase().includes(element.value.toLowerCase())) {
                result = false;
                return false;
            }
        }
        );
        return result;
    }
    )

    let columnIndex = klienci.columns.findIndex(column => column.name == req.body.sort.column);
    let direction = req.body.sort.direction;
    // sort klienci by sort params
    let sortedRows = filteredRows.sort((a, b) => {
        let result = 0;
        if (direction === 'asc') {
            result = a.cells[columnIndex] > b.cells[columnIndex] ? 1 : -1;
        }
        else if (direction === 'desc') {
            result = a.cells[columnIndex] < b.cells[columnIndex] ? 1 : -1;
        }
        return result;
    }
    )

    let filteredKlienci = { columns: klienci.columns, rows: sortedRows };
    res.status(200).json(filteredKlienci);
}

// export function apiURLgenerator(query) {
//     console.log(query)
//     let urlQuery = "?"
//     for (let key in query) {
//         console.log(key)
//         urlQuery += `${key}=${query[key]}&`;
//     }

//     return ('/api/klienci' + urlQuery);
// }

// export async function getData(query) {
//     return fetch(apiURLgenerator(query)).then(r => r.json())
// }

// Example POST method implementation:
export async function getData(query = {}) {
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
        body: JSON.stringify(query) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}