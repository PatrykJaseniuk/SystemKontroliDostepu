
import getDataBase from '../../../database/db'
import { Argument, Result} from '../../../APICaller&Interface/klient/czyKozystaZuslugi'



var klienci = getDataBase().tabele.klienci;

export default function handler(req, res) {
    console.log('---------------czy klient kozysta z uslugi---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let argument: Argument = req.body;
    var klient = klienci.getById(argument.idKlienta)
    let czyKozystaZUslugi: boolean = false;
    klient.powiazaneEncje.subskrypcje.forEach(subskrypcja => {
        czyKozystaZUslugi = czyKozystaZUslugi || subskrypcja.komorki.czyJestUzywana;
    })

    let result: Result = { czyKozystaZUslugi: czyKozystaZUslugi };

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----czy klient kozysta z uslugi--------------------');
}

