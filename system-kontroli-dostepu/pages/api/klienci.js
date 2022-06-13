import { getDomainLocale } from "next/dist/shared/lib/router/router"

const klienci =
[
    {
        id: 1,
        imie: "Jan",
        nazwisko: "Kowalski",
    },
    {
        id: 2,
        imie: "Jan",
        nazwisko: "Nowak",
    },
    {
        id: 3,
        imie: "Maria",
        nazwisko: "Kowalska",
    },
    {
        id: 4,
        imie: "Krzysztof",
        nazwisko: "Kowalski",
    }
]

export default function handler(req, res) {
    res.status(200).json(klienci)
  }

  export function URLgetAll()
  {
    return ('/api/klienci');
  }