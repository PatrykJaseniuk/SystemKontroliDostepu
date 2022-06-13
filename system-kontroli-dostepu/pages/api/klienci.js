import { getDomainLocale } from "next/dist/shared/lib/router/router"

const klienci =
{
    columns: [
        "Imie",
        "Nazwisko",
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
        }
    ]
}


export default function handler(req, res) {
    res.status(200).json(klienci)
}

export function URLgetAll() {
    return ('/api/klienci');
}