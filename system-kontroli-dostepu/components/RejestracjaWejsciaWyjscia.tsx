// API
import { getKlienci } from '../APICaller&Interface/read';
import { getUslugiKlienta } from '../APICaller&Interface/klient/getUslugiKlienta';
import { getCzyKozystaZUslugi } from '../APICaller&Interface/klient/czyKozystaZuslugi';
import { klientKorzystaZUslugi } from '../APICaller&Interface/klient/klientKorzystaZUslugi';
import { wypuscKlienta } from '../APICaller&Interface/klient/wypuscKlienta';
// Components
import Tabela from './Tabela';
// hooks
import { useState, useEffect } from 'react';

// import { getDostepneUslugi } from '../pages/api/read/[nazwaTabeli]';


export default function RejestracjaWejsciaWyjscia({ onChange }) {
    var [selectedKlientId, setSelectedKlientId] = useState(null);
    useEffect(() => {
        onChange();
    }, [selectedKlientId])
    console.log('wybrano klienta', selectedKlientId);

    return (
        <div>
            <div className="card bg-primary mb-3">
                <div className="card-body ">
                    <h1>Rejestracja wejścia i wyjścia</h1>
                    {(() => {
                        if (selectedKlientId) {
                            return (
                                <PrzyciskiWpuszczaniaWypuszczaniaKlienta
                                    klientId={selectedKlientId}
                                    onCancelClick={() => { setSelectedKlientId(null) }}
                                />
                            )
                        }
                        else {
                            return (
                                <Tabela
                                    getFileteredAndSorted={getKlienci}
                                    onRowClick={(idKlienta) => { setSelectedKlientId(idKlienta); }}
                                    onDetailsClick={undefined}
                                    onNewClick={undefined}
                                />
                            )
                        }
                    })()}
                </div>
            </div>
        </div>
    )
}

function PrzyciskiWpuszczaniaWypuszczaniaKlienta({ klientId, onCancelClick }) {
    var [dostepneUslugi, setDostepneUslugi] = useState(null);
    var [czyKozystaZUslugi, setCzyKozystaZUslugi] = useState(null);
    var [info, setInfo] = useState(null);

    useEffect(() => {
        getUslugiKlienta({ idKlienta: klientId })
            .then(data => { setDostepneUslugi(data.uslugiKlienta); console.log('getUslugiKlienta: ', data) }).
            catch(error => { console.log('getUslugiKlienta: ', error) });

        getCzyKozystaZUslugi({ idKlienta: klientId })
            .then(data => { setCzyKozystaZUslugi(data.czyKozystaZUslugi); console.log('getCzyKozystaZUslugi: ', data.czyKozystaZUslugi) });
    }, [klientId])



    return (
        <div className="card bg-secondary mb-3">
            {(() => {
                if (info) {
                    return (
                        <div className="card-body">
                            <h1>{info ? 'OK' : 'odrzucono!'}</h1>
                            <button className="btn btn-primary" onClick={onCancelClick}>Zamknij</button>
                        </div>
                    )
                }
                else if (czyKozystaZUslugi == null || dostepneUslugi == null) {
                    return <p>Loading... </p>
                }
                else if (czyKozystaZUslugi == true) {
                    return (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                wypuscKlienta({ idKlienta: klientId })
                                    .then((info) => { setInfo(info) })
                                    .catch(error => { console.log('wypuscKlienta: ', error) }
                                    )
                            }}
                        >
                            wypusc klienta
                        </button>
                    )
                }
                else {
                    return dostepneUslugi.map((usluga, index) => (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                klientKorzystaZUslugi({ idKlienta: klientId, idUslugi: usluga.id })
                                    .then((data) => {
                                        console.log('klientKorzystaZUslugi: ', data);
                                        setInfo(data)
                                    }
                                    )
                            }}
                        >
                            wpusc Klienta do {usluga.nazwa}
                        </button>
                    ))
                }
            })()}
            <button
                type="button"
                className="btn btn-primary"
                onClick={onCancelClick}
            >
                anuluj
            </button>
        </div>
    )
}