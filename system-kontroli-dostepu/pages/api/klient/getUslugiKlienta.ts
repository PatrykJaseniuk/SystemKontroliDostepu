import { Argument, Result, Usluga } from '../../../APICaller&Interface/klient/getUslugiKlienta';
import { prisma } from '../../../prisma/prismaClient';




export default async function handler(req, res) {
    console.log('---------------uslugi klienta---->');
    console.log('query: ', req.query);
    console.log('body: ', req.body);
    console.log('id: ', req.body.idKlienta);

    const argument: Argument = req.body;

    let karnety = await prisma.karnet.findMany({
        where: {
            klientId: argument.idKlienta
        }
    });

    let uslugiKlienta: Usluga[] = [];

    for await (const karnet of karnety) {
        let uslugi = await prisma.usluga.findMany({
            where: {
                typyKarnetow: {
                    some: {
                        karnety: {
                            some: {
                                id: karnet.id
                            }
                        }
                    }
                }
            }
        })

        uslugi.forEach(usluga => {
            uslugiKlienta.push({ idKarnetu: karnet.id, nazwa: usluga.nazwa })
        })
    }

    let result: Result = { uslugiKlienta: uslugiKlienta };
    res.status(200).json(result);
    console.log('result: ', result);
    console.log('<----uslugi klienta---------------');
}