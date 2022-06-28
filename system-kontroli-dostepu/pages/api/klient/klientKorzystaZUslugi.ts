import { Argument, Result } from '../../../APICaller&Interface/klient/klientKorzystaZUslugi';
import getDataBase from '../../../database/db'


var klienci = getDataBase().tabele.klienci;

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