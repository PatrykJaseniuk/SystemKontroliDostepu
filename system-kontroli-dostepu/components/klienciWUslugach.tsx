//API
import { getKlienciWUslugach, Result } from "../APICaller&Interface/klient/getKlienciWUslugach";
import { Result as TabelaProsta } from "../APICaller&Interface/read";
// Components
import Tabela from "./Tabela";
// hooks
import { useEffect, useState } from "react";


export default function KlienciWUslugach({ odswierzanie }) {
    var [klienciWUslugach, setKlienciWUslugach] = useState<Result>(null);
    useEffect(() => {
        getKlienciWUslugach()
            .then(data => { setKlienciWUslugach(data) })
            .catch(error => { console.log('getKlienciWUslugach: ', error) });
    }, [odswierzanie])

    if (!klienciWUslugach) return null;
    return (
        <div>
            <div className="card bg-primary mb-3">
                <div className="card-body ">
                    <h1>Klienci w usługach</h1>
                    {klienciWUslugach.uslugi.map(usluga => {
                        return (<div>
                            <h2>{usluga.nazwa}</h2>
                            <Tabela
                                getFileteredAndSorted={function (): Promise<TabelaProsta> {
                                    return new Promise((resolve) => resolve(usluga.tabela
                                    ));
                                }}
                                onRowClick={() => { }}
                            />
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}