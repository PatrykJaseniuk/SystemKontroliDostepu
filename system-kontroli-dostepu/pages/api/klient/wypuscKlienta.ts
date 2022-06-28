import { Argument, Result } from '../../../APICaller&Interface/klient/wypuscKlienta';
import  getDataBase  from '../../../database/db'
// const getDatabase = require('../.././../database/db');
// todo:

var klienci = getDataBase().tabele.klienci;

export default function handler(req, res) {
    console.log('---------------wypuszczenie klienta---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let czyWypuszczono = false;
    let argument: Argument = req.body as Argument;
    var klient = klienci.getById(argument.idKlienta)
    klient.powiazaneEncje.subskrypcje.forEach(subskrypcja => {
        if (subskrypcja.komorki.czyJestUzywana === true) {
            subskrypcja.komorki.czyJestUzywana = false;
            czyWypuszczono = true;
        }
    })

    let result: Result = { czyWypuszczono: czyWypuszczono };

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----wypuszczenie klienta---------------');
}



