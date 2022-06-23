


import { getDomainLocale } from "next/dist/shared/lib/router/router"
import dataBase from '../../database/db'

const URL = '/api/uslugiKlienta';


var klienci = dataBase.klienci

export default function handler(req, res) {
    const idKlienta = req.query.idKlienta;

    var klient = klienci.getById(idKlienta)
    // var uslugi = klient.powiazaneEncje.karnety.getAktywne().


    res.status(200).json(filteredAndSorted);
}

export async function getUslugiKlienta(idKlienta) {

    // Default options are marked with *
    const response = await fetch(`URL/${idKlienta}`)
    return response.json(); // parses JSON response into native JavaScript objects
}

