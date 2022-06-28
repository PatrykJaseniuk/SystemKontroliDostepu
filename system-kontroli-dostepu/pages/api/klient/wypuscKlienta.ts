import { Argument, Result } from '../../../APICaller&Interface/klient/wypuscKlienta';
import { prisma } from '../../../prisma/prismaClient';

export default async function handler(req, res) {
    console.log('---------------wypuszczenie klienta---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);


    let argument: Argument = req.body as Argument;
    let result: Result = { czyWypuszczono: false };
    argument.idKlienta
    //    set czyJestUzywany to false for karnet with klientId = argument.idKlienta
    let updateResult = await prisma.karnet.updateMany({
        where: {
            klientId: argument.idKlienta
        },
        data: {
            czyJestUzywany: false
        }
    })
    if (updateResult.count > 0) {
        result = {
            czyWypuszczono: true
        }
    }

    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----wypuszczenie klienta---------------');
}



