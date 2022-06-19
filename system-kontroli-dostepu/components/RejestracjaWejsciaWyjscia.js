import Tabela from './Tabela';
import { getData,getKlient } from '../pages/api/klienci';
import { useState } from 'react';


export default function RejestracjaWejsciaWyjscia() {


    var [selectedKlientId, setSelectedKlientId] = useState(null);


    return (
        <div>
            <div class="card bg-primary mb-3">
                <div class="card-body ">
                    <h1>Rejestracja wejścia i wyjścia</h1>
                    <Tabela
                        getData={getData}
                        onRowClick={(idKlienta) => { setSelectedKlientId(idKlienta) }}
                    />

                    <PrzyciskiWpuszczaniaWypuszczaniaKlienta
                        klient = {selectedKlientId}
                    />
                </div>
            </div>
        </div>
    )
}

function PrzyciskiWpuszczaniaWypuszczaniaKlienta() {
    return (
        <div class="card bg-secondary mb-3">
            <button type="button" class="btn btn-primary">
                Wpuszczaj klienta
            </button>
            <button type="button" class="btn btn-primary">
                Wypuszczaj klienta
            </button>
        </div>
    )
}