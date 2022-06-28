
import { Argument, Result } from '../../../APICaller&Interface/klient/czyKozystaZuslugi'
import { prisma } from '../../../prisma/prismaClient';


export default async function handler(req, res) {
    console.log('---------------czy klient kozysta z uslugi---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);

    let argument: Argument = req.body;
    let result: Result = { czyKozystaZUslugi: false };
    let uzywanyKarnet = await prisma.karnet.findFirst({
        where: {
            klientId: argument.idKlienta,
            czyJestUzywany: true
        }
    })
    if (uzywanyKarnet) {
        result = {
            czyKozystaZUslugi: true
        }
    }

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----czy klient kozysta z uslugi--------------------');
}

