import Tabela from './Tabela';


export default function RejestracjaWejsciaWyjscia() {







    return (
        <div>
            <div class="card bg-primary mb-3">
                <div class="card-body ">
                    <h1>Rejestracja wejścia i wyjścia</h1>
                    <Tabela
                    api={api}
                    onRowClick={()=>{}}
                    />

                    <PrzyciskiWpuszczaniaWypuszczaniaKlienta/>
                </div>
            </div>
        </div>
    )
}